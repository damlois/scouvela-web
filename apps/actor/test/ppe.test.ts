import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ChargeResult } from 'apify';
import { actorInputSchema, type SmeOpportunity } from '@scouvela/shared';
import {
  applyConfirmedCharges,
  chargeEvent,
  emptyChargeResult,
  PPE_ACTOR_START,
  PPE_AI_ENRICHED_RESULT,
  PPE_AI_OPPORTUNITY_REPORT,
  PPE_AI_SEARCH_PLAN,
  PPE_DEFAULT_DATASET_ITEM,
} from '../src/billing/events.js';
import { deliverOpportunities } from '../src/billing/deliver.js';
import { createRunStats } from '../src/utils/stats.js';

const pushDataMock = vi.fn();
const chargeMock = vi.fn();
const setValueMock = vi.fn();
const getPricingInfoMock = vi.fn();
const calculateMaxEventChargeCountWithinLimitMock = vi.fn();

vi.mock('apify', () => ({
  Actor: {
    pushData: (...args: unknown[]) => pushDataMock(...args),
    charge: (...args: unknown[]) => chargeMock(...args),
    setValue: (...args: unknown[]) => setValueMock(...args),
    getChargingManager: () => ({
      getPricingInfo: () => getPricingInfoMock(),
      calculateMaxEventChargeCountWithinLimit: (eventName: string) =>
        calculateMaxEventChargeCountWithinLimitMock(eventName),
    }),
  },
  log: {
    warning: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
  },
}));

vi.mock('../src/ai/client.js', () => ({
  completeJson: vi.fn(),
  parseJsonContent: vi.fn(),
}));

function charged(count: number, limitReached = false): ChargeResult {
  return {
    chargedCount: count,
    eventChargeLimitReached: limitReached,
    chargeableWithinLimit: {},
  };
}

function sampleOpportunity(overrides: Partial<SmeOpportunity> = {}): SmeOpportunity {
  return {
    id: 'opp-1',
    title: 'SME Growth Grant',
    provider: 'Example Foundation',
    opportunityType: 'grant',
    description: 'A grant for African SMEs.',
    countries: ['Nigeria'],
    sourceUrl: 'https://example.org/grant',
    sourceName: 'Example Foundation',
    sourcePlatform: 'website',
    verification: {
      status: 'official-source',
      score: 70,
      reasons: ['Official website'],
      warnings: [],
    },
    status: 'active',
    scrapedAt: '2026-09-25T10:00:00.000Z',
    confidence: 'high',
    ai: null,
    ...overrides,
  };
}

describe('PPE chargeEvent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getPricingInfoMock.mockReturnValue({ isPayPerEvent: true });
    calculateMaxEventChargeCountWithinLimitMock.mockReturnValue(Number.POSITIVE_INFINITY);
  });

  it('returns confirmed ChargeResult.chargedCount and never invents success', async () => {
    chargeMock.mockResolvedValue(charged(1));
    const result = await chargeEvent(PPE_AI_SEARCH_PLAN);
    expect(result.chargedCount).toBe(1);
    expect(chargeMock).toHaveBeenCalledWith({ eventName: PPE_AI_SEARCH_PLAN, count: 1 });
  });

  it('refuses to manually charge synthetic apify-* events', async () => {
    const result = await chargeEvent(PPE_DEFAULT_DATASET_ITEM);
    expect(result.chargedCount).toBe(0);
    expect(chargeMock).not.toHaveBeenCalled();

    const start = await chargeEvent(PPE_ACTOR_START);
    expect(start.chargedCount).toBe(0);
    expect(chargeMock).not.toHaveBeenCalled();
  });

  it('returns chargedCount 0 when the SDK charges nothing', async () => {
    chargeMock.mockResolvedValue(charged(0, true));
    const result = await chargeEvent(PPE_AI_ENRICHED_RESULT);
    expect(result).toEqual(charged(0, true));
  });

  it('increments ppeEventsCharged only from confirmed chargedCount', () => {
    const stats = createRunStats();
    expect(applyConfirmedCharges(stats, charged(0))).toBe(0);
    expect(stats.ppeEventsCharged).toBe(0);
    expect(applyConfirmedCharges(stats, charged(2))).toBe(2);
    expect(stats.ppeEventsCharged).toBe(2);
    expect(applyConfirmedCharges(stats, emptyChargeResult())).toBe(0);
    expect(stats.ppeEventsCharged).toBe(2);
  });
});

describe('PPE deliverOpportunities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getPricingInfoMock.mockReturnValue({ isPayPerEvent: true });
    calculateMaxEventChargeCountWithinLimitMock.mockReturnValue(Number.POSITIVE_INFINITY);
  });

  it('pushes without an explicit event name so apify-default-dataset-item stays automatic', async () => {
    pushDataMock.mockResolvedValue(charged(1));
    const stats = createRunStats();
    const items = [
      sampleOpportunity({ id: 'a', title: 'Grant A' }),
      sampleOpportunity({ id: 'b', title: 'Grant B', sourceUrl: 'https://example.org/b' }),
    ];

    const saved = await deliverOpportunities(items, stats);

    expect(saved).toHaveLength(2);
    expect(stats.recordsSaved).toBe(2);
    expect(stats.ppeEventsCharged).toBe(2);
    expect(pushDataMock).toHaveBeenCalledTimes(2);
    expect(pushDataMock.mock.calls[0]).toEqual([items[0]]);
    expect(pushDataMock.mock.calls[1]).toEqual([items[1]]);
  });

  it('does not count PPE when the run is not pay-per-event but still saves results', async () => {
    getPricingInfoMock.mockReturnValue({ isPayPerEvent: false });
    pushDataMock.mockResolvedValue(charged(0));
    const stats = createRunStats();
    const items = [sampleOpportunity(), sampleOpportunity({ id: '2', sourceUrl: 'https://example.org/2' })];

    const saved = await deliverOpportunities(items, stats);

    expect(saved).toHaveLength(2);
    expect(stats.recordsSaved).toBe(2);
    expect(stats.ppeEventsCharged).toBe(0);
  });

  it('stops delivering when the dataset charge limit is reached', async () => {
    calculateMaxEventChargeCountWithinLimitMock.mockImplementation((eventName: string) =>
      eventName === PPE_DEFAULT_DATASET_ITEM ? 1 : Number.POSITIVE_INFINITY,
    );
    pushDataMock
      .mockResolvedValueOnce(charged(1, true))
      .mockResolvedValueOnce(charged(0, true));

    const stats = createRunStats();
    const items = [
      sampleOpportunity({ id: '1' }),
      sampleOpportunity({ id: '2', sourceUrl: 'https://example.org/2' }),
      sampleOpportunity({ id: '3', sourceUrl: 'https://example.org/3' }),
    ];

    const saved = await deliverOpportunities(items, stats);

    expect(saved).toHaveLength(1);
    expect(stats.recordsSaved).toBe(1);
    expect(stats.ppeEventsCharged).toBe(1);
    expect(pushDataMock).toHaveBeenCalledTimes(1);
  });

  it('stops when a PPE push confirms zero chargedCount', async () => {
    pushDataMock.mockResolvedValue(charged(0, true));
    const stats = createRunStats();
    const saved = await deliverOpportunities(
      [sampleOpportunity(), sampleOpportunity({ id: '2', sourceUrl: 'https://example.org/2' })],
      stats,
    );

    expect(saved).toHaveLength(0);
    expect(stats.recordsSaved).toBe(0);
    expect(stats.ppeEventsCharged).toBe(0);
    expect(pushDataMock).toHaveBeenCalledTimes(1);
  });
});

describe('PPE AI charging', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getPricingInfoMock.mockReturnValue({ isPayPerEvent: true });
    calculateMaxEventChargeCountWithinLimitMock.mockReturnValue(Number.POSITIVE_INFINITY);
  });

  it('charges ai-search-plan only after a successful plan and confirmed charge', async () => {
    const { completeJson, parseJsonContent } = await import('../src/ai/client.js');
    vi.mocked(completeJson).mockResolvedValue('{"query":"fashion grants"}');
    vi.mocked(parseJsonContent).mockReturnValue({ query: 'fashion grants' });
    chargeMock.mockResolvedValue(charged(1));

    const { applyAiSearchPlan } = await import('../src/ai/agent.js');
    const stats = createRunStats();
    const input = actorInputSchema.parse({
      query: 'SME',
      countries: ['Nigeria'],
      ai: { enabled: true, apiKey: 'sk-test', provider: 'openai' },
    });

    const planned = await applyAiSearchPlan(input, stats);

    expect(planned.query).toBe('fashion grants');
    expect(stats.aiPlansGenerated).toBe(1);
    expect(stats.ppeEventsCharged).toBe(1);
    expect(chargeMock).toHaveBeenCalledWith({ eventName: PPE_AI_SEARCH_PLAN, count: 1 });
  });

  it('does not apply or charge an AI search plan when charge is denied under PPE', async () => {
    const { completeJson, parseJsonContent } = await import('../src/ai/client.js');
    vi.mocked(completeJson).mockResolvedValue('{"query":"fashion grants"}');
    vi.mocked(parseJsonContent).mockReturnValue({ query: 'fashion grants' });
    chargeMock.mockResolvedValue(charged(0, true));

    const { applyAiSearchPlan } = await import('../src/ai/agent.js');
    const stats = createRunStats();
    const input = actorInputSchema.parse({
      query: 'SME',
      countries: ['Nigeria'],
      ai: { enabled: true, apiKey: 'sk-test', provider: 'openai' },
    });

    const planned = await applyAiSearchPlan(input, stats);

    expect(planned.query).toBe('SME');
    expect(stats.aiPlansGenerated).toBe(0);
    expect(stats.ppeEventsCharged).toBe(0);
  });

  it('skips AI work entirely when AI is disabled', async () => {
    const { completeJson } = await import('../src/ai/client.js');
    const { applyAiSearchPlan, enrichOpportunities, writeOpportunityReport } = await import(
      '../src/ai/agent.js'
    );
    const stats = createRunStats();
    const input = actorInputSchema.parse({
      countries: ['Nigeria'],
      ai: { enabled: false },
    });
    const records = [sampleOpportunity()];

    await applyAiSearchPlan(input, stats);
    const enriched = await enrichOpportunities(records, input, stats);
    await writeOpportunityReport(enriched, input, stats);

    expect(completeJson).not.toHaveBeenCalled();
    expect(chargeMock).not.toHaveBeenCalled();
    expect(stats.ppeEventsCharged).toBe(0);
    expect(enriched[0]?.ai).toBeNull();
  });

  it('charges ai-enriched-result once per successfully enriched opportunity', async () => {
    const { completeJson, parseJsonContent } = await import('../src/ai/client.js');
    vi.mocked(completeJson).mockResolvedValue('{"summary":"Useful grant"}');
    vi.mocked(parseJsonContent).mockReturnValue({ summary: 'Useful grant' });
    chargeMock.mockResolvedValue(charged(1));

    const { enrichOpportunities } = await import('../src/ai/agent.js');
    const stats = createRunStats();
    const input = actorInputSchema.parse({
      countries: ['Nigeria'],
      ai: { enabled: true, apiKey: 'sk-test', provider: 'openai' },
    });

    const enriched = await enrichOpportunities(
      [
        sampleOpportunity({ id: '1' }),
        sampleOpportunity({ id: '2', sourceUrl: 'https://example.org/2' }),
      ],
      input,
      stats,
    );

    expect(enriched).toHaveLength(2);
    expect(enriched.every((item) => item.ai?.summary === 'Useful grant')).toBe(true);
    expect(stats.aiResultsGenerated).toBe(2);
    expect(stats.ppeEventsCharged).toBe(2);
    expect(chargeMock).toHaveBeenCalledTimes(2);
    expect(chargeMock).toHaveBeenCalledWith({ eventName: PPE_AI_ENRICHED_RESULT, count: 1 });
  });

  it('does not attach AI enrichment when the PPE charge is denied', async () => {
    const { completeJson, parseJsonContent } = await import('../src/ai/client.js');
    vi.mocked(completeJson).mockResolvedValue('{"summary":"Useful grant"}');
    vi.mocked(parseJsonContent).mockReturnValue({ summary: 'Useful grant' });
    chargeMock.mockResolvedValue(charged(0, true));

    const { enrichOpportunities } = await import('../src/ai/agent.js');
    const stats = createRunStats();
    const input = actorInputSchema.parse({
      countries: ['Nigeria'],
      ai: { enabled: true, apiKey: 'sk-test', provider: 'openai' },
    });

    const enriched = await enrichOpportunities([sampleOpportunity()], input, stats);

    expect(enriched[0]?.ai).toBeNull();
    expect(stats.aiResultsGenerated).toBe(0);
    expect(stats.ppeEventsCharged).toBe(0);
  });

  it('charges ai-opportunity-report only when the report is saved and charged', async () => {
    const { completeJson, parseJsonContent } = await import('../src/ai/client.js');
    vi.mocked(completeJson).mockResolvedValue('{"title":"Brief","overview":"Overview text"}');
    vi.mocked(parseJsonContent).mockReturnValue({ title: 'Brief', overview: 'Overview text' });
    chargeMock.mockResolvedValue(charged(1));
    setValueMock.mockResolvedValue(undefined);

    const { writeOpportunityReport } = await import('../src/ai/agent.js');
    const stats = createRunStats();
    const input = actorInputSchema.parse({
      countries: ['Nigeria'],
      ai: { enabled: true, apiKey: 'sk-test', provider: 'openai', generateReport: true },
    });

    await writeOpportunityReport([sampleOpportunity()], input, stats);

    expect(setValueMock).toHaveBeenCalledWith(
      'OPPORTUNITY_REPORT',
      expect.objectContaining({ title: 'Brief', overview: 'Overview text' }),
    );
    expect(chargeMock).toHaveBeenCalledWith({ eventName: PPE_AI_OPPORTUNITY_REPORT, count: 1 });
    expect(stats.aiReportsGenerated).toBe(1);
    expect(stats.ppeEventsCharged).toBe(1);
  });

  it('removes an uncharged AI report under PPE', async () => {
    const { completeJson, parseJsonContent } = await import('../src/ai/client.js');
    vi.mocked(completeJson).mockResolvedValue('{"title":"Brief","overview":"Overview text"}');
    vi.mocked(parseJsonContent).mockReturnValue({ title: 'Brief', overview: 'Overview text' });
    chargeMock.mockResolvedValue(charged(0, true));
    setValueMock.mockResolvedValue(undefined);

    const { writeOpportunityReport } = await import('../src/ai/agent.js');
    const stats = createRunStats();
    const input = actorInputSchema.parse({
      countries: ['Nigeria'],
      ai: { enabled: true, apiKey: 'sk-test', provider: 'openai', generateReport: true },
    });

    await writeOpportunityReport([sampleOpportunity()], input, stats);

    expect(setValueMock).toHaveBeenCalledWith('OPPORTUNITY_REPORT', null);
    expect(stats.aiReportsGenerated).toBe(0);
    expect(stats.ppeEventsCharged).toBe(0);
  });
});

describe('PPE non-chargeable paths', () => {
  it('leaves ppeEventsCharged at zero for filtered and duplicate-only outcomes', async () => {
    const { finaliseOpportunities } = await import('../src/pipeline.js');
    const stats = createRunStats();
    const input = actorInputSchema.parse({
      countries: ['Nigeria'],
      includeExpired: false,
      maxResults: 5,
      ai: { enabled: false },
    });

    const saved = finaliseOpportunities(
      [
        {
          title: 'Expired grant',
          provider: 'Example',
          opportunityType: 'grant',
          description: 'Closed programme',
          countries: ['Nigeria'],
          sourceUrl: 'https://example.org/expired',
          sourceName: 'Example',
          deadline: '2020-01-01',
        },
        {
          title: 'Duplicate grant',
          provider: 'Example',
          opportunityType: 'grant',
          description: 'Same programme',
          countries: ['Nigeria'],
          sourceUrl: 'https://example.org/dup',
          sourceName: 'Example',
        },
        {
          title: 'Duplicate grant',
          provider: 'Example',
          opportunityType: 'grant',
          description: 'Same programme again',
          countries: ['Nigeria'],
          sourceUrl: 'https://example.org/dup',
          sourceName: 'Example',
        },
      ],
      input,
      '2026-09-25T10:00:00.000Z',
      stats,
    );

    expect(stats.recordsFilteredExpired).toBeGreaterThanOrEqual(1);
    expect(stats.duplicatesRemoved).toBeGreaterThanOrEqual(1);
    expect(stats.ppeEventsCharged).toBe(0);
    // Expired filtered out; only the unique active duplicate survivor may remain
    for (const item of saved) {
      expect(item.status).not.toBe('expired');
    }
  });
});

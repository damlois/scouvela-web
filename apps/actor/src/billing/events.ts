import { Actor, log, type ChargeResult } from 'apify';
import type { RunStats } from '../utils/stats.js';

/** Synthetic platform event — charged automatically on default Dataset writes. Never charge manually. */
export const PPE_DEFAULT_DATASET_ITEM = 'apify-default-dataset-item';

/** Synthetic platform event — charged automatically on Actor start. Never charge manually. */
export const PPE_ACTOR_START = 'apify-actor-start';

export const PPE_AI_SEARCH_PLAN = 'ai-search-plan';
export const PPE_AI_ENRICHED_RESULT = 'ai-enriched-result';
export const PPE_AI_OPPORTUNITY_REPORT = 'ai-opportunity-report';

export function emptyChargeResult(): ChargeResult {
  return {
    eventChargeLimitReached: false,
    chargedCount: 0,
    chargeableWithinLimit: {},
  };
}

export function isPayPerEventRun(): boolean {
  try {
    return Actor.getChargingManager().getPricingInfo().isPayPerEvent;
  } catch {
    return false;
  }
}

/** Remaining chargeable count for an event within the run budget. Infinity when free / unknown. */
export function remainingEventCharges(eventName: string): number {
  try {
    return Actor.getChargingManager().calculateMaxEventChargeCountWithinLimit(eventName);
  } catch {
    return Number.POSITIVE_INFINITY;
  }
}

/**
 * Charge a custom PPE event. Inspect `chargedCount` — never treat a no-op as success.
 * Synthetic `apify-*` events must not be charged here.
 */
export async function chargeEvent(eventName: string, count = 1): Promise<ChargeResult> {
  if (count < 1) {
    return emptyChargeResult();
  }

  if (eventName.startsWith('apify-')) {
    log.warning('Refusing to manually charge a synthetic Apify event', { eventName });
    return emptyChargeResult();
  }

  try {
    return await Actor.charge({ eventName, count });
  } catch (error) {
    log.debug('PPE charge skipped', {
      eventName,
      message: error instanceof Error ? error.message : 'Unknown charge error',
    });
    return emptyChargeResult();
  }
}

/** Increment `ppeEventsCharged` only from confirmed ChargeResult values. */
export function applyConfirmedCharges(stats: RunStats, result: ChargeResult): number {
  if (result.chargedCount > 0) {
    stats.ppeEventsCharged += result.chargedCount;
  }
  return result.chargedCount;
}

/**
 * Push one opportunity to the default Dataset.
 * In PPE mode the SDK tracks `apify-default-dataset-item` automatically — do not pass that name.
 * Apify JS SDK 3.7+ returns ChargeResult from the instance path even when the no-eventName
 * overload is typed as void.
 */
export async function pushOpportunityResult<T extends Record<string, unknown>>(
  item: T,
): Promise<ChargeResult> {
  // Runtime returns ChargeResult; the no-eventName static overload is typed as void.
  const result = (await Actor.pushData(item)) as unknown as ChargeResult | undefined;
  if (result && typeof result === 'object' && 'chargedCount' in result) {
    return result;
  }
  return emptyChargeResult();
}

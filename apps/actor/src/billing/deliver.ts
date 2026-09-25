import type { SmeOpportunity } from '@scouvela/shared';
import {
  applyConfirmedCharges,
  isPayPerEventRun,
  PPE_DEFAULT_DATASET_ITEM,
  pushOpportunityResult,
  remainingEventCharges,
} from './events.js';
import type { RunStats } from '../utils/stats.js';

/**
 * Persist validated opportunities to the default Dataset.
 * Each saved item maps to one automatic `apify-default-dataset-item` charge under PPE.
 * Stops when the run charge limit no longer allows further default-dataset charges.
 */
export async function deliverOpportunities(
  records: SmeOpportunity[],
  stats: RunStats,
): Promise<SmeOpportunity[]> {
  const saved: SmeOpportunity[] = [];
  const ppe = isPayPerEventRun();

  for (const item of records) {
    if (ppe && remainingEventCharges(PPE_DEFAULT_DATASET_ITEM) <= 0) {
      break;
    }

    const chargeResult = await pushOpportunityResult(item);
    applyConfirmedCharges(stats, chargeResult);

    if (ppe && chargeResult.chargedCount === 0) {
      break;
    }

    saved.push(item);
    stats.recordsSaved += 1;

    if (chargeResult.eventChargeLimitReached) {
      break;
    }
  }

  return saved;
}

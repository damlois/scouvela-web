import type { SmeOpportunity } from '@scouvela/shared';
import {
  isPayPerEventRun,
  PPE_DEFAULT_DATASET_ITEM,
  pushOpportunityResult,
  remainingEventCharges,
} from './events.js';
import type { RunStats } from '../utils/stats.js';

/**
 * Persist validated opportunities to the default Dataset.
 *
 * Under PPE, Apify automatically charges `apify-default-dataset-item` for each default-Dataset
 * write. The JS SDK documents `Actor.pushData(item)` (no event name) as returning void, so we:
 * - never cast that return into ChargeResult
 * - never manually charge the synthetic event
 * - never block delivery on an undefined synthetic ChargeResult
 * - stop only when ChargingManager reports no remaining budget for the synthetic event
 *
 * `ppeEventsCharged` stays reserved for confirmed custom `Actor.charge` results (AI events).
 * Dataset delivery is counted separately as `ppeDatasetItemsDelivered`.
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

    await pushOpportunityResult(item);

    saved.push(item);
    stats.recordsSaved += 1;
    stats.ppeDatasetItemsDelivered += 1;
  }

  return saved;
}

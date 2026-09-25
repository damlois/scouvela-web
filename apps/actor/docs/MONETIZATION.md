# Monetization

Scouvela uses Apify Pay Per Event. Configure events in Console: **Publishing → Monetization**.

| Event | Charged when | Suggested price |
| --- | --- | ---: |
| `apify-default-dataset-item` | A valid opportunity is saved | $0.01 |
| `ai-search-plan` | The AI search plan validates | $0.01 |
| `ai-enriched-result` | One result is successfully enriched | $0.02 |
| `ai-opportunity-report` | `OPPORTUNITY_REPORT` is written | $0.05 |

Primary event: `apify-default-dataset-item`.

Do not charge for duplicates, invalid rows, failed pages, empty searches, or rejected AI responses. The customer’s OpenAI usage is billed by OpenAI. The API key never appears in the Dataset or logs.

Store-facing pricing copy lives in [`.actor/README.md`](../.actor/README.md).

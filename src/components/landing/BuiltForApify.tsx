import { CalendarClock, Database, Plug, Receipt, Settings2, Sheet } from 'lucide-react';

const features = [
  { label: 'Apify Actor runtime', icon: Settings2 },
  { label: 'Structured inputs', icon: Plug },
  { label: 'Dataset output', icon: Database },
  { label: 'JSON and CSV export', icon: Sheet },
  { label: 'Schedules', icon: CalendarClock },
  { label: 'API integration', icon: Plug },
  { label: 'Pay-per-event pricing', icon: Receipt },
] as const;

export function BuiltForApify() {
  return (
    <section id="apify" className="section-space scroll-mt-24 bg-surface">
      <div className="container-shell">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Built for Apify
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Scouvela is designed as an Apify Actor: run it once, schedule it, or wire it into your
            own automations. The public Store listing will be linked here when it is available.
          </p>
        </div>
        <ul className="mt-8 flex flex-wrap gap-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <li
                key={feature.label}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/70 px-3.5 py-2 text-sm font-medium text-text"
              >
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                {feature.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

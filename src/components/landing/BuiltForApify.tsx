import { CalendarClock, Code2, Database, Plug, Receipt, Settings2, Sheet } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const features = [
  { label: 'Apify Actor runtime', icon: Settings2 },
  { label: 'Structured inputs', icon: Plug },
  { label: 'Dataset output', icon: Database },
  { label: 'JSON and CSV export', icon: Sheet },
  { label: 'Schedules', icon: CalendarClock },
  { label: 'API integration', icon: Code2 },
  { label: 'Pay-per-event pricing', icon: Receipt },
] as const;

export function BuiltForApify() {
  return (
    <section id="apify" className="section-space scroll-mt-16 border-t border-border bg-white">
      <div className="container-shell grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <SectionHeading eyebrow="Platform" title="Built for Apify." accent="Plugs into everything.">
          Run it once, schedule it, or wire it into your own automations. The public Store listing
          will be linked here when it is available.
        </SectionHeading>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal as="li" key={feature.label} delay={index * 60}>
                <div className="group flex h-full flex-col gap-4 rounded-2xl border border-border p-4 transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:bg-teal/[0.04]">
                  <Icon
                    className="h-5 w-5 text-teal-deep transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-semibold text-text">{feature.label}</span>
                </div>
              </Reveal>
            );
          })}
          <Reveal as="li" delay={features.length * 60} className="sm:col-span-2">
            <div className="flex h-full flex-col justify-between gap-4 rounded-2xl bg-sun p-4 text-ink">
              <span className="text-xs font-bold uppercase tracking-wide">Status</span>
              <span className="text-sm font-bold">Store listing coming soon</span>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

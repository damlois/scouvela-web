import { Radar, ScanSearch, Send } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const steps = [
  {
    number: '01',
    title: 'Discover',
    icon: Radar,
    description:
      'Scouvela reads selected public websites, application pages and supported public social URLs.',
    log: 'scanning sources…',
  },
  {
    number: '02',
    title: 'Understand',
    icon: ScanSearch,
    description:
      'It identifies genuine opportunities, extracts important details and checks what information is missing.',
    log: 'deadline ✓  eligibility ✓',
  },
  {
    number: '03',
    title: 'Deliver',
    icon: Send,
    description:
      'It returns normalized, source-linked records through an Apify Dataset for export, automation or AI workflows.',
    log: 'dataset.push(record)',
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-grid section-space relative scroll-mt-16 overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-teal/15 blur-[120px]"
      />
      <div className="container-shell">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow="How it works"
          title="From internet noise"
          accent="to usable data."
        >
          Three steps and no copy-paste. Run it once, or put it on a schedule and let the bot
          keep checking for you.
        </SectionHeading>

        <ol className="relative mt-16 grid gap-5 lg:grid-cols-3">
          <div
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-[3.25rem] hidden h-px bg-gradient-to-r from-teal/0 via-teal/50 to-teal/0 lg:block"
          />
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal as="li" key={step.title} delay={index * 120} className="relative">
                <div className="group h-full rounded-3xl border border-ink-line bg-ink-2/80 p-7 backdrop-blur transition-colors duration-300 hover:border-teal/50">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sun font-display text-lg font-extrabold text-ink transition-transform duration-300 group-hover:scale-110">
                      {Number(step.number)}
                    </span>
                    <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/15 text-teal-bright">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/55">{step.description}</p>
                  <p className="mt-6 border-t border-ink-line pt-4 font-mono text-xs text-teal-bright/80">
                    <span className="text-sun">›</span> {step.log}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

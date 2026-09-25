import { Check } from 'lucide-react';
import { TerminalDemo } from '@/components/landing/TerminalDemo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const points = [
  'Consistent fields across opportunity types',
  'Original source links preserved on every record',
  'Deadline and eligibility extraction where available',
  'Verification warnings when details are incomplete',
  'JSON and CSV export through Apify Datasets',
] as const;

export function StructuredOutput() {
  return (
    <section id="output" className="section-space scroll-mt-16 bg-mist">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow="The output" title="Structured data" accent="you can automate on.">
            Scattered announcements become normalized, source-linked records ready for export,
            pipelines or downstream AI workflows.
          </SectionHeading>
          <ul className="mt-8 space-y-3">
            {points.map((point, index) => (
              <Reveal as="li" key={point} delay={index * 70} className="flex items-start gap-3 text-text">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal-deep">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-[15px]">{point}</span>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={150}>
          <TerminalDemo />
        </Reveal>
      </div>
    </section>
  );
}

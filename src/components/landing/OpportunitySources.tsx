import {
  ArrowUpRight,
  GraduationCap,
  HandCoins,
  Link2,
  Rocket,
  ScrollText,
  Users,
} from 'lucide-react';
import { Marquee } from '@/components/ui/Marquee';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const opportunities = [
  {
    tag: 'Money in',
    title: 'Grants and funding',
    description: 'Public grants, soft loans and programme funding with deadlines and application links.',
    icon: HandCoins,
  },
  {
    tag: 'Contracts',
    title: 'Tenders and contracts',
    description: 'Open calls and procurement notices that SMEs can actually apply for.',
    icon: ScrollText,
  },
  {
    tag: 'Scale up',
    title: 'Accelerators and incubators',
    description: 'Cohorts, pitch windows and startup support programmes across Africa.',
    icon: Rocket,
  },
  {
    tag: 'Level up',
    title: 'Training and mentorship',
    description: 'Skills programmes, workshops and mentorship offers discovered from public pages.',
    icon: GraduationCap,
  },
  {
    tag: 'Grow',
    title: 'SME empowerment programmes',
    description: 'Capacity-building and empowerment initiatives aimed at African small businesses.',
    icon: Users,
  },
] as const;

const tickerTop = [
  'Grants',
  'Tenders',
  'Accelerators',
  'Incubators',
  'Training',
  'Mentorship',
  'Soft loans',
  'Pitch competitions',
  'SME empowerment',
] as const;

const tickerBottom = [
  'official websites',
  'application pages',
  'public Instagram posts',
  'deadline extraction',
  'eligibility notes',
  'source links',
  'JSON + CSV export',
  'scheduled runs',
] as const;

export function OpportunitySources() {
  return (
    <section id="what-it-finds" className="scroll-mt-16 bg-white">
      {/* Ticker strip */}
      <div className="border-b border-border py-6">
        <Marquee duration={45}>
          {tickerTop.map((item) => (
            <span
              key={item}
              className="flex items-center gap-4 font-display text-2xl font-bold tracking-tight text-text sm:text-3xl"
            >
              {item}
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-sun" />
            </span>
          ))}
        </Marquee>
        <Marquee duration={55} reverse className="mt-4">
          {tickerBottom.map((item) => (
            <span
              key={item}
              className="rounded-full bg-mist px-4 py-1.5 text-sm font-semibold text-muted"
            >
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container-shell section-space">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="What it hunts" title="One Actor." accent="Many kinds of opportunity.">
            Scouvela processes selected official websites, submitted public webpages and supported
            public Instagram URLs — not the entire internet. Focused beats noisy.
          </SectionHeading>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {opportunities.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal as="li" key={item.title} delay={index * 80}>
                <div className="group h-full rounded-3xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_24px_50px_-24px_rgba(10,125,104,0.45)]">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10 text-teal-deep transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-sun/15 px-2.5 py-1 text-xs font-bold text-sun-deep">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-text">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
          <Reveal as="li" delay={opportunities.length * 80}>
            <a
              href="#how-it-works"
              className="group flex h-full flex-col justify-between rounded-3xl bg-ink p-6 text-white transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sun text-ink">
                <Link2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="mt-6">
                <p className="font-display text-xl font-bold">
                  Got a source we&apos;re missing?{' '}
                  <span className="text-teal-bright">Add it.</span>
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-white/55 group-hover:text-teal-bright">
                  Submit your own public URLs as input
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" aria-hidden="true" />
                </p>
              </div>
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

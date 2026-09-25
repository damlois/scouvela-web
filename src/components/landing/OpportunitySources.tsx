import {
  GraduationCap,
  HandCoins,
  Rocket,
  ScrollText,
  Users,
} from 'lucide-react';

const opportunities = [
  {
    title: 'Grants and funding',
    description: 'Public grants, soft loans and programme funding with deadlines and application links.',
    icon: HandCoins,
  },
  {
    title: 'Tenders and contracts',
    description: 'Open calls and procurement notices that SMEs can actually apply for.',
    icon: ScrollText,
  },
  {
    title: 'Accelerators and incubators',
    description: 'Cohorts, pitch windows and startup support programmes across Africa.',
    icon: Rocket,
  },
  {
    title: 'Training and mentorship',
    description: 'Skills programmes, workshops and mentorship offers discovered from public pages.',
    icon: GraduationCap,
  },
  {
    title: 'SME empowerment programmes',
    description: 'Capacity-building and empowerment initiatives aimed at African small businesses.',
    icon: Users,
  },
] as const;

export function OpportunitySources() {
  return (
    <section id="what-it-finds" className="section-space scroll-mt-24 bg-surface">
      <div className="container-shell">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            One Actor. Many kinds of opportunity.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Scouvela currently processes selected official websites, submitted public webpages and
            supported public Instagram URLs, not the entire internet.
          </p>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="rounded-xl border border-border bg-background/60 p-5">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-text">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

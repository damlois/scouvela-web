import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { OpportunityChip } from '@/components/ui/OpportunityChip';
import { getApifyHref, isApifyConfigured } from '@/lib/links';

const opportunityChips = [
  { label: 'Grant found', position: 'left-0 top-[8%]', motion: 'hero-float-a' },
  { label: 'Tender closing soon', position: 'right-0 top-[14%]', motion: 'hero-float-b' },
  { label: 'Accelerator open', position: 'left-[2%] bottom-[28%]', motion: 'hero-float-c' },
  { label: 'Training programme', position: 'right-[2%] bottom-[22%]', motion: 'hero-float-d' },
  {
    label: 'Africa-wide opportunity',
    position: 'left-1/2 top-[2%] -translate-x-1/2',
    motion: 'hero-float-e',
  },
] as const;

const sourceChips = [
  { label: 'Official websites', position: 'left-[8%] bottom-[6%]', motion: 'hero-float-f' },
  { label: 'Public social posts', position: 'right-[6%] bottom-[4%]', motion: 'hero-float-g' },
  {
    label: 'Application pages',
    position: 'left-1/2 bottom-[14%] -translate-x-1/2',
    motion: 'hero-float-h',
  },
] as const;

export function Hero() {
  const apifyReady = isApifyConfigured();
  const apifyHref = getApifyHref();

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(11,107,87,0.08),_transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(245,166,35,0.12),_transparent_45%),linear-gradient(180deg,#f7f6f2_0%,#ffffff_55%,#f3f2ed_100%)]"
      />
      <div className="container-shell relative grid items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-16">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            African SME opportunity intelligence
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-text sm:text-5xl sm:leading-[1.1]">
            Find the opportunities
            <span className="block">hidden across the web.</span>
          </h1>
          <p className="mt-5 max-w-copy text-base leading-7 text-muted">
            Scouvela scans public websites and supported social pages for grants, tenders,
            accelerators, training and SME empowerment programmes—then turns scattered
            announcements into clean, source-linked data.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={apifyHref}
              disabled={!apifyReady}
              {...(apifyReady ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              title={apifyReady ? undefined : 'Apify Actor URL coming soon'}
            >
              Run Scouvela on Apify
            </Button>
            <Button href="#how-it-works" variant="secondary">
              See how it works
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted">
            Public sources only · Source-linked results · Optional BYOK AI
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="true">
          <div className="hero-scene relative mx-auto aspect-square max-h-[28rem] w-full max-w-[28rem]">
            <div className="hero-radar absolute inset-[8%] rounded-full border border-primary/15" />
            <div className="hero-radar hero-radar-delayed absolute inset-[18%] rounded-full border border-accent/25" />
            <div className="absolute inset-[28%] rounded-full bg-gradient-to-br from-primary/10 via-surface to-accent/10 shadow-[inset_0_0_40px_rgba(11,107,87,0.08)]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="hero-pulse relative flex h-[42%] w-[42%] items-center justify-center rounded-full border border-border bg-surface shadow-[0_12px_40px_rgba(23,33,30,0.12)]">
                <div className="absolute inset-2 rounded-full border border-dashed border-primary/20" />
                <Image
                  src="/images/scouvela-mark.png"
                  alt=""
                  width={160}
                  height={160}
                  priority
                  className="relative z-10 h-[72%] w-[72%] object-contain"
                />
              </div>
            </div>

            <div className="hero-bubble absolute left-[52%] top-[18%] z-20 max-w-[11.5rem] -translate-x-1/2 rounded-2xl border border-border bg-surface px-3.5 py-2.5 text-left shadow-md sm:left-[58%] sm:max-w-[13rem]">
              <p className="text-xs font-semibold text-text sm:text-sm">Hi, I&apos;m Scouvela.</p>
              <p className="mt-0.5 text-xs text-muted sm:text-sm">
                Let&apos;s go opportunity hunting.
              </p>
              <span className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-b border-r border-border bg-surface" />
            </div>

            {opportunityChips.map((chip) => (
              <div key={chip.label} className={`absolute z-10 ${chip.position}`}>
                <OpportunityChip className={chip.motion}>{chip.label}</OpportunityChip>
              </div>
            ))}
            {sourceChips.map((chip) => (
              <div key={chip.label} className={`absolute z-10 ${chip.position}`}>
                <OpportunityChip tone="source" className={chip.motion}>
                  {chip.label}
                </OpportunityChip>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

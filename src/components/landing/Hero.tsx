import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { BotActor } from '@/components/landing/BotActor';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/SectionHeading';
import { getApifyHref, isApifyConfigured } from '@/lib/links';
import { cn } from '@/lib/utils';

const floatingChips = [
  { label: 'Grant found', dot: 'bg-teal-bright', position: 'left-0 top-[16%]', delay: '0s' },
  { label: 'Tender closing soon', dot: 'bg-sun', position: 'right-0 top-[30%]', delay: '1.2s' },
  { label: 'Accelerator open', dot: 'bg-teal-bright', position: 'left-[2%] bottom-[24%]', delay: '0.6s' },
  { label: 'Source linked ✓', dot: 'bg-white', position: 'right-[4%] bottom-[12%]', delay: '1.8s' },
] as const;

export function Hero() {
  const apifyReady = isApifyConfigured();
  const apifyHref = getApifyHref();

  return (
    <section
      id="top"
      className="bg-grid relative flex min-h-[100svh] items-center overflow-hidden bg-ink pb-16 pt-28 lg:pb-20 lg:pt-32"
    >
      {/* Brand glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 -z-10 h-[36rem] w-[36rem] rounded-full bg-teal/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[24rem] w-[24rem] rounded-full bg-sun/10 blur-[120px]"
      />

      <div className="container-shell relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div className="animate-[fadeUp_0.8s_ease-out_both]">
          <Badge tone="dark">Apify Actor for African SMEs</Badge>

          <h1 className="mt-6 text-balance font-display text-[2.7rem] font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[4.4rem]">
            Meet the bot that hunts grants{' '}
            <span className="accent-mark text-teal-bright">so you don&apos;t have to.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/65">
            Scouvela scans official websites and public social pages for grants, tenders,
            accelerators and training programmes, then hands you clean, source-linked data you can
            actually use. Works without an AI key.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              href={apifyHref}
              disabled={!apifyReady}
              className="h-12 px-7 text-base"
              {...(apifyReady ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              title={apifyReady ? undefined : 'Apify Actor URL coming soon'}
            >
              Run Scouvela on Apify
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="#how-it-works" variant="secondary" className="h-12 px-7 text-base">
              See how it works
            </Button>
          </div>

          <ul className="mt-9 flex flex-wrap gap-2 text-xs font-semibold text-white/70">
            {['Public sources only', 'Source-linked results', 'Optional BYOK AI'].map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5"
              >
                <Check className="h-3.5 w-3.5 text-teal-bright" strokeWidth={3} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* The happy jumping Actor */}
        <div className="relative mx-auto mt-10 aspect-[9/10] w-full max-w-[22rem] lg:mt-0 sm:max-w-[26rem] lg:max-w-[30rem]">
          <div
            aria-hidden="true"
            className="animate-radar absolute inset-[6%] rounded-full border border-teal/20"
          />
          <div
            aria-hidden="true"
            className="animate-radar absolute inset-[18%] rounded-full border border-dashed border-sun/25 [animation-delay:1.5s]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-[26%] rounded-full bg-teal/10 blur-2xl"
          />

          <BotActor className="absolute inset-x-[8%] bottom-[2%] top-[8%]" />

          {/* Speech bubble */}
          <div className="animate-float absolute right-[2%] top-[-13%] z-20 sm:top-0 rounded-3xl rounded-bl-md border border-white/10 bg-white/95 text-ink px-4 py-3 shadow-2xl backdrop-blur sm:right-[-2%]">
            <p className="flex items-center gap-1.5 font-display text-sm font-bold text-ink">
              <Sparkles className="h-3.5 w-3.5 text-sun" aria-hidden="true" />
              Hi, I&apos;m Scouvela!
            </p>
            <p className="mt-0.5 text-xs font-medium text-teal-deep">Let&apos;s go opportunity hunting!</p>
          </div>

          {floatingChips.map((chip) => (
            <div
              key={chip.label}
              className={cn('absolute z-10 hidden sm:block', chip.position)}
            >
              <span
                className="animate-float inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-2/80 px-3 py-1.5 text-xs font-semibold text-white/85 shadow-lg backdrop-blur"
                style={{ animationDelay: chip.delay }}
              >
                <span className="relative flex h-2 w-2">
                  <span className={cn('animate-ping-soft absolute inset-0 rounded-full', chip.dot)} />
                  <span className={cn('relative h-2 w-2 rounded-full', chip.dot)} />
                </span>
                {chip.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#what-it-finds"
        aria-label="Scroll to what Scouvela finds"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold text-white/40 transition-colors hover:text-teal-bright lg:flex"
      >
        Scroll
        <span className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </a>
    </section>
  );
}

import { ArrowRight, Github } from 'lucide-react';
import { BotActor } from '@/components/landing/BotActor';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/SectionHeading';
import { GITHUB_URL, getApifyHref, isApifyConfigured } from '@/lib/links';

export function FinalCta() {
  const apifyReady = isApifyConfigured();
  const apifyHref = getApifyHref();

  return (
    <section className="bg-white px-3 pb-3 sm:px-5 sm:pb-5">
      <Reveal className="bg-grid relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink px-6 py-16 sm:rounded-[2.5rem] sm:px-12 sm:py-20 lg:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-teal/25 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-sun/15 blur-[100px]"
        />
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <Badge tone="dark">Ready when you are</Badge>
            <h2 className="mt-6 text-balance font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl">
              Stop searching ten places{' '}
              <span className="accent-mark text-teal-bright">for one opportunity.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/65">
              Let Scouvela gather the signals, structure the details and keep the original sources
              attached. You just apply.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                href={apifyHref}
                disabled={!apifyReady}
                className="h-12 px-7 text-base"
                {...(apifyReady ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                title={apifyReady ? undefined : 'Apify Actor URL coming soon'}
              >
                Run on Apify
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                href={GITHUB_URL}
                variant="secondary"
                className="h-12 px-7 text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                View source on GitHub
              </Button>
            </div>
          </div>
          <div className="mx-auto hidden h-64 w-56 sm:block lg:h-80 lg:w-72">
            <BotActor id="bot-cta" className="h-full w-full" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

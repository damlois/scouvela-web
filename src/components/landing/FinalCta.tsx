import { Button } from '@/components/ui/Button';
import { GITHUB_URL, getApifyHref, isApifyConfigured } from '@/lib/links';

export function FinalCta() {
  const apifyReady = isApifyConfigured();
  const apifyHref = getApifyHref();

  return (
    <section className="section-space border-t border-border bg-[linear-gradient(160deg,#0b6b57_0%,#075346_55%,#0a4f40_100%)]">
      <div className="container-shell max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Stop searching ten places for one opportunity.
        </h2>
        <p className="mx-auto mt-4 max-w-copy text-base leading-7 text-white/80">
          Let Scouvela gather the signals, structure the details and keep the original sources
          attached.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            href={apifyHref}
            disabled={!apifyReady}
            className="bg-accent text-text shadow-sm hover:bg-[#e09410] hover:shadow"
            {...(apifyReady ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            title={apifyReady ? undefined : 'Apify Actor URL coming soon'}
          >
            Run on Apify
          </Button>
          <Button
            href={GITHUB_URL}
            variant="secondary"
            className="border-white/25 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            View source on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}

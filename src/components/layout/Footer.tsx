import { Logo } from '@/components/layout/Logo';
import { GITHUB_URL, getApifyHref, isApifyConfigured } from '@/lib/links';

export function Footer() {
  const year = new Date().getFullYear();
  const apifyReady = isApifyConfigured();
  const apifyHref = getApifyHref();

  const linkClass = 'font-semibold text-muted transition-colors hover:text-teal-deep';

  return (
    <footer className="mt-auto bg-white">
      <div className="container-shell flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo tone="light" />
          <p className="mt-3 text-sm text-muted">African SME opportunity intelligence.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <a href="#how-it-works" className={linkClass}>
            How it works
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub
          </a>
          {apifyReady ? (
            <a href={apifyHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Apify
            </a>
          ) : (
            <span className="font-semibold text-muted/50" title="Apify Actor URL coming soon">
              Apify
            </span>
          )}
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="container-shell flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {year} Scouvela</p>
          <p>
            Made for African SMEs. <span className="font-bold text-sun-deep">Happy hunting!</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

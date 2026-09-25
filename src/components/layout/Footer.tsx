import Image from 'next/image';
import { GITHUB_URL, getApifyHref, isApifyConfigured } from '@/lib/links';

export function Footer() {
  const year = new Date().getFullYear();
  const apifyReady = isApifyConfigured();
  const apifyHref = getApifyHref();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="container-shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/scouvela-mark.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm font-semibold text-text">Scouvela</p>
            <p className="text-sm text-muted">African SME opportunity intelligence</p>
          </div>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-primary"
          >
            GitHub
          </a>
          {apifyReady ? (
            <a
              href={apifyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-primary"
            >
              Apify
            </a>
          ) : (
            <span className="text-muted/70" title="Apify Actor URL coming soon">
              Apify
            </span>
          )}
          <p className="text-muted">© {year} Scouvela</p>
        </nav>
      </div>
    </footer>
  );
}

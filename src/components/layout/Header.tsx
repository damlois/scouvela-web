'use client';

import { useEffect, useId, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { Button } from '@/components/ui/Button';
import { GITHUB_URL, getApifyHref, isApifyConfigured } from '@/lib/links';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#what-it-finds', label: 'What it finds' },
  { href: GITHUB_URL, label: 'GitHub', external: true },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const apifyReady = isApifyConfigured();
  const apifyHref = getApifyHref();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur transition-shadow supports-[backdrop-filter]:bg-surface/75',
        scrolled && 'shadow-sm',
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary"
      >
        Skip to main content
      </a>
      <div className="container-shell flex min-h-16 items-center justify-between gap-3 py-3">
        <Logo priority />
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...('external' in link && link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background/60 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            href={apifyHref}
            disabled={!apifyReady}
            className="hidden shrink-0 lg:inline-flex"
            {...(apifyReady ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            title={apifyReady ? undefined : 'Apify Actor URL coming soon'}
          >
            Run on Apify
          </Button>
          <button
            type="button"
            className={cn(
              'inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border transition-colors hover:border-primary hover:text-primary lg:hidden',
              open && 'border-primary bg-background text-primary',
            )}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>
      {open ? (
        <div id={menuId} className="animate-slide-down border-t border-border bg-surface lg:hidden">
          <nav aria-label="Mobile" className="container-shell flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                {...('external' in link && link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="rounded-md px-3 py-3 text-base font-medium text-text transition-colors hover:bg-background hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <Button
              href={apifyHref}
              disabled={!apifyReady}
              className="mt-2"
              onClick={closeMenu}
              {...(apifyReady ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              title={apifyReady ? undefined : 'Apify Actor URL coming soon'}
            >
              Run on Apify
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

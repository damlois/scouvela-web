'use client';

import { useEffect, useId, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { Button } from '@/components/ui/Button';
import { GITHUB_URL, getApifyHref, isApifyConfigured } from '@/lib/links';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#what-it-finds', label: 'What it finds' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#output', label: 'Output' },
  { href: '#ai', label: 'AI' },
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
      setScrolled(window.scrollY > 8);
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

  const externalProps = (link: (typeof navLinks)[number]) =>
    'external' in link && link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled || open
          ? 'border-white/10 bg-ink shadow-[0_8px_30px_-12px_rgba(6,35,32,0.5)]'
          : 'border-transparent bg-transparent',
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-teal-deep"
      >
        Skip to main content
      </a>
      <div className="container-shell flex h-16 items-center justify-between gap-3">
        <Logo priority />
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...externalProps(link)}
              className="rounded-full px-4 py-2 text-sm font-semibold text-white/65 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            href={apifyHref}
            disabled={!apifyReady}
            className="hidden min-h-9 shrink-0 px-4 py-2 lg:inline-flex"
            {...(apifyReady ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            title={apifyReady ? undefined : 'Apify Actor URL coming soon'}
          >
            Run on Apify
          </Button>
          <button
            type="button"
            className={cn(
              'inline-flex min-h-10 min-w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/5 hover:text-teal-bright lg:hidden',
              open && 'bg-white/5 text-teal-bright',
            )}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>
      {open ? (
        <div
          id={menuId}
          className="animate-slide-down border-t border-white/10 bg-ink lg:hidden"
        >
          <nav aria-label="Mobile" className="container-shell flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                {...externalProps(link)}
                className="flex items-center justify-between rounded-2xl px-3 py-3 font-display text-xl font-bold text-white transition-colors hover:bg-white/5 hover:text-teal-bright"
              >
                {link.label}
              </a>
            ))}
            <Button
              href={apifyHref}
              disabled={!apifyReady}
              className="mt-3 h-12"
              onClick={closeMenu}
              {...(apifyReady ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              title={apifyReady ? undefined : 'Apify Actor URL coming soon'}
            >
              Run on Apify
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

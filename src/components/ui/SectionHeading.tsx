import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  /** Words highlighted with the teal colour and orange swoosh after the title. */
  accent?: ReactNode;
  children?: ReactNode;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  accent,
  children,
  tone = 'light',
  align = 'left',
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark';

  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      <Badge tone={tone}>{eyebrow}</Badge>
      <h2
        className={cn(
          'mt-5 text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl',
          dark ? 'text-white' : 'text-text',
        )}
      >
        {title}
        {accent ? (
          <>
            {' '}
            <span className={cn('accent-mark', dark ? 'text-teal-bright' : 'text-teal-deep')}>
              {accent}
            </span>
          </>
        ) : null}
      </h2>
      {children ? (
        <div
          className={cn(
            'mt-5 text-lg leading-relaxed',
            align === 'center' && 'mx-auto max-w-2xl',
            dark ? 'text-white/65' : 'text-muted',
          )}
        >
          {children}
        </div>
      ) : null}
    </Reveal>
  );
}

export function Badge({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <span
      className={cn(
        'badge',
        tone === 'dark'
          ? 'border-white/15 bg-white/5 text-white/80'
          : 'border-teal/25 bg-teal/[0.07] text-teal-deep',
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sun" />
      {children}
    </span>
  );
}

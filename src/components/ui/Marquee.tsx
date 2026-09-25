import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type MarqueeProps = {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
};

/** Infinite horizontal ticker. Content is rendered twice so the loop is seamless. */
export function Marquee({ children, reverse = false, duration = 40, className }: MarqueeProps) {
  return (
    <div
      className={cn('marquee flex overflow-hidden [--gap:1rem]', className)}
      style={{ ['--duration' as string]: `${duration}s` }}
    >
      <div
        className="animate-marquee flex w-max shrink-0 gap-[var(--gap)]"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        <div className="flex shrink-0 gap-[var(--gap)]">{children}</div>
        <div className="flex shrink-0 gap-[var(--gap)]" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type OpportunityChipProps = {
  children: ReactNode;
  className?: string;
  tone?: 'opportunity' | 'source';
};

export function OpportunityChip({
  children,
  className,
  tone = 'opportunity',
}: OpportunityChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm',
        tone === 'opportunity'
          ? 'border-primary/15 bg-surface/95 text-text'
          : 'border-accent/25 bg-surface/90 text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}

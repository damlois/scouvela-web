import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  href?: string | null;
  className?: string;
  priority?: boolean;
  tone?: 'dark' | 'light';
};

/** Mark + wordmark. `tone` is the surface it sits on. */
export function Logo({ href = '/', className, priority = false, tone = 'dark' }: LogoProps) {
  const content = (
    <span className={cn('group flex items-center gap-2', className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white p-1.5 ring-1 ring-black/5 transition-transform duration-300 group-hover:rotate-[-8deg]">
        <Image
          src="/images/scouvela-mark.png"
          alt=""
          width={32}
          height={32}
          priority={priority}
          className="h-full w-full object-contain"
        />
      </span>
      <span
        className={cn(
          'font-display text-xl font-extrabold tracking-tight',
          tone === 'dark' ? 'text-white' : 'text-text',
        )}
      >
        Scouvela
      </span>
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} aria-label="Scouvela home" className="rounded-md">
      {content}
    </Link>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  href?: string | null;
  className?: string;
  priority?: boolean;
  variant?: 'wordmark' | 'mark';
};

const wordmarkSize = { width: 168, height: 40 };
const markSize = { width: 40, height: 40 };

export function Logo({
  href = '/',
  className,
  priority = false,
  variant = 'wordmark',
}: LogoProps) {
  const isMark = variant === 'mark';
  const image = (
    <Image
      src={isMark ? '/images/scouvela-mark.png' : '/images/scouvela-wordmark.png'}
      alt="Scouvela"
      width={isMark ? markSize.width : wordmarkSize.width}
      height={isMark ? markSize.height : wordmarkSize.height}
      className={cn(
        isMark ? 'h-9 w-9 object-contain' : 'h-8 w-auto max-w-[11.5rem] sm:h-9 sm:max-w-[13.5rem]',
        className,
      )}
      priority={priority}
    />
  );

  if (!href) {
    return image;
  }

  return (
    <Link href={href} className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
      {image}
    </Link>
  );
}

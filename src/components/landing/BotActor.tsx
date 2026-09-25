import { cn } from '@/lib/utils';

type BotActorProps = {
  className?: string;
  /** Unique prefix for SVG gradient ids when several bots share a page. */
  id?: string;
};

/**
 * Scouvela's mascot: a happy robot "Actor" that jumps for joy every time it finds an
 * opportunity. Built in the bold versions of the logo colours — teal body, and the
 * logo's orange dot reborn as its antenna. All motion lives in globals.css (.bot-*).
 */
export function BotActor({ className, id = 'bot' }: BotActorProps) {
  const ref = (name: string) => `url(#${id}-${name})`;

  return (
    <div className={cn('bot', className)} aria-hidden="true">
      <svg viewBox="0 0 360 420" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3ce6c2" />
            <stop offset="0.55" stopColor="#14b89a" />
            <stop offset="1" stopColor="#0c8f78" />
          </linearGradient>
          <linearGradient id={`${id}-limb`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#14b89a" />
            <stop offset="1" stopColor="#0a7d68" />
          </linearGradient>
          <linearGradient id={`${id}-visor`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#15201e" />
            <stop offset="1" stopColor="#070c0b" />
          </linearGradient>
          <radialGradient id={`${id}-sun`} cx="0.35" cy="0.35" r="0.7">
            <stop offset="0" stopColor="#ffd27a" />
            <stop offset="0.5" stopColor="#f5a623" />
            <stop offset="1" stopColor="#d98a0a" />
          </radialGradient>
          <radialGradient id={`${id}-ground`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#14b89a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#14b89a" stopOpacity="0" />
          </radialGradient>
          <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ground glow — shrinks as the bot leaves the floor. */}
        <ellipse className="bot-shadow" cx="180" cy="394" rx="96" ry="16" fill={ref('ground')} />

        {/* Celebration sparkles, popping at the top of each jump. */}
        <g>
          <path
            className="bot-spark"
            style={{ animationDelay: '0s' }}
            d="M58 150 l5 -14 l5 14 l14 5 l-14 5 l-5 14 l-5 -14 l-14 -5 z"
            fill="#f5a623"
          />
          <path
            className="bot-spark"
            style={{ animationDelay: '0.08s' }}
            d="M296 118 l4 -11 l4 11 l11 4 l-11 4 l-4 11 l-4 -11 l-11 -4 z"
            fill="#3ce6c2"
          />
          <path
            className="bot-spark"
            style={{ animationDelay: '0.16s' }}
            d="M312 232 l3 -8 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 z"
            fill="#f5a623"
          />
          <circle className="bot-spark" style={{ animationDelay: '0.12s' }} cx="80" cy="238" r="5" fill="#3ce6c2" />
          <circle className="bot-spark" style={{ animationDelay: '0.04s' }} cx="256" cy="46" r="4" fill="#f5a623" />
          <circle className="bot-spark" style={{ animationDelay: '0.2s' }} cx="104" cy="60" r="3.5" fill="#ffffff" />
        </g>

        <g className="bot-jump">
          {/* Legs + sneakers */}
          <g>
            <rect x="148" y="310" width="22" height="50" rx="11" fill={ref('limb')} />
            <rect x="190" y="310" width="22" height="50" rx="11" fill={ref('limb')} />
            <path d="M136 372 q0 -18 22 -18 q20 0 22 18 z" fill="#effdf9" />
            <path d="M180 372 q2 -18 22 -18 q22 0 22 18 z" fill="#effdf9" />
            <rect x="134" y="368" width="48" height="8" rx="4" fill="#f5a623" />
            <rect x="178" y="368" width="48" height="8" rx="4" fill="#f5a623" />
          </g>

          {/* Left arm (viewer's left) */}
          <g className="bot-arm-l">
            <rect x="116" y="240" width="20" height="62" rx="10" fill={ref('limb')} />
            <circle cx="126" cy="306" r="15" fill="#effdf9" />
            <circle cx="120" cy="301" r="4" fill="#ffffff" opacity="0.9" />
          </g>

          {/* Right arm */}
          <g className="bot-arm-r">
            <rect x="224" y="240" width="20" height="62" rx="10" fill={ref('limb')} />
            <circle cx="234" cy="306" r="15" fill="#effdf9" />
            <circle cx="228" cy="301" r="4" fill="#ffffff" opacity="0.9" />
          </g>

          {/* Body */}
          <rect x="116" y="212" width="128" height="112" rx="42" fill={ref('body')} />
          <rect x="128" y="220" width="40" height="10" rx="5" fill="#ffffff" opacity="0.28" />

          {/* Chest screen with the Scouvela swoosh + orange dot */}
          <rect x="144" y="240" width="72" height="60" rx="18" fill={ref('visor')} />
          <path
            d="M197 258 C 178 250, 160 258, 168 268 C 176 277, 198 272, 196 284 C 194 294, 172 294, 162 288"
            fill="none"
            stroke="#3ce6c2"
            strokeWidth="7"
            strokeLinecap="round"
            filter={ref('glow')}
          />
          <circle cx="204" cy="252" r="5.5" fill="#f5a623" />

          {/* Head */}
          <g className="bot-head">
            {/* Antenna, topped with the logo's orange dot */}
            <g className="bot-antenna">
              <rect x="176" y="62" width="8" height="40" rx="4" fill="#0a7d68" />
              <circle className="bot-antenna-glow" cx="180" cy="54" r="15" fill="#f5a623" opacity="0.5" />
              <circle cx="180" cy="54" r="15" fill={ref('sun')} />
              <circle cx="175" cy="49" r="4.5" fill="#ffffff" opacity="0.75" />
            </g>

            {/* Ears */}
            <rect x="84" y="140" width="22" height="44" rx="11" fill="#0a7d68" />
            <rect x="254" y="140" width="22" height="44" rx="11" fill="#0a7d68" />
            <circle cx="95" cy="162" r="5" fill="#3ce6c2" />
            <circle cx="265" cy="162" r="5" fill="#3ce6c2" />

            <rect x="98" y="94" width="164" height="128" rx="54" fill={ref('body')} />
            <path
              d="M130 110 q 22 -12 52 -10"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.35"
              strokeWidth="7"
              strokeLinecap="round"
            />

            {/* Face visor */}
            <rect x="116" y="120" width="128" height="84" rx="36" fill={ref('visor')} />
            <rect x="116" y="120" width="128" height="84" rx="36" fill="none" stroke="#0a7d68" strokeWidth="3" />

            {/* Eyes */}
            <g filter={ref('glow')}>
              <ellipse className="bot-eye" cx="156" cy="156" rx="10" ry="13" fill="#3ce6c2" />
              <ellipse className="bot-eye" cx="204" cy="156" rx="10" ry="13" fill="#3ce6c2" />
            </g>
            <circle cx="159" cy="151" r="3.5" fill="#ffffff" />
            <circle cx="207" cy="151" r="3.5" fill="#ffffff" />

            {/* Big happy smile */}
            <path d="M164 178 Q180 196 196 178 Z" fill="#3ce6c2" filter={ref('glow')} />
            <path d="M172 186 Q180 191 188 186" fill="none" stroke="#0a7d68" strokeWidth="3" strokeLinecap="round" />

            {/* Cheeks */}
            <ellipse cx="134" cy="182" rx="9" ry="6" fill="#f5a623" opacity="0.8" />
            <ellipse cx="226" cy="182" rx="9" ry="6" fill="#f5a623" opacity="0.8" />
          </g>
        </g>
      </svg>
    </div>
  );
}

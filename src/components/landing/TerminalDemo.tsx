'use client';

import { useEffect, useRef, useState } from 'react';

type Line = { text: string; className: string };

const script: Line[] = [
  { text: '$ apify call scouvela', className: 'text-white' },
  { text: '› reading official websites…', className: 'text-white/50' },
  { text: '› reading public social posts…', className: 'text-white/50' },
  { text: '✓ opportunity found', className: 'text-teal-bright' },
  { text: '{', className: 'text-white/70' },
  { text: '  "title": "Women-led SME Growth Programme",', className: 'text-white/80' },
  { text: '  "provider": "Example Foundation",', className: 'text-white/80' },
  { text: '  "opportunityType": "grant",', className: 'text-sun' },
  { text: '  "countries": ["Nigeria"],', className: 'text-white/80' },
  { text: '  "deadline": "2026-10-30",', className: 'text-sun' },
  { text: '  "applicationUrl": "https://example.org/apply",', className: 'text-teal-bright' },
  { text: '  "sourcePlatform": "website",', className: 'text-white/80' },
  { text: '  "verificationStatus": "official-source"', className: 'text-teal-bright' },
  { text: '}', className: 'text-white/70' },
];

const CHAR_MS = 18;
const LINE_PAUSE_MS = 180;
const LOOP_PAUSE_MS = 3200;

/** A fake terminal that types out an illustrative Scouvela run, then loops. */
export function TerminalDemo() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const started = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !started.current) {
        started.current = true;
        setInView(true);
        observer.disconnect();
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const current = script[lineIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!current) {
      timer = setTimeout(() => {
        setLineIndex(0);
        setCharIndex(0);
      }, LOOP_PAUSE_MS);
    } else if (charIndex < current.text.length) {
      timer = setTimeout(() => setCharIndex((c) => c + 1), CHAR_MS);
    } else {
      timer = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, LINE_PAUSE_MS);
    }
    return () => clearTimeout(timer);
  }, [inView, reducedMotion, lineIndex, charIndex]);

  const done = reducedMotion || lineIndex >= script.length;
  const visibleLines = done ? script.length : lineIndex;

  return (
    <figure
      ref={containerRef}
      className="overflow-hidden rounded-3xl border border-ink-line bg-ink shadow-[0_30px_80px_-30px_rgba(6,35,32,0.6)]"
    >
      <figcaption className="flex items-end gap-1 border-b border-ink-line bg-ink-2 px-3 pt-3">
        <span className="flex items-center gap-2 rounded-t-xl bg-ink px-4 py-2 text-xs font-semibold text-white">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-teal-bright" />
          dataset_item.json
        </span>
        <span className="px-3 py-2 text-xs font-semibold text-white/35">run.log</span>
        <span className="mb-2 ml-auto rounded-full bg-sun/15 px-2.5 py-0.5 text-[11px] font-bold text-sun">
          Illustrative
        </span>
      </figcaption>
      <pre
        className="min-h-[23rem] overflow-x-auto p-5 font-mono text-[12px] leading-6 sm:text-[13px]"
        aria-label="Example Scouvela output record"
      >
        <code>
          {script.slice(0, visibleLines).map((line, i) => (
            <span key={i} className={`block ${line.className}`}>
              {line.text}
            </span>
          ))}
          {!done && script[lineIndex] ? (
            <span className={`block ${script[lineIndex].className}`}>
              {script[lineIndex].text.slice(0, charIndex)}
              <span className="animate-blink ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-sun" />
            </span>
          ) : (
            <span className="animate-blink mt-1 inline-block h-4 w-0.5 bg-sun" />
          )}
        </code>
      </pre>
      <p className="border-t border-ink-line px-5 py-3 text-xs text-white/40">
        Example only — not a real current opportunity.
      </p>
    </figure>
  );
}

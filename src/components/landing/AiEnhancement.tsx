import { KeyRound, ShieldCheck, Sparkles, Wallet, Wand2 } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const points = [
  { label: 'Bring your own key (BYOK) for supported LLM providers', icon: KeyRound },
  { label: 'AI credentials stay as secret Actor input', icon: ShieldCheck },
  { label: 'You pay your AI provider separately', icon: Wallet },
  { label: 'Scraped facts remain separate from AI interpretation', icon: Sparkles },
  { label: 'AI does not invent missing deadlines or application links', icon: Wand2 },
] as const;

export function AiEnhancement() {
  return (
    <section id="ai" className="section-space scroll-mt-16 bg-white">
      <div className="container-shell">
        <SectionHeading eyebrow="Optional AI" title="Useful without AI." accent="Smarter when you enable it.">
          Scouvela works as a standard scraper without an AI key. Add your own supported LLM key to
          classify ambiguous announcements, summarize opportunities and rank matches against a
          business profile.
        </SectionHeading>

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="relative overflow-hidden rounded-3xl bg-ink p-8 text-white">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal/25 blur-3xl"
            />
            <p className="text-sm font-bold text-white/50">Two modes</p>
            <div className="relative mt-6 space-y-5">
              <div className="rounded-2xl border border-ink-line bg-ink-2 p-5">
                <p className="font-mono text-xs text-white/50">ai: off</p>
                <p className="mt-1 text-lg font-bold">Clean, structured scraping</p>
                <p className="mt-1 text-sm text-white/55">Extracted facts, source links, verification flags.</p>
              </div>
              <div className="rounded-2xl border border-teal/40 bg-teal/10 p-5">
                <p className="font-mono text-xs text-teal-bright">ai: on · your key</p>
                <p className="mt-1 text-lg font-bold">
                  + classify, summarize, <span className="text-teal-bright">match</span>
                </p>
                <p className="mt-1 text-sm text-white/55">Ranked against your business profile.</p>
              </div>
            </div>
          </Reveal>

          <ul className="grid gap-3 sm:grid-cols-2">
            {points.map((point, index) => {
              const Icon = point.icon;
              return (
                <Reveal
                  as="li"
                  key={point.label}
                  delay={index * 70}
                  className={index === points.length - 1 ? 'sm:col-span-2' : undefined}
                >
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-border p-5 transition-colors hover:border-teal/40">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal-deep">
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="text-[15px] leading-snug text-text">{point.label}</span>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

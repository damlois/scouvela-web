const points = [
  'Bring your own key (BYOK) for supported LLM providers',
  'AI credentials stay as secret Actor input',
  'You pay your AI provider separately',
  'Scraped facts remain separate from AI interpretation',
  'AI does not invent missing deadlines or application links',
] as const;

export function AiEnhancement() {
  return (
    <section className="section-space border-y border-border bg-background">
      <div className="container-shell max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Useful without AI. Smarter when you enable it.
        </h2>
        <p className="mt-4 text-base leading-7 text-muted">
          Scouvela works as a standard scraper without an AI key. Users can optionally provide their
          own supported LLM key to classify ambiguous announcements, summarize opportunities and
          rank matches against a business profile.
        </p>
        <ul className="mt-6 space-y-3">
          {points.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-6 text-muted">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

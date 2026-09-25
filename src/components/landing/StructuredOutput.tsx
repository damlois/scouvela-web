const sampleRecord = `{
  "title": "Women-led SME Growth Programme",
  "provider": "Example Foundation",
  "opportunityType": "grant",
  "countries": ["Nigeria"],
  "deadline": "2026-10-30",
  "applicationUrl": "https://example.org/apply",
  "sourcePlatform": "website",
  "verificationStatus": "official-source"
}`;

const points = [
  'Consistent fields across opportunity types',
  'Original source links preserved on every record',
  'Deadline and eligibility extraction where available',
  'Verification warnings when details are incomplete',
  'JSON and CSV export through Apify Datasets',
] as const;

export function StructuredOutput() {
  return (
    <section className="section-space bg-surface">
      <div className="container-shell grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Structured output you can automate on.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Scattered announcements become normalized, source-linked records ready for export,
            pipelines or downstream AI workflows.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-6 text-muted">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <figure className="overflow-hidden rounded-xl border border-border bg-[#0f1a17] shadow-sm">
          <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-accent">
              Illustrative output
            </span>
            <span className="text-xs text-white/50">Apify Dataset item</span>
          </figcaption>
          <pre className="overflow-x-auto p-4 text-xs leading-6 text-emerald-100/90 sm:text-sm">
            <code>{sampleRecord}</code>
          </pre>
          <p className="border-t border-white/10 px-4 py-3 text-xs text-white/55">
            Example only — not a real current opportunity.
          </p>
        </figure>
      </div>
    </section>
  );
}

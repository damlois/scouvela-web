const steps = [
  {
    number: '1',
    title: 'Discover',
    description:
      'Scouvela reads selected public websites, application pages and supported public social URLs.',
  },
  {
    number: '2',
    title: 'Understand',
    description:
      'It identifies genuine opportunities, extracts important details and checks what information is missing.',
  },
  {
    number: '3',
    title: 'Deliver',
    description:
      'It returns normalized, source-linked records through an Apify Dataset for export, automation or AI workflows.',
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-space scroll-mt-24 border-y border-border bg-background">
      <div className="container-shell">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            From internet noise to usable opportunity data.
          </h2>
        </div>
        <ol className="mt-10 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              {index < steps.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="absolute left-[2.25rem] top-10 hidden h-px w-[calc(100%-1rem)] bg-border lg:block"
                />
              ) : null}
              <div className="relative rounded-xl border border-border bg-surface p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-text">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

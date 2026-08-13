const swatches = [
  { name: "Ink", className: "bg-asoebi-ink text-asoebi-paper" },
  { name: "Ivory", className: "bg-asoebi-ivory text-asoebi-ink" },
  { name: "Purple", className: "bg-brand text-white" },
  { name: "Gold", className: "bg-accent text-asoebi-ink" },
] as const;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-canvas-light px-6 py-16 text-asoebi-ink sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between gap-20">
        <header className="flex items-center justify-between border-b border-asoebi-stone pb-5">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase">
            Asoebi Fashion Week
          </p>
          <span className="text-xs text-asoebi-graphite">Design foundation</span>
        </header>

        <section aria-labelledby="foundation-heading" className="max-w-5xl">
          <p className="mb-6 text-sm font-semibold tracking-[0.18em] text-brand uppercase">
            Editorial fashion · culture · celebration
          </p>
          <h1
            id="foundation-heading"
            className="text-5xl leading-[0.92] font-semibold tracking-[-0.05em] text-balance sm:text-7xl lg:text-9xl"
          >
            The global home of Asoebi.
          </h1>
        </section>

        <section aria-labelledby="palette-heading">
          <h2 id="palette-heading" className="sr-only">
            Core color palette
          </h2>
          <ul className="grid gap-px overflow-hidden border border-asoebi-stone bg-asoebi-stone sm:grid-cols-2 lg:grid-cols-4">
            {swatches.map((swatch) => (
              <li
                key={swatch.name}
                className={`${swatch.className} flex aspect-[4/3] items-end p-5 text-sm font-semibold tracking-[0.12em] uppercase`}
              >
                {swatch.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

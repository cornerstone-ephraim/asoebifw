import Link from "next/link";

export function DesignSystemHero() {
  return (
    <header id="overview" className="px-5 pt-12 pb-4 sm:px-8 lg:px-12 lg:pt-16">
      <p className="mb-5 text-xs font-semibold tracking-widest text-brand uppercase">
        Getting started
      </p>
      <h1 className="max-w-2xl font-display text-4xl leading-tight tracking-tight sm:text-5xl">
        Designing for Asoebi.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-asoebi-graphite">
        The foundations, components and patterns behind Asoebi Fashion Week. Use
        this reference to build experiences that feel consistent, expressive and
        easy to use.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Link
          href="/internal/design-system/principles"
          className="inline-flex min-h-11 items-center gap-3 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-deep"
        >
          Start with the principles <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/internal/design-system/inputs"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand hover:underline"
        >
          Explore components <span aria-hidden="true">→</span>
        </Link>
      </div>
      <p className="mt-10 border-l-2 border-brand bg-asoebi-purple-50 px-5 py-4 text-sm leading-7 text-asoebi-graphite">
        This reference documents the website as implemented. Examples use the
        same fonts, colour tokens and shared components as the public
        experience.
      </p>
    </header>
  );
}

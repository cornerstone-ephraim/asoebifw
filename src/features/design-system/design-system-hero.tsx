import Image from "next/image";
import Link from "next/link";

export function DesignSystemHero() {
  return (
    <header
      id="overview"
      className="bg-asoebi-purple-950 px-5 py-14 text-white lg:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-375">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/25 pb-5 text-sm">
          <p>AEFW · Design reference</p>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-3 text-asoebi-gold-300 underline underline-offset-4"
          >
            Visit the website <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-300 uppercase">
              Identity in practice
            </p>
            <h1 className="mt-6 font-display text-[clamp(3.5rem,8vw,8rem)] leading-[.9] tracking-[-.06em]">
              Asoebi,
              <br />
              <span className="text-asoebi-gold-300">by design.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/80">
              The visual language of Asoebi Fashion Week. Explore the decisions,
              inspect the details and try the components that bring it to life.
            </p>
            <a
              href="#typography"
              className="mt-8 inline-flex min-h-13 items-center gap-4 rounded-full bg-asoebi-gold-300 px-6 text-sm font-bold text-asoebi-purple-950"
            >
              Explore the system <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div>
            <div className="relative aspect-4/3 overflow-hidden rounded-4xl bg-brand-deep">
              <Image
                src="/images/editorial/asoebi-founders-hero.webp"
                alt="Purple Aso Oke fabric and coordinated textile samples on a studio worktable"
                fill
                preload
                quality={90}
                sizes="(min-width:1580px) 620px, (min-width:1024px) 42vw, 90vw"
                className="object-cover"
              />
            </div>
            <div
              className="mt-5 flex flex-wrap gap-3"
              aria-label="Core palette"
            >
              {[
                ["bg-asoebi-ivory", "Ivory"],
                ["bg-asoebi-mist", "Lilac"],
                ["bg-brand", "Violet"],
                ["bg-asoebi-gold-300", "Gold"],
              ].map(([color, name]) => (
                <span key={name} className="flex items-center gap-2 text-xs">
                  <span
                    className={`size-4 rounded-full border border-white/20 ${color}`}
                  />
                  {name}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Material, character and clarity. A reference for the website as
              implemented, with examples you can use.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

import type { Metadata } from "next";
import Image from "next/image";

import { ArrowLink } from "@/components/ui/arrow-link";
import { FounderDisclosures } from "@/features/founders/founder-disclosures";
import { createMetadata } from "@/lib/seo";

const brandPillars = [
  {
    title: "Boldly African",
    copy: "Proudly rooted in African heritage and expression.",
  },
  {
    title: "Fashion forward",
    copy: "Setting trends, shaping culture and inspiring the future.",
  },
  {
    title: "Community driven",
    copy: "Uniting designers, brands and fashion lovers worldwide.",
  },
  {
    title: "Globally relevant",
    copy: "A local heartbeat with a global impact.",
  },
] as const;

const values = [
  {
    title: "Authenticity",
    copy: "We stay true to our roots and celebrate our unique identity.",
  },
  {
    title: "Excellence",
    copy: "We are committed to quality, creativity and world-class execution.",
  },
  {
    title: "Inclusivity",
    copy: "We welcome diverse voices and champion representation.",
  },
  {
    title: "Innovation",
    copy: "We embrace new ideas and push creative boundaries.",
  },
  {
    title: "Impact",
    copy: "We create meaningful experiences that inspire and empower.",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Founders and Vision",
  description:
    "Discover the founding vision, mission and values shaping Asoebi Fashion Week as a global platform for African fashion and culture.",
  path: "/founders",
  keywords: [
    "Asoebi Fashion Week founders",
    "AEFW vision",
    "African fashion platform",
  ],
});

export default function Page() {
  return (
    <main id="main-content" className="bg-asoebi-paper">
      <header className="bg-asoebi-ivory px-5 pt-32 pb-12 text-asoebi-purple-950 lg:px-10 lg:pt-36 lg:pb-16">
        <div className="mx-auto max-w-400">
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            Founders &amp; vision
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[.95] tracking-[-.06em] sm:text-7xl">
            Meet the founders.
          </h1>
          <section
            id="founders"
            aria-label="The founders"
            className="scroll-mt-28"
          >
            <FounderDisclosures />
          </section>
        </div>
      </header>

      <div className="mx-auto max-w-400 px-5 py-16 lg:px-10 lg:py-24">
        <section aria-labelledby="shared-vision-heading">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-16">
            <h2
              id="shared-vision-heading"
              className="max-w-[14ch] font-display text-6xl leading-[.9] tracking-[-.06em] sm:text-8xl"
            >
              Rooted in craft. Open to the world.
            </h2>
            <p className="max-w-lg text-lg leading-8 text-asoebi-graphite">
              Keniye Koroye and Abiola Orimolade bring together design,
              technology and fashion entrepreneurship to create opportunities
              for African talent.
            </p>
          </div>
          <div className="relative mt-10 aspect-3/2 overflow-hidden lg:mt-14 lg:aspect-12/5">
            <Image
              src="/images/editorial/asoebi-founders-hero.webp"
              alt="An artisan refining an embroidered Asoebi garment in a fashion studio"
              fill
              sizes="(min-width: 1600px) 1520px, (min-width: 1024px) calc(100vw - 80px), 160vw"
              quality={90}
              className="object-cover object-center"
            />
          </div>
        </section>

        <section className="grid gap-10 pt-16 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <h2 className="font-display text-6xl leading-[.88] tracking-[-.06em] sm:text-8xl">
            Where culture meets catwalk.
          </h2>
          <p className="max-w-xl text-lg leading-8 text-asoebi-graphite">
            The founding idea is clear: celebrate, elevate and connect African
            designers and fashion communities through world-class events,
            content and experiences.
          </p>
        </section>

        <section className="mt-24 grid border-y border-asoebi-purple-950/25 lg:grid-cols-2">
          <article className="py-10 lg:border-r lg:border-asoebi-purple-950/25 lg:pr-12">
            <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
              Vision
            </p>
            <h2 className="mt-5 font-display text-5xl leading-[.92] tracking-[-.055em] sm:text-6xl">
              A world-class movement for African fashion.
            </h2>
            <p className="mt-7 max-w-xl leading-7 text-asoebi-graphite">
              To be the leading global platform for African fashion and culture,
              transforming Asoebi into a world-class movement.
            </p>
          </article>
          <article className="py-10 lg:pl-12">
            <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
              Mission
            </p>
            <h2 className="mt-5 font-display text-5xl leading-[.92] tracking-[-.055em] sm:text-6xl">
              Connect creativity with opportunity.
            </h2>
            <p className="mt-7 max-w-xl leading-7 text-asoebi-graphite">
              To celebrate, elevate and connect African designers and fashion
              communities through world-class events, content and experiences.
            </p>
          </article>
        </section>

        <section className="mt-24">
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            Brand essence
          </p>
          <div className="mt-8 border-y border-asoebi-purple-950/25">
            {brandPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="grid gap-4 border-b border-asoebi-purple-950/20 py-8 last:border-b-0 md:grid-cols-[.75fr_1.25fr] md:items-baseline"
              >
                <h2 className="font-display text-4xl tracking-[-.05em] sm:text-5xl">
                  {pillar.title}
                </h2>
                <p className="max-w-xl text-lg leading-8 text-asoebi-graphite">
                  {pillar.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-24 overflow-hidden bg-asoebi-purple-950 text-white">
          <div className="grid lg:grid-cols-[1.1fr_.9fr]">
            <div className="grid min-h-144">
              <div className="relative">
                <Image
                  src="/images/editorial/fashion-story/asoebi-founders.webp"
                  alt="Models presenting contemporary African fashion on a runway"
                  fill
                  sizes="(min-width: 1680px) 880px, (min-width: 1024px) max(55vw, 700px), max(100vw, 576px)"
                  quality={90}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-300 uppercase">
                Our values
              </p>
              <div className="mt-7 border-t border-white/25">
                {values.map((value) => (
                  <article
                    key={value.title}
                    className="border-b border-white/25 py-5"
                  >
                    <h2 className="font-display text-3xl tracking-[-.04em]">
                      {value.title}
                    </h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-white/70">
                      {value.copy}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 grid gap-8 border-t border-asoebi-purple-950/25 pt-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <h2 className="font-display text-6xl leading-[.88] tracking-[-.06em] sm:text-8xl">
            Proud in culture. Clear in purpose.
          </h2>
          <div>
            <p className="max-w-xl leading-7 text-asoebi-graphite">
              AEFW speaks with confidence and warmth, pairing cultural pride
              with a contemporary, globally minded point of view.
            </p>
            <div className="mt-8">
              <ArrowLink href="/#waitlist">Join the AEFW community</ArrowLink>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

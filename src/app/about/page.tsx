import type { Metadata } from "next";
import Image from "next/image";

import { EditorialPage } from "@/components/layout/editorial-page";
import { ArrowLink } from "@/components/ui/arrow-link";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About Asoebi Fashion Week",
  description:
    "Discover the vision behind Asoebi Fashion Week and its year-round platform for African fashion, culture, commerce and celebration.",
  path: "/about",
  keywords: ["Asoebi vision", "African fashion platform", "Asoebi partners"],
});

const pillars = [
  {
    title: "Fashion",
    copy: "A global showcase for African textiles, craftsmanship and creativity.",
  },
  {
    title: "Commerce",
    copy: "A year-round connection between trusted suppliers, designers and buyers.",
  },
  {
    title: "Celebration",
    copy: "Awards, networking and culture brought together in one global home.",
  },
] as const;

export default function Page() {
  return (
    <EditorialPage
      eyebrow="Vision · People · Partnership"
      title="About Asoebi"
      intro="Asoebi Fashion Week is a year-round global platform for fashion, culture, awards, networking, commerce and African cultural celebration."
      heroImage="/images/editorial/home-hero.png"
      heroImageAlt="Asoebi fashion presented through contemporary African occasionwear"
      heroTone="mist"
    >
      <section className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
          Our vision
        </p>
        <h2 className="font-display text-5xl leading-[.9] tracking-[-.055em] sm:text-7xl lg:text-8xl">
          The global home of Asoebi fashion, culture and celebration.
        </h2>
      </section>

      <section className="mt-24 border-y border-asoebi-purple-950/25">
        {pillars.map((pillar) => (
          <article
            key={pillar.title}
            className="grid gap-5 border-b border-asoebi-purple-950/20 py-9 last:border-b-0 md:grid-cols-[.7fr_1.3fr] md:items-baseline"
          >
            <h3 className="font-display text-5xl tracking-[-.055em] sm:text-6xl">
              {pillar.title}
            </h3>
            <p className="max-w-2xl text-lg leading-8 text-asoebi-graphite">
              {pillar.copy}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-24 grid bg-asoebi-mist lg:grid-cols-[1.15fr_.85fr]">
        <div className="relative min-h-120">
          <Image
            src="/images/waitlist-collage.png"
            alt="A collage representing the Asoebi Fashion Week community"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            People and partnership
          </p>
          <h2 className="mt-5 font-display text-5xl leading-[.92] tracking-[-.05em] sm:text-6xl">
            Built with the people moving African fashion forward.
          </h2>
          <p className="mt-7 max-w-lg leading-7 text-asoebi-graphite">
            The organizing team, partners and sponsors shape a platform that
            connects fashion, awards, commerce and celebration.
          </p>
          <div className="mt-8">
            <ArrowLink href="/#waitlist">Join as a partner</ArrowLink>
          </div>
        </div>
      </section>
    </EditorialPage>
  );
}

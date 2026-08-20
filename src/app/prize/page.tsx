import type { Metadata } from "next";

import { EditorialPage } from "@/components/layout/editorial-page";
import { PrizeCountdown } from "@/features/prize/prize-countdown";
import { PrizeApplicationForm } from "@/features/prize/prize-application-form";
import { createMetadata } from "@/lib/seo";

const categories = [
  "Best Designer",
  "Best Wedding Asoebi",
  "Best Innovative Fabric Design",
] as const;
const features = [
  "Public vote",
  "Judges panel",
  "Prize fund and benefits",
] as const;
const prizes = [
  {
    place: "First place",
    reward: "₦10m",
    description: "The premier award for the winning entry.",
    color: "bg-asoebi-purple-950 text-white",
  },
  {
    place: "Second place",
    reward: "Fashion internship",
    description: "Industry experience for the second-place finalist.",
    color: "bg-asoebi-blush text-asoebi-purple-950",
  },
  {
    place: "Third place",
    reward: "Free fashion course",
    description: "Continued fashion learning for the third-place finalist.",
    color: "bg-asoebi-gold-300 text-asoebi-purple-950",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Asoebi Prize",
  description:
    "The premier annual award celebrating creativity in African fashion, with ₦10m, a fashion internship and a free fashion course for the top three places.",
  path: "/prize",
  keywords: [
    "African fashion award",
    "Asoebi Prize application",
    "₦10m fashion prize",
  ],
});

export default function Page() {
  return (
    <EditorialPage
      eyebrow="Recognition · Creativity · Opportunity"
      title="Asoebi Prize"
      intro="The premier annual award celebrating creativity in African fashion."
      heroImage="/images/waitlist/designer-card-illustration.png"
      heroImageAlt="An editorial illustration of an African fashion designer and her work"
      cta={{ href: "#apply", label: "Apply for the prize" }}
    >
      <section className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
        <h2 className="font-display text-6xl leading-[.88] tracking-[-.06em] sm:text-8xl">
          A prize designed to move talent forward.
        </h2>
        <p className="max-w-xl text-lg leading-8 text-asoebi-graphite">
          The Asoebi Prize brings public voting, a judges panel and meaningful
          benefits together to celebrate African fashion creativity.
        </p>
      </section>

      <section
        aria-labelledby="prize-countdown-heading"
        className="mt-16 grid gap-7 border-y border-asoebi-purple-950/25 py-8 lg:grid-cols-[.45fr_1.55fr] lg:items-center lg:py-10"
      >
        <div>
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            December 2026
          </p>
          <h2
            id="prize-countdown-heading"
            className="mt-3 font-display text-4xl leading-none tracking-tighter sm:text-5xl"
          >
            Until the Asoebi Prize
          </h2>
        </div>
        <PrizeCountdown />
      </section>

      <section className="mt-24">
        <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
          Prize fund and benefits
        </p>
        <div className="mt-8 border-y border-asoebi-purple-950/25">
          {prizes.map((prize) => (
            <article
              key={prize.place}
              className="grid gap-5 border-b border-asoebi-purple-950/20 py-9 last:border-b-0 md:grid-cols-[.45fr_.75fr_.8fr] md:items-baseline"
            >
              <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
                {prize.place}
              </p>
              <h2 className="font-display text-5xl leading-[.9] tracking-[-.055em] sm:text-6xl">
                {prize.reward}
              </h2>
              <p className="max-w-sm leading-7 text-asoebi-graphite">
                {prize.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-12 border-y border-asoebi-purple-950/25 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            Prize categories
          </p>
          <ul className="mt-8 border-t border-asoebi-purple-950/20">
            {categories.map((item) => (
              <li
                key={item}
                className="border-b border-asoebi-purple-950/20 py-6 font-display text-3xl sm:text-4xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:border-l lg:border-asoebi-purple-950/20 lg:pl-12">
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            How the prize works
          </p>
          <ul className="mt-8 border-t border-asoebi-purple-950/20">
            {features.map((item) => (
              <li
                key={item}
                className="border-b border-asoebi-purple-950/20 py-5 font-bold"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="apply"
        className="mt-24 scroll-mt-24 bg-asoebi-gold-300 p-8 sm:p-12 lg:p-16"
      >
        <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-900 uppercase">
          Applications
        </p>
        <h2 className="mt-5 max-w-3xl font-display text-6xl leading-[.88] tracking-[-.055em] sm:text-8xl">
          Put your work forward.
        </h2>
        <p className="mt-7 max-w-xl leading-7 text-asoebi-graphite">
          Choose your category and tell us about the work you want considered.
        </p>
        <PrizeApplicationForm />
      </section>
    </EditorialPage>
  );
}

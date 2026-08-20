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
    award: "AEFW Prize",
    benefits: [
      "₦10,000,000 cash award",
      "Headline runway showcase",
      "Asoebi Fashion Prize Trophy",
    ],
  },
  {
    place: "Second place",
    award: "Rising Star Award",
    benefits: [
      "Internship with a leading fashion house",
      "VIP access to Asoebi Fashion Week events",
      "Professional fashion portfolio development support",
    ],
  },
  {
    place: "Third place",
    award: "Fashion Education Award",
    benefits: [
      "Fully funded international fashion course",
      "Certificate from a recognized fashion institution",
      "Access to AEFW 2027 masterclasses and workshops",
    ],
  },
] as const;

const eligibility = [
  "Ages 18 and above",
  "A minimum of three collections",
  "Emerging and student fashion brands only",
] as const;

export const metadata: Metadata = createMetadata({
  title: "Asoebi Prize",
  description:
    "Discovering the future of African fashion through the Asoebi Fashion Prize, with awards, industry access and international fashion education for emerging designers.",
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
      intro="Discovering the future of African fashion."
      heroImage="/images/waitlist/designer-card-illustration.png"
      heroImageAlt="An editorial illustration of an African fashion designer and her work"
      cta={{ href: "#apply", label: "Apply for the prize" }}
    >
      <section className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
        <h2 className="font-display text-6xl leading-[.88] tracking-[-.06em] sm:text-8xl">
          Wear your heritage. Design the future.
        </h2>
        <p className="max-w-xl text-lg leading-8 text-asoebi-graphite">
          Asoebi Fashion Prize exists to discover emerging talent, reward
          original thinking and launch African designers toward international
          runways.
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
                {prize.award}
              </h2>
              <ul className="max-w-md space-y-2 leading-7 text-asoebi-graphite">
                {prize.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-12 bg-asoebi-purple-950 px-7 py-12 text-white sm:px-12 lg:grid-cols-[.75fr_1.25fr] lg:px-16 lg:py-16">
        <div>
          <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-300 uppercase">
            Eligibility
          </p>
          <h2 className="mt-5 font-display text-5xl leading-[.9] tracking-[-.055em] sm:text-6xl">
            Built for fashion&apos;s next names.
          </h2>
        </div>
        <ul className="border-t border-white/25">
          {eligibility.map((item) => (
            <li
              key={item}
              className="border-b border-white/25 py-5 text-lg font-bold"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24 grid gap-12 lg:grid-cols-2">
        <div className="border-t border-asoebi-purple-950/25 pt-7">
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            Award ceremony
          </p>
          <h2 className="mt-5 font-display text-5xl leading-[.9] tracking-[-.055em] sm:text-6xl">
            The closing gala.
          </h2>
          <p className="mt-7 max-w-xl leading-7 text-asoebi-graphite">
            Winners will be announced during the closing gala night of Asoebi
            Fashion Prize, attended by designers, celebrities, investors, media,
            buyers and fashion enthusiasts from around the world.
          </p>
        </div>
        <div className="border-t border-asoebi-purple-950/25 pt-7">
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            Our vision
          </p>
          <h2 className="mt-5 font-display text-5xl leading-[.9] tracking-[-.055em] sm:text-6xl">
            African talent on the world stage.
          </h2>
          <p className="mt-7 max-w-xl leading-7 text-asoebi-graphite">
            To become Africa&apos;s most prestigious fashion competition,
            producing the continent&apos;s equivalent of global fashion award
            winners and launching designers onto international runways.
          </p>
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

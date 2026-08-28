import type { Metadata } from "next";

import { EditorialPage } from "@/components/layout/editorial-page";
import { PrizeCountdown } from "@/features/prize/prize-countdown";
import { PrizeApplicationForm } from "@/features/prize/prize-application-form";
import { createMetadata } from "@/lib/seo";

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
  "A minimum of two original collections",
  "Emerging and student fashion brands only",
] as const;

const submissionModes = [
  {
    name: "Instagram",
    detail:
      "A public profile, Highlight or pinned sequence presenting both collections.",
  },
  {
    name: "YouTube",
    detail:
      "A public or unlisted playlist, or one video with clearly labelled chapters.",
  },
  {
    name: "Website",
    detail: "One portfolio page where both collections are easy to review.",
  },
  {
    name: "PDF",
    detail:
      "One organised document containing both collections, up to 30 pages and 20MB.",
  },
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
      intro="Two collections. One opportunity to shape what African fashion becomes next."
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
            Applications close December 19, 2026
          </p>
          <h2
            id="prize-countdown-heading"
            className="mt-3 font-display text-4xl leading-none tracking-tighter sm:text-5xl"
          >
            Until entries close
          </h2>
        </div>
        <PrizeCountdown
          targetDate="2026-12-19T23:59:59+01:00"
          accessibleLabel="Countdown to the Asoebi Fashion Prize application deadline on December 19, 2026"
        />
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

      <section className="mt-24 border-y border-asoebi-purple-950/25 py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
              Prepare your submission
            </p>
            <h2 className="mt-5 font-display text-5xl leading-[.9] tracking-[-.055em] sm:text-7xl">
              Two collections. One clear point of view.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-asoebi-graphite">
            Present both collections as one coherent submission package. Every
            look, detail and idea should be easy for the judges to follow.
          </p>
        </div>

        <div className="mt-12 border-t border-asoebi-purple-950/20">
          {submissionModes.map((mode) => (
            <article
              key={mode.name}
              className="grid gap-3 border-b border-asoebi-purple-950/20 py-6 sm:grid-cols-[.4fr_1.6fr] sm:items-baseline"
            >
              <h3 className="font-display text-3xl tracking-[-.04em]">
                {mode.name}
              </h3>
              <p className="max-w-2xl leading-7 text-asoebi-graphite">
                {mode.detail}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-5 bg-asoebi-mist p-7 sm:grid-cols-3 sm:p-9">
          <p className="font-bold text-asoebi-purple-950">
            Name and separate both collections.
          </p>
          <p className="font-bold text-asoebi-purple-950">
            Use sharp photography or stable, well-lit video.
          </p>
          <p className="font-bold text-asoebi-purple-950">
            Keep every link accessible until judging ends.
          </p>
        </div>
      </section>

      <section
        id="apply"
        className="mt-24 scroll-mt-24 bg-asoebi-gold-300 p-6 sm:p-12 lg:p-16"
      >
        <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-900 uppercase">
              Applications
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-6xl leading-[.88] tracking-[-.055em] sm:text-8xl">
              Put your collections forward.
            </h2>
          </div>
          <div className="border-t border-asoebi-purple-950/30 pt-5">
            <p className="font-bold text-asoebi-purple-950">
              Deadline: December 19, 2026
            </p>
            <p className="mt-2 leading-7 text-asoebi-graphite">
              Submit one organised package containing at least two original
              collections.
            </p>
          </div>
        </div>
        <PrizeApplicationForm />
      </section>
    </EditorialPage>
  );
}

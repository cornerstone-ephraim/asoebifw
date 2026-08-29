import type { Metadata } from "next";
import Image from "next/image";

import { EditorialPage } from "@/components/layout/editorial-page";
import { ArrowLink } from "@/components/ui/arrow-link";
import { createMetadata } from "@/lib/seo";

const eventDetails = [
  ["Date", "Friday, 2 October 2026"],
  ["Time", "12:00 PM to 12:00 AM"],
  ["Capacity", "100 guests maximum"],
  ["Entry", "£35"],
] as const;

const hosts = [
  {
    name: "Young Nola",
    logo: "/images/partners/young-nola.png",
  },
  {
    name: "Calabasa Spirits",
    logo: "/images/partners/calabasa-logo.jpg",
  },
  {
    name: "Purple Global",
    logo: "/images/partners/purpleglobal-logo.png",
  },
  {
    name: "Keniye Studios",
    logo: "/images/partners/keniye-studios-logo.png",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Asoebi After Party",
  description:
    "Join the Asoebi After Party: October Owambe in London on October 2, 2026 for music, traditional fashion and celebration.",
  path: "/after-party",
  keywords: [
    "Asoebi After Party",
    "fashion networking",
    "fashion awards ceremony",
  ],
});

export default function Page() {
  return (
    <EditorialPage
      eyebrow="October 2, 2026 · London"
      title="Asoebi After Party"
      intro="October Owambe. An all-day, all-night celebration of West African style, music and community."
      heroImage="/images/tickets-editorial.png"
      heroImageAlt="An editorial Asoebi Fashion Week ticket illustration"
      heroTone="blush"
      cta={{ href: "/#waitlist", label: "Join for event updates" }}
    >
      <section className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
        <h2 className="font-display text-6xl leading-[.88] tracking-[-.06em] sm:text-8xl">
          London, dressed for the occasion.
        </h2>
        <p className="max-w-xl text-lg leading-8 text-asoebi-graphite">
          Come dressed for a West African wedding and ready for good music, good
          people and good energy.
        </p>
      </section>

      <section className="mt-24 overflow-hidden bg-asoebi-purple-950 text-white">
        <div className="grid lg:grid-cols-[.82fr_1.18fr]">
          <div className="relative min-h-180 bg-black">
            <Image
              src="/images/after-party/october-owambe-invitation.webp"
              alt="Official October Owambe invitation with the event date, entry price, hosts and dress code"
              fill
              loading="eager"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-300 uppercase">
              October Owambe
            </p>
            <h2 className="mt-5 font-display text-5xl leading-[.9] tracking-[-.055em] sm:text-7xl">
              You&apos;re invited.
            </h2>
            <dl className="mt-10 border-t border-white/20">
              {eventDetails.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[.65fr_1.35fr] gap-4 border-b border-white/20 py-5"
                >
                  <dt className="text-xs font-bold tracking-[.14em] text-asoebi-gold-300 uppercase">
                    {label}
                  </dt>
                  <dd className="font-bold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mt-24 grid gap-12 border-y border-asoebi-purple-950/25 py-12 sm:py-16 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-900 uppercase">
            The experience
          </p>
          <h2 className="mt-5 font-display text-5xl leading-[.92] tracking-tighter sm:text-7xl">
            Come dressed. Come ready.
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-8 text-asoebi-graphite">
            Dress code is strictly traditional attire for a West African
            wedding. Indoor seating is available on a first come, first served
            basis.
          </p>
        </div>
        <div>
          <ul className="border-t border-asoebi-purple-950/25">
            {[
              "Free small chops all night",
              "Hookah available outside",
              "Bottles and pre-mixed cocktails from a curated menu",
            ].map((item) => (
              <li
                key={item}
                className="border-b border-asoebi-purple-950/25 py-5 font-display text-3xl"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ArrowLink href="/#waitlist">Join for event updates</ArrowLink>
          </div>
        </div>
      </section>

      <section className="mt-24 bg-asoebi-gold-300 p-8 sm:p-12 lg:p-16">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-xs font-bold tracking-[.18em] text-asoebi-purple-800 uppercase">
              Hosted by
            </p>
            <h2 className="mt-5 font-display text-5xl leading-[.92] tracking-tighter sm:text-7xl">
              A room shaped by culture.
            </h2>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4">
            {hosts.map((host) => (
              <li key={host.name} className="bg-white p-4 sm:p-6">
                <figure className="relative aspect-3/2 w-full">
                  <Image
                    src={host.logo}
                    alt={`${host.name} logo`}
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className="object-contain"
                  />
                  <figcaption className="sr-only">{host.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </EditorialPage>
  );
}

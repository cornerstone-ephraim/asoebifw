import type { Metadata } from "next";
import Image from "next/image";

import { EditorialPage } from "@/components/layout/editorial-page";
import { ArrowLink } from "@/components/ui/arrow-link";
import { createMetadata } from "@/lib/seo";

const features = [
  "DJ line-up",
  "Networking lounge",
  "Fashion awards ceremony",
] as const;
const tickets = [
  "VIP & VVIP",
  "Corporate Table",
  "Celebrity Admission",
] as const;

export const metadata: Metadata = createMetadata({
  title: "Asoebi After Party",
  description:
    "Join the Asoebi After Party in London on October 2, 2026 for music, fashion, networking and celebration.",
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
      intro="One London night for fashion, culture and connection."
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
          Music, networking and fashion bring the Asoebi community together in
          London on October 2.
        </p>
      </section>

      <section className="mt-24 overflow-hidden bg-asoebi-purple-950 text-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-120">
            <Image
              src="/images/tickets-editorial.png"
              alt="Editorial ticket artwork for the Asoebi After Party"
              fill
              loading="eager"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-300 uppercase">
              October 2 · London
            </p>
            <ul className="mt-10 border-t border-white/20">
              {features.map((item) => (
                <li
                  key={item}
                  className="border-b border-white/20 py-6 font-display text-3xl sm:text-4xl"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-24 border-y border-asoebi-purple-950/25 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-900 uppercase">
              Ticket types
            </p>
            <h2 className="mt-5 font-display text-5xl leading-[.92] tracking-tighter sm:text-7xl">
              Choose how you enter the room.
            </h2>
          </div>
          <ul className="border-t border-asoebi-purple-950/25">
            {tickets.map((item) => (
              <li
                key={item}
                className="border-b border-asoebi-purple-950/25 py-5 font-display text-3xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10">
          <ArrowLink href="/#waitlist">Join for ticket updates</ArrowLink>
        </div>
      </section>
    </EditorialPage>
  );
}

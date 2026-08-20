import type { Metadata } from "next";
import Image from "next/image";

import { EditorialPage } from "@/components/layout/editorial-page";
import { ArrowLink } from "@/components/ui/arrow-link";
import { createMetadata } from "@/lib/seo";

const categories = [
  "Fabric Sellers",
  "Fashion Designers",
  "Accessories Vendors",
] as const;

const platformFlow = [
  {
    title: "Contribute together",
    copy: "Event wallets, shared goals and flexible payments keep every contribution visible.",
  },
  {
    title: "Find what you need",
    copy: "A verified marketplace connects customers with fabrics, designers and accessories.",
  },
  {
    title: "Buy with confidence",
    copy: "Escrow protection and delivery tracking support the journey from payment to arrival.",
  },
  {
    title: "Manage the occasion",
    copy: "Guest registration, invitations and attendance tools bring event logistics into one place.",
  },
] as const;

export const metadata: Metadata = createMetadata({
  title: "Asoebi Vendor",
  description:
    "Buy together, pay together and celebrate together with event wallets, trusted Asoebi vendors and connected event commerce.",
  path: "/vendor",
  keywords: [
    "Asoebi marketplace",
    "Asoebi event wallet",
    "fabric sellers",
    "fashion vendors",
  ],
});

export default function Page() {
  return (
    <EditorialPage
      eyebrow="Fashion and technology"
      title="Asoebi Vendor"
      intro="Buy together. Pay together. Celebrate together."
      heroImage="/images/waitlist/vendor-card-illustration.png"
      heroImageAlt="An editorial illustration of an Asoebi fashion storefront"
      heroTone="gold"
      cta={{ href: "/#waitlist", label: "Join the vendor waitlist" }}
    >
      <section className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
        <div>
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            One connected journey
          </p>
          <h2 className="mt-5 font-display text-6xl leading-[.88] tracking-[-.06em] sm:text-8xl">
            From contribution to celebration.
          </h2>
        </div>
        <p className="max-w-xl text-lg leading-8 text-asoebi-graphite">
          A dedicated event wallet connects families and friends with the
          trusted people supplying, making and delivering their Asoebi.
        </p>
      </section>

      <section className="mt-24 grid overflow-hidden bg-asoebi-purple-950 text-white lg:grid-cols-[.9fr_1.1fr]">
        <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16">
          <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-300 uppercase">
            The people you can find
          </p>
          <ul className="mt-16 border-t border-white/20">
            {categories.map((item) => (
              <li
                key={item}
                className="border-b border-white/20 py-6 font-display text-3xl sm:text-4xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-h-120 bg-asoebi-gold-300">
          <Image
            src="/images/waitlist/vendor-card-illustration.png"
            alt="Fabric, accessories and storefront details represented in an Asoebi editorial illustration"
            fill
            loading="eager"
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-bottom"
          />
        </div>
      </section>

      <section className="mt-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
              How it comes together
            </p>
            <h2 className="mt-5 font-display text-5xl leading-[.92] tracking-tighter sm:text-7xl">
              Less coordination. More celebration.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-asoebi-graphite">
            Payments, sourcing, protection and event tools work as one connected
            experience for customers, organizers and vendors.
          </p>
        </div>
        <div className="mt-12 border-y border-asoebi-purple-950/25">
          {platformFlow.map((feature) => (
            <article
              key={feature.title}
              className="grid gap-4 border-b border-asoebi-purple-950/20 py-8 last:border-b-0 md:grid-cols-[.8fr_1.2fr] md:items-baseline"
            >
              <h3 className="font-display text-4xl leading-none tracking-tighter">
                {feature.title}
              </h3>
              <p className="max-w-xl text-lg leading-8 text-asoebi-graphite">
                {feature.copy}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-24 grid gap-10 border-t border-asoebi-purple-950/25 pt-12 lg:grid-cols-[.8fr_1.2fr]">
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            Asoebi Business Network
          </p>
          <div>
            <h2 className="font-display text-5xl leading-[.92] tracking-tighter sm:text-7xl">
              A wider market for African fashion businesses.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-asoebi-graphite">
              Business profiles, verification and sourcing opportunities help
              customers discover trusted partners while giving Asoebi businesses
              room to grow across borders.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <ArrowLink href="/#waitlist">Join as a vendor or buyer</ArrowLink>
        </div>
      </section>
    </EditorialPage>
  );
}

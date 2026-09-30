import type { Metadata } from "next";
import Image from "next/image";

import { EditorialPage } from "@/components/layout/editorial-page";
import { ArrowLink } from "@/components/ui/arrow-link";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Fashion Week",
  description:
    "Asoebi Fashion Week returns in 2027 with runways, collections and professional accreditation. The official date will be announced.",
  path: "/fashion-week",
  keywords: ["Asoebi runways", "Asoebi collections", "fashion accreditation"],
});

const programme = [
  {
    title: "Runways",
    copy: "See Asoebi in motion. On the runway, the weight of a fabric, the shape of a sleeve and the movement of a finished garment become part of the story. Fashion Week gives designers a stage to express their point of view through complete looks, showing how traditional references can take on a contemporary form.",
    tone: "bg-asoebi-purple-950 text-white",
  },
  {
    title: "Collections",
    copy: "Look beyond a single outfit to the ideas that connect a collection. Colour, fabric, cut and styling reveal how a designer develops a body of work. The focus is on the breadth of Asoebi expression: familiar textiles, individual interpretations and new possibilities for dressing together while retaining a personal sense of style.",
    tone: "bg-asoebi-blush text-asoebi-purple-950",
  },
  {
    title: "Accreditations",
    copy: "Fashion Week also creates a setting for the people who document, champion and work with fashion. Professional accreditation is intended for media, buyers and industry participants. Access details, eligibility and application information will be published with the official programme; accreditation is not yet open.",
    tone: "bg-asoebi-gold-300 text-asoebi-purple-950",
  },
] as const;

export default function Page() {
  return (
    <EditorialPage
      eyebrow="Asoebi Fashion Week"
      title="Where culture meets catwalk."
      intro="Asoebi takes the runway in 2027. Discover how African designers turn shared cloth, personal expression and generations of craft into fashion for today. The official date will be announced."
      heroImage="/images/editorial/asoebi-styles.png"
      heroAspectRatio={1942 / 809}
      heroLayout="statement"
      heroPosition="object-center"
      heroImageAlt="A contemporary Asoebi runway look"
      cta={{ href: "/accreditation", label: "Explore accreditation" }}
    >
      <section className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <h2 className="font-display text-6xl leading-[.88] tracking-[-.06em] sm:text-8xl">
          African fashion takes the stage.
        </h2>
        <div className="max-w-xl space-y-6 text-lg leading-8 text-asoebi-graphite">
          <p>
            Asoebi Fashion Week brings the clothes, the craft and the people
            behind them into the same conversation. It is a platform for African
            designers to present their work, for audiences to discover new
            perspectives, and for fashion professionals to engage with the
            creativity shaping the industry.
          </p>
          <p>
            At its heart is a shared ambition: to give Asoebi the attention it
            deserves as a fashion category. The runway is a place to examine its
            possibilities, from the way a textile is constructed to the way a
            collection expresses identity, belonging and individual taste.
          </p>
        </div>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <h2 className="max-w-xl font-display text-5xl leading-[.95] tracking-[-.05em] sm:text-6xl">
          Shared cloth. Individual expression.
        </h2>
        <div className="max-w-xl space-y-6 text-lg leading-8 text-asoebi-graphite">
          <p>
            Asoebi carries a sense of occasion and connection. A shared fabric
            can bring people together while leaving room for each wearer’s
            interpretation. That relationship between community and
            individuality gives designers a rich starting point.
          </p>
          <p>
            Fashion Week builds on that idea, bringing attention to the choices
            behind the finished look: texture, proportion, embellishment and the
            work of the hands that make it. We want audiences to leave with a
            deeper appreciation of the clothing and curiosity about the people
            creating it.
          </p>
        </div>
      </section>

      <section className="mt-24 border-y border-asoebi-purple-950/25">
        {programme.map((item) => (
          <article
            key={item.title}
            className="grid gap-5 border-b border-asoebi-purple-950/20 py-9 last:border-b-0 md:grid-cols-[.8fr_1.2fr] md:items-baseline"
          >
            <h2 className="font-display text-5xl tracking-[-.055em] sm:text-6xl">
              {item.title}
            </h2>
            <p className="max-w-xl text-lg leading-8 text-asoebi-graphite">
              {item.copy}
            </p>
          </article>
        ))}
      </section>

      <aside className="mt-10 flex flex-col items-start justify-between gap-6 border-b border-asoebi-purple-950/25 pb-10 sm:flex-row sm:items-center">
        <p className="max-w-xl font-display text-3xl tracking-tight">
          Help bring African fashion to the stage.
        </p>
        <ArrowLink href="/sponsorship">Apply to sponsor</ArrowLink>
      </aside>

      <section className="mt-24 overflow-hidden bg-asoebi-mist">
        <div className="grid lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative min-h-112">
            <Image
              src="/images/asoebi-hero-campaign.png"
              alt="Asoebi fashion presented in a sunlit courtyard"
              fill
              sizes="(min-width: 1024px) max(58vw, 800px), max(100vw, 800px)"
              quality={90}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
              Professional access
            </p>
            <h2 className="mt-5 font-display text-5xl leading-[.92] tracking-tighter">
              Be close to the work and the people behind it.
            </h2>
            <p className="mt-6 leading-7 text-asoebi-graphite">
              Whether you report on fashion, buy for a store or work within the
              industry, the accreditation page will be your starting point for
              professional access. It will explain who can apply and what
              information is needed once applications open.
            </p>
            <p className="mt-5 leading-7 text-asoebi-graphite">
              The 2027 programme is still to be announced. Join the AEFW
              waitlist for updates on the official date, programme and
              participation opportunities as they are confirmed.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <ArrowLink href="/#waitlist">Join the waitlist</ArrowLink>
              <ArrowLink href="/accreditation">Explore accreditation</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </EditorialPage>
  );
}

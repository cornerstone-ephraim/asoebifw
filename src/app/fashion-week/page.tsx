import type { Metadata } from "next";
import Image from "next/image";

import { EditorialPage } from "@/components/layout/editorial-page";
import { ArrowLink } from "@/components/ui/arrow-link";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Fashion Week",
  description:
    "Discover the runways, collections and accreditation that make up Asoebi Fashion Week.",
  path: "/fashion-week",
  keywords: ["Asoebi runways", "Asoebi collections", "fashion accreditation"],
});

const programme = [
  {
    title: "Runways",
    copy: "Fashion presentations on the Asoebi stage.",
    tone: "bg-asoebi-purple-950 text-white",
  },
  {
    title: "Collections",
    copy: "Creative expressions in cloth and craft.",
    tone: "bg-asoebi-blush text-asoebi-purple-950",
  },
  {
    title: "Accreditations",
    copy: "Access for media, buyers and fashion professionals.",
    tone: "bg-asoebi-gold-300 text-asoebi-purple-950",
  },
] as const;

export default function Page() {
  return (
    <EditorialPage
      eyebrow="The fashion experience"
      title="Fashion Week"
      intro="A global showcase celebrating African fashion, textiles, craftsmanship and creativity."
      heroImage="/images/editorial/asoebi-styles.png"
      heroImageAlt="A contemporary Asoebi runway look"
      cta={{ href: "/accreditation", label: "Apply for accreditation" }}
    >
      <section className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <h2 className="font-display text-6xl leading-[.88] tracking-[-.06em] sm:text-8xl">
          African fashion takes the stage.
        </h2>
        <p className="max-w-xl text-lg leading-8 text-asoebi-graphite">
          Runways, collections and professional access come together as one
          fashion experience on the Asoebi stage.
        </p>
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

      <section className="mt-24 overflow-hidden bg-asoebi-mist">
        <div className="grid lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative min-h-112">
            <Image
              src="/images/asoebi-hero-campaign.png"
              alt="Asoebi fashion presented in a sunlit courtyard"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
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
              Accreditation is available for media, buyers and fashion
              professionals.
            </p>
            <div className="mt-8">
              <ArrowLink href="/accreditation">
                Apply for accreditation
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </EditorialPage>
  );
}

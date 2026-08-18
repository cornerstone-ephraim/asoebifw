import { EditorialPage } from "@/components/layout/editorial-page";
import { PrizeApplicationForm } from "@/features/prize/prize-application-form";
import { createMetadata } from "@/lib/seo";
import { Metadata } from "next";

const categories = [
  "Best Designer",
  "Best Wedding Asoebi",
  "Best Innovative Fabric Design",
];
const features = ["Public vote", "Judges panel", "Prize fund and benefits"];
const prizes = [
  {
    place: "First place",
    reward: "₦10m",
    color: "bg-asoebi-purple-950 text-white",
  },
  {
    place: "Second place",
    reward: "Fashion internship",
    color: "bg-asoebi-mist text-asoebi-purple-950",
  },
  {
    place: "Third place",
    reward: "Free fashion course",
    color: "bg-[#fff0bd] text-asoebi-purple-950",
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
    >
      <section>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
          Categories
        </p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {categories.map((item) => (
            <article key={item} className="rounded-3xl bg-asoebi-mist p-7">
              <h2 className="font-display text-4xl leading-[.95] tracking-[-.045em]">
                {item}
              </h2>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
          Prize details
        </p>
        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {prizes.map((prize) => (
            <article
              key={prize.place}
              className={`flex min-h-72 flex-col justify-between rounded-[1.75rem] p-8 ${prize.color}`}
            >
              <p className="text-xs font-bold uppercase tracking-[.18em] opacity-65">
                {prize.place}
              </p>
              <h2 className="font-display text-5xl leading-[.9] tracking-[-.055em]">
                {prize.reward}
              </h2>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
          Features
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {features.map((item) => (
            <li
              key={item}
              className="rounded-full border border-asoebi-purple-300 px-6 py-5 text-center font-bold"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section
        id="apply"
        className="mt-20 rounded-[1.75rem] bg-[#fff0bd] p-8 sm:p-12"
      >
        <p className="text-xs font-bold uppercase tracking-[.18em] text-asoebi-gold-800">
          Applications
        </p>
        <h2 className="font-display mt-5 max-w-3xl text-6xl leading-[.88] tracking-[-.055em]">
          Apply for the Asoebi Prize.
        </h2>
        <p className="mt-7 max-w-xl leading-7 text-asoebi-graphite">
          Choose your category and tell us about the work you want considered.
        </p>
        <PrizeApplicationForm />
      </section>
    </EditorialPage>
  );
}

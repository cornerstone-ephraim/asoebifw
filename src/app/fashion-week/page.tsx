import { EditorialPage } from "@/components/layout/editorial-page";
import { ArrowLink } from "@/components/ui/arrow-link";
import { createMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Fashion Week",
  description:
    "Discover the runways, collections and accreditation that make up Asoebi Fashion Week.",
  path: "/fashion-week",
  keywords: ["Asoebi runways", "Asoebi collections", "fashion accreditation"],
});

const programme = [
  { title: "Runways", copy: "Fashion presentations on the Asoebi stage." },
  { title: "Collections", copy: "Creative expressions in cloth and craft." },
  {
    title: "Accreditations",
    copy: "Access for media, buyers and fashion professionals.",
  },
] as const;

export default function Page() {
  return (
    <EditorialPage
      eyebrow="The fashion experience"
      title="Fashion Week"
      intro="A global showcase celebrating African fashion, textiles, craftsmanship and creativity."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {programme.map((item) => (
          <article
            key={item.title}
            className="flex min-h-80 flex-col justify-between rounded-3xl bg-asoebi-mist p-7 shadow-[0_18px_55px_rgba(42,17,87,.08)]"
          >
            <h2 className="font-display text-5xl tracking-[-.055em]">
              {item.title}
            </h2>
            <p className="max-w-xs leading-7 text-asoebi-graphite">
              {item.copy}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-10">
        <ArrowLink href="/accreditation">Apply for accreditation</ArrowLink>
      </div>
    </EditorialPage>
  );
}

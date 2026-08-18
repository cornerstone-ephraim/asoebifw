import { EditorialPage } from "@/components/layout/editorial-page";
import { createMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "About Asoebi Fashion Week",
  description:
    "Discover the vision behind Asoebi Fashion Week and its year-round platform for African fashion, culture, commerce and celebration.",
  path: "/about",
  keywords: ["Asoebi vision", "African fashion platform", "Asoebi partners"],
});

export default function Page() {
  return (
    <EditorialPage
      eyebrow="Vision · People · Partnership"
      title="About Asoebi"
      intro="Asoebi Fashion Week is a year-round global platform for fashion, culture, awards, networking, commerce and African cultural celebration."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {[
          [
            "Vision",
            "To create the global home of Asoebi fashion, culture and celebration.",
          ],
          [
            "Organizing team",
            "A platform shaped by people committed to African fashion, creativity and global opportunity.",
          ],
          [
            "Partners and sponsors",
            "Partnerships support the platform across fashion, awards, commerce and celebration.",
          ],
        ].map(([title, copy]) => (
          <article key={title} className="rounded-3xl bg-asoebi-mist p-7">
            <h2 className="font-display text-4xl tracking-[-.045em]">
              {title}
            </h2>
            <p className="mt-7 leading-7 text-asoebi-graphite">{copy}</p>
          </article>
        ))}
      </div>
    </EditorialPage>
  );
}

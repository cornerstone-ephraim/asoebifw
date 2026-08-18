import { createMetadata } from "@/lib/seo";
import Link from "next/link";
import { EditorialPage } from "@/components/layout/editorial-page";
import { getRunwayShows } from "@/features/content/data";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Runway Shows",
  description:
    "Discover Asoebi Fashion Week runway shows, designer collections and fashion films celebrating contemporary African style.",
  path: "/runway",
  keywords: [
    "African runway shows",
    "fashion films",
    "designer runway collections",
  ],
});

export default async function Page() {
  return (
    <EditorialPage
      eyebrow="Shows & film"
      title="The Runway"
      intro="Discover shows, collections and future runway films."
    >
      <div className="border-t border-asoebi-ink">
        {(await getRunwayShows()).map((show) => (
          <Link
            href={`/runway/${show.slug}`}
            key={show.slug}
            className="grid border-b border-asoebi-ink/25 py-8 md:grid-cols-[1fr_auto]"
          >
            <h2 className="text-2xl font-semibold">{show.title}</h2>
            <span className="text-xs uppercase tracking-[.15em]">
              {show.status}
            </span>
          </Link>
        ))}
      </div>
    </EditorialPage>
  );
}

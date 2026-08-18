import Link from "next/link";
import { EditorialPage } from "@/components/layout/editorial-page";
import { EditorialPlaceholder } from "@/components/media/editorial-placeholder";
import { getCollections } from "@/features/content/data";
import { createMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "African Fashion Collections",
  description:
    "Explore original Asoebi Fashion Week collections shaped by African textiles, contemporary craft and distinct designer perspectives.",
  path: "/collections",
  keywords: [
    "African fashion collections",
    "Asoebi collections",
    "runway fashion",
  ],
});

export default async function Page() {
  const items = await getCollections();
  return (
    <EditorialPage
      eyebrow="From the runway"
      title="The Collections"
      intro="Photography-first stories of fabric, craft and creative expression."
    >
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Link
            key={item.slug}
            href={`/collections/${item.slug}`}
            className={i === 1 ? "lg:mt-20" : ""}
          >
            <EditorialPlaceholder
              label={item.title}
              tone={item.visualTone}
              className="aspect-3/4"
            />
            <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
          </Link>
        ))}
      </div>
    </EditorialPage>
  );
}

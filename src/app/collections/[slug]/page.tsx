import { notFound } from "next/navigation";
import { EditorialPage } from "@/components/layout/editorial-page";
import { EditorialPlaceholder } from "@/components/media/editorial-placeholder";
import { getCollection, getCollections } from "@/features/content/data";
import { createMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateStaticParams() {
  return (await getCollections()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCollection(slug);
  return item
    ? createMetadata({
        title: item.title,
        description: `${item.description} Explore this Asoebi Fashion Week collection and its approach to African textiles and contemporary craft.`,
        path: `/collections/${slug}`,
        keywords: [item.title, "African fashion collection", "textile design"],
      })
    : {};
}
export default async function Page({
  params,
}: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const item = await getCollection(slug);
  if (!item) notFound();
  return (
    <EditorialPage
      backLink={{ href: "/collections", label: "All collections" }}
      eyebrow="Collection"
      title={item.title}
      intro={item.description}
    >
      <EditorialPlaceholder
        label={item.title}
        tone={item.visualTone}
        className="aspect-video"
      />
    </EditorialPage>
  );
}

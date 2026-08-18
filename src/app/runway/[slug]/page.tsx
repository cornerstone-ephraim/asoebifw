import { notFound } from "next/navigation";
import { EditorialPage, EmptyNotice } from "@/components/layout/editorial-page";
import { getRunwayShow, getRunwayShows } from "@/features/content/data";
import { createMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getRunwayShows()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/runway/[slug]">) {
  const { slug } = await params;
  const show = await getRunwayShow(slug);
  return show
    ? createMetadata({
        title: show.title,
        description: `Explore ${show.title}, an Asoebi Fashion Week runway presentation celebrating African design, textiles and creative expression.`,
        path: `/runway/${slug}`,
        keywords: [show.title, "African runway", "fashion presentation"],
      })
    : {};
}

export default async function Page({ params }: PageProps<"/runway/[slug]">) {
  const { slug } = await params;
  const show = await getRunwayShow(slug);
  if (!show) notFound();
  return (
    <EditorialPage
      backLink={{ href: "/runway", label: "All runway shows" }}
      eyebrow="Runway show"
      title={show.title}
      intro="Official show information and runway film will be added when the programme is announced."
    >
      <EmptyNotice title="Runway film coming soon" />
    </EditorialPage>
  );
}

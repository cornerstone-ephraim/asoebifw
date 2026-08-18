import Image from "next/image";
import { notFound } from "next/navigation";

import { EditorialPage } from "@/components/layout/editorial-page";
import { getDesigner, getDesigners } from "@/features/content/data";
import { getDesignerMedia } from "@/features/designers/designer-media";
import { createMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateStaticParams() {
  return (await getDesigners()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/designers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = await getDesigner(slug);
  return item
    ? createMetadata({
        title: item.name,
        description: `${item.bio} Discover the designer's work and perspective at Asoebi Fashion Week.`,
        path: `/designers/${slug}`,
        keywords: [
          item.name,
          "African fashion designer",
          item.location ?? "African designer",
        ],
      })
    : {};
}

export default async function Page({ params }: PageProps<"/designers/[slug]">) {
  const { slug } = await params;
  const designer = await getDesigner(slug);
  if (!designer) notFound();
  const media = getDesignerMedia(designer.slug);

  return (
    <EditorialPage
      backLink={{ href: "/designers", label: "All designers" }}
      eyebrow="Designer profile"
      title={designer.name}
      intro={designer.bio}
    >
      <div className="grid gap-10 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
        <div className="relative aspect-16/10 overflow-hidden rorounded-4xlg-asoebi-mist shadow-[0_24px_70px_rgba(42,17,87,.12)]">
          <Image
            src={media.src}
            alt={`${designer.name} and their fashion practice`}
            fill
            priority
            sizes="(min-width:1024px) 68vw, 100vw"
            className={`object-cover ${media.heroPosition}`}
          />
        </div>
        <aside className="border-t border-asoebi-purple-300 pt-6">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
            Practice
          </p>
          <p className="font-display mt-5 text-4xl leading-[.95] tracking-[-.04em]">
            {designer.bio}
          </p>
          <dl className="mt-10 grid gap-5 border-t border-asoebi-purple-200 pt-5 text-sm">
            <div className="flex justify-between gap-6">
              <dt className="text-asoebi-muted">Based in</dt>
              <dd className="font-bold text-right">{designer.location}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-asoebi-muted">Showing at</dt>
              <dd className="font-bold text-right">Asoebi Fashion Week</dd>
            </div>
          </dl>
        </aside>
      </div>
    </EditorialPage>
  );
}

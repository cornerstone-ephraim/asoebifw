import { notFound } from "next/navigation";
import { EditorialPage } from "@/components/layout/editorial-page";
import { EditorialPlaceholder } from "@/components/media/editorial-placeholder";
import { getDesigner, getDesigners } from "@/features/content/data";
import { createMetadata } from "@/lib/seo";

export async function generateStaticParams() { return (await getDesigners()).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: PageProps<"/designers/[slug]">) { const { slug } = await params; const item = await getDesigner(slug); return item ? createMetadata({ title: item.name, description: `${item.bio} Discover the designer's work and perspective at Asoebi Fashion Week.`, path: `/designers/${slug}`, keywords: [item.name, "African fashion designer", item.location ?? "African designer"] }) : {}; }
export default async function Page({ params }: PageProps<"/designers/[slug]">) { const { slug } = await params; const designer = await getDesigner(slug); if (!designer) notFound(); return <EditorialPage backLink={{ href: "/designers", label: "All designers" }} eyebrow="Designer profile" title={designer.name} intro={designer.bio}><EditorialPlaceholder label={designer.name} tone={designer.visualTone} className="aspect-[16/8]"/></EditorialPage>; }

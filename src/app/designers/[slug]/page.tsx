import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialPage } from "@/components/layout/editorial-page";
import { EditorialPlaceholder } from "@/components/media/editorial-placeholder";
import { getDesigner, getDesigners } from "@/features/content/data";
export async function generateStaticParams(){return (await getDesigners()).map(({slug})=>({slug}))}
export async function generateMetadata({params}:PageProps<"/designers/[slug]">):Promise<Metadata>{const {slug}=await params;const item=await getDesigner(slug);return item?{title:item.name,description:item.bio}:{} }
export default async function Page({params}:PageProps<"/designers/[slug]">){const {slug}=await params;const designer=await getDesigner(slug);if(!designer)notFound();return <EditorialPage eyebrow="Designer profile" title={designer.name} intro={designer.bio}><EditorialPlaceholder label={designer.name} tone={designer.visualTone} className="aspect-[16/8]"/></EditorialPage>}

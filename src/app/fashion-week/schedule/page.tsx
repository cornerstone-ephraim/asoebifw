import type { Metadata } from "next";
import { EditorialPage } from "@/components/layout/editorial-page";
import { getSchedule } from "@/features/content/data";
export const metadata: Metadata = { title: "Schedule", description: "The Asoebi Fashion Week programme." };
export default async function Page() { const schedule = await getSchedule(); return <EditorialPage eyebrow="Fashion Week" title="The Programme" intro="Runway shows, presentations, conversations and celebrations in one considered programme."><div className="border-t border-asoebi-ink">{schedule.map((event)=><article key={event.id} className="grid gap-4 border-b border-asoebi-ink/25 py-8 md:grid-cols-[1fr_12rem]"><div><h2 className="text-2xl font-semibold uppercase">{event.title}</h2><p className="mt-2 text-asoebi-muted">{event.description}</p></div><span className="text-xs font-bold uppercase tracking-[.15em]">{event.type}</span></article>)}</div></EditorialPage>; }

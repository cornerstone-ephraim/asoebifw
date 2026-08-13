import type { Metadata } from "next";
import { EditorialPage } from "@/components/layout/editorial-page";
import { ArrowLink } from "@/components/ui/arrow-link";
export const metadata: Metadata = { title: "Fashion Week", description: "Explore the Asoebi Fashion Week programme, runways and accreditation." };
export default function Page() { return <EditorialPage eyebrow="Flagship cultural showcase" title="Fashion Week" intro="African fashion, textiles, craftsmanship and creativity—presented on a global stage."><div className="grid gap-px bg-asoebi-stone md:grid-cols-3">{[["Programme","/fashion-week/schedule"],["Runways","/runway"],["Accreditation","/accreditation"]].map(([label,href]) => <div key={href} className="bg-asoebi-ivory p-8"><p className="font-display text-4xl">{label}</p><div className="mt-16"><ArrowLink href={href}>Explore</ArrowLink></div></div>)}</div></EditorialPage>; }

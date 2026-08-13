import type { Metadata } from "next";
import { EditorialPage } from "@/components/layout/editorial-page";
import { getDesigners } from "@/features/content/data";
import { DesignerGrid } from "@/features/designers/designer-grid";
export const metadata: Metadata = { title: "Designers", description: "Discover the designers shaping the next chapter of Asoebi." };
export default async function Page(){return <EditorialPage eyebrow="Profiles & practice" title="The Designers" intro="Meet the designers shaping the next chapter of Asoebi."><DesignerGrid designers={await getDesigners()}/></EditorialPage>}

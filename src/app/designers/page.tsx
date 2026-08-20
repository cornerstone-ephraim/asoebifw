import { EditorialPage } from "@/components/layout/editorial-page";
import { getDesigners } from "@/features/content/data";
import { DesignerGrid } from "@/features/designers/designer-grid";
import { createMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "African Fashion Designers",
  description:
    "Meet the designers shaping contemporary Asoebi through innovative tailoring, textiles, craft and cultural storytelling.",
  path: "/designers",
  keywords: [
    "African fashion designers",
    "Nigerian designers",
    "Asoebi designers",
  ],
});

export default async function Page() {
  return (
    <EditorialPage
      eyebrow="Profiles & practice"
      title="The Designers"
      intro="Meet the designers shaping the next chapter of Asoebi."
    >
      <DesignerGrid designers={await getDesigners()} />
    </EditorialPage>
  );
}

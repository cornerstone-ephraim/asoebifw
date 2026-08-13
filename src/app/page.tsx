import { HomePage } from "@/features/home/home-page";
import { getCollections, getCurrentEdition, getDesigners, getPartners, getSchedule } from "@/features/content/data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Asoebi Fashion Week", description: "Discover African designers, textiles, runway collections, cultural conversations and celebration at Asoebi Fashion Week.", path: "/", keywords: ["fashion week Nigeria", "Asoebi designers", "African runway"] });

export default async function Page() {
  const [edition, designers, collections, schedule, partners] = await Promise.all([getCurrentEdition(), getDesigners(), getCollections(), getSchedule(), getPartners()]);
  return <HomePage edition={edition} designers={designers} collections={collections} schedule={schedule} partners={partners}/>;
}

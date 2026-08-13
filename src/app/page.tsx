import { HomePage } from "@/features/home/home-page";
import { getCollections, getCurrentEdition, getDesigners, getPartners, getSchedule } from "@/features/content/data";

export default async function Page() {
  const [edition, designers, collections, schedule, partners] = await Promise.all([getCurrentEdition(), getDesigners(), getCollections(), getSchedule(), getPartners()]);
  return <HomePage edition={edition} designers={designers} collections={collections} schedule={schedule} partners={partners}/>;
}

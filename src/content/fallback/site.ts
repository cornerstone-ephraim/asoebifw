import type {
  Collection,
  Designer,
  FashionWeekEdition,
  Partner,
  RunwayShow,
  ScheduleEvent,
} from "@/types/content";

export const currentEdition: FashionWeekEdition = {
  title: "Asoebi Fashion Week",
  slug: "current-edition",
  tagline: "The Global Home of Asoebi Fashion, Culture and Celebration.",
  description:
    "A global showcase celebrating African fashion, textiles, craftsmanship and creativity.",
  isCurrentEdition: true,
};

export const designers: Designer[] = [
  { name: "Featured Designer", slug: "featured-designer", location: "Location to be announced", bio: "Designer biography will be published with the official programme.", featured: true, visualTone: "purple" },
  { name: "Guest Designer", slug: "guest-designer", location: "Location to be announced", bio: "Designer biography will be published with the official programme.", featured: true, visualTone: "gold" },
  { name: "Emerging Designer", slug: "emerging-designer", location: "Location to be announced", bio: "Designer biography will be published with the official programme.", featured: true, visualTone: "ink" },
];

export const collections: Collection[] = [
  { title: "Featured Collection", slug: "featured-collection", designerSlug: "featured-designer", description: "Official collection notes and imagery are coming soon.", visualTone: "purple" },
  { title: "Guest Collection", slug: "guest-collection", designerSlug: "guest-designer", description: "Official collection notes and imagery are coming soon.", visualTone: "gold" },
  { title: "Emerging Collection", slug: "emerging-collection", designerSlug: "emerging-designer", description: "Official collection notes and imagery are coming soon.", visualTone: "ivory" },
];

const runwayLabels = ["Featured Runway", "Guest Presentation", "Emerging Runway"] as const;
export const runwayShows: RunwayShow[] = designers.map((designer, index) => ({
  title: runwayLabels[index] ?? "Runway Programme",
  slug: `runway-programme-${index + 1}`,
  designerSlug: designer.slug,
  collectionSlug: collections[index]?.slug,
  status: "upcoming",
}));

export const schedule: ScheduleEvent[] = [
  { id: "programme-01", title: "Designer / Event Title", type: "Runway", description: "Official programme details are coming soon." },
  { id: "programme-02", title: "Designer / Event Title", type: "Presentation", description: "Official programme details are coming soon." },
  { id: "programme-03", title: "Designer / Event Title", type: "Conversation", description: "Official programme details are coming soon." },
];

export const partners: Partner[] = [];

export const prizeCategories = ["Best Designer", "Best Wedding Asoebi", "Best Innovative Fabric Design"] as const;

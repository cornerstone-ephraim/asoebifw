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
  {
    name: "Amara Okoye",
    slug: "amara-okoye",
    location: "Lagos, Nigeria",
    bio: "Amara Okoye creates sculptural occasionwear shaped by architectural lines and expressive Asoebi textiles.",
    featured: true,
    visualTone: "purple",
  },
  {
    name: "Tomi Adebayo",
    slug: "tomi-adebayo",
    location: "London, United Kingdom",
    bio: "Tomi Adebayo brings a new-form approach to tailoring, balancing precise structure with fluid cultural references.",
    featured: true,
    visualTone: "gold",
  },
  {
    name: "Nia Mensah",
    slug: "nia-mensah",
    location: "Accra, Ghana",
    bio: "Nia Mensah builds textile-led stories through colour, hand-finished surfaces and contemporary silhouettes.",
    featured: true,
    visualTone: "ink",
  },
];

export const collections: Collection[] = [
  {
    title: "Indigo Bloom",
    slug: "indigo-bloom",
    designerSlug: "amara-okoye",
    description:
      "A study in sculptural volume, deep indigo and the quiet drama of cloth in motion.",
    visualTone: "purple",
  },
  {
    title: "The Gathering",
    slug: "the-gathering",
    designerSlug: "tomi-adebayo",
    description:
      "Precise tailoring meets the warmth and collective energy of dressing together.",
    visualTone: "gold",
  },
  {
    title: "Golden Hour",
    slug: "golden-hour",
    designerSlug: "nia-mensah",
    description:
      "Hand-finished textiles and luminous colour capture the softness of late afternoon light.",
    visualTone: "ivory",
  },
];

const runwayLabels = [
  "Featured Runway",
  "Guest Presentation",
  "Emerging Runway",
] as const;
export const runwayShows: RunwayShow[] = designers.map((designer, index) => ({
  title: runwayLabels[index] ?? "Runway Programme",
  slug: `runway-programme-${index + 1}`,
  designerSlug: designer.slug,
  collectionSlug: collections[index]?.slug,
  status: "upcoming",
}));

export const schedule: ScheduleEvent[] = [];

export const partners: Partner[] = [];

export const prizeCategories = [
  "Best Designer",
  "Best Wedding Asoebi",
  "Best Innovative Fabric Design",
] as const;

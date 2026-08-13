export type Slug = string;

export interface FashionWeekEdition {
  title: string;
  slug: Slug;
  year?: number;
  theme?: string;
  tagline: string;
  description: string;
  startDate?: string;
  endDate?: string;
  city?: string;
  country?: string;
  venue?: string;
  ticketUrl?: string;
  isCurrentEdition: boolean;
}

export interface Designer {
  name: string;
  slug: Slug;
  location?: string;
  country?: string;
  bio: string;
  featured: boolean;
  visualTone: "purple" | "gold" | "ink";
}

export interface Collection {
  title: string;
  slug: Slug;
  designerSlug: Slug;
  season?: string;
  year?: number;
  description: string;
  muxPlaybackId?: string;
  visualTone: "purple" | "gold" | "ivory";
}

export interface RunwayShow {
  title: string;
  slug: Slug;
  designerSlug?: Slug;
  collectionSlug?: Slug;
  venue?: string;
  startsAt?: string;
  endsAt?: string;
  status: "upcoming" | "live" | "completed";
  muxPlaybackId?: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  type: "Runway" | "Presentation" | "Conversation" | "Celebration";
  description: string;
  startsAt?: string;
  endsAt?: string;
  venue?: string;
}

export interface Partner {
  name: string;
  tier: "presenting" | "principal" | "supporting";
  website?: string;
}

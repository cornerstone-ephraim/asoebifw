import { z } from "zod";

export const editionSchema = z.object({
  title: z.string(),
  slug: z.string(),
  year: z.number().optional(),
  theme: z.string().optional(),
  tagline: z.string(),
  description: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  venue: z.string().optional(),
  ticketUrl: z.string().optional(),
  isCurrentEdition: z.boolean(),
});

export const designersSchema = z.array(
  z.object({
    name: z.string(),
    slug: z.string(),
    location: z.string().optional(),
    country: z.string().optional(),
    bio: z.string(),
    featured: z.boolean().default(false),
    visualTone: z.enum(["purple", "gold", "ink"]).default("purple"),
  }),
);

export const collectionsSchema = z.array(
  z.object({
    title: z.string(),
    slug: z.string(),
    designerSlug: z.string(),
    season: z.string().optional(),
    year: z.number().optional(),
    description: z.string(),
    muxPlaybackId: z.string().optional(),
    visualTone: z.enum(["purple", "gold", "ivory"]).default("ivory"),
  }),
);

export const runwayShowsSchema = z.array(
  z.object({
    title: z.string(),
    slug: z.string(),
    designerSlug: z.string().optional(),
    collectionSlug: z.string().optional(),
    venue: z.string().optional(),
    startsAt: z.string().optional(),
    endsAt: z.string().optional(),
    status: z.enum(["upcoming", "live", "completed"]),
    muxPlaybackId: z.string().optional(),
  }),
);

export const scheduleSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    type: z.enum(["Runway", "Presentation", "Conversation", "Celebration"]),
    description: z.string(),
    startsAt: z.string().optional(),
    endsAt: z.string().optional(),
    venue: z.string().optional(),
  }),
);

export const partnersSchema = z.array(
  z.object({
    name: z.string(),
    tier: z.enum(["presenting", "principal", "supporting"]),
    website: z.string().optional(),
  }),
);

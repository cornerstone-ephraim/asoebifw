import "server-only";

import * as Sentry from "@sentry/nextjs";
import type { z } from "zod";

import {
  collections,
  currentEdition,
  designers,
  partners,
  runwayShows,
  schedule,
} from "@/content/fallback/site";
import {
  collectionsSchema,
  designersSchema,
  editionSchema,
  partnersSchema,
  runwayShowsSchema,
  scheduleSchema,
} from "@/features/content/schema";
import { sanityClient } from "@/sanity/client";
import {
  COLLECTIONS_QUERY,
  CURRENT_EDITION_QUERY,
  DESIGNERS_QUERY,
  PARTNERS_QUERY,
  RUNWAY_SHOWS_QUERY,
  SCHEDULE_QUERY,
} from "@/sanity/queries/content";

async function fetchContent<T>(
  query: string,
  schema: z.ZodType<T>,
  fallback: T,
) {
  if (!sanityClient) return fallback;
  try {
    return schema.parse(await sanityClient.fetch(query));
  } catch (error) {
    Sentry.captureException(error, { tags: { feature: "content" } });
    return fallback;
  }
}

// Sanity will replace this fixture source after credentials and approved content arrive.
export async function getCurrentEdition() {
  return fetchContent(CURRENT_EDITION_QUERY, editionSchema, currentEdition);
}
export async function getDesigners() {
  return fetchContent(DESIGNERS_QUERY, designersSchema, designers);
}
export async function getDesigner(slug: string) {
  return (await getDesigners()).find((item) => item.slug === slug);
}
export async function getCollections() {
  return fetchContent(COLLECTIONS_QUERY, collectionsSchema, collections);
}
export async function getCollection(slug: string) {
  return (await getCollections()).find((item) => item.slug === slug);
}
export async function getRunwayShows() {
  return fetchContent(RUNWAY_SHOWS_QUERY, runwayShowsSchema, runwayShows);
}
export async function getRunwayShow(slug: string) {
  return (await getRunwayShows()).find((item) => item.slug === slug);
}
export async function getSchedule() {
  return fetchContent(SCHEDULE_QUERY, scheduleSchema, schedule);
}
export async function getPartners() {
  return fetchContent(PARTNERS_QUERY, partnersSchema, partners);
}

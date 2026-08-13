import "server-only";

import { collections, currentEdition, designers, partners, runwayShows, schedule } from "@/content/fallback/site";

// Sanity will replace this fixture source after credentials and approved content arrive.
export async function getCurrentEdition() { return currentEdition; }
export async function getDesigners() { return designers; }
export async function getDesigner(slug: string) { return designers.find((item) => item.slug === slug); }
export async function getCollections() { return collections; }
export async function getCollection(slug: string) { return collections.find((item) => item.slug === slug); }
export async function getRunwayShows() { return runwayShows; }
export async function getRunwayShow(slug: string) { return runwayShows.find((item) => item.slug === slug); }
export async function getSchedule() { return schedule; }
export async function getPartners() { return partners; }

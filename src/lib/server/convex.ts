import "server-only";

import { ConvexHttpClient } from "convex/browser";
import {
  makeFunctionReference,
  type FunctionArgs,
  type FunctionReference,
  type FunctionReturnType,
} from "convex/server";

let client: ConvexHttpClient | null = null;

function getConvexUrl() {
  const url = process.env.CONVEX_URL ?? process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    throw new Error("Convex is not configured");
  }
  return url;
}

function getConvexClient() {
  client ??= new ConvexHttpClient(getConvexUrl());
  return client;
}

export function convexMutation<Args extends Record<string, unknown>, Result>(
  name: string,
) {
  return makeFunctionReference<"mutation", Args, Result>(name);
}

export async function runConvexMutation<
  Reference extends FunctionReference<"mutation">,
>(reference: Reference, args: FunctionArgs<Reference>) {
  return getConvexClient().mutation(reference, args) as Promise<
    FunctionReturnType<Reference>
  >;
}

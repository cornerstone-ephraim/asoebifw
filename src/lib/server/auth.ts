import "server-only";

import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convexSiteUrl =
  process.env.NEXT_PUBLIC_CONVEX_SITE_URL ??
  convexUrl?.replace(/\.convex\.cloud\/?$/, ".convex.site");

if (!convexUrl || !convexSiteUrl) {
  throw new Error("Convex authentication URLs are not configured.");
}

export const {
  handler,
  getToken,
  isAuthenticated,
  fetchAuthQuery,
  fetchAuthMutation,
  fetchAuthAction,
} = convexBetterAuthNextJs({
  convexUrl,
  convexSiteUrl,
});

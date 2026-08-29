import type { QueryCtx } from "../_generated/server";
import { isAdminEmail } from "../betterAuth/admins";

export async function requireAdmin(context: QueryCtx) {
  const identity = await context.auth.getUserIdentity();

  if (!identity || !isAdminEmail(identity.email)) {
    throw new Error("Unauthorized");
  }

  return identity;
}

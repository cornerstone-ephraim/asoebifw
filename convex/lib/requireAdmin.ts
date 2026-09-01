import type { MutationCtx, QueryCtx } from "../_generated/server";
import { isAdminEmail } from "../betterAuth/admins";

export async function requireAdmin(context: QueryCtx | MutationCtx) {
  const identity = await context.auth.getUserIdentity();

  if (!identity || !isAdminEmail(identity.email)) {
    throw new Error("Unauthorized");
  }

  return identity;
}

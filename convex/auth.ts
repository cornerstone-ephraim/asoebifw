import { query } from "./_generated/server";
import { isAdminEmail } from "./betterAuth/admins";

export const getCurrentAdmin = query({
  args: {},
  handler: async (context) => {
    const identity = await context.auth.getUserIdentity();

    if (!identity || !isAdminEmail(identity.email)) return null;

    return {
      email: identity.email,
      name: identity.name ?? "AEFW administrator",
    };
  },
});

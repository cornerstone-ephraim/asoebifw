import { mutationGeneric as mutation } from "convex/server";
import { v } from "convex/values";

export const createWaitlistEntry = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.union(
      v.literal("partner"),
      v.literal("designer"),
      v.literal("buyer"),
      v.literal("media"),
      v.literal("vendor"),
      v.literal("community"),
    ),
  },
  handler: async (context, input) => {
    const existing = await context.db
      .query("waitlistEntries")
      .withIndex("by_email", (query) => query.eq("email", input.email))
      .first();

    if (existing) return { status: "duplicate" as const };

    await context.db.insert("waitlistEntries", {
      ...input,
      status: "subscribed",
      submittedAt: Date.now(),
    });
    return { status: "created" as const };
  },
});

export const createAccreditationApplication = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.union(
      v.literal("press"),
      v.literal("buyer"),
      v.literal("designer"),
      v.literal("partner"),
      v.literal("other"),
    ),
    message: v.optional(v.string()),
  },
  handler: async (context, input) => {
    const existing = await context.db
      .query("accreditationApplications")
      .withIndex("by_email", (query) => query.eq("email", input.email))
      .first();

    if (existing) return { status: "duplicate" as const };

    await context.db.insert("accreditationApplications", {
      ...input,
      status: "submitted",
      submittedAt: Date.now(),
    });
    return { status: "created" as const };
  },
});

export const createPrizeApplication = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    category: v.union(
      v.literal("Best Designer"),
      v.literal("Best Wedding Asoebi"),
      v.literal("Best Innovative Fabric Design"),
    ),
    portfolio: v.string(),
    statement: v.string(),
    consent: v.literal(true),
  },
  handler: async (context, input) => {
    const existing = await context.db
      .query("prizeApplications")
      .filter((query) =>
        query.and(
          query.eq(query.field("email"), input.email),
          query.eq(query.field("category"), input.category),
        ),
      )
      .first();

    if (existing) return { status: "duplicate" as const };

    await context.db.insert("prizeApplications", {
      ...input,
      status: "submitted",
      submittedAt: Date.now(),
    });
    return { status: "created" as const };
  },
});

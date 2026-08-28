import { mutationGeneric as mutation } from "convex/server";
import { v } from "convex/values";

export const createWaitlistEntry = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    consent: v.literal(true),
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
      v.literal("media"),
      v.literal("buyer"),
      v.literal("designer"),
      v.literal("partner"),
      v.literal("vendor"),
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
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    submissionMode: v.union(
      v.literal("instagram"),
      v.literal("youtube"),
      v.literal("website"),
      v.literal("pdf"),
    ),
    submissionUrl: v.optional(v.string()),
    pdfStorageId: v.optional(v.id("_storage")),
    consent: v.literal(true),
  },
  handler: async (context, input) => {
    const existing = await context.db
      .query("prizeApplications")
      .withIndex("by_email", (query) => query.eq("email", input.email))
      .first();

    if (existing) {
      if (input.pdfStorageId) await context.storage.delete(input.pdfStorageId);
      return { status: "duplicate" as const };
    }

    await context.db.insert("prizeApplications", {
      ...input,
      status: "submitted",
      submittedAt: Date.now(),
    });
    return { status: "created" as const };
  },
});

export const generatePrizeUploadUrl = mutation({
  args: {},
  handler: (context) => context.storage.generateUploadUrl(),
});

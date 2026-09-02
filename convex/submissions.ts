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
    phone: v.string(),
    phoneCountry: v.string(),
    submissionMode: v.union(
      v.literal("instagram"),
      v.literal("youtube"),
      v.literal("website"),
      v.literal("pdf"),
    ),
    submissionUrl: v.optional(v.string()),
    idDocumentStorageId: v.id("_storage"),
    consent: v.literal(true),
  },
  handler: async (context, input) => {
    const existing = await context.db
      .query("prizeApplications")
      .withIndex("by_email", (query) => query.eq("email", input.email))
      .first();

    if (existing) {
      await context.storage.delete(input.idDocumentStorageId);
      const reviewUrl = existing.pdfStorageId
        ? await context.storage.getUrl(existing.pdfStorageId)
        : existing.submissionUrl;
      return {
        status: "duplicate" as const,
        applicationId: existing._id,
        firstName: existing.firstName ?? input.firstName,
        lastName: existing.lastName ?? input.lastName,
        email: existing.email,
        phone: existing.phone ?? input.phone,
        submissionMode: existing.submissionMode ?? input.submissionMode,
        reviewUrl,
        submittedAt: existing.submittedAt,
        shouldSendEmails:
          existing.emailStatus === "pending" ||
          existing.emailStatus === "failed",
      };
    }

    const submittedAt = Date.now();
    const applicationId = await context.db.insert("prizeApplications", {
      ...input,
      emailStatus: "pending",
      status: "submitted",
      submittedAt,
    });
    const reviewUrl = input.submissionUrl;
    return {
      status: "created" as const,
      applicationId,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      submissionMode: input.submissionMode,
      reviewUrl,
      submittedAt,
      shouldSendEmails: true,
    };
  },
});

export const generatePrizeIdUploadUrl = mutation({
  args: {},
  handler: async (context) => context.storage.generateUploadUrl(),
});

export const setPrizeEmailStatus = mutation({
  args: {
    applicationId: v.id("prizeApplications"),
    emailStatus: v.union(v.literal("sent"), v.literal("failed")),
  },
  handler: async (context, input) => {
    await context.db.patch(input.applicationId, {
      emailStatus: input.emailStatus,
    });
  },
});

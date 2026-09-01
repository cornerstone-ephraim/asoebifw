import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/requireAdmin";

const prizeApplicationStatus = v.union(
  v.literal("submitted"),
  v.literal("reviewing"),
  v.literal("reviewed"),
  v.literal("shortlisted"),
  v.literal("rejected"),
);

export const getOverview = query({
  args: {},
  handler: async (context) => {
    await requireAdmin(context);

    const [prizeApplications, waitlistEntries] = await Promise.all([
      context.db.query("prizeApplications").collect(),
      context.db.query("waitlistEntries").collect(),
    ]);

    return {
      prizeApplications: prizeApplications.length,
      awaitingReview: prizeApplications.filter(
        (application) => application.status === "submitted",
      ).length,
      failedPrizeEmails: prizeApplications.filter(
        (application) => application.emailStatus === "failed",
      ).length,
      waitlistEntries: waitlistEntries.length,
      recentActivity: [
        ...prizeApplications.map((application) => ({
          id: application._id,
          type: "prize" as const,
          firstName: application.firstName,
          lastName: application.lastName,
          name: application.name,
          email: application.email,
          submissionMode: application.submissionMode,
          status: application.status,
          submittedAt: application.submittedAt,
        })),
        ...waitlistEntries.map((entry) => ({
          id: entry._id,
          type: "waitlist" as const,
          firstName: entry.firstName,
          lastName: entry.lastName,
          name: entry.name,
          email: entry.email,
          submittedAt: entry.submittedAt,
        })),
      ]
        .sort((a, b) => b.submittedAt - a.submittedAt)
        .slice(0, 8),
    };
  },
});

export const listPrizeApplications = query({
  args: {},
  handler: async (context) => {
    await requireAdmin(context);

    const applications = await context.db
      .query("prizeApplications")
      .order("desc")
      .collect();

    return Promise.all(
      applications.map(async (application) => ({
        id: application._id,
        firstName: application.firstName,
        lastName: application.lastName,
        name: application.name,
        email: application.email,
        phone: application.phone,
        submissionMode: application.submissionMode,
        submissionUrl: application.submissionUrl,
        legacyPdfUrl: application.pdfStorageId
          ? await context.storage.getUrl(application.pdfStorageId)
          : null,
        idDocumentAvailable: Boolean(application.idDocumentStorageId),
        status: application.status,
        emailStatus: application.emailStatus,
        submittedAt: application.submittedAt,
      })),
    );
  },
});

export const getPrizeIdDocument = query({
  args: { applicationId: v.id("prizeApplications") },
  handler: async (context, { applicationId }) => {
    await requireAdmin(context);

    const application = await context.db.get(applicationId);
    if (!application?.idDocumentStorageId) return null;

    const url = await context.storage.getUrl(application.idDocumentStorageId);
    if (!url) return null;

    return {
      url,
      applicantName:
        [application.firstName, application.lastName]
          .filter(Boolean)
          .join(" ") ||
        application.name ||
        "applicant",
    };
  },
});

export const listWaitlistEntries = query({
  args: {},
  handler: async (context) => {
    await requireAdmin(context);

    const entries = await context.db
      .query("waitlistEntries")
      .order("desc")
      .collect();

    return entries.map((entry) => ({
      id: entry._id,
      firstName: entry.firstName,
      lastName: entry.lastName,
      name: entry.name,
      email: entry.email,
      status: entry.status,
      submittedAt: entry.submittedAt,
    }));
  },
});

export const updatePrizeStatus = mutation({
  args: {
    applicationId: v.id("prizeApplications"),
    status: prizeApplicationStatus,
  },
  handler: async (context, { applicationId, status }) => {
    const admin = await requireAdmin(context);
    const application = await context.db.get(applicationId);

    if (!application) throw new Error("Application not found");

    await context.db.patch(applicationId, {
      status,
      reviewedAt: Date.now(),
      reviewedBy: admin.email,
    });

    return { status };
  },
});

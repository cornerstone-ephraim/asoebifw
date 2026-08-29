import { query } from "./_generated/server";
import { requireAdmin } from "./lib/requireAdmin";

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
      waitlistEntries: waitlistEntries.length,
      recentPrizeApplications: prizeApplications
        .sort((a, b) => b.submittedAt - a.submittedAt)
        .slice(0, 5)
        .map((application) => ({
          id: application._id,
          firstName: application.firstName,
          lastName: application.lastName,
          name: application.name,
          email: application.email,
          submissionMode: application.submissionMode,
          submittedAt: application.submittedAt,
        })),
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
      .take(250);

    return Promise.all(
      applications.map(async (application) => ({
        id: application._id,
        firstName: application.firstName,
        lastName: application.lastName,
        name: application.name,
        email: application.email,
        submissionMode: application.submissionMode,
        submissionUrl: application.submissionUrl,
        legacyPdfUrl: application.pdfStorageId
          ? await context.storage.getUrl(application.pdfStorageId)
          : null,
        status: application.status,
        emailStatus: application.emailStatus,
        submittedAt: application.submittedAt,
      })),
    );
  },
});

export const listWaitlistEntries = query({
  args: {},
  handler: async (context) => {
    await requireAdmin(context);

    const entries = await context.db
      .query("waitlistEntries")
      .order("desc")
      .take(500);

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

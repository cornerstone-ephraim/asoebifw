"use server";

import * as Sentry from "@sentry/nextjs";
import { convexMutation, runConvexMutation } from "@/lib/server/convex";
import { runValidatedSubmission } from "@/lib/server/submit-action";
import { sponsorshipSchema, type SponsorshipInput } from "./schema";
import { sendSponsorshipEmails } from "./email";

const create = convexMutation<
  SponsorshipInput & { secret: string },
  { status: "created" | "duplicate"; id: string }
>("sponsorship:create");
const setEmailStatus = convexMutation<
  { secret: string; id: string; emailStatus: "sent" | "failed" },
  null
>("sponsorship:setEmailStatus");

export async function submitSponsorship(input: unknown) {
  return runValidatedSubmission({
    feature: "sponsorship",
    schema: sponsorshipSchema,
    input,
    successMessage:
      "Your sponsorship enquiry has been received. Our team will review it and follow up with you.",
    duplicateMessage:
      "We’ve already received an enquiry from this email in the last 10 minutes. Please allow our team to follow up, or try again later if you need to send a new enquiry.",
    duplicateStatus: "info",
    submit: async (data) => {
      const secret = process.env.SPONSORSHIP_SUBMISSION_SECRET;
      if (!secret)
        throw new Error("Sponsorship submissions are not configured");
      const result = await runConvexMutation(create, { ...data, secret });
      if (result.status === "duplicate") return result;
      let emailStatus: "sent" | "failed" = "sent";
      try {
        await sendSponsorshipEmails(data, result.id);
      } catch (error) {
        emailStatus = "failed";
        Sentry.captureException(error, {
          tags: { feature: "sponsorship", operation: "email" },
        });
      }
      try {
        await runConvexMutation(setEmailStatus, {
          secret,
          id: result.id,
          emailStatus,
        });
      } catch (error) {
        Sentry.captureException(error, {
          tags: { feature: "sponsorship", operation: "email-status" },
        });
      }
      return result;
    },
  });
}

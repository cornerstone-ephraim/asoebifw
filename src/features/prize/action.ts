"use server";

import * as Sentry from "@sentry/nextjs";

import { convexMutation, runConvexMutation } from "@/lib/server/convex";
import { runValidatedSubmission } from "@/lib/server/submit-action";
import { sendPrizeApplicationEmails } from "@/features/prize/email";
import {
  prizeApplicationSchema,
  type PrizeApplication,
  type PrizeApplicationInput,
  type PrizeSubmissionMode,
} from "@/features/prize/schema";

type PrizeSubmissionResult = {
  status: "created" | "duplicate";
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
  submissionMode: PrizeSubmissionMode;
  reviewUrl?: string | null;
  submittedAt: number;
  shouldSendEmails: boolean;
};

const createPrizeApplication = convexMutation<
  Omit<PrizeApplication, "website">,
  PrizeSubmissionResult
>("submissions:createPrizeApplication");

const setPrizeEmailStatus = convexMutation<
  { applicationId: string; emailStatus: "sent" | "failed" },
  null
>("submissions:setPrizeEmailStatus");

export async function submitPrizeApplication(input: PrizeApplicationInput) {
  return runValidatedSubmission({
    feature: "prize-application",
    schema: prizeApplicationSchema,
    input,
    submit: async ({
      firstName,
      lastName,
      email,
      submissionMode,
      submissionUrl,
      consent,
    }) => {
      const result = await runConvexMutation(createPrizeApplication, {
        firstName,
        lastName,
        email,
        submissionMode,
        submissionUrl,
        consent,
      });

      if (!result.shouldSendEmails) return result;

      try {
        await sendPrizeApplicationEmails({
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          submissionMode: result.submissionMode,
          reviewUrl: result.reviewUrl,
          submittedAt: result.submittedAt,
        });
        await runConvexMutation(setPrizeEmailStatus, {
          applicationId: result.applicationId,
          emailStatus: "sent",
        });
      } catch (error) {
        try {
          await runConvexMutation(setPrizeEmailStatus, {
            applicationId: result.applicationId,
            emailStatus: "failed",
          });
        } catch (statusError) {
          Sentry.captureException(statusError, {
            tags: {
              feature: "prize-application",
              operation: "mark-email-failed",
            },
          });
        }
        Sentry.captureException(error, {
          tags: { feature: "prize-application", operation: "send-emails" },
        });
        throw error;
      }

      return result;
    },
    successMessage:
      "Your two-collection submission has been received for the Asoebi Fashion Prize.",
    duplicateMessage:
      "An application from this email has already been received.",
    duplicateStatus: "info",
  });
}

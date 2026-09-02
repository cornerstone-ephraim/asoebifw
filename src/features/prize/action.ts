"use server";

import * as Sentry from "@sentry/nextjs";
import { z } from "zod";

import { convexMutation, runConvexMutation } from "@/lib/server/convex";
import { runValidatedSubmission } from "@/lib/server/submit-action";
import { sendPrizeApplicationEmails } from "@/features/prize/email";
import { normalizePrizePhone } from "@/features/prize/phone";
import {
  prizeApplicationSchema,
  type PrizeApplicationInput,
  type PrizeSubmissionMode,
} from "@/features/prize/schema";

type PrizeSubmissionResult = {
  status: "created" | "duplicate";
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  submissionMode: PrizeSubmissionMode;
  reviewUrl?: string | null;
  submittedAt: number;
  shouldSendEmails: boolean;
};

const createPrizeApplication = convexMutation<
  {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    phoneCountry: string;
    submissionMode: PrizeSubmissionMode;
    submissionUrl?: string;
    idDocumentStorageId: string;
    consent: true;
  },
  PrizeSubmissionResult
>("submissions:createPrizeApplication");

const generatePrizeIdUploadUrl = convexMutation<Record<string, never>, string>(
  "submissions:generatePrizeIdUploadUrl",
);

const setPrizeEmailStatus = convexMutation<
  { applicationId: string; emailStatus: "sent" | "failed" },
  null
>("submissions:setPrizeEmailStatus");

const uploadResponseSchema = z.object({ storageId: z.string().min(1) });

async function uploadIdDocument(idDocument: File) {
  const uploadUrl = await runConvexMutation(generatePrizeIdUploadUrl, {});
  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": idDocument.type },
    body: idDocument,
  });

  if (!response.ok) {
    throw new Error(`ID document upload failed with ${response.status}`);
  }

  return uploadResponseSchema.parse(await response.json()).storageId;
}

export async function submitPrizeApplication(input: PrizeApplicationInput) {
  return runValidatedSubmission({
    feature: "prize-application",
    schema: prizeApplicationSchema,
    input,
    submit: async ({
      firstName,
      lastName,
      email,
      phoneCountry,
      phoneNumber,
      submissionMode,
      submissionUrl,
      idDocument,
      consent,
    }) => {
      const phone = normalizePrizePhone(phoneCountry, phoneNumber);
      if (!phone) throw new Error("Validated phone number could not be parsed");

      const idDocumentStorageId = await uploadIdDocument(idDocument);
      const result = await runConvexMutation(createPrizeApplication, {
        firstName,
        lastName,
        email,
        phone,
        phoneCountry,
        submissionMode,
        submissionUrl,
        idDocumentStorageId,
        consent,
      });

      if (!result.shouldSendEmails) return result;

      try {
        await sendPrizeApplicationEmails({
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          phone: result.phone,
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

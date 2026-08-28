"use server";

import * as Sentry from "@sentry/nextjs";

import { convexMutation, runConvexMutation } from "@/lib/server/convex";
import { runValidatedSubmission } from "@/lib/server/submit-action";
import {
  prizeApplicationSchema,
  type PrizeApplication,
  type PrizeApplicationInput,
} from "@/features/prize/schema";

const createPrizeApplication = convexMutation<
  Omit<PrizeApplication, "website">,
  { status: "created" | "duplicate" }
>("submissions:createPrizeApplication");

const generatePrizeUploadUrlMutation = convexMutation<
  Record<string, never>,
  string
>("submissions:generatePrizeUploadUrl");

export async function getPrizeUploadUrl() {
  try {
    return {
      status: "success" as const,
      uploadUrl: await runConvexMutation(generatePrizeUploadUrlMutation, {}),
    };
  } catch (error) {
    Sentry.captureException(error, {
      tags: { feature: "prize-application", operation: "upload-url" },
    });
    return {
      status: "error" as const,
      message: "We could not prepare your upload. Please try again.",
    };
  }
}

export async function submitPrizeApplication(input: PrizeApplicationInput) {
  return runValidatedSubmission({
    feature: "prize-application",
    schema: prizeApplicationSchema,
    input,
    submit: ({
      firstName,
      lastName,
      email,
      submissionMode,
      submissionUrl,
      pdfStorageId,
      consent,
    }) =>
      runConvexMutation(createPrizeApplication, {
        firstName,
        lastName,
        email,
        submissionMode,
        submissionUrl,
        pdfStorageId,
        consent,
      }),
    successMessage:
      "Your two-collection submission has been received for the Asoebi Fashion Prize.",
    duplicateMessage:
      "An application from this email has already been received.",
    duplicateStatus: "info",
  });
}

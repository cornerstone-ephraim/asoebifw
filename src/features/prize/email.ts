import "server-only";

import { createHash } from "node:crypto";

import {
  buildAdminPrizeEmail,
  buildApplicantPrizeEmail,
} from "@/features/prize/email-templates";
import type { PrizeSubmissionMode } from "@/features/prize/schema";
import { getResend } from "@/lib/server/resend";

type PrizeEmailInput = {
  firstName: string;
  lastName: string;
  email: string;
  submissionMode: PrizeSubmissionMode;
  reviewUrl?: string | null;
  submittedAt: number;
};

function assertSuccessful(
  operation: string,
  response: { error: { message: string } | null },
) {
  if (response.error) {
    throw new Error(`${operation}: ${response.error.message}`);
  }
}

export async function sendPrizeApplicationEmails(input: PrizeEmailInput) {
  const { emailClient, from, notificationEmail, replyTo } = getResend();
  const applicantEmail = buildApplicantPrizeEmail(input);
  const adminEmail = buildAdminPrizeEmail(input);
  const applicationKey = createHash("sha256").update(input.email).digest("hex");

  const [confirmation, notification] = await Promise.all([
    emailClient.emails.send(
      {
        from,
        to: input.email,
        replyTo,
        subject: applicantEmail.subject,
        text: applicantEmail.text,
        html: applicantEmail.html,
      },
      { idempotencyKey: `prize-confirmation-${applicationKey}` },
    ),
    emailClient.emails.send(
      {
        from,
        to: notificationEmail,
        replyTo: input.email,
        subject: adminEmail.subject,
        text: adminEmail.text,
        html: adminEmail.html,
      },
      { idempotencyKey: `prize-notification-${applicationKey}` },
    ),
  ]);

  assertSuccessful("Send Prize application confirmation", confirmation);
  assertSuccessful("Send Prize application notification", notification);
}

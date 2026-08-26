"use server";

import * as Sentry from "@sentry/nextjs";

import { convexMutation, runConvexMutation } from "@/lib/server/convex";
import { runValidatedSubmission } from "@/lib/server/submit-action";
import { sendWaitlistEmails } from "@/features/waitlist/email";
import {
  waitlistSchema,
  type WaitlistInput,
  type WaitlistSubmission,
} from "@/features/waitlist/schema";

const createWaitlistEntry = convexMutation<
  Omit<WaitlistSubmission, "website">,
  { status: "created" | "duplicate" }
>("submissions:createWaitlistEntry");

export async function submitWaitlist(input: WaitlistInput) {
  return runValidatedSubmission({
    feature: "waitlist",
    schema: waitlistSchema,
    input,
    submit: async ({ firstName, lastName, email }) => {
      const result = await runConvexMutation(createWaitlistEntry, {
        firstName,
        lastName,
        email,
        consent: true,
      });

      if (result.status === "created") {
        try {
          await sendWaitlistEmails({ firstName, lastName, email });
        } catch (error) {
          Sentry.captureException(error, {
            tags: { feature: "waitlist", operation: "send-emails" },
          });
        }
      }

      return result;
    },
    successMessage: "You’re on the Asoebi Fashion Week waitlist.",
    duplicateMessage: "You’re already on the Asoebi Fashion Week waitlist.",
  });
}

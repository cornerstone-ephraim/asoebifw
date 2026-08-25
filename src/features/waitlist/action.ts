"use server";

import { convexMutation, runConvexMutation } from "@/lib/server/convex";
import { runValidatedSubmission } from "@/lib/server/submit-action";
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
    submit: ({ firstName, lastName, email }) =>
      runConvexMutation(createWaitlistEntry, {
        firstName,
        lastName,
        email,
        consent: true,
      }),
    successMessage: "You’re on the Asoebi Fashion Week waitlist.",
    duplicateMessage: "You’re already on the Asoebi Fashion Week waitlist.",
  });
}

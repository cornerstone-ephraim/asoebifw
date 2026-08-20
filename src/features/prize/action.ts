"use server";

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

export async function submitPrizeApplication(input: PrizeApplicationInput) {
  return runValidatedSubmission({
    feature: "prize-application",
    schema: prizeApplicationSchema,
    input,
    submit: ({ name, email, phone, category, portfolio, statement, consent }) =>
      runConvexMutation(createPrizeApplication, {
        name,
        email,
        phone,
        category,
        portfolio,
        statement,
        consent,
      }),
    successMessage: "Your Asoebi Prize application has been submitted.",
    duplicateMessage:
      "An application for this email and category has already been received.",
  });
}

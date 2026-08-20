"use server";

import { convexMutation, runConvexMutation } from "@/lib/server/convex";
import { runValidatedSubmission } from "@/lib/server/submit-action";
import {
  accreditationSchema,
  type AccreditationInput,
  type AccreditationSubmission,
} from "@/features/accreditation/schema";

const createAccreditationApplication = convexMutation<
  Omit<AccreditationSubmission, "website">,
  { status: "created" | "duplicate" }
>("submissions:createAccreditationApplication");

export async function submitAccreditation(input: AccreditationInput) {
  return runValidatedSubmission({
    feature: "accreditation",
    schema: accreditationSchema,
    input,
    submit: ({ name, email, role, message }) =>
      runConvexMutation(createAccreditationApplication, {
        name,
        email,
        role,
        message,
      }),
    successMessage: "Your accreditation request has been submitted.",
    duplicateMessage:
      "An accreditation request for this email has already been received.",
  });
}

import "server-only";

import * as Sentry from "@sentry/nextjs";
import type { z } from "zod";

import type { ActionResult } from "@/lib/action-result";

export async function runValidatedSubmission<Input, Output>({
  feature,
  schema,
  input,
  submit,
  successMessage,
  duplicateMessage,
  duplicateStatus = "success",
}: {
  feature: string;
  schema: z.ZodType<Input>;
  input: unknown;
  submit: (validated: Input) => Promise<Output>;
  successMessage: string;
  duplicateMessage?: string;
  duplicateStatus?: "success" | "info";
}): Promise<ActionResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the highlighted details and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  try {
    const result = await submit(parsed.data);
    const duplicate =
      typeof result === "object" &&
      result !== null &&
      "status" in result &&
      result.status === "duplicate";

    return {
      status: duplicate ? duplicateStatus : "success",
      message:
        duplicate && duplicateMessage ? duplicateMessage : successMessage,
    };
  } catch (error) {
    Sentry.captureException(error, { tags: { feature, operation: "submit" } });
    return {
      status: "error",
      message:
        "We could not submit your details right now. Please try again shortly.",
    };
  }
}

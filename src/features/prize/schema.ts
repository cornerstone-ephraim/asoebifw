import { z } from "zod";

export const prizeSubmissionModes = [
  { label: "Instagram", value: "instagram" },
  { label: "YouTube", value: "youtube" },
  { label: "Website URL", value: "website" },
  { label: "PDF", value: "pdf" },
] as const;

export type PrizeSubmissionMode =
  (typeof prizeSubmissionModes)[number]["value"];

export const MAX_PRIZE_PDF_SIZE = 20 * 1024 * 1024;

const nameSchema = (message: string) =>
  z
    .string()
    .trim()
    .min(1, { message })
    .max(60, { message: "Keep this name under 60 characters" })
    .regex(/^[\p{L}\p{M}' -]+$/u, {
      message: "Use letters, spaces, apostrophes or hyphens only",
    });

const submissionModeSchema = z.enum(
  prizeSubmissionModes.map((mode) => mode.value),
  { message: "Choose a submission mode" },
);

const baseApplicationFields = {
  firstName: nameSchema("Enter your first name"),
  lastName: nameSchema("Enter your last name"),
  email: z
    .string()
    .trim()
    .pipe(z.email({ message: "Enter a valid email address" }))
    .transform((value) => value.toLowerCase()),
  submissionMode: submissionModeSchema,
  submissionUrl: z.string().trim().max(500).optional().default(""),
  website: z
    .string()
    .max(0, { message: "Invalid submission" })
    .optional()
    .default(""),
};

type SubmissionValues = {
  submissionMode: PrizeSubmissionMode;
  submissionUrl?: string;
};

function validateSubmissionUrl(
  value: SubmissionValues,
  context: z.RefinementCtx,
) {
  if (value.submissionMode === "pdf") return;

  let url: URL;
  try {
    url = new URL(value.submissionUrl ?? "");
  } catch {
    context.addIssue({
      code: "custom",
      path: ["submissionUrl"],
      message: "Enter a valid submission link",
    });
    return;
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    context.addIssue({
      code: "custom",
      path: ["submissionUrl"],
      message: "Enter a public web link",
    });
    return;
  }

  const hostname = url.hostname.replace(/^www\./, "").toLowerCase();
  const expectedHosts: Partial<Record<PrizeSubmissionMode, string[]>> = {
    instagram: ["instagram.com"],
    youtube: ["youtube.com", "youtu.be"],
  };
  const allowedHosts = expectedHosts[value.submissionMode];

  if (allowedHosts && !allowedHosts.includes(hostname)) {
    context.addIssue({
      code: "custom",
      path: ["submissionUrl"],
      message: `Enter a valid ${value.submissionMode === "instagram" ? "Instagram" : "YouTube"} link`,
    });
  }
}

export const prizeApplicationFormSchema = z
  .object({
    ...baseApplicationFields,
    consent: z.boolean().refine((value) => value, {
      message: "Confirm that you are authorised to submit this work",
    }),
  })
  .superRefine(validateSubmissionUrl);

export const prizeApplicationSchema = z
  .object({
    ...baseApplicationFields,
    consent: z.literal(true, {
      message: "Confirm that you are authorised to submit this work",
    }),
    pdfStorageId: z.string().optional(),
  })
  .superRefine((value, context) => {
    validateSubmissionUrl(value, context);
    if (value.submissionMode === "pdf" && !value.pdfStorageId) {
      context.addIssue({
        code: "custom",
        path: ["pdfStorageId"],
        message: "Upload your collection PDF",
      });
    }
  });

export const prizeUploadResponseSchema = z.object({
  storageId: z.string().min(1),
});

export function validatePrizePdf(file?: File | null) {
  if (!file) return "Upload your collection PDF";
  if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
    return "Choose a PDF file";
  }
  if (file.size > MAX_PRIZE_PDF_SIZE) return "Keep the PDF under 20MB";
  return undefined;
}

export type PrizeApplicationFormInput = z.input<
  typeof prizeApplicationFormSchema
>;
export type PrizeApplicationForm = z.output<typeof prizeApplicationFormSchema>;
export type PrizeApplicationInput = z.input<typeof prizeApplicationSchema>;
export type PrizeApplication = z.output<typeof prizeApplicationSchema>;

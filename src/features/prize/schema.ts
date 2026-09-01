import { z } from "zod";

import {
  isPrizePhoneCountry,
  normalizePrizePhone,
} from "@/features/prize/phone";

export const prizeSubmissionModes = [
  { label: "PDF", value: "pdf" },
  { label: "YouTube", value: "youtube" },
  { label: "Instagram", value: "instagram" },
  { label: "Website URL", value: "website" },
] as const;

export type PrizeSubmissionMode =
  (typeof prizeSubmissionModes)[number]["value"];

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
  phoneCountry: z.string().refine(isPrizePhoneCountry, {
    message: "Choose a country code",
  }),
  phoneNumber: z.string().trim().min(1, {
    message: "Enter your phone number",
  }),
  submissionMode: submissionModeSchema,
  submissionUrl: z.string().trim().max(500).optional().default(""),
  website: z
    .string()
    .max(0, { message: "Invalid submission" })
    .optional()
    .default(""),
};

const idDocumentSchema = z
  .instanceof(File, { message: "Upload an ID document" })
  .refine((file) => file.size <= 8 * 1024 * 1024, {
    message: "Keep the ID document under 8 MB",
  })
  .refine(
    (file) =>
      [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/heic",
        "image/heif",
      ].includes(file.type),
    { message: "Upload a PDF, JPEG, PNG, WebP or HEIC file" },
  );

type SubmissionValues = {
  phoneCountry: string;
  phoneNumber: string;
  submissionMode: PrizeSubmissionMode;
  submissionUrl?: string;
};

function validateSubmissionUrl(
  value: SubmissionValues,
  context: z.RefinementCtx,
) {
  if (!normalizePrizePhone(value.phoneCountry, value.phoneNumber)) {
    context.addIssue({
      code: "custom",
      path: ["phoneNumber"],
      message: "Enter a valid phone number",
    });
  }

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
    idDocument: idDocumentSchema,
    consent: z.boolean().refine((value) => value, {
      message: "Confirm that you are authorised to submit this work",
    }),
  })
  .superRefine(validateSubmissionUrl);

export const prizeApplicationSchema = z
  .object({
    ...baseApplicationFields,
    idDocument: idDocumentSchema,
    consent: z.literal(true, {
      message: "Confirm that you are authorised to submit this work",
    }),
  })
  .superRefine(validateSubmissionUrl);

export type PrizeApplicationFormInput = z.input<
  typeof prizeApplicationFormSchema
>;
export type PrizeApplicationForm = z.output<typeof prizeApplicationFormSchema>;
export type PrizeApplicationInput = z.input<typeof prizeApplicationSchema>;
export type PrizeApplication = z.output<typeof prizeApplicationSchema>;

import { z } from "zod";

export const accreditationRoles = [
  "press",
  "buyer",
  "designer",
  "partner",
  "other",
] as const;

export const accreditationSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z
    .email("Enter a valid email")
    .transform((value) => value.toLowerCase()),
  role: z.enum(accreditationRoles),
  message: z.string().trim().max(600).optional(),
  website: z.string().max(0, "Invalid submission").optional().default(""),
});

export type AccreditationInput = z.input<typeof accreditationSchema>;
export type AccreditationSubmission = z.output<typeof accreditationSchema>;

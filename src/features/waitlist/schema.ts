import { z } from "zod";

const nameSchema = (emptyMessage: string) =>
  z
    .string()
    .trim()
    .min(1, emptyMessage)
    .max(60, "Keep this name under 60 characters")
    .regex(
      /^[\p{L}\p{M}' -]+$/u,
      "Use letters, spaces, apostrophes or hyphens only",
    );

export const waitlistSchema = z.object({
  firstName: nameSchema("Enter your first name"),
  lastName: nameSchema("Enter your last name"),
  email: z
    .string()
    .trim()
    .pipe(z.email("Enter a valid email address"))
    .transform((value) => value.toLowerCase()),
  consent: z
    .boolean()
    .refine((value) => value, "Consent is required to join the waitlist"),
  website: z.string().max(0, "Invalid submission").optional().default(""),
});

export type WaitlistInput = z.input<typeof waitlistSchema>;
export type WaitlistSubmission = z.output<typeof waitlistSchema>;

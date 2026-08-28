import { z } from "zod";

const nameSchema = (emptyMessage: string) =>
  z
    .string()
    .trim()
    .min(1, { message: emptyMessage })
    .max(60, { message: "Keep this name under 60 characters" })
    .regex(/^[\p{L}\p{M}' -]+$/u, {
      message: "Use letters, spaces, apostrophes or hyphens only",
    });

export const waitlistSchema = z.object({
  firstName: nameSchema("Enter your first name"),
  lastName: nameSchema("Enter your last name"),
  email: z
    .string()
    .trim()
    .pipe(z.email({ message: "Enter a valid email address" }))
    .transform((value) => value.toLowerCase()),
  consent: z.boolean().refine((value) => value === true, {
    message: "Consent is required to join the waitlist",
  }),
  website: z
    .string()
    .max(0, { message: "Invalid submission" })
    .optional()
    .default(""),
});

export type WaitlistInput = z.input<typeof waitlistSchema>;
export type WaitlistSubmission = z.output<typeof waitlistSchema>;

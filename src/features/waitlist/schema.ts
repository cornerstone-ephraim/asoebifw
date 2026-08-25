import { z } from "zod";

export const waitlistSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(60),
  lastName: z.string().trim().min(1, "Enter your last name").max(60),
  email: z
    .email("Enter a valid email address")
    .transform((value) => value.toLowerCase()),
  consent: z
    .boolean()
    .refine((value) => value, "Consent is required to join the waitlist"),
  website: z.string().max(0, "Invalid submission").optional().default(""),
});

export type WaitlistInput = z.input<typeof waitlistSchema>;
export type WaitlistSubmission = z.output<typeof waitlistSchema>;

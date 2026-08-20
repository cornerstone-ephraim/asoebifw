import { z } from "zod";

export const waitlistRoles = [
  "partner",
  "designer",
  "buyer",
  "media",
  "vendor",
  "community",
] as const;

export const waitlistSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z
    .email("Enter a valid email address")
    .transform((value) => value.toLowerCase()),
  role: z.enum(waitlistRoles),
  website: z.string().max(0, "Invalid submission").optional().default(""),
});

export type WaitlistInput = z.input<typeof waitlistSchema>;
export type WaitlistSubmission = z.output<typeof waitlistSchema>;

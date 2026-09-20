import { z } from "zod";

export const interests = [
  "Fashion Week",
  "Asoebi Prize",
  "After Party",
  "Wider AEFW platform",
  "Not sure yet",
] as const;
export const supportTypes = [
  "Financial sponsorship",
  "Products or services",
  "Both",
] as const;
export const enquiryStatuses = [
  "New",
  "Contacted",
  "In discussion",
  "Closed",
] as const;
export const sponsorshipSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(120),
  organisation: z.string().trim().min(2, "Enter your organisation.").max(160),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254)
    .pipe(z.email("Enter a valid email address.")),
  phone: z.string().trim().max(40),
  interest: z.enum(interests, { error: "Choose an area of interest." }),
  supportType: z.enum(supportTypes, { error: "Choose a type of support." }),
  budget: z.string().trim().max(120),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters).")
    .max(5000),
  website: z.string().max(0, "Unable to accept this submission."),
});
export type SponsorshipInput = z.infer<typeof sponsorshipSchema>;

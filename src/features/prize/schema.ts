import { z } from "zod";

export const prizeCategories = [
  "Best Designer",
  "Best Wedding Asoebi",
  "Best Innovative Fabric Design",
] as const;

export const prizeApplicationSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z
    .email("Enter a valid email address")
    .transform((value) => value.toLowerCase()),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  category: z.enum(prizeCategories, { message: "Choose a prize category" }),
  portfolio: z.url("Enter a valid portfolio or social profile link").max(500),
  statement: z
    .string()
    .trim()
    .min(20, "Tell us a little more about your work")
    .max(800, "Keep your response under 800 characters"),
  consent: z.literal(true, { message: "Confirm that these details are yours" }),
  website: z.string().max(0, "Invalid submission").optional().default(""),
});

export type PrizeApplicationInput = z.input<typeof prizeApplicationSchema>;
export type PrizeApplication = z.output<typeof prizeApplicationSchema>;

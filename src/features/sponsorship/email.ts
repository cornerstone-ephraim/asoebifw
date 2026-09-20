import "server-only";
import { Resend } from "resend";
import { z } from "zod";
import type { SponsorshipInput } from "./schema";

export async function sendSponsorshipEmails(
  input: SponsorshipInput,
  id: string,
) {
  const env = z
    .object({
      RESEND_API_KEY: z.string().min(1),
      RESEND_FROM_EMAIL: z.string().min(3),
      RESEND_REPLY_TO: z.email(),
      SPONSORSHIP_NOTIFICATION_EMAIL: z
        .email()
        .default("asoebifashionweek@gmail.com"),
    })
    .parse(process.env);
  const resend = new Resend(env.RESEND_API_KEY);
  const results = await Promise.allSettled([
    resend.emails.send(
      {
        from: env.RESEND_FROM_EMAIL,
        to: env.SPONSORSHIP_NOTIFICATION_EMAIL,
        replyTo: input.email,
        subject: "New AEFW sponsorship enquiry",
        text: `Name: ${input.name}\nOrganisation: ${input.organisation}\nEmail: ${input.email}\nPhone: ${input.phone || "Not provided"}\nInterest: ${input.interest}\nSupport: ${input.supportType}\nBudget: ${input.budget || "Not provided"}\n\n${input.message}\n\nReview enquiries at https://asoebifw.com/admin/sponsorship`,
      },
      { idempotencyKey: `sponsorship-team-${id}` },
    ),
    resend.emails.send(
      {
        from: env.RESEND_FROM_EMAIL,
        to: input.email,
        replyTo: env.RESEND_REPLY_TO,
        subject: "We’ve received your AEFW sponsorship enquiry",
        text: `Hi ${input.name},\n\nThank you for your interest in supporting Asoebi Fashion Week. Your enquiry has been received. Our team will review it and follow up with you to discuss the possibilities.\n\nAsoebi Fashion Week`,
      },
      { idempotencyKey: `sponsorship-confirmation-${id}` },
    ),
  ]);
  if (
    results.some((result) => result.status === "rejected" || result.value.error)
  )
    throw new Error("Sponsorship email delivery failed");
}

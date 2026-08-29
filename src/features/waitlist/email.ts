import "server-only";

import { createHash } from "node:crypto";

import { buildAdminWaitlistEmail } from "@/features/waitlist/admin-email-template";
import { syncNewsletterContactSafely } from "@/lib/server/newsletter";
import { getResend } from "@/lib/server/resend";

type WaitlistEmailInput = {
  firstName: string;
  lastName: string;
  email: string;
};

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

function assertSuccessful(
  operation: string,
  response: { error: { message: string } | null },
) {
  if (response.error) {
    throw new Error(`${operation}: ${response.error.message}`);
  }
}

export async function sendWaitlistEmails({
  firstName,
  lastName,
  email,
}: WaitlistEmailInput) {
  const { emailClient, from, notificationEmail, replyTo } = getResend();
  const safeFirstName = escapeHtml(firstName);
  const subscriberKey = createHash("sha256").update(email).digest("hex");
  const adminEmail = buildAdminWaitlistEmail({ firstName, lastName, email });

  const contactSync = syncNewsletterContactSafely({
    firstName,
    lastName,
    email,
    source: "waitlist",
  });

  const [confirmation, notification] = await Promise.all([
    emailClient.emails.send(
      {
        from,
        to: email,
        replyTo,
        subject: "You’re on the Asoebi Fashion Week waitlist",
        text: `Hi ${firstName},\n\nYou’re officially on the Asoebi Fashion Week waitlist. We’ll keep you close to announcements about AEFW, the Asoebi Prize and the wider platform.\n\nAsoebi Fashion Week`,
        html: `<div style="background:#fffaf1;color:#2a1157;font-family:Arial,sans-serif;padding:40px 20px"><div style="margin:0 auto;max-width:560px"><p style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase">Asoebi Fashion Week</p><h1 style="font-family:Georgia,serif;font-size:42px;line-height:1;margin:40px 0 24px">You’re in the circle.</h1><p style="font-size:17px;line-height:1.7">Hi ${safeFirstName},</p><p style="font-size:17px;line-height:1.7">You’re officially on the Asoebi Fashion Week waitlist. We’ll keep you close to announcements about AEFW, the Asoebi Prize and the wider platform.</p><p style="border-top:1px solid #dcd0ff;margin-top:40px;padding-top:24px;font-size:14px">The global home of Asoebi fashion, culture and celebration.</p></div></div>`,
      },
      { idempotencyKey: `waitlist-confirmation-${subscriberKey}` },
    ),
    emailClient.emails.send(
      {
        from,
        to: notificationEmail,
        replyTo: email,
        subject: `New in the AEFW circle: ${firstName} ${lastName}`,
        text: adminEmail.text,
        html: adminEmail.html,
      },
      { idempotencyKey: `waitlist-notification-${subscriberKey}` },
    ),
  ]);

  assertSuccessful("Send waitlist confirmation", confirmation);
  assertSuccessful("Send waitlist notification", notification);
  await contactSync;
}

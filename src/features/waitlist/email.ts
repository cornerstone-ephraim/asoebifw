import "server-only";

import { createHash } from "node:crypto";

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

async function syncWaitlistContact({
  firstName,
  lastName,
  email,
}: WaitlistEmailInput) {
  const { client, waitlistSegmentId } = getResend();
  const existingContact = await client.contacts.get({ email });

  if (existingContact.error?.name === "not_found") {
    const createdContact = await client.contacts.create({
      email,
      firstName,
      lastName,
      segments: [{ id: waitlistSegmentId }],
      unsubscribed: false,
    });

    assertSuccessful("Create Resend contact", createdContact);
    return;
  }

  assertSuccessful("Find Resend contact", existingContact);

  const updatedContact = await client.contacts.update({
    email,
    firstName,
    lastName,
    unsubscribed: false,
  });
  assertSuccessful("Update Resend contact", updatedContact);

  const segment = await client.contacts.segments.add({
    email,
    segmentId: waitlistSegmentId,
  });
  assertSuccessful("Add Resend contact to waitlist segment", segment);
}

export async function sendWaitlistEmails({
  firstName,
  lastName,
  email,
}: WaitlistEmailInput) {
  const { client, from, notificationEmail, replyTo } = getResend();
  const safeFirstName = escapeHtml(firstName);
  const safeLastName = escapeHtml(lastName);
  const safeEmail = escapeHtml(email);
  const subscriberKey = createHash("sha256").update(email).digest("hex");

  await syncWaitlistContact({ firstName, lastName, email });

  const [confirmation, notification] = await Promise.all([
    client.emails.send(
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
    client.emails.send(
      {
        from,
        to: notificationEmail,
        replyTo: email,
        subject: `New waitlist signup: ${firstName} ${lastName}`,
        text: `A new person joined the Asoebi Fashion Week waitlist.\n\nName: ${firstName} ${lastName}\nEmail: ${email}`,
        html: `<div style="font-family:Arial,sans-serif;padding:24px"><h1 style="font-size:24px">New waitlist signup</h1><p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p><p><strong>Email:</strong> ${safeEmail}</p></div>`,
      },
      { idempotencyKey: `waitlist-notification-${subscriberKey}` },
    ),
  ]);

  assertSuccessful("Send waitlist confirmation", confirmation);
  assertSuccessful("Send waitlist notification", notification);
}

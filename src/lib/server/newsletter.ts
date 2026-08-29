import "server-only";

import * as Sentry from "@sentry/nextjs";

import { getResend } from "@/lib/server/resend";

type NewsletterContact = {
  firstName: string;
  lastName: string;
  email: string;
  source: "waitlist" | "prize" | "after-party";
};

function assertSuccessful(
  operation: string,
  response: { error: { message: string; name?: string } | null },
) {
  if (response.error) {
    throw new Error(`${operation}: ${response.error.message}`);
  }
}

async function syncNewsletterContact({
  firstName,
  lastName,
  email,
}: NewsletterContact) {
  const { contactsClient, waitlistSegmentId } = getResend();
  const existingContact = await contactsClient.contacts.get({ email });

  if (existingContact.error?.name === "not_found") {
    const createdContact = await contactsClient.contacts.create({
      email,
      firstName,
      lastName,
      segments: [{ id: waitlistSegmentId }],
      unsubscribed: false,
    });

    assertSuccessful("Create Resend newsletter contact", createdContact);
    return;
  }

  assertSuccessful("Find Resend newsletter contact", existingContact);

  const updatedContact = await contactsClient.contacts.update({
    email,
    firstName,
    lastName,
    unsubscribed: false,
  });
  assertSuccessful("Update Resend newsletter contact", updatedContact);

  const segment = await contactsClient.contacts.segments.add({
    email,
    segmentId: waitlistSegmentId,
  });
  assertSuccessful("Add contact to newsletter segment", segment);
}

export async function syncNewsletterContactSafely(input: NewsletterContact) {
  try {
    await syncNewsletterContact(input);
  } catch (error) {
    Sentry.captureException(error, {
      tags: {
        feature: "newsletter",
        operation: "sync-resend-contact",
        source: input.source,
      },
    });
  }
}

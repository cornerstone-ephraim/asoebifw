import "server-only";

import { Resend } from "resend";
import { z } from "zod";

const resendEnvironmentSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().min(3),
  RESEND_REPLY_TO: z.email(),
  RESEND_WAITLIST_SEGMENT_ID: z.string().min(1),
  WAITLIST_NOTIFICATION_EMAIL: z.email(),
});

let resend: Resend | null = null;

export function getResend() {
  const environment = resendEnvironmentSchema.parse(process.env);
  resend ??= new Resend(environment.RESEND_API_KEY);

  return {
    client: resend,
    from: environment.RESEND_FROM_EMAIL,
    replyTo: environment.RESEND_REPLY_TO,
    waitlistSegmentId: environment.RESEND_WAITLIST_SEGMENT_ID,
    notificationEmail: environment.WAITLIST_NOTIFICATION_EMAIL,
  };
}

import type { PrizeSubmissionMode } from "@/features/prize/schema";

type PrizeEmailInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  submissionMode: PrizeSubmissionMode;
  reviewUrl?: string | null;
  submittedAt: number;
};

const modeLabels: Record<PrizeSubmissionMode, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  website: "Website",
  pdf: "PDF",
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

function formatSubmissionTime(submittedAt: number) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
    timeZoneName: "short",
  }).format(new Date(submittedAt));
}

export function buildApplicantPrizeEmail({
  firstName,
  submissionMode,
}: PrizeEmailInput) {
  const safeFirstName = escapeHtml(firstName);
  const mode = modeLabels[submissionMode];

  return {
    subject: "Your Asoebi Fashion Prize application is in",
    text: `Hi ${firstName},\n\nYour application for the Asoebi Fashion Prize has been received.\n\nSubmission mode: ${mode}\nApplication deadline: 19 December 2026\n\nKeep your submitted link public or unlisted and accessible until judging ends.\n\nWear Your Heritage. Design the Future.\n\nAsoebi Fashion Week`,
    html: `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f1ecf7;color:#2a1157;font-family:Arial,Helvetica,sans-serif;padding:0;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your two-collection submission has been received.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f1ecf7;width:100%;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;width:100%;">
            <tr>
              <td style="background:#1a0b2e;border-radius:28px 28px 0 0;padding:30px 34px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;letter-spacing:-1px;">AEFW<span style="color:#ffc845;">.</span></td>
                    <td align="right"><span style="background:#ffc845;border-radius:999px;color:#1a0b2e;display:inline-block;font-size:10px;font-weight:800;letter-spacing:1.5px;padding:8px 12px;text-transform:uppercase;">Prize 2026</span></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;padding:42px 34px 38px;">
                <p style="color:#6f4a8e;font-size:11px;font-weight:800;letter-spacing:2px;margin:0 0 16px;text-transform:uppercase;">Application received</p>
                <h1 style="color:#2a1157;font-family:Georgia,'Times New Roman',serif;font-size:44px;font-weight:500;letter-spacing:-1.5px;line-height:1.02;margin:0;">Your collections<br>are in.</h1>
                <p style="color:#5f5669;font-size:16px;line-height:1.7;margin:24px 0 10px;">Hi ${safeFirstName},</p>
                <p style="color:#5f5669;font-size:16px;line-height:1.7;margin:0 0 30px;">We have received your two-collection submission for the Asoebi Fashion Prize.</p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#fff9e8;border:1px solid #f5d77d;border-radius:20px;width:100%;">
                  <tr>
                    <td style="padding:22px 24px;border-bottom:1px solid #f5d77d;">
                      <p style="color:#7a5b00;font-size:10px;font-weight:800;letter-spacing:1.5px;margin:0 0 7px;text-transform:uppercase;">Submission mode</p>
                      <p style="color:#2a1157;font-size:18px;font-weight:700;margin:0;">${mode}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:22px 24px;">
                      <p style="color:#7a5b00;font-size:10px;font-weight:800;letter-spacing:1.5px;margin:0 0 7px;text-transform:uppercase;">Application deadline</p>
                      <p style="color:#2a1157;font-size:18px;font-weight:700;margin:0;">19 December 2026</p>
                    </td>
                  </tr>
                </table>

                <p style="color:#5f5669;font-size:14px;line-height:1.7;margin:28px 0 0;">Keep your submitted link public or unlisted and accessible until judging ends.</p>
                <p style="border-top:1px solid #e8ddf2;color:#2a1157;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.35;margin:32px 0 0;padding-top:24px;">Wear Your Heritage.<br>Design the Future.</p>
              </td>
            </tr>
            <tr>
              <td style="background:#2a1157;border-radius:0 0 28px 28px;color:#dcd0ff;font-size:11px;letter-spacing:.4px;padding:20px 34px;">Asoebi Fashion Week · Discovering the Future of African Fashion.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
}

export function buildAdminPrizeEmail({
  firstName,
  lastName,
  email,
  phone,
  submissionMode,
  reviewUrl,
  submittedAt,
}: PrizeEmailInput) {
  const safeFirstName = escapeHtml(firstName);
  const safeLastName = escapeHtml(lastName);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeReviewUrl = reviewUrl ? escapeHtml(reviewUrl) : undefined;
  const mode = modeLabels[submissionMode];
  const submissionTime = formatSubmissionTime(submittedAt);
  const reviewLabel =
    submissionMode === "pdf" ? "Open collection PDF" : "View collections";

  return {
    subject: `New Prize application: ${firstName} ${lastName}`,
    text: `NEW ASOEBI FASHION PRIZE APPLICATION\n\n${firstName} ${lastName} submitted two collections for review.\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nSubmission mode: ${mode}\nSubmitted: ${submissionTime}${reviewUrl ? `\nReview submission: ${reviewUrl}` : ""}\n\nReply to this email to contact ${firstName}.`,
    html: `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f1ecf7;color:#2a1157;font-family:Arial,Helvetica,sans-serif;padding:0;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safeFirstName} ${safeLastName} submitted two collections for the Asoebi Fashion Prize.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f1ecf7;width:100%;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;width:100%;">
            <tr>
              <td style="background:#1a0b2e;border-radius:28px 28px 0 0;padding:30px 34px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;letter-spacing:-1px;">AEFW<span style="color:#ffc845;">.</span></td>
                    <td align="right"><span style="background:#ffc845;border-radius:999px;color:#1a0b2e;display:inline-block;font-size:10px;font-weight:800;letter-spacing:1.5px;padding:8px 12px;text-transform:uppercase;">New application</span></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;padding:42px 34px 38px;">
                <p style="color:#6f4a8e;font-size:11px;font-weight:800;letter-spacing:2px;margin:0 0 16px;text-transform:uppercase;">Ready for review</p>
                <h1 style="color:#2a1157;font-family:Georgia,'Times New Roman',serif;font-size:42px;font-weight:500;letter-spacing:-1.5px;line-height:1.05;margin:0;">Two collections.<br>One new point of view.</h1>
                <p style="color:#5f5669;font-size:16px;line-height:1.65;margin:22px 0 30px;">A new Asoebi Fashion Prize application has arrived.</p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#fff9e8;border:1px solid #f5d77d;border-radius:20px;width:100%;">
                  <tr>
                    <td style="padding:22px 24px 12px;">
                      <p style="color:#7a5b00;font-size:10px;font-weight:800;letter-spacing:1.5px;margin:0 0 7px;text-transform:uppercase;">Applicant</p>
                      <p style="color:#2a1157;font-size:20px;font-weight:700;line-height:1.35;margin:0;">${safeFirstName} ${safeLastName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 24px;">
                      <p style="color:#7a5b00;font-size:10px;font-weight:800;letter-spacing:1.5px;margin:0 0 7px;text-transform:uppercase;">Email</p>
                      <a href="mailto:${safeEmail}" style="color:#52239f;font-size:15px;font-weight:700;line-height:1.5;text-decoration:none;word-break:break-word;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 24px;">
                      <p style="color:#7a5b00;font-size:10px;font-weight:800;letter-spacing:1.5px;margin:0 0 7px;text-transform:uppercase;">Phone</p>
                      <a href="tel:${safePhone}" style="color:#52239f;font-size:15px;font-weight:700;line-height:1.5;text-decoration:none;">${safePhone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 24px 24px;">
                      <p style="color:#7a5b00;font-size:10px;font-weight:800;letter-spacing:1.5px;margin:0 0 7px;text-transform:uppercase;">Submission mode</p>
                      <p style="color:#2a1157;font-size:17px;font-weight:700;margin:0;">${mode}</p>
                    </td>
                  </tr>
                </table>

                ${safeReviewUrl ? `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;"><tr><td style="background:#52239f;border-radius:999px;"><a href="${safeReviewUrl}" style="color:#ffffff;display:inline-block;font-size:12px;font-weight:800;letter-spacing:1px;padding:15px 22px;text-decoration:none;text-transform:uppercase;">${reviewLabel}</a></td></tr></table>` : ""}

                <p style="border-top:1px solid #e8ddf2;color:#81778b;font-size:12px;line-height:1.6;margin:34px 0 0;padding-top:20px;">Submitted ${submissionTime}. Reply to this email to contact ${safeFirstName}.</p>
              </td>
            </tr>
            <tr>
              <td style="background:#2a1157;border-radius:0 0 28px 28px;color:#dcd0ff;font-size:11px;letter-spacing:.4px;padding:20px 34px;">Asoebi Fashion Week · Prize application notification.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
}

type AdminWaitlistEmailInput = {
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

function formatSignupTime() {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
    timeZoneName: "short",
  }).format(new Date());
}

export function buildAdminWaitlistEmail({
  firstName,
  lastName,
  email,
}: AdminWaitlistEmailInput) {
  const safeFirstName = escapeHtml(firstName);
  const safeLastName = escapeHtml(lastName);
  const safeEmail = escapeHtml(email);
  const signupTime = formatSignupTime();

  return {
    text: `NEW AEFW WAITLIST SIGNUP\n\n${firstName} ${lastName} has joined the Asoebi Fashion Week waitlist.\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nJoined: ${signupTime}\n\nReply to this email to contact ${firstName}.`,
    html: `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f1ecf7;color:#2a1157;font-family:Arial,Helvetica,sans-serif;padding:0;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safeFirstName} ${safeLastName} just joined the AEFW waitlist.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f1ecf7;width:100%;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;width:100%;">
            <tr>
              <td style="background:#1a0b2e;border-radius:28px 28px 0 0;padding:30px 34px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;letter-spacing:-1px;">AEFW<span style="color:#ffc845;">.</span></td>
                    <td align="right"><span style="background:#ffc845;border-radius:999px;color:#1a0b2e;display:inline-block;font-size:10px;font-weight:800;letter-spacing:1.5px;padding:8px 12px;text-transform:uppercase;">Waitlist</span></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;padding:42px 34px 36px;">
                <p style="color:#6f4a8e;font-size:11px;font-weight:800;letter-spacing:2px;margin:0 0 16px;text-transform:uppercase;">A new name in the circle</p>
                <h1 style="color:#2a1157;font-family:Georgia,'Times New Roman',serif;font-size:42px;font-weight:500;letter-spacing:-1.5px;line-height:1.05;margin:0;">Someone new<br>just joined.</h1>
                <p style="color:#5f5669;font-size:16px;line-height:1.65;margin:22px 0 30px;">A new subscriber has signed up to hear what is taking shape across Asoebi Fashion Week.</p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#fff9e8;border:1px solid #f5d77d;border-radius:20px;width:100%;">
                  <tr>
                    <td style="padding:24px 24px 12px;">
                      <p style="color:#7a5b00;font-size:10px;font-weight:800;letter-spacing:1.5px;margin:0 0 7px;text-transform:uppercase;">Name</p>
                      <p style="color:#2a1157;font-size:20px;font-weight:700;line-height:1.35;margin:0;">${safeFirstName} ${safeLastName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 24px 24px;">
                      <p style="color:#7a5b00;font-size:10px;font-weight:800;letter-spacing:1.5px;margin:0 0 7px;text-transform:uppercase;">Email</p>
                      <a href="mailto:${safeEmail}" style="color:#52239f;font-size:16px;font-weight:700;line-height:1.5;text-decoration:none;word-break:break-word;">${safeEmail}</a>
                    </td>
                  </tr>
                </table>

                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                  <tr>
                    <td style="background:#52239f;border-radius:999px;">
                      <a href="mailto:${safeEmail}" style="color:#ffffff;display:inline-block;font-size:12px;font-weight:800;letter-spacing:1px;padding:15px 22px;text-decoration:none;text-transform:uppercase;">Reply to ${safeFirstName}</a>
                    </td>
                  </tr>
                </table>

                <p style="border-top:1px solid #e8ddf2;color:#81778b;font-size:12px;line-height:1.6;margin:34px 0 0;padding-top:20px;">Joined ${signupTime}. This notification was sent automatically from the AEFW waitlist.</p>
              </td>
            </tr>
            <tr>
              <td style="background:#2a1157;border-radius:0 0 28px 28px;color:#dcd0ff;font-size:11px;letter-spacing:.4px;padding:20px 34px;">Asoebi Fashion Week · The global home of Asoebi fashion, culture and celebration.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
}

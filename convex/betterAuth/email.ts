const resendEndpoint = "https://api.resend.com/emails";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendAdminSignInCode({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const replyTo = process.env.RESEND_REPLY_TO;

  if (!apiKey || !from || !replyTo) {
    throw new Error("Admin sign-in email is not configured.");
  }

  const safeOtp = escapeHtml(otp);
  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      reply_to: replyTo,
      subject: `${otp} is your AEFW admin sign-in code`,
      text: `Your AEFW admin sign-in code is ${otp}. It expires in 10 minutes.`,
      html: `
        <div style="background:#f4effb;padding:40px 16px;font-family:Arial,sans-serif;color:#22113f">
          <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:24px;overflow:hidden">
            <div style="background:#2a1157;padding:24px 32px;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.02em">AEFW.</div>
            <div style="padding:36px 32px">
              <p style="margin:0 0 12px;color:#6d4aa1;font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase">Admin access</p>
              <h1 style="margin:0 0 16px;font-size:30px;line-height:1.1">Your sign-in code</h1>
              <p style="margin:0 0 28px;color:#574d61;font-size:16px;line-height:1.6">Use this one-time code to access the Asoebi Fashion Week administration area.</p>
              <div style="background:#fff1b8;border-radius:16px;padding:20px;text-align:center;font-size:36px;font-weight:800;letter-spacing:0.18em;color:#2a1157">${safeOtp}</div>
              <p style="margin:24px 0 0;color:#756b7e;font-size:13px;line-height:1.5">This code expires in 10 minutes. If you did not request it, you can ignore this email.</p>
            </div>
          </div>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend rejected the sign-in email (${response.status}).`);
  }
}

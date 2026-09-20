# Sponsorship setup

The public page is `/sponsorship`. Existing homepage and footer sponsor links now point there. Admins review enquiries at `/admin/sponsorship` with the existing admin login.

## Environment

1. Generate a secret with `openssl rand -hex 32`. Set `SPONSORSHIP_SUBMISSION_SECRET` to the **same value** in Vercel and the matching Convex deployment (Dashboard → Settings → Environment Variables). For local development, put it in `.env.local` and in the development Convex deployment. Use separate secrets for development and production. Never use a `NEXT_PUBLIC_` prefix.
2. Confirm Vercel has `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (a verified sender) and `RESEND_REPLY_TO` (a monitored inbox). Sponsorship uses the existing Resend service and needs no newsletter segment or audience setup.
3. Optionally set `SPONSORSHIP_NOTIFICATION_EMAIL` in Vercel. It defaults to `asoebifashionweek@gmail.com`.

## Deploy

Deploy the Convex changes as well as the Next.js site. If the existing Vercel build already runs Convex deployment, retain it. Otherwise run `bunx convex deploy` against the intended production deployment, then redeploy Vercel. Locally, `bunx convex dev` publishes the development functions and schema. Verify that `NEXT_PUBLIC_CONVEX_URL` points to the matching deployment.

No manual table creation, migration of existing applications, new admin accounts or paid form service is required. The new table is added by the Convex schema deployment. Existing admin access controls apply.

## Verify after deployment

Submit one enquiry using an inbox you control. Confirm it appears in `/admin/sponsorship`, that the team notification and acknowledgement arrive, and that changing the status persists after refresh. Verify both mobile and desktop links reach the page.

Enquiries are saved before email is attempted. The admin card reports sent, failed, or pending/unconfirmed email delivery. “Sent” means Resend accepted both messages, not confirmed inbox delivery. A failed message does not remove the enquiry. Follow up directly if delivery fails; there is no automatic email retry in this version. The team notification uses the enquirer's email as Reply-To.

A hidden honeypot, bounded server-validated fields, a server-to-server secret, and a ten-minute per-email cooldown limit basic spam and repeat email notifications. The cooldown applies even if the message changes; the form explains this. This is basic protection, not a CAPTCHA or comprehensive abuse prevention system.

Enquiries are not added to the marketing list. Sponsorship amounts and benefits remain a conversation with the team.

export const adminEmails = [
  "studio@koroye.com",
  "orimolade_abiola01@yahoo.com",
  "thecornerstoneephraim@gmail.com",
  "asoebifashionweek@gmail.com",
] as const;

const normalizedAdminEmails = new Set(
  adminEmails.map((email) => email.toLowerCase()),
);

export function isAdminEmail(
  email: string | null | undefined,
): email is (typeof adminEmails)[number] {
  return Boolean(email && normalizedAdminEmails.has(email.toLowerCase()));
}

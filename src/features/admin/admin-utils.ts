export function formatAdminDate(timestamp: number) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  }).format(new Date(timestamp));
}

export function getApplicantName({
  firstName,
  lastName,
  name,
}: {
  firstName?: string;
  lastName?: string;
  name?: string;
}) {
  return [firstName, lastName].filter(Boolean).join(" ") || name || "Unnamed";
}

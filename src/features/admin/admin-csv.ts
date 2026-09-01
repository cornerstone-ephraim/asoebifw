import type { WaitlistEntry } from "@/features/admin/admin-types";
import { getApplicantName } from "@/features/admin/admin-utils";

function escapeCsv(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export function createWaitlistCsv(entries: WaitlistEntry[]) {
  const rows = entries.map((entry) =>
    [
      getApplicantName(entry),
      entry.email,
      new Date(entry.submittedAt).toISOString(),
    ]
      .map(escapeCsv)
      .join(","),
  );

  return [`"Name","Email address","Joined"`, ...rows].join("\n");
}

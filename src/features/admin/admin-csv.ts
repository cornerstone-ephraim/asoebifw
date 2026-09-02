import type {
  PrizeApplication,
  WaitlistEntry,
} from "@/features/admin/admin-types";
import { getApplicantName } from "@/features/admin/admin-utils";

function escapeCsv(value: string) {
  const spreadsheetSafeValue = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${spreadsheetSafeValue.replaceAll('"', '""')}"`;
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

export function createPrizeApplicationsCsv(applications: PrizeApplication[]) {
  const rows = applications.map((application) =>
    [
      getApplicantName(application),
      application.email,
      application.phone ?? "",
      application.submissionMode ?? "Legacy",
      application.submissionUrl ?? application.legacyPdfUrl ?? "",
      application.idDocumentAvailable ? "Available" : "Unavailable",
      application.status,
      application.emailStatus ?? "Unknown",
      new Date(application.submittedAt).toISOString(),
    ]
      .map(escapeCsv)
      .join(","),
  );

  return [
    '"Name","Email address","Phone number","Submission mode","Submission link","ID document","Review status","Email status","Received"',
    ...rows,
  ].join("\n");
}

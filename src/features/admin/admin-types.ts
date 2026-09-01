import type { Id } from "../../../convex/_generated/dataModel";

export type PrizeApplicationStatus =
  "submitted" | "reviewing" | "reviewed" | "shortlisted" | "rejected";

export type PrizeEmailStatus = "pending" | "sent" | "failed";

export type PrizeSubmissionMode = "instagram" | "youtube" | "website" | "pdf";

export type PrizeApplication = {
  id: Id<"prizeApplications">;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string;
  submissionMode?: PrizeSubmissionMode;
  submissionUrl?: string;
  legacyPdfUrl?: string | null;
  idDocumentAvailable: boolean;
  status: PrizeApplicationStatus;
  emailStatus?: PrizeEmailStatus;
  submittedAt: number;
};

export type WaitlistEntry = {
  id: Id<"waitlistEntries">;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  status: "subscribed";
  submittedAt: number;
};

export const prizeStatusOptions = [
  { label: "Awaiting review", value: "submitted" },
  { label: "Reviewing", value: "reviewing" },
  { label: "Reviewed", value: "reviewed" },
  { label: "Shortlisted", value: "shortlisted" },
  { label: "Rejected", value: "rejected" },
] as const satisfies ReadonlyArray<{
  label: string;
  value: PrizeApplicationStatus;
}>;

export function getPrizeStatusLabel(status: PrizeApplicationStatus) {
  return (
    prizeStatusOptions.find((option) => option.value === status)?.label ??
    status
  );
}

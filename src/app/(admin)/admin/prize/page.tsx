import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { api } from "../../../../../convex/_generated/api";
import { AdminPageHeader } from "@/features/admin/admin-page-header";
import { AdminShell } from "@/features/admin/admin-shell";
import { PrizeApplicationsTable } from "@/features/admin/prize-applications-table";
import { fetchAuthQuery } from "@/lib/server/auth";
import type {
  PrizeApplicationStatus,
  PrizeEmailStatus,
} from "@/features/admin/admin-types";

export const metadata: Metadata = {
  title: "Prize applications",
  robots: { index: false, follow: false },
};

const prizeStatuses = new Set<PrizeApplicationStatus>([
  "submitted",
  "reviewing",
  "reviewed",
  "shortlisted",
  "rejected",
]);
const emailStatuses = new Set<PrizeEmailStatus>(["pending", "sent", "failed"]);

export default async function AdminPrizePage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    status?: string;
    emailStatus?: string;
  }>;
}) {
  const admin = await fetchAuthQuery(api.auth.getCurrentAdmin);
  if (!admin) redirect("/admin/sign-in");

  const filters = await searchParams;
  const applications = await fetchAuthQuery(api.admin.listPrizeApplications);
  const initialStatus = prizeStatuses.has(
    filters.status as PrizeApplicationStatus,
  )
    ? (filters.status as PrizeApplicationStatus)
    : "all";
  const initialEmailStatus = emailStatuses.has(
    filters.emailStatus as PrizeEmailStatus,
  )
    ? (filters.emailStatus as PrizeEmailStatus)
    : "all";

  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="Asoebi Fashion Prize"
        title="Prize applications"
        description={`${applications.length} collection ${applications.length === 1 ? "submission" : "submissions"}, ordered from newest to oldest.`}
      />
      <PrizeApplicationsTable
        applications={applications}
        initialSearch={filters.search ?? ""}
        initialStatus={initialStatus}
        initialEmailStatus={initialEmailStatus}
      />
    </AdminShell>
  );
}

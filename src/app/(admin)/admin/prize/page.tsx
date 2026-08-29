import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { api } from "../../../../../convex/_generated/api";
import { AdminPageHeader } from "@/features/admin/admin-page-header";
import { AdminShell } from "@/features/admin/admin-shell";
import { PrizeApplicationsTable } from "@/features/admin/prize-applications-table";
import { fetchAuthQuery } from "@/lib/server/auth";

export const metadata: Metadata = {
  title: "Prize applications",
  robots: { index: false, follow: false },
};

export default async function AdminPrizePage() {
  const admin = await fetchAuthQuery(api.auth.getCurrentAdmin);
  if (!admin) redirect("/admin/sign-in");

  const applications = await fetchAuthQuery(api.admin.listPrizeApplications);

  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="Asoebi Fashion Prize"
        title="Prize applications"
        description={`${applications.length} collection ${applications.length === 1 ? "submission" : "submissions"}, ordered from newest to oldest.`}
      />
      <PrizeApplicationsTable applications={applications} />
    </AdminShell>
  );
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { api } from "../../../../../convex/_generated/api";
import { AdminPageHeader } from "@/features/admin/admin-page-header";
import { AdminShell } from "@/features/admin/admin-shell";
import { WaitlistTable } from "@/features/admin/waitlist-table";
import { fetchAuthQuery } from "@/lib/server/auth";

export const metadata: Metadata = {
  title: "Waitlist",
  robots: { index: false, follow: false },
};

export default async function AdminWaitlistPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const admin = await fetchAuthQuery(api.auth.getCurrentAdmin);
  if (!admin) redirect("/admin/sign-in");

  const filters = await searchParams;
  const entries = await fetchAuthQuery(api.admin.listWaitlistEntries);

  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="AEFW audience"
        title="Waitlist"
        description={`${entries.length} ${entries.length === 1 ? "person is" : "people are"} waiting to hear what comes next.`}
      />
      <WaitlistTable entries={entries} initialSearch={filters.search ?? ""} />
    </AdminShell>
  );
}

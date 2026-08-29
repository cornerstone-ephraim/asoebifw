import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { api } from "../../../../convex/_generated/api";
import { AdminHome } from "@/features/admin/admin-home";
import { AdminShell } from "@/features/admin/admin-shell";
import { fetchAuthQuery } from "@/lib/server/auth";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const admin = await fetchAuthQuery(api.auth.getCurrentAdmin);

  if (!admin) redirect("/admin/sign-in");
  const overview = await fetchAuthQuery(api.admin.getOverview);

  return (
    <AdminShell>
      <AdminHome admin={admin} overview={overview} />
    </AdminShell>
  );
}

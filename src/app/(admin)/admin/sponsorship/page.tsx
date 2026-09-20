import { redirect } from "next/navigation";
import { api } from "../../../../../convex/_generated/api";
import { fetchAuthQuery } from "@/lib/server/auth";
import { AdminShell } from "@/features/admin/admin-shell";
import { AdminPageHeader } from "@/features/admin/admin-page-header";
import { SponsorshipEnquiries } from "@/features/admin/sponsorship-enquiries";

export const metadata = {
  title: "Sponsorship enquiries",
  robots: { index: false, follow: false },
};
export default async function AdminSponsorshipPage() {
  const admin = await fetchAuthQuery(api.auth.getCurrentAdmin);
  if (!admin) redirect("/admin/sign-in");
  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="AEFW partnerships"
        title="Sponsorship enquiries"
        description="Review partnership ideas and track your conversations with prospective sponsors."
      />
      <SponsorshipEnquiries />
    </AdminShell>
  );
}

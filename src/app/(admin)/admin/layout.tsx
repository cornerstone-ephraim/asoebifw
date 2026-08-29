import type { ReactNode } from "react";

import { AdminAuthProvider } from "@/features/admin/admin-auth-provider";
import { AdminHeader } from "@/features/admin/admin-header";
import { api } from "../../../../convex/_generated/api";
import { fetchAuthQuery, getToken } from "@/lib/server/auth";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const token = await getToken();
  const admin = await fetchAuthQuery(api.auth.getCurrentAdmin);

  return (
    <AdminAuthProvider initialToken={token}>
      <AdminHeader email={admin?.email} />
      {children}
    </AdminAuthProvider>
  );
}

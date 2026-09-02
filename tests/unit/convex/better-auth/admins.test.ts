import { describe, expect, it } from "vitest";

import {
  adminEmails,
  isAdminEmail,
} from "../../../../convex/betterAuth/admins";
import { adminAccounts } from "@/features/admin/admin-accounts";

describe("AEFW admin allowlist", () => {
  it.each(adminEmails)("permits %s", (email) => {
    expect(isAdminEmail(email)).toBe(true);
  });

  it("normalizes email case", () => {
    expect(isAdminEmail("STUDIO@KOROYE.COM")).toBe(true);
  });

  it("rejects emails outside the allowlist", () => {
    expect(isAdminEmail("visitor@example.com")).toBe(false);
    expect(isAdminEmail(undefined)).toBe(false);
  });

  it("keeps every sign-in option aligned with the backend allowlist", () => {
    expect([...adminAccounts.map((account) => account.email)].sort()).toEqual(
      [...adminEmails].sort(),
    );
  });
});

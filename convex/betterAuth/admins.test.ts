import { describe, expect, it } from "vitest";

import { adminEmails, isAdminEmail } from "./admins";

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
});

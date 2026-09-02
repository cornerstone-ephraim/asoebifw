import { describe, expect, it } from "vitest";

import { buildAdminWaitlistEmail } from "@/features/waitlist/admin-email-template";

describe("buildAdminWaitlistEmail", () => {
  it("renders branded signup details and escapes untrusted values", () => {
    const email = buildAdminWaitlistEmail({
      firstName: "Ada <script>",
      lastName: "Okafor",
      email: "ada@example.com",
    });

    expect(email.html).toContain("AEFW");
    expect(email.html).toContain("Ada &lt;script&gt; Okafor");
    expect(email.html).toContain('href="mailto:ada@example.com"');
    expect(email.html).not.toContain("Ada <script>");
    expect(email.text).toContain("NEW AEFW WAITLIST SIGNUP");
  });
});

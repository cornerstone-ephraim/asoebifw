import { describe, expect, it } from "vitest";

import { createWaitlistCsv } from "@/features/admin/admin-csv";
import type { WaitlistEntry } from "@/features/admin/admin-types";

describe("createWaitlistCsv", () => {
  it("exports names, emails and ISO timestamps safely", () => {
    const entries = [
      {
        id: "waitlist-id",
        firstName: 'Ada "The Maker"',
        lastName: "Okafor",
        email: "ada@example.com",
        status: "subscribed",
        submittedAt: Date.UTC(2026, 7, 29, 10, 30),
      },
    ] as unknown as WaitlistEntry[];

    expect(createWaitlistCsv(entries)).toBe(
      '"Name","Email address","Joined"\n"Ada ""The Maker"" Okafor","ada@example.com","2026-08-29T10:30:00.000Z"',
    );
  });
});

import { describe, expect, it } from "vitest";

import {
  createPrizeApplicationsCsv,
  createWaitlistCsv,
} from "@/features/admin/admin-csv";
import type {
  PrizeApplication,
  WaitlistEntry,
} from "@/features/admin/admin-types";

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

  it("exports Prize review data and neutralizes spreadsheet formulas", () => {
    const applications = [
      {
        id: "application-id",
        firstName: "=DANGEROUS",
        lastName: "Applicant",
        email: "applicant@example.com",
        phone: "+2348012345678",
        submissionMode: "website",
        submissionUrl: "https://example.com/collection",
        idDocumentAvailable: true,
        status: "submitted",
        emailStatus: "sent",
        submittedAt: Date.UTC(2026, 7, 29, 10, 30),
      },
    ] as unknown as PrizeApplication[];

    expect(createPrizeApplicationsCsv(applications)).toContain(
      '"\'=DANGEROUS Applicant","applicant@example.com","\'+2348012345678","website","https://example.com/collection","Available","submitted","sent","2026-08-29T10:30:00.000Z"',
    );
  });
});

import { describe, expect, it } from "vitest";

import {
  buildAdminPrizeEmail,
  buildApplicantPrizeEmail,
} from "@/features/prize/email-templates";

const application = {
  firstName: "Ada",
  lastName: "Okafor",
  email: "ada@example.com",
  phone: "+2348012345678",
  submissionMode: "website" as const,
  reviewUrl: "https://example.com/ada/collections",
  submittedAt: Date.UTC(2026, 7, 28, 20, 0),
};

describe("Prize email templates", () => {
  it("confirms the applicant submission and deadline", () => {
    const email = buildApplicantPrizeEmail(application);

    expect(email.subject).toContain("application is in");
    expect(email.text).toContain("19 December 2026");
    expect(email.html).toContain("Your collections<br>are in.");
  });

  it("gives administrators the collection review link", () => {
    const email = buildAdminPrizeEmail(application);

    expect(email.text).toContain(application.reviewUrl);
    expect(email.html).toContain(`href="${application.reviewUrl}"`);
    expect(email.html).toContain("View collections");
    expect(email.text).toContain(application.phone);
  });

  it("escapes applicant content in admin notifications", () => {
    const email = buildAdminPrizeEmail({
      ...application,
      firstName: "<Ada>",
    });

    expect(email.html).toContain("&lt;Ada&gt;");
    expect(email.html).not.toContain("<Ada>");
  });
});

import { describe, expect, it } from "vitest";

import {
  MAX_PRIZE_PDF_SIZE,
  prizeApplicationFormSchema,
  prizeApplicationSchema,
  validatePrizePdf,
} from "@/features/prize/schema";

const validApplication = {
  firstName: "Ada",
  lastName: "Okafor",
  email: "ada@example.com",
  submissionMode: "website" as const,
  submissionUrl: "https://example.com/ada/collections",
  consent: true as const,
  website: "",
};

describe("prize application validation", () => {
  it("accepts an organised website submission", () => {
    expect(prizeApplicationFormSchema.safeParse(validApplication).success).toBe(
      true,
    );
  });

  it("requires the selected platform for social submissions", () => {
    expect(
      prizeApplicationFormSchema.safeParse({
        ...validApplication,
        submissionMode: "instagram",
        submissionUrl: "https://youtube.com/watch?v=collections",
      }).success,
    ).toBe(false);
  });

  it("requires a storage id for PDF applications", () => {
    expect(
      prizeApplicationSchema.safeParse({
        ...validApplication,
        submissionMode: "pdf",
        submissionUrl: "",
      }).success,
    ).toBe(false);
  });

  it("rejects oversized PDF files", () => {
    const file = new File(
      [new Uint8Array(MAX_PRIZE_PDF_SIZE + 1)],
      "collections.pdf",
      { type: "application/pdf" },
    );
    expect(validatePrizePdf(file)).toBe("Keep the PDF under 20MB");
  });
});

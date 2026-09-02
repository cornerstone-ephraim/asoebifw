import { describe, expect, it } from "vitest";

import {
  prizeApplicationFormSchema,
  prizeApplicationSchema,
} from "@/features/prize/schema";

const validApplication = {
  firstName: "Ada",
  lastName: "Okafor",
  email: "ada@example.com",
  phoneCountry: "NG",
  phoneNumber: "08012345678",
  submissionMode: "website" as const,
  submissionUrl: "https://example.com/ada/collections",
  consent: true as const,
  idDocument: new File(["identity"], "id.pdf", {
    type: "application/pdf",
  }),
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

  it("accepts a public PDF link", () => {
    expect(
      prizeApplicationSchema.safeParse({
        ...validApplication,
        submissionMode: "pdf",
        submissionUrl: "https://drive.google.com/file/d/collections/view",
      }).success,
    ).toBe(true);
  });

  it("requires a link for PDF applications", () => {
    expect(
      prizeApplicationSchema.safeParse({
        ...validApplication,
        submissionMode: "pdf",
        submissionUrl: "",
      }).success,
    ).toBe(false);
  });

  it("rejects a phone number that does not match its country", () => {
    const result = prizeApplicationSchema.safeParse({
      ...validApplication,
      phoneCountry: "US",
      phoneNumber: "08012345678",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.phoneNumber).toContain(
        "Enter a valid phone number",
      );
    }
  });

  it("rejects ID documents larger than 8 MB", () => {
    const result = prizeApplicationSchema.safeParse({
      ...validApplication,
      idDocument: new File([new Uint8Array(8 * 1024 * 1024 + 1)], "id.pdf", {
        type: "application/pdf",
      }),
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.idDocument).toContain(
        "Keep the ID document under 8 MB",
      );
    }
  });
});

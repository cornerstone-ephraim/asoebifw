import { describe, expect, it } from "vitest";

import {
  prizeApplicationFormSchema,
  prizeApplicationSchema,
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
});

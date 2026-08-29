import { describe, expect, it } from "vitest";

import { waitlistSchema } from "@/features/waitlist/schema";

describe("waitlistSchema", () => {
  it("normalizes a valid submission", () => {
    const result = waitlistSchema.parse({
      firstName: " Ada ",
      lastName: " Okafor ",
      email: " ADA@EXAMPLE.COM ",
      consent: true,
      website: "",
    });
    expect(result).toMatchObject({
      firstName: "Ada",
      lastName: "Okafor",
      email: "ada@example.com",
      consent: true,
    });
  });

  it("rejects names containing control characters", () => {
    expect(
      waitlistSchema.safeParse({
        firstName: "Ada\nBcc",
        lastName: "Okafor",
        email: "ada@example.com",
        consent: true,
        website: "",
      }).success,
    ).toBe(false);
  });

  it("rejects the honeypot and missing consent", () => {
    expect(
      waitlistSchema.safeParse({
        firstName: "Ada",
        lastName: "Okafor",
        email: "ada@example.com",
        consent: false,
        website: "spam.example",
      }).success,
    ).toBe(false);
  });
});

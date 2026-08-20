import { describe, expect, it } from "vitest";

import { waitlistSchema } from "@/features/waitlist/schema";

describe("waitlistSchema", () => {
  it("normalizes a valid submission", () => {
    const result = waitlistSchema.parse({
      name: " Ada Okafor ",
      email: "ADA@EXAMPLE.COM",
      role: "designer",
      website: "",
    });
    expect(result).toMatchObject({
      name: "Ada Okafor",
      email: "ada@example.com",
    });
  });

  it("rejects the honeypot and invalid roles", () => {
    expect(
      waitlistSchema.safeParse({
        name: "Ada Okafor",
        email: "ada@example.com",
        role: "admin",
        website: "spam.example",
      }).success,
    ).toBe(false);
  });
});

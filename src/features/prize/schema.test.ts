import { describe, expect, it } from "vitest";

import { prizeApplicationSchema } from "@/features/prize/schema";

const validApplication = {
  name: "Ada Okafor",
  email: "ada@example.com",
  phone: "+2348000000000",
  category: "Best Designer" as const,
  portfolio: "https://example.com/ada",
  statement: "A textile-led practice grounded in shared celebration.",
  consent: true as const,
  website: "",
};

describe("prizeApplicationSchema", () => {
  it("accepts complete applications", () => {
    expect(prizeApplicationSchema.safeParse(validApplication).success).toBe(
      true,
    );
  });

  it("rejects incomplete statements", () => {
    expect(
      prizeApplicationSchema.safeParse({
        ...validApplication,
        statement: "Too short",
      }).success,
    ).toBe(false);
  });
});

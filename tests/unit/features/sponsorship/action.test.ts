import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { submitSponsorship } from "@/features/sponsorship/action";
import { sponsorshipSchema } from "@/features/sponsorship/schema";
import { sendSponsorshipEmails } from "@/features/sponsorship/email";
import { runConvexMutation } from "@/lib/server/convex";
vi.mock("server-only", () => ({}));
vi.mock("@sentry/nextjs", () => ({ captureException: vi.fn() }));
vi.mock("@/features/sponsorship/email", () => ({
  sendSponsorshipEmails: vi.fn(),
}));
vi.mock("@/lib/server/convex", () => ({
  convexMutation: (name: string) => name,
  runConvexMutation: vi.fn(),
}));
const input = {
  name: "Ada Okafor",
  organisation: "Example Studio",
  email: "ada@example.com",
  phone: "",
  interest: "Not sure yet",
  supportType: "Both",
  budget: "",
  message: "We would like to discuss sponsoring the event.",
  website: "",
};
describe("sponsorship enquiries", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubEnv("SPONSORSHIP_SUBMISSION_SECRET", "test-secret");
  });
  afterEach(() => vi.unstubAllEnvs());
  it("accepts optional contact details and normalises input", () => {
    expect(
      sponsorshipSchema.parse({
        ...input,
        name: " Ada Okafor ",
        email: "ADA@example.com",
      }),
    ).toMatchObject({ name: input.name, email: input.email });
  });
  it.each([
    { website: "spam" },
    { message: "short" },
    { interest: "invalid" },
    { supportType: "invalid" },
    { organisation: " " },
    { email: "invalid" },
    { message: "x".repeat(5001) },
  ])("rejects invalid or spam input %j before persistence", async (change) => {
    expect((await submitSponsorship({ ...input, ...change })).status).toBe(
      "error",
    );
    expect(runConvexMutation).not.toHaveBeenCalled();
    expect(sendSponsorshipEmails).not.toHaveBeenCalled();
  });
  it("saves before sending and records sent status", async () => {
    vi.mocked(runConvexMutation)
      .mockResolvedValueOnce({ status: "created", id: "enquiry-id" })
      .mockResolvedValueOnce(null);
    vi.mocked(sendSponsorshipEmails).mockImplementation(async () => {
      expect(runConvexMutation).toHaveBeenCalledWith("sponsorship:create", {
        ...input,
        secret: "test-secret",
      });
    });
    expect((await submitSponsorship(input)).status).toBe("success");
    expect(runConvexMutation).toHaveBeenLastCalledWith(
      "sponsorship:setEmailStatus",
      { secret: "test-secret", id: "enquiry-id", emailStatus: "sent" },
    );
  });
  it("preserves success when email and status recording fail after saving", async () => {
    vi.mocked(runConvexMutation)
      .mockResolvedValueOnce({ status: "created", id: "enquiry-id" })
      .mockRejectedValueOnce(new Error("offline"));
    vi.mocked(sendSponsorshipEmails).mockRejectedValueOnce(
      new Error("email unavailable"),
    );
    expect((await submitSponsorship(input)).status).toBe("success");
    expect(runConvexMutation).toHaveBeenLastCalledWith(
      "sponsorship:setEmailStatus",
      { secret: "test-secret", id: "enquiry-id", emailStatus: "failed" },
    );
  });
  it("does not send email if saving fails", async () => {
    vi.mocked(runConvexMutation).mockRejectedValueOnce(new Error("offline"));
    expect((await submitSponsorship(input)).status).toBe("error");
    expect(sendSponsorshipEmails).not.toHaveBeenCalled();
  });
  it("does not resend email during the cooldown", async () => {
    vi.mocked(runConvexMutation).mockResolvedValueOnce({
      status: "duplicate",
      id: "enquiry-id",
    });
    expect((await submitSponsorship(input)).status).toBe("info");
    expect(sendSponsorshipEmails).not.toHaveBeenCalled();
  });
});

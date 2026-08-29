import { beforeEach, describe, expect, it, vi } from "vitest";

import { sendPrizeApplicationEmails } from "@/features/prize/email";
import { submitPrizeApplication } from "@/features/prize/action";
import { runConvexMutation } from "@/lib/server/convex";

vi.mock("server-only", () => ({}));

vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn(),
}));

vi.mock("@/features/prize/email", () => ({
  sendPrizeApplicationEmails: vi.fn(),
}));

vi.mock("@/lib/server/convex", () => ({
  convexMutation: vi.fn((name: string) => name),
  runConvexMutation: vi.fn(),
}));

const sendPrizeApplicationEmailsMock = vi.mocked(sendPrizeApplicationEmails);
const runConvexMutationMock = vi.mocked(runConvexMutation);

describe("submitPrizeApplication", () => {
  beforeEach(() => {
    sendPrizeApplicationEmailsMock.mockReset();
    runConvexMutationMock.mockReset();
  });

  it("returns the duplicate information state when an email retry fails", async () => {
    runConvexMutationMock
      .mockResolvedValueOnce({
        status: "duplicate",
        applicationId: "application-id",
        firstName: "Ada",
        lastName: "Okafor",
        email: "ada@example.com",
        submissionMode: "website",
        reviewUrl: "https://example.com/collections",
        submittedAt: 1_788_000_000_000,
        shouldSendEmails: true,
      })
      .mockResolvedValueOnce(null);
    sendPrizeApplicationEmailsMock.mockRejectedValueOnce(
      new Error("Resend unavailable"),
    );

    const result = await submitPrizeApplication({
      firstName: "Ada",
      lastName: "Okafor",
      email: "ada@example.com",
      submissionMode: "website",
      submissionUrl: "https://example.com/collections",
      consent: true,
      website: "",
    });

    expect(result).toEqual({
      status: "info",
      message: "An application from this email has already been received.",
    });
    expect(runConvexMutationMock).toHaveBeenLastCalledWith(
      "submissions:setPrizeEmailStatus",
      {
        applicationId: "application-id",
        emailStatus: "failed",
      },
    );
  });
});

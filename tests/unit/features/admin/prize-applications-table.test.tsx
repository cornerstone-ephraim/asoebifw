import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { PrizeApplication } from "@/features/admin/admin-types";
import { PrizeApplicationsTable } from "@/features/admin/prize-applications-table";

const { updatePrizeStatusMock } = vi.hoisted(() => ({
  updatePrizeStatusMock: vi.fn(),
}));

vi.mock("convex/react", () => ({
  useMutation: () => updatePrizeStatusMock,
}));

const applications = [
  {
    id: "application-ada",
    firstName: "Ada",
    lastName: "Okafor",
    email: "ada@example.com",
    phone: "+2348012345678",
    submissionMode: "website",
    submissionUrl: "https://example.com/ada",
    idDocumentAvailable: true,
    status: "submitted",
    emailStatus: "sent",
    submittedAt: 1_788_000_000_000,
  },
  {
    id: "application-zara",
    firstName: "Zara",
    lastName: "Bello",
    email: "zara@example.com",
    submissionMode: "pdf",
    submissionUrl: "https://example.com/zara.pdf",
    idDocumentAvailable: true,
    status: "reviewing",
    emailStatus: "failed",
    submittedAt: 1_789_000_000_000,
  },
] as unknown as PrizeApplication[];

describe("PrizeApplicationsTable", () => {
  beforeEach(() => {
    updatePrizeStatusMock.mockReset();
    updatePrizeStatusMock.mockResolvedValue({ status: "reviewed" });
  });

  it("searches applicants and filters notification failures", async () => {
    const user = userEvent.setup();
    render(<PrizeApplicationsTable applications={applications} />);

    await user.type(screen.getByLabelText("Search applicants"), "Zara");

    expect(screen.queryAllByText("Ada Okafor")).toHaveLength(0);
    expect(screen.getAllByText("Zara Bello").length).toBeGreaterThan(0);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "failed" },
    });
    expect(screen.getByText("1 of 2 applications")).toBeVisible();
    expect(screen.getByRole("button", { name: "Export 1 CSV" })).toBeVisible();
  });

  it("updates review status through the protected mutation", async () => {
    const user = userEvent.setup();
    render(<PrizeApplicationsTable applications={applications} />);

    await user.click(
      screen.getAllByRole("button", {
        name: "Review status for Ada Okafor",
      })[0],
    );
    await user.click(screen.getByRole("option", { name: "Reviewed" }));

    await waitFor(() =>
      expect(updatePrizeStatusMock).toHaveBeenCalledWith({
        applicationId: "application-ada",
        status: "reviewed",
      }),
    );
    expect(
      screen.getAllByRole("button", {
        name: "Review status for Ada Okafor",
      })[0],
    ).toHaveTextContent("Reviewed");
  });
});

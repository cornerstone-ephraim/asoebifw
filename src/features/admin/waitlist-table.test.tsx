import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import type { WaitlistEntry } from "@/features/admin/admin-types";
import { WaitlistTable } from "@/features/admin/waitlist-table";

const entries = [
  {
    id: "waitlist-ada",
    firstName: "Ada",
    lastName: "Okafor",
    email: "ada@example.com",
    status: "subscribed",
    submittedAt: 1_788_000_000_000,
  },
  {
    id: "waitlist-zara",
    firstName: "Zara",
    lastName: "Bello",
    email: "zara@example.com",
    status: "subscribed",
    submittedAt: 1_789_000_000_000,
  },
] as unknown as WaitlistEntry[];

describe("WaitlistTable", () => {
  it("searches entries and updates the export count", async () => {
    const user = userEvent.setup();
    render(<WaitlistTable entries={entries} />);

    await user.type(screen.getByLabelText("Search the waitlist"), "Ada");

    expect(screen.queryAllByText("Zara Bello")).toHaveLength(0);
    expect(screen.getAllByText("Ada Okafor").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Export 1 CSV" })).toBeVisible();
  });
});

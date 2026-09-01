import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CustomSelect } from "@/components/ui/custom-select";

const options = [
  { label: "Awaiting review", value: "submitted" },
  { label: "Reviewing", value: "reviewing", disabled: true },
  { label: "Reviewed", value: "reviewed" },
] as const;

describe("CustomSelect", () => {
  it("renders the listbox outside an overflow container and selects an option", async () => {
    const user = userEvent.setup();
    const changeAction = vi.fn();

    render(
      <div data-testid="overflow-container" className="overflow-hidden">
        <CustomSelect
          id="review-status"
          label="Review status"
          options={options}
          value="submitted"
          changeAction={changeAction}
        />
      </div>,
    );

    await user.click(screen.getByRole("button", { name: "Review status" }));

    const listbox = screen.getByRole("listbox", { name: "Review status" });
    expect(screen.getByTestId("overflow-container").contains(listbox)).toBe(
      false,
    );
    expect(listbox).toHaveClass("fixed");

    await user.click(screen.getByRole("option", { name: "Reviewed" }));
    expect(changeAction).toHaveBeenCalledWith("reviewed");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("skips disabled options during keyboard navigation", async () => {
    const user = userEvent.setup();
    const changeAction = vi.fn();

    render(
      <CustomSelect
        id="keyboard-status"
        label="Keyboard review status"
        options={options}
        value="submitted"
        changeAction={changeAction}
      />,
    );

    const trigger = screen.getByRole("button", {
      name: "Keyboard review status",
    });
    trigger.focus();
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");

    expect(changeAction).toHaveBeenCalledWith("reviewed");
  });

  it("returns tab order to the control after the portalled listbox closes", async () => {
    const user = userEvent.setup();

    render(
      <>
        <CustomSelect
          id="tab-status"
          label="Tab review status"
          options={options}
          value="submitted"
          changeAction={vi.fn()}
        />
        <button type="button">Next action</button>
      </>,
    );

    const trigger = screen.getByRole("button", { name: "Tab review status" });
    await user.click(trigger);
    await user.keyboard("{Tab}");

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next action" })).toHaveFocus();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PhoneCountrySelect } from "@/features/prize/phone-country-select";

describe("PhoneCountrySelect", () => {
  it("shows the selected flag and calling code", () => {
    render(
      <PhoneCountrySelect
        id="phone-country"
        value="NG"
        changeAction={vi.fn()}
      />,
    );

    const trigger = screen.getByRole("button", { name: /country code/i });

    expect(trigger).toHaveTextContent("🇳🇬");
    expect(trigger).toHaveTextContent("+234");
    expect(trigger).not.toHaveTextContent("NG");
  });

  it("searches countries and selects a result", async () => {
    const user = userEvent.setup();
    const changeAction = vi.fn();

    render(
      <PhoneCountrySelect
        id="phone-country"
        value="NG"
        changeAction={changeAction}
      />,
    );

    await user.click(screen.getByRole("button", { name: /country code/i }));
    await user.type(
      screen.getByRole("combobox", { name: /search countries/i }),
      "United States",
    );
    await user.click(
      screen.getByRole("option", { name: /United States.*\+1/i }),
    );

    expect(changeAction).toHaveBeenCalledWith("US");
  });

  it("supports keyboard selection from the search field", async () => {
    const user = userEvent.setup();
    const changeAction = vi.fn();

    render(
      <PhoneCountrySelect
        id="phone-country"
        value="GB"
        changeAction={changeAction}
      />,
    );

    await user.click(screen.getByRole("button", { name: /country code/i }));
    const search = screen.getByRole("combobox", {
      name: /search countries/i,
    });
    await user.type(search, "Nigeria");
    await user.keyboard("{Enter}");

    expect(changeAction).toHaveBeenCalledWith("NG");
  });
});

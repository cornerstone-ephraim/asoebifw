import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";

import { OtpInput } from "@/components/ui/otp-input";

function OtpHarness() {
  const [value, setValue] = useState("");
  return (
    <OtpInput
      id="test-code"
      label="Verification code"
      value={value}
      changeAction={setValue}
    />
  );
}

describe("OtpInput", () => {
  it("accepts individual digits and advances focus", async () => {
    const user = userEvent.setup();
    render(<OtpHarness />);

    const first = screen.getByLabelText("Verification code, digit 1 of 6");
    const second = screen.getByLabelText("Verification code, digit 2 of 6");
    await user.type(first, "1");

    expect(first).toHaveValue("1");
    expect(second).toHaveFocus();
  });

  it("distributes a pasted code across all boxes", () => {
    render(<OtpHarness />);

    fireEvent.paste(screen.getByLabelText("Verification code, digit 1 of 6"), {
      clipboardData: { getData: () => "12 34-56" },
    });

    expect(
      screen
        .getAllByRole("textbox", { name: /Verification code, digit/ })
        .map((input) => (input as HTMLInputElement).value),
    ).toEqual(["1", "2", "3", "4", "5", "6"]);
  });
});

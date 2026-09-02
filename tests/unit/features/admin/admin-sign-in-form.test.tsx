import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { AdminSignInForm } from "@/features/admin/admin-sign-in-form";
import { authClient } from "@/lib/auth-client";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    emailOtp: { sendVerificationOtp: vi.fn() },
    signIn: { emailOtp: vi.fn() },
  },
}));

const sendCodeMock = vi.mocked(authClient.emailOtp.sendVerificationOtp);
const signInMock = vi.mocked(authClient.signIn.emailOtp);

describe("AdminSignInForm", () => {
  beforeEach(() => {
    sendCodeMock.mockReset();
    signInMock.mockReset();
    sendCodeMock.mockResolvedValue({ data: { success: true }, error: null });
    signInMock.mockResolvedValue({ data: {} as never, error: null });
  });

  it("offers the four approved administrator accounts", () => {
    render(<AdminSignInForm />);

    expect(screen.getByRole("radio", { name: /^Cornerstone/ })).toBeVisible();
    expect(screen.getByRole("radio", { name: /^Keniye/ })).toBeVisible();
    expect(screen.getByRole("radio", { name: /^Abiola/ })).toBeVisible();
    expect(screen.getByRole("radio", { name: /^Asoebi Admin/ })).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Send sign-in code" }),
    ).toBeDisabled();
  });

  it("sends the code to the selected account and renders six OTP boxes", async () => {
    const user = userEvent.setup();
    render(<AdminSignInForm />);

    await user.click(screen.getByRole("radio", { name: /^Keniye/ }));
    await user.click(screen.getByRole("button", { name: "Send sign-in code" }));

    await waitFor(() =>
      expect(sendCodeMock).toHaveBeenCalledWith({
        email: "studio@koroye.com",
        type: "sign-in",
      }),
    );
    expect(
      screen.getByText("A six-digit code was sent to Keniye's email."),
    ).toBeVisible();
    expect(
      screen.getAllByRole("textbox", { name: /Six-digit code, digit/ }),
    ).toHaveLength(6);
    expect(
      screen.getByRole("button", { name: "Resend code in 30s" }),
    ).toBeDisabled();
  });

  it("submits a complete code for the selected account", async () => {
    const user = userEvent.setup();
    render(<AdminSignInForm />);

    await user.click(screen.getByRole("radio", { name: /^Cornerstone/ }));
    await user.click(screen.getByRole("button", { name: "Send sign-in code" }));
    await screen.findByText(
      "A six-digit code was sent to Cornerstone's email.",
    );

    const firstDigit = screen.getByRole("textbox", {
      name: "Six-digit code, digit 1 of 6",
    });
    fireEvent.paste(firstDigit, {
      clipboardData: { getData: () => "123456" },
    });
    await user.click(screen.getByRole("button", { name: "Enter admin area" }));

    await waitFor(() =>
      expect(signInMock).toHaveBeenCalledWith({
        email: "thecornerstoneephraim@gmail.com",
        otp: "123456",
        name: "Cornerstone",
      }),
    );
  });
});

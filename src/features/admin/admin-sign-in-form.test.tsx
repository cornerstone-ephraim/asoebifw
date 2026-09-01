import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

describe("AdminSignInForm", () => {
  beforeEach(() => {
    sendCodeMock.mockReset();
    sendCodeMock.mockResolvedValue({ data: { success: true }, error: null });
  });

  it("confirms delivery and provides a controlled resend action", async () => {
    render(<AdminSignInForm />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "admin@example.com" },
    });
    fireEvent.submit(
      screen
        .getByRole("button", { name: "Send sign-in code" })
        .closest("form")!,
    );

    await waitFor(() =>
      expect(screen.getByLabelText("Six-digit code")).toBeVisible(),
    );
    expect(
      screen.getByText("A six-digit code was sent to admin@example.com."),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Resend code in 30s" }),
    ).toBeDisabled();
  });
});

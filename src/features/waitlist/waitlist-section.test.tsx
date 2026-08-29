import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { submitWaitlist } from "@/features/waitlist/action";
import { WaitlistSection } from "@/features/waitlist/waitlist-section";

vi.mock("@/features/waitlist/action", () => ({
  submitWaitlist: vi.fn(),
}));

const submitWaitlistMock = vi.mocked(submitWaitlist);

async function completeForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^First name/), "Ada");
  await user.type(screen.getByLabelText(/^Last name/), "Okafor");
  await user.type(screen.getByLabelText(/^Email address/), "ada@example.com");
  await user.click(
    screen.getByRole("checkbox", {
      name: "I agree to receive Asoebi Fashion Week news and updates.",
    }),
  );
}

describe("WaitlistSection", () => {
  beforeEach(() => {
    submitWaitlistMock.mockReset();
  });

  it("shows specific validation errors and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<WaitlistSection />);

    await user.click(screen.getByRole("button", { name: "Join waitlist" }));

    expect(screen.getByText("Enter your first name")).toBeVisible();
    expect(screen.getByText("Enter your last name")).toBeVisible();
    expect(screen.getByText("Enter a valid email address")).toBeVisible();
    expect(
      screen.getByText("Consent is required to join the waitlist"),
    ).toBeVisible();
    const firstName = screen.getByLabelText(/^First name/);
    expect(firstName).toHaveFocus();
    expect(firstName).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(/^First name/, { selector: "label" })).toHaveClass(
      "text-red-800",
    );
    expect(submitWaitlistMock).not.toHaveBeenCalled();
  });

  it("replaces the form with a clear confirmation after submission", async () => {
    submitWaitlistMock.mockResolvedValue({
      status: "success",
      message: "You’re on the Asoebi Fashion Week waitlist.",
    });
    const user = userEvent.setup();
    render(<WaitlistSection />);

    await completeForm(user);
    await user.click(screen.getByRole("button", { name: "Join waitlist" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "You’re on the Asoebi Fashion Week waitlist.",
    );
    expect(screen.getByText("You’re on the list.")).toBeVisible();
    expect(screen.queryByRole("button", { name: "Join waitlist" })).toBeNull();
  });

  it("shows an informational result for an existing email", async () => {
    submitWaitlistMock.mockResolvedValue({
      status: "info",
      message:
        "This email is already on the waitlist. We’ve resent your confirmation email.",
    });
    const user = userEvent.setup();
    render(<WaitlistSection />);

    await completeForm(user);
    await user.click(screen.getByRole("button", { name: "Join waitlist" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "This email is already on the waitlist.",
    );
    expect(screen.getByText("You’re already in the circle.")).toBeVisible();
  });

  it("submits values populated by browser autofill", async () => {
    submitWaitlistMock.mockResolvedValue({
      status: "info",
      message:
        "This email is already on the waitlist. We’ve resent your confirmation email.",
    });
    render(<WaitlistSection />);

    const firstName = screen.getByLabelText(/^First name/) as HTMLInputElement;
    const lastName = screen.getByLabelText(/^Last name/) as HTMLInputElement;
    const email = screen.getByLabelText(/^Email address/) as HTMLInputElement;
    const consent = screen.getByRole("checkbox") as HTMLInputElement;

    fireEvent.input(firstName, { target: { value: "Cornerstone" } });
    fireEvent.input(lastName, { target: { value: "Ephraim" } });
    fireEvent.input(email, {
      target: { value: "thecornerstoneephraim@gmail.com" },
    });
    fireEvent.click(consent);

    const form = screen
      .getByRole("button", { name: "Join waitlist" })
      .closest("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    await waitFor(() =>
      expect(submitWaitlistMock).toHaveBeenCalledWith({
        firstName: "Cornerstone",
        lastName: "Ephraim",
        email: "thecornerstoneephraim@gmail.com",
        consent: true,
        website: "",
      }),
    );
    expect(await screen.findByRole("status")).toHaveTextContent(
      "This email is already on the waitlist.",
    );
  });

  it("shows processing feedback while the submission is pending", async () => {
    let resolveSubmission!: (value: {
      status: "success";
      message: string;
    }) => void;
    submitWaitlistMock.mockReturnValue(
      new Promise((resolve) => {
        resolveSubmission = resolve;
      }),
    );
    const user = userEvent.setup();
    render(<WaitlistSection />);

    await completeForm(user);
    await user.click(screen.getByRole("button", { name: "Join waitlist" }));

    const processingButton = screen.getByRole("button", {
      name: "Joining waitlist…",
    });
    expect(processingButton).toBeDisabled();
    expect(processingButton.closest("form")).toHaveAttribute(
      "aria-busy",
      "true",
    );

    resolveSubmission({
      status: "success",
      message: "You’re on the Asoebi Fashion Week waitlist.",
    });
    expect(await screen.findByRole("status")).toBeVisible();
  });

  it("shows an error when the request fails unexpectedly", async () => {
    submitWaitlistMock.mockRejectedValue(new Error("Network failure"));
    const user = userEvent.setup();
    render(<WaitlistSection />);

    await completeForm(user);
    await user.click(screen.getByRole("button", { name: "Join waitlist" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Something went wrong. Please try again.",
    );
  });
});

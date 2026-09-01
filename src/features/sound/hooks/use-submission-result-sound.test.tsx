import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useSubmissionResultSound } from "@/features/sound/hooks/use-submission-result-sound";
import { playInterfaceSound } from "@/features/sound/interface-sound";

vi.mock("@/features/sound/interface-sound", () => ({
  playInterfaceSound: vi.fn(),
}));

const playInterfaceSoundMock = vi.mocked(playInterfaceSound);
type SubmissionStatus = "idle" | "success" | "info" | "error";

describe("useSubmissionResultSound", () => {
  beforeEach(() => {
    playInterfaceSoundMock.mockReset();
  });

  it("stays silent while a form is idle", () => {
    renderHook(() => useSubmissionResultSound("idle"));

    expect(playInterfaceSoundMock).not.toHaveBeenCalled();
  });

  it("plays confirmation feedback after a successful submission", () => {
    const { rerender } = renderHook(
      ({ status }: { status: SubmissionStatus }) =>
        useSubmissionResultSound(status),
      { initialProps: { status: "idle" as SubmissionStatus } },
    );

    rerender({ status: "success" });

    expect(playInterfaceSoundMock).toHaveBeenCalledWith("success");
  });

  it("uses restrained cues for informational and error results", () => {
    const { rerender } = renderHook(
      ({ status }: { status: SubmissionStatus }) =>
        useSubmissionResultSound(status),
      { initialProps: { status: "idle" as SubmissionStatus } },
    );

    rerender({ status: "info" });
    rerender({ status: "error" });

    expect(playInterfaceSoundMock).toHaveBeenNthCalledWith(1, "ready", 0.8);
    expect(playInterfaceSoundMock).toHaveBeenNthCalledWith(2, "error", 0.7);
  });
});

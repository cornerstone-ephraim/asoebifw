import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  configureInterfaceSound,
  playInterfaceSound,
} from "@/features/sound/interface-sound";
import { SoundToggle } from "@/features/sound/sound-toggle";

vi.mock("@/features/sound/interface-sound", () => ({
  configureInterfaceSound: vi.fn(),
  playInterfaceSound: vi.fn(),
}));

const configureInterfaceSoundMock = vi.mocked(configureInterfaceSound);
const playInterfaceSoundMock = vi.mocked(playInterfaceSound);

describe("SoundToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    configureInterfaceSoundMock.mockReset();
    playInterfaceSoundMock.mockReset();
  });

  it("starts muted for a first-time visitor", async () => {
    render(<SoundToggle />);

    expect(
      screen.getByRole("button", { name: "Turn interface sounds on" }),
    ).toHaveAttribute("aria-pressed", "false");
    await waitFor(() =>
      expect(configureInterfaceSoundMock).toHaveBeenCalledWith(false),
    );
  });

  it("enables sound and remembers the preference", async () => {
    const user = userEvent.setup();
    render(<SoundToggle />);

    await user.click(
      screen.getByRole("button", { name: "Turn interface sounds on" }),
    );

    expect(configureInterfaceSoundMock).toHaveBeenLastCalledWith(true);
    expect(playInterfaceSoundMock).toHaveBeenCalledWith("ready", 0.75);
    expect(window.localStorage.getItem("aefw-interface-sound")).toBe("on");
    expect(
      screen.getByRole("button", { name: "Turn interface sounds off" }),
    ).toHaveAttribute("aria-pressed", "true");
  });
});

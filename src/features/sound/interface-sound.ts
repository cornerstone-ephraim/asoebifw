import { play, setEnabled, setVolume, type SoundName } from "cuelume";

const interfaceSoundVolume = 0.2;

let interfaceSoundEnabled = false;

export function configureInterfaceSound(enabled: boolean) {
  interfaceSoundEnabled = enabled;
  setVolume(interfaceSoundVolume);
  setEnabled(enabled);
}

export function playInterfaceSound(name: SoundName, volume = 1) {
  if (!interfaceSoundEnabled) return;

  play(name, { volume });
}

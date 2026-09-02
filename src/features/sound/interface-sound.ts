import { play, setEnabled, setVolume, type SoundName } from "cuelume";

const interfaceSoundVolume = 0.2;

let interfaceSoundConfigured = false;

function configureInterfaceSound() {
  if (interfaceSoundConfigured) return;

  setVolume(interfaceSoundVolume);
  setEnabled(true);
  interfaceSoundConfigured = true;
}

export function playInterfaceSound(name: SoundName, volume = 1) {
  configureInterfaceSound();
  play(name, { volume });
}

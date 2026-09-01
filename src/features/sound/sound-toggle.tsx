"use client";

import { useEffect, useState } from "react";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import {
  configureInterfaceSound,
  playInterfaceSound,
} from "@/features/sound/interface-sound";

const soundPreferenceKey = "aefw-interface-sound";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const storedPreference = window.localStorage.getItem(soundPreferenceKey);
    const soundEnabled = storedPreference === "on";

    configureInterfaceSound(soundEnabled);
    const frame = window.requestAnimationFrame(() => {
      setEnabled(soundEnabled);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleSound = () => {
    const nextEnabled = !enabled;

    if (nextEnabled) {
      configureInterfaceSound(true);
      playInterfaceSound("ready", 0.75);
    } else {
      playInterfaceSound("droplet", 0.6);
      configureInterfaceSound(false);
    }

    window.localStorage.setItem(soundPreferenceKey, nextEnabled ? "on" : "off");
    setEnabled(nextEnabled);
  };

  return (
    <button
      type="button"
      aria-pressed={enabled}
      aria-label={`Turn interface sounds ${enabled ? "off" : "on"}`}
      onClick={toggleSound}
      className="group transition-linear fixed bottom-5 left-5 z-40 inline-flex min-h-11 items-center gap-2 rounded-full border border-asoebi-purple-950/15 bg-white/90 px-3.5 text-xs font-bold text-asoebi-purple-950 shadow-asoebi-float backdrop-blur-xl transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
    >
      {enabled ? (
        <HiSpeakerWave aria-hidden="true" className="size-4" />
      ) : (
        <HiSpeakerXMark aria-hidden="true" className="size-4" />
      )}
    </button>
  );
}

"use client";

import { useState } from "react";

import { copyText } from "@/lib/client/clipboard";

export type ColorShade = {
  step: number;
  oklch: string;
  hex: string;
  rgba: string;
};

export type ColorFamily = {
  name: string;
  purpose: string;
  shades: ColorShade[];
};

export function ColorScaleGrid({ families }: { families: ColorFamily[] }) {
  const [selection, setSelection] = useState({ family: 0, shade: 7 });
  const [copyMessage, setCopyMessage] = useState("");
  const activeFamily = families[selection.family];
  const activeShade = activeFamily.shades[selection.shade];

  const copyShade = async (shade: ColorShade) => {
    try {
      await copyText(shade.hex);
      setCopyMessage(`Copied ${shade.hex}`);
    } catch {
      setCopyMessage("Copy failed");
    }
    window.setTimeout(() => setCopyMessage(""), 1800);
  };

  return (
    <section className="mt-16">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold tracking-[.16em] text-brand uppercase">
            Primitive scales
          </p>
          <h3 className="mt-3 font-display text-4xl sm:text-5xl">
            Shade, side by side.
          </h3>
        </div>
        <p className="max-w-md text-sm leading-6 text-asoebi-graphite">
          Hover, focus or tap a swatch to inspect its production values.
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-4xl bg-asoebi-purple-950 text-white shadow-asoebi-deep">
        <div className="grid gap-3 border-b border-white/15 p-6 sm:grid-cols-[.45fr_1fr_1fr] sm:items-center sm:p-8">
          <div>
            <p className="text-[9px] font-bold tracking-[.14em] text-asoebi-gold-300 uppercase">
              Selected shade
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <p className="font-display text-3xl">
                {activeFamily.name} {activeShade.step}
              </p>
              <span
                aria-live="polite"
                className={`rounded-full bg-asoebi-gold-300 px-3 py-1 text-[9px] font-bold tracking-[.1em] text-asoebi-purple-950 uppercase transition-opacity ${copyMessage ? "opacity-100" : "opacity-0"}`}
              >
                {copyMessage || `Copy ${activeShade.hex}`}
              </span>
            </div>
          </div>
          <div className="font-mono text-xs font-bold tracking-[.05em] uppercase">
            <p>{activeShade.hex}</p>
            <p className="mt-1 text-white/55">{activeShade.rgba}</p>
          </div>
          <p className="font-mono text-[10px] font-bold tracking-[.04em] text-white/55 uppercase">
            {activeShade.oklch}
          </p>
        </div>

        <div className="overflow-x-auto p-6 sm:p-8">
          <div className="min-w-190">
            <div className="grid grid-cols-[7rem_repeat(11,minmax(2.75rem,1fr))] gap-3">
              <span />
              {families[0].shades.map((shade) => (
                <span
                  key={shade.step}
                  className="text-center text-[10px] font-bold tracking-[.08em] text-white/55"
                >
                  {shade.step}
                </span>
              ))}
              {families.map((family, familyIndex) => (
                <div key={family.name} className="contents">
                  <div className="flex flex-col justify-center">
                    <p className="font-display text-xl">{family.name}</p>
                    <p className="mt-1 text-[9px] leading-4 text-white/45">
                      {family.purpose}
                    </p>
                  </div>
                  {family.shades.map((shade, shadeIndex) => {
                    const selected =
                      selection.family === familyIndex &&
                      selection.shade === shadeIndex;
                    const selectShade = () =>
                      setSelection({
                        family: familyIndex,
                        shade: shadeIndex,
                      });
                    return (
                      <button
                        key={shade.step}
                        type="button"
                        aria-label={`${family.name} ${shade.step}: ${shade.hex}, ${shade.oklch}, ${shade.rgba}`}
                        aria-pressed={selected}
                        onMouseEnter={selectShade}
                        onFocus={selectShade}
                        onClick={() => {
                          selectShade();
                          void copyShade(shade);
                        }}
                        style={{ backgroundColor: shade.oklch }}
                        className={`transition-linear h-12 rounded-xl border transition-[border-color,transform] hover:-translate-y-1 focus-visible:-translate-y-1 ${selected ? "border-asoebi-gold-300" : "border-white/10"}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

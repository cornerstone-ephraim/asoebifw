"use client";

import { useRef, useState } from "react";
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
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeFamily = families[selection.family] ?? families[0];
  const activeShade =
    activeFamily?.shades[selection.shade] ?? activeFamily?.shades[0];

  const handleCopy = async (shade: ColorShade) => {
    try {
      await copyText(shade.hex);
      setCopiedHex(shade.hex);

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => setCopiedHex(null), 1800);
    } catch {
      setCopiedHex(null);
    }
  };

  if (!activeFamily || !activeShade) return null;

  return (
    <section className="mt-16 font-sans">
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold tracking-[.16em] text-brand uppercase">
            Primitive scales
          </p>
          <h3 className="mt-3 font-display text-4xl text-asoebi-ivory sm:text-5xl">
            Shade, side by side.
          </h3>
        </div>
        <p className="max-w-md text-sm leading-6 text-asoebi-muted">
          Hover, focus, or tap a swatch to inspect its values. Click to copy
          hex.
        </p>
      </div>

      {/* Main Container */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-asoebi-graphite/40 bg-asoebi-charcoal text-white shadow-asoebi-deep">
        {/* Selected Shade Inspector Header */}
        <div className="grid gap-6 border-b border-asoebi-graphite/40 p-6 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:p-8">
          <div>
            <p className="text-[9px] font-bold tracking-[.14em] text-asoebi-gold-300 uppercase">
              Selected shade
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h4 className="font-display text-3xl text-asoebi-ivory">
                {activeFamily.name} {activeShade.step}
              </h4>
              <button
                type="button"
                onClick={() => void handleCopy(activeShade)}
                className={`cursor-pointer rounded-full px-3 py-1 text-[9px] font-bold tracking-[.1em] uppercase transition-all duration-200 ease-[var(--ease-asoebi-arrive)] ${
                  copiedHex === activeShade.hex
                    ? "bg-asoebi-gold-300 text-asoebi-purple-950 shadow-[0_0_12px_rgba(253,224,71,0.35)]"
                    : "bg-white/10 text-asoebi-mist hover:bg-white/15 hover:text-white"
                }`}
              >
                {copiedHex === activeShade.hex
                  ? `Copied ${activeShade.hex}`
                  : `Copy ${activeShade.hex}`}
              </button>
            </div>
          </div>

          <div className="font-mono text-xs font-semibold tracking-wider text-asoebi-mist uppercase">
            <p>{activeShade.hex}</p>
            <p className="mt-1 text-asoebi-muted">{activeShade.rgba}</p>
          </div>

          <p className="font-mono text-[11px] font-medium tracking-wide text-asoebi-muted uppercase">
            {activeShade.oklch}
          </p>
        </div>

        {/* Swatches Matrix */}
        <div className="overflow-x-auto p-6 sm:p-8">
          <div className="min-w-fit">
            <div
              className="grid items-center gap-x-3 gap-y-6"
              style={{
                gridTemplateColumns: `8rem repeat(${families[0].shades.length}, minmax(2.5rem, 1fr))`,
              }}
            >
              {/* Scale Step Numbers Header */}
              <span />
              {families[0].shades.map((shade) => (
                <span
                  key={shade.step}
                  className="text-center font-mono text-[10px] font-semibold tracking-wider text-asoebi-muted"
                >
                  {shade.step}
                </span>
              ))}

              {/* Matrix Rows */}
              {families.map((family, familyIdx) => (
                <div key={family.name} className="contents">
                  <div className="flex flex-col justify-center pr-2">
                    <p className="font-display text-lg text-asoebi-ivory">
                      {family.name}
                    </p>
                    <p className="text-[10px] text-asoebi-muted">
                      {family.purpose}
                    </p>
                  </div>

                  {family.shades.map((shade, shadeIdx) => {
                    const isSelected =
                      selection.family === familyIdx &&
                      selection.shade === shadeIdx;

                    const select = () =>
                      setSelection({ family: familyIdx, shade: shadeIdx });

                    return (
                      <button
                        key={shade.step}
                        type="button"
                        aria-label={`${family.name} ${shade.step}: ${shade.hex}`}
                        aria-pressed={isSelected}
                        onMouseEnter={select}
                        onFocus={select}
                        onClick={() => {
                          select();
                          void handleCopy(shade);
                        }}
                        style={{ backgroundColor: shade.oklch }}
                        className={`group relative size-11 cursor-pointer justify-self-center rounded-full transition-linear duration-200 ease-[var(--ease-asoebi-arrive)] hover:scale-110 focus-visible:scale-110 focus-visible:outline-none ${
                          isSelected
                            ? "scale-105 ring-2 ring-asoebi-gold-300 ring-offset-2 ring-offset-asoebi-charcoal"
                            : "ring-1 ring-white/10 hover:ring-white/30"
                        }`}
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

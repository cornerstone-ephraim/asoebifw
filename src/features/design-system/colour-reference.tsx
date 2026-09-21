import { ColorScaleGrid, type ColorFamily } from "./color-scale-grid";
import { CopyableColorRow } from "./copyable-color-row";
const colors = [
  [
    "Asoebi violet",
    "#52239f",
    "oklch(40.23% 0.1838 293.56)",
    "rgba(82, 35, 159, 1)",
    "Identity, action and editorial emphasis",
  ],
  [
    "Deep aubergine",
    "#2a1157",
    "oklch(26.46% 0.1167 292.92)",
    "rgba(42, 17, 87, 1)",
    "High-contrast moments and night energy",
  ],
  [
    "Pale lilac",
    "#eee8f8",
    "oklch(94.03% 0.0223 302.93)",
    "rgba(238, 232, 248, 1)",
    "Atmosphere, grouping and soft separation",
  ],
  [
    "Warm ivory",
    "#fff8ee",
    "oklch(98.18% 0.0152 77.07)",
    "rgba(255, 248, 238, 1)",
    "The primary canvas, warmer than clinical white",
  ],
  [
    "Marigold",
    "#fbcd4f",
    "oklch(86.64% 0.1486 88.49)",
    "rgba(251, 205, 79, 1)",
    "Celebration, priority actions and highlights",
  ],
  [
    "Soft blush",
    "#ffd9d0",
    "oklch(91.48% 0.0444 33.52)",
    "rgba(255, 217, 208, 1)",
    "Warm editorial fields and soft contrast",
  ],
] as const;

const swatchHeights = ["h-32", "h-40", "h-28", "h-36", "h-44", "h-24"];

function makeShade(
  step: number,
  lightness: number,
  chroma: number,
  hue: number,
) {
  const angle = (hue * Math.PI) / 180;
  const a = chroma * Math.cos(angle);
  const b = chroma * Math.sin(angle);
  const l = lightness / 100;
  const lCube = Math.pow(l + 0.3963377774 * a + 0.2158037573 * b, 3);
  const mCube = Math.pow(l - 0.1055613458 * a - 0.0638541728 * b, 3);
  const sCube = Math.pow(l - 0.0894841775 * a - 1.291485548 * b, 3);
  const linear = [
    4.0767416621 * lCube - 3.3077115913 * mCube + 0.2309699292 * sCube,
    -1.2684380046 * lCube + 2.6097574011 * mCube - 0.3413193965 * sCube,
    -0.0041960863 * lCube - 0.7034186147 * mCube + 1.707614701 * sCube,
  ];
  const rgb = linear.map((channel) => {
    const encoded =
      channel <= 0.0031308
        ? 12.92 * channel
        : 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, encoded)) * 255);
  });
  const hex = `#${rgb.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
  return {
    step,
    oklch: `oklch(${lightness}% ${chroma} ${hue})`,
    hex,
    rgba: `rgba(${rgb.join(", ")}, 1)`,
  };
}

const purpleScale = [
  [50, 97.07, 0.0164, 301.22],
  [100, 93.6, 0.0358, 299.74],
  [200, 87.29, 0.0731, 299.84],
  [300, 78.27, 0.129, 299.26],
  [400, 67.59, 0.1798, 298.61],
  [500, 57.23, 0.2153, 295.29],
  [600, 48.2, 0.2135, 294.32],
  [700, 40.23, 0.1838, 293.56],
  [800, 32.66, 0.1474, 292.77],
  [900, 26.46, 0.1167, 292.92],
  [950, 18.55, 0.0756, 298.27],
].map(([step, lightness, chroma, hue]) =>
  makeShade(step, lightness, chroma, hue),
);

const goldScale = [
  [50, 98.27, 0.0207, 88.72],
  [100, 95.64, 0.0579, 91.09],
  [200, 91.42, 0.1109, 90.28],
  [300, 86.64, 0.1486, 88.49],
  [400, 80.11, 0.1562, 84.1],
  [500, 72.54, 0.1469, 79.92],
  [600, 62.61, 0.132, 70.97],
  [700, 51.69, 0.1106, 66.15],
  [800, 44.46, 0.0935, 61.59],
  [900, 39.37, 0.0798, 58.84],
  [950, 27, 0.0566, 55.56],
].map(([step, lightness, chroma, hue]) =>
  makeShade(step, lightness, chroma, hue),
);

const colorFamilies: ColorFamily[] = [
  {
    name: "Purple",
    purpose: "Identity and depth",
    shades: purpleScale,
  },
  {
    name: "Gold",
    purpose: "Celebration and priority",
    shades: goldScale,
  },
];

export function ColourReference() {
  return (
    <section id="colour" className="scroll-mt-24 px-5 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-375">
        <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
          Colour logic
        </p>
        <div className="mt-5 grid gap-8 lg:grid-cols-2">
          <h2 className="font-display text-4xl leading-none tracking-tight sm:text-5xl lg:text-6xl">
            Colour behaves like fabric.
          </h2>
          <p className="max-w-xl self-end text-lg leading-8 text-asoebi-graphite">
            The system concentrates colour instead of flooding every surface.
            Ivory holds the page together, lilac groups related content, violet
            owns identity, and marigold marks moments worth noticing.
          </p>
        </div>
        <div data-ds-swatches className="mt-14">
          <div className="overflow-hidden rounded-4xl bg-asoebi-purple-950 p-6 text-white shadow-asoebi-deep sm:p-9">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-bold tracking-[.16em] text-asoebi-gold-300 uppercase">
                  Palette architecture
                </p>
                <h3 className="mt-3 font-display text-4xl tracking-[-.045em] sm:text-5xl">
                  A spectrum with clear roles.
                </h3>
              </div>
              <p className="text-xs font-bold tracking-[.12em] text-white/50 uppercase">
                Canvas → Identity → Celebration
              </p>
            </div>

            <div className="mt-12 grid grid-cols-6 items-end gap-2 border-b border-white/20 px-1 sm:gap-3">
              {colors.map(([name, value], index) => (
                <div key={value} className="min-w-0">
                  <div
                    style={{ backgroundColor: value }}
                    className={`${swatchHeights[index]} rounded-t-2xl shadow-asoebi-float`}
                  />
                  <p className="truncate py-3 text-center text-[8px] font-bold tracking-[.08em] text-white/65 uppercase sm:text-[10px]">
                    {name}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 pt-7 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "Canvas leads",
                  "Ivory and lilac hold space before stronger colour enters.",
                ],
                [
                  "Violet identifies",
                  "The purple family owns brand recognition and primary action.",
                ],
                [
                  "Gold celebrates",
                  "Marigold marks prize moments, invitations and priority.",
                ],
                [
                  "Blush softens",
                  "A warm supporting field keeps editorial chapters human.",
                ],
              ].map(([title, copy]) => (
                <div key={title} className="border-t border-white/20 pt-4">
                  <h4 className="font-display text-2xl">{title}</h4>
                  <p className="mt-2 text-sm leading-6 text-white/60">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-y border-asoebi-purple-200">
            {colors.map(([name, value, oklch, rgba, use]) => (
              <CopyableColorRow
                key={value}
                name={name}
                value={value}
                oklch={oklch}
                rgba={rgba}
                use={use}
              />
            ))}
          </div>

          <ColorScaleGrid families={colorFamilies} />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl">Choose by role</h3>
              <p className="mt-3 text-sm leading-6">
                brand maps to purple-700; brand-deep maps to purple-900.
                Marigold is gold-300, not gold-400. Use paper or ivory for
                reading, mist for grouping and graphite for body copy. The
                darker purple-950 is a separate surface token from brand-deep.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl">
                Status needs more than colour
              </h3>
              <p className="mt-3 text-sm leading-6">
                Errors use red with an explicit message; success uses
                confirmation copy and sometimes emerald. Gold is emphasis, not a
                validation state. Check contrast for the exact
                foreground/background pair, especially over photography. HEX
                values are sRGB approximations of the OKLCH tokens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ColorScaleGrid,
  type ColorFamily,
} from "@/features/design-system/color-scale-grid";
import { CopyableColorRow } from "@/features/design-system/copyable-color-row";
import { DesignSystemMotion } from "@/features/design-system/design-system-motion";
import { DesignSystemNav } from "@/features/design-system/design-system-nav";

export const metadata: Metadata = {
  title: "Design System Notes",
  description:
    "An internal breakdown of the Asoebi Fashion Week design system.",
  robots: { index: false, follow: false, nocache: true },
};

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

const motion = [
  [
    "Arrival",
    "Reveals hierarchy",
    "Large messages enter first; support follows only when it helps comprehension.",
  ],
  [
    "Continuity",
    "Connects states",
    "The navbar contracts, cards shuffle, and selected roles remain conceptually continuous.",
  ],
  [
    "Atmosphere",
    "Keeps fashion alive",
    "Slow image travel and the runway ribbon create energy without blocking reading.",
  ],
  [
    "Feedback",
    "Confirms intent",
    "Hover, selection, submission and download states answer an action quickly.",
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

export default function DesignSystemPage() {
  return (
    <DesignSystemMotion>
      <DesignSystemNav />
      <section className="px-5 pb-20 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-375">
          <div
            data-ds-meta
            className="flex items-center justify-between border-b border-asoebi-purple-200 pb-5 text-[10px] font-bold tracking-[.18em] uppercase"
          >
            <span>Internal design notes</span>
            <span>Last aligned · August 2026</span>
          </div>
          <div className="grid gap-12 pt-14 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
            <div>
              <p className="text-xs font-bold tracking-[.2em] text-brand uppercase">
                How the system works
              </p>
              <h1 className="mt-5 font-display text-[clamp(4.5rem,11vw,11rem)] leading-[.82] tracking-[-.07em]">
                <span className="block overflow-hidden">
                  <span data-ds-hero-line className="block pb-[.08em]">
                    Asoebi,
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    data-ds-hero-line
                    className="block pb-[.08em] text-brand"
                  >
                    by design.
                  </span>
                </span>
              </h1>
            </div>
            <div data-ds-hero-copy>
              <p className="max-w-lg text-lg leading-8 text-asoebi-graphite">
                A practical record of how colour, type, space, imagery and
                motion work together to make Asoebi Fashion Week feel like a
                living fashion institution.
              </p>
              <p className="mt-8 text-xs font-bold tracking-[.15em] text-asoebi-muted uppercase">
                Not a component catalogue. A set of decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="principles"
        data-ds-reveal
        className="scroll-mt-36 bg-asoebi-purple-950 px-5 py-24 text-white lg:px-10 lg:py-36"
      >
        <div className="mx-auto grid max-w-375 gap-14 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-300 uppercase">
              The premise
            </p>
            <p className="mt-5 font-display text-4xl leading-[.98] tracking-[-.04em]">
              Fashion is personality.
              <br />
              The interface is the frame.
            </p>
          </div>
          <div>
            <p className="font-display text-[clamp(3.5rem,7vw,7rem)] leading-[.86] tracking-[-.055em]">
              Bright enough for celebration. Structured enough for authority.
              Fluid enough for cloth.
            </p>
            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {[
                ["Editorial, not ornamental"],
                ["African, not generic luxury"],
                ["Expressive, not exhausting"],
              ].map(([label]) => (
                <div key={label} className="border-t border-white/25 pt-4">
                  <p className="mt-8 font-bold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="colour"
        className="scroll-mt-36 px-5 py-24 lg:px-10 lg:py-36"
      >
        <div className="mx-auto max-w-375">
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            Colour logic
          </p>
          <div className="mt-5 grid gap-8 lg:grid-cols-2">
            <h2 className="font-display text-6xl leading-[.88] tracking-[-.055em] sm:text-8xl">
              Colour behaves like fabric.
            </h2>
            <p className="max-w-xl self-end text-lg leading-8 text-asoebi-graphite">
              The system concentrates colour instead of flooding every surface.
              Ivory holds the page together, lilac groups related content,
              violet owns identity, and marigold marks moments worth noticing.
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
                    <p className="mt-2 text-sm leading-6 text-white/60">
                      {copy}
                    </p>
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
          </div>
        </div>
      </section>

      <section
        id="typography"
        className="scroll-mt-36 overflow-hidden bg-asoebi-mist px-5 py-24 lg:px-10 lg:py-36"
      >
        <div className="mx-auto max-w-375">
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            Typography
          </p>
          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            <div
              data-ds-specimen
              className="rounded-4xl bg-white p-8 shadow-asoebi-soft sm:p-12"
            >
              <p className="text-xs font-bold tracking-[.18em] text-asoebi-muted uppercase">
                Bricolage Grotesque · personality
              </p>
              <p className="mt-10 font-display text-7xl leading-[.82] tracking-[-.065em] sm:text-9xl">
                Cloth carries memory.
              </p>
              <p className="mt-10 font-display text-3xl">
                Display, statements, chapters, collection names.
              </p>
            </div>
            <div
              data-ds-specimen
              className="rounded-4xl bg-asoebi-purple-950 p-8 text-white shadow-asoebi-float sm:p-12"
            >
              <p className="text-xs font-bold tracking-[.18em] text-asoebi-purple-300 uppercase">
                Schibsted Grotesk · readability
              </p>
              <p className="mt-10 max-w-lg text-2xl leading-9">
                Functional language stays composed and legible, from navigation
                and labels to schedules, forms and metadata.
              </p>
              <div className="mt-14 space-y-4 border-t border-white/20 pt-7 text-sm">
                <p className="font-bold tracking-[.18em] uppercase">
                  Navigation / 15px / 600
                </p>
                <p className="leading-7 text-white/65">
                  Body copy / 16 to 18px / generous leading
                </p>
                <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-300 uppercase">
                  Labels / 11 to 12px / deliberate tracking
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="composition"
        className="scroll-mt-36 px-5 py-24 lg:px-10 lg:py-36"
      >
        <div className="mx-auto max-w-375">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
                Composition
              </p>
              <h2 className="mt-5 font-display text-6xl leading-[.88] tracking-[-.055em]">
                Whitespace is part of the outfit.
              </h2>
            </div>
            <div
              data-ds-image-wrap
              className="relative aspect-16/10 overflow-hidden rounded-4xl bg-white shadow-asoebi-panel"
            >
              <Image
                data-ds-image
                src="/images/editorial/fashion-story/the-modern-runway.webp"
                alt="Models presenting coordinated contemporary Asoebi looks on an outdoor runway"
                fill
                sizes="(min-width:1024px) 65vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-asoebi-ivory via-asoebi-ivory/70 to-transparent" />
              <div className="absolute bottom-8 left-8 max-w-[8ch] font-display text-5xl leading-[.82] tracking-[-.055em] sm:text-8xl">
                Message first.
                <br />
                <span className="text-brand">Image in motion.</span>
              </div>
            </div>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["Scale", "One dominant editorial message owns each chapter."],
              [
                "Asymmetry",
                "Offset columns create energy without disrupting semantic order.",
              ],
              [
                "Media",
                "Photography participates in layout; it is never decorative filler.",
              ],
            ].map(([title, copy]) => (
              <article
                key={title}
                className="border-t border-asoebi-purple-300 pt-5"
              >
                <h3 className="font-display text-3xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-asoebi-graphite">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="motion"
        data-ds-reveal
        className="scroll-mt-36 bg-asoebi-butter px-5 py-24 lg:px-10 lg:py-36"
      >
        <div className="mx-auto max-w-375">
          <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-800 uppercase">
            Motion has a job
          </p>
          <h2 className="mt-5 max-w-5xl font-display text-6xl leading-[.86] tracking-[-.055em] sm:text-8xl">
            Move meaning,
            <br />
            not everything.
          </h2>
          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            {motion.map(([title, role, description]) => (
              <article
                key={title}
                className="rounded-3xl bg-white p-7 shadow-asoebi-warm-soft"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-4xl tracking-[-.04em]">
                    {title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full bg-brand"
                  />
                </div>
                <p className="mt-10 text-xs font-bold tracking-[.16em] text-brand uppercase">
                  {role}
                </p>
                <p className="mt-3 max-w-lg leading-7 text-asoebi-graphite">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="components"
        className="scroll-mt-36 px-5 py-24 lg:px-10 lg:py-36"
      >
        <div className="mx-auto max-w-375">
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            Component anatomy
          </p>
          <h2 className="mt-5 font-display text-6xl tracking-[-.055em] sm:text-8xl">
            The invitation deck.
          </h2>
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div
              data-ds-card-stack
              className="relative min-h-124 rounded-4xl bg-asoebi-purple-950 p-8"
            >
              <div className="absolute inset-0 rounded-4xl bg-[url('/images/waitlist-collage.png')] bg-cover opacity-30" />
              <div className="absolute inset-8 translate-x-5 translate-y-5 rotate-3 rounded-3xl bg-asoebi-gold-400 shadow-asoebi-deep" />
              <div className="absolute inset-8 translate-x-2 translate-y-2 -rotate-2 rounded-3xl bg-asoebi-purple-200 shadow-asoebi-deep" />
              <div className="absolute inset-8 flex flex-col justify-between rounded-3xl bg-asoebi-purple-900 p-8 text-white shadow-asoebi-deep">
                <Image
                  src="/images/waitlist/designer-card-illustration.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="pointer-events-none object-contain object-bottom opacity-20"
                />
                <div className="flex justify-between text-xs font-bold tracking-[.18em] uppercase">
                  <span>Asoebi Fashion Week</span>
                  <span className="grid size-10 place-items-center rounded-full bg-asoebi-gold-300 text-asoebi-purple-950">
                    ✺
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[.16em] text-white/55 uppercase">
                    Designer access
                  </p>
                  <p className="mt-3 font-display text-5xl leading-[.9]">
                    Your invitation is also an identity.
                  </p>
                </div>
                <p className="border-t border-white/20 pt-5 text-[10px] font-bold tracking-[.16em] uppercase">
                  Select · Personalise · Download
                </p>
              </div>
            </div>
            <ul className="space-y-7">
              {[
                [
                  "Role first",
                  "Each audience receives a distinct colour, message and access identity.",
                ],
                [
                  "Selection as continuity",
                  "The chosen card moves to the front instead of disappearing and reappearing.",
                ],
                [
                  "A useful reward",
                  "Submission unlocks a personalised, downloadable object.",
                ],
                [
                  "One system, six expressions",
                  "Variation stays controlled through shared anatomy and type hierarchy.",
                ],
              ].map(([title, copy]) => (
                <li
                  key={title}
                  className="grid gap-4 border-b border-asoebi-purple-200 pb-7"
                >
                  <div>
                    <h3 className="font-display text-3xl">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-asoebi-graphite">
                      {copy}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="responsive"
        data-ds-reveal
        className="scroll-mt-36 bg-brand px-5 py-24 text-white lg:px-10 lg:py-36"
      >
        <div className="mx-auto max-w-375">
          <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-300 uppercase">
            Responsive behaviour
          </p>
          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <h2 className="font-display text-6xl leading-[.86] tracking-[-.055em] sm:text-8xl">
              Recompose.
              <br />
              Never just shrink.
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                ["Desktop", "Asymmetry, large type and layered media."],
                ["Mobile", "Semantic vertical flow and touch-first controls."],
                [
                  "Reduced motion",
                  "Final states remain; travel and atmosphere step away.",
                ],
              ].map(([title, copy]) => (
                <div key={title} className="border-t border-white/25 pt-5">
                  <h3 className="font-display text-3xl">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/60">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-8 border-t border-white/20 pt-8 sm:flex-row sm:items-end">
            <p className="max-w-3xl font-display text-4xl leading-[.95]">
              If a choice does not strengthen fashion, clarity or culture, it
              does not belong in the system.
            </p>
            <Link
              href="/"
              className="rounded-full bg-asoebi-gold-300 px-6 py-4 text-xs font-black tracking-[.14em] text-asoebi-purple-950 uppercase"
            >
              Return to the experience ↗
            </Link>
          </div>
        </div>
      </section>
    </DesignSystemMotion>
  );
}

import Image from "next/image";
import Link from "next/link";

import { EditorialReveal } from "@/components/motion/editorial-reveal";
import { ArrowLink } from "@/components/ui/arrow-link";

export function EditorialPage({
  eyebrow,
  title,
  intro,
  children,
  cta,
  backLink,
  heroImage,
  heroImageAlt,
  heroTone = "purple",
  heroLayout = "overlay",
  heroPosition = "object-top",
  heroAspectRatio = 3 / 2,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
  cta?: { href: string; label: string };
  backLink?: { href: string; label: string };
  heroImage?: string;
  heroImageAlt?: string;
  heroTone?: "purple" | "gold" | "blush" | "mist" | "photo";
  heroLayout?: "overlay" | "statement";
  heroPosition?: string;
  heroAspectRatio?: number;
}) {
  const overlayClass = {
    photo: "from-asoebi-purple-950/65 via-asoebi-purple-950/20",
    purple: "from-asoebi-purple-950/95 via-asoebi-purple-950/60",
    gold: "from-asoebi-gold-950/90 via-asoebi-purple-950/50",
    blush: "from-asoebi-purple-950/90 via-asoebi-coral-900/45",
    mist: "from-asoebi-purple-950/88 via-asoebi-purple-900/45",
  }[heroTone];

  return (
    <main id="main-content" className="min-h-screen bg-asoebi-paper">
      {heroLayout === "statement" ? (
        <header className="bg-asoebi-ivory px-5 pt-32 pb-8 text-asoebi-purple-950 lg:px-10 lg:pt-40 lg:pb-12">
          <div className="mx-auto max-w-400">
            <p className="text-xs font-bold tracking-[.2em] text-brand uppercase">
              {eyebrow}
            </p>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-16">
              <h1 className="max-w-[14ch] font-display text-[clamp(3.5rem,7vw,8rem)] leading-[.9] tracking-[-.06em]">
                {title}
              </h1>
              <div className="max-w-lg border-t border-asoebi-purple-950/25 pt-5">
                <p className="text-base leading-7 text-asoebi-graphite sm:text-lg sm:leading-8">
                  {intro}
                </p>
                {cta && (
                  <div className="mt-6">
                    <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
                  </div>
                )}
              </div>
            </div>
            {heroImage && (
              <div className="relative mt-10 aspect-3/2 overflow-hidden lg:mt-14 lg:aspect-12/5">
                <Image
                  src={heroImage}
                  alt={heroImageAlt ?? ""}
                  fill
                  preload
                  sizes={`(min-width: 1680px) 1600px, (min-width: 1024px) calc(100vw - 80px), calc(${(heroAspectRatio / 1.5) * 100}vw - ${(heroAspectRatio / 1.5) * 40}px)`}
                  quality={90}
                  className={`object-cover ${heroPosition}`}
                />
              </div>
            )}
          </div>
        </header>
      ) : (
        <header className="relative flex min-h-[82svh] items-end overflow-hidden bg-asoebi-purple-950 px-5 pt-36 pb-14 text-white sm:pb-20 lg:min-h-[88svh] lg:px-10">
          {heroImage && (
            <Image
              src={heroImage}
              alt={heroImageAlt ?? ""}
              fill
              preload
              // Cover cropping can make the source wider than the visible frame.
              sizes={`(min-width: 1024px) max(100vw, ${88 * heroAspectRatio}svh), max(100vw, ${82 * heroAspectRatio}svh, ${720 * heroAspectRatio}px)`}
              quality={90}
              className={`object-cover ${heroPosition}`}
            />
          )}
          <div
            className={`absolute inset-0 bg-linear-to-r ${overlayClass} to-transparent`}
          />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-asoebi-purple-950/80 to-transparent" />

          <EditorialReveal className="relative mx-auto w-full max-w-400">
            {backLink && (
              <Link
                href={backLink.href}
                className="group transition-linear mb-8 inline-flex min-h-11 items-center gap-2 text-xs font-bold tracking-[.12em] uppercase opacity-75 transition-opacity hover:opacity-100"
              >
                <span
                  aria-hidden="true"
                  className="transition-linear inline-block transition-transform group-hover:-translate-x-1 group-focus-visible:-translate-x-1"
                >
                  ←
                </span>
                {backLink.label}
              </Link>
            )}
            <p className="text-xs font-bold tracking-[.2em] text-asoebi-gold-300 uppercase">
              {eyebrow}
            </p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
              <h1 className="max-w-[11ch] font-display text-[clamp(4.5rem,10vw,10rem)] leading-[.78] tracking-[-.07em]">
                {title}
              </h1>
              <div className="max-w-xl border-t border-white/35 pt-5">
                <p className="text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
                  {intro}
                </p>
                {cta && (
                  <div className="mt-7">
                    <ArrowLink href={cta.href} inverse>
                      {cta.label}
                    </ArrowLink>
                  </div>
                )}
              </div>
            </div>
          </EditorialReveal>
        </header>
      )}

      {children && (
        <div className="px-5 py-24 lg:px-10 lg:py-32">
          <EditorialReveal className="mx-auto max-w-400">
            {children}
          </EditorialReveal>
        </div>
      )}
    </main>
  );
}

export function EmptyNotice({
  title = "Official details coming soon",
  body = "This page is ready for approved programme content from the Asoebi team.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <div className="grid gap-7 border-y border-asoebi-ink py-12 md:grid-cols-2">
      <h2 className="font-display text-4xl tracking-[-.04em]">{title}</h2>
      <p className="max-w-lg text-asoebi-graphite">{body}</p>
    </div>
  );
}

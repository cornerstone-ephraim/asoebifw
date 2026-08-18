import Image from "next/image";
import Link from "next/link";

import { HomeMotion } from "@/animation/gsap/home-motion";
import { ArrowLink } from "@/components/ui/arrow-link";
import { WaitlistSection } from "@/features/waitlist/waitlist-section";
import { HeroMotion } from "./hero-motion";
import { PrizeCountdown } from "./prize-countdown";

const platform = [
  {
    title: "Fashion Week",
    copy: "Runways, collections and accreditation.",
    href: "/fashion-week",
    color: "bg-asoebi-mist",
  },
  {
    title: "Asoebi Prize",
    copy: "The premier annual award celebrating creativity in African fashion.",
    href: "/prize",
    color: "bg-asoebi-butter",
  },
  {
    title: "Asoebi Vendor",
    copy: "A marketplace connecting buyers with trusted Asoebi suppliers.",
    href: "/vendor",
    color: "bg-asoebi-blush",
  },
  {
    title: "After Party",
    copy: "The official networking and celebration event.",
    href: "/after-party",
    color: "bg-asoebi-purple-950 text-white",
  },
] as const;

export function HomePage() {
  return (
    <HomeMotion>
      <section className="relative flex min-h-svh items-center overflow-hidden bg-asoebi-ivory px-5 py-28 text-center text-asoebi-purple-950 lg:px-10">
        <Image
          data-hero-atmosphere
          src="/images/asoebi-hero-campaign.png"
          alt="Contemporary Asoebi fashion in a sunlit courtyard"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-asoebi-soft-ivory via-asoebi-soft-ivory/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-asoebi-soft-ivory to-transparent" />
        <div className="relative mx-auto w-full max-w-375">
          <HeroMotion>
            <div className="mx-auto flex max-w-5xl flex-col items-center">
              <p
                data-hero-eyebrow
                className="mb-5 text-[11px] font-bold uppercase tracking-[.2em] text-brand"
              >
                Fashion · Culture · Celebration
              </p>
              <h1 className="font-display text-[clamp(4.3rem,10vw,9rem)] leading-[.76] tracking-[-.07em]">
                <span data-hero-title-line className="block">
                  The global
                </span>
                <span data-hero-title-line className="block text-brand">
                  home of Asoebi.
                </span>
              </h1>
              <div data-hero-support className="mt-8 w-full max-w-2xl">
                <p className="hidden text-lg leading-8 text-asoebi-graphite sm:block">
                  A year-round global platform for designers, vendors, awards,
                  networking, commerce and African cultural celebration.
                </p>
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between gap-4 text-left">
                    <p className="text-[9px] font-bold uppercase tracking-[.16em] text-brand sm:text-[10px]">
                      Asoebi Prize · December 2026
                    </p>
                    <Link
                      href="/prize"
                      className="text-[9px] font-bold uppercase tracking-[.12em] text-brand transition-opacity transition-linear hover:opacity-60"
                    >
                      Prize details ↗
                    </Link>
                  </div>
                  <PrizeCountdown compact />
                </div>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/prize#apply"
                    className="rounded-full bg-brand px-6 py-4 text-xs font-bold uppercase tracking-[.14em] text-white"
                  >
                    Apply for the prize
                  </Link>
                  <Link
                    href="/about"
                    className="rounded-full border border-brand px-6 py-4 text-xs font-bold uppercase tracking-[.14em] text-brand"
                  >
                    About Asoebi
                  </Link>
                </div>
              </div>
            </div>
          </HeroMotion>
        </div>
      </section>

      <section className="bg-asoebi-paper px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-375">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
                A little about us
              </p>
              <h2
                data-motion-reveal
                className="font-display mt-5 text-6xl leading-[.86] tracking-[-.055em] sm:text-8xl"
              >
                More than a fashion show.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-asoebi-graphite">
              Asoebi Fashion Week brings fashion, culture, awards, commerce and
              celebration together as one global platform.
            </p>
          </div>
          <div className="mt-10">
            <ArrowLink href="/about">Read our vision</ArrowLink>
          </div>
        </div>
      </section>

      <section className="bg-asoebi-paper px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-375">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
            Inside the platform
          </p>
          <h2 className="font-display mt-5 max-w-4xl text-6xl leading-[.86] tracking-[-.055em] sm:text-8xl">
            One home. Four expressions.
          </h2>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {platform.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex min-h-80 flex-col justify-between rounded-[1.75rem] p-7 shadow-[0_18px_55px_rgba(42,17,87,.08)] ${item.color}`}
              >
                <span className="text-xs font-bold uppercase tracking-[.16em] opacity-55">
                  Asoebi platform
                </span>
                <div>
                  <h3 className="font-display text-5xl tracking-[-.055em] sm:text-6xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-md leading-7 opacity-65">
                    {item.copy}
                  </p>
                  <span className="mt-7 inline-block transition-transform transition-linear group-hover:translate-x-1">
                    Explore ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="apply"
        className="bg-asoebi-butter px-5 py-24 lg:px-10 lg:py-36"
      >
        <div className="mx-auto flex max-w-375 flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-asoebi-gold-800">
              Asoebi Prize
            </p>
            <h2 className="font-display mt-5 max-w-4xl text-6xl leading-[.86] tracking-[-.055em] sm:text-8xl">
              Your creativity deserves the stage.
            </h2>
          </div>
          <Link
            href="/prize#apply"
            className="shrink-0 rounded-full bg-asoebi-purple-950 px-7 py-5 text-xs font-black uppercase tracking-[.14em] text-white"
          >
            Apply for the prize ↗
          </Link>
        </div>
      </section>
      <WaitlistSection />
    </HomeMotion>
  );
}

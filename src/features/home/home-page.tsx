import Image from "next/image";
import Link from "next/link";

import { HomeMotion } from "@/animation/gsap/home-motion";
import { ArrowLink } from "@/components/ui/arrow-link";
import { PrizeCountdown } from "@/features/prize/prize-countdown";
import { FashionStoryCrossfade } from "./fashion-story-crossfade";
import { HeroMotion } from "./hero-motion";

const prizeCategories = [
  "Best Designer",
  "Best Wedding Asoebi",
  "Best Innovative Fabric Design",
] as const;

const vendorCategories = [
  "Fabric sellers",
  "Fashion designers",
  "Accessories vendors",
] as const;

export function HomePage() {
  return (
    <HomeMotion>
      <section className="relative flex min-h-svh items-end overflow-hidden bg-asoebi-purple-950 px-5 pt-36 pb-12 text-white sm:pb-16 lg:px-10 lg:pb-20">
        <Image
          data-hero-atmosphere
          src="/images/editorial/home-hero.png"
          alt="Three models wearing contemporary purple, lilac and ivory Asoebi looks"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-r from-asoebi-purple-950/88 via-asoebi-purple-950/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-linear-to-t from-asoebi-purple-950/90 to-transparent" />
        <div className="relative mx-auto w-full max-w-400">
          <HeroMotion>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
              <h1 className="max-w-[10ch] font-display text-[clamp(4.5rem,10vw,10rem)] leading-[.76] tracking-[-.07em]">
                <span data-hero-title-line className="block">
                  The global home
                </span>
                <span data-hero-title-line className="block">
                  of Asoebi.
                </span>
              </h1>
              <div
                data-hero-support
                className="max-w-xl border-t border-white/40 pt-5"
              >
                <p className="text-base leading-7 text-white/80 sm:text-lg">
                  A year-round platform for African fashion, commerce,
                  recognition and celebration.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/prize#apply"
                    className="flex items-center justify-center rounded-full bg-asoebi-gold-300 px-6 py-4 text-xs font-black tracking-[.13em] text-asoebi-purple-950 uppercase transition-colors ease-linear hover:bg-white"
                  >
                    Apply for the prize
                  </Link>
                  <Link
                    href="/#waitlist"
                    className="flex items-center justify-center rounded-full border border-white/55 px-6 py-4 text-xs font-black tracking-[.13em] uppercase transition-colors ease-linear hover:bg-white hover:text-asoebi-purple-950"
                  >
                    Join the waitlist
                  </Link>
                </div>
                <div className="mt-7">
                  <div className="mb-2 text-[10px] font-bold tracking-[.14em] uppercase">
                    <span>Asoebi Prize · December 26, 2026</span>
                  </div>
                  <PrizeCountdown compact />
                </div>
              </div>
            </div>
          </HeroMotion>
        </div>
      </section>

      <section className="overflow-hidden bg-asoebi-purple-950 py-20 text-white lg:py-28">
        <div className="px-5 lg:px-10">
          <div className="mx-auto flex max-w-400 items-end justify-between gap-8">
            <div>
              <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-300 uppercase">
                Asoebi Fashion Week
              </p>
              <h2 className="mt-4 font-display text-5xl tracking-[-.055em] sm:text-7xl">
                Where culture meets catwalk.
              </h2>
            </div>
            <div className="hidden sm:block">
              <ArrowLink href="/fashion-week" inverse>
                Enter Fashion Week
              </ArrowLink>
            </div>
          </div>
        </div>
        <FashionStoryCrossfade />
      </section>

      <section className="bg-asoebi-butter px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-400">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-900 uppercase">
                Asoebi Prize
              </p>
              <h2 className="mt-5 font-display text-6xl leading-[.86] tracking-[-.06em] sm:text-8xl">
                Discovering the future of African fashion.
              </h2>
            </div>
            <p className="text-lg leading-8 text-asoebi-graphite">
              A competition for emerging and student brands, created to move
              African fashion talent toward the world stage.
            </p>
          </div>
          <div className="mt-16 grid border-y border-asoebi-purple-950/25 lg:grid-cols-[.8fr_1.2fr]">
            <div className="py-10 lg:border-r lg:border-asoebi-purple-950/25 lg:pr-12">
              <p className="text-xs font-bold tracking-[.16em] text-brand uppercase">
                Prize fund and benefits
              </p>
              <p className="mt-6 font-display text-7xl tracking-[-.06em]">
                ₦10,000,000
              </p>
              <p className="mt-3 text-asoebi-graphite">
                First place · AEFW Prize
              </p>
              <p className="mt-8 font-display text-4xl">Rising Star Award</p>
              <p className="mt-2 text-asoebi-graphite">
                Second place · Fashion house internship
              </p>
              <p className="mt-8 font-display text-4xl">
                Fashion Education Award
              </p>
              <p className="mt-2 text-asoebi-graphite">
                Third place · Funded international course
              </p>
            </div>
            <div className="py-10 lg:pl-12">
              <p className="text-xs font-bold tracking-[.16em] text-brand uppercase">
                Prize categories
              </p>
              <ul className="mt-6">
                {prizeCategories.map((category) => (
                  <li
                    key={category}
                    className="border-t border-asoebi-purple-950/20 py-6 font-display text-3xl sm:text-4xl"
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <ArrowLink href="/prize#apply">Put your work forward</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-asoebi-paper px-5 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto grid max-w-400 gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
              Asoebi Vendor
            </p>
            <h2 className="mt-5 font-display text-6xl leading-[.86] tracking-[-.06em] sm:text-8xl">
              The Asoebi supply chain, brought together.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-asoebi-graphite">
              A marketplace for product listings, online bookings and digital
              storefronts from trusted Asoebi suppliers.
            </p>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {vendorCategories.map((category) => (
                <li
                  key={category}
                  className="border-b border-asoebi-purple-950/30 pb-2 font-bold"
                >
                  {category}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <ArrowLink href="/vendor">Explore Asoebi Vendor</ArrowLink>
            </div>
          </div>
          <div className="relative min-h-144 overflow-hidden bg-asoebi-purple-950">
            <Image
              src="/images/waitlist/vendor-card-illustration.png"
              alt="An editorial illustration of an Asoebi fashion marketplace"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-bottom"
            />
          </div>
        </div>
      </section>

      <section className="relative min-h-[75svh] overflow-hidden bg-asoebi-purple-950 px-5 py-24 text-white lg:px-10 lg:py-36">
        <Image
          src="/images/tickets-editorial.png"
          alt="Editorial ticket artwork for the Asoebi After Party"
          fill
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-linear-to-r from-asoebi-purple-950 via-asoebi-purple-950/75 to-transparent" />
        <div className="relative mx-auto flex min-h-[55svh] max-w-400 items-end">
          <div className="max-w-4xl">
            <p className="text-xs font-bold tracking-[.18em] text-asoebi-gold-300 uppercase">
              Asoebi After Party · October 2 · London
            </p>
            <h2 className="mt-5 font-display text-6xl leading-[.86] tracking-[-.06em] sm:text-8xl">
              London, dressed for the occasion.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/75">
              Music, fashion and conversation bring the Asoebi community
              together for one London celebration.
            </p>
            <div className="mt-9">
              <ArrowLink href="/after-party" inverse>
                Discover the celebration
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </HomeMotion>
  );
}

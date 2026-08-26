import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative min-h-svh overflow-hidden bg-asoebi-ivory px-5 pt-32 pb-12 text-asoebi-purple-950 sm:px-8 lg:px-10 lg:pt-36 lg:pb-16"
    >
      <div
        aria-hidden="true"
        className="editorial-grid absolute inset-0 opacity-15"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-0 h-px w-2/3 bg-linear-to-l from-brand/45 to-transparent"
      />

      <div className="relative mx-auto flex min-h-[calc(100svh-11rem)] max-w-400 flex-col justify-center">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-[.2em] text-brand uppercase">
              The thread ends here
            </p>
            <h1 className="mt-6 max-w-[8ch] font-display text-[clamp(4.5rem,10vw,10rem)] leading-[.78] tracking-[-.07em]">
              Lost in
              <br />
              <span className="text-brand">the folds.</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-7 text-asoebi-graphite sm:text-lg sm:leading-8">
              The page you followed is no longer part of this collection. The
              story continues elsewhere.
            </p>
            <Link
              href="/"
              className="group transition-linear mt-9 inline-flex min-h-13 items-center rounded-full bg-asoebi-gold-300 px-7 text-xs font-black tracking-[.13em] text-asoebi-purple-950 uppercase hover:bg-white focus-visible:bg-white"
            >
              Return to the front row{" "}
              <span
                aria-hidden="true"
                className="transition-linear ml-1 inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5"
              >
                ↗
              </span>
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-2xl lg:mt-4">
            <p
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 right-0 z-10 font-display text-[clamp(11rem,24vw,25rem)] leading-none font-bold tracking-widest text-asoebi-gold-500"
            >
              404
            </p>
            <div className="relative mt-24 ml-auto aspect-4/3 w-[88%] overflow-hidden rounded-t-[45%] bg-asoebi-purple-800 shadow-asoebi-deep sm:w-4/5 lg:mt-32 lg:w-[86%]">
              <Image
                src="/images/editorial/fashion-story/cloth-in-motion.webp"
                alt="Three people in coordinated purple and gold Asoebi looks walking together"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 80vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-t from-asoebi-purple-950/60 via-transparent to-asoebi-gold-300/10" />
            </div>
            <p className="absolute right-0 bottom-5 z-10 max-w-44 border-t border-white/50 pt-3 text-[10px] font-bold tracking-[.15em] text-white/75 uppercase">
              Not every path makes the final cut
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

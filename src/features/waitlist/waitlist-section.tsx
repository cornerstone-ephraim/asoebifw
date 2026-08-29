import Image from "next/image";

import { WaitlistForm } from "@/features/waitlist/waitlist-form";

export function WaitlistSection() {
  return (
    <section
      id="waitlist"
      className="bg-asoebi-mist px-5 py-24 lg:px-10 lg:py-36"
    >
      <div className="mx-auto grid max-w-375 overflow-hidden rounded-4xl bg-white shadow-asoebi-panel lg:grid-cols-[1.05fr_.95fr]">
        <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            Join the circle
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[.92] tracking-[-.055em] sm:text-7xl">
            Your place in the story starts here.
          </h2>
          <p className="mt-6 max-w-xl leading-7 text-asoebi-graphite">
            Be first to hear what is taking shape across Asoebi Fashion Week,
            the Prize and the wider platform.
          </p>

          <WaitlistForm />
        </div>

        <div className="relative min-h-96 overflow-hidden bg-asoebi-purple-950 lg:min-h-full">
          <Image
            src="/images/waitlist-collage.png"
            alt="A collage celebrating the people, cloth and creativity of Asoebi Fashion Week"
            fill
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="object-cover object-center opacity-75"
          />
          <div className="absolute inset-0 bg-linear-to-t from-asoebi-purple-950/70 via-transparent to-transparent" />
          <p className="absolute right-8 bottom-8 left-8 max-w-md font-display text-4xl leading-none tracking-[-.04em] text-white sm:text-5xl">
            Stay close to what comes next.
          </p>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Tickets", description: "Get ticket updates and first access to Asoebi Fashion Week runway shows, conversations and cultural celebrations.", path: "/tickets", keywords: ["Asoebi Fashion Week tickets", "fashion show tickets Lagos", "African fashion events"] });

export default function Page() {
  return <main className="min-h-screen bg-[#fff8ee] pt-18">
    <section className="px-5 pb-20 pt-14 lg:px-10 lg:pb-28 lg:pt-20">
      <div className="mx-auto grid max-w-[1500px] items-center gap-10 overflow-hidden rounded-[2rem] bg-[#eee8f8] p-6 sm:p-10 lg:grid-cols-[.82fr_1.18fr] lg:p-14">
        <div className="relative z-10 py-5">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-brand">Your invitation awaits</p>
          <h1 className="font-display mt-5 text-[clamp(4.2rem,8vw,8.5rem)] leading-[.78] tracking-[-.065em] text-asoebi-purple-950">Dress up.<br/><span className="text-brand">Show up.</span></h1>
          <p className="mt-8 max-w-lg text-lg leading-8 text-asoebi-graphite">Be there when designers, makers and culture take the global stage. Ticket sales will open soon.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#waitlist" className="rounded-full bg-brand px-6 py-4 text-xs font-bold uppercase tracking-[.14em] text-white">Get first access</Link>
            <Link href="/fashion-week/schedule" className="rounded-full border border-brand px-6 py-4 text-xs font-bold uppercase tracking-[.14em] text-brand">Explore the programme</Link>
          </div>
        </div>
        <div className="relative min-h-[25rem] overflow-hidden rounded-[1.5rem] bg-white sm:min-h-[34rem]">
          <Image src="/images/tickets-editorial.png" alt="Layered fashion week tickets, woven ribbons and celebratory paper forms" fill priority sizes="(min-width:1024px) 56vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>

    <section className="px-5 pb-24 lg:px-10 lg:pb-36"><div className="mx-auto grid max-w-[1500px] gap-8 border-t border-asoebi-purple-200 pt-8 md:grid-cols-3">
      {[['Runway', 'See new collections as they meet the world.'], ['Conversation', 'Get closer to the ideas moving fashion forward.'], ['Celebration', 'Stay for the culture, connection and after-hours energy.']].map(([title, copy]) => <article key={title} className="rounded-[1.25rem] bg-white p-6"><p className="text-xs font-bold uppercase tracking-[.16em] text-brand">In the experience</p><h2 className="font-display mt-4 text-3xl tracking-[-.04em]">{title}</h2><p className="mt-3 text-sm leading-6 text-asoebi-graphite">{copy}</p></article>)}
    </div></section>
  </main>;
}

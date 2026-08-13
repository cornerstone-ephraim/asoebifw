import Image from "next/image";
import Link from "next/link";

import { HomeMotion } from "@/animation/gsap/home-motion";
import { ArrowLink } from "@/components/ui/arrow-link";
import { prizeCategories } from "@/content/fallback/site";
import { WaitlistSection } from "@/features/waitlist/waitlist-section";
import type { Collection, Designer, FashionWeekEdition, Partner, ScheduleEvent } from "@/types/content";
import { HeroMotion } from "./hero-motion";

const editorialNames = ["Amara Okoye", "Tomi Adebayo", "Nia Mensah"];
const collectionNames = ["Indigo Bloom", "The Gathering", "Golden Hour"];
const ribbon = ["Fashion", "Textiles", "Craft", "Culture", "Music", "Community", "Conversation", "Celebration"];

export function HomePage({ edition, designers, collections, schedule, partners }: { edition: FashionWeekEdition; designers: Designer[]; collections: Collection[]; schedule: ScheduleEvent[]; partners: Partner[] }) {
  return <HomeMotion>
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-asoebi-ivory px-5 pb-10 pt-28 text-asoebi-purple-950 lg:px-10 lg:pb-14">
      <Image data-hero-atmosphere src="/images/asoebi-hero-campaign.png" alt="Three models wearing contemporary Asoebi-inspired couture in a sunlit courtyard" fill priority sizes="100vw" className="object-cover object-[62%_center]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#fffaf1] via-[#fffaf1]/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#fffaf1] to-transparent" />
      <div className="relative mx-auto w-full max-w-[1500px]"><HeroMotion>
        <p data-hero-eyebrow className="mb-5 text-[11px] font-bold uppercase tracking-[.2em] text-brand">Lagos · Fashion · Culture · Community</p>
        <h1 className="font-display max-w-[8ch] text-[clamp(4.8rem,11vw,11rem)] leading-[.76] tracking-[-.07em]"><span data-hero-title-line className="block">Asoebi</span><span data-hero-title-line className="block text-brand">takes</span><span data-hero-title-line className="block">the stage.</span></h1>
        <div data-hero-support className="mt-9 max-w-xl"><p className="text-base leading-7 text-asoebi-graphite sm:text-lg">{edition.description}</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/tickets" className="rounded-full bg-brand px-6 py-4 text-xs font-bold uppercase tracking-[.14em] text-white">Get tickets</Link><Link href="#waitlist" className="rounded-full border border-brand px-6 py-4 text-xs font-bold uppercase tracking-[.14em] text-brand">Join the circle</Link></div></div>
      </HeroMotion></div>
    </section>

    <section className="bg-asoebi-paper px-5 py-24 lg:px-10 lg:py-36"><div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[.6fr_1.4fr]"><p className="text-xs font-bold uppercase tracking-[.18em] text-brand">Our point of view</p><div><h2 data-motion-reveal className="font-display text-[clamp(3.2rem,7vw,7.5rem)] leading-[.86] tracking-[-.055em]">Cloth carries memory.<br/><span className="text-brand">We carry it forward.</span></h2><p data-motion-reveal className="mt-8 max-w-2xl text-lg leading-8 text-asoebi-graphite">A global meeting place for the designers, makers and communities shaping the future of African fashion.</p></div></div></section>

    <section className="bg-[#eee8f8] px-5 py-24 lg:px-10 lg:py-36"><div className="mx-auto max-w-[1500px]"><div data-motion-reveal className="flex items-end justify-between gap-8"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-brand">Meet the makers</p><h2 className="font-display mt-3 text-5xl tracking-[-.055em] sm:text-7xl">Ideas, made visible.</h2></div><ArrowLink href="/designers">All designers</ArrowLink></div><div className="mt-12 grid gap-6 md:grid-cols-3">{designers.slice(0,3).map((designer, index) => <Link data-motion-media href={`/designers/${designer.slug}`} key={designer.slug} className={`group ${index === 1 ? "md:mt-16" : ""}`}><div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-white"><Image src="/images/amara-okoye.png" alt={`${editorialNames[index] ?? designer.name} in their design studio`} fill sizes="(min-width:768px) 33vw, 100vw" className={`object-cover transition duration-700 group-hover:scale-[1.025] ${index === 1 ? "object-[70%_center] hue-rotate-[18deg]" : index === 2 ? "object-[30%_center] saturate-[.8]" : ""}`} /></div><div className="mt-4 flex justify-between"><div><h3 className="text-xl font-bold">{editorialNames[index] ?? designer.name}</h3><p className="mt-1 text-sm text-asoebi-muted">{["Sculptural occasionwear", "New-form tailoring", "Textile-led stories"][index]}</p></div><span>↗</span></div></Link>)}</div></div></section>

    <section className="bg-asoebi-paper px-5 py-24 lg:px-10 lg:py-36"><div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[.8fr_1.2fr]"><div data-motion-reveal><p className="text-xs font-bold uppercase tracking-[.18em] text-brand">The programme</p><h2 className="font-display mt-4 text-6xl leading-[.9] tracking-[-.055em]">A week designed to move you.</h2><p className="mt-6 max-w-md leading-7 text-asoebi-graphite">Runway shows, useful conversations and cultural moments,held together in one considered programme.</p></div><div className="border-t border-asoebi-purple-950">{schedule.slice(0,4).map((event) => <article data-motion-row key={event.id} className="grid gap-3 border-b border-asoebi-purple-950/20 py-6 sm:grid-cols-[1fr_auto]"><div><h3 className="text-xl font-bold">{event.title}</h3><p className="mt-1 text-sm text-asoebi-muted">{event.description}</p></div><p className="text-xs font-bold uppercase tracking-[.16em] text-brand">{event.type}</p></article>)}<div className="mt-7"><ArrowLink href="/fashion-week/schedule">Full schedule</ArrowLink></div></div></div></section>

    <section className="bg-[#fff4ce] px-5 py-24 lg:px-10 lg:py-36"><div className="mx-auto max-w-[1500px]"><p className="text-xs font-bold uppercase tracking-[.18em] text-asoebi-gold-800">New collections</p><h2 className="font-display mt-4 max-w-4xl text-6xl leading-[.86] tracking-[-.055em] sm:text-8xl">What we wear<br/>becomes who we are.</h2><div className="mt-12 grid gap-5 md:grid-cols-3">{collections.slice(0,3).map((collection, index) => <Link data-motion-media href={`/collections/${collection.slug}`} key={collection.slug} className="group rounded-[1.5rem] bg-white p-3"><div className="relative aspect-[4/5] overflow-hidden rounded-[1rem]"><Image src="/images/asoebi-hero-campaign.png" alt={`${collectionNames[index]} collection editorial`} fill sizes="(min-width:768px) 33vw, 100vw" className={`object-cover transition duration-700 group-hover:scale-105 ${["object-[72%_center]", "object-[50%_center]", "object-[88%_center]"][index]}`} /></div><h3 className="px-2 pb-2 pt-4 text-xl font-bold">{collectionNames[index]}</h3></Link>)}</div></div></section>

    <section className="overflow-hidden bg-brand py-8 text-white" aria-label="More than a runway"><div data-motion-ribbon className="flex w-max flex-nowrap will-change-transform">{[0,1].map((set) => <div key={set} aria-hidden={set === 1} className="flex shrink-0 items-center">{ribbon.map((item) => <span key={item} className="whitespace-nowrap text-2xl font-bold uppercase tracking-[-.02em] after:mx-7 after:text-asoebi-gold-300 after:content-['✦'] sm:text-4xl">{item}</span>)}</div>)}</div></section>

    <section className="bg-asoebi-paper px-5 py-24 lg:px-10 lg:py-36"><div className="mx-auto grid max-w-[1500px] gap-10 rounded-[2rem] bg-asoebi-purple-950 p-8 text-white sm:p-14 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-asoebi-gold-300">Asoebi Prize</p><h2 className="font-display mt-4 text-6xl tracking-[-.06em] sm:text-8xl">Craft deserves a spotlight.</h2><div className="mt-8"><ArrowLink href="/prize" inverse>Discover the prize</ArrowLink></div></div><ul className="self-end border-t border-white/30">{prizeCategories.map((category) => <li key={category} className="border-b border-white/20 py-5 text-lg font-bold">{category}</li>)}</ul></div></section>

    <WaitlistSection />

    <section className="bg-asoebi-paper px-5 py-16 lg:px-10"><div className="mx-auto max-w-[1500px]"><p className="text-xs font-bold uppercase tracking-[.18em] text-asoebi-muted">With support from</p><p className="mt-7 font-display text-3xl text-asoebi-purple-900">{partners.length ? partners.map((partner) => partner.name).join(" · ") : "Partnership announcements arrive soon."}</p></div></section>
  </HomeMotion>;
}

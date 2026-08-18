import { EditorialPage } from "@/components/layout/editorial-page";
import { createMetadata } from "@/lib/seo";
import { Metadata } from "next";
const features = ["DJ line-up", "Networking lounge", "Fashion awards ceremony"];
const tickets = ["VIP & VVIP", "Corporate Table", "Celebrity Admission"];

export const metadata: Metadata = createMetadata({
  title: "Asoebi After Party",
  description:
    "The official Asoebi Fashion Week networking and celebration event, featuring music, a networking lounge and fashion awards.",
  path: "/after-party",
  keywords: [
    "Asoebi After Party",
    "fashion networking",
    "fashion awards ceremony",
  ],
});

export default function Page() {
  return (
    <EditorialPage
      eyebrow="Network · Celebrate · Connect"
      title="Asoebi After Party"
      intro="The official networking and celebration event."
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <section>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
            Features
          </p>
          <ul className="mt-6 border-t border-asoebi-purple-950">
            {features.map((item) => (
              <li
                key={item}
                className="border-b border-asoebi-purple-950/20 py-6 font-display text-3xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[1.75rem] bg-asoebi-purple-950 p-8 text-white">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-asoebi-gold-300">
            Ticket types
          </p>
          <ul className="mt-8 space-y-4">
            {tickets.map((item) => (
              <li
                key={item}
                className="rounded-full bg-white/10 px-5 py-4 font-bold"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </EditorialPage>
  );
}

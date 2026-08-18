import { EditorialPage } from "@/components/layout/editorial-page";
import { createMetadata } from "@/lib/seo";
import { Metadata } from "next";

const categories = [
  "Fabric Sellers",
  "Fashion Designers",
  "Accessories Vendors",
];

const features = ["Product listings", "Online bookings", "Digital storefronts"];

export const metadata: Metadata = createMetadata({
  title: "Asoebi Vendor",
  description:
    "A marketplace connecting buyers with trusted Asoebi fabric sellers, fashion designers and accessories vendors.",
  path: "/vendor",
  keywords: ["Asoebi marketplace", "fabric sellers", "fashion vendors"],
});

export default function Page() {
  return (
    <EditorialPage
      eyebrow="Fashion and technology"
      title="Asoebi Vendor"
      intro="A marketplace connecting buyers with trusted Asoebi suppliers."
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <section>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
            Vendor categories
          </p>
          <ul className="mt-6 border-t border-asoebi-purple-950">
            {categories.map((item) => (
              <li
                key={item}
                className="border-b border-asoebi-purple-950/20 py-6 font-display text-3xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-[1.75rem] bg-asoebi-mist p-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
            Platform features
          </p>
          <ul className="mt-8 space-y-5">
            {features.map((item) => (
              <li
                key={item}
                className="rounded-full bg-white px-5 py-4 font-bold"
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

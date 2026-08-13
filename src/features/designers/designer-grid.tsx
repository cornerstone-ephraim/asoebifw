import Link from "next/link";
import { EditorialPlaceholder } from "@/components/media/editorial-placeholder";
import type { Designer } from "@/types/content";

export function DesignerGrid({ designers }: { designers: Designer[] }) { return <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">{designers.map((designer, index) => <Link key={designer.slug} href={`/designers/${designer.slug}`} className={index % 3 === 1 ? "lg:mt-20" : ""}><EditorialPlaceholder label={designer.name} tone={designer.visualTone} className="aspect-[3/4]"/><h2 className="mt-4 text-2xl font-semibold">{designer.name}</h2><p className="mt-1 text-sm text-asoebi-muted">{designer.location}</p></Link>)}</div>; }

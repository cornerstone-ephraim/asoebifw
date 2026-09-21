import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FoundationsReference,
  LayoutReference,
  GuidanceReference,
} from "@/features/design-system/foundations-reference";
import { TypographyReference } from "@/features/design-system/typography-reference";
import { ColourReference } from "@/features/design-system/colour-reference";
import { CardsReference } from "@/features/design-system/cards-reference";
import {
  ButtonsReference,
  LinksReference,
} from "@/features/design-system/actions-reference";
import { InputsReference } from "@/features/design-system/inputs-reference";
import { MotionExamples } from "@/features/design-system/motion-examples";
import { ResponsiveReference } from "@/features/design-system/responsive-reference";
import { ImageryReference } from "@/features/design-system/imagery-reference";
import {
  designSystemSections,
  sectionHref,
} from "@/features/design-system/design-system-sections";

const pages = {
  principles: FoundationsReference,
  typography: TypographyReference,
  colour: ColourReference,
  composition: LayoutReference,
  cards: CardsReference,
  buttons: ButtonsReference,
  links: LinksReference,
  inputs: InputsReference,
  motion: MotionExamples,
  responsive: ResponsiveReference,
  imagery: ImageryReference,
  guidance: GuidanceReference,
};
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(pages).map((section) => ({ section }));
}
type Props = { params: Promise<{ section: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const entry = designSystemSections.find((item) => item.slug === section);
  return { title: `${entry?.label ?? "Not found"} · Design System` };
}
export default async function DesignSystemSectionPage({ params }: Props) {
  const { section } = await params;
  if (!Object.hasOwn(pages, section)) notFound();
  const Content = pages[section as keyof typeof pages];
  const index = designSystemSections.findIndex((item) => item.slug === section);
  const previous = designSystemSections[index - 1];
  const next = designSystemSections[index + 1];
  return (
    <>
      <Content />
      <nav
        aria-label="Adjacent chapters"
        className="mx-5 flex justify-between gap-6 border-t border-asoebi-purple-200 py-8 lg:mx-10"
      >
        {previous && (
          <Link
            href={sectionHref(previous.slug)}
            className="min-h-11 py-2 text-sm hover:text-brand"
          >
            <span className="mb-2 block text-xs text-asoebi-graphite">
              Previous
            </span>
            ← {previous.label}
          </Link>
        )}
        {next && (
          <Link
            href={sectionHref(next.slug)}
            className="ml-auto min-h-11 py-2 text-right text-sm hover:text-brand"
          >
            <span className="mb-2 block text-xs text-asoebi-graphite">
              Next
            </span>
            {next.label} →
          </Link>
        )}
      </nav>
    </>
  );
}

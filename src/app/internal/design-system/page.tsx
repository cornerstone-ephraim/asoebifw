import type { Metadata } from "next";
import { DesignSystemShell } from "@/features/design-system/design-system-shell";
import { DesignSystemNav } from "@/features/design-system/design-system-nav";
import { DesignSystemHero } from "@/features/design-system/design-system-hero";
import {
  FoundationsReference,
  LayoutReference,
  GuidanceReference,
} from "@/features/design-system/foundations-reference";
import { TypographyReference } from "@/features/design-system/typography-reference";
import { ColourReference } from "@/features/design-system/colour-reference";
import { CardsReference } from "@/features/design-system/cards-reference";
import { ActionsReference } from "@/features/design-system/actions-reference";
import { InputsReference } from "@/features/design-system/inputs-reference";
import { MotionExamples } from "@/features/design-system/motion-examples";
import { ResponsiveReference } from "@/features/design-system/responsive-reference";
import { ImageryReference } from "@/features/design-system/imagery-reference";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "A practical reference for Asoebi Fashion Week typography, colour, components, motion and responsive design.",
  robots: { index: false, follow: false, nocache: true },
};
export default function DesignSystemPage() {
  return (
    <DesignSystemShell>
      <DesignSystemHero />
      <DesignSystemNav />
      <FoundationsReference />
      <TypographyReference />
      <ColourReference />
      <LayoutReference />
      <CardsReference />
      <ActionsReference />
      <InputsReference />
      <MotionExamples />
      <ResponsiveReference />
      <ImageryReference />
      <GuidanceReference />
    </DesignSystemShell>
  );
}

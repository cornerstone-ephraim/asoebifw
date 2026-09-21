import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DesignSystemShell } from "@/features/design-system/design-system-shell";

export const metadata: Metadata = {
  title: "Design System",
  description:
    "A practical reference for Asoebi Fashion Week typography, colour, components, motion and responsive design.",
  robots: { index: false, follow: false, nocache: true },
};

export default function DesignSystemLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DesignSystemShell>{children}</DesignSystemShell>;
}

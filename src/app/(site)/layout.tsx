import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { BrandSplash } from "@/components/motion/brand-splash";
import { SiteHeader } from "@/components/navigation/site-header";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BrandSplash />
      <SiteHeader />
      {children}
      <SiteFooter />
      <ScrollToTop />
    </>
  );
}

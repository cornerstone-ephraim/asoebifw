import type { Metadata } from "next";

const siteName = "Asoebi Fashion Week";
const socialImage = "/images/asoebi-hero-campaign.png";

export function createMetadata({ title, description, path, keywords = [] }: { title: string; description: string; path: string; keywords?: string[] }): Metadata {
  const socialTitle = title === siteName ? title : `${title} | ${siteName}`;
  return {
    title,
    description,
    keywords: ["Asoebi Fashion Week", "African fashion", "Nigerian fashion", "African textiles", "Lagos fashion", ...keywords],
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "en_NG", url: path, siteName, title: socialTitle, description, images: [{ url: socialImage, width: 1536, height: 1024, alt: "Asoebi Fashion Week campaign" }] },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [socialImage] },
  };
}

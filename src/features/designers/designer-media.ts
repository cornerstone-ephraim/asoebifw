export const designerMedia = {
  "amara-okoye": {
    src: "/images/amara-okoye.png",
    portraitPosition: "object-center",
    heroPosition: "object-[center_32%]",
  },
  "tomi-adebayo": {
    src: "/images/asoebi-hero-campaign.png",
    portraitPosition: "object-[48%_center]",
    heroPosition: "object-[48%_38%]",
  },
  "nia-mensah": {
    src: "/images/asoebi-hero-campaign.png",
    portraitPosition: "object-[83%_center]",
    heroPosition: "object-[82%_34%]",
  },
} as const;

export function getDesignerMedia(slug: string) {
  return designerMedia[slug as keyof typeof designerMedia] ?? designerMedia["amara-okoye"];
}

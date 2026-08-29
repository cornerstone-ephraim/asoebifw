export const accreditationCards = {
  partner: {
    label: "Partner",
    line: "Build the stage with us",
    accent: "#3b1977",
    background: "#fff0bd",
    ink: "#2a1157",
    mark: "✦",
    illustration: "/images/waitlist/partner-card-illustration.webp",
  },
  designer: {
    label: "Designer",
    line: "Show the world your point of view",
    accent: "#fbcd4f",
    background: "#2a1157",
    ink: "#ffffff",
    mark: "✺",
    illustration: "/images/waitlist/designer-card-illustration.webp",
  },
  buyer: {
    label: "Buyer",
    line: "Discover what fashion wears next",
    accent: "#3b1977",
    background: "#ffd9d0",
    ink: "#2a1157",
    mark: "◒",
    illustration: "/images/waitlist/buyer-card-illustration.webp",
  },
  media: {
    label: "Media",
    line: "Tell the stories behind the cloth",
    accent: "#52239f",
    background: "#dcd0ff",
    ink: "#2a1157",
    mark: "◎",
    illustration: "/images/waitlist/media-card-illustration.webp",
  },
  vendor: {
    label: "Vendor",
    line: "Meet the people looking for your craft",
    accent: "#3b1977",
    background: "#f6b928",
    ink: "#2a1157",
    mark: "◇",
    illustration: "/images/waitlist/vendor-card-illustration.webp",
  },
  other: {
    label: "Community",
    line: "There is a place for your perspective",
    accent: "#ef735d",
    background: "#fffaf1",
    ink: "#2a1157",
    mark: "+",
    illustration: "/images/waitlist/other-card-illustration.webp",
  },
} as const;

export type AccreditationRole = keyof typeof accreditationCards;

export const accreditationRoleNames = Object.keys(
  accreditationCards,
) as AccreditationRole[];

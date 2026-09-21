export const designSystemGroups = [
  {
    title: "Getting started",
    sections: [
      { slug: "", label: "Overview" },
      { slug: "principles", label: "Principles" },
    ],
  },
  {
    title: "Foundations",
    sections: [
      { slug: "typography", label: "Typography" },
      { slug: "colour", label: "Colour" },
      { slug: "composition", label: "Layout & spacing" },
      { slug: "imagery", label: "Imagery" },
    ],
  },
  {
    title: "Components",
    sections: [
      { slug: "cards", label: "Cards" },
      { slug: "buttons", label: "Buttons" },
      { slug: "links", label: "Links" },
      { slug: "inputs", label: "Inputs" },
    ],
  },
  {
    title: "Behaviour & guidance",
    sections: [
      { slug: "motion", label: "Motion" },
      { slug: "responsive", label: "Responsive design" },
      { slug: "guidance", label: "Accessibility & guidance" },
    ],
  },
] as const;

export const designSystemSections = designSystemGroups.flatMap((group) => [
  ...group.sections,
]);
export function sectionHref(slug: string) {
  return `/internal/design-system${slug ? `/${slug}` : ""}`;
}

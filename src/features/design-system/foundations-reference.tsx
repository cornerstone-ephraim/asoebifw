import { ReferenceSection } from "./reference-section";

export function FoundationsReference() {
  return (
    <ReferenceSection
      id="principles"
      title="Expression, with a clear structure."
      intro="The website frames African fashion through scale, colour and craft. These principles explain when to use the patterns in this guide, rather than making every section look the same."
      tone="ivory"
    >
      <div className="grid gap-7 md:grid-cols-3">
        {[
          [
            "Give the story room",
            "One dominant headline introduces each chapter. Short support copy and an explicit next step let expressive typography do its job.",
          ],
          [
            "Keep culture specific",
            "Use real textile references, credible clothing and activities that belong to the page. Avoid generic luxury props or invented cultural symbolism.",
          ],
          [
            "Make participation straightforward",
            "Forms, navigation and admin views favour legibility, predictable controls and clear feedback. Expressiveness should never obscure the task.",
          ],
        ].map(([title, copy]) => (
          <article
            key={title}
            className="border-t border-asoebi-purple-300 pt-5"
          >
            <h3 className="font-display text-3xl tracking-tight">{title}</h3>
            <p className="mt-4 leading-7 text-asoebi-graphite">{copy}</p>
          </article>
        ))}
      </div>
    </ReferenceSection>
  );
}
export function LayoutReference() {
  return (
    <ReferenceSection
      id="composition"
      title="Space gives the system rhythm."
      intro="Use a bounded canvas, purposeful columns and a consistent spacing rhythm. Asymmetry creates emphasis while the semantic reading order remains intact."
      tone="ivory"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-asoebi-purple-950 p-7 text-white">
          <h3 className="font-display text-3xl">From detail to chapter</h3>
          <div className="mt-8 space-y-5">
            {[
              ["8px", "gap-2", "Icon and label"],
              ["16px", "gap-4 / p-4", "Compact grouped detail"],
              ["24px", "gap-6 / p-6", "Panel padding"],
              ["40px", "gap-10 / px-10", "Desktop gutters"],
              ["64px", "gap-16 / py-16", "Section breathing room"],
            ].map(([size, token, use]) => (
              <div
                key={size}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-3 text-sm"
              >
                <span className="font-bold text-asoebi-gold-300">{size}</span>
                <span>{token}</span>
                <span className="text-white/80">{use}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-3xl">Layout rules in practice</h3>
          <ul className="mt-5 list-disc space-y-4 pl-5 leading-7">
            <li>
              Public page gutters typically use 20px on mobile and 40px from lg.
            </li>
            <li>
              The site commonly caps content at 1600px; this reference uses
              1500px.
            </li>
            <li>
              Keep reading copy around max-w-lg or max-w-xl, rather than
              stretching across the canvas.
            </li>
            <li>
              Pair columns only when both can hold their content comfortably.
              Preserve DOM reading order as the layout changes.
            </li>
            <li>
              Use thin rules for editorial separation. Add a surface only when
              the content needs to read as a distinct group.
            </li>
          </ul>
        </div>
      </div>
    </ReferenceSection>
  );
}
export function GuidanceReference() {
  return (
    <ReferenceSection
      id="guidance"
      title="The details that hold it together."
      intro="Use this page as a working reference. The shared component and its production consumer remain the source of truth when behaviour changes."
    >
      <div className="grid gap-7 md:grid-cols-3">
        {[
          [
            "Feedback and content",
            "Name the action: Send enquiry, Apply for the Prize, Join waitlist. Loading, empty, error and success are distinct states. Keep entered values when an action fails and explain the next step.",
          ],
          [
            "Keyboard and touch",
            "Every control needs a visible focus state and an accessible name. Keep hidden menus out of the tab order. Do not use colour, sound or hover as the sole signal of meaning.",
          ],
          [
            "Respect preferences",
            "Reduced motion removes unnecessary travel while retaining information. Interface sounds are supporting feedback, never required to understand whether a form succeeded.",
          ],
        ].map(([title, copy]) => (
          <article
            key={title}
            className="border-t border-asoebi-purple-200 pt-5"
          >
            <h3 className="font-display text-2xl">{title}</h3>
            <p className="mt-4 text-sm leading-6">{copy}</p>
          </article>
        ))}
      </div>
      <div className="mt-10 rounded-3xl bg-asoebi-mist p-6 sm:p-8">
        <h3 className="font-display text-2xl">Where these decisions live</h3>
        <dl className="mt-5 grid gap-5 text-sm md:grid-cols-2">
          {[
            ["Colour, fonts, easing and shadows", "src/app/globals.css"],
            ["Font files and loading", "src/app/layout.tsx"],
            ["Checkbox, select, OTP and ArrowLink", "src/components/ui/"],
            [
              "Hero layout and image delivery",
              "src/components/layout/editorial-page.tsx",
            ],
            [
              "Scroll entrance behaviour",
              "src/components/motion/editorial-reveal.tsx",
            ],
            ["This reference and its demos", "src/features/design-system/"],
          ].map(([label, path]) => (
            <div key={path}>
              <dt className="font-bold">{label}</dt>
              <dd className="mt-2 break-all text-asoebi-graphite">{path}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm leading-6">
          Use Tailwind v4 utilities and existing theme tokens. The cards and
          button treatments shown here document patterns; there is no universal
          shared Card or Button export in the current site. Reuse the existing
          owners before adding a new variant.
        </p>
      </div>
    </ReferenceSection>
  );
}

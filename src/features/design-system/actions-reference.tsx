"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ReferenceSection, Specimen, demoButton } from "./reference-section";

export function ActionsReference() {
  const [message, setMessage] = useState(
    "Try a button. These examples do not submit or send anything.",
  );
  const [pressed, setPressed] = useState(false);
  return (
    <>
      <ReferenceSection
        id="buttons"
        title="Actions with a clear priority."
        intro="Pill shapes are the site’s invitation language. Filled buttons carry priority, outlined buttons offer an alternative, and circular controls handle compact utilities. A button changes state; an anchor changes location."
        tone="ivory"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Specimen
            title="Primary · dark fill"
            detail="Use for the main form action on a light canvas, such as sending a sponsorship enquiry. Keep the label specific."
          >
            <button
              type="button"
              className={demoButton}
              onClick={() =>
                setMessage(
                  "Primary action selected. Demo only; no enquiry was sent.",
                )
              }
            >
              Send enquiry
            </button>
          </Specimen>
          <Specimen
            title="Priority · gold fill"
            detail="Use for high-visibility invitations on purple or dark surroundings. Gold signals emphasis, not a successful submission."
          >
            <div className="rounded-2xl bg-asoebi-purple-950 p-5">
              <button
                type="button"
                className="min-h-13 rounded-full bg-asoebi-gold-300 px-6 py-3 text-sm font-bold text-asoebi-purple-950 transition-colors hover:bg-asoebi-gold-200"
                onClick={() => setMessage("Gold action selected. Demo only.")}
              >
                Join waitlist
              </button>
            </div>
          </Specimen>
          <Specimen
            title="Secondary · outline"
            detail="Use for a supporting action, like returning to a previous step. A border keeps it available without competing with the primary action."
          >
            <button
              type="button"
              className="min-h-12 rounded-full border border-asoebi-purple-300 px-6 py-3 text-sm font-bold transition-colors hover:bg-asoebi-mist"
              onClick={() =>
                setMessage("Secondary action selected. Demo only.")
              }
            >
              Go back
            </button>
          </Specimen>
          <Specimen
            title="Icon · circular"
            detail="Use for menu, close and scroll controls. A visible icon needs an accessible name. Provide enough space for touch and keyboard focus."
          >
            <button
              type="button"
              aria-label="Toggle demo menu"
              aria-pressed={pressed}
              onClick={() => {
                setPressed(!pressed);
                setMessage(
                  pressed ? "Demo menu closed." : "Demo menu selected.",
                );
              }}
              className="grid size-12 place-items-center rounded-full bg-asoebi-mist text-2xl transition-colors hover:bg-asoebi-purple-200"
            >
              {pressed ? "×" : "+"}
            </button>
          </Specimen>
        </div>
        <p
          role="status"
          className="mt-6 min-h-12 rounded-2xl bg-asoebi-mist p-4 text-sm"
        >
          {message}
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Specimen
            title="Pending and unavailable"
            detail="Use a changing label plus disabled state during submission. Prevent duplicates; preserve the user’s input if the request fails. A disabled button cannot be focused or activated."
          >
            <div className="flex flex-wrap gap-4">
              <button disabled aria-busy="true" className={demoButton}>
                Sending enquiry…
              </button>
              <button disabled className={demoButton}>
                Unavailable
              </button>
            </div>
          </Specimen>
          <Specimen
            title="Hover, focus and press"
            detail="Hover changes colour; keyboard focus keeps a visible outline. The global press state moves controls down by 1px. Do not make hover the only way to discover essential information."
          >
            <button
              className={demoButton}
              onClick={() => setMessage("Focus and press example activated.")}
            >
              Tab to this button
            </button>
            <p className="mt-4 text-sm">
              Typical minimum height: 48–52px. Standard forms use rounded-full;
              OTP cells use rounded-xl, then rounded-2xl from sm, for individual
              digits.
            </p>
          </Specimen>
        </div>
      </ReferenceSection>
      <ReferenceSection
        id="links"
        title="A destination, not a guess."
        intro="Link styling signals how strongly to invite someone onward. Underlined text belongs in reading; the shared ArrowLink gives editorial navigation more presence; pill-shaped links can be prominent calls to action."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Specimen
            title="Inline link"
            detail="Use inside sentences and explanatory copy. The underline makes the destination discoverable without relying only on colour."
          >
            <p className="leading-7">
              Read the{" "}
              <Link
                href="/prize"
                className="text-brand underline underline-offset-4 hover:text-brand-deep"
              >
                Asoebi Prize brief
              </Link>{" "}
              before applying.
            </p>
          </Specimen>
          <Specimen
            title="Editorial ArrowLink"
            detail="Use after a short story or section introduction. A thin rule and moving arrow invite exploration. This specimen uses the production component."
          >
            <ArrowLink href="/sponsorship">Explore sponsorship</ArrowLink>
            <p className="mt-5 text-sm">
              44px minimum height · 12px label · ↗ shifts 4px right and 2px up
              on hover/focus.
            </p>
          </Specimen>
          <Specimen
            title="CTA link"
            detail="Use a pill for a high-priority destination. It remains an anchor, so browser open-in-new-tab and copy-link behaviour still work."
          >
            <Link href="/prize#apply" className={demoButton}>
              Apply for the Prize <span aria-hidden="true">↗</span>
            </Link>
          </Specimen>
        </div>
        <div className="mt-6 rounded-3xl bg-asoebi-purple-950 p-7 text-white">
          <h3 className="font-display text-2xl">Inverse treatment</h3>
          <p className="mt-3 mb-5 max-w-2xl text-sm leading-6 text-white/80">
            On dark photography or purple sections, inherit light text and use a
            softer border. ArrowLink opens HTTP(S) destinations in a new tab;
            internal routes and anchors stay in this tab. The arrow itself does
            not distinguish external links, so make that clear in the label when
            needed.
          </p>
          <ArrowLink href="#imagery" inverse>
            See image guidance
          </ArrowLink>
        </div>
      </ReferenceSection>
    </>
  );
}

"use client";

import { useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { CustomCheckbox } from "@/components/ui/custom-checkbox";
import { OtpInput } from "@/components/ui/otp-input";
import {
  ReferenceSection,
  Specimen,
  demoInput,
  demoButton,
} from "./reference-section";

export function InputsReference() {
  const [state, setState] = useState("default");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [role, setRole] = useState("");
  const [code, setCode] = useState("");
  const [checked, setChecked] = useState(false);
  const invalid = state === "error";
  return (
    <ReferenceSection
      id="inputs"
      title="Make the next step easy."
      intro="Every field has a visible label, a purpose and room for feedback. These controls are isolated demos: nothing is submitted, uploaded, emailed or saved."
      tone="mist"
    >
      <fieldset className="mb-8">
        <legend className="mb-3 text-sm font-bold">
          Preview text and email field states
        </legend>
        <div className="flex flex-wrap gap-3">
          {["default", "error", "success", "disabled"].map((value) => (
            <label
              key={value}
              className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-asoebi-purple-300 bg-white px-4 text-sm capitalize"
            >
              <input
                type="radio"
                name="field-state"
                value={value}
                checked={state === value}
                onChange={() => {
                  setState(value);
                  setFeedback("");
                }}
                className="accent-brand"
              />
              {value}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-6 lg:grid-cols-2">
        <Specimen
          title="Text · a short answer"
          detail="Use for names, organisations and concise free-form details. Sponsorship fields use a 16px font and rounded-2xl; waitlist fields use rounded-full. Labels stay visible after typing."
        >
          <label htmlFor="ds-name" className="mb-2 block text-sm font-bold">
            Full name *
          </label>
          <input
            id="ds-name"
            autoComplete="name"
            placeholder="e.g. Amara Okafor"
            required
            disabled={state === "disabled"}
            aria-invalid={invalid}
            aria-describedby="ds-name-help"
            className={demoInput}
          />
          <p
            id="ds-name-help"
            className={`mt-2 text-sm ${invalid ? "text-red-800" : "text-asoebi-graphite"}`}
          >
            {invalid
              ? "Enter your full name. Error text explains how to recover."
              : state === "success"
                ? "✓ Name accepted. Success is also expressed in words."
                : "Use a name the team can address you by."}
          </p>
        </Specimen>
        <Specimen
          title="Email · a contact address"
          detail="type=email and autocomplete=email assist entry. Validate on the server as well as in the browser; do not use a successful-looking border as proof that an inbox exists."
        >
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              setFeedback(
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                  ? "Email format looks valid. Demo only; no email was sent."
                  : "Enter an email such as name@example.com.",
              );
            }}
          >
            <label htmlFor="ds-email" className="mb-2 block text-sm font-bold">
              Email address *
            </label>
            <input
              id="ds-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setFeedback("");
              }}
              disabled={state === "disabled"}
              aria-invalid={invalid || feedback.startsWith("Enter")}
              aria-describedby="ds-email-help"
              className={demoInput}
            />
            <p id="ds-email-help" role="status" className="mt-2 text-sm">
              {feedback ||
                (invalid
                  ? "Enter a valid email address."
                  : state === "success"
                    ? "✓ Accepted. You can still edit this value."
                    : "Try an invalid value, then check the format.")}
            </p>
            <button
              disabled={state === "disabled"}
              className={`${demoButton} mt-4`}
            >
              Check format
            </button>
          </form>
        </Specimen>
        <Specimen
          title="Select / dropdown · one choice"
          detail="The shared CustomSelect is used for roles, submission modes and statuses. Use it when the list is bounded. Arrow keys move, Enter selects, Escape closes and Tab continues through the form."
        >
          <label htmlFor="ds-role" className="mb-2 block text-sm font-bold">
            Area of interest
          </label>
          <CustomSelect
            id="ds-role"
            label="Demo area of interest"
            value={role}
            changeAction={setRole}
            options={[
              { label: "Fashion Week", value: "fashion" },
              { label: "Asoebi Prize", value: "prize" },
              { label: "Not sure yet", value: "unsure" },
            ]}
          />
          <p role="status" className="mt-3 text-sm">
            {role
              ? "A choice is selected. Open again to change it."
              : "The placeholder is a prompt, not a preselected answer."}
          </p>
        </Specimen>
        <Specimen
          title="Checkbox · explicit consent"
          detail="The shared CustomCheckbox preserves a native checkbox underneath. Use for independent yes/no choices, such as waitlist consent. Do not preselect consent or use checkboxes for mutually exclusive options."
        >
          <CustomCheckbox
            name="ds-consent"
            checked={checked}
            changeAction={setChecked}
          >
            I’d like to receive AEFW updates. (Demo)
          </CustomCheckbox>
          <p className="mt-4 text-sm">
            Space toggles the control. The visible label is part of the target;
            focus outlines the square.
          </p>
        </Specimen>
        <Specimen
          title="OTP cell · one digit"
          detail="One cell communicates one place in a verification code. It is text with a numeric input mode, so leading zeros are retained. A cell is part of the OTP group, not a separate verification step."
        >
          <div
            aria-hidden="true"
            className="grid size-14 place-items-center rounded-xl border border-asoebi-purple-300 bg-white text-xl font-black"
          >
            0
          </div>
          <p className="mt-4 text-sm leading-6">
            Anatomy: digit → border → focus state. rounded-xl at small widths,
            rounded-2xl from sm. Empty, filled, invalid and disabled states
            belong to the same group.
          </p>
        </Specimen>
        <Specimen
          title="OTP group · a complete code"
          detail="This is the production OtpInput used at admin sign-in. A fieldset and legend name the six-digit group; each cell has a distinct accessible name. Paste fills the group, typing advances, Backspace edits and arrow keys move focus."
        >
          <OtpInput
            id="ds-otp"
            label="Demo six-digit code"
            value={code}
            changeAction={setCode}
            describedBy="ds-otp-help"
          />
          <p id="ds-otp-help" role="status" className="mt-3 text-sm">
            {code.length === 6
              ? "Six digits entered. This demo does not verify a real code."
              : "Try pasting 012345 into the first cell."}
          </p>
          <button
            type="button"
            onClick={() => setCode("")}
            className="mt-3 min-h-11 text-sm font-bold text-brand underline underline-offset-4"
          >
            Clear demo code
          </button>
        </Specimen>
        <Specimen
          title="Textarea · a longer answer"
          detail="Use for sponsorship ideas and other narrative responses. Keep line height comfortable, allow vertical resizing and state the length limit next to the field."
        >
          <label htmlFor="ds-message" className="mb-2 block text-sm font-bold">
            Your sponsorship idea
          </label>
          <textarea
            id="ds-message"
            rows={4}
            maxLength={5000}
            aria-describedby="ds-message-help"
            className={`${demoInput} resize-y`}
          />
          <p id="ds-message-help" className="mt-2 text-sm">
            Sponsorship messages accept 20–5,000 characters.
          </p>
        </Specimen>
        <Specimen
          title="Phone and URL · typed data"
          detail="Use tel for phone entry, never number: country prefixes and leading zeros matter. Prize applications pair phone entry with a searchable country selector. Use url for portfolio links and explain which link formats are accepted."
        >
          <label htmlFor="ds-phone" className="mb-2 block text-sm font-bold">
            Phone number
          </label>
          <input
            id="ds-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+234…"
            className={demoInput}
          />
          <label htmlFor="ds-url" className="mt-4 mb-2 block text-sm font-bold">
            Portfolio URL
          </label>
          <input
            id="ds-url"
            type="url"
            placeholder="https://…"
            className={demoInput}
          />
        </Specimen>
        <Specimen
          title="File · a local attachment"
          detail="The Prize identity field accepts PDF, JPEG, PNG or WebP up to 8 MB. Explain accepted formats before selection, validate size and type, and show a recoverable error. This example never uploads a file."
        >
          <label htmlFor="ds-file" className="mb-2 block text-sm font-bold">
            Example attachment
          </label>
          <input
            id="ds-file"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            aria-describedby="ds-file-help"
            className="block w-full min-w-0 rounded-2xl border border-asoebi-purple-300 p-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-asoebi-mist file:px-4 file:py-2 file:font-bold"
          />
          <p id="ds-file-help" className="mt-3 text-sm">
            Demo only. Use a non-sensitive sample file.
          </p>
        </Specimen>
        <Specimen
          title="Radio group · choose one"
          detail="Use visible radio choices when a small set is easier to compare without opening a dropdown. The admin account chooser uses this pattern. Group related options with a legend."
        >
          <fieldset>
            <legend className="mb-3 text-sm font-bold">
              Demo contact preference
            </legend>
            <div className="grid gap-2">
              {["Email", "Phone"].map((value) => (
                <label
                  key={value}
                  className="flex min-h-12 items-center gap-3 rounded-2xl border border-asoebi-purple-200 px-4"
                >
                  <input
                    type="radio"
                    name="ds-contact"
                    value={value}
                    className="accent-brand"
                  />
                  {value}
                </label>
              ))}
            </div>
          </fieldset>
        </Specimen>
      </div>
      <p className="mt-7 max-w-4xl leading-7">
        Required fields need an explicit marker and programmatic required state.
        Errors sit beside the field and connect through aria-describedby.
        Submission feedback gets a status or alert region; successful forms move
        focus to their confirmation. Never make a colour change the only
        feedback.
      </p>
    </ReferenceSection>
  );
}

"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import type { ActionResult } from "@/lib/action-result";
import { submitSponsorship } from "./action";
import { interests, supportTypes } from "./schema";

const fields = [
  {
    name: "name",
    label: "Full name",
    required: true,
    autoComplete: "name",
    max: 120,
  },
  {
    name: "organisation",
    label: "Organisation",
    required: true,
    autoComplete: "organization",
    max: 160,
  },
  {
    name: "email",
    label: "Work email",
    required: true,
    autoComplete: "email",
    type: "email",
    max: 254,
  },
  {
    name: "phone",
    label: "Phone (optional)",
    autoComplete: "tel",
    type: "tel",
    max: 40,
  },
  {
    name: "budget",
    label: "Indicative budget (optional)",
    placeholder: "Include the currency, e.g. NGN",
    max: 120,
  },
] as const;
const fieldClass =
  "min-h-13 w-full rounded-2xl border border-asoebi-purple-300 bg-white px-5 py-3 text-base text-asoebi-purple-950 outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand aria-invalid:border-red-700";

export function SponsorshipForm() {
  const [result, setResult] = useState<ActionResult>({ status: "idle" });
  const [pending, startTransition] = useTransition();
  const [interest, setInterest] = useState("");
  const [supportType, setSupportType] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (result.status !== "idle") resultRef.current?.focus();
  }, [result]);
  const errors = result.status === "error" ? result.fieldErrors : undefined;
  const error = (name: string) => errors?.[name]?.[0];
  const errorText = (name: string) =>
    error(name) && (
      <p id={`sponsor-${name}-error`} className="mt-2 text-sm text-red-800">
        {error(name)}
      </p>
    );

  if (result.status === "success" || result.status === "info")
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="rounded-3xl bg-asoebi-mist p-8 outline-brand"
      >
        <h3 className="font-display text-4xl tracking-tight">
          {result.status === "success"
            ? "Let’s start a conversation."
            : "Your enquiry is with us."}
        </h3>
        <p className="mt-5 leading-7">{result.message}</p>
      </div>
    );
  return (
    <form
      noValidate
      aria-busy={pending}
      onSubmit={(event) => {
        event.preventDefault();
        const input = Object.fromEntries(new FormData(event.currentTarget));
        startTransition(async () => {
          try {
            setResult(
              await submitSponsorship({ ...input, interest, supportType }),
            );
          } catch {
            setResult({
              status: "error",
              message:
                "We couldn’t confirm your submission. Please try again. Your details are still in the form.",
            });
          }
        });
      }}
      className="grid gap-6 sm:grid-cols-2"
    >
      <p className="text-sm text-asoebi-graphite sm:col-span-2">
        Fields marked * are required.
      </p>
      {result.status === "error" && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="rounded-2xl bg-red-50 p-4 text-red-900 outline-brand sm:col-span-2"
        >
          {result.message}
        </div>
      )}
      {fields.map((field) => (
        <div
          key={field.name}
          className={field.name === "budget" ? "sm:col-span-2" : ""}
        >
          <label
            htmlFor={`sponsor-${field.name}`}
            className="mb-2 block text-sm font-bold"
          >
            {field.label}
            {"required" in field && " *"}
          </label>
          <input
            id={`sponsor-${field.name}`}
            name={field.name}
            type={"type" in field ? field.type : "text"}
            autoComplete={
              "autoComplete" in field ? field.autoComplete : undefined
            }
            placeholder={"placeholder" in field ? field.placeholder : undefined}
            required={"required" in field}
            maxLength={field.max}
            disabled={pending}
            aria-invalid={Boolean(error(field.name))}
            aria-describedby={
              error(field.name) ? `sponsor-${field.name}-error` : undefined
            }
            className={fieldClass}
          />
          {errorText(field.name)}
        </div>
      ))}
      {(
        [
          {
            name: "interest",
            label: "What would you like to sponsor?",
            options: interests,
            value: interest,
            set: setInterest,
          },
          {
            name: "supportType",
            label: "How would you like to support us?",
            options: supportTypes,
            value: supportType,
            set: setSupportType,
          },
        ] as const
      ).map((field) => (
        <div key={field.name}>
          <label
            htmlFor={`sponsor-${field.name}`}
            className="mb-2 block text-sm font-bold"
          >
            {field.label} *
          </label>
          <CustomSelect
            id={`sponsor-${field.name}`}
            label={`${field.label} (required)`}
            options={field.options.map((value) => ({ value, label: value }))}
            value={field.value}
            changeAction={field.set}
            disabled={pending}
            invalid={Boolean(error(field.name))}
            describedBy={
              error(field.name) ? `sponsor-${field.name}-error` : undefined
            }
          />
          {errorText(field.name)}
        </div>
      ))}
      <div className="sm:col-span-2">
        <label
          htmlFor="sponsor-message"
          className="mb-2 block text-sm font-bold"
        >
          Tell us about your sponsorship idea *
        </label>
        <textarea
          id="sponsor-message"
          name="message"
          required
          minLength={20}
          maxLength={5000}
          rows={6}
          disabled={pending}
          aria-invalid={Boolean(error("message"))}
          aria-describedby={
            error("message") ? "sponsor-message-error" : undefined
          }
          className={fieldClass}
        />
        {errorText("message")}
      </div>
      <div hidden aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="text-sm leading-6 text-asoebi-graphite sm:col-span-2">
        We’ll use these details to respond to your enquiry. Submitting this form
        does not confirm a sponsorship or subscribe you to marketing emails.
      </p>
      <button
        disabled={pending}
        type="submit"
        className="min-h-13 rounded-full bg-asoebi-purple-950 px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand disabled:opacity-60 sm:col-span-2"
      >
        {pending ? "Sending enquiry…" : "Send sponsorship enquiry"}
      </button>
    </form>
  );
}

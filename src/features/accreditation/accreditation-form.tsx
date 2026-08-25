"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useState } from "react";

import { AccreditationCardStack } from "@/features/accreditation/accreditation-card-stack";
import { submitAccreditation } from "@/features/accreditation/action";
import {
  accreditationCards,
  accreditationRoleNames,
  type AccreditationRole,
} from "@/features/accreditation/card-config";
import {
  accreditationSchema,
  type AccreditationInput as Values,
} from "@/features/accreditation/schema";
import { idleActionResult } from "@/lib/action-result";

const fieldClass =
  "min-h-13 w-full rounded-full border border-asoebi-purple-200 bg-white px-5 text-sm outline-hidden transition-colors transition-linear focus:border-brand";

function loadIllustration(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = document.createElement("img");
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

async function downloadAccreditationCard(
  name: string,
  role: AccreditationRole,
) {
  const card = accreditationCards[role];
  const canvas = document.createElement("canvas");
  canvas.width = 1400;
  canvas.height = 900;
  const context = canvas.getContext("2d");
  if (!context) return;

  context.fillStyle = card.background;
  context.fillRect(0, 0, canvas.width, canvas.height);
  try {
    const illustration = await loadIllustration(card.illustration);
    context.globalAlpha = 0.2;
    context.drawImage(illustration, 0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
  } catch {
    context.globalAlpha = 1;
  }

  context.fillStyle = card.accent;
  context.beginPath();
  context.arc(1220, 150, 74, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = card.ink;
  context.font = "800 24px Arial";
  context.letterSpacing = "5px";
  context.fillText("ASOEBI FASHION WEEK", 90, 110);
  context.globalAlpha = 0.65;
  context.font = "700 22px Arial";
  context.fillText(`${card.label.toUpperCase()} ACCREDITATION`, 90, 430);
  context.globalAlpha = 1;
  context.font = "700 72px Arial";

  const words = `${name.trim()}, your application is in review.`.split(" ");
  let line = "";
  let y = 520;
  words.forEach((word) => {
    const test = `${line}${word} `;
    if (context.measureText(test).width > 1050 && line) {
      context.fillText(line, 90, y);
      line = `${word} `;
      y += 88;
    } else {
      line = test;
    }
  });
  context.fillText(line, 90, y);
  context.globalAlpha = 0.35;
  context.fillRect(90, 780, 1220, 2);
  context.globalAlpha = 1;
  context.font = "700 18px Arial";
  context.fillText("PENDING REVIEW", 90, 835);
  context.fillText("AEFW · 2027", 1160, 835);
  context.font = "700 54px Arial";
  context.fillText(card.mark, 1202, 168);

  const link = document.createElement("a");
  link.download = `aefw-accreditation-${role}-${name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export function AccreditationForm() {
  const [result, setResult] = useState(idleActionResult);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(accreditationSchema),
    defaultValues: { role: "designer", website: "" },
  });
  const role = useWatch({ control, name: "role" }) as AccreditationRole;
  const name = useWatch({ control, name: "name" }) ?? "";

  const selectRole = (nextRole: AccreditationRole) => {
    setValue("role", nextRole, { shouldDirty: true, shouldValidate: true });
    setResult(idleActionResult);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
      <form
        onSubmit={handleSubmit(async (values) => {
          setResult(await submitAccreditation(values));
        })}
        className="rounded-4xl bg-white p-6 shadow-asoebi-warm-soft sm:p-9"
        noValidate
      >
        <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
          Tell us about you
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="accreditation-name" className="sr-only">
              Name
            </label>
            <input
              id="accreditation-name"
              autoComplete="name"
              placeholder="Your name"
              {...register("name")}
              className={fieldClass}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={
                errors.name ? "accreditation-name-error" : undefined
              }
            />
            {errors.name && (
              <p
                id="accreditation-name-error"
                role="alert"
                className="mt-2 px-4 text-xs text-brand"
              >
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="accreditation-email" className="sr-only">
              Email
            </label>
            <input
              id="accreditation-email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              {...register("email")}
              className={fieldClass}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "accreditation-email-error" : undefined
              }
            />
            {errors.email && (
              <p
                id="accreditation-email-error"
                role="alert"
                className="mt-2 px-4 text-xs text-brand"
              >
                {errors.email.message}
              </p>
            )}
          </div>
          <fieldset
            className="sm:col-span-2"
            aria-invalid={Boolean(errors.role)}
            aria-describedby={
              errors.role ? "accreditation-role-error" : undefined
            }
          >
            <legend className="mb-3 px-1 text-[10px] font-bold tracking-[.16em] text-asoebi-muted uppercase">
              Accreditation type
            </legend>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {accreditationRoleNames.map((value) => {
                    const active = field.value === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        aria-pressed={active}
                        onClick={() => selectRole(value)}
                        className={`transition-linear min-h-11 rounded-full border px-4 py-2 text-xs font-bold transition-colors ${active ? "border-brand bg-brand text-white" : "border-asoebi-purple-200 bg-white text-asoebi-purple-950 hover:border-brand hover:text-brand"}`}
                      >
                        {accreditationCards[value].label}
                      </button>
                    );
                  })}
                </div>
              )}
            />
            {errors.role && (
              <p
                id="accreditation-role-error"
                role="alert"
                className="mt-2 px-4 text-xs text-brand"
              >
                Choose an accreditation type
              </p>
            )}
          </fieldset>
          <div className="sm:col-span-2">
            <label htmlFor="accreditation-message" className="sr-only">
              Note
            </label>
            <textarea
              id="accreditation-message"
              placeholder="Tell us briefly about your work or reason for applying (optional)"
              {...register("message")}
              rows={4}
              className="transition-linear w-full rounded-3xl border border-asoebi-purple-200 bg-white p-5 text-sm outline-hidden transition-colors focus:border-brand"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "accreditation-message-error" : undefined
              }
            />
            {errors.message && (
              <p
                id="accreditation-message-error"
                role="alert"
                className="mt-2 px-4 text-xs text-brand"
              >
                {errors.message.message}
              </p>
            )}
          </div>
        </div>
        <input
          {...register("website")}
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden="true"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="transition-linear mt-4 min-h-13 w-full rounded-full bg-brand px-6 text-xs font-black tracking-[.12em] text-white uppercase transition-colors hover:bg-asoebi-purple-700 disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? "Submitting…" : "Submit application"}
        </button>
        {result.status !== "idle" && (
          <p
            role={result.status === "error" ? "alert" : "status"}
            className="mt-4 rounded-2xl bg-asoebi-mist p-4 text-sm text-asoebi-graphite"
          >
            {result.message}
          </p>
        )}
        {result.status === "success" && (
          <button
            type="button"
            onClick={() => downloadAccreditationCard(name, role)}
            className="group transition-linear mt-3 min-h-13 w-full rounded-full bg-asoebi-gold-400 px-6 text-xs font-black tracking-[.12em] text-asoebi-purple-950 uppercase transition-colors hover:bg-asoebi-gold-300"
          >
            Download application card{" "}
            <span
              aria-hidden="true"
              className="transition-linear inline-block transition-transform group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5"
            >
              ↓
            </span>
          </button>
        )}
      </form>
      <AccreditationCardStack name={name} role={role} selectRole={selectRole} />
    </div>
  );
}

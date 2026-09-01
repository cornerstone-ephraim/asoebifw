"use client";

import { Controller } from "react-hook-form";

import { CustomCheckbox } from "@/components/ui/custom-checkbox";
import { useWaitlistForm } from "@/features/waitlist/hooks/use-waitlist-form";
import { playInterfaceSound } from "@/features/sound/interface-sound";

const fieldClass =
  "min-h-13 w-full rounded-full border border-asoebi-purple-300 bg-white px-5 text-sm outline-hidden transition-colors transition-linear placeholder:text-asoebi-muted focus:border-brand aria-invalid:border-red-700";

const labelClass = (invalid: boolean) =>
  `mb-2 block px-2 text-sm font-bold ${invalid ? "text-red-800" : "text-asoebi-purple-950"}`;

export function WaitlistForm() {
  const {
    clearResult,
    control,
    errors,
    handleFormSubmit,
    isSubmitting,
    register,
    result,
    resultRef,
  } = useWaitlistForm();

  if (result.status === "success" || result.status === "info") {
    return (
      <div
        ref={resultRef}
        role="status"
        tabIndex={-1}
        className={`mt-9 rounded-3xl p-7 outline-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:p-9 ${result.status === "info" ? "bg-asoebi-gold-100" : "bg-asoebi-mist"}`}
      >
        <span
          aria-hidden="true"
          className={`grid size-11 place-items-center rounded-full text-xl ${result.status === "info" ? "bg-asoebi-gold-400 text-asoebi-purple-950" : "bg-brand text-white"}`}
        >
          {result.status === "info" ? "i" : "✓"}
        </span>
        <h3 className="mt-6 font-display text-4xl leading-none tracking-[-.045em]">
          {result.status === "info"
            ? "You’re already in the circle."
            : "You’re on the list."}
        </h3>
        <p className="mt-4 max-w-md leading-7 text-asoebi-graphite">
          {result.message}
          {result.status === "success" && " Check your inbox for confirmation."}
        </p>
      </div>
    );
  }

  return (
    <form
      className="mt-9 grid gap-5 sm:grid-cols-2"
      onSubmit={handleFormSubmit}
      noValidate
      aria-busy={isSubmitting}
    >
      {result.status === "error" && (
        <div
          role="alert"
          className="rounded-2xl border border-red-700 bg-red-50 p-4 text-sm text-red-900 sm:col-span-2"
        >
          <p className="font-bold">We couldn’t join the waitlist.</p>
          <p className="mt-1">{result.message}</p>
        </div>
      )}

      <div>
        <label
          className={labelClass(Boolean(errors.firstName))}
          htmlFor="waitlist-first-name"
        >
          First name <span aria-hidden="true">*</span>
        </label>
        <input
          id="waitlist-first-name"
          autoComplete="given-name"
          placeholder="e.g. Amara"
          required
          {...register("firstName", { onChange: clearResult })}
          className={fieldClass}
          aria-invalid={Boolean(errors.firstName)}
          aria-describedby={
            errors.firstName ? "waitlist-first-name-error" : undefined
          }
        />
        {errors.firstName && (
          <p
            id="waitlist-first-name-error"
            role="alert"
            className="mt-2 px-2 text-xs font-semibold text-red-800"
          >
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <label
          className={labelClass(Boolean(errors.lastName))}
          htmlFor="waitlist-last-name"
        >
          Last name <span aria-hidden="true">*</span>
        </label>
        <input
          id="waitlist-last-name"
          autoComplete="family-name"
          placeholder="e.g. Okafor"
          required
          {...register("lastName", { onChange: clearResult })}
          className={fieldClass}
          aria-invalid={Boolean(errors.lastName)}
          aria-describedby={
            errors.lastName ? "waitlist-last-name-error" : undefined
          }
        />
        {errors.lastName && (
          <p
            id="waitlist-last-name-error"
            role="alert"
            className="mt-2 px-2 text-xs font-semibold text-red-800"
          >
            {errors.lastName.message}
          </p>
        )}
      </div>

      <div className="sm:col-span-2">
        <label
          className={labelClass(Boolean(errors.email))}
          htmlFor="waitlist-email"
        >
          Email address <span aria-hidden="true">*</span>
        </label>
        <input
          id="waitlist-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          {...register("email", { onChange: clearResult })}
          className={fieldClass}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "waitlist-email-error" : undefined}
        />
        {errors.email && (
          <p
            id="waitlist-email-error"
            role="alert"
            className="mt-2 px-2 text-xs font-semibold text-red-800"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="px-1 sm:col-span-2">
        <Controller
          name="consent"
          control={control}
          render={({ field }) => (
            <CustomCheckbox
              name={field.name}
              checked={field.value}
              changeAction={(checked) => {
                field.onChange(checked);
                clearResult();
              }}
              blurAction={field.onBlur}
              invalid={Boolean(errors.consent)}
              describedBy={
                errors.consent ? "waitlist-consent-error" : undefined
              }
            >
              I agree to receive Asoebi Fashion Week news and updates.{" "}
              <span aria-hidden="true">*</span>
            </CustomCheckbox>
          )}
        />
        {errors.consent && (
          <p
            id="waitlist-consent-error"
            role="alert"
            className="mt-2 pl-9 text-xs font-semibold text-red-800"
          >
            {errors.consent.message}
          </p>
        )}
      </div>

      <div aria-hidden="true" className="hidden">
        <input {...register("website")} tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        onClick={() => playInterfaceSound("press", 0.65)}
        className="transition-linear flex min-h-13 items-center justify-center gap-3 rounded-full bg-asoebi-gold-400 px-6 text-xs font-black tracking-[.12em] text-asoebi-purple-950 uppercase transition-colors hover:bg-asoebi-gold-300 disabled:cursor-wait disabled:opacity-70 sm:col-span-2"
      >
        {isSubmitting && (
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-asoebi-purple-950/30 border-t-asoebi-purple-950 motion-reduce:animate-none"
          />
        )}
        <span>{isSubmitting ? "Joining waitlist…" : "Join waitlist"}</span>
      </button>
    </form>
  );
}

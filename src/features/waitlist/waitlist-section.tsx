"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import { CustomCheckbox } from "@/components/ui/custom-checkbox";
import { submitWaitlist } from "@/features/waitlist/action";
import {
  waitlistSchema,
  type WaitlistInput as Values,
} from "@/features/waitlist/schema";
import { idleActionResult } from "@/lib/action-result";

const fieldClass =
  "min-h-13 w-full rounded-full border border-asoebi-purple-300 bg-white px-5 text-sm outline-hidden transition-colors transition-linear placeholder:text-asoebi-muted focus:border-brand aria-invalid:border-red-700";
const labelClass = (invalid: boolean) =>
  `mb-2 block px-2 text-sm font-bold ${invalid ? "text-red-800" : "text-asoebi-purple-950"}`;

export function WaitlistSection() {
  const [result, setResult] = useState(idleActionResult);
  const successRef = useRef<HTMLDivElement>(null);
  const {
    control,
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      consent: false,
      website: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  useEffect(() => {
    if (result.status === "success") successRef.current?.focus();
  }, [result.status]);

  const clearResult = () => {
    if (result.status !== "idle") setResult(idleActionResult);
  };

  const submitForm = handleSubmit(async (values) => {
    setResult(idleActionResult);

    try {
      const submissionResult = await submitWaitlist(values);

      if (submissionResult.status === "error" && submissionResult.fieldErrors) {
        Object.entries(submissionResult.fieldErrors).forEach(
          ([field, messages]) => {
            if (
              field === "firstName" ||
              field === "lastName" ||
              field === "email" ||
              field === "consent"
            ) {
              setError(field, {
                type: "server",
                message: messages[0],
              });
            }
          },
        );
      }

      setResult(submissionResult);
    } catch {
      setResult({
        status: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  });

  return (
    <section
      id="waitlist"
      className="bg-asoebi-mist px-5 py-24 lg:px-10 lg:py-36"
    >
      <div className="mx-auto grid max-w-375 overflow-hidden rounded-4xl bg-white shadow-asoebi-panel lg:grid-cols-[1.05fr_.95fr]">
        <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
          <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
            Join the circle
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[.92] tracking-[-.055em] sm:text-7xl">
            Your place in the story starts here.
          </h2>
          <p className="mt-6 max-w-xl leading-7 text-asoebi-graphite">
            Be first to hear what is taking shape across Asoebi Fashion Week,
            the Prize and the wider platform.
          </p>

          {result.status === "success" ? (
            <div
              ref={successRef}
              role="status"
              tabIndex={-1}
              className="mt-9 rounded-3xl bg-asoebi-mist p-7 outline-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:p-9"
            >
              <span
                aria-hidden="true"
                className="grid size-11 place-items-center rounded-full bg-brand text-xl text-white"
              >
                ✓
              </span>
              <h3 className="mt-6 font-display text-4xl leading-none tracking-[-.045em]">
                You’re on the list.
              </h3>
              <p className="mt-4 max-w-md leading-7 text-asoebi-graphite">
                {result.message} Check your inbox for confirmation.
              </p>
            </div>
          ) : (
            <form
              className="mt-9 grid gap-5 sm:grid-cols-2"
              onSubmit={submitForm}
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
                  aria-describedby={
                    errors.email ? "waitlist-email-error" : undefined
                  }
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
                className="transition-linear flex min-h-13 items-center justify-center gap-3 rounded-full bg-asoebi-gold-400 px-6 text-xs font-black tracking-[.12em] text-asoebi-purple-950 uppercase transition-colors hover:bg-asoebi-gold-300 disabled:cursor-wait disabled:opacity-70 sm:col-span-2"
              >
                {isSubmitting && (
                  <span
                    aria-hidden="true"
                    className="size-4 animate-spin rounded-full border-2 border-asoebi-purple-950/30 border-t-asoebi-purple-950 motion-reduce:animate-none"
                  />
                )}
                <span>
                  {isSubmitting ? "Joining waitlist…" : "Join waitlist"}
                </span>
              </button>
            </form>
          )}
        </div>
        <div className="relative min-h-96 overflow-hidden bg-asoebi-purple-950 lg:min-h-full">
          <Image
            src="/images/waitlist-collage.png"
            alt="A collage celebrating the people, cloth and creativity of Asoebi Fashion Week"
            fill
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="object-cover object-center opacity-75"
          />
          <div className="absolute inset-0 bg-linear-to-t from-asoebi-purple-950/70 via-transparent to-transparent" />
          <p className="absolute right-8 bottom-8 left-8 max-w-md font-display text-4xl leading-none tracking-[-.04em] text-white sm:text-5xl">
            Stay close to what comes next.
          </p>
        </div>
      </div>
    </section>
  );
}

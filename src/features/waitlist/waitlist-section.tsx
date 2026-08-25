"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

import { CustomCheckbox } from "@/components/ui/custom-checkbox";
import { submitWaitlist } from "@/features/waitlist/action";
import {
  waitlistSchema,
  type WaitlistInput as Values,
} from "@/features/waitlist/schema";
import { idleActionResult } from "@/lib/action-result";

const fieldClass =
  "min-h-13 w-full rounded-full border border-asoebi-purple-200 bg-white px-5 text-sm outline-hidden transition-colors transition-linear focus:border-brand";

export function WaitlistSection() {
  const [result, setResult] = useState(idleActionResult);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { consent: false, website: "" },
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
          <form
            className="mt-9 grid gap-4 sm:grid-cols-2"
            onSubmit={handleSubmit(async (values) => {
              setResult(await submitWaitlist(values));
            })}
            noValidate
          >
            <div>
              <label className="sr-only" htmlFor="waitlist-first-name">
                First name
              </label>
              <input
                id="waitlist-first-name"
                autoComplete="given-name"
                placeholder="First name"
                {...register("firstName")}
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
                  className="mt-2 px-4 text-xs text-brand"
                >
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="sr-only" htmlFor="waitlist-last-name">
                Last name
              </label>
              <input
                id="waitlist-last-name"
                autoComplete="family-name"
                placeholder="Last name"
                {...register("lastName")}
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
                  className="mt-2 px-4 text-xs text-brand"
                >
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="sr-only" htmlFor="waitlist-email">
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                {...register("email")}
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
                  className="mt-2 px-4 text-xs text-brand"
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
                    changeAction={field.onChange}
                    blurAction={field.onBlur}
                    invalid={Boolean(errors.consent)}
                    describedBy={
                      errors.consent ? "waitlist-consent-error" : undefined
                    }
                  >
                    I agree to receive Asoebi Fashion Week news and updates.
                  </CustomCheckbox>
                )}
              />
              {errors.consent && (
                <p
                  id="waitlist-consent-error"
                  role="alert"
                  className="mt-2 pl-9 text-xs text-brand"
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
              disabled={isSubmitting}
              className="transition-linear min-h-13 rounded-full bg-asoebi-gold-400 px-6 text-xs font-black tracking-[.12em] text-asoebi-purple-950 uppercase transition-colors hover:bg-asoebi-gold-300 disabled:cursor-wait disabled:opacity-60 sm:col-span-2"
            >
              {isSubmitting
                ? "Joining…"
                : result.status === "success"
                  ? "You’re on the list"
                  : "Join waitlist"}
            </button>
            {result.status !== "idle" && (
              <p
                role={result.status === "error" ? "alert" : "status"}
                className={`sm:col-span-2 ${result.status === "error" ? "text-red-700" : "text-asoebi-graphite"}`}
              >
                {result.message}
              </p>
            )}
          </form>
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

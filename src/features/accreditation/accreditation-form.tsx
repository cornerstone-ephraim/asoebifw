"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.email("Enter a valid email"),
  role: z.enum(["press", "buyer", "designer", "partner", "other"]),
  message: z.string().max(600).optional(),
});

type Values = z.infer<typeof schema>;
const roles = [
  ["press", "Press / media"],
  ["buyer", "Buyer"],
  ["designer", "Designer"],
  ["partner", "Partner"],
  ["other", "Community"],
] as const;
const fieldClass =
  "min-h-13 w-full rounded-full border border-asoebi-purple-200 bg-white px-5 text-sm outline-hidden transition-colors transition-linear focus:border-brand";

export function AccreditationForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(() => undefined)}
      className="rounded-4xl bg-white p-6 shadow-asoebi-warm-soft sm:p-9"
      noValidate
    >
      <p className="text-xs font-bold tracking-[.18em] text-brand uppercase">
        Tell us about you
      </p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            placeholder="Your name"
            {...register("name")}
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p
              id="name-error"
              role="alert"
              className="mt-2 px-4 text-xs text-brand"
            >
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email address"
            {...register("email")}
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p
              id="email-error"
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
          aria-describedby={errors.role ? "role-error" : undefined}
        >
          <legend className="mb-3 px-1 text-[10px] font-bold tracking-[.16em] text-asoebi-muted uppercase">
            Accreditation type
          </legend>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {roles.map(([value, label]) => {
                  const active = field.value === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => field.onChange(value)}
                      className={`transition-linear min-h-11 rounded-full border px-4 py-2 text-xs font-bold transition-colors ${active ? "border-brand bg-brand text-white" : "border-asoebi-purple-200 bg-white text-asoebi-purple-950 hover:border-brand hover:text-brand"}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.role && (
            <p
              id="role-error"
              role="alert"
              className="mt-2 px-4 text-xs text-brand"
            >
              Choose an accreditation type
            </p>
          )}
        </fieldset>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="sr-only">
            Note
          </label>
          <textarea
            id="message"
            placeholder="Anything we should know? (optional)"
            {...register("message")}
            rows={4}
            className="transition-linear w-full rounded-3xl border border-asoebi-purple-200 bg-white p-5 text-sm outline-hidden transition-colors focus:border-brand"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p
              id="message-error"
              role="alert"
              className="mt-2 px-4 text-xs text-brand"
            >
              {errors.message.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="transition-linear mt-4 min-h-13 w-full rounded-full bg-brand px-6 text-xs font-black tracking-[.12em] text-white uppercase transition-colors hover:bg-asoebi-purple-700"
      >
        Prepare application
      </button>
      {isSubmitSuccessful && (
        <p
          role="status"
          className="mt-4 rounded-2xl bg-white p-4 text-sm text-asoebi-graphite"
        >
          Your details are ready. Submission will open when the accreditation
          programme goes live.
        </p>
      )}
    </form>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.email("Enter a valid email"),
  role: z.enum(["press", "buyer", "designer", "partner", "other"]),
  message: z.string().max(600).optional(),
});

type Values = z.infer<typeof schema>;
const fieldClass =
  "min-h-13 w-full rounded-full border border-asoebi-purple-200 bg-white px-5 text-sm outline-none transition-colors transition-linear focus:border-brand";

export function AccreditationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(() => undefined)}
      className="rounded-[2rem] bg-asoebi-mist p-6 sm:p-9"
      noValidate
    >
      <p className="text-xs font-bold uppercase tracking-[.18em] text-brand">
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
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 px-4 text-xs text-brand">
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
          />
          {errors.email && (
            <p className="mt-2 px-4 text-xs text-brand">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="role" className="sr-only">
            Accreditation type
          </label>
          <select
            id="role"
            {...register("role")}
            defaultValue=""
            className={fieldClass}
          >
            <option value="" disabled>
              Choose accreditation type
            </option>
            <option value="press">Press / media</option>
            <option value="buyer">Buyer / fashion professional</option>
            <option value="designer">Designer</option>
            <option value="partner">Partner</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="sr-only">
            Note
          </label>
          <textarea
            id="message"
            placeholder="Anything we should know? (optional)"
            {...register("message")}
            rows={4}
            className="w-full rounded-[1.5rem] border border-asoebi-purple-200 bg-white p-5 text-sm outline-none transition-colors transition-linear focus:border-brand"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 min-h-13 w-full rounded-full bg-brand px-6 text-xs font-black uppercase tracking-[.12em] text-white transition-colors transition-linear hover:bg-asoebi-purple-700"
      >
        Prepare application
      </button>
      {isSubmitSuccessful && (
        <p
          role="status"
          className="mt-4 rounded-[1.25rem] bg-white p-4 text-sm text-asoebi-graphite"
        >
          Your details are ready. Submission will open when the accreditation
          programme goes live.
        </p>
      )}
    </form>
  );
}

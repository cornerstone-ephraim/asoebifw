"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { CustomSelect } from "@/components/ui/custom-select";
import { CustomCheckbox } from "@/components/ui/custom-checkbox";

const categories = [
  "Best Designer",
  "Best Wedding Asoebi",
  "Best Innovative Fabric Design",
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  category: z.enum(categories, { message: "Choose a prize category" }),
  portfolio: z.url("Enter a valid portfolio or social profile link"),
  statement: z
    .string()
    .trim()
    .min(20, "Tell us a little more about your work")
    .max(800, "Keep your response under 800 characters"),
  consent: z.literal(true, { message: "Confirm that these details are yours" }),
});

type Values = z.infer<typeof schema>;

const fieldClass =
  "min-h-13 w-full rounded-full border border-asoebi-purple-200 bg-white px-5 text-sm outline-hidden transition-colors transition-linear focus:border-brand";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} role="alert" className="mt-2 px-4 text-xs text-brand">
      {message}
    </p>
  ) : null;
}

export function PrizeApplicationForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit(() => undefined)}
      className="mt-10 rounded-4xl bg-white p-6 shadow-[0_20px_65px_rgba(80,55,28,.12)] sm:p-9"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="prize-name" className="sr-only">
            Full name
          </label>
          <input
            id="prize-name"
            placeholder="Full name"
            autoComplete="name"
            {...register("name")}
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "prize-name-error" : undefined}
          />
          <FieldError id="prize-name-error" message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="prize-email" className="sr-only">
            Email address
          </label>
          <input
            id="prize-email"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            {...register("email")}
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "prize-email-error" : undefined}
          />
          <FieldError id="prize-email-error" message={errors.email?.message} />
        </div>
        <div>
          <label htmlFor="prize-phone" className="sr-only">
            Phone number
          </label>
          <input
            id="prize-phone"
            type="tel"
            placeholder="Phone number"
            autoComplete="tel"
            {...register("phone")}
            className={fieldClass}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "prize-phone-error" : undefined}
          />
          <FieldError id="prize-phone-error" message={errors.phone?.message} />
        </div>
        <div>
          <label htmlFor="prize-category" className="sr-only">
            Prize category
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <CustomSelect
                id="prize-category"
                label="Prize category"
                value={field.value}
                changeAction={field.onChange}
                options={categories.map((category) => ({
                  label: category,
                  value: category,
                }))}
                placeholder="Choose a prize category"
                invalid={Boolean(errors.category)}
                describedBy={
                  errors.category ? "prize-category-error" : undefined
                }
              />
            )}
          />
          <FieldError
            id="prize-category-error"
            message={errors.category?.message}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="prize-portfolio" className="sr-only">
            Portfolio or social profile
          </label>
          <input
            id="prize-portfolio"
            type="url"
            placeholder="Portfolio or social profile link"
            inputMode="url"
            {...register("portfolio")}
            className={fieldClass}
            aria-invalid={Boolean(errors.portfolio)}
            aria-describedby={
              errors.portfolio ? "prize-portfolio-error" : undefined
            }
          />
          <FieldError
            id="prize-portfolio-error"
            message={errors.portfolio?.message}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="prize-statement" className="sr-only">
            Tell us about your work
          </label>
          <textarea
            id="prize-statement"
            rows={6}
            placeholder="Tell us about your work and what you would like the judges to know"
            {...register("statement")}
            className="transition-linear w-full rounded-3xl border border-asoebi-purple-200 bg-white p-5 text-sm outline-hidden transition-colors focus:border-brand"
            aria-invalid={Boolean(errors.statement)}
            aria-describedby={
              errors.statement ? "prize-statement-error" : undefined
            }
          />
          <FieldError
            id="prize-statement-error"
            message={errors.statement?.message}
          />
        </div>
      </div>

      <div className="mt-5">
        <Controller
          name="consent"
          control={control}
          render={({ field }) => (
            <CustomCheckbox
              name={field.name}
              checked={Boolean(field.value)}
              changeAction={field.onChange}
              blurAction={field.onBlur}
              invalid={Boolean(errors.consent)}
              describedBy={errors.consent ? "prize-consent-error" : undefined}
            >
              I confirm that the information provided is mine and can be used
              for my Asoebi Prize application.
            </CustomCheckbox>
          )}
        />
      </div>
      <FieldError id="prize-consent-error" message={errors.consent?.message} />

      <button
        type="submit"
        className="transition-linear mt-6 min-h-13 w-full rounded-full bg-asoebi-purple-950 px-6 text-xs font-black tracking-[.12em] text-white uppercase transition-colors hover:bg-brand"
      >
        Prepare application
      </button>

      {isSubmitSuccessful && (
        <div
          role="status"
          className="mt-5 rounded-[1.25rem] bg-asoebi-mist p-5 text-sm leading-6 text-asoebi-graphite"
        >
          <p className="font-bold text-asoebi-purple-950">
            Your application details are ready.
          </p>
          <p className="mt-1">
            Final submission will open when the official application channel is
            connected.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="transition-linear mt-3 font-bold text-brand transition-opacity hover:opacity-60"
          >
            Prepare another application
          </button>
        </div>
      )}
    </form>
  );
}

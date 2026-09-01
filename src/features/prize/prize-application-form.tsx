"use client";

import { Controller } from "react-hook-form";

import { CustomCheckbox } from "@/components/ui/custom-checkbox";
import { CustomSelect } from "@/components/ui/custom-select";
import { usePrizeApplicationForm } from "@/features/prize/hooks/use-prize-application-form";
import { PhoneCountrySelect } from "@/features/prize/phone-country-select";
import { prizeSubmissionModes } from "@/features/prize/schema";
import { playInterfaceSound } from "@/features/sound/interface-sound";

const fieldClass =
  "min-h-13 min-w-0 w-full rounded-full border border-asoebi-purple-300 bg-white px-4 text-sm outline-hidden transition-colors transition-linear placeholder:text-asoebi-muted focus:border-brand aria-invalid:border-red-700 sm:px-5";

const labelClass = (invalid: boolean) =>
  `mb-2 block px-2 text-sm font-bold ${invalid ? "text-red-800" : "text-asoebi-purple-950"}`;

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p
      id={id}
      role="alert"
      className="mt-2 px-2 text-xs font-semibold text-red-800"
    >
      {message}
    </p>
  ) : null;
}

const linkDetails = {
  instagram: {
    label: "Instagram submission link",
    placeholder: "https://instagram.com/your-public-profile",
    note: "Link to a public profile, Highlight or pinned sequence containing both collections.",
  },
  youtube: {
    label: "YouTube submission link",
    placeholder: "https://youtube.com/playlist?list=...",
    note: "Link to a public or unlisted playlist, or one clearly chaptered video.",
  },
  website: {
    label: "Website submission link",
    placeholder: "https://yourstudio.com/prize-portfolio",
    note: "Link directly to the page where both collections are presented.",
  },
  pdf: {
    label: "Public PDF link",
    placeholder: "https://drive.google.com/file/d/...",
    note: "Share one organised PDF containing both collections. Make sure anyone with the link can view it.",
  },
} as const;

export function PrizeApplicationForm() {
  const {
    clearResult,
    control,
    errors,
    formRef,
    handleFormSubmit,
    isSubmitting,
    register,
    result,
    resultRef,
    setSubmissionMode,
    stage,
    submissionMode,
  } = usePrizeApplicationForm();

  if (result.status === "success" || result.status === "info") {
    return (
      <div
        ref={resultRef}
        role="status"
        tabIndex={-1}
        className="mt-8 min-w-0 rounded-4xl bg-white p-5 shadow-asoebi-panel outline-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:mt-10 sm:p-12"
      >
        <span
          aria-hidden="true"
          className={`grid size-12 place-items-center rounded-full text-xl ${result.status === "info" ? "bg-asoebi-gold-300 text-asoebi-purple-950" : "bg-brand text-white"}`}
        >
          {result.status === "info" ? "i" : "✓"}
        </span>
        <h3 className="mt-6 max-w-xl font-display text-4xl leading-none tracking-[-.05em] text-asoebi-purple-950 sm:text-5xl">
          {result.status === "info"
            ? "Your work is already with us."
            : "Your collections are in."}
        </h3>
        <p className="mt-5 max-w-xl leading-7 text-asoebi-graphite">
          {result.message}
        </p>
      </div>
    );
  }

  const linkDetail = submissionMode ? linkDetails[submissionMode] : undefined;
  const buttonLabel = {
    idle: "Submit application",
    submitting: "Submitting application…",
  }[stage];

  return (
    <form
      ref={formRef}
      data-hydrated="false"
      onSubmit={handleFormSubmit}
      className="mt-8 min-w-0 rounded-4xl bg-white p-4 shadow-asoebi-panel sm:mt-10 sm:p-9 lg:p-12"
      noValidate
      aria-busy={isSubmitting}
    >
      {result.status === "error" && (
        <div
          role="alert"
          className="mb-6 rounded-2xl border border-red-700 bg-red-50 p-4 text-sm text-red-900"
        >
          <p className="font-bold">We couldn’t submit your application.</p>
          <p className="mt-1">{result.message}</p>
        </div>
      )}

      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        <div className="min-w-0">
          <label
            htmlFor="prize-first-name"
            className={labelClass(Boolean(errors.firstName))}
          >
            First name <span aria-hidden="true">*</span>
          </label>
          <input
            id="prize-first-name"
            autoComplete="given-name"
            placeholder="e.g. Amara"
            required
            {...register("firstName", { onChange: clearResult })}
            className={fieldClass}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={
              errors.firstName ? "prize-first-name-error" : undefined
            }
          />
          <FieldError
            id="prize-first-name-error"
            message={errors.firstName?.message}
          />
        </div>

        <div className="min-w-0">
          <label
            htmlFor="prize-last-name"
            className={labelClass(Boolean(errors.lastName))}
          >
            Last name <span aria-hidden="true">*</span>
          </label>
          <input
            id="prize-last-name"
            autoComplete="family-name"
            placeholder="e.g. Okafor"
            required
            {...register("lastName", { onChange: clearResult })}
            className={fieldClass}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={
              errors.lastName ? "prize-last-name-error" : undefined
            }
          />
          <FieldError
            id="prize-last-name-error"
            message={errors.lastName?.message}
          />
        </div>

        <div className="min-w-0 sm:col-span-2">
          <label
            htmlFor="prize-email"
            className={labelClass(Boolean(errors.email))}
          >
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="prize-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            {...register("email", { onChange: clearResult })}
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "prize-email-error" : undefined}
          />
          <FieldError id="prize-email-error" message={errors.email?.message} />
        </div>

        <fieldset className="min-w-0 sm:col-span-2">
          <legend
            className={labelClass(
              Boolean(errors.phoneCountry || errors.phoneNumber),
            )}
          >
            Phone number <span aria-hidden="true">*</span>
          </legend>
          <div className="grid min-w-0 grid-cols-[6.75rem_minmax(0,1fr)] gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-3">
            <div className="min-w-0">
              <label htmlFor="prize-phone-country" className="sr-only">
                Country code
              </label>
              <Controller
                name="phoneCountry"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field: { value, onChange } }) => (
                  <PhoneCountrySelect
                    id="prize-phone-country"
                    value={value}
                    changeAction={(country) => {
                      onChange(country);
                      clearResult();
                    }}
                    invalid={Boolean(errors.phoneCountry)}
                    describedBy={
                      errors.phoneCountry
                        ? "prize-phone-country-error"
                        : undefined
                    }
                  />
                )}
              />
            </div>
            <div className="min-w-0">
              <label htmlFor="prize-phone-number" className="sr-only">
                Local phone number
              </label>
              <input
                id="prize-phone-number"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="e.g. 801 234 5678"
                required
                {...register("phoneNumber", { onChange: clearResult })}
                className={fieldClass}
                aria-invalid={Boolean(errors.phoneNumber)}
                aria-describedby={
                  errors.phoneNumber ? "prize-phone-number-error" : undefined
                }
              />
            </div>
          </div>
          <FieldError
            id="prize-phone-country-error"
            message={errors.phoneCountry?.message}
          />
          <FieldError
            id="prize-phone-number-error"
            message={errors.phoneNumber?.message}
          />
        </fieldset>

        <div className="min-w-0 sm:col-span-2">
          <label
            htmlFor="prize-submission-mode"
            className={labelClass(Boolean(errors.submissionMode))}
          >
            Submission mode <span aria-hidden="true">*</span>
          </label>
          <Controller
            name="submissionMode"
            control={control}
            render={({ field }) => (
              <CustomSelect
                id="prize-submission-mode"
                label="Submission mode"
                value={field.value}
                changeAction={setSubmissionMode}
                options={prizeSubmissionModes}
                placeholder="Choose how you will share your collections"
                invalid={Boolean(errors.submissionMode)}
                describedBy={
                  errors.submissionMode
                    ? "prize-submission-mode-error"
                    : undefined
                }
              />
            )}
          />
          <FieldError
            id="prize-submission-mode-error"
            message={errors.submissionMode?.message}
          />
        </div>

        {linkDetail && (
          <div className="min-w-0 sm:col-span-2">
            <label
              htmlFor="prize-submission-url"
              className={labelClass(Boolean(errors.submissionUrl))}
            >
              {linkDetail.label} <span aria-hidden="true">*</span>
            </label>
            <input
              id="prize-submission-url"
              type="url"
              inputMode="url"
              placeholder={linkDetail.placeholder}
              required
              {...register("submissionUrl", { onChange: clearResult })}
              className={fieldClass}
              aria-invalid={Boolean(errors.submissionUrl)}
              aria-describedby="prize-submission-url-note prize-submission-url-error"
            />
            <p
              id="prize-submission-url-note"
              className="mt-2 px-2 text-xs leading-5 text-asoebi-muted"
            >
              {linkDetail.note}
            </p>
            <FieldError
              id="prize-submission-url-error"
              message={errors.submissionUrl?.message}
            />
          </div>
        )}

        <div className="min-w-0 sm:col-span-2">
          <label
            htmlFor="prize-id-document"
            className={labelClass(Boolean(errors.idDocument))}
          >
            Age verification ID <span aria-hidden="true">*</span>
          </label>
          <Controller
            name="idDocument"
            control={control}
            render={({ field: { name, onBlur, onChange, ref } }) => (
              <input
                ref={ref}
                id="prize-id-document"
                name={name}
                type="file"
                required
                accept="application/pdf,image/jpeg,image/png,image/webp,image/heic,image/heif"
                onBlur={onBlur}
                onChange={(event) => {
                  onChange(event.target.files?.[0]);
                  clearResult();
                }}
                className="transition-linear min-h-13 w-full min-w-0 cursor-pointer rounded-3xl border border-asoebi-purple-300 bg-white px-2 py-2 text-xs text-asoebi-graphite outline-hidden transition-colors file:mr-2 file:min-h-9 file:cursor-pointer file:rounded-full file:border-0 file:bg-asoebi-mist file:px-3 file:text-xs file:font-bold file:text-asoebi-purple-950 hover:border-asoebi-purple-500 focus:border-brand aria-invalid:border-red-700 sm:px-3 sm:text-sm sm:file:mr-4 sm:file:px-4"
                aria-invalid={Boolean(errors.idDocument)}
                aria-describedby="prize-id-document-note prize-id-document-error"
              />
            )}
          />
          <p
            id="prize-id-document-note"
            className="mt-2 px-2 text-xs leading-5 text-asoebi-muted"
          >
            Upload a government-issued ID showing your name and date of birth.
            You may cover your ID number and address. The document is only
            available to authorised Prize reviewers. PDF or image, maximum 8 MB.
          </p>
          <FieldError
            id="prize-id-document-error"
            message={errors.idDocument?.message}
          />
        </div>

        <div className="min-w-0 px-1 sm:col-span-2">
          <Controller
            name="consent"
            control={control}
            render={({ field }) => (
              <CustomCheckbox
                name={field.name}
                checked={Boolean(field.value)}
                changeAction={(checked) => {
                  field.onChange(checked);
                  clearResult();
                }}
                blurAction={field.onBlur}
                invalid={Boolean(errors.consent)}
                describedBy={errors.consent ? "prize-consent-error" : undefined}
              >
                I confirm that I own or am authorised to submit this work, that
                it contains two original collections, and that Asoebi Fashion
                Prize may review it for this competition. I am between 16 and 26
                years old and consent to authorised reviewers using my ID only
                to verify my eligibility. I also agree to receive AEFW news and
                updates. <span aria-hidden="true">*</span>
              </CustomCheckbox>
            )}
          />
          <FieldError
            id="prize-consent-error"
            message={errors.consent?.message}
          />
        </div>
      </div>

      <div aria-hidden="true" className="hidden">
        <input {...register("website")} tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        onClick={() => playInterfaceSound("press", 0.65)}
        className="transition-linear mt-6 flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-asoebi-purple-950 px-6 text-xs font-black tracking-[.12em] text-white uppercase transition-colors hover:bg-brand disabled:cursor-wait disabled:opacity-70"
      >
        {isSubmitting && (
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white motion-reduce:animate-none"
          />
        )}
        {buttonLabel}
      </button>
    </form>
  );
}

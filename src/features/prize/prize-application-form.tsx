"use client";

import { Controller } from "react-hook-form";
import { FiFileText, FiUploadCloud } from "react-icons/fi";

import { CustomCheckbox } from "@/components/ui/custom-checkbox";
import { CustomSelect } from "@/components/ui/custom-select";
import { usePrizeApplicationForm } from "@/features/prize/hooks/use-prize-application-form";
import {
  MAX_PRIZE_PDF_SIZE,
  prizeSubmissionModes,
} from "@/features/prize/schema";

const fieldClass =
  "min-h-13 w-full rounded-full border border-asoebi-purple-300 bg-white px-5 text-sm outline-hidden transition-colors transition-linear placeholder:text-asoebi-muted focus:border-brand aria-invalid:border-red-700";

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
} as const;

export function PrizeApplicationForm() {
  const {
    clearResult,
    control,
    errors,
    formRef,
    handleFormSubmit,
    isSubmitting,
    pdfError,
    pdfFile,
    register,
    result,
    resultRef,
    selectPdf,
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
        className="mt-10 rounded-4xl bg-white p-8 shadow-asoebi-panel outline-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:p-12"
      >
        <span
          aria-hidden="true"
          className={`grid size-12 place-items-center rounded-full text-xl ${result.status === "info" ? "bg-asoebi-gold-300 text-asoebi-purple-950" : "bg-brand text-white"}`}
        >
          {result.status === "info" ? "i" : "✓"}
        </span>
        <h3 className="mt-6 max-w-xl font-display text-5xl leading-none tracking-[-.05em] text-asoebi-purple-950">
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

  const linkDetail =
    submissionMode && submissionMode !== "pdf"
      ? linkDetails[submissionMode]
      : undefined;
  const buttonLabel = {
    idle: "Submit application",
    preparing: "Preparing upload…",
    uploading: "Uploading PDF…",
    submitting: "Submitting application…",
  }[stage];

  return (
    <form
      ref={formRef}
      data-hydrated="false"
      onSubmit={handleFormSubmit}
      className="mt-10 rounded-4xl bg-white p-6 shadow-asoebi-panel sm:p-9 lg:p-12"
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

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
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

        <div>
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

        <div className="sm:col-span-2">
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

        <div className="sm:col-span-2">
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
          <div className="sm:col-span-2">
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

        {submissionMode === "pdf" && (
          <div className="sm:col-span-2">
            <label
              htmlFor="prize-pdf"
              className={labelClass(Boolean(pdfError))}
            >
              Collection PDF <span aria-hidden="true">*</span>
            </label>
            <label
              htmlFor="prize-pdf"
              className={`transition-linear flex min-h-32 cursor-pointer items-center gap-5 rounded-3xl border bg-asoebi-paper p-5 transition-colors hover:bg-asoebi-mist ${pdfError ? "border-red-700" : "border-asoebi-purple-300"}`}
            >
              <span
                aria-hidden="true"
                className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-xl text-brand"
              >
                {pdfFile ? <FiFileText /> : <FiUploadCloud />}
              </span>
              <span>
                <span className="block font-bold text-asoebi-purple-950">
                  {pdfFile?.name ?? "Choose your collection PDF"}
                </span>
                <span className="mt-1 block text-xs leading-5 text-asoebi-muted">
                  One organised PDF containing both collections. Maximum 30
                  pages and {MAX_PRIZE_PDF_SIZE / 1024 / 1024}MB.
                </span>
              </span>
            </label>
            <input
              id="prize-pdf"
              type="file"
              accept="application/pdf,.pdf"
              required
              onChange={(event) => selectPdf(event.target.files?.[0])}
              className="sr-only"
              aria-invalid={Boolean(pdfError)}
              aria-describedby={pdfError ? "prize-pdf-error" : undefined}
            />
            <FieldError id="prize-pdf-error" message={pdfError} />
          </div>
        )}

        <div className="px-1 sm:col-span-2">
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
                it contains at least two original collections, and that Asoebi
                Fashion Prize may review it for this competition.{" "}
                <span aria-hidden="true">*</span>
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

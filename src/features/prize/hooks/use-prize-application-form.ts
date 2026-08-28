"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  getPrizeUploadUrl,
  submitPrizeApplication,
} from "@/features/prize/action";
import {
  prizeApplicationFormSchema,
  prizeUploadResponseSchema,
  validatePrizePdf,
  type PrizeApplicationForm,
  type PrizeApplicationFormInput,
} from "@/features/prize/schema";
import { idleActionResult } from "@/lib/action-result";

type SubmissionStage = "idle" | "preparing" | "uploading" | "submitting";

export function usePrizeApplicationForm() {
  const [result, setResult] = useState(idleActionResult);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfError, setPdfError] = useState<string>();
  const [stage, setStage] = useState<SubmissionStage>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const form = useForm<
    PrizeApplicationFormInput,
    unknown,
    PrizeApplicationForm
  >({
    resolver: zodResolver(prizeApplicationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      submissionUrl: "",
      consent: false,
      website: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const submissionMode = useWatch({
    control: form.control,
    name: "submissionMode",
  });

  useEffect(() => {
    if (formRef.current) formRef.current.dataset.hydrated = "true";
  }, []);

  useEffect(() => {
    if (result.status === "success" || result.status === "info") {
      resultRef.current?.focus();
    }
  }, [result.status]);

  const clearResult = () => {
    if (result.status !== "idle") setResult(idleActionResult);
  };

  const setSubmissionMode = (value: string) => {
    form.setValue(
      "submissionMode",
      value as PrizeApplicationFormInput["submissionMode"],
      { shouldDirty: true, shouldValidate: true },
    );
    form.clearErrors(["submissionMode", "submissionUrl"]);
    setPdfError(undefined);
    clearResult();
  };

  const selectPdf = (file?: File) => {
    setPdfFile(file ?? null);
    setPdfError(file ? validatePrizePdf(file) : undefined);
    clearResult();
  };

  const onSubmit = async (values: PrizeApplicationForm) => {
    if (stage !== "idle") return;

    let pdfStorageId: string | undefined;
    setResult(idleActionResult);

    try {
      if (values.submissionMode === "pdf") {
        const fileError = validatePrizePdf(pdfFile);
        if (fileError || !pdfFile) {
          setPdfError(fileError);
          return;
        }

        setStage("preparing");
        const uploadTarget = await getPrizeUploadUrl();
        if (uploadTarget.status === "error") {
          setResult(uploadTarget);
          return;
        }

        setStage("uploading");
        const uploadResponse = await fetch(uploadTarget.uploadUrl, {
          method: "POST",
          headers: { "Content-Type": "application/pdf" },
          body: pdfFile,
        });
        if (!uploadResponse.ok) throw new Error("Prize PDF upload failed");

        const parsedUpload = prizeUploadResponseSchema.safeParse(
          await uploadResponse.json(),
        );
        if (!parsedUpload.success) {
          throw new Error("Prize PDF upload returned an invalid response");
        }
        pdfStorageId = parsedUpload.data.storageId;
      }

      setStage("submitting");
      const submissionResult = await submitPrizeApplication({
        ...values,
        consent: true,
        submissionUrl:
          values.submissionMode === "pdf" ? "" : values.submissionUrl,
        pdfStorageId,
      });

      if (submissionResult.status === "error" && submissionResult.fieldErrors) {
        Object.entries(submissionResult.fieldErrors).forEach(
          ([field, messages]) => {
            if (field === "pdfStorageId") {
              setPdfError(messages[0]);
            } else if (
              field === "firstName" ||
              field === "lastName" ||
              field === "email" ||
              field === "submissionMode" ||
              field === "submissionUrl" ||
              field === "consent"
            ) {
              form.setError(field, {
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
    } finally {
      setStage("idle");
    }
  };

  return {
    clearResult,
    control: form.control,
    errors: form.formState.errors,
    formRef,
    handleFormSubmit: form.handleSubmit(onSubmit),
    isSubmitting: stage !== "idle",
    pdfError,
    pdfFile,
    register: form.register,
    result,
    resultRef,
    selectPdf,
    setSubmissionMode,
    stage,
    submissionMode,
  };
}

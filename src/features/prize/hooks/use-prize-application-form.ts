"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { submitPrizeApplication } from "@/features/prize/action";
import { useSubmissionResultSound } from "@/features/sound/hooks/use-submission-result-sound";
import {
  prizeApplicationFormSchema,
  type PrizeApplicationForm,
  type PrizeApplicationFormInput,
} from "@/features/prize/schema";
import { idleActionResult } from "@/lib/action-result";

type SubmissionStage = "idle" | "submitting";

export function usePrizeApplicationForm() {
  const [result, setResult] = useState(idleActionResult);
  const [stage, setStage] = useState<SubmissionStage>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useSubmissionResultSound(result.status);

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
      phoneCountry: "NG",
      phoneNumber: "",
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
    clearResult();
  };

  const onSubmit = async (values: PrizeApplicationForm) => {
    if (stage !== "idle") return;

    setResult(idleActionResult);

    try {
      setStage("submitting");
      const submissionResult = await submitPrizeApplication({
        ...values,
        consent: true,
      });

      if (submissionResult.status === "error" && submissionResult.fieldErrors) {
        Object.entries(submissionResult.fieldErrors).forEach(
          ([field, messages]) => {
            if (
              field === "firstName" ||
              field === "lastName" ||
              field === "email" ||
              field === "phoneCountry" ||
              field === "phoneNumber" ||
              field === "submissionMode" ||
              field === "submissionUrl" ||
              field === "idDocument" ||
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
    register: form.register,
    result,
    resultRef,
    setSubmissionMode,
    stage,
    submissionMode,
  };
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { submitWaitlist } from "@/features/waitlist/action";
import {
  waitlistSchema,
  type WaitlistInput as Values,
} from "@/features/waitlist/schema";
import { idleActionResult } from "@/lib/action-result";

export function useWaitlistForm() {
  const [result, setResult] = useState(idleActionResult);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const form = useForm<Values>({
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
  });

  useEffect(() => {
    if (result.status === "success" || result.status === "info") {
      resultRef.current?.focus();
    }
  }, [result.status]);

  const clearResult = () => {
    if (result.status !== "idle") {
      setResult(idleActionResult);
    }
  };

  const onSubmit = async (values: Values) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
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
      setIsSubmitting(false);
    }
  };

  return {
    clearResult,
    control: form.control,
    errors: form.formState.errors,
    handleFormSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    register: form.register,
    result,
    resultRef,
  };
}

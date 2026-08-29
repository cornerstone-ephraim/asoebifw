"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

type Step = "email" | "code";

export function AdminSignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<Step>("email");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage(null);

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: email.trim().toLowerCase(),
      type: "sign-in",
    });

    setPending(false);

    if (error) {
      setMessage("We could not send a sign-in code to this email.");
      return;
    }

    setStep("code");
  }

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage(null);

    const { error } = await authClient.signIn.emailOtp({
      email: email.trim().toLowerCase(),
      otp: code.trim(),
      name: "AEFW administrator",
    });

    setPending(false);

    if (error) {
      setMessage("That code is invalid or has expired.");
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={step === "email" ? requestCode : verifyCode}
      className="mt-10 space-y-6"
      noValidate
    >
      <div>
        <label htmlFor="admin-email" className="block text-sm font-bold">
          Email address
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          readOnly={step === "code"}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="transition-linear mt-2 min-h-13 w-full rounded-2xl border border-asoebi-purple-950 bg-white px-4 text-base outline-hidden transition-colors focus-visible:border-asoebi-gold-600 disabled:opacity-60"
        />
      </div>

      {step === "code" && (
        <div>
          <label htmlFor="admin-code" className="block text-sm font-bold">
            Six-digit code
          </label>
          <input
            id="admin-code"
            name="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            required
            autoFocus
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
            className="transition-linear mt-2 min-h-13 w-full rounded-2xl border border-asoebi-purple-950 bg-white px-4 text-lg tracking-[.25em] outline-hidden transition-colors focus-visible:border-asoebi-gold-600"
          />
        </div>
      )}

      {message && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="transition-linear min-h-13 w-full rounded-full bg-asoebi-gold-500 px-6 text-sm font-black tracking-[.08em] text-asoebi-purple-950 uppercase transition-colors hover:bg-asoebi-gold-400 disabled:cursor-wait disabled:opacity-65"
      >
        {pending
          ? "Please wait"
          : step === "email"
            ? "Send sign-in code"
            : "Enter admin area"}
      </button>

      {step === "code" && (
        <button
          type="button"
          onClick={() => {
            setStep("email");
            setCode("");
            setMessage(null);
          }}
          className="transition-linear mx-auto block min-h-11 text-sm font-bold text-asoebi-purple-800 underline-offset-4 transition-colors hover:text-asoebi-purple-950 hover:underline"
        >
          Use a different email
        </button>
      )}
    </form>
  );
}

"use client";

import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

type Step = "email" | "code";
type Message = { text: string; tone: "error" | "success" };

export function AdminSignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<Step>("email");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = window.setInterval(() => {
      setResendCooldown((current) => Math.max(0, current - 1));
    }, 1_000);

    return () => window.clearInterval(timer);
  }, [resendCooldown]);

  async function sendCode() {
    setPending(true);
    setMessage(null);

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: email.trim().toLowerCase(),
      type: "sign-in",
    });

    setPending(false);

    if (error) {
      setMessage({
        text: "We could not send a sign-in code to this email.",
        tone: "error",
      });
      return false;
    }

    setResendCooldown(30);
    return true;
  }

  async function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const sent = await sendCode();

    if (!sent) return;
    setStep("code");
    setMessage({
      text: `A six-digit code was sent to ${email.trim().toLowerCase()}.`,
      tone: "success",
    });
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
      setMessage({
        text: "That code is invalid or has expired.",
        tone: "error",
      });
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
        <p
          role={message.tone === "error" ? "alert" : "status"}
          className={`text-sm font-semibold ${message.tone === "error" ? "text-red-700" : "text-emerald-800"}`}
        >
          {message.text}
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
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <button
            type="button"
            disabled={pending || resendCooldown > 0}
            onClick={async () => {
              const sent = await sendCode();
              if (sent) {
                setMessage({
                  text: "A new sign-in code has been sent.",
                  tone: "success",
                });
              }
            }}
            className="transition-linear min-h-11 text-sm font-bold text-asoebi-purple-800 underline-offset-4 transition-colors hover:text-asoebi-purple-950 hover:underline disabled:cursor-not-allowed disabled:text-asoebi-muted disabled:no-underline"
          >
            {resendCooldown > 0
              ? `Resend code in ${resendCooldown}s`
              : "Resend code"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setCode("");
              setMessage(null);
              setResendCooldown(0);
            }}
            className="transition-linear min-h-11 text-sm font-bold text-asoebi-purple-800 underline-offset-4 transition-colors hover:text-asoebi-purple-950 hover:underline"
          >
            Use a different email
          </button>
        </div>
      )}
    </form>
  );
}

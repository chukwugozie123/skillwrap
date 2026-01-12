"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_URL = "https://skillwrap-backend.onrender.com";

export default function VerifyEmailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cooldown, setCooldown] = useState(0);

  /* 🔁 Resend cooldown timer */
  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setInterval(() => {
      setCooldown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Invalid verification link
      </div>
    );
  }

  /* 🔢 OTP input handling */
  function handleChange(value: string, index: number) {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  }

  function handleBackspace(e: any, index: number) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  }

  async function handleVerify() {
    setError("");
    setSuccess("");

    const code = otp.join("");
    if (code.length !== 4) {
      setError("Enter the 4-digit code");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/verify-email-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed");
        return;
      }

      setSuccess("Email verified successfully 🎉");
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setSuccess("");
    setCooldown(60);

    try {
      const res = await fetch(`${API_URL}/auth/resend-email-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to resend OTP");
        setCooldown(0);
        return;
      }

      setSuccess("New OTP sent to your email");
    } catch {
      setError("Server error");
      setCooldown(0);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#050b2e] to-[#020617] px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 text-white shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Verify your email
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Code sent to <span className="text-cyan-400">{email}</span>
        </p>

        {/* OTP INPUTS */}
        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleBackspace(e, i)}
              maxLength={1}
              className="w-14 h-14 text-center text-2xl font-bold rounded-xl 
                         bg-white/10 border border-white/20 backdrop-blur-md
                         focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          ))}
        </div>

        {error && <p className="text-red-400 text-center mb-3">{error}</p>}
        {success && <p className="text-green-400 text-center mb-3">{success}</p>}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r 
                     from-cyan-500 to-blue-600 hover:shadow-cyan-400/40 
                     transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        {/* RESEND */}
        <div className="mt-6 text-center">
          <button
            onClick={handleResend}
            disabled={cooldown > 0}
            className="text-sm text-cyan-400 hover:underline disabled:text-gray-500"
          >
            {cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Resend verification code"}
          </button>
        </div>
      </div>
    </div>
  );
}

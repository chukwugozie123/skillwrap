"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";

/* ================= HELPERS ================= */

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;
  return `${name.slice(0, 2)}****${name.slice(-2)}@${domain}`;
}

/* ================= COMPONENT ================= */

export default function VerifyEmailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cooldown, setCooldown] = useState(0);

  /* ================= REDIRECT SAFETY ================= */

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Invalid verification link
      </div>
    );
  }

  /* ================= COOLDOWN TIMER ================= */

  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  /* ================= AUTO VERIFY ================= */

  useEffect(() => {
    const code = otp.join("");
    if (code.length === 4 && !loading) {
      handleVerify(code);
    }
  }, [otp, loading]);

  /* ================= OTP INPUT ================= */

  function handleChange(value: string, index: number) {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  }

  function handleBackspace(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  }

  /* ================= VERIFY OTP ================= */

  async function handleVerify(code: string) {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/verify-email-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid or expired code");
        setOtp(["", "", "", ""]);
        document.getElementById("otp-0")?.focus();
        return;
      }

      setSuccess("Email verified successfully 🎉");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      setError("Server error. Please try again.");
      setOtp(["", "", "", ""]);
      document.getElementById("otp-0")?.focus();
    } finally {
      setLoading(false);
    }
  }

  /* ================= RESEND OTP ================= */

  async function handleResend() {
    setError("");
    setSuccess("");
    setCooldown(60);

    try {
      const response = await fetch(`${API_URL}/resend-email-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to resend OTP");
        setCooldown(0);
        return;
      }

      setSuccess("New verification code sent");
      setOtp(["", "", "", ""]);
      document.getElementById("otp-0")?.focus();
    } catch {
      setError("Server error. Please try again.");
      setCooldown(0);
    }
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#050b2e] to-[#020617] px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 text-white shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Verify your email
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Code sent to{" "}
          <span className="text-cyan-400">
            {maskEmail(email)}
          </span>
        </p>

        {/* OTP INPUTS */}
        <div className="flex justify-center gap-4 mb-4">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleBackspace(e, i)}
              maxLength={1}
              disabled={loading}
              className={`w-14 h-14 text-center text-2xl font-bold rounded-xl 
                bg-white/10 border border-white/20 backdrop-blur-md
                focus:outline-none focus:ring-2 focus:ring-cyan-400
                ${loading ? "opacity-50 cursor-not-allowed" : ""}
              `}
            />
          ))}
        </div>

        {loading && (
          <p className="text-center text-sm text-cyan-400 animate-pulse mb-3">
            Verifying code…
          </p>
        )}

        {error && (
          <p className="text-red-400 text-center mb-3">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-400 text-center mb-3">
            {success}
          </p>
        )}

        {/* RESEND */}
        <div className="mt-6 text-center text-sm">
          {cooldown > 0 ? (
            <p className="text-gray-400">
              You can resend a new code in{" "}
              <span className="text-cyan-400 font-semibold">
                {cooldown}s
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-cyan-400 hover:underline"
            >
              Didn’t get a code? Resend
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

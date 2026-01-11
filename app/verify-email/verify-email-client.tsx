"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const API_URL = "https://skillwrap-backend.onrender.com";

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid OTP");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] to-[#1e1b4b] text-white">
      <form
        onSubmit={handleVerify}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20"
      >
        <h1 className="text-2xl font-bold text-center mb-2">
          Verify your email
        </h1>

        <p className="text-sm text-gray-400 text-center mb-6">
          Enter the OTP sent to <span className="text-blue-400">{email}</span>
        </p>

        {error && (
          <p className="text-sm text-red-400 text-center mb-4">{error}</p>
        )}

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          placeholder="Enter OTP"
          className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-center text-lg tracking-widest mb-6"
        />

        <button
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>
    </div>
  );
}

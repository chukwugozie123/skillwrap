export const dynamic = "force-dynamic";

"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const API_URL = "https://skillwrap-backend.onrender.com";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Invalid verification link
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#030712] via-[#0b1220] to-[#1e1b4b] text-white">
      <form
        onSubmit={handleVerify}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10"
      >
        <h1 className="text-2xl font-bold mb-2 text-blue-300">
          Verify your email
        </h1>

        <p className="text-gray-400 text-sm mb-6">
          Enter the code sent to <span className="text-white">{email}</span>
        </p>

        <input
          type="text"
          maxLength={4}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-xl mb-4"
        />

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        <button
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition font-semibold"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>
    </main>
  );
}

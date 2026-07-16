"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Loader2, Sparkles, ShieldCheck } from "lucide-react";
// import { Link } from "react-router-dom";
import Link from "next/link";
import { AuroraBackground } from "./components/Auorabackground";
import { ErrorAlert } from "./components/ErroorAlrert";
import { SuccessPanel } from "./components/sucess";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:4000";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      console.log("Forgot password response:", data);

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send reset email");
      }

      // Email successfully sent
      setSent(true);
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      console.error("Forgot password error:", err);

      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-shell relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-12 text-white sm:px-6">
      <AuroraBackground />

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="group relative z-10 w-full max-w-md"
      >
        {/* Gradient border wrapper */}
        <div className="rounded-[32px] bg-gradient-to-br from-cyan-400/30 via-white/10 to-blue-600/30 p-[1px] shadow-[var(--auth-glow-shadow)] transition-shadow duration-500 group-hover:shadow-[0_0_80px_-10px_hsl(var(--auth-cyan)/0.4),0_0_140px_-20px_hsl(var(--auth-indigo)/0.3)]">
          <div
            className="relative overflow-hidden rounded-[31px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl sm:p-10"
            style={{ boxShadow: "var(--auth-card-shadow)" }}
          >
            {/* subtle top glass reflection */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent" />

            {/* Icon badge */}
            <div className="relative mb-6 flex justify-center">
              <motion.div
                className="relative flex h-20 w-20 items-center justify-center"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div
                  className="absolute inset-0 animate-aurora-spin rounded-full opacity-70"
                  style={{
                    background:
                      "conic-gradient(from 0deg, hsl(var(--auth-cyan)) 0deg, transparent 100deg, hsl(var(--auth-blue)) 200deg, transparent 300deg, hsl(var(--auth-cyan)) 360deg)",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
                  }}
                />
                <div className="relative flex h-[4.25rem] w-[4.25rem] animate-glow-pulse items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 shadow-[0_0_40px_-5px_rgba(34,211,238,0.6)] backdrop-blur-md">
                  <ShieldCheck className="h-9 w-9 text-cyan-300" />
                </div>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="bg-gradient-to-b from-white to-slate-300 bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent"
            >
              Forgot Password
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mx-auto mt-3 max-w-xs text-center text-sm leading-relaxed text-slate-400"
            >
              Enter your SkillWrap account email and we'll send you a secure
              reset link.
            </motion.p>

            {!sent ? (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-8 space-y-5"
              >
                <div className="group/input relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400 transition-colors duration-300 group-focus-within/input:text-cyan-300" />

                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-4 pl-12 pr-4 text-sm text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] outline-none transition-all duration-300 placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-400/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12),inset_0_1px_2px_rgba(0,0,0,0.3)]"
                  />
                </div>

                <ErrorAlert message={error} />

                <motion.button
                  type="submit"
                  whileHover={{ scale: loading ? 1 : 1.015, y: loading ? 0 : -1 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  disabled={loading}
                  className="group/btn relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[length:200%_200%] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 py-4 font-semibold text-white shadow-[0_10px_30px_-8px_rgba(34,211,238,0.5)] transition-shadow duration-300 animate-gradient-shift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] disabled:cursor-not-allowed disabled:opacity-50 disabled:animate-none"
                >
                  {!loading && (
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover/btn:animate-shimmer group-hover/btn:opacity-100" />
                  )}

                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Send Reset Link
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <SuccessPanel email={email} />
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link
                href="/login"
                className="group/link mt-8 flex items-center justify-center gap-2 text-sm text-cyan-400 transition-colors duration-300 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] rounded-md"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-x-1" />
                <span className="relative">
                  Back to Login
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover/link:w-full" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

"use client"

import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  KeyRound,
} from "lucide-react";

// const API_URL = "http://localhost:4000";
const API_URL = "https://skillwrap-backend.onrender.com"

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  size: 2 + ((i * 37) % 4),
  left: (i * 53.7) % 100,
  top: (i * 29.3) % 100,
  duration: 6 + ((i * 13) % 8),
  delay: (i * 0.4) % 5,
}));

function AuraBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(var(--auth-indigo)/0.25),transparent),radial-gradient(ellipse_60%_50%_at_100%_100%,hsl(var(--auth-blue)/0.18),transparent)]" />

      <motion.div
        className="absolute -top-32 left-[8%] h-72 w-72 rounded-full bg-cyan-500/25 blur-[110px] sm:h-96 sm:w-96"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[5%] h-[22rem] w-[22rem] rounded-full bg-blue-600/25 blur-[130px] sm:h-[30rem] sm:w-[30rem]"
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-600/15 blur-[120px]"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.12]">
        <div
          className="h-full w-full animate-aurora-spin rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, hsl(var(--auth-cyan)) 0deg, transparent 60deg, hsl(var(--auth-indigo)) 140deg, transparent 220deg, hsl(var(--auth-purple)) 300deg, transparent 360deg)",
          }}
        />
      </div>
      <div className="absolute left-1/2 top-1/2 h-[100vmax] w-[100vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]">
        <div
          className="h-full w-full animate-aurora-spin-reverse rounded-full"
          style={{
            background:
              "conic-gradient(from 90deg, transparent 0deg, hsl(var(--auth-blue)) 90deg, transparent 180deg, hsl(var(--auth-cyan)) 270deg, transparent 360deg)",
          }}
        />
      </div>

      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-cyan-300/70 shadow-[0_0_8px_2px_rgba(34,211,238,0.5)]"
          style={{ width: p.size, height: p.size, left: `${p.left}%`, top: `${p.top}%` }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent" />
      <div className="bg-noise absolute inset-0 opacity-[0.035]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,hsl(var(--auth-bg)/0.6)_100%)]" />
    </div>
  );
}



function ResetPasswordContent() {
    // ALL YOUR EXISTING 700+ LINES
    const searchParams = useSearchParams();

const token = searchParams.get("token");

const router = useRouter();


  const [loading, setLoading] = useState(true);
  const [validToken, setValidToken] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [message, setMessage] = useState("");

  // presentational-only helpers, do not affect logic
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isSuccess = message === "Password updated successfully.";

  // ===============================
  // VERIFY TOKEN
  // ===============================
  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setMessage("Missing reset token.");
        setLoading(false);
        return;
      }

      try {
        console.log("Checking token...");

        const res = await fetch(
          `${API_URL}/auth/verify-reset-token?token=${token}`
        );

        const data = await res.json();

        console.log(data);

        if (res.ok && data.success) {
          setValidToken(true);
        } else {
          setValidToken(false);
          setMessage(data.message);
        }
      } catch (err) {
        console.error(err);
        setMessage("Unable to verify token.");
      } finally {
        setLoading(false);
      }
    }

    verifyToken();
  }, [token]);

  console.log(token, ',.ds')

  // ===============================
  // SUBMIT NEW PASSWORD
  // ===============================
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return setMessage("Fill all fields.");
    }

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match.");
    }

    try {
      setSubmitting(true);
      setMessage("");

      const res = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        return setMessage(data.message);
      }

      setMessage("Password updated successfully.");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  // ===============================
  // LOADING
  // ===============================
  if (loading) {
    return (
      <main className="auth-shell relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 text-white">
        <AuraBackdrop />
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center gap-6 rounded-[30px] border border-white/10 bg-white/[0.04] px-10 py-12 text-center shadow-[var(--auth-card-shadow)] backdrop-blur-2xl"
        >
          <div className="relative flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 animate-aurora-spin rounded-full bg-[conic-gradient(from_0deg,hsl(var(--auth-cyan)),transparent_70%)] opacity-70" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-md">
              <Loader2 className="h-6 w-6 animate-spin text-cyan-300" />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Checking reset link
            </h2>
            <p className="mt-2 flex items-center justify-center gap-1 text-sm text-slate-400">
              Please wait a moment
              <span className="inline-flex gap-0.5">
                <motion.span
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                >
                  .
                </motion.span>
                <motion.span
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                >
                  .
                </motion.span>
              </span>
            </p>
          </div>
        </motion.div>
      </main>
    );
  }

  // ===============================
  // INVALID TOKEN
  // ===============================
  if (!validToken) {
    return (
      <main className="auth-shell relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-12 text-white sm:px-6">
        <AuraBackdrop />

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="rounded-[32px] bg-gradient-to-br from-red-400/25 via-white/10 to-red-600/20 p-[1px] shadow-[0_0_60px_-15px_rgba(248,113,113,0.35)]">
            <div
              className="relative overflow-hidden rounded-[31px] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-2xl sm:p-10"
              style={{ boxShadow: "var(--auth-card-shadow)" }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent" />

              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200, damping: 14 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-400/30 bg-red-500/10 shadow-[0_0_40px_-5px_rgba(248,113,113,0.55)]"
              >
                <ShieldAlert className="h-9 w-9 text-red-400" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-6 text-2xl font-bold tracking-tight text-white"
              >
                Reset Link Invalid
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-4 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-left shadow-[0_0_30px_-10px_rgba(239,68,68,0.4)]"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <p className="text-sm leading-snug text-red-300">{message}</p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.015, y: -1 }}
                whileTap={{ scale: 0.98 }}
        onClick={() => router.push("/forgot-password")}
                className="group/btn relative mt-8 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[length:200%_200%] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 py-4 font-semibold text-white shadow-[0_10px_30px_-8px_rgba(34,211,238,0.5)] transition-shadow duration-300 animate-gradient-shift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover/btn:animate-shimmer group-hover/btn:opacity-100" />
                <Sparkles className="h-4 w-4" />
                Request another link
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  // ===============================
  // FORM
  // ===============================
  return (
    <main className="auth-shell relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-12 text-white sm:px-6">
      <AuraBackdrop />

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="group relative z-10 w-full max-w-md"
      >
        <div className="rounded-[32px] bg-gradient-to-br from-cyan-400/30 via-white/10 to-blue-600/30 p-[1px] shadow-[var(--auth-glow-shadow)] transition-shadow duration-500 group-hover:shadow-[0_0_80px_-10px_hsl(var(--auth-cyan)/0.4),0_0_140px_-20px_hsl(var(--auth-indigo)/0.3)]">
          <div
            className="relative overflow-hidden rounded-[31px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl sm:p-10"
            style={{ boxShadow: "var(--auth-card-shadow)" }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent" />

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative py-2 text-center"
                  role="status"
                  aria-live="polite"
                >
                  {[
                    { top: "5%", left: "12%", delay: 0 },
                    { top: "15%", left: "85%", delay: 0.4 },
                    { top: "80%", left: "8%", delay: 0.8 },
                    { top: "85%", left: "88%", delay: 1.2 },
                  ].map((s, i) => (
                    <motion.span
                      key={i}
                      className="pointer-events-none absolute text-emerald-300/70"
                      style={{ top: s.top, left: s.left }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.7] }}
                      transition={{ duration: 1.8, delay: 0.3 + s.delay, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                    </motion.span>
                  ))}

                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200, damping: 14 }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 shadow-[0_0_40px_-5px_rgba(52,211,153,0.5)]"
                  >
                    <CheckCircle2 className="h-9 w-9 text-emerald-400" strokeWidth={2.5} />
                  </motion.div>

                  <h2 className="mt-6 text-xl font-semibold text-emerald-300">
                    Password Updated
                  </h2>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
                    {message} Redirecting you to login...
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-6 flex justify-center">
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
                        <KeyRound className="h-9 w-9 text-cyan-300" />
                      </div>
                    </motion.div>
                  </div>

                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="bg-gradient-to-b from-white to-slate-300 bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent"
                  >
                    Reset Password
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="mx-auto mt-3 flex max-w-xs items-center justify-center gap-1.5 text-center text-sm leading-relaxed text-slate-400"
                  >
                    <ShieldCheck className="h-4 w-4 shrink-0 text-cyan-400" />
                    Choose a new, secure password for your account.
                  </motion.p>

                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="mt-8 space-y-5"
                  >
                    <div className="group/input relative">
                      <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400 transition-colors duration-300 group-focus-within/input:text-cyan-300" />

                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-4 pl-12 pr-12 text-sm text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] outline-none transition-all duration-300 placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-400/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12),inset_0_1px_2px_rgba(0,0,0,0.3)]"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 hover:text-cyan-300 focus-visible:outline-none"
                        tabIndex={-1}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    <div className="group/input relative">
                      <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400 transition-colors duration-300 group-focus-within/input:text-cyan-300" />

                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-4 pl-12 pr-12 text-sm text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] outline-none transition-all duration-300 placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-400/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12),inset_0_1px_2px_rgba(0,0,0,0.3)]"
                      />

                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 hover:text-cyan-300 focus-visible:outline-none"
                        tabIndex={-1}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {message && (
                        <motion.div
                          key={message}
                          initial={{ opacity: 0, y: -12, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -8, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                          role="alert"
                          aria-live="polite"
                        >
                          <div className="mt-1 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 shadow-[0_0_30px_-10px_rgba(239,68,68,0.4)] backdrop-blur-xl">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                            <p className="text-sm leading-snug text-red-300">{message}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={{ scale: submitting ? 1 : 1.015, y: submitting ? 0 : -1 }}
                      whileTap={{ scale: submitting ? 1 : 0.98 }}
                      className="group/btn relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[length:200%_200%] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 py-4 font-semibold text-white shadow-[0_10px_30px_-8px_rgba(34,211,238,0.5)] transition-shadow duration-300 animate-gradient-shift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] disabled:cursor-not-allowed disabled:opacity-50 disabled:animate-none"
                    >
                      {!submitting && (
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover/btn:animate-shimmer group-hover/btn:opacity-100" />
                      )}

                      {submitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5" />
                          Reset Password
                        </>
                      )}
                    </motion.button>
                  </motion.form>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Link
                      href="/login"
                      className="group/link mt-8 flex items-center justify-center gap-2 rounded-md text-sm text-cyan-400 transition-colors duration-300 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
                    >
                      <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-x-1" />
                      <span className="relative">
                        Back to Login
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover/link:w-full" />
                      </span>
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#020617] text-white">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />
        </main>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
// export default function ResetPassword() {
// const searchParams = useSearchParams();

// const token = searchParams.get("token");

// const router = useRouter();


//   const [loading, setLoading] = useState(true);
//   const [validToken, setValidToken] = useState(false);

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [submitting, setSubmitting] = useState(false);

//   const [message, setMessage] = useState("");

//   // presentational-only helpers, do not affect logic
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const isSuccess = message === "Password updated successfully.";

//   // ===============================
//   // VERIFY TOKEN
//   // ===============================
//   useEffect(() => {
//     async function verifyToken() {
//       if (!token) {
//         setMessage("Missing reset token.");
//         setLoading(false);
//         return;
//       }

//       try {
//         console.log("Checking token...");

//         const res = await fetch(
//           `${API_URL}/auth/verify-reset-token?token=${token}`
//         );

//         const data = await res.json();

//         console.log(data);

//         if (res.ok && data.success) {
//           setValidToken(true);
//         } else {
//           setValidToken(false);
//           setMessage(data.message);
//         }
//       } catch (err) {
//         console.error(err);
//         setMessage("Unable to verify token.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     verifyToken();
//   }, [token]);

//   console.log(token, ',.ds')

//   // ===============================
//   // SUBMIT NEW PASSWORD
//   // ===============================
//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     if (!password || !confirmPassword) {
//       return setMessage("Fill all fields.");
//     }

//     if (password !== confirmPassword) {
//       return setMessage("Passwords do not match.");
//     }

//     try {
//       setSubmitting(true);
//       setMessage("");

//       const res = await fetch(`${API_URL}/reset-password`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           token,
//           password,
//           confirmPassword,
//         }),
//       });

//       const data = await res.json();

//       console.log(data);

//       if (!res.ok) {
//         return setMessage(data.message);
//       }

//       setMessage("Password updated successfully.");

//       setTimeout(() => {
//         router.push("/login");
//       }, 2000);
//     } catch (err) {
//       console.error(err);
//       setMessage("Something went wrong.");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   // ===============================
//   // LOADING
//   // ===============================
//   if (loading) {
//     return (
//       <main className="auth-shell relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 text-white">
//         <AuraBackdrop />
//         <motion.div
//           initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
//           animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//           className="relative z-10 flex flex-col items-center gap-6 rounded-[30px] border border-white/10 bg-white/[0.04] px-10 py-12 text-center shadow-[var(--auth-card-shadow)] backdrop-blur-2xl"
//         >
//           <div className="relative flex h-16 w-16 items-center justify-center">
//             <div className="absolute inset-0 animate-aurora-spin rounded-full bg-[conic-gradient(from_0deg,hsl(var(--auth-cyan)),transparent_70%)] opacity-70" />
//             <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-md">
//               <Loader2 className="h-6 w-6 animate-spin text-cyan-300" />
//             </div>
//           </div>

//           <div>
//             <h2 className="text-lg font-semibold text-white">
//               Checking reset link
//             </h2>
//             <p className="mt-2 flex items-center justify-center gap-1 text-sm text-slate-400">
//               Please wait a moment
//               <span className="inline-flex gap-0.5">
//                 <motion.span
//                   animate={{ opacity: [0.2, 1, 0.2] }}
//                   transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
//                 >
//                   .
//                 </motion.span>
//                 <motion.span
//                   animate={{ opacity: [0.2, 1, 0.2] }}
//                   transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
//                 >
//                   .
//                 </motion.span>
//                 <motion.span
//                   animate={{ opacity: [0.2, 1, 0.2] }}
//                   transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
//                 >
//                   .
//                 </motion.span>
//               </span>
//             </p>
//           </div>
//         </motion.div>
//       </main>
//     );
//   }

//   // ===============================
//   // INVALID TOKEN
//   // ===============================
//   if (!validToken) {
//     return (
//       <main className="auth-shell relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-12 text-white sm:px-6">
//         <AuraBackdrop />

//         <motion.div
//           initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
//           animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//           className="relative z-10 w-full max-w-md"
//         >
//           <div className="rounded-[32px] bg-gradient-to-br from-red-400/25 via-white/10 to-red-600/20 p-[1px] shadow-[0_0_60px_-15px_rgba(248,113,113,0.35)]">
//             <div
//               className="relative overflow-hidden rounded-[31px] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-2xl sm:p-10"
//               style={{ boxShadow: "var(--auth-card-shadow)" }}
//             >
//               <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent" />

//               <motion.div
//                 initial={{ scale: 0.6, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200, damping: 14 }}
//                 className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-400/30 bg-red-500/10 shadow-[0_0_40px_-5px_rgba(248,113,113,0.55)]"
//               >
//                 <ShieldAlert className="h-9 w-9 text-red-400" />
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.5 }}
//                 className="mt-6 text-2xl font-bold tracking-tight text-white"
//               >
//                 Reset Link Invalid
//               </motion.h1>

//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3, duration: 0.5 }}
//                 className="mt-4 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-left shadow-[0_0_30px_-10px_rgba(239,68,68,0.4)]"
//               >
//                 <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
//                 <p className="text-sm leading-snug text-red-300">{message}</p>
//               </motion.div>

//               <motion.button
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4, duration: 0.5 }}
//                 whileHover={{ scale: 1.015, y: -1 }}
//                 whileTap={{ scale: 0.98 }}
//         onClick={() => router.push("/forgot-password")}
//                 className="group/btn relative mt-8 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[length:200%_200%] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 py-4 font-semibold text-white shadow-[0_10px_30px_-8px_rgba(34,211,238,0.5)] transition-shadow duration-300 animate-gradient-shift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
//               >
//                 <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover/btn:animate-shimmer group-hover/btn:opacity-100" />
//                 <Sparkles className="h-4 w-4" />
//                 Request another link
//               </motion.button>
//             </div>
//           </div>
//         </motion.div>
//       </main>
//     );
//   }

//   // ===============================
//   // FORM
//   // ===============================
//   return (
//     <main className="auth-shell relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-12 text-white sm:px-6">
//       <AuraBackdrop />

//       <motion.div
//         initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
//         animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//         transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//         className="group relative z-10 w-full max-w-md"
//       >
//         <div className="rounded-[32px] bg-gradient-to-br from-cyan-400/30 via-white/10 to-blue-600/30 p-[1px] shadow-[var(--auth-glow-shadow)] transition-shadow duration-500 group-hover:shadow-[0_0_80px_-10px_hsl(var(--auth-cyan)/0.4),0_0_140px_-20px_hsl(var(--auth-indigo)/0.3)]">
//           <div
//             className="relative overflow-hidden rounded-[31px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl sm:p-10"
//             style={{ boxShadow: "var(--auth-card-shadow)" }}
//           >
//             <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent" />

//             <AnimatePresence mode="wait">
//               {isSuccess ? (
//                 <motion.div
//                   key="success"
//                   initial={{ opacity: 0, scale: 0.92, y: 10 }}
//                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//                   className="relative py-2 text-center"
//                   role="status"
//                   aria-live="polite"
//                 >
//                   {[
//                     { top: "5%", left: "12%", delay: 0 },
//                     { top: "15%", left: "85%", delay: 0.4 },
//                     { top: "80%", left: "8%", delay: 0.8 },
//                     { top: "85%", left: "88%", delay: 1.2 },
//                   ].map((s, i) => (
//                     <motion.span
//                       key={i}
//                       className="pointer-events-none absolute text-emerald-300/70"
//                       style={{ top: s.top, left: s.left }}
//                       initial={{ opacity: 0, scale: 0 }}
//                       animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.7] }}
//                       transition={{ duration: 1.8, delay: 0.3 + s.delay, repeat: Infinity, repeatDelay: 2 }}
//                     >
//                       <Sparkles className="h-3.5 w-3.5" />
//                     </motion.span>
//                   ))}

//                   <motion.div
//                     initial={{ scale: 0.6, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200, damping: 14 }}
//                     className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 shadow-[0_0_40px_-5px_rgba(52,211,153,0.5)]"
//                   >
//                     <CheckCircle2 className="h-9 w-9 text-emerald-400" strokeWidth={2.5} />
//                   </motion.div>

//                   <h2 className="mt-6 text-xl font-semibold text-emerald-300">
//                     Password Updated
//                   </h2>
//                   <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
//                     {message} Redirecting you to login...
//                   </p>
//                 </motion.div>
//               ) : (
//                 <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                   <div className="mb-6 flex justify-center">
//                     <motion.div
//                       className="relative flex h-20 w-20 items-center justify-center"
//                       animate={{ y: [0, -6, 0] }}
//                       transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//                     >
//                       <div
//                         className="absolute inset-0 animate-aurora-spin rounded-full opacity-70"
//                         style={{
//                           background:
//                             "conic-gradient(from 0deg, hsl(var(--auth-cyan)) 0deg, transparent 100deg, hsl(var(--auth-blue)) 200deg, transparent 300deg, hsl(var(--auth-cyan)) 360deg)",
//                           mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
//                           WebkitMask:
//                             "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
//                         }}
//                       />
//                       <div className="relative flex h-[4.25rem] w-[4.25rem] animate-glow-pulse items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 shadow-[0_0_40px_-5px_rgba(34,211,238,0.6)] backdrop-blur-md">
//                         <KeyRound className="h-9 w-9 text-cyan-300" />
//                       </div>
//                     </motion.div>
//                   </div>

//                   <motion.h1
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.15, duration: 0.5 }}
//                     className="bg-gradient-to-b from-white to-slate-300 bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent"
//                   >
//                     Reset Password
//                   </motion.h1>
//                   <motion.p
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.25, duration: 0.5 }}
//                     className="mx-auto mt-3 flex max-w-xs items-center justify-center gap-1.5 text-center text-sm leading-relaxed text-slate-400"
//                   >
//                     <ShieldCheck className="h-4 w-4 shrink-0 text-cyan-400" />
//                     Choose a new, secure password for your account.
//                   </motion.p>

//                   <motion.form
//                     onSubmit={handleSubmit}
//                     initial={{ opacity: 0, y: 12 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.35, duration: 0.5 }}
//                     className="mt-8 space-y-5"
//                   >
//                     <div className="group/input relative">
//                       <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400 transition-colors duration-300 group-focus-within/input:text-cyan-300" />

//                       <input
//                         type={showPassword ? "text" : "password"}
//                         placeholder="New Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-4 pl-12 pr-12 text-sm text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] outline-none transition-all duration-300 placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-400/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12),inset_0_1px_2px_rgba(0,0,0,0.3)]"
//                       />

//                       <button
//                         type="button"
//                         onClick={() => setShowPassword((v) => !v)}
//                         className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 hover:text-cyan-300 focus-visible:outline-none"
//                         tabIndex={-1}
//                         aria-label={showPassword ? "Hide password" : "Show password"}
//                       >
//                         {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                       </button>
//                     </div>

//                     <div className="group/input relative">
//                       <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400 transition-colors duration-300 group-focus-within/input:text-cyan-300" />

//                       <input
//                         type={showConfirmPassword ? "text" : "password"}
//                         placeholder="Confirm Password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                         className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-4 pl-12 pr-12 text-sm text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] outline-none transition-all duration-300 placeholder:text-slate-500 hover:border-white/20 focus:border-cyan-400/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12),inset_0_1px_2px_rgba(0,0,0,0.3)]"
//                       />

//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword((v) => !v)}
//                         className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors duration-300 hover:text-cyan-300 focus-visible:outline-none"
//                         tabIndex={-1}
//                         aria-label={showConfirmPassword ? "Hide password" : "Show password"}
//                       >
//                         {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                       </button>
//                     </div>

//                     <AnimatePresence mode="wait">
//                       {message && (
//                         <motion.div
//                           key={message}
//                           initial={{ opacity: 0, y: -12, height: 0 }}
//                           animate={{ opacity: 1, y: 0, height: "auto" }}
//                           exit={{ opacity: 0, y: -8, height: 0 }}
//                           transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//                           className="overflow-hidden"
//                           role="alert"
//                           aria-live="polite"
//                         >
//                           <div className="mt-1 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 shadow-[0_0_30px_-10px_rgba(239,68,68,0.4)] backdrop-blur-xl">
//                             <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
//                             <p className="text-sm leading-snug text-red-300">{message}</p>
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>

//                     <motion.button
//                       type="submit"
//                       disabled={submitting}
//                       whileHover={{ scale: submitting ? 1 : 1.015, y: submitting ? 0 : -1 }}
//                       whileTap={{ scale: submitting ? 1 : 0.98 }}
//                       className="group/btn relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[length:200%_200%] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 py-4 font-semibold text-white shadow-[0_10px_30px_-8px_rgba(34,211,238,0.5)] transition-shadow duration-300 animate-gradient-shift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] disabled:cursor-not-allowed disabled:opacity-50 disabled:animate-none"
//                     >
//                       {!submitting && (
//                         <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-300 group-hover/btn:animate-shimmer group-hover/btn:opacity-100" />
//                       )}

//                       {submitting ? (
//                         <>
//                           <Loader2 className="h-5 w-5 animate-spin" />
//                           Updating...
//                         </>
//                       ) : (
//                         <>
//                           <Sparkles className="h-5 w-5" />
//                           Reset Password
//                         </>
//                       )}
//                     </motion.button>
//                   </motion.form>

//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5, duration: 0.5 }}
//                   >
//                     <Link
//                       href="/login"
//                       className="group/link mt-8 flex items-center justify-center gap-2 rounded-md text-sm text-cyan-400 transition-colors duration-300 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
//                     >
//                       <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-x-1" />
//                       <span className="relative">
//                         Back to Login
//                         <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover/link:w-full" />
//                       </span>
//                     </Link>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </motion.div>
//     </main>
//   );
// }



"use client";

import { useEffect, useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

const API_URL = "https://skillwrap-backend.onrender.com";


interface FormState {
  success?: boolean;
  message?: string;
  error?: string;
  redirectTo?: string;
}

async function loginAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const emailOrUsername = formData.get("emailOrUsername");
  const password = formData.get("password");

  if (!emailOrUsername || !password) {
    return { error: "All fields are required" };
  }

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ emailOrUsername, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || "Invalid login" };
    }

    return {
      success: true,
      message: data.message,
      redirectTo: "/dashboard",
    };
  } catch (err) {
    console.error("Login error:", err);
    return { error: "Server error. Please try again." };
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative w-full overflow-hidden rounded-xl py-3 font-semibold text-white shadow-[0_8px_30px_rgba(34,211,238,0.35)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(34,211,238,0.55)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-400 to-blue-500 blur-md" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {pending ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Signing you in...
          </>
        ) : (
          <>
            Login
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </span>
    </button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useActionState<FormState, FormData>(loginAction, {});

  useEffect(() => {
    if (state?.redirectTo) {
      setTimeout(() => {
        router.push(state.redirectTo!);
      }, 1500);
    }
  }, [state, router]);

  function handleGoogleLogin() {
    window.location.href = `${API_URL}/auth/google`;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#070b1a] p-6">
      {/* Animated grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.25) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl animate-[float_9s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-blue-600/30 blur-3xl animate-[float_11s_ease-in-out_infinite_reverse]" />
      <div className="pointer-events-none absolute top-1/2 left-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl animate-[float_13s_ease-in-out_infinite]" />

      {/* Sparkles */}
      <div className="pointer-events-none absolute top-20 right-32 h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_4px_rgba(34,211,238,0.7)] animate-[twinkle_3s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute bottom-28 left-24 h-1 w-1 rounded-full bg-blue-300 shadow-[0_0_10px_3px_rgba(96,165,250,0.7)] animate-[twinkle_4s_ease-in-out_infinite_0.7s]" />
      <div className="pointer-events-none absolute top-1/3 left-16 h-1 w-1 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.7)] animate-[twinkle_5s_ease-in-out_infinite_1.3s]" />

      {/* Card */}
      <form
        action={formAction}
        className="relative z-10 w-full max-w-md animate-[fadeUp_0.7s_ease-out_both]"
      >
        {/* Glow ring */}
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-cyan-400/40 via-blue-500/20 to-transparent blur-md" />

        <div className="relative rounded-3xl border border-white/15 bg-white/[0.06] p-8 text-white shadow-[0_30px_80px_-20px_rgba(8,47,73,0.6)] backdrop-blur-2xl">
          {/* Top accent line */}
          <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

          {/* Brand badge */}
          <div className="mb-6 flex justify-center animate-[fadeUp_0.7s_ease-out_0.05s_both]">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-wider text-cyan-200/90 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              SKILLWRAP · SECURE LOGIN
            </div>
          </div>

          <h1 className="text-center text-3xl sm:text-4xl font-bold tracking-tight animate-[fadeUp_0.7s_ease-out_0.1s_both]">
            <span
              className="bg-clip-text text-transparent bg-[linear-gradient(110deg,#67e8f9,40%,#ffffff,60%,#60a5fa)] bg-[length:200%_100%] animate-[shimmer_4s_linear_infinite]"
            >
              Welcome Back
            </span>
          </h1>
          <p className="mt-2 text-center text-sm text-white/60 animate-[fadeUp_0.7s_ease-out_0.15s_both]">
            Log in to continue trading skills & earning
          </p>

          {(state?.error || state?.message) && (
            <div
              className={`mt-6 rounded-xl border px-4 py-3 text-sm text-center backdrop-blur animate-[fadeUp_0.3s_ease-out_both] ${
                state.error
                  ? "border-red-400/30 bg-red-500/10 text-red-300"
                  : "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
              }`}
            >
              {state.error || state.message}
            </div>
          )}

          {/* Email / Username */}
          <div className="mt-6 animate-[fadeUp_0.7s_ease-out_0.2s_both]">
            <label className="block text-xs font-medium uppercase tracking-wider text-white/70 mb-2">
              Email / Username
            </label>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-blue-500/0 opacity-0 blur-md transition-opacity duration-300 group-focus-within:opacity-100" />
              <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-3 text-white/50 group-focus-within:text-cyan-300 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16v12H4z" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                <input
                  name="emailOrUsername"
                  required
                  placeholder="you@skillwrap.io"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.07] border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-300/60 focus:bg-white/[0.1] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="mt-5 animate-[fadeUp_0.7s_ease-out_0.25s_both]">
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-xs font-medium uppercase tracking-wider text-white/70">
                Password
              </label>
              <a href="/forgot-password" className="text-xs text-cyan-300/80 hover:text-cyan-200 transition-colors">
                Forgot?
              </a>
            </div>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-blue-500/0 opacity-0 blur-md transition-opacity duration-300 group-focus-within:opacity-100" />
              <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-3 text-white/50 group-focus-within:text-cyan-300 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="11" width="16" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 1 1 8 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/[0.07] border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-300/60 focus:bg-white/[0.1] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-white/60 hover:text-cyan-300 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-7 animate-[fadeUp_0.7s_ease-out_0.3s_both]">
            <SubmitButton />
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4 animate-[fadeUp_0.7s_ease-out_0.35s_both]">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-xs uppercase tracking-widest text-white/50">or continue with</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="group relative w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/15 bg-white/[0.08] text-white font-medium backdrop-blur-md transition-all duration-300 hover:bg-white/[0.14] hover:border-cyan-300/40 hover:-translate-y-0.5 animate-[fadeUp_0.7s_ease-out_0.4s_both]"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <GoogleIcon />
            <span className="relative">Continue with Google</span>
          </button>

          <p className="mt-7 text-center text-sm text-white/70 animate-[fadeUp_0.7s_ease-out_0.45s_both]">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="relative font-semibold text-cyan-300 hover:text-cyan-200 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-cyan-300 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              Sign up free
            </a>
          </p>
        </div>
      </form>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}

/* ================= ICONS ================= */
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.5H24v8h11.3C33.7 32.5 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.2-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.7 8.4 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41.9 35.8 44 30.3 44 24c0-1.3-.1-2.2-.4-3.5z" />
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
    <path d="M1 10s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6Z" />
    <circle cx="10" cy="10" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
    <path d="M3 3l14 14" strokeLinecap="round" />
    <path d="M1 10s4-6 9-6c1.5 0 2.9.4 4.1 1.1M19 10s-4 6-9 6c-1.5 0-2.9-.4-4.1-1.1" />
  </svg>
);
// import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";


// type SignupSearch = { ref?: string };
// export const Route = createFileRoute("/signup")({
//   validateSearch: (search: Record<string, unknown>): SignupSearch => ({
//     ref: typeof search.ref === "string" ? search.ref : undefined,
//   }),
//   component: SignupForm,
//   head: () => ({
//     meta: [
//       { title: "Join SkillWrap — Trade skills, earn rewards" },
//       {
//         name: "description",
//         content:
//           "Create your SkillWrap account and join a futuristic creator economy where skills become currency.",
//       },
//     ],
//   }),
// });
function SignupForm() {
  // const navigate = useNavigate();
  const router = useRouter();
  // const search = useSearch({ from: "/signup" });
  const searchParams = useSearchParams();
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const ref = searchParams.get("ref");

useEffect(() => {
if (ref) {
setReferralCode(ref);
}
}, [ref]);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
setError("");

if (password !== confirmPassword) {
setError("Passwords do not match");
return;
}

    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/auth/signup?ref=${referralCode || ""}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullname, username, email, password }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }
      const res2 = await fetch(`${API_URL}/send-verification-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data2 = await res2.json();
      if (!res2.ok) {
        setError(
          data2.error ||
            "We couldn't send the verification code. Please try again.",
        );
        return;
      }
      router.push("/verify-email");
      // navigate({ to: "/verify-email", search: { email } as never });
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleOauthGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden sw-bg p-4 sm:p-8">
      {/* Animated background layers */}
      <div className="absolute inset-0 sw-grid pointer-events-none" />
      <div
        className="sw-orb sw-float-slow"
        style={{
          width: 420,
          height: 420,
          top: "-120px",
          left: "-100px",
          background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)",
        }}
      />
      <div
        className="sw-orb sw-float"
        style={{
          width: 360,
          height: 360,
          bottom: "-120px",
          right: "-80px",
          background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
        }}
      />
      <div
        className="sw-orb sw-float-slow"
        style={{
          width: 260,
          height: 260,
          top: "40%",
          right: "20%",
          background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          opacity: 0.35,
        }}
      />
      <div className="relative w-full max-w-5xl grid lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-10 items-center">
        {/* Brand / pitch side */}
        <aside className="hidden lg:flex flex-col gap-8 text-white p-6 sw-rise">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 grid place-items-center shadow-[0_0_30px_-5px_rgba(34,211,238,0.6)]">
              <span className="text-lg font-black text-slate-950">S</span>
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-cyan-300 sw-pulse-dot" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
                SkillWrap
              </p>
              <p className="text-sm text-white/70">Creator economy, unlocked</p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
              Trade your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300">
                skills
              </span>
              . Earn while you learn.
            </h2>
            <p className="text-white/70 text-lg max-w-md">
              Join a futuristic marketplace where creators swap knowledge,
              build reputation, and turn talent into recurring income.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 max-w-md">
            {[
              { k: "42k+", v: "Creators" },
              { k: "$1.2M", v: "Paid out" },
              { k: "180+", v: "Countries" },
            ].map((s) => (
              <div
                key={s.v}
                className="sw-glass rounded-2xl p-4 text-center sw-rise"
              >
                <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-indigo-300">
                  {s.k}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-white/60 mt-1">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
          <div className="sw-glass rounded-2xl p-4 flex items-center gap-3 max-w-md">
            <div className="flex -space-x-2">
              {["#22d3ee", "#6366f1", "#a78bfa"].map((c, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-slate-900"
                  style={{
                    background: `linear-gradient(135deg, ${c}, #0ea5e9)`,
                  }}
                />
              ))}
            </div>
            <div className="flex-1 text-sm text-white/80">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 mr-2 sw-pulse-dot" />
              <span className="font-medium">Maya</span> just earned{" "}
              <span className="text-cyan-300 font-semibold">$84</span> teaching
              UI motion
            </div>
          </div>
        </aside>
        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="sw-glass rounded-3xl p-7 sm:p-9 text-white space-y-5 sw-rise sw-delay-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-sky-300">
                Create your account
              </h1>
              <p className="text-sm text-white/60 mt-1">
                Start earning from your skills in minutes.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-2 text-[11px] uppercase tracking-wider text-cyan-300/90 sw-glass rounded-full px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 sw-pulse-dot" />
              Beta access
            </span>
          </div>
          {error && (
            <div className="sw-rise text-sm rounded-xl border border-red-400/30 bg-red-500/10 text-red-200 px-4 py-2.5">
              {error}
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name" value={fullname} onChange={setFullname} />
            <Field label="Username" value={username} onChange={setUsername} />
            <Field
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <Field
              label="Referral code"
              value={referralCode}
              onChange={setReferralCode}
              placeholder="Optional"
              optional
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <PasswordField
              label="Password"
              value={password}
              show={showPassword}
              onChange={setPassword}
              toggleShow={() => setShowPassword(!showPassword)}
            />
            <PasswordField
              label="Confirm password"
              value={confirmPassword}
              show={showPassword}
              onChange={setConfirmPassword}
              toggleShow={() => setShowPassword(!showPassword)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="sw-cta w-full py-3.5 rounded-2xl font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Creating your space…
              </>
            ) : (
              <>
                Join SkillWrap
                <span aria-hidden>→</span>
              </>
            )}
          </button>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/15" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-white/50">
              or
            </span>
            <div className="flex-1 h-px bg-white/15" />
          </div>
          <button
            type="button"
            onClick={handleOauthGoogle}
            className="group w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-white/95 text-slate-800 font-semibold shadow-lg hover:bg-white transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(255,255,255,0.25)]"
          >
            <GoogleIcon />
            Continue with Google
          </button>
          <div className="flex items-center justify-between text-xs text-white/55 pt-1">
            <div className="flex items-center gap-2">
              <ShieldIcon />
              End-to-end encrypted
            </div>
            <div className="flex items-center gap-2">
              <BoltIcon />
              Instant payouts
            </div>
          </div>
          <p className="text-center text-sm text-white/70">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-cyan-300 hover:text-cyan-200 font-medium underline-offset-4 hover:underline"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
/* ===== Fields ===== */
function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  optional = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  optional?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-white/70 mb-1.5 flex items-center gap-2">
        {label}
        {optional && (
          <span className="text-[10px] uppercase tracking-wider text-white/40">
            Optional
          </span>
        )}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={!optional}
        className="sw-input w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-white/35"
      />
    </label>
  );
}
function PasswordField({
  label,
  value,
  onChange,
  show,
  toggleShow,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  toggleShow: () => void;
}) {
  return (
    <label className="block relative">
      <span className="text-xs font-medium text-white/70 mb-1.5 block">
        {label}
      </span>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="sw-input w-full px-4 py-2.5 pr-11 rounded-xl text-sm text-white"
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-2.5 top-[34px] p-1.5 rounded-lg text-cyan-300/80 hover:text-cyan-200 hover:bg-white/5 transition"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </label>
  );
}
/* ===== Icons ===== */
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3C33.7 32.5 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.2-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.7 16.2 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.3 36 24 36 24 36c-5.2 0-9.6-3.5-11.3-8.3l-6.6 5.1C9.7 39.7 16.3 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-1.2 3.1-3.7 5.5-6.9 6.8l6.3 5.2C38.5 36.5 44 31 44 24c0-1.3-.1-2.2-.4-3.5z"
    />
  </svg>
);
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M1 10s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6Z" />
    <circle cx="10" cy="10" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 3l14 14" />
    <path d="M1 10s4-6 9-6c1.5 0 2.9.4 4.1 1.1M19 10s-4 6-9 6c-1.5 0-2.9-.4-4.1-1.1" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z" />
  </svg>
);
const BoltIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
  </svg>
);

export default SignupForm;
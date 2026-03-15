"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";

export default function SignupForm() {
  const router = useRouter();
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

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) setReferralCode(ref);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/signup?ref=${referralCode || ""}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

  
      // router.push("/login");

      
// sending verification otp
  const res2 = await fetch(`${API_URL}/send-verification-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

    const data2 = await res2.json();

    if (!res2.ok) {
      setError(
        data2.error ||
          "We couldn’t send the verification code. Please try again."
      );
  return;
}

router.push(`/verify-email?email=${email}`);


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
 <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl p-10 text-white space-y-6"
      >
        <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-6">
          Create Your Account
        </h1>

        {error && <p className="text-sm text-center text-red-400">{error}</p>}

        <div className="grid md:grid-cols-2 gap-6">
          <Input label="Full Name" value={fullname} onChange={setFullname} />
          <Input label="Username" value={username} onChange={setUsername} />
          <Input label="Email" type="email" value={email} onChange={setEmail} />
          <Input
            label="Referral Code"
            value={referralCode}
            onChange={setReferralCode}
            placeholder="Optional"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <PasswordInput
            label="Password"
            value={password}
            show={showPassword}
            onChange={setPassword}
            toggleShow={() => setShowPassword(!showPassword)}
          />
          <PasswordInput
            label="Confirm Password"
            value={confirmPassword}
            show={showPassword}
            onChange={setConfirmPassword}
            toggleShow={() => setShowPassword(!showPassword)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 disabled:opacity-50 transition"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <div className="flex items-center my-4 gap-4">
          <div className="flex-1 h-px bg-white/30" />
          <span className="text-sm text-white/70">OR</span>
          <div className="flex-1 h-px bg-white/30" />
        </div>

        <button
          type="button"
          onClick={handleOauthGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl 
                     bg-white text-gray-800 font-semibold shadow-lg hover:bg-gray-100 transition"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <p className="mt-4 text-center text-sm text-white/80">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

/* ===================== Input Component ===================== */
function Input({ label, value, onChange, type = "text", placeholder = "" }: any) {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={label !== "Referral Code"}
        className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
    </div>
  );
}

/* ===================== Password Input ===================== */
function PasswordInput({ label, value, onChange, show, toggleShow }: any) {
  return (
    <div className="relative mb-4 w-full">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-3 top-9 text-blue-300 hover:text-blue-400"
      >
        {show ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}

/* ===================== Icons ===================== */
const GoogleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.5 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.2-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.2 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.3 36 24 36 24 36c-5.2 0-9.6-3.5-11.3-8.3l-6.6 5.1C9.7 39.7 16.3 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.2 3.1-3.7 5.5-6.9 6.8l6.3 5.2C38.5 36.5 44 31 44 24c0-1.3-.1-2.2-.4-3.5z"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 10s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6Z" />
    <circle cx="10" cy="10" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3l14 14" />
    <path d="M1 10s4-6 9-6c1.5 0 2.9.4 4.1 1.1M19 10s-4 6-9 6c-1.5 0-2.9-.4-4.1-1.1" />
  </svg>
);

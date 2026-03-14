"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_URL = "https://skillwrap-backend.onrender.com";

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

      router.push("/login");
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
      {/* your existing form JSX stays exactly the same */}
    </div>
  );
}
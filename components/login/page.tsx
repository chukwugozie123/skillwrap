"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface FormState {
  message: string;
  error?: string;
  success?: boolean;
}

async function FormSubmit(prevState: FormState, formData: FormData) {
  const data = Object.fromEntries(formData.entries()) as {
    emailOrUsername: string;
    password: string;
  };

  const res = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // 🔑 sends + saves the session cookie
    body: JSON.stringify(data),
  });

  return res.json();
}

function LoginForm() {
  const [state, formAction] = useFormState<FormState>(FormSubmit, { message: "" });
  const { pending } = useFormStatus();
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    }
  }, [state, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
      <form
        action={formAction}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-8 text-white animate-fadeIn"
      >
        <h1 className="text-center text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Login to Your Account
        </h1>

        {(state?.message || state?.error) && (
          <div
            className={`mb-4 text-mb text-center ${
              state.error ? "text-red-400" : "text-green-400"
            }`}
          >
            {state.error || state.message}
          </div>
        )}

        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Email / Username</label>
          <input
            type="text"
            name="emailOrUsername"
            placeholder="Enter your email or username"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center justify-between text-sm mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded bg-white/20 border-white/30" />
            Remember me
          </label>
          <a href="#" className="hover:text-blue-400 transition">
            Forgot password?
          </a>
        </div>

        <button
          aria-disabled={pending}
          type="submit"
          disabled={pending}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md hover:shadow-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center my-6 text-white/60">
          <div className="flex-grow border-t border-white/30"></div>
          <span className="px-2 text-sm">or</span>
          <div className="flex-grow border-t border-white/30"></div>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl 
                             bg-gradient-to-r from-red-500 via-pink-600 to-black text-white font-semibold 
                             shadow-md hover:scale-[1.03] hover:shadow-pink-500/40 transition">
            <i className="bx bxl-google text-xl"></i> Sign up with Google
          </button>

          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl 
                             bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white font-semibold 
                             shadow-md hover:scale-[1.03] hover:shadow-gray-500/40 transition">
            <i className="bx bxl-github text-xl"></i> Sign up with GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-white/80">
          Don’t have an account?{" "}
          <a href="/sign" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return <LoginForm />;
}

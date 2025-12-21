"use client";


import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { useState, useEffect} from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

async function FormSubmit(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const res = await fetch("http://localhost:5000/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

function SignupForm() {
  const [state, formAction] = useFormState(FormSubmit, { message: "" });
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter()
    
  
    useEffect(()=>{
      if (state?.success) {
       router.push("/dashboard") 
      }
    }, [state, router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-12 animate-fadeIn scale-95 hover:scale-100 transition-transform duration-500">
        
        {/* Title */}
        <h1 className="text-center text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Create Your Account
        </h1>

        {/* Alert Messages */}
        {(state?.message || state?.error) && (
          <div
            className={`mb-4 text-center text-sm font-semibold ${
              state.error ? "text-red-400" : "text-green-400"
            }`}
          >
            {state.error || state.message}
          </div>
        )}

        {/* Form */}
        <form action={formAction} method="post" className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              required
              className="w-full rounded-xl bg-white/10 border border-white/20 text-white px-4 py-3 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-white/50"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter your full name"
              required
              className="w-full rounded-xl bg-white/10 border border-white/20 text-white px-4 py-3 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-white/50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-xl bg-white/10 border border-white/20 text-white px-4 py-3 
                         focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-white/50"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-white/80 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              required
              minLength={6}
              className="w-full rounded-xl bg-white/10 border border-white/20 text-white px-4 py-3 pr-10
                         focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-white/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-11 text-white/70 hover:text-yellow-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit */}
          <button
            aria-disabled={pending}
            type="submit"
            disabled={pending}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 
                       shadow-md hover:shadow-lg hover:scale-[1.02] transition 
                       disabled:opacity-50 disabled:cursor-not-allowed text-white"
          >
            {pending ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <hr className="flex-grow border-white/20" />
          <span className="mx-4 text-white/60 text-sm font-medium">OR</span>
          <hr className="flex-grow border-white/20" />
        </div>

        {/* Social logins */}
        <div className="space-y-3">
          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl 
                       bg-gradient-to-r from-red-500 via-pink-600 to-black text-white font-semibold 
                       shadow-md hover:scale-[1.03] hover:shadow-pink-500/40 transition"
          >
            <i className="bx bxl-google text-xl"></i> Sign up with Google
          </button>

          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl 
                       bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white font-semibold 
                       shadow-md hover:scale-[1.03] hover:shadow-gray-500/40 transition"
          >
            <i className="bx bxl-github text-xl"></i> Sign up with GitHub
          </button>
        </div>

        {/* Login link */}
        <p className="mt-8 text-center text-sm text-white/80">
          Already have an account?{" "}
          <Link href="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return <SignupForm />;
}

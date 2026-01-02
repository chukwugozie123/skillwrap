// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const SignupPage = () => {
//   const [fullname, setFullname] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(`${API_URL}/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fullname,
//           username,
//           email,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.error || "An error occurred, please try again.");
//         return;
//       }

//       router.push("/dashboard");
//     } catch {
//       setError("Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-indigo-800 px-4">
//       <div className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md">
//         <h1 className="text-3xl font-semibold text-white mb-6 text-center">
//           Create Account
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={fullname}
//             onChange={(e) => setFullname(e.target.value)}
//             required
//             className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60"
//           />

//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60"
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60"
//           />

//           {error && (
//             <p className="text-red-400 text-sm text-center">
//               {error}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-500 disabled:opacity-50"
//           >
//             {loading ? "Signing up..." : "Sign Up"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;










"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const API_URL = 'https://skillwrap-backend.onrender.com';

    // const API_URL= 'http://localhost:5000'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] to-[#020024] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-8">

        {/* TOP TEXT */}
        <h1 className="text-3xl font-bold text-white text-center">
          Create your account
        </h1>
        <p className="text-blue-200/70 text-sm text-center mt-2 mb-8">
          Start building, learning, and growing with SkillWrap
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          <Input label="Full Name" value={fullname} onChange={setFullname} />
          <Input label="Username" value={username} onChange={setUsername} />
          <Input label="Email" type="email" value={email} onChange={setEmail} />

          {/* PASSWORD */}
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={setPassword}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-blue-300 hover:text-blue-400"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <Input
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold
              hover:bg-blue-500 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

/* ================= INPUT ================= */

const Input = ({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) => (
  <div className="relative">
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="peer w-full rounded-lg bg-white/10 px-4 py-3 text-white
        border border-white/10 outline-none focus:ring-2 focus:ring-blue-600/50"
    />
    <label
      className="absolute left-4 top-3 text-sm text-blue-200/60
        peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-400
        peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-xs
        transition-all"
    >
      {label}
    </label>
  </div>
);

/* ================= ICONS ================= */

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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";

export default function SignupPage() {
  const router = useRouter();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

       router.push(`/login`);

//     // sending verification otp
//     const res2 = await fetch(`${API_URL}/send-verification-otp`, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ email }),
// });

// const data2 = await res2.json();

// if (!res2.ok) {
//   setError(
//     data2.error ||
//     "We couldn’t send the verification code. Please try again."
//   );
//   return;
// }

      // router.push(`/verify-email?email=${email}`);

    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ✅ OAUTH MUST REDIRECT */
  function handleOauthGoogle() {
    window.location.href = `${API_URL}/auth/google`;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-8 text-white"
      >
        <h1 className="text-center text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Create Your Account
        </h1>

        {error && (
          <p className="mb-4 text-sm text-center text-red-400">
            {error}
          </p>
        )}

        <Input label="Full Name" value={fullname} onChange={setFullname} />
        <Input label="Username" value={username} onChange={setUsername} />
        <Input label="Email" type="email" value={email} onChange={setEmail} />

        {/* PASSWORD */}
        <div className="relative mb-5">
          <label className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-blue-300 hover:text-blue-400"
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

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 disabled:opacity-50 transition"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* OR DIVIDER */}
        <div className="flex items-center my-6 gap-4">
          <div className="flex-1 h-px bg-white/30" />
          <span className="text-sm text-white/70">OR</span>
          <div className="flex-1 h-px bg-white/30" />
        </div>

        {/* GOOGLE BUTTON */}
        <button
          type="button"
          onClick={handleOauthGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl 
                     bg-white text-gray-800 font-semibold shadow-lg 
                     hover:bg-gray-100 transition"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-white/80">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

/* ================= INPUT ================= */

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
    </div>
  );
}

/* ================= ICONS ================= */

const GoogleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48">
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







// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const API_URL = "https://skillwrap-backend.onrender.com";
// // const API_URL = "http://localhost:5000";

// export default function SignupPage() {
//   const router = useRouter();

//   const [fullname, setFullname] = useState("");
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(`${API_URL}/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fullname,
//           username,
//           email,
//           password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Signup failed");
//         return;
//       }

//       router.push("/login");
//     } catch {
//       setError("Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   async function handleOuath() {
//     const res = await fetch(`${API_URL}/auth/google`, {
//       credentials: 'include'
//     })

    
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-8 text-white"
//       >
//         <h1 className="text-center text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
//           Create Your Account
//         </h1>

//         {error && (
//           <p className="mb-4 text-sm text-center text-red-400">
//             {error}
//           </p>
//         )}

//         {/* FULL NAME */}
//         <Input
//           label="Full Name"
//           value={fullname}
//           onChange={setFullname}
//         />

//         {/* USERNAME */}
//         <Input
//           label="Username"
//           value={username}
//           onChange={setUsername}
//         />

//         {/* EMAIL */}
//         <Input
//           label="Email"
//           type="email"
//           value={email}
//           onChange={setEmail}
//         />

//         {/* PASSWORD */}
//         <div className="relative mb-5">
//           <label className="block text-sm font-medium mb-2">
//             Password
//           </label>
//           <input
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-9 text-blue-300 hover:text-blue-400"
//           >
//             {showPassword ? <EyeOffIcon /> : <EyeIcon />}
//           </button>
//         </div>

//         {/* CONFIRM PASSWORD */}
//         <Input
//           label="Confirm Password"
//           type={showPassword ? "text" : "password"}
//           value={confirmPassword}
//           onChange={setConfirmPassword}
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 disabled:opacity-50 transition"
//         >
//           {loading ? "Creating account..." : "Sign Up"}
//         </button>

//         OR

        
//         <button onClick={handleOuath}>Continue with Google</button>

//         {/* BOTTOM TEXT */}
//         <p className="mt-6 text-center text-sm text-white/80">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-400 hover:underline">
//             Login
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }

// /* ================= INPUT ================= */

// function Input({
//   label,
//   value,
//   onChange,
//   type = "text",
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
//   type?: string;
// }) {
//   return (
//     <div className="mb-5">
//       <label className="block text-sm font-medium mb-2">
//         {label}
//       </label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         required
//         className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
//       />
//     </div>
//   );
// }

// /* ================= ICONS ================= */

// const EyeIcon = () => (
//   <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M1 10s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6Z" />
//     <circle cx="10" cy="10" r="3" />
//   </svg>
// );

// const EyeOffIcon = () => (
//   <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M3 3l14 14" />
//     <path d="M1 10s4-6 9-6c1.5 0 2.9.4 4.1 1.1M19 10s-4 6-9 6c-1.5 0-2.9-.4-4.1-1.1" />
//   </svg>
// );

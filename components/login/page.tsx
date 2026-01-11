// "use client";

// import { useEffect, useActionState, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useFormStatus } from "react-dom";

// const API_URL = "https://skillwrap-backend.onrender.com";
// // const API_URL = "http://localhost:5000";

// interface FormState {
//   success?: boolean;
//   message?: string;
//   error?: string;
// }

// async function loginAction(
//   prevState: FormState,
//   formData: FormData
// ): Promise<FormState> {
//   const emailOrUsername = formData.get("emailOrUsername");
//   const password = formData.get("password");

//   if (!emailOrUsername || !password) {
//     return { error: "All fields are required" };
//   }

//   try {
//     const res = await fetch(`${API_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({
//         emailOrUsername,
//         password,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       return { error: data.error || "Invalid login" };
//     }

//     return {
//       success: true,
//       message: data.message,
//     };
//   } catch (err) {
//     console.error("Login error:", err);
//     return { error: "Server error. Please try again." };
//   }
// }

// function SubmitButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       type="submit"
//       disabled={pending}
//       className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 disabled:opacity-50 transition"
//     >
//       {pending ? "Logging in..." : "Login"}
//     </button>
//   );
// }

// export default function LoginPage() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);

//   const [state, formAction] = useActionState<FormState, FormData>(
//     loginAction,
//     {}
//   );

//   useEffect(() => {
//     if (state?.success) {
//       router.push("/dashboard");
//     }
//   }, [state, router]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
//       <form
//         action={formAction}
//         className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-8 text-white"
//       >
//         <h1 className="text-center text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
//           Login to Your Account
//         </h1>

//         {(state?.error || state?.message) && (
//           <div
//             className={`mb-4 text-sm text-center ${
//               state.error ? "text-red-400" : "text-green-400"
//             }`}
//           >
//             {state.error || state.message}
//           </div>
//         )}

//         {/* EMAIL / USERNAME */}
//         <div className="mb-5">
//           <label className="block text-sm font-medium mb-2">
//             Email / Username
//           </label>
//           <input
//             name="emailOrUsername"
//             required
//             className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
//           />
//         </div>

//         {/* PASSWORD WITH EYE ICON */}
//         <div className="mb-6 relative">
//           <label className="block text-sm font-medium mb-2">
//             Password
//           </label>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             required
//             className="w-full px-4 py-2 pr-12 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-9 text-blue-300 hover:text-blue-400"
//           >
//             {showPassword ? <EyeOffIcon /> : <EyeIcon />}
//           </button>
//         </div>

//         <SubmitButton />

//         <p className="mt-6 text-center text-sm text-white/80">
//           Don’t have an account?{" "}
//           <a href="/signup" className="text-blue-400 hover:underline">
//             Sign up
//           </a>
//         </p>
//       </form>
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






// // "use client";

// // import { useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import { useFormState, useFormStatus } from "react-dom";

// // interface FormState {
// //   message: string;
// //   error?: string;
// //   success?: boolean;
// // }

// // function LoginForm() {
// //   const router = useRouter();
// //   // const API_URL = process.env.NEXT_PUBLIC_API_URL;
// //  const API_URL= 'https://skillwrap-backend.onrender.com'

// //   const [state, formAction] = useFormState<FormState>(
// //     async (prevState) => {
// //       const form = document.querySelector("form") as HTMLFormElement;
// //       if (!form) return prevState;

// //       const formData = new FormData(form);
// //       const data = Object.fromEntries(formData.entries()) as {
// //         emailOrUsername: string;
// //         password: string;
// //       };

// //       try {
// //         const res = await fetch(`${API_URL}/auth/login`, {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           credentials: "include",
// //           body: JSON.stringify(data),
// //         });

// //         const json = await res.json();

// //         if (json.success) {
// //           return {
// //             ...prevState,
// //             success: true,
// //             message: json.message || "",
// //           };
// //         }

// //         return {
// //           ...prevState,
// //           success: false,
// //           error: json.message || "Login failed",
// //         };
// //       } catch {
// //         return {
// //           ...prevState,
// //           success: false,
// //           error: "Server error",
// //         };
// //       }
// //     },
// //     { message: "" }
// //   );

// //   const { pending } = useFormStatus();

// //   useEffect(() => {
// //     if (state?.success) {
// //       router.push("/dashboard");
// //     }
// //   }, [state, router]);

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
// //       <form
// //         action={formAction}
// //         className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-8 text-white"
// //       >
// //         <h1 className="text-center text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
// //           Login to Your Account
// //         </h1>

// //         {(state?.message || state?.error) && (
// //           <div
// //             className={`mb-4 text-sm text-center ${
// //               state.error ? "text-red-400" : "text-green-400"
// //             }`}
// //           >
// //             {state.error || state.message}
// //           </div>
// //         )}

// //         <div className="mb-5">
// //           <label className="block text-sm font-medium mb-2">
// //             Email / Username
// //           </label>
// //           <input
// //             type="text"
// //             name="emailOrUsername"
// //             required
// //             className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white"
// //           />
// //         </div>

// //         <div className="mb-5">
// //           <label className="block text-sm font-medium mb-2">
// //             Password
// //           </label>
// //           <input
// //             type="password"
// //             name="password"
// //             required
// //             className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white"
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           disabled={pending}
// //           className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 disabled:opacity-50"
// //         >
// //           {pending ? "Logging in..." : "Login"}
// //         </button>

// //         <p className="mt-6 text-center text-sm text-white/80">
// //           Don’t have an account?{" "}
// //           <a href="/sign" className="text-blue-400 hover:underline">
// //             Sign up
// //           </a>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // }

// // export default function LoginPage() {
// //   return <LoginForm />;
// // }




















"use client";

import { useEffect, useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

// const API_URL = "https://skillwrap-backend.onrender.com";
 const API_URL='http://localhost:5000'


interface FormState {
  success?: boolean;
  message?: string;
  error?: string;
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
      body: JSON.stringify({
        emailOrUsername,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || "Invalid login" };
    }

    return {
      success: true,
      message: data.message,
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
      className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 disabled:opacity-50 transition"
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction] = useActionState<FormState, FormData>(
    loginAction,
    {}
  );

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    }
  }, [state, router]);

  /* ✅ GOOGLE OAUTH REDIRECT */
  function handleGoogleLogin() {
    window.location.href = `${API_URL}/auth/google`;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
      <form
        action={formAction}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-8 text-white"
      >
        <h1 className="text-center text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Login to Your Account
        </h1>

        {(state?.error || state?.message) && (
          <div
            className={`mb-4 text-sm text-center ${
              state.error ? "text-red-400" : "text-green-400"
            }`}
          >
            {state.error || state.message}
          </div>
        )}

        {/* EMAIL / USERNAME */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">
            Email / Username
          </label>
          <input
            name="emailOrUsername"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            className="w-full px-4 py-2 pr-12 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-blue-300 hover:text-blue-400"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        <SubmitButton />

        {/* OR DIVIDER */}
        <div className="flex items-center my-6 gap-4">
          <div className="flex-1 h-px bg-white/30" />
          <span className="text-sm text-white/70">OR</span>
          <div className="flex-1 h-px bg-white/30" />
        </div>

        {/* GOOGLE LOGIN */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl 
                     bg-white text-gray-800 font-semibold shadow-lg 
                     hover:bg-gray-100 transition"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-white/80">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </form>
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

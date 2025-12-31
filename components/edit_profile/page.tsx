"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditProfile({ initialProfile }) {
  const [fullname, setFullname] = useState(initialProfile.fullname);
  const [username, setUsername] = useState(initialProfile.username);
  const [email, setEmail] = useState(initialProfile.email);
  const [message, setMessage] = useState("");

  
  const API_URL = process.env.NEXT_PUBLIC_API_URL 

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/edit-profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ fullname, username, email }),
      });

      const data = await res.json();


      if (res.ok) {
        setMessage("Profile updated!");
      } else {
        setMessage(data.error || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error — please try again");
    }
  }

        const router = useRouter()
              useEffect(()=>{
          if (message === "Profile updated!") {
           router.push("/profile") 
          }
        }, [message, router])


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#0f1e3a] to-[#0a0f1c] text-white relative overflow-hidden">
      {/* floating glow effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-cyan-500/30 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-tr from-fuchsia-500/30 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-300" />

      {/* main glass card */}
      <div className="relative w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-2xl bg-white/10 border border-white/10">
        {/* subtle lighting layer */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 blur-xl"></div>

        <h1 className="text-3xl font-semibold text-center text-cyan-100 mb-6 tracking-wide">
          Edit Profile
        </h1>

        {message && (
          <p
            className={`text-center mb-4 font-medium transition-all ${
              message.includes("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 relative z-10"
        >
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Full Name"
            className="p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300/50 outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.02] transition-all duration-200"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300/50 outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.02] transition-all duration-200"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300/50 outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.02] transition-all duration-200"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 hover:scale-[1.03] transition-all shadow-lg shadow-cyan-500/30"
          >
            Save Changes
          </button>
        </form>
        <Link href={"/dashboard"}><button>Go back</button></Link>
      </div>
    </div>
  );
}

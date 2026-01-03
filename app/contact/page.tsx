"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      router.push("/");
    }, 5000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-cyan-400 text-center">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
          />
          <input
            required
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20"
          />
          <textarea
            required
            placeholder="Your Message"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 h-32"
          />

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold">
            Send Message
          </button>
        </form>
      </div>

      {/* POPUP */}
      {submitted && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#0b1220] p-8 rounded-2xl text-center shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-green-400 mb-2">
              Message Sent ✅
            </h2>
            <p className="text-gray-300">
              Thanks for reaching out!  
              We’ll get back to you shortly.
            </p>
            <p className="text-sm text-gray-400 mt-3">
              Redirecting you to login...
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ContactPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      router.push("/");
    }, 4000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
        
        {/* LEFT SIDE - CONTACT INFO */}
        <div>
          <h1 className="text-4xl font-bold mb-6 text-cyan-400">
            Contact SkillWrap
          </h1>

          <p className="text-gray-300 mb-6">
            Have a question, collaboration idea, or feedback?  
            Reach out directly or send a message using the form.
          </p>

          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="font-semibold text-white">📞 Phone</h3>
              <a
                href="tel:+2348035728323"
                className="text-cyan-400 hover:underline"
              >
                +234 08035728323
              </a>
            </div>

            <div>
              <h3 className="font-semibold text-white">📧 Email</h3>
              <a
                href="mailto:umechefelix@gmail.com"
                className="text-cyan-400 hover:underline"
              >
                umechefelix@gmail.com
              </a>
            </div>

            <div>
              <h3 className="font-semibold text-white">🌐 Website</h3>
              <a
                href="https://skillwrap2026.vercel.app/"
                target="_blank"
                className="text-cyan-400 hover:underline"
              >
                skilllwrap2026.vercel.app
              </a>
            </div>
          </div>

          {/* OPTIONAL SOCIALS */}
          <div className="mt-8">
            <h3 className="font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex gap-4 text-gray-300">
              <a href="" className="hover:text-cyan-400">Twitter</a>
              <a href="#" className="hover:text-cyan-400">LinkedIn</a>
              <a href="#" className="hover:text-cyan-400">Instagram</a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-cyan-400"
            />
            <input
              required
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-cyan-400"
            />
            <textarea
              required
              placeholder="Your Message"
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 h-32 focus:outline-none focus:border-cyan-400"
            />

            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:opacity-90 transition">
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {submitted && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-[#0b1220] p-8 rounded-2xl text-center shadow-xl border border-white/20 max-w-md">
            <h2 className="text-2xl font-bold text-green-400 mb-2">
              Message Sent Successfully ✅
            </h2>
            <p className="text-gray-300">
              Thank you for contacting SkillWrap.  
              We’ll get back to you shortly.
            </p>
            <p className="text-sm text-gray-400 mt-3">
              Redirecting to homepage...
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

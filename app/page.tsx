// "use client";

// import Skills from "@/components/skill/page";
// import Hero from "@/components/hero/Hero";
// import Testimonial from "@/components/Testimonials/page";

// export default function Home() {
//   return (
//     <main className="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] backdrop-blur-3xl min-h-screen">
//       <Hero />
//       <Skills />
//       <Testimonial />
//     </main>
//   );
// }







"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  MessageCircle,
  CheckCircle,
  Crown,
  Sparkles,
  Users,
} from "lucide-react";
// import Hero from "./Hero";
// import Skills from "./Skills";
// import Testimonials from "./Testimonials";

import Skills from "@/components/skill/page";
import Hero from "@/components/hero/Hero";
import Testimonials from "@/components/Testimonials/page";
/* ───────────────────────────────────────────────────────── */
/* CTA SECTION                                                */
/* ───────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-20 py-24 border-t border-white/5 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70rem] h-[70rem] rounded-full bg-cyan-600/10 blur-[200px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative"
      >
        {/* Glow backdrop */}
        <div className="absolute inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/30 via-blue-600/30 to-purple-600/30 blur-3xl" />

        <div className="relative bg-[#0b0e1a]/80 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 lg:p-16 text-center overflow-hidden border border-white/10">
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-xs uppercase tracking-[0.15em] text-cyan-200 mb-6"
            >
              <Crown size={12} className="text-amber-400" />
              Join the movement
            </motion.div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Your next skill is{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                one swap away.
              </span>
            </h3>

            <p className="text-white/60 mt-6 max-w-xl mx-auto text-lg leading-relaxed">
              Join 48,000+ creators turning curiosity into momentum. It&apos;s free, it&apos;s friendly, it&apos;s the start of something big.
            </p>

            {/* Online users indicator */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                ].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#05060f] shadow-lg"
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 text-sm font-medium">2,847 online now</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all overflow-hidden"
              >
                <BookOpen size={18} />
                Join SkillWarp Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.a>

              <motion.a
                href="#testimonials"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-slate-200 font-semibold backdrop-blur-xl hover:border-white/20 transition-all"
              >
                <MessageCircle size={18} />
                See Community Stories
              </motion.a>
            </div>

            {/* Benefits */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
              <span className="flex items-center gap-2">
                <CheckCircle size={14} className="text-emerald-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle size={14} className="text-emerald-400" />
                Setup in 60 seconds
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle size={14} className="text-emerald-400" />
                Cancel anytime
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────── */
/* FOOTER                                                      */
/* ───────────────────────────────────────────────────────── */
// function Footer() {
//   return (
//     <footer className="relative border-t border-white/5 px-4 sm:px-6 lg:px-20 py-12">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 grid place-items-center shadow-lg shadow-cyan-500/30">
//               <Sparkles size={18} className="text-white" />
//             </div>
//             <span className="text-xl font-bold tracking-tight">SkillWarp</span>
//           </div>

//           {/* Links */}
//           <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
//             <a href="/about" className="hover:text-white transition">About</a>
//             <a href="/help" className="hover:text-white transition">Help Center</a>
//             <a href="#" className="hover:text-white transition">Privacy</a>
//             <a href="#" className="hover:text-white transition">Terms</a>
//           </div>

//           {/* Copyright */}
//           <div className="text-sm text-white/40">
//             &copy; 2025 SkillWarp. Made with{" "}
//             <span className="text-pink-400">love</span> for the global community.
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

/* ───────────────────────────────────────────────────────── */
/* MAIN HOME PAGE                                              */
/* ───────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#05060f] text-white overflow-hidden">
      <Hero />
      <Skills />
      <Testimonials />
      <CTASection />
      {/* <Footer /> */}
    </div>
  );
}

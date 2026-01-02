"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, MessageCircle, Layers } from "lucide-react";

export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f24] to-[#0d1b3a] text-white overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative w-full px-6 lg:px-20 py-32 flex flex-col items-center text-center">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-xl"
        >
          SkillWarp
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-3xl text-gray-300 text-lg md:text-xl leading-relaxed"
        >
          Unlock your potential. Exchange skills, collaborate with experts, and grow your network — all in one futuristic, modern platform designed for creators like you.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-12 flex flex-col sm:flex-row gap-5"
        >
          <Link href="/signup">
            <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-600/40 hover:scale-105 transition-all font-semibold flex items-center gap-2">
              Get Started <ArrowRight size={20} />
            </button>
          </Link>
          <Link href="/explore">
            <button className="px-10 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition font-semibold">
              Explore Skills
            </button>
          </Link>
        </motion.div>
      </section>

      {/* FEATURES / HOW IT WORKS */}
      <section className="px-6 lg:px-20 py-32">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
          How SkillWarp Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: <Sparkles className="text-blue-400 mb-4" size={36} />,
              title: "Create Your Profile",
              desc: "Sign up, showcase your skills, and let the community know what makes you unique.",
            },
            {
              icon: <Layers className="text-purple-400 mb-4" size={36} />,
              title: "Share & Exchange Skills",
              desc: "List your skills, explore others, and request collaborations to learn and grow together.",
            },
            {
              icon: <MessageCircle className="text-cyan-400 mb-4" size={36} />,
              title: "Chat & Collaborate",
              desc: "Connect directly with matched users and kickstart skill exchanges in real-time.",
            },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl flex flex-col items-start"
            >
              {step.icon}
              <h3 className="text-xl md:text-2xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300 text-sm md:text-base">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-6 lg:px-20 py-32 bg-gradient-to-t from-[#0d1b3a]/80 to-[#0a0f24]/80 backdrop-blur-xl border-t border-white/10">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
          Why Choose SkillWarp
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              icon: <Users className="text-green-400 mb-3" size={32} />,
              title: "Connect With Talent",
              desc: "Meet creatives, developers, mentors, and builders from around the world.",
            },
            {
              icon: <Sparkles className="text-yellow-300 mb-3" size={32} />,
              title: "Learn Without Paying",
              desc: "Exchange skills instead of money. Everyone grows together.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl flex flex-col items-start"
            >
              {item.icon}
              <h3 className="text-xl md:text-2xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm md:text-base">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="px-6 lg:px-20 py-32 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl lg:text-4xl font-bold mb-6"
        >
          Ready to Transform Your Skills?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-300 max-w-xl mx-auto mb-12 text-lg"
        >
          Join thousands of learners and creators exchanging skills every day. Start building connections and leveling up your talent now.
        </motion.p>
        <Link href="/signup">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-12 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-600/40 text-lg font-semibold transition"
          >
            Join SkillWarp
          </motion.button>
        </Link>
      </section>
    </div>
  );
}

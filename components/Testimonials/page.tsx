"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "John Carter",
    role: "Frontend Developer",
    message:
      "SkillWrap helped me exchange my React skills for UI/UX mentoring. The process was smooth, the chat feature is clean, and I actually learned faster than any course I’ve taken.",
  },
  {
    name: "Alex Morgan",
    role: "Graphic Designer",
    message:
      "Instead of paying for courses, I traded design skills for backend help. SkillWrap feels modern, secure, and community-driven. This is the future of learning.",
  },
  {
    name: "Sarah Kim",
    role: "Computer Science Student",
    message:
      "I used SkillWrap to collaborate with experienced developers while still in school. The exchange system is clear, fair, and really motivating.",
  },
];

export default function Testimonial() {
  return (
    <section className="relative py-28 bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#020617] overflow-hidden">
      {/* Ambient gradient glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-300" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent 
                     bg-gradient-to-r from-cyan-400 to-blue-500"
        >
          Trusted by Learners & Creators
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-2xl mx-auto mb-20 text-base md:text-lg"
        >
          Hear how people are growing, collaborating, and exchanging skills on{" "}
          <span className="text-cyan-400 font-semibold">SkillWrap</span>
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl 
                         border border-white/10 shadow-2xl hover:border-cyan-400/40 
                         transition-all duration-500 text-left"
            >
              {/* Quote */}
              <p className="text-gray-200 leading-relaxed mb-8 text-sm md:text-base">
                “{t.message}”
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full 
                             bg-gradient-to-br from-cyan-500 to-blue-600 
                             text-white font-bold text-lg shadow-lg"
                >
                  {t.name[0]}
                </div>

                <div>
                  <h4 className="font-semibold text-white text-lg">
                    {t.name}
                  </h4>
                  <span className="text-gray-400 text-sm">{t.role}</span>
                </div>
              </div>

              {/* Decorative gradient line */}
              <div className="absolute bottom-0 left-0 w-full h-1 rounded-b-3xl 
                              bg-gradient-to-r from-cyan-500 to-blue-600 opacity-60" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

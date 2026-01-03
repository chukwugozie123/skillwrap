// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ArrowRight, Sparkles, Users, MessageCircle, Layers } from "lucide-react";

// export default function Hero() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0a0f24] to-[#0d1b3a] text-white overflow-x-hidden">

//       {/* HERO SECTION */}
//       <section className="relative w-full px-6 lg:px-20 py-32 flex flex-col items-center text-center">
//         {/* Animated Heading */}
//         <motion.h1
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-xl"
//         >
//           SkillWarp
//         </motion.h1>

//         {/* Subtitle */}
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="mt-6 max-w-3xl text-gray-300 text-lg md:text-xl leading-relaxed"
//         >
//           Unlock your potential. Exchange skills, collaborate with experts, and grow your network — all in one futuristic, modern platform designed for creators like you.
//         </motion.p>

//         {/* Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.35 }}
//           className="mt-12 flex flex-col sm:flex-row gap-5"
//         >
//           <Link href="/signup">
//             <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-600/40 hover:scale-105 transition-all font-semibold flex items-center gap-2">
//               Get Started <ArrowRight size={20} />
//             </button>
//           </Link>
//           <Link href="/explore">
//             <button className="px-10 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition font-semibold">
//               Explore Skills
//             </button>
//           </Link>
//         </motion.div>
//       </section>

//       {/* FEATURES / HOW IT WORKS */}
//       <section className="px-6 lg:px-20 py-32">
//         <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
//           How SkillWarp Works
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//           {[
//             {
//               icon: <Sparkles className="text-blue-400 mb-4" size={36} />,
//               title: "Create Your Profile",
//               desc: "Sign up, showcase your skills, and let the community know what makes you unique.",
//             },
//             {
//               icon: <Layers className="text-purple-400 mb-4" size={36} />,
//               title: "Share & Exchange Skills",
//               desc: "List your skills, explore others, and request collaborations to learn and grow together.",
//             },
//             {
//               icon: <MessageCircle className="text-cyan-400 mb-4" size={36} />,
//               title: "Chat & Collaborate",
//               desc: "Connect directly with matched users and kickstart skill exchanges in real-time.",
//             },
//           ].map((step, idx) => (
//             <motion.div
//               key={idx}
//               whileHover={{ scale: 1.05 }}
//               className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl flex flex-col items-start"
//             >
//               {step.icon}
//               <h3 className="text-xl md:text-2xl font-semibold mb-2">{step.title}</h3>
//               <p className="text-gray-300 text-sm md:text-base">{step.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* WHY CHOOSE US */}
//       <section className="px-6 lg:px-20 py-32 bg-gradient-to-t from-[#0d1b3a]/80 to-[#0a0f24]/80 backdrop-blur-xl border-t border-white/10">
//         <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
//           Why Choose SkillWarp
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           {[
//             {
//               icon: <Users className="text-green-400 mb-3" size={32} />,
//               title: "Connect With Talent",
//               desc: "Meet creatives, developers, mentors, and builders from around the world.",
//             },
//             {
//               icon: <Sparkles className="text-yellow-300 mb-3" size={32} />,
//               title: "Learn Without Paying",
//               desc: "Exchange skills instead of money. Everyone grows together.",
//             },
//           ].map((item, idx) => (
//             <motion.div
//               key={idx}
//               whileHover={{ scale: 1.03 }}
//               className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl flex flex-col items-start"
//             >
//               {item.icon}
//               <h3 className="text-xl md:text-2xl font-semibold mb-2">{item.title}</h3>
//               <p className="text-gray-300 text-sm md:text-base">{item.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* CALL TO ACTION */}
//       <section className="px-6 lg:px-20 py-32 text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-3xl lg:text-4xl font-bold mb-6"
//         >
//           Ready to Transform Your Skills?
//         </motion.h2>
//         <motion.p
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-gray-300 max-w-xl mx-auto mb-12 text-lg"
//         >
//           Join thousands of learners and creators exchanging skills every day. Start building connections and leveling up your talent now.
//         </motion.p>
//         <Link href="/signup">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             className="px-12 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-600/40 text-lg font-semibold transition"
//           >
//             Join SkillWarp
//           </motion.button>
//         </Link>
//       </section>
//     </div>
//   );
// }






"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Users,
  MessageCircle,
  Layers,
  Rocket,
} from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#070b1e] via-[#0b1635] to-[#050814] text-white">

      {/* 🔮 BACKGROUND GLOWS */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />

      {/* ================= HERO ================= */}
      <section className="relative z-10 px-6 lg:px-20 pt-32 pb-28 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full 
                     bg-white/10 border border-white/20 text-sm text-cyan-300"
        >
          <Sparkles size={16} />
          Skill Exchange • Learn Without Limits
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold 
                     bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 
                     bg-clip-text text-transparent drop-shadow-lg"
        >
          SkillWrap
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-3xl text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed"
        >
          Exchange skills instead of money.  
          Learn faster, collaborate smarter, and grow with creators,
          developers, and professionals worldwide.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/signup">
            <button
              className="w-full sm:w-auto px-10 py-4 rounded-2xl 
                         bg-gradient-to-r from-cyan-500 to-blue-600
                         shadow-xl shadow-cyan-500/30 
                         hover:scale-105 transition font-semibold
                         flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight size={20} />
            </button>
          </Link>

          <Link href="/skills">
            <button
              className="w-full sm:w-auto px-10 py-4 rounded-2xl 
                         border border-white/20 bg-white/5 
                         hover:bg-white/10 transition font-semibold"
            >
              Explore Skills
            </button>
          </Link>
        </motion.div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="relative z-10 px-6 lg:px-20 py-28">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
          How SkillWrap Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <Rocket className="text-cyan-400" size={36} />,
              title: "Create Your Profile",
              desc: "Sign up, add your skills, and tell the community what you want to learn.",
            },
            {
              icon: <Layers className="text-blue-400" size={36} />,
              title: "Request Skill Exchange",
              desc: "Browse skills, send exchange requests, and wait for acceptance.",
            },
            {
              icon: <MessageCircle className="text-purple-400" size={36} />,
              title: "Chat & Learn",
              desc: "Once accepted, copy your room code and start chatting instantly.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.04 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 
                         backdrop-blur-xl shadow-xl"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= WHY SKILLWRAPP ================= */}
      <section className="relative z-10 px-6 lg:px-20 py-28 
                          bg-gradient-to-t from-[#070b1e] to-[#0b1635] 
                          border-t border-white/10">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-14">
          Why Choose SkillWrap?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {[
            {
              icon: <Users className="text-green-400" size={32} />,
              title: "Global Talent Network",
              desc: "Connect with skilled people from all over the world.",
            },
            {
              icon: <Sparkles className="text-yellow-400" size={32} />,
              title: "No Payments. Pure Growth.",
              desc: "Exchange knowledge instead of money. Everyone wins.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 
                         backdrop-blur-xl shadow-xl"
            >
              <div className="mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative z-10 px-6 lg:px-20 py-28 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl lg:text-4xl font-bold mb-6"
        >
          Start Exchanging Skills Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-300 max-w-xl mx-auto mb-10 text-lg"
        >
          Join SkillWrapp and unlock learning through collaboration,
          connection, and real-world experience.
        </motion.p>

        <Link href="/signup">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-12 py-5 rounded-2xl 
                       bg-gradient-to-r from-cyan-500 to-blue-600
                       shadow-xl shadow-cyan-500/30
                       text-lg font-semibold"
          >
            Join SkillWrap 🚀
          </motion.button>
        </Link>
      </section>
    </div>
  );
}

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
  Brain,
  Compass,
  ShieldCheck,
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
          Skill Exchange • AI-Guided • Community-Powered
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
          Learn faster through real people, guided by smart AI tools that help
          you choose what to learn and how to grow.
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
              desc: "Sign up, list the skills you can offer, and what you want to learn.",
            },
            {
              icon: <Layers className="text-blue-400" size={36} />,
              title: "Request Skill Exchange",
              desc: "Browse skills, send exchange requests, and get matched.",
            },
            {
              icon: <MessageCircle className="text-purple-400" size={36} />,
              title: "Chat & Learn",
              desc: "Once accepted, enter a private room and start learning instantly.",
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

      {/* ================= AI + SMART FEATURES ================= */}
      <section className="relative z-10 px-6 lg:px-20 py-28 
                          bg-gradient-to-t from-[#070b1e] to-[#0b1635] 
                          border-t border-white/10">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-14">
          Smart Features That Power SkillWrap
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <Feature
            icon={<Brain className="text-purple-400" size={32} />}
            title="AI Skill Roadmaps"
            desc="Breaks any skill into beginner, intermediate, and advanced learning paths."
          />
          <Feature
            icon={<Compass className="text-cyan-400" size={32} />}
            title="Skill Direction Guidance"
            desc="Helps users decide what skill to learn next based on goals and interests."
          />
          <Feature
            icon={<Users className="text-green-400" size={32} />}
            title="Community Matching"
            desc="Connect with people whose skills and learning goals align with yours."
          />
          <Feature
            icon={<MessageCircle className="text-blue-400" size={32} />}
            title="Private Learning Rooms"
            desc="Focused chat spaces created only after both users agree to exchange."
          />
          <Feature
            icon={<ShieldCheck className="text-yellow-400" size={32} />}
            title="Trust & Safety"
            desc="Clear rules, respectful exchanges, and protection against spam or abuse."
          />
          <Feature
            icon={<Sparkles className="text-pink-400" size={32} />}
            title="Always Growing"
            desc="New tools, AI enhancements, and community features added continuously."
          />
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
          SkillWrap helps you learn through people, guided by smart systems,
          and powered by collaboration — not money.
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

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="p-8 rounded-3xl bg-white/5 border border-white/10 
                 backdrop-blur-xl shadow-xl"
    >
      <div className="mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
















// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   ArrowRight,
//   Sparkles,
//   Users,
//   MessageCircle,
//   Layers,
//   Rocket,
// } from "lucide-react";

// export default function Hero() {
//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#070b1e] via-[#0b1635] to-[#050814] text-white">

//       {/* 🔮 BACKGROUND GLOWS */}
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />
//       <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
//       <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />

//       {/* ================= HERO ================= */}
//       <section className="relative z-10 px-6 lg:px-20 pt-32 pb-28 flex flex-col items-center text-center">

//         {/* Badge */}
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full 
//                      bg-white/10 border border-white/20 text-sm text-cyan-300"
//         >
//           <Sparkles size={16} />
//           Skill Exchange • Learn Without Limits
//         </motion.div>

//         {/* Title */}
//         <motion.h1
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-5xl sm:text-6xl lg:text-7xl font-extrabold 
//                      bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 
//                      bg-clip-text text-transparent drop-shadow-lg"
//         >
//           SkillWrap
//         </motion.h1>

//         {/* Subtitle */}
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="mt-6 max-w-3xl text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed"
//         >
//           Exchange skills instead of money.  
//           Learn faster, collaborate smarter, and grow with creators,
//           developers, and professionals worldwide.
//         </motion.p>

//         {/* CTA Buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.35 }}
//           className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
//         >
//           <Link href="/signup">
//             <button
//               className="w-full sm:w-auto px-10 py-4 rounded-2xl 
//                          bg-gradient-to-r from-cyan-500 to-blue-600
//                          shadow-xl shadow-cyan-500/30 
//                          hover:scale-105 transition font-semibold
//                          flex items-center justify-center gap-2"
//             >
//               Get Started <ArrowRight size={20} />
//             </button>
//           </Link>

//           <Link href="/skills">
//             <button
//               className="w-full sm:w-auto px-10 py-4 rounded-2xl 
//                          border border-white/20 bg-white/5 
//                          hover:bg-white/10 transition font-semibold"
//             >
//               Explore Skills
//             </button>
//           </Link>
//         </motion.div>
//       </section>

//       {/* ================= HOW IT WORKS ================= */}
//       <section className="relative z-10 px-6 lg:px-20 py-28">
//         <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
//           How SkillWrap Works
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           {[
//             {
//               icon: <Rocket className="text-cyan-400" size={36} />,
//               title: "Create Your Profile",
//               desc: "Sign up, add your skills, and tell the community what you want to learn.",
//             },
//             {
//               icon: <Layers className="text-blue-400" size={36} />,
//               title: "Request Skill Exchange",
//               desc: "Browse skills, send exchange requests, and wait for acceptance.",
//             },
//             {
//               icon: <MessageCircle className="text-purple-400" size={36} />,
//               title: "Chat & Learn",
//               desc: "Once accepted, copy your room code and start chatting instantly.",
//             },
//           ].map((step, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ y: -6, scale: 1.04 }}
//               className="p-8 rounded-3xl bg-white/5 border border-white/10 
//                          backdrop-blur-xl shadow-xl"
//             >
//               <div className="mb-4">{step.icon}</div>
//               <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
//               <p className="text-gray-300 text-sm leading-relaxed">
//                 {step.desc}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* ================= WHY SKILLWRAPP ================= */}
//       <section className="relative z-10 px-6 lg:px-20 py-28 
//                           bg-gradient-to-t from-[#070b1e] to-[#0b1635] 
//                           border-t border-white/10">
//         <h2 className="text-3xl lg:text-4xl font-bold text-center mb-14">
//           Why Choose SkillWrap?
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
//           {[
//             {
//               icon: <Users className="text-green-400" size={32} />,
//               title: "Global Talent Network",
//               desc: "Connect with skilled people from all over the world.",
//             },
//             {
//               icon: <Sparkles className="text-yellow-400" size={32} />,
//               title: "No Payments. Pure Growth.",
//               desc: "Exchange knowledge instead of money. Everyone wins.",
//             },
//           ].map((item, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.03 }}
//               className="p-8 rounded-3xl bg-white/5 border border-white/10 
//                          backdrop-blur-xl shadow-xl"
//             >
//               <div className="mb-3">{item.icon}</div>
//               <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//               <p className="text-gray-300 text-sm leading-relaxed">
//                 {item.desc}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* ================= FINAL CTA ================= */}
//       <section className="relative z-10 px-6 lg:px-20 py-28 text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-3xl lg:text-4xl font-bold mb-6"
//         >
//           Start Exchanging Skills Today
//         </motion.h2>

//         <motion.p
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-gray-300 max-w-xl mx-auto mb-10 text-lg"
//         >
//           Join SkillWrapp and unlock learning through collaboration,
//           connection, and real-world experience.
//         </motion.p>

//         <Link href="/signup">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             className="px-12 py-5 rounded-2xl 
//                        bg-gradient-to-r from-cyan-500 to-blue-600
//                        shadow-xl shadow-cyan-500/30
//                        text-lg font-semibold"
//           >
//             Join SkillWrap 🚀
//           </motion.button>
//         </Link>
//       </section>
//     </div>
//   );
// }

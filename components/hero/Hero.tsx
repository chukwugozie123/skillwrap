// "use client";

// import { useEffect, useRef } from "react";

// export default function SplineScene() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Load the Spline web component dynamically
//     const script = document.createElement("script");
//     script.type = "module";
//     script.src =
//       "https://unpkg.com/@splinetool/viewer@1.10.90/build/spline-viewer.js";
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   useEffect(() => {
//     const observer = new MutationObserver(() => {
//       const viewer = containerRef.current?.querySelector("spline-viewer") as any;
//       if (viewer) {
//         // Disable camera controls (makes scene static)
//         viewer.setAttribute("interaction", "none");

//         // Remove Spline watermark
//         const watermark = viewer.shadowRoot?.querySelector("a");
//         if (watermark) watermark.style.display = "none";
//       }
//     });

//     if (containerRef.current) {
//       observer.observe(containerRef.current, { childList: true, subtree: true });
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//   ref={containerRef}
//   className="relative w-full h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]"
// >
//   {/* Spline Scene */}
//   <spline-viewer
//     url="https://prod.spline.design/C5b-gByRcpXfthsF/scene.splinecode"
//     style={{
//       width: "100%",
//       height: "100%",
//       border: "none",
//     }}
//   ></spline-viewer>

//   {/* Optional title overlay (still visible, not blurry) */}
//   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/90 text-sm font-medium tracking-wide z-20 bg-black/40 px-4 py-1 rounded-full shadow-lg backdrop-blur-sm">
//     SkillWrap 3D Scene
//   </div>
// </div>

//   );
// }


// // // components/hero/Hero.tsx
// // import Image from "next/image";
// // import Link from "next/link";

// // export default function Hero() {
// //   return (
// //     <section className="relative flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-12 py-20 gap-12">
      
// //       {/* Glassmorphic Background */}
// //         <div className="  bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] backdrop-blur-3xl"></div>
// //       <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900/40 via-purple-800/30 to-sky-700/30 backdrop-blur-3xl"></div>

// //       {/* Left Content */}
// //       <div className="flex-1 text-center md:text-left space-y-6">
// //         <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
// //           Welcome to{" "}
// //           <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 animate-gradient-x">
// //             Skill Wrap
// //           </span>
// //         </h1>
// //         <p className="text-gray-300 text-lg md:text-xl max-w-lg mx-auto md:mx-0">
// //           Showcase, exchange, and manage your skills with ease.  
// //           Designed for freelancers, students, and professionals who want to grow 🚀
// //         </p>
// //         <Link
// //           href="/dashboard"
// //           className="inline-block px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-semibold text-lg shadow-lg hover:scale-105 hover:bg-white/20 transition-all duration-300"
// //         >
// //           🚀 Get Started
// //         </Link>
// //       </div>

// //       {/* Right Image */}
// //       <div className="flex-1 flex justify-center">
// //         <div className="relative group transform hover:scale-105 transition duration-500">
// //           <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-3xl opacity-40 group-hover:opacity-70 transition"></div>
// //           <Image
// //             src="/images/testing.png"
// //             alt="Skill showcase"
// //             width={500}
// //             height={400}
// //             className="relative rounded-2xl shadow-2xl border border-white/10"
// //           />
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
























// // // "use client";

// // // import { motion } from "framer-motion";
// // // import Link from "next/link";
// // // import { Globe, Laptop, Smartphone, Lightbulb } from "lucide-react";

// // // export default function Hero() {
// // //   return (
// // //     <section className="relative flex flex-col md:flex-row items-center justify-between min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-10 md:px-20 overflow-hidden">
      
// // //       {/* LEFT SIDE — Text Content */}
// // //       <div className="w-full md:w-1/2 text-center md:text-left space-y-6 z-10">
// // //         <motion.h1
// // //           initial={{ opacity: 0, y: 40 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 1 }}
// // //           className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-blue-400 to-purple-400 drop-shadow-2xl"
// // //         >
// // //           Welcome to SkillWrap
// // //         </motion.h1>

// // //         <motion.p
// // //           initial={{ opacity: 0, y: 40 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ delay: 0.3, duration: 1 }}
// // //           className="text-gray-300 text-lg max-w-md"
// // //         >
// // //           The all-in-one platform where skills connect the world. Learn, share, and grow with others through collaboration and creativity.
// // //         </motion.p>

// // //         <motion.div
// // //           initial={{ opacity: 0, y: 40 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ delay: 0.6, duration: 1 }}
// // //           className="flex gap-4 justify-center md:justify-start"
// // //         >
// // //           <Link
// // //             href="/dashboard"
// // //             className="px-8 py-3 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl font-semibold hover:bg-white/20 hover:scale-105 transition-all"
// // //           >
// // //             🚀 Get Started
// // //           </Link>
// // //           <Link
// // //             href="/about"
// // //             className="px-8 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-gray-900 font-semibold rounded-xl hover:opacity-90 hover:scale-105 transition-all"
// // //           >
// // //             Learn More
// // //           </Link>
// // //         </motion.div>
// // //       </div>

// // //       {/* RIGHT SIDE — Floating Icons Scene */}
// // //       <div className="relative w-full md:w-1/2 flex justify-center items-center mt-16 md:mt-0">
// // //         {/* Floating Glow */}
// // //         <motion.div
// // //           animate={{
// // //             scale: [1, 1.1, 1],
// // //             rotate: [0, 360],
// // //           }}
// // //           transition={{
// // //             duration: 12,
// // //             repeat: Infinity,
// // //             ease: "easeInOut",
// // //           }}
// // //           className="absolute w-64 h-64 bg-gradient-to-tr from-blue-500 via-teal-400 to-purple-400 rounded-full blur-3xl opacity-60"
// // //         />

// // //         {/* Icons orbit-like animation */}
// // //         <motion.div
// // //           className="relative w-[320px] h-[320px]"
// // //           animate={{ rotate: 360 }}
// // //           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
// // //         >
// // //           {/* 🌍 Globe */}
// // //           <motion.div
// // //             className="absolute left-1/2 top-0 transform -translate-x-1/2 text-blue-300"
// // //             animate={{ y: [0, -10, 0] }}
// // //             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// // //           >
// // //             <Globe size={56} className="drop-shadow-glow" />
// // //           </motion.div>

// // //           {/* 💻 Laptop */}
// // //           <motion.div
// // //             className="absolute right-0 top-1/2 transform -translate-y-1/2 text-teal-300"
// // //             animate={{ y: [0, 10, 0] }}
// // //             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
// // //           >
// // //             <Laptop size={56} className="drop-shadow-glow" />
// // //           </motion.div>

// // //           {/* 📱 Phone */}
// // //           <motion.div
// // //             className="absolute left-0 top-1/2 transform -translate-y-1/2 text-cyan-300"
// // //             animate={{ y: [0, -10, 0] }}
// // //             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
// // //           >
// // //             <Smartphone size={56} className="drop-shadow-glow" />
// // //           </motion.div>

// // //           {/* 💡 Lightbulb (Idea) */}
// // //           <motion.div
// // //             className="absolute left-1/2 bottom-0 transform -translate-x-1/2 text-yellow-300"
// // //             animate={{ y: [0, 10, 0] }}
// // //             transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
// // //           >
// // //             <Lightbulb size={56} className="drop-shadow-glow" />
// // //           </motion.div>
// // //         </motion.div>

// // //         {/* Center text inside animation */}
// // //         <motion.h2
// // //           initial={{ opacity: 0, scale: 0.6 }}
// // //           animate={{ opacity: 1, scale: 1 }}
// // //           transition={{ delay: 1 }}
// // //           className="absolute text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400"
// // //         >
// // //           SkillWrap
// // //         </motion.h2>
// // //       </div>
// // //     </section>
// // //   );
// // // }












// // // "use client";

// // // import { motion } from "framer-motion";
// // // import Link from "next/link";
// // // import { useEffect, useState } from "react";

// // // export default function Hero() {
// // //   const [mounted, setMounted] = useState(false);
// // //   useEffect(() => setMounted(true), []);

// // //   return (
// // //     <section className="relative overflow-hidden flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-12 py-24 min-h-screen text-white ">

// // //     <div className="h-10 w-100 bg-gradient-to-br from-purple-700 via-teal-500 to-yellow-400"></div>
// // //       {/* Animated Gradient Background */}
// // //       <motion.div
// // //         initial={{ opacity: 0 }}
// // //         animate={{ opacity: 1 }}
// // //         transition={{ duration: 2 }}
// // //         className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] animate-gradient-slow"
// // //       />

// // //       {/* Floating Spherical Glow */}
// // //       <motion.div
// // //         className="absolute -bottom-32 right-0 w-[600px] h-[600px] bg-gradient-to-r from-cyan-400/30 via-blue-500/20 to-purple-600/30 rounded-full blur-[120px]"
// // //         animate={{
// // //           y: [0, -15, 0],
// // //           scale: [1, 1.05, 1],
// // //         }}
// // //         transition={{
// // //           duration: 6,
// // //           repeat: Infinity,
// // //           ease: "easeInOut",
// // //         }}
// // //       />

// // //       {/* Left Text Section */}
// // //       <div className="flex-1 z-10 text-center md:text-left space-y-6">
// // //         <motion.h1
// // //           initial={{ y: 60, opacity: 0 }}
// // //           animate={{ y: 0, opacity: 1 }}
// // //           transition={{ duration: 1, type: "spring", bounce: 0.4 }}
// // //           className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight"
// // //         >
// // //           Empower Your Future with{" "}
// // //           <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
// // //             Skillwrap
// // //           </span>
// // //         </motion.h1>

// // //         <motion.p
// // //           initial={{ x: -60, opacity: 0 }}
// // //           animate={{ x: 0, opacity: 1 }}
// // //           transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
// // //           className="text-gray-300 text-lg md:text-xl max-w-lg mx-auto md:mx-0"
// // //         >
// // //           Connect, exchange, and showcase your skills with a thriving global
// // //           community. Built for creators, students, and innovators who never stop
// // //           growing 🌍
// // //         </motion.p>

// // //         <motion.div
// // //           initial={{ scale: 0.9, opacity: 0 }}
// // //           animate={{ scale: 1, opacity: 1 }}
// // //           transition={{ delay: 1.5, type: "spring", stiffness: 150 }}
// // //         >
// // //           <Link
// // //             href="/dashboard"
// // //             className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-cyan-500/30 transition-all duration-300"
// // //           >
// // //             🚀 Get Started
// // //           </Link>
// // //         </motion.div>
// // //       </div>

// // //       {/* Right Animated Visual */}
// // //       <motion.div
// // //         initial={{ opacity: 0, scale: 0.8 }}
// // //         animate={{ opacity: 1, scale: 1 }}
// // //         transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
// // //         className="flex-1 flex justify-center mb-12 md:mb-0"
// // //       >
// // //         <motion.div
// // //           animate={{
// // //             rotate: [0, 360],
// // //           }}
// // //           transition={{
// // //             repeat: Infinity,
// // //             duration: 20,
// // //             ease: "linear",
// // //           }}
// // //           className="relative w-[260px] h-[260px] md:w-[350px] md:h-[350px] rounded-full bg-gradient-to-tr from-blue-400 via-cyan-300 to-purple-400 blur-[1px] shadow-2xl flex items-center justify-center"
// // //         >
// // //           {/* Floating orbit elements */}
// // //           <motion.div
// // //             className="absolute w-8 h-8 bg-blue-300 rounded-full shadow-lg"
// // //             animate={{
// // //               x: [100, -100, 100],
// // //               y: [-80, 80, -80],
// // //             }}
// // //             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
// // //           />
// // //           <motion.div
// // //             className="absolute w-10 h-10 bg-purple-400 rounded-full shadow-lg"
// // //             animate={{
// // //               x: [-120, 120, -120],
// // //               y: [90, -90, 90],
// // //             }}
// // //             transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
// // //           />
// // //           <motion.div
// // //             className="absolute w-12 h-12 bg-cyan-400 rounded-full shadow-lg"
// // //             animate={{
// // //               x: [0, 150, 0],
// // //               y: [0, -100, 0],
// // //             }}
// // //             transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
// // //           />

// // //           {/* Center glow sphere */}
// // //           <motion.div
// // //             className="w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-blue-500 via-cyan-300 to-purple-500 rounded-full shadow-inner shadow-blue-800/50"
// // //             animate={{
// // //               scale: [1, 1.05, 1],
// // //             }}
// // //             transition={{
// // //               duration: 4,
// // //               repeat: Infinity,
// // //               ease: "easeInOut",
// // //             }}
// // //           ></motion.div>
// // //         </motion.div>
// // //       </motion.div>
// // //     </section>
// // //   );
// // // }


































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

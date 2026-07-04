// "use client"
// import React, { useRef } from "react";
// // import { createFileRoute, useRouter } from "@tanstack/react-router";
// import { useRouter } from "next/navigation";
// import {
//   motion,
//   useScroll,
//   useTransform,
//   useMotionValue,
//   useSpring,
//   useMotionTemplate,
// } from "framer-motion";
// import {
//   Sparkles,
//   Brain,
//   Users,
//   MessageCircle,
//   Compass,
//   ShieldCheck,
//   Rocket,
//   Zap,
//   Globe,
//   Trophy,
//   Calendar,
//   Target,
//   Heart,
//   ArrowRight,
//   Play,
//   Star,
//   TrendingUp,
//   Award,
//   BookOpen,
//   Lightbulb,
//   Share2,
// } from "lucide-react";


// // ---------- Animation Variants ----------
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1, delayChildren: 0.15 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
//   visible: {
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     transition: { type: "spring", stiffness: 90, damping: 16 },
//   },
// } as const;

// const floatVariants = {
//   animate: {
//     y: [0, -25, 0],
//     transition: { duration: 7, repeat: Infinity, ease: "easeInOut" as const },
//   },
// };

// const pulseVariants = {
//   animate: {
//     scale: [1, 1.08, 1],
//     opacity: [0.4, 0.75, 0.4],
//     transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
//   },
// };

// // ---------- Mouse-reactive card ----------
// function GlowCard({
//   children,
//   className = "",
//   glow = "rgba(6,182,212,0.25)",
// }: {
//   children: React.ReactNode;
//   className?: string;
//   glow?: string;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const mouseX = useMotionValue(-200);
//   const mouseY = useMotionValue(-200);

//   const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = ref.current?.getBoundingClientRect();
//     if (!rect) return;
//     mouseX.set(e.clientX - rect.left);
//     mouseY.set(e.clientY - rect.top);
//   };

//   const background = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, ${glow}, transparent 70%)`;

//   return (
//     <div
//       ref={ref}
//       onMouseMove={handleMove}
//       onMouseLeave={() => {
//         mouseX.set(-200);
//         mouseY.set(-200);
//       }}
//       className={`group relative overflow-hidden ${className}`}
//     >
//       <motion.div
//         style={{ background }}
//         className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
//       />
//       <div className="relative z-10">{children}</div>
//     </div>
//   );
// }

// // ---------- Shimmer divider ----------
// function ShimmerDivider({ color = "cyan" }: { color?: string }) {
//   const colors: Record<string, string> = {
//     cyan: "via-cyan-500/60",
//     purple: "via-purple-500/60",
//     blue: "via-blue-500/60",
//     pink: "via-pink-500/60",
//     green: "via-emerald-500/60",
//   };
//   return (
//     <div className="max-w-4xl mx-auto mb-24 relative">
//       <div className={`h-px bg-gradient-to-r from-transparent ${colors[color]} to-transparent`} />
//       <motion.div
//         animate={{ x: ["-100%", "100%"] }}
//         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//         className="absolute top-0 h-px w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
//       />
//     </div>
//   );
// }

// export default function SkillWarpAboutUs() {
// // function SkillWarpAboutUs() {
//   const router = useRouter();
//   const heroRef = useRef<HTMLElement>(null);

//   // Parallax for hero
//   const { scrollY } = useScroll();
//   const heroY = useTransform(scrollY, [0, 800], [0, 200]);
//   const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);
//   const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);

//   // Mouse parallax for hero orbs
//   const mx = useMotionValue(0);
//   const my = useMotionValue(0);
//   const smx = useSpring(mx, { stiffness: 50, damping: 20 });
//   const smy = useSpring(my, { stiffness: 50, damping: 20 });
//   const orb1X = useTransform(smx, [-1, 1], [-30, 30]);
//   const orb1Y = useTransform(smy, [-1, 1], [-30, 30]);
//   const orb2X = useTransform(smx, [-1, 1], [25, -25]);
//   const orb2Y = useTransform(smy, [-1, 1], [25, -25]);

//   const handleMouseMove = (e: React.MouseEvent) => {
//     const x = (e.clientX / window.innerWidth) * 2 - 1;
//     const y = (e.clientY / window.innerHeight) * 2 - 1;
//     mx.set(x);
//     my.set(y);
//   };

//   const teamMembers = [
//     { name: "Jane Doe", role: "CEO & Founder", img: "https://randomuser.me/api/portraits/women/44.jpg" },
//     { name: "John Smith", role: "CTO", img: "https://randomuser.me/api/portraits/men/33.jpg" },
//     { name: "Alice Johnson", role: "Community Manager", img: "https://randomuser.me/api/portraits/women/65.jpg" },
//     { name: "Michael Lee", role: "Lead Developer", img: "https://randomuser.me/api/portraits/men/66.jpg" },
//   ];

//   const stats = [
//     { value: "50K+", label: "Active Learners", icon: Users },
//     { value: "120+", label: "Live Events", icon: Calendar },
//     { value: "10K+", label: "Skills Exchanged", icon: Share2 },
//     { value: "98%", label: "Satisfaction", icon: Heart },
//   ];

//   const ecosystemFeatures = [
//     { icon: BookOpen, title: "Learn Anything", desc: "From coding to cooking, music to marketing — access skills from real people who have mastered them.", gradient: "from-cyan-500 to-blue-500" },
//     { icon: Lightbulb, title: "Teach Anything", desc: "Share your expertise with eager learners. Your knowledge becomes someone else's breakthrough.", gradient: "from-purple-500 to-pink-500" },
//     { icon: Share2, title: "Exchange Skills", desc: "Trade what you know for what you want to learn. No money needed — just mutual growth.", gradient: "from-blue-500 to-purple-500" },
//     { icon: Globe, title: "Global Ecosystem", desc: "Connect with learners and teachers worldwide. Break geographical barriers to knowledge.", gradient: "from-pink-500 to-orange-500" },
//   ];

//   const eventFeatures = [
//     { icon: Trophy, title: "Hackathons & Challenges", desc: "Compete, collaborate, and showcase your skills in exciting community-driven competitions with real prizes and recognition." },
//     { icon: Calendar, title: "Live Learning Sessions", desc: "Join real-time workshops, masterclasses, and skill-sharing sessions hosted by community experts and industry professionals." },
//     { icon: Target, title: "Skill Sprints", desc: "Intensive short-term learning programs designed to help you master specific skills quickly with community support." },
//   ];

//   return (
//     <main
//       onMouseMove={handleMouseMove}
//       className="min-h-screen w-full bg-[#030814] text-white overflow-x-hidden relative antialiased"
//       style={{ fontFamily: "'Josefin Sans', system-ui, sans-serif" }}
//     >
//       {/* ===== GLOBAL BACKGROUND ===== */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         {/* Animated mesh gradient */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(30,64,175,0.25),_transparent_55%)]" />
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(124,58,237,0.18),_transparent_55%)]" />

//         <motion.div
//           style={{ x: orb1X, y: orb1Y }}
//           variants={floatVariants}
//           animate="animate"
//           className="absolute top-[8%] left-[5%] w-[640px] h-[640px] bg-blue-600/25 rounded-full blur-[160px]"
//         />
//         <motion.div
//           style={{ x: orb2X, y: orb2Y }}
//           variants={floatVariants}
//           animate="animate"
//           className="absolute top-[35%] right-[5%] w-[520px] h-[520px] bg-purple-600/25 rounded-full blur-[160px]"
//         />
//         <motion.div
//           variants={pulseVariants}
//           animate="animate"
//           className="absolute bottom-[15%] left-[15%] w-[420px] h-[420px] bg-cyan-500/20 rounded-full blur-[130px]"
//         />
//         <motion.div
//           variants={floatVariants}
//           animate="animate"
//           className="absolute top-[60%] right-[28%] w-[320px] h-[320px] bg-pink-500/15 rounded-full blur-[110px]"
//         />

//         {/* Animated grid */}
//         <motion.div
//           animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           className="absolute inset-0 opacity-[0.04]"
//           style={{
//             backgroundImage: `linear-gradient(rgba(125,211,252,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.4) 1px, transparent 1px)`,
//             backgroundSize: "60px 60px",
//           }}
//         />

//         {/* Floating particles */}
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
//             initial={{
//               x: `${(i * 53) % 100}%`,
//               y: `${(i * 37) % 100}%`,
//             }}
//             animate={{
//               y: ["0%", "-120%"],
//               opacity: [0, 1, 0],
//             }}
//             transition={{
//               duration: 8 + (i % 5),
//               repeat: Infinity,
//               delay: i * 0.4,
//               ease: "linear",
//             }}
//             style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%` }}
//           />
//         ))}

//         {/* Vignette */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(3,8,20,0.8)_100%)]" />
//       </div>

//       <div className="relative z-10 px-6 md:px-10 py-8">
//         {/* ===== BACK BUTTON ===== */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ type: "spring", stiffness: 100 }}
//           className="flex items-center mb-8"
//         >
//           <button
//             onClick={() => router.back()}
//             className="group relative px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]"
//           >
//             <span className="relative z-10 flex items-center gap-2 text-gray-300 group-hover:text-white transition-colors">
//               <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
//               Go Back
//             </span>
//             <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
//           </button>
//         </motion.div>

//         {/* ===== HERO ===== */}
//         <motion.section
//           ref={heroRef}
//           style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="relative mb-32"
//         >
//           <div className="max-w-6xl mx-auto text-center space-y-8">
//             {/* Badge */}
//             <motion.div variants={itemVariants} className="flex justify-center">
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-xl relative overflow-hidden">
//                 <motion.div
//                   animate={{ x: ["-100%", "200%"] }}
//                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
//                 />
//                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
//                   <Sparkles className="w-4 h-4 text-cyan-400" />
//                 </motion.div>
//                 <span className="text-sm text-cyan-200 font-medium relative z-10">
//                   The Future of Learning is Here
//                 </span>
//               </div>
//             </motion.div>

//             {/* Headline */}
//             <motion.h1
//               variants={itemVariants}
//               className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
//             >
//               <span className="block bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
//                 Welcome to
//               </span>
//               <motion.span
//                 animate={{
//                   backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
//                 }}
//                 transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//                 className="block mt-2 bg-[linear-gradient(90deg,#22d3ee,#3b82f6,#a855f7,#22d3ee)] bg-[length:200%_auto] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(6,182,212,0.4)]"
//               >
//                 SkillWarp
//               </motion.span>
//             </motion.h1>

//             {/* Sub */}
//             <motion.p
//               variants={itemVariants}
//               className="text-xl md:text-2xl text-gray-300/90 max-w-4xl mx-auto leading-relaxed"
//             >
//               A <span className="text-cyan-400 font-semibold">community-powered global ecosystem</span> where
//               people <span className="text-purple-400">learn anything</span>,{" "}
//               <span className="text-blue-400">teach anything</span>, and{" "}
//               <span className="text-pink-400">exchange skills</span> — all in one place.
//               Join the movement reshaping how the world learns together.
//             </motion.p>

//             {/* Stats */}
//             <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 pt-4">
//               {stats.map((stat, i) => (
//                 <motion.div
//                   key={i}
//                   whileHover={{ scale: 1.07, y: -4 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                   className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300"
//                 >
//                   <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/25 to-blue-500/25">
//                     <stat.icon className="w-4 h-4 text-cyan-300" />
//                   </div>
//                   <div className="text-left">
//                     <div className="text-lg font-bold text-white">{stat.value}</div>
//                     <div className="text-xs text-gray-400">{stat.label}</div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* Hero image */}
//             <motion.div variants={itemVariants} className="relative pt-8">
//               <div className="relative rounded-3xl overflow-hidden group max-w-4xl mx-auto">
//                 <motion.div
//                   animate={{ opacity: [0.4, 0.8, 0.4] }}
//                   transition={{ duration: 4, repeat: Infinity }}
//                   className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-40"
//                 />
//                 <div className="relative rounded-3xl overflow-hidden border border-white/10">
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#030814] via-transparent to-transparent z-10" />
//                   <motion.img
//                     whileHover={{ scale: 1.04 }}
//                     transition={{ duration: 0.8 }}
//                     src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
//                     alt="SkillWarp Community"
//                     className="w-full"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <motion.div
//                       whileHover={{ scale: 1.15 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="p-5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 cursor-pointer shadow-[0_0_40px_rgba(6,182,212,0.4)]"
//                     >
//                       <Play className="w-8 h-8 text-white fill-white" />
//                     </motion.div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.section>

//         <ShimmerDivider color="cyan" />

//         {/* ===== WHY SKILLWARP ===== */}
//         <motion.section
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="mb-32 max-w-5xl mx-auto"
//         >
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4 backdrop-blur-xl">
//               Our Story
//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-4 tracking-tight">
//               Why SkillWarp Exists
//             </h2>
//             <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//               The vision that drives everything we build
//             </p>
//           </motion.div>

//           <motion.div variants={itemVariants}>
//             <GlowCard
//               glow="rgba(168,85,247,0.2)"
//               className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-2xl"
//             >
//               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
//               <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
//                 <p>
//                   SkillWarp was born from a simple but powerful belief:{" "}
//                   <span className="text-white font-semibold">everyone has something valuable to teach, and everyone has something they want to learn.</span>
//                 </p>
//                 <p>
//                   Traditional education puts knowledge behind paywalls, certificates, and rigid structures. We saw a different way.
//                   A teenager in Jakarta learning guitar from a musician in Nashville. A retiree in London teaching woodworking to a creator in Tokyo. Skills flowing freely across borders, cultures, and generations.
//                 </p>
//                 <p>
//                   We are not just building a platform —{" "}
//                   <span className="text-cyan-400 font-semibold">we are building a movement where human potential is unlocked through connection.</span>
//                 </p>
//                 <p>
//                   This is SkillWarp. This is the future of learning.{" "}
//                   <span className="text-purple-400 font-semibold">And you are part of it.</span>
//                 </p>
//               </div>
//               <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
//             </GlowCard>
//           </motion.div>
//         </motion.section>

//         <ShimmerDivider color="blue" />

//         {/* ===== ECOSYSTEM ===== */}
//         <motion.section
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="mb-32 max-w-6xl mx-auto"
//         >
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-4 backdrop-blur-xl">
//               The Platform
//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent mb-4 tracking-tight">
//               The SkillWarp Ecosystem
//             </h2>
//             <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//               One unified platform for all your learning and teaching needs
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-2 gap-6">
//             {ecosystemFeatures.map((feature, i) => (
//               <motion.div
//                 key={i}
//                 variants={itemVariants}
//                 whileHover={{ y: -10 }}
//                 transition={{ type: "spring", stiffness: 200 }}
//               >
//                 <GlowCard
//                   glow="rgba(6,182,212,0.22)"
//                   className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_25px_60px_-15px_rgba(6,182,212,0.25)] h-full"
//                 >
//                   <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                   <motion.div
//                     whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
//                     transition={{ duration: 0.5 }}
//                     className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg shadow-cyan-500/20`}
//                   >
//                     <feature.icon className="w-7 h-7 text-white" />
//                   </motion.div>
//                   <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
//                 </GlowCard>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>

//         <ShimmerDivider color="purple" />

//         {/* ===== EVENTS ===== */}
//         <motion.section
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="mb-32 max-w-6xl mx-auto"
//         >
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-pink-500/10 text-pink-300 border border-pink-500/20 mb-4 backdrop-blur-xl">
//               Community Events
//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-300 via-orange-300 to-pink-300 bg-clip-text text-transparent mb-4 tracking-tight">
//               Events, Challenges & Live Learning
//             </h2>
//             <p className="text-gray-400 text-lg max-w-3xl mx-auto">
//               Our vibrant event ecosystem brings the community together for real-time learning, competitions, and collaborative growth.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {eventFeatures.map((feature, i) => (
//               <motion.div
//                 key={i}
//                 variants={itemVariants}
//                 whileHover={{ y: -10 }}
//               >
//                 <GlowCard
//                   glow="rgba(236,72,153,0.22)"
//                   className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-2xl transition-all duration-500 hover:border-pink-400/40 hover:shadow-[0_25px_60px_-15px_rgba(236,72,153,0.25)] h-full"
//                 >
//                   <motion.div
//                     whileHover={{ scale: 1.15, rotate: 10 }}
//                     className="p-3 rounded-xl bg-gradient-to-br from-pink-500/25 to-orange-500/25 inline-block mb-4"
//                   >
//                     <feature.icon className="w-6 h-6 text-pink-300" />
//                   </motion.div>
//                   <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-200 transition-colors">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
//                 </GlowCard>
//               </motion.div>
//             ))}
//           </div>

//           <motion.div variants={itemVariants} className="text-center mt-10">
//             <motion.a
//               href="/events"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.97 }}
//               className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-500/30 text-pink-200 font-medium backdrop-blur-xl hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] transition-all"
//             >
//               <Calendar className="w-5 h-5" />
//               Explore Upcoming Events
//               <ArrowRight className="w-4 h-4" />
//             </motion.a>
//           </motion.div>
//         </motion.section>

//         <ShimmerDivider color="green" />

//         {/* ===== CORE FEATURES ===== */}
//         <motion.section
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="mb-32 max-w-6xl mx-auto"
//         >
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-4 backdrop-blur-xl">
//               Platform Features
//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent mb-4 tracking-tight">
//               Core Features
//             </h2>
//             <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//               Everything you need to learn, teach, and grow
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               { icon: Users, title: "Skill Exchange", desc: "Offer a skill you have mastered and request one you want to learn. No money — just pure value exchange between passionate people.", color: "blue" },
//               { icon: MessageCircle, title: "Private Skill Chats", desc: "Learn in focused one-on-one or small group chat rooms. Share resources, get feedback, and collaborate in real-time.", color: "green" },
//               { icon: Compass, title: "Skill Discovery", desc: "Explore thousands of skills shared by our global community. Smart matching aligns you with perfect learning partners.", color: "purple" },
//             ].map((f, i) => (
//               <motion.div key={i} variants={itemVariants} whileHover={{ y: -10 }}>
//                 <GlowCard
//                   glow="rgba(16,185,129,0.22)"
//                   className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-2xl transition-all duration-500 hover:border-emerald-400/40 hover:shadow-[0_25px_60px_-15px_rgba(16,185,129,0.25)] h-full"
//                 >
//                   <motion.div
//                     whileHover={{ scale: 1.15, rotate: -10 }}
//                     className={`p-3 rounded-xl inline-block mb-4 bg-gradient-to-br ${
//                       f.color === "blue" ? "from-blue-500/25 to-cyan-500/25"
//                       : f.color === "green" ? "from-emerald-500/25 to-teal-500/25"
//                       : "from-purple-500/25 to-pink-500/25"
//                     }`}
//                   >
//                     <f.icon className={`w-6 h-6 ${
//                       f.color === "blue" ? "text-blue-300"
//                       : f.color === "green" ? "text-emerald-300"
//                       : "text-purple-300"
//                     }`} />
//                   </motion.div>
//                   <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-200 transition-colors">
//                     {f.title}
//                   </h3>
//                   <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
//                 </GlowCard>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>

//         <ShimmerDivider color="purple" />

//         {/* ===== AI GUIDANCE ===== */}
//         <motion.section
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="mb-32 max-w-6xl mx-auto"
//         >
//           <motion.div variants={itemVariants} className="mb-12">
//             <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4 backdrop-blur-xl">
//               AI-Powered
//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-4 flex items-center gap-3 tracking-tight">
//               <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
//                 <Brain className="w-10 h-10 text-purple-300" />
//               </motion.div>
//               AI Guidance
//             </h2>
//             <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
//               SkillWarp uses AI as a <span className="text-purple-400 font-semibold">learning assistant</span>, not a replacement for human connection.
//               Our AI helps you navigate your journey while keeping human-to-human exchange at the heart of everything.
//             </p>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               { icon: Sparkles, title: "Personalized Roadmaps", desc: "AI generates step-by-step learning paths tailored to your goals, experience, and available time.", color: "purple" },
//               { icon: Rocket, title: "Smart Direction", desc: "Our AI analyzes your interests and goals to recommend the perfect next step in your growth journey.", color: "blue" },
//               { icon: MessageCircle, title: "Communication Boost", desc: "AI-powered suggestions help improve clarity in your exchanges with real-time tips for better teaching.", color: "green" },
//             ].map((f, i) => (
//               <motion.div key={i} variants={itemVariants} whileHover={{ y: -10 }}>
//                 <GlowCard
//                   glow="rgba(168,85,247,0.22)"
//                   className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-2xl transition-all duration-500 hover:border-purple-400/40 hover:shadow-[0_25px_60px_-15px_rgba(168,85,247,0.25)] h-full"
//                 >
//                   <motion.div
//                     whileHover={{ scale: 1.15, rotate: 10 }}
//                     className={`p-3 rounded-xl inline-block mb-4 bg-gradient-to-br ${
//                       f.color === "purple" ? "from-purple-500/25 to-pink-500/25"
//                       : f.color === "blue" ? "from-blue-500/25 to-cyan-500/25"
//                       : "from-emerald-500/25 to-teal-500/25"
//                     }`}
//                   >
//                     <f.icon className={`w-6 h-6 ${
//                       f.color === "purple" ? "text-purple-300"
//                       : f.color === "blue" ? "text-blue-300"
//                       : "text-emerald-300"
//                     }`} />
//                   </motion.div>
//                   <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors">
//                     {f.title}
//                   </h3>
//                   <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
//                 </GlowCard>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>

//         <ShimmerDivider color="blue" />

//         {/* ===== TEAM ===== */}
//         <motion.section
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="mb-32 max-w-6xl mx-auto"
//         >
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-4 backdrop-blur-xl">
//               The Humans Behind SkillWarp
//             </span>
//             <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent mb-4 tracking-tight">
//               Meet Our Team
//             </h2>
//             <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//               Passionate builders dedicated to democratizing education worldwide
//             </p>
//           </motion.div>

//           <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {teamMembers.map((member, idx) => (
//               <motion.div
//                 key={idx}
//                 variants={itemVariants}
//                 whileHover={{ y: -14, scale: 1.04 }}
//                 transition={{ type: "spring", stiffness: 250 }}
//               >
//                 <GlowCard
//                   glow="rgba(59,130,246,0.25)"
//                   className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-2xl text-center transition-all duration-500 hover:border-blue-400/40 hover:shadow-[0_25px_60px_-15px_rgba(59,130,246,0.3)]"
//                 >
//                   <div className="relative w-28 h-28 mx-auto mb-4">
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//                       className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-70 blur-md transition-opacity"
//                     />
//                     <img
//                       src={member.img}
//                       alt={member.name}
//                       className="relative rounded-full w-28 h-28 object-cover border-2 border-white/20 group-hover:border-cyan-400/60 transition-all"
//                     />
//                   </div>
//                   <h3 className="text-xl font-semibold text-white group-hover:text-cyan-200 transition-colors">
//                     {member.name}
//                   </h3>
//                   <p className="text-gray-400 text-sm">{member.role}</p>
//                   <div className="flex justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                     {[Star, Award, TrendingUp].map((Icon, i) => (
//                       <motion.div
//                         key={i}
//                         whileHover={{ y: -3, scale: 1.2 }}
//                         className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
//                       >
//                         <Icon className="w-4 h-4 text-gray-300" />
//                       </motion.div>
//                     ))}
//                   </div>
//                 </GlowCard>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>

//         <ShimmerDivider color="cyan" />

//         {/* ===== TRUST ===== */}
//         <motion.section
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="mb-32 max-w-5xl mx-auto"
//         >
//           <motion.div variants={itemVariants}>
//             <GlowCard
//               glow="rgba(6,182,212,0.2)"
//               className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-2xl"
//             >
//               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
//               <div className="flex items-start gap-6 flex-col md:flex-row">
//                 <motion.div
//                   whileHover={{ rotate: 360, scale: 1.1 }}
//                   transition={{ duration: 0.8 }}
//                   className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/25 to-blue-500/25 flex-shrink-0"
//                 >
//                   <ShieldCheck className="w-8 h-8 text-cyan-300" />
//                 </motion.div>
//                 <div>
//                   <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-4 tracking-tight">
//                     Trust & Community Standards
//                   </h2>
//                   <p className="text-gray-300 text-lg leading-relaxed mb-4">
//                     SkillWarp is built on a foundation of <span className="text-cyan-400 font-semibold">respect, honesty, and accountability</span>.
//                     Every member of our community agrees to uphold these values.
//                   </p>
//                   <p className="text-gray-400 leading-relaxed">
//                     Fake skills, spam, harassment, and abuse are not tolerated. Our moderation systems — both AI-powered and human —
//                     work around the clock to protect genuine learners and teachers.
//                   </p>
//                 </div>
//               </div>
//               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl" />
//             </GlowCard>
//           </motion.div>
//         </motion.section>

//         {/* ===== FINAL CTA ===== */}
//         <motion.section
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="text-center mb-20 max-w-4xl mx-auto"
//         >
//           <motion.div
//             variants={itemVariants}
//             className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-2xl overflow-hidden"
//           >
//             <motion.div
//               animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
//               transition={{ duration: 5, repeat: Infinity }}
//               className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/25 rounded-full blur-[110px]"
//             />
//             <motion.div
//               animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0.5, 0.2] }}
//               transition={{ duration: 6, repeat: Infinity, delay: 1 }}
//               className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/25 rounded-full blur-[110px]"
//             />
//             <motion.div
//               animate={{ x: ["-100%", "200%"] }}
//               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
//               className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
//             />

//             <div className="relative z-10">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                 className="inline-block mb-6"
//               >
//                 <Zap className="w-12 h-12 text-cyan-300 drop-shadow-[0_0_20px_rgba(6,182,212,0.7)]" />
//               </motion.div>

//               <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
//                 <motion.span
//                   animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
//                   transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//                   className="bg-[linear-gradient(90deg,#22d3ee,#3b82f6,#a855f7,#22d3ee)] bg-[length:200%_auto] bg-clip-text text-transparent"
//                 >
//                   Join the SkillWarp Movement
//                 </motion.span>
//               </h2>

//               <p className="text-gray-300 mb-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
//                 SkillWarp is more than a platform — it is a <span className="text-cyan-400 font-semibold">global movement</span>.
//                 Your skills matter. Your knowledge can change someone&apos;s life.
//                 <span className="text-purple-400 font-semibold"> Be part of the future of learning.</span>
//               </p>

//               <motion.a
//                 href="/signup"
//                 whileHover={{ scale: 1.05, y: -3 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(6,182,212,0.5)]"
//               >
//                 <span className="relative z-10">Get Started Today</span>
//                 <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
//               </motion.a>
//             </div>
//           </motion.div>
//         </motion.section>
//       </div>
//     </main>
//   );
// }








"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, Variants } from "framer-motion";
import {
  Sparkles,
  Brain,
  Users,
  MessageCircle,
  Compass,
  ShieldCheck,
  Rocket,
  Zap,
  Globe,
  Trophy,
  Calendar,
  Target,
  Heart,
  ArrowRight,
  Play,
  Star,
  TrendingUp,
  Award,
  BookOpen,
  Lightbulb,
  Share2,
  Eye,
  GraduationCap,
  Globe2,
  Network,
  Quote,
  CheckCircle,
  Loader2
} from "lucide-react";

// ============ ANIMATION VARIANTS ============
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};
const floatVariants = {
  animate: {
    y: [0, -30, 0],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.7, 0.3],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
  },
};

// ============ MOUSE-REACTIVE CARD ============
function GlowCard({
  children,
  className = "",
  glow = "rgba(59,130,246,0.25)",
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, ${glow}, transparent 70%)`;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mouseX.set(-200);
        mouseY.set(-200);
      }}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div
        style={{ background }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============ SHIMMER DIVIDER ============
function ShimmerDivider({ color = "blue" }: { color?: string }) {
  const colors: Record<string, string> = {
    cyan: "via-cyan-500/50",
    purple: "via-purple-500/50",
    blue: "via-blue-500/50",
    pink: "via-pink-500/50",
    emerald: "via-emerald-500/50",
  };

  return (
    <div className="max-w-5xl mx-auto mb-24 relative">
      <div className={`h-px bg-gradient-to-r from-transparent ${colors[color]} to-transparent`} />
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-white/90 to-transparent"
      />
    </div>
  );
}

// ============ FLOATING IMAGE ============
function FloatingImage({
  src,
  alt,
  delay = 0,
  className = "",
  parallaxSpeed = 0.5,
}: {
  src: string;
  alt: string;
  delay?: number;
  className?: string;
  parallaxSpeed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50 * parallaxSpeed, 50 * parallaxSpeed]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
}

// ============ STAT COUNTER ============
function StatCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = React.useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

// ============ TEAM CARD ============
function TeamCard({
  member,
  index,
}: {
  member: {
    name: string;
    role: string;
    img: string;
    bio?: string;
  };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -12, scale: 1.02 }}
      className="relative group"
    >
      <GlowCard glow="rgba(59,130,246,0.3)" className="rounded-3xl overflow-hidden">
        <div className="relative p-6 bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/10 backdrop-blur-2xl">
          {/* Animated background */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          {/* Image */}
          <div className="relative w-28 h-28 mx-auto mb-5">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 opacity-0 group-hover:opacity-80 blur-md transition-opacity"
            />
            <img
              src={member.img}
              alt={member.name}
              className="relative rounded-full w-28 h-28 object-cover border-3 border-white/20 group-hover:border-blue-400/60 transition-all duration-300"
            />
            {/* Online indicator */}
            <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-3 border-slate-900 shadow-lg shadow-emerald-400/50" />
          </div>

          {/* Info */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-1">
              {member.name}
            </h3>
            <p className="text-sm text-blue-400/80 font-medium mb-2">{member.role}</p>
            {member.bio && (
              <p className="text-xs text-slate-400 leading-relaxed">{member.bio}</p>
            )}
          </div>

          {/* Social icons */}
          <div className="flex justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {[Star, Award, TrendingUp].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ y: -3, scale: 1.15 }}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-400/30 transition-all cursor-pointer"
              >
                <Icon className="w-4 h-4 text-blue-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

// ============ TUTOR CARD ============
function TutorCard({
  tutor,
  index,
}: {
  tutor: {
    name: string;
    skill: string;
    img: string;
    rating: number;
    students: number;
  };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      whileHover={{ scale: 1.03 }}
      className="group relative"
    >
      <GlowCard glow="rgba(34,211,238,0.2)" className="rounded-2xl overflow-hidden">
        <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-cyan-500/20 backdrop-blur-xl p-4">
          {/* Image */}
          <div className="relative h-40 rounded-xl overflow-hidden mb-4">
            <img
              src={tutor.img}
              alt={tutor.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

            {/* Rating badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs text-white font-semibold">{tutor.rating}</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
              {tutor.name[0]}
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold text-sm">{tutor.name}</h4>
              <p className="text-cyan-400 text-xs">{tutor.skill}</p>
            </div>
          </div>

          {/* Students */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400">{tutor.students} students taught</span>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

// ============ TIMELINE ITEM ============
function TimelineItem({
  year,
  title,
  description,
  index,
  isLeft = true,
}: {
  year: string;
  title: string;
  description: string;
  index: number;
  isLeft?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className={`relative flex items-center gap-8 ${isLeft ? "justify-start" : "justify-end"} mb-16`}
    >
      {/* Content */}
      <div className={`w-full md:w-5/12 ${isLeft ? "text-right" : "text-left"}`}>
        <GlowCard glow="rgba(59,130,246,0.2)" className="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold mb-3`}>
            <Calendar className="w-3 h-3" />
            {year}
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
        </GlowCard>
      </div>

      {/* Center dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 shadow-lg shadow-blue-500/50 border-4 border-slate-950" />

      {/* Line */}
      <div className="absolute left-1/2 top-8 w-px h-full bg-gradient-to-b from-blue-500/50 to-transparent -translate-x-1/2" />
    </motion.div>
  );
}

// ============ MAIN COMPONENT ============
export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.2]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.9]);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 40, damping: 20 });
  const smy = useSpring(my, { stiffness: 40, damping: 20 });
  const orb1X = useTransform(smx, [-1, 1], [-40, 40]);
  const orb1Y = useTransform(smy, [-1, 1], [-40, 40]);
  const orb2X = useTransform(smx, [-1, 1], [30, -30]);
  const orb2Y = useTransform(smy, [-1, 1], [30, -30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    mx.set(x);
    my.set(y);
  };

  // ================== DATA ==================
  const stats = [
    { value: 50000, suffix: "+", label: "Active Learners", icon: Users },
    { value: 120, suffix: "+", label: "Live Events", icon: Calendar },
    { value: 10000, suffix: "+", label: "Skills Exchanged", icon: Share2 },
    { value: 98, suffix: "%", label: "Satisfaction Rate", icon: Heart },
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Co-Founder",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
      bio: "Former Stanford professor with 15 years in EdTech innovation"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      bio: "Ex-Google engineer passionate about democratizing education"
    },
    {
      name: "Emily Nakamura",
      role: "Head of Community",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
      bio: "Built communities of 100K+ members across 3 platforms"
    },
    {
      name: "James Osei",
      role: "Lead Designer",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
      bio: "Award-winning designer focused on accessible UX"
    },
  ];

  const tutors = [
    {
      name: "Alex Rivera",
      skill: "Guitar & Music Theory",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      rating: 4.9,
      students: 234
    },
    {
      name: "Mei Lin",
      skill: "Digital Illustration",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop",
      rating: 5.0,
      students: 189
    },
    {
      name: "David Kim",
      skill: "Python Programming",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
      rating: 4.8,
      students: 512
    },
    {
      name: "Emma Watson",
      skill: "Creative Writing",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop",
      rating: 4.9,
      students: 178
    },
    {
      name: "Carlos Silva",
      skill: "Brazilian Jiu-Jitsu",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop",
      rating: 5.0,
      students: 301
    },
    {
      name: "Sophie Laurent",
      skill: "French Cuisine",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop",
      rating: 4.7,
      students: 145
    },
  ];

  const timelineEvents = [
    { year: "2021", title: "The Idea Was Born", description: "A small group of educators and engineers came together with a vision to democratize skill sharing worldwide." },
    { year: "2022", title: "MVP Launch", description: "Launched our first beta version with 500 early adopters who shaped the product through invaluable feedback." },
    { year: "2023", title: "Global Expansion", description: "Expanded to 50+ countries, reaching 25,000 active users and facilitating 100,000+ skill exchanges." },
    { year: "2024", title: "AI Integration", description: "Introduced AI-powered matching and learning roadmaps, increasing successful matches by 340%." },
    { year: "2025", title: "Community Events", description: "Launched live events platform with hackathons, workshops, and skill sprints engaging 10,000+ participants monthly." },
  ];

  const values = [
    {
      icon: Heart,
      title: "Human Connection",
      description: "Technology enables, but people inspire. Every feature we build strengthens genuine human bonds.",
      gradient: "from-rose-500 to-pink-500"
    },
    {
      icon: ShieldCheck,
      title: "Trust & Safety",
      description: "Your security is non-negotiable. We maintain the highest standards of data protection and community safety.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Knowledge should have no borders. We're committed to making learning accessible everywhere.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Sparkles,
      title: "Innovation First",
      description: "We push boundaries daily, using cutting-edge technology to create magical learning experiences.",
      gradient: "from-purple-500 to-violet-500"
    },
  ];

  const features = [
    { icon: BookOpen, title: "Learn Anything", desc: "Access skills from real people who have mastered them.", gradient: "from-cyan-500 to-blue-500" },
    { icon: Lightbulb, title: "Teach Anything", desc: "Share your expertise with eager learners worldwide.", gradient: "from-amber-500 to-orange-500" },
    { icon: Share2, title: "Exchange Skills", desc: "Trade what you know for what you want to learn.", gradient: "from-purple-500 to-pink-500" },
    { icon: Globe, title: "Global Network", desc: "Connect across borders, cultures, and generations.", gradient: "from-emerald-500 to-cyan-500" },
    { icon: Brain, title: "AI Assistance", desc: "Smart matching and personalized learning paths.", gradient: "from-blue-500 to-violet-500" },
    { icon: Trophy, title: "Achievements", desc: "Earn recognition and build your learning portfolio.", gradient: "from-yellow-500 to-amber-500" },
  ];

  return (
    <main
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full bg-[#030b1a] text-white overflow-x-hidden relative antialiased"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* ===== PREMIUM ANIMATED BACKGROUND ===== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030b1a] via-[#0a1628] to-[#030b1a]" />

        {/* Mesh gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(30,58,138,0.25),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(88,28,135,0.2),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.08),_transparent_70%)]" />

        {/* Floating orbs */}
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          variants={floatVariants}
          animate="animate"
          className="absolute top-[8%] left-[5%] w-[700px] h-[700px] bg-blue-600/25 rounded-full blur-[180px]"
        />
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          variants={floatVariants}
          animate="animate"
          className="absolute top-[30%] right-[5%] w-[550px] h-[550px] bg-purple-600/25 rounded-full blur-[160px]"
        />
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="absolute bottom-[20%] left-[20%] w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[140px]"
        />
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="absolute top-[55%] right-[25%] w-[350px] h-[350px] bg-pink-500/15 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-[40%] right-[10%] w-[300px] h-[300px] bg-indigo-500/15 rounded-full blur-[100px]"
        />

        {/* Animated grid */}
        <motion.div
          animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(147,197,253,0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(147,197,253,0.5) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 61) % 100}%`,
              top: `${(i * 41) % 100}%`,
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              background: i % 3 === 0 ? "rgba(59,130,246,0.7)" : i % 3 === 1 ? "rgba(147,51,234,0.6)" : "rgba(6,182,212,0.7)",
            }}
            animate={{
              y: ["0%", "-150%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + (i % 6),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear",
            }}
          />
        ))}

        {/* Aurora effect */}
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            x: ["-10%", "10%", "-10%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent"
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(3,11,26,0.9)_100%)]" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 py-6">
        {/* ===== NAVIGATION ===== */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <a
            href="/"
            className="group flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:border-blue-400/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4 rotate-180 text-blue-400 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm text-white font-medium">Back to Home</span>
          </a>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">SkillWarp</span>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
          </div>
        </motion.nav>

        {/* ===== HERO SECTION ===== */}
        <motion.section
          ref={heroRef}
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative mb-32"
        >
          <div className="max-w-7xl mx-auto text-center space-y-8">
            {/* Badge */}
            
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 backdrop-blur-xl relative overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </motion.div>
                <span className="text-sm text-blue-200 font-medium relative z-10 tracking-wide">
                  Redefining How the World Learns
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
            >
              <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                We Are
              </span>
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="block mt-3 bg-[linear-gradient(90deg,#3b82f6,#8b5cf6,#06b6d4,#3b82f6)] bg-[length:200%_auto] bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(59,130,246,0.5)]"
              >
                SkillWarp
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-slate-300/90 max-w-4xl mx-auto leading-relaxed"
            >
              A <span className="text-blue-400 font-semibold">community-powered global ecosystem</span> where everyone has something to teach, everyone has something to learn, and{" "}
              <span className="text-purple-400 font-semibold">skills flow freely across borders</span>.
            </motion.p>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 pt-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300"
                >
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/25 to-purple-500/25">
                    <stat.icon className="w-5 h-5 text-blue-300" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-white">
                      <StatCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Hero image */}
            <motion.div variants={itemVariants} className="relative pt-10">
              <div className="relative rounded-3xl overflow-hidden group max-w-5xl mx-auto">
                {/* Animated border glow */}
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-[1.6rem] blur-2xl opacity-50"
                />
                <div className="relative rounded-3xl overflow-hidden border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030b1a] via-transparent to-transparent z-10" />
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
                    alt="SkillWarp Community"
                    className="w-full"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-6 rounded-full bg-white/15 backdrop-blur-md border border-white/30 cursor-pointer shadow-[0_0_50px_rgba(59,130,246,0.5)]"
                    >
                      <Play className="w-10 h-10 text-white fill-white ml-1" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <ShimmerDivider color="blue" />

        {/* ===== OUR STORY ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-purple-500/15 text-purple-300 border border-purple-500/30 mb-5 backdrop-blur-xl">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Our Journey
              </span>
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-5 tracking-tight">
              The Story Behind SkillWarp
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From a simple idea to a global movement
            </p>
          </motion.div>

          {/* Story cards with images */}
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
            <motion.div variants={itemVariants}>
              <GlowCard glow="rgba(168,85,247,0.2)" className="rounded-3xl overflow-hidden">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1522202176986-dbc9191953ca?auto=format&fit=crop&w=800&q=80"
                    alt="Team collaboration"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 text-purple-300 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Founded in 2021</span>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                <p className="text-lg text-slate-300 leading-relaxed">
                  SkillWarp was born from a simple but powerful belief:{" "}
                  <span className="text-white font-semibold">everyone has something valuable to teach, and everyone has something they want to learn.</span>
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                <p className="text-lg text-slate-300 leading-relaxed">
                  Traditional education puts knowledge behind paywalls, certificates, and rigid structures. We saw a different way — a teenager in Jakarta learning guitar from a musician in Nashville.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 backdrop-blur-xl">
                <p className="text-lg text-slate-300 leading-relaxed">
                  We are not just building a platform —{" "}
                  <span className="text-cyan-400 font-semibold">we are building a movement where human potential is unlocked through genuine connection.</span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="relative mt-20">
            {timelineEvents.map((event, i) => (
              <TimelineItem
                key={i}
                year={event.year}
                title={event.title}
                description={event.description}
                index={i}
                isLeft={i % 2 === 0}
              />
            ))}
          </div>
        </motion.section>

        <ShimmerDivider color="purple" />

        {/* ===== MISSION & VISION ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-5 backdrop-blur-xl">
              <span className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Purpose & Direction
              </span>
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent mb-5 tracking-tight">
              Mission & Vision
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Driving principles that guide everything we build
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div variants={itemVariants} whileHover={{ y: -8 }}>
              <GlowCard glow="rgba(6,182,212,0.25)" className="h-full rounded-3xl overflow-hidden">
                <div className="relative p-8 md:p-10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-400/20 backdrop-blur-2xl">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-2xl opacity-50"
                  />
                  <div className="relative z-10">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 w-fit mb-6 shadow-lg shadow-cyan-500/30">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                    <p className="text-slate-300 leading-relaxed text-lg">
                      To democratize skill sharing globally by creating the most accessible, human-centric platform where every person can both teach and learn — regardless of location, background, or economic status.
                    </p>
                  </div>
                </div>
              </GlowCard>
            </motion.div>

            {/* Vision */}
            <motion.div variants={itemVariants} whileHover={{ y: -8 }}>
              <GlowCard glow="rgba(168,85,247,0.25)" className="h-full rounded-3xl overflow-hidden">
                <div className="relative p-8 md:p-10 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-400/20 backdrop-blur-2xl">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-2xl opacity-50"
                  />
                  <div className="relative z-10">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 w-fit mb-6 shadow-lg shadow-purple-500/30">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                    <p className="text-slate-300 leading-relaxed text-lg">
                      A world where knowledge flows freely across borders, where learning is measured by growth rather than credentials, and where every person can unlock their full potential through community.
                    </p>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </div>
        </motion.section>

        <ShimmerDivider color="emerald" />

        {/* ===== CORE VALUES ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 mb-5 backdrop-blur-xl">
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                What We Stand For
              </span>
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent mb-5 tracking-tight">
              Our Core Values
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GlowCard glow="rgba(16,185,129,0.2)" className="h-full rounded-2xl overflow-hidden">
                  <div className="relative p-6 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl text-center group transition-all duration-500 hover:border-emerald-400/30">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                      transition={{ duration: 0.5 }}
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.gradient} mb-5 shadow-lg`}
                    >
                      <value.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <ShimmerDivider color="blue" />

        {/* ===== PLATFORM FEATURES ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30 mb-5 backdrop-blur-xl">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Platform Features
              </span>
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-indigo-300 to-blue-300 bg-clip-text text-transparent mb-5 tracking-tight">
              Everything You Need
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A complete ecosystem for learning, teaching, and growing together
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GlowCard glow="rgba(59,130,246,0.2)" className="h-full rounded-2xl overflow-hidden">
                  <div className="relative p-7 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl group transition-all duration-500 hover:border-blue-400/30">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-5 shadow-lg`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <ShimmerDivider color="purple" />

        {/* ===== MEET OUR TUTORS ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-5 backdrop-blur-xl">
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Expert Mentors
              </span>
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent mb-5 tracking-tight">
              Meet Our Amazing Tutors
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Learn from passionate experts who love sharing their knowledge
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tutors.map((tutor, i) => (
              <TutorCard key={i} tutor={tutor} index={i} />
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-12">
            <motion.a
              href="/tutors"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-400/30 text-cyan-300 font-semibold backdrop-blur-xl hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all"
            >
              <Users className="w-5 h-5" />
              Browse All Tutors
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.section>

        <ShimmerDivider color="pink" />

        {/* ===== MEET THE TEAM ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-pink-500/15 text-pink-300 border border-pink-500/30 mb-5 backdrop-blur-xl">
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                The Humans Behind
              </span>
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 bg-clip-text text-transparent mb-5 tracking-tight">
              Meet Our Leadership
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Passionate builders dedicated to democratizing education worldwide
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <TeamCard key={idx} member={member} index={idx} />
            ))}
          </div>
        </motion.section>

        <ShimmerDivider color="blue" />

        {/* ===== TRUST & COMMUNITY ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <GlowCard glow="rgba(59,130,246,0.2)" className="rounded-3xl overflow-hidden">
              <div className="relative p-8 md:p-14 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-400/20 backdrop-blur-2xl">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                  className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
                />

                <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 1 }}
                    className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/25 to-indigo-500/25 flex-shrink-0 shadow-lg shadow-blue-500/20"
                  >
                    <ShieldCheck className="w-10 h-10 text-blue-300" />
                  </motion.div>

                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent mb-6 tracking-tight">
                      Trust & Community Standards
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                      SkillWarp is built on a foundation of{" "}
                      <span className="text-blue-400 font-semibold">respect, honesty, and accountability</span>. Every member of our community agrees to uphold these values.
                    </p>
                    <p className="text-slate-400 leading-relaxed mb-8">
                      Fake skills, spam, harassment, and abuse are not tolerated. Our moderation systems — both AI-powered and human — work around the clock to protect genuine learners and teachers.
                    </p>

                    <div className="flex flex-wrap gap-4">
                      {[
                        { icon: CheckCircle, text: "Verified Profiles" },
                        { icon: ShieldCheck, text: "24/7 Moderation" },
                        { icon: Heart, text: "Safe Community" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                          <item.icon className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm text-slate-300">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </motion.section>

        <ShimmerDivider color="cyan" />

        {/* ===== FINAL CTA ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24 max-w-5xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="relative p-12 md:p-20 rounded-[2rem] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-white/10 backdrop-blur-2xl overflow-hidden"
          >
            {/* Background effects */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-0 left-1/4 w-80 h-80 bg-blue-500/25 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 10, repeat: Infinity, delay: 2 }}
              className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/25 rounded-full blur-[120px]"
            />

            {/* Animated top line */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"
            />

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-8"
              >
                <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-[0_0_40px_rgba(6,182,212,0.5)]">
                  <Rocket className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="bg-[linear-gradient(90deg,#3b82f6,#8b5cf6,#06b6d4,#3b82f6)] bg-[length:200%_auto] bg-clip-text text-transparent"
                >
                  Join the Movement
                </motion.span>
              </h2>

              <p className="text-slate-300 mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                SkillWarp is more than a platform — it is a <span className="text-cyan-400 font-semibold">global movement</span>. Your skills matter. Your knowledge can change someone&apos;s life.{" "}
                <span className="text-purple-400 font-semibold">Be part of the future of learning.</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href="/signup"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_60px_rgba(6,182,212,0.5)]"
                >
                  <span className="relative z-10 text-white">Start Your Journey</span>
                  <ArrowRight className="relative z-10 w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                </motion.a>

                <motion.a
                  href="/explore"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-white/5 border border-white/15 font-semibold text-lg backdrop-blur-xl hover:border-cyan-400/40 transition-all"
                >
                  <span className="text-slate-200 group-hover:text-white transition-colors">Explore Skills</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ===== FOOTER ===== */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-12 border-t border-white/5"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-xl font-bold text-white">SkillWarp</span>
          </div>
          <p className="text-slate-500 text-sm">
            Connecting learners and teachers worldwide. Made with{" "}
            <Heart className="w-3 h-3 inline text-pink-500" /> for the global community.
          </p>
          <p className="text-slate-600 text-xs mt-2">
            &copy; 2025 SkillWarp. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </main>
  );
}

// React import fix
import { useEffect } from "react";

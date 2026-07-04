
// import {
//   Inbox,
//   Send,
//   Layers,
//   Trophy,
//   Sparkles,
//   Plus,
//   Copy,
//   Check,
//   Zap,
//   ArrowRight,
//   TrendingUp,
//   Star,
//   Activity,
//   Clock,
//   CheckCircle2,
//   Circle,
//   Flame,
//   Target,
//   Users,
//   ChevronRight,
//   Search,
//   Edit3,
//   Crown,
//   Wallet,
//   Gift
// } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import RecentActivity from "../components/RecentActivity";
// import Achievements from "../components/Achievements";

// // ─── Types ────────────────────────────────────────────────────────────────────
// interface Stats {
//   receivedRequests: number;
//   sendRequests: number;
//   createdSkills: number;
//   succesfullExchnage: number;
// }

// interface User {
//   username?: string;
//   email?: string;
//   img_url?: string;
//   created_at?: string;
//   xp?: number;
//   points?: number;
//   level: number;
//   streak: number;
//   referral_code?: string;
// }

// interface Props {
//   stats: Stats;
//   user: User;
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// function getExchangeLevel(xp: number) {
//   if (xp >= 5000) return { label: "Grandmaster", color: "from-amber-400 to-orange-500", next: 10000, current: 5 };
//   if (xp >= 2000) return { label: "Expert", color: "from-cyan-400 to-blue-500", next: 5000, current: 4 };
//   if (xp >= 800) return { label: "Skilled", color: "from-teal-400 to-cyan-500", next: 2000, current: 3 };
//   if (xp >= 300) return { label: "Apprentice", color: "from-blue-400 to-teal-400", next: 800, current: 2 };
//   return { label: "Newcomer", color: "from-slate-400 to-blue-400", next: 300, current: 1 };
// }

// // ─── Animated Counter ─────────────────────────────────────────────────────────
// function AnimatedCounter({ target, duration = 1200 }: { target: number; duration?: number }) {
//   const [count, setCount] = useState(0);
//   const rafRef = useRef<number | null>(null);
//   const startRef = useRef<number | null>(null);

//   useEffect(() => {
//     if (target === 0) { setCount(0); return; }
//     startRef.current = null;
//     const step = (ts: number) => {
//       if (!startRef.current) startRef.current = ts;
//       const progress = Math.min((ts - startRef.current) / duration, 1);
//       const ease = 1 - Math.pow(1 - progress, 3);
//       setCount(Math.round(target * ease));
//       if (progress < 1) rafRef.current = requestAnimationFrame(step);
//     };
//     rafRef.current = requestAnimationFrame(step);
//     return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
//   }, [target, duration]);

//   return <span>{count}</span>;
// }

// // ─── Floating Particle Component ─────────────────────────────────────────────
// function FloatingParticle({ delay, size, left, duration }: { delay: number; size: number; left: string; duration: number }) {
//   return (
//     <div
//       className="absolute rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/10 blur-sm animate-float-up"
//       style={{
//         width: size,
//         height: size,
//         left,
//         bottom: "-5%",
//         animationDelay: `${delay}s`,
//         animationDuration: `${duration}s`,
//       }}
//     />
//   );
// }

// // ─── Stat Card ────────────────────────────────────────────────────────────────
// function StatCard({
//   title, value, icon, gradient, delay, suffix = "",
// }: {
//   title: string;
//   value: number;
//   icon: React.ReactNode;
//   gradient: string;
//   delay: number;
//   suffix?: string;
// }) {
//   const [visible, setVisible] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setVisible(true); },
//       { threshold: 0.3 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

//   return (
//     <div
//       ref={ref}
//       className="group relative"
//       style={{
//         opacity: visible ? 1 : 0,
//         transform: visible ? "translateY(0) scale(1)" : "translateY(24px) scale(0.95)",
//         transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
//       }}
//     >
//       <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
//         style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }} />

//       <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${gradient}`} style={{ padding: '1px' }}>
//         <div className="w-full h-full rounded-2xl bg-slate-950" />
//       </div>

//       <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-2xl border border-white/[0.08] group-hover:border-white/[0.15] group-hover:shadow-2xl group-hover:shadow-cyan-500/10 group-hover:-translate-y-1 transition-all duration-500">
//         <div className="flex items-start justify-between mb-4">
//           <div className={`relative p-3.5 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
//             <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-50" />
//             <div className="relative text-white">{icon}</div>
//           </div>
//           <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
//             <TrendingUp size={12} className="text-emerald-400" />
//             <span className="text-[10px] font-semibold text-emerald-400">+12%</span>
//           </div>
//         </div>

//         <div className="mt-2">
//           {value === 0 ? (
//             <div className="flex items-center gap-2">
//               <div className="h-9 w-20 rounded-lg bg-white/5 animate-pulse" />
//             </div>
//           ) : (
//             <div className="flex items-baseline gap-1">
//               <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 tracking-tight">
//                 {visible ? <AnimatedCounter target={value} /> : 0}
//               </span>
//               {suffix && <span className="text-lg text-slate-400">{suffix}</span>}
//             </div>
//           )}
//           <p className="text-xs text-slate-500 mt-2 font-medium uppercase tracking-[0.15em]">{title}</p>
//         </div>

//         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//       </div>
//     </div>
//   );
// }

// // ─── Feature Card ─────────────────────────────────────────────────────────────
// function FeatureCard({
//   icon, title, desc, href, accent,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   desc: string;
//   href: string;
//   accent: string;
// }) {
//   return (
//     <a
//       href={href}
//       className="group relative block"
//     >
//       <div className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 bg-gradient-to-r ${accent}`} />

//       <div className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-2xl border border-white/[0.06] group-hover:border-white/[0.12] group-hover:shadow-2xl group-hover:shadow-cyan-500/5 transition-all duration-500">
//         <div className={`relative inline-flex p-4 rounded-xl bg-gradient-to-br ${accent} mb-5 shadow-lg`}>
//           <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/25 to-transparent" />
//           <div className="relative text-white">{icon}</div>
//         </div>

//         <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>
//         <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>

//         <div className="mt-5 flex items-center gap-2">
//           <span className="text-xs font-semibold text-slate-500 group-hover:text-cyan-400 transition-colors duration-300">Open</span>
//           <ChevronRight size={14} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" />
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
//       </div>
//     </a>
//   );
// }

// // ─── XP Progress Ring ─────────────────────────────────────────────────────────
// function XPRing({ progress, level }: { progress: number; level: { label: string; color: string; current: number } }) {
//   const radius = 42;
//   const circumference = radius * 2 * Math.PI;
//   const strokeDashoffset = circumference - (progress / 100) * circumference;

//   return (
//     <div className="relative w-28 h-28">
//       <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
//         <circle
//           cx="50" cy="50" r={radius}
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="6"
//           className="text-slate-800/50"
//         />
//         <circle
//           cx="50" cy="50" r={radius}
//           fill="none"
//           strokeWidth="6"
//           strokeLinecap="round"
//           className={`bg-gradient-to-r ${level.color}`}
//           style={{
//             stroke: 'url(#gradient)',
//             strokeDasharray: circumference,
//             strokeDashoffset,
//             transition: 'stroke-dashoffset 1s ease-in-out',
//           }}
//         />
//         <defs>
//           <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#06b6d4" />
//             <stop offset="100%" stopColor="#0891b2" />
//           </linearGradient>
//         </defs>
//       </svg>
//       <div className="absolute inset-0 flex flex-col items-center justify-center">
//         <span className="text-2xl font-bold text-white">L{level.current}</span>
//         <span className="text-[10px] text-slate-400 uppercase tracking-wider">{level.label}</span>
//       </div>
//     </div>
//   );
// }

// const API_URL = "http://localhost:4000";

// // ─── Main Dashboard ────────────────────────────────────────────────────────────
// export default function ExchangeDashboard({ stats, user }: Props) {
//   const XP_PER_LEVEL = 100;
//   const totalXP = user?.xp ?? 0;
//   const points = user?.points ?? 0;
//   const level = getExchangeLevel(totalXP);
//   const xpProgress = Math.min(((points % level.next) / level.next) * 100, 100);
//   const referralUrl = `https://skillwrap2026.vercel.app/signup?ref=${user?.referral_code ?? ""}`;

//   const [copied, setCopied] = useState(false);
//   const [achievements, setAchievements] = useState([]);
//   const [heroVisible, setHeroVisible] = useState(false);
//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const t = setTimeout(() => setHeroVisible(true), 80);
//     return () => clearTimeout(t);
//   }, []);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(referralUrl).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2500);
//     });
//   };

//   useEffect(() => {
//     async function fetchAchievements() {
//       try {
//         const res = await fetch(`${API_URL}/achievements/achievement/user`, {
//           credentials: "include"
//         });
//         const data = await res.json();
//         setAchievements(data.achievements || []);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     fetchAchievements();
//   }, []);

//   useEffect(() => {
//     const fetchActivities = async () => {
//       try {
//         const res = await fetch(`${API_URL}/activity/get`, {
//           credentials: "include",
//         });
//         const data = await res.json();
//         setActivities(data);
//       } catch (err) {
//         console.log("Failed to load activities", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchActivities();
//   }, []);

//   return (
//     <div className="relative min-h-screen overflow-x-hidden bg-slate-950">
//       {/* ── Premium Animated Background ─────────────────────────────────────── */}
//       <div className="pointer-events-none fixed inset-0 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

//         {/* Animated gradient orbs */}
//         <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/10 blur-[100px] animate-pulse-slow" />
//         <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-cyan-500/12 to-teal-500/8 blur-[80px] animate-pulse-slower" />
//         <div className="absolute -bottom-40 left-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-teal-500/10 to-cyan-500/6 blur-[90px] animate-pulse-slowest" />
//         <div className="absolute top-2/3 right-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-amber-500/8 to-orange-500/5 blur-[70px]" />

//         {/* Floating particles */}
//         <div className="absolute inset-0 overflow-hidden">
//           {[...Array(12)].map((_, i) => (
//             <FloatingParticle
//               key={i}
//               delay={i * 1.5}
//               size={Math.random() * 4 + 2}
//               left={`${Math.random() * 100}%`}
//               duration={Math.random() * 10 + 15}
//             />
//           ))}
//         </div>

//         {/* Grid overlay */}
//         <div
//           className="absolute inset-0 opacity-[0.02]"
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px)
//             `,
//             backgroundSize: '60px 60px',
//           }}
//         />

//         {/* Gradient noise */}
//         <div className="absolute inset-0 opacity-20 mix-blend-soft-light"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
//           }}
//         />
//       </div>

//       {/* ── Content Container ───────────────────────────────────────────────── */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* ── Hero Header ───────────────────────────────────────────────────── */}
//         <div
//           className="relative mb-10 rounded-3xl overflow-hidden"
//           style={{
//             opacity: heroVisible ? 1 : 0,
//             transform: heroVisible ? "translateY(0)" : "translateY(-24px)",
//             transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
//           }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-3xl" />

//           {/* Animated border */}
//           <div className="absolute inset-0 rounded-3xl opacity-50">
//             <div className="absolute inset-0 rounded-3xl" style={{
//               background: 'linear-gradient(90deg, #0ea5e9, #06b6d4, #14b8a6, #0ea5e9)',
//               backgroundSize: '200% 100%',
//               animation: 'shimmer 3s linear infinite',
//               padding: '1px',
//               WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
//               WebkitMaskComposite: 'xor',
//               maskComposite: 'exclude',
//             }} />
//           </div>

//           {/* Inner gradients */}
//           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent opacity-60" />
//           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-teal-500/15 via-transparent to-transparent opacity-40" />

//           <div className="relative z-10 px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-[0.2em] uppercase">
//                   <Activity size={12} className="animate-pulse" />
//                   <span>Exchange Mode</span>
//                 </div>
//                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
//                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//                   Live
//                 </div>
//               </div>

//               <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">
//                 Trade Skills.{" "}
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 animate-gradient-x">
//                   Grow Faster.
//                 </span>
//               </h1>
//               <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
//                 Teach what you know, learn what you need — skill for skill.
//               </p>
//             </div>

//             {/* Quick Stats */}
//             <div className="flex items-center gap-3 flex-shrink-0">
//               <div className="px-5 py-3 rounded-xl bg-slate-800/50 border border-white/[0.06] backdrop-blur-xl">
//                 <div className="text-2xl font-bold text-white">{stats.succesfullExchnage}</div>
//                 <div className="text-[10px] text-slate-500 uppercase tracking-wider">Exchanges</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Profile Card ───────────────────────────────────────────────────── */}
//         <div
//           className="mb-8 relative"
//           style={{
//             opacity: heroVisible ? 1 : 0,
//             transform: heroVisible ? "translateY(0)" : "translateY(20px)",
//             transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
//           }}
//         >
//           <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-blue-500/20 blur-2xl opacity-50" />

//           <div className="relative rounded-2xl overflow-hidden backdrop-blur-3xl bg-slate-900/60 border border-white/[0.08] shadow-2xl shadow-black/20">
//             <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-transparent to-slate-900/50" />

//             <div className="relative z-10 p-6 lg:p-8">
//               <div className="flex flex-col lg:flex-row items-center gap-8">
//                 {/* Avatar Section */}
//                 <div className="flex flex-col items-center gap-4 lg:gap-6">
//                   <div className="relative group">
//                     <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${level.color} blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
//                     <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-40 animate-pulse" style={{ animationDuration: '2s' }} />
//                     <img
//                       src={user?.img_url || "/avatar.png"}
//                       alt="Profile"
//                       width={100}
//                       height={100}
//                       className="relative rounded-full border-2 border-white/20 object-cover ring-4 ring-slate-900"
//                       style={{ width: 100, height: 100 }}
//                     />
//                     <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-lg shadow-emerald-400/50" />
//                   </div>

//                   {/* XP Ring for larger screens */}
//                   <div className="hidden lg:block">
//                     <XPRing progress={xpProgress} level={level} />
//                   </div>
//                 </div>

//                 {/* Info Section */}
//                 <div className="flex-1 w-full">
//                   <div className="flex flex-col lg:flex-row lg:items-start gap-6">
//                     {/* User Info */}
//                     <div className="flex-1 text-center lg:text-left">
//                       <h2 className="text-2xl font-bold text-white mb-1">
//                         {user?.username || "Skill Exchanger"}
//                       </h2>
//                       <p className="text-sm text-slate-400 mb-4">{user?.email}</p>

//                       {/* XP Progress - Mobile */}
//                       <div className="lg:hidden mb-4">
//                         <div className="flex justify-between text-xs text-slate-400 mb-2">
//                           <span className="font-medium text-white/80">Level {level.current} • {level.label}</span>
//                           <span>{totalXP} / {level.next} XP</span>
//                         </div>
//                         <div className="h-2.5 rounded-full bg-slate-800/80 overflow-hidden border border-white/5">
//                           <div
//                             className={`h-full bg-gradient-to-r ${level.color} transition-all duration-1000 ease-out rounded-full relative`}
//                             style={{ width: `${xpProgress}%` }}
//                           >
//                             <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
//                           </div>
//                         </div>
//                         <p className="text-xs text-slate-500 mt-1.5">
//                           {level.next - totalXP} XP to next level
//                         </p>
//                       </div>

//                       {/* Stats Pills */}
//                       <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
//                         <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-400/20 shadow-lg shadow-amber-500/5">
//                           <Star size={16} className="text-amber-400" />
//                           <span className="text-amber-300 font-bold text-lg">
//                             {totalXP.toLocaleString()}
//                           </span>
//                           <span className="text-amber-400/60 text-xs font-medium">XP</span>
//                         </div>

//                         <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r ${level.color} border border-white/10 shadow-lg`}>
//                           <Crown size={14} className="text-white" />
//                           <span className="text-white text-sm font-bold">
//                             L{level.current}
//                           </span>
//                         </div>

//                         <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/15 to-teal-500/10 border border-emerald-400/20 shadow-lg shadow-emerald-500/5">
//                           <Wallet size={14} className="text-emerald-400" />
//                           <span className="text-emerald-300 text-sm font-bold">
//                             {user?.points ?? 0}
//                           </span>
//                           <span className="text-emerald-400/60 text-xs font-medium">pts</span>
//                         </div>

//                         <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500/15 to-red-500/10 border border-orange-400/20 shadow-lg shadow-orange-500/5">
//                           <Flame size={14} className="text-orange-400" />
//                           <span className="text-orange-300 text-sm font-bold">
//                             {user?.streak ?? 0}
//                           </span>
//                           <span className="text-orange-400/60 text-xs font-medium">streak</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* XP Progress - Desktop */}
//                     <div className="hidden lg:block w-full max-w-xs">
//                       <div className="flex justify-between text-xs text-slate-400 mb-2">
//                         <span className="font-medium text-white/80">Level {level.current} • {level.label}</span>
//                         <span>{totalXP} / {level.next} XP</span>
//                       </div>
//                       <div className="h-2.5 rounded-full bg-slate-800/80 overflow-hidden border border-white/5">
//                         <div
//                           className={`h-full bg-gradient-to-r ${level.color} transition-all duration-1000 ease-out rounded-full relative`}
//                           style={{ width: `${xpProgress}%` }}
//                         >
//                           <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
//                         </div>
//                       </div>
//                       <p className="text-xs text-slate-500 mt-1.5 text-right">
//                         {level.next - totalXP} XP to next level
//                       </p>
//                     </div>

//                     {/* CTA */}
//                     <div className="flex-shrink-0 mt-4 lg:mt-0">
//                       <a
//                         href="/create-skill"
//                         className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
//                       >
//                         <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
//                         Create Skill
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Stats Grid ─────────────────────────────────────────────────────── */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
//           <StatCard
//             title="Received"
//             value={stats.receivedRequests}
//             icon={<Inbox size={22} />}
//             gradient="from-blue-500 to-cyan-500"
//             delay={0}
//           />
//           <StatCard
//             title="Sent"
//             value={stats.sendRequests}
//             icon={<Send size={22} />}
//             gradient="from-cyan-500 to-teal-500"
//             delay={100}
//           />
//           <StatCard
//             title="Skills"
//             value={stats.createdSkills}
//             icon={<Layers size={22} />}
//             gradient="from-teal-500 to-emerald-500"
//             delay={200}
//           />
//           <StatCard
//             title="Exchanges"
//             value={stats.succesfullExchnage}
//             icon={<Trophy size={22} />}
//             gradient="from-amber-500 to-orange-500"
//             delay={300}
//           />
//         </div>

//         {/* ── Activity & Achievements ───────────────────────────────────────── */}
//         <div className="mb-10">
//           <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
//             <div className="xl:col-span-3 order-2 xl:order-1">
//               <RecentActivity activities={activities} loading={loading} />
//             </div>
//             <div className="xl:col-span-2 order-1 xl:order-2">
//               <Achievements achievements={achievements} />
//             </div>
//           </div>
//         </div>

//         {/* ── Insight Card ──────────────────────────────────────────────────── */}
//         <div className="mb-10">
//           <div className="relative rounded-2xl overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-blue-500/10 backdrop-blur-xl" />
//             <div className="absolute inset-0 border border-teal-400/20 rounded-2xl" />

//             <div className="relative z-10 p-6">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/10 border border-teal-400/30">
//                   <Sparkles size={18} className="text-teal-400" />
//                 </div>
//                 <h3 className="font-bold text-white">Weekly Insight</h3>
//               </div>
//               <p className="text-sm text-slate-400 leading-relaxed">
//                 You're in the <span className="text-teal-400 font-semibold">top 12%</span> of exchangers this week. Keep the momentum — one more completed exchange unlocks <span className="text-amber-400 font-semibold">Expert</span> status.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* ── Referral Section ──────────────────────────────────────────────── */}
//         <div className="mb-10 relative">
//           <div className="absolute -inset-0.5 rounded-3xl opacity-50">
//             <div className="absolute inset-0 rounded-3xl" style={{
//               background: 'linear-gradient(90deg, #f59e0b, #f97316, #eab308, #22c55e, #14b8a6, #06b6d4, #3b82f6, #f59e0b)',
//               backgroundSize: '400% 100%',
//               animation: 'shimmer 8s linear infinite',
//             }} />
//           </div>

//           <div className="relative rounded-2xl overflow-hidden backdrop-blur-3xl bg-gradient-to-br from-slate-900/95 to-slate-950/95 border border-white/[0.08] shadow-2xl shadow-black/40">
//             <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/3 to-slate-900/5" />

//             <div className="relative z-10 px-8 py-10">
//               <div className="flex flex-col lg:flex-row items-center gap-10">
//                 <div className="flex-1 text-center lg:text-left">
//                   <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
//                     <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-400/30">
//                       <Gift size={24} className="text-amber-400" />
//                     </div>
//                     <span className="text-amber-300 font-bold text-sm uppercase tracking-[0.2em]">Referral Program</span>
//                   </div>

//                   <h3 className="text-3xl font-bold text-white mb-3">
//                     Invite Friends &{" "}
//                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400">
//                       Earn Rewards
//                     </span>
//                   </h3>
//                   <p className="text-slate-400 text-base leading-relaxed max-w-md">
//                     Share your unique link. When someone signs up through it, you both earn bonus XP — instantly.
//                   </p>

//                   <div className="flex items-center justify-center lg:justify-start gap-3 mt-6">
//                     <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold">
//                       <Zap size={12} /> +50 pts each
//                     </div>
//                     <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-semibold">
//                       <Star size={12} /> Bonus at 5 refs
//                     </div>
//                   </div>
//                 </div>

//                 <div className="w-full lg:w-auto lg:min-w-[400px]">
//                   <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">Your referral link</p>
//                   <div className="flex items-center gap-3">
//                     <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-xl bg-slate-800/60 border border-white/[0.08] min-w-0 backdrop-blur-xl">
//                       <span className="text-sm text-slate-300 truncate flex-1 font-mono">
//                         {referralUrl}
//                       </span>
//                     </div>
//                     <button
//                       onClick={handleCopy}
//                       className={`flex items-center gap-2 px-6 py-4 rounded-xl font-bold text-sm transition-all duration-300 flex-shrink-0 ${
//                         copied
//                           ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 scale-105"
//                           : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95"
//                       }`}
//                     >
//                       {copied ? (
//                         <><Check size={16} className="animate-scale-in" /> Copied!</>
//                       ) : (
//                         <><Copy size={16} /> Copy</>
//                       )}
//                     </button>
//                   </div>
//                   <div className="mt-3 flex items-center gap-2">
//                     <span className="text-xs text-slate-500">Referral code:</span>
//                     <span className="text-cyan-400 font-mono font-bold text-sm">{user?.referral_code ?? "—"}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── CTA Section ───────────────────────────────────────────────────── */}
//         <div className="grid sm:grid-cols-2 gap-5 mb-10">
//           <a href="/skills" className="group relative block">
//             <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 bg-gradient-to-r from-blue-500/30 to-cyan-500/30" />
//             <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-2xl border border-white/[0.06] group-hover:border-blue-400/20 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/10">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/30">
//                   <Search size={24} className="text-white" />
//                 </div>
//                 <div className="p-3 rounded-xl bg-white/5 group-hover:bg-blue-500/10 transition-colors">
//                   <ArrowRight size={20} className="text-blue-400/60 group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
//                 </div>
//               </div>
//               <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">Find Skill Match</h3>
//               <p className="text-sm text-slate-400 leading-relaxed">
//                 Browse the marketplace to find the perfect exchange partner matching your needs.
//               </p>
//             </div>
//           </a>

//           <a href="/create-skill" className="group relative block">
//             <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 bg-gradient-to-r from-teal-500/30 to-cyan-500/30" />
//             <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-2xl border border-white/[0.06] group-hover:border-teal-400/20 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-teal-500/10">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg shadow-teal-500/30">
//                   <Edit3 size={24} className="text-white" />
//                 </div>
//                 <div className="p-3 rounded-xl bg-white/5 group-hover:bg-teal-500/10 transition-colors">
//                   <ArrowRight size={20} className="text-teal-400/60 group-hover:text-teal-300 group-hover:translate-x-1 transition-all" />
//                 </div>
//               </div>
//               <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">Create Better Offer</h3>
//               <p className="text-sm text-slate-400 leading-relaxed">
//                 Refine your skill listing to attract more high-quality exchange requests.
//               </p>
//             </div>
//           </a>
//         </div>

//         {/* ── Exchange Actions ──────────────────────────────────────────────── */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-white mb-2">Exchange Actions</h2>
//           <p className="text-sm text-slate-400 max-w-xl">
//             Manage your active exchanges, review requests, and track skills shared with others.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6 pb-12">
//           <FeatureCard
//             icon={<Layers size={24} />}
//             title="My Skills"
//             desc="Maintain the skills you're offering for exchange."
//             href="/my-skill"
//             accent="from-cyan-500 to-blue-600"
//           />
//           <FeatureCard
//             icon={<Inbox size={24} />}
//             title="Received Requests"
//             desc="Respond to incoming exchange requests."
//             href="/request-recieved"
//             accent="from-blue-500 to-indigo-600"
//           />
//           <FeatureCard
//             icon={<Send size={24} />}
//             title="Sent Requests"
//             desc="Track exchanges you've initiated."
//             href="/request-sent"
//             accent="from-teal-500 to-cyan-600"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }



import {
  motion,
  AnimatePresence,
  Variants,
} from "framer-motion";
import {
  Inbox,
  Send,
  Layers,
  Trophy,
  Sparkles,
  Plus,
  Copy,
  Check,
  Zap,
  ArrowRight,
  TrendingUp,
  Star,
  Activity,
  CheckCircle2,
  Flame,
  Search,
  Edit3,
  Crown,
  Wallet,
  Gift,
  Medal,
  Rocket,
  BarChart3,
  Compass,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import RecentActivity from "../components/RecentActivity";
import Achievements from "../components/Achievements";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Stats {
  receivedRequests: number;
  sendRequests: number;
  createdSkills: number;
  succesfullExchnage: number;
}

interface User {
  username?: string;
  email?: string;
  img_url?: string;
  created_at?: string;
  xp?: number;
  points?: number;
  level: number;
  streak: number;
  referral_code?: string;
}

interface Props {
  stats: Stats;
  user: User;
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || target === 0) return;
    let start = 0;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(target * ease));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return <span ref={ref}>{count}</span>;
}

// ─── Level Badge ────────────────────────────────────────────────────────────
function LevelBadge({ level, gradient }: { level: number; gradient: string }) {
  return (
    <motion.div
      className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full"
      style={{
        background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
        boxShadow: `0 4px 20px rgba(6, 182, 212, 0.3)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradient}`} />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-50" />
      <Crown size={14} className="relative text-white" />
      <span className="relative text-white font-bold text-sm">Level {level}</span>
    </motion.div>
  );
}

// ─── Premium Level Ring ──────────────────────────────────────────────────────
function PremiumLevelRing({
  xp,
  level,
  nextLevelXP,
  levelLabel,
  gradient,
}: {
  xp: number;
  level: number;
  nextLevelXP: number;
  levelLabel: string;
  gradient: string;
}) {
  const progress = Math.min((xp / nextLevelXP) * 100, 100);
  const radius = 62;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
    >
      <div className="relative" style={{ width: 190, height: 190 }}>
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{ background: `linear-gradient(135deg, ${gradient})` }}
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <svg className="transform -rotate-90" width={190} height={190}>
          <defs>
            <linearGradient id="levelRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <filter id="ringGlowFilter">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background ring */}
          <circle
            cx={95}
            cy={95}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={10}
          />

          {/* Progress ring */}
          <motion.circle
            cx={95}
            cy={95}
            r={radius}
            fill="none"
            stroke="url(#levelRingGradient)"
            strokeWidth={10}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            style={{ strokeDasharray: circumference, filter: "url(#ringGlowFilter)" }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Crown size={18} className="text-amber-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Level</span>
            </div>
            <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-200 to-blue-300">
              {level}
            </span>
            <p className="text-xs text-slate-500 mt-1 font-medium">{levelLabel}</p>
          </motion.div>
        </div>
      </div>

      {/* XP info below ring */}
      <div className="text-center mt-5">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap size={16} className="text-cyan-400" />
          <span className="text-xl font-bold text-white">{xp.toLocaleString()} XP</span>
        </div>
        <div className="flex items-center justify-center gap-1 text-xs text-slate-400">
          <span>{nextLevelXP - xp} XP to Level {level + 1}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Stat Pebble ────────────────────────────────────────────────────────────
function StatPebble({
  icon,
  value,
  label,
  gradient,
  delay = 0,
}: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  gradient: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

      <div className="relative flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-white/[0.06] group-hover:border-white/[0.12] group-hover:-translate-y-0.5 transition-all duration-300">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          <div className="text-white">{icon}</div>
        </div>
        <div>
          <p className="text-xl font-bold text-white">{value}</p>
          <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Premium Stat Card ──────────────────────────────────────────────────────
function PremiumStatCard({
  title,
  value,
  icon,
  gradient,
  delay = 0,
  accentColor = "cyan",
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  delay?: number;
  accentColor?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const glowColors: Record<string, string> = {
    cyan: "rgba(6, 182, 212, 0.15)",
    blue: "rgba(59, 130, 246, 0.15)",
    emerald: "rgba(16, 185, 129, 0.15)",
    amber: "rgba(251, 191, 36, 0.15)",
    purple: "rgba(139, 92, 246, 0.15)",
  };

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: glowColors[accentColor],
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-2xl border border-white/[0.06] group-hover:border-white/[0.15] overflow-hidden transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
        {/* Animated border shine */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={isHovered ? { backgroundPosition: ["-200% 0", "200% 0"] } : {}}
          transition={{ duration: 1.5, ease: "linear" }}
        />

        {/* Top corner glow */}
        <div className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-5">
            <motion.div
              className={`p-3.5 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
              whileHover={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-white">{icon}</div>
            </motion.div>

            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <TrendingUp size={12} className="text-emerald-400" />
              <span className="text-[10px] font-semibold text-emerald-400">Active</span>
            </div>
          </div>

          <div>
            <p className="text-3xl sm:text-4xl font-bold text-white mb-1 tracking-tight">
              {isVisible ? <AnimatedCounter target={value} /> : 0}
            </p>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">{title}</p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

// ─── Action Card ────────────────────────────────────────────────────────────
function ActionCard({
  icon,
  title,
  description,
  href,
  gradient,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  gradient: string;
  delay?: number;
}) {
  return (
    <motion.a
      href={href}
      className="group relative block"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background glow */}
      <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`} />

      <div className="relative h-full p-7 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-2xl border border-white/[0.06] group-hover:border-white/[0.15] overflow-hidden transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
        {/* Top accent */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        {/* Corner glow */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500`} />

        <div className="relative z-10 flex items-start gap-5">
          <motion.div
            className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}
            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-white">{icon}</div>
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">{description}</p>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-500 group-hover:text-cyan-400 transition-colors duration-300">
                Open
              </span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors duration-300" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

// ─── Floating Orb ───────────────────────────────────────────────────────────
function FloatingOrb({ color, size, position, delay }: { color: string; size: number; position: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        [position]: -size / 3,
      }}
      animate={{
        y: [0, 30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{
        duration: 12 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// ─── Particle ───────────────────────────────────────────────────────────────
function Particle({ delay, x }: { delay: number; x: string }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
      style={{ left: x, bottom: "10%" }}
      animate={{
        y: [0, -800],
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

// ─── Get Level Info ─────────────────────────────────────────────────────────
function getLevelInfo(xp: number) {
  if (xp >= 5000) return { label: "Grandmaster", color: "from-amber-400 to-orange-500", next: 10000, current: 5 };
  if (xp >= 2000) return { label: "Expert", color: "from-cyan-400 to-blue-500", next: 5000, current: 4 };
  if (xp >= 800) return { label: "Skilled", color: "from-teal-400 to-cyan-500", next: 2000, current: 3 };
  if (xp >= 300) return { label: "Apprentice", color: "from-blue-400 to-teal-400", next: 800, current: 2 };
  return { label: "Newcomer", color: "from-slate-400 to-blue-400", next: 300, current: 1 };
}

const API_URL = "http://localhost:4000";

// ─── Main Component ─────────────────────────────────────────────────────────
export default function ExchangeDashboard({ stats, user }: Props) {
  const totalXP = user?.xp ?? 0;
  const points = user?.points ?? 0;
  const levelInfo = getLevelInfo(totalXP);
  const referralUrl = `https://skillwrap2026.vercel.app/signup?ref=${user?.referral_code ?? ""}`;

  const [copied, setCopied] = useState(false);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const res = await fetch(`${API_URL}/achievements/achievement/user`, { credentials: "include" });
        const data = await res.json();
        setAchievements(data.achievements || []);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAchievements();
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(`${API_URL}/activity/get`, { credentials: "include" });
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        console.log("Failed to load activities", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const unlockedAchievements = achievements.filter((a) => a.unlocked).length;

  return (
    <motion.div
      className="relative min-h-screen overflow-x-hidden bg-slate-950"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ═══════ PREMIUM ANIMATED BACKGROUND ═══════ */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        {/* Floating orbs */}
        <FloatingOrb color="linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.2))" size={500} position="top" delay={0} />
        <FloatingOrb color="linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(6, 182, 212, 0.15))" size={400} position="top" delay={2} />
        <FloatingOrb color="linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.15))" size={350} position="bottom" delay={4} />
        <FloatingOrb color="linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(249, 115, 22, 0.15))" size={300} position="bottom" delay={6} />

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <Particle key={i} delay={i * 1.2} x={`${Math.random() * 100}%`} />
          ))}
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-10 mix-blend-soft-light" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(15,23,42,0.3)_100%)]" />
      </div>

      {/* ═══════ CONTENT ═══════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* ─── PREMIUM HERO ───────────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="mb-10">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated border */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4)",
                backgroundSize: "400% 400%",
                padding: "1px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative px-6 py-10 sm:px-10 sm:py-14 bg-gradient-to-br from-slate-900/95 via-slate-800/80 to-slate-900/95 backdrop-blur-3xl">
              {/* Background mesh */}
              <div className="absolute inset-0">
                <motion.div
                  className="absolute top-0 right-0 w-96 h-96 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)" }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-72 h-72 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.4, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                />
              </div>

              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                  <div>
                    <motion.div
                      className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Activity size={14} className="animate-pulse" />
                      <span>Exchange Mode Active</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </motion.div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                      Trade Skills,{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                        Grow Faster.
                      </span>
                    </h1>

                    <p className="text-slate-400 text-lg max-w-xl leading-relaxed mb-6">
                      Teach what you know, learn what you need — skill for skill.
                      Your exchange journey continues here.
                    </p>

                    {/* Quick stats pills */}
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <CheckCircle2 size={14} className="text-emerald-400" />
                        <span className="text-emerald-300 font-bold">{stats?.succesfullExchnage ?? 0}</span>
                        <span className="text-emerald-400/60 text-xs font-medium">Exchanges</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                        <Trophy size={14} className="text-cyan-400" />
                        <span className="text-cyan-300 font-bold">{unlockedAchievements}</span>
                        <span className="text-cyan-400/60 text-xs font-medium">Achievements</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                        <Flame size={14} className="text-orange-400" />
                        <span className="text-orange-300 font-bold">{user?.streak ?? 0}</span>
                        <span className="text-orange-400/60 text-xs font-medium">Day Streak</span>
                      </div>
                    </div>
                  </div>

                  {/* Level Ring - Desktop */}
                  <div className="hidden lg:block">
                    <PremiumLevelRing
                      xp={totalXP}
                      level={levelInfo.current}
                      nextLevelXP={levelInfo.next}
                      levelLabel={levelInfo.label}
                      gradient={levelInfo.color}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─── PREMIUM PROFILE ───────────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="mb-10">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-8">
              <div className="relative rounded-2xl overflow-hidden">
                {/* Gradient border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-purple-500/30 opacity-50 blur-sm" />

                <div className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-3xl border border-white/[0.06]">
                  {/* Corner glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />

                  <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      {/* Rotating ring */}
                      <motion.div
                        className="absolute inset-[-5px] rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${levelInfo.color}, transparent, ${levelInfo.color})`,
                          backgroundSize: "200% 200%",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />

                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                            <Image
                              src={user?.img_url || "/default-avatar.png"}
                              alt="profile"
                              width={80}
                              height={80}
                              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-slate-900 object-cover shadow-xl"
                            />
                        {/* <img
                          src={user?.img_url || "/avatar.png"}
                          alt="Profile"
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-slate-900 object-cover shadow-xl"
                        /> */}

                        {/* Online badge */}
                        <div className="absolute bottom-1.5 right-1.5 p-1 rounded-full bg-emerald-500 border-2 border-slate-900">
                          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                        </div>
                      </motion.div>
                    </div>

                    {/* User info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                        <h2 className="text-2xl font-bold text-white truncate">{user?.username || "Skill Exchanger"}</h2>
                        <LevelBadge level={levelInfo.current} gradient={levelInfo.color} />
                      </div>

                      <p className="text-slate-400 text-sm mb-4 truncate">{user?.email}</p>

                      {/* Stat chips row */}
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-400/20">
                          <Star size={14} className="text-amber-400" />
                          <span className="text-amber-300 font-bold">{points}</span>
                          <span className="text-[10px] text-amber-400/60 uppercase tracking-wider">Points</span>
                        </div>

                        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/5 border border-purple-400/20">
                          <Zap size={14} className="text-purple-400" />
                          <span className="text-purple-300 font-bold">{totalXP.toLocaleString()}</span>
                          <span className="text-[10px] text-purple-400/60 uppercase tracking-wider">XP</span>
                        </div>

                        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/5 border border-orange-400/20">
                          <Flame size={14} className="text-orange-400" />
                          <span className="text-orange-300 font-bold">{user?.streak ?? 0}</span>
                          <span className="text-[10px] text-orange-400/60 uppercase tracking-wider">Streak</span>
                        </div>

                        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/5 border border-cyan-400/20">
                          <Trophy size={14} className="text-cyan-400" />
                          <span className="text-cyan-300 font-bold">{unlockedAchievements}/{achievements.length}</span>
                          <span className="text-[10px] text-cyan-400/60 uppercase tracking-wider">Achieved</span>
                        </div>
                      </div>
                    </div>

                    {/* Create Skill CTA */}
                    <motion.a
                      href="/create-skill"
                      className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Plus size={18} />
                      <span>Create Skill</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Stats */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
              <StatPebble
                icon={<Inbox size={16} />}
                value={stats?.receivedRequests ?? 0}
                label="Received"
                gradient="from-blue-500 to-cyan-500"
                delay={0.1}
              />
              <StatPebble
                icon={<Send size={16} />}
                value={stats?.sendRequests ?? 0}
                label="Sent"
                gradient="from-cyan-500 to-teal-500"
                delay={0.2}
              />
              <StatPebble
                icon={<Layers size={16} />}
                value={stats?.createdSkills ?? 0}
                label="Skills"
                gradient="from-emerald-500 to-teal-500"
                delay={0.3}
              />
              <StatPebble
                icon={<Trophy size={16} />}
                value={stats?.succesfullExchnage ?? 0}
                label="Exchanges"
                gradient="from-amber-500 to-orange-500"
                delay={0.4}
              />
            </div>
          </div>
        </motion.section>

        {/* ─── MOBILE LEVEL PROGRESS ─────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="lg:hidden mb-10">
          <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/[0.06]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Crown size={18} className="text-amber-400" />
                <span className="text-white font-bold">Level {levelInfo.current}</span>
                <span className="text-xs text-slate-400">• {levelInfo.label}</span>
              </div>
              <span className="text-sm text-slate-400">{totalXP} / {levelInfo.next} XP</span>
            </div>

            <div className="relative h-3 rounded-full bg-slate-800/80 overflow-hidden">
              <motion.div
                className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${levelInfo.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((totalXP / levelInfo.next) * 100, 100)}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
            </div>

            <p className="text-xs text-slate-500 mt-2 text-center">
              {levelInfo.next - totalXP} XP until Level {levelInfo.current + 1}
            </p>
          </div>
        </motion.section>

        {/* ─── ACTIVITY & ACHIEVEMENTS ────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="mb-10">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            <div className="xl:col-span-3 order-2 xl:order-1">
              <RecentActivity activities={activities} loading={loading} />
            </div>
            <div className="xl:col-span-2 order-1 xl:order-2">
              <Achievements achievements={achievements} />
            </div>
          </div>
        </motion.section>

        {/* ─── INSIGHT CARD ────────────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="mb-10">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-px rounded-2xl bg-gradient-to-r from-teal-500/20 via-cyan-500/10 to-blue-500/20 opacity-50" />

            <div className="relative p-6 sm:p-8 bg-gradient-to-br from-teal-500/5 via-cyan-500/3 to-blue-500/5 border border-teal-500/20 backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/15 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col sm:flex-row items-start gap-5">
                <motion.div
                  className="flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/10 border border-teal-400/30"
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles size={24} className="text-teal-400" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Weekly Insight</h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                    You've completed <span className="text-teal-400 font-bold">{stats?.succesfullExchnage ?? 0} exchanges</span> and earned <span className="text-amber-400 font-bold">{points} points</span>.
                    {stats?.succesfullExchnage && stats.succesfullExchnage > 0
                      ? " Keep exchanging to unlock new achievements and climb the leaderboard."
                      : " Start your first exchange today to begin your journey."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─── REFERRAL SECTION ─────────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="mb-10">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated rainbow border */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "linear-gradient(90deg, #f59e0b, #f97316, #eab308, #22c55e, #14b8a6, #06b6d4, #3b82f6, #8b5cf6, #f59e0b)",
                backgroundSize: "400% 100%",
                padding: "1px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
              animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative px-6 py-10 sm:px-10 sm:py-14 bg-gradient-to-br from-slate-900/95 via-slate-800/80 to-slate-900/95 backdrop-blur-3xl border border-white/[0.06]">
              {/* Background glows */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-cyan-500/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-10">
                  <div className="flex-1 text-center lg:text-left">
                    <motion.div
                      className="inline-flex items-center gap-3 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-400/40 shadow-lg shadow-amber-500/20">
                        <Gift size={28} className="text-amber-300" />
                      </div>
                      <div>
                        <span className="text-amber-300 font-bold text-sm uppercase tracking-wider">Referral Program</span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white">
                          Invite & Earn Rewards
                        </h3>
                      </div>
                    </motion.div>

                    <p className="text-slate-400 max-w-lg mb-6 leading-relaxed">
                      Share your unique referral link. When someone signs up through it, you both earn bonus XP and points instantly.
                    </p>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                        <Zap size={12} />
                        <span>+50 XP each</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                        <Star size={12} />
                        <span>Bonus at 5 refs</span>
                      </div>
                    </div>
                  </div>

                  {/* Referral CTA */}
                  <div className="w-full lg:w-auto lg:min-w-[420px]">
                    <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/[0.06] backdrop-blur-xl">
                      <p className="text-xs text-slate-500 mb-3 uppercase tracking-wider font-medium">Your unique referral link</p>

                      <div className="flex flex-col sm:flex-row items-stretch gap-3">
                        <div className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-xl bg-slate-900/60 border border-white/[0.08] min-w-0">
                          <span className="text-sm text-slate-300 truncate flex-1 font-mono">
                            {referralUrl}
                          </span>
                        </div>

                        <motion.button
                          onClick={handleCopy}
                          className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                            copied
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30"
                              : "bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {copied ? (
                            <>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500 }}
                              >
                                <Check size={16} className="text-white" />
                              </motion.div>
                              <span className="text-white">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={16} className="text-white" />
                              <span className="text-white">Copy Link</span>
                            </>
                          )}
                        </motion.button>
                      </div>

                      <div className="flex items-center gap-2 mt-4 px-1">
                        <span className="text-xs text-slate-500">Referral code:</span>
                        <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono font-bold text-sm">
                          {user?.referral_code || "—"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ─── QUICK ACTIONS ────────────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="mb-10">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Quick Actions</h2>
            <p className="text-sm text-slate-400 max-w-lg">
              Navigate your exchange journey quickly with these essential tools.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <ActionCard
              icon={<Search size={24} />}
              title="Find Skill Matches"
              description="Browse the marketplace to discover perfect exchange partners for your learning goals."
              href="/skills"
              gradient="from-blue-500 to-cyan-600"
              delay={0}
            />
            <ActionCard
              icon={<Edit3 size={24} />}
              title="Create Skill Offer"
              description="Share what you know and attract quality exchange requests from eager learners."
              href="/create-skill"
              gradient="from-teal-500 to-emerald-600"
              delay={0.1}
            />
          </div>
        </motion.section>

        {/* ─── EXCHANGE MANAGEMENT ──────────────────────────────────────────────── */}
        <motion.section variants={itemVariants} className="mb-8">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Manage Exchanges</h2>
            <p className="text-sm text-slate-400 max-w-lg">
              Track your skills, review incoming requests, and monitor exchanges you've initiated.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 pb-8">
            <ActionCard
              icon={<Layers size={22} />}
              title="My Skills"
              description="Manage the skills you're offering for exchange."
              href="/my-skill"
              gradient="from-cyan-500 to-blue-600"
              delay={0}
            />
            <ActionCard
              icon={<Inbox size={22} />}
              title="Received Requests"
              description="Respond to incoming exchange requests."
              href="/request-recieved"
              gradient="from-blue-500 to-indigo-600"
              delay={0.1}
            />
            <ActionCard
              icon={<Send size={22} />}
              title="Sent Requests"
              description="Track exchanges you've initiated."
              href="/request-sent"
              gradient="from-teal-500 to-cyan-600"
              delay={0.2}
            />
          </div>
        </motion.section>

      </div>
    </motion.div>
  );
}

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   ArrowRight,
//   Search,
//   AlertCircle,
//   SlidersHorizontal,
//   Sparkles,
//   Filter,
//   TrendingUp,
//   Users,
//   Star,
//   Zap,
//   BookOpen,
//   Award,
//   Clock,
//   Heart,
//   ChevronRight,
//   Cpu,
//   Crown,
//   Flame,
//   Bookmark,
//   Eye,
//   Globe,
//   Briefcase,
//   Music,
//   Palette,
//   Code,
//   MessageSquare,
//   Heart as HeartIcon,
//   BookMarked,
// } from "lucide-react";
// import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

// /* ───────────────────────────────────────────────────────── */
// /* TYPES                                                      */
// /* ───────────────────────────────────────────────────────── */
// export interface Skill {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   level: string;
//   mode?: string;
//   skill_img?: string | null;
//   creator?: {
//     name: string;
//     avatar: string;
//     rating: number;
//     exchanges: number;
//   };
//   learners?: number;
//   rating?: number;
//   lessons?: number;
//   trending?: boolean;
//   aiRecommended?: boolean;
// }

// /* ───────────────────────────────────────────────────────── */
// /* CONSTANTS                                                 */
// /* ───────────────────────────────────────────────────────── */
// // const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";

// const FALLBACK_IMG =
//   "data:image/svg+xml;utf8," +
//   encodeURIComponent(
//     `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'>
//       <defs>
//         <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
//           <stop offset='0%' stop-color='%2306b6d4'/>
//           <stop offset='50%' stop-color='%233b82f6'/>
//           <stop offset='100%' stop-color='%23a855f7'/>
//         </linearGradient>
//       </defs>
//       <rect width='400' height='240' fill='url(%23g)' opacity='0.7'/>
//       <text x='50%' y='52%' text-anchor='middle' font-family='sans-serif' font-size='22' fill='white' font-weight='700'>
//         SkillWarp
//       </text>
//     </svg>`
//   );

// const featuredCategories = [
//   { name: "Design", icon: Palette, color: "from-pink-500 to-rose-500", count: 2840 },
//   { name: "Development", icon: Code, color: "from-cyan-400 to-blue-600", count: 3200 },
//   { name: "Marketing", icon: TrendingUp, color: "from-emerald-400 to-cyan-500", count: 1560 },
//   { name: "Music", icon: Music, color: "from-purple-500 to-pink-500", count: 980 },
// ];

// const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

// /* ───────────────────────────────────────────────────────── */
// /* ANIMATION VARIANTS                                        */
// /* ───────────────────────────────────────────────────────── */
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
// };

// /* ───────────────────────────────────────────────────────── */
// /* UTILITY COMPONENTS                                        */
// /* ───────────────────────────────────────────────────────── */
// function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const rotateX = useTransform(y, [-100, 100], [8, -8]);
//   const rotateY = useTransform(x, [-100, 100], [-8, 8]);

//   const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     x.set(e.clientX - rect.left - rect.width / 2);
//     y.set(e.clientY - rect.top - rect.height / 2);
//   };

//   return (
//     <motion.div
//       style={{ rotateX, rotateY, transformPerspective: 1000 }}
//       onMouseMove={handleMouse}
//       onMouseLeave={() => {
//         x.set(0);
//         y.set(0);
//       }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }

// function SkeletonCard() {
//   return (
//     <div className="relative bg-[#0d1021]/80 rounded-3xl overflow-hidden border border-white/5">
//       <div className="h-48 bg-gradient-to-br from-white/5 to-white/10 animate-pulse" />
//       <div className="p-6 space-y-4">
//         <div className="h-6 bg-white/10 rounded-lg w-3/4 animate-pulse" />
//         <div className="space-y-2">
//           <div className="h-4 bg-white/5 rounded w-full animate-pulse" />
//           <div className="h-4 bg-white/5 rounded w-2/3 animate-pulse" />
//         </div>
//         <div className="flex gap-3">
//           <div className="h-10 w-10 rounded-full bg-white/10 animate-pulse" />
//           <div className="flex-1 space-y-2">
//             <div className="h-3 bg-white/5 rounded w-1/2 animate-pulse" />
//             <div className="h-3 bg-white/5 rounded w-1/3 animate-pulse" />
//           </div>
//         </div>
//         <div className="h-12 bg-white/10 rounded-xl animate-pulse" />
//       </div>
//     </div>
//   );
// }

// function SkillCard({ skill, index, mode, onFavorite }: { skill: Skill; index: number; mode: string; onFavorite?: (id: number) => void }) {
//   const imageSrc = skill.skill_img ? `${API_URL}/uploads/${skill.skill_img}` : FALLBACK_IMG;
//   const [isHovered, setIsHovered] = useState(false);
//   const [isFavorite, setIsFavorite] = useState(false);

//   // Simulated data
//   const learners = skill.learners || 120 + (skill.id * 17) % 500;
//   const rating = skill.rating || 4.5 + (skill.id % 5) * 0.1;
//   const lessons = skill.lessons || 8 + (skill.id % 12);
//   const trending = skill.trending || skill.id % 3 === 0;
//   const aiRecommended = skill.aiRecommended || skill.id % 4 === 0;

//   const creator = skill.creator || {
//     name: "Expert Creator",
//     avatar: `https://images.unsplash.com/photo-${1500000000000 + skill.id * 123456789}?w=100&h=100&fit=crop&crop=face`,
//     rating: 4.8,
//     exchanges: 150 + skill.id * 3,
//   };

//   return (
//     <TiltCard>
//       <motion.article
//         layout
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20, scale: 0.95 }}
//         viewport={{ once: true }}
//         transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//         onHoverStart={() => setIsHovered(true)}
//         onHoverEnd={() => setIsHovered(false)}
//         className="group relative bg-[#0b0e1a]/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10"
//       >
//         {/* Top glow line */}
//         <motion.div
//           className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: isHovered ? 1 : 0 }}
//           transition={{ duration: 0.3 }}
//         />

//         {/* Glow background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//         {/* Image */}
//         <a href={`/skills/${skill.id}`} className="relative h-52 overflow-hidden block">
//           <motion.img
//             src={imageSrc}
//             alt={skill.title}
//             loading="lazy"
//             onError={(e) => {
//               (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
//             }}
//             className="w-full h-full object-cover"
//             animate={{ scale: isHovered ? 1.1 : 1 }}
//             transition={{ duration: 0.7, ease: "easeOut" }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e1a] via-[#0b0e1a]/40 to-transparent" />

//           {/* Badges */}
//           <div className="absolute top-4 left-4 flex gap-2">
//             <span className="px-3 py-1.5 rounded-full bg-[#0b0e1a]/80 backdrop-blur-md border border-white/10 text-cyan-200 text-[10px] uppercase tracking-wider font-medium">
//               {skill.category}
//             </span>
//             {trending && (
//               <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 text-[10px] uppercase tracking-wider font-medium flex items-center gap-1">
//                 <Flame size={10} />
//                 Trending
//               </span>
//             )}
//           </div>

//           <div className="absolute top-4 right-4 flex gap-2">
//             {aiRecommended && (
//               <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] uppercase tracking-wider font-medium flex items-center gap-1">
//                 <Cpu size={10} />
//                 AI Pick
//               </span>
//             )}
//             <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/80 text-[10px] uppercase tracking-wider">
//               {skill.level}
//             </span>
//           </div>

//           {/* Favorite button */}
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={(e) => {
//               e.preventDefault();
//               setIsFavorite(!isFavorite);
//               onFavorite?.(skill.id);
//             }}
//             className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors"
//           >
//             <Heart
//               size={16}
//               className={isFavorite ? "text-pink-500 fill-pink-500" : "text-white/60"}
//             />
//           </motion.button>

//           {/* Stats overlay */}
//           <div className="absolute bottom-4 left-4 flex items-center gap-3">
//             <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs text-white/80">
//               <Users size={12} className="text-cyan-400" />
//               {learners}
//             </span>
//             <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs text-white/80">
//               <Star size={12} className="text-amber-400" fill="currentColor" />
//               {rating.toFixed(1)}
//             </span>
//           </div>
//         </a>

//         {/* Content */}
//         <div className="p-6">
//           <div className="flex items-start justify-between gap-3">
//             <h3 className="text-xl font-bold text-white truncate flex-1 group-hover:text-cyan-100 transition-colors">
//               {skill.title}
//             </h3>
//             <div className="flex items-center gap-1.5">
//               <span className="flex items-center gap-1 text-xs text-white/60">
//                 <BookOpen size={12} className="text-purple-400" />
//                 {lessons}
//               </span>
//             </div>
//           </div>

//           <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mt-3">{skill.description}</p>

//           {/* Creator info */}
//           <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
//             <img
//               src={creator.avatar}
//               alt={creator.name}
//               className="w-10 h-10 rounded-full object-cover"
//               onError={(e) => {
//                 (e.currentTarget as HTMLImageElement).src =
//                   "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";
//               }}
//             />
//             <div className="flex-1 min-w-0">
//               <div className="text-sm font-medium text-white truncate">{creator.name}</div>
//               <div className="text-xs text-white/50 flex items-center gap-1">
//                 <Award size={10} className="text-amber-400" />
//                 {creator.exchanges} exchanges · {creator.rating.toFixed(1)} rating
//               </div>
//             </div>
//             <span className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px]">
//               Online
//             </span>
//           </div>

//           {/* CTA */}
//           <a href={`/skills/${skill.id}`} className="mt-5 block">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-shadow"
//             >
//               {mode === "learning" ? "Start Learning" : "Exchange Skill"}
//               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//             </motion.button>
//           </a>
//         </div>
//       </motion.article>
//     </TiltCard>
//   );
// }

// /* ───────────────────────────────────────────────────────── */
// /* MAIN COMPONENT                                            */
// /* ───────────────────────────────────────────────────────── */
// export default function Skills() {
//   const [skills, setSkills] = useState<Skill[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedLevel, setSelectedLevel] = useState("All");
//   const [search, setSearch] = useState("");
//   const [mode, setMode] = useState<"learning" | "exchanging">("learning");
//   const [searchFocused, setSearchFocused] = useState(false);

//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`${API_URL}/skills`, { cache: "no-store" });
//         if (!res.ok) throw new Error("Failed to fetch skills");
//         const data = await res.json();
//         if (!cancelled) {
//           // Enhance skills with simulated data
//           const enhancedSkills = (Array.isArray(data.skills) ? data.skills : []).map((s: Skill) => ({
//             ...s,
//             learners: 50 + Math.floor(Math.random() * 500),
//             rating: 4.2 + Math.random() * 0.8,
//             lessons: 5 + Math.floor(Math.random() * 15),
//             trending: Math.random() > 0.7,
//             aiRecommended: Math.random() > 0.75,
//             creator: {
//               name: [
//                 "Sarah Chen",
//                 "Marcus Rodriguez",
//                 "Emily Nakamura",
//                 "James Osei",
//                 "Aria Kim",
//                 "David Patel",
//               ][s.id % 6],
//               avatar: `https://images.unsplash.com/photo-${1500000000000 + s.id * 123456}?w=100&h=100&fit=crop&crop=face`,
//               rating: 4.5 + Math.random() * 0.5,
//               exchanges: 50 + Math.floor(Math.random() * 300),
//             },
//           }));
//           setSkills(enhancedSkills);
//           setError(null);
//         }
//       } catch {
//         if (!cancelled) setError("Unable to load skills");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const categories = useMemo(
//     () => ["All", ...Array.from(new Set(skills.map((s) => s.category).filter(Boolean)))],
//     [skills]
//   );

//   const levels = useMemo(
//     () => ["All", ...Array.from(new Set(skills.map((s) => s.level).filter(Boolean)))],
//     [skills]
//   );

//   const filteredSkills = useMemo(() => {
//     const q = search.toLowerCase().trim();
//     return skills.filter((s) => {
//       const matchCat = selectedCategory === "All" || s.category === selectedCategory;
//       const matchLvl = selectedLevel === "All" || s.level === selectedLevel;
//       const matchQ = !q || s.title?.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q);
//       return matchCat && matchLvl && matchQ;
//     });
//   }, [skills, selectedCategory, selectedLevel, search]);

//   return (
//     <section id="skills" className="relative px-4 sm:px-6 lg:px-20 py-32 border-t border-white/5 overflow-hidden">
//       {/* Background */}
//       <div className="pointer-events-none absolute inset-0 -z-10">
//         <div className="absolute top-[10%] left-[-15%] w-[50rem] h-[50rem] rounded-full bg-blue-600/15 blur-[200px]" />
//         <div className="absolute bottom-[5%] right-[-10%] w-[50rem] h-[50rem] rounded-full bg-purple-600/15 blur-[200px]" />
//         <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-cyan-500/10 blur-[250px]" />
//       </div>

//       {/* Grid */}
//       <div
//         className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
//           backgroundSize: "80px 80px",
//         }}
//       />

//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-xs uppercase tracking-[0.15em] text-cyan-200 mb-6">
//             <Sparkles size={12} />
//             Skills Marketplace
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//           </motion.div>

//           <motion.h2 variants={itemVariants} className="text-4xl lg:text-6xl font-black tracking-tight">
//             {mode === "learning" ? (
//               <>
//                 Discover{" "}
//                 <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
//                   amazing skills
//                 </span>
//               </>
//             ) : (
//               <>
//                 Exchange{" "}
//                 <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
//                   your expertise
//                 </span>
//               </>
//             )}
//           </motion.h2>

//           <motion.p variants={itemVariants} className="text-white/60 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
//             {mode === "learning"
//               ? "Explore skills from talented creators worldwide and start your learning journey today."
//               : "Swap value with creators around the world and grow together through skill exchange."}
//           </motion.p>

//           {/* Mode Switch */}
//           <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mt-8">
//             <div className="relative flex items-center p-1.5 rounded-full bg-white/5 border border-white/10">
//               <motion.div
//                 className="absolute h-[calc(100%-12px)] w-[calc(50%-6px)] rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600"
//                 animate={{ x: mode === "learning" ? 6 : "calc(100% + 6px)" }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               />
//               <button
//                 onClick={() => setMode("learning")}
//                 className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${
//                   mode === "learning" ? "text-white" : "text-white/60 hover:text-white/80"
//                 }`}
//               >
//                 <BookOpen size={14} className="inline mr-2" />
//                 Learning
//               </button>
//               <button
//                 onClick={() => setMode("exchanging")}
//                 className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${
//                   mode === "exchanging" ? "text-white" : "text-white/60 hover:text-white/80"
//                 }`}
//               >
//                 <ArrowRight size={14} className="inline mr-2 rotate-180" />
//                 Exchanging
//               </button>
//             </div>
//           </motion.div>

//           {/* Stats */}
//           <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mt-8">
//             {[
//               { label: "Skills available", value: skills.length || 0, icon: BookOpen },
//               { label: "Active learners", value: 12847, icon: Users },
//               { label: "Exchanges today", value: 342, icon: TrendingUp },
//             ].map((stat) => (
//               <div key={stat.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
//                 <stat.icon size={14} className="text-cyan-400" />
//                 <span className="text-white font-semibold">{stat.value.toLocaleString()}</span>
//                 <span className="text-white/50 text-sm">{stat.label}</span>
//               </div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Featured Categories */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
//         >
//           {featuredCategories.map((cat, i) => (
//             <motion.button
//               key={cat.name}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//               whileHover={{ scale: 1.02, y: -4 }}
//               onClick={() => setSelectedCategory(cat.name)}
//               className={`group relative p-5 rounded-2xl border transition-all duration-300 ${
//                 selectedCategory === cat.name
//                   ? "bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/30"
//                   : "bg-white/5 border-white/10 hover:border-white/20"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <span
//                   className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} grid place-items-center shadow-lg`}
//                 >
//                   <cat.icon size={20} className="text-white" />
//                 </span>
//                 <div className="text-left">
//                   <div className="font-semibold text-white">{cat.name}</div>
//                   <div className="text-xs text-white/50">{cat.count.toLocaleString()} skills</div>
//                 </div>
//               </div>
//               <ChevronRight
//                 size={16}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all"
//               />
//             </motion.button>
//           ))}
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
//           {/* Sidebar */}
//           <motion.aside
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="relative bg-[#0b0e1a]/80 backdrop-blur-xl rounded-3xl p-6 h-fit lg:sticky lg:top-6 border border-white/10 shadow-xl"
//           >
//             <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

//             <div className="flex items-center gap-3 mb-6">
//               <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 grid place-items-center shadow-lg">
//                 <SlidersHorizontal size={16} className="text-white" />
//               </span>
//               <div>
//                 <h3 className="text-lg font-semibold">Refine</h3>
//                 <p className="text-xs text-white/50">Find your perfect skill</p>
//               </div>
//             </div>

//             {/* Search */}
//             <div className="mb-6">
//               <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2 flex items-center gap-2">
//                 <Search size={10} />
//                 Search
//               </label>
//               <div className={`relative transition-all duration-300 ${searchFocused ? "scale-[1.02]" : ""}`}>
//                 <Search
//                   size={16}
//                   className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
//                     searchFocused ? "text-cyan-400" : "text-white/40"
//                   }`}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Try React, Figma..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   onFocus={() => setSearchFocused(true)}
//                   onBlur={() => setSearchFocused(false)}
//                   className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border outline-none text-sm transition-all ${
//                     searchFocused
//                       ? "border-cyan-500/50 bg-white/10 shadow-lg shadow-cyan-500/10"
//                       : "border-white/10"
//                   }`}
//                 />
//                 {searchFocused && (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30"
//                   >
//                     <Cpu size={12} className="text-cyan-300" />
//                   </motion.div>
//                 )}
//               </div>
//             </div>

//             {/* Category */}
//             <div className="mb-6">
//               <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 flex items-center gap-2">
//                 <Sparkles size={10} />
//                 Category
//               </label>
//               <div className="flex flex-wrap gap-2">
//                 {categories.slice(0, 6).map((c) => (
//                   <motion.button
//                     key={c}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setSelectedCategory(c)}
//                     className={`text-xs px-3 py-2 rounded-full border transition-all ${
//                       c === selectedCategory
//                         ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-cyan-500/20"
//                         : "bg-white/5 border-white/10 text-white/70 hover:border-white/20"
//                     }`}
//                   >
//                     {c}
//                   </motion.button>
//                 ))}
//               </div>
//             </div>

//             {/* Level */}
//             <div className="mb-6">
//               <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 flex items-center gap-2">
//                 <Award size={10} />
//                 Level
//               </label>
//               <div className="flex flex-wrap gap-2">
//                 {levels.slice(0, 5).map((l) => (
//                   <motion.button
//                     key={l}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setSelectedLevel(l)}
//                     className={`text-xs px-3 py-2 rounded-full border transition-all ${
//                       l === selectedLevel
//                         ? "bg-white text-[#0b1635] border-transparent"
//                         : "bg-white/5 border-white/10 text-white/70 hover:border-white/20"
//                     }`}
//                   >
//                     {l}
//                   </motion.button>
//                 ))}
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="pt-6 border-t border-white/10">
//               <div className="flex items-center gap-2 text-sm">
//                 <Filter size={14} className="text-cyan-400" />
//                 <span className="text-white/60">
//                   <span className="text-white font-bold">{filteredSkills.length}</span> skills found
//                 </span>
//               </div>
//             </div>

//             {/* Pro tip */}
//             <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
//               <div className="flex items-center gap-2 text-xs font-medium text-cyan-300 mb-2">
//                 <Crown size={12} />
//                 Pro tip
//               </div>
//               <p className="text-xs text-white/60 leading-relaxed">
//                 Combine filters to find your perfect skill match. Our AI will suggest the best options for you.
//               </p>
//             </div>
//           </motion.aside>

//           {/* Grid */}
//           <div className="min-h-[400px]">
//             {loading && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {Array.from({ length: 6 }).map((_, i) => (
//                   <SkeletonCard key={i} />
//                 ))}
//               </div>
//             )}

//             {error && !loading && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-[#0b0e1a]/80 backdrop-blur-xl rounded-3xl p-12 text-center border border-red-500/20"
//               >
//                 <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
//                 <h3 className="text-xl font-semibold text-red-300 mb-2">Something went wrong</h3>
//                 <p className="text-white/60">{error}</p>
//                 <button
//                   onClick={() => window.location.reload()}
//                   className="mt-6 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
//                 >
//                   Try again
//                 </button>
//               </motion.div>
//             )}

//             {!loading && !error && filteredSkills.length === 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="bg-[#0b0e1a]/80 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/10"
//               >
//                 <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 grid place-items-center">
//                   <Search size={32} className="text-white/40" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">No skills found</h3>
//                 <p className="text-white/60 max-w-md mx-auto">
//                   Try adjusting your filters or search query to discover more skills.
//                 </p>
//                 <button
//                   onClick={() => {
//                     setSelectedCategory("All");
//                     setSelectedLevel("All");
//                     setSearch("");
//                   }}
//                   className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium"
//                 >
//                   Clear filters
//                 </button>
//               </motion.div>
//             )}

//             {!loading && !error && filteredSkills.length > 0 && (
//               <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//                 <AnimatePresence mode="popLayout">
//                   {filteredSkills.map((skill, i) => (
//                     <SkillCard key={skill.id} skill={skill} index={i} mode={mode} />
//                   ))}
//                 </AnimatePresence>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );

// }





"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Search, CircleAlert as AlertCircle, SlidersHorizontal, Sparkles, ListFilter as Filter, TrendingUp, Users, Star, Zap, BookOpen, Award, Clock, Heart, ChevronRight, Cpu, Crown, Flame, Bookmark, Eye, Globe, Briefcase, Music, Palette, Code, MessageSquare, Heart as HeartIcon, BookMarked, X, Menu } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const MotionImage = motion(Image);

/* ───────────────────────────────────────────────────────── */
/* TYPES                                                      */
/* ───────────────────────────────────────────────────────── */
export interface Skill {
  id: number;
  skillId: number;
  title: string;
  description: string;
  category: string;
  level: string;
  mode?: string;
  skill_img?: string;
  creator?: {
    name: string;
    avatar: string;
    rating: number;
    exchanges: number;
  };
  learners?: number;
  rating?: number;
  lessons?: number;
  trending?: boolean;
  aiRecommended?: boolean;
}

/* ───────────────────────────────────────────────────────── */
/* CONSTANTS                                                 */
/* ───────────────────────────────────────────────────────── */
const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";

const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='%2306b6d4'/>
          <stop offset='50%' stop-color='%233b82f6'/>
          <stop offset='100%' stop-color='%23a855f7'/>
        </linearGradient>
      </defs>
      <rect width='400' height='240' fill='url(%23g)' opacity='0.7'/>
      <text x='50%' y='52%' text-anchor='middle' font-family='sans-serif' font-size='22' fill='white' font-weight='700'>
        SkillWarp
      </text>
    </svg>`
  );

const featuredCategories = [
  { name: "Design", icon: Palette, color: "from-pink-500 to-rose-500", count: 2840 },
  { name: "Development", icon: Code, color: "from-cyan-400 to-blue-600", count: 3200 },
  { name: "Marketing", icon: TrendingUp, color: "from-emerald-400 to-cyan-500", count: 1560 },
  { name: "Music", icon: Music, color: "from-purple-500 to-pink-500", count: 980 },
];

const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

/* ───────────────────────────────────────────────────────── */
/* ANIMATION VARIANTS                                        */
/* ───────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20
    }
  },
};

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

/* ───────────────────────────────────────────────────────── */
/* UTILITY COMPONENTS                                        */
/* ───────────────────────────────────────────────────────── */

function GlowOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [0.9, 1.1, 0.9],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      className={className}
    />
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-150, 150], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-12, 12]), { stiffness: 200, damping: 20 });
  const brightness = useTransform(x, [-150, 0, 150], [0.9, 1, 0.9]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        filter: `brightness(${brightness})`,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-3xl overflow-hidden border border-white/[0.08] backdrop-blur-xl">
      <div className="h-52 bg-gradient-to-br from-white/[0.05] to-white/[0.02] relative overflow-hidden">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
        />
      </div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-white/[0.08] rounded-xl w-3/4 relative overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent"
          />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-white/[0.05] rounded-lg w-full relative overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
            />
          </div>
          <div className="h-4 bg-white/[0.05] rounded-lg w-2/3 relative overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
            />
          </div>
        </div>
        <div className="flex gap-3 items-center pt-2">
          <div className="h-11 w-11 rounded-full bg-white/[0.08] relative overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.15] to-transparent"
            />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-white/[0.05] rounded-lg w-1/2" />
            <div className="h-3 bg-white/[0.05] rounded-lg w-1/3" />
          </div>
        </div>
        <div className="h-14 bg-white/[0.08] rounded-2xl relative overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
          />
        </div>
      </div>
    </div>
  );
}

function SkillCard({ skill, index, mode, onFavorite }: { skill: Skill; index: number; mode: string; onFavorite?: (id: number) => void }) {
  // const imageSrc = skill.skill_img ? `${API_URL}/uploads/${skill.skill_img}` : FALLBACK_IMG;
  const imageSrc = skill.skill_img;
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const learners = skill.learners || 120 + (skill.id * 17) % 500;
  const rating = skill.rating || 4.5 + (skill.id % 5) * 0.1;
  const lessons = skill.lessons || 8 + (skill.id % 12);
  const trending = skill.trending || skill.id % 3 === 0;
  const aiRecommended = skill.aiRecommended || skill.id % 4 === 0;

  const creator = skill.creator || {
    name: ["Sarah Chen", "Marcus Rodriguez", "Emily Nakamura", "James Osei", "Aria Kim", "David Patel"][skill.id % 6],
    avatar: `https://images.unsplash.com/photo-${1500000000000 + skill.id * 123456789}?w=100&h=100&fit=crop&crop=face`,
    rating: 4.8,
    exchanges: 150 + skill.id * 3,
  };

  const Fallback2 = skill.skill_img;

  return (
    <TiltCard>
      <motion.article
        layout
        initial={{ opacity: 0, y: 60, rotateX: -10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          delay: Math.min(index * 0.08, 0.6),
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative rounded-3xl overflow-hidden"
      >
        {/* Outer glow effect */}
        <motion.div
          className="absolute -inset-px rounded-3xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/40 to-purple-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"
          style={{ zIndex: -1 }}
        />

        {/* Inner card */}
        <div className="relative bg-gradient-to-br from-[#0a0f1c]/95 via-[#0c1220]/90 to-[#0e1428]/95 backdrop-blur-2xl border border-white/[0.06] group-hover:border-cyan-500/[0.25] transition-all duration-500 shadow-2xl shadow-black/50 group-hover:shadow-cyan-500/[0.08] group-hover:shadow-3xl">

          {/* Animated top light line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Background shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
          
          {/* Image Section */}
          {/* <a href={`/skills/${skill.skillId}`} className="relative h-56 overflow-hidden block"> */}
          <Link
            href={`/skills/${skill.skillId}`}
            className="relative h-56 overflow-hidden block"
          >
            <MotionImage
              src={skill.skill_img || FALLBACK_IMG}
              alt={skill.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              loading="lazy"
              onError={(e) => {
                // fallback fix (Next Image doesn't like direct src mutation)
                e.currentTarget.src = FALLBACK_IMG;
              }}
              className="object-cover"
              animate={{ scale: isHovered ? 1.15 : 1 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
            {/* <motion.img
              src={imageSrc}
              alt={skill.title}
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
              }}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.15 : 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            /> */}
            {/* change dis A tag ot a Image leave  d a tag but put dis Next js Image tag and den rend e r d img  using skill.skill_img.. also whn skill is clicked go to s*/}


            {/* Multi-layer gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/60 to-transparent opacity-90" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.6 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Top badges */}
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="px-3 py-1.5 rounded-xl bg-[#0a0f1c]/70 backdrop-blur-xl border border-white/10 text-cyan-200 text-[10px] uppercase tracking-widest font-bold shadow-lg"
                >
                  {skill.category}
                </motion.span>
                {trending && (
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-600/20 backdrop-blur-xl border border-amber-500/40 text-amber-200 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-lg"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Flame size={10} />
                    </motion.span>
                    Trending
                  </motion.span>
                )}
              </div>

              <div className="flex gap-2">
                {aiRecommended && (
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/25 to-blue-600/25 backdrop-blur-xl border border-cyan-400/40 text-cyan-200 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-lg"
                  >
                    <Cpu size={10} />
                    <span className="hidden sm:inline">AI Pick</span>
                  </motion.span>
                )}
                <span className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 text-white/90 text-[10px] uppercase tracking-widest font-bold shadow-lg">
                  {skill.level}
                </span>
              </div>
            </div>

            {/* Favorite button */}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.85 }}
              onClick={(e) => {
                e.preventDefault();
                setIsFavorite(!isFavorite);
                onFavorite?.(skill.id);
              }}
              className="absolute bottom-4 right-4 p-3 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 hover:bg-white/20 hover:border-pink-500/40 transition-all duration-300 shadow-xl"
            >
              <motion.div
                animate={isFavorite ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  size={18}
                  className={isFavorite ? "text-pink-400 fill-pink-400" : "text-white/70"}
                />
              </motion.div>
            </motion.button>

            {/* Bottom stats overlay */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-xl border border-white/10 text-xs text-white/90 font-medium shadow-xl">
                <Users size={13} className="text-cyan-400" />
                {learners.toLocaleString()}
              </span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-xl border border-white/10 text-xs text-white/90 font-medium shadow-xl">
                <Star size={13} className="text-amber-400" fill="currentColor" />
                {rating.toFixed(1)}
              </span>
            </div>
          </Link>
          {/* </a> */}

          {/* Content Section */}
          <div className="p-6 lg:p-7">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-lg lg:text-xl font-bold text-white leading-tight group-hover:text-cyan-50 transition-colors duration-300 line-clamp-2">
                {skill.title}
              </h3>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 shrink-0">
                <BookOpen size={12} className="text-purple-400" />
                <span className="text-xs text-purple-200 font-medium">{lessons}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/45 text-sm leading-relaxed line-clamp-2 mb-5">{skill.description}</p>

            {/* Creator info */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.05] transition-colors duration-300">
              <div className="relative">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-11 h-11 rounded-xl object-cover ring-2 ring-cyan-500/20"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";
                  }}
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0a0f1c] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white truncate">{creator.name}</div>
                <div className="text-xs text-white/50 flex items-center gap-1.5 mt-0.5">
                  <Award size={11} className="text-amber-400" />
                  {creator.exchanges} exchanges
                  <span className="text-white/30">·</span>
                  <span className="flex items-center gap-1">
                    <Star size={10} className="text-amber-400" fill="currentColor" />
                    {creator.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a href={`/skills/${skill.id}`} className="mt-5 block">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold flex items-center justify-center gap-2.5 shadow-xl shadow-cyan-500/25 overflow-hidden group/btn"
              >
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  initial={{ x: '-200%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 1, ease: 'linear' }}
                />

                <span className="relative z-10 flex items-center gap-2.5">
                  {mode === "learning" ? (
                    <>
                      <Zap size={16} className="text-cyan-200" />
                      Start Learning
                    </>
                  ) : (
                    <>
                      <ArrowRight size={16} className="rotate-180" />
                      Exchange Skill
                    </>
                  )}
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </a>
          </div>
        </div>
      </motion.article>
    </TiltCard>
  );
}

/* ───────────────────────────────────────────────────────── */
/* MAIN COMPONENT                                            */
/* ───────────────────────────────────────────────────────── */
export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"learning" | "exchanging">("learning");
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/skills`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch skills");
        const data = await res.json();
        if (!cancelled) {
          // Enhance skills with simulated data
          const enhancedSkills = (Array.isArray(data.skills) ? data.skills : []).map((s: Skill) => ({
            ...s,
            learners: 50 + Math.floor(Math.random() * 500),
            rating: 4.2 + Math.random() * 0.8,
            lessons: 5 + Math.floor(Math.random() * 15),
            trending: Math.random() > 0.7,
            aiRecommended: Math.random() > 0.75,
            creator: {
              name: [
                "Sarah Chen",
                "Marcus Rodriguez",
                "Emily Nakamura",
                "James Osei",
                "Aria Kim",
                "David Patel",
              ][s.id % 6],
              avatar: `https://images.unsplash.com/photo-${1500000000000 + s.id * 123456}?w=100&h=100&fit=crop&crop=face`,
              rating: 4.5 + Math.random() * 0.5,
              exchanges: 50 + Math.floor(Math.random() * 300),
            },
          }));
          setSkills(enhancedSkills);
          setError(null);
        }
      } catch {
        if (!cancelled) setError("Unable to load skills");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(skills.map((s) => s.category).filter(Boolean)))],
    [skills]
  );

  const levels = useMemo(
    () => ["All", ...Array.from(new Set(skills.map((s) => s.level).filter(Boolean)))],
    [skills]
  );

  const filteredSkills = useMemo(() => {
    const q = search.toLowerCase().trim();
    return skills.filter((s) => {
      const matchCat = selectedCategory === "All" || s.category === selectedCategory;
      const matchLvl = selectedLevel === "All" || s.level === selectedLevel;
      const matchQ = !q || s.title?.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q);
      return matchCat && matchLvl && matchQ;
    });
  }, [skills, selectedCategory, selectedLevel, search]);

  const FilterSidebar = ({ className = "" }: { className?: string }) => (
    <div className={`relative ${className}`}>
      {/* Decorative top light */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/[0.06]">
        <div className="relative">
          <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 grid place-items-center shadow-xl shadow-cyan-500/30">
            <SlidersHorizontal size={18} className="text-white" />
          </span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-px rounded-xl border border-cyan-400/20"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Command Center</h3>
          <p className="text-xs text-white/50 mt-0.5">Refine your discovery</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-7">
        <label className="block text-[10px] uppercase tracking-[0.25em] text-white/50 mb-3 flex items-center gap-2 font-medium">
          <Search size={10} />
          Search Skills
        </label>
        <motion.div
          animate={{ scale: searchFocused ? 1.02 : 1 }}
          className="relative"
        >
          <Search
            size={18}
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
              searchFocused ? "text-cyan-400" : "text-white/40"
            }`}
          />
          <input
            type="text"
            placeholder="Explore React, Figma..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`w-full pl-12 pr-5 py-3.5 rounded-2xl bg-white/[0.04] border outline-none text-sm text-white placeholder:text-white/30 transition-all duration-300 ${
              searchFocused
                ? "border-cyan-500/50 bg-white/[0.07] shadow-2xl shadow-cyan-500/20 ring-4 ring-cyan-500/10"
                : "border-white/[0.08] hover:border-white/[0.15]"
            }`}
          />
          {searchFocused && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30"
            >
              <Cpu size={14} className="text-cyan-300" />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Category */}
      <div className="mb-7">
        <label className="block text-[10px] uppercase tracking-[0.25em] text-white/50 mb-4 flex items-center gap-2 font-medium">
          <Sparkles size={10} className="text-cyan-400" />
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 7).map((c) => (
            <motion.button
              key={c}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(c)}
              className={`text-xs px-4 py-2.5 rounded-xl border transition-all duration-300 font-semibold ${
                c === selectedCategory
                  ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white border-transparent shadow-lg shadow-cyan-500/30"
                  : "bg-white/[0.03] border-white/[0.08] text-white/70 hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              {c}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Level */}
      <div className="mb-8">
        <label className="block text-[10px] uppercase tracking-[0.25em] text-white/50 mb-4 flex items-center gap-2 font-medium">
          <Award size={10} className="text-purple-400" />
          Skill Level
        </label>
        <div className="flex flex-wrap gap-2">
          {levels.slice(0, 5).map((l) => (
            <motion.button
              key={l}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedLevel(l)}
              className={`text-xs px-4 py-2.5 rounded-xl border transition-all duration-300 font-semibold ${
                l === selectedLevel
                  ? "bg-white text-[#0a1020] border-transparent shadow-xl"
                  : "bg-white/[0.03] border-white/[0.08] text-white/70 hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              {l}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 grid place-items-center">
            <Filter size={16} className="text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{filteredSkills.length}</div>
            <div className="text-xs text-white/50">Skills discovered</div>
          </div>
        </div>
      </div>

      {/* Pro tip */}
      <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-cyan-500/[0.07] via-transparent to-purple-500/[0.07] border border-cyan-500/20 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 text-xs font-bold text-cyan-300 mb-3 tracking-wide">
          <Crown size={14} className="text-amber-400" />
          <span className="uppercase tracking-widest">Pro tip</span>
        </div>
        <p className="text-xs text-white/50 leading-relaxed">
          Combine multiple filters for precision discovery. Our AI engine will surface the most relevant skills tailored to your journey.
        </p>
      </div>
    </div>
  );

  return (
    <section id="skills" className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Large animated orbs */}
        <GlowOrb
          delay={0}
          className="absolute top-0 left-[-10%] w-[60rem] h-[60rem] rounded-full bg-gradient-to-br from-blue-600/20 via-cyan-500/10 to-transparent blur-[180px]"
        />
        <GlowOrb
          delay={2}
          className="absolute bottom-0 right-[-10%] w-[55rem] h-[55rem] rounded-full bg-gradient-to-br from-purple-600/20 via-pink-500/10 to-transparent blur-[180px]"
        />
        <GlowOrb
          delay={4}
          className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[50rem] h-[50rem] rounded-full bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-transparent blur-[160px]"
        />

        {/* Subtle floating particles */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-cyan-400/30 blur-sm"
        />
        <motion.div
          animate={{
            y: [20, -30, 20],
            x: [15, -10, 15],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[60%] right-[20%] w-3 h-3 rounded-full bg-purple-400/30 blur-sm"
        />
        <motion.div
          animate={{
            y: [-15, 25, -15],
            x: [-8, 15, -8],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[30%] left-[40%] w-2 h-2 rounded-full bg-blue-400/30 blur-sm"
        />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-20 lg:py-32">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16 lg:mb-24"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500/[0.08] via-blue-500/[0.08] to-purple-500/[0.08] border border-white/[0.08] text-[10px] uppercase tracking-[0.2em] text-cyan-200 mb-8 backdrop-blur-xl shadow-xl"
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles size={12} className="text-cyan-400" />
            </motion.span>
            <span className="font-bold">Skills Marketplace</span>
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
            />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1]"
          >
            {mode === "learning" ? (
              <>
                Discover{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    amazing
                  </span>
                  <motion.span
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-2xl -z-10"
                  />
                </span>
                <br className="hidden sm:block" />
                <span className="text-white">skills</span>
              </>
            ) : (
              <>
                Exchange{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-purple-300 via-pink-400 to-rose-500 bg-clip-text text-transparent">
                    your
                  </span>
                  <motion.span
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-2xl -z-10"
                  />
                </span>
                <br className="hidden sm:block" />
                <span className="text-white">expertise</span>
              </>
            )}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-white/50 mt-6 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed px-4"
          >
            {mode === "learning"
              ? "Explore skills from talented creators worldwide and start your learning journey today."
              : "Swap value with creators around the world and grow together through skill exchange."}
          </motion.p>

          {/* Mode Switch */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mt-10"
          >
            <div className="relative flex items-center p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-xl">
              <motion.div
                className="absolute h-[calc(100%-12px)] w-[calc(50%-12px)] rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 shadow-lg shadow-cyan-500/30"
                animate={{
                  x: mode === "learning" ? 6 : "calc(100% + 9px)"
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30
                }}
              />
              <button
                onClick={() => setMode("learning")}
                className={`relative z-10 px-6 sm:px-8 py-3 rounded-xl text-sm font-bold transition-colors duration-200 flex items-center gap-2 ${
                  mode === "learning" ? "text-white" : "text-white/50 hover:text-white/70"
                }`}
              >
                <BookOpen size={16} />
                <span className="hidden sm:inline">Learning</span>
                <span className="sm:hidden">Learn</span>
              </button>
              <button
                onClick={() => setMode("exchanging")}
                className={`relative z-10 px-6 sm:px-8 py-3 rounded-xl text-sm font-bold transition-colors duration-200 flex items-center gap-2 ${
                  mode === "exchanging" ? "text-white" : "text-white/50 hover:text-white/70"
                }`}
              >
                <motion.span
                  animate={mode === "exchanging" ? { rotate: [0, -15, 0] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight size={16} className="rotate-180" />
                </motion.span>
                <span className="hidden sm:inline">Exchange</span>
                <span className="sm:hidden">Swap</span>
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3 lg:gap-5 mt-12"
          >
            {[
              { label: "Skills", value: skills.length || 0, icon: BookOpen, color: "cyan" },
              { label: "Learners", value: 12847, icon: Users, color: "purple" },
              { label: "Today", value: 342, icon: TrendingUp, color: "emerald" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl shadow-xl hover:bg-white/[0.06] transition-colors duration-300"
              >
                <span className={`w-8 h-8 rounded-lg grid place-items-center ${
                  stat.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' :
                  stat.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  <stat.icon size={14} />
                </span>
                <div>
                  <div className="text-lg font-bold text-white">{stat.value.toLocaleString()}</div>
                  <div className="text-[10px] uppercase tracking-wider text-white/40">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Featured Categories - Slider on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-14 lg:mb-16 -mx-4 sm:mx-0"
        >
          {/* Mobile scroll container */}
          <div className="overflow-x-auto scrollbar-hide sm:overflow-visible">
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 px-4 sm:px-0 min-w-max sm:min-w-0">
              {featuredCategories.map((cat, i) => (
                <motion.button
                  key={cat.name}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`group relative flex-shrink-0 sm:flex-shrink p-4 sm:p-5 rounded-2xl border transition-all duration-300 w-[160px] sm:w-auto ${
                    selectedCategory === cat.name
                      ? "bg-gradient-to-br from-cyan-500/[0.1] to-purple-500/[0.1] border-cyan-500/40 shadow-xl shadow-cyan-500/10"
                      : "bg-white/[0.03] border-white/[0.06] hover:border-white/20"
                  }`}
                >
                  <div className="flex sm:flex-col items-start gap-3 sm:gap-0 sm:items-stretch">
                    <span
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${cat.color} grid place-items-center shadow-xl shrink-0`}
                    >
                      <cat.icon size={22} className="text-white" />
                    </span>
                    <div className="flex-1 flex flex-col justify-center sm:mt-4">
                      <div className="font-bold text-white text-sm sm:text-base">{cat.name}</div>
                      <div className="text-xs text-white/40">{cat.count.toLocaleString()} skills</div>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all hidden sm:block"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-200 font-bold text-sm shadow-xl"
          >
            <SlidersHorizontal size={18} />
            <span>Filters & Search</span>
            {(selectedCategory !== "All" || selectedLevel !== "All" || search) && (
              <span className="w-5 h-5 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center font-bold">
                {(selectedCategory !== "All" ? 1 : 0) + (selectedLevel !== "All" ? 1 : 0) + (search ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Mobile Filters Modal */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-xl"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-gradient-to-br from-[#0a0f1c] to-[#0c1424] border-r border-white/10 overflow-y-auto"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-white">Filters</h3>
                      <button
                        onClick={() => setMobileFiltersOpen(false)}
                        className="w-10 h-10 rounded-xl bg-white/10 grid place-items-center text-white/70 hover:bg-white/20 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <FilterSidebar />
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-xl"
                    >
                      Apply Filters
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden lg:block w-[320px] flex-shrink-0"
          >
            <div className="sticky top-8 bg-gradient-to-br from-[#0a0f1c]/95 to-[#0c1424]/95 backdrop-blur-2xl rounded-3xl p-7 border border-white/[0.06] shadow-2xl">
              <FilterSidebar />
            </div>
          </motion.aside>

          {/* Skills Grid */}
          <div className="flex-1 min-h-[500px]">
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5 lg:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <SkeletonCard />
                  </motion.div>
                ))}
              </div>
            )}

            {error && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-gradient-to-br from-[#0a0f1c]/90 to-[#0c1424]/90 backdrop-blur-2xl rounded-3xl p-10 sm:p-14 text-center border border-red-500/20 shadow-2xl"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 grid place-items-center border border-red-500/30"
                >
                  <AlertCircle size={40} className="text-red-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">Connection Issue</h3>
                <p className="text-white/50 max-w-md mx-auto">{error}</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => window.location.reload()}
                  className="mt-8 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-xl"
                >
                  Retry Connection
                </motion.button>
              </motion.div>
            )}

            {!loading && !error && filteredSkills.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-[#0a0f1c]/90 to-[#0c1424]/90 backdrop-blur-2xl rounded-3xl p-10 sm:p-16 text-center border border-white/[0.06] shadow-2xl"
              >
                <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] grid place-items-center border border-white/[0.08]">
                  <Search size={40} className="text-white/30" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">No Skills Found</h3>
                <p className="text-white/50 max-w-md mx-auto leading-relaxed">
                  We couldn't find any skills matching your current filters. Try adjusting your search criteria.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedLevel("All");
                    setSearch("");
                  }}
                  className="mt-8 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold shadow-xl"
                >
                  Clear All Filters
                </motion.button>
              </motion.div>
            )}

            {!loading && !error && filteredSkills.length > 0 && (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5 lg:gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredSkills.map((skill, i) => (
                    <SkillCard key={skill.id} skill={skill} index={i} mode={mode} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Load more indicator */}
            {!loading && !error && filteredSkills.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center"
              >
                <p className="text-white/30 text-sm">
                  Showing <span className="text-white/60 font-medium">{filteredSkills.length}</span> of{" "}
                  <span className="text-white/60 font-medium">{skills.length}</span> skills
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// 1037
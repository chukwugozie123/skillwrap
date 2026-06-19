"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Search,
  Loader2,
  AlertCircle,
  SlidersHorizontal,
  Sparkles,
  Filter,
  TrendingUp,
  Users,
  Star,
  Zap,
  BookOpen,
  Award,
  Clock,
  Heart,
  ChevronRight,
  Cpu,
  Crown,
  Flame,
} from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

/* ───────────────────────────────────────────────────────── */
/* TYPES                                                     */
/* ───────────────────────────────────────────────────────── */
type Skill = {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  mode?: string;
  skill_img?: string | null;
};

/* ───────────────────────────────────────────────────────── */
/* CONSTANTS                                                 */
/* ───────────────────────────────────────────────────────── */
const API_URL = "https://skillwrap-backend.onrender.com";

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
        SkillWrap
      </text>
    </svg>`
  );

const featuredCategories = [
  { name: "Design", icon: Sparkles, color: "from-pink-500 to-rose-500", count: 2840 },
  { name: "Development", icon: Zap, color: "from-cyan-400 to-blue-600", count: 3200 },
  { name: "Marketing", icon: TrendingUp, color: "from-emerald-400 to-cyan-500", count: 1560 },
  { name: "Music", icon: Heart, color: "from-purple-500 to-pink-500", count: 980 },
];

/* ───────────────────────────────────────────────────────── */
/* COMPONENTS                                                */
/* ───────────────────────────────────────────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="relative bg-[#0d1021]/80 rounded-3xl overflow-hidden border border-white/5">
      <div className="h-48 bg-gradient-to-br from-white/5 to-white/10 animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-white/10 rounded-lg w-3/4 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-white/5 rounded w-full animate-pulse" />
          <div className="h-4 bg-white/5 rounded w-2/3 animate-pulse" />
        </div>
        <div className="h-12 bg-white/10 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}

function SkillCard({ skill, index, mode }: { skill: Skill; index: number; mode: string }) {
  const imageSrc = skill.skill_img ? `${API_URL}/uploads/${skill.skill_img}` : FALLBACK_IMG;
  const [isHovered, setIsHovered] = useState(false);

  // Simulated data
  const learners = 120 + (skill.id * 17) % 500;
  const rating = 4.5 + (skill.id % 5) * 0.1;
  const lessons = 8 + (skill.id % 12);

  return (
    <TiltCard>
      <motion.article
        layout
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        viewport={{ once: true }}
        transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative bg-[#0b0e1a]/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10"
      >
        {/* Top glow line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Glow background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Image */}
        <Link href={`/skills/${skill.id}`} className="relative h-52 overflow-hidden block">
          <motion.img
            src={imageSrc}
            alt={skill.title}
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG; }}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e1a] via-[#0b0e1a]/40 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1.5 rounded-full bg-[#0b0e1a]/80 backdrop-blur-md border border-white/10 text-cyan-200 text-[10px] uppercase tracking-wider font-medium">
              {skill.category}
            </span>
            {skill.id % 3 === 0 && (
              <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 text-[10px] uppercase tracking-wider font-medium flex items-center gap-1">
                <Flame size={10} />
                Trending
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/80 text-[10px] uppercase tracking-wider">
              {skill.level}
            </span>
          </div>

          {/* Stats overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs text-white/80">
                <Users size={12} className="text-cyan-400" />
                {learners}
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs text-white/80">
                <Star size={12} className="text-amber-400" fill="currentColor" />
                {rating.toFixed(1)}
              </span>
            </div>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs text-white/80">
              <BookOpen size={12} className="text-purple-400" />
              {lessons} lessons
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-bold text-white truncate flex-1 group-hover:text-cyan-100 transition-colors">
              {skill.title}
            </h3>
            {skill.id % 4 === 0 && (
              <span className="shrink-0 px-2 py-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-[10px] text-cyan-300 font-medium flex items-center gap-1">
                <Cpu size={10} />
                AI Pick
              </span>
            )}
          </div>

          <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mt-3">
            {skill.description}
          </p>

          {/* Creator info */}
          <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">Expert Creator</div>
              <div className="text-xs text-white/50 flex items-center gap-1">
                <Award size={10} className="text-amber-400" />
                Top rated teacher
              </div>
            </div>
            <span className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px]">
              Online
            </span>
          </div>

          {/* CTA */}
          <Link href={`/skills/${skill.id}`} className="mt-5 block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-shadow"
            >
              {mode === "learning" ? "Start Learning" : "Exchange Skill"}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
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

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/skills`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch skills");
        const data = await res.json();
        if (!cancelled) {
          setSkills(Array.isArray(data.skills) ? data.skills : []);
          setError(null);
        }
      } catch {
        if (!cancelled) setError("Unable to load skills");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="skills" className="relative px-6 lg:px-20 py-32 border-t border-white/5 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[-15%] w-[50rem] h-[50rem] rounded-full bg-blue-600/15 blur-[200px]" />
        <div className="absolute bottom-[5%] right-[-10%] w-[50rem] h-[50rem] rounded-full bg-purple-600/15 blur-[200px]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-cyan-500/10 blur-[250px]" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-xs uppercase tracking-[0.15em] text-cyan-200 mb-6">
            <Sparkles size={12} />
            Skills Marketplace
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl lg:text-6xl font-black tracking-tight">
            {mode === "learning" ? (
              <>Discover <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">amazing skills</span></>
            ) : (
              <>Exchange <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">your expertise</span></>
            )}
          </motion.h2>

          <motion.p variants={itemVariants} className="text-white/60 mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
            {mode === "learning"
              ? "Explore skills from talented creators worldwide and start your learning journey today."
              : "Swap value with creators around the world and grow together through skill exchange."}
          </motion.p>

          {/* Mode Switch */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mt-8">
            <div className="relative flex items-center p-1.5 rounded-full bg-white/5 border border-white/10">
              <motion.div
                className="absolute h-[calc(100%-12px)] w-[calc(50%-6px)] rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600"
                animate={{ x: mode === "learning" ? 6 : "calc(100% + 6px)" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                onClick={() => setMode("learning")}
                className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${mode === "learning" ? "text-white" : "text-white/60 hover:text-white/80"}`}
              >
                <BookOpen size={14} className="inline mr-2" />
                Learning
              </button>
              <button
                onClick={() => setMode("exchanging")}
                className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${mode === "exchanging" ? "text-white" : "text-white/60 hover:text-white/80"}`}
              >
                <ArrowRight size={14} className="inline mr-2 rotate-180" />
                Exchanging
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mt-8">
            {[
              { label: "Skills available", value: skills.length || 0, icon: BookOpen },
              { label: "Active learners", value: 12847, icon: Users },
              { label: "Exchanges today", value: 342, icon: TrendingUp },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <stat.icon size={14} className="text-cyan-400" />
                <span className="text-white font-semibold">{stat.value.toLocaleString()}</span>
                <span className="text-white/50 text-sm">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Featured Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {featuredCategories.map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => setSelectedCategory(cat.name)}
              className={`group relative p-5 rounded-2xl border transition-all duration-300 ${
                selectedCategory === cat.name
                  ? "bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/30"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} grid place-items-center shadow-lg`}>
                  <cat.icon size={20} className="text-white" />
                </span>
                <div className="text-left">
                  <div className="font-semibold text-white">{cat.name}</div>
                  <div className="text-xs text-white/50">{cat.count.toLocaleString()} skills</div>
                </div>
              </div>
              <ChevronRight size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative bg-[#0b0e1a]/80 backdrop-blur-xl rounded-3xl p-6 h-fit lg:sticky lg:top-6 border border-white/10 shadow-xl"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 grid place-items-center shadow-lg">
                <SlidersHorizontal size={16} className="text-white" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">Refine</h3>
                <p className="text-xs text-white/50">Find your perfect skill</p>
              </div>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2 flex items-center gap-2">
                <Search size={10} />
                Search
              </label>
              <div className={`relative transition-all duration-300 ${searchFocused ? "scale-[1.02]" : ""}`}>
                <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${searchFocused ? "text-cyan-400" : "text-white/40"}`} />
                <input
                  type="text"
                  placeholder="Try React, Figma..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border outline-none text-sm transition-all ${
                    searchFocused ? "border-cyan-500/50 bg-white/10 shadow-lg shadow-cyan-500/10" : "border-white/10"
                  }`}
                />
                {searchFocused && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30"
                  >
                    <Cpu size={12} className="text-cyan-300" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 flex items-center gap-2">
                <Sparkles size={10} />
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <motion.button
                    key={c}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(c)}
                    className={`text-xs px-3 py-2 rounded-full border transition-all ${
                      c === selectedCategory
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-cyan-500/20"
                        : "bg-white/5 border-white/10 text-white/70 hover:border-white/20"
                    }`}
                  >
                    {c}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div className="mb-6">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 flex items-center gap-2">
                <Award size={10} />
                Level
              </label>
              <div className="flex flex-wrap gap-2">
                {levels.map((l) => (
                  <motion.button
                    key={l}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedLevel(l)}
                    className={`text-xs px-3 py-2 rounded-full border transition-all ${
                      l === selectedLevel
                        ? "bg-white text-[#0b1635] border-transparent"
                        : "bg-white/5 border-white/10 text-white/70 hover:border-white/20"
                    }`}
                  >
                    {l}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm">
                <Filter size={14} className="text-cyan-400" />
                <span className="text-white/60">
                  <span className="text-white font-bold">{filteredSkills.length}</span> skills found
                </span>
              </div>
            </div>

            {/* Pro tip */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
              <div className="flex items-center gap-2 text-xs font-medium text-cyan-300 mb-2">
                <Crown size={12} />
                Pro tip
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Combine filters to find your perfect skill match. Our AI will suggest the best options for you.
              </p>
            </div>
          </motion.aside>

          {/* Grid */}
          <div className="min-h-[400px]">
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {error && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0b0e1a]/80 backdrop-blur-xl rounded-3xl p-12 text-center border border-red-500/20"
              >
                <AlertCircle className="mx-auto text-red-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-red-300 mb-2">Something went wrong</h3>
                <p className="text-white/60">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
                >
                  Try again
                </button>
              </motion.div>
            )}

            {!loading && !error && filteredSkills.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0b0e1a]/80 backdrop-blur-xl rounded-3xl p-12 text-center border border-white/10"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 grid place-items-center">
                  <Search size={32} className="text-white/40" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No skills found</h3>
                <p className="text-white/60 max-w-md mx-auto">Try adjusting your filters or search query to discover more skills.</p>
                <button
                  onClick={() => { setSelectedCategory("All"); setSelectedLevel("All"); setSearch(""); }}
                  className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium"
                >
                  Clear filters
                </button>
              </motion.div>
            )}

            {!loading && !error && filteredSkills.length > 0 && (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredSkills.map((skill, i) => (
                    <SkillCard key={skill.id} skill={skill} index={i} mode={mode} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
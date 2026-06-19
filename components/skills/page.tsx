"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserPage from "@/components/user/page";
import AISkillMatchModal from "@/components/AIskillSMatchModel/page";

/* ================= TYPES ================= */
export type Skill = {
  skillId: number;
  title: string;
  description?: string;
  category?: string;
  level?: string;
  username?: string;
  skill_img?: string;
  image_url?: string;
  ownerId?: number;
};

type UserMode = "learning" | "teaching" | "exchanging" | null;

/* ================= ANIMATION VARIANTS ================= */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const floatVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const glowPulse = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.1, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/* ================= PAGE ================= */
export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [userMode, setUserMode] = useState<UserMode>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAIModal, setShowAIModal] = useState(false);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  // const API_URL = "https://skillwrap-backend.onrender.com";
  const API_URL = "http://localhost:4000";

  /* ================= FETCH USER MODE ================= */
  useEffect(() => {
    fetch(`${API_URL}/auth/profile`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUserMode(data.user?.mode ?? null))
      .catch(() => setUserMode(null));
  }, []);

  /* ================= FETCH SKILLS ================= */
  useEffect(() => {
    async function fetchSkills() {
      try {
        setLoading(true);
        const endpoint = searchTerm.trim()
          ? `${API_URL}/search?title=${encodeURIComponent(searchTerm)}`
          : `${API_URL}/skills`;
        const res = await fetch(endpoint, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch skills");
        const data = await res.json();
        const normalizedSkills: Skill[] = Array.isArray(data.skills)
          ? data.skills.map((s: any) => ({
              skillId: s.skillId ?? s.id,
              title: s.title,
              description: s.description,
              category: s.category,
              level: s.level,
              username: s.username,
              skill_img: s.skillImg,
              image_url: s.image_url,
              ownerId: s.ownerId,
              mode: s.mode,
            }))
          : [];
        setSkills(normalizedSkills);
      } catch (err) {
        setError("Unable to load skills");
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, [searchTerm]);

  /* ================= FILTER OPTIONS ================= */
  const categories = useMemo(() => {
    const unique = new Set(skills.map((s) => s.category).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [skills]);

  const levels = useMemo(() => {
    const unique = new Set(skills.map((s) => s.level).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [skills]);

  /* ================= FILTERED SKILLS ================= */
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" || skill.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All" || skill.level === selectedLevel;
      const matchesSearch = skill.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [skills, selectedCategory, selectedLevel, searchTerm]);

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#060918] text-white overflow-hidden relative">
      {/* ================= ANIMATED BACKGROUND ================= */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(59,130,246,0.15) 50%, transparent 70%)",
          }}
        />
        <motion.div
          variants={floatVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
        >
          <motion.div
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(236,72,153,0.1) 50%, transparent 70%)",
            }}
          />
        </motion.div>
        <motion.div
          variants={glowPulse}
          animate="animate"
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 60%)",
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ================= HERO SECTION ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative pt-8 pb-6"
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              <span className="text-sm text-cyan-300 font-medium">
                AI-Powered Skill Discovery
              </span>
              <svg
                className="w-4 h-4 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
            className="text-center mb-6"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                Discover
              </span>{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Skills
                </span>
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-xl -z-10"
                />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Connect with experts, learn new skills, and grow together in our
              <span className="text-cyan-400"> AI-powered </span>
              skill exchange marketplace
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-6 md:gap-10 mb-8"
          >
            {[
              {
                value: skills.length || "100+",
                label: "Skills",
                icon: (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                ),
              },
              {
                value: categories.length - 1 || "10+",
                label: "Categories",
                icon: (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                ),
              },
              {
                value: "24/7",
                label: "AI Matching",
                icon: (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.06] hover:border-cyan-500/30 transition-all duration-300 cursor-default"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ================= SEARCH BAR (Fixed) ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
        className="sticky top-0 z-50 backdrop-blur-2xl bg-[#060918]/80 border-b border-white/[0.06] py-4 px-6"
      >
        <div className="max-w-4xl mx-auto flex gap-4">
          {/* Search Input */}
          <div className="flex-1 relative group">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center">
              <div className="absolute left-4 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search skills, categories, or experts..."
                className="w-full pl-12 pr-5 py-4 text-lg bg-white/[0.04] border border-white/[0.08] rounded-2xl
                  focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.06]
                  placeholder:text-gray-600 transition-all duration-300"
              />
              {searchTerm && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              )}
            </div>
          </div>

          {/* AI Button */}
          <motion.button
            onClick={() => setShowAIModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group px-6 py-4 rounded-2xl font-semibold text-base overflow-hidden"
          >
            {/* Button glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              initial={false}
              animate={{
                background: [
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                ],
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />

            <span className="relative flex items-center gap-2 text-white">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="hidden sm:inline">Find Skill Partners</span>
              <span className="sm:hidden">AI Match</span>
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* ================= SIDEBAR FILTER ================= */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 80 }}
            className="w-72 flex-shrink-0 hidden lg:block"
          >
            <div className="sticky top-28">
              {/* Filter Card */}
              <div className="relative group">
                {/* Card glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-b from-cyan-500/20 to-purple-500/20 rounded-3xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                <div className="relative p-6 rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                      <svg
                        className="w-5 h-5 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        Filters
                      </h2>
                      <p className="text-xs text-gray-500">
                        Refine your search
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                  {/* Category Filter */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <svg
                        className="w-4 h-4 text-cyan-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      Category
                    </label>
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white
                          focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.06]
                          appearance-none cursor-pointer transition-all duration-300"
                      >
                        {categories.map((cat) => (
                          <option
                            key={cat}
                            value={cat}
                            className="bg-[#0f1629] text-white"
                          >
                            {cat}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Level Filter */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <svg
                        className="w-4 h-4 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      Level
                    </label>
                    <div className="relative">
                      <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white
                          focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.06]
                          appearance-none cursor-pointer transition-all duration-300"
                      >
                        {levels.map((lvl) => (
                          <option
                            key={lvl}
                            value={lvl}
                            className="bg-[#0f1629] text-white"
                          >
                            {lvl}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Reset Button */}
                  {(selectedCategory !== "All" || selectedLevel !== "All") && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => {
                        setSelectedCategory("All");
                        setSelectedLevel("All");
                      }}
                      className="w-full py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
                    >
                      Reset Filters
                    </motion.button>
                  )}

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

                  {/* Quick Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Showing</span>
                      <span className="text-cyan-400 font-medium">
                        {filteredSkills.length} skills
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Categories</span>
                      <span className="text-purple-400 font-medium">
                        {categories.length - 1}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Tip Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Pro Tip
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Use AI matching to find the perfect skill partner based on
                      your learning goals and expertise.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.aside>

          {/* ================= SKILLS CONTENT ================= */}
          <motion.main
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 min-w-0"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {searchTerm ? "Search Results" : "Explore Skills"}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {filteredSkills.length} skill
                    {filteredSkills.length !== 1 ? "s" : ""} available
                    {selectedCategory !== "All" && ` in ${selectedCategory}`}
                  </p>
                </div>

                {/* Mobile Filter Toggle */}
                <div className="lg:hidden">
                  <button className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Decorative line */}
              <div className="mt-4 h-px bg-gradient-to-r from-cyan-500/50 via-purple-500/30 to-transparent" />
            </motion.div>

            {/* Error State */}
            {error && (
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center mb-6"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 mb-3">
                  <svg
                    className="w-6 h-6 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-red-400 font-medium">{error}</p>
              </motion.div>
            )}

            {/* Loading State */}
            {loading ? (
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="relative">
                  {/* Outer ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-16 h-16 rounded-full border-2 border-transparent border-t-cyan-500 border-r-cyan-500/50"
                  />
                  {/* Inner ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-2 rounded-full border-2 border-transparent border-b-purple-500 border-l-purple-500/50"
                  />
                  {/* Center dot */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" />
                  </motion.div>
                </div>
                <p className="mt-6 text-gray-400 font-medium">
                  Discovering skills...
                </p>
              </motion.div>
            ) : filteredSkills.length === 0 ? (
              /* Empty State */
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-xl"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No skills found
                </h3>
                <p className="text-gray-500 text-center max-w-md mb-6">
                  {searchTerm
                    ? `No results for "${searchTerm}". Try a different search term.`
                    : "No skills match your current filters. Try adjusting your criteria."}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedLevel("All");
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              /* Skills Grid */
              <motion.div variants={itemVariants}>
                <UserPage skills={filteredSkills} userMode={userMode} />
              </motion.div>
            )}
          </motion.main>
        </div>
      </div>

      {/* ================= AI MODAL ================= */}
      <AnimatePresence>
        {showAIModal && userMode && (
          <AISkillMatchModal
            userMode={userMode}
            onClose={() => setShowAIModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import {
  Trash2,
  Edit3,
  ExternalLink,
  Youtube,
  ArrowLeft,
  Plus,
  Search,
  Sparkles,
  BarChart3,
  FolderOpen,
  Award,
  Link2,
  Clock,
  ChevronDown,
  Zap,
  LayoutGrid,
  List,
  BookOpen,
  Trophy,
  Globe,
  TrendingUp,
} from "lucide-react";

interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  created_at: string;
  skill_img: string;
  learningpoint?: string;
  portfolio_link?: string | null;
  youtubelink?: string | null;
  user_id?: number;
  skill_img_public_id?: string | null;
}

interface ApiResponse {
  success: boolean;
  skills: Skill[];
  error?: string;
}

const API_URL = "https://skillwrap-backend.onrender.com";
  // const API_URL = "http://localhost:4000";

/* ─── helpers ─── */

function parseLearningPoints(raw?: string): string[] {
  if (!raw) return [];
  try {
    let temp: unknown = raw;
    while (typeof temp === "string") temp = JSON.parse(temp);
    return Array.isArray(temp) ? temp : [];
  } catch {
    return [];
  }
}

function relativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function levelColor(level: string) {
  const map: Record<string, string> = {
    beginner: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20",
    intermediate: "text-cyan-400 bg-cyan-500/10 ring-cyan-500/20",
    advanced: "text-amber-400 bg-amber-500/10 ring-amber-500/20",
    expert: "text-rose-400 bg-rose-500/10 ring-rose-500/20",
  };
  return map[level.toLowerCase()] || "text-white/50 bg-white/[0.06] ring-white/10";
}

function categoryIcon(cat: string) {
  const lower = cat.toLowerCase();
  if (lower.includes("dev") || lower.includes("program") || lower.includes("code")) return Zap;
  if (lower.includes("design") || lower.includes("ui") || lower.includes("ux")) return Sparkles;
  if (lower.includes("music") || lower.includes("audio")) return BookOpen;
  if (lower.includes("data") || lower.includes("analy")) return TrendingUp;
  return FolderOpen;
}

/* ─── animation presets ─── */

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 240, damping: 22 } },
  exit: { opacity: 0, y: -14, scale: 0.95, transition: { duration: 0.18 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
};

const orbFloat = (i: number): Variants => ({
  animate: {
    y: [0, -20 - i * 5, 0],
    x: [0, i % 2 ? 14 : -14, 0],
    scale: [1, 1.06 + i * 0.02, 1],
    transition: { duration: 7 + i * 1.5, repeat: Infinity, ease: "easeInOut" },
  },
});

const countUp = (target: number): Variants => ({
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hidden: { opacity: 0, y: 10 },
});

/* ─── sub-components ─── */

function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.4) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      {[
        { size: 380, top: "5%", left: "4%", color: "bg-cyan-500/15" },
        { size: 280, top: "50%", left: "70%", color: "bg-blue-500/12" },
        { size: 220, top: "25%", left: "38%", color: "bg-teal-500/10" },
        { size: 200, top: "72%", left: "15%", color: "bg-sky-400/10" },
        { size: 160, top: "10%", left: "82%", color: "bg-indigo-500/8" },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${orb.color}`}
          style={{ width: orb.size, height: orb.size, top: orb.top, left: orb.left }}
          variants={orbFloat(i)}
          animate="animate"
        />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
      <div className="h-44 bg-white/[0.04] animate-pulse" />
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-2/3 rounded bg-white/[0.06] animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-white/[0.04] animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-white/[0.04] animate-pulse" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-white/[0.06] animate-pulse" />
          <div className="h-6 w-16 rounded-full bg-white/[0.06] animate-pulse" />
        </div>
        <div className="flex gap-3 pt-2">
          <div className="h-9 flex-1 rounded-xl bg-white/[0.06] animate-pulse" />
          <div className="h-9 flex-1 rounded-xl bg-white/[0.06] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      variants={countUp(value)}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm px-5 py-4 flex items-center gap-4 overflow-hidden"
      whileHover={{ borderColor: "rgba(34,211,238,.2)", scale: 1.03 }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-blue-500/[0.03]" />
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}
      >
        <Icon size={18} />
      </div>
      <div>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <div className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">{label}</div>
      </div>
    </motion.div>
  );
}

/* ─── SkillImageEditor stub ─── */

function SkillImageEditor({
  imageUrl,
  skillId,
  title,
  onUploadSuccess,
}: {
  imageUrl: string;
  skillId: string;
  title: string;
  onUploadSuccess: (newUrl: string) => void;
}) {
  const [hovering, setHovering] = useState(false);
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("skill_img", file);
    formData.append("skillId", skillId);

    try {
      const res = await fetch(`${API_URL}/upload-skill-image`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setImgSrc(data.url);
        onUploadSuccess(data.url);
        toast.success("Image updated");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch {
      toast.error("Upload error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="relative w-full h-44 rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Sparkles size={32} className="text-white/10" />
        </div>
      )}

      {/* hover overlay */}
      <AnimatePresence>
        {hovering && (
          <motion.label
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center cursor-pointer"
          >
            {uploading ? (
              <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <div className="flex flex-col items-center gap-1 text-white/80">
                <Edit3 size={20} />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Change Image</span>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </motion.label>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── main component ─── */

export default function ViewSkill() {
const router  = useRouter();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const [showLvlDropdown, setShowLvlDropdown] = useState(false);

  /* fetch */
  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch(`${API_URL}/view-skill`, { credentials: "include" });
        const data: ApiResponse = await res.json();
        if (!data.success) {
          toast.error(data.error || "Failed to load skills");
          return;
        }
        setSkills(data.skills);
      } catch {
        toast.error("Network error");
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  
    /* ================= AUTH CHECK ================= */
    useEffect(() => {
      async function checkAuth() {
        try {
          const res = await fetch(`${API_URL}/auth/profile`, {
            credentials: "include",
          });
          if (!res.ok) router.push("/login");
  
          const data = await res.json();
          // setMyMode(data.user.mode);
          console.log(data.user.mode, " ss");
        } catch {
          router.push("/login");
        }
      }
      checkAuth();
    }, [router]);
  

  /* delete */
  async function handleDelete(skillId: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const res = await fetch(`${API_URL}/skill/${skillId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.error || "Delete failed");
        return;
      }
      setSkills((prev) => prev.filter((s) => s.id !== skillId));
      toast.success("Skill deleted");
    } catch {
      toast.error("Network error");
    }
  }

  /* derived data */
  const categories = useMemo(() => ["all", ...Array.from(new Set(skills.map((s) => s.category)))], [skills]);
  const levels = useMemo(() => ["all", ...Array.from(new Set(skills.map((s) => s.level)))], [skills]);

  const filtered = useMemo(() => {
    let list = skills;
    if (categoryFilter !== "all") list = list.filter((s) => s.category === categoryFilter);
    if (levelFilter !== "all") list = list.filter((s) => s.level === levelFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [skills, categoryFilter, levelFilter, searchQuery]);

  const stats = useMemo(() => {
    const uniqueCats = new Set(skills.map((s) => s.category)).size;
    const advanced = skills.filter((s) => s.level.toLowerCase() === "advanced" || s.level.toLowerCase() === "expert").length;
    const withPortfolio = skills.filter((s) => s.portfolio_link).length;
    return { total: skills.length, categories: uniqueCats, advanced, portfolioLinks: withPortfolio };
  }, [skills]);

  /* ─── render ─── */

  return (
    <main className="relative min-h-screen bg-[#030712] text-white overflow-hidden">
      <FloatingOrbs />
      <ToastContainer newestOnTop theme="dark" />

      {/* ── HEADER ── */}
      <div className="relative z-10 pt-10 pb-6 px-6 max-w-7xl mx-auto">
        {/* back + CTA */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/50 text-sm hover:bg-white/[0.08] hover:text-white/70 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>

          <a
            href="/create-skill"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/15"
          >
            <Plus size={16} />
            New Skill
          </a>
        </motion.div>

        {/* title */}
        <motion.div className="mt-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Skills Dashboard
            </span>
          </h1>
          <p className="mt-2 text-white/35 text-sm">Manage, track, and showcase your skill portfolio</p>
        </motion.div>

        {/* ── STATS ── */}
        <motion.div
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard icon={BarChart3} label="Total Skills" value={stats.total} color="bg-cyan-500/10 text-cyan-400" delay={0.25} />
          <StatCard icon={FolderOpen} label="Categories" value={stats.categories} color="bg-blue-500/10 text-blue-400" delay={0.3} />
          <StatCard icon={Award} label="Advanced" value={stats.advanced} color="bg-amber-500/10 text-amber-400" delay={0.35} />
          <StatCard icon={Link2} label="Portfolios" value={stats.portfolioLinks} color="bg-emerald-500/10 text-emerald-400" delay={0.4} />
        </motion.div>

        {/* ── FILTER BAR ── */}
        <motion.div
          className="mt-6 flex flex-col md:flex-row gap-3 items-start md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* search */}
          <div className="relative flex-1 max-w-md">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition"
            />
          </div>

          {/* category dropdown */}
          <div className="relative">
            <button
              onClick={() => { setShowCatDropdown(!showCatDropdown); setShowLvlDropdown(false); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white/60 hover:bg-white/[0.08] transition"
            >
              <FolderOpen size={14} />
              {categoryFilter === "all" ? "Category" : categoryFilter}
              <ChevronDown size={12} className={`transition-transform ${showCatDropdown ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {showCatDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute top-full left-0 mt-2 w-44 py-1 rounded-xl bg-[#0c1425] border border-white/[0.08] shadow-xl shadow-black/40 z-20"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setCategoryFilter(cat); setShowCatDropdown(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        categoryFilter === cat ? "text-cyan-400 bg-cyan-500/10" : "text-white/50 hover:text-white/70 hover:bg-white/[0.04]"
                      }`}
                    >
                      {cat === "all" ? "All Categories" : cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* level dropdown */}
          <div className="relative">
            <button
              onClick={() => { setShowLvlDropdown(!showLvlDropdown); setShowCatDropdown(false); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white/60 hover:bg-white/[0.08] transition"
            >
              <Trophy size={14} />
              {levelFilter === "all" ? "Level" : levelFilter}
              <ChevronDown size={12} className={`transition-transform ${showLvlDropdown ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {showLvlDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute top-full left-0 mt-2 w-40 py-1 rounded-xl bg-[#0c1425] border border-white/[0.08] shadow-xl shadow-black/40 z-20"
                >
                  {levels.map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => { setLevelFilter(lvl); setShowLvlDropdown(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        levelFilter === lvl ? "text-cyan-400 bg-cyan-500/10" : "text-white/50 hover:text-white/70 hover:bg-white/[0.04]"
                      }`}
                    >
                      {lvl === "all" ? "All Levels" : lvl}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* active filter count */}
          {(categoryFilter !== "all" || levelFilter !== "all" || searchQuery) && (
            <button
              onClick={() => { setCategoryFilter("all"); setLevelFilter("all"); setSearchQuery(""); }}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Clear filters
            </button>
          )}
        </motion.div>
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 px-6 pb-20 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeletons"
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div key={i} variants={cardIn}>
                  <SkeletonCard />
                </motion.div>
              ))}
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div
              key="empty"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center justify-center py-28 text-center"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center mb-6">
                  <Sparkles size={36} className="text-cyan-500/30" />
                </div>
                <div className="absolute inset-0 w-24 h-24 rounded-full bg-cyan-500/5 animate-ping opacity-20" />
              </div>
              <h3 className="text-lg font-semibold text-white/50">
                {searchQuery || categoryFilter !== "all" || levelFilter !== "all"
                  ? "No matching skills"
                  : "No skills yet"}
              </h3>
              <p className="mt-2 text-sm text-white/25 max-w-xs">
                {searchQuery || categoryFilter !== "all" || levelFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Start building your skill portfolio by adding your first skill"}
              </p>
              {!searchQuery && categoryFilter === "all" && levelFilter === "all" && (
                <a
                  href="/create-skill"
                  className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/15"
                >
                  <Plus size={16} />
                  Add Your First Skill
                </a>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="cards"
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((skill) => {
                const learningPoints = parseLearningPoints(skill.learningpoint);
                const CatIcon = categoryIcon(skill.category);

                return (
                  <motion.div
                    key={skill.id}
                    variants={cardIn}
                    layout
                    className="group relative rounded-2xl bg-white/[0.025] border border-white/[0.06] backdrop-blur-sm overflow-hidden"
                    whileHover={{ scale: 1.018, borderColor: "rgba(34,211,238,.16)" }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    {/* hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-blue-500/[0.04]" />

                    {/* animated gradient top border on hover */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent group-hover:via-cyan-400/40 transition-all duration-500" />

                    <div className="relative p-5 flex flex-col gap-4">
                      {/* image */}
                      <SkillImageEditor
                        imageUrl={skill.skill_img}
                        skillId={skill.id}
                        title={skill.title}
                        onUploadSuccess={(newUrl) => {
                          setSkills((prev) =>
                            prev.map((s) => (s.id === skill.id ? { ...s, skill_img: newUrl } : s))
                          );
                        }}
                      />

                      {/* title + meta */}
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-bold text-white/90 capitalize leading-snug">{skill.title}</h3>
                          <span className="flex items-center gap-1 text-[10px] text-white/20 shrink-0">
                            <Clock size={10} />
                            {relativeTime(skill.created_at)}
                          </span>
                        </div>
                        <p className="text-sm text-white/35 mt-1.5 leading-relaxed line-clamp-2">{skill.description}</p>
                      </div>

                      {/* tags */}
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/50 font-medium">
                          <CatIcon size={11} />
                          {skill.category}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ring-1 text-[11px] font-semibold uppercase tracking-wider ${levelColor(skill.level)}`}>
                          <Trophy size={10} />
                          {skill.level}
                        </span>
                        {skill.youtubelink && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/10 ring-1 ring-red-500/20 text-red-400 text-[11px] font-medium">
                            <Youtube size={10} />
                            Video
                          </span>
                        )}
                        {skill.portfolio_link && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20 text-emerald-400 text-[11px] font-medium">
                            <Globe size={10} />
                            Portfolio
                          </span>
                        )}
                      </div>

                      {/* learning points */}
                      {learningPoints.length > 0 && (
                        <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400/60">
                            Learning Points
                          </span>
                          <ul className="mt-2 space-y-1.5">
                            {learningPoints.slice(0, 3).map((point, i) => (
                              <li key={i} className="flex items-start gap-2 text-[12px] text-white/45 leading-snug">
                                <span className="mt-1 w-1 h-1 rounded-full bg-cyan-400/50 shrink-0" />
                                {point}
                              </li>
                            ))}
                            {learningPoints.length > 3 && (
                              <li className="text-[11px] text-white/20 pl-3">
                                +{learningPoints.length - 3} more
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      {/* links */}
                      {(skill.portfolio_link || skill.youtubelink) && (
                        <div className="flex gap-2">
                          {skill.portfolio_link && (
                            <a
                              href={skill.portfolio_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-[12px] text-emerald-400/70 hover:text-emerald-400 transition-colors"
                            >
                              <ExternalLink size={12} />
                              Portfolio
                            </a>
                          )}
                          {skill.youtubelink && (
                            <a
                              href={skill.youtubelink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-[12px] text-red-400/70 hover:text-red-400 transition-colors"
                            >
                              <Youtube size={12} />
                              YouTube
                            </a>
                          )}
                        </div>
                      )}

                      {/* actions */}
                      <div className="flex gap-2.5 pt-1">
                        <a href={`/skill/${skill.id}/edit-skill`} className="flex-1">
                          <motion.button
                            className="w-full flex justify-center items-center gap-2 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold hover:bg-blue-500/20 hover:border-blue-500/30 transition-colors"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Edit3 size={14} />
                            Edit
                          </motion.button>
                        </a>

                        <motion.button
                          onClick={() => handleDelete(skill.id, skill.title)}
                          className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/20 hover:border-red-500/30 transition-colors"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Trash2 size={14} />
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

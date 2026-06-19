"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  Share2,
  Bookmark,
  Calendar,
  Target,
  BookOpen,
  Play,
  ExternalLink,
  ChevronLeft,
  Globe,
  Zap,
  Award,
  Clock,
  Tag,
  User,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

/* ================= TYPES ================= */

type Skill = {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  skill_img: string | null;
  created_at: string;
  youtube_link?: string | null;
  learningPoints?: string[];
  user: {
    id: number;
    username: string;
    fullname: string;
    portfolio_link?: string | null;
  };
};

type UserType = {
  id: number;
  fullname: string;
  username: string;
  email: string;
  mode?: "learning" | "teaching" | "exchanging";
};

/* ================= ANIMATED BACKGROUND ================= */

function GlowOrb({ className }: { className: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`}
      animate={{
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ================= LOADING SKELETON ================= */

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-navy-950 text-white px-4 md:px-8 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="h-10 w-24 rounded-xl bg-gray-800/50 animate-pulse" />
        <div className="h-[350px] md:h-[450px] rounded-3xl bg-gray-800/50 animate-pulse" />
        <div className="space-y-4">
          <div className="h-10 w-3/4 rounded-xl bg-gray-800/50 animate-pulse" />
          <div className="flex gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-20 rounded-full bg-gray-800/50 animate-pulse" />
            ))}
          </div>
          <div className="h-32 rounded-xl bg-gray-800/50 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/* ================= ERROR STATE ================= */

function ErrorState() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
          <span className="text-2xl">?</span>
        </div>
        <h2 className="text-xl font-bold text-red-400">Skill Not Found</h2>
        <p className="text-gray-500 text-sm">The skill you're looking for doesn't exist or has been removed.</p>
      </motion.div>
    </div>
  );
}

/* ================= LEVEL BADGE ================= */

function LevelBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    beginner: "from-green-400 to-emerald-500",
    intermediate: "from-cyan-400 to-blue-500",
    advanced: "from-purple-400 to-pink-500",
    expert: "from-amber-400 to-orange-500",
  };
  const gradient = styles[level?.toLowerCase()] || styles["beginner"];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-gradient-to-r ${gradient} text-white shadow-lg`}
    >
      <Target size={10} />
      {level}
    </span>
  );
}

/* ================= MAIN PAGE ================= */

export default function SkillDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [skill, setSkill] = useState<Skill | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const API_URL = "http://localhost:4000";

  // Fetch skill data
  useEffect(() => {
    async function fetchSkill() {
      try {
        const res = await fetch(`${API_URL}/skills/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch skill");
        const data = await res.json();
        setSkill(data.skill);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchSkill();
  }, [id]);

  // Fetch logged-in user
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        setUser(data.user);
      } catch {
        // Silent fail - user may not be logged in
      }
    }
    fetchUser();
  }, []);

  // Handle action click
  const handleActionClick = () => {
    if (!user?.mode) {
      alert("Please choose a mode first in your dashboard.");
      return;
    }
    const userMode = user.mode;
    sessionStorage.setItem("selectedSkill", JSON.stringify(skill));
    sessionStorage.setItem("selectedUser", JSON.stringify(userMode));

    if (user.mode === "learning") {
      router.push("/request_learn");
    } else if (user.mode === "exchanging") {
      router.push("/exchange_skill");
    }
  };

  // Handle share
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  if (loading) return <LoadingSkeleton />;
  if (error || !skill) return <ErrorState />;

  const firstLetter = skill.user.username.charAt(0).toUpperCase();

  // Determine button label based on user's mode
  let actionButtonLabel = "";
  if (user?.mode === "learning") actionButtonLabel = "Request to Learn";
  else if (user?.mode === "exchanging") actionButtonLabel = "Request Exchange";

  return (
    <div className="min-h-screen bg-navy-950 text-white relative overflow-hidden">
      {/* Background glows */}
      <GlowOrb className="w-[500px] h-[500px] bg-blue-600/20 -top-40 -left-40" />
      <GlowOrb className="w-[400px] h-[400px] bg-purple-600/15 top-1/2 -right-20" />
      <GlowOrb className="w-[350px] h-[350px] bg-cyan-500/10 -bottom-20 left-1/4" />

      <div className="relative z-10 px-4 md:px-8 py-6 md:py-10">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -3 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-input text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={18} />
            Back to Browse
          </motion.button>

          {/* Main Skill Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-heavy rounded-3xl overflow-hidden"
          >
            {/* Hero Image Section */}
            <div className="relative h-[280px] md:h-[400px] overflow-hidden">
              {skill.skill_img ? (
                <>
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                  )}
                  <motion.img
                    src={skill.skill_img}
                    alt={skill.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <BookOpen size={64} className="text-gray-700" />
                </div>
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />

              {/* Top action buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLiked(!liked)}
                  className="p-3 rounded-xl glass backdrop-blur-xl hover:bg-white/10 transition-colors"
                >
                  <Heart
                    size={20}
                    className={`${liked ? "fill-pink-500 text-pink-500" : "text-white"}`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setBookmarked(!bookmarked)}
                  className="p-3 rounded-xl glass backdrop-blur-xl hover:bg-white/10 transition-colors"
                >
                  <Bookmark
                    size={20}
                    className={`${bookmarked ? "fill-yellow-400 text-yellow-400" : "text-white"}`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="p-3 rounded-xl glass backdrop-blur-xl hover:bg-white/10 transition-colors"
                >
                  <Share2 size={20} className="text-white" />
                </motion.button>
              </div>

              {/* Bottom badges */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-full glass text-xs font-bold uppercase tracking-wider text-cyan-300">
                    {skill.category}
                  </span>
                  <LevelBadge level={skill.level} />
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs text-gray-400">
                  <Clock size={12} />
                  {new Date(skill.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-10 space-y-6">

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
              >
                {skill.title}
              </motion.h1>

              {/* Meta info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-4 text-sm text-gray-400"
              >
                <span className="flex items-center gap-1.5">
                  <Tag size={14} className="text-cyan-400" />
                  {skill.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <Target size={14} className="text-purple-400" />
                  {skill.level}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-blue-400" />
                  {new Date(skill.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </motion.div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 text-base md:text-lg leading-relaxed"
              >
                {skill.description}
              </motion.p>

              {/* Learning Points Section */}
              {skill.learningPoints && skill.learningPoints.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Award size={18} className="text-cyan-400" />
                    What You'll Learn
                  </h3>
                  <div className="grid gap-3">
                    {skill.learningPoints.map((point, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="flex items-start gap-3 p-4 rounded-xl glass-input hover:border-cyan-500/30 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 size={14} className="text-white" />
                        </div>
                        <p className="text-gray-300 leading-relaxed">{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Links Section */}
              <AnimatePresence>
                {(skill.youtube_link || skill.user.portfolio_link) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="flex flex-col md:flex-row gap-3"
                  >
                    {skill.youtube_link && (
                      <a
                        href={skill.youtube_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex-1 flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-red-500/15 to-orange-500/15 border border-red-500/20 hover:border-red-500/40 transition-all"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shrink-0">
                          <Play size={16} className="text-white fill-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm">Video Tutorial</p>
                          <p className="text-xs text-gray-400 truncate">Watch step-by-step guidance</p>
                        </div>
                        <ExternalLink size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                      </a>
                    )}
                    {skill.user.portfolio_link && (
                      <a
                        href={skill.user.portfolio_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex-1 flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-500/15 to-emerald-500/15 border border-green-500/20 hover:border-green-500/40 transition-all"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shrink-0">
                          <Globe size={16} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm">Portfolio</p>
                          <p className="text-xs text-gray-400 truncate">View more work from creator</p>
                        </div>
                        <ExternalLink size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                      </a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                {actionButtonLabel && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleActionClick}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2"
                  >
                    <Zap size={18} />
                    {actionButtonLabel}
                    <ArrowRight size={16} />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.back()}
                  className="flex-1 py-3.5 rounded-xl glass-input hover:bg-white/10 transition-colors font-medium flex items-center justify-center gap-2 text-gray-300 hover:text-white"
                >
                  <ChevronLeft size={18} />
                  Go Back
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Creator Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-b border-white/5">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <User size={14} className="text-cyan-400" />
                Skill Creator
              </h3>
            </div>

            <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative shrink-0"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-cyan-400 to-blue-500 blur-lg opacity-40" />
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-xl font-bold text-white border-3 border-navy-950">
                  {firstLetter}
                </div>
              </motion.div>

              {/* Info */}
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white">{skill.user.fullname}</h4>
                <p className="text-cyan-400 text-sm">@{skill.user.username}</p>
                <p className="text-gray-400 text-sm mt-1">
                  Teaching in <span className="text-cyan-300">{skill.category}</span>
                </p>
              </div>

              {/* Profile link */}
              <Link
                href={`/profiles/${skill.user.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass-input hover:bg-white/10 transition-colors text-sm text-cyan-400 hover:text-cyan-300 font-medium"
              >
                View Profile
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

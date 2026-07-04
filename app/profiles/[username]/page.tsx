"use client"
import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Trophy,
  XCircle,
  MessageSquare,
  Calendar,
  Eye,
  Award,
  Zap,
  TrendingUp,
  Users,
  Globe,
  Share2,
  UserPlus,
  CheckCircle2,
  Clock,
  Flame,
  Target,
  BookOpen,
  Code,
  Palette,
  Music,
  Camera,
  Briefcase,
  Heart,
  ChevronRight,
  Sparkles,
  Shield,
  Medal,
  Gem,
  Crown,
} from "lucide-react";

/* ================= TYPES ================= */

type Review = {
  id: number;
  rating: number | string;
  review_text: string;
  reviewer_username: string;
  reviewer_avatar: string | null;
};

type Skill = {
  skill_id: number;
  skill_img: string | null;
  title: string;
  description: string;
  level: string;
  category: string;
  avg_rating: number | string | null;
  review_count: number;
  user_mode?: "learning" | "teaching" | "exchanging";
  user_bio?: string | null;
  reviews: Review[];
};

type ProfileResponse = {
  profile: {
    fullname: string;
    username: string;
    img_url: string | null;
    created_at: string;
  };
  stats: {
    successful_exchanges: number;
    overall_rating: number | string | null;
    total_reviews: number;
    cancelled_exchanges: number;
  };
  skillsWithReviews: Skill[];
};

/* ================= MOCK DATA FOR ENHANCEMENTS ================= */

const MOCK_ACHIEVEMENTS = [
  { id: 1, icon: Trophy, name: "First Exchange", color: "from-yellow-400 to-orange-500", unlocked: true },
  { id: 2, icon: Flame, name: "7-Day Streak", color: "from-red-400 to-orange-500", unlocked: true },
  { id: 3, icon: Star, name: "Top Rated", color: "from-cyan-400 to-blue-500", unlocked: false },
  { id: 4, icon: Medal, name: "10 Exchanges", color: "from-purple-400 to-pink-500", unlocked: false },
  { id: 5, icon: Crown, name: "Expert Level", color: "from-amber-400 to-yellow-500", unlocked: false },
  { id: 6, icon: Gem, name: "100 Reviews", color: "from-indigo-400 to-purple-500", unlocked: false },
];

const MOCK_ACTIVITY = [
  { id: 1, type: "exchange", text: "Completed skill exchange with @alice", time: "2 hours ago", icon: CheckCircle2, color: "text-green-400" },
  { id: 2, type: "review", text: "Received 5-star review from @bob", time: "1 day ago", icon: Star, color: "text-yellow-400" },
  { id: 3, type: "skill", text: "Added new skill: React Development", time: "3 days ago", icon: BookOpen, color: "text-cyan-400" },
  { id: 4, type: "achievement", text: "Unlocked First Exchange badge", time: "1 week ago", icon: Trophy, color: "text-orange-400" },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "programming": <Code size={14} />,
  "design": <Palette size={14} />,
  "music": <Music size={14} />,
  "photography": <Camera size={14} />,
  "business": <Briefcase size={14} />,
  "default": <Target size={14} />,
};

/* ================= ANIMATED BACKGROUND COMPONENTS ================= */

function FloatingOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      animate={{
        y: [0, 30, 0],
        x: [0, 20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 10 + delay * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,255,208,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,255,208,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

/* ================= STAT CARD COMPONENT ================= */

function StatCard({
  icon,
  label,
  value,
  color,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative rounded-2xl p-5 glass-heavy overflow-hidden cursor-default"
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl bg-gradient-to-br ${color}`} />
      <div className="relative z-10 space-y-3">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
        <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
        <motion.p
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, type: "spring" }}
          className="text-3xl font-bold text-white"
        >
          {value}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ================= ACHIEVEMENT BADGE COMPONENT ================= */

function AchievementBadge({ achievement, unlocked }: { achievement: typeof MOCK_ACHIEVEMENTS[0]; unlocked: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -3 }}
      className={`relative group cursor-default`}
    >
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
          unlocked
            ? `bg-gradient-to-br ${achievement.color} shadow-lg`
            : "bg-gray-800/50 border border-gray-700/50"
        }`}
      >
        <achievement.icon
          size={24}
          className={unlocked ? "text-white" : "text-gray-600"}
        />
      </div>
      {!unlocked && (
        <div className="absolute inset-0 rounded-xl bg-black/50 flex items-center justify-center">
          <span className="text-[10px] text-gray-400">Locked</span>
        </div>
      )}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-navy-950 px-2 py-1 rounded text-[10px] text-white z-20">
        {achievement.name}
      </div>
    </motion.div>
  );
}

/* ================= ACTIVITY ITEM COMPONENT ================= */

function ActivityItem({ activity }: { activity: typeof MOCK_ACTIVITY[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
    >
      <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center ${activity.color}`}>
        <activity.icon size={14} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-300 truncate">{activity.text}</p>
        <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
          <Clock size={10} />
          {activity.time}
        </p>
      </div>
    </motion.div>
  );
}

/* ================= SKILL CARD COMPONENT ================= */

function SkillCard({
  skill,
  myMode,
  navigate,
  index,
}: {
  skill: Skill;
  myMode: string;
  navigate: (path: string) => void;
  index: number;
}) {
  let actionBtn = null;
  const skillMode = skill.user_mode?.toLowerCase();

  if (myMode === "learning" && skillMode === "teaching") {
    actionBtn = {
      text: "Request to Learn",
      style: "from-cyan-500 to-blue-600 hover:shadow-cyan-500/30",
    };
  } else if (myMode === "exchanging" && skillMode === "exchanging") {
    actionBtn = {
      text: "Request to Exchange",
      style: "from-purple-500 to-pink-600 hover:shadow-purple-500/30",
    };
  }

  const rating = Number(skill.avg_rating || 0);
  const ratingWidth = Math.min(100, (rating / 5) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="group relative rounded-2xl glass overflow-hidden flex flex-col"
    >
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl border border-cyan-400/30 animate-pulse" />
      </div>

      {/* Image */}
      <Link href={`/skills/${skill.skill_id}`} className="relative block overflow-hidden">
        <img
          src={skill.skill_img?.trim() || "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600"}
          alt={skill.title}
          className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />

        {/* Mode badge on image */}
        {skill.user_mode && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
            skill.user_mode === "teaching"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : skill.user_mode === "learning"
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
              : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
          }`}>
            {skill.user_mode}
          </div>
        )}

        {/* View overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white text-sm border border-white/20">
            <Eye size={16} /> View Skill
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              {skill.title}
            </h3>
            <div className="shrink-0 flex items-center gap-1 text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded">
              {CATEGORY_ICONS[skill.category?.toLowerCase()] || CATEGORY_ICONS["default"]}
              <span>{skill.category || "General"}</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2">{skill.description}</p>
        </div>

        {/* Rating bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-yellow-400" fill="currentColor" />
              <span className="text-yellow-400 font-semibold">{rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-500">{skill.review_count || 0} reviews</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-800/50 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${ratingWidth}%` }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
            />
          </div>
        </div>

        {/* Reviews preview */}
        {Array.isArray(skill.reviews) && skill.reviews.length > 0 && (
          <div className="space-y-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
            {skill.reviews.slice(0, 2).map((review) => (
              <div
                key={review.id}
                className="flex gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-colors"
              >
                <img
                  src={review.reviewer_avatar?.trim() || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100"}
                  alt={review.reviewer_username}
                  className="w-8 h-8 rounded-full object-cover border border-white/10"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-cyan-300 truncate">
                      @{review.reviewer_username}
                    </p>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          size={8}
                          className={i <= Number(review.rating) ? "text-yellow-400" : "text-gray-700"}
                          fill={i <= Number(review.rating) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{review.review_text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action button */}
        {actionBtn && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sessionStorage.setItem("selectedSkill", JSON.stringify(skill));
              navigate(actionBtn?.text === "Request to Learn" ? "/request_learn" : "/exchange_skill");
            }}
            className={`w-full py-3 rounded-xl bg-gradient-to-r ${actionBtn.style} text-white font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm`}
          >
            <Zap size={14} />
            {actionBtn.text}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

/* ================= LOADING SKELETON ================= */

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-navy-950 text-white px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header skeleton */}
        <div className="rounded-3xl glass p-8 animate-pulse">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-32 h-32 rounded-full bg-gray-800" />
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="h-8 bg-gray-800 rounded-lg w-48 mx-auto md:mx-0" />
              <div className="h-4 bg-gray-800 rounded w-32 mx-auto md:mx-0" />
              <div className="h-16 bg-gray-800 rounded-lg w-full max-w-lg mx-auto md:mx-0" />
            </div>
          </div>
        </div>
        {/* Stats skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-gray-800/50 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN PROFILE PAGE ================= */

export default function ProfilePage() {
  const { username } = useParams();
  const router = useRouter();
  // const navigate = useNavigate();

  // const API_URL = "http://localhost:4000";
    const API_URL = "https://skillwrap-backend.onrender.com";

  const [data, setData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [myMode, setMyMode] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [coverHovered, setCoverHovered] = useState(false);

useEffect(() => {
  if (!username) return;

  fetch(`${API_URL}/profile/${username}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then(setData)
    .catch(() => router.push("/404"))
    .finally(() => setLoading(false));
}, [username, router]);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const user = await res.json();
        setMyMode(user.user.mode);
      } catch {
        router.push("/login");
      }
    }
    checkAuth();
  }, [router]);

  // Calculate derived data
  const profileCompletion = useMemo(() => {
    if (!data) return 0;
    let score = 20; // Base for having account
    if (data.profile.img_url) score += 20;
    if (data.skillsWithReviews?.length > 0) score += 30;
    if (data.profile.fullname?.trim()) score += 10;
    const hasBio = data.skillsWithReviews?.some((s) => s.user_bio);
    if (hasBio) score += 20;
    return Math.min(100, score);
  }, [data]);

  const xpLevel = useMemo(() => {
    if (!data) return { level: 1, xp: 0, nextLevel: 100 };
    const xp = (data.stats.successful_exchanges * 50) + (data.stats.total_reviews * 10);
    const level = Math.floor(xp / 100) + 1;
    return { level, xp: xp % 100, nextLevel: 100 };
  }, [data]);

  const streak = useMemo(() => {
    return Math.min(30, Math.floor(Math.random() * 30) + 1); // Mock streak
  }, []);

  const uniqueModes = useMemo(() => {
    if (!data?.skillsWithReviews) return [];
    const modes = new Set<string>();
    data.skillsWithReviews.forEach((s) => {
      if (s.user_mode) modes.add(s.user_mode);
    });
    return Array.from(modes);
  }, [data]);

  if (loading) return <ProfileSkeleton />;
  if (!data) return null;

  const { profile, stats, skillsWithReviews } = data;

  return (
    <div className="min-h-screen bg-navy-950 text-white relative overflow-hidden">
      {/* ============ ANIMATED BACKGROUND ============ */}
      <div className="fixed inset-0 pointer-events-none">
        <GridBackground />
        <FloatingOrb className="w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 -top-20 -left-20" delay={0} />
        <FloatingOrb className="w-[400px] h-[400px] bg-gradient-to-r from-purple-500/8 to-pink-500/8 top-[40%] right-[-10%]" delay={2} />
        <FloatingOrb className="w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/6 to-cyan-500/6 -bottom-10 left-[20%]" delay={4} />
      </div>

      <div className="relative z-10 px-4 md:px-8 py-6 md:py-10">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* ============ BACK BUTTON ============ */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -3 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-input text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ChevronRight size={16} className="rotate-180" />
            Go Back
          </motion.button>

          {/* ============ PROFILE HERO ============ */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setCoverHovered(true)}
            onMouseLeave={() => setCoverHovered(false)}
            className="relative rounded-3xl overflow-hidden glass-heavy"
          >
            {/* Animated cover gradient */}
            <div className="absolute inset-0 h-48 md:h-56 overflow-hidden">
              <motion.div
                animate={{
                  backgroundPosition: coverHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
                }}
                transition={{ duration: 3, repeat: coverHovered ? Infinity : 0, repeatType: "reverse" }}
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-500/20 via-purple-500/20 to-pink-500/30"
                style={{ backgroundSize: "200% 200%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />

              {/* Cover particles */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-8 right-12 w-2 h-2 rounded-full bg-cyan-400/60"
              />
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute top-16 left-24 w-1.5 h-1.5 rounded-full bg-purple-400/60"
              />
              <motion.div
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                className="absolute top-12 right-1/3 w-1 h-1 rounded-full bg-blue-400/60"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 pt-28 md:pt-36 pb-6 md:pb-8 px-6 md:px-10">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-end">

                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="relative shrink-0 -mt-20 md:-mt-24"
                >
                  {/* Glow ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-60 blur-sm"
                  />
                  <div className="absolute inset-[-3px] rounded-full bg-navy-950" />
                  <img
                    src={profile.img_url?.trim() || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200"}
                    alt={profile.fullname}
                    className="relative w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-navy-950 shadow-2xl"
                  />
                  {/* Online indicator */}
                  <div className="absolute bottom-2 right-2 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-navy-950" />
                    <div className="absolute w-4 h-4 rounded-full bg-green-500 animate-ping opacity-60" />
                  </div>
                </motion.div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left space-y-4">
                  {/* Name + Verified */}
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <h1 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                      {profile.fullname}
                    </h1>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      <Shield size={12} className="text-cyan-400" />
                      <span className="text-[10px] text-cyan-400 font-semibold">Verified</span>
                    </div>
                  </div>

                  {/* Username */}
                  <p className="text-cyan-400/80 text-sm">@{profile.username}</p>

                  {/* Mode badges */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {uniqueModes.map((mode) => (
                      <motion.span
                        key={mode}
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1.5 ${
                          mode === "teaching"
                            ? "bg-green-500/15 text-green-400 border border-green-500/30"
                            : mode === "learning"
                            ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                            : "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                        }`}
                      >
                        {mode === "teaching" && <BookOpen size={12} />}
                        {mode === "learning" && <Target size={12} />}
                        {mode === "exchanging" && <Zap size={12} />}
                        {mode.toUpperCase()}
                      </motion.span>
                    ))}
                  </div>

                  {/* XP Level */}
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center gap-2">
                      <Crown size={14} className="text-amber-400" />
                      <span className="text-xs text-amber-400 font-semibold">Level {xpLevel.level}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                      <Flame size={14} className="text-orange-400" />
                      <span className="text-xs text-gray-300">{streak} day streak</span>
                    </div>
                  </div>

                  {/* Bio */}
                  {skillsWithReviews?.[0]?.user_bio && (
                    <p className="max-w-2xl mx-auto md:mx-0 text-sm text-gray-400 leading-relaxed">
                      {skillsWithReviews[0].user_bio}
                    </p>
                  )}

                  {/* Member since */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 justify-center md:justify-start">
                    <Calendar size={12} />
                    Member since {new Date(profile.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col md:flex-row gap-3 shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                      isFollowing
                        ? "bg-white/10 border border-white/20 text-white"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                    }`}
                  >
                    {isFollowing ? <CheckCircle2 size={16} /> : <UserPlus size={16} />}
                    {isFollowing ? "Following" : "Follow"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2.5 rounded-xl glass-input text-sm font-medium flex items-center justify-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Share2 size={16} />
                    Share
                  </motion.button>
                </div>
              </div>

              {/* Profile completion bar */}
              <div className="mt-6 md:mt-8 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Target size={12} />
                    Profile Strength
                  </span>
                  <span className="text-cyan-400 font-semibold">{profileCompletion}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-800/50 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${profileCompletion}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* ============ STATS GRID ============ */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={<Trophy size={18} />}
              label="Exchanges"
              value={stats.successful_exchanges}
              color="from-yellow-400 to-orange-500"
              delay={0.1}
            />
            <StatCard
              icon={<XCircle size={18} />}
              label="Cancelled"
              value={stats.cancelled_exchanges}
              color="from-red-400 to-rose-500"
              delay={0.15}
            />
            <StatCard
              icon={<Star size={18} />}
              label="Rating"
              value={`${Number(stats.overall_rating || 0).toFixed(1)}`}
              color="from-cyan-400 to-blue-500"
              delay={0.2}
            />
            <StatCard
              icon={<MessageSquare size={18} />}
              label="Reviews"
              value={stats.total_reviews}
              color="from-purple-400 to-pink-500"
              delay={0.25}
            />
          </section>

          {/* ============ ACHIEVEMENTS & ACTIVITY ============ */}
          <section className="grid lg:grid-cols-3 gap-6">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 rounded-2xl glass-heavy p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award size={20} className="text-cyan-400" />
                  Achievements
                </h2>
                <span className="text-xs text-gray-500">
                  {MOCK_ACHIEVEMENTS.filter((a) => a.unlocked).length}/{MOCK_ACHIEVEMENTS.length} Unlocked
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {MOCK_ACHIEVEMENTS.map((achievement) => (
                  <AchievementBadge key={achievement.id} achievement={achievement} unlocked={achievement.unlocked} />
                ))}
              </div>
            </motion.div>

            {/* Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-2xl glass-heavy p-6"
            >
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-purple-400" />
                Recent Activity
              </h2>
              <div className="space-y-1 max-h-56 overflow-y-auto custom-scrollbar">
                {MOCK_ACTIVITY.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </motion.div>
          </section>

          {/* ============ XP PROGRESS ============ */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl glass p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Zap size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Experience Progress</h3>
                  <p className="text-xs text-gray-500">Level {xpLevel.level} • {xpLevel.xp}/{xpLevel.nextLevel} XP to Level {xpLevel.level + 1}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-400">{xpLevel.level}</p>
                <p className="text-[10px] text-gray-500 uppercase">Level</p>
              </div>
            </div>
            <div className="h-3 rounded-full bg-gray-800/50 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(xpLevel.xp / xpLevel.nextLevel) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"
              />
            </div>
          </motion.section>

          {/* ============ SKILLS & REVIEWS ============ */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent flex items-center gap-2">
                <Sparkles size={22} className="text-cyan-400" />
                Skills & Reviews
              </h2>
              <span className="text-sm text-gray-500">
                {skillsWithReviews?.length || 0} skills
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              {!Array.isArray(skillsWithReviews) || skillsWithReviews.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 glass rounded-2xl"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <BookOpen size={28} className="text-gray-600" />
                  </div>
                  <p className="text-gray-400 font-medium">No skills added yet</p>
                  <p className="text-gray-600 text-sm mt-1">Skills will appear here once added</p>
                </motion.div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {skillsWithReviews.map((skill, index) => (
                    <SkillCard
                      key={skill.skill_id}
                      skill={skill}
                      myMode={myMode}
                      navigate={(path: string) => router.push(path)}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </section>

          {/* ============ TRUST & REPUTATION ============ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-heavy rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                <Shield size={26} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Trusted Member</h3>
                <p className="text-sm text-gray-400">Verified identity and active contributor</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-cyan-400">98%</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Response Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">A+</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Trust Score</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">{stats.successful_exchanges}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Exchanges</p>
              </div>
            </div>
          </motion.section>

        </div>
      </div>

      {/* CSS for custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6,255,208,0.2); border-radius: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(6,255,208,0.4); }
      `}</style>
    </div>
  );
}

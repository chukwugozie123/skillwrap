import { motion, type HTMLMotionProps } from "framer-motion";
import {
  Layers,
  Inbox,
  Trophy,
  Sparkles,
  Plus,
  Crown,
  Star,
  Users,
  TrendingUp,
  Award,
  ChevronRight,
  Copy,
  Gift,
  Zap,
  Target,
  BookOpen,
  Mic,
  Video,
  Flame,
  Calendar,
  Clock,
  BarChart3,
  Play,
  Pause,
  Heart,
  MessageSquare,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import RecentActivity from "../components/RecentActivity";
import Achievements from "../components/Achievements";
import Image from "next/image";


// ============ ANIMATED COUNTER ============
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}

// ============ FLOATING ORB ============
function FloatingOrb({
  color,
  size,
  delay,
  duration,
  x,
  y,
}: {
  color: string;
  size: string;
  delay: number;
  duration: number;
  x: string;
  y: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-30 pointer-events-none"
      style={{
        background: color,
        width: size,
        height: size,
        left: x,
        top: y,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// ============ AMBIENT PARTICLE ============
function AmbientParticle({ delay, duration }: { delay: number; duration: number }) {
  const x = Math.random() * 100;
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        bottom: 0,
        background: "radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)",
      }}
      animate={{
        y: [0, -400],
        opacity: [0, 0.8, 0],
        scale: [0.5, 1.2, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}
// ============ GLOW CARD ============
interface GlowCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

function GlowCard({
  children,
  className = "",
  glowColor = "purple",
  ...props
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowColors: Record<string, string> = {
    purple: "rgba(168, 85, 247, 0.15)",
    pink: "rgba(236, 72, 153, 0.15)",
    fuchsia: "rgba(217, 70, 239, 0.15)",
    amber: "rgba(251, 191, 36, 0.15)",
    cyan: "rgba(6, 182, 212, 0.15)",
  };

  return (
    <motion.div
    
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...props}
    >
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(
              300px circle at ${mousePosition.x}px ${mousePosition.y}px,
              ${glowColors[glowColor] || glowColors.purple},
              transparent 70%
            )`,
          }}
        />
      )}

      {children}
    </motion.div>
  );
}

// ============ XP LEVEL DISPLAY ============
function XpLevelDisplay({ level, currentXp, xpToNext }: { level: number; currentXp: number; xpToNext: number }) {
  const progress = (currentXp / xpToNext) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative p-5 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/5 border border-violet-500/20 backdrop-blur-xl"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 blur-md opacity-50"
          />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center border-2 border-violet-400/40">
            <span className="text-2xl font-bold text-white">{level}</span>
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 p-1 rounded-full bg-amber-500"
          >
            <Crown size={10} className="text-white" />
          </motion.div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-violet-300">Level {level}</span>
            <span className="text-xs text-violet-400">{currentXp}/{xpToNext} XP</span>
          </div>
          <div className="h-2 rounded-full bg-slate-800/80 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 relative"
            >
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
          <p className="text-xs text-slate-500 mt-1">{xpToNext - currentXp} XP to next level</p>
        </div>
      </div>
    </motion.div>
  );
}

// ============ STREAK DISPLAY ============
function StreakDisplay({ streak }: { streak: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative p-5 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 backdrop-blur-xl"
    >
      <div className="flex items-center gap-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-orange-500/30 blur-lg" />
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
            <Flame className="text-white" size={28} />
          </div>
        </motion.div>

        <div>
          <p className="text-3xl font-bold text-white">{streak}</p>
          <p className="text-sm text-orange-400">Day Streak</p>
          <p className="text-xs text-slate-500 mt-1">Keep it going!</p>
        </div>
      </div>
    </motion.div>
  );
}

// ============ POINTS DISPLAY ============
function PointsDisplay({ points }: { points: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/20 backdrop-blur-xl"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full bg-amber-500/20 blur-lg"
          />
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
            <Star className="text-white fill-white" size={28} />
          </div>
        </div>

        <div>
          <p className="text-3xl font-bold text-white"><AnimatedCounter value={points} /></p>
          <p className="text-sm text-amber-400">Points Earned</p>
        </div>
      </div>
    </motion.div>
  );
}

// ============ STAT CARD ============
function PremiumStatCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
}: {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
  color: string;
}) {
  const colorVariants: Record<string, { bg: string; border: string; iconBg: string }> = {
    purple: {
      bg: "from-purple-500/10 to-fuchsia-500/5",
      border: "border-purple-500/20",
      iconBg: "from-purple-500/20 to-fuchsia-500/20",
    },
    pink: {
      bg: "from-pink-500/10 to-rose-500/5",
      border: "border-pink-500/20",
      iconBg: "from-pink-500/20 to-rose-500/20",
    },
    fuchsia: {
      bg: "from-fuchsia-500/10 to-purple-500/5",
      border: "border-fuchsia-500/20",
      iconBg: "from-fuchsia-500/20 to-purple-500/20",
    },
    amber: {
      bg: "from-amber-500/10 to-yellow-500/5",
      border: "border-amber-500/20",
      iconBg: "from-amber-500/20 to-yellow-500/20",
    },
    cyan: {
      bg: "from-cyan-500/10 to-blue-500/5",
      border: "border-cyan-500/20",
      iconBg: "from-cyan-500/20 to-blue-500/20",
    },
  };

  const variant = colorVariants[color] || colorVariants.purple;

  return (
    <GlowCard glowColor={color}>
      <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${variant.bg} border ${variant.border} backdrop-blur-xl overflow-hidden`}>
        <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-shimmer" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${variant.iconBg} border border-white/10`}>
              <Icon size={20} className={`text-${color}-400`} style={{ color: color === 'amber' ? '#f59e0b' : color === 'cyan' ? '#22d3ee' : color === 'pink' ? '#ec4899' : color === 'fuchsia' ? '#d946ef' : '#a855f7' }} />
            </div>
            {trend && (
              <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                <TrendingUp size={12} />
                <span>+{trend}%</span>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">
            <AnimatedCounter value={value} />
          </p>
        </div>
      </div>
    </GlowCard>
  );
}

// ============ PROGRESS RING ============
function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 6,
  color = "purple",
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const colorMap: Record<string, string> = {
    purple: "#a855f7",
    pink: "#ec4899",
    fuchsia: "#d946ef",
    amber: "#f59e0b",
    cyan: "#22d3ee",
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colorMap[color] || colorMap.purple}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-white">{progress}%</span>
      </div>
    </div>
  );
}

// ============ FEATURE CARD ============
function PremiumFeatureCard({
  icon: Icon,
  title,
  desc,
  href,
  onNavigate,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
  onNavigate?: (page: string) => void;
}) {
  const router = useRouter();
  
  return (
    <GlowCard className="h-full cursor-pointer"   onClick={() =>
    onNavigate
      ? onNavigate(href)
      : router.push?.(href.replace("/", ""))
  }>
      <motion.div
        className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden group"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/20 w-fit mb-4 text-purple-400">
            <Icon size={24} />
          </div>

          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-400 mb-4">{desc}</p>

          <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
            <span>Manage</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </GlowCard>
  );
}

// ============ IMPACT METRIC ============
function ImpactMetric({ icon: Icon, value, label }: { icon: LucideIcon; value: string | number; label: string }) {
  return (
    <motion.div
      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-lg font-bold text-white">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </motion.div>
  );
}

// ============ REPUTATION BADGE ============
function ReputationBadge({ level, title }: { level: number; title?: string }) {
  const badges = [
    { min: 0, color: "from-gray-500 to-gray-600", label: "Beginner" },
    { min: 10, color: "from-green-500 to-emerald-600", label: "Rising" },
    { min: 50, color: "from-blue-500 to-cyan-600", label: "Skilled" },
    { min: 100, color: "from-purple-500 to-fuchsia-600", label: "Expert" },
    { min: 500, color: "from-amber-500 to-yellow-600", label: "Master" },
  ];

  const badge = badges.reverse().find((b) => level >= b.min) || badges[0];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${badge.color}`}>
      <Crown size={14} className="text-white" />
      <span className="text-xs font-semibold text-white">{title || badge.label} Mentor</span>
    </div>
  );
}

// ============ QUICK TOOL CARD ============
function QuickToolCard({
  icon: Icon,
  title,
  desc,
  color,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: "purple" | "fuchsia" | "pink";
  onClick?: () => void;
}) {
  const colors = {
    purple: {
      bg: "from-purple-500/10 to-fuchsia-500/10",
      border: "border-purple-500/20",
      iconBg: "bg-purple-500/20",
      text: "text-purple-400",
      hover: "hover:border-purple-500/40",
    },
    fuchsia: {
      bg: "from-fuchsia-500/10 to-pink-500/10",
      border: "border-fuchsia-500/20",
      iconBg: "bg-fuchsia-500/20",
      text: "text-fuchsia-400",
      hover: "hover:border-fuchsia-500/40",
    },
    pink: {
      bg: "from-pink-500/10 to-rose-500/10",
      border: "border-pink-500/20",
      iconBg: "bg-pink-500/20",
      text: "text-pink-400",
      hover: "hover:border-pink-500/40",
    },
  };

  const c = colors[color];

  return (
    <motion.div
      onClick={onClick}
      className={`p-4 rounded-xl bg-gradient-to-br ${c.bg} border ${c.border} cursor-pointer ${c.hover} transition-colors`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`p-2 rounded-lg ${c.iconBg} ${c.text} w-fit mb-3`}>
        <Icon size={20} />
      </div>
      <h4 className="text-white font-medium mb-1">{title}</h4>
      <p className="text-xs text-gray-400">{desc}</p>
    </motion.div>
  );
}

// ============ MAIN COMPONENT ============
interface TeachingDashboardProps {
  stats?: {
    createdSkills?: number;
    receivedRequests?: number;
    succesfullExchnage?: number;
    level?: number;
    currentXp?: number;
    xpToNext?: number;
    streak?: number;
    points?: number;
  };
  user?: {
    id?: number;
    username?: string;
    email?: string;
    img_url?: string;
    points?: number;
        level?: number;
    currentXp?: number;
    xpToNext?: number;
    streak?: number;
    xp?: number;
    referral_code?: string;
    created_at?: string;
  };
  onNavigate?: (page: string) => void;
}

export default function TeachingDashboard({ stats, user, onNavigate }: TeachingDashboardProps) {
  const [copied, setCopied] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [numberAchievements, setNumberAchievements] = useState(0);

  const API_URL = "https://skillwrap-backend.onrender.com";

  const router = useRouter();

  useEffect(() => {
  // Fetch activities
  fetch(`${API_URL}/activity/get`, { credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      setActivities(data);
      setLoadingActivities(false);
    })
    .catch(() => setLoadingActivities(false));

  // Fetch achievements
  fetch(`${API_URL}/achievements/achievement/user`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      const achievements = data.achievements || [];
      const numberAchievements = achievements.length;

      console.log(numberAchievements);

      setAchievements(achievements);
       setNumberAchievements(achievements.length);
    })
    .catch(console.log);
}, []);
  // after fetch d achivemtn make  a variBLE AND find d  number of achivements d user have and then store in a variabl enme number achivements u grab u..

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(
      `https://skillwrap2026.vercel.app/signup?ref=${user?.referral_code}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Default values
  const level = user?.level || 1;
  const currentXp = user?.xp || 0;
  const xpToNext = stats?.xpToNext || 300;
  const streak = user?.streak || 0;
  const points = user?.points || 0;

  return (
    <motion.div
      className="relative min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ============ FLOATING ORBS ============ */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingOrb
          color="linear-gradient(135deg, #a855f7, #ec4899)"
          size="400px"
          delay={0}
          duration={8}
          x="10%"
          y="20%"
        />
        <FloatingOrb
          color="linear-gradient(135deg, #d946ef, #8b5cf6)"
          size="300px"
          delay={2}
          duration={10}
          x="70%"
          y="60%"
        />
        <FloatingOrb
          color="linear-gradient(135deg, #ec4899, #f43f5e)"
          size="250px"
          delay={4}
          duration={12}
          x="80%"
          y="10%"
        />
      </div>

      {/* ============ AMBIENT PARTICLES ============ */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <AmbientParticle key={i} delay={i * 0.5} duration={8 + i * 0.5} />
        ))}
      </div>

      {/* ============ HERO SECTION ============ */}
      <motion.div variants={itemVariants} className="relative mb-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 border border-purple-500/20 p-8 md:p-10">
          {/* Animated mesh */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
          </div>

          {/* Glow effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Crown size={16} />
              Teaching Mode Active
            </motion.div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Your Teaching </span>
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Impact
              </span>
            </h1>

            <p className="text-gray-400 text-lg max-w-2xl mb-8">
              Share your expertise, mentor learners, and make a lasting impact. Every lesson you teach builds trust and credibility.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6">
              <ImpactMetric icon={Users} value={stats?.succesfullExchnage || 24} label="Students Taught" />
              <ImpactMetric icon={Star} value="4.9" label="Avg Rating" />
              <ImpactMetric icon={Award} value={numberAchievements} label="Achievements" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============ XP, STREAK, POINTS ROW ============ */}
      <motion.div variants={itemVariants} className="grid sm:grid-cols-3 gap-4 mb-10">
        <XpLevelDisplay level={level} currentXp={currentXp} xpToNext={xpToNext} />
        <StreakDisplay streak={streak} />
        <PointsDisplay points={points} />
      </motion.div>

      {/* ============ PROFILE CARD ============ */}
      <motion.div variants={itemVariants} className="mb-10">
        <GlowCard>
          <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 blur-lg opacity-50" />
                  <Image
                    src={user?.img_url || "/default-avatar.png"}
                    alt="avatar"
                    width={80}
                    height={80}
                    className="relative w-24 h-24 rounded-full border-2 border-purple-400/40 object-cover"
                  />
                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-purple-500 border-2 border-[#0a0a0f]">
                  <Crown size={12} className="text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-white">{user?.username || "Teacher"}</h2>
                  <ReputationBadge level={stats?.succesfullExchnage || 0} title="" />
                </div>
                <p className="text-gray-400 mb-1">{user?.email}</p>
                <p className="text-sm text-gray-500">
                  Joined {new Date(user?.created_at || Date.now()).toDateString()}
                </p>

                {/* Points */}
                <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-yellow-500/20">
                  <Star className="text-yellow-400" size={18} />
                  <span className="text-yellow-400 font-bold text-lg">{user?.points ?? 0}</span>
                  <span className="text-yellow-400/70 text-sm">Points</span>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                onClick={() => router.push("create-skill")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={18} />
                Create Skill
              </motion.button>
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* ============ INSIGHT CARD ============ */}
      <motion.div variants={itemVariants} className="mb-10">
        <div className="relative p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20 backdrop-blur-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />

          <div className="relative z-10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Teaching impact</h3>
              <p className="text-gray-400">
                Every lesson you teach builds trust, visibility, and long-term credibility on Skillwrap.
                Keep sharing your expertise to grow your reputation.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============ STATS GRID ============ */}
      <motion.div variants={itemVariants} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <PremiumStatCard
          title="Skills Created"
          value={stats?.createdSkills || 0}
          icon={Layers}
          trend={15}
          color="purple"
        />
        <PremiumStatCard
          title="Requests Received"
          value={stats?.receivedRequests || 0}
          icon={Inbox}
          trend={23}
          color="pink"
        />
        <PremiumStatCard
          title="Successful Teachings"
          value={stats?.succesfullExchnage || 0}
          icon={Trophy}
          trend={12}
          color="amber"
        />
      </motion.div>

      {/* ============ TEACHING TOOLS ============ */}
      <motion.div variants={itemVariants} className="mb-10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="text-purple-400" size={20} />
          Quick Teaching Tools
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <QuickToolCard
            icon={Video}
            title="Record Lesson"
            desc="Create video content"
            color="purple"
          />
          <QuickToolCard
            icon={Mic}
            title="Voice Notes"
            desc="Quick audio tips"
            color="fuchsia"
          />
          <QuickToolCard
            icon={BookOpen}
            title="Write Guide"
            desc="Share written content"
            color="pink"
          />
        </div>
      </motion.div>

      {/* ============ REFERRAL SECTION ============ */}
      <motion.div variants={itemVariants} className="mb-10">
        <GlowCard>
          <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-2xl" />

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/20 mb-4">
                <Gift className="text-purple-400" size={28} />
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Invite Friends & Earn Points</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Share your referral link and earn rewards when someone signs up!
              </p>

              <div className="flex flex-col sm:flex-row items-stretch gap-3 max-w-lg mx-auto">
                <input
                  type="text"
                  readOnly
                  value={`https://skillwrap2026.vercel.app/signup?ref=${user?.referral_code}`}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
                />
                <motion.button
                  onClick={handleCopyReferral}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Copy size={18} />
                  {copied ? "Copied!" : "Copy"}
                </motion.button>
              </div>
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* ============ ACTIONS SECTION ============ */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-white mb-2">Manage your teaching activities</h2>
        <p className="text-gray-400 mb-6 max-w-xl">
          Keep your skills updated, respond to learners, and grow your reputation as a trusted mentor.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <PremiumFeatureCard
            icon={Layers}
            title="Manage Your Skills"
            desc="Create, update, and refine the skills you offer to learners."
            href="/my-skill"
            // onNavigate={onNavigate}
            onNavigate={router.push}
          />
          <PremiumFeatureCard
            icon={Inbox}
            title="Student Requests"
            desc="Review, accept, or decline learning requests from students."
            href="/request-recieved"
            onNavigate={onNavigate}
          />
        </div>
      </motion.div>

      {/* ============ ACTIVITY & ACHIEVEMENTS ============ */}
      <motion.div variants={itemVariants} className="mt-10 mb-10">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3 order-2 xl:order-1">
            <RecentActivity activities={activities} loading={loadingActivities} />
          </div>
          <div className="xl:col-span-2 order-1 xl:order-2">
            <Achievements achievements={achievements} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}









// import { motion, AnimatePresence, HTMLMotionProps, } from "framer-motion";
// import {
//   Layers,
//   Inbox,
//   Trophy,
//   Sparkles,
//   Plus,
//   Crown,
//   Star,
//   Users,
//   TrendingUp,
//   Award,
//   ChevronRight,
//   Copy,
//   Gift,
//   Zap,
//   Target,
//   BookOpen,
//   Mic,
//   Video,
//   Flame,
//   Calendar,
//   Clock,
//   BarChart3,
//   Play,
//   Pause,
//   Heart,
//   MessageSquare,
//   CheckCircle2,
//   LucideIcon,
// } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import RecentActivity from "../components/RecentActivity";
// import Achievements from "../components/Achievements";
// interface GlowCardProps {
//   children: React.ReactNode;
//   className?: string;
//   glowColor?: string;
//   onClick?: React.MouseEventHandler<HTMLDivElement>;
// }

// // ============ ANIMATED COUNTER ============
// function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const end = value;
//     if (start === end) return;

//     const increment = end / (duration * 60);
//     const timer = setInterval(() => {
//       start += increment;
//       if (start >= end) {
//         setCount(end);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, 1000 / 60);

//     return () => clearInterval(timer);
//   }, [value, duration]);

//   return <span>{count}</span>;
// }

// // ============ FLOATING ORB ============
// function FloatingOrb({
//   color,
//   size,
//   delay,
//   duration,
//   x,
//   y,
// }: {
//   color: string;
//   size: string;
//   delay: number;
//   duration: number;
//   x: string;
//   y: string;
// }) {
//   return (
//     <motion.div
//       className="absolute rounded-full blur-3xl opacity-30 pointer-events-none"
//       style={{
//         background: color,
//         width: size,
//         height: size,
//         left: x,
//         top: y,
//       }}
//       animate={{
//         y: [0, -30, 0],
//         x: [0, 20, 0],
//         scale: [1, 1.1, 1],
//       }}
//       transition={{
//         duration,
//         delay,
//         repeat: Infinity,
//         ease: "easeInOut",
//       }}
//     />
//   );
// }

// // ============ AMBIENT PARTICLE ============
// function AmbientParticle({ delay, duration }: { delay: number; duration: number }) {
//   const x = Math.random() * 100;
//   return (
//     <motion.div
//       className="absolute w-1 h-1 rounded-full pointer-events-none"
//       style={{
//         left: `${x}%`,
//         bottom: 0,
//         background: "radial-gradient(circle, rgba(168,85,247,0.6) 0%, transparent 70%)",
//       }}
//       animate={{
//         y: [0, -400],
//         opacity: [0, 0.8, 0],
//         scale: [0.5, 1.2, 0.5],
//       }}
//       transition={{
//         duration,
//         delay,
//         repeat: Infinity,
//         ease: "easeOut",
//       }}
//     />
//   );
// }


// // ============ GLOW CARD ============
// interface GlowCardProps extends HTMLMotionProps<"div"> {
//   children: React.ReactNode;
//   glowColor?: string;
// }

// function GlowCard({
//   children,
//   className = "",
//   glowColor = "purple",
//   onClick,
//   ...props
// }: GlowCardProps) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!ref.current) return;

//     const rect = ref.current.getBoundingClientRect();

//     setMousePosition({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     });
//   };

//   const glowColors = {
//     purple: "rgba(168,85,247,0.15)",
//     pink: "rgba(236,72,153,0.15)",
//     fuchsia: "rgba(217,70,239,0.15)",
//     amber: "rgba(251,191,36,0.15)",
//     cyan: "rgba(6,182,212,0.15)",
//   };

//   return (
//     <motion.div
//       ref={ref}
//       {...props}
//       onClick={onClick}
//       className={`relative overflow-hidden ${className}`}
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       whileHover={{ y: -4, scale: 1.01 }}
//       transition={{ type: "spring", stiffness: 400, damping: 25 }}
//     >
//       {isHovered && (
//         <motion.div
//           className="absolute inset-0 pointer-events-none"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           style={{
//             background: `radial-gradient(
//               300px circle at ${mousePosition.x}px ${mousePosition.y}px,
//               ${glowColors[glowColor as keyof typeof glowColors] ?? glowColors.purple}
//               transparent 70%
//             )`,
//           }}
//         />
//       )}

//       {children}
//     </motion.div>
//   );
// }

// // function GlowCard({
// //   children,
// //   className = "",
// //   glowColor = "purple",
// // }: {
// //   children: React.ReactNode;
// //   className?: string;
// //   glowColor?: string;
// // }) {
// //   const ref = useRef<HTMLDivElement>(null);
// //   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
// //   const [isHovered, setIsHovered] = useState(false);

// //   const handleMouseMove = (e: React.MouseEvent) => {
// //     if (!ref.current) return;
// //     const rect = ref.current.getBoundingClientRect();
// //     setMousePosition({
// //       x: e.clientX - rect.left,
// //       y: e.clientY - rect.top,
// //     });
// //   };

// //   const glowColors: Record<string, string> = {
// //     purple: "rgba(168, 85, 247, 0.15)",
// //     pink: "rgba(236, 72, 153, 0.15)",
// //     fuchsia: "rgba(217, 70, 239, 0.15)",
// //     amber: "rgba(251, 191, 36, 0.15)",
// //     cyan: "rgba(6, 182, 212, 0.15)",
// //   };

// //   return (
// //     <motion.div
// //       ref={ref}
// //       className={`relative overflow-hidden ${className}`}
// //       onMouseMove={handleMouseMove}
// //       onMouseEnter={() => setIsHovered(true)}
// //       onMouseLeave={() => setIsHovered(false)}
// //       whileHover={{ y: -4, scale: 1.01 }}
// //       transition={{ type: "spring", stiffness: 400, damping: 25 }}
// //     >
// //       {isHovered && (
// //         <motion.div
// //           className="absolute inset-0 pointer-events-none"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           exit={{ opacity: 0 }}
// //           style={{
// //             background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor] || glowColors.purple}, transparent 70%)`,
// //           }}
// //         />
// //       )}
// //       {children}
// //     </motion.div>
// //   );
// // }

// // ============ XP LEVEL DISPLAY ============
// function XpLevelDisplay({ level, currentXp, xpToNext }: { level: number; currentXp: number; xpToNext: number }) {
//   const progress = (currentXp / xpToNext) * 100;

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className="relative p-5 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/5 border border-violet-500/20 backdrop-blur-xl"
//     >
//       <div className="flex items-center gap-4">
//         <div className="relative">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//             className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 blur-md opacity-50"
//           />
//           <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center border-2 border-violet-400/40">
//             <span className="text-2xl font-bold text-white">{level}</span>
//           </div>
//           <motion.div
//             animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
//             transition={{ duration: 2, repeat: Infinity }}
//             className="absolute -top-1 -right-1 p-1 rounded-full bg-amber-500"
//           >
//             <Crown size={10} className="text-white" />
//           </motion.div>
//         </div>

//         <div className="flex-1">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-semibold text-violet-300">Level {level}</span>
//             <span className="text-xs text-violet-400">{currentXp}/{xpToNext} XP</span>
//           </div>
//           <div className="h-2 rounded-full bg-slate-800/80 overflow-hidden">
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: `${progress}%` }}
//               transition={{ duration: 1.5, ease: "easeOut" }}
//               className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 relative"
//             >
//               <motion.div
//                 animate={{ x: ["-100%", "200%"] }}
//                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//               />
//             </motion.div>
//           </div>
//           <p className="text-xs text-slate-500 mt-1">{xpToNext - currentXp} XP to next level</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // ============ STREAK DISPLAY ============
// function StreakDisplay({ streak }: { streak: number }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.2 }}
//       className="relative p-5 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 backdrop-blur-xl"
//     >
//       <div className="flex items-center gap-4">
//         <motion.div
//           animate={{ scale: [1, 1.1, 1] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="relative"
//         >
//           <div className="absolute inset-0 rounded-full bg-orange-500/30 blur-lg" />
//           <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
//             <Flame className="text-white" size={28} />
//           </div>
//         </motion.div>

//         <div>
//           <p className="text-3xl font-bold text-white">{streak}</p>
//           <p className="text-sm text-orange-400">Day Streak</p>
//           <p className="text-xs text-slate-500 mt-1">Keep it going!</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // ============ POINTS DISPLAY ============
// function PointsDisplay({ points }: { points: number }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.3 }}
//       className="relative p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/20 backdrop-blur-xl"
//     >
//       <div className="flex items-center gap-4">
//         <div className="relative">
//           <motion.div
//             animate={{ rotate: [0, 360] }}
//             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//             className="absolute inset-0 rounded-full bg-amber-500/20 blur-lg"
//           />
//           <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
//             <Star className="text-white fill-white" size={28} />
//           </div>
//         </div>

//         <div>
//           <p className="text-3xl font-bold text-white"><AnimatedCounter value={points} /></p>
//           <p className="text-sm text-amber-400">Points Earned</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // ============ STAT CARD ============
// function PremiumStatCard({
//   title,
//   value,
//   icon: Icon,
//   trend,
//   color,
// }: {
//   title: string;
//   value: number;
//   icon: LucideIcon;
//   trend?: number;
//   color: string;
// }) {
//   const colorVariants: Record<string, { bg: string; border: string; iconBg: string }> = {
//     purple: {
//       bg: "from-purple-500/10 to-fuchsia-500/5",
//       border: "border-purple-500/20",
//       iconBg: "from-purple-500/20 to-fuchsia-500/20",
//     },
//     pink: {
//       bg: "from-pink-500/10 to-rose-500/5",
//       border: "border-pink-500/20",
//       iconBg: "from-pink-500/20 to-rose-500/20",
//     },
//     fuchsia: {
//       bg: "from-fuchsia-500/10 to-purple-500/5",
//       border: "border-fuchsia-500/20",
//       iconBg: "from-fuchsia-500/20 to-purple-500/20",
//     },
//     amber: {
//       bg: "from-amber-500/10 to-yellow-500/5",
//       border: "border-amber-500/20",
//       iconBg: "from-amber-500/20 to-yellow-500/20",
//     },
//     cyan: {
//       bg: "from-cyan-500/10 to-blue-500/5",
//       border: "border-cyan-500/20",
//       iconBg: "from-cyan-500/20 to-blue-500/20",
//     },
//   };

//   const variant = colorVariants[color] || colorVariants.purple;

//   return (
//     <GlowCard glowColor={color}>
//       <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${variant.bg} border ${variant.border} backdrop-blur-xl overflow-hidden`}>
//         <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500">
//           <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-shimmer" />
//         </div>

//         <div className="relative z-10">
//           <div className="flex items-start justify-between mb-4">
//             <div className={`p-3 rounded-xl bg-gradient-to-br ${variant.iconBg} border border-white/10`}>
//               <Icon size={20} className={`text-${color}-400`} style={{ color: color === 'amber' ? '#f59e0b' : color === 'cyan' ? '#22d3ee' : color === 'pink' ? '#ec4899' : color === 'fuchsia' ? '#d946ef' : '#a855f7' }} />
//             </div>
//             {trend && (
//               <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
//                 <TrendingUp size={12} />
//                 <span>+{trend}%</span>
//               </div>
//             )}
//           </div>

//           <p className="text-sm text-gray-400 mb-1">{title}</p>
//           <p className="text-3xl font-bold text-white">
//             <AnimatedCounter value={value} />
//           </p>
//         </div>
//       </div>
//     </GlowCard>
//   );
// }

// // ============ PROGRESS RING ============
// function ProgressRing({
//   progress,
//   size = 80,
//   strokeWidth = 6,
//   color = "purple",
// }: {
//   progress: number;
//   size?: number;
//   strokeWidth?: number;
//   color?: string;
// }) {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = radius * 2 * Math.PI;
//   const offset = circumference - (progress / 100) * circumference;

//   const colorMap: Record<string, string> = {
//     purple: "#a855f7",
//     pink: "#ec4899",
//     fuchsia: "#d946ef",
//     amber: "#f59e0b",
//     cyan: "#22d3ee",
//   };

//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg className="transform -rotate-90" width={size} height={size}>
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           stroke="rgba(255,255,255,0.1)"
//           strokeWidth={strokeWidth}
//           fill="none"
//         />
//         <motion.circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           stroke={colorMap[color] || colorMap.purple}
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeLinecap="round"
//           initial={{ strokeDashoffset: circumference }}
//           animate={{ strokeDashoffset: offset }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           style={{ strokeDasharray: circumference }}
//         />
//       </svg>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <span className="text-lg font-bold text-white">{progress}%</span>
//       </div>
//     </div>
//   );
// }

// // ============ FEATURE CARD ============
// function PremiumFeatureCard({
//   icon: Icon,
//   title,
//   desc,
//   href,
//   onNavigate,
// }: {
//   icon: LucideIcon;
//   title: string;
//   desc: string;
//   href: string;
//   onNavigate?: (page: string) => void;
// }) {
//   return (
//     <GlowCard className="h-full cursor-pointer" onClick={() => onNavigate?.(href.replace("/", ""))}>
//       <motion.div
//         className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden group"
//         whileHover={{ scale: 1.02 }}
//         transition={{ type: "spring", stiffness: 400, damping: 25 }}
//       >
//         <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//         <div className="relative z-10">
//           <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/20 w-fit mb-4 text-purple-400">
//             <Icon size={24} />
//           </div>

//           <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
//             {title}
//           </h3>
//           <p className="text-sm text-gray-400 mb-4">{desc}</p>

//           <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
//             <span>Manage</span>
//             <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
//           </div>
//         </div>
//       </motion.div>
//     </GlowCard>
//   );
// }

// // ============ IMPACT METRIC ============
// function ImpactMetric({ icon: Icon, value, label }: { icon: LucideIcon; value: string | number; label: string }) {
//   return (
//     <motion.div
//       className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
//       whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
//     >
//       <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
//         <Icon size={18} />
//       </div>
//       <div>
//         <p className="text-lg font-bold text-white">{value}</p>
//         <p className="text-xs text-gray-400">{label}</p>
//       </div>
//     </motion.div>
//   );
// }

// // ============ REPUTATION BADGE ============
// function ReputationBadge({ level, title }: { level: number; title?: string }) {
//   const badges = [
//     { min: 0, color: "from-gray-500 to-gray-600", label: "Beginner" },
//     { min: 10, color: "from-green-500 to-emerald-600", label: "Rising" },
//     { min: 50, color: "from-blue-500 to-cyan-600", label: "Skilled" },
//     { min: 100, color: "from-purple-500 to-fuchsia-600", label: "Expert" },
//     { min: 500, color: "from-amber-500 to-yellow-600", label: "Master" },
//   ];

//   const badge = badges.reverse().find((b) => level >= b.min) || badges[0];

//   return (
//     <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${badge.color}`}>
//       <Crown size={14} className="text-white" />
//       <span className="text-xs font-semibold text-white">{title || badge.label} Mentor</span>
//     </div>
//   );
// }

// // ============ QUICK TOOL CARD ============
// function QuickToolCard({
//   icon: Icon,
//   title,
//   desc,
//   color,
//   onClick,
// }: {
//   icon: LucideIcon;
//   title: string;
//   desc: string;
//   color: "purple" | "fuchsia" | "pink";
//   onClick?: () => void;
// }) {
//   const colors = {
//     purple: {
//       bg: "from-purple-500/10 to-fuchsia-500/10",
//       border: "border-purple-500/20",
//       iconBg: "bg-purple-500/20",
//       text: "text-purple-400",
//       hover: "hover:border-purple-500/40",
//     },
//     fuchsia: {
//       bg: "from-fuchsia-500/10 to-pink-500/10",
//       border: "border-fuchsia-500/20",
//       iconBg: "bg-fuchsia-500/20",
//       text: "text-fuchsia-400",
//       hover: "hover:border-fuchsia-500/40",
//     },
//     pink: {
//       bg: "from-pink-500/10 to-rose-500/10",
//       border: "border-pink-500/20",
//       iconBg: "bg-pink-500/20",
//       text: "text-pink-400",
//       hover: "hover:border-pink-500/40",
//     },
//   };

//   const c = colors[color];

//   return (
//     <motion.div
//       onClick={onClick}
//       className={`p-4 rounded-xl bg-gradient-to-br ${c.bg} border ${c.border} cursor-pointer ${c.hover} transition-colors`}
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//     >
//       <div className={`p-2 rounded-lg ${c.iconBg} ${c.text} w-fit mb-3`}>
//         <Icon size={20} />
//       </div>
//       <h4 className="text-white font-medium mb-1">{title}</h4>
//       <p className="text-xs text-gray-400">{desc}</p>
//     </motion.div>
//   );
// }

// // ============ MAIN COMPONENT ============
// interface TeachingDashboardProps {
//   stats?: {
//     createdSkills?: number;
//     receivedRequests?: number;
//     succesfullExchnage?: number;
//     level?: number;
//     currentXp?: number;
//     xpToNext?: number;
//     streak?: number;
//     points?: number;
//   };
//   user?: {
//     id?: number;
//     username?: string;
//     email?: string;
//     img_url?: string;
//     points?: number;
//     referral_code?: string;
//     created_at?: string;
//   };
//   onNavigate?: (page: string) => void;
// }

// export default function TeachingDashboard({ stats, user, onNavigate }: TeachingDashboardProps) {
//   const [copied, setCopied] = useState(false);
//   const [activities, setActivities] = useState<any[]>([]);
//   const [achievements, setAchievements] = useState<any[]>([]);
//   const [loadingActivities, setLoadingActivities] = useState(true);

//   useEffect(() => {
//     // Fetch activities
//     fetch("http://localhost:4000/activity/recent", { credentials: "include" })
//       .then((res) => res.json())
//       .then((data) => {
//         setActivities(data.activities || []);
//         setLoadingActivities(false);
//       })
//       .catch(() => setLoadingActivities(false));

//     // Fetch achievements
//     fetch("http://localhost:4000/achievements/user", { credentials: "include" })
//       .then((res) => res.json())
//       .then((data) => {
//         setAchievements(data.achievements || []);
//       })
//       .catch(console.log);
//   }, []);

//   const handleCopyReferral = () => {
//     navigator.clipboard.writeText(
//       `https://skillwrap2026.vercel.app/signup?ref=${user?.referral_code}`
//     );
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   // Default values
//   const level = stats?.level || 5;
//   const currentXp = stats?.currentXp || 750;
//   const xpToNext = stats?.xpToNext || 1000;
//   const streak = stats?.streak || 12;
//   const points = user?.points || stats?.points || 2450;

//   return (
//     <motion.div
//       className="relative min-h-screen"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* ============ FLOATING ORBS ============ */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <FloatingOrb
//           color="linear-gradient(135deg, #a855f7, #ec4899)"
//           size="400px"
//           delay={0}
//           duration={8}
//           x="10%"
//           y="20%"
//         />
//         <FloatingOrb
//           color="linear-gradient(135deg, #d946ef, #8b5cf6)"
//           size="300px"
//           delay={2}
//           duration={10}
//           x="70%"
//           y="60%"
//         />
//         <FloatingOrb
//           color="linear-gradient(135deg, #ec4899, #f43f5e)"
//           size="250px"
//           delay={4}
//           duration={12}
//           x="80%"
//           y="10%"
//         />
//       </div>

//       {/* ============ AMBIENT PARTICLES ============ */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         {[...Array(12)].map((_, i) => (
//           <AmbientParticle key={i} delay={i * 0.5} duration={8 + i * 0.5} />
//         ))}
//       </div>

//       {/* ============ HERO SECTION ============ */}
//       <motion.div variants={itemVariants} className="relative mb-10">
//         <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 border border-purple-500/20 p-8 md:p-10">
//           {/* Animated mesh */}
//           <div className="absolute inset-0 opacity-30">
//             <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
//           </div>

//           {/* Glow effects */}
//           <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl" />

//           <div className="relative z-10">
//             <motion.div
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               <Crown size={16} />
//               Teaching Mode Active
//             </motion.div>

//             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
//               <span className="text-white">Your Teaching </span>
//               <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
//                 Impact
//               </span>
//             </h1>

//             <p className="text-gray-400 text-lg max-w-2xl mb-8">
//               Share your expertise, mentor learners, and make a lasting impact. Every lesson you teach builds trust and credibility.
//             </p>

//             {/* Quick stats */}
//             <div className="flex flex-wrap gap-6">
//               <ImpactMetric icon={Users} value={stats?.succesfullExchnage || 24} label="Students Taught" />
//               <ImpactMetric icon={Star} value="4.9" label="Avg Rating" />
//               <ImpactMetric icon={Award} value={8} label="Achievements" />
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* ============ XP, STREAK, POINTS ROW ============ */}
//       <motion.div variants={itemVariants} className="grid sm:grid-cols-3 gap-4 mb-10">
//         <XpLevelDisplay level={level} currentXp={currentXp} xpToNext={xpToNext} />
//         <StreakDisplay streak={streak} />
//         <PointsDisplay points={points} />
//       </motion.div>

//       {/* ============ PROFILE CARD ============ */}
//       <motion.div variants={itemVariants} className="mb-10">
//         <GlowCard>
//           <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden">
//             <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

//             <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
//               {/* Avatar */}
//               <div className="relative">
//                 <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 blur-lg opacity-50" />
//                 <img
//                   src={user?.img_url || "/avatar.png"}
//                   alt="Profile"
//                   className="relative w-24 h-24 rounded-full border-2 border-purple-400/40 object-cover"
//                 />
//                 <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-purple-500 border-2 border-[#0a0a0f]">
//                   <Crown size={12} className="text-white" />
//                 </div>
//               </div>

//               {/* Info */}
//               <div className="flex-1">
//                 <div className="flex flex-wrap items-center gap-3 mb-2">
//                   <h2 className="text-2xl font-bold text-white">{user?.username || "Teacher"}</h2>
//                   <ReputationBadge level={stats?.succesfullExchnage || 0} title="" />
//                 </div>
//                 <p className="text-gray-400 mb-1">{user?.email}</p>
//                 <p className="text-sm text-gray-500">
//                   Joined {new Date(user?.created_at || Date.now()).toDateString()}
//                 </p>

//                 {/* Points */}
//                 <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-yellow-500/20">
//                   <Star className="text-yellow-400" size={18} />
//                   <span className="text-yellow-400 font-bold text-lg">{user?.points ?? 0}</span>
//                   <span className="text-yellow-400/70 text-sm">Points</span>
//                 </div>
//               </div>

//               {/* CTA */}
//               <motion.button
//                 onClick={() => onNavigate?.("create-skill")}
//                 className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <Plus size={18} />
//                 Create Skill
//               </motion.button>
//             </div>
//           </div>
//         </GlowCard>
//       </motion.div>

//       {/* ============ INSIGHT CARD ============ */}
//       <motion.div variants={itemVariants} className="mb-10">
//         <div className="relative p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20 backdrop-blur-xl overflow-hidden">
//           <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />

//           <div className="relative z-10 flex items-start gap-4">
//             <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
//               <Sparkles size={24} />
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold text-white mb-2">Teaching impact</h3>
//               <p className="text-gray-400">
//                 Every lesson you teach builds trust, visibility, and long-term credibility on Skillwrap.
//                 Keep sharing your expertise to grow your reputation.
//               </p>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* ============ STATS GRID ============ */}
//       <motion.div variants={itemVariants} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//         <PremiumStatCard
//           title="Skills Created"
//           value={stats?.createdSkills || 0}
//           icon={Layers}
//           trend={15}
//           color="purple"
//         />
//         <PremiumStatCard
//           title="Requests Received"
//           value={stats?.receivedRequests || 0}
//           icon={Inbox}
//           trend={23}
//           color="pink"
//         />
//         <PremiumStatCard
//           title="Successful Teachings"
//           value={stats?.succesfullExchnage || 0}
//           icon={Trophy}
//           trend={12}
//           color="amber"
//         />
//       </motion.div>

//       {/* ============ TEACHING TOOLS ============ */}
//       <motion.div variants={itemVariants} className="mb-10">
//         <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//           <Zap className="text-purple-400" size={20} />
//           Quick Teaching Tools
//         </h3>
//         <div className="grid sm:grid-cols-3 gap-4">
//           <QuickToolCard
//             icon={Video}
//             title="Record Lesson"
//             desc="Create video content"
//             color="purple"
//           />
//           <QuickToolCard
//             icon={Mic}
//             title="Voice Notes"
//             desc="Quick audio tips"
//             color="fuchsia"
//           />
//           <QuickToolCard
//             icon={BookOpen}
//             title="Write Guide"
//             desc="Share written content"
//             color="pink"
//           />
//         </div>
//       </motion.div>

//       {/* ============ REFERRAL SECTION ============ */}
//       <motion.div variants={itemVariants} className="mb-10">
//         <GlowCard>
//           <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-xl overflow-hidden">
//             <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
//             <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-2xl" />

//             <div className="relative z-10 text-center">
//               <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/20 mb-4">
//                 <Gift className="text-purple-400" size={28} />
//               </div>

//               <h3 className="text-xl font-bold text-white mb-2">Invite Friends & Earn Points</h3>
//               <p className="text-gray-400 mb-6 max-w-md mx-auto">
//                 Share your referral link and earn rewards when someone signs up!
//               </p>

//               <div className="flex flex-col sm:flex-row items-stretch gap-3 max-w-lg mx-auto">
//                 <input
//                   type="text"
//                   readOnly
//                   value={`https://skillwrap2026.vercel.app/signup?ref=${user?.referral_code}`}
//                   className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50"
//                 />
//                 <motion.button
//                   onClick={handleCopyReferral}
//                   className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <Copy size={18} />
//                   {copied ? "Copied!" : "Copy"}
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </GlowCard>
//       </motion.div>

//       {/* ============ ACTIONS SECTION ============ */}
//       <motion.div variants={itemVariants}>
//         <h2 className="text-xl font-bold text-white mb-2">Manage your teaching activities</h2>
//         <p className="text-gray-400 mb-6 max-w-xl">
//           Keep your skills updated, respond to learners, and grow your reputation as a trusted mentor.
//         </p>

//         <div className="grid md:grid-cols-2 gap-6">
//           <PremiumFeatureCard
//             icon={Layers}
//             title="Manage Your Skills"
//             desc="Create, update, and refine the skills you offer to learners."
//             href="/my-skill"
//             onNavigate={onNavigate}
//           />
//           <PremiumFeatureCard
//             icon={Inbox}
//             title="Student Requests"
//             desc="Review, accept, or decline learning requests from students."
//             href="/request-recieved"
//             onNavigate={onNavigate}
//           />
//         </div>
//       </motion.div>

//       {/* ============ ACTIVITY & ACHIEVEMENTS ============ */}
//       <motion.div variants={itemVariants} className="mt-10 mb-10">
//         <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
//           <div className="xl:col-span-3 order-2 xl:order-1">
//             <RecentActivity activities={activities} loading={loadingActivities} />
//           </div>
//           <div className="xl:col-span-2 order-1 xl:order-2">
//             <Achievements achievements={achievements} />
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

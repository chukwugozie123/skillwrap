"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Home,
  Layers,
  Inbox,
  CheckCircle,
  LogOut,
  Settings,
  User,
  MessageCircle,
  Bell,
  X,
  Sparkles,
  Zap,
  TrendingUp,
  Target,
  Award,
  Clock,
  ChevronRight,
  Send,
  Loader2,
  Bot,
  Star,
  ArrowRight,
  Activity,
  BarChart3,
  Users,
  BookOpen,
  Rocket,
  GraduationCap,
  RefreshCw,
  Crown,
  Menu,
  Play,
  Pause,
  Flame,
  Globe,
  Lightbulb,
  Heart,
  ThumbsUp,
  Trophy,
  BadgeCheck,
  Timer,
  Calendar,
  Layout,
  LucideIcon,
} from "lucide-react";


import LearningDashboard from "./dashboards/LearningDashboard";
import TeachingDashboard from "./dashboards/TeachingDashboard";
import ExchangeDashboard from "./dashboards/ExchangeingDashboard";
import { useRouter } from "next/navigation";

// const API_URL = "http://localhost:4000";
const API_URL = "https://skillwrap-backend.onrender.com";

/* ================= TYPES ================= */
interface RoadmapStep {
  step: number;
  skill: string;
  description: string;
}

interface UserType {
  id: number;
  username: string;
  fullname: string;
  email: string;
  img_url?: string;
  created_at: string;
  mode: "learning" | "teaching" | "exchanging" | null;
  advice?: RoadmapStep[];
  referral_code?: string;
  level: number;
  streak: number;
  points?: number;
  xp?: number;
}

interface Stats {
  createdSkills: number;
  sendRequests: number;
  receivedRequests: number;
  succesfullExchnage: number;
  canclledExchnaged: number;
}

/* ================= ANIMATION VARIANTS ================= */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};


const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

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

const sidebarItemVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

/* ============ FLOATING ORB ============ */
function FloatingOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

/* ============ AMBIENT PARTICLE ============ */
function AmbientParticle({ delay, left, size }: { delay: number; left: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(34,211,238,0.5) 0%, transparent 70%)`,
      }}
      animate={{
        y: [0, -500, 0],
        opacity: [0, 0.7, 0],
        x: [0, Math.random() * 50 - 25, 0],
      }}
      transition={{
        duration: 18 + delay * 2,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    />
  );
}

/* ============ GLOW TEXT ============ */
function GlowText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative ${className}`}>
      <span className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent opacity-50">
        {children}
      </span>
      <span className="relative">{children}</span>
    </span>
  );
}

/* ================= SIDEBAR LINK COMPONENT ================= */
function PremiumSidebarLink({
  icon,
  label,
  isActive = false,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  badge?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      variants={sidebarItemVariants}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-300 overflow-hidden
        ${isActive
          ? "bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-cyan-300"
          : "text-white/70 hover:text-white hover:bg-white/5"
        }`}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Active indicator glow */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Hover light sweep */}
      <motion.div
        animate={{ x: isHovered ? "0%" : "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
      />

      {/* Icon glow */}
      <motion.div
        animate={{
          scale: isActive ? 1.1 : 1,
          rotate: isHovered ? [0, -10, 10, 0] : 0
        }}
        transition={{ duration: 0.3 }}
        className={`relative z-10 ${isActive ? "text-cyan-400" : ""}`}
      >
        {icon}
      </motion.div>

      <span className="relative z-10 font-medium">{label}</span>

      {isActive && (
        <motion.div
          className="absolute right-3 w-2 h-2 rounded-full bg-cyan-400"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {badge !== undefined && badge > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto relative z-10 px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg shadow-rose-500/25"
        >
          {badge}
        </motion.span>
      )}
    </motion.button>
  );
}

/* ================= STAT CARD COMPONENT ================= */
function StatCard({
  icon,
  label,
  value,
  trend,
  color,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  trend?: string;
  color: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.06] overflow-hidden cursor-pointer"
      style={{
        transform: isHovered ? `perspective(1000px) rotateX(${(mousePosition.y - 100) * 0.02}deg) rotateY(${(mousePosition.x - 150) * -0.02}deg)` : 'none',
      }}
    >
      {/* Gradient glow on hover */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20`}
      />

      {/* Mouse glow */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${color.includes("cyan") ? "rgba(34,211,238,0.15)" : color.includes("purple") ? "rgba(168,85,247,0.15)" : "rgba(251,191,36,0.15)"} 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Shimmer effect */}
      <motion.div
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
      />

      {/* Top glow line */}
      <motion.div
        animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${color} origin-left`}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            animate={{
              scale: isHovered ? 1.15 : 1,
              rotate: isHovered ? [0, -10, 10, 0] : 0
            }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}
          >
            {icon}
          </motion.div>
          {trend && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <TrendingUp className="w-3 h-3" />
              {trend}
            </span>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          className="text-4xl font-bold text-white mb-1"
        >
          {count}
        </motion.p>
        <p className="text-sm text-slate-400">{label}</p>

        {/* Mini sparkline */}
        <div className="mt-4 flex items-end gap-1 h-8">
          {[
            Math.random() * 30 + 20,
            Math.random() * 30 + 40,
            Math.random() * 30 + 30,
            Math.random() * 30 + 50,
            Math.random() * 30 + 35,
            Math.random() * 30 + 60,
            Math.random() * 30 + 45
          ].map((h, i) => (
            <motion.div
              key={i}
              className={`w-1.5 rounded-full bg-gradient-to-t ${color}`}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: delay + i * 0.05, duration: 0.5, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ================= ROADMAP STEP COMPONENT ================= */
function RoadmapStepCard({
  step,
  isLast,
  index,
}: {
  step: RoadmapStep;
  isLast: boolean;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="relative"
    >
      {/* Vertical connecting line */}
      {!isLast && (
        <div className="absolute left-6 top-14 bottom-0 w-[2px] overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-b from-cyan-400 via-blue-500/50 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
          />
          <motion.div
            animate={{ y: [-100, 200] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"
          />
        </div>
      )}

      <motion.div
        onClick={() => setExpanded(!expanded)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative flex gap-4 cursor-pointer"
        whileHover={{ x: 4 }}
      >
        {/* Step number with glow */}
        <motion.div
          animate={{
            scale: isHovered ? 1.15 : 1,
            boxShadow: isHovered ? "0 0 40px rgba(34,211,238,0.5)" : "0 0 20px rgba(34,211,238,0.2)"
          }}
          className="relative"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-cyan-500/30">
            {step.step}
          </div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-xl bg-cyan-400/30 blur-lg"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          animate={{
            borderColor: isHovered ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.1)",
            backgroundColor: isHovered ? "rgba(15,23,42,0.8)" : "rgba(15,23,42,0.6)"
          }}
          className="flex-1 p-4 rounded-xl backdrop-blur-xl border transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-cyan-300">{step.skill}</h4>
            <motion.div
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </motion.div>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-slate-300 text-sm leading-relaxed"
              >
                {step.description}
              </motion.p>
            )}
          </AnimatePresence>

          {!expanded && (
            <p className="text-slate-500 text-sm line-clamp-1">{step.description}</p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ================= MODE CARD COMPONENT ================= */
function ModeCard({
  mode,
  selected,
  onSelect,
}: {
  mode: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const config = {
    learning: {
      icon: <GraduationCap className="w-7 h-7" />,
      gradient: "from-cyan-500 to-blue-600",
      glow: "cyan",
      description: "Master new skills from expert teachers worldwide",
      bgGradient: "from-cyan-500/10 to-blue-500/10",
    },
    teaching: {
      icon: <BookOpen className="w-7 h-7" />,
      gradient: "from-purple-500 to-pink-600",
      glow: "purple",
      description: "Share your expertise and help others grow",
      bgGradient: "from-purple-500/10 to-pink-500/10",
    },
    exchanging: {
      icon: <RefreshCw className="w-7 h-7" />,
      gradient: "from-amber-500 to-orange-600",
      glow: "amber",
      description: "Trade skills with others in a fair exchange",
      bgGradient: "from-amber-500/10 to-orange-500/10",
    },
  }[mode] || { icon: <Star />, gradient: "from-gray-500 to-gray-600", glow: "gray", description: "", bgGradient: "from-gray-500/10" };

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full p-5 rounded-2xl border text-left transition-all duration-300 overflow-hidden
        ${selected
          ? `border-cyan-500/50 bg-gradient-to-br ${config.bgGradient}`
          : "border-white/10 bg-slate-900/60 hover:bg-slate-800/60"
        }`}
    >
      {/* Selected glow */}
      {selected && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-5`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
        />
      )}

      {/* Border shimmer */}
      {selected && (
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-2xl opacity-50"
          style={{
            padding: "1px",
            background: `linear-gradient(var(--angle), transparent, rgba(34,211,238,0.3), transparent)`,
          }}
        />
      )}

      <div className="relative z-10 flex items-start gap-4">
        <motion.div
          animate={{
            scale: selected ? 1.15 : 1,
            rotate: selected ? [0, -5, 5, 0] : 0
          }}
          transition={{ duration: 0.4 }}
          className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient} shadow-lg`}
        >
          {config.icon}
        </motion.div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg capitalize text-white">{mode}</h3>
            {selected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30"
              >
                <CheckCircle className="w-3 h-3" />
              </motion.div>
            )}
          </div>
          <p className="text-sm text-slate-400">{config.description}</p>
        </div>
      </div>
    </motion.button>
  );
}

/* ================= DASHBOARD MODE SECTION ================= */
function DashboardModeSection({
  mode,
  user,
  stats,
}: {
  mode: "learning" | "teaching" | "exchanging";
  user: UserType;
  stats: Stats;
}) {
  const configs = {
    learning: {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Learning Dashboard",
      subtitle: "Track your progress and discover new skills",
      gradient: "from-cyan-500 to-blue-600",
      color: "cyan",
      bgGradient: "from-cyan-500/5 to-blue-500/5",
    },
    teaching: {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Teaching Dashboard",
      subtitle: "Manage your courses and connect with students",
      gradient: "from-purple-500 to-pink-600",
      color: "purple",
      bgGradient: "from-purple-500/5 to-pink-500/5",
    },
    exchanging: {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Exchange Dashboard",
      subtitle: "Facilitate skill trades and collaborations",
      gradient: "from-amber-500 to-orange-600",
      color: "amber",
      bgGradient: "from-amber-500/5 to-orange-500/5",
    },
  };

  const config = configs[mode];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              `0 0 20px ${config.color === "cyan" ? "rgba(34,211,238,0.3)" : config.color === "purple" ? "rgba(168,85,247,0.3)" : "rgba(251,191,36,0.3)"}`,
              `0 0 30px ${config.color === "cyan" ? "rgba(34,211,238,0.4)" : config.color === "purple" ? "rgba(168,85,247,0.4)" : "rgba(251,191,36,0.4)"}`,
              `0 0 20px ${config.color === "cyan" ? "rgba(34,211,238,0.3)" : config.color === "purple" ? "rgba(168,85,247,0.3)" : "rgba(251,191,36,0.3)"}`,
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient}`}
        >
          {config.icon}
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-white">{config.title}</h3>
          <p className="text-sm text-slate-400">{config.subtitle}</p>
        </div>
      </div>

      {/* Dashboard content */}
      <div className={`rounded-2xl bg-gradient-to-br ${config.bgGradient} border border-white/[0.04] p-6 backdrop-blur-xl`}>
        {mode === "learning" && (
          <LearningDashboard stats={{ sendRequests: stats.sendRequests, succesfullExchnage: stats.succesfullExchnage }} user={user} />
        )}
        {mode === "teaching" && (
          <TeachingDashboard stats={stats} user={user} />
        )}
        {mode === "exchanging" && (
          <ExchangeDashboard stats={stats} user={user} />
        )}
      </div>
    </motion.div>
  );
}

/* ================= MAIN COMPONENT ================= */
export default function DashboardPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<Stats>({
    createdSkills: 0,
    sendRequests: 0,
    receivedRequests: 0,
    succesfullExchnage: 0,
    canclledExchnaged: 0,
  });

  const [unread, setUnread] = useState(0);

  const [showModeModal, setShowModeModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState<UserType["mode"]>(null);
  const [savingMode, setSavingMode] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false);

  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [roadmapText, setRoadmapText] = useState("");
  const [savingRoadmap, setSavingRoadmap] = useState(false);
  const [roadmapMessage, setRoadmapMessage] = useState("");
  const [aiMode, setAiMode] = useState<"ai" | "fallback">("ai");

  const router = useRouter();

  const [greeting, setGreeting] = useState("");

  // Particles config
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    delay: i * 1.5,
    left: `${3 + i * 10}%`,
    size: 2 + Math.random() * 3,
  }));

  /* ================= GREETING ================= */
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  /* ================= FETCH USER ================= */
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
          cache: "no-store",
        });

           if (!res.ok) return router.push("/login");

        const data = await res.json();
        const fetchedUser = data.user as UserType;

        let advice = fetchedUser.advice;
        if (typeof advice === "string") {
          try {
            advice = JSON.parse(advice);
          } catch {
            advice = undefined;
          }
        }

        setUser({ ...fetchedUser, advice });

        if (!fetchedUser.mode) {
          setShowModeModal(true);
        }
      } catch (err) {
        console.log("Failed to load user:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  /* ================= KEEP MODAL IN SYNC ================= */
  useEffect(() => {
    if (user?.mode) setShowModeModal(false);
  }, [user]);

  /* ================= FETCH STATS ================= */
  useEffect(() => {
    if (!user) return;

    fetch(`${API_URL}/stats`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) =>
        setStats({
          createdSkills: data.createdSkill ?? 0,
          sendRequests: data.sendRequests ?? 0,
          receivedRequests: data.receivedRequests ?? 0,
          succesfullExchnage: data.succesfullExchnage ?? 0,
          canclledExchnaged: data.canclledExchnaged ?? 0,
        })
      )
      .catch(console.error);
  }, [user]);

  /* ================= NOTIFICATIONS ================= */
  useEffect(() => {
    fetch(`${API_URL}/notification/unread-count`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUnread(data.count);
      });
  }, []);

  /* ================= SAVE MODE ================= */
  async function handleSaveMode() {
    if (!selectedMode) return;

    setSavingMode(true);
    try {
      const res = await fetch(`${API_URL}/user/set-mode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ mode: selectedMode }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      setUser((prev) => (prev ? { ...prev, mode: data.mode } : prev));
      setShowModeModal(false);
    } catch {
      alert("Failed to save mode");
    } finally {
      setSavingMode(false);
    }
  }

  /* ================= LOGOUT ================= */
  async function handleLogout() {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  }

  /* ================= VIEW NOTIFICATIONS ================= */
  async function handleViewNotifications() {
    setUnread(0);
  }

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
            <Loader2 className="w-10 h-10 text-white" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl bg-cyan-400/40 blur-xl"
          />
        </motion.div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen flex bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* ================= PREMIUM ANIMATED BACKGROUND ================= */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Aurora gradients */}
        <motion.div
          className="absolute top-[-30%] right-[-20%] w-[1000px] h-[1000px] rounded-full bg-cyan-500/8 blur-[180px]"
          animate={{
            x: [0, 60, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-30%] left-[-20%] w-[800px] h-[800px] rounded-full bg-purple-500/6 blur-[150px]"
          animate={{
            x: [0, -40, 0],
            y: [0, -60, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
        <motion.div
          className="absolute top-[30%] left-[30%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px]"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 10 }}
        />
        <motion.div
          className="absolute top-[60%] right-[10%] w-[500px] h-[500px] rounded-full bg-emerald-500/4 blur-[100px]"
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        />

        {/* Floating orbs */}
        <FloatingOrb
          className="w-[500px] h-[500px] -top-32 -left-32 bg-gradient-to-br from-cyan-500/12 to-transparent blur-3xl"
          delay={0}
        />
        <FloatingOrb
          className="w-[400px] h-[400px] top-1/2 -right-16 bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl"
          delay={6}
        />
        <FloatingOrb
          className="w-[350px] h-[350px] -bottom-16 left-1/4 bg-gradient-to-br from-emerald-500/8 to-transparent blur-3xl"
          delay={12}
        />
        <FloatingOrb
          className="w-[300px] h-[300px] top-1/4 right-1/3 bg-gradient-to-br from-amber-500/6 to-transparent blur-3xl"
          delay={9}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(15,23,42,0.5)_100%)]" />

        {/* Particles */}
        {particles.map((p) => (
          <AmbientParticle key={p.id} delay={p.delay} left={p.left} size={p.size} />
        ))}
      </div>

      {/* ================= MOBILE HAMBURGER ================= */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <motion.button
          onClick={() => setShowSidebar(true)}
          className="p-3 rounded-xl bg-slate-900/80 backdrop-blur-xl border border-white/[0.06] hover:border-cyan-500/30 transition-all shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      </div>

      {/* ================= FLOATING GLASS SIDEBAR ================= */}
      <AnimatePresence>
        {(showSidebar || typeof window !== "undefined") && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{
              x: showSidebar ? 0 : (typeof window !== "undefined" && window.innerWidth >= 1024 ? 0 : -300),
              opacity: 1
            }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed lg:sticky inset-y-0 left-0 z-40 w-72 flex flex-col
              ${showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            {/* Sidebar glass container */}
            <div className="m-3 flex-1 flex flex-col rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/[0.06] shadow-2xl shadow-black/30 overflow-hidden">
              {/* Close button for mobile */}
              <div className="lg:hidden flex justify-end p-3">
                <motion.button
                  onClick={() => setShowSidebar(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Premium User Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="px-5 py-6 border-b border-white/[0.06]"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center overflow-hidden shadow-lg">
                      {user.img_url ? (
                        <img
                          src={user.img_url}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    {/* Online status pulse */}
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Glow */}
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl bg-emerald-400/20 blur-md"
                    />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{user.fullname}</p>
                    {user.mode && (
                      <span className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-full text-xs bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        {user.mode}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 p-2.5 rounded-xl bg-slate-800/60 border border-white/[0.04] text-center">
                    <p className="text-lg font-bold text-cyan-300">{stats.createdSkills}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Skills</p>
                  </div>
                  <div className="flex-1 p-2.5 rounded-xl bg-slate-800/60 border border-white/[0.04] text-center">
                    <p className="text-lg font-bold text-purple-300">{stats.succesfullExchnage}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">Exchanges</p>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Links */}
              <motion.nav
                className="p-3 space-y-1 flex-1 overflow-y-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <PremiumSidebarLink icon={<Home className="w-5 h-5" />} label="Dashboard" isActive />
                <PremiumSidebarLink icon={<User className="w-5 h-5" />} label="Profile" />
                <PremiumSidebarLink icon={<Crown className="w-5 h-5" />} label="Leaderboard" />
                <PremiumSidebarLink icon={<MessageCircle className="w-5 h-5" />} label="Chat" />
                <PremiumSidebarLink icon={<Layers className="w-5 h-5" />} label="My Skills" />
                <PremiumSidebarLink icon={<Inbox className="w-5 h-5" />} label="Requests Received" />
                <PremiumSidebarLink icon={<CheckCircle className="w-5 h-5" />} label="Requests Sent" />

                {/* Notifications */}
                <PremiumSidebarLink
                  icon={<Bell className="w-5 h-5" />}
                  label="Notifications"
                  badge={unread}
                  onClick={handleViewNotifications}
                />

                <PremiumSidebarLink icon={<Settings className="w-5 h-5" />} label="Settings" />

                {/* Logout */}
                <motion.button
                  variants={sidebarItemVariants}
                  onClick={handleLogout}
                  className="group relative flex items-center gap-3 px-4 py-3 rounded-xl w-full text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-300"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </motion.nav>

              {/* Pro tip card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-3"
              >
                <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 relative overflow-hidden">
                  {/* Shimmer */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  />
                  <div className="relative z-10 flex items-center gap-2 mb-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                    </motion.div>
                    <span className="text-xs font-semibold text-cyan-300">Pro Tip</span>
                  </div>
                  <p className="text-xs text-slate-400">Set your roadmap to get AI-powered skill recommendations</p>
                </div>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ================= MOBILE OVERLAY ================= */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}
      </AnimatePresence>

      {/* ================= CONTENT ================= */}
      <section ref={contentRef} className="flex-1 overflow-y-auto relative z-10">
        <motion.div
          className="p-4 lg:p-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ===== PREMIUM HERO BANNER ===== */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8 p-6 lg:p-12 rounded-3xl overflow-hidden"
          >
            {/* Hero background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-slate-900/60 to-purple-500/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />

            {/* Animated aurora */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `
                  radial-gradient(ellipse at 20% 30%, rgba(34,211,238,0.2) 0%, transparent 40%),
                  radial-gradient(ellipse at 80% 60%, rgba(168,85,247,0.15) 0%, transparent 40%),
                  radial-gradient(ellipse at 50% 80%, rgba(16,185,129,0.1) 0%, transparent 30%)
                `,
                backgroundSize: "200% 200%",
              }}
            />

            {/* Floating glow orbs */}
            <motion.div
              className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-500/15 blur-[100px]"
              animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-purple-500/12 blur-[80px]"
              animate={{ x: [0, -20, 0], y: [0, 25, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 12, repeat: Infinity, delay: 3 }}
            />
            <motion.div
              className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-emerald-500/8 blur-[60px]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />

            {/* Animated border */}
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl border border-cyan-500/20"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-3xl opacity-30"
              style={{
                background: "conic-gradient(from 0deg, transparent, rgba(34,211,238,0.1), transparent 30%)",
              }}
            />

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  {/* Time badge */}
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 backdrop-blur-xl border border-white/[0.06] text-sm text-slate-300 mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    >
                      <Clock className="w-4 h-4 text-cyan-400" />
                    </motion.div>
                    <span>{greeting}</span>
                    <motion.span
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-emerald-400"
                    />
                  </motion.div>

                  {/* Main heading */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4 tracking-tight">
                      <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                        Welcome back,
                      </span>
                      <br />
                      <GlowText className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-extrabold">
                        {user.fullname.split(" ")[0]}
                      </GlowText>
                    </h1>
                  </motion.div>

                  {/* Subtitle */}
                  <motion.p
                    className="text-slate-400 text-base lg:text-xl max-w-xl leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Your AI-powered journey to mastery continues here. Level up your skills, connect with experts, and achieve your goals.
                  </motion.p>

                  {/* Quick actions */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-3 mt-6"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20"
                    >
                      <Rocket className="w-4 h-4" />
                      Start Learning
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/60 border border-white/[0.06] text-white font-semibold backdrop-blur-xl"
                    >
                      <Target className="w-4 h-4 text-cyan-400" />
                      Set Roadmap
                    </motion.button>
                  </motion.div>
                </div>

                {/* Mode badge */}
                {user.mode && (
                  <motion.div
                    className="flex items-center gap-4 px-6 py-5 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/[0.06] shadow-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02, y: -3 }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30"
                    >
                      {user.mode === "learning" && <GraduationCap className="w-6 h-6" />}
                      {user.mode === "teaching" && <BookOpen className="w-6 h-6" />}
                      {user.mode === "exchanging" && <RefreshCw className="w-6 h-6" />}
                    </motion.div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Current Mode</p>
                      <p className="text-xl font-bold capitalize text-white">{user.mode}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* ===== STATS GRID ===== */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <StatCard
              icon={<Layers className="w-5 h-5 text-white" />}
              label="Created Skills"
              value={stats.createdSkills}
              color="from-cyan-500 to-blue-600"
              delay={0}
            />
            <StatCard
              icon={<Send className="w-5 h-5 text-white" />}
              label="Requests Sent"
              value={stats.sendRequests}
              trend="+12%"
              color="from-purple-500 to-pink-600"
              delay={0.1}
            />
            <StatCard
              icon={<Inbox className="w-5 h-5 text-white" />}
              label="Requests Received"
              value={stats.receivedRequests}
              trend="+8%"
              color="from-amber-500 to-orange-600"
              delay={0.2}
            />
            <StatCard
              icon={<Award className="w-5 h-5 text-white" />}
              label="Completed Exchanges"
              value={stats.succesfullExchnage}
              color="from-emerald-500 to-teal-600"
              delay={0.3}
            />
          </motion.div>

          {/* ===== ROADMAP SECTION ===== */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 20px rgba(16,185,129,0.3)",
                      "0 0 30px rgba(16,185,129,0.4)",
                      "0 0 20px rgba(16,185,129,0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20"
                >
                  <Target className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-white">Your Roadmap</h2>
                  <p className="text-sm text-slate-400">AI-powered learning path</p>
                </div>
              </div>

              <motion.button
                onClick={() => setShowRoadmapModal(true)}
                className="group relative px-5 py-2.5 rounded-xl font-semibold overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500" />
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <span className="relative z-10 flex items-center gap-2 text-white">
                  <Rocket className="w-4 h-4" />
                  Set Roadmap
                </span>
              </motion.button>
            </div>

            {/* Roadmap badge */}
            {user.advice && user.advice.length > 0 && (
              <motion.div
                className="flex justify-center mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {aiMode === "fallback" ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm backdrop-blur-xl">
                    <Zap className="w-4 h-4" />
                    Smart Offline Roadmap
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm backdrop-blur-xl">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Bot className="w-4 h-4" />
                    </motion.div>
                    AI Generated Roadmap
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-emerald-400"
                    />
                  </span>
                )}
              </motion.div>
            )}

            {/* Roadmap steps */}
            {user.advice && user.advice.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4 p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.06]"
              >
                {user.advice.map((step, index) => (
                  <RoadmapStepCard
                    key={step.step}
                    step={step}
                    isLast={index === user.advice!.length - 1}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="p-16 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.06] border-dashed text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-800/60 border border-white/[0.06] flex items-center justify-center shadow-xl"
                >
                  <Target className="w-10 h-10 text-slate-500" />
                </motion.div>
                <p className="text-slate-400 mb-2 font-medium text-lg">No roadmap set yet</p>
                <p className="text-sm text-slate-500">Click &ldquo;Set Roadmap&rdquo; to get AI-powered recommendations</p>
              </motion.div>
            )}
          </motion.div>

          {/* ===== MODE-SPECIFIC DASHBOARD ===== */}
          {user.mode && (
            <DashboardModeSection mode={user.mode} user={user} stats={stats} />
          )}
        </motion.div>
      </section>

      {/* ================= MODE MODAL ================= */}
      <AnimatePresence>
        {showModeModal && !user.mode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-lg p-8 rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-white/[0.06] shadow-2xl overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <FloatingOrb className="w-[200px] h-[200px] -top-20 -right-20 bg-cyan-500/20 blur-[60px]" delay={0} />
                <FloatingOrb className="w-[150px] h-[150px] -bottom-10 -left-10 bg-purple-500/20 blur-[50px]" delay={2} />
              </div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30"
                  >
                    <Sparkles className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white mb-2">Choose Your Path</h2>
                  <p className="text-slate-400">This helps personalize your dashboard. You can change it later.</p>
                </div>

                <div className="space-y-3 mb-6">
                  {(["learning", "teaching", "exchanging"] as const).map((mode) => (
                    <ModeCard
                      key={mode}
                      mode={mode}
                      selected={selectedMode === mode}
                      onSelect={() => setSelectedMode(mode)}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={handleSaveMode}
                  disabled={!selectedMode || savingMode}
                  className="w-full py-4 rounded-xl font-semibold relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: selectedMode ? 1.02 : 1 }}
                  whileTap={{ scale: selectedMode ? 0.98 : 1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                    {savingMode ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= ROADMAP MODAL ================= */}
      <AnimatePresence>
        {showRoadmapModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-lg p-8 rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-emerald-500/20 shadow-2xl overflow-hidden"
            >
              {/* Floating AI particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-10 right-10 w-3 h-3 rounded-full bg-emerald-400"
                  animate={{ y: [0, -25, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-24 left-10 w-2 h-2 rounded-full bg-teal-400"
                  animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute top-1/2 right-10 w-2 h-2 rounded-full bg-cyan-400"
                  animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <FloatingOrb className="w-[150px] h-[150px] -top-10 -right-10 bg-emerald-500/15 blur-[50px]" delay={0} />
              </div>

              <div className="relative z-10">
                <div className="text-center mb-6">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 0 30px rgba(16,185,129,0.3)",
                        "0 0 50px rgba(16,185,129,0.5)",
                        "0 0 30px rgba(16,185,129,0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/30"
                  >
                    <Bot className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-2">Set Your Roadmap</h2>
                  <p className="text-slate-400 text-sm">Describe your goals and let AI create your personalized learning path</p>
                </div>

                <div className="relative mb-4">
                  <textarea
                    value={roadmapText}
                    onChange={(e) => setRoadmapText(e.target.value)}
                    placeholder="I want to learn React, improve design skills, master TypeScript..."
                    className="w-full p-4 rounded-xl bg-slate-800/60 border border-white/[0.06] focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none resize-none transition-all duration-300 text-white placeholder:text-slate-500"
                    rows={5}
                  />
                </div>

                {roadmapMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center mb-4 text-sm ${
                      roadmapMessage.includes("Failed") ? "text-rose-400" : "text-emerald-400"
                    }`}
                  >
                    {roadmapMessage}
                  </motion.p>
                )}

                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setShowRoadmapModal(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-800/60 border border-white/[0.06] hover:bg-slate-800 transition-all font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    onClick={async () => {
                      if (!roadmapText.trim()) return alert("Please enter your roadmap");

                      setSavingRoadmap(true);
                      setRoadmapMessage("");

                      try {
                        const res = await fetch(`${API_URL}/generate-roadmap`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          credentials: "include",
                          body: JSON.stringify({ goal: roadmapText }),
                        });

                        const data = await res.json();

                        if (!data.success) throw new Error(data.message || "Failed");

                        setUser((prev) =>
                          prev ? { ...prev, advice: data.roadmap } : prev
                        );
                        setAiMode(data.ai_mode || "ai");

                        setRoadmapMessage("Roadmap saved successfully!");
                        setRoadmapText("");
                        setTimeout(() => setShowRoadmapModal(false), 1200);
                      } catch (err) {
                        console.error(err);
                        setRoadmapMessage("Failed to save roadmap. Try again.");
                      } finally {
                        setSavingRoadmap(false);
                      }
                    }}
                    disabled={savingRoadmap || !roadmapText.trim()}
                    className="flex-1 py-3 rounded-xl font-semibold relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: !savingRoadmap && roadmapText.trim() ? 1.02 : 1 }}
                    whileTap={{ scale: !savingRoadmap && roadmapText.trim() ? 0.98 : 1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500" />
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                      {savingRoadmap ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Generate
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}



















// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// import {
//   Home,
//   Layers,
//   Inbox,
//   CheckCircle,
//   LogOut,
//   Settings,
//   User,
//   MessageCircle,
//   Bell,
//   X,
//   Sparkles,
//   Zap,
//   TrendingUp,
//   Target,
//   Award,
//   Clock,
//   ChevronRight,
//   Send,
//   Loader2,
//   Bot,
//   Star,
//   ArrowRight,
//   Activity,
//   BarChart3,
//   Users,
//   BookOpen,
//   Rocket,
//   GraduationCap,
//   RefreshCw,
//   Crown,
// } from "lucide-react";

// import LearningDashboard from "./dashboards/LearningDashboard";
// import TeachingDashboard from "./dashboards/TeachingDashboard";
// import ExchangeDashboard from "./dashboards/ExchangeingDashboard";

// // const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";

// /* ================= TYPES ================= */
// interface RoadmapStep {
//   step: number;
//   skill: string;
//   description: string;
// }

// interface UserType {
//   id: number;
//   username: string;
//   fullname: string;
//   email: string;
//   img_url?: string;
//   created_at: string;
//   mode: "learning" | "teaching" | "exchanging" | null;
//   advice?: RoadmapStep[];
//   referral_code?: string;
//   level: number;
//   streak: number;
// }

// interface Stats {
//   createdSkills: number;
//   sendRequests: number;
//   receivedRequests: number;
//   succesfullExchnage: number;
//   canclledExchnaged: number;
// }

// /* ================= ANIMATION VARIANTS ================= */
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08, delayChildren: 0.1 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 100, damping: 15 },
//   },
// };

// const sidebarItemVariants = {
//   hidden: { opacity: 0, x: -20 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { type: "spring", stiffness: 120, damping: 20 },
//   },
// };

// /* ================= SIDEBAR LINK COMPONENT ================= */
// function PremiumSidebarLink({
//   href,
//   icon,
//   label,
//   isActive = false,
// }: {
//   href: string;
//   icon: React.ReactNode;
//   label: string;
//   isActive?: boolean;
// }) {
//   const router = useRouter();

//   const sidebarItemVariants = {
//   hidden: { opacity: 0, x: -10 },
//   visible: { opacity: 1, x: 0 },
// };

//   return (
//     <motion.button
//       variants={sidebarItemVariants}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//       onClick={() => router.push(href)}
//       className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-300 overflow-hidden
//         ${isActive 
//           ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300" 
//           : "text-white/70 hover:text-white hover:bg-white/5"
//         }`}
//       whileHover={{ x: 4 }}
//       whileTap={{ scale: 0.98 }}
//     >
//       {/* Active indicator glow */}
//       {isActive && (
//         <motion.div
//           layoutId="activeIndicator"
//           className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         />
//       )}

//       {/* Hover light sweep */}
//       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

//       <span className={`relative z-10 ${isActive ? "text-cyan-400" : ""}`}>
//         {icon}
//       </span>
//       <span className="relative z-10 font-medium">{label}</span>

//       {isActive && (
//         <motion.div
//           className="absolute right-3 w-2 h-2 rounded-full bg-cyan-400"
//           animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         />
//       )}
//     </motion.button>
//   );
// }

// /* ================= STAT CARD COMPONENT ================= */
// function StatCard({
//   icon,
//   label,
//   value,
//   trend,
//   color,
//   delay = 0,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: number;
//   trend?: string;
//   color: string;
//   delay?: number;
// }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const duration = 1500;
//     const steps = 60;
//     const increment = value / steps;
//     let current = 0;

//     const timer = setInterval(() => {
//       current += increment;
//       if (current >= value) {
//         setCount(value);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(current));
//       }
//     }, duration / steps);

//     return () => clearInterval(timer);
//   }, [value]);

//   const sidebarItemVariants = {
//   hidden: { opacity: 0, x: -10 },
//   visible: { opacity: 1, x: 0 },
// };
//   return (
//     <motion.div
//       variants={sidebarItemVariants}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}      
//       whileHover={{ y: -4, scale: 1.02 }}
//       className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden"
//     >
//       {/* Gradient glow on hover */}
//       <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

//       {/* Top glow line */}
//       <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

//       <div className="relative z-10">
//         <div className="flex items-center justify-between mb-3">
//           <div className={`p-2.5 rounded-xl bg-gradient-to-br ${color}`}>
//             {icon}
//           </div>
//           {trend && (
//             <span className="text-xs text-emerald-400 flex items-center gap-1">
//               <TrendingUp className="w-3 h-3" />
//               {trend}
//             </span>
//           )}
//         </div>

//         <p className="text-3xl font-bold text-white mb-1">{count}</p>
//         <p className="text-sm text-white/50">{label}</p>

//         {/* Mini sparkline placeholder */}
//         <div className="mt-3 flex items-end gap-0.5 h-6">
//           {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
//             <motion.div
//               key={i}
//               className={`w-1 rounded-full bg-gradient-to-t ${color}`}
//               initial={{ height: 0 }}
//               animate={{ height: `${h}%` }}
//               transition={{ delay: delay + i * 0.05, duration: 0.5 }}
//             />
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// /* ================= ROADMAP STEP COMPONENT ================= */
// function RoadmapStepCard({
//   step,
//   isLast,
//   index,
// }: {
//   step: RoadmapStep;
//   isLast: boolean;
//   index: number;
// }) {
//   const [expanded, setExpanded] = useState(false);

//   const sidebarItemVariants = {
//   hidden: { opacity: 0, x: -10 },
//   visible: { opacity: 1, x: 0 },
// };

//   return (
//     <motion.div
//       variants={sidebarItemVariants}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}  
//       className="relative"
//     >
//       {/* Vertical connecting line */}
//       {!isLast && (
//         <div className="absolute left-6 top-14 bottom-0 w-[2px]">
//           <motion.div
//             className="h-full bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent"
//             initial={{ scaleY: 0 }}
//             animate={{ scaleY: 1 }}
//             transition={{ delay: index * 0.2, duration: 0.5 }}
//           />
//         </div>
//       )}

//       <motion.div
//         onClick={() => setExpanded(!expanded)}
//         className="group relative flex gap-4 cursor-pointer"
//         whileHover={{ x: 4 }}
//       >
//         {/* Step number with glow */}
//         <div className="relative">
//           <motion.div
//             className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-cyan-500/25"
//             whileHover={{ scale: 1.1, rotate: 5 }}
//           >
//             {step.step}
//           </motion.div>
//           <motion.div
//             className="absolute inset-0 rounded-xl bg-cyan-400/30 blur-xl"
//             animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           />
//         </div>

//         {/* Content */}
//         <div className="flex-1 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
//           <div className="flex items-center justify-between mb-2">
//             <h4 className="font-semibold text-cyan-300">{step.skill}</h4>
//             <motion.div
//               animate={{ rotate: expanded ? 90 : 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <ChevronRight className="w-4 h-4 text-white/40" />
//             </motion.div>
//           </div>

//           <AnimatePresence>
//             {expanded && (
//               <motion.p
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="text-white/70 text-sm"
//               >
//                 {step.description}
//               </motion.p>
//             )}
//           </AnimatePresence>

//           {!expanded && (
//             <p className="text-white/50 text-sm line-clamp-1">{step.description}</p>
//           )}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// /* ================= MODE CARD COMPONENT ================= */
// function ModeCard({
//   mode,
//   selected,
//   onSelect,
// }: {
//   mode: string;
//   selected: boolean;
//   onSelect: () => void;
// }) {
//   const config = {
//     learning: {
//       icon: <GraduationCap className="w-8 h-8" />,
//       gradient: "from-cyan-500 to-blue-600",
//       glow: "cyan",
//       description: "Master new skills from expert teachers worldwide",
//     },
//     teaching: {
//       icon: <BookOpen className="w-8 h-8" />,
//       gradient: "from-purple-500 to-pink-600",
//       glow: "purple",
//       description: "Share your expertise and help others grow",
//     },
//     exchanging: {
//       icon: <RefreshCw className="w-8 h-8" />,
//       gradient: "from-amber-500 to-orange-600",
//       glow: "amber",
//       description: "Trade skills with others in a fair exchange",
//     },
//   }[mode] || { icon: <Star />, gradient: "from-gray-500 to-gray-600", glow: "gray", description: "" };

//   return (
//     <motion.button
//       onClick={onSelect}
//       className={`relative w-full p-5 rounded-2xl border text-left transition-all duration-300 overflow-hidden
//         ${selected 
//           ? `border-${config.glow}-500/50 bg-gradient-to-br ${config.gradient}/10` 
//           : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
//         }`}
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//     >
//       {/* Selected glow */}
//       {selected && (
//         <motion.div
//           className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-10`}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.1 }}
//         />
//       )}

//       <div className="relative z-10 flex items-start gap-4">
//         <div className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient}`}>
//           {config.icon}
//         </div>

//         <div className="flex-1">
//           <div className="flex items-center gap-2 mb-1">
//             <h3 className="font-semibold text-lg capitalize">{mode}</h3>
//             {selected && (
//               <motion.div
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center"
//               >
//                 <CheckCircle className="w-3 h-3" />
//               </motion.div>
//             )}
//           </div>
//           <p className="text-sm text-white/60">{config.description}</p>
//         </div>
//       </div>
//     </motion.button>
//   );
// }

// /* ================= MAIN COMPONENT ================= */
// export default function DashboardPage() {
//   const router = useRouter();
//   const contentRef = useRef<HTMLDivElement>(null);

//   const [user, setUser] = useState<UserType | null>(null);
//   const [loading, setLoading] = useState(true);

//   const [stats, setStats] = useState<Stats>({
//     createdSkills: 0,
//     sendRequests: 0,
//     receivedRequests: 0,
//     succesfullExchnage: 0,
//     canclledExchnaged: 0,
//   });

//   const [unread, setUnread] = useState(0);

//   const [showModeModal, setShowModeModal] = useState(false);
//   const [selectedMode, setSelectedMode] = useState<UserType["mode"]>(null);
//   const [savingMode, setSavingMode] = useState(false);

//   const [showSidebar, setShowSidebar] = useState(false);

//   const [showRoadmapModal, setShowRoadmapModal] = useState(false);
//   const [roadmapText, setRoadmapText] = useState("");
//   const [savingRoadmap, setSavingRoadmap] = useState(false);
//   const [roadmapMessage, setRoadmapMessage] = useState("");
//   const [aiMode, setAiMode] = useState<"ai" | "fallback">("ai");

//   const [greeting, setGreeting] = useState("");

//   /* ================= GREETING ================= */
//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) setGreeting("Good morning");
//     else if (hour < 18) setGreeting("Good afternoon");
//     else setGreeting("Good evening");
//   }, []);

//   /* ================= FETCH USER ================= */
//   useEffect(() => {
//     async function loadUser() {
//       try {
//         const res = await fetch(`${API_URL}/auth/profile`, {
//           credentials: "include",
//           cache: "no-store",
//         });

//         if (!res.ok) {
//           router.replace("/login");
//           return;
//         }

//         const data = await res.json();
//         const fetchedUser = data.user as UserType;

//         let advice = fetchedUser.advice;
//         if (typeof advice === "string") {
//           try {
//             advice = JSON.parse(advice);
//           } catch {
//             advice = undefined;
//           }
//         }

//         setUser({ ...fetchedUser, advice });

//         if (!fetchedUser.mode) {
//           setShowModeModal(true);
//         }
//       } catch {
//         router.replace("/login");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadUser();
//   }, [router]);

//   /* ================= KEEP MODAL IN SYNC ================= */
//   useEffect(() => {
//     if (user?.mode) setShowModeModal(false);
//   }, [user]);

//   /* ================= FETCH STATS ================= */
//   useEffect(() => {
//     if (!user) return;

//     fetch(`${API_URL}/stats`, { credentials: "include" })
//       .then((res) => res.json())
//       .then((data) =>
//         setStats({
//           createdSkills: data.createdSkill ?? 0,
//           sendRequests: data.sendRequests ?? 0,
//           receivedRequests: data.receivedRequests ?? 0,
//           succesfullExchnage: data.succesfullExchnage ?? 0,
//           canclledExchnaged: data.canclledExchnaged ?? 0,
//         })
//       )
//       .catch(console.error);
//   }, [user]);

//   /* ================= NOTIFICATIONS ================= */
//   useEffect(() => {
//     fetch(`${API_URL}/notification/unread-count`, {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) setUnread(data.count);
//       });
//   }, []);

//   /* ================= SAVE MODE ================= */
//   async function handleSaveMode() {
//     if (!selectedMode) return;

//     setSavingMode(true);
//     try {
//       const res = await fetch(`${API_URL}/user/set-mode`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ mode: selectedMode }),
//       });

//       if (!res.ok) throw new Error();

//       const data = await res.json();

//       setUser((prev) => (prev ? { ...prev, mode: data.mode } : prev));
//       setShowModeModal(false);
//     } catch {
//       alert("Failed to save mode");
//     } finally {
//       setSavingMode(false);
//     }
//   }

//   /* ================= LOGOUT ================= */
//   async function handleLogout() {
//     await fetch(`${API_URL}/auth/logout`, {
//       method: "POST",
//       credentials: "include",
//     });
//     router.replace("/login");
//   }

//   /* ================= VIEW NOTIFICATIONS ================= */
//   async function handleViewNotifications() {
//     setUnread(0);
//     router.push("/notifications-route");
//   }

//   /* ================= LOADING STATE ================= */
//   if (loading) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center bg-[#030712] text-white gap-4">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//         >
//           <Loader2 className="w-10 h-10 text-cyan-400" />
//         </motion.div>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-white/60"
//         >
//           Loading your dashboard...
//         </motion.p>
//       </div>
//     );
//   }

//   const sidebarItemVariants = {
//   hidden: { opacity: 0, x: -10 },
//   visible: { opacity: 1, x: 0 },
// };


//   if (!user) return null;
  

//   return (
//     <main className="min-h-screen flex bg-[#030712] text-white overflow-hidden">
//       {/* ================= ANIMATED BACKGROUND ================= */}
//       <div className="fixed inset-0 pointer-events-none">
//         {/* Gradient orbs */}
//         <motion.div
//           className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px]"
//           animate={{
//             x: [0, 50, 0],
//             y: [0, 30, 0],
//           }}
//           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px]"
//           animate={{
//             x: [0, -30, 0],
//             y: [0, -50, 0],
//           }}
//           transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[80px]"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
//         />

//         {/* Grid overlay */}
//         <div 
//           className="absolute inset-0 opacity-[0.02]"
//           style={{
//             backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
//             backgroundSize: "60px 60px",
//           }}
//         />

//         {/* Noise texture */}
//         <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
//       </div>

//       {/* ================= MOBILE HAMBURGER ================= */}
//       <div className="sm:hidden fixed top-4 left-4 z-50">
//         <motion.button
//           onClick={() => setShowSidebar(true)}
//           className="p-3 rounded-xl bg-white/10 text-white backdrop-blur-xl border border-white/10 hover:bg-white/20 transition"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <span className="sr-only">Open sidebar</span>
//           <div className="space-y-1.5">
//             <span className="block w-5 h-0.5 bg-white rounded-full"></span>
//             <span className="block w-5 h-0.5 bg-white rounded-full"></span>
//             <span className="block w-3 h-0.5 bg-white rounded-full"></span>
//           </div>
//         </motion.button>
//       </div>

//       {/* ================= FLOATING GLASS SIDEBAR ================= */}
//       <AnimatePresence>
//         {(showSidebar || typeof window !== "undefined") && (
//           <motion.aside
//             initial={{ x: -300, opacity: 0 }}
//             animate={{ x: showSidebar ? 0 : (typeof window !== "undefined" && window.innerWidth >= 640 ? 0 : -300), opacity: 1 }}
//             exit={{ x: -300, opacity: 0 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className={`fixed sm:sticky inset-y-0 left-0 z-40 w-72 flex flex-col
//               ${showSidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
//             `}
//           >
//             {/* Sidebar glass container */}
//             <div className="m-3 flex-1 flex flex-col rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/20 overflow-hidden">
//               {/* Close button for mobile */}
//               <div className="sm:hidden flex justify-end p-3">
//                 <motion.button
//                   onClick={() => setShowSidebar(false)}
//                   className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition"
//                   whileHover={{ rotate: 90 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <X className="w-5 h-5" />
//                 </motion.button>
//               </div>

//               {/* Premium User Info */}
//               <div className="px-5 py-6 border-b border-white/10">
//                 <div className="flex items-center gap-4">
//                   <div className="relative">
//                     <motion.div
//                       className="relative"
//                       whileHover={{ scale: 1.05 }}
//                     >
//                       <Image
//                         src={user.img_url || "/default-avatar.png"}
//                         alt="avatar"
//                         width={48}
//                         height={48}
//                         unoptimized
//                         className="rounded-xl object-cover ring-2 ring-cyan-500/30"
//                       />
//                       {/* Online status pulse */}
//                       <motion.div
//                         className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#030712]"
//                         animate={{ scale: [1, 1.2, 1] }}
//                         transition={{ duration: 2, repeat: Infinity }}
//                       />
//                     </motion.div>
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <p className="font-semibold text-white truncate">{user.fullname}</p>
//                     {user.mode && (
//                       <span className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-full text-xs bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/20">
//                         <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
//                         {user.mode}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Quick stats */}
//                 <div className="mt-4 flex gap-2">
//                   <div className="flex-1 p-2 rounded-lg bg-white/5 text-center">
//                     <p className="text-lg font-bold text-cyan-300">{stats.createdSkills}</p>
//                     <p className="text-[10px] text-white/40">Skills</p>
//                   </div>
//                   <div className="flex-1 p-2 rounded-lg bg-white/5 text-center">
//                     <p className="text-lg font-bold text-purple-300">{stats.succesfullExchnage}</p>
//                     <p className="text-[10px] text-white/40">Exchanges</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Navigation Links */}
//               <motion.nav
//                 className="p-3 space-y-1 flex-1 overflow-y-auto"
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 <PremiumSidebarLink href="/dashboard" icon={<Home className="w-5 h-5" />} label="Dashboard" isActive />
//                 <PremiumSidebarLink href="/profile" icon={<User className="w-5 h-5" />} label="Profile" />
//                 <PremiumSidebarLink href="/Leaderboard" icon={<Crown className="w-5 h-5" />} label="Leaderboard" />
//                 <PremiumSidebarLink href="/chats" icon={<MessageCircle className="w-5 h-5" />} label="Chat" />
//                 <PremiumSidebarLink href="/my-skill" icon={<Layers className="w-5 h-5" />} label="My Skills" />
//                 <PremiumSidebarLink href="/request-recieved" icon={<Inbox className="w-5 h-5" />} label="Requests Received" />
//                 <PremiumSidebarLink href="/request-sent" icon={<CheckCircle className="w-5 h-5" />} label="Requests Sent" />

//                 {/* Notifications with badge */}
//                 <motion.button
//                   variants={sidebarItemVariants}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}  
//                   onClick={handleViewNotifications}
//                   className="group relative flex items-center gap-3 px-4 py-3 rounded-xl w-full text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 overflow-hidden"
//                   whileHover={{ x: 4 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
//                   <Bell className="w-5 h-5 relative z-10" />
//                   <span className="relative z-10 font-medium">Notifications</span>
//                   {unread > 0 && (
//                     <motion.span
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className="ml-auto relative z-10 px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/25"
//                     >
//                       {unread}
//                     </motion.span>
//                   )}
//                 </motion.button>

//                 <PremiumSidebarLink href="/settings" icon={<Settings className="w-5 h-5" />} label="Settings" />

//                 {/* Logout */}
//                 <motion.button
//                   variants={sidebarItemVariants}
//                   onClick={handleLogout}
//                   className="group relative flex items-center gap-3 px-4 py-3 rounded-xl w-full text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
//                   whileHover={{ x: 4 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <LogOut className="w-5 h-5" />
//                   <span className="font-medium">Logout</span>
//                 </motion.button>
//               </motion.nav>

//               {/* Pro tip card */}
//               <div className="p-3">
//                 <motion.div
//                   className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
//                   whileHover={{ scale: 1.02 }}
//                 >
//                   <div className="flex items-center gap-2 mb-2">
//                     <Sparkles className="w-4 h-4 text-cyan-400" />
//                     <span className="text-xs font-semibold text-cyan-300">Pro Tip</span>
//                   </div>
//                   <p className="text-xs text-white/60">
//                     Set your roadmap to get AI-powered skill recommendations
//                   </p>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.aside>
//         )}
//       </AnimatePresence>

//       {/* ================= MOBILE OVERLAY ================= */}
//       <AnimatePresence>
//         {showSidebar && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm sm:hidden"
//             onClick={() => setShowSidebar(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* ================= CONTENT ================= */}
//       <section ref={contentRef} className="flex-1 overflow-y-auto">
//         <motion.div
//           className="p-6 lg:p-8 max-w-6xl mx-auto"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* ===== PREMIUM HERO BANNER ===== */}
//           <motion.div
//             variants={sidebarItemVariants}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className="relative mb-8 p-8 rounded-3xl overflow-hidden"
//           >
//             {/* Hero background */}
//             <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10" />
//             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

//             {/* Floating effects */}
//             <motion.div
//               className="absolute top-0 right-0 w-64 h-64 rounded-full bg-cyan-500/20 blur-[80px]"
//               animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
//               transition={{ duration: 8, repeat: Infinity }}
//             />

//             <div className="relative z-10">
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//                 <div>
//                   <motion.div
//                     className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-4"
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     <Clock className="w-4 h-4" />
//                     {greeting}
//                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//                   </motion.div>

//                   <motion.h1
//                     className="text-4xl lg:text-5xl font-bold mb-3"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                   >
//                     <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
//                       Welcome back, {user.fullname.split(" ")[0]}
//                     </span>
//                   </motion.h1>

//                   <motion.p
//                     className="text-white/60 text-lg max-w-md"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.4 }}
//                   >
//                     Ready to level up your skills today? Your journey continues here.
//                   </motion.p>
//                 </div>

//                 {/* Mode badge */}
//                 {user.mode && (
//                   <motion.div
//                     className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.5 }}
//                   >
//                     <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
//                       {user.mode === "learning" && <GraduationCap className="w-5 h-5" />}
//                       {user.mode === "teaching" && <BookOpen className="w-5 h-5" />}
//                       {user.mode === "exchanging" && <RefreshCw className="w-5 h-5" />}
//                     </div>
//                     <div>
//                       <p className="text-xs text-white/50">Current Mode</p>
//                       <p className="font-semibold capitalize">{user.mode}</p>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>
//             </div>
//           </motion.div>

//           {/* ===== ROADMAP SECTION ===== */}
//           <motion.div   variants={sidebarItemVariants}
//   transition={{ type: "spring", stiffness: 300, damping: 30 }}className="mb-8">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
//                   <Target className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold">Your Roadmap</h2>
//                   <p className="text-sm text-white/50">AI-powered learning path</p>
//                 </div>
//               </div>

//               <motion.button
//                 onClick={() => setShowRoadmapModal(true)}
//                 className="group relative px-5 py-2.5 rounded-xl font-semibold overflow-hidden"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500" />
//                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
//                 <span className="relative z-10 flex items-center gap-2">
//                   <Rocket className="w-4 h-4" />
//                   Set Roadmap
//                 </span>
//               </motion.button>
//             </div>

//             {/* Roadmap badge */}
//             {user.advice && user.advice.length > 0 && (
//               <motion.div
//                 className="flex justify-center mb-4"
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 {aiMode === "fallback" ? (
//                   <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
//                     <Zap className="w-4 h-4" />
//                     Smart Offline Roadmap
//                   </span>
//                 ) : (
//                   <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
//                     <Bot className="w-4 h-4" />
//                     AI Generated Roadmap
//                     <motion.span
//                       className="w-2 h-2 rounded-full bg-emerald-400"
//                       animate={{ scale: [1, 1.3, 1] }}
//                       transition={{ duration: 1.5, repeat: Infinity }}
//                     />
//                   </span>
//                 )}
//               </motion.div>
//             )}

//             {/* Roadmap steps */}
//             {user.advice && user.advice.length > 0 ? (
//               <motion.div
//                 variants={containerVariants}
//                 className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10"
//               >
//                 {user.advice.map((step, index) => (
//                   <RoadmapStepCard
//                     key={step.step}
//                     step={step}
//                     isLast={index === user.advice!.length - 1}
//                     index={index}
//                   />
//                 ))}
//               </motion.div>
//             ) : (
//               <motion.div
//                 className="p-12 rounded-2xl bg-white/[0.02] border border-white/10 border-dashed text-center"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//               >
//                 <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
//                   <Target className="w-8 h-8 text-white/30" />
//                 </div>
//                 <p className="text-white/50 mb-2">No roadmap set yet</p>
//                 <p className="text-sm text-white/30">Click &ldquo;Set Roadmap&rdquo; to get AI-powered recommendations</p>
//               </motion.div>
//             )}
//           </motion.div>

//           {/* ===== MODE-SPECIFIC DASHBOARD ===== */}
//           <motion.div   
//             variants={sidebarItemVariants}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             {user.mode === "learning" && <LearningDashboard stats={stats} user={user} />}
//             {user.mode === "teaching" && <TeachingDashboard stats={stats} user={user} />}
//             {user.mode === "exchanging" && <ExchangeDashboard stats={stats} user={user} />}
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* ================= MODE MODAL ================= */}
//       <AnimatePresence>
//         {showModeModal && !user.mode && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="w-full max-w-lg p-8 rounded-3xl bg-[#0a0a0f] border border-white/10 shadow-2xl"
//             >
//               {/* Decorative elements */}
//               <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
//                 <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-cyan-500/10 blur-[80px]" />
//                 <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-purple-500/10 blur-[60px]" />
//               </div>

//               <div className="relative z-10">
//                 <div className="text-center mb-8">
//                   <motion.div
//                     className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"
//                     animate={{ rotate: [0, 5, -5, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   >
//                     <Sparkles className="w-8 h-8" />
//                   </motion.div>
//                   <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-2">
//                     Choose Your Path
//                   </h2>
//                   <p className="text-white/50">
//                     This helps personalize your dashboard. You can change it later.
//                   </p>
//                 </div>

//                 <div className="space-y-3 mb-6">
//                   {(["learning", "teaching", "exchanging"] as const).map((mode) => (
//                     <ModeCard
//                       key={mode}
//                       mode={mode}
//                       selected={selectedMode === mode}
//                       onSelect={() => setSelectedMode(mode)}
//                     />
//                   ))}
//                 </div>

//                 <motion.button
//                   onClick={handleSaveMode}
//                   disabled={!selectedMode || savingMode}
//                   className="w-full py-4 rounded-xl font-semibold relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
//                   whileHover={{ scale: selectedMode ? 1.02 : 1 }}
//                   whileTap={{ scale: selectedMode ? 0.98 : 1 }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
//                   <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 hover:opacity-100 transition-opacity" />
//                   <span className="relative z-10 flex items-center justify-center gap-2">
//                     {savingMode ? (
//                       <>
//                         <Loader2 className="w-5 h-5 animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         Continue
//                         <ArrowRight className="w-5 h-5" />
//                       </>
//                     )}
//                   </span>
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ================= ROADMAP MODAL ================= */}
//       <AnimatePresence>
//         {showRoadmapModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="relative w-full max-w-lg p-8 rounded-3xl bg-[#0a0a0f] border border-emerald-500/20 shadow-2xl shadow-emerald-500/10"
//             >
//               {/* Floating AI particles */}
//               <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
//                 <motion.div
//                   className="absolute top-10 right-10 w-2 h-2 rounded-full bg-emerald-400"
//                   animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
//                   transition={{ duration: 3, repeat: Infinity }}
//                 />
//                 <motion.div
//                   className="absolute bottom-20 left-10 w-1.5 h-1.5 rounded-full bg-teal-400"
//                   animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
//                   transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
//                 />
//                 <motion.div
//                   className="absolute top-1/2 right-8 w-1 h-1 rounded-full bg-cyan-400"
//                   animate={{ y: [0, -10, 0], opacity: [0.4, 0.9, 0.4] }}
//                   transition={{ duration: 2, repeat: Infinity, delay: 1 }}
//                 />
//                 <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-emerald-500/10 blur-[60px]" />
//               </div>

//               <div className="relative z-10">
//                 <div className="text-center mb-6">
//                   <motion.div
//                     className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"
//                     animate={{ scale: [1, 1.05, 1] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   >
//                     <Bot className="w-7 h-7" />
//                   </motion.div>
//                   <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent mb-2">
//                     Set Your Roadmap
//                   </h2>
//                   <p className="text-white/50 text-sm">
//                     Describe your goals and let AI create your personalized learning path
//                   </p>
//                 </div>

//                 <div className="relative mb-4">
//                   <textarea
//                     value={roadmapText}
//                     onChange={(e) => setRoadmapText(e.target.value)}
//                     placeholder="I want to learn React, improve design skills, master TypeScript..."
//                     className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none resize-none transition-all duration-300 text-white placeholder:text-white/30"
//                     rows={5}
//                   />
//                   {/* Animated focus glow */}
//                   <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 focus-within:opacity-100 -z-10 blur-xl transition-opacity" />
//                 </div>

//                 {roadmapMessage && (
//                   <motion.p
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className={`text-center mb-4 text-sm ${
//                       roadmapMessage.includes("Failed") ? "text-red-400" : "text-emerald-400"
//                     }`}
//                   >
//                     {roadmapMessage}
//                   </motion.p>
//                 )}

//                 <div className="flex gap-3">
//                   <motion.button
//                     onClick={() => setShowRoadmapModal(false)}
//                     className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-medium"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Cancel
//                   </motion.button>

//                   <motion.button
//                     onClick={async () => {
//                       if (!roadmapText.trim()) return alert("Please enter your roadmap");

//                       setSavingRoadmap(true);
//                       setRoadmapMessage("");

//                       try {
//                         const res = await fetch(`${API_URL}/generate-roadmap`, {
//                           method: "POST",
//                           headers: { "Content-Type": "application/json" },
//                           credentials: "include",
//                           body: JSON.stringify({ goal: roadmapText }),
//                         });

//                         const data = await res.json();

//                         if (!data.success) throw new Error(data.message || "Failed");

//                         setUser((prev) =>
//                           prev ? { ...prev, advice: data.roadmap } : prev
//                         );
//                         setAiMode(data.ai_mode || "ai");

//                         setRoadmapMessage("Roadmap saved successfully!");
//                         setRoadmapText("");
//                         setTimeout(() => setShowRoadmapModal(false), 1200);
//                       } catch (err) {
//                         console.error(err);
//                         setRoadmapMessage("Failed to save roadmap. Try again.");
//                       } finally {
//                         setSavingRoadmap(false);
//                       }
//                     }}
//                     disabled={savingRoadmap || !roadmapText.trim()}
//                     className="flex-1 py-3 rounded-xl font-semibold relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
//                     whileHover={{ scale: !savingRoadmap && roadmapText.trim() ? 1.02 : 1 }}
//                     whileTap={{ scale: !savingRoadmap && roadmapText.trim() ? 0.98 : 1 }}
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500" />
//                     <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 hover:opacity-100 transition-opacity" />
//                     <span className="relative z-10 flex items-center justify-center gap-2">
//                       {savingRoadmap ? (
//                         <>
//                           <Loader2 className="w-5 h-5 animate-spin" />
//                           Generating...
//                         </>
//                       ) : (
//                         <>
//                           <Sparkles className="w-5 h-5" />
//                           Generate
//                         </>
//                       )}
//                     </span>
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </main>
//   );
// }



"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
} from "lucide-react";

import LearningDashboard from "./dashboards/LearningDashboard";
import TeachingDashboard from "./dashboards/TeachingDashboard";
import ExchangeDashboard from "./dashboards/ExchangeingDashboard";

// const API_URL = "https://skillwrap-backend.onrender.com";
const API_URL = "http://localhost:4000";

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
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const sidebarItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

/* ================= SIDEBAR LINK COMPONENT ================= */
function PremiumSidebarLink({
  href,
  icon,
  label,
  isActive = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}) {
  const router = useRouter();

  return (
    <motion.button
      variants={sidebarItemVariants}
      onClick={() => router.push(href)}
      className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-300 overflow-hidden
        ${isActive 
          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300" 
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
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

      <span className={`relative z-10 ${isActive ? "text-cyan-400" : ""}`}>
        {icon}
      </span>
      <span className="relative z-10 font-medium">{label}</span>

      {isActive && (
        <motion.div
          className="absolute right-3 w-2 h-2 rounded-full bg-cyan-400"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
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

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl overflow-hidden"
    >
      {/* Gradient glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Top glow line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${color}`}>
            {icon}
          </div>
          {trend && (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {trend}
            </span>
          )}
        </div>

        <p className="text-3xl font-bold text-white mb-1">{count}</p>
        <p className="text-sm text-white/50">{label}</p>

        {/* Mini sparkline placeholder */}
        <div className="mt-3 flex items-end gap-0.5 h-6">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <motion.div
              key={i}
              className={`w-1 rounded-full bg-gradient-to-t ${color}`}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: delay + i * 0.05, duration: 0.5 }}
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

  return (
    <motion.div
      variants={itemVariants}
      className="relative"
    >
      {/* Vertical connecting line */}
      {!isLast && (
        <div className="absolute left-6 top-14 bottom-0 w-[2px]">
          <motion.div
            className="h-full bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          />
        </div>
      )}

      <motion.div
        onClick={() => setExpanded(!expanded)}
        className="group relative flex gap-4 cursor-pointer"
        whileHover={{ x: 4 }}
      >
        {/* Step number with glow */}
        <div className="relative">
          <motion.div
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-cyan-500/25"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {step.step}
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-xl bg-cyan-400/30 blur-xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-cyan-300">{step.skill}</h4>
            <motion.div
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4 text-white/40" />
            </motion.div>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-white/70 text-sm"
              >
                {step.description}
              </motion.p>
            )}
          </AnimatePresence>

          {!expanded && (
            <p className="text-white/50 text-sm line-clamp-1">{step.description}</p>
          )}
        </div>
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
      icon: <GraduationCap className="w-8 h-8" />,
      gradient: "from-cyan-500 to-blue-600",
      glow: "cyan",
      description: "Master new skills from expert teachers worldwide",
    },
    teaching: {
      icon: <BookOpen className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-600",
      glow: "purple",
      description: "Share your expertise and help others grow",
    },
    exchanging: {
      icon: <RefreshCw className="w-8 h-8" />,
      gradient: "from-amber-500 to-orange-600",
      glow: "amber",
      description: "Trade skills with others in a fair exchange",
    },
  }[mode] || { icon: <Star />, gradient: "from-gray-500 to-gray-600", glow: "gray", description: "" };

  return (
    <motion.button
      onClick={onSelect}
      className={`relative w-full p-5 rounded-2xl border text-left transition-all duration-300 overflow-hidden
        ${selected 
          ? `border-${config.glow}-500/50 bg-gradient-to-br ${config.gradient}/10` 
          : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
        }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Selected glow */}
      {selected && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-10`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
        />
      )}

      <div className="relative z-10 flex items-start gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${config.gradient}`}>
          {config.icon}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg capitalize">{mode}</h3>
            {selected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center"
              >
                <CheckCircle className="w-3 h-3" />
              </motion.div>
            )}
          </div>
          <p className="text-sm text-white/60">{config.description}</p>
        </div>
      </div>
    </motion.button>
  );
}

/* ================= MAIN COMPONENT ================= */
export default function DashboardPage() {
  const router = useRouter();
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

  const [greeting, setGreeting] = useState("");

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

        if (!res.ok) {
          router.replace("/login");
          return;
        }

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
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router]);

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
    router.replace("/login");
  }

  /* ================= VIEW NOTIFICATIONS ================= */
  async function handleViewNotifications() {
    setUnread(0);
    router.push("/notifications-route");
  }

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#030712] text-white gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-cyan-400" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/60"
        >
          Loading your dashboard...
        </motion.p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen flex bg-[#030712] text-white overflow-hidden">
      {/* ================= ANIMATED BACKGROUND ================= */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px]"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[80px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
      </div>

      {/* ================= MOBILE HAMBURGER ================= */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <motion.button
          onClick={() => setShowSidebar(true)}
          className="p-3 rounded-xl bg-white/10 text-white backdrop-blur-xl border border-white/10 hover:bg-white/20 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="sr-only">Open sidebar</span>
          <div className="space-y-1.5">
            <span className="block w-5 h-0.5 bg-white rounded-full"></span>
            <span className="block w-5 h-0.5 bg-white rounded-full"></span>
            <span className="block w-3 h-0.5 bg-white rounded-full"></span>
          </div>
        </motion.button>
      </div>

      {/* ================= FLOATING GLASS SIDEBAR ================= */}
      <AnimatePresence>
        {(showSidebar || typeof window !== "undefined") && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: showSidebar ? 0 : (typeof window !== "undefined" && window.innerWidth >= 640 ? 0 : -300), opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed sm:sticky inset-y-0 left-0 z-40 w-72 flex flex-col
              ${showSidebar ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
            `}
          >
            {/* Sidebar glass container */}
            <div className="m-3 flex-1 flex flex-col rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/20 overflow-hidden">
              {/* Close button for mobile */}
              <div className="sm:hidden flex justify-end p-3">
                <motion.button
                  onClick={() => setShowSidebar(false)}
                  className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Premium User Info */}
              <div className="px-5 py-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Image
                        src={user.img_url || "/default-avatar.png"}
                        alt="avatar"
                        width={48}
                        height={48}
                        unoptimized
                        className="rounded-xl object-cover ring-2 ring-cyan-500/30"
                      />
                      {/* Online status pulse */}
                      <motion.div
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#030712]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{user.fullname}</p>
                    {user.mode && (
                      <span className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-full text-xs bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {user.mode}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="mt-4 flex gap-2">
                  <div className="flex-1 p-2 rounded-lg bg-white/5 text-center">
                    <p className="text-lg font-bold text-cyan-300">{stats.createdSkills}</p>
                    <p className="text-[10px] text-white/40">Skills</p>
                  </div>
                  <div className="flex-1 p-2 rounded-lg bg-white/5 text-center">
                    <p className="text-lg font-bold text-purple-300">{stats.succesfullExchnage}</p>
                    <p className="text-[10px] text-white/40">Exchanges</p>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <motion.nav
                className="p-3 space-y-1 flex-1 overflow-y-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <PremiumSidebarLink href="/dashboard" icon={<Home className="w-5 h-5" />} label="Dashboard" isActive />
                <PremiumSidebarLink href="/profile" icon={<User className="w-5 h-5" />} label="Profile" />
                <PremiumSidebarLink href="/Leaderboard" icon={<Crown className="w-5 h-5" />} label="Leaderboard" />
                <PremiumSidebarLink href="/chats" icon={<MessageCircle className="w-5 h-5" />} label="Chat" />
                <PremiumSidebarLink href="/my-skill" icon={<Layers className="w-5 h-5" />} label="My Skills" />
                <PremiumSidebarLink href="/request-recieved" icon={<Inbox className="w-5 h-5" />} label="Requests Received" />
                <PremiumSidebarLink href="/request-sent" icon={<CheckCircle className="w-5 h-5" />} label="Requests Sent" />

                {/* Notifications with badge */}
                <motion.button
                  variants={sidebarItemVariants}
                  onClick={handleViewNotifications}
                  className="group relative flex items-center gap-3 px-4 py-3 rounded-xl w-full text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 overflow-hidden"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Bell className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 font-medium">Notifications</span>
                  {unread > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto relative z-10 px-2 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/25"
                    >
                      {unread}
                    </motion.span>
                  )}
                </motion.button>

                <PremiumSidebarLink href="/settings" icon={<Settings className="w-5 h-5" />} label="Settings" />

                {/* Logout */}
                <motion.button
                  variants={sidebarItemVariants}
                  onClick={handleLogout}
                  className="group relative flex items-center gap-3 px-4 py-3 rounded-xl w-full text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </motion.nav>

              {/* Pro tip card */}
              <div className="p-3">
                <motion.div
                  className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-semibold text-cyan-300">Pro Tip</span>
                  </div>
                  <p className="text-xs text-white/60">
                    Set your roadmap to get AI-powered skill recommendations
                  </p>
                </motion.div>
              </div>
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
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm sm:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}
      </AnimatePresence>

      {/* ================= CONTENT ================= */}
      <section ref={contentRef} className="flex-1 overflow-y-auto">
        <motion.div
          className="p-6 lg:p-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ===== PREMIUM HERO BANNER ===== */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8 p-8 rounded-3xl overflow-hidden"
          >
            {/* Hero background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

            {/* Floating effects */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 rounded-full bg-cyan-500/20 blur-[80px]"
              animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Clock className="w-4 h-4" />
                    {greeting}
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </motion.div>

                  <motion.h1
                    className="text-4xl lg:text-5xl font-bold mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                      Welcome back, {user.fullname.split(" ")[0]}
                    </span>
                  </motion.h1>

                  <motion.p
                    className="text-white/60 text-lg max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Ready to level up your skills today? Your journey continues here.
                  </motion.p>
                </div>

                {/* Mode badge */}
                {user.mode && (
                  <motion.div
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
                      {user.mode === "learning" && <GraduationCap className="w-5 h-5" />}
                      {user.mode === "teaching" && <BookOpen className="w-5 h-5" />}
                      {user.mode === "exchanging" && <RefreshCw className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-xs text-white/50">Current Mode</p>
                      <p className="font-semibold capitalize">{user.mode}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* ===== ROADMAP SECTION ===== */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Your Roadmap</h2>
                  <p className="text-sm text-white/50">AI-powered learning path</p>
                </div>
              </div>

              <motion.button
                onClick={() => setShowRoadmapModal(true)}
                className="group relative px-5 py-2.5 rounded-xl font-semibold overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
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
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
                    <Zap className="w-4 h-4" />
                    Smart Offline Roadmap
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
                    <Bot className="w-4 h-4" />
                    AI Generated Roadmap
                    <motion.span
                      className="w-2 h-2 rounded-full bg-emerald-400"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </span>
                )}
              </motion.div>
            )}

            {/* Roadmap steps */}
            {user.advice && user.advice.length > 0 ? (
              <motion.div
                variants={containerVariants}
                className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10"
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
                className="p-12 rounded-2xl bg-white/[0.02] border border-white/10 border-dashed text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                  <Target className="w-8 h-8 text-white/30" />
                </div>
                <p className="text-white/50 mb-2">No roadmap set yet</p>
                <p className="text-sm text-white/30">Click &ldquo;Set Roadmap&rdquo; to get AI-powered recommendations</p>
              </motion.div>
            )}
          </motion.div>

          {/* ===== MODE-SPECIFIC DASHBOARD ===== */}
          <motion.div variants={itemVariants}>
            {user.mode === "learning" && <LearningDashboard stats={stats} user={user} />}
            {user.mode === "teaching" && <TeachingDashboard stats={stats} user={user} />}
            {user.mode === "exchanging" && <ExchangeDashboard stats={stats} user={user} />}
          </motion.div>
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
              className="w-full max-w-lg p-8 rounded-3xl bg-[#0a0a0f] border border-white/10 shadow-2xl"
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-cyan-500/10 blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-purple-500/10 blur-[60px]" />
              </div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-8 h-8" />
                  </motion.div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-2">
                    Choose Your Path
                  </h2>
                  <p className="text-white/50">
                    This helps personalize your dashboard. You can change it later.
                  </p>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 hover:opacity-100 transition-opacity" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
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
              className="relative w-full max-w-lg p-8 rounded-3xl bg-[#0a0a0f] border border-emerald-500/20 shadow-2xl shadow-emerald-500/10"
            >
              {/* Floating AI particles */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-10 right-10 w-2 h-2 rounded-full bg-emerald-400"
                  animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-20 left-10 w-1.5 h-1.5 rounded-full bg-teal-400"
                  animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute top-1/2 right-8 w-1 h-1 rounded-full bg-cyan-400"
                  animate={{ y: [0, -10, 0], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-emerald-500/10 blur-[60px]" />
              </div>

              <div className="relative z-10">
                <div className="text-center mb-6">
                  <motion.div
                    className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Bot className="w-7 h-7" />
                  </motion.div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent mb-2">
                    Set Your Roadmap
                  </h2>
                  <p className="text-white/50 text-sm">
                    Describe your goals and let AI create your personalized learning path
                  </p>
                </div>

                <div className="relative mb-4">
                  <textarea
                    value={roadmapText}
                    onChange={(e) => setRoadmapText(e.target.value)}
                    placeholder="I want to learn React, improve design skills, master TypeScript..."
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none resize-none transition-all duration-300 text-white placeholder:text-white/30"
                    rows={5}
                  />
                  {/* Animated focus glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 focus-within:opacity-100 -z-10 blur-xl transition-opacity" />
                </div>

                {roadmapMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center mb-4 text-sm ${
                      roadmapMessage.includes("Failed") ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {roadmapMessage}
                  </motion.p>
                )}

                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setShowRoadmapModal(false)}
                    className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-medium"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
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
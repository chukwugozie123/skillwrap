"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  Variants,
} from "framer-motion";
import {
  Send,
  BookOpen,
  Search,
  Sparkles,
  Target,
  Zap,
  TrendingUp,
  Clock,
  Award,
  Users,
  ChevronRight,
  Copy,
  Gift,
  Star,
  Flame,
  BookMarked,
  GraduationCap,
  Crown,
  Activity,
  ArrowRight,
  Play,
  Trophy,
  BarChart3,
  Medal,
  Rocket,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import RecentActivity from "../components/RecentActivity";
import Achievements from "../components/Achievements";
import Image from "next/image";

// ============ ANIMATED COUNTER ============
function AnimatedCounter({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || value === 0) return;
    let start = 0;
    const end = value;
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
  }, [isVisible, value, duration]);

  return <span ref={ref}>{count}</span>;
}

// ============ FLOATING PARTICLE ============
function FloatingParticle({
  color,
  size,
  delay,
  duration,
  left,
}: {
  color: string;
  size: number;
  delay: number;
  duration: number;
  left: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-xl pointer-events-none"
      style={{
        background: color,
        width: size,
        height: size,
        left,
        bottom: "-10%",
      }}
      animate={{
        y: [0, -1000],
        x: [0, Math.random() * 100 - 50],
        opacity: [0, 0.6, 0.6, 0],
        scale: [0.5, 1, 1, 0.5],
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
function GlowCard({
  children,
  className = "",
  glowColor = "cyan",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
  };

  const glowColors: Record<string, string> = {
    cyan: "rgba(6, 182, 212, 0.15)",
    blue: "rgba(59, 130, 246, 0.15)",
    emerald: "rgba(16, 185, 129, 0.15)",
    amber: "rgba(251, 191, 36, 0.15)",
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor]}, transparent 70%)`
          : undefined,
      }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor]}, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>
      {children}
    </motion.div>
  );
}

// ============ STAT CARD ============
function PremiumStatCard({
  title,
  value,
  icon,
  color,
  delay = 0,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}) {
  const colorVariants: Record<
    string,
    { bg: string; border: string; iconBg: string; iconText: string; glow: string }
  > = {
    cyan: {
      bg: "from-cyan-500/10 via-cyan-500/5 to-transparent",
      border: "border-cyan-500/20",
      iconBg: "from-cyan-500/20 to-blue-500/20",
      iconText: "text-cyan-400",
      glow: "shadow-cyan-500/20",
    },
    blue: {
      bg: "from-blue-500/10 via-blue-500/5 to-transparent",
      border: "border-blue-500/20",
      iconBg: "from-blue-500/20 to-indigo-500/20",
      iconText: "text-blue-400",
      glow: "shadow-blue-500/20",
    },
    emerald: {
      bg: "from-emerald-500/10 via-emerald-500/5 to-transparent",
      border: "border-emerald-500/20",
      iconBg: "from-emerald-500/20 to-teal-500/20",
      iconText: "text-emerald-400",
      glow: "shadow-emerald-500/20",
    },
  };

  const variant = colorVariants[color] || colorVariants.cyan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlowCard glowColor={color}>
        <motion.div
          className={`relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${variant.bg} border ${variant.border} backdrop-blur-2xl overflow-hidden group`}
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div
              className="absolute inset-[-1px] rounded-2xl"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s linear infinite",
              }}
            />
          </div>

          {/* Glow orb */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-5">
              <motion.div
                className={`p-3.5 sm:p-4 rounded-xl bg-gradient-to-br ${variant.iconBg} border border-white/10 ${variant.iconText} shadow-lg ${variant.glow}`}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {icon}
              </motion.div>
            </div>

            <p className="text-sm text-slate-400 mb-2 font-medium uppercase tracking-wider">
              {title}
            </p>
            <p className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              <AnimatedCounter value={value} />
            </p>
          </div>

          {/* Bottom glow line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </GlowCard>
    </motion.div>
  );
}

// ============ PROGRESS RING ============
function ProgressRing({
  progress,
  size = 100,
  strokeWidth = 8,
  color = "cyan",
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const colorMap: Record<string, { stroke: string; glow: string }> = {
    cyan: { stroke: "#06b6d4", glow: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))" },
    blue: { stroke: "#3b82f6", glow: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))" },
    emerald: { stroke: "#10b981", glow: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))" },
  };

  const colorStyle = colorMap[color] || colorMap.cyan;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorStyle.stroke} />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ strokeDasharray: circumference, filter: colorStyle.glow }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">Progress</span>
      </div>
    </div>
  );
}

// ============ FEATURE CARD ============
function PremiumFeatureCard({
  icon,
  title,
  desc,
  href,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  accent: string;
}) {
  const accentColors: Record<string, { gradient: string; border: string; glow: string }> = {
    cyan: {
      gradient: "from-cyan-500 to-blue-500",
      border: "border-cyan-400/30",
      glow: "shadow-cyan-500/20",
    },
    emerald: {
      gradient: "from-emerald-500 to-teal-500",
      border: "border-emerald-400/30",
      glow: "shadow-emerald-500/20",
    },
  };

  const colors = accentColors[accent] || accentColors.cyan;

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlowCard glowColor={accent} className="h-full block">
        <motion.div
          className="relative h-full p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/[0.06] backdrop-blur-2xl overflow-hidden group"
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Top glow line */}
          <div
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          />

          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className={`absolute inset-[-1px] rounded-2xl bg-gradient-to-r ${colors.gradient}`}
              style={{
                padding: "1px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                opacity: 0.3,
              }}
            />
          </div>

          {/* Background glow */}
          <div
            className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${colors.gradient} blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
          />

          <div className="relative z-10">
            <motion.div
              className={`inline-flex p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${colors.gradient} mb-6 shadow-lg ${colors.glow}`}
              whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-white">{icon}</div>
            </motion.div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
              {desc}
            </p>

            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-semibold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
              >
                Explore
              </span>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <ChevronRight
                  size={18}
                  className="text-cyan-400 group-hover:translate-x-1 transition-transform"
                />
              </motion.div>
            </div>
          </div>

          {/* Bottom glow */}
          <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </GlowCard>
    </motion.a>
  );
}

// ============ ACHIEVEMENT BADGE ============
function AchievementBadge({
  icon,
  title,
  unlocked,
  progress,
}: {
  icon: React.ReactNode;
  title: string;
  unlocked: boolean;
  progress?: number;
}) {
  return (
    <motion.div
      className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
        unlocked
          ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30"
          : "bg-slate-900/60 border-white/[0.06] opacity-60 hover:opacity-80"
      }`}
      whileHover={{ scale: unlocked ? 1.02 : 1, y: unlocked ? -2 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Glow for unlocked */}
      {unlocked && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
      )}

      <div
        className={`relative p-3 rounded-xl ${
          unlocked
            ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400"
            : "bg-slate-800/80 border border-white/5 text-slate-600"
        }`}
      >
        {icon}
        {unlocked && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span
          className={`text-sm font-semibold truncate ${unlocked ? "text-white" : "text-slate-500"}`}
        >
          {title}
        </span>
        {!unlocked && progress !== undefined && progress > 0 && (
          <div className="mt-1.5">
            <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface ActivityItem {
  id: number;
  user_id: number;
  activity_type: string;
  title: string;
  description?: string;
  icon?: string;
  color?: string;
  created_at: string;
}

// ============ LEVEL PROGRESS RING ============
function LevelProgressRing({
  level,
  progress,
  size = 140,
}: {
  level: number;
  progress: number;
  size?: number;
}) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl animate-pulse" style={{ animationDuration: '3s' }} />

      <svg className="transform -rotate-90" width={size} height={size}>
        <defs>
          <linearGradient id="levelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#levelGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
          style={{ strokeDasharray: circumference, filter: "url(#glow)" }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Crown size={16} className="text-amber-400" />
            <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Level</span>
          </div>
          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-200 to-blue-300">
            {level}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// ============ STAT CHIP ============
function StatChip({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: "cyan" | "amber" | "emerald" | "rose" | "blue" | "purple";
}) {
  const colors = {
    cyan: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400",
    amber: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400",
    emerald: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    rose: "from-rose-500/20 to-pink-500/20 border-rose-500/30 text-rose-400",
    blue: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400",
    purple: "from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-400",
  };

  return (
    <motion.div
      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r ${colors[color]} border backdrop-blur-sm`}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="text-current">{icon}</div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg font-bold text-white">{value}</span>
        <span className="text-xs text-slate-400">{label}</span>
      </div>
    </motion.div>
  );
}

// ============ MILESTONE CARD ============
function MilestoneCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: "cyan" | "amber" | "emerald";
}) {
  const colors = {
    cyan: {
      gradient: "from-cyan-500 to-blue-500",
      bg: "from-cyan-500/10 to-blue-500/10",
      border: "border-cyan-500/20",
      text: "text-cyan-400",
      glow: "shadow-cyan-500/20",
    },
    amber: {
      gradient: "from-amber-500 to-orange-500",
      bg: "from-amber-500/10 to-orange-500/10",
      border: "border-amber-500/20",
      text: "text-amber-400",
      glow: "shadow-amber-500/20",
    },
    emerald: {
      gradient: "from-emerald-500 to-teal-500",
      bg: "from-emerald-500/10 to-teal-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      glow: "shadow-emerald-500/20",
    },
  };

  const c = colors[color];

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Animated border */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${c.gradient} opacity-30 blur-sm animate-pulse`}
        style={{ animationDuration: '3s' }}
      />

      <div className={`relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br ${c.bg} border ${c.border} backdrop-blur-xl`}>
        {/* Background glow */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${c.gradient} blur-3xl opacity-20`} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              className={`p-2.5 rounded-xl bg-gradient-to-br ${c.gradient} text-white shadow-lg ${c.glow}`}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
            <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">{title}</span>
          </div>

          <p className="text-3xl font-bold text-white mb-1">{value}</p>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>

        {/* Bottom glow line */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-current to-transparent ${c.text} opacity-50`} />
      </div>
    </motion.div>
  );
}

// ============ ACHIEVEMENT PROGRESS CARD ============
function AchievementProgressCard({
  unlocked,
  total,
}: {
  unlocked: number;
  total: number;
}) {
  const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;
  const remaining = total - unlocked;

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Gradient border glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/30 to-orange-500/20 opacity-40 blur-sm" />

      <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-950/95 border border-white/[0.06] backdrop-blur-xl">
        {/* Background effect */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Trophy size={20} />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-white">Achievements</h3>
                <p className="text-xs text-slate-500">Your progress</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{percentage}%</p>
              <p className="text-xs text-slate-500">Complete</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative h-3 rounded-full bg-slate-800/80 overflow-hidden mb-4">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            />
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                animation: "shimmer 2s linear infinite",
                backgroundSize: "200% 100%",
              }}
            />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
              <span className="text-slate-400">
                <span className="text-white font-semibold">{unlocked}</span> Unlocked
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="text-slate-400">
                <span className="text-white font-semibold">{remaining}</span> Remaining
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============ MAIN COMPONENT ============
export default function LearningDashboard({
  stats,
  user,
}: {
  stats: { sendRequests: number; succesfullExchnage: number };
  user: {
    username?: string;
    email?: string;
    img_url?: string;
    created_at?: string;
    points?: number;
    referral_code?: string;
    streak?: number;
    xp?: number;
  };
}) {
  const API_URL = "http://localhost:4000";

  
  const [copied, setCopied] = useState(false);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculate level from XP
  const xp = user?.xp ?? 0;
  const level = Math.floor(xp / 300) + 1;
  const currentLevelXP = xp % 300;
  const xpRemaining = 300 - currentLevelXP;
  const levelProgress = (currentLevelXP / 300) * 100;

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
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const res = await fetch(`${API_URL}/achievements/achievement/user`, {
          credentials: "include",
        });
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
        const res = await fetch(`${API_URL}/activity/get`, {
          credentials: "include",
        });
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
  const totalAchievements = achievements.length;

  return (
    <motion.div
      className="relative min-h-screen bg-slate-950"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ============ PREMIUM ANIMATED BACKGROUND ============ */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-500/15 to-blue-600/10 blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500/12 to-indigo-600/8 blur-[100px]"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-teal-500/10 to-cyan-500/6 blur-[90px]"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <FloatingParticle
              key={i}
              color={`linear-gradient(135deg, rgba(6, 182, 212, 0.6), rgba(59, 130, 246, 0.4))`}
              size={Math.random() * 6 + 4}
              delay={i * 2.5}
              duration={15 + Math.random() * 10}
              left={`${Math.random() * 100}%`}
            />
          ))}
        </div>

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

        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(15,23,42,0.4)_100%)]" />
      </div>

      {/* ============ CONTENT CONTAINER ============ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ============ HERO SECTION ============ */}
        <motion.div variants={itemVariants} className="relative mb-12">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Animated border */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  "linear-gradient(90deg, #06b6d4, #3b82f6, #06b6d4, #3b82f6)",
                backgroundSize: "300% 100%",
                animation: "shimmer 4s linear infinite",
                padding: "1px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            <div className="relative px-6 py-10 sm:px-10 sm:py-14 bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-slate-900/90 backdrop-blur-3xl">
              {/* Background effects */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
              </div>

              {/* Mesh grid */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(6, 182, 212, 0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: "60px 60px",
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-500/30 text-cyan-300 text-sm font-semibold mb-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  </div>
                  Learning Mode Active
                </motion.div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-5 leading-tight">
                  <span className="text-white">Your Learning </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 animate-gradient-x">
                    Journey
                  </span>
                </h1>

                <p className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed">
                  Discover new skills, connect with expert mentors, and track your growth.
                  Every lesson brings you closer to mastery.
                </p>

                {/* Quick stats from existing values */}
                <div className="flex flex-wrap gap-4 sm:gap-8">
                  {user?.streak !== undefined && (
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/20 text-orange-400">
                        <Flame size={20} />
                      </div>
                      <div>
                        <p className="text-2xl sm:text-3xl font-bold text-white">{user.streak}</p>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">Day Streak</p>
                      </div>
                    </div>
                  )}
                  {totalAchievements > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/20 text-amber-400">
                        <Award size={20} />
                      </div>
                      <div>
                        <p className="text-2xl sm:text-3xl font-bold text-white">
                          {unlockedAchievements}
                        </p>
                        <p className="text-xs text-slate-500 uppercase tracking-wider">
                          Achievements
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============ PREMIUM PROFILE HERO ============ */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated gradient border */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)",
                backgroundSize: "300% 300%",
                animation: "gradient-x 4s ease infinite",
                padding: "1px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            <div className="relative p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-slate-900/95 via-slate-800/80 to-slate-900/95 backdrop-blur-3xl">
              {/* Background effects */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gradient-to-br from-purple-500/15 to-indigo-500/10"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
              </div>

              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="relative z-10">
                {/* Top row: Avatar + User info + Level ring */}
                <div className="flex flex-col xl:flex-row items-start xl:items-center gap-8 mb-8">
                  {/* Avatar with animated ring */}
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative">
                      {/* Rotating gradient ring */}
                      <motion.div
                        className="absolute inset-[-6px] rounded-full"
                        style={{
                          background: "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4)",
                          backgroundSize: "300% 300%",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-[-3px] rounded-full bg-slate-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
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
                        {/* Online badge */}
                        <motion.div
                          className="absolute bottom-1 right-1 p-1 rounded-full bg-emerald-500 border-2 border-slate-900"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <div className="w-3 h-3 rounded-full bg-white" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* User info */}
                    <div className="text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 mb-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">{user?.username}</h2>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                          <GraduationCap size={14} />
                          Learner
                        </span>
                      </div>
                      <p className="text-slate-400 mb-1">{user?.email}</p>
                      {user?.created_at && (
                        <p className="text-sm text-slate-500">
                          Member since {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Level Progress Ring - Desktop */}
                  <div className="hidden xl:flex flex-1 justify-end">
                    <LevelProgressRing level={level} progress={levelProgress} size={160} />
                  </div>
                </div>

                {/* Player Stats Chips */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <StatChip
                    icon={<Flame size={16} />}
                    label="Day Streak"
                    value={user?.streak ?? 0}
                    color="rose"
                  />
                  <StatChip
                    icon={<Star size={16} />}
                    label="Points"
                    value={user?.points ?? 0}
                    color="amber"
                  />
                  <StatChip
                    icon={<Zap size={16} />}
                    label="XP Earned"
                    value={xp}
                    color="purple"
                  />
                  <StatChip
                    icon={<Trophy size={16} />}
                    label="Achievements"
                    value={`${unlockedAchievements}/${totalAchievements}`}
                    color="cyan"
                  />
                  <StatChip
                    icon={<BookOpen size={16} />}
                    label="Lessons"
                    value={stats?.succesfullExchnage ?? 0}
                    color="emerald"
                  />
                  <StatChip
                    icon={<Send size={16} />}
                    label="Requests"
                    value={stats?.sendRequests ?? 0}
                    color="blue"
                  />
                </div>

                {/* Mobile Level Progress */}
                <div className="xl:hidden mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Crown size={18} className="text-amber-400" />
                      <span className="text-white font-bold text-lg">Level {level}</span>
                    </div>
                    <span className="text-sm text-slate-400">
                      {currentLevelXP}/300 XP
                    </span>
                  </div>
                  <div className="relative h-3 rounded-full bg-slate-800/80 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${levelProgress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    {xpRemaining} XP until Level {level + 1}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============ LEVEL & MILESTONE CARDS ============ */}
        <motion.div variants={itemVariants} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          <MilestoneCard
            title="Next Level"
            value={`Level ${level + 1}`}
            subtitle={`${xpRemaining} XP needed`}
            icon={<Rocket size={20} />}
            color="cyan"
          />
          <AchievementProgressCard unlocked={unlockedAchievements} total={totalAchievements} />
          <MilestoneCard
            title="Learning Streak"
            value={`${user?.streak ?? 0} Days`}
            subtitle={user?.streak && user.streak > 0 ? "Keep it going!" : "Start your streak today"}
            icon={<Flame size={20} />}
            color="amber"
          />
        </motion.div>

        {/* ============ LEARNING SUMMARY ============ */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-px rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/10 to-blue-500/20 opacity-50 blur-sm" />

            <div className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/[0.06] backdrop-blur-xl">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <BarChart3 size={24} />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Your Learning Summary</h3>
                    <p className="text-sm text-slate-500">A quick overview of your progress</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Dynamic summary cards */}
                  {stats?.succesfullExchnage !== undefined && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-800/30 border border-white/[0.04]">
                      <p className="text-sm text-slate-400 mb-1">Lessons Completed</p>
                      <p className="text-xl font-bold text-white">
                        {stats.succesfullExchnage > 0
                          ? `You've completed ${stats.succesfullExchnage} learning exchange${stats.succesfullExchnage !== 1 ? 's' : ''}.`
                          : "Start your first learning exchange today!"}
                      </p>
                    </div>
                  )}

                  {unlockedAchievements > 0 && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-800/30 border border-white/[0.04]">
                      <p className="text-sm text-slate-400 mb-1">Achievements Unlocked</p>
                      <p className="text-xl font-bold text-white">
                        You've unlocked {unlockedAchievements} achievement{unlockedAchievements !== 1 ? 's' : ''}.
                      </p>
                    </div>
                  )}

                  {user?.streak !== undefined && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-800/30 border border-white/[0.04]">
                      <p className="text-sm text-slate-400 mb-1">Current Streak</p>
                      <p className="text-xl font-bold text-white">
                        {user.streak > 0
                          ? `You're on a ${user.streak}-day learning streak!`
                          : "Start your learning streak today!"}
                      </p>
                    </div>
                  )}

                  {user?.points !== undefined && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-800/30 border border-white/[0.04]">
                      <p className="text-sm text-slate-400 mb-1">Points Earned</p>
                      <p className="text-xl font-bold text-white">
                        You have earned {user.points} point{user.points !== 1 ? 's' : ''}.
                      </p>
                    </div>
                  )}

                  {xp > 0 && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-800/30 border border-white/[0.04]">
                      <p className="text-sm text-slate-400 mb-1">Experience Points</p>
                      <p className="text-xl font-bold text-white">
                        You have accumulated {xp} XP.
                      </p>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-800/30 border border-white/[0.04]">
                    <p className="text-sm text-slate-400 mb-1">Level Progress</p>
                    <p className="text-xl font-bold text-white">
                      {xpRemaining > 0
                        ? `Only ${xpRemaining} XP until Level ${level + 1}!`
                        : "You're ready to level up!"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============ STATS GRID ============ */}
        <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-6 mb-10">
          <PremiumStatCard
            title="Requests Sent"
            value={stats?.sendRequests || 0}
            icon={<Send size={24} />}
            color="cyan"
            delay={0}
          />
          <PremiumStatCard
            title="Lessons Completed"
            value={stats?.succesfullExchnage || 0}
            icon={<BookOpen size={24} />}
            color="emerald"
            delay={0.1}
          />
        </motion.div>

        {/* ============ ACTIVITY & ACHIEVEMENTS ============ */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-10">
          <div className="xl:col-span-3 order-2 xl:order-1">
            <RecentActivity activities={activities} loading={loading} />
          </div>
          <div className="xl:col-span-2 order-1 xl:order-2">
            <Achievements achievements={achievements} />
          </div>
        </motion.div>

        {/* ============ REFERRAL SECTION ============ */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Animated gradient border */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(90deg, #f59e0b, #f97316, #eab308, #22c55e, #14b8a6, #06b6d4, #3b82f6, #f59e0b)",
                backgroundSize: "400% 100%",
                animation: "shimmer 6s linear infinite",
                padding: "1px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                opacity: 0.6,
              }}
            />

            <div className="relative p-6 sm:p-10 bg-gradient-to-br from-slate-900/95 via-slate-800/80 to-slate-900/95 backdrop-blur-3xl border border-white/[0.06]">
              {/* Background glows */}
              <div className="absolute top-0 right-0 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl" />

              <div className="relative z-10 text-center">
                <motion.div
                  className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-6"
                  whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Gift className="text-amber-400" size={32} />
                </motion.div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Invite Friends & Earn Points
                </h3>
                <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm sm:text-base">
                  Share your referral link and earn rewards when someone signs up!
                </p>

                <div className="flex flex-col sm:flex-row items-stretch gap-3 max-w-xl mx-auto">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      readOnly
                      value={`https://skillwrap2026.vercel.app/signup?ref=${user?.referral_code}`}
                      className="w-full px-5 py-4 rounded-xl bg-slate-800/60 border border-white/[0.08] text-white text-sm font-mono focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <motion.button
                    onClick={handleCopyReferral}
                    className={`px-8 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                      copied
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/30"
                        : "bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/30 hover:shadow-amber-500/50"
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
                          <motion.svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="text-white"
                          >
                            <motion.path
                              d="M20 6L9 17l-5-5"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.svg>
                        </motion.div>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        <span>Copy</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============ ACTIONS SECTION ============ */}
        <motion.div variants={itemVariants}>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              What would you like to do next?
            </h2>
            <p className="text-slate-400 max-w-xl text-sm sm:text-base">
              Explore skills shared by experts, send learning requests, and keep track of the
              lessons you complete along the way.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pb-8">
            <PremiumFeatureCard
              icon={<Search size={28} />}
              title="Explore New Skills"
              desc="Browse skills shared by others and find something exciting to learn today."
              href="/skills"
              accent="cyan"
            />
            <PremiumFeatureCard
              icon={<Send size={28} />}
              title="My Learning Requests"
              desc="Monitor requests you've sent and track their progress."
              href="/request-sent"
              accent="emerald"
            />
          </div>
        </motion.div>
      </div>

      {/* ============ STYLE TAG FOR ANIMATIONS ============ */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </motion.div>
  );
}








// "use client";

// import {
//   motion,
//   useMotionValue,
//   useSpring,
//   useTransform,
//   AnimatePresence,
//   Variants
// } from "framer-motion";
// import {
//   Send,
//   BookOpen,
//   Search,
//   Sparkles,
//   Target,
//   Zap,
//   TrendingUp,
//   Clock,
//   Award,
//   Users,
//   ChevronRight,
//   Copy,
//   Gift,
//   Star,
//   Flame,
//   BookMarked,
//   GraduationCap,
//   Crown,
//   Activity,
//   ArrowRight,
//   Play,
// } from "lucide-react";
// import { useState, useEffect, useRef } from "react";
// import RecentActivity from "../components/RecentActivity";
// import Achievements from "../components/Achievements";

// // ============ ANIMATED COUNTER ============
// function AnimatedCounter({
//   value,
//   duration = 2,
// }: {
//   value: number;
//   duration?: number;
// }) {
//   const [count, setCount] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const ref = useRef<HTMLSpanElement>(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) setIsVisible(true);
//       },
//       { threshold: 0.5 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

//   useEffect(() => {
//     if (!isVisible || value === 0) return;
//     let start = 0;
//     const end = value;
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
//   }, [isVisible, value, duration]);

//   return <span ref={ref}>{count}</span>;
// }

// // ============ FLOATING PARTICLE ============
// function FloatingParticle({
//   color,
//   size,
//   delay,
//   duration,
//   left,
// }: {
//   color: string;
//   size: number;
//   delay: number;
//   duration: number;
//   left: string;
// }) {
//   return (
//     <motion.div
//       className="absolute rounded-full blur-xl pointer-events-none"
//       style={{
//         background: color,
//         width: size,
//         height: size,
//         left,
//         bottom: "-10%",
//       }}
//       animate={{
//         y: [0, -1000],
//         x: [0, Math.random() * 100 - 50],
//         opacity: [0, 0.6, 0.6, 0],
//         scale: [0.5, 1, 1, 0.5],
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
// function GlowCard({
//   children,
//   className = "",
//   glowColor = "cyan",
// }: {
//   children: React.ReactNode;
//   className?: string;
//   glowColor?: string;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!ref.current) return;
//     const rect = ref.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setMousePosition({ x, y });
//     mouseX.set(x);
//     mouseY.set(y);
//   };

//   const glowColors: Record<string, string> = {
//     cyan: "rgba(6, 182, 212, 0.15)",
//     blue: "rgba(59, 130, 246, 0.15)",
//     emerald: "rgba(16, 185, 129, 0.15)",
//     amber: "rgba(251, 191, 36, 0.15)",
//   };

//   return (
//     <motion.div
//       ref={ref}
//       className={`relative overflow-hidden ${className}`}
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       style={{
//         background: isHovered
//           ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor]}, transparent 70%)`
//           : undefined,
//       }}
//     >
//       <AnimatePresence>
//         {isHovered && (
//           <motion.div
//             className="absolute inset-0 pointer-events-none"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             style={{
//               background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor]}, transparent 70%)`,
//             }}
//           />
//         )}
//       </AnimatePresence>
//       {children}
//     </motion.div>
//   );
// }

// // ============ STAT CARD ============
// function PremiumStatCard({
//   title,
//   value,
//   icon,
//   trend,
//   color,
//   delay = 0,
// }: {
//   title: string;
//   value: number;
//   icon: React.ReactNode;
//   trend?: number;
//   color: string;
//   delay?: number;
// }) {
//   const colorVariants: Record<
//     string,
//     { bg: string; border: string; iconBg: string; iconText: string; glow: string }
//   > = {
//     cyan: {
//       bg: "from-cyan-500/10 via-cyan-500/5 to-transparent",
//       border: "border-cyan-500/20",
//       iconBg: "from-cyan-500/20 to-blue-500/20",
//       iconText: "text-cyan-400",
//       glow: "shadow-cyan-500/20",
//     },
//     blue: {
//       bg: "from-blue-500/10 via-blue-500/5 to-transparent",
//       border: "border-blue-500/20",
//       iconBg: "from-blue-500/20 to-indigo-500/20",
//       iconText: "text-blue-400",
//       glow: "shadow-blue-500/20",
//     },
//     emerald: {
//       bg: "from-emerald-500/10 via-emerald-500/5 to-transparent",
//       border: "border-emerald-500/20",
//       iconBg: "from-emerald-500/20 to-teal-500/20",
//       iconText: "text-emerald-400",
//       glow: "shadow-emerald-500/20",
//     },
//   };

//   const variant = colorVariants[color] || colorVariants.cyan;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
//     >
//       <GlowCard glowColor={color}>
//         <motion.div
//           className={`relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${variant.bg} border ${variant.border} backdrop-blur-2xl overflow-hidden group`}
//           whileHover={{ y: -6, scale: 1.02 }}
//           transition={{ type: "spring", stiffness: 400, damping: 25 }}
//         >
//           {/* Animated border */}
//           <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
//             <div
//               className="absolute inset-[-1px] rounded-2xl"
//               style={{
//                 background:
//                   "linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)",
//                 backgroundSize: "200% 100%",
//                 animation: "shimmer 2s linear infinite",
//               }}
//             />
//           </div>

//           {/* Glow orb */}
//           <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//           <div className="relative z-10">
//             <div className="flex items-start justify-between mb-5">
//               <motion.div
//                 className={`p-3.5 sm:p-4 rounded-xl bg-gradient-to-br ${variant.iconBg} border border-white/10 ${variant.iconText} shadow-lg ${variant.glow}`}
//                 whileHover={{ rotate: [0, -10, 10, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {icon}
//               </motion.div>
//               {trend !== undefined && (
//                 <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full font-semibold">
//                   <TrendingUp size={12} />
//                   <span>+{trend}%</span>
//                 </div>
//               )}
//             </div>

//             <p className="text-sm text-slate-400 mb-2 font-medium uppercase tracking-wider">
//               {title}
//             </p>
//             <p className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
//               <AnimatedCounter value={value} />
//             </p>
//           </div>

//           {/* Bottom glow line */}
//           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//         </motion.div>
//       </GlowCard>
//     </motion.div>
//   );
// }

// // ============ PROGRESS RING ============
// function ProgressRing({
//   progress,
//   size = 100,
//   strokeWidth = 8,
//   color = "cyan",
// }: {
//   progress: number;
//   size?: number;
//   strokeWidth?: number;
//   color?: string;
// }) {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = radius * 2 * Math.PI;
//   const offset = circumference - (progress / 100) * circumference;

//   const colorMap: Record<string, { stroke: string; glow: string }> = {
//     cyan: { stroke: "#06b6d4", glow: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))" },
//     blue: { stroke: "#3b82f6", glow: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))" },
//     emerald: { stroke: "#10b981", glow: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))" },
//   };

//   const colorStyle = colorMap[color] || colorMap.cyan;

//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       <svg className="transform -rotate-90" width={size} height={size}>
//         <defs>
//           <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor={colorStyle.stroke} />
//             <stop offset="100%" stopColor="#0ea5e9" />
//           </linearGradient>
//         </defs>
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           stroke="rgba(255,255,255,0.08)"
//           strokeWidth={strokeWidth}
//           fill="none"
//         />
//         <motion.circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           stroke="url(#progressGradient)"
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeLinecap="round"
//           initial={{ strokeDashoffset: circumference }}
//           animate={{ strokeDashoffset: offset }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           style={{ strokeDasharray: circumference, filter: colorStyle.glow }}
//         />
//       </svg>
//       <div className="absolute inset-0 flex flex-col items-center justify-center">
//         <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
//         <span className="text-[10px] text-slate-500 uppercase tracking-wider">Progress</span>
//       </div>
//     </div>
//   );
// }

// // ============ FEATURE CARD ============
// function PremiumFeatureCard({
//   icon,
//   title,
//   desc,
//   href,
//   accent,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   desc: string;
//   href: string;
//   accent: string;
// }) {
//   const accentColors: Record<string, { gradient: string; border: string; glow: string }> = {
//     cyan: {
//       gradient: "from-cyan-500 to-blue-500",
//       border: "border-cyan-400/30",
//       glow: "shadow-cyan-500/20",
//     },
//     emerald: {
//       gradient: "from-emerald-500 to-teal-500",
//       border: "border-emerald-400/30",
//       glow: "shadow-emerald-500/20",
//     },
//   };

//   const colors = accentColors[accent] || accentColors.cyan;

//   return (
//     <motion.a
//       href={href}
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//     >
//       <GlowCard glowColor={accent} className="h-full block">
//         <motion.div
//           className="relative h-full p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/[0.06] backdrop-blur-2xl overflow-hidden group"
//           whileHover={{ scale: 1.02, y: -4 }}
//           transition={{ type: "spring", stiffness: 400, damping: 25 }}
//         >
//           {/* Top glow line */}
//           <div
//             className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
//           />

//           {/* Animated gradient border */}
//           <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//             <div
//               className={`absolute inset-[-1px] rounded-2xl bg-gradient-to-r ${colors.gradient}`}
//               style={{
//                 padding: "1px",
//                 WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
//                 WebkitMaskComposite: "xor",
//                 maskComposite: "exclude",
//                 opacity: 0.3,
//               }}
//             />
//           </div>

//           {/* Background glow */}
//           <div
//             className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${colors.gradient} blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
//           />

//           <div className="relative z-10">
//             <motion.div
//               className={`inline-flex p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${colors.gradient} mb-6 shadow-lg ${colors.glow}`}
//               whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="text-white">{icon}</div>
//             </motion.div>

//             <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
//               {title}
//             </h3>
//             <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
//               {desc}
//             </p>

//             <div className="flex items-center gap-2">
//               <span
//                 className={`text-sm font-semibold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}
//               >
//                 Explore
//               </span>
//               <motion.div
//                 whileHover={{ x: 4 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 25 }}
//               >
//                 <ChevronRight
//                   size={18}
//                   className="text-cyan-400 group-hover:translate-x-1 transition-transform"
//                 />
//               </motion.div>
//             </div>
//           </div>

//           {/* Bottom glow */}
//           <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//         </motion.div>
//       </GlowCard>
//     </motion.a>
//   );
// }

// // ============ ACHIEVEMENT BADGE ============
// function AchievementBadge({
//   icon,
//   title,
//   unlocked,
//   progress,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   unlocked: boolean;
//   progress?: number;
// }) {
//   return (
//     <motion.div
//       className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
//         unlocked
//           ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30"
//           : "bg-slate-900/60 border-white/[0.06] opacity-60 hover:opacity-80"
//       }`}
//       whileHover={{ scale: unlocked ? 1.02 : 1, y: unlocked ? -2 : 0 }}
//       transition={{ type: "spring", stiffness: 400, damping: 25 }}
//     >
//       {/* Glow for unlocked */}
//       {unlocked && (
//         <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
//       )}

//       <div
//         className={`relative p-3 rounded-xl ${
//           unlocked
//             ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400"
//             : "bg-slate-800/80 border border-white/5 text-slate-600"
//         }`}
//       >
//         {icon}
//         {unlocked && (
//           <motion.div
//             className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900"
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 500, damping: 25 }}
//           />
//         )}
//       </div>
//       <div className="flex-1 min-w-0">
//         <span
//           className={`text-sm font-semibold truncate ${unlocked ? "text-white" : "text-slate-500"}`}
//         >
//           {title}
//         </span>
//         {!unlocked && progress !== undefined && progress > 0 && (
//           <div className="mt-1.5">
//             <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
//               <motion.div
//                 className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
//                 initial={{ width: 0 }}
//                 animate={{ width: `${progress}%` }}
//                 transition={{ duration: 1, ease: "easeOut" }}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }

// interface ActivityItem {
//   id: number;
//   user_id: number;
//   activity_type: string;
//   title: string;
//   description?: string;
//   icon?: string;
//   color?: string;
//   created_at: string;
// }

// // ============ MAIN COMPONENT ============
// export default function LearningDashboard({
//   stats,
//   user,
// }: {
//   stats: { sendRequests: number; succesfullExchnage: number };
//   user: {
//     username?: string;
//     email?: string;
//     img_url?: string;
//     created_at?: string;
//     points?: number;
//     referral_code?: string;
//     streak?: number;
//   };
// }) {
//   const API_URL = "http://localhost:4000";
//   const [copied, setCopied] = useState(false);
//   const [achievements, setAchievements] = useState<any[]>([]);
//   const [activities, setActivities] = useState<ActivityItem[]>([]);
//   const [loading, setLoading] = useState(true);

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
//       transition: { staggerChildren: 0.08 },
//     },
//   };

// const itemVariants: Variants = {
//   hidden: {
//     opacity: 0,
//     y: 50,
//     filter: "blur(12px)",
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     transition: {
//       type: "spring",
//       stiffness: 80,
//       damping: 15,
//     },
//   },
// };

//   useEffect(() => {
//     async function fetchAchievements() {
//       try {
//         const res = await fetch(`${API_URL}/achievements/achievement/user`, {
//           credentials: "include",
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

//   const unlockedAchievements = achievements.filter((a) => a.unlocked).length;
//   const totalAchievements = achievements.length;

//   return (
//     <motion.div
//       className="relative min-h-screen bg-slate-950"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* ============ PREMIUM ANIMATED BACKGROUND ============ */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         {/* Base gradient */}
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950" />

//         {/* Animated gradient orbs */}
//         <motion.div
//           className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-cyan-500/15 to-blue-600/10 blur-[120px]"
//           animate={{
//             x: [0, 50, 0],
//             y: [0, 30, 0],
//             scale: [1, 1.1, 1],
//           }}
//           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500/12 to-indigo-600/8 blur-[100px]"
//           animate={{
//             x: [0, -40, 0],
//             y: [0, 40, 0],
//             scale: [1, 1.15, 1],
//           }}
//           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//         />
//         <motion.div
//           className="absolute -bottom-40 left-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-teal-500/10 to-cyan-500/6 blur-[90px]"
//           animate={{
//             x: [0, 30, 0],
//             y: [0, -30, 0],
//             scale: [1, 1.05, 1],
//           }}
//           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
//         />

//         {/* Floating particles */}
//         <div className="absolute inset-0">
//           {[...Array(8)].map((_, i) => (
//             <FloatingParticle
//               key={i}
//               color={`linear-gradient(135deg, rgba(6, 182, 212, 0.6), rgba(59, 130, 246, 0.4))`}
//               size={Math.random() * 6 + 4}
//               delay={i * 2.5}
//               duration={15 + Math.random() * 10}
//               left={`${Math.random() * 100}%`}
//             />
//           ))}
//         </div>

//         {/* Grid overlay */}
//         <div
//           className="absolute inset-0 opacity-[0.015]"
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(56, 189, 248, 0.5) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(56, 189, 248, 0.5) 1px, transparent 1px)
//             `,
//             backgroundSize: "80px 80px",
//           }}
//         />

//         {/* Radial gradient overlay for depth */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(15,23,42,0.4)_100%)]" />
//       </div>

//       {/* ============ CONTENT CONTAINER ============ */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         {/* ============ HERO SECTION ============ */}
//         <motion.div variants={itemVariants} className="relative mb-12">
//           <div className="relative overflow-hidden rounded-3xl">
//             {/* Animated border */}
//             <div
//               className="absolute inset-0 rounded-3xl"
//               style={{
//                 background:
//                   "linear-gradient(90deg, #06b6d4, #3b82f6, #06b6d4, #3b82f6)",
//                 backgroundSize: "300% 100%",
//                 animation: "shimmer 4s linear infinite",
//                 padding: "1px",
//                 WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
//                 WebkitMaskComposite: "xor",
//                 maskComposite: "exclude",
//               }}
//             />

//             <div className="relative px-6 py-10 sm:px-10 sm:py-14 bg-gradient-to-br from-slate-900/90 via-slate-800/70 to-slate-900/90 backdrop-blur-3xl">
//               {/* Background effects */}
//               <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
//                 <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
//               </div>

//               {/* Mesh grid */}
//               <div
//                 className="absolute inset-0 opacity-20"
//                 style={{
//                   backgroundImage: `
//                     linear-gradient(rgba(6, 182, 212, 0.08) 1px, transparent 1px),
//                     linear-gradient(90deg, rgba(6, 182, 212, 0.08) 1px, transparent 1px)
//                   `,
//                   backgroundSize: "60px 60px",
//                 }}
//               />

//               <div className="relative z-10">
//                 <motion.div
//                   className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-500/30 text-cyan-300 text-sm font-semibold mb-8"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.3, duration: 0.5 }}
//                 >
//                   <div className="relative">
//                     <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
//                     <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
//                   </div>
//                   Learning Mode Active
//                 </motion.div>

//                 <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-5 leading-tight">
//                   <span className="text-white">Your Learning </span>
//                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 animate-gradient-x">
//                     Journey
//                   </span>
//                 </h1>

//                 <p className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed">
//                   Discover new skills, connect with expert mentors, and track your growth.
//                   Every lesson brings you closer to mastery.
//                 </p>

//                 {/* Quick stats from existing values */}
//                 <div className="flex flex-wrap gap-4 sm:gap-8">
//                   {user?.streak !== undefined && (
//                     <div className="flex items-center gap-3">
//                       <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/20 text-orange-400">
//                         <Flame size={20} />
//                       </div>
//                       <div>
//                         <p className="text-2xl sm:text-3xl font-bold text-white">{user.streak}</p>
//                         <p className="text-xs text-slate-500 uppercase tracking-wider">Day Streak</p>
//                       </div>
//                     </div>
//                   )}
//                   {totalAchievements > 0 && (
//                     <div className="flex items-center gap-3">
//                       <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/20 text-amber-400">
//                         <Award size={20} />
//                       </div>
//                       <div>
//                         <p className="text-2xl sm:text-3xl font-bold text-white">
//                           {unlockedAchievements}
//                         </p>
//                         <p className="text-xs text-slate-500 uppercase tracking-wider">
//                           Achievements
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* ============ PROFILE CARD ============ */}
//         <motion.div variants={itemVariants} className="mb-12">
//           <div className="relative rounded-2xl overflow-hidden">
//             {/* Gradient border glow */}
//             <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-cyan-500/30 opacity-50 blur-sm" />

//             <div className="relative p-6 sm:p-8 bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-3xl border border-white/[0.06]">
//               {/* Background glow */}
//               <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />

//               <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
//                 {/* Avatar Section */}
//                 <div className="flex flex-col sm:flex-row items-center gap-6">
//                   <div className="relative group">
//                     {/* Animated glow ring */}
//                     <motion.div
//                       className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-lg"
//                       animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
//                       transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                     />
//                     <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-40 animate-pulse" style={{ animationDuration: '3s' }} />

//                     <img
//                       src={user?.img_url || "/avatar.png"}
//                       alt="Profile"
//                       width={110}
//                       height={110}
//                       className="relative rounded-full border-2 border-white/20 ring-4 ring-slate-950 object-cover"
//                       style={{ width: 110, height: 110 }}
//                     />

//                     {/* Online indicator */}
//                     <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-emerald-500 border-3 border-slate-950 shadow-lg shadow-emerald-500/50">
//                       <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
//                     </div>
//                   </div>

//                   {/* User Info - Mobile */}
//                   <div className="flex flex-col items-center sm:items-start lg:hidden">
//                     <div className="flex items-center gap-3 mb-1">
//                       <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
//                       <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
//                         Learner
//                       </span>
//                     </div>
//                     <p className="text-slate-400 text-sm mb-1">{user?.email}</p>
//                     {user?.created_at && (
//                       <p className="text-xs text-slate-500">
//                         Joined {new Date(user.created_at).toLocaleDateString()}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* User Info - Desktop */}
//                 <div className="hidden lg:flex flex-1 flex-col items-start">
//                   <div className="flex items-center gap-4 mb-1">
//                     <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
//                     <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
//                       Learner
//                     </span>
//                   </div>
//                   <p className="text-slate-400 mb-1">{user?.email}</p>
//                   {user?.created_at && (
//                     <p className="text-sm text-slate-500">
//                       Joined {new Date(user.created_at).toLocaleDateString()}
//                     </p>
//                   )}
//                 </div>

//                 {/* Points & Stats */}
//                 <div className="flex flex-wrap items-center gap-4 lg:gap-6">
//                   {/* Points */}
//                   <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500/15 to-yellow-500/10 border border-amber-400/20 shadow-lg shadow-amber-500/10">
//                     <Star className="text-amber-400" size={22} />
//                     <div>
//                       <p className="text-2xl font-bold text-amber-300">
//                         {user?.points ?? 0}
//                       </p>
//                       <p className="text-xs text-amber-400/70 uppercase tracking-wider">Points</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Progress Ring - Desktop */}
//                 <div className="hidden xl:block">
//                   <ProgressRing progress={65} color="cyan" size={110} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* ============ STATS GRID ============ */}
//         <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-6 mb-12">
//           <PremiumStatCard
//             title="Requests Sent"
//             value={stats?.sendRequests || 0}
//             icon={<Send size={24} />}
//             trend={12}
//             color="cyan"
//             delay={0}
//           />
//           <PremiumStatCard
//             title="Lessons Completed"
//             value={stats?.succesfullExchnage || 0}
//             icon={<BookOpen size={24} />}
//             trend={8}
//             color="emerald"
//             delay={0.1}
//           />
//         </motion.div>

//         {/* ============ INSIGHT CARD ============ */}
//         <motion.div variants={itemVariants} className="mb-12">
//           <div className="relative rounded-2xl overflow-hidden">
//             <div className="absolute inset-px rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-cyan-500/20 opacity-50 blur-sm" />

//             <div className="relative p-6 sm:p-8 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-slate-900/50 border border-cyan-500/20 backdrop-blur-xl">
//               {/* Glow orbs */}
//               <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />
//               <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-blue-500/15 rounded-full blur-2xl" />

//               <div className="relative z-10 flex flex-col sm:flex-row items-start gap-5">
//                 <motion.div
//                   className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400"
//                   whileHover={{ rotate: [0, -10, 10, 0] }}
//                   transition={{ duration: 0.6 }}
//                 >
//                   <Sparkles size={28} />
//                 </motion.div>
//                 <div>
//                   <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
//                     Your learning journey
//                   </h3>
//                   <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
//                     Learning mode helps you grow by connecting you with people who are ready to teach.
//                     The more you learn, the stronger your profile becomes.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* ============ ACTIVITY & ACHIEVEMENTS ============ */}
//         <motion.div variants={itemVariants} className="grid lg:grid-cols-5 gap-6 mb-12">
//           <div className="lg:col-span-3">
//             <RecentActivity activities={activities} loading={loading} />
//           </div>
//           <div className="lg:col-span-2">
//             <Achievements achievements={achievements} />
//           </div>
//         </motion.div>

//         {/* ============ REFERRAL SECTION ============ */}
//         <motion.div variants={itemVariants} className="mb-12">
//           <div className="relative rounded-2xl overflow-hidden">
//             {/* Animated gradient border */}
//             <div
//               className="absolute inset-0 rounded-2xl"
//               style={{
//                 background:
//                   "linear-gradient(90deg, #f59e0b, #f97316, #eab308, #22c55e, #14b8a6, #06b6d4, #3b82f6, #f59e0b)",
//                 backgroundSize: "400% 100%",
//                 animation: "shimmer 6s linear infinite",
//                 padding: "1px",
//                 WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
//                 WebkitMaskComposite: "xor",
//                 maskComposite: "exclude",
//                 opacity: 0.6,
//               }}
//             />

//             <div className="relative p-6 sm:p-10 bg-gradient-to-br from-slate-900/95 via-slate-800/80 to-slate-900/95 backdrop-blur-3xl border border-white/[0.06]">
//               {/* Background glows */}
//               <div className="absolute top-0 right-0 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl" />
//               <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl" />

//               <div className="relative z-10 text-center">
//                 <motion.div
//                   className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-6"
//                   whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <Gift className="text-amber-400" size={32} />
//                 </motion.div>

//                 <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
//                   Invite Friends & Earn Points
//                 </h3>
//                 <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm sm:text-base">
//                   Share your referral link and earn rewards when someone signs up!
//                 </p>

//                 <div className="flex flex-col sm:flex-row items-stretch gap-3 max-w-xl mx-auto">
//                   <div className="flex-1 relative">
//                     <input
//                       type="text"
//                       readOnly
//                       value={`https://skillwrap2026.vercel.app/signup?ref=${user?.referral_code}`}
//                       className="w-full px-5 py-4 rounded-xl bg-slate-800/60 border border-white/[0.08] text-white text-sm font-mono focus:outline-none focus:border-cyan-500/50 transition-colors"
//                     />
//                   </div>
//                   <motion.button
//                     onClick={handleCopyReferral}
//                     className={`px-8 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
//                       copied
//                         ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/30"
//                         : "bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/30 hover:shadow-amber-500/50"
//                     }`}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     {copied ? (
//                       <>
//                         <motion.div
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           transition={{ type: "spring", stiffness: 500 }}
//                         >
//                           <motion.svg
//                             width="18"
//                             height="18"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="3"
//                             className="text-white"
//                           >
//                             <motion.path
//                               d="M20 6L9 17l-5-5"
//                               initial={{ pathLength: 0 }}
//                               animate={{ pathLength: 1 }}
//                               transition={{ duration: 0.3 }}
//                             />
//                           </motion.svg>
//                         </motion.div>
//                         <span>Copied!</span>
//                       </>
//                     ) : (
//                       <>
//                         <Copy size={18} />
//                         <span>Copy</span>
//                       </>
//                     )}
//                   </motion.button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* ============ ACTIONS SECTION ============ */}
//         <motion.div variants={itemVariants}>
//           <div className="mb-6">
//             <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
//               What would you like to do next?
//             </h2>
//             <p className="text-slate-400 max-w-xl text-sm sm:text-base">
//               Explore skills shared by experts, send learning requests, and keep track of the
//               lessons you complete along the way.
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 gap-6 pb-8">
//             <PremiumFeatureCard
//               icon={<Search size={28} />}
//               title="Explore New Skills"
//               desc="Browse skills shared by others and find something exciting to learn today."
//               href="/skills"
//               accent="cyan"
//             />
//             <PremiumFeatureCard
//               icon={<Send size={28} />}
//               title="My Learning Requests"
//               desc="Monitor requests you've sent and track their progress."
//               href="/request-sent"
//               accent="emerald"
//             />
//           </div>
//         </motion.div>
//       </div>

//       {/* ============ STYLE TAG FOR ANIMATIONS ============ */}
//       <style>{`
//         @keyframes shimmer {
//           0% { background-position: -200% 0; }
//           100% { background-position: 200% 0; }
//         }
//         .animate-shimmer {
//           animation: shimmer 2s linear infinite;
//         }
//         @keyframes gradient-x {
//           0%, 100% { background-position: 0% center; }
//           50% { background-position: 100% center; }
//         }
//         .animate-gradient-x {
//           background-size: 200% auto;
//           animation: gradient-x 3s ease infinite;
//         }
//       `}</style>
//     </motion.div>
//   );
// }

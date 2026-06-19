"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Send, BookOpen, Search, Sparkles, Target, Zap, TrendingUp, Clock, Award, Users, ChevronRight, Copy, Gift, Star, Flame, BookMarked, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

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
function FloatingOrb({ color, size, delay, duration, x, y }: any) {
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

// ============ GLOW CARD ============
function GlowCard({ children, className = "", glowColor = "cyan" }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowColors: Record<string, string> = {
    cyan: "rgba(6, 182, 212, 0.15)",
    blue: "rgba(59, 130, 246, 0.15)",
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
    >
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor]}, transparent 70%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

// ============ STAT CARD ============
function PremiumStatCard({ title, value, icon, trend, color }: any) {
  const colorVariants: Record<string, { bg: string; border: string; icon: string; glow: string }> = {
    cyan: {
      bg: "from-cyan-500/10 to-blue-500/10",
      border: "border-cyan-500/20",
      icon: "text-cyan-400",
      glow: "shadow-cyan-500/20",
    },
    blue: {
      bg: "from-blue-500/10 to-indigo-500/10",
      border: "border-blue-500/20",
      icon: "text-blue-400",
      glow: "shadow-blue-500/20",
    },
    green: {
      bg: "from-emerald-500/10 to-teal-500/10",
      border: "border-emerald-500/20",
      icon: "text-emerald-400",
      glow: "shadow-emerald-500/20",
    },
  };

  const variant = colorVariants[color] || colorVariants.cyan;

  return (
    <GlowCard glowColor={color}>
      <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${variant.bg} border ${variant.border} backdrop-blur-xl overflow-hidden`}>
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-shimmer`} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${variant.icon}`}>
              {icon}
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
function ProgressRing({ progress, size = 80, strokeWidth = 6, color = "cyan" }: any) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const colorMap: Record<string, string> = {
    cyan: "#06b6d4",
    blue: "#3b82f6",
    green: "#10b981",
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
          stroke={colorMap[color]}
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
function PremiumFeatureCard({ icon, title, desc, href }: any) {
  return (
    <Link href={href}>
      <GlowCard className="h-full">
        <motion.div
          className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden group"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Hover glow line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 w-fit mb-4 text-cyan-400">
              {icon}
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-400 mb-4">{desc}</p>
            
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
              <span>Explore</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </GlowCard>
    </Link>
  );
}

// ============ ACHIEVEMENT BADGE ============
function AchievementBadge({ icon, title, unlocked }: any) {
  return (
    <motion.div
      className={`flex items-center gap-3 p-3 rounded-xl border ${
        unlocked
          ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20"
          : "bg-white/5 border-white/10 opacity-50"
      }`}
      whileHover={{ scale: unlocked ? 1.02 : 1 }}
    >
      <div className={`p-2 rounded-lg ${unlocked ? "bg-cyan-500/20 text-cyan-400" : "bg-white/10 text-gray-500"}`}>
        {icon}
      </div>
      <span className={`text-sm font-medium ${unlocked ? "text-white" : "text-gray-500"}`}>{title}</span>
    </motion.div>
  );
}

// ============ MAIN COMPONENT ============
export default function LearningDashboard({ stats, user }: any) {
  const [copied, setCopied] = useState(false);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`https://skillwrap2026.vercel.app/signup?ref=${user?.referral_code}`);
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

  return (
    <motion.div
      className="relative min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ============ FLOATING ORBS ============ */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingOrb color="linear-gradient(135deg, #06b6d4, #3b82f6)" size="400px" delay={0} duration={8} x="10%" y="20%" />
        <FloatingOrb color="linear-gradient(135deg, #3b82f6, #8b5cf6)" size="300px" delay={2} duration={10} x="70%" y="60%" />
        <FloatingOrb color="linear-gradient(135deg, #06b6d4, #10b981)" size="250px" delay={4} duration={12} x="80%" y="10%" />
      </div>

      {/* ============ HERO SECTION ============ */}
      <motion.div variants={itemVariants} className="relative mb-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/20 p-8 md:p-10">
          {/* Animated mesh background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
          </div>
          
          {/* Glow effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Learning Mode Active
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Your Learning </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Journey
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mb-8">
              Discover new skills, connect with expert mentors, and track your growth. Every lesson brings you closer to mastery.
            </p>
            
            {/* Quick stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Flame size={18} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">7</p>
                  <p className="text-xs text-gray-400">Day Streak</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <Target size={18} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-xs text-gray-400">Active Goals</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Award size={18} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-xs text-gray-400">Achievements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============ PROFILE CARD ============ */}
      <motion.div variants={itemVariants} className="mb-10">
        <GlowCard>
          <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-lg opacity-50" />
                <Image
                  src={user?.img_url || "/avatar.png"}
                  alt="Profile"
                  width={100}
                  height={100}
                  unoptimized
                  className="relative rounded-full border-2 border-cyan-400/40"
                />
                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 border-2 border-[#0a0a0f]">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
                  <span className="px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                    Learner
                  </span>
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

              {/* Progress Ring */}
              <div className="flex flex-col items-center gap-2">
                <ProgressRing progress={65} color="cyan" />
                <p className="text-xs text-gray-400">Level Progress</p>
              </div>
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* ============ INSIGHT CARD ============ */}
      <motion.div variants={itemVariants} className="mb-10">
        <div className="relative p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Your learning journey</h3>
              <p className="text-gray-400">
                Learning mode helps you grow by connecting you with people who are ready to teach. 
                The more you learn, the stronger your profile becomes.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============ STATS GRID ============ */}
      <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-6 mb-10">
        <PremiumStatCard
          title="Requests Sent"
          value={stats?.sendRequests || 0}
          icon={<Send size={20} />}
          trend={12}
          color="cyan"
        />
        <PremiumStatCard
          title="Lessons Completed"
          value={stats?.succesfullExchnage || 0}
          icon={<BookOpen size={20} />}
          trend={8}
          color="blue"
        />
      </motion.div>

      {/* ============ ACHIEVEMENTS ============ */}
      <motion.div variants={itemVariants} className="mb-10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Award className="text-cyan-400" size={20} />
          Recent Achievements
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AchievementBadge icon={<Flame size={18} />} title="First Lesson" unlocked={true} />
          <AchievementBadge icon={<Target size={18} />} title="Goal Setter" unlocked={true} />
          <AchievementBadge icon={<BookMarked size={18} />} title="Quick Learner" unlocked={true} />
          <AchievementBadge icon={<Users size={18} />} title="Connected" unlocked={false} />
          <AchievementBadge icon={<GraduationCap size={18} />} title="Scholar" unlocked={false} />
          <AchievementBadge icon={<Zap size={18} />} title="Speed Demon" unlocked={false} />
        </div>
      </motion.div>

      {/* ============ REFERRAL SECTION ============ */}
      <motion.div variants={itemVariants} className="mb-10">
        <GlowCard>
          <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/20 backdrop-blur-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 mb-4">
                <Gift className="text-cyan-400" size={28} />
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
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                />
                <motion.button
                  onClick={handleCopyReferral}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/25 transition-shadow"
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
        <h2 className="text-xl font-bold text-white mb-2">What would you like to do next?</h2>
        <p className="text-gray-400 mb-6 max-w-xl">
          Explore skills shared by experts, send learning requests, and keep track of the lessons you complete along the way.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <PremiumFeatureCard
            icon={<Search size={24} />}
            title="Explore New Skills"
            desc="Browse skills shared by others and find something exciting to learn today."
            href="/skills"
          />
          <PremiumFeatureCard
            icon={<Send size={24} />}
            title="My Learning Requests"
            desc="Monitor requests you've sent and track their progress."
            href="/request-sent"
          />
        </div>
      </motion.div>

      {/* Shimmer animation keyframes */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </motion.div>
  );
}
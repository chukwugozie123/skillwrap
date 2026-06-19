"use client";

import { motion } from "framer-motion";
import { Layers, Inbox, Trophy, Sparkles, Plus, Crown, Star, Users, TrendingUp, Award, ChevronRight, Copy, Gift, Zap, Target, BookOpen, Mic, Video } from "lucide-react";
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
function GlowCard({ children, className = "", glowColor = "purple" }: any) {
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
    purple: "rgba(168, 85, 247, 0.15)",
    pink: "rgba(236, 72, 153, 0.15)",
    fuchsia: "rgba(217, 70, 239, 0.15)",
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
  const colorVariants: Record<string, { bg: string; border: string; icon: string }> = {
    purple: {
      bg: "from-purple-500/10 to-fuchsia-500/10",
      border: "border-purple-500/20",
      icon: "text-purple-400",
    },
    pink: {
      bg: "from-pink-500/10 to-rose-500/10",
      border: "border-pink-500/20",
      icon: "text-pink-400",
    },
    fuchsia: {
      bg: "from-fuchsia-500/10 to-purple-500/10",
      border: "border-fuchsia-500/20",
      icon: "text-fuchsia-400",
    },
    amber: {
      bg: "from-amber-500/10 to-yellow-500/10",
      border: "border-amber-500/20",
      icon: "text-amber-400",
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
function ProgressRing({ progress, size = 80, strokeWidth = 6, color = "purple" }: any) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const colorMap: Record<string, string> = {
    purple: "#a855f7",
    pink: "#ec4899",
    fuchsia: "#d946ef",
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
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/20 w-fit mb-4 text-purple-400">
              {icon}
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
    </Link>
  );
}

// ============ IMPACT METRIC ============
function ImpactMetric({ icon, value, label }: any) {
  return (
    <motion.div
      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
        {icon}
      </div>
      <div>
        <p className="text-lg font-bold text-white">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </motion.div>
  );
}

// ============ REPUTATION BADGE ============
function ReputationBadge({ level, title }: { level: number; title: string }) {
  const badges = [
    { min: 0, color: "from-gray-500 to-gray-600", label: "Beginner" },
    { min: 10, color: "from-green-500 to-emerald-600", label: "Rising" },
    { min: 50, color: "from-blue-500 to-cyan-600", label: "Skilled" },
    { min: 100, color: "from-purple-500 to-fuchsia-600", label: "Expert" },
    { min: 500, color: "from-amber-500 to-yellow-600", label: "Master" },
  ];

  const badge = badges.reverse().find(b => level >= b.min) || badges[0];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${badge.color}`}>
      <Crown size={14} className="text-white" />
      <span className="text-xs font-semibold text-white">{title || badge.label} Mentor</span>
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function TeachingDashboard({ stats, user }: any) {
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
        <FloatingOrb color="linear-gradient(135deg, #a855f7, #ec4899)" size="400px" delay={0} duration={8} x="10%" y="20%" />
        <FloatingOrb color="linear-gradient(135deg, #d946ef, #8b5cf6)" size="300px" delay={2} duration={10} x="70%" y="60%" />
        <FloatingOrb color="linear-gradient(135deg, #ec4899, #f43f5e)" size="250px" delay={4} duration={12} x="80%" y="10%" />
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
              <ImpactMetric icon={<Users size={18} />} value="24" label="Students Taught" />
              <ImpactMetric icon={<Star size={18} />} value="4.9" label="Avg Rating" />
              <ImpactMetric icon={<Award size={18} />} value="8" label="Achievements" />
            </div>
          </div>
        </div>
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
                  src={user?.img_url || "/avatar.png"}
                  alt="Profile"
                  width={100}
                  height={100}
                  unoptimized
                  className="relative rounded-full border-2 border-purple-400/40"
                />
                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-purple-500 border-2 border-[#0a0a0f]">
                  <Crown size={12} className="text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
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
              <Link href="/create-skill">
                <motion.button
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={18} />
                  Create Skill
                </motion.button>
              </Link>
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
          icon={<Layers size={20} />}
          trend={15}
          color="purple"
        />
        <PremiumStatCard
          title="Requests Received"
          value={stats?.receivedRequests || 0}
          icon={<Inbox size={20} />}
          trend={23}
          color="pink"
        />
        <PremiumStatCard
          title="Successful Teachings"
          value={stats?.succesfullExchnage || 0}
          icon={<Trophy size={20} />}
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
          <motion.div
            className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20 cursor-pointer"
            whileHover={{ scale: 1.02, borderColor: "rgba(168, 85, 247, 0.4)" }}
          >
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 w-fit mb-3">
              <Video size={20} />
            </div>
            <h4 className="text-white font-medium mb-1">Record Lesson</h4>
            <p className="text-xs text-gray-400">Create video content</p>
          </motion.div>
          <motion.div
            className="p-4 rounded-xl bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 border border-fuchsia-500/20 cursor-pointer"
            whileHover={{ scale: 1.02, borderColor: "rgba(217, 70, 239, 0.4)" }}
          >
            <div className="p-2 rounded-lg bg-fuchsia-500/20 text-fuchsia-400 w-fit mb-3">
              <Mic size={20} />
            </div>
            <h4 className="text-white font-medium mb-1">Voice Notes</h4>
            <p className="text-xs text-gray-400">Quick audio tips</p>
          </motion.div>
          <motion.div
            className="p-4 rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20 cursor-pointer"
            whileHover={{ scale: 1.02, borderColor: "rgba(236, 72, 153, 0.4)" }}
          >
            <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 w-fit mb-3">
              <BookOpen size={20} />
            </div>
            <h4 className="text-white font-medium mb-1">Write Guide</h4>
            <p className="text-xs text-gray-400">Share written content</p>
          </motion.div>
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
            icon={<Layers size={24} />}
            title="Manage Your Skills"
            desc="Create, update, and refine the skills you offer to learners."
            href="/my-skill"
          />
          <PremiumFeatureCard
            icon={<Inbox size={24} />}
            title="Student Requests"
            desc="Review, accept, or decline learning requests from students."
            href="/request-recieved"
          />
        </div>
      </motion.div>

      {/* Shimmer animation */}
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
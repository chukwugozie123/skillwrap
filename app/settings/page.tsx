"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import {
  Edit3,
  LogOut,
  User,
  ChevronRight,
  KeyRound,
  CheckCircle,
  X,
  Bell,
  Shield,
  Brain,
  Moon,
  Sun,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Download,
  HelpCircle,
  Sparkles,
  Zap,
  Settings as SettingsIcon,
  Palette,
  Volume2,
  Mail,
  Smartphone,
  Clock,
  Award,
  Target,
  MessageCircle,
} from "lucide-react";

interface UserType {
  id: number;
  username: string;
  fullname: string;
  email: string;
  avatar?: string;
  bio?: string;
  mode?: string;
  img_url?: string;
}

const MODES = ["learning", "teaching", "exchanging"];

// ============ ANIMATION VARIANTS ============
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};
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
      className="fixed rounded-full blur-[120px] pointer-events-none"
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

// ============ SETTINGS CARD ============
function SettingsCard({
  icon: Icon,
  title,
  description,
  onClick,
  color = "cyan",
  children,
  expanded = false,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick?: () => void;
  color?: string;
  children?: React.ReactNode;
  expanded?: boolean;
}) {
  const colorClasses: Record<string, string> = {
    cyan: "from-cyan-500/20 to-blue-500/20 text-cyan-400",
    purple: "from-purple-500/20 to-pink-500/20 text-purple-400",
    emerald: "from-emerald-500/20 to-teal-500/20 text-emerald-400",
    amber: "from-amber-500/20 to-orange-500/20 text-amber-400",
    rose: "from-rose-500/20 to-red-500/20 text-rose-400",
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.01, y: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden"
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${colorClasses[color]} opacity-0 transition-opacity duration-500`}
        animate={{ opacity: isHovered ? 0.3 : 0 }}
      />

      <div className="relative">
        <button
          onClick={onClick}
          className="w-full flex justify-between items-center p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-white text-sm">{title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{description}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 90 : 0, x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-4 pt-2">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ============ TOGGLE SWITCH ============
function Toggle({
  enabled,
  onChange,
  label,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className="flex items-center gap-3"
    >
      {label && <span className="text-sm text-slate-300">{label}</span>}
      <div
        className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
          enabled ? "bg-cyan-500" : "bg-slate-700"
        }`}
      >
        <motion.div
          animate={{ x: enabled ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
        />
      </div>
    </button>
  );
}

// ============ MODE SELECTION CARD ============
function ModeCard({
  mode,
  isSelected,
  onClick,
}: {
  mode: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const modeConfig: Record<string, { icon: React.ElementType; gradient: string; description: string }> = {
    learning: {
      icon: Brain,
      gradient: "from-cyan-500 to-blue-500",
      description: "Focus on acquiring new skills from mentors",
    },
    teaching: {
      icon: Award,
      gradient: "from-purple-500 to-pink-500",
      description: "Share your expertise with eager learners",
    },
    exchanging: {
      icon: Target,
      gradient: "from-emerald-500 to-teal-500",
      description: "Trade skills with other community members",
    },
  };

  const config = modeConfig[mode];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
        isSelected
          ? `bg-gradient-to-br ${config.gradient} border-white/40 shadow-lg`
          : "bg-slate-800/50 border-white/10 hover:border-white/20"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`p-2 rounded-lg ${
            isSelected ? "bg-white/20" : "bg-white/10"
          }`}
        >
          <config.icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-slate-400"}`} />
        </div>
        <span
          className={`font-semibold capitalize ${
            isSelected ? "text-white" : "text-slate-300"
          }`}
        >
          {mode}
        </span>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto"
          >
            <CheckCircle className="w-5 h-5 text-white" />
          </motion.div>
        )}
      </div>
      <p
        className={`text-xs ${
          isSelected ? "text-white/80" : "text-slate-500"
        }`}
      >
        {config.description}
      </p>
    </motion.button>
  );
}

// ============ MAIN COMPONENT ============
export default function SettingsPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [openModePopup, setOpenModePopup] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Settings toggles
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sounds: true,
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showActivity: true,
    allowMessages: true,
  });
  const [preferences, setPreferences] = useState({
    darkMode: true,
    aiSuggestions: true,
    autoMatch: true,
  });

  // const API_URL = "http://localhost:4000";
  const API_URL = "https://skillwrap-backend.onrender.com";

  useEffect(() => {
    async function load() {
      const res = await fetch(`${API_URL}/auth/profile`, {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();
      const u = data.req?.user || data.user;
      setUser(u);
      setSelectedMode(u?.mode || null);
    }
    load();
  }, []);

  async function handleChangeMode() {
    if (!selectedMode || selectedMode === user?.mode) return;

    try {
      setLoading(true);
      await fetch(`${API_URL}/user/set-mode`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: selectedMode }),
      });

      setUser((prev) => prev && { ...prev, mode: selectedMode });
      setOpenModePopup(false);
    } catch (err) {
      console.error("Mode update failed", err);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#030b1a] via-[#0a1628] to-[#030b1a] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <SettingsIcon className="w-10 h-10 text-cyan-400" />
          </motion.div>
          <p className="text-slate-400 text-sm font-medium">Loading settings...</p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#030b1a] via-[#0a1628] to-[#030b1a] text-white relative overflow-x-hidden">
      {/* ============ ANIMATED BACKGROUND ============ */}
      <FloatingOrb
        color="rgba(34,211,238,0.1)"
        size="400px"
        delay={0}
        duration={15}
        x="10%"
        y="20%"
      />
      <FloatingOrb
        color="rgba(168,85,247,0.08)"
        size="350px"
        delay={2}
        duration={18}
        x="70%"
        y="30%"
      />
      <FloatingOrb
        color="rgba(16,185,129,0.06)"
        size="300px"
        delay={4}
        duration={20}
        x="40%"
        y="70%"
      />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147,197,253,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147,197,253,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ============ CONTENT ============ */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 py-6 max-w-4xl mx-auto">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <a
            href="/"
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4 rotate-180 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm text-slate-300 font-medium">Back</span>
          </a>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 mb-4"
          >
            <SettingsIcon className="w-7 h-7 text-cyan-400" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Settings
            </span>
          </h1>
          <p className="text-slate-400 text-sm">Customize your SkillWarp experience</p>
        </motion.div>

        {/* ============ PROFILE CARD ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative p-6 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-xl overflow-hidden">
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 opacity-50" />

            <div className="relative flex flex-col sm:flex-row items-center gap-5">
              {/* Avatar */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-60 blur-sm"
                />


                <Image
                  src={user.img_url || "/default-avatar.png"}
                  alt="avatar"
                  width={80}
                  height={80}
                  className="relative rounded-full object-cover border-2 border-white/20"
                />
                <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 border-2 border-slate-900">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-xl font-bold text-white">{user.fullname}</h2>
                <p className="text-cyan-400 text-sm font-medium">@{user.username}</p>
                <p className="text-slate-400 text-sm mt-1">{user.email}</p>

                {/* Mode badge */}
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-400/30">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs font-semibold text-cyan-300 capitalize">
                      {user.mode || "No mode selected"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit button */}
              <motion.a
                href="/edit-profile"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 text-cyan-300 text-sm font-medium hover:border-cyan-400/50 transition-all"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* ============ SETTINGS SECTIONS ============ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {/* Account Settings */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">
              Account
            </h3>
            <div className="space-y-3">
              <SettingsCard
                icon={User}
                title="Change Mode"
                description="Switch between learning, teaching, or exchanging"
                onClick={() => setOpenModePopup(true)}
                color="cyan"
              />

              <SettingsCard
                icon={KeyRound}
                title="Security"
                description="Password, 2FA, and session management"
                color="purple"
                expanded={expandedSection === "security"}
                onClick={() => setExpandedSection(expandedSection === "security" ? null : "security")}
              >
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-300">Change Password</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-300">Two-Factor Auth</span>
                    </div>
                    <Toggle enabled={false} onChange={() => {}} />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-300">Active Sessions</span>
                    </div>
                    <span className="text-xs text-slate-400">2 devices</span>
                  </div>
                </div>
              </SettingsCard>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">
              Notifications
            </h3>
            <SettingsCard
              icon={Bell}
              title="Notification Preferences"
              description="Control how you receive updates"
              color="amber"
              expanded={expandedSection === "notifications"}
              onClick={() => setExpandedSection(expandedSection === "notifications" ? null : "notifications")}
            >
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">Email Notifications</span>
                  </div>
                  <Toggle
                    enabled={notifications.email}
                    onChange={(v) => setNotifications({ ...notifications, email: v })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">Push Notifications</span>
                  </div>
                  <Toggle
                    enabled={notifications.push}
                    onChange={(v) => setNotifications({ ...notifications, push: v })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">Sound Effects</span>
                  </div>
                  <Toggle
                    enabled={notifications.sounds}
                    onChange={(v) => setNotifications({ ...notifications, sounds: v })}
                  />
                </div>
              </div>
            </SettingsCard>
          </div>

          {/* AI Preferences */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">
              AI Features
            </h3>
            <SettingsCard
              icon={Brain}
              title="AI Preferences"
              description="Customize AI assistance and suggestions"
              color="purple"
              expanded={expandedSection === "ai"}
              onClick={() => setExpandedSection(expandedSection === "ai" ? null : "ai")}
            >
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">AI Learning Suggestions</span>
                  </div>
                  <Toggle
                    enabled={preferences.aiSuggestions}
                    onChange={(v) => setPreferences({ ...preferences, aiSuggestions: v })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">Auto Skill Matching</span>
                  </div>
                  <Toggle
                    enabled={preferences.autoMatch}
                    onChange={(v) => setPreferences({ ...preferences, autoMatch: v })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">AI Chat Assistant</span>
                  </div>
                  <Toggle enabled={true} onChange={() => {}} />
                </div>
              </div>
            </SettingsCard>
          </div>

          {/* Privacy Settings */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">
              Privacy
            </h3>
            <SettingsCard
              icon={Shield}
              title="Privacy Settings"
              description="Control your profile visibility"
              color="emerald"
              expanded={expandedSection === "privacy"}
              onClick={() => setExpandedSection(expandedSection === "privacy" ? null : "privacy")}
            >
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">Public Profile</span>
                  </div>
                  <Toggle
                    enabled={privacy.profileVisible}
                    onChange={(v) => setPrivacy({ ...privacy, profileVisible: v })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">Show Activity Status</span>
                  </div>
                  <Toggle
                    enabled={privacy.showActivity}
                    onChange={(v) => setPrivacy({ ...privacy, showActivity: v })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">Allow Direct Messages</span>
                  </div>
                  <Toggle
                    enabled={privacy.allowMessages}
                    onChange={(v) => setPrivacy({ ...privacy, allowMessages: v })}
                  />
                </div>
              </div>
            </SettingsCard>
          </div>

          {/* Danger Zone */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400/80 mb-3 px-1">
              Danger Zone
            </h3>
            <SettingsCard
              icon={LogOut}
              title="Logout"
              description="Sign out of your account"
              color="rose"
              onClick={() => {}}
            />
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 py-6 border-t border-white/5"
        >
          <p className="text-slate-500 text-sm mb-4">Need help with settings?</p>
          <a
            href="/help"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:border-white/20 transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            Visit Help Center
          </a>
        </motion.div>
      </div>

      {/* ============ CHANGE MODE POPUP ============ */}
      <AnimatePresence>
        {openModePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setOpenModePopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-6 relative overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setOpenModePopup(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex p-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 mb-4">
                  <User className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Select Your Mode</h2>
                <p className="text-slate-400 text-sm mt-1">
                  Choose how you want to use SkillWarp
                </p>
              </div>

              {/* Mode options */}
              <div className="space-y-3 mb-6">
                {MODES.map((mode) => (
                  <ModeCard
                    key={mode}
                    mode={mode}
                    isSelected={selectedMode === mode}
                    onClick={() => setSelectedMode(mode)}
                  />
                ))}
              </div>

              {/* Submit button */}
              <motion.button
                onClick={handleChangeMode}
                disabled={loading || selectedMode === user.mode}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-5 h-5" />
                    </motion.div>
                    Updating...
                  </span>
                ) : (
                  "Change Mode"
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

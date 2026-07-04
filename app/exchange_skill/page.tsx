"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  Zap,
  ArrowRightLeft,
  User,
  Target,
  BookOpen,
  Send,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Clock,
  MessageSquare,
  Award,
  Globe,
  Lock,
} from "lucide-react";
import { addXP, XpTransactions } from "@/lib/Xpapi";

/* ================= TYPES ================= */

interface Skill {
  id?: number;
  skill_id?: number;
  skillId?: number;
  title: string;
  description?: string;
  category?: string;
  level?: string;
  user_id?: number;
  ownerId?: number;
  mode?: "learning" | "teaching" | "exchanging";
  user_mode?: "learning" | "teaching" | "exchanging";
  user?: {
    id: number;
    mode: "learning" | "teaching" | "exchanging";
    fullname?: string;
    username?: string;
  };
}

/* ================= ANIMATED BACKGROUND ================= */

function GlowOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`}
      animate={{
        y: [0, 40, 0],
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.02]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(6,255,208,0.8) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,255,208,0.8) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
  );
}

/* ================= LOADING STATE ================= */

function LoadingState() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-4"
      >
        <div className="relative w-16 h-16 mx-auto">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-cyan-500/30 border-t-cyan-400"
          />
          <ArrowRightLeft size={24} className="absolute inset-0 m-auto text-cyan-400" />
        </div>
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-cyan-300 text-sm tracking-widest uppercase"
        >
          Initializing Exchange Portal
        </motion.p>
      </motion.div>
    </div>
  );
}

/* ================= STEP INDICATOR ================= */

function StepIndicator({ step }: { step: number }) {
  const steps = [
    { label: "Review", icon: Target },
    { label: "Select", icon: BookOpen },
    { label: "Send", icon: Send },
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((s, i) => {
          const isActive = step === i + 1;
          const isCompleted = step > i + 1;
          const Icon = s.icon;

          return (
            <div key={s.label} className="flex-1 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-gradient-to-br from-cyan-400 to-blue-500 text-white"
                    : isActive
                    ? "bg-cyan-500/20 border-2 border-cyan-400 text-cyan-400"
                    : "bg-white/5 border border-white/10 text-gray-600"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <Icon size={16} />
                )}
              </motion.div>
              <span
                className={`text-xs font-medium ${
                  isActive || isCompleted ? "text-cyan-300" : "text-gray-500"
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 ${
                    isCompleted ? "bg-cyan-400" : "bg-white/10"
                  }`}
                  style={{ transform: "translateX(50%)" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= MODE BADGE ================= */

function ModeBadge({ mode }: { mode: string }) {
  const styles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    teaching: { bg: "from-green-500/20 to-emerald-500/20", text: "text-green-400", icon: <BookOpen size={12} /> },
    learning: { bg: "from-cyan-500/20 to-blue-500/20", text: "text-cyan-400", icon: <Target size={12} /> },
    exchanging: { bg: "from-purple-500/20 to-pink-500/20", text: "text-purple-400", icon: <ArrowRightLeft size={12} /> },
  };
  const style = styles[mode] || styles.learning;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-gradient-to-r ${style.bg} ${style.text}`}
    >
      {style.icon}
      {mode}
    </span>
  );
}

/* ================= SKILL CARD ================= */

function SkillCard({ skill, mode, variant = "requested" }: { skill: Skill; mode: string; variant?: "requested" | "offered" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="relative rounded-2xl glass overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5" />
      <div className="p-5 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs ${variant === "requested" ? "text-indigo-400" : "text-cyan-400"}`}>
                {variant === "requested" ? "Requesting" : "Offering"}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">{skill.title}</h3>
            {skill.category && (
              <p className="text-sm text-gray-400 mt-1">{skill.category}</p>
            )}
          </div>
          <ModeBadge mode={mode} />
        </div>
        {skill.description && (
          <p className="text-sm text-gray-500 mt-3 line-clamp-2">{skill.description}</p>
        )}
      </div>
    </motion.div>
  );
}

/* ================= EXCHANGE FLOW VISUALIZER ================= */

function ExchangeFlowVisualizer({ myMode, receiverMode }: { myMode: string; receiverMode: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl p-6 mb-6"
    >
      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Globe size={14} className="text-cyan-400" />
        Exchange Flow
      </h4>

      <div className="flex items-center justify-between gap-4">
        {/* You */}
        <div className="flex-1 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-2">
            <User size={24} className="text-white" />
          </div>
          <p className="text-sm font-semibold text-white">You</p>
          <ModeBadge mode={myMode} />
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1"
          >
            <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400" />
            <ArrowRightLeft size={20} className="text-purple-400" />
            <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400" />
          </motion.div>
        </div>

        {/* Receiver */}
        <div className="flex-1 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-2">
            <User size={24} className="text-white" />
          </div>
          <p className="text-sm font-semibold text-white">Partner</p>
          <ModeBadge mode={receiverMode} />
        </div>
      </div>
    </motion.div>
  );
}

/* ================= MAIN PAGE ================= */

export default function ExchangeSkillPage() {
  const router = useRouter();
  
  // const API_URL = "http://localhost:4000";
  const API_URL = "https://skillwrap-backend.onrender.com";

  const [requestedSkill, setRequestedSkill] = useState<Skill | null>(null);
  const [myMode, setMyMode] = useState<"learning" | "teaching" | "exchanging" | null>(null);
  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [selectedMySkillId, setSelectedMySkillId] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  // Profile
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, { credentials: "include" });
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setMyMode(data.user.mode);
      } catch {
        router.push("/login");
      }
    }
    loadProfile();
  }, [router]);

  // Requested skill from session
  useEffect(() => {
    const skillData = sessionStorage.getItem("selectedSkill");
    if (!skillData) {
      router.push("/skills");
      return;
    }
    setRequestedSkill(JSON.parse(skillData));
    setLoading(false);
  }, [router]);

  // My skills
  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch(`${API_URL}/view-skill`, { credentials: "include" });
        const data = await res.json();
        setMySkills(data.skills || []);
      } catch {
        // Silent fail
      }
    }
    fetchSkills();
  }, []);

  // Validation
  function isValidExchange() {
    if (!myMode || !requestedSkill) return false;
    const receiverMode = requestedSkill.user?.mode || requestedSkill.mode || requestedSkill.user_mode;
    if (!receiverMode) return false;
    if (myMode === "exchanging" && receiverMode === "exchanging") return true;
    if (myMode === "learning" && receiverMode === "teaching") return true;
    return false;
  }

  // Submit
  const handleSubmit = async () => {
    if (!requestedSkill || !myMode) {
      setMessage("Missing data");
      setMessageType("error");
      return;
    }

    if (!isValidExchange()) {
      setMessage("Mode mismatch. Exchange blocked.");
      setMessageType("error");
      return;
    }

    if (myMode === "exchanging" && !selectedMySkillId) {
      setMessage("Please select a skill to offer.");
      setMessageType("error");
      return;
    }

    setSubmitting(true);

    const toUserId = requestedSkill.user?.id ?? requestedSkill.user_id ?? requestedSkill.ownerId;
    const skillRequestedId = requestedSkill.skillId ?? requestedSkill.id ?? requestedSkill.skill_id;

    try {
      const res = await fetch(`${API_URL}/exchange-skill`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toUserId,
          skillRequestedId,
          offeredSkillId: myMode === "exchanging" ? selectedMySkillId : null,
          note,
        }),
      });

      if (!res.ok) {
        setMessage("Exchange failed");
        setMessageType("error");
        setSubmitting(false);
        return;
      }

      await fetch(`${API_URL}/send-notification`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverId: toUserId,
          message: "New skill exchange request received!",
        }),
      });

            await addXP(35);
            await XpTransactions(35,"Sent an exchnage request.");
            console.log("⚡ XP ADDED");

await fetch(`${API_URL}/activity`, {
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    receiverId: toUserId,

    activity_type: "skill_exchange_request",

    title: "New Skill Exchange Request",

    description: "Sent a new skill exchange request!",

    message: "New skill exchange request sent!",

    icon: "refresh-cw", // or whatever icon system you're using
    color: "blue",     // e.g. info / success / warning
  }),
});

      setMessage("Request sent successfully!");
      setMessageType("success");

      setTimeout(() => router.push("/dashboard"), 1500);
    } catch {
      setMessage("Network error. Please try again.");
      setMessageType("error");
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingState />;

  const receiverMode = requestedSkill?.user?.mode || requestedSkill?.mode || requestedSkill?.user_mode;

  return (
    <div className="min-h-screen bg-navy-950 text-white relative overflow-hidden">
      {/* Background */}
      <GridOverlay />
      <GlowOrb className="w-[500px] h-[500px] bg-cyan-500/10 -top-20 -left-20" delay={0} />
      <GlowOrb className="w-[400px] h-[400px] bg-purple-500/10 top-1/2 -right-20" delay={2} />
      <GlowOrb className="w-[350px] h-[350px] bg-indigo-500/8 -bottom-10 left-1/4" delay={4} />

      <div className="relative z-10 px-4 md:px-8 py-6 md:py-10">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -3 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-input text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            Back
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2"
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles size={20} className="text-cyan-400" />
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Skill Exchange Portal
              </h1>
            </div>
            <p className="text-gray-400 text-sm">
              {myMode && receiverMode
                ? `Negotiating ${myMode} ↔ ${receiverMode} exchange`
                : "Secure skill negotiation environment"}
            </p>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-input rounded-xl p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-green-500/15 flex items-center justify-center shrink-0">
              <Lock size={18} className="text-green-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Secure Exchange</p>
              <p className="text-xs text-gray-400">
                Allowed: learning ↔ teaching | exchanging ↔ exchanging
              </p>
            </div>
            <ShieldCheck size={18} className="text-green-400" />
          </motion.div>

          {/* Step Indicator */}
          <StepIndicator step={step} />

          {/* Exchange Flow Visualizer */}
          {myMode && receiverMode && (
            <ExchangeFlowVisualizer myMode={myMode} receiverMode={receiverMode} />
          )}

          {/* Requested Skill Card */}
          {requestedSkill && receiverMode && (
            <SkillCard skill={requestedSkill} mode={receiverMode} variant="requested" />
          )}

          {/* My Skills Selection (for exchanging mode) */}
          {myMode === "exchanging" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <BookOpen size={14} className="text-cyan-400" />
                Select Skill to Offer
              </label>

              {mySkills.length === 0 ? (
                <div className="glass rounded-xl p-6 text-center">
                  <p className="text-gray-400 text-sm">No skills available to offer</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {mySkills.map((skill) => (
                    <motion.button
                      key={skill.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setSelectedMySkillId(skill.id ?? null);
                        setStep(2);
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedMySkillId === skill.id
                          ? "glass border-2 border-cyan-400"
                          : "glass-input hover:border-cyan-400/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-white">{skill.title}</p>
                          {skill.category && (
                            <p className="text-xs text-gray-500 mt-0.5">{skill.category}</p>
                          )}
                        </div>
                        {selectedMySkillId === skill.id && (
                          <CheckCircle2 size={18} className="text-cyan-400" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Note Input */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare size={14} className="text-cyan-400" />
              Negotiation Note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Introduce yourself and explain why you'd like to exchange skills..."
              className="w-full h-28 p-4 rounded-xl glass-input focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition resize-none text-white placeholder-gray-500"
            />
            <p className="text-xs text-gray-600">{note.length}/500 characters</p>
          </motion.div>

          {/* Message */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-4 rounded-xl flex items-center gap-3 ${
                  messageType === "success"
                    ? "bg-green-500/15 border border-green-500/30"
                    : messageType === "error"
                    ? "bg-red-500/15 border border-red-500/30"
                    : "bg-cyan-500/15 border border-cyan-500/30"
                }`}
              >
                {messageType === "success" ? (
                  <CheckCircle2 size={18} className="text-green-400" />
                ) : messageType === "error" ? (
                  <AlertCircle size={18} className="text-red-400" />
                ) : (
                  <Clock size={18} className="text-cyan-400" />
                )}
                <p
                  className={`text-sm ${
                    messageType === "success"
                      ? "text-green-300"
                      : messageType === "error"
                      ? "text-red-300"
                      : "text-cyan-300"
                  }`}
                >
                  {message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setStep(3);
              handleSubmit();
            }}
            disabled={submitting}
            className="w-full py-4 rounded-xl font-semibold relative overflow-hidden group bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-white transition" />
            <span className="relative z-10 flex items-center justify-center gap-2 text-white">
              {submitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Exchange Request
                  <ChevronRight size={16} />
                </>
              )}
            </span>
          </motion.button>

        </div>
      </div>
    </div>
  );
}

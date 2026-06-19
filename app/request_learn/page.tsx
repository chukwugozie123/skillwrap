"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FirstAchievementPopup from "@/components/FirstAchievementPopup/page";
import { motion, AnimatePresence } from "framer-motion";
import { addXP } from "@/lib/Xpapi";
import { CheckCircle2, BookOpen, ArrowRight, AlertCircle } from "lucide-react";

/* ================= TYPES ================= */
interface Skill {
  skillId?: number;
  skill_id?: number;
  id?: number;
  title: string;
  user_id?: number;
  ownerId?: number;
  mode?: "learning" | "teaching" | "exchange" | "exchanging";
  user_mode?: "learning" | "teaching" | "exchanging";
  user?: {
    id: number;
    mode: "learning" | "teaching" | "exchange" | "exchanging";
  };
}

type StepType = "select" | "define" | "review";

/* ================= PAGE ================= */
export default function RequestLearning() {
  const [myMode, setMyMode] = useState<
    "learning" | "teaching" | "exchanging" | null
  >(null);

  const [requestedSkill, setRequestedSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [showFirstSkillPopup, setShowFirstSkillPopup] = useState(false);
  const [Point, setPoints] = useState("");
  const [AchievementMessage, setAchievementMessage] = useState("");
  const [currentStep, setCurrentStep] = useState<StepType>("select");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const API_URL = "http://localhost:4000";
  const MAX_NOTE_LENGTH = 500;
  const characterCount = note.length;

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });
        if (!res.ok) router.replace("/login");

        const data = await res.json();
        setMyMode(data.user.mode);
      } catch {
        router.replace("/login");
      }
    }
    checkAuth();
  }, [router]);

  /* ================= LOAD SKILL ================= */
  useEffect(() => {
    const data = sessionStorage.getItem("selectedSkill");
    if (!data) {
      router.push("/skills");
      return;
    }

    setRequestedSkill(JSON.parse(data));
    setLoading(false);
  }, [router]);

  /* ================= VALIDATION ================= */
  function isValidExchange() {
    if (!myMode || !requestedSkill) return false;

    const receiverRawMode =
      requestedSkill.user?.mode ||
      requestedSkill.mode ||
      requestedSkill.user_mode;

    const receiverMode = receiverRawMode;

    if (!receiverMode) return false;

    if (myMode === "exchanging" && receiverMode === "exchanging") return true;
    if (myMode === "learning" && receiverMode === "teaching") return true;

    return false;
  }

  /* ================= STEP NAVIGATION ================= */
  const handleNextStep = () => {
    if (currentStep === "select") {
      if (!isValidExchange()) {
        setMessage("❌ Mode mismatch. Exchange not allowed.");
        return;
      }
      setCurrentStep("define");
      setMessage("");
    } else if (currentStep === "define") {
      if (!note.trim()) {
        setMessage("⚠️ Please tell the teacher what you want to gain.");
        return;
      }
      if (characterCount < 20) {
        setMessage("⚠️ Please provide at least 20 characters.");
        return;
      }
      setCurrentStep("review");
      setMessage("");
    }
  };

  const handlePrevStep = () => {
    if (currentStep === "define") setCurrentStep("select");
    if (currentStep === "review") setCurrentStep("define");
    setMessage("");
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!requestedSkill || !myMode) {
      setMessage("⚠️ Missing infomations");
      return;
    }

    if (!isValidExchange()) {
      setMessage("❌ Mode mismatch. Exchange not allowed.");
      return;
    }

    if (!note.trim()) {
      setMessage("⚠️ Please tell the teacher what you want to gain.");
      return;
    }

    const toUserId =
      requestedSkill.user?.id ??
      requestedSkill.user_id ??
      requestedSkill.ownerId;

    const skillRequestedId =
      requestedSkill.skillId ??
      requestedSkill.id ??
      requestedSkill.skill_id;

    if (!toUserId || !skillRequestedId) {
      setMessage("❌ Invalid skill data.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/learn-skill`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toUserId,
          skillRequestedId,
          note,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        await fetch(`${API_URL}/send-notification`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            receiverId: toUserId,
            message:
              "Someone sent you a learning request.  Check your request",
          }),
        });

        await addXP(2);

        const res2 = await fetch(`${API_URL}/achievements/check`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "request_sent",
          }),
        });

        await fetch(`${API_URL}/activity`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            receiverId: toUserId,
            activity_type: "learning_request",
            title: "Learning Request",
            description: "You requested to learn a new skill from another creator.",
            message: "Sent you a learning request",
            icon: "book-open",
            color: "green",
          }),
        });

        const response = await res2.json();

        if (response.success) {
          setPoints(response.points);
          setAchievementMessage(response.achievement);
          setShowFirstSkillPopup(true);
        } else {
          setMessage("🎉 Request sent successfully!");
          setTimeout(() => router.push("/dashboard"), 1500);
        }
      } else {
        setMessage(`❌ ${data.message || "Request failed"}`);
      }
    } catch {
      setMessage("❌ Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent mx-auto mb-4"
          />
          <p className="text-cyan-300 text-sm tracking-widest">
            Initializing Learning Portal...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!requestedSkill) return null;

  const receiverMode =
    requestedSkill.user?.mode ||
    requestedSkill.mode ||
    requestedSkill.user_mode;

  const statusType =
    message.includes("❌") || message.includes("⚠️")
      ? "error"
      : message.includes("🎉")
      ? "success"
      : message
      ? "info"
      : null;

  const steps: { key: StepType; label: string; icon: React.ReactNode }[] = [
    { key: "select", label: "Skill Selected", icon: <CheckCircle2 className="w-5 h-5" /> },
    { key: "define", label: "Define Goal", icon: <BookOpen className="w-5 h-5" /> },
    { key: "review", label: "Review & Send", icon: <CheckCircle2 className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white px-4 py-10 md:px-6 md:py-12">
      {/* ANIMATED BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full opacity-30"
        />
        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full opacity-30"
        />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </div>

      {/* CONTENT */}
      <div className="max-w-2xl mx-auto relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Request to Learn
            </h1>
          </div>
          <p className="text-gray-400 text-base md:text-lg max-w-lg mx-auto">
            Connect with mentors and expand your skills through guided learning requests
          </p>
        </motion.div>

        {/* STEP INDICATOR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between relative">
            {/* Background line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-transparent -translate-y-1/2" />

            {steps.map((step, idx) => (
              <motion.div
                key={step.key}
                className="relative flex flex-col items-center flex-1"
                animate={{
                  scale: currentStep === step.key ? 1.1 : 1,
                }}
              >
                <motion.div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-all ${
                    currentStep === step.key || steps.findIndex(s => s.key === currentStep) > idx
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                      : "bg-white/5 border-white/20 text-gray-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {step.icon}
                </motion.div>
                <p className="text-xs md:text-sm mt-2 text-gray-400 text-center">
                  {step.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* STATUS MESSAGE */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8"
            >
              <div
                className={`p-4 rounded-xl border backdrop-blur-xl flex items-start gap-3 ${
                  statusType === "error"
                    ? "bg-red-500/10 border-red-400/30 text-red-300"
                    : statusType === "success"
                    ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300"
                    : "bg-cyan-500/10 border-cyan-400/30 text-cyan-200"
                }`}
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SKILL CARD - STEP 1 */}
        <AnimatePresence mode="wait">
          {currentStep === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <motion.div className="p-6 rounded-2xl bg-white/5 border border-cyan-400/20 backdrop-blur-xl hover:border-cyan-400/40 transition-all hover:bg-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-cyan-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                      Selected Skill
                    </p>
                    <h2 className="text-2xl font-bold text-cyan-300 mb-2">
                      {requestedSkill.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>Learning from:</span>
                      <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 capitalize">
                        {receiverMode || "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* INFO CARDS */}
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl"
                >
                  <h3 className="font-semibold text-cyan-300 mb-2 text-sm">
                    ✓ Why Requests Matter
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Structured learning requests help mentors understand your goals and provide targeted guidance.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl"
                >
                  <h3 className="font-semibold text-cyan-300 mb-2 text-sm">
                    ⚡ Get Faster Responses
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Clear learning goals help mentors respond quickly and with relevant resources.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl"
                >
                  <h3 className="font-semibold text-cyan-300 mb-2 text-sm">
                    📊 Track Progress
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Your requests help build a portfolio of learning interests and achievements.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl"
                >
                  <h3 className="font-semibold text-cyan-300 mb-2 text-sm">
                    🎯 Earn Rewards
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Each request earns XP and can unlock achievements as you progress.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* TEXTAREA - STEP 2 */}
          {currentStep === "define" && (
            <motion.div
              key="define"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <motion.div className="p-6 rounded-2xl bg-white/5 border border-cyan-400/20 backdrop-blur-xl">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Skill Selected
                </p>
                <h3 className="text-xl font-semibold text-cyan-300">
                  {requestedSkill.title}
                </h3>
              </motion.div>

              <div className="relative">
                <label className="text-sm font-medium text-cyan-300 mb-3 block">
                  What Do You Want to Learn?
                </label>
                <textarea
                  value={note}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_NOTE_LENGTH) {
                      setNote(e.target.value);
                    }
                  }}
                  rows={6}
                  placeholder="Be specific about what you want to achieve. For example: 'I want to learn advanced React patterns for building scalable apps' or 'I'm interested in understanding TDD best practices'"
                  className="w-full bg-white/5 border border-cyan-400/20 px-4 py-3 rounded-xl backdrop-blur-xl outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-all text-white placeholder-gray-500 resize-none"
                />

                {/* CHARACTER COUNTER */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                  <span>
                    {characterCount < 20 && characterCount > 0 && (
                      <span className="text-yellow-400">
                        At least 20 characters needed
                      </span>
                    )}
                    {characterCount === 0 && <span>Start typing your learning goal...</span>}
                    {characterCount >= 20 && (
                      <span className="text-cyan-300">✓ Goal looks good!</span>
                    )}
                  </span>
                  <span className={characterCount === MAX_NOTE_LENGTH ? "text-red-400 font-semibold" : ""}>
                    {characterCount}/{MAX_NOTE_LENGTH}
                  </span>
                </div>
              </div>

              {/* INFO BOX */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-xl bg-blue-500/10 border border-blue-400/20 backdrop-blur-xl"
              >
                <p className="text-xs text-blue-200 leading-relaxed">
                  💡 <span className="font-semibold">Tip:</span> The more specific your goal, the better support you&apos;ll receive. Include what you want to build, learn, or achieve.
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* REVIEW - STEP 3 */}
          {currentStep === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <motion.div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 backdrop-blur-xl">
                <h3 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-4">
                  📋 Request Summary
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-2">Skill to Learn</p>
                    <p className="text-lg font-semibold text-white">
                      {requestedSkill.title}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs text-gray-400 mb-2">Your Learning Goal</p>
                    <p className="text-sm text-gray-200 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/10">
                      {note}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs text-gray-400 mb-2">Learning Mode</p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-sm capitalize">
                        {myMode}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm capitalize">
                        {receiverMode}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CONFIRMATION BOX */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/20 backdrop-blur-xl"
              >
                <p className="text-xs text-emerald-200 leading-relaxed">
                  ✓ Your request will be sent to the mentor and they&apos;ll be notified. You&apos;ll earn 2 XP for sending this request.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NAVIGATION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex gap-4"
        >
          {currentStep !== "select" && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrevStep}
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-xl font-semibold border border-white/20 text-white bg-white/5 hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={currentStep === "review" ? handleSubmit : handleNextStep}
            disabled={isSubmitting}
            type={currentStep === "review" ? "submit" : "button"}
            className="flex-1 py-3 rounded-xl font-semibold relative overflow-hidden bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                Sending...
              </>
            ) : currentStep === "review" ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Send Request
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </motion.div>

        {/* CANCEL LINK */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => router.push("/skills")}
          className="w-full mt-4 text-sm text-gray-400 hover:text-gray-300 transition"
        >
          Cancel and browse skills
        </motion.button>
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {showFirstSkillPopup && (
          <FirstAchievementPopup
            trigger={showFirstSkillPopup}
            points={Point}
            message={AchievementMessage}
            onClose={() => setShowFirstSkillPopup(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

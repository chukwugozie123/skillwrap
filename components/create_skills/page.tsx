"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { toast, ToastContainer, Slide } from "react-toastify";
import { useRouter } from "next/navigation";
import { addXP, XpTransactions } from "@/lib/Xpapi";
import "react-toastify/dist/ReactToastify.css";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  X,
  Plus,
  Sparkles,
  Image as ImageIcon,
  Youtube,
  ExternalLink,
  BookOpen,
  GraduationCap,
  Trophy,
  Zap,
  ChevronRight,
  FileText,
  Send,
  PartyPopper,
  Star,
} from "lucide-react";

// const API_URL = "https://skillwrap-backend.onrender.com";
  const API_URL = "http://localhost:4000";

/* ─── helpers ─── */

const categories = [
  "Web Development",
  "Mobile App Development",
  "Backend Development",
  "UI UX Design",
  "Graphic Design",
  "Game Development",
  "Data Science",
  "Machine Learning",
  "Cybersecurity",
  "Content Creation",
  "Photography",
  "Video Editing",
  "Animation & Motion Design",
  "Music Production",
  "Writing & Copywriting",
  "Digital Marketing",
  "SEO",
  "Product Management",
  "Entrepreneurship",
  "Finance & Investing",
  "Fitness & Health",
  "Cooking & Baking",
  "Public Speaking",
  "Personal Development",
  "Other",
];

const levels = ["Beginner", "Intermediate", "Professional"];

function levelColor(level: string) {
  const map: Record<string, string> = {
    beginner: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20",
    intermediate: "text-cyan-400 bg-cyan-500/10 ring-cyan-500/20",
    professional: "text-amber-400 bg-amber-500/10 ring-amber-500/20",
  };
  return map[level.toLowerCase()] || "text-white/50 bg-white/[0.06] ring-white/10";
}

/* ─── animation presets ─── */

const orbFloat = (i: number): Variants => ({
  animate: {
    y: [0, -18 - i * 6, 0],
    x: [0, i % 2 ? 12 : -12, 0],
    scale: [1, 1.08 + i * 0.02, 1],
    transition: { duration: 6 + i * 1.5, repeat: Infinity, ease: "easeInOut" },
  },
});

const stepVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 260, damping: 24 } },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -60 : 60, transition: { duration: 0.2 } }),
};

/* ─── sub-components ─── */

function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {[
        { size: 340, top: "8%", left: "6%", color: "bg-cyan-500/15" },
        { size: 260, top: "55%", left: "72%", color: "bg-blue-500/12" },
        { size: 200, top: "30%", left: "42%", color: "bg-teal-500/10" },
        { size: 180, top: "75%", left: "18%", color: "bg-sky-400/10" },
        { size: 150, top: "12%", left: "80%", color: "bg-indigo-500/8" },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${orb.color}`}
          style={{ width: orb.size, height: orb.size, top: orb.top, left: orb.left }}
          variants={orbFloat(i)}
          animate="animate"
        />
      ))}
    </div>
  );
}

function GlassInput({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/35">
        <Icon size={12} />
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200";

const selectClass =
  "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-200 appearance-none cursor-pointer";

/* ─── Achievement Popup ─── */

function FirstAchievementPopup({
  trigger,
  points,
  message,
  onClose,
}: {
  trigger: boolean;
  points: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#0c1425] to-[#060d1b] border border-amber-500/20 shadow-2xl shadow-amber-500/10 overflow-hidden text-center"
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 rounded-b-full bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
            <div className="p-10">
              <motion.div
                className="mx-auto w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1, transition: { type: "spring", stiffness: 200, damping: 12, delay: 0.15 } }}
              >
                <PartyPopper size={36} className="text-amber-400" />
              </motion.div>
              <motion.h2
                className="text-2xl font-bold"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  Achievement Unlocked!
                </span>
              </motion.h2>
              {message && (
                <motion.p className="mt-3 text-sm text-white/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  {message}
                </motion.p>
              )}
              {points && (
                <motion.div
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Star size={16} className="text-amber-400" />
                  <span className="text-lg font-bold text-amber-400">+{points} pts</span>
                </motion.div>
              )}
              <motion.button
                onClick={onClose}
                className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold text-sm hover:from-amber-500 hover:to-yellow-500 transition-all shadow-lg shadow-amber-500/20"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Preview Card ─── */

function SkillPreviewCard({
  skillname,
  description,
  level,
  category,
  file,
  learningPoints,
}: {
  skillname: string;
  description: string;
  level: string;
  category: string;
  file: File | null;
  learningPoints: string[];
}) {
  const fileUrl = file ? URL.createObjectURL(file) : null;

  return (
    <div className="rounded-2xl bg-white/[0.025] border border-white/[0.06] backdrop-blur-sm overflow-hidden">
      {/* image */}
      <div className="h-36 bg-white/[0.03] flex items-center justify-center overflow-hidden">
        {fileUrl ? (
          <img src={fileUrl} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <ImageIcon size={28} className="text-white/10" />
        )}
      </div>
      <div className="p-4 space-y-2">
        <h4 className="text-sm font-bold text-white/80 capitalize truncate">
          {skillname || "Skill Name"}
        </h4>
        <p className="text-[11px] text-white/30 line-clamp-2 leading-relaxed">
          {description || "Description will appear here..."}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {category && (
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white/40 ring-1 ring-white/[0.06]">
              {category}
            </span>
          )}
          {level && (
            <span className={`text-[9px] px-2 py-0.5 rounded-md ring-1 font-semibold uppercase tracking-wider ${levelColor(level)}`}>
              {level}
            </span>
          )}
        </div>
        {learningPoints.filter((p) => p.trim()).length > 0 && (
          <div className="pt-1">
            <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-400/50">
              {learningPoints.filter((p) => p.trim()).length} learning point{learningPoints.filter((p) => p.trim()).length !== 1 && "s"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── main component ─── */

export default function UploadSkill() {
  const router = useRouter();

  const [skillname, setSkillname] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [learningPoints, setLearningPoints] = useState([""]);
  const [showFirstSkillPopup, setShowFirstSkillPopup] = useState(false);
  const [Point, setPoints] = useState("");
  const [AchievementMessage, setAchievementMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* step flow */
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const steps = [
    { label: "Info", icon: FileText },
    { label: "Media", icon: ImageIcon },
    { label: "Learning", icon: GraduationCap },
    { label: "Review", icon: Send },
  ];


  
    /* ================= AUTH CHECK ================= */
    useEffect(() => {
      async function checkAuth() {
        try {
          const res = await fetch(`${API_URL}/auth/profile`, {
            credentials: "include",
          });
          if (!res.ok) router.push("/login");
  
          const data = await res.json();
          // setMyMode(data.user.mode);
          console.log(data.user.mode, " ss");
        } catch {
          router.push("/login");
        }
      }
      checkAuth();
    }, [router]);
  

  /* drag state */
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddPoint = () => setLearningPoints([...learningPoints, ""]);
  const handlePointChange = (index: number, value: string) => {
    const updated = [...learningPoints];
    updated[index] = value;
    setLearningPoints(updated);
  };
  const handleRemovePoint = (index: number) => {
    const updated = [...learningPoints];
    updated.splice(index, 1);
    setLearningPoints(updated);
  };

  /* drag handlers */
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped && dropped.type.startsWith("image/")) setFile(dropped);
  }, []);

  /* step validation */
  const canAdvance = () => {
    if (currentStep === 0) return !!(skillname && description && level && category);
    if (currentStep === 1) return !!file;
    if (currentStep === 2) return learningPoints.some((p) => p.trim());
    return true;
  };

  const goNext = () => {
    if (!canAdvance()) return;
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const goBack = () => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  console.log("🚀 SUBMIT STARTED");
  setMessage("");

  // ================= PRE VALIDATION LOG =================
  console.log("📦 CURRENT STATE VALUES:");
  console.log({
    skillname,
    description,
    level,
    category,
    file,
    youtubeLink,
    portfolioLink,
    learningPoints,
  });

  if (!file) {
    console.log("❌ NO FILE SELECTED");
    return setMessage("Please select an image");
  }

  if (
    youtubeLink &&
    !/^https?:\/\/(www\.)?youtube\.com\/watch\?v=/.test(youtubeLink)
  ) {
    console.log("❌ INVALID YOUTUBE LINK:", youtubeLink);
    return setMessage("Please enter a valid YouTube video link");
  }

  if (portfolioLink && !/^https?:\/\//.test(portfolioLink)) {
    console.log("❌ INVALID PORTFOLIO LINK:", portfolioLink);
    return setMessage("Please enter a valid Portfolio link");
  }

  // ================= FORM DATA BUILD =================
  const formData = new FormData();

  formData.append("skillname", skillname);
  formData.append("skilldesc", description);
  formData.append("skilllevel", level);
  formData.append("category", category);
  formData.append("image", file);

  if (youtubeLink) formData.append("youtube_link", youtubeLink);
  if (portfolioLink) formData.append("portfolio_link", portfolioLink);

  learningPoints.forEach((point, i) =>
    formData.append(`learningPoints[${i}]`, point)
  );

  console.log("📤 FORM DATA BUILT");

  // 🔥 PRINT FORM DATA (VERY IMPORTANT)
  console.log("📦 FORM DATA ENTRIES:");
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    setLoading(true);
    setMessage("Uploading skill...");

    console.log("🌐 SENDING REQUEST...");
    console.log("URL:", `${API_URL}/create-skills`);

    const res = await fetch(`${API_URL}/create-skills`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    console.log("📡 RESPONSE RECEIVED");
    console.log("STATUS:", res.status);
    console.log("OK:", res.ok);

    let data;

    try {
      data = await res.json();
      console.log("📦 RESPONSE JSON:", data);
    } catch (err) {
      console.log("❌ FAILED TO PARSE JSON:", err);
    }

    if (!res.ok) {
      console.log("❌ REQUEST FAILED ON SERVER");
      return;
    }

    // ================= SUCCESS FLOW =================
    if (res.ok && data.success) {
      console.log("🎉 SKILL CREATED SUCCESSFULLY");

      const res2 = await fetch(`${API_URL}/achievements/check`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "skill_created" }),
      });

      const response = await res2.json();
      console.log("🏆 ACHIEVEMENT RESPONSE:", response);


      await XpTransactions(10, "Creating a skill.");
      await addXP(10);
      console.log("⚡ XP ADDED");

      if (response.success) {
        setPoints(response.points);
        setAchievementMessage(response.achievement);
        setShowFirstSkillPopup(true);
      } else {
        console.log("ℹ️ No achievement unlocked");

        setSkillname("");
        setDescription("");
        setLevel("");
        setCategory("");
        setFile(null);
        setYoutubeLink("");
        setPortfolioLink("");
        setLearningPoints([""]);

        setMessage("Skill uploaded successfully!");
        toast.success("Skill uploaded successfully!", {
          theme: "dark",
          transition: Slide,
        });

        setTimeout(() => (window.location.href = "/skills"), 1200);
      }

      // ================= ACTIVITY =================
      const res3 = await fetch(`${API_URL}/activity`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activity_type: "skill_created",
          title: "New Skill Created",
          description: skillname,
          icon: "sparkles",
          color: "emerald",
        }),
      });

      const response2 = await res3.json();
      console.log("🟢 ACTIVITY RESPONSE:", response2);

      if (res3.ok && response2.success) {
        console.log("✅ Activity logged successfully");
      } else {
        console.log("❌ Activity failed:", response2);
      }
    } else {
      console.log("❌ BACKEND RETURNED ERROR");
      console.log("ERROR DATA:", data);

      setMessage(`Failed: ${data?.error || "Unknown error"}`);
      toast.error(data?.error || "Upload failed", { theme: "dark" });
    }
  } catch (error) {
    console.log("🔥 NETWORK / FETCH ERROR:");
    console.log(error);

    setMessage("Network error — try again.");
    toast.error("Network error", { theme: "dark" });
  } finally {
    setLoading(false);
    console.log("🏁 SUBMIT FINISHED");
  }
}

  /* ─── render ─── */

  return (
    <main className="relative min-h-screen bg-[#030712] text-white overflow-hidden">
      <FloatingOrbs />
      <ToastContainer newestOnTop theme="dark" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 py-10">
        {/* back button */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/50 text-sm hover:bg-white/[0.08] hover:text-white/70 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>
        </motion.div>

        {/* header */}
        <motion.div className="mt-8 mb-10" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Share Your Skill
            </span>
          </h1>
          <p className="mt-2 text-white/35 text-sm">Create a skill listing for others to discover and learn from</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── LEFT: FORM ── */}
          <div className="flex-1">
            {/* step indicator */}
            <motion.div
              className="mb-8 flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {steps.map((step, i) => {
                const StepIcon = step.icon;
                const isActive = i === currentStep;
                const isDone = i < currentStep;
                return (
                  <div key={i} className="flex items-center flex-1">
                    <button
                      onClick={() => {
                        if (i < currentStep) {
                          setDirection(i < currentStep ? -1 : 1);
                          setCurrentStep(i);
                        }
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
                          : isDone
                          ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                          : "bg-white/[0.03] border border-white/[0.06] text-white/30"
                      }`}
                    >
                      {isDone ? <Check size={12} /> : <StepIcon size={12} />}
                      <span className="hidden sm:inline">{step.label}</span>
                    </button>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-px mx-1 ${isDone ? "bg-emerald-500/30" : "bg-white/[0.06]"}`} />
                    )}
                  </div>
                );
              })}
            </motion.div>

            {/* form area */}
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait" custom={direction}>
                {/* ── STEP 0: Info ── */}
                {currentStep === 0 && (
                  <motion.div
                    key="step0"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-5"
                  >
                    <GlassInput label="Skill Name" icon={Sparkles}>
                      <input
                        type="text"
                        placeholder="e.g. React Development"
                        value={skillname}
                        onChange={(e) => setSkillname(e.target.value)}
                        required
                        className={inputClass}
                      />
                    </GlassInput>

                    <GlassInput label="Description" icon={FileText}>
                      <textarea
                        placeholder="Describe what this skill covers..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={4}
                        className={`${inputClass} resize-none`}
                      />
                    </GlassInput>

                    <GlassInput label="Level" icon={Trophy}>
                      <div className="relative">
                        <select
                          value={level}
                          onChange={(e) => setLevel(e.target.value)}
                          required
                          className={selectClass}
                        >
                          <option value="" className="bg-[#0c1425]">Select level</option>
                          {levels.map((l) => (
                            <option key={l} value={l} className="bg-[#0c1425]">
                              {l}
                            </option>
                          ))}
                        </select>
                        <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-white/20 pointer-events-none" />
                      </div>
                    </GlassInput>

                    <GlassInput label="Category" icon={Zap}>
                      <div className="relative">
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                          className={selectClass}
                        >
                          <option value="" className="bg-[#0c1425]">Select category</option>
                          {categories.map((c) => (
                            <option key={c} value={c} className="bg-[#0c1425]">
                              {c}
                            </option>
                          ))}
                        </select>
                        <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-white/20 pointer-events-none" />
                      </div>
                    </GlassInput>
                  </motion.div>
                )}

                {/* ── STEP 1: Media ── */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-5"
                  >
                    {/* drag-drop image upload */}
                    <GlassInput label="Skill Image" icon={ImageIcon}>
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 h-48 flex flex-col items-center justify-center gap-3 ${
                          isDragging
                            ? "border-cyan-500/60 bg-cyan-500/5"
                            : file
                            ? "border-emerald-500/30 bg-emerald-500/5"
                            : "border-white/[0.1] bg-white/[0.02] hover:border-white/[0.2] hover:bg-white/[0.04]"
                        }`}
                      >
                        {file ? (
                          <>
                            <img
                              src={URL.createObjectURL(file)}
                              alt="Preview"
                              className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-40"
                            />
                            <div className="relative z-10 flex flex-col items-center">
                              <Check size={24} className="text-emerald-400 mb-1" />
                              <span className="text-sm text-emerald-400 font-semibold">Image selected</span>
                              <span className="text-[10px] text-white/30 mt-0.5">Click or drag to replace</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <Upload size={28} className={isDragging ? "text-cyan-400" : "text-white/20"} />
                            <span className={`text-sm font-semibold ${isDragging ? "text-cyan-400" : "text-white/40"}`}>
                              {isDragging ? "Drop your image here" : "Drag & drop or click to upload"}
                            </span>
                            <span className="text-[10px] text-white/20">PNG, JPG, WEBP up to 5MB</span>
                          </>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          required
                          onChange={(e) => setFile(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </div>
                    </GlassInput>

                    <GlassInput label="YouTube Link (optional)" icon={Youtube}>
                      <input
                        type="text"
                        placeholder="https://youtube.com/watch?v=..."
                        value={youtubeLink}
                        onChange={(e) => setYoutubeLink(e.target.value)}
                        className={inputClass}
                      />
                    </GlassInput>

                    <GlassInput label="Portfolio Link (optional)" icon={ExternalLink}>
                      <input
                        type="text"
                        placeholder="https://your-portfolio.com"
                        value={portfolioLink}
                        onChange={(e) => setPortfolioLink(e.target.value)}
                        className={inputClass}
                      />
                    </GlassInput>
                  </motion.div>
                )}

                {/* ── STEP 2: Learning Points ── */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-5"
                  >
                    <GlassInput label="What learners will gain" icon={GraduationCap}>
                      <div className="space-y-3">
                        <AnimatePresence>
                          {learningPoints.map((point, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex gap-2"
                            >
                              <span className="flex items-center justify-center w-8 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold shrink-0">
                                {index + 1}
                              </span>
                              <input
                                type="text"
                                placeholder={`Learning gain #${index + 1}`}
                                value={point}
                                onChange={(e) => handlePointChange(index, e.target.value)}
                                className={inputClass}
                              />
                              {index > 0 && (
                                <motion.button
                                  type="button"
                                  onClick={() => handleRemovePoint(index)}
                                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors shrink-0"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <X size={14} />
                                </motion.button>
                              )}
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        <motion.button
                          type="button"
                          onClick={handleAddPoint}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold hover:bg-cyan-500/20 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Plus size={14} />
                          Add another point
                        </motion.button>
                      </div>
                    </GlassInput>
                  </motion.div>
                )}

                {/* ── STEP 3: Review ── */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-5"
                  >
                    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 space-y-4">
                      <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                        <Sparkles size={12} className="text-cyan-400" />
                        Review Your Skill
                      </h3>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Name</span>
                          <p className="mt-1 text-white/80 capitalize">{skillname || "—"}</p>
                        </div>
                        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Category</span>
                          <p className="mt-1 text-white/80">{category || "—"}</p>
                        </div>
                        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Level</span>
                          <p className="mt-1 text-white/80">{level || "—"}</p>
                        </div>
                        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Image</span>
                          <p className="mt-1 text-white/80">{file ? "Uploaded" : "—"}</p>
                        </div>
                      </div>

                      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Description</span>
                        <p className="mt-1 text-white/70 text-sm leading-relaxed">{description || "—"}</p>
                      </div>

                      {youtubeLink && (
                        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 flex items-center gap-2">
                          <Youtube size={14} className="text-red-400" />
                          <span className="text-sm text-white/60 truncate">{youtubeLink}</span>
                        </div>
                      )}
                      {portfolioLink && (
                        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 flex items-center gap-2">
                          <ExternalLink size={14} className="text-emerald-400" />
                          <span className="text-sm text-white/60 truncate">{portfolioLink}</span>
                        </div>
                      )}

                      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">
                          Learning Points ({learningPoints.filter((p) => p.trim()).length})
                        </span>
                        <ul className="mt-2 space-y-1">
                          {learningPoints
                            .filter((p) => p.trim())
                            .map((p, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/50 shrink-0" />
                                {p}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    {/* submit CTA */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full relative overflow-hidden flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-sm hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={!loading ? { scale: 1.01 } : {}}
                      whileTap={!loading ? { scale: 0.99 } : {}}
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Submit Skill
                        </>
                      )}
                      {/* shimmer */}
                      {!loading && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
                          animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                          style={{ backgroundSize: "200% 100%" }}
                        />
                      )}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* navigation buttons (not on review step) */}
              {currentStep < 3 && (
                <motion.div
                  className="mt-8 flex gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentStep > 0 && (
                    <motion.button
                      type="button"
                      onClick={goBack}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/50 text-sm font-semibold hover:bg-white/[0.08] hover:text-white/70 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowLeft size={14} />
                      Back
                    </motion.button>
                  )}
                  <motion.button
                    type="button"
                    onClick={goNext}
                    disabled={!canAdvance()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/15 disabled:opacity-40 disabled:cursor-not-allowed ml-auto"
                    whileHover={canAdvance() ? { scale: 1.02 } : {}}
                    whileTap={canAdvance() ? { scale: 0.98 } : {}}
                  >
                    Continue
                    <ArrowRight size={14} />
                  </motion.button>
                </motion.div>
              )}
            </form>

            {/* message */}
            <AnimatePresence>
              {message && currentStep < 3 && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-center text-sm text-white/50"
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: LIVE PREVIEW ── */}
          <motion.div
            className="hidden lg:block w-80 shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="sticky top-10 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 flex items-center gap-2">
                <Sparkles size={10} className="text-cyan-400/50" />
                Live Preview
              </span>
              <SkillPreviewCard
                skillname={skillname}
                description={description}
                level={level}
                category={category}
                file={file}
                learningPoints={learningPoints}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Achievement popup */}
      <FirstAchievementPopup
        trigger={showFirstSkillPopup}
        points={Point}
        message={AchievementMessage}
        onClose={() => {
          setShowFirstSkillPopup(false);
          setSkillname("");
          setDescription("");
          setLevel("");
          setCategory("");
          setFile(null);
          setYoutubeLink("");
          setPortfolioLink("");
          setLearningPoints([""]);
          setCurrentStep(0);
          setTimeout(() => (window.location.href = "/skills"), 800);
        }}
      />
    </main>
  );
}

// /* ─── useRouter stub for Vite (replaced by Next.js in production) ─── */
// function useRouter() {
//   return {
//     push: (path: string) => { window.location.href = path; },
//     back: () => { window.history.back(); },
//   };
// }

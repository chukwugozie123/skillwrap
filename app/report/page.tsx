"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  AlertTriangle,
  Shield,
  User,
  Layers,
  Calendar,
  ArrowLeftRight,
  MessageSquare,
  MessageCircle,
  Bug,
  Skull,
  EyeOff,
  Copyright,
  CreditCard,
  UserX,
  Frown,
  Wrench,
  Send,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Lock,
  Eye,
  Upload,
  X,
  Loader2,
  FileText,
  AlertCircle,
  Info,
  ChevronRight,
  Clock,
  FileCheck,
  Search,
  Scale,
  Mail,
  Copy,
  ExternalLink,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ReportFormData {
  category: string;
  reportType: string;
  subject: string;
  description: string;
  severity: string;
  evidence: File[];
  contactEmail: string;
  anonymous: boolean;
  agreedToTerms: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const reportCategories = [
  { id: "user", label: "User", icon: User, color: "from-blue-500 to-cyan-500", description: "Report a user profile or behavior" },
  { id: "skill", label: "Skill", icon: Layers, color: "from-cyan-500 to-teal-500", description: "Report inappropriate or fake skill listings" },
  { id: "event", label: "Event", icon: Calendar, color: "from-teal-500 to-emerald-500", description: "Report event-related issues" },
  { id: "exchange", label: "Exchange", icon: ArrowLeftRight, color: "from-emerald-500 to-green-500", description: "Report exchange disputes or problems" },
  { id: "message", label: "Message", icon: MessageSquare, color: "from-green-500 to-lime-500", description: "Report inappropriate messages" },
  { id: "comment", label: "Comment", icon: MessageCircle, color: "from-lime-500 to-yellow-500", description: "Report harmful or spam comments" },
  { id: "bug", label: "Bug", icon: Bug, color: "from-yellow-500 to-orange-500", description: "Report technical issues or bugs" },
  { id: "scam", label: "Scam", icon: Skull, color: "from-orange-500 to-red-500", description: "Report fraudulent activity" },
  { id: "inappropriate", label: "Inappropriate Content", icon: EyeOff, color: "from-red-500 to-pink-500", description: "Report offensive or harmful content" },
  { id: "copyright", label: "Copyright", icon: Copyright, color: "from-pink-500 to-purple-500", description: "Report intellectual property violations" },
  { id: "payment", label: "Payment Issue", icon: CreditCard, color: "from-purple-500 to-indigo-500", description: "Report payment or billing problems" },
  { id: "fake-profile", label: "Fake Profile", icon: UserX, color: "from-indigo-500 to-blue-500", description: "Report impersonation or fake accounts" },
  { id: "harassment", label: "Harassment", icon: Frown, color: "from-rose-500 to-red-500", description: "Report harassment or bullying" },
  { id: "technical", label: "Technical Issue", icon: Wrench, color: "from-slate-500 to-gray-500", description: "Report platform technical problems" },
];

const severityLevels = [
  { id: "low", label: "Low", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", description: "Minor issue, not urgent" },
  { id: "medium", label: "Medium", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", description: "Moderate issue, needs attention" },
  { id: "high", label: "High", color: "bg-orange-500/20 text-orange-400 border-orange-500/30", description: "Serious issue, prioritize" },
  { id: "critical", label: "Critical", color: "bg-red-500/20 text-red-400 border-red-500/30", description: "Urgent, immediate action required" },
];

const infoCards = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "All reports are handled with strict confidentiality. Your identity is protected.",
    gradient: "from-cyan-500/20 to-blue-500/10",
  },
  {
    icon: Clock,
    title: "Quick Response",
    description: "Our moderation team reviews reports within 24-48 hours.",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
  {
    icon: Scale,
    title: "Fair Process",
    description: "Every report is investigated thoroughly with due process.",
    gradient: "from-purple-500/20 to-pink-500/10",
  },
];

const faqItems = [
  {
    question: "What happens after I submit a report?",
    answer: "Your report is assigned a unique ID and reviewed by our moderation team within 24-48 hours. You'll receive updates via email if you provided one. Serious violations are prioritized and may result in immediate action.",
  },
  {
    question: "Will the reported user know who reported them?",
    answer: "No. All reports are completely confidential. The reported party will never know who submitted the report. If you choose to report anonymously, we have no way to trace your identity either.",
  },
  {
    question: "What evidence should I provide?",
    answer: "Screenshots, message copies, profile links, and any relevant URLs help us investigate faster. The more context you provide, the quicker we can take appropriate action. You can upload up to 5 files.",
  },
  {
    question: "Can I withdraw a report?",
    answer: "Yes, you can withdraw a report within 24 hours of submission by contacting support with your Report ID. After 24 hours, the report becomes part of our permanent moderation records.",
  },
  {
    question: "What actions can be taken against violators?",
    answer: "Depending on severity, actions range from warnings and temporary restrictions to permanent bans. For illegal content, we cooperate with law enforcement and may terminate accounts immediately.",
  },
  {
    question: "How do I report an emergency situation?",
    answer: "For immediate danger or illegal activity, please also contact your local law enforcement. Our platform handles policy violations, but authorities handle criminal matters. We cooperate fully with legal investigations.",
  },
];

// ─── Animation Variants ──────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Aurora Blob Component ───────────────────────────────────────────────────
function AuroraBlob({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.2, 0.5, 0.3, 0.2],
        scale: [0.85, 1.15, 1, 0.85],
        x: [0, 30, -20, 0],
        y: [0, -20, 30, 0],
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    />
  );
}

// ─── Category Card Component ────────────────────────────────────────────────
function CategoryCard({
  category,
  isSelected,
  onClick,
  delay = 0,
}: {
  category: typeof reportCategories[0];
  isSelected: boolean;
  onClick: () => void;
  delay?: number;
}) {
  const Icon = category.icon;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative text-left"
    >
      <div
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 ${
          isSelected ? "opacity-50" : "group-hover:opacity-30"
        } blur-xl transition-all duration-500`}
      />

      <div
        className={`relative p-5 rounded-2xl border transition-all duration-300 ${
          isSelected
            ? "bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/[0.2]"
            : "bg-white/[0.02] border-white/[0.06] group-hover:border-white/[0.12]"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg transition-transform duration-300 ${
              isSelected ? "scale-110" : "group-hover:scale-105"
            }`}
          >
            <Icon size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-semibold mb-1">{category.label}</h4>
            <p className="text-xs text-white/50">{category.description}</p>
          </div>
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="p-1.5 rounded-full bg-cyan-500"
            >
              <CheckCircle2 size={14} className="text-white" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// ─── Info Card Component ─────────────────────────────────────────────────────
function InfoCard({
  icon: Icon,
  title,
  description,
  gradient,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ delay }}
      className="group relative"
    >
      <div className={`absolute -inset-1 rounded-2xl ${gradient} opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500`} />

      <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] group-hover:border-white/[0.12] transition-all duration-300">
        <div className={`p-3 rounded-xl ${gradient} border border-white/10 w-fit mb-4`}>
          <Icon size={20} className="text-white" />
        </div>
        <h4 className="text-white font-bold mb-2">{title}</h4>
        <p className="text-sm text-white/50 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// ─── FAQ Accordion Item ──────────────────────────────────────────────────────
function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="relative rounded-2xl overflow-hidden">
        <button
          onClick={onClick}
          className="relative w-full text-left p-6 bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-white font-semibold">{question}</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <ChevronDown size={20} className="text-cyan-400" />
            </motion.div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="pt-4 text-sm text-white/60 leading-relaxed">{answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}

// ─── File Upload Component ───────────────────────────────────────────────────
function FileUpload({
  files,
  onFilesChange,
}: {
  files: File[];
  onFilesChange: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    if (files.length + newFiles.length <= 5) {
      onFilesChange([...files, ...newFiles]);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (files.length + newFiles.length <= 5) {
      onFilesChange([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <motion.div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        className="relative border-2 border-dashed border-white/[0.1] rounded-2xl p-8 hover:border-cyan-500/50 transition-colors duration-300 cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
          >
            <Upload size={28} className="text-cyan-400" />
          </motion.div>

          <div className="text-center">
            <p className="text-white font-semibold mb-1">Drop files here or click to upload</p>
            <p className="text-xs text-white/40">Screenshots, PDFs, or documents (max 5 files, 10MB each)</p>
          </div>
        </div>
      </motion.div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-2"
          >
            {files.map((file, index) => (
              <motion.div
                key={file.name + index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <FileCheck size={16} className="text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{file.name}</p>
                  <p className="text-xs text-white/40">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X size={14} className="text-white/50 hover:text-white" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Success Modal Component ─────────────────────────────────────────────────
function SuccessModal({
  reportId,
  onClose,
}: {
  reportId: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyReportId = () => {
    navigator.clipboard.writeText(reportId);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-lg"
      >
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1424] to-[#0a0f1c]" />
          <div className="absolute inset-0 border border-white/[0.08] rounded-3xl" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

          <div className="relative p-8 sm:p-10 text-center">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="mx-auto mb-6"
            >
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/30 to-green-500/20 blur-xl" />
                <motion.div
                  initial={{ rotate: -180 }}
                  animate={{ rotate: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-xl shadow-emerald-500/30"
                >
                  <CheckCircle2 size={48} className="text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white mb-3">Report Submitted Successfully</h3>
              <p className="text-white/60 mb-6 max-w-sm mx-auto">
                Thank you for helping keep SkillWrap safe. Our team will review your report within 24-48 hours.
              </p>
            </motion.div>

            {/* Report ID */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Your Report ID</p>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1]">
                <span className="text-lg font-mono font-bold text-cyan-400">{reportId}</span>
                <motion.button
                  onClick={copyReportId}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {copied ? (
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  ) : (
                    <Copy size={16} className="text-white/50" />
                  )}
                </motion.button>
              </div>
              <p className="text-xs text-white/40 mt-2">Save this ID to track your report status</p>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6"
            >
              <div className="flex items-start gap-3">
                <Info size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-white/50 text-left leading-relaxed">
                  We'll send updates to your email if provided. For urgent matters, contact us directly with your Report ID.
                </p>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <motion.a
                href="/"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/25 text-center"
              >
                Go Home
              </motion.a>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
              >
                Submit Another Report
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Report Page ────────────────────────────────────────────────────────
export default function ReportPage() {
  const [formData, setFormData] = useState<ReportFormData>({
    category: "",
    reportType: "",
    subject: "",
    description: "",
    severity: "",
    evidence: [],
    contactEmail: "",
    anonymous: false,
    agreedToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [reportId, setReportId] = useState("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.description.length < 20) newErrors.description = "Please provide more details (at least 20 characters)";
    if (!formData.severity) newErrors.severity = "Please select a severity level";
    if (!formData.agreedToTerms) newErrors.agreedToTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Generate report ID
    const id = `SW-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setReportId(id);
    setShowSuccess(true);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      category: "",
      reportType: "",
      subject: "",
      description: "",
      severity: "",
      evidence: [],
      contactEmail: "",
      anonymous: false,
      agreedToTerms: false,
    });
    setErrors({});
    setShowSuccess(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050810]">
      {/* ── Animated Background ─────────────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050810] via-[#0a1020] to-[#050810]" />

        <AuroraBlob
          delay={0}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-rose-600/15 via-orange-500/10 to-transparent blur-[120px]"
        />
        <AuroraBlob
          delay={5}
          className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-600/12 via-red-500/8 to-transparent blur-[100px]"
        />
        <AuroraBlob
          delay={10}
          className="absolute -bottom-40 left-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/6 blur-[100px]"
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* ── Hero Section ─────────────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500/10 to-orange-500/10 border border-rose-500/20 backdrop-blur-xl mb-8"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Shield size={14} className="text-rose-400" />
              </motion.div>
              <span className="text-sm font-semibold text-rose-300">Safety & Moderation</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6"
            >
              <span className="text-white">Report an{" "}</span>
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-orange-300 to-amber-300">
                  Issue
                </span>
                <motion.span
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-4 bg-gradient-to-r from-rose-500/40 to-amber-500/40 blur-3xl -z-10"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
            >
              Help us keep SkillWrap safe for everyone. Report violations, inappropriate content, or any issues you encounter.
            </motion.p>
          </motion.div>

          {/* ── Info Cards ─────────────────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {infoCards.map((card, i) => (
              <InfoCard key={card.title} {...card} delay={i * 0.1} />
            ))}
          </motion.div>

          {/* ── Main Form Section ───────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          >
            {/* ── Form ─────────────────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* ── Category Selection ───────────────────────────────────────── */}
                <div className="relative rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-white/[0.01]" />
                  <div className="absolute inset-0 border border-white/[0.06] rounded-3xl" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-400/30 to-transparent" />

                  <div className="relative p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500/20 to-orange-500/10 border border-rose-400/30">
                        <AlertTriangle size={20} className="text-rose-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">What are you reporting?</h2>
                        <p className="text-sm text-white/50">Select the category that best describes your issue</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {reportCategories.map((category, i) => (
                        <CategoryCard
                          key={category.id}
                          category={category}
                          isSelected={formData.category === category.id}
                          onClick={() => setFormData({ ...formData, category: category.id })}
                          delay={i * 0.03}
                        />
                      ))}
                    </div>

                    {errors.category && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 text-sm text-rose-400 flex items-center gap-2"
                      >
                        <AlertCircle size={14} /> {errors.category}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* ── Details Section ─────────────────────────────────────────── */}
                <div className="relative rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-white/[0.01]" />
                  <div className="absolute inset-0 border border-white/[0.06] rounded-3xl" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

                  <div className="relative p-6 sm:p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/30">
                        <FileText size={20} className="text-cyan-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Report Details</h2>
                        <p className="text-sm text-white/50">Provide as much information as possible</p>
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Subject <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Brief summary of the issue"
                        className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border ${
                          errors.subject ? "border-rose-500/50" : "border-white/[0.08]"
                        } text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all duration-300`}
                      />
                      {errors.subject && (
                        <p className="mt-2 text-sm text-rose-400 flex items-center gap-2">
                          <AlertCircle size={14} /> {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Description <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe the issue in detail. Include relevant links, usernames, dates, and any other helpful context."
                        rows={6}
                        className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border ${
                          errors.description ? "border-rose-500/50" : "border-white/[0.08]"
                        } text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all duration-300 resize-none`}
                      />
                      <div className="flex justify-between mt-2">
                        {errors.description ? (
                          <p className="text-sm text-rose-400 flex items-center gap-2">
                            <AlertCircle size={14} /> {errors.description}
                          </p>
                        ) : (
                          <span />
                        )}
                        <span className={`text-xs ${formData.description.length < 20 ? "text-white/30" : "text-emerald-400"}`}>
                          {formData.description.length} chars
                        </span>
                      </div>
                    </div>

                    {/* Severity */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3">
                        Severity Level <span className="text-rose-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {severityLevels.map((level) => (
                          <motion.button
                            key={level.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, severity: level.id })}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                              formData.severity === level.id
                                ? `${level.color} border-current`
                                : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"
                            }`}
                          >
                            <span className={`text-sm font-semibold ${formData.severity === level.id ? "" : "text-white/70"}`}>
                              {level.label}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                      {errors.severity && (
                        <p className="mt-2 text-sm text-rose-400 flex items-center gap-2">
                          <AlertCircle size={14} /> {errors.severity}
                        </p>
                      )}
                    </div>

                    {/* Evidence Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-3">
                        Evidence (Optional)
                      </label>
                      <FileUpload
                        files={formData.evidence}
                        onFilesChange={(files) => setFormData({ ...formData, evidence: files })}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Contact & Privacy ──────────────────────────────────────── */}
                <div className="relative rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-white/[0.01]" />
                  <div className="absolute inset-0 border border-white/[0.06] rounded-3xl" />
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

                  <div className="relative p-6 sm:p-8 space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-400/30">
                        <Lock size={20} className="text-purple-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Contact & Privacy</h2>
                        <p className="text-sm text-white/50">Choose how you want to submit this report</p>
                      </div>
                    </div>

                    {/* Email (optional) */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Email for Updates (Optional)
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input
                          type="email"
                          value={formData.contactEmail}
                          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                          placeholder="your@email.com"
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all duration-300"
                        />
                      </div>
                      <p className="mt-2 text-xs text-white/40">We'll only use this to send report updates</p>
                    </div>

                    {/* Anonymous Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="flex items-center gap-3">
                        <EyeOff size={18} className="text-purple-400" />
                        <div>
                          <p className="text-white font-medium text-sm">Submit Anonymously</p>
                          <p className="text-xs text-white/40">Your identity will be hidden</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, anonymous: !formData.anonymous })}
                        className={`w-12 h-7 rounded-full transition-all duration-300 ${
                          formData.anonymous ? "bg-purple-500" : "bg-white/10"
                        }`}
                      >
                        <motion.div
                          animate={{ x: formData.anonymous ? 22 : 2 }}
                          className="w-5 h-5 rounded-full bg-white shadow-lg"
                        />
                      </button>
                    </div>

                    {/* Terms Agreement */}
                    <div className="space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-1">
                          <input
                            type="checkbox"
                            checked={formData.agreedToTerms}
                            onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-lg border transition-all duration-300 ${
                              formData.agreedToTerms
                                ? "bg-cyan-500 border-cyan-500"
                                : "bg-white/[0.04] border-white/[0.2] group-hover:border-white/[0.4]"
                            }`}
                          >
                            {formData.agreedToTerms && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center justify-center h-full"
                              >
                                <CheckCircle2 size={12} className="text-white" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-white/60 leading-relaxed">
                          I confirm this report is accurate and made in good faith. I understand that false reports may result in account restrictions.{" "}
                          <span className="text-rose-400">*</span>
                        </span>
                      </label>
                      {errors.agreedToTerms && (
                        <p className="text-sm text-rose-400 flex items-center gap-2">
                          <AlertCircle size={14} /> {errors.agreedToTerms}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white font-bold text-lg shadow-xl shadow-rose-500/25 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                    >
                      <motion.div
                        animate={isSubmitting ? {} : { x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />

                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Loader2 size={22} />
                            </motion.div>
                            Submitting Report...
                          </>
                        ) : (
                          <>
                            <Send size={22} />
                            Submit Report
                          </>
                        )}
                      </span>
                    </motion.button>

                    <p className="text-xs text-white/30 text-center">
                      By submitting, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>

            {/* ── Sidebar ──────────────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="space-y-6">
              {/* Quick Help */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-white/[0.01]" />
                <div className="absolute inset-0 border border-white/[0.06] rounded-2xl" />

                <div className="relative p-6">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <FileCheck size={16} className="text-cyan-400" />
                    What Happens Next
                  </h3>

                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Review", desc: "Our team reviews within 24-48 hours" },
                      { step: "2", title: "Investigate", desc: "We examine evidence and context" },
                      { step: "3", title: "Action", desc: "Appropriate measures are taken" },
                      { step: "4", title: "Notify", desc: "You receive status updates" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.step}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/30 flex items-center justify-center text-xs font-bold text-cyan-400 flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{item.title}</p>
                          <p className="text-white/40 text-xs">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Emergency Notice */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-orange-500/5" />
                <div className="absolute inset-0 border border-rose-500/20 rounded-2xl" />

                <div className="relative p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={16} className="text-rose-400" />
                    <h3 className="text-white font-bold text-sm">Emergency?</h3>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed mb-4">
                    If you're in immediate danger or witnessing illegal activity, please contact local law enforcement first.
                  </p>
                  <a
                    href="mailto:urgent@skillwrap.com"
                    className="inline-flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    <ExternalLink size={12} />
                    Contact Emergency Support
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── FAQ Section ───────────────────────────────────────────────────── */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
                <Sparkles size={14} className="text-purple-400" />
                <span className="text-sm font-semibold text-purple-300">FAQ</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Common Questions</h2>
              <p className="text-white/50">Learn more about our reporting process</p>
            </motion.div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {/* ── Success Modal ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSuccess && (
          <SuccessModal reportId={reportId} onClose={resetForm} />
        )}
      </AnimatePresence>
    </main>
  );
}

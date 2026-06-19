"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  X,
  Trash2,
  Sparkles,
  Clock,
  ArrowLeft,
  Search,
  Send,
  ChevronRight,
  Eye,
  MessageCircle,
  ArrowRight,
  Zap,
  Shield,
  BookOpen,
  GraduationCap,
  ArrowLeftRight,
  Filter,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Hourglass,
} from "lucide-react";

type Notification = {
  id: number;
  roomid: string | number | null;
  created_at: string;
  message: string;
  metadata: number | string;
};

type RequestItem = {
  exchange_id: number;
  to_fullname: string;
  to_username: string;
  requested_skill_title: string;
  skill_offered_title?: string;
  note?: string;
  mode: "learning" | "teaching" | "exchange";
  created_at: string;
  status: string;
};

interface Props {
  userMode: "learning" | "teaching" | "exchange";
}

// const API_URL = "https://skillwrap-backend.onrender.com";

  const API_URL = "http://localhost:4000";

/* ─── helpers ─── */

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function avatarColor(name: string) {
  const colors = [
    "from-cyan-500 to-blue-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-amber-600",
    "from-pink-500 to-rose-600",
    "from-sky-500 to-cyan-600",
    "from-teal-500 to-emerald-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function relativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

type FilterTab = "all" | "pending" | "accepted" | "declined";

/* ─── animation presets ─── */

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
  exit: { opacity: 0, y: -12, scale: 0.96, transition: { duration: 0.18 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
};

const orbFloat = (i: number): Variants => ({
  animate: {
    y: [0, -18 - i * 6, 0],
    x: [0, i % 2 ? 12 : -12, 0],
    scale: [1, 1.08 + i * 0.02, 1],
    transition: { duration: 6 + i * 1.5, repeat: Infinity, ease: "easeInOut" },
  },
});

const pulseGlow: Variants = {
  animate: {
    boxShadow: [
      "0 0 0px rgba(34,211,238,0)",
      "0 0 24px rgba(34,211,238,.35)",
      "0 0 0px rgba(34,211,238,0)",
    ],
    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
  },
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
        { size: 150, top: "12%", left: "80%", color: "bg-emerald-400/8" },
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

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-white/[0.06] animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-28 rounded bg-white/[0.06] animate-pulse" />
          <div className="h-3 w-20 rounded bg-white/[0.04] animate-pulse" />
        </div>
        <div className="h-6 w-16 rounded-full bg-white/[0.06] animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-white/[0.04] animate-pulse" />
        <div className="h-3 w-3/4 rounded bg-white/[0.04] animate-pulse" />
      </div>
      <div className="flex gap-3 pt-2">
        <div className="h-9 w-24 rounded-xl bg-white/[0.06] animate-pulse" />
        <div className="h-9 w-24 rounded-xl bg-white/[0.06] animate-pulse" />
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const config: Record<string, { style: string; icon: React.ElementType }> = {
    pending: { style: "bg-amber-500/15 text-amber-300 ring-amber-500/30", icon: Hourglass },
    accepted: { style: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30", icon: CheckCircle2 },
    declined: { style: "bg-red-500/15 text-red-300 ring-red-500/30", icon: XCircle },
    completed: { style: "bg-cyan-500/15 text-cyan-300 ring-cyan-500/30", icon: CheckCircle2 },
    cancelled: { style: "bg-gray-500/15 text-gray-400 ring-gray-500/30", icon: XCircle },
  };
  const c = config[status] || config.cancelled;
  const Icon = c.icon;

  return (
    <motion.span
      layout
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full ring-1 ${c.style}`}
    >
      {status === "pending" ? (
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-amber-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      ) : (
        <Icon size={10} />
      )}
      {status}
    </motion.span>
  );
}

function ModeBadge({ mode }: { mode: string }) {
  const config: Record<string, { style: string; icon: React.ElementType; label: string }> = {
    learning: { style: "bg-sky-500/10 text-sky-400 ring-sky-500/20", icon: GraduationCap, label: "Learning" },
    teaching: { style: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20", icon: BookOpen, label: "Teaching" },
    exchange: { style: "bg-cyan-500/10 text-cyan-400 ring-cyan-500/20", icon: ArrowLeftRight, label: "Exchange" },
  };
  const c = config[mode] || config.exchange;
  const Icon = c.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ring-1 text-[11px] font-semibold uppercase tracking-wider ${c.style}`}>
      <Icon size={10} />
      {c.label}
    </span>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div
      className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarColor(name)} flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-cyan-500/10 shrink-0`}
    >
      {getInitials(name)}
    </div>
  );
}

function SkillBadge({ label, skill, variant }: { label: string; skill: string; variant: "offered" | "requested" }) {
  const isOffered = variant === "offered";
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2">
      <span className={`text-[10px] font-bold uppercase tracking-widest ${isOffered ? "text-emerald-400" : "text-cyan-400"}`}>
        {label}
      </span>
      <span className="text-sm text-white/90 font-medium truncate">{skill}</span>
    </div>
  );
}

/* ─── main component ─── */

export default function RequestPage({ userMode }: Props) {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReq, setSelectedReq] = useState<RequestItem | null>(null);
  const [popup, setPopup] = useState(false);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  /* fetch profile */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, { credentials: "include" });
        if (!res.ok) window.location.href = "/login";
      } catch {
        /* ignore */
      }
    };
    fetchProfile();
  }, []);

  /* load requests */
  useEffect(() => {
    async function loadRequests() {
      try {
        const res = await fetch(`${API_URL}/exchange/sent`, {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();
        setRequests(data.requests || []);
      } catch {
        toast.error("Failed to load sent requests");
      } finally {
        setLoading(false);
      }
    }
    loadRequests();
  }, []);

  /* filtered list */
  const filtered = useMemo(() => {
    let list = requests;
    if (activeTab !== "all") list = list.filter((r) => r.status === activeTab);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          (r.to_fullname || "").toLowerCase().includes(q) ||
          (r.to_username || "").toLowerCase().includes(q) ||
          (r.requested_skill_title || "").toLowerCase().includes(q) ||
          (r.skill_offered_title || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [requests, activeTab, searchQuery]);

  /* stats */
  const stats = useMemo(() => {
    const pending = requests.filter((r) => r.status === "pending").length;
    const accepted = requests.filter((r) => r.status === "accepted").length;
    const declined = requests.filter((r) => r.status === "declined").length;
    return { total: requests.length, pending, accepted, declined };
  }, [requests]);

  /* delete */
  const handleDelete = useCallback(async (req: RequestItem) => {
    const confirmDelete = window.confirm(
      `Delete exchange for "${req.skill_offered_title || req.requested_skill_title}"?`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/delete/exchange/request`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exchange_id: req.exchange_id }),
      });

      if (!res.ok) {
        toast.error("Delete failed");
        return;
      }

      setRequests((prev) => prev.filter((r) => r.exchange_id !== req.exchange_id));
      toast.success("Request deleted", { theme: "dark", transition: Slide });
    } catch {
      toast.error("Network error");
    }
  }, []);

  const navigate = (path: string) => {
    window.location.href = path;
  };

  /* ─── render ─── */

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: "all", label: "All", count: stats.total },
    { key: "pending", label: "Pending", count: stats.pending },
    { key: "accepted", label: "Accepted", count: stats.accepted },
    { key: "declined", label: "Declined", count: stats.declined },
  ];

  return (
    <main className="relative min-h-screen bg-[#030712] text-white overflow-hidden">
      <FloatingOrbs />
      <ToastContainer newestOnTop theme="dark" />

      {/* ── HEADER ── */}
      <div className="relative z-10 pt-10 pb-6 px-6 max-w-7xl mx-auto">
        {/* back + CTA */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/50 text-sm hover:bg-white/[0.08] hover:text-white/70 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>
        </motion.div>

        {/* title */}
        <motion.div className="mt-8" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Sent Requests
            </span>
          </h1>
          <p className="mt-2 text-white/35 text-sm">Track your outgoing skill exchange requests</p>
        </motion.div>

        {/* ── STATS ROW ── */}
        <motion.div
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          {[
            { label: "Total Sent", value: stats.total, icon: Send, color: "text-cyan-400 bg-cyan-500/10" },
            { label: "Pending", value: stats.pending, icon: Hourglass, color: "text-amber-400 bg-amber-500/10" },
            { label: "Accepted", value: stats.accepted, icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10" },
            { label: "Declined", value: stats.declined, icon: XCircle, color: "text-red-400 bg-red-500/10" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm px-5 py-4 flex items-center gap-3 overflow-hidden"
              whileHover={{ borderColor: "rgba(34,211,238,.2)", scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-blue-500/[0.03]" />
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
                <s.icon size={18} />
              </div>
              <div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── FILTER BAR ── */}
        <motion.div
          className="mt-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {/* tabs */}
          <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === t.key ? "text-white" : "text-white/40 hover:text-white/60"
                }`}
              >
                {activeTab === t.key && (
                  <motion.div
                    layoutId="sentActiveTab"
                    className="absolute inset-0 rounded-lg bg-white/[0.08] border border-white/[0.1]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {t.label}
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      activeTab === t.key ? "bg-cyan-500/20 text-cyan-300" : "bg-white/[0.06] text-white/30"
                    }`}
                  >
                    {t.count}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* search */}
          <div className="relative w-full md:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
            <input
              type="text"
              placeholder="Search sent requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition"
            />
          </div>
        </motion.div>
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 px-6 pb-20 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeletons"
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div key={i} variants={cardIn}>
                  <SkeletonCard />
                </motion.div>
              ))}
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div
              key="empty"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center justify-center py-28 text-center"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6">
                  <Send size={28} className="text-white/15 rotate-[-30deg]" />
                </div>
                <div className="absolute inset-0 w-20 h-20 rounded-full bg-cyan-500/5 animate-ping opacity-20" />
              </div>
              <h3 className="text-lg font-semibold text-white/50">
                {searchQuery || activeTab !== "all" ? "No matching requests" : "No sent requests yet"}
              </h3>
              <p className="mt-2 text-sm text-white/25 max-w-xs">
                {searchQuery || activeTab !== "all"
                  ? "Try adjusting your search or filter"
                  : "When you send a skill exchange request, it will appear here"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="cards"
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((req) => {
                const displayName = req.to_fullname || req.to_username || "Unknown";

                return (
                  <motion.div
                    key={req.exchange_id}
                    variants={cardIn}
                    layout
                    className="group relative rounded-2xl bg-white/[0.025] border border-white/[0.06] backdrop-blur-sm overflow-hidden"
                    whileHover={{ scale: 1.015, borderColor: "rgba(34,211,238,.18)" }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  >
                    {/* hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-blue-500/[0.04]" />

                    {/* animated top border */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent group-hover:via-cyan-400/30 transition-all duration-500" />

                    <div className="relative p-6 flex flex-col gap-4">
                      {/* top row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <Avatar name={displayName} />
                          <div className="min-w-0">
                            <h3 className="text-base font-semibold text-white truncate">{displayName}</h3>
                            {req.to_username && (
                              <span className="text-[11px] text-white/30">@{req.to_username}</span>
                            )}
                          </div>
                        </div>
                        <StatusPill status={req.status} />
                      </div>

                      {/* skills */}
                      <div className="flex flex-col gap-2">
                        <SkillBadge label="Requested" skill={req.requested_skill_title} variant="requested" />
                        {req.mode === "exchange" && req.skill_offered_title && (
                          <SkillBadge label="Offered" skill={req.skill_offered_title} variant="offered" />
                        )}
                      </div>

                      {/* mode + time row */}
                      <div className="flex items-center justify-between">
                        <ModeBadge mode={req.mode} />
                        <span className="flex items-center gap-1.5 text-[11px] text-white/25">
                          <Clock size={11} />
                          {relativeTime(req.created_at)}
                        </span>
                      </div>

                      {/* actions */}
                      <div className="flex gap-2.5 pt-1">
                        <motion.button
                          onClick={() => {
                            setSelectedReq(req);
                            setPopup(true);
                          }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/60 text-sm font-semibold hover:bg-white/[0.08] hover:text-white/80 transition-colors"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Eye size={15} />
                          Details
                        </motion.button>

                        {req.status === "accepted" && (
                          <motion.button
                            onClick={() => navigate(`/chat/${req.exchange_id}`)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-colors"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <MessageCircle size={15} />
                            Chat
                          </motion.button>
                        )}

                        <motion.button
                          onClick={() => handleDelete(req)}
                          className="ml-auto flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-500/[0.06] border border-red-500/10 text-red-400/60 text-xs font-medium hover:bg-red-500/15 hover:text-red-400 transition-colors"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          <Trash2 size={13} />
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── DETAILS MODAL ── */}
      <AnimatePresence>
        {popup && selectedReq && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setPopup(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#0c1425] to-[#060d1b] border border-white/[0.08] shadow-2xl shadow-cyan-500/5 overflow-hidden"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
            >
              {/* glow accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 rounded-b-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

              <div className="p-8">
                <button
                  onClick={() => setPopup(false)}
                  className="absolute top-5 right-5 text-white/30 hover:text-white/60 transition"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Sparkles size={18} className="text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Exchange Details</h2>
                </div>

                <div className="space-y-5">
                  {/* recipient */}
                  <div className="flex items-center gap-3">
                    <Avatar name={selectedReq.to_fullname || selectedReq.to_username || "Unknown"} />
                    <div>
                      <p className="text-sm font-semibold text-white">{selectedReq.to_fullname || selectedReq.to_username}</p>
                      {selectedReq.to_username && (
                        <p className="text-[11px] text-white/30">@{selectedReq.to_username}</p>
                      )}
                    </div>
                    <div className="ml-auto flex gap-2">
                      <StatusPill status={selectedReq.status} />
                      <ModeBadge mode={selectedReq.mode} />
                    </div>
                  </div>

                  <div className="h-px bg-white/[0.04]" />

                  {/* skills */}
                  <div className="space-y-2">
                    <SkillBadge label="Requested" skill={selectedReq.requested_skill_title} variant="requested" />
                    {selectedReq.mode === "exchange" && selectedReq.skill_offered_title && (
                      <SkillBadge label="Offered" skill={selectedReq.skill_offered_title} variant="offered" />
                    )}
                  </div>

                  {/* note */}
                  {selectedReq.note && (
                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Note</span>
                      <p className="mt-1.5 text-sm text-white/70 leading-relaxed">{selectedReq.note}</p>
                    </div>
                  )}

                  {/* meta grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Mode</span>
                      <p className="mt-1 text-white/70 capitalize">{selectedReq.mode}</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Status</span>
                      <p className="mt-1 text-white/70 capitalize">{selectedReq.status}</p>
                    </div>
                    <div className="col-span-2 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Sent</span>
                      <p className="mt-1 text-white/70">{new Date(selectedReq.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* chat CTA */}
                {selectedReq.status === "accepted" && (
                  <motion.button
                    onClick={() => navigate(`/chat/${selectedReq.exchange_id}`)}
                    className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-sm hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle size={16} />
                    Continue Chat
                    <ArrowRight size={14} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

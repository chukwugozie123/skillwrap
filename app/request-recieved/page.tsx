"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import { addXP, XpTransactions } from "@/lib/Xpapi";
import "react-toastify/dist/ReactToastify.css";
import {
  CheckCircle,
  XCircle,
  Eye,
  X,
  Sparkles,
  Clock,
  MessageCircle,
  Search,
  Filter,
  ChevronRight,
  Zap,
  Shield,
  ArrowRight,
  PartyPopper,
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

type ExchangeRequest = {
  exchange_id: string;
  from_user_id: number;
  from_username: string;
  from_fullname: string;
  skill_offered_title: string;
  requested_skill_title: string;
  note?: string;
  status: "pending" | "accepted" | "declined" | "completed" | "cancelled";
  mode: string;
  created_at: string;
};

const API_URL = "https://skillwrap-backend.onrender.com";
  // const API_URL = "http://localhost:4000";

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
    "from-violet-500 to-indigo-600",
    "from-sky-500 to-cyan-600",
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

function trustScore(userId: number) {
  return ((userId * 7 + 13) % 40) + 60;
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
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
};

const orbFloat = (i: number): Variants => ({
  animate: {
    y: [0, -18 - i * 6, 0],
    x: [0, (i % 2 ? 12 : -12), 0],
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

const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: { duration: 2.2, repeat: Infinity, ease: "linear" },
  },
};

/* ─── sub-components ─── */

function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {[
        { size: 340, top: "8%", left: "6%", color: "bg-cyan-500/20" },
        { size: 260, top: "55%", left: "72%", color: "bg-blue-500/15" },
        { size: 200, top: "30%", left: "42%", color: "bg-teal-500/10" },
        { size: 180, top: "75%", left: "18%", color: "bg-sky-400/10" },
        { size: 150, top: "12%", left: "80%", color: "bg-emerald-400/10" },
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
  const styles: Record<string, string> = {
    pending: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    accepted: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    declined: "bg-red-500/15 text-red-300 ring-red-500/30",
    completed: "bg-cyan-500/15 text-cyan-300 ring-cyan-500/30",
    cancelled: "bg-gray-500/15 text-gray-400 ring-gray-500/30",
  };
  return (
    <motion.span
      layout
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full ring-1 ${styles[status] || styles.cancelled}`}
    >
      {status === "pending" && (
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-amber-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      )}
      {status}
    </motion.span>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div
      className={`relative w-11 h-11 rounded-full bg-gradient-to-br ${avatarColor(name)} flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-cyan-500/10 shrink-0`}
    >
      {getInitials(name)}
      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0b1228]" />
    </div>
  );
}

function SkillBadge({ label, skill, variant }: { label: string; skill: string; variant: "offered" | "requested" }) {
  const isOffered = variant === "offered";
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2">
      <span
        className={`text-[10px] font-bold uppercase tracking-widest ${isOffered ? "text-cyan-400" : "text-amber-400"}`}
      >
        {label}
      </span>
      <span className="text-sm text-white/90 font-medium truncate">{skill}</span>
    </div>
  );
}

function TrustBar({ score }: { score: number }) {
  const clamped = Math.min(100, Math.max(0, score));
  const color = clamped >= 80 ? "bg-emerald-400" : clamped >= 60 ? "bg-cyan-400" : "bg-amber-400";
  return (
    <div className="flex items-center gap-2">
      <Shield size={12} className="text-white/30" />
      <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>
      <span className="text-[10px] text-white/40 font-medium">{clamped}%</span>
    </div>
  );
}

/* ─── main component ─── */

export default function ReceivedRequestsPage() {
  const [requests, setRequests] = useState<ExchangeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailsPopup, setDetailsPopup] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState<ExchangeRequest | null>(null);
  const [successPopup, setSuccessPopup] = useState(false);
  const [acceptedExchangeId, setAcceptedExchangeId] = useState<string | null>(null);
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

  /* fetch requests */
  useEffect(() => {
    const loadRequests = async () => {
      try {
        const res = await fetch(`${API_URL}/exchange/recieved`, {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();
        setRequests(data.requests || []);
      } catch {
        toast.error("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };
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
          r.from_fullname.toLowerCase().includes(q) ||
          r.from_username.toLowerCase().includes(q) ||
          r.skill_offered_title.toLowerCase().includes(q) ||
          r.requested_skill_title.toLowerCase().includes(q)
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

  /* accept */
  const handleAccept = useCallback(async (req: ExchangeRequest) => {
    try {
      const statusRes = await fetch(`${API_URL}/update-exchange-status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exchange_id: req.exchange_id, status: "accepted" }),
      });
      const statusData = await statusRes.json();
      if (!statusRes.ok || !statusData.success) throw new Error(statusData.error || "Failed to update exchange");

      await fetch(`${API_URL}/send-notification`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchange_id: req.exchange_id,
          receiverId: req.from_user_id,
          message: "Your skill exchange request was accepted",
          metadata: req.exchange_id,
        }),
      });

      const id = req.exchange_id
        await XpTransactions(10, "Accepting a request.");
        await addXP(10);
        console.log("⚡ XP ADDED");

      setRequests((prev) => prev.map((r) => (r.exchange_id === req.exchange_id ? { ...r, status: "accepted" } : r)));
      setAcceptedExchangeId(req.exchange_id);
      setSuccessPopup(true);
    } catch (err: any) {
      toast.error(err.message || "Server error");
    }
  }, []);

  /* decline */
  const handleDecline = useCallback(async (req: ExchangeRequest) => {
    try {
      await fetch(`${API_URL}/update-exchange-status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exchange_id: req.exchange_id, status: "declined" }),
      });

      await fetch(`${API_URL}/send-notification`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchange_id: req.exchange_id,
          receiverId: req.from_user_id,
          message: "Your skill exchange request was declined",
          metadata: req.exchange_id,
        }),
      });

      setRequests((prev) => prev.map((r) => (r.exchange_id === req.exchange_id ? { ...r, status: "declined" } : r)));
      toast.error("Request declined", { theme: "dark", transition: Slide });
    } catch {
      toast.error("Server error");
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
      <div className="relative z-10 pt-14 pb-8 px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              Received Requests
            </span>
          </h1>
          <p className="mt-2 text-white/40 text-sm">Manage incoming skill exchange requests</p>
        </motion.div>

        {/* ── STATS ROW ── */}
        <motion.div
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          {[
            { label: "Total", value: stats.total, icon: Zap, color: "text-cyan-400" },
            { label: "Pending", value: stats.pending, icon: Clock, color: "text-amber-400" },
            { label: "Accepted", value: stats.accepted, icon: CheckCircle, color: "text-emerald-400" },
            { label: "Declined", value: stats.declined, icon: XCircle, color: "text-red-400" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm px-5 py-4 flex items-center gap-3"
              whileHover={{ borderColor: "rgba(34,211,238,.2)", scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <s.icon size={20} className={s.color} />
              <div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-[11px] text-white/30 uppercase tracking-wider">{s.label}</div>
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
                    layoutId="activeTab"
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
              placeholder="Search requests..."
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
              initial="hidden"
              animate="visible"
              variants={stagger}
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
              <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6">
                <MessageCircle size={32} className="text-white/15" />
              </div>
              <h3 className="text-lg font-semibold text-white/50">
                {searchQuery || activeTab !== "all" ? "No matching requests" : "No requests yet"}
              </h3>
              <p className="mt-2 text-sm text-white/25 max-w-xs">
                {searchQuery || activeTab !== "all"
                  ? "Try adjusting your search or filter"
                  : "When someone sends you a skill exchange request, it will appear here"}
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
              {filtered.map((req) => (
                <motion.div
                  key={req.exchange_id}
                  variants={cardIn}
                  layout
                  className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm overflow-hidden"
                  whileHover={{ scale: 1.015, borderColor: "rgba(34,211,238,.18)" }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  {/* hover shine */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-blue-500/[0.04]" />

                  <div className="relative p-6 flex flex-col gap-4">
                    {/* top row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar name={req.from_fullname} />
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold text-white truncate">{req.from_fullname}</h3>
                          <span className="text-[11px] text-white/30">@{req.from_username}</span>
                        </div>
                      </div>
                      <StatusPill status={req.status} />
                    </div>

                    {/* skills */}
                    <div className="flex flex-col gap-2">
                      {req.mode !== "learning" && (
                        <SkillBadge label="Offers" skill={req.skill_offered_title} variant="offered" />
                      )}
                      <SkillBadge label="Wants" skill={req.requested_skill_title} variant="requested" />
                    </div>

                    {/* meta row */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[11px] text-white/25">
                        <Clock size={11} />
                        {relativeTime(req.created_at)}
                      </span>
                      <div className="w-24">
                        <TrustBar score={trustScore(req.from_user_id)} />
                      </div>
                    </div>

                    {/* actions */}
                    <div className="flex gap-2.5 pt-1">
                      {req.status === "pending" ? (
                        <>
                          <motion.button
                            onClick={() => handleAccept(req)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-colors"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <CheckCircle size={15} />
                            Accept
                          </motion.button>
                          <motion.button
                            onClick={() => handleDecline(req)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/20 hover:border-red-500/30 transition-colors"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <XCircle size={15} />
                            Decline
                          </motion.button>
                        </>
                      ) : (
                        <motion.button
                          onClick={() => {
                            setSelectedExchange(req);
                            setDetailsPopup(true);
                          }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/60 text-sm font-semibold hover:bg-white/[0.08] hover:text-white/80 transition-colors"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Eye size={15} />
                          View Details
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── DETAILS MODAL ── */}
      <AnimatePresence>
        {detailsPopup && selectedExchange && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setDetailsPopup(false)}
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
                  onClick={() => setDetailsPopup(false)}
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
                  {/* requester */}
                  <div className="flex items-center gap-3">
                    <Avatar name={selectedExchange.from_fullname} />
                    <div>
                      <p className="text-sm font-semibold text-white">{selectedExchange.from_fullname}</p>
                      <p className="text-[11px] text-white/30">@{selectedExchange.from_username}</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/[0.04]" />

                  {/* skills */}
                  <div className="space-y-2">
                    {selectedExchange.mode !== "learning" && (
                      <SkillBadge label="Offers" skill={selectedExchange.skill_offered_title} variant="offered" />
                    )}
                    <SkillBadge label="Requested" skill={selectedExchange.requested_skill_title} variant="requested" />
                  </div>

                  {/* note */}
                  {selectedExchange.note && (
                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Note</span>
                      <p className="mt-1.5 text-sm text-white/70 leading-relaxed">{selectedExchange.note}</p>
                    </div>
                  )}

                  {/* meta */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Mode</span>
                      <p className="mt-1 text-white/70 capitalize">{selectedExchange.mode}</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Requested</span>
                      <p className="mt-1 text-white/70">{relativeTime(selectedExchange.created_at)}</p>
                    </div>
                  </div>
                </div>

                {/* chat CTA */}
                {selectedExchange.status === "accepted" && (
                  <motion.button
                    onClick={() => navigate(`/chat/${selectedExchange.exchange_id}`)}
                    className="mt-8 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold text-sm hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle size={16} />
                    Enter Chat
                    <ArrowRight size={14} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SUCCESS MODAL ── */}
      <AnimatePresence>
        {successPopup && acceptedExchangeId && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setSuccessPopup(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#0c1425] to-[#060d1b] border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 overflow-hidden text-center"
              initial={{ opacity: 0, scale: 0.85, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* glow accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 rounded-b-full bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

              <div className="p-10">
                {/* animated icon */}
                <motion.div
                  className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"
                  variants={pulseGlow}
                  animate="animate"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
                  >
                    <PartyPopper size={36} className="text-emerald-400" />
                  </motion.div>
                </motion.div>

                <motion.h2
                  className="mt-6 text-2xl font-bold"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    Request Accepted
                  </span>
                </motion.h2>

                <motion.p
                  className="mt-3 text-sm text-white/40 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  Your skill exchange has been successfully accepted. You can now start chatting and collaborating.
                </motion.p>

                <motion.div
                  className="mt-8 space-y-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <button
                    onClick={() => navigate(`/chat/${acceptedExchangeId}`)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-sm hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <MessageCircle size={16} />
                    Go to Chat Room
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => setSuccessPopup(false)}
                    className="w-full py-2.5 text-xs text-white/30 hover:text-white/50 transition-colors"
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Loader2,
  Trash2,
  Clipboard,
  ClipboardCheck,
  ArrowLeft,
  Bell,
  BellOff,
  MessageCircle,
  User,
  ExternalLink,
  Clock,
  Shield,
  Sparkles,
  Check,
  Copy,
} from "lucide-react";

interface Notification {
  id: number;
  message: string;
  is_read: boolean;
  created_at: string;
  roomid?: string | null;
  exchange_id?: number | null;
  metadata?: number | null;
  sender_username: string;
}

// const API_URL = "https://skillwrap-backend.onrender.com";
  const API_URL = "http://localhost:4000";

/* ─── helpers ─── */

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
    "from-blue-500 to-indigo-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

/* ─── animation presets ─── */

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemIn: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 24 } },
  exit: { opacity: 0, x: -30, scale: 0.96, transition: { duration: 0.2 } },
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

const pulseDot: Variants = {
  animate: {
    scale: [1, 1.4, 1],
    opacity: [1, 0.5, 1],
    transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
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

function SkeletonNotif() {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/[0.06] animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/5 rounded bg-white/[0.06] animate-pulse" />
          <div className="h-3 w-1/3 rounded bg-white/[0.04] animate-pulse" />
        </div>
      </div>
      <div className="h-3 w-4/5 rounded bg-white/[0.04] animate-pulse" />
      <div className="h-8 w-28 rounded-xl bg-white/[0.06] animate-pulse" />
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div
      className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor(name)} flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-cyan-500/10 shrink-0`}
    >
      {getInitials(name)}
    </div>
  );
}

/* ─── main component ─── */

export default function NotificationList() {
  const [notif, setNotif] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const unreadCount = notif.filter((n) => !n.is_read).length;

  /* load notifications */
  const loadNotifs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/notification`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setNotif(data.notifications);
      }
    } catch {
      toast.error("Failed to load notifications", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  }, []);

  /* delete all */
  const deleteNotification = async () => {
    try {
      setDeleting(true);
      const res = await fetch(`${API_URL}/delete/notification`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Notifications cleared!", { theme: "dark", transition: Slide });
        loadNotifs();
      } else {
        toast.error("Failed to delete notifications", { theme: "dark" });
      }
    } catch {
      toast.error("Error deleting notifications", { theme: "dark" });
    } finally {
      setDeleting(false);
    }
  };

  /* copy room id */
  const copyRoomId = (roomId: string, notifId: number) => {
    navigator.clipboard.writeText(roomId);
    setCopiedId(notifId);
    toast.success("Room ID copied!", { theme: "dark", transition: Slide });
    setTimeout(() => setCopiedId(null), 2000);
  };

  /* effect */
  useEffect(() => {
    loadNotifs();
  }, [loadNotifs]);

  /* ─── render ─── */

  return (
    <main className="relative min-h-screen bg-[#030712] text-white overflow-hidden">
      <FloatingOrbs />
      <ToastContainer newestOnTop theme="dark" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-10">
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
        <motion.div
          className="mt-8 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Bell size={20} className="text-cyan-400" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
                    Notifications
                  </span>
                </h1>
                <p className="text-white/30 text-sm mt-0.5">
                  {unreadCount > 0
                    ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                    : "All caught up"}
                </p>
              </div>
            </div>

            {notif.length > 0 && (
              <motion.button
                onClick={deleteNotification}
                disabled={deleting}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/[0.06] border border-red-500/15 text-red-400 text-sm font-semibold hover:bg-red-500/15 hover:border-red-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!deleting ? { scale: 1.03 } : {}}
                whileTap={!deleting ? { scale: 0.97 } : {}}
              >
                {deleting ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
                Clear All
              </motion.button>
            )}
          </div>

          {/* unread badge bar */}
          {unreadCount > 0 && (
            <motion.div
              className="mt-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-500/[0.04] border border-cyan-500/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-cyan-400"
                variants={pulseDot}
                animate="animate"
              />
              <span className="text-sm text-cyan-300/70">
                You have <span className="font-bold text-cyan-300">{unreadCount}</span> unread notification{unreadCount !== 1 && "s"}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* ── CONTENT ── */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeletons"
              className="space-y-4"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div key={i} variants={itemIn}>
                  <SkeletonNotif />
                </motion.div>
              ))}
            </motion.div>
          ) : notif.length === 0 ? (
            <motion.div
              key="empty"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6">
                  <BellOff size={28} className="text-white/15" />
                </div>
                <div className="absolute inset-0 w-20 h-20 rounded-full bg-cyan-500/5 animate-ping opacity-20" />
              </div>
              <h3 className="text-lg font-semibold text-white/50">No notifications yet</h3>
              <p className="mt-2 text-sm text-white/25 max-w-xs">
                When someone sends you an exchange request or accepts yours, you will see it here
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              className="space-y-4"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {notif.map((n) => {
                const isRequest = !n.roomid && !n.metadata;
                const isAccepted = !!n.roomid && !!n.metadata;

                return (
                  <motion.div
                    key={n.id}
                    variants={itemIn}
                    layout
                    className={`group relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-colors duration-300 ${
                      n.is_read
                        ? "bg-white/[0.02] border-white/[0.06]"
                        : "bg-cyan-500/[0.03] border-cyan-500/15"
                    }`}
                    whileHover={{ scale: 1.008, borderColor: n.is_read ? "rgba(34,211,238,.12)" : "rgba(34,211,238,.25)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  >
                    {/* unread glow bar */}
                    {!n.is_read && (
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full" />
                    )}

                    {/* hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-blue-500/[0.03]" />

                    <div className="relative p-5">
                      {/* top row */}
                      <div className="flex items-start gap-3">
                        <Avatar name={n.sender_username} />

                        <div className="flex-1 min-w-0">
                          {/* message */}
                          {isRequest ? (
                            <div className="text-sm leading-relaxed">
                              <span className="font-bold text-cyan-300">{n.sender_username}</span>
                              <span className="text-white/60"> sent you an exchange request. </span>
                              <a
                                href="/request-recieved"
                                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                              >
                                View requests
                                <ExternalLink size={12} />
                              </a>
                            </div>
                          ) : (
                            <p className="text-sm text-white/80 leading-relaxed">{n.message}</p>
                          )}

                          {/* meta */}
                          <div className="flex items-center gap-3 mt-2.5">
                            <span className="flex items-center gap-1.5 text-[11px] text-white/25">
                              <Clock size={10} />
                              {relativeTime(n.created_at)}
                            </span>
                            {!n.is_read && (
                              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400/60">
                                <motion.div
                                  className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                                  variants={pulseDot}
                                  animate="animate"
                                />
                                New
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* room id section */}
                      {isAccepted && n.roomid && (
                        <motion.div
                          className="mt-4 flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <Shield size={12} className="text-cyan-400/50 shrink-0" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 shrink-0">Room ID</span>
                            <span className="text-sm text-cyan-300 font-mono truncate">{n.roomid}</span>
                          </div>
                          <motion.button
                            onClick={() => copyRoomId(n.roomid!, n.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                              copiedId === n.id
                                ? "bg-emerald-500/15 border border-emerald-500/25 text-emerald-400"
                                : "bg-white/[0.04] border border-white/[0.08] text-white/40 hover:text-white/60 hover:bg-white/[0.08]"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {copiedId === n.id ? (
                              <>
                                <Check size={12} />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy size={12} />
                                Copy
                              </>
                            )}
                          </motion.button>
                        </motion.div>
                      )}

                      {/* chat button */}
                      {isAccepted && n.metadata && (
                        <motion.a
                          href={`/chat/${n.metadata}`}
                          className="mt-3 block"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <motion.div
                            className="relative w-full overflow-hidden flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/15"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <MessageCircle size={15} />
                            Start Chatting
                            {/* shimmer */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
                              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                              style={{ backgroundSize: "200% 100%" }}
                            />
                          </motion.div>
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

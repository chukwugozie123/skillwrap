"use client"
import {
  Smile,
  Paperclip,
  X,
  Shield,
  Zap,
  Clock,
  Target,
  ListChecks,
  ScrollText,
  Radio,
  Lock,
  Unlock,
  Users,
  ArrowRight,
  Send,
  AlertTriangle,
  CheckCircle2,
  Trophy,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { socket } from "@/lib/socketClient";
import AttachmentPopup from "./AttachmentPopup";
import FirstAchievementPopup from "@/components/FirstAchievementPopup/page";
import { addXP, XpTransactions } from "@/lib/Xpapi";

interface Message {
  id?: number;
  username: string;
  text: string;
  created_at?: string;
}

interface Exchange {
  exchange_id: number;
  from_username: string;
  to_username: string;
  skill_offered_title: string;
  skill_requested_title: string;
  exchange_status: string;
  created_at?: string;
}

interface Attachment {
  duration: number;
  intensity: string;
  steps: number;
  goal: string;
  rules: string;
}

/* ============ AMBIENT PARTICLE ============ */
function AmbientParticle({ delay, left, size }: { delay: number; left: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(6,255,208,0.3) 0%, transparent 70%)`,
      }}
      animate={{
        y: [0, -600, 0],
        opacity: [0, 0.6, 0],
        x: [0, Math.random() * 80 - 40, 0],
      }}
      transition={{
        duration: 12 + delay * 2,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    />
  );
}

/* ============ SOUND WAVE VISUAL ============ */
function SoundWave() {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[0, 0.1, 0.2, 0.3, 0.4, 0.3, 0.2, 0.1, 0].map((d, i) => (
        <motion.div
          key={i}
          className="w-[2px] bg-neon-cyan/50 rounded-full"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: d,
            ease: "easeInOut",
          }}
          style={{ height: 12 }}
        />
      ))}
    </div>
  );
}

/* ============ TYPING INDICATOR ============ */
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-center gap-2 px-4 py-2"
    >
      <div className="chat-bubble-other rounded-2xl px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1">
          {[0, 0.15, 0.3].map((delay, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-neon-cyan/70"
              animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay }}
            />
          ))}
        </div>
        <span className="text-xs text-gray-400 ml-1">composing...</span>
      </div>
    </motion.div>
  );
}

/* ============ STATUS BADGE ============ */
function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { color: string; bg: string; icon: React.ReactNode; pulse: boolean }> = {
    "in progress": {
      color: "text-green-400",
      bg: "bg-green-500/15 border-green-500/30",
      icon: <Radio size={10} />,
      pulse: true,
    },
    completed: {
      color: "text-blue-400",
      bg: "bg-blue-500/15 border-blue-500/30",
      icon: <CheckCircle2 size={10} />,
      pulse: false,
    },
    cancelled: {
      color: "text-red-400",
      bg: "bg-red-500/15 border-red-500/30",
      icon: <AlertTriangle size={10} />,
      pulse: false,
    },
  };
  const c = config[status] || config["in progress"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${c.bg} ${c.color}`}
    >
      {c.pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
        </span>
      )}
      {c.icon}
      {status}
    </span>
  );
}

/* ============ PROGRESS BAR ============ */
function SessionProgressBar({ countdown, duration }: { countdown: string; duration: number }) {
  const progress = useMemo(() => {
    if (!countdown || countdown === "00:00") return 0;
    const parts = countdown.split(":");
    const remaining = (parseInt(parts[0]) * 60 + parseInt(parts[1]));
    return Math.max(0, Math.min(100, ((duration * 60 - remaining) / (duration * 60)) * 100));
  }, [countdown, duration]);

  return (
    <div className="w-full h-1.5 rounded-full bg-navy-700/50 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}

/* ============ MAIN CHAT PAGE ============ */
export default function ChatPage() {
  const params = useParams();
  // const navigate = useNavigate();
  const router = useRouter();
  const { exchange_id } = params as { exchange_id: string };

  const API_URL = "http://localhost:4000";

  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [exchange, setExchange] = useState<Exchange | null>(null);
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [showAttachmentPopup, setShowAttachmentPopup] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [showExchangePopup, setShowExchangePopup] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [quitPopup, setQuitPopup] = useState(false);
  const [showFirstSkillPopup, setShowFirstSkillPopup] = useState(false);
  const [Point, setPoints] = useState("");
  const [AchievementMessage, setAchievementMessage] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const room = exchange_id;
  const isActive = exchange?.exchange_status === "in progress";
  const isLocked =
    exchange?.exchange_status === "cancelled" ||
    exchange?.exchange_status === "completed";
    

  /* ================= LOAD USER ================= */
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`${API_URL}/auth/profile`, { credentials: "include" });
      if (!res.ok) return router.push("/login");
      const data = await res.json();
      setUserId(data.user.id);
      setUsername(data.user.username);
    }
    fetchUser();
  }, []);

  /* ================= LOAD EXCHANGE ================= */
  useEffect(() => {
    if (!exchange_id) return;
    async function fetchExchange() {
      const res = await fetch(`${API_URL}/exchange/${exchange_id}`, { credentials: "include" });
      if (!res.ok) return router.push("/dashboard");
      const data = await res.json();
      setExchange(data.exchange);
    }
    fetchExchange();
  }, [exchange_id]);

  /* ================= LOAD ATTACHMENT ================= */
  useEffect(() => {
    if (!exchange_id) return;
    async function fetchAttachment() {
      const res = await fetch(`${API_URL}/user/attachment/${exchange_id}`, {
        credentials: "include",
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && data.attachment && Object.keys(data.attachment).length > 0) {
        setAttachment(data.attachment);
      } else {
        setAttachment(null);
      }
    }
    fetchAttachment();
  }, [exchange_id]);

  /* ================= SOCKET ================= */
  useEffect(() => {
    if (!userId || !room) return;

    if (!socket.connected) socket.connect();

    const onConnect = () => {
      socket.emit("enterRoom", { roomId: parseInt(room), userId });
    };

    socket.on("connect", onConnect);

    socket.on("previousMessages", (msgs: Message[]) => setMessages(msgs));
    socket.on("message", (msg: Message) => setMessages((prev) => [...prev, msg]));
    socket.on("countdown", (time: string) => setCountdown(time));

    socket.on("countdownEnded", async () => {
      await fetch(`${API_URL}/exchange/update-status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exchange_id, exchange_status: "completed" }),
      });

      await addXP(30);
      await XpTransactions(30, "Complted exchange.");
      console.log("⚡ XP ADDED");

      setShowExchangePopup(true);
    });

    socket.on("exchangeQuit", async () => {
      router.push(`/review/${exchange_id}`);
    });

    socket.on("typing", ({ name }: { name: string }) => {
      if (name !== username) {
        setShowTyping(true);
        setTimeout(() => setShowTyping(false), 2000);
      }
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("previousMessages");
      socket.off("message");
      socket.off("countdown");
      socket.off("countdownEnded");
      socket.off("exchangeQuit");
      socket.off("typing");
    };
  }, [userId, room, username]);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages]);

  /* ================= SEND ================= */
  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (isLocked || !message.trim()) return;
    socket.emit("message", { text: message });
    setMessage("");
    socket.emit("typing", { name: username });
  }

  /* ================= ATTACHMENT ================= */
  const handleAttachmentSubmit = async (data: any) => {
    const res = await fetch(`${API_URL}/user/set/attachment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...data, exchange_id }),
    });
    const response = await res.json();
    if (!response.success) return alert("Attachment failed");
    setAttachment(data);
    setShowAttachmentPopup(false);
  };

  /* ================= START ================= */
  const startCountdown = async () => {
    if (isLocked) return;
    if (attachment && room && exchange) {
      socket.emit("startCountdown", {
        roomId: parseInt(room),
        exchangeId: exchange.exchange_id,
        duration: attachment.duration,
      });

      await addXP(12);
      await XpTransactions(12, "For starting an exchange session");
      console.log("⚡ XP ADDED");
    }
  };

  /* ================= QUIT ================= */
  const handleQuitExchange = () => {
    if (isLocked) return;
    setQuitPopup(true);
  };

  /* ================= CONFIRM QUIT ================= */
  const confirmQuit = () => {
    socket.emit("quitExchange", {
      roomId: parseInt(room),
      exchangeId: exchange?.exchange_id,
    });
    router.push(`/review/${exchange_id}`);
  };

  /* ================= ACHIEVEMENT ================= */
  const HandleAchvement = async () => {
    const res2 = await fetch(`${API_URL}/achievements/check`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "exchange_completed" }),
    });
    const response = await res2.json();
    if (response.success) {
      setPoints(response.points);
      setAchievementMessage(response.achievement);
      setShowFirstSkillPopup(true);
    } else {
      setTimeout(() => router.push(`/review/${exchange_id}`), 1000);
    }
  };

  /* ================= PARTICLES ================= */
  const particles = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        delay: i * 2,
        left: `${10 + i * 15}%`,
        size: 4 + Math.random() * 4,
      })),
    []
  );

  /* ================= FORMAT TIME ================= */
  const formatMessageTime = (ts?: string) => {
    if (!ts) return "";
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white flex flex-col relative overflow-hidden">
      {/* ===== AMBIENT BACKGROUND ===== */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-30" />

        {/* Floating blur orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,255,208,0.08) 0%, transparent 70%)" }}
          animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)" }}
          animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-[300px] h-[300px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)" }}
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Particles */}
        {particles.map((p) => (
          <AmbientParticle key={p.id} delay={p.delay} left={p.left} size={p.size} />
        ))}
      </div>

      {/* ===== HEADER: SKILL EXCHANGE MISSION PANEL ===== */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full glass border-b border-cyan-500/10"
      >
        <div className="px-4 md:px-8 py-4 space-y-4">
          {exchange && (
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              {/* Left: Mission Info */}
              <div className="flex-1 space-y-3">
                {/* Top bar: secure session indicator */}
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    <Shield size={10} className="text-neon-cyan" />
                    <span className="text-neon-cyan">Secure Skill Exchange</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20">
                    <Radio size={10} className="text-green-400" />
                    <span className="text-green-400">Live Session</span>
                  </div>
                </div>

                {/* Mission title */}
                <div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                    <span className="text-neon-cyan neon-text">{exchange.from_username}</span>
                    <span className="mx-3 text-gray-500">
                      <ArrowRight size={16} className="inline" />
                    </span>
                    <span className="text-neon-blue">{exchange.to_username}</span>
                  </h2>

                  {/* Skill exchange flow */}
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
                    <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-medium">
                      {exchange.skill_offered_title}
                    </span>
                    <Zap size={14} className="text-gray-500" />
                    <span className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 font-medium">
                      {exchange.skill_requested_title}
                    </span>
                  </div>
                </div>

                {/* Status badge */}
                <div className="flex items-center gap-3">
                  <StatusBadge status={exchange.exchange_status} />
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                    <Users size={10} />
                    <span>2 Collaborators</span>
                  </div>
                </div>
              </div>

              {/* Right: Session Plan Card */}
              {attachment ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full lg:w-[380px] glass rounded-xl p-4 space-y-3 neon-border relative overflow-hidden"
                >
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 shimmer-bg pointer-events-none rounded-xl" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-neon-cyan flex items-center gap-2">
                        <Target size={14} />
                        Session Plan Dashboard
                      </h3>
                      <div className="flex items-center gap-1">
                        {isLocked ? (
                          <Lock size={12} className="text-red-400" />
                        ) : (
                          <Unlock size={12} className="text-green-400" />
                        )}
                      </div>
                    </div>

                    {/* Plan details grid */}
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="px-3 py-2 rounded-lg bg-navy-950/50 border border-cyan-500/10">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider">
                          <Clock size={10} /> Duration
                        </div>
                        <p className="text-sm font-semibold text-white mt-0.5">{attachment.duration} min</p>
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-navy-950/50 border border-cyan-500/10">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider">
                          <Zap size={10} /> Intensity
                        </div>
                        <p className="text-sm font-semibold text-white mt-0.5 capitalize">{attachment.intensity}</p>
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-navy-950/50 border border-cyan-500/10">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider">
                          <ListChecks size={10} /> Steps
                        </div>
                        <p className="text-sm font-semibold text-white mt-0.5">{attachment.steps}</p>
                      </div>
                      <div className="px-3 py-2 rounded-lg bg-navy-950/50 border border-cyan-500/10">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider">
                          <Target size={10} /> Goal
                        </div>
                        <p className="text-sm font-semibold text-white mt-0.5 truncate">{attachment.goal}</p>
                      </div>
                    </div>

                    {attachment.rules && (
                      <div className="mt-2 px-3 py-2 rounded-lg bg-navy-950/50 border border-cyan-500/10">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider">
                          <ScrollText size={10} /> Rules
                        </div>
                        <p className="text-xs text-gray-300 mt-0.5">{attachment.rules}</p>
                      </div>
                    )}

                    {/* Countdown */}
                    <div className="mt-3 space-y-2">
                      {countdown && (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider">Session Timer</span>
                            <motion.span
                              key={countdown}
                              initial={{ scale: 1.2, color: "#06ffd0" }}
                              animate={{ scale: 1, color: "#ffffff" }}
                              className="text-lg font-mono font-bold tracking-wider"
                            >
                              {countdown}
                            </motion.span>
                          </div>
                          <SessionProgressBar countdown={countdown} duration={attachment.duration} />
                        </>
                      )}

                      <div className="flex gap-2 pt-1">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isLocked}
                          onClick={startCountdown}
                          className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/20 transition-shadow"
                        >
                          <Zap size={14} />
                          Start Session
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isLocked}
                          onClick={handleQuitExchange}
                          className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/20 transition-shadow"
                        >
                          <X size={14} />
                          Quit Exchange
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                !isLocked && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(6,255,208,0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowAttachmentPopup(true)}
                    className="w-full lg:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-neon-cyan font-semibold flex items-center justify-center gap-2 hover:border-cyan-400/50 transition-colors"
                  >
                    <Paperclip size={16} />
                    Set Session Plan
                  </motion.button>
                )
              )}
            </div>
          )}
        </div>
      </motion.header>

      {/* ===== COLLABORATION ACTIVITY BAR ===== */}
      <div className="relative z-10 flex items-center justify-between px-4 md:px-8 py-2 bg-navy-950/80 border-b border-cyan-500/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 animate-ping" />
            </div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Active Session</span>
          </div>
          {countdown && attachment && (
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
              <Clock size={10} className="text-neon-cyan" />
              <span className="font-mono">{countdown}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <SoundWave />
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">
            {messages.length} messages
          </span>
        </div>
      </div>

      {/* ===== CHAT AREA ===== */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 md:px-8 py-4 space-y-3" ref={chatContainerRef}>
        {/* Animated gradient border on active chat */}
        <div className="absolute inset-0 pointer-events-none border-x border-cyan-500/5" />

        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => {
            const isMe = msg.username === username;
            return (
              <motion.div
                key={msg.id ?? i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[75%] md:max-w-[65%]">
                  {/* Username label */}
                  <div
                    className={`text-[10px] text-gray-500 mb-1 ${
                      isMe ? "text-right mr-1" : "ml-1"
                    }`}
                  >
                    {msg.username}
                  </div>

                  {/* Chat bubble */}
                  <div
                    className={`relative p-3.5 rounded-2xl ${
                      isMe
                        ? "chat-bubble-me rounded-br-md"
                        : "chat-bubble-other rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>

                    {/* Time */}
                    {msg.created_at && (
                      <div
                        className={`text-[9px] text-gray-500 mt-1.5 ${
                          isMe ? "text-right" : "text-left"
                        }`}
                      >
                        {formatMessageTime(msg.created_at)}
                      </div>
                    )}

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {showTyping && <TypingIndicator />}
        </AnimatePresence>

        {/* Empty state */}
        {messages.length === 0 && !showTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-64 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 flex items-center justify-center mb-4">
              <Sparkles size={24} className="text-neon-cyan" />
            </div>
            <p className="text-gray-400 text-sm">Begin your skill exchange</p>
            <p className="text-gray-600 text-xs mt-1">Messages will appear here in real-time</p>
          </motion.div>
        )}
      </div>

      {/* ===== INPUT AREA ===== */}
      {isLocked ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 p-4 border-t border-red-500/20 glass text-center"
        >
          <div className="flex items-center justify-center gap-2 text-red-400 font-semibold">
            <Lock size={16} />
            This exchange has been {exchange?.exchange_status}. Chat is locked.
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 p-3 md:p-4 border-t border-cyan-500/10 glass"
        >
          <form onSubmit={handleSend} className="flex gap-2 items-end">
            {/* Emoji button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowEmoji(!showEmoji)}
              className="p-3 rounded-xl glass-input hover:border-cyan-500/30 transition-colors relative"
            >
              <Smile size={18} className="text-gray-400 hover:text-neon-cyan transition-colors" />
            </motion.button>

            {/* Emoji picker */}
            <AnimatePresence>
              {showEmoji && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-20 left-3 z-50 rounded-xl overflow-hidden neon-border"
                >
              <EmojiPicker
                onEmojiClick={(e) => setMessage((prev) => prev + e.emoji)}
                theme={Theme.DARK}
                width={300}
                height={350}
              />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message input */}
            <div className="flex-1 relative">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                className="w-full p-3.5 rounded-xl glass-input text-sm text-white focus:outline-none transition-all placeholder:text-gray-500"
                style={{
                  borderColor: inputFocused ? "rgba(6,255,208,0.4)" : undefined,
                  boxShadow: inputFocused ? "0 0 20px rgba(6,255,208,0.1)" : undefined,
                }}
                placeholder="Type a message..."
              />
              {/* Focus glow line */}
              <motion.div
                className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: inputFocused ? 1 : 0,
                  opacity: inputFocused ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                style={{ originX: 0 }}
              />
            </div>

            {/* Send button */}
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(6,255,208,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold overflow-hidden group"
            >
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Send size={18} />
            </motion.button>
          </form>
        </motion.div>
      )}

      {/* ===== QUIT POPUP ===== */}
      <AnimatePresence>
        {quitPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-md w-full glass-heavy rounded-2xl p-6 space-y-4 relative neon-border"
            >
              <button
                onClick={() => setQuitPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-neon-cyan transition-colors"
              >
                <X size={22} />
              </button>

              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                  <AlertTriangle size={28} className="text-red-400" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-red-400 text-center">
                Quit Skill Exchange?
              </h2>
              <p className="text-gray-400 text-sm text-center leading-relaxed">
                Leaving now will cancel this exchange. You will be redirected to
                leave a review. Make sure you really want to quit before
                confirming.
              </p>

              <div className="flex gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setQuitPopup(false)}
                  className="flex-1 py-3 rounded-xl glass-input text-white font-semibold hover:border-cyan-500/30 transition-colors"
                >
                  Continue Exchange
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmQuit}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold hover:shadow-lg hover:shadow-red-500/20 transition-shadow"
                >
                  Quit & Review
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== ATTACHMENT POPUP ===== */}
      {showAttachmentPopup && (
        <AttachmentPopup
          onClose={() => setShowAttachmentPopup(false)}
          onSubmit={handleAttachmentSubmit}
        />
      )}

      {/* ===== EXCHANGE COMPLETION POPUP ===== */}
      <AnimatePresence>
        {showExchangePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-md w-full glass-heavy rounded-2xl p-6 space-y-4 relative neon-border"
            >
              <div className="flex justify-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                  className="w-14 h-14 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center"
                >
                  <Trophy size={28} className="text-green-400" />
                </motion.div>
              </div>

              <h2 className="text-xl font-bold text-green-400 text-center">
                Exchange Completed
              </h2>
              <p className="text-gray-400 text-sm text-center leading-relaxed">
                Would you like to leave a review or continue this exchange? Your
                feedback helps improve the platform.
              </p>

              <div className="flex gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    HandleAchvement();
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-shadow"
                >
                  Leave Review
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowExchangePopup(false);
                    setAttachment(null);
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-shadow"
                >
                  Continue Exchange
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== ACHIEVEMENT POPUP ===== */}
      <FirstAchievementPopup
        trigger={showFirstSkillPopup}
        points={Point}
        message={AchievementMessage}
        onClose={() => setShowFirstSkillPopup(false)}
      />
    </div>
  );
}

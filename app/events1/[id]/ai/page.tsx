
"use client"

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Send,
  Bot,
  Sparkles,
  Wifi,
  WifiOff,
  GraduationCap,
  BookOpen,
  StickyNote,
  Play,
  SkipForward,
  Menu,
  PanelLeftClose,
} from "lucide-react";
import { socket } from "@/lib/socketClient";
import { useRouter } from "next/navigation";
import AIMessageCard, { Message } from "./components/AIMessageCard";
import NotesPanel from "./components/NotesPanel";
import ModuleSidebar from "./components/ModuleSidebar";
import { addXP, XpTransactions } from "@/lib/Xpapi";

const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";

export default function AIEventChatPage() {
  const params = useParams();
  const eventId = Number(params?.id);
  // const userId = 4;

  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  // Desktop: sidebars part of layout; Mobile: drawers triggered by buttons
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notesOpen, setNotesOpen] = useState(false);

  const [progressCompleted, setProgressCompleted] = useState(0);
  const [_progressCurrent, setProgressCurrent] = useState(1);
  const [progressTotal, setProgressTotal] = useState(0);
  void _progressCurrent;

  const [hasPreviousMessages, setHasPreviousMessages] = useState(false);
  const [chatLoaded, setChatLoaded] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleModuleProgress = useCallback((completed: number, current: number, total: number) => {
    setProgressCompleted(completed);
    setProgressCurrent(current);
    setProgressTotal(total);
  }, []);

  
    /* ================= FETCH USER ================= */
    useEffect(() => {
      async function fetchProfile() {
        try {
          const res = await fetch(`${API_URL}/auth/profile`, {
            credentials: "include",
          });
  
          if (!res.ok) {
            router.push("/login");
            return;
          }
  
          const data = await res.json();
          console.log(data.user.id, 'id')
          // const userId = data.user.id
                    setUserId(data.user.id);
        } catch (err) {
          console.error("Profile fetch failed", err);
          router.push("/login");
        } 
      }
  
      fetchProfile();
    }, [router]);

  // ================= SOCKET =================
  useEffect (() => {
    console.log("AI CHAT INIT");
    console.log("Event:", eventId);
    console.log("User:", userId);

  if (!eventId || !userId) {
    console.log("Waiting for user...");
    return;
  }

    const onConnect = () => {
      console.log("CONNECTED:", socket.id);
      setConnected(true);
      console.log("Joining event room...");
      socket.emit("joinAIEvent", { eventId, userId });
    };

      async function handleEventJoinReward() {

    try {

      await addXP(35, "EVENT_COMPLETION");
      await XpTransactions(35,"Joined an AI Event.");
      console.log("⚡ XP ADDED");

      const res3 = await fetch(
        `${API_URL}/activity`,
        {
          method:"POST",
          credentials:"include",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            activity_type:"event_joined",
            title:"Joined an AI Event",
            description:"Joined an AI learning event",
            icon:"sparkles",
            color:"emerald"
          })
        }
      );

      const response2 = await res3.json();

      console.log("🟢 ACTIVITY RESPONSE:", response2);

    }
    catch(error){
      console.error("Join reward error:", error);
    }
  }


  handleEventJoinReward();


    const receivePreviousMessage = (data: any) => {

  if (!Array.isArray(data.messages)) {
    console.log("No previous messages found");

    setHasPreviousMessages(false);
    setChatLoaded(true);
    return;
  }


  const oldMessages: Message[] = data.messages.map((msg: any) => ({
    type: msg.type || "reply",
    message: msg.message,
    sender: msg.sender || "ai",
  }));


  console.log(
    "Previous message count:",
    oldMessages.length
  );


  if(oldMessages.length > 0){
    setHasPreviousMessages(true);
  }


  setMessages(oldMessages);

  setChatLoaded(true);
};
    const onDisconnect = () => {
      console.log("DISCONNECTED");
      setConnected(false);
    };

    const onError = (err: any) => {
      console.log("SOCKET ERROR");
      console.error(err);
    };

    const onAIMessage = (data: any) => {
      console.log("AI RAW:", data);

      const formatted: Message = {
        type: data?.type || "reply",
        message:
          typeof data?.message === "string"
            ? data.message
            : JSON.stringify(data?.message ?? ""),
        sender: data?.sender || "ai",
      };

      console.log("AI FORMATTED:", formatted);
      setMessages((prev) => [...prev, formatted]);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onError);
    socket.on("aiMessage", onAIMessage);
    socket.on("prevMessage", receivePreviousMessage);

    if (!socket.connected) {
      console.log("Connecting socket...");
      socket.connect();
    } else {
      console.log("Already connected");
      onConnect();
    }

    return () => {
      console.log("Cleaning socket listeners");
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onError);
      socket.off("aiMessage", onAIMessage);
      socket.off("prevMessage", receivePreviousMessage);
    };
  }, [eventId, userId]);

  // ================= AUTO SCROLL =================
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ================= SEND MESSAGE =================
  function sendMessage(custom?: string) {
    const text = custom || input;

    if (!text.trim()) {
      console.log("Empty message blocked");
      return;
    }

    console.log("SENDING:", text);

    const userMsg: Message = {
      type: "user",
      message: text,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);

    if (!socket.connected) {
      console.log("Socket not connected -> reconnecting...");
      socket.connect();
    }

    socket.emit("aiMessage", {
      eventId,
      userId,
      message: text,
    });

    console.log("EMITTED aiMessage");
    setInput("");
  }

  const progressPct = progressTotal > 0 ? Math.round((progressCompleted / progressTotal) * 100) : 0;

  return (
    <div className="h-dvh flex flex-col bg-navy-950 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      {/* ====== HEADER ====== */}
      <header className="relative z-20 shrink-0 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center justify-between px-3 md:px-5 py-2">
          {/* Left */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 transition"
              title="Toggle modules"
            >
              {sidebarOpen ? (
                <PanelLeftClose size={15} className="text-gray-400" />
              ) : (
                <Menu size={15} className="text-gray-400" />
              )}
            </button>

            {/* AI Icon */}
            <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/20">
              <Bot size={18} className="text-cyan-400" />
            </div>

            <div className="min-w-0">
              <h1 className="text-sm md:text-base font-bold flex items-center gap-1.5 truncate">
                AI Tutor
                <Sparkles className="text-yellow-400" size={12} />
              </h1>
              <p className="text-gray-500 text-[10px] hidden sm:block">Your learning companion</p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Progress pill */}
            {progressTotal > 0 && (
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                <GraduationCap size={12} className="text-cyan-400" />
                <span className="text-[10px] text-gray-400 font-medium">{progressPct}%</span>
                <div className="w-12 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )}

            {/* Connection */}
            <div className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg bg-white/5 border border-white/10">
              {connected ? (
                <Wifi size={12} className="text-green-400" />
              ) : (
                <WifiOff size={12} className="text-red-400" />
              )}
              <span className={`hidden sm:inline ${connected ? "text-green-400" : "text-red-400"}`}>
                {connected ? "Online" : "Offline"}
              </span>
            </div>

            {/* Notes toggle */}
            <button
              onClick={() => setNotesOpen(!notesOpen)}
              className={`p-1.5 rounded-lg border transition ${
                notesOpen
                  ? "bg-cyan-500/15 border-cyan-400/30 text-cyan-400"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-cyan-400/30"
              }`}
              title="Toggle notes"
            >
              <StickyNote size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* ====== MAIN LAYOUT ====== */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Module Sidebar */}
        <ModuleSidebar
          eventId={eventId}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onModuleStatusChange={handleModuleProgress}
        />

        {/* Chat Center */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 md:px-5 py-3 space-y-3">
            {/* Empty state */}
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full text-center py-8"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 border border-cyan-400/20 flex items-center justify-center mb-3">
                  <GraduationCap size={28} className="text-cyan-400" />
                </div>
                <h2 className="text-sm font-bold text-white mb-1">AI Classroom Ready</h2>
                <p className="text-gray-500 text-xs max-w-[200px]">
                  Start your learning session or ask a question
                </p>
              </motion.div>
            )}

            {messages.map((msg, i) => (
              <AIMessageCard key={i} msg={msg} index={i} />
            ))}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="shrink-0 px-3 md:px-5 py-1.5 border-t border-white/5">
            <div className="flex gap-1.5 overflow-x-auto">
              <button
                onClick={() => sendMessage("START")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 text-[11px] font-medium hover:bg-cyan-500/25 transition shrink-0"
              >
                <Play size={12} />
                Start
              </button>
              <button
                onClick={() => sendMessage("NEXT MODULE")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/15 border border-green-400/30 text-green-400 text-[11px] font-medium hover:bg-green-500/25 transition shrink-0"
              >
                <SkipForward size={12} />
                Next
              </button>
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-[11px] font-medium hover:border-cyan-400/30 hover:text-cyan-400 transition shrink-0 lg:hidden"
              >
                <BookOpen size={12} />
                Modules
              </button>
              <button
                onClick={() => setNotesOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-[11px] font-medium hover:border-cyan-400/30 hover:text-cyan-400 transition shrink-0 lg:hidden"
              >
                <StickyNote size={12} />
                Notes
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="shrink-0 px-3 md:px-5 py-2 border-t border-white/10 bg-black/30 backdrop-blur-xl">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask your AI tutor..."
                className="flex-1 px-3 py-2 rounded-lg glass-input focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 outline-none text-sm text-white placeholder-gray-500"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium flex items-center gap-1.5 hover:shadow-lg hover:shadow-cyan-500/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={14} />
                <span className="hidden sm:inline text-sm">Send</span>
              </motion.button>
            </div>
          </div>
        </main>

        {/* Notes Panel */}
        <NotesPanel open={notesOpen} onClose={() => setNotesOpen(false)} />
      </div>
    </div>
  );
}



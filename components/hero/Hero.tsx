"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Star,
  Zap,
  Globe,
  Users,
  TrendingUp,
  Play,
  BookOpen,
  GraduationCap,
  Repeat,
  Heart,
  Calendar,
  MessageCircle,
  Award,
  Activity,
  Cpu,
  Crown,
  CheckCircle,
  ChevronRight,
  LucideIcon,
  Video,
  Mic,
  FileText,
  Brain,
  Target,
  Lightbulb,
  BarChart3,
  ArrowLeftRight,
  Search,
  UserCheck,
  Lock,
  Send,
  Bot,
  Signal,
  PartyPopper,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ───────────────────────────────────────────────────────── */
/* ANIMATION VARIANTS                                        */
/* ───────────────────────────────────────────────────────── */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

export const floatVariants = {
  animate: {
    y: [0, -15, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
  },
};

/* ───────────────────────────────────────────────────────── */
/* TYPES                                                      */
/* ───────────────────────────────────────────────────────── */
interface Stat {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  icon: LucideIcon;
}

interface LiveActivity {
  user: string;
  action: string;
  skill: string;
  time: string;
  gradient: string;
  avatar: string;
}

interface UpcomingEvent {
  title: string;
  host: string;
  attendees: number;
  time: string;
  category: string;
  live?: boolean;
  speakerAvatar: string;
}

interface ExchangeStep {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

interface ChatPreview {
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  online: boolean;
  typing?: boolean;
  unread?: number;
  gradient: string;
}

interface AIFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

/* ───────────────────────────────────────────────────────── */
/* CONSTANTS                                                  */
/* ───────────────────────────────────────────────────────── */
const stats: Stat[] = [
  { label: "Active Creators", value: 48000, suffix: "+", icon: Users },
  { label: "Skills Exchanged", value: 120000, suffix: "+", icon: Repeat },
  { label: "Countries", value: 92, suffix: "", icon: Globe },
  { label: "Avg. Rating", value: 4.9, suffix: "/5", decimals: 1, icon: Star },
];

const liveActivities: LiveActivity[] = [
  {
    user: "Aria",
    action: "started learning",
    skill: "React Development",
    time: "2m ago",
    gradient: "from-cyan-400 to-blue-600",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    user: "Marcus",
    action: "is teaching",
    skill: "Music Production",
    time: "5m ago",
    gradient: "from-purple-500 to-pink-500",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    user: "Lina",
    action: "exchanged",
    skill: "Korean Strategy",
    time: "8m ago",
    gradient: "from-emerald-400 to-cyan-500",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    user: "Diego",
    action: "joined event",
    skill: "Motion Design",
    time: "12m ago",
    gradient: "from-amber-400 to-rose-500",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
];

const upcomingEvents: UpcomingEvent[] = [
  {
    title: "Design Systems Workshop",
    host: "Sarah K.",
    attendees: 128,
    time: "Today, 3PM",
    category: "Design",
    live: true,
    speakerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    title: "React Masterclass",
    host: "Alex M.",
    attendees: 256,
    time: "Tomorrow, 2PM",
    category: "Development",
    speakerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    title: "Music Production Live",
    host: "DJ Nova",
    attendees: 512,
    time: "Fri, 8PM",
    category: "Music",
    speakerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
];

const exchangeSteps: ExchangeStep[] = [
  { icon: Search, title: "Find a Teacher", desc: "Browse skilled creators matched to your goals", color: "from-cyan-400 to-blue-500" },
  { icon: Send, title: "Request Exchange", desc: "Send a request to swap skills", color: "from-blue-400 to-indigo-500" },
  { icon: UserCheck, title: "Match", desc: "AI confirms a perfect fit", color: "from-indigo-400 to-purple-500" },
  { icon: Lock, title: "Private Room", desc: "Exchange room created instantly", color: "from-purple-400 to-pink-500" },
  { icon: MessageCircle, title: "Chat", desc: "Talk, share files, send voice notes", color: "from-pink-400 to-rose-500" },
  { icon: Calendar, title: "Schedule", desc: "Book sessions that fit your calendar", color: "from-rose-400 to-amber-500" },
  { icon: BookOpen, title: "Complete Lessons", desc: "Learn and teach in structured sessions", color: "from-amber-400 to-yellow-500" },
  { icon: Bot, title: "AI Evaluates", desc: "Get instant feedback and scoring", color: "from-yellow-400 to-emerald-500" },
  { icon: Zap, title: "Earn XP", desc: "Level up with every exchange", color: "from-emerald-400 to-cyan-500" },
];

const chatPreviews: ChatPreview[] = [
  {
    name: "Aria Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Can we schedule the React session for tomorrow?",
    time: "2m",
    online: true,
    unread: 2,
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    name: "Marcus Lee",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    lastMessage: "typing...",
    time: "now",
    online: true,
    typing: true,
    gradient: "from-purple-400 to-pink-500",
  },
  {
    name: "Lina Park",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Sent you the Figma file 🎨",
    time: "1h",
    online: false,
    gradient: "from-emerald-400 to-cyan-500",
  },
  {
    name: "Diego Ramos",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    lastMessage: "Voice note (0:42)",
    time: "3h",
    online: true,
    gradient: "from-amber-400 to-rose-500",
  },
];

const aiFeatures: AIFeature[] = [
  { icon: FileText, title: "Summarizes Lessons", desc: "Auto-generated session notes", color: "from-cyan-400 to-blue-500" },
  { icon: Brain, title: "Personalized Feedback", desc: "Tailored tips for growth", color: "from-purple-400 to-pink-500" },
  { icon: Target, title: "Scores Communication", desc: "Objective clarity ratings", color: "from-emerald-400 to-cyan-500" },
  { icon: Lightbulb, title: "Detects Weak Areas", desc: "Spot improvement opportunities", color: "from-amber-400 to-rose-500" },
  { icon: TrendingUp, title: "Recommends Next Skills", desc: "Smart learning paths", color: "from-blue-400 to-indigo-500" },
  { icon: BarChart3, title: "Tracks Progress", desc: "Visualize your growth", color: "from-pink-400 to-purple-500" },
];

const trendingSkills = [
  "AI/ML", "Figma", "React", "Motion Design", "No-Code", "3D Modeling",
  "Copywriting", "Data Science", "UI/UX", "Python", "Video Editing", "Photography",
  "Music", "Marketing", "Languages", "Web3",
];

/* ───────────────────────────────────────────────────────── */
/* UTILITY COMPONENTS                                        */
/* ───────────────────────────────────────────────────────── */
function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 2200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return (
    <span>
      {val.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

function MagneticButton({
  children,
  variant = "primary",
  className = "",
  size = "default",
  href,
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "secondary";
  className?: string;
  size?: "default" | "large";
  href?: string;
  onClick?: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const baseClasses = size === "large" ? "px-10 py-5 text-base" : "px-7 py-3.5 text-sm";

  const variantClasses = {
    primary: "text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40",
    secondary: "text-white bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40",
    ghost: "text-white/90 bg-white/5 border border-white/10 hover:border-cyan-300/40 hover:bg-white/10",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 ${baseClasses} rounded-full font-semibold tracking-wide overflow-hidden transition-all duration-300 ${variantClasses[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <motion.span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </Component>
  );
}

function FloatingPanel({
  className,
  children,
  delay = 0,
  floatIntensity = 10,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  floatIntensity?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, -floatIntensity, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-2xl blur-xl -z-10" />
        <div className="bg-[#0d1021]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/50">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

function LiveActivityFeed() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % liveActivities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-12 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <img
            src={liveActivities[current].avatar}
            alt={liveActivities[current].user}
            className="w-8 h-8 rounded-full object-cover border border-white/20"
          />
          <div className="text-sm">
            <span className="font-semibold text-white">{liveActivities[current].user}</span>
            <span className="text-white/60"> {liveActivities[current].action} </span>
            <span className="text-cyan-300">{liveActivities[current].skill}</span>
          </div>
          <span className="text-xs text-white/40">{liveActivities[current].time}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SkillMarquee() {
  const doubled = [...trendingSkills, ...trendingSkills];
  return (
    <div className="relative overflow-hidden py-4">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#05060f] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#05060f] to-transparent z-10" />
      <motion.div
        className="flex gap-3"
        animate={{ x: [0, -50 * trendingSkills.length] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="shrink-0 px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 text-white/70 hover:border-cyan-400/50 hover:text-cyan-300 transition-all cursor-pointer"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SpotlightEffect() {
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      spotlightX.set(e.clientX);
      spotlightY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [spotlightX, spotlightY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 opacity-50"
      style={{
        background: useTransform(
          [spotlightX, spotlightY],
          ([x, y]) =>
            `radial-gradient(600px circle at ${x}px ${y}px, rgba(6, 182, 212, 0.06), transparent 40%)`
        ),
      }}
    />
  );
}

function AuroraBackground({ variant = "default" }: { variant?: "default" | "events" | "exchange" | "chat" | "ai" }) {
  const palettes: Record<string, string[]> = {
    default: ["bg-cyan-500/20", "bg-purple-600/20", "bg-blue-600/20", "bg-pink-500/15"],
    events: ["bg-amber-500/15", "bg-orange-500/15", "bg-rose-500/15", "bg-purple-500/15"],
    exchange: ["bg-emerald-500/15", "bg-cyan-500/15", "bg-blue-500/15", "bg-teal-500/15"],
    chat: ["bg-cyan-500/15", "bg-blue-500/15", "bg-indigo-500/15", "bg-purple-500/15"],
    ai: ["bg-purple-500/20", "bg-pink-500/15", "bg-cyan-500/15", "bg-blue-500/15"],
  };
  const colors = palettes[variant] || palettes.default;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className={`absolute top-[-20%] left-[-15%] w-[50rem] h-[50rem] rounded-full ${colors[0]} blur-[200px] animate-pulse`} style={{ animationDuration: "8s" }} />
      <div className={`absolute top-[10%] right-[-20%] w-[55rem] h-[55rem] rounded-full ${colors[1]} blur-[200px] animate-pulse`} style={{ animationDuration: "10s", animationDelay: "-3s" }} />
      <div className={`absolute bottom-[-20%] left-[15%] w-[50rem] h-[50rem] rounded-full ${colors[2]} blur-[200px] animate-pulse`} style={{ animationDuration: "9s", animationDelay: "-5s" }} />
      <div className={`absolute bottom-[5%] right-[10%] w-[35rem] h-[35rem] rounded-full ${colors[3]} blur-[180px] animate-pulse`} style={{ animationDuration: "7s", animationDelay: "-2s" }} />
    </div>
  );
}

function Particles({ count = 40 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 47 + 13) % 100;
        const top = (i * 73 + 7) % 100;
        const dur = 5 + ((i * 7) % 6);
        const size = 1 + (i % 3);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: i % 3 === 0 ? "#06b6d4" : i % 3 === 1 ? "#a855f7" : "#3b82f6",
            }}
            animate={{ y: [0, -40, 0], opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: dur, repeat: Infinity, delay: (i % 8) * 0.5 }}
          />
        );
      })}
    </div>
  );
}

function SectionHeader({
  badge,
  title,
  subtitle,
  badgeColor = "from-cyan-500/10 to-purple-500/10 border-cyan-500/30",
}: {
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  badgeColor?: string;
}) {
  return (
    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center max-w-3xl mx-auto mb-16">
      <motion.span variants={itemVariants} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${badgeColor} border text-xs uppercase tracking-[0.15em] text-white/80 mb-5`}>
        <Sparkles size={12} className="text-cyan-300" />
        {badge}
      </motion.span>
      <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
        {title}
      </motion.h2>
      <motion.p variants={itemVariants} className="mt-5 text-lg text-white/60 leading-relaxed">
        {subtitle}
      </motion.p>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────────────── */
/* EVENTS SECTION                                             */
/* ───────────────────────────────────────────────────────── */
function EventsSection() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-20 overflow-hidden">
      <AuroraBackground variant="events" />
      <Particles count={25} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          badge="SkillWrap Events"
          badgeColor="from-amber-500/10 to-rose-500/10 border-amber-500/30"
          title={<><span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">Live Events</span> that bring creators together</>}
          subtitle="Join workshops, masterclasses, and live sessions hosted by top creators. Learn in real time, ask questions, and connect with attendees worldwide."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-3xl bg-[#0d1021]/80 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-amber-400/30"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-rose-500/20" />
              </div>

              {/* Live badge */}
              {event.live && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/40 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-300">Live</span>
                </div>
              )}

              {/* Cover */}
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-rose-500/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1021] via-transparent to-transparent" />
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                  transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                  style={{
                    backgroundImage: "radial-gradient(circle at 30% 50%, rgba(251,191,36,0.3), transparent 50%), radial-gradient(circle at 70% 80%, rgba(244,63,94,0.3), transparent 50%)",
                    backgroundSize: "200% 200%",
                  }}
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-semibold uppercase tracking-wider text-white">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <img src={event.speakerAvatar} alt={event.host} className="w-6 h-6 rounded-full object-cover border border-white/20" />
                    <span className="text-sm text-white/60">by {event.host}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5 text-white/60">
                    <Calendar size={14} className="text-amber-400" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-white/60">
                    <Users size={14} className="text-cyan-400" />
                    {event.attendees} attending
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((n) => (
                      <img
                        key={n}
                        src={`https://images.unsplash.com/photo-${n === 1 ? "1494790108377-be9c29b29330" : n === 2 ? "1507003211169-0a1dd7228f2d" : "1438761681033-6461ffad8d80"}?w=60&h=60&fit=crop&crop=face`}
                        alt="Attendee"
                        className="w-7 h-7 rounded-full object-cover ring-2 ring-[#0d1021]"
                      />
                    ))}
                    <div className="w-7 h-7 rounded-full bg-white/10 ring-2 ring-[#0d1021] grid place-items-center text-[9px] font-semibold">
                      +{event.attendees - 3}
                    </div>
                  </div>
                  <MagneticButton variant="ghost" className="!px-5 !py-2 !text-xs">
                    Join Event
                    <ChevronRight size={12} />
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <MagneticButton size="large" href="/events" className="!bg-gradient-to-r !from-amber-500 !via-orange-500 !to-rose-500 !shadow-amber-500/25">
            <Video size={18} />
            Explore Events
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────── */
/* SKILL EXCHANGE SECTION                                     */
/* ───────────────────────────────────────────────────────── */
function ExchangeSection() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-20 overflow-hidden">
      <AuroraBackground variant="exchange" />
      <Particles count={30} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          badge="Skill Exchange"
          badgeColor="from-emerald-500/10 to-cyan-500/10 border-emerald-500/30"
          title={<><span className="bg-gradient-to-r from-emerald-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent">Swap skills</span>, not money</>}
          subtitle="Trade what you know for what you want to learn. SkillWrap matches you with the perfect exchange partner and guides you through every step."
        />

        {/* Connected flow visualization */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {exchangeSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="group relative"
                >
                  {/* Connection line - horizontal on desktop */}
                  {i < exchangeSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/20 to-transparent z-0">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    </div>
                  )}

                  <div className="relative rounded-2xl bg-[#0d1021]/80 backdrop-blur-xl border border-white/10 p-5 transition-all duration-300 hover:border-cyan-400/30 overflow-hidden h-full">
                    {/* Step number */}
                    <div className="absolute top-3 right-3 text-5xl font-black text-white/5 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Mouse-follow glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10`} />
                    </div>

                    <div className="relative">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} grid place-items-center shadow-lg mb-4`}
                      >
                        <Icon size={22} className="text-white" />
                      </motion.div>
                      <h3 className="font-bold text-white text-base mb-1">{step.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <MagneticButton size="large" href="/exchange_skill" className="!bg-gradient-to-r !from-emerald-500 !via-cyan-500 !to-blue-500 !shadow-emerald-500/25">
              <ArrowLeftRight size={18} />
              Start an Exchange
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────── */
/* CHAT SYSTEM SECTION                                        */
/* ───────────────────────────────────────────────────────── */
function ChatSection() {
  const [activeChat, setActiveChat] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "Hey! Can we schedule our React session for tomorrow at 3pm? I just finished the Figma mockups you requested 🎨";

  useEffect(() => {
    if (activeChat !== 0) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          i = 0;
          setTypedText("");
        }, 3000);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [activeChat]);

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-20 overflow-hidden">
      <AuroraBackground variant="chat" />
      <Particles count={25} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          badge="Chat System"
          badgeColor="from-cyan-500/10 to-blue-500/10 border-cyan-500/30"
          title={<><span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Real-time chat</span> built for learning</>}
          subtitle="Private exchange rooms with file sharing, voice notes, AI summaries, and smart scheduling. Everything you need to learn together."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-12 gap-6"
        >
          {/* Chat list */}
          <div className="lg:col-span-4 rounded-3xl bg-[#0d1021]/80 backdrop-blur-xl border border-white/10 overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <MessageCircle size={18} className="text-cyan-400" />
                  Conversations
                </h3>
                <span className="px-2 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-[10px] font-semibold text-cyan-300">
                  {chatPreviews.filter(c => c.online).length} online
                </span>
              </div>
            </div>
            <div className="max-h-[420px] overflow-y-auto">
              {chatPreviews.map((chat, i) => (
                <motion.button
                  key={chat.name}
                  onClick={() => setActiveChat(i)}
                  whileHover={{ x: 4 }}
                  className={`w-full p-4 flex items-center gap-3 transition-colors text-left border-l-2 ${
                    activeChat === i
                      ? "bg-white/5 border-cyan-400"
                      : "border-transparent hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={chat.avatar} alt={chat.name} className="w-11 h-11 rounded-full object-cover border border-white/10" />
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0d1021]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-sm truncate">{chat.name}</span>
                      <span className="text-[10px] text-white/40 shrink-0 ml-2">{chat.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      {chat.typing ? (
                        <span className="text-xs text-cyan-300 flex items-center gap-1">
                          <span className="flex gap-0.5">
                            {[0, 1, 2].map(d => (
                              <motion.span
                                key={d}
                                className="w-1 h-1 rounded-full bg-cyan-400"
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                              />
                            ))}
                          </span>
                          typing...
                        </span>
                      ) : (
                        <span className="text-xs text-white/50 truncate">{chat.lastMessage}</span>
                      )}
                      {chat.unread && (
                        <span className="ml-2 shrink-0 w-5 h-5 rounded-full bg-cyan-500 grid place-items-center text-[10px] font-bold text-white">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Chat window */}
          <div className="lg:col-span-8 rounded-3xl bg-[#0d1021]/80 backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={chatPreviews[activeChat].avatar} alt={chatPreviews[activeChat].name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                  {chatPreviews[activeChat].online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0d1021]" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-white">{chatPreviews[activeChat].name}</div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1">
                    <Signal size={10} />
                    {chatPreviews[activeChat].online ? "Online" : "Offline"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 transition">
                  <Video size={14} className="text-cyan-400" />
                </button>
                <button className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 transition">
                  <Mic size={14} className="text-cyan-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-5 space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto">
              {/* Incoming message */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-end gap-2 max-w-[80%]"
              >
                <img src={chatPreviews[activeChat].avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                  <p className="text-sm text-white/90">Hey! Are you free this weekend for the design review?</p>
                </div>
              </motion.div>

              {/* Outgoing message with typing animation */}
              {activeChat === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: typedText ? 1 : 0, x: typedText ? 0 : 20 }}
                  className="flex items-end gap-2 max-w-[80%] ml-auto justify-end"
                >
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl rounded-br-sm px-4 py-3">
                    <p className="text-sm text-white">{typedText}<span className="inline-block w-0.5 h-3.5 bg-white ml-0.5 animate-pulse" /></p>
                  </div>
                </motion.div>
              )}

              {/* File share */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-end gap-2 max-w-[80%]"
              >
                <img src={chatPreviews[activeChat].avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 grid place-items-center">
                    <FileText size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">figma-mockups.fig</div>
                    <div className="text-[10px] text-white/50">2.4 MB</div>
                  </div>
                </div>
              </motion.div>

              {/* Voice note */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-end gap-2 max-w-[80%]"
              >
                <img src={chatPreviews[activeChat].avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-3 min-w-[200px]">
                  <button className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 grid place-items-center shrink-0">
                    <Play size={14} className="text-white fill-white" />
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-0.5 h-6">
                      {[3, 5, 8, 6, 10, 7, 4, 9, 5, 7, 3, 6, 8, 4, 5, 7, 3, 6, 4, 5].map((h, idx) => (
                        <motion.span
                          key={idx}
                          className="w-0.5 bg-cyan-400/60 rounded-full"
                          style={{ height: h }}
                          animate={{ height: [h, h * 0.5, h] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: idx * 0.05 }}
                        />
                      ))}
                    </div>
                    <div className="text-[10px] text-white/50 mt-1">0:42</div>
                  </div>
                </div>
              </motion.div>

              {/* AI Summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex items-start gap-2 max-w-[85%] mx-auto"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 grid place-items-center shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl px-4 py-3 flex-1">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles size={10} className="text-purple-300" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-300">AI Summary</span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Aria wants to schedule a React session and has shared Figma mockups. Suggested time: this weekend.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5">
                <button className="text-white/40 hover:text-cyan-400 transition">
                  <FileText size={16} />
                </button>
                <button className="text-white/40 hover:text-cyan-400 transition">
                  <Mic size={16} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder-white/40"
                />
                <button className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 grid place-items-center">
                  <Send size={14} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Continue Conversations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-emerald-300 font-medium">3 active exchanges</span>
          </div>
          <MagneticButton size="large" href="/chats">
            <MessageCircle size={18} />
            Continue Conversations
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────── */
/* AI FEEDBACK SECTION                                        */
/* ───────────────────────────────────────────────────────── */
function AISection() {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-20 overflow-hidden">
      <AuroraBackground variant="ai" />
      <Particles count={35} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          badge="AI Feedback"
          badgeColor="from-purple-500/10 to-pink-500/10 border-purple-500/30"
          title={<><span className="bg-gradient-to-r from-purple-300 via-pink-400 to-rose-400 bg-clip-text text-transparent">AI-powered</span> learning intelligence</>}
          subtitle="SkillWrap AI automatically summarizes lessons, gives personalized feedback, scores communication, detects weak areas, and recommends your next skills."
        />

        <div className="grid lg:grid-cols-12 gap-6">
          {/* AI Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 rounded-3xl bg-[#0d1021]/80 backdrop-blur-xl border border-white/10 overflow-hidden"
          >
            {/* Dashboard header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 grid place-items-center shadow-lg shadow-purple-500/30">
                  <Brain size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">AI Learning Dashboard</h3>
                  <p className="text-xs text-white/50">Last session analysis</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">Live</span>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 space-y-5">
              {/* Overall score */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Communication", value: 92, color: "from-cyan-400 to-blue-500" },
                  { label: "Clarity", value: 88, color: "from-purple-400 to-pink-500" },
                  { label: "Engagement", value: 95, color: "from-emerald-400 to-cyan-500" },
                ].map((score, i) => (
                  <motion.div
                    key={score.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4"
                  >
                    <div className="text-[10px] uppercase tracking-wider text-white/50 mb-2">{score.label}</div>
                    <div className="text-2xl font-black text-white mb-2">
                      <Counter to={score.value} suffix="%" />
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${score.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                        className={`h-full rounded-full bg-gradient-to-r ${score.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* AI Summary card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 grid place-items-center">
                    <FileText size={12} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white">Session Summary</span>
                  <span className="ml-auto text-[10px] text-white/40">Auto-generated</span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">
                  Strong explanation of React hooks. Improved on useState and useEffect patterns. Consider practicing custom hooks for reusable logic. Great use of real-world examples.
                </p>
              </motion.div>

              {/* Weak areas */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="rounded-2xl bg-white/5 border border-white/10 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Target size={14} className="text-amber-400" />
                  <span className="text-sm font-semibold text-white">Detected Weak Areas</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Custom Hooks", "Context API", "Performance Optimization"].map((area, i) => (
                    <motion.span
                      key={area}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-medium"
                    >
                      {area}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Recommended next skills */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="rounded-2xl bg-white/5 border border-white/10 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={14} className="text-cyan-400" />
                  <span className="text-sm font-semibold text-white">Recommended Next Skills</span>
                </div>
                <div className="space-y-2">
                  {[
                    { skill: "Advanced React Patterns", match: 96 },
                    { skill: "TypeScript Deep Dive", match: 89 },
                    { skill: "State Management with Zustand", match: 84 },
                  ].map((rec, i) => (
                    <motion.div
                      key={rec.skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 grid place-items-center">
                          <BookOpen size={12} className="text-white" />
                        </div>
                        <span className="text-sm text-white font-medium">{rec.skill}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${rec.match}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                          />
                        </div>
                        <span className="text-xs font-bold text-cyan-300">{rec.match}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* AI Features grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-5 grid grid-cols-2 gap-4 content-start"
          >
            {aiFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="group relative rounded-2xl bg-[#0d1021]/80 backdrop-blur-xl border border-white/10 p-5 overflow-hidden transition-all hover:border-purple-400/30"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color}`} />
                  </div>
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} grid place-items-center shadow-lg mb-3`}
                  >
                    <Icon size={18} className="text-white" />
                  </motion.div>
                  <h4 className="font-bold text-white text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-white/60 leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}

            {/* CTA card */}
            <motion.div
              variants={itemVariants}
              className="col-span-2 relative rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 p-6 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-500/30 blur-3xl" />
              <div className="relative">
                <Bot size={24} className="text-purple-300 mb-3" />
                <h4 className="font-bold text-white text-lg mb-2">Unlock AI Insights</h4>
                <p className="text-sm text-white/70 mb-4">Get personalized AI feedback on every learning session.</p>
                <MagneticButton variant="secondary" href="/ai-insights" className="!w-full !justify-center">
                  <Brain size={16} />
                  View AI Insights
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────── */
/* MAIN HERO COMPONENT                                        */
/* ───────────────────────────────────────────────────────── */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useTransform(my, [0, 1], [6, -6]);
  const ry = useTransform(mx, [0, 1], [-6, 6]);

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="relative bg-[#05060f] text-white overflow-hidden">
      {/* ─────── HERO ─────── */}
      <section
        ref={heroRef}
        onMouseMove={(e) => {
          if (!heroRef.current) return;
          const r = heroRef.current.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        className="relative min-h-screen overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-20"
      >
        <SpotlightEffect />

        {/* Animated background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-20%] left-[-15%] w-[50rem] h-[50rem] rounded-full bg-cyan-500/20 blur-[200px] animate-pulse" style={{ animationDuration: "8s" }} />
          <div className="absolute top-[10%] right-[-20%] w-[55rem] h-[55rem] rounded-full bg-purple-600/20 blur-[200px] animate-pulse" style={{ animationDuration: "10s", animationDelay: "-3s" }} />
          <div className="absolute bottom-[-20%] left-[15%] w-[50rem] h-[50rem] rounded-full bg-blue-600/20 blur-[200px] animate-pulse" style={{ animationDuration: "9s", animationDelay: "-5s" }} />
          <div className="absolute bottom-[5%] right-[10%] w-[35rem] h-[35rem] rounded-full bg-pink-500/15 blur-[180px] animate-pulse" style={{ animationDuration: "7s", animationDelay: "-2s" }} />
        </div>

        {/* Particles */}
        <Particles count={40} />

        {/* Main content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left column */}
          <div className="lg:col-span-7">
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-xs uppercase tracking-[0.15em] text-cyan-200">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Open Beta
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                <Crown size={12} className="text-amber-400" />
                48,000+ creators joined
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black leading-[0.92] tracking-tight">
              <span className="block">Learn. Teach.</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Exchange. Grow.
              </span>
              <span className="block mt-2 text-white/90">Together.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-8 text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed">
              SkillWrap is where <span className="text-cyan-300">creators</span>,{" "}
              <span className="text-blue-300">builders</span>, and{" "}
              <span className="text-purple-300">dreamers</span> connect to swap knowledge. From design and
              code to music and languages — turn what you know into opportunity.
              <span className="text-white font-medium"> The future of learning is human.</span>
            </motion.p>

            {/* Live activity */}
            <motion.div variants={itemVariants} className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
                <Activity size={12} className="text-emerald-400" />
                Live activity
              </div>
              <LiveActivityFeed />
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton size="large" href="#skills">
                <BookOpen size={18} />
                Start Learning Free
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton variant="secondary" size="large" href="/create-skill">
                <GraduationCap size={18} />
                Teach a Skill
              </MagneticButton>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-4 flex flex-wrap gap-3">
              <MagneticButton variant="ghost" href="/skills">
                <Repeat size={14} />
                Explore Exchanges
              </MagneticButton>
              <MagneticButton variant="ghost">
                <Play size={14} className="fill-white" />
                Watch Demo (60s)
              </MagneticButton>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
                ].map((img, i) => (
                  <motion.img
                    key={i}
                    src={img}
                    alt="User"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#05060f] shadow-lg"
                  />
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 }}
                  className="w-10 h-10 rounded-full bg-white/10 ring-2 ring-[#05060f] grid place-items-center text-xs font-semibold"
                >
                  +48k
                </motion.div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  <span className="ml-2 text-white font-semibold">4.9</span>
                </div>
                <div className="text-sm text-white/60">Loved by 48,000+ makers worldwide</div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded-2xl p-4 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <Icon size={16} className="text-cyan-400 mb-2" />
                      <div className="text-2xl font-black">
                        <Counter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-white/50 mt-1">{s.label}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right visual */}
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
            className="lg:col-span-5 relative h-[600px] hidden lg:block"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              {/* Glow backdrop */}
              <div className="absolute inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/30 via-blue-600/30 to-purple-600/30 blur-3xl" />

              {/* Main card */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-[#0b0e1a]/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-600/5" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                <div className="relative p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between text-xs mb-4">
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live Exchange
                    </span>
                    <span className="text-white/50">Today · {currentTime}</span>
                  </div>

                  {/* Profile */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
                        alt="Aria Chen"
                        className="w-16 h-16 rounded-2xl object-cover shadow-lg shadow-cyan-500/20"
                      />
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#0b0e1a] grid place-items-center">
                        <CheckCircle size={10} className="text-white" />
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">Aria Chen</div>
                      <div className="text-sm text-white/60">Teaching UI Design</div>
                      <div className="text-xs text-cyan-300 mt-1">wants React lessons</div>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[
                      { icon: Zap, label: "Figma Pro", value: "Expert", color: "from-cyan-400 to-blue-500" },
                      { icon: Globe, label: "Speaks", value: "3 languages", color: "from-purple-400 to-pink-500" },
                      { icon: Users, label: "Exchanges", value: "240 total", color: "from-emerald-400 to-cyan-500" },
                      { icon: Award, label: "Rating", value: "4.9/5 stars", color: "from-amber-400 to-rose-500" },
                    ].map(({ icon: Icon, label, value, color }) => (
                      <div
                        key={label}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} grid place-items-center shadow-lg`}>
                            <Icon size={14} className="text-white" />
                          </span>
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-white/50">{label}</div>
                            <div className="text-sm font-medium">{value}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Match */}
                  <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                    <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
                      <Cpu size={12} className="text-cyan-400" />
                      AI Match Score
                    </div>
                    <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "94%" }}
                        transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        94%
                      </span>
                      <span className="text-xs text-white/50">Perfect match for your goals</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-auto w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
                    href="/signup"
                  >
                    Connect & Exchange
                    <ChevronRight size={16} />
                  </motion.a>
                </div>
              </div>

              {/* Floating panels */}
              <FloatingPanel className="-left-8 top-16 w-56" delay={0.5}>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 grid place-items-center shadow-lg">
                    <MessageCircle size={16} className="text-white" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">+12 new matches</div>
                    <div className="text-xs text-white/60">in your area</div>
                  </div>
                </div>
              </FloatingPanel>

              <FloatingPanel className="-right-6 top-32 w-52" delay={0.8}>
                <div className="text-xs text-white/60 mb-2">Trending now</div>
                <div className="font-semibold">Motion Design</div>
                <div className="mt-2 flex items-center gap-2 text-emerald-300 text-xs">
                  <TrendingUp size={12} />
                  +84% this week
                </div>
              </FloatingPanel>

              <FloatingPanel className="-left-4 bottom-24 w-60" delay={1.1}>
                <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
                  <Calendar size={12} />
                  Upcoming event
                </div>
                <div className="font-semibold text-sm">{upcomingEvents[0].title}</div>
                <div className="mt-1 text-xs text-white/60">
                  by {upcomingEvents[0].host} · {upcomingEvents[0].attendees} attending
                </div>
              </FloatingPanel>

              <FloatingPanel className="-right-8 bottom-16 w-48" delay={1.4} floatIntensity={8}>
                <div className="flex items-center gap-2">
                  <Heart size={14} className="text-pink-400" />
                  <span className="text-sm font-medium">2,847 online</span>
                </div>
                <div className="text-xs text-white/60 mt-1">exchanging skills now</div>
              </FloatingPanel>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Skill marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative z-10 mt-16 max-w-7xl mx-auto"
        >
          <div className="text-center text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
            Popular skills being exchanged
          </div>
          <SkillMarquee />
        </motion.div>

        {/* Brand strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="relative z-10 mt-16 max-w-7xl mx-auto"
        >
          <div className="text-center text-xs uppercase tracking-[0.3em] text-white/40 mb-6">
            Trusted by teams & creators from
          </div>
          <div className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#05060f] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#05060f] to-transparent z-10" />
            <motion.div
              className="flex gap-16 whitespace-nowrap text-2xl font-bold text-white/20"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(2)].flatMap(() =>
                ["Framer", "Linear", "Vercel", "Figma", "Notion", "Discord", "Spotify", "Stripe", "GitHub", "Loom"].map(
                  (b, i) => (
                    <span key={`${b}-${i}`} className="hover:text-white/40 transition">
                      {b}
                    </span>
                  )
                )
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─────── EVENTS ─────── */}
      <EventsSection />

      {/* ─────── SKILL EXCHANGE ─────── */}
      <ExchangeSection />

      {/* ─────── CHAT SYSTEM ─────── */}
      <ChatSection />

      {/* ─────── AI FEEDBACK ─────── */}
      <AISection />

      {/* ─────── FINAL CTA ─────── */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-20 overflow-hidden">
        <AuroraBackground variant="default" />
        <Particles count={30} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-xs uppercase tracking-[0.15em] text-cyan-200 mb-8"
          >
            <PartyPopper size={12} />
            Join the movement
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
            <span className="block">Ready to grow</span>
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              with SkillWrap?
            </span>
          </h2>

          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Join 48,000+ creators exchanging skills, attending live events, and learning with AI-powered feedback.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton size="large" href="/signup">
              <Sparkles size={18} />
              Get Started Free
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton variant="ghost" size="large" href="/login">
              Sign In
            </MagneticButton>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

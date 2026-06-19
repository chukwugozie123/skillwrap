import {
  Inbox,
  Send,
  Layers,
  Trophy,
  Sparkles,
  Plus,
  Copy,
  Check,
  Zap,
  ArrowRight,
  TrendingUp,
  Star,
  Activity,
  Clock,
  CheckCircle2,
  Circle,
  Flame,
  Target,
  Users,
  ChevronRight,
  Search,
  Edit3,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Stats {
  receivedRequests: number;
  sendRequests: number;
  createdSkills: number;
  succesfullExchnage: number;
}

interface User {
  username?: string;
  email?: string;
  img_url?: string;
  created_at?: string;
  points?: number;
  referral_code?: string;
}

interface Props {
  stats: Stats;
  user: User;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getExchangeLevel(points: number): { label: string; color: string; next: number } {
  if (points >= 5000) return { label: "Grandmaster", color: "from-yellow-400 to-orange-400", next: 10000 };
  if (points >= 2000) return { label: "Expert", color: "from-cyan-400 to-blue-500", next: 5000 };
  if (points >= 800)  return { label: "Skilled", color: "from-teal-400 to-cyan-500", next: 2000 };
  if (points >= 300)  return { label: "Apprentice", color: "from-blue-400 to-teal-400", next: 800 };
  return { label: "Newcomer", color: "from-slate-400 to-blue-400", next: 300 };
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) { setCount(0); return; }
    startRef.current = null;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * ease));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return <span>{count}</span>;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  title, value, icon, gradient, delay,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl overflow-hidden cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {/* Glow layer */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${gradient} blur-xl`} />

      <div className="relative z-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group-hover:border-white/20 group-hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} bg-opacity-20 shadow-lg`}>
            <div className="text-white">{icon}</div>
          </div>
          <TrendingUp size={14} className="text-white/30 group-hover:text-white/60 transition-colors mt-1" />
        </div>
        <div className="mt-2">
          {value === 0 ? (
            <div className="h-8 w-16 rounded-lg bg-white/10 animate-pulse mb-1" />
          ) : (
            <span className="text-3xl font-bold text-white tracking-tight">
              {visible ? <AnimatedCounter target={value} /> : 0}
            </span>
          )}
          <p className="text-xs text-gray-400 mt-1 font-medium uppercase tracking-widest">{title}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({
  icon, title, desc, href, accent,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  accent: string;
}) {
  return (
    <a
      href={href}
      className="group relative rounded-2xl overflow-hidden block"
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${accent} blur-2xl`} />
      <div className="relative z-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group-hover:border-white/25 group-hover:-translate-y-1 transition-all duration-300 h-full">
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${accent} bg-opacity-20 mb-4 shadow-md`}>
          <div className="text-white">{icon}</div>
        </div>
        <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-cyan-300 transition-colors">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-white/40 group-hover:text-cyan-400 transition-colors">
          Open <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  );
}

// ─── Activity Feed Item ────────────────────────────────────────────────────────
const FEED_ITEMS = [
  { id: 1, type: "match", user: "alex_dev", skill: "React Hooks", time: "2m ago", status: "new" },
  { id: 2, type: "accepted", user: "sara.design", skill: "Figma Prototyping", time: "14m ago", status: "success" },
  { id: 3, type: "completed", user: "node_master", skill: "Node.js APIs", time: "1h ago", status: "done" },
  { id: 4, type: "request", user: "kira.ui", skill: "TypeScript Generics", time: "3h ago", status: "pending" },
  { id: 5, type: "completed", user: "devops.pro", skill: "Docker Compose", time: "5h ago", status: "done" },
];

const statusMeta: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  new:     { label: "New Match",  color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",    icon: <Zap size={11} /> },
  success: { label: "Accepted",  color: "text-teal-400 bg-teal-400/10 border-teal-400/20",    icon: <CheckCircle2 size={11} /> },
  done:    { label: "Completed", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", icon: <Trophy size={11} /> },
  pending: { label: "Pending",   color: "text-orange-400 bg-orange-400/10 border-orange-400/20", icon: <Clock size={11} /> },
};

  const API_URL = "http://localhost:4000";

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export default function ExchangeDashboard({ stats, user }: Props) {
  const [copied, setCopied] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const points = user?.points ?? 0;
  const level = getExchangeLevel(points);
  const xpProgress = Math.min(((points % level.next) / level.next) * 100, 100);
  const referralUrl = `https://skillwrap2026.vercel.app/signup?ref=${user?.referral_code ?? ""}`;
  const streak = 7; // UI-only streak value

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // / ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface ActivityItem {
  id: number;
  user_id: number;
  activity_type: string;
  title: string;
  description?: string;
  icon?: string;
  color?: string;
  created_at: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY META
// ─────────────────────────────────────────────────────────────────────────────

const activityMeta: Record<
  string,
  {
    icon: string;
    label: string;
    color: string;
  }
> = {
  skill_created: {
    icon: "✨",
    label: "Skill Created",
    color:
      "text-emerald-400 border-emerald-400/20 bg-emerald-500/10",
  },

  skill_liked: {
    icon: "❤️",
    label: "Liked",
    color:
      "text-rose-400 border-rose-400/20 bg-rose-500/10",
  },

  exchange_started: {
    icon: "🔁",
    label: "Exchange",
    color:
      "text-purple-400 border-purple-400/20 bg-purple-500/10",
  },

  event_joined: {
    icon: "🎯",
    label: "Event",
    color:
      "text-cyan-400 border-cyan-400/20 bg-cyan-500/10",
  },

  default: {
    icon: "⚡",
    label: "Activity",
    color:
      "text-blue-400 border-blue-400/20 bg-blue-500/10",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY ROW
// ─────────────────────────────────────────────────────────────────────────────

function ActivityRow({
  item,
  index,
  heroVisible,
}: {
  item: ActivityItem;
  index: number;
  heroVisible: boolean;
}) {
  const meta =
    activityMeta[item.activity_type] ||
    activityMeta.default;

  return (
    <div
      className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.03] transition-all duration-300"
      style={{
        opacity: heroVisible ? 1 : 0,
        transform: heroVisible
          ? "translateX(0)"
          : "translateX(-8px)",
        transition: `opacity 0.5s ease ${
          300 + index * 60
        }ms, transform 0.5s ease ${
          300 + index * 60
        }ms`,
      }}
    >
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/20 border border-white/10 flex items-center justify-center text-white/70 text-xs font-bold flex-shrink-0">
        {(item.title?.[0] || "U").toUpperCase()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/85 font-medium truncate">
          <span className="text-cyan-300">
            {item.title}
          </span>
        </p>

        <p className="text-xs text-gray-500 mt-0.5 truncate">
          {item.description || "No description"}
        </p>

        <p className="text-[10px] text-white/30 mt-1">
          {new Date(item.created_at).toLocaleString()}
        </p>
      </div>

      {/* Badge */}
      <span
        className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-semibold flex-shrink-0 ${meta.color}`}
      >
        <span>{meta.icon}</span>
        <span>{meta.label}</span>
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATES
// ─────────────────────────────────────────────────────────────────────────────

const [activities, setActivities] = useState<ActivityItem[]>([]);
const [loading, setLoading] = useState(true);

// ─────────────────────────────────────────────────────────────────────────────
// FETCH ACTIVITIES
// ─────────────────────────────────────────────────────────────────────────────

useEffect(() => {
  const fetchActivities = async () => {
    try {
      const res = await fetch(
        `${API_URL}/activity/get`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      setActivities(data);

      // if (data.success) {
      // }

    } catch (err) {
      console.log("Failed to load activities", err);
    } finally {
      setLoading(false);
    }
  };

  fetchActivities();
}, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">

      {/* ── Floating background orbs ─────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" style={{ animationDuration: "6s" }} />
        <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-cyan-500/8 blur-[140px] animate-pulse" style={{ animationDuration: "9s", animationDelay: "2s" }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-teal-500/8 blur-[100px] animate-pulse" style={{ animationDuration: "8s", animationDelay: "4s" }} />
        <div className="absolute top-2/3 right-1/4 w-[300px] h-[300px] rounded-full bg-yellow-500/5 blur-[80px]" />
      </div>

      {/* ── Hero / Mode Header ───────────────────────────────────────────── */}
      <div
        className="relative mb-10 rounded-3xl overflow-hidden"
        style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(-16px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Hero background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-cyan-900/40 to-teal-900/50 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-teal-500/15 via-transparent to-transparent" />
        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(56,189,248,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

        <div className="relative z-10 px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-widest uppercase">
                <Activity size={11} className="animate-pulse" />
                Exchange Mode
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
              Trade Skills.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                Grow Faster.
              </span>
            </h1>
            <p className="text-base text-blue-200/70 max-w-md leading-relaxed">
              Teach what you know, learn what you need — skill for skill.
            </p>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Market Live
          </div>
        </div>
      </div>

      {/* ── Profile Card ──────────────────────────────────────────────────── */}
      <div
        className="mb-8 relative rounded-2xl overflow-hidden group"
        style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
        }}
      >
        {/* Glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-blue-600/15 to-cyan-600/10 blur-xl rounded-2xl" />
        <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cyan-400/25 transition-colors duration-500" />

        <div className="relative z-10 p-6 rounded-2xl bg-white/5 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 blur-md opacity-40 scale-110 group-hover:opacity-60 transition-opacity" />
              <img
                src={user?.img_url || "/avatar.png"}
                alt="Profile"
                width={88}
                height={88}
                className="relative rounded-full border-2 border-cyan-400/50 object-cover"
                style={{ width: 88, height: 88 }}
              />
              {/* Online dot */}
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-teal-400 border-2 border-gray-900 shadow-lg shadow-teal-400/50" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 mb-1">
                <h2 className="text-xl font-bold text-white">{user?.username ?? "Anonymous"}</h2>
                {/* Level badge */}
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${level.color} shadow-lg`}>
                  {level.label}
                </span>
              </div>
              <p className="text-sm text-gray-400">{user?.email}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Joined {new Date(user?.created_at || Date.now()).toDateString()}
              </p>

              {/* XP Bar */}
              <div className="mt-4 max-w-xs mx-auto sm:mx-0">
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span className="font-medium text-white/70">XP Progress</span>
                  <span>{points} / {level.next} pts</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${level.color} transition-all duration-1000 shadow-sm`}
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{level.next - points} pts to next level</p>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col items-center sm:items-end gap-3">
              {/* Points */}
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500/15 to-orange-500/10 border border-yellow-400/20 shadow-md">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-300 font-bold text-lg">{points.toLocaleString()}</span>
                <span className="text-yellow-400/60 text-xs">pts</span>
              </div>
              {/* Streak */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-400/20">
                <Flame size={14} className="text-orange-400" />
                <span className="text-orange-300 text-sm font-semibold">{streak} day streak</span>
              </div>
              {/* CTA */}
              <a
                href="/create-skill"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 active:scale-95 transition-all duration-200 font-semibold text-white text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-400/40"
              >
                <Plus size={16} /> Create Skill
              </a>
            </div>
          </div>
        </div>
      </div>


      {/* ── Two-column: Activity Feed + Active Exchange Status ────────────── */}
      <div className="grid lg:grid-cols-5 gap-6 mb-10">



{/* // ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY SECTION
// ───────────────────────────────────────────────────────────────────────────── */}

<div className="grid lg:grid-cols-5 gap-6 mb-10">

  {/* Activity Feed */}
  <div className="lg:col-span-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden">

    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
      <div className="flex items-center gap-2.5">
        <Activity
          size={16}
          className="text-cyan-400"
        />

        <h3 className="font-semibold text-white text-sm">
          Recent Activity
        </h3>
      </div>

      <span className="text-xs text-gray-500 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
        Live
      </span>
    </div>

    {/* Feed */}
    <div className="divide-y divide-white/5">

      {loading ? (
        <div className="px-6 py-6 text-sm text-white/40">
          Loading activity...
        </div>
      ) : activities.length === 0 ? (
        <div className="px-6 py-10 text-sm text-white/40 text-center">
          No activity yet
        </div>
      ) : (
        activities.map((item, i) => (
          <ActivityRow
            key={item.id}
            item={item}
            index={i}
            heroVisible={heroVisible}
          />
        ))
      )}

    </div>

    {/* Footer */}
    <div className="px-6 py-3 border-t border-white/10">
      <button className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors">
        View all activity

        <ChevronRight size={12} />
      </button>
    </div>
  </div>
</div>
          {/* Quick insight */}
          <div className="rounded-2xl bg-gradient-to-br from-teal-500/10 to-cyan-500/5 border border-teal-400/20 backdrop-blur-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={15} className="text-teal-400" />
              <h3 className="font-semibold text-white text-sm">Insight</h3>
            </div>
            <p className="text-xs text-teal-200/70 leading-relaxed">
              You're in the top 12% of exchangers this week. Keep the momentum — one more completed exchange unlocks <span className="text-yellow-400 font-semibold">Expert</span> status.
            </p>
          </div>
        </div>
      {/* </div> */}

      {/* ── Referral Section ──────────────────────────────────────────────── */}
      <div className="mb-10 relative rounded-2xl overflow-hidden">
        {/* Animated glowing border */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "linear-gradient(90deg, #3b82f6, #06b6d4, #14b8a6, #eab308, #3b82f6)",
            backgroundSize: "300% 100%",
            padding: "1px",
            animation: "gradientShift 4s linear infinite",
            WebkitMaskImage: "linear-gradient(#fff 0 0)",
            maskImage: "linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "destination-out",
            maskComposite: "exclude",
          }}
        />
        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            100% { background-position: 300% 50%; }
          }
        `}</style>

        {/* Inner glow */}
        <div className="absolute inset-px rounded-2xl bg-gradient-to-br from-blue-900/60 via-cyan-900/40 to-teal-900/50 backdrop-blur-xl" />

        <div className="relative z-10 px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                <div className="p-2 rounded-xl bg-yellow-400/15 border border-yellow-400/20">
                  <Users size={18} className="text-yellow-400" />
                </div>
                <span className="text-yellow-300 font-bold text-sm uppercase tracking-widest">Referral Program</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Invite Friends &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Earn Points
                </span>
              </h3>
              <p className="text-blue-200/60 text-sm leading-relaxed max-w-sm">
                Share your unique link. When someone signs up through it, you both earn bonus XP — instantly.
              </p>

              {/* Reward pills */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mt-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold">
                  <Zap size={11} /> +50 pts per referral
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-400/20 text-yellow-300 text-xs font-semibold">
                  <Star size={11} /> Bonus at 5 referrals
                </div>
              </div>
            </div>

            {/* Right: input + copy */}
            <div className="w-full lg:w-auto lg:min-w-[360px]">
              <p className="text-xs text-gray-400 mb-2 font-medium">Your referral link</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 min-w-0">
                  <span className="text-xs text-gray-300 truncate flex-1 font-mono select-all">
                    {referralUrl}
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex-shrink-0 ${
                    copied
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30 scale-95"
                      : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95"
                  }`}
                >
                  {copied ? (
                    <><Check size={15} /> Copied!</>
                  ) : (
                    <><Copy size={15} /> Copy</>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Referral code: <span className="text-cyan-400 font-mono font-semibold">{user?.referral_code ?? "—"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA Section ───────────────────────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 gap-5 mb-10">
        <a
          href="/browse-skills"
          className="group relative rounded-2xl overflow-hidden block"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          <div className="relative z-10 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-400/20 group-hover:border-blue-400/40 transition-all duration-300 group-hover:-translate-y-0.5">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25">
                <Search size={20} className="text-white" />
              </div>
              <ArrowRight size={18} className="text-blue-400/50 group-hover:text-blue-300 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1.5">Find Skill Match</h3>
            <p className="text-sm text-blue-200/60 leading-relaxed">
              Browse the marketplace to find the perfect exchange partner matching your needs.
            </p>
          </div>
        </a>

        <a
          href="/create-skill"
          className="group relative rounded-2xl overflow-hidden block"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          <div className="relative z-10 p-6 rounded-2xl bg-gradient-to-br from-teal-500/10 to-cyan-500/5 border border-teal-400/20 group-hover:border-teal-400/40 transition-all duration-300 group-hover:-translate-y-0.5">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/25">
                <Edit3 size={20} className="text-white" />
              </div>
              <ArrowRight size={18} className="text-teal-400/50 group-hover:text-teal-300 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1.5">Create Better Offer</h3>
            <p className="text-sm text-teal-200/60 leading-relaxed">
              Refine your skill listing to attract more high-quality exchange requests.
            </p>
          </div>
        </a>
      </div>

      {/* ── Exchange Actions ──────────────────────────────────────────────── */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">Exchange Actions</h2>
        <p className="text-sm text-gray-400 max-w-xl">
          Manage your active exchanges, review requests, and track skills shared with others.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Layers size={20} />}
          title="My Skills"
          desc="Maintain the skills you're offering for exchange."
          href="/my-skill"
          accent="from-cyan-500/20 to-blue-600/10"
        />
        <FeatureCard
          icon={<Inbox size={20} />}
          title="Received Requests"
          desc="Respond to incoming exchange requests."
          href="/request-recieved"
          accent="from-blue-500/20 to-teal-600/10"
        />
        <FeatureCard
          icon={<Send size={20} />}
          title="Sent Requests"
          desc="Track exchanges you've initiated."
          href="/request-sent"
          accent="from-teal-500/20 to-cyan-600/10"
        />
      </div>
    </div>
  );
}



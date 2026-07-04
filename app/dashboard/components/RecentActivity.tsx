import { Activity, Clock, TrendingUp, Zap, Star, Heart, Target, Layers } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

interface Props {
  activities: ActivityItem[];
  loading: boolean;
}

const activityMeta: Record<string, { icon: React.ReactNode; label: string; gradient: string; border: string; text: string; glow: string }> = {
  skill_created: {
    icon: <Layers size={14} />,
    label: "Created",
    gradient: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-400/30",
    text: "text-emerald-400",
    glow: "shadow-emerald-500/20",
  },
  skill_liked: {
    icon: <Heart size={14} />,
    label: "Liked",
    gradient: "from-rose-500/20 to-pink-500/10",
    border: "border-rose-400/30",
    text: "text-rose-400",
    glow: "shadow-rose-500/20",
  },
  exchange_started: {
    icon: <Zap size={14} />,
    label: "Exchange",
    gradient: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-400/30",
    text: "text-violet-400",
    glow: "shadow-violet-500/20",
  },
  event_joined: {
    icon: <Target size={14} />,
    label: "Event",
    gradient: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-400/30",
    text: "text-cyan-400",
    glow: "shadow-cyan-500/20",
  },
  default: {
    icon: <Activity size={14} />,
    label: "Activity",
    gradient: "from-blue-500/20 to-indigo-500/10",
    border: "border-blue-400/30",
    text: "text-blue-400",
    glow: "shadow-blue-500/20",
  },
};

function ActivitySkeleton() {
  return (
    <div className="flex items-center gap-4 px-6 py-4 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-slate-800/60" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 rounded-lg bg-slate-800/60" />
        <div className="h-3 w-1/2 rounded-lg bg-slate-800/40" />
      </div>
      <div className="w-20 h-6 rounded-full bg-slate-800/60" />
    </div>
  );
}

function TimeAgo({ date }: { date: string }) {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return <span className="text-emerald-400">just now</span>;
  if (diffMins < 60) return <span>{diffMins}m ago</span>;
  if (diffHours < 24) return <span>{diffHours}h ago</span>;
  if (diffDays < 7) return <span>{diffDays}d ago</span>;
  return <span>{past.toLocaleDateString()}</span>;
}

function ActivityRow({ item, index, visible }: { item: ActivityItem; index: number; visible: boolean }) {
  const meta = activityMeta[item.activity_type] || activityMeta.default;
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      ref={ref}
      className="group relative"
      style={{
        opacity: visible && mounted ? 1 : 0,
        transform: visible && mounted ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`,
      }}
    >
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-slate-800/30 to-transparent" />

      <div className="relative flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group-hover:bg-white/[0.02]">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center shadow-lg">
            <span className="text-white/90 text-sm font-bold">
              {(item.title?.[0] || "U").toUpperCase()}
            </span>
          </div>
          <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-full bg-gradient-to-br ${meta.gradient} border ${meta.border} shadow-lg`}>
            <div className={meta.text}>{meta.icon}</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm text-white font-semibold truncate">
              {item.title}
            </p>
          </div>
          <p className="text-xs text-slate-500 truncate mt-0.5">
            {item.description || "No description available"}
          </p>
        </div>

        {/* Time & Badge */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Clock size={12} />
            <TimeAgo date={item.created_at} />
          </div>

          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-gradient-to-r ${meta.gradient} border ${meta.border} ${meta.text} shadow-sm`}>
            {meta.icon}
            <span>{meta.label}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function RecentActivity({ activities, loading }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/20">
            <Activity size={18} className="text-cyan-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Recent Activity</h2>
            <p className="text-xs text-slate-500">Your latest actions and updates</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <TrendingUp size={12} className="text-emerald-400" />
          <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-950/90 backdrop-blur-2xl border border-white/[0.06] shadow-2xl shadow-black/20">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
        <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent" />

        <div className="relative z-10 max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {loading ? (
            <div className="py-2">
              {[...Array(5)].map((_, i) => (
                <ActivitySkeleton key={i} />
              ))}
            </div>
          ) : activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="relative mb-4">
                <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
                <div className="relative p-4 rounded-full bg-slate-800/50 border border-white/10">
                  <Activity size={28} className="text-slate-500" />
                </div>
              </div>
              <p className="text-slate-400 text-sm font-medium mb-1">No activity yet</p>
              <p className="text-slate-600 text-xs text-center max-w-xs">
                Start exploring, exchanging skills, and connecting with others to see your activity here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {activities.slice(0, 8).map((item, index) => (
                <ActivityRow key={item.id} item={item} index={index} visible={visible} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

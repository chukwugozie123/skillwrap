"use client"

import { useEffect, useState } from "react";
import  Link  from "next/link";
import { motion } from "framer-motion";
import {
  Trophy,
  Star,
  Crown,
  Medal,
  Search,
  TrendingUp,
  Flame,
  Sparkles,
  ChevronRight,
  User,
  Calendar,
} from "lucide-react";

/* ================= TYPES ================= */

interface LeaderboardUser {
  id: number;
  username: string;
  points?: number;
  created_at?: string;
  createdSkills?: number;
  succesfullExchnage?: number;
}

/* ================= ANIMATED BACKGROUND ================= */

function GlowOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`}
      animate={{
        y: [0, 50, 0],
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.015]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(6,255,208,0.8) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,255,208,0.8) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  );
}

/* ================= RANK BADGE ================= */

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-yellow-400/30 blur-xl rounded-full" />
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-400/30">
          <Crown size={22} className="text-white" />
        </div>
      </motion.div>
    );
  }

  if (rank === 2) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.3 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gray-300/20 blur-xl rounded-full" />
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-slate-500 flex items-center justify-center shadow-lg shadow-gray-400/20">
          <Medal size={22} className="text-white" />
        </div>
      </motion.div>
    );
  }

  if (rank === 3) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full" />
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Medal size={22} className="text-white" />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
      <span className="text-lg font-bold text-gray-400">{rank}</span>
    </div>
  );
}

/* ================= POINTS DISPLAY ================= */

function PointsDisplay({ points, rank }: { points: number; rank: number }) {
  const isTop3 = rank <= 3;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full ${
        isTop3
          ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
          : "bg-white/5 border border-white/10"
      }`}
    >
      <Star size={16} className={isTop3 ? "text-yellow-400" : "text-cyan-400"} />
      <span className={`font-bold text-lg ${isTop3 ? "text-yellow-300" : "text-cyan-300"}`}>
        {points.toLocaleString()}
      </span>
    </motion.div>
  );
}

/* ================= USER CARD ================= */

function UserCard({ user, rank, index }: { user: LeaderboardUser; rank: number; index: number }) {
  const isTop3 = rank <= 3;
  const isTop1 = rank === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`relative group ${isTop1 ? "col-span-full" : ""}`}
    >
      {/* Glow effect for top 3 */}
      {isTop3 && (
        <div
          className={`absolute inset-0 rounded-2xl blur-xl -z-10 ${
            rank === 1
              ? "bg-gradient-to-r from-yellow-400/20 via-amber-400/20 to-orange-400/20"
              : rank === 2
              ? "bg-gradient-to-r from-gray-300/15 via-slate-300/15 to-zinc-300/15"
              : "bg-gradient-to-r from-amber-500/15 via-yellow-500/15 to-amber-600/15"
          }`}
        />
      )}

      <Link href={`/profiles/${user.id}`}
        className={`block rounded-2xl overflow-hidden transition-all duration-300 ${
          isTop3
            ? "glass border-2"
            : "glass border border-white/10 hover:border-cyan-500/30"
        } ${
          rank === 1
            ? "border-yellow-400/40"
            : rank === 2
            ? "border-gray-300/30"
            : rank === 3
            ? "border-amber-500/30"
            : ""
        }`}
      >
        {/* Special top 1 styling */}
        {isTop1 && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400" />
        )}

        <div className="p-5 relative z-10">
          <div className="flex items-center gap-4">
            {/* Rank Badge */}
            <RankBadge rank={rank} />

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={`font-bold truncate ${isTop3 ? "text-lg" : "text-base"} text-white`}>
                  {user.username || "Anonymous"}
                </h3>
                {isTop3 && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles size={14} className={rank === 1 ? "text-yellow-400" : "text-cyan-400"} />
                  </motion.div>
                )}
              </div>

              <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                    : "N/A"}
                </span>
                {user.succesfullExchnage !== undefined && (
                  <span className="flex items-center gap-1">
                    <Flame size={12} className="text-orange-400" />
                    {user.succesfullExchnage} exchanges
                  </span>
                )}
              </div>
            </div>

            {/* Points */}
            <PointsDisplay points={user.points || 0} rank={rank} />

            {/* Arrow */}
            <ChevronRight size={18} className="text-gray-600 group-hover:text-cyan-400 transition-colors" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ================= PODIUM CARD (TOP 3) ================= */

function PodiumCard({ user, rank }: { user: LeaderboardUser; rank: number }) {
  const styles: Record<number, { height: string; border: string; glow: string }> = {
    1: { height: "h-32", border: "border-yellow-400/40", glow: "from-yellow-400/20 via-amber-400/20 to-orange-400/20" },
    2: { height: "h-28", border: "border-gray-300/30", glow: "from-gray-300/15 via-slate-300/15 to-zinc-300/15" },
    3: { height: "h-24", border: "border-amber-500/30", glow: "from-amber-500/15 via-yellow-500/15 to-amber-600/15" },
  };

  const style = styles[rank] || styles[3];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + (rank - 1) * 0.15, type: "spring" }}
      className={`flex-1 ${rank === 1 ? "order-2" : rank === 2 ? "order-1" : "order-3"}`}
    >
      <Link href={`/profile/${user.username || user.id}`} className="block">
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          className={`relative rounded-2xl overflow-hidden glass border-2 ${style.border}`}
        >
          {/* Glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${style.glow} blur-xl -z-10`} />

          {/* Content */}
          <div className="p-6 text-center">
            <RankBadge rank={rank} />

            <motion.h3
              animate={rank === 1 ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-4 text-lg font-bold text-white truncate"
            >
              {user.username || "Anonymous"}
            </motion.h3>

            <div className="mt-3 flex items-center justify-center gap-2">
              <Star size={16} className={rank === 1 ? "text-yellow-400" : "text-cyan-400"} />
              <span className={`font-bold text-xl ${rank === 1 ? "text-yellow-300" : "text-cyan-300"}`}>
                {(user.points || 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Podium base */}
          <div className={`${style.height} bg-gradient-to-t from-white/5 to-transparent flex items-center justify-center`}>
            <span className="text-xs text-gray-500 uppercase tracking-widest">Rank #{rank}</span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ================= LOADING STATE ================= */

function LoadingState() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto rounded-full border-2 border-cyan-500/30 border-t-cyan-400"
        />
        <p className="text-cyan-300 text-sm tracking-widest uppercase">Loading Leaderboard</p>
      </div>
    </div>
  );
}

/* ================= EMPTY STATE ================= */

function EmptyState() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <Trophy size={28} className="text-cyan-400" />
        </div>
        <h2 className="text-xl font-bold text-white">No Rankings Yet</h2>
        <p className="text-gray-500 text-sm max-w-xs">
          Be the first to climb the leaderboard by learning, teaching, and exchanging skills!
        </p>
      </motion.div>
    </div>
  );
}

/* ================= MAIN PAGE ================= */

export default function LeaderboardPage() {
  // const API_URL = "http://localhost:4000";
  const API_URL = "https://skillwrap-backend.onrender.com"

  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch(`${API_URL}/auth/Leaderboard`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setUsers(Array.isArray(data.LeaderBoard) ? data.LeaderBoard : []);
      } catch {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  if (loading) return <LoadingState />;
  if (!users.length) return <EmptyState />;

  // Sort by points
  const sortedUsers = [...users].sort((a, b) => (b.points || 0) - (a.points || 0));

  // Filter by search
  const filteredUsers = sortedUsers.filter((user) =>
    user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const top3 = filteredUsers.slice(0, 3);
  const rest = filteredUsers.slice(3);

  return (
    <div className="min-h-screen bg-navy-950 text-white relative overflow-hidden">
      {/* Background */}
      <GridOverlay />
      <GlowOrb className="w-[600px] h-[600px] bg-cyan-500/10 -top-40 -left-40" delay={0} />
      <GlowOrb className="w-[500px] h-[500px] bg-purple-500/10 top-1/3 -right-20" delay={3} />
      <GlowOrb className="w-[400px] h-[400px] bg-yellow-500/8 -bottom-20 left-1/4" delay={6} />

      <div className="relative z-10 px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-3"
          >
            <div className="flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy size={32} className="text-yellow-400" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-300 via-yellow-300 to-purple-300 bg-clip-text text-transparent">
                Leaderboard
              </h1>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy size={32} className="text-yellow-400" />
              </motion.div>
            </div>
            <p className="text-gray-400 text-sm">
              Top performers ranked by skill exchange activity
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-md mx-auto"
          >
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-12 pr-4 rounded-xl glass-input focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition text-white placeholder-gray-500"
            />
          </motion.div>

          {/* Podium (Top 3) */}
          {top3.length > 0 && (
            <div className="flex items-end gap-4 mt-8">
              {top3.map((user, idx) => (
                <PodiumCard key={user.id} user={user} rank={idx + 1} />
              ))}
            </div>
          )}

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <TrendingUp size={20} className="text-cyan-400" />
              <div>
                <p className="text-sm font-medium text-white">{filteredUsers.length} Players</p>
                <p className="text-xs text-gray-500">Active on leaderboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Flame size={14} className="text-orange-400" />
              Updated live
            </div>
          </motion.div>

          {/* Rest of leaderboard */}
          {rest.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <User size={14} className="text-cyan-400" />
                All Rankings
              </h2>
              <div className="space-y-3">
                {rest.map((user, index) => (
                  <UserCard key={user.id} user={user} rank={index + 4} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {filteredUsers.length === 0 && searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500">No users found matching "{searchQuery}"</p>
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-input rounded-xl p-6 text-center space-y-2"
          >
            <Sparkles size={18} className="text-cyan-400 mx-auto" />
            <p className="text-gray-300 text-sm">
              Keep learning, teaching, and exchanging skills to climb higher!
            </p>
            <p className="text-gray-500 text-xs">
              Invite friends with your referral code to earn bonus points
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

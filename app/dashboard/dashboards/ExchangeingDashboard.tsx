// dashboards/ExchangeDashboard.tsx
import { Inbox, Send, Layers, Trophy, Sparkles, Plus } from "lucide-react";
import StatCard from "../components/statsCard";
import FeatureCard from "../components/featureCard";
import ModeHeader from "../components/ModeHeader";
import Image from "next/image";
import Link from "next/link";

export default function ExchangeDashboard({ stats, user }: any) {
  return (
    <>
      <ModeHeader
        title="Exchange Mode"
        subtitle="Teach what you know, learn what you need — skill for skill."
        accent="blue"
      />

      {/* PROFILE OVERVIEW */}
      <div className="mb-10 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col sm:flex-row items-center gap-6">
        <Image
          src={user?.img_url || "/avatar.png"}
          alt="Profile"
          width={80}
          height={80}
          unoptimized
          className="rounded-full border-2 border-blue-400/40"
        />

        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-white">{user?.username}</h2>
          <p className="text-sm text-gray-300">{user?.email}</p>
          <p className="text-xs text-gray-400">
            Joined {new Date(user?.created_at || Date.now()).toDateString()}
          </p>

          {/* My Points */}
          <div className="mt-2 flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-white/20 text-yellow-400 font-semibold shadow-md backdrop-blur-md">
            <span className="text-sm">⭐ Points:</span>
            <span className="text-lg font-bold">{user?.points ?? 0}</span>
          </div>
        </div>

        <Link
          href="/create-skill"
          className="flex items-center gap-2 px-5 py-3 rounded-xl
          bg-gradient-to-r from-blue-500 to-cyan-500
          hover:scale-105 transition font-medium text-white shadow-lg"
        >
          <Plus size={18} /> Create Skill
        </Link>
      </div>

      {/* QUICK INSIGHT */}
      <div className="mb-8 p-5 rounded-2xl bg-blue-500/10 border border-blue-400/20 text-blue-100 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-blue-400" />
          <h3 className="font-semibold text-lg">Balanced growth</h3>
        </div>
        <p className="text-sm text-blue-200/80">
          Exchange mode lets you grow faster by trading real value — skills for skills.
        </p>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Requests Received"
          value={stats.receivedRequests}
          icon={<Inbox className="text-blue-400" />}
        />
        <StatCard
          title="Requests Sent"
          value={stats.sendRequests}
          icon={<Send className="text-green-400" />}
        />
        <StatCard
          title="Skills Created"
          value={stats.createdSkills}
          icon={<Layers className="text-purple-400" />}
        />
        <StatCard
          title="Successful Exchanges"
          value={stats.succesfullExchnage}
          icon={<Trophy className="text-yellow-400" />}
        />
      </div>

              {/* ================= REFERRAL SECTION ================= */}
<div className="max-w-md mx-auto mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-900/40 to-blue-800/30 backdrop-blur-xl border border-blue-500/20 shadow-lg">
  <h3 className="text-lg font-bold text-blue-300 mb-3 text-center">
    🎁 Invite Friends & Earn Points
  </h3>
  <p className="text-center text-white/70 text-sm mb-4">
    Share your referral link and earn rewards when someone signs up!
  </p>

  <div className="flex items-center gap-2">
    <input
      type="text"
      readOnly
      value={`https://skillwrap2026.vercel.app/signup?ref=${user.referral_code}`}
      className="flex-1 p-3 rounded-xl bg-blue-900/40 border border-blue-500/30 text-white focus:outline-none placeholder-white/50"
    />
    <button
      onClick={() => {
        navigator.clipboard.writeText(
          `https://skillwrap.vercel2026.app/signup?ref=${user.referral_code}`
        );
        alert("Referral link copied!");
      }}
      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white font-semibold transition"
    >
      Copy
    </button>
  </div>
</div>

      {/* ACTIONS */}
      <h2 className="text-xl font-semibold text-white mb-4">Exchange actions</h2>
      <p className="text-sm text-gray-400 mb-6 max-w-xl">
        Manage your active exchanges, review requests, and track skills shared with others.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Layers />}
          title="My Skills"
          desc="Maintain the skills you’re offering for exchange."
          href="/my-skill"
        />
        <FeatureCard
          icon={<Inbox />}
          title="Received Requests"
          desc="Respond to incoming exchange requests."
          href="/request-recieved"
        />
        <FeatureCard
          icon={<Send />}
          title="Sent Requests"
          desc="Track exchanges you’ve initiated."
          href="/request-sent"
        />
      </div>
    </>
  );
}
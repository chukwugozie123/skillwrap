// dashboards/LearningDashboard.tsx
import { Send, BookOpen, Search, Sparkles } from "lucide-react";
import StatCard from "../components/statsCard";
import FeatureCard from "../components/featureCard";
import ModeHeader from "../components/ModeHeader";
import Image from "next/image";

export default function LearningDashboard({ stats, user }: any) {
  return (
    <>
      <ModeHeader
        title="Learning Mode"
        subtitle="Discover new skills, connect with mentors, and track your learning journey."
        accent="cyan"
      />

      {/* PROFILE OVERVIEW */}
      <div className="mb-10 p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-6">
        <Image
          src={user?.img_url || "/avatar.png"}
          alt="Profile"
          width={80}
          height={70}
            unoptimized
          className="rounded-full border border-cyan-400/40"
        />

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white">
            {user?.username}
          </h2>
          <p className="text-sm text-gray-300">{user?.email}</p>
          <p className="text-xs text-gray-400 mt-1">
            Joined {new Date(user?.created_at || Date.now()).toDateString()}
          </p>

                    {/* My Points */}
          <div className="mt-2 flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-white/20 text-yellow-400 font-semibold shadow-md backdrop-blur-md">
            <span className="text-sm">⭐ Points:</span>
            <span className="text-lg font-bold">{user?.points ?? 0}</span>
          </div>
        </div>
      </div>

      {/* QUICK INSIGHT */}
      <div className="mb-8 p-5 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-100">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-cyan-400" />
          <h3 className="font-semibold text-lg">Your learning journey</h3>
        </div>
        <p className="text-sm text-cyan-200/80">
          Learning mode helps you grow by connecting you with people who are
          ready to teach. The more you learn, the stronger your profile becomes.
        </p>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        <StatCard
          title="Requests Sent"
          value={stats.sendRequests}
          icon={<Send />}
        />
        <StatCard
          title="Lessons Completed"
          value={stats.succesfullExchnage}
          icon={<BookOpen />}
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
      value={`https://skillwrap.vercel.app/signup?ref=${user.referral_code}`}
      className="flex-1 p-3 rounded-xl bg-blue-900/40 border border-blue-500/30 text-white focus:outline-none placeholder-white/50"
    />
    <button
      onClick={() => {
        navigator.clipboard.writeText(
          `https://skillwrap.vercel.app/signup?ref=${user.referral_code}`
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
      <h2 className="text-xl font-semibold text-white mb-2">
        What would you like to do next?
      </h2>

      <p className="text-sm text-gray-400 mb-6 max-w-xl">
        Explore skills shared by experts, send learning requests, and keep track
        of the lessons you complete along the way.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <FeatureCard
          icon={<Search />}
          title="Explore New Skills"
          desc="Browse skills shared by others and find something exciting to learn today."
          href="/skills"
        />
        <FeatureCard
          icon={<Send />}
          title="My Learning Requests"
          desc="Monitor requests you’ve sent and track their progress."
          href="/request-sent"
        />
      </div>
    </>
  );
}

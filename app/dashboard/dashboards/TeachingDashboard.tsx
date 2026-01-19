// dashboards/TeachingDashboard.tsx
import { Layers, Inbox, Trophy, Sparkles, Plus } from "lucide-react";
import StatCard from "../components/statsCard";
import FeatureCard from "../components/featureCard";
import ModeHeader from "../components/ModeHeader";
import Image from "next/image";
import Link from "next/link";

export default function TeachingDashboard({ stats, user }: any) {
  return (
    <>
      <ModeHeader
        title="Teaching Mode"
        subtitle="Share your expertise, mentor learners, and make an impact."
        accent="purple"
      />

      {/* PROFILE OVERVIEW */}
      <div className="mb-10 p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-6">
        <Image
          src={user?.image_url || "/avatar.png"}
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full border border-purple-400/40"
        />

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white">
            {user?.username || "Instructor"}
          </h2>
          <p className="text-sm text-gray-300">{user?.email}</p>
          <p className="text-xs text-gray-400 mt-1">
            Joined {new Date(user?.created_at || Date.now()).toDateString()}
          </p>
        </div>

        <Link
          href="/create-skill"
          className="flex items-center gap-2 px-5 py-3 rounded-xl
          bg-gradient-to-r from-purple-500 to-fuchsia-500
          hover:scale-105 transition font-medium"
        >
          <Plus size={18} /> Create Skill
        </Link>
      </div>

      {/* QUICK INSIGHT */}
      <div className="mb-8 p-5 rounded-2xl bg-purple-500/10 border border-purple-400/20 text-purple-100">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-purple-400" />
          <h3 className="font-semibold text-lg">Teaching impact</h3>
        </div>
        <p className="text-sm text-purple-200/80">
          Every lesson you teach builds trust, visibility, and long-term
          credibility on Skillwrap.
        </p>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard
          title="Skills Created"
          value={stats.createdSkills}
          icon={<Layers />}
        />
        <StatCard
          title="Requests Received"
          value={stats.receivedRequests}
          icon={<Inbox />}
        />
        <StatCard
          title="Successful Teachings"
          value={stats.succesfullExchnage}
          icon={<Trophy />}
        />
      </div>

      {/* ACTIONS */}
      <h2 className="text-xl font-semibold text-white mb-4">
        Manage your teaching activities
      </h2>

      <p className="text-sm text-gray-400 mb-6 max-w-xl">
        Keep your skills updated, respond to learners, and grow your reputation
        as a trusted mentor.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <FeatureCard
          icon={<Layers />}
          title="Manage Your Skills"
          desc="Create, update, and refine the skills you offer to learners."
          href="/my-skill"
        />
        <FeatureCard
          icon={<Inbox />}
          title="Student Requests"
          desc="Review, accept, or decline learning requests from students."
          href="/request-recieved"
        />
      </div>
    </>
  );
}

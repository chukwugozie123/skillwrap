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
      <div className="mb-10 p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-6">
        <Image
          src={user?.image_url || "/avatar.png"}
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full border border-blue-400/40"
        />

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white">
            {user?.username || "Skill Exchanger"}
          </h2>
          <p className="text-sm text-gray-300">{user?.email}</p>
          <p className="text-xs text-gray-400 mt-1">
            Joined {new Date(user?.created_at || Date.now()).toDateString()}
          </p>
        </div>

        <Link
          href="/create-skill"
          className="flex items-center gap-2 px-5 py-3 rounded-xl
          bg-gradient-to-r from-blue-500 to-cyan-500
          hover:scale-105 transition font-medium"
        >
          <Plus size={18} /> Create Skill
        </Link>
      </div>

      {/* QUICK INSIGHT */}
      <div className="mb-8 p-5 rounded-2xl bg-blue-500/10 border border-blue-400/20 text-blue-100">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-blue-400" />
          <h3 className="font-semibold text-lg">Balanced growth</h3>
        </div>
        <p className="text-sm text-blue-200/80">
          Exchange mode lets you grow faster by trading real value — skills for
          skills.
        </p>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Requests Received"
          value={stats.receivedRequests}
          icon={<Inbox />}
        />
        <StatCard
          title="Requests Sent"
          value={stats.sendRequests}
          icon={<Send />}
        />
        <StatCard
          title="Skills Created"
          value={stats.createdSkills}
          icon={<Layers />}
        />
        <StatCard
          title="Successful Exchanges"
          value={stats.succesfullExchnage}
          icon={<Trophy />}
        />
      </div>

      {/* ACTIONS */}
      <h2 className="text-xl font-semibold text-white mb-4">
        Exchange actions
      </h2>

      <p className="text-sm text-gray-400 mb-6 max-w-xl">
        Manage your active exchanges, review requests, and track skills shared
        with others.
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

// dashboards/TeachingDashboard.tsx
import { Layers, Inbox, Trophy, Sparkles } from "lucide-react";
import StatCard from "../components/statsCard";
import FeatureCard from "../components/featureCard";
import ModeHeader from "../components/ModeHeader";

export default function TeachingDashboard({ stats }: any) {
  return (
    <>
      <ModeHeader
        title="Teaching Mode"
        subtitle="Share your expertise, mentor learners, and make an impact."
        accent="purple"
      />

      {/* QUICK INSIGHT */}
      <div className="mb-8 p-5 rounded-2xl bg-purple-500/10 border border-purple-400/20 text-purple-100">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-purple-400" />
          <h3 className="font-semibold text-lg">Teaching impact</h3>
        </div>
        <p className="text-sm text-purple-200/80">
          The more you teach, the stronger your profile becomes on Skillwrap.
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

// dashboards/LearningDashboard.tsx
import { Send, BookOpen, Search, Sparkles } from "lucide-react";
import StatCard from "../components/statsCard";
import FeatureCard from "../components/featureCard";
import ModeHeader from "../components/ModeHeader";

export default function LearningDashboard({ stats }: any) {
  return (
    <>
      <ModeHeader
        title="Learning Mode"
        subtitle="Discover new skills, connect with mentors, and track your learning journey."
        accent="cyan"
      />

      {/* QUICK INSIGHT */}
      <div className="mb-8 p-5 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-100">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-cyan-400" />
          <h3 className="font-semibold text-lg">Your learning progress</h3>
        </div>
        <p className="text-sm text-cyan-200/80">
          Keep exploring skills and sending requests to grow consistently.
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

      {/* ACTIONS */}
      <h2 className="text-xl font-semibold text-white mb-4">
        What would you like to do next?
      </h2>

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

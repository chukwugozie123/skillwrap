// dashboards/LearningDashboard.tsx
import { Send, BookOpen, Search } from "lucide-react";
import StatCard from "../components/statsCard";
import FeatureCard from "../components/featureCard";
import ModeHeader from "../components/ModeHeader";

export default function LearningDashboard({ stats }: any) {
  return (
    <>
      <ModeHeader
        title="Learning Mode"
        subtitle="Focus on discovering and learning new skills from others."
        accent="cyan"
      />

      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <StatCard title="Requests Sent" value={stats.sendRequests} icon={<Send />} />
        <StatCard title="Lessons Completed" value={stats.succesfullExchnage} icon={<BookOpen />} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <FeatureCard
          icon={<Search />}
          title="Explore Skills"
          desc="Browse available skills and request to learn."
          href="/skills"
        />
        <FeatureCard
          icon={<Send />}
          title="My Requests"
          desc="Track learning requests you've sent."
          href="/request-sent"
        />
      </div>
    </>
  );
}

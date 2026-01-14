// dashboards/TeachingDashboard.tsx
import { Layers, Inbox, Trophy } from "lucide-react";
import StatCard from "../components/statsCard";
import FeatureCard from "../components/featureCard";
import ModeHeader from "../components/ModeHeader";

export default function TeachingDashboard({ stats }: any) {
  return (
    <>
      <ModeHeader
        title="Teaching Mode"
        subtitle="Share your knowledge and help others grow."
        accent="purple"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard title="Skills Created" value={stats.createdSkills} icon={<Layers />} />
        <StatCard title="Requests Received" value={stats.receivedRequests} icon={<Inbox />} />
        <StatCard title="Successful Teachings" value={stats.succesfullExchnage} icon={<Trophy />} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <FeatureCard
          icon={<Layers />}
          title="Manage Skills"
          desc="Edit and improve the skills you offer."
          href="/my-skill"
        />
        <FeatureCard
          icon={<Inbox />}
          title="Student Requests"
          desc="Accept or decline incoming requests."
          href="/request-recieved"
        />
      </div>
    </>
  );
}

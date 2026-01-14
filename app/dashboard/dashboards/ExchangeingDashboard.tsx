// dashboards/ExchangeDashboard.tsx
import { Inbox, Send, Layers, Trophy } from "lucide-react";
import StatCard from "../components/statsCard";
import FeatureCard from "../components/featureCard";
import ModeHeader from "../components/ModeHeader";

export default function ExchangeDashboard({ stats }: any) {
  return (
    <>
      <ModeHeader
        title="Exchange Mode"
        subtitle="Learn and teach through skill exchange."
        accent="blue"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard title="Requests Received" value={stats.receivedRequests} icon={<Inbox />} />
        <StatCard title="Requests Sent" value={stats.sendRequests} icon={<Send />} />
        <StatCard title="Skills Created" value={stats.createdSkills} icon={<Layers />} />
        <StatCard title="Successful Exchanges" value={stats.succesfullExchnage} icon={<Trophy />} />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard title="My Skills" desc="Manage your skills." href="/my-skill" />
        <FeatureCard title="Received Requests" desc="Review incoming requests." href="/request-recieved" />
        <FeatureCard title="Sent Requests" desc="Track sent requests." href="/request-sent" />
      </div>
    </>
  );
}

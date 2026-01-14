// dashboards/ExchangeDashboard.tsx
import { Inbox, Send, Layers, Trophy, Sparkles } from "lucide-react";
import StatCard from "../components/statsCard";
import FeatureCard from "../components/featureCard";
import ModeHeader from "../components/ModeHeader";

export default function ExchangeDashboard({ stats }: any) {
  return (
    <>
      <ModeHeader
        title="Exchange Mode"
        subtitle="Teach what you know, learn what you need — skill for skill."
        accent="blue"
      />

      {/* QUICK INSIGHT */}
      <div className="mb-8 p-5 rounded-2xl bg-blue-500/10 border border-blue-400/20 text-blue-100">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-blue-400" />
          <h3 className="font-semibold text-lg">Balanced growth</h3>
        </div>
        <p className="text-sm text-blue-200/80">
          Exchange mode helps you grow faster by learning and teaching together.
        </p>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          title="My Skills"
          desc="Maintain the skills you’re offering for exchange."
          href="/my-skill"
        />
        <FeatureCard
          title="Received Requests"
          desc="Respond to incoming exchange requests."
          href="/request-recieved"
        />
        <FeatureCard
          title="Sent Requests"
          desc="Track exchanges you’ve initiated."
          href="/request-sent"
        />
      </div>
    </>
  );
}

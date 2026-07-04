"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  CheckCircle2,
  AlertTriangle,
  Trophy,
  Clock3,
  Code2,
  Sparkles,
  Users,
  Star,
} from "lucide-react";

/* ================= TYPES ================= */

type JudgingCriteria = {
  title: string;
  score: string;
};

type Deliverable = {
  icon: React.ReactNode;
  title: string;
};

type EventType = {
  banner_url: string;
  title: string;
  participants: number;
  deadline: string;
  difficulty: string;
  requirements: string[];
  technologies: string[];
  judging_criteria: JudgingCriteria[];
  deliverables: Deliverable[];
  rewards: string[];
};

// const API_URL = "http://localhost:4000";
  const API_URL = "https://skillwrap-backend.onrender.com";

export default function EventRequirementsPage() {
  const params = useParams();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(
          `${API_URL}/events/requirements/${params.id}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        setEvent(data.result);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    if (params?.id) fetchEvent();
  }, [params?.id]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading Event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        Event not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-[350px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* ================= HERO ================= */}
      <section className="relative h-[420px] overflow-hidden">
        <img
          src={event.banner_url}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/70 to-black/30" />

        <div className="absolute bottom-10 left-6 md:left-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 backdrop-blur-xl mb-5"
          >
            <Sparkles size={15} className="text-cyan-300" />
            <span className="text-cyan-200 text-sm">Event Requirements</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black leading-tight"
          >
            {event.title}
          </motion.h1>

          <div className="flex flex-wrap gap-5 mt-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-cyan-400" />
              {event.participants} participants
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={16} className="text-purple-400" />
              {event.deadline}
            </div>

            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-400" />
              {event.difficulty}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="relative px-6 md:px-16 py-16">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          {/* LEFT */}
          <div className="space-y-8">
            {/* REQUIREMENTS */}
            <motion.div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Requirements</h2>

              <div className="space-y-4">
                {event.requirements?.map((item: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5"
                  >
                    <CheckCircle2 className="text-emerald-400 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* TECHNOLOGIES */}
            <motion.div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                Suggested Technologies
              </h2>

              <div className="flex flex-wrap gap-3">
                {event.technologies?.map((tech: string, i: number) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* JUDGING */}
            <motion.div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Judging Criteria</h2>

              <div className="space-y-4">
                {event.judging_criteria?.map(
                  (item: JudgingCriteria, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5"
                    >
                      <span>{item.title}</span>
                      <span className="text-cyan-300 font-semibold">
                        {item.score}
                      </span>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* DELIVERABLES */}
            <motion.div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6">
              <h3 className="text-xl font-bold mb-5">
                Required Deliverables
              </h3>

              <div className="space-y-4">
                {event.deliverables?.map(
                  (item: Deliverable, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-black/20 border border-white/5"
                    >
                      <div className="text-cyan-300">{item.icon}</div>
                      <span className="text-gray-300">{item.title}</span>
                    </div>
                  )
                )}
              </div>
            </motion.div>

            {/* WARNINGS */}
            <motion.div className="rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-red-400" />
                <h3 className="text-xl font-bold">Important Rules</h3>
              </div>

              <div className="space-y-2 text-sm text-gray-300">
                <p>• No copied projects allowed</p>
                <p>• AI-generated spam prohibited</p>
                <p>• Late submissions may be rejected</p>
                <p>• Must follow community guidelines</p>
              </div>
            </motion.div>

            {/* REWARDS */}
            <motion.div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-2xl p-6">
              <h3 className="text-xl font-bold mb-5">Rewards</h3>

              <div className="space-y-3">
                {event.rewards?.map((reward: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-400" />
                    <span>{reward}</span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold">
                Start Building
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
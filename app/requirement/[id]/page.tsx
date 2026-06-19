"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  CheckCircle2,
  AlertTriangle,
  Trophy,
  Clock3,
  FileText,
  Github,
  Globe,
  Code2,
  Sparkles,
  Users,
  Star,
} from "lucide-react";

const API_URL = "http://localhost:4000";

export default function EventRequirementsPage() {
  /* ================= DEMO DATA ================= */

    const params = useParams();

  const [event, setEvent] = useState<any>(null);
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
  
      fetchEvent();
    }, [params.id]);
  

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
      {/* ================= BACKGROUND GLOWS ================= */}

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

            <span className="text-cyan-200 text-sm">
              Event Requirements
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black leading-tight"
          >
            {event.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-300 text-lg"
          >
            Read all project requirements carefully before submitting your
            challenge.
          </motion.p>

          {/* STATS */}

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

      {/* ================= MAIN CONTENT ================= */}

      <section className="relative px-6 md:px-16 py-16">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10">
          {/* ================= LEFT ================= */}

          <div className="space-y-8">
            {/* REQUIREMENTS */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                  <CheckCircle2 className="text-cyan-300" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Requirements
                  </h2>

                  <p className="text-gray-400 text-sm">
                    What participants must complete
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {event.requirements.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5"
                  >
                    <CheckCircle2 className="text-emerald-400 mt-0.5" />

                    <span className="text-gray-300">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* TECHNOLOGIES */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <Code2 className="text-purple-300" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Suggested Technologies
                  </h2>

                  <p className="text-gray-400 text-sm">
                    Recommended stack for this challenge
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {event.technologies.map((tech, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* JUDGING */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
                  <Trophy className="text-yellow-300" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Judging Criteria
                  </h2>

                  <p className="text-gray-400 text-sm">
                    How projects will be scored
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {event.judging_criteria.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5"
                  >
                    <span>{item.title}</span>

                    <span className="text-cyan-300 font-semibold">
                      {item.score}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT ================= */}

          <div className="space-y-6">
            {/* DELIVERABLES */}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-5">
                Required Deliverables
              </h3>

              <div className="space-y-4">
                {event.deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-black/20 border border-white/5"
                  >
                    <div className="text-cyan-300">
                      {item.icon}
                    </div>

                    <span className="text-gray-300">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* WARNINGS */}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-red-400" />

                <h3 className="text-xl font-bold">
                  Important Rules
                </h3>
              </div>

              <div className="space-y-3 text-sm text-gray-300">
                <p>• No copied projects allowed</p>

                <p>• AI-generated spam submissions prohibited</p>

                <p>• Late submissions may be rejected</p>

                <p>• Must follow community guidelines</p>
              </div>
            </motion.div>

            {/* REWARDS */}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-2xl p-6"
            >
              <h3 className="text-xl font-bold mb-5">
                Rewards
              </h3>

              <div className="space-y-4">
                {event.rewards.map((reward, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="text-emerald-400" />

                    <span>{reward}</span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold hover:scale-[1.02] transition-all">
                Start Building
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}



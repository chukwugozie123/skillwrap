"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  CalendarDays,
  Clock3,
  ImageIcon,
  Layers3,
  Plus,
  Trash2,
  Wand2,
  Brain,
  Zap,
  Globe,
  Trophy,
} from "lucide-react";

const API_URL = "http://localhost:4000";

export default function HostEventPage() {
  const router = useRouter();

  
    
      /* ================= AUTH CHECK ================= */
      useEffect(() => {
        async function checkAuth() {
          try {
            const res = await fetch(`${API_URL}/auth/profile`, {
              credentials: "include",
            });
            if (!res.ok) router.push("/login");
    
            const data = await res.json();
            // setMyMode(data.user.mode);
            console.log(data.user.mode, " ss");
          } catch {
            router.push("/login");
          }
        }
        checkAuth();
      }, [router]);

  const [modules, setModules] = useState([
    {
      title: "",
      content: "",
    },
  ]);

  const addModule = () => {
    setModules([
      ...modules,
      {
        title: "",
        content: "",
      },
    ]);
  };

  const removeModule = (index) => {
    const updated = [...modules];
    updated.splice(index, 1);
    setModules(updated);
  };

  const updateModule = (index, field, value) => {
    const updated = [...modules];
    updated[index][field] = value;
    setModules(updated);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full" />

        <div className="absolute top-1/3 left-1/2 w-[350px] h-[350px] bg-pink-500/10 blur-[120px] rounded-full" />
      </div>

      {/* ================= HERO ================= */}

      <section className="relative max-w-7xl mx-auto px-6 pt-28 pb-14">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-sm mb-6">
            <Sparkles size={15} />
            Host a Premium SkillWrap Event
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
            Create
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {" "}
              Amazing Events
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-gray-400 text-lg">
            Launch immersive workshops, coding challenges, hackathons,
            masterclasses and premium experiences for your community.
          </p>

          {/* STATS */}

          <div className="flex flex-wrap justify-center gap-4 mt-10">

            <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              🔥 10k+ attendees
            </div>

            <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              ⚡ Live challenges
            </div>

            <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
              🏆 XP rewards system
            </div>

          </div>

        </motion.div>
      </section>

      {/* ================= FORM ================= */}

      <section className="relative max-w-6xl mx-auto px-6 pb-24">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(59,130,246,0.15)]"
        >

          {/* glow */}

          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />

          <div className="relative p-8 md:p-12">

            {/* HEADER */}

            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                <Wand2 />
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  Event Details
                </h2>

                <p className="text-gray-400 mt-1">
                  Fill in the information below to create your experience.
                </p>
              </div>
            </div>

            {/* GRID */}

            <div className="grid md:grid-cols-2 gap-6">

              {/* TITLE */}

              <InputBox
                icon={<Sparkles />}
                label="Event Title"
                placeholder="Build AI Apps in 48 Hours"
              />

              {/* CATEGORY */}

              <SelectBox
                icon={<Brain />}
                label="Category"
                options={[
                  "AI",
                  "Web Development",
                  "Design",
                  "Music",
                  "Business",
                  "Fitness",
                ]}
              />

              {/* TYPE */}

              <SelectBox
                icon={<Zap />}
                label="Event Type"
                options={[
                  "Workshop",
                  "Hackathon",
                  "Challenge",
                  "Bootcamp",
                  "Masterclass",
                ]}
              />

              {/* BANNER */}

              <InputBox
                icon={<ImageIcon />}
                label="Banner URL"
                placeholder="https://..."
              />

              {/* START */}

              <InputBox
                icon={<CalendarDays />}
                label="Start Time"
                type="datetime-local"
              />

              {/* END */}

              <InputBox
                icon={<Clock3 />}
                label="End Time"
                type="datetime-local"
              />

            </div>

            {/* DESCRIPTION */}

            <div className="mt-8">
              <label className="text-sm text-gray-300 mb-3 block">
                Event Description
              </label>

              <textarea
                rows={6}
                placeholder="Describe your event..."
                className="
                  w-full rounded-2xl
                  border border-white/10
                  bg-white/5
                  px-5 py-4
                  outline-none
                  focus:border-cyan-400/40
                  focus:ring-2 focus:ring-cyan-500/20
                  transition
                  text-white
                  placeholder:text-gray-500
                "
              />
            </div>

            {/* MODULES */}

            <div className="mt-14">

              <div className="flex items-center justify-between mb-6">

                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Layers3 className="text-cyan-400" />
                    Event Modules
                  </h3>

                  <p className="text-gray-400 mt-1">
                    Add tasks, lessons, snippets, resources and instructions.
                  </p>
                </div>

                <button
                  onClick={addModule}
                  className="
                    flex items-center gap-2
                    px-5 py-3 rounded-2xl
                    bg-gradient-to-r from-cyan-500 to-purple-500
                    hover:scale-105
                    transition
                    shadow-[0_0_25px_rgba(34,211,238,0.35)]
                  "
                >
                  <Plus size={18} />
                  Add Module
                </button>

              </div>

              <div className="space-y-5">

                {modules.map((module, index) => (

                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
                      p-6 rounded-3xl
                      border border-white/10
                      bg-white/5
                      backdrop-blur-xl
                      relative overflow-hidden
                    "
                  >

                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none" />

                    <div className="relative">

                      <div className="flex justify-between items-center mb-5">

                        <h4 className="font-semibold text-lg">
                          Module #{index + 1}
                        </h4>

                        {modules.length > 1 && (
                          <button
                            onClick={() => removeModule(index)}
                            className="
                              p-2 rounded-xl
                              bg-red-500/10
                              hover:bg-red-500/20
                              text-red-400
                              transition
                            "
                          >
                            <Trash2 size={18} />
                          </button>
                        )}

                      </div>

                      <div className="space-y-4">

                        <input
                          type="text"
                          placeholder="Module title"
                          value={module.title}
                          onChange={(e) =>
                            updateModule(index, "title", e.target.value)
                          }
                          className="
                            w-full rounded-2xl
                            border border-white/10
                            bg-black/20
                            px-5 py-3
                            outline-none
                            focus:border-cyan-400/40
                          "
                        />

                        <textarea
                          rows={4}
                          placeholder="Module content..."
                          value={module.content}
                          onChange={(e) =>
                            updateModule(index, "content", e.target.value)
                          }
                          className="
                            w-full rounded-2xl
                            border border-white/10
                            bg-black/20
                            px-5 py-4
                            outline-none
                            focus:border-cyan-400/40
                          "
                        />

                      </div>

                    </div>

                  </motion.div>

                ))}

              </div>

            </div>

            {/* FEATURES */}

            <div className="grid md:grid-cols-3 gap-5 mt-14">

              <FeatureCard
                icon={<Globe />}
                title="Global Access"
                text="Host worldwide virtual experiences."
              />

              <FeatureCard
                icon={<Trophy />}
                title="Rewards & XP"
                text="Reward users after challenges."
              />

              <FeatureCard
                icon={<Brain />}
                title="Interactive Learning"
                text="Tasks, snippets, resources & projects."
              />

            </div>

            {/* SUBMIT */}

            <div className="mt-16 text-center">

              <button
                className="
                  relative overflow-hidden
                  px-10 py-5 rounded-2xl
                  text-lg font-bold
                  bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500
                  hover:scale-105
                  transition-all duration-300
                  shadow-[0_0_40px_rgba(34,211,238,0.4)]
                "
              >

                <span className="relative z-10">
                  🚀 Create Event
                </span>

              </button>

            </div>

          </div>

        </motion.div>

      </section>
    </div>
  );
}

/* ================= INPUT ================= */

function InputBox({
  label,
  placeholder,
  icon,
  type = "text",
}) {
  return (
    <div>
      <label className="text-sm text-gray-300 mb-3 flex items-center gap-2">
        <span className="text-cyan-400">
          {icon}
        </span>
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full rounded-2xl
          border border-white/10
          bg-white/5
          px-5 py-4
          outline-none
          focus:border-cyan-400/40
          focus:ring-2 focus:ring-cyan-500/20
          transition
          text-white
          placeholder:text-gray-500
        "
      />
    </div>
  );
}

/* ================= SELECT ================= */

function SelectBox({
  label,
  options,
  icon,
}) {
  return (
    <div>
      <label className="text-sm text-gray-300 mb-3 flex items-center gap-2">
        <span className="text-cyan-400">
          {icon}
        </span>
        {label}
      </label>

      <select
        className="
          w-full rounded-2xl
          border border-white/10
          bg-white/5
          px-5 py-4
          outline-none
          focus:border-cyan-400/40
          focus:ring-2 focus:ring-cyan-500/20
          transition
          text-white
        "
      >
        <option value="">Select option</option>

        {options.map((option, i) => (
          <option
            key={i}
            value={option}
            className="bg-slate-900"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ================= FEATURE ================= */

function FeatureCard({
  icon,
  title,
  text,
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="
        p-6 rounded-3xl
        bg-white/5
        border border-white/10
        backdrop-blur-xl
      "
    >

      <div className="
        w-14 h-14 rounded-2xl
        flex items-center justify-center
        bg-gradient-to-br from-cyan-500 to-purple-500
        mb-4
      ">
        {icon}
      </div>

      <h4 className="font-semibold text-lg">
        {title}
      </h4>

      <p className="text-gray-400 text-sm mt-2">
        {text}
      </p>

    </motion.div>
  );
}
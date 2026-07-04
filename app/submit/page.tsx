"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Upload,
  Github,
  Globe,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

/* ================= TYPES ================= */

interface ModuleCardProps {
  module: {
    id?: number;
    title: string;
    type: string;
    content: string;
  };

  eventId: number;
}

/* ================= COMPONENT ================= */

export default function EventModuleCard({
  module,
  eventId,
}: ModuleCardProps) {

  if (!module) {
    return null;
  }
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.3,
      }}
      viewport={{ once: true }}
      className="
        relative overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-2xl
        p-6
        group
      "
    >
      {/* GLOW */}

      <div
        className="
          absolute inset-0 opacity-0
          group-hover:opacity-100
          transition duration-500
          bg-gradient-to-br
          from-cyan-500/10
          via-blue-500/5
          to-purple-500/10
        "
      />

      {/* CONTENT */}

      <div className="relative z-10">
        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">
          <div>
            <div
              className="
                inline-flex items-center gap-2
                px-3 py-1 rounded-full
                bg-cyan-500/10
                border border-cyan-400/20
                text-cyan-300 text-xs
                uppercase tracking-wide
              "
            >
              {module.type}
            </div>

            <h3 className="mt-4 text-2xl font-bold text-white">
              {module.title}
            </h3>
          </div>

          <div
            className="
              w-12 h-12 rounded-2xl
              bg-gradient-to-br
              from-cyan-500/20
              to-purple-500/20
              flex items-center justify-center
              border border-white/10
            "
          >
            <CheckCircle2 className="text-cyan-300" />
          </div>
        </div>

        {/* BODY */}

        <p className="mt-5 text-gray-300 leading-relaxed">
          {module.content}
        </p>

        {/* SNIPPET */}

        {module.type === "snippet" && (
          <div
            className="
              mt-6 rounded-2xl
              bg-black/40
              border border-white/10
              p-4 overflow-x-auto
            "
          >
            <code className="text-cyan-300 text-sm whitespace-pre-wrap">
              {module.content}
            </code>
          </div>
        )}

        {/* RESOURCE BUTTON */}

        {module.type === "resource" && (
          <Link
            href={`/events/${eventId}/requirements`}
            className="
              mt-6 inline-flex items-center gap-2
              px-5 py-3 rounded-2xl
              border border-cyan-400/20
              bg-cyan-500/10
              text-cyan-300 font-semibold
              hover:bg-cyan-500/20
              transition-all duration-300
              hover:scale-[1.02]
            "
          >
            View Requirements
            <ArrowRight size={16} />
          </Link>
        )}

        {/* TASK BUTTON */}

        {module.type === "task" && (
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/events/${eventId}/submit-task`}
              className="
                inline-flex items-center gap-2
                px-5 py-3 rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-purple-500
                font-semibold
                hover:scale-[1.03]
                transition-all duration-300
                shadow-[0_0_25px_rgba(34,211,238,0.25)]
              "
            >
              <Upload size={18} />
              Submit Task
            </Link>

            <button
              className="
                inline-flex items-center gap-2
                px-5 py-3 rounded-2xl
                border border-white/10
                bg-white/[0.04]
                hover:bg-white/[0.07]
                transition-all
              "
            >
              <Github size={18} />
              View Example
            </button>
          </div>
        )}

        {/* INTRO */}

        {module.type === "intro" && (
          <div
            className="
              mt-6 flex items-center gap-3
              rounded-2xl
              bg-purple-500/10
              border border-purple-400/20
              p-4
            "
          >
            <Globe className="text-purple-300" />

            <p className="text-sm text-purple-100">
              Collaborate with developers around the world during this event.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
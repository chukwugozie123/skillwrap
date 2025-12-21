"use client";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const progressData = [
  { name: "Week 1", progress: 45 },
  { name: "Week 2", progress: 60 },
  { name: "Week 3", progress: 70 },
  { name: "Week 4", progress: 85 },
];

export default function ProgressPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0b1220] to-[#1e1b4b] text-white p-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-[#020617]/90 via-[#0f172a]/80 to-[#1e3a8a]/60 border border-white/10 backdrop-blur-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-blue-300 mb-6 text-center">
          📊 Your Progress Overview
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "none",
                  borderRadius: "0.75rem",
                  color: "white",
                }}
              />
              <Bar dataKey="progress" fill="url(#gradient)" radius={[10, 10, 0, 0]} />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </main>
  );
}

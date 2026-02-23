"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AttachmentPopupProps {
  onClose: () => void;
  onSubmit: (data: {
    duration: string;
    intensity: string;
    steps: string;
    goal: string;
    rules: string;
  }) => void;
}

export default function AttachmentPopup({ onClose, onSubmit }: AttachmentPopupProps) {
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("Beginner");
  const [steps, setSteps] = useState("");
  const [goal, setGoal] = useState("");
  const [rules, setRules] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onSubmit({ duration, intensity, steps, goal, rules });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gradient-to-tr from-[#0f1b3d]/80 to-[#142f5e]/80 backdrop-blur-lg border border-blue-800/50 rounded-3xl p-6 w-full max-w-lg shadow-xl relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-blue-700/40 transition"
          onClick={onClose}
        >
          <X size={22} className="text-white" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-white text-center tracking-wide">
          Set Session Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Duration */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-1 font-medium">
              Duration of the session
            </label>
            <input
              type="text"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              placeholder="e.g., 60 minutes or 1 hour"
              required
              className="p-3 rounded-xl bg-blue-900/40 border border-blue-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition placeholder-gray-400 text-white"
            />
          </div>

          {/* Skill intensity */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-1 font-medium">Skill intensity / level</label>
            <select
              value={intensity}
              onChange={e => setIntensity(e.target.value)}
              className="p-3 rounded-xl bg-blue-900/40 border border-blue-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition text-white"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* Steps */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-1 font-medium">Number of tasks / steps</label>
            <input
              type="number"
              min={1}
              value={steps}
              onChange={e => setSteps(e.target.value)}
              placeholder="Enter number of steps"
              required
              className="p-3 rounded-xl bg-blue-900/40 border border-blue-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition text-white"
            />
          </div>

          {/* Goals */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-1 font-medium">Goals / objectives (optional)</label>
            <textarea
              value={goal}
              onChange={e => setGoal(e.target.value)}
              placeholder="What’s the main goal of this session?"
              className="p-3 rounded-xl bg-blue-900/40 border border-blue-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none resize-none h-20 transition text-white"
            />
          </div>

          {/* Rules */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-1 font-medium">Session rules / notes (optional)</label>
            <textarea
              value={rules}
              onChange={e => setRules(e.target.value)}
              placeholder="Any rules or notes for this session"
              className="p-3 rounded-xl bg-blue-900/40 border border-blue-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none resize-none h-20 transition text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 py-3 rounded-2xl font-semibold text-black hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Session"}
          </button>
        </form>
      </div>
    </div>
  );
}
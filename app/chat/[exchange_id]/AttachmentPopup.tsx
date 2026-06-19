import { X, Clock, Zap, ListChecks, Target, ScrollText } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface AttachmentPopupProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function AttachmentPopup({ onClose, onSubmit }: AttachmentPopupProps) {
  const [duration, setDuration] = useState(30);
  const [intensity, setIntensity] = useState("moderate");
  const [steps, setSteps] = useState(5);
  const [goal, setGoal] = useState("");
  const [rules, setRules] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;
    onSubmit({ duration, intensity, steps, goal, rules });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="max-w-lg w-full glass-heavy rounded-2xl p-6 space-y-5 shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-neon-cyan transition-colors"
        >
          <X size={22} />
        </button>

        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-neon-cyan neon-text">Session Plan Configuration</h2>
          <p className="text-xs text-gray-400">Design your collaborative skill exchange session</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <Clock size={12} /> Duration (min)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg glass-input text-sm text-white focus:outline-none focus:border-neon-cyan/50 transition-colors"
                min={5}
              />
            </div>
            <div className="space-y-1">
              <label className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <Zap size={12} /> Intensity
              </label>
              <select
                value={intensity}
                onChange={(e) => setIntensity(e.target.value)}
                className="w-full p-2.5 rounded-lg glass-input text-sm text-white focus:outline-none focus:border-neon-cyan/50 transition-colors bg-transparent"
              >
                <option value="light" className="bg-navy-800">Light</option>
                <option value="moderate" className="bg-navy-800">Moderate</option>
                <option value="intense" className="bg-navy-800">Intense</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <ListChecks size={12} /> Steps
            </label>
            <input
              type="number"
              value={steps}
              onChange={(e) => setSteps(Number(e.target.value))}
              className="w-full p-2.5 rounded-lg glass-input text-sm text-white focus:outline-none focus:border-neon-cyan/50 transition-colors"
              min={1}
            />
          </div>

          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <Target size={12} /> Goal
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full p-2.5 rounded-lg glass-input text-sm text-white focus:outline-none focus:border-neon-cyan/50 transition-colors"
              placeholder="What will you achieve?"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
              <ScrollText size={12} /> Rules (optional)
            </label>
            <textarea
              value={rules}
              onChange={(e) => setRules(e.target.value)}
              className="w-full p-2.5 rounded-lg glass-input text-sm text-white focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none"
              rows={2}
              placeholder="Any session rules..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            Initialize Session Plan
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

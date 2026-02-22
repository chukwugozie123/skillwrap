"use client";

import { motion } from "framer-motion";
import { Star, Calendar, Award } from "lucide-react";

export default function RightSiderbar() {
  return (
    <div className="h-full p-6 bg-white/5 backdrop-blur-xl space-y-6">

      {/* Profile */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
        <h3 className="text-lg font-semibold text-cyan-300">Ada Design</h3>
        <p className="text-xs text-gray-400">UI/UX Designer</p>
      </div>

      {/* Stats */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="p-4 rounded-xl bg-white/10 border border-white/10 space-y-3"
      >
        <div className="flex items-center gap-2 text-sm">
          <Star size={16} className="text-yellow-400" />
          4.9 Rating
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Award size={16} className="text-cyan-400" />
          24 Successful Exchanges
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar size={16} className="text-purple-400" />
          Joined 2024
        </div>
      </motion.div>

      {/* Exchange Status */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-sm text-center"
      >
        Exchange Status: <span className="text-green-400 font-semibold">Active</span>
      </motion.div>
    </div>
  );
}

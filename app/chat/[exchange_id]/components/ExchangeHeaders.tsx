'use client';

import { BookOpen, Award, Zap } from 'lucide-react';

export default function ExchangeHeader() {
  return (
    <div className="glass-hover border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Skill Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl glass flex items-center justify-center glow-effect">
              <BookOpen className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">React Hooks Mastery</h1>
            <p className="text-sm text-muted-foreground">Skill Exchange • Level 3</p>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium">+250 XP</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium">Streak: 12 days</span>
          </div>

          {/* Profile Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
            JD
          </div>
        </div>
      </div>
    </div>
  );
}

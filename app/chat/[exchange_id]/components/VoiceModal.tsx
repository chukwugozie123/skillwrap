'use client';

import { X, Mic, Zap } from 'lucide-react';

interface VoiceModalProps {
  onClose: () => void;
}

export default function VoiceModal({ onClose }: VoiceModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-hover max-w-md w-full scale-in relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 p-2 rounded-full bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all duration-300 z-10"
        >
          <X className="w-5 h-5 text-red-400" />
        </button>

        {/* Content */}
        <div className="p-8 text-center space-y-6">
          {/* Animated Microphone Icon */}
          <div className="flex justify-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 animate-pulse" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 animate-pulse animation-delay-100" />
              <div className="absolute inset-0 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 glow-effect">
                <Mic className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-2xl font-bold gradient-text mb-2">Voice Learning</h2>
            <p className="text-sm text-muted-foreground">Coming Soon</p>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <p className="text-foreground/80 leading-relaxed">
              Real-time voice learning is being prepared for SkillWrap. Engage in natural conversations and get instant feedback.
            </p>

            {/* Feature List */}
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3 text-left">
                <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">
                  <span className="font-semibold text-foreground">Natural Conversations</span>
                  {' '}— Speak naturally with the AI tutor
                </span>
              </div>
              <div className="flex items-start gap-3 text-left">
                <Zap className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">
                  <span className="font-semibold text-foreground">Real-time Feedback</span>
                  {' '}— Get instant corrections and suggestions
                </span>
              </div>
              <div className="flex items-start gap-3 text-left">
                <Zap className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">
                  <span className="font-semibold text-foreground">Advanced Analytics</span>
                  {' '}— Track your speaking progress
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg glass-hover border border-white/10 text-foreground hover:bg-white/10 transition-all duration-300 font-medium text-sm"
            >
              Dismiss
            </button>
            <button className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 font-medium text-sm">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

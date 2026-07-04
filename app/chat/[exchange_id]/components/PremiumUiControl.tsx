import { ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * PremiumGlassCard - Reusable glassmorphism card component
 * Pure UI wrapper - no logic changes
 */
export function PremiumGlassCard({
  children,
  className = '',
  animate = true,
  delay = 0,
  shimmer = false,
}: {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
  shimmer?: boolean;
}) {
  if (!animate) {
    return (
      <div
        className={`glass rounded-xl p-4 neon-border relative overflow-hidden ${className}`}
      >
        {shimmer && <div className="absolute inset-0 shimmer-bg pointer-events-none rounded-xl" />}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`glass rounded-xl p-4 neon-border relative overflow-hidden ${className}`}
    >
      {shimmer && <div className="absolute inset-0 shimmer-bg pointer-events-none rounded-xl" />}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/**
 * MessageBubble - Premium chat message styling
 * Pure UI wrapper - no logic changes
 */
export function MessageBubble({
  children,
  type = 'other',
  timestamp,
}: {
  children: ReactNode;
  type?: 'self' | 'other' | 'ai';
  timestamp?: string;
}) {
  const baseClass = 'rounded-2xl px-4 py-3 max-w-xs lg:max-w-sm break-words';

  const bubbleClass =
    type === 'self'
      ? 'bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
      : type === 'ai'
        ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 text-cyan-100 shadow-lg shadow-cyan-500/20'
        : 'bg-slate-800/40 border border-cyan-500/20 text-gray-100 shadow-lg shadow-slate-900/20';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`${baseClass} ${bubbleClass}`}
    >
      {children}
      {timestamp && (
        <div className="text-xs mt-1 opacity-60">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </motion.div>
  );
}

/**
 * TypingIndicator - Premium animated typing indicator
 * Pure UI component - no logic
 */
export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-cyan-400"
            animate={{
              y: [0, -8, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      <span className="text-xs text-cyan-400">Thinking...</span>
    </div>
  );
}

/**
 * AIAssistantCard - Premium AI panel wrapper
 * Pure UI styling - no logic changes
 */
export function AIAssistantCard({
  isOnline = true,
  children,
}: {
  isOnline?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-xl border border-cyan-500/30 overflow-hidden"
    >
      {/* AI Header */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-cyan-500/20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
              AI
            </div>
            {isOnline && (
              <motion.div
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border border-cyan-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
          <div>
            <h3 className="text-sm font-bold text-cyan-300">SkillWrap AI Tutor</h3>
            <p className="text-xs text-cyan-400/60">
              {isOnline ? 'Online & Ready' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>
    </motion.div>
  );
}

/**
 * NotesCard - Premium notes panel wrapper
 * Pure UI styling - no logic changes
 */
export function NotesCard({
  isSaving = false,
  saveStatus = 'saved',
  children,
}: {
  isSaving?: boolean;
  saveStatus?: 'saving' | 'saved' | 'unsaved';
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-xl border border-emerald-500/30 overflow-hidden"
    >
      {/* Notes Header */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-b border-emerald-500/20 px-4 py-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-emerald-300">Study Notes</h3>
        <div className="flex items-center gap-2">
          {isSaving && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="text-xs text-yellow-400"
            >
              💾
            </motion.div>
          )}
          <span className={`text-xs font-medium ${
            saveStatus === 'saving'
              ? 'text-yellow-400'
              : saveStatus === 'saved'
                ? 'text-green-400'
                : 'text-orange-400'
          }`}>
            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Unsaved'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>
    </motion.div>
  );
}

/**
 * SessionTimerCard - Premium countdown timer
 * Pure UI component - no logic
 */
export function SessionTimerCard({
  timeRemaining,
  totalTime,
}: {
  timeRemaining: number;
  totalTime: number;
}) {
  const percentage = (timeRemaining / totalTime) * 100;

  return (
    <motion.div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-cyan-300">Session Time</span>
        <span className="text-2xl font-bold text-cyan-400">
          {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden border border-cyan-500/30">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50"
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}

/**
 * PremiumButton - Enhanced button component
 * Pure UI styling - no logic
 */
export function PremiumButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const baseClass = 'font-medium rounded-lg transition-all duration-300 focus:outline-none';

  const sizeClass =
    size === 'sm'
      ? 'px-3 py-1.5 text-sm'
      : size === 'lg'
        ? 'px-6 py-3 text-lg'
        : 'px-4 py-2 text-base';

  const variantClass =
    variant === 'primary'
      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50'
      : variant === 'secondary'
        ? 'bg-slate-700/50 border border-cyan-500/30 text-cyan-300 hover:bg-slate-600/50 disabled:opacity-50'
        : variant === 'danger'
          ? 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 disabled:opacity-50'
          : 'text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-50';

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${sizeClass} ${variantClass} ${className}`}
    >
      {children}
    </motion.button>
  );
}

/**
 * EmptyState - Premium empty state display
 * Pure UI component - no logic
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ size: number; className: string }>;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Icon size={48} className="text-cyan-500/40 mb-4 mx-auto" />
      </motion.div>
      <h3 className="text-lg font-semibold text-gray-300 mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </motion.div>
  );
}

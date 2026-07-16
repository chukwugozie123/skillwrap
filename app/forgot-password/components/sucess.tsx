import { motion } from "framer-motion";
import { Check, Sparkles, Mail } from "lucide-react";

const SPARKLES = [
  { top: "10%", left: "15%", delay: 0 },
  { top: "20%", left: "80%", delay: 0.4 },
  { top: "70%", left: "10%", delay: 0.8 },
  { top: "75%", left: "85%", delay: 1.2 },
  { top: "45%", left: "92%", delay: 0.6 },
];

export function SuccessPanel({ email }: { email: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-8 text-center"
      role="status"
      aria-live="polite"
    >
      {/* subtle sparkles */}
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute text-emerald-300/70"
          style={{ top: s.top, left: s.left }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.7] }}
          transition={{ duration: 1.8, delay: 0.3 + s.delay, repeat: Infinity, repeatDelay: 2 }}
        >
          <Sparkles className="h-3.5 w-3.5" />
        </motion.span>
      ))}

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5, type: "spring", stiffness: 200, damping: 14 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 shadow-[0_0_40px_-5px_rgba(52,211,153,0.5)]"
      >
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Check className="h-9 w-9 text-emerald-400" strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-6 text-xl font-semibold text-emerald-300"
      >
        Reset link sent
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-3 text-sm leading-relaxed text-slate-400"
      >
        We've emailed a secure link to reset your password. It should arrive
        within a couple of minutes.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 shadow-[0_0_25px_-8px_rgba(34,211,238,0.6)]"
      >
        <Mail className="h-4 w-4 text-cyan-300" />
        <span className="text-sm font-medium text-cyan-200">{email}</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-6 text-xs text-slate-500"
      >
        Didn't see it? Check your spam or promotions folder.
      </motion.p>
    </motion.div>
  );
}

import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 2 + ((i * 37) % 4),
  left: (i * 53.7) % 100,
  top: (i * 29.3) % 100,
  duration: 6 + ((i * 13) % 8),
  delay: (i * 0.4) % 5,
}));

export function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(var(--auth-indigo)/0.25),transparent),radial-gradient(ellipse_60%_50%_at_100%_100%,hsl(var(--auth-blue)/0.18),transparent)]" />

      {/* Blurred gradient orbs */}
      <motion.div
        className="absolute -top-32 left-[8%] h-72 w-72 rounded-full bg-cyan-500/25 blur-[110px] sm:h-96 sm:w-96"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[5%] h-[22rem] w-[22rem] rounded-full bg-blue-600/25 blur-[130px] sm:h-[30rem] sm:w-[30rem]"
        animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-600/15 blur-[120px]"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating aurora mesh rings */}
      <div className="absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.12]">
        <div
          className="h-full w-full animate-aurora-spin rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, hsl(var(--auth-cyan)) 0deg, transparent 60deg, hsl(var(--auth-indigo)) 140deg, transparent 220deg, hsl(var(--auth-purple)) 300deg, transparent 360deg)",
          }}
        />
      </div>
      <div className="absolute left-1/2 top-1/2 h-[100vmax] w-[100vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]">
        <div
          className="h-full w-full animate-aurora-spin-reverse rounded-full"
          style={{
            background:
              "conic-gradient(from 90deg, transparent 0deg, hsl(var(--auth-blue)) 90deg, transparent 180deg, hsl(var(--auth-cyan)) 270deg, transparent 360deg)",
          }}
        />
      </div>

      {/* Floating glowing particles */}
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-cyan-300/70 shadow-[0_0_8px_2px_rgba(34,211,238,0.5)]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glass reflection sweep */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent" />

      {/* Noise texture overlay */}
      <div className="bg-noise absolute inset-0 opacity-[0.035]" />

      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,hsl(var(--auth-bg)/0.6)_100%)]" />
    </div>
  );
}

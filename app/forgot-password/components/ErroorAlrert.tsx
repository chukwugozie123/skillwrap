import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function ErrorAlert({ message }: { message: string }) {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: -12, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
          role="alert"
          aria-live="polite"
        >
          <div className="mt-1 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 shadow-[0_0_30px_-10px_rgba(239,68,68,0.4)] backdrop-blur-xl">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/15">
              <AlertCircle className="h-3.5 w-3.5 text-red-400" />
            </span>
            <p className="text-sm leading-snug text-red-300">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

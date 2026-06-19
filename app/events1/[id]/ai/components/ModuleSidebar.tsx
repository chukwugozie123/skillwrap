import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, CircleCheck as CheckCircle2, Lock, Circle, X, Trophy } from "lucide-react";

interface Module {
  id: number;
  title: string;
  description?: string;
  order?: number;
  completed?: boolean;
  status?: "completed" | "current" | "locked";
}

interface ModuleSidebarProps {
  eventId: number;
  open: boolean;
  onClose: () => void;
  onModuleStatusChange: (completed: number, current: number, total: number) => void;
}

const API_URL = "http://localhost:4000";

export default function ModuleSidebar({ eventId, open, onClose, onModuleStatusChange }: ModuleSidebarProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    async function fetchModules() {
      try {
        console.log("Fetching modules for event:", eventId);
        const res = await fetch(`${API_URL}/get/modules?eventId=${eventId}`);
        const data = await res.json();

        if (Array.isArray(data.modules)) {
          const mapped = data.modules.map((m: any, i: number) => ({
            id: m.id || i + 1,
            title: m.title || `Module ${i + 1}`,
            description: m.description || "",
            order: m.order || i + 1,
            completed: m.completed || false,
            status: m.status || (i === 0 ? "current" : "locked"),
          }));
          setModules(mapped);
          console.log("Modules loaded:", mapped.length);
        } else {
          console.log("No modules array found");
          setModules([]);
        }
      } catch (err) {
        console.error("Module fetch error:", err);
        setModules([]);
      } finally {
        setLoading(false);
      }
    }

    if (eventId) fetchModules();
  }, [eventId]);

  useEffect(() => {
    const completedCount = completedIds.size;
    const totalCount = modules.length;
    const currentIdx = modules.findIndex(
      (m) => !completedIds.has(m.id) && m.status !== "locked"
    );
    onModuleStatusChange(completedCount, currentIdx + 1, totalCount);
  }, [completedIds, modules, onModuleStatusChange]);

  function markComplete(moduleId: number) {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.add(moduleId);
      return next;
    });
    setModules((prev) =>
      prev.map((m, i) => {
        if (m.id === moduleId) return { ...m, completed: true, status: "completed" };
        if (i > 0 && prev[i - 1].id === moduleId && m.status === "locked") {
          return { ...m, status: "current" };
        }
        return m;
      })
    );
    console.log("Marked module complete:", moduleId);
  }

  const completedCount = completedIds.size;
  const totalCount = modules.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          x: open ? 0 : -260,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={`fixed lg:relative left-0 top-0 h-full w-[260px] z-40 bg-navy-900/98 lg:bg-transparent border-r border-white/10 lg:border-r-0 flex flex-col shrink-0 ${
          !open && "pointer-events-none lg:pointer-events-none"
        }`}
      >
        <div className="glass rounded-none lg:rounded-xl h-full flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-3 py-2.5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <BookOpen size={13} className="text-cyan-400" />
              <h3 className="text-xs font-bold text-white">Modules</h3>
            </div>
            <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white transition">
              <X size={14} />
            </button>
          </div>

          {/* Progress */}
          <div className="px-3 py-2.5 border-b border-white/10">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-gray-400">Progress</span>
              <span className="text-[10px] font-bold text-cyan-400">{progressPct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.4 }}
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
              />
            </div>
            <div className="flex items-center justify-between mt-1.5 text-[9px] text-gray-500">
              <span>{completedCount} done</span>
              <span>{totalCount - completedCount} left</span>
            </div>
          </div>

          {/* Module List */}
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1.5">
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full"
                />
              </div>
            ) : modules.length === 0 ? (
              <div className="text-center py-6">
                <Trophy size={20} className="text-gray-600 mx-auto mb-1.5" />
                <p className="text-[10px] text-gray-500">No modules yet</p>
              </div>
            ) : (
              modules.map((mod, i) => {
                const isCompleted = completedIds.has(mod.id);
                const isCurrent = !isCompleted && mod.status !== "locked";

                return (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`p-2.5 rounded-lg transition-all ${
                      isCompleted
                        ? "bg-green-500/10 border border-green-500/20"
                        : isCurrent
                        ? "bg-cyan-500/10 border border-cyan-500/30"
                        : "bg-white/[0.02] border border-white/5 opacity-50"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-px shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 size={13} className="text-green-400" />
                        ) : isCurrent ? (
                          <Circle size={13} className="text-cyan-400 fill-cyan-400/30" />
                        ) : (
                          <Lock size={13} className="text-gray-600" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium truncate ${
                          isCompleted ? "text-green-300" : isCurrent ? "text-white" : "text-gray-500"
                        }`}>
                          {mod.title}
                        </p>
                        {mod.description && (
                          <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{mod.description}</p>
                        )}

                        {isCurrent && (
                          <button
                            onClick={() => markComplete(mod.id)}
                            className="mt-1.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 text-[10px] font-medium hover:bg-cyan-500/25 transition"
                          >
                            <CheckCircle2 size={9} />
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}

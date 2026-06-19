"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  Users,
  Clock3,
  Trophy,
  Sparkles,
  Code2,
  CheckCircle2,
  Upload,
  X,
  ExternalLink,
  Flame,
  Rocket,
  Star,
  FileCode2,
  Zap,
  ArrowRight,
} from "lucide-react";

const API_URL = "http://localhost:4000";

// Animation variants for staggered reveals
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const glowVariants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Module type icons and colors
const moduleConfig: Record<string, { icon: typeof Code2; gradient: string; glow: string }> = {
  snippet: {
    icon: FileCode2,
    gradient: "from-cyan-500 to-blue-500",
    glow: "shadow-[0_0_40px_rgba(6,182,212,0.3)]",
  },
  resource: {
    icon: ExternalLink,
    gradient: "from-purple-500 to-pink-500",
    glow: "shadow-[0_0_40px_rgba(168,85,247,0.3)]",
  },
  task: {
    icon: Zap,
    gradient: "from-pink-500 to-orange-500",
    glow: "shadow-[0_0_40px_rgba(236,72,153,0.3)]",
  },
  default: {
    icon: Code2,
    gradient: "from-cyan-500 to-purple-500",
    glow: "shadow-[0_0_40px_rgba(6,182,212,0.2)]",
  },
};

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /* ================= TASK MODAL ================= */

  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  /* ================= FETCH EVENT ================= */

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(
          `${API_URL}/events/${params.id}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        setEvent(data.result);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [params.id]);

  
    
      /* ================= AUTH CHECK ================= */
      useEffect(() => {
        async function checkAuth() {
          try {
            const res = await fetch(`${API_URL}/auth/profile`, {
              credentials: "include",
            });
            if (!res.ok) router.push("/login");
    
            const data = await res.json();
            // setMyMode(data.user.mode);
            console.log(data.user.mode, " ss");
          } catch {
            router.push("/login");
          }
        }
        checkAuth();
      }, [router]);

  /* ================= SUBMIT TASK ================= */

  async function handleSubmitTask() {
    if (!selectedFile || !selectedTask) return;

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("task_id", selectedTask.id);

      /*
      await fetch(`${API_URL}/tasks/submit`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      */

      setCompletedTasks((prev) => [
        ...prev,
        selectedTask.id,
      ]);

      setOpenTaskModal(false);

      setSelectedFile(null);
    } catch (err) {
      console.log(err);
    }
  }

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 rounded-full border-2 border-cyan-500/30 border-t-cyan-400"
          />
          <span className="text-gray-400 text-sm tracking-wider uppercase">Loading Event...</span>
        </motion.div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <X className="text-red-400" size={24} />
          </div>
          <p className="text-red-400 font-medium">Event not found</p>
        </motion.div>
      </div>
    );
  }

  const modules = event.modules || [];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden relative">
      {/* ================= BACKGROUND ================= */}

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/8 blur-[150px] rounded-full"
        />

        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/8 blur-[150px] rounded-full"
        />

        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-pink-500/5 blur-[120px] rounded-full"
        />

        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute top-1/2 left-10 w-[250px] h-[250px] bg-blue-500/5 blur-[100px] rounded-full"
        />

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* ================= HERO ================= */}

      <section className="relative h-[580px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          src={event.banner_url}
          alt={event.title}
          className="w-full h-full object-cover"
        />

        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/50 to-transparent" />

        {/* Floating glow effects */}
        <motion.div 
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.15),transparent_50%)]" 
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.1),transparent_50%)]" />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
        />

        <div className="absolute bottom-12 left-6 md:left-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-xl mb-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={14} className="text-cyan-300" />
            </motion.div>
            <span className="text-cyan-200 text-sm font-medium tracking-wide">
              {event.category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              {event.title}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-5 text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            {event.description}
          </motion.p>

          {/* STATS - Dashboard widgets */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3 mt-8"
          >
            {[
              { icon: Users, label: `${event.attendees_count || 0} joined`, color: "cyan" },
              { icon: Clock3, label: "48 Hours Challenge", color: "purple" },
              { icon: Trophy, label: "Earn XP + Badges", color: "yellow" },
              { icon: Flame, label: "Live Challenge", color: "pink" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  transition: { type: "spring", stiffness: 400, damping: 20 }
                }}
                className={`
                  group px-4 py-3 rounded-2xl 
                  bg-white/[0.03] backdrop-blur-xl
                  border border-white/[0.08]
                  hover:border-${stat.color}-400/30
                  hover:bg-white/[0.06]
                  transition-all duration-300
                  flex items-center gap-2.5
                  shadow-lg shadow-black/20
                `}
              >
                <stat.icon 
                  size={16} 
                  className={`
                    ${stat.color === 'cyan' ? 'text-cyan-400' : ''}
                    ${stat.color === 'purple' ? 'text-purple-400' : ''}
                    ${stat.color === 'yellow' ? 'text-yellow-400' : ''}
                    ${stat.color === 'pink' ? 'text-pink-400' : ''}
                    group-hover:scale-110 transition-transform duration-300
                  `} 
                />
                <span className="text-sm text-gray-300 font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <section className="relative px-6 md:px-16 py-20">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12">
          {/* ================= LEFT ================= */}

          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-12"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/20 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                <Rocket className="text-cyan-300" size={20} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                  Event Modules
                </h2>
                <p className="text-gray-500 text-sm mt-0.5">{modules.length} modules available</p>
              </div>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              {modules.map((module: any, i: number) => {
                const config = moduleConfig[module.type] || moduleConfig.default;
                const IconComponent = config.icon;

                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.01,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    className={`
                      group relative
                      rounded-3xl
                      border border-white/[0.08]
                      bg-gradient-to-br from-white/[0.03] to-white/[0.01]
                      backdrop-blur-2xl
                      p-7
                      overflow-hidden
                      hover:border-white/[0.15]
                      transition-all duration-500
                      ${completedTasks.includes(module.id) ? 'ring-1 ring-emerald-500/30' : ''}
                    `}
                  >
                    {/* Animated glow on hover */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-[0.03] transition-opacity duration-500`} 
                    />
                    
                    {/* Top glow line */}
                    <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />

                    <div className="relative">
                      {/* HEADER */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <motion.div 
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                            className={`
                              w-14 h-14 rounded-2xl 
                              bg-gradient-to-br ${config.gradient}
                              p-[1px]
                              ${config.glow}
                            `}
                          >
                            <div className="w-full h-full rounded-2xl bg-[#0a0a0f]/90 flex items-center justify-center">
                              <IconComponent className="text-white" size={22} />
                            </div>
                          </motion.div>

                          <div>
                            <h3 className="font-bold text-xl text-white/90">
                              {module.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`
                                text-[10px] font-bold uppercase tracking-[0.2em]
                                bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent
                              `}>
                                {module.type}
                              </span>
                              <span className="text-gray-600">•</span>
                              <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                                Module {i + 1}
                              </span>
                            </div>
                          </div>
                        </div>

                        {completedTasks.includes(module.id) && (
                          <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center gap-1.5 shadow-lg shadow-emerald-500/10"
                          >
                            <CheckCircle2 size={12} className="text-emerald-400" />
                            <span className="text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                              Completed
                            </span>
                          </motion.div>
                        )}
                      </div>

                      {/* CONTENT */}
                      <p className="text-gray-400 leading-relaxed mt-5 text-[15px]">
                        {module.content}
                      </p>

                      {/* SNIPPET */}
                      {module.type === "snippet" && (
                        <div className="mt-6 rounded-2xl bg-black/60 border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/50">
                          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                              <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <FileCode2 size={14} />
                                <span className="font-mono text-xs">starter-code.tsx</span>
                              </div>
                            </div>
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                            >
                              Copy
                            </motion.button>
                          </div>
                          <pre className="p-5 overflow-x-auto text-sm text-cyan-300/90 font-mono leading-relaxed">
                            <code>{module.content}</code>
                          </pre>
                        </div>
                      )}

                      {/* RESOURCE */}
                      {module.type === "resource" && (
                        <div className="mt-6">
                          <motion.button
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className="
                              group/btn flex items-center gap-3
                              px-5 py-3.5 rounded-2xl
                              border border-white/[0.08]
                              bg-white/[0.02]
                              hover:bg-white/[0.05]
                              hover:border-purple-400/30
                              transition-all duration-300
                            "
                          >
                            <ExternalLink size={16} className="text-purple-400" />
                            <span className="font-medium">View Resources</span>
                            <ArrowRight size={14} className="text-gray-500 group-hover/btn:text-purple-400 group-hover/btn:translate-x-1 transition-all" />
                          </motion.button>
                        </div>
                      )}

                      {/* TASK */}
                      {module.type === "task" && (
                        <div className="flex flex-wrap gap-3 mt-6">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              setSelectedTask(module);
                              setOpenTaskModal(true);
                            }}
                            className="
                              relative px-6 py-3.5 rounded-2xl
                              bg-gradient-to-r from-cyan-500 to-purple-500
                              font-semibold text-white
                              shadow-[0_0_40px_rgba(6,182,212,0.3)]
                              overflow-hidden
                              group/submit
                            "
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <Upload size={16} />
                              Submit Task
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover/submit:opacity-100 transition-opacity duration-300" />
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="
                              px-6 py-3.5 rounded-2xl
                              border border-white/[0.1]
                              bg-white/[0.02]
                              hover:bg-white/[0.05]
                              hover:border-white/[0.2]
                              transition-all duration-300
                              font-medium
                            "
                          >
                            View Requirements
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* ================= SIDEBAR ================= */}

          <div className="space-y-5">
            {/* STATUS */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="
                relative rounded-3xl overflow-hidden
                border border-white/[0.08]
                bg-gradient-to-br from-white/[0.04] to-white/[0.01]
                backdrop-blur-2xl p-7
                shadow-2xl shadow-black/30
              "
            >
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[80px] rounded-full" />
              
              <div className="relative">
                <div className="flex items-center gap-2.5">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
                  />
                  <span className="text-xs text-emerald-300 font-bold uppercase tracking-[0.2em]">
                    Live Now
                  </span>
                </div>

                <div className="mt-6">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
                  >
                    47h
                  </motion.div>
                  <p className="text-gray-500 mt-2 text-sm">
                    Remaining challenge time
                  </p>
                </div>

                <div className="mt-6 h-2.5 rounded-full bg-white/[0.05] overflow-hidden border border-white/[0.05]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-cyan-500/30"
                  />
                </div>
              </div>
            </motion.div>

            {/* LEADERBOARD */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="
                rounded-3xl
                border border-white/[0.08]
                bg-gradient-to-br from-white/[0.04] to-white/[0.01]
                backdrop-blur-2xl p-7
                shadow-2xl shadow-black/30
              "
            >
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="text-yellow-400" size={18} />
                <h3 className="font-bold text-lg">Top Builders</h3>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Alex", xp: 1200 },
                  { name: "Daniel", xp: 1100 },
                  { name: "Sophia", xp: 1000 },
                ].map((user, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm
                        ${i === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : ''}
                        ${i === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' : ''}
                        ${i === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700' : ''}
                      `}>
                        {user.name[0]}
                      </div>
                      <div>
                        <span className="font-medium">{user.name}</span>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                          Rank #{i + 1}
                        </p>
                      </div>
                    </div>
                    <div className="text-cyan-400 text-sm font-bold">
                      {user.xp} <span className="text-[10px] text-gray-500">XP</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* REWARDS */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="
                rounded-3xl
                border border-white/[0.08]
                bg-gradient-to-br from-white/[0.04] to-white/[0.01]
                backdrop-blur-2xl p-7
                shadow-2xl shadow-black/30
              "
            >
              <div className="flex items-center gap-2 mb-6">
                <Star className="text-yellow-400" size={18} />
                <h3 className="font-bold text-lg">Rewards</h3>
              </div>

              <div className="space-y-3">
                {[
                  { reward: "+200 XP", icon: Zap },
                  { reward: "AI Builder Badge", icon: Trophy },
                  { reward: "Featured Profile", icon: Star },
                  { reward: "Exclusive Community", icon: Users },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center">
                      <CheckCircle2 className="text-emerald-400" size={14} />
                    </div>
                    <span className="text-gray-300 text-sm">{item.reward}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* SUBMIT PROJECT */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="
                relative rounded-3xl overflow-hidden
                border border-cyan-400/20
                bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-pink-500/10
                backdrop-blur-2xl p-7
                shadow-2xl shadow-cyan-500/10
              "
            >
              {/* Animated border glow */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 blur-[60px] rounded-full"
              />
              
              <div className="relative">
                <h3 className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Final Submission
                </h3>
                <p className="text-gray-500 mt-2 text-sm">
                  Submit your GitHub repo or deployed project.
                </p>

                <input
                  placeholder="https://github.com/..."
                  className="
                    w-full mt-5
                    bg-black/40
                    border border-white/[0.1]
                    rounded-2xl
                    px-5 py-4
                    text-sm
                    outline-none
                    focus:border-cyan-400/40
                    focus:ring-2
                    focus:ring-cyan-400/10
                    transition-all
                    placeholder:text-gray-600
                  "
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    relative w-full mt-5 py-4 rounded-2xl
                    bg-gradient-to-r from-cyan-500 to-purple-500
                    font-bold text-white
                    shadow-[0_0_40px_rgba(6,182,212,0.3)]
                    overflow-hidden
                    group/final
                  "
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Rocket size={16} />
                    Submit Work
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover/final:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= TASK MODAL ================= */}

      <AnimatePresence>
        {openTaskModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="
              fixed inset-0 z-50
              bg-black/80 backdrop-blur-xl
              flex items-center justify-center
              px-5
            "
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="
                w-full max-w-2xl
                rounded-[32px]
                border border-white/[0.1]
                bg-gradient-to-br from-[#12121a] to-[#0a0a0f]
                backdrop-blur-2xl
                p-8
                relative
                shadow-2xl shadow-black/50
                overflow-hidden
              "
            >
              {/* Background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-cyan-500/10 blur-[100px] rounded-full" />
              
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpenTaskModal(false)}
                className="
                  absolute top-6 right-6
                  w-10 h-10 rounded-xl
                  bg-white/[0.05] hover:bg-white/[0.1]
                  border border-white/[0.1]
                  flex items-center justify-center
                  transition-colors
                "
              >
                <X size={18} />
              </motion.button>

              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-3xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Submit Task
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Upload your completed task files.
                  </p>
                </motion.div>

                {/* Drag area */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    if (e.dataTransfer.files[0]) {
                      setSelectedFile(e.dataTransfer.files[0]);
                    }
                  }}
                  className={`
                    mt-8 
                    border-2 border-dashed
                    rounded-3xl
                    p-12 text-center 
                    transition-all duration-300
                    ${
                      dragActive
                        ? "border-cyan-400 bg-cyan-500/10 scale-[1.02]"
                        : "border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.04]"
                    }
                  `}
                >
                  <motion.div
                    animate={dragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/20 flex items-center justify-center mb-5">
                      <Upload className="text-cyan-300" size={28} />
                    </div>

                    <h3 className="font-bold text-xl">
                      Drag & Drop Files
                    </h3>

                    <p className="text-gray-500 mt-2 text-sm">
                      Upload ZIP, PDF, images or source code
                    </p>
                  </motion.div>

                  <input
                    type="file"
                    className="hidden"
                    id="fileUpload"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />

                  <motion.label
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    htmlFor="fileUpload"
                    className="
                      inline-block mt-6
                      px-6 py-3.5 rounded-2xl
                      bg-gradient-to-r from-cyan-500 to-purple-500
                      cursor-pointer
                      font-semibold
                      shadow-lg shadow-cyan-500/20
                    "
                  >
                    Browse Files
                  </motion.label>
                </motion.div>

                {/* Selected file */}
                <AnimatePresence>
                  {selectedFile && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="mt-5 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                          <FileCode2 size={18} className="text-cyan-400" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{selectedFile.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {(selectedFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedFile(null)}
                        className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center transition-colors"
                      >
                        <X size={14} className="text-gray-400 hover:text-red-400" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmitTask}
                  disabled={!selectedFile}
                  className={`
                    relative w-full mt-6 py-4 rounded-2xl
                    font-bold text-lg
                    overflow-hidden
                    transition-all duration-300
                    ${selectedFile 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_40px_rgba(6,182,212,0.3)]' 
                      : 'bg-white/[0.05] text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Upload size={18} />
                    Upload Task
                  </span>
                  {selectedFile && (
                    <motion.div 
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400"
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}










// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";

// import {
//   Users,
//   Clock3,
//   Trophy,
//   Sparkles,
//   Code2,
//   CheckCircle2,
//   Upload,
//   X,
//   ExternalLink,
//   Flame,
//   Rocket,
//   Star,
//   FileCode2,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// const API_URL = "http://localhost:4000";

// export default function EventDetailsPage() {
//   const params = useParams();

//   const [event, setEvent] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   /* ================= TASK MODAL ================= */

//   const [openTaskModal, setOpenTaskModal] = useState(false);
//   const [selectedTask, setSelectedTask] = useState<any>(null);

//   const [dragActive, setDragActive] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const [completedTasks, setCompletedTasks] = useState<number[]>([]);

//   const router =  useRouter();

//       useEffect(() => {
//       const fetchProfile = async () => {
//         try {
//           const res = await fetch(`${API_URL}/auth/profile`, {
//             credentials: "include",
//           });
//        if (!res.ok) return router.push("/login");
  
//           const data = await res.json();
//           // setUser(data.user);
//         } catch (err) {
//           // setError("Failed to load profile");
//         }
//       };
  
//       fetchProfile();
//     }, []);
  

//   /* ================= FETCH EVENT ================= */

//   useEffect(() => {
//     async function fetchEvent() {
//       try {
//         const res = await fetch(
//           `${API_URL}/events/${params.id}`,
//           {
//             credentials: "include",
//           }
//         );

//         const data = await res.json();

//         setEvent(data.result);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchEvent();
//   }, [params.id]);

//   /* ================= SUBMIT TASK ================= */

//   async function handleSubmitTask() {
//     if (!selectedFile || !selectedTask) return;

//     try {
//       const formData = new FormData();

//       formData.append("file", selectedFile);
//       formData.append("task_id", selectedTask.id);

//       /*
//       await fetch(`${API_URL}/tasks/submit`, {
//         method: "POST",
//         credentials: "include",
//         body: formData,
//       });
//       */

//       setCompletedTasks((prev) => [
//         ...prev,
//         selectedTask.id,
//       ]);

//       setOpenTaskModal(false);

//       setSelectedFile(null);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   /* ================= STATES ================= */

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
//         Loading Event...
//       </div>
//     );
//   }

//   if (!event) {
//     return (
//       <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
//         Event not found
//       </div>
//     );
//   }

//   const modules = event.modules || [];

//   return (
//     <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
//       {/* ================= BACKGROUND ================= */}

//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           animate={{
//             x: [0, 40, 0],
//             y: [0, 20, 0],
//           }}
//           transition={{
//             duration: 12,
//             repeat: Infinity,
//           }}
//           className="absolute top-0 left-1/3 w-[450px] h-[450px] bg-cyan-500/10 blur-[120px] rounded-full"
//         />

//         <motion.div
//           animate={{
//             x: [0, -30, 0],
//             y: [0, -20, 0],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//           }}
//           className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-purple-500/10 blur-[120px] rounded-full"
//         />

//         <div className="absolute top-1/2 left-10 w-[250px] h-[250px] bg-pink-500/5 blur-[100px] rounded-full" />
//       </div>

//       {/* ================= HERO ================= */}

//       <section className="relative h-[520px] overflow-hidden">
//         <motion.img
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 1.5 }}
//           src={event.banner_url}
//           alt={event.title}
//           className="w-full h-full object-cover"
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/60 to-black/20" />

//         {/* floating glow */}

//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_30%)]" />

//         <div className="absolute bottom-10 left-6 md:left-16 max-w-4xl">
//           <motion.div
//             initial={{
//               opacity: 0,
//               y: 20,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 backdrop-blur-xl mb-5"
//           >
//             <Sparkles size={15} className="text-cyan-300" />

//             <span className="text-cyan-200 text-sm">
//               {event.category}
//             </span>
//           </motion.div>

//           <motion.h1
//             initial={{
//               opacity: 0,
//               y: 25,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               delay: 0.1,
//             }}
//             className="text-4xl md:text-7xl font-black leading-tight"
//           >
//             {event.title}
//           </motion.h1>

//           <motion.p
//             initial={{
//               opacity: 0,
//             }}
//             animate={{
//               opacity: 1,
//             }}
//             transition={{
//               delay: 0.2,
//             }}
//             className="mt-5 text-gray-300 text-lg max-w-2xl"
//           >
//             {event.description}
//           </motion.p>

//           {/* STATS */}

//           <motion.div
//             initial={{
//               opacity: 0,
//               y: 10,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               delay: 0.3,
//             }}
//             className="flex flex-wrap gap-4 mt-8"
//           >
//             <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-2">
//               <Users size={17} className="text-cyan-400" />
//               <span>{event.attendees_count || 0} joined</span>
//             </div>

//             <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-2">
//               <Clock3 size={17} className="text-purple-400" />
//               <span>48 Hours Challenge</span>
//             </div>

//             <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-2">
//               <Trophy size={17} className="text-yellow-400" />
//               <span>Earn XP + Badges</span>
//             </div>

//             <div className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-2">
//               <Flame size={17} className="text-pink-400" />
//               <span>Live Challenge</span>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ================= CONTENT ================= */}

//       <section className="relative px-6 md:px-16 py-16">
//         <div className="grid lg:grid-cols-[1fr_360px] gap-10">
//           {/* ================= LEFT ================= */}

//           <div>
//             <div className="flex items-center gap-3 mb-10">
//               <Rocket className="text-cyan-300" />

//               <h2 className="text-3xl font-black">
//                 Event Modules
//               </h2>
//             </div>

//             <div className="space-y-6">
//               {modules.map((module: any, i: number) => (
//                 <motion.div
//                   key={i}
//                   initial={{
//                     opacity: 0,
//                     y: 30,
//                   }}
//                   whileInView={{
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   whileHover={{
//                     scale: 1.01,
//                   }}
//                   viewport={{ once: true }}
//                   transition={{
//                     delay: i * 0.08,
//                   }}
//                   className="
//                     group
//                     rounded-[28px]
//                     border border-white/10
//                     bg-white/5
//                     backdrop-blur-2xl
//                     p-6
//                     relative
//                     overflow-hidden
//                     hover:border-cyan-400/30
//                     transition-all
//                   "
//                 >
//                   {/* glow */}

//                   <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition duration-500" />

//                   <div className="relative">
//                     {/* HEADER */}

//                     <div className="flex items-center justify-between gap-4">
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
//                           <Code2 className="text-cyan-300" />
//                         </div>

//                         <div>
//                           <h3 className="font-bold text-xl">
//                             {module.title}
//                           </h3>

//                           <p className="text-xs text-cyan-300 uppercase tracking-wider">
//                             {module.type}
//                           </p>
//                         </div>
//                       </div>

//                       {completedTasks.includes(module.id) && (
//                         <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-semibold">
//                           COMPLETED
//                         </div>
//                       )}
//                     </div>

//                     {/* CONTENT */}

//                     <p className="text-gray-300 leading-relaxed mt-5">
//                       {module.content}
//                     </p>

//                     {/* SNIPPET */}

//                     {module.type === "snippet" && (
//                       <div className="mt-5 rounded-2xl bg-black/50 border border-white/10 overflow-hidden">
//                         <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
//                           <div className="flex items-center gap-2 text-sm text-gray-400">
//                             <FileCode2 size={15} />
//                             starter-code.tsx
//                           </div>

//                           <button className="text-xs text-cyan-300 hover:text-cyan-200">
//                             Copy
//                           </button>
//                         </div>

//                         <pre className="p-4 overflow-x-auto text-sm text-cyan-300">
//                           <code>{module.content}</code>
//                         </pre>
//                       </div>
//                     )}

//                     {/* RESOURCE */}

//                     {module.type === "resource" && (
//                       <div className="mt-6">
//                         <button
//                           className="
//                             flex items-center gap-2
//                             px-5 py-3 rounded-2xl
//                             border border-white/10
//                             bg-white/5
//                             hover:bg-white/10
//                             transition
//                           "
//                         >
//                           <ExternalLink size={16} />
//                           View Resources
//                         </button>
//                       </div>
//                     )}

//                     {/* TASK */}

//                     {module.type === "task" && (
//                       <div className="flex flex-wrap gap-4 mt-6">
//                         <button
//                           onClick={() => {
//                             setSelectedTask(module);
//                             setOpenTaskModal(true);
//                           }}
//                           className="
//                             px-5 py-3 rounded-2xl
//                             bg-gradient-to-r
//                             from-cyan-500
//                             to-purple-500
//                             font-semibold
//                             hover:scale-[1.03]
//                             transition
//                             shadow-[0_0_30px_rgba(34,211,238,0.25)]
//                           "
//                         >
//                           Submit Task
//                         </button>

//                         <button
//                           className="
//                             px-5 py-3 rounded-2xl
//                             border border-white/10
//                             bg-white/5
//                             hover:bg-white/10
//                             transition
//                           "
//                         >
//                      <Link href={`/requirement/${event.event_no}`}>View Requirements</Link>
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* ================= SIDEBAR ================= */}

//           <div className="space-y-6">
//             {/* STATUS */}

//             <motion.div
//               whileHover={{
//                 y: -3,
//               }}
//               className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl p-7"
//             >
//               <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />

//                 <span className="text-sm text-emerald-300">
//                   LIVE NOW
//                 </span>
//               </div>

//               <div className="mt-5">
//                 <div className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
//                   47h
//                 </div>

//                 <p className="text-gray-400 mt-2">
//                   Remaining challenge time
//                 </p>
//               </div>

//               <div className="mt-6 h-3 rounded-full bg-white/10 overflow-hidden">
//                 <motion.div
//                   initial={{
//                     width: 0,
//                   }}
//                   animate={{
//                     width: "65%",
//                   }}
//                   transition={{
//                     duration: 1.2,
//                   }}
//                   className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
//                 />
//               </div>
//             </motion.div>

//             {/* LEADERBOARD */}

//             <motion.div
//               whileHover={{
//                 y: -3,
//               }}
//               className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl p-7"
//             >
//               <h3 className="font-bold text-xl mb-5">
//                 Top Builders
//               </h3>

//               <div className="space-y-4">
//                 {[
//                   "Alex",
//                   "Daniel",
//                   "Sophia",
//                 ].map((name, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center justify-between"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center font-bold">
//                         {name[0]}
//                       </div>

//                       <span>{name}</span>
//                     </div>

//                     <div className="text-cyan-300 text-sm">
//                       {1200 - i * 100} XP
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* REWARDS */}

//             <motion.div
//               whileHover={{
//                 y: -3,
//               }}
//               className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl p-7"
//             >
//               <div className="flex items-center gap-2 mb-5">
//                 <Star className="text-yellow-400" />

//                 <h3 className="font-bold text-xl">
//                   Rewards
//                 </h3>
//               </div>

//               <div className="space-y-4">
//                 {[
//                   "+200 XP",
//                   "AI Builder Badge",
//                   "Featured Profile",
//                   "Exclusive Community Access",
//                 ].map((reward, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center gap-3"
//                   >
//                     <CheckCircle2 className="text-emerald-400" />

//                     <span>{reward}</span>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* SUBMIT PROJECT */}

//             <motion.div
//               whileHover={{
//                 y: -3,
//               }}
//               className="
//                 rounded-[28px]
//                 border border-cyan-400/20
//                 bg-gradient-to-br
//                 from-cyan-500/10
//                 to-purple-500/10
//                 backdrop-blur-2xl
//                 p-7
//               "
//             >
//               <h3 className="font-bold text-2xl">
//                 Final Submission
//               </h3>

//               <p className="text-gray-400 mt-3">
//                 Submit your GitHub repo or deployed project.
//               </p>

//               <input
//                 placeholder="https://github.com/..."
//                 className="
//                   w-full mt-5
//                   bg-black/30
//                   border border-white/10
//                   rounded-2xl
//                   px-4 py-3
//                   outline-none
//                   focus:border-cyan-400/40
//                 "
//               />

//               <button
//                 className="
//                   w-full mt-5 py-3 rounded-2xl
//                   bg-gradient-to-r
//                   from-cyan-500
//                   to-purple-500
//                   font-semibold
//                   hover:scale-[1.02]
//                   transition
//                 "
//               >
//                 Submit Work
//               </button>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ================= TASK MODAL ================= */}

//       <AnimatePresence>
//         {openTaskModal && (
//           <motion.div
//             initial={{
//               opacity: 0,
//             }}
//             animate={{
//               opacity: 1,
//             }}
//             exit={{
//               opacity: 0,
//             }}
//             className="
//               fixed inset-0 z-50
//               bg-black/70 backdrop-blur-md
//               flex items-center justify-center
//               px-5
//             "
//           >
//             <motion.div
//               initial={{
//                 scale: 0.9,
//                 opacity: 0,
//               }}
//               animate={{
//                 scale: 1,
//                 opacity: 1,
//               }}
//               exit={{
//                 scale: 0.9,
//                 opacity: 0,
//               }}
//               className="
//                 w-full max-w-2xl
//                 rounded-[32px]
//                 border border-white/10
//                 bg-slate-900/90
//                 backdrop-blur-2xl
//                 p-8
//                 relative
//               "
//             >
//               {/* close */}

//               <button
//                 onClick={() =>
//                   setOpenTaskModal(false)
//                 }
//                 className="
//                   absolute top-5 right-5
//                   w-10 h-10 rounded-xl
//                   bg-white/5 hover:bg-white/10
//                   flex items-center justify-center
//                 "
//               >
//                 <X size={18} />
//               </button>

//               <h2 className="text-3xl font-black">
//                 Submit Task
//               </h2>

//               <p className="text-gray-400 mt-2">
//                 Upload your completed task files.
//               </p>

//               {/* drag area */}

//               <div
//                 onDragOver={(e) => {
//                   e.preventDefault();
//                   setDragActive(true);
//                 }}
//                 onDragLeave={() =>
//                   setDragActive(false)
//                 }
//                 onDrop={(e) => {
//                   e.preventDefault();

//                   setDragActive(false);

//                   if (e.dataTransfer.files[0]) {
//                     setSelectedFile(
//                       e.dataTransfer.files[0]
//                     );
//                   }
//                 }}
//                 className={`
//                   mt-8 border-2 border-dashed
//                   rounded-[28px]
//                   p-14 text-center transition
//                   ${
//                     dragActive
//                       ? "border-cyan-400 bg-cyan-500/10"
//                       : "border-white/10 bg-white/5"
//                   }
//                 `}
//               >
//                 <Upload className="mx-auto text-cyan-300 mb-4" size={38} />

//                 <h3 className="font-bold text-xl">
//                   Drag & Drop Files
//                 </h3>

//                 <p className="text-gray-400 mt-2">
//                   Upload ZIP, PDF, images or source code
//                 </p>

//                 <input
//                   type="file"
//                   className="hidden"
//                   id="fileUpload"
//                   onChange={(e) => {
//                     if (e.target.files?.[0]) {
//                       setSelectedFile(
//                         e.target.files[0]
//                       );
//                     }
//                   }}
//                 />

//                 <label
//                   htmlFor="fileUpload"
//                   className="
//                     inline-block mt-5
//                     px-5 py-3 rounded-2xl
//                     bg-gradient-to-r
//                     from-cyan-500
//                     to-purple-500
//                     cursor-pointer
//                     font-semibold
//                   "
//                 >
//                   Browse Files
//                 </label>
//               </div>

//               {selectedFile && (
//                 <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10">
//                   <p className="font-medium">
//                     {selectedFile.name}
//                   </p>

//                   <p className="text-sm text-gray-400 mt-1">
//                     {(selectedFile.size / 1024).toFixed(1)} KB
//                   </p>
//                 </div>
//               )}

//               <button
//                 onClick={handleSubmitTask}
//                 className="
//                   w-full mt-6 py-4 rounded-2xl
//                   bg-gradient-to-r
//                   from-cyan-500
//                   to-purple-500
//                   font-bold text-lg
//                   hover:scale-[1.02]
//                   transition
//                 "
//               >
//                 Upload Task
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams } from "next/navigation";
// // import { motion } from "framer-motion";

// // import {
// //   Users,
// //   Clock3,
// //   Trophy,
// //   Sparkles,
// //   Code2,
// //   CheckCircle2,
// // } from "lucide-react";

// // const API_URL = "http://localhost:4000";

// // export default function EventDetailsPage() {
// //   const params = useParams();

// //   const [event, setEvent] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     async function fetchEvent() {
// //       try {
// //         const res = await fetch(
// //           `${API_URL}/events/${params.id}`,
// //           {
// //             credentials: "include",
// //           }
// //         );

// //         const data = await res.json();

// //         setEvent(data.result);
// //       } catch (err) {
// //         console.log(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchEvent();
// //   }, [params.id]);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
// //         Loading Event...
// //       </div>
// //     );
// //   }

// //   if (!event) {
// //     return (
// //       <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
// //         Event not found
// //       </div>
// //     );
// //   }

// //   const modules = event.modules || [];

// //   return (
// //     <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
// //       {/* BACKGROUND GLOWS */}

// //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />

// //         <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full" />
// //       </div>

// //       {/* HERO */}

// //       <section className="relative h-[420px] overflow-hidden">
// //         <img
// //           src={event.banner_url}
// //           alt={event.title}
// //           className="w-full h-full object-cover"
// //         />

// //         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/50 to-black/20" />

// //         <div className="absolute bottom-10 left-6 md:left-16 max-w-3xl">
// //           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 backdrop-blur-xl mb-5">
// //             <Sparkles size={15} className="text-cyan-300" />

// //             <span className="text-cyan-200 text-sm">
// //               {event.category}
// //             </span>
// //           </div>

// //           <h1 className="text-4xl md:text-6xl font-black leading-tight">
// //             {event.title}
// //           </h1>

// //           <p className="mt-4 text-gray-300 text-lg">
// //             {event.description}
// //           </p>

// //           {/* STATS */}

// //           <div className="flex flex-wrap gap-5 mt-6 text-sm text-gray-300">
// //             <div className="flex items-center gap-2">
// //               <Users size={16} className="text-cyan-400" />
// //               {event.attendees_count || 0} joined
// //             </div>

// //             <div className="flex items-center gap-2">
// //               <Clock3 size={16} className="text-purple-400" />
// //               48 Hours Challenge
// //             </div>

// //             <div className="flex items-center gap-2">
// //               <Trophy size={16} className="text-yellow-400" />
// //               Earn XP + Badges
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* CONTENT */}

// //       <section className="relative px-6 md:px-16 py-16">
// //         <div className="grid lg:grid-cols-[1fr_340px] gap-10">
// //           {/* LEFT */}

// //           <div>
// //             <h2 className="text-3xl font-bold mb-8">
// //               Event Modules
// //             </h2>

// //             <div className="space-y-5">
// //               {modules.map((module: any, i: number) => (
// //                 <motion.div
// //                   key={i}
// //                   initial={{
// //                     opacity: 0,
// //                     y: 20,
// //                   }}
// //                   whileInView={{
// //                     opacity: 1,
// //                     y: 0,
// //                   }}
// //                   viewport={{ once: true }}
// //                   transition={{
// //                     delay: i * 0.08,
// //                   }}
// //                   className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6"
// //                 >
// //                   <div className="flex items-center gap-3 mb-4">
// //                     <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
// //                       <Code2 className="text-cyan-300" />
// //                     </div>

// //                     <div>
// //                       <h3 className="font-bold text-lg">
// //                         {module.title}
// //                       </h3>

// //                       <p className="text-xs text-cyan-300 uppercase">
// //                         {module.type}
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <p className="text-gray-300 leading-relaxed">
// //                     {module.content}
// //                   </p>

// //                   {/* CODE */}

// //                   {module.type === "snippet" && (
// //                     <div className="mt-5 rounded-2xl bg-black/40 border border-white/10 p-4 overflow-x-auto">
// //                       <pre className="text-sm text-cyan-300">
// //                         <code>{module.content}</code>
// //                       </pre>
// //                     </div>
// //                   )}

// //                   {/* TASK */}

// //                   {module.type === "task" && (
// //                     <button className="mt-5 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold">
// //                       Mark As Completed
// //                     </button>
// //                   )}
// //                 </motion.div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* RIGHT SIDEBAR */}

// //           <div className="space-y-6">
// //             {/* COUNTDOWN */}

// //             <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6">
// //               <h3 className="font-bold text-xl">
// //                 Event Status
// //               </h3>

// //               <div className="mt-5">
// //                 <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
// //                   LIVE
// //                 </div>

// //                 <p className="text-gray-400 mt-2">
// //                   Ends in 47h 12m
// //                 </p>
// //               </div>
// //             </div>

// //             {/* REWARDS */}

// //             <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6">
// //               <h3 className="font-bold text-xl mb-5">
// //                 Rewards
// //               </h3>

// //               <div className="space-y-4">
// //                 <div className="flex items-center gap-3">
// //                   <CheckCircle2 className="text-emerald-400" />

// //                   <span>+200 XP</span>
// //                 </div>

// //                 <div className="flex items-center gap-3">
// //                   <CheckCircle2 className="text-emerald-400" />

// //                   <span>AI Builder Badge</span>
// //                 </div>

// //                 <div className="flex items-center gap-3">
// //                   <CheckCircle2 className="text-emerald-400" />

// //                   <span>Featured Profile</span>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* SUBMIT */}

// //             <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-2xl p-6">
// //               <h3 className="font-bold text-xl">
// //                 Submit Project
// //               </h3>

// //               <p className="text-gray-400 mt-2">
// //                 Share your GitHub or deployment link.
// //               </p>

// //               <input
// //                 placeholder="https://github.com/..."
// //                 className="w-full mt-5 bg-black/30 border border-white/10 rounded-2xl px-4 py-3 outline-none"
// //               />

// //               <button className="w-full mt-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold">
// //                 Submit Work
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// // //to gpt.. help em add some btn in d models setion e.g for d task add a btn like submit task.. then when d btn is pressed shiw a popup of an drag and drop fle tellind den to submit  dtaks and when submited we mark as done for dat taks.. ad for d resources pagee a d a btn like view resources which would lead to anther page.. u grab neo 
// // // do d  needfull and rember to also upgrade d style add dynaimca nmations and trasitons to amek it feell better..
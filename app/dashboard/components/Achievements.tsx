// // "use client";


// // import {
// // Trophy,
// // Lock
// // } from "lucide-react";



// // interface Achievement {


// // id:number;

// // name:string;

// // description?:string;

// // completed:boolean;


// // }



// // interface Props{

// // achievements:Achievement[];

// // }



// // export default function Achievements({
// // achievements
// // }:Props){



// // return (

// // <div className="
// // rounded-3xl
// // bg-white/5
// // border
// // border-white/10
// // backdrop-blur-xl
// // p-6
// // ">


// // <div className="
// // flex
// // items-center
// // gap-3
// // mb-6
// // ">


// // <div className="
// // p-2
// // rounded-xl
// // bg-yellow-500/10
// // ">

// // <Trophy
// // size={18}
// // className="text-yellow-400"
// // />

// // </div>



// // <h3 className="
// // text-white
// // font-bold
// // ">

// // Achievements

// // </h3>



// // </div>





// // <div className="
// // grid
// // grid-cols-2
// // sm:grid-cols-3
// // lg:grid-cols-4
// // gap-4
// // ">


// // {

// // achievements.map((item)=>(


// // <div

// // key={item.id}

// // className={`
// // relative
// // rounded-2xl
// // p-5
// // border
// // transition
// // hover:-translate-y-1

// // ${
// // item.completed

// // ?

// // "bg-yellow-500/10 border-yellow-400/30 shadow-lg shadow-yellow-500/10"

// // :

// // "bg-black/20 border-white/10 opacity-50"

// // }

// // `}

// // >


// // <div className="
// // flex
// // justify-between
// // items-start
// // ">


// // <div className={`
// // w-12
// // h-12
// // rounded-xl
// // flex
// // items-center
// // justify-center
// // text-2xl

// // ${
// // item.completed

// // ?

// // "bg-yellow-400/20"

// // :

// // "bg-white/5"

// // }

// // `}>

// // {
// // item.completed
// // ?
// // "🏆"
// // :
// // <Lock size={20}/>
// // }


// // </div>



// // </div>



// // <h4 className="
// // text-white
// // text-sm
// // font-bold
// // mt-4
// // ">

// // {item.name}

// // </h4>


// // <p className="
// // text-xs
// // text-white/40
// // mt-2
// // ">

// // {
// // item.completed
// // ?
// // "Unlocked"
// // :
// // "Locked"
// // }

// // </p>



// // </div>


// // ))


// // }


// // </div>


// // </div>

// // )

// // }





// "use client";

// import { useEffect, useState } from "react";
// import { Lock, Sparkles } from "lucide-react";

// const API_URL = "http://localhost:4000";

// interface Achievement {
//   id: number;
//   name: string;
//   description?: string;
//   completed: boolean;
// }

// interface Props {
//   achievements: any[];
// }

// export default function Achievements({ achievements }: Props) {
//   const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);

//   useEffect(() => {
//     async function loadAll() {
//       try {
//         const res = await fetch(
//           `${API_URL}/achievements/fetch/all/achivments`,
//           { credentials: "include" }
//         );

//         const data = await res.json();
//         const all = data.achievements || data || [];

//         const userSet = new Set(
//           achievements.map((a: any) => a.achievement_id || a.id)
//         );

//         const merged = all.map((item: any) => ({
//           id: item.id,
//           name: item.name,
//           description: item.description,
//           completed: userSet.has(item.id),
//         }));

//         setAllAchievements(merged);
//       } catch (err) {
//         console.log("Failed to load achievements", err);
//       }
//     }

//     loadAll();
//   }, [achievements]);

//   return (
//     <div className="
//       w-full
//       rounded-3xl
//       bg-white/5
//       border border-white/10
//       backdrop-blur-2xl
//       p-4 sm:p-6 lg:p-8
//     ">

//       {/* GRID */}
//       <div className="
//         grid
//         grid-cols-1
//         sm:grid-cols-2
//         md:grid-cols-3
//         lg:grid-cols-4
//         xl:grid-cols-5
//         2xl:grid-cols-6
//         gap-4 sm:gap-5 lg:gap-6
//       ">

//         {allAchievements.map((item) => (
//           <div
//             key={item.id}
//             className={`
//               relative rounded-2xl p-4 sm:p-5 lg:p-6
//               border transition-all duration-300
//               hover:scale-[1.03] hover:-translate-y-1
//               active:scale-95

//               ${
//                 item.completed
//                   ? `
//                     bg-gradient-to-br from-yellow-500/20 to-orange-500/10
//                     border-yellow-400/40
//                     shadow-lg shadow-yellow-500/10
//                   `
//                   : `
//                     bg-black/30
//                     border-white/10
//                     opacity-60
//                     grayscale
//                   `
//               }
//             `}
//           >

//             {/* ICON ROW */}
//             <div className="flex justify-between items-start">

//               <div
//                 className={`
//                   w-10 sm:w-12 lg:w-14
//                   h-10 sm:h-12 lg:h-14
//                   rounded-xl
//                   flex items-center justify-center
//                   text-xl sm:text-2xl lg:text-3xl
//                   ${item.completed ? "bg-yellow-400/20" : "bg-white/5"}
//                 `}
//               >
//                 {item.completed ? "🏆" : <Lock size={18} />}
//               </div>

//               {item.completed && (
//                 <Sparkles
//                   size={16}
//                   className="text-yellow-400 animate-pulse"
//                 />
//               )}
//             </div>

//             {/* TITLE */}
//             <h4 className="
//               text-white font-bold
//               text-sm sm:text-base lg:text-lg
//               mt-3 sm:mt-4
//             ">
//               {item.name}
//             </h4>

//             {/* DESCRIPTION */}
//             <p className="
//               text-white/40
//               text-xs sm:text-sm
//               mt-2
//               line-clamp-2
//             ">
//               {item.description || "Complete this milestone"}
//             </p>

//             {/* STATUS */}
//             <div className={`
//               mt-4 text-[10px] sm:text-[11px] font-semibold
//               ${item.completed ? "text-yellow-300" : "text-white/30"}
//             `}>
//               {item.completed ? "✓ Unlocked" : "🔒 Locked"}
//             </div>

//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }







"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import {
  Lock,
  Sparkles,
  Trophy,
  Star,
  Zap,
  Crown,
  Target,
  Unlock,
} from "lucide-react";

const API_URL = "http://localhost:4000";

interface Achievement {
  id: number;
  name: string;
  description?: string;
  completed: boolean;
}

interface Props {
  achievements: any[];
}

// ============ ANIMATION VARIANTS ============
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
    filter: "blur(10px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

// ============ FLOATING PARTICLE ============
function FloatingParticle({ delay, x }: { delay: number; x: string }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        left: x,
        background: "radial-gradient(circle, rgba(251,191,36,0.7) 0%, transparent 70%)",
      }}
      animate={{
        y: [0, -80, -160],
        opacity: [0, 1, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 5 + delay,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

// ============ ACHIEVEMENT CARD ============
function AchievementCard({ item, index }: { item: Achievement; index: number }) {
  const colorSchemes: Record<number, { gradient: string; border: string; iconBg: string; glow: string }> = {
    1: {
      gradient: "from-amber-500/25 to-yellow-500/10",
      border: "border-amber-400/40",
      iconBg: "from-amber-400 to-yellow-500",
      glow: "rgba(251,191,36,0.25)",
    },
    2: {
      gradient: "from-cyan-500/25 to-blue-500/10",
      border: "border-cyan-400/40",
      iconBg: "from-cyan-400 to-blue-500",
      glow: "rgba(34,211,238,0.25)",
    },
    3: {
      gradient: "from-purple-500/25 to-violet-500/10",
      border: "border-purple-400/40",
      iconBg: "from-purple-400 to-violet-500",
      glow: "rgba(168,85,247,0.25)",
    },
    4: {
      gradient: "from-emerald-500/25 to-teal-500/10",
      border: "border-emerald-400/40",
      iconBg: "from-emerald-400 to-teal-500",
      glow: "rgba(16,185,129,0.25)",
    },
    5: {
      gradient: "from-rose-500/25 to-pink-500/10",
      border: "border-rose-400/40",
      iconBg: "from-rose-400 to-pink-500",
      glow: "rgba(244,63,94,0.25)",
    },
    6: {
      gradient: "from-indigo-500/25 to-blue-500/10",
      border: "border-indigo-400/40",
      iconBg: "from-indigo-400 to-blue-500",
      glow: "rgba(129,140,248,0.25)",
    },
  };

  const scheme = colorSchemes[item.id % 6 + 1] || colorSchemes[1];
  const emojis = ["🏆", "⭐", "🎯", "💎", "👑", "🎖️", "🚀", "💫"];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.05,
        y: -6,
        transition: { type: "spring", stiffness: 300 },
      }}
      className="group relative"
    >
      {/* Glow effect */}
      {item.completed && (
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-2xl blur-xl pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${scheme.glow}, transparent 70%)` }}
        />
      )}

      {/* Card */}
      <div
        className={`
          relative rounded-2xl p-5
          border backdrop-blur-xl
          transition-all duration-300
          overflow-hidden
          ${
            item.completed
              ? `bg-gradient-to-br ${scheme.gradient} ${scheme.border} shadow-lg`
              : "bg-slate-900/70 border-white/[0.06] opacity-70 hover:opacity-90"
          }
        `}
      >
        {/* Shimmer line */}
        {item.completed && (
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />
        )}

        {/* Header row */}
        <div className="flex justify-between items-start mb-4">
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className={`
              relative w-14 h-14 rounded-xl
              flex items-center justify-center
              text-3xl
              shadow-lg
              ${
                item.completed
                  ? `bg-gradient-to-br ${scheme.iconBg}`
                  : "bg-slate-800/80 border border-white/10"
              }
            `}
          >
            {item.completed ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: index * 0.03 }}
              >
                {emojis[item.id % emojis.length]}
              </motion.span>
            ) : (
              <Lock className="w-5 h-5 text-slate-500" />
            )}

            {/* Pulse ring */}
            {item.completed && (
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${scheme.iconBg}`}
              />
            )}
          </motion.div>

          {/* Sparkle */}
          {item.completed && (
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity },
              }}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
            </motion.div>
          )}
        </div>

        {/* Title */}
        <h4
          className={`
            font-bold text-base mb-2
            ${item.completed ? "text-white" : "text-slate-400"}
          `}
        >
          {item.name}
        </h4>

        {/* Description */}
        <p
          className={`
            text-xs leading-relaxed mb-4 line-clamp-2
            ${item.completed ? "text-white/70" : "text-slate-500"}
          `}
        >
          {item.description || "Complete this milestone"}
        </p>

        {/* Status */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`
            inline-flex items-center gap-1.5 px-3 py-1.5
            rounded-full text-[11px] font-semibold
            ${
              item.completed
                ? "bg-white/20 text-white border border-white/20"
                : "bg-slate-800/60 text-slate-500 border border-white/5"
            }
          `}
        >
          {item.completed ? (
            <>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </motion.div>
              <span>Unlocked</span>
            </>
          ) : (
            <>
              <Lock className="w-3 h-3" />
              <span>Locked</span>
            </>
          )}
        </motion.div>

        {/* Decorative elements */}
        {item.completed && (
          <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-lg pointer-events-none" />
        )}
      </div>
    </motion.div>
  );
}

// ============ MAIN COMPONENT ============
export default function Achievements({ achievements }: Props) {
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    async function loadAll() {
      try {
        const res = await fetch(
          `${API_URL}/achievements/fetch/all/achivments`,
          { credentials: "include" }
        );

        const data = await res.json();
        const all = data.achievements || data || [];

        const userSet = new Set(
          achievements.map((a: any) => a.achievement_id || a.id)
        );

        const merged = all.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          completed: userSet.has(item.id),
        }));

        setAllAchievements(merged);
      } catch (err) {
        console.log("Failed to load achievements", err);
      }
    }

    loadAll();
  }, [achievements]);

  // Calculate stats
  const completedCount = allAchievements.filter((a) => a.completed).length;
  const totalCount = allAchievements.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col"
    >
      {/* Main container */}
      <div className="flex-1 relative rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-white/[0.06] backdrop-blur-2xl overflow-hidden shadow-2xl shadow-black/30">
        {/* Top shimmer */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        />

        <div className="p-5 sm:p-6 lg:p-8">
          {/* ============ HEADER ============ */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              {/* Title section */}
              <div className="flex items-center gap-3 sm:gap-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/15 border border-amber-400/25"
                >
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                </motion.div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Achievements
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Track your milestones and rewards
                  </p>
                </div>
              </div>

              {/* Stats badges */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Unlocked */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-yellow-500/10 border border-amber-400/25"
                >
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <div className="text-left">
                    <div className="text-base sm:text-lg font-bold text-amber-300">
                      {completedCount}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-amber-400/70 -mt-0.5">
                      Unlocked
                    </div>
                  </div>
                </motion.div>

                {/* Locked */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-800/60 border border-white/[0.06]"
                >
                  <Lock className="w-4 h-4 text-slate-400" />
                  <div className="text-left">
                    <div className="text-base sm:text-lg font-bold text-slate-400">
                      {totalCount - completedCount}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-slate-500 -mt-0.5">
                      Locked
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] sm:text-xs">
                <span className="text-slate-400">Overall Progress</span>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-cyan-400" />
                  <span className="text-cyan-400 font-semibold">{progressPercent}%</span>
                </div>
              </div>
              <div className="h-2 sm:h-2.5 rounded-full bg-slate-800/80 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={visible ? { width: `${progressPercent}%` } : {}}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 relative"
                >
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.div>
              </div>
              <div className="text-center text-[10px] sm:text-[11px] text-slate-500">
                {completedCount} of {totalCount} achievements completed
              </div>
            </div>
          </motion.div>

          {/* ============ GRID ============ */}
          {allAchievements.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-14 sm:py-16"
            >
              <div className="inline-flex p-3 sm:p-4 rounded-2xl bg-slate-800/60 border border-white/[0.06] mb-4">
                <Crown className="w-7 h-7 sm:w-8 sm:h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 text-sm sm:text-base">No achievements available</p>
              <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
                Start your journey to unlock achievements!
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={visible ? "visible" : "hidden"}
              className="
                grid grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                2xl:grid-cols-5
                gap-3 sm:gap-4 lg:gap-5
              "
            >
              {allAchievements.map((item, index) => (
                <AchievementCard key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          )}
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />
      </div>
    </motion.div>
  );
}

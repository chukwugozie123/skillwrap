// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Sparkles, Flame, ArrowRight } from 'lucide-react';
// import { Variants } from "framer-motion";

// const API_URL = 'http://localhost:4000';

// interface EventType {
//   id: string;
//   event_no?: number;
//   title: string;
//   description: string;
//   category: string;
//   type?: string;
//   difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
//   mode?: 'virtual' | 'physical' | 'hybrid';
//   start_time: string;
//   end_time?: string;
//   banner_url?: string;
//   is_live?: boolean;
//   attendees_count?: number;
//   max_attendees?: number;
//   technologies?: string[];
//   rewards?: string[];
//   requirements?: string[];
//   modules?: any[];
//   deliverables?: any[];
//   judging_criteria?: any[];
//   files?: any[];
//   created_at?: string;
// }

// export default function EventsPage() {
//   const router = useRouter();

//   const [events, setEvents] = useState<EventType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const [joinedEvents, setJoinedEvents] = useState<number[]>([]);
//   const [showJoinModal, setShowJoinModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
//   const [newlyJoined, setNewlyJoined] = useState<number[]>([]);

//   // ================= AUTH =================
//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const res = await fetch(`${API_URL}/auth/profile`, {
//           credentials: 'include',
//         });

//         if (!res.ok) {
//           router.push('/login');
//         }
//       } catch (err) {
//         setError('Failed to load profile');
//       }
//     }

//     fetchProfile();
//   }, [router]);

//   // ================= EVENTS =================
//   useEffect(() => {
//     async function fetchEvents() {
//       try {
//         setLoading(true);

//         const res = await fetch(`${API_URL}/events`, {
//           credentials: 'include',
//         });

//         if (!res.ok) throw new Error('Failed to fetch events');

//         const data = await res.json();
//         setEvents(data.result || []);
//       } catch (err) {
//         setError('Failed to load events');
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchEvents();
//   }, []);

//   // ================= JOINED EVENTS =================
//   useEffect(() => {
//     async function checkJoinedEvents() {
//       try {
//         const res = await fetch(`${API_URL}/check/event/exist`, {
//           credentials: 'include',
//         });

//         if (!res.ok) throw new Error('Check failed');

//         const data = await res.json();
// if (data.success && Array.isArray(data.exists)) {
//   const ids: number[] = Array.from(
//     new Set(
//       (data.exists as any[])
//         .map((item) => Number(item.event_id))
//         .filter((id) => Number.isInteger(id) && id > 0)
//     )
//   );

//   setJoinedEvents(ids);
// }
//       } catch (err) {
//         console.error('CHECK ERROR:', err);
//       }
//     }

//     checkJoinedEvents();
//   }, []);

//   // ================= JOIN EVENT =================
//   async function handleJoinEvent(event_no: number) {
//     try {
//       const res = await fetch(`${API_URL}/join/event/${event_no}`, {
//         method: 'POST',
//         credentials: 'include',
//       });

//       if (!res.ok) throw new Error('Join failed');

//       setJoinedEvents((prev) =>
//         prev.includes(event_no) ? prev : [...prev, event_no]
//       );

//       setNewlyJoined((prev) =>
//         prev.includes(event_no) ? prev : [...prev, event_no]
//       );

//       setSelectedEvent(event_no);
//       setShowJoinModal(true);
//     } catch (err) {
//       console.error('JOIN ERROR:', err);
//     }
//   }

//   // ================= START EVENT =================
//   function startEvent(id: number) {
//     router.push(`/events1/${id}/ai`);
//   }

//   // ================= UI STATE =================
//   const isJoined = (event_no?: number) =>
//     event_no ? joinedEvents.includes(event_no) : false;

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const variants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.4,
//       ease: "easeInOut",
//     },
//   },
// };
//   // const itemVariants = {
//   //   hidden: { opacity: 0, y: 20 },
//   //   visible: {
//   //     opacity: 1,
//   //     y: 0,
//   //     transition: { duration: 0.5, ease: 'easeOut' },
//   //   },
//   // };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#050816] via-[#0a0e27] to-[#050816] text-white">
//       {/* ===== ANIMATED BACKGROUND BLOBS ===== */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
//         <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500" />
//       </div>

//       {/* ===== CONTENT ===== */}
//       <div className="relative z-10">
//         {/* ===== HERO HEADER ===== */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-6xl mx-auto px-6 pt-16 pb-12"
//         >
//           <div className="flex items-start justify-between mb-6">
//             <div className="flex-1">
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="flex items-center gap-2 mb-4"
//               >
//                 <Sparkles className="w-5 h-5 text-cyan-400" />
//                 <span className="text-sm text-cyan-400 font-semibold">Welcome to the Arena</span>
//               </motion.div>

//               <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight mb-4">
//                 Skill Events Arena
//               </h1>

//               <p className="text-lg text-gray-400 max-w-2xl">
//                 Join AI challenges, hackathons & build real-world projects. Compete, learn, and earn rewards.
//               </p>
//             </div>

//             {/* HOST EVENT BUTTON */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => router.push('/host')}
//               className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 font-semibold whitespace-nowrap ml-4 flex-shrink-0"
//             >
//               <Flame className="w-5 h-5" />
//               Host Event
//             </motion.button>
//           </div>

//           {/* STATS BAR */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="grid grid-cols-3 gap-4 md:gap-6 mt-8"
//           >
//             <div className="glass rounded-2xl px-4 py-3 border border-cyan-500/20">
//               <p className="text-xs text-gray-400">Total Events</p>
//               <p className="text-2xl font-bold text-cyan-400">{events.length}</p>
//             </div>
//             <div className="glass rounded-2xl px-4 py-3 border border-blue-500/20">
//               <p className="text-xs text-gray-400">Joined</p>
//               <p className="text-2xl font-bold text-blue-400">{joinedEvents.length}</p>
//             </div>
//             <div className="glass rounded-2xl px-4 py-3 border border-purple-500/20">
//               <p className="text-xs text-gray-400">Live Now</p>
//               <p className="text-2xl font-bold text-purple-400">{events.filter(e => e.is_live).length}</p>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* ===== EVENTS GRID ===== */}
//         <div className="max-w-6xl mx-auto px-6 py-12">
//           {loading ? (
//             <div className="text-center py-20">
//               <div className="inline-block">
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
//                   className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full"
//                 />
//               </div>
//             </div>
//           ) : (
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
//             >
//               {events.map((event) => {
//                 const joined = isJoined(event.event_no);
//                 const attendancePercent = Math.min(
//                   100,
//                   ((event.attendees_count || 0) / (event.max_attendees || 1)) * 100
//                 );

//                 return (
//                   <motion.div
//                     key={event.id}
//                     variants={variants}
//                     whileHover={{ y: -8 }}
//                     className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-500 hover:shadow-[0_0_60px_rgba(34,211,238,0.15)]"
//                   >
//                     {/* ===== BANNER SECTION ===== */}
//                     <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950">
//                       <img
//                         src={
//                           event.banner_url ||
//                           'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop'
//                         }
//                         alt={event.title}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                       />

//                       {/* GRADIENT OVERLAY */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/50 to-transparent" />

//                       {/* CATEGORY BADGE */}
//                       <motion.div
//                         whileHover={{ scale: 1.05 }}
//                         className="absolute top-4 left-4 px-3 py-1.5 text-xs rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 font-semibold backdrop-blur-sm"
//                       >
//                         {event.category}
//                       </motion.div>

//                       {/* LIVE BADGE */}
//                       {event.is_live && (
//                         <motion.div
//                           animate={{ scale: [1, 1.1, 1] }}
//                           transition={{ duration: 2, repeat: Infinity }}
//                           className="absolute top-4 right-4 px-3 py-1.5 text-xs rounded-full bg-red-500/30 border border-red-400/50 text-red-300 font-semibold backdrop-blur-sm flex items-center gap-1"
//                         >
//                           <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
//                           LIVE
//                         </motion.div>
//                       )}
//                     </div>

//                     {/* ===== CONTENT SECTION ===== */}
//                     <div className="p-6">
//                       {/* TITLE */}
//                       <h2 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2">
//                         {event.title}
//                       </h2>

//                       {/* DESCRIPTION */}
//                       <p className="text-gray-400 text-sm line-clamp-2 mb-4">
//                         {event.description}
//                       </p>

//                       {/* TYPE + DIFFICULTY + MODE BADGES */}
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {event.type && (
//                           <span className="text-xs px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-gray-300 font-medium">
//                             {event.type}
//                           </span>
//                         )}
//                         {event.difficulty && (
//                           <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
//                             event.difficulty === 'Beginner'
//                               ? 'bg-green-500/15 border border-green-400/30 text-green-300'
//                               : event.difficulty === 'Intermediate'
//                                 ? 'bg-yellow-500/15 border border-yellow-400/30 text-yellow-300'
//                                 : 'bg-red-500/15 border border-red-400/30 text-red-300'
//                           }`}>
//                             {event.difficulty}
//                           </span>
//                         )}
//                         {event.mode && (
//                           <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-400/30 text-blue-300 font-medium">
//                             {event.mode}
//                           </span>
//                         )}
//                       </div>

//                       {/* ===== ATTENDEES PROGRESS ===== */}
//                       <div className="mb-4">
//                         <div className="flex justify-between text-xs text-gray-400 mb-2">
//                           <span className="font-medium">Attendees</span>
//                           <span className="font-semibold">
//                             {event.attendees_count || 0}/{event.max_attendees || 0}
//                           </span>
//                         </div>
//                         <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
//                           <motion.div
//                             initial={{ width: 0 }}
//                             animate={{ width: `${attendancePercent}%` }}
//                             transition={{ duration: 1, ease: 'easeOut' }}
//                             className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
//                           />
//                         </div>
//                       </div>

//                       {/* ===== TECHNOLOGIES ===== */}
//                       {event.technologies && event.technologies.length > 0 && (
//                         <div className="flex flex-wrap gap-1.5 mb-4">
//                           {event.technologies.slice(0, 3).map((tech, idx) => (
//                             <span
//                               key={idx}
//                               className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-gray-300 font-medium"
//                             >
//                               {tech}
//                             </span>
//                           ))}
//                           {event.technologies.length > 3 && (
//                             <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-gray-400 font-medium">
//                               +{event.technologies.length - 3}
//                             </span>
//                           )}
//                         </div>
//                       )}

//                       {/* ===== REWARDS ===== */}
//                       {event.rewards && event.rewards.length > 0 && (
//                         <div className="mb-5 p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/20">
//                           <p className="text-sm text-yellow-300 font-semibold flex items-center gap-2">
//                             <span>🏆</span>
//                             {event.rewards.join(' • ')}
//                           </p>
//                         </div>
//                       )}

//                       {/* ===== BUTTON ===== */}
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={() => {
//                           const id = event.event_no!;
//                           if (isJoined(id)) {
//                             startEvent(id);
//                           } else {
//                             handleJoinEvent(id);
//                           }
//                         }}
//                         className={`w-full py-3 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
//                           joined
//                             ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:shadow-lg hover:shadow-emerald-500/40'
//                             : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:shadow-lg hover:shadow-cyan-500/40'
//                         }`}
//                       >
//                         {joined ? (
//                           <>
//                             <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
//                             Continue Event
//                           </>
//                         ) : (
//                           <>
//                             Join Event
//                             <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
//                           </>
//                         )}
//                       </motion.button>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>
//           )}
//         </div>
//       </div>

//       {/* ===== JOIN SUCCESS MODAL ===== */}
//       <AnimatePresence>
//         {showJoinModal && selectedEvent && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/80 flex items-center justify-center backdrop-blur-md z-50 p-4"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: 'spring', damping: 20, stiffness: 300 }}
//               className="glass rounded-3xl border border-cyan-500/30 p-8 max-w-sm text-center shadow-2xl shadow-cyan-500/20"
//             >
//               {/* CELEBRATION ANIMATION */}
//               <motion.div
//                 animate={{ y: [0, -10, 0] }}
//                 transition={{ duration: 0.5, repeat: Infinity }}
//                 className="text-6xl mb-6"
//               >
//                 🎉
//               </motion.div>

//               <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-3">
//                 Successfully Joined!
//               </h2>

//               <p className="text-gray-400 mb-8">
//                 You&apos;re ready to start your AI journey. Enter the chat to begin competing.
//               </p>

//               {/* BUTTONS */}
//               <div className="space-y-3">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => startEvent(selectedEvent)}
//                   className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 group"
//                 >
//                   <span>🚀</span>
//                   Enter AI Chat
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </motion.button>

//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setShowJoinModal(false)}
//                   className="w-full py-2.5 rounded-xl bg-white/10 border border-white/20 text-gray-300 font-semibold hover:bg-white/15 transition-all"
//                 >
//                   Explore More Events
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }







'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, ArrowRight, Zap, Trophy, Users, Gauge } from 'lucide-react';
import { Variants } from "framer-motion";

// const API_URL = 'http://localhost:4000';
const API_URL = "https://skillwrap-backend.onrender.com";


interface EventType {
  id: string;
  event_no?: number;
  title: string;
  description: string;
  category: string;
  type?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  mode?: 'virtual' | 'physical' | 'hybrid';
  start_time: string;
  end_time?: string;
  banner_url?: string;
  is_live?: boolean;
  attendees_count?: number;
  max_attendees?: number;
  technologies?: string[];
  rewards?: string[];
  requirements?: string[];
  modules?: any[];
  deliverables?: any[];
  judging_criteria?: any[];
  files?: any[];
  created_at?: string;
}

export default function EventsPage() {
  const router = useRouter();

  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [joinedEvents, setJoinedEvents] = useState<number[]>([]);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [newlyJoined, setNewlyJoined] = useState<number[]>([]);

  // ================= AUTH =================
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: 'include',
        });

        if (!res.ok) {
          router.push('/login');
        }
      } catch (err) {
        setError('Failed to load profile');
      }
    }

    fetchProfile();
  }, [router]);

  // ================= EVENTS =================
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/events`, {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch events');

        const data = await res.json();
        setEvents(data.result || []);
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // ================= JOINED EVENTS =================
  useEffect(() => {
    async function checkJoinedEvents() {
      try {
        const res = await fetch(`${API_URL}/check/event/exist`, {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Check failed');

        const data = await res.json();
        if (data.success && Array.isArray(data.exists)) {
          const ids: number[] = Array.from(
            new Set(
              (data.exists as any[])
                .map((item) => Number(item.event_id))
                .filter((id) => Number.isInteger(id) && id > 0)
            )
          );

          setJoinedEvents(ids);
        }
      } catch (err) {
        console.error('CHECK ERROR:', err);
      }
    }

    checkJoinedEvents();
  }, []);

  // ================= JOIN EVENT =================
  async function handleJoinEvent(event_no: number) {
    try {
      const res = await fetch(`${API_URL}/join/event/${event_no}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Join failed');

      setJoinedEvents((prev) =>
        prev.includes(event_no) ? prev : [...prev, event_no]
      );

      setNewlyJoined((prev) =>
        prev.includes(event_no) ? prev : [...prev, event_no]
      );

      setSelectedEvent(event_no);
      setShowJoinModal(true);
    } catch (err) {
      console.error('JOIN ERROR:', err);
    }
  }

  // ================= START EVENT =================
  function startEvent(id: number) {
    router.push(`/events1/${id}/ai`);
  }

  // ================= UI STATE =================
  const isJoined = (event_no?: number) =>
    event_no ? joinedEvents.includes(event_no) : false;

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

  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
      {/* ===== PREMIUM ANIMATED BACKGROUND ===== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div 
          animate={{ 
            y: [0, 50, 0],
            x: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            y: [0, -50, 0],
            x: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            y: [0, 50, 0],
            x: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 left-1/2 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" 
        />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10">
        {/* ===== HERO HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10 sm:pb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start mb-8">
            {/* Left Section */}
            <div className="lg:col-span-2">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="p-2 rounded-full bg-cyan-500/20 border border-cyan-400/40">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-sm text-cyan-300 font-semibold">Welcome to the Arena</span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight mb-4"
              >
                AI Events Arena
              </motion.h1>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed"
              >
                Join cutting-edge AI challenges, hackathons & build world-class projects. Compete globally, master new skills, and earn premium rewards.
              </motion.p>
            </div>

            {/* Right Section - Host Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/host')}
              className="group relative w-full lg:w-auto px-6 sm:px-8 py-4 rounded-xl font-bold text-white overflow-hidden"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative flex items-center justify-center gap-2 whitespace-nowrap">
                <Flame className="w-5 h-5" />
                <span>Host Event</span>
              </div>
            </motion.button>
          </div>

          {/* ===== STATS DASHBOARD ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
          >
            {/* Total Events */}
            <motion.div
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-400/30 backdrop-blur-xl hover:border-cyan-400/60 transition-all duration-300"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs sm:text-sm text-cyan-300/80 font-semibold uppercase tracking-wider">Total Events</p>
                  <Gauge className="w-5 h-5 text-cyan-400" />
                </div>
                <motion.p 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  className="text-3xl sm:text-4xl font-bold text-cyan-300"
                >
                  {events.length}
                </motion.p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent group-hover:from-cyan-500/10 transition-all" />
            </motion.div>

            {/* Joined Events */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ delay: 0.1 }}
              className="group relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/5 border border-blue-400/30 backdrop-blur-xl hover:border-blue-400/60 transition-all duration-300"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs sm:text-sm text-blue-300/80 font-semibold uppercase tracking-wider">Joined</p>
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <motion.p 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                  className="text-3xl sm:text-4xl font-bold text-blue-300"
                >
                  {joinedEvents.length}
                </motion.p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent group-hover:from-blue-500/10 transition-all" />
            </motion.div>

            {/* Live Events */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-400/30 backdrop-blur-xl hover:border-purple-400/60 transition-all duration-300"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs sm:text-sm text-purple-300/80 font-semibold uppercase tracking-wider">Live Now</p>
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <motion.p 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                  className="text-3xl sm:text-4xl font-bold text-purple-300"
                >
                  {events.filter(e => e.is_live).length}
                </motion.p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent group-hover:from-purple-500/10 transition-all" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ===== EVENTS GRID ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full"
                />
              </div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {events.map((event) => {
                const joined = isJoined(event.event_no);
                const attendancePercent = Math.min(
                  100,
                  ((event.attendees_count || 0) / (event.max_attendees || 1)) * 100
                );

                return (
                  <motion.div
                    key={event.id}
                    variants={variants}
                    whileHover={{ y: -12 }}
                    className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/[0.02] backdrop-blur-2xl hover:border-cyan-400/50 transition-all duration-500 hover:shadow-[0_0_80px_rgba(34,211,238,0.2)] cursor-pointer"
                  >
                    {/* ===== BANNER SECTION ===== */}
                    <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-slate-900 to-blue-950">
                      <img
                        src={
                          event.banner_url ||
                          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop'
                        }
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                      {/* Animated accent glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Category badge */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="absolute top-3 sm:top-4 left-3 sm:left-4 px-3 py-1.5 text-xs rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/20 border border-cyan-400/60 text-cyan-200 font-bold backdrop-blur-lg"
                      >
                        {event.category}
                      </motion.div>

                      {/* Live badge */}
                      {event.is_live && (
                        <motion.div
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute top-3 sm:top-4 right-3 sm:right-4 px-3 py-1.5 text-xs rounded-full bg-gradient-to-r from-red-500/40 to-pink-500/30 border border-red-400/70 text-red-200 font-bold backdrop-blur-lg flex items-center gap-1.5"
                        >
                          <motion.span 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-red-400" 
                          />
                          LIVE
                        </motion.div>
                      )}
                    </div>

                    {/* ===== CONTENT SECTION ===== */}
                    <div className="p-4 sm:p-6">
                      {/* Title */}
                      <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2">
                        {event.title}
                      </h2>

                      {/* Description */}
                      <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-4">
                        {event.description}
                      </p>

                      {/* Badges section */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.type && (
                          <span className="text-xs px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-gray-300 font-medium hover:bg-white/15 transition-all">
                            {event.type}
                          </span>
                        )}
                        {event.difficulty && (
                          <span className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                            event.difficulty === 'Beginner'
                              ? 'bg-emerald-500/25 border border-emerald-400/50 text-emerald-200'
                              : event.difficulty === 'Intermediate'
                                ? 'bg-yellow-500/25 border border-yellow-400/50 text-yellow-200'
                                : 'bg-red-500/25 border border-red-400/50 text-red-200'
                          }`}>
                            {event.difficulty}
                          </span>
                        )}
                        {event.mode && (
                          <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-500/25 border border-blue-400/50 text-blue-200 font-medium">
                            {event.mode}
                          </span>
                        )}
                      </div>

                      {/* ===== ATTENDANCE PROGRESS ===== */}
                      <div className="mb-5">
                        <div className="flex justify-between items-center text-xs text-gray-400 mb-2.5">
                          <span className="font-semibold">Capacity</span>
                          <span className="font-bold text-cyan-300">
                            {event.attendees_count || 0}/{event.max_attendees || 0} · {Math.round(attendancePercent)}%
                          </span>
                        </div>
                        <div className="relative w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${attendancePercent}%` }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full shadow-lg shadow-cyan-500/40"
                          />
                        </div>
                      </div>

                      {/* Technologies */}
                      {event.technologies && event.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {event.technologies.slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-2.5 py-1 rounded-full bg-white/8 border border-white/15 text-gray-300 font-medium hover:bg-white/12 transition-all"
                            >
                              {tech}
                            </span>
                          ))}
                          {event.technologies.length > 3 && (
                            <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/8 border border-white/15 text-gray-400 font-medium">
                              +{event.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Rewards */}
                      {event.rewards && event.rewards.length > 0 && (
                        <div className="mb-5 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/15 border border-yellow-400/40 hover:border-yellow-400/60 transition-all">
                          <p className="text-xs sm:text-sm text-yellow-200 font-bold flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            {event.rewards.join(' · ')}
                          </p>
                        </div>
                      )}

                      {/* Action button */}
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          const id = event.event_no!;
                          if (isJoined(id)) {
                            startEvent(id);
                          } else {
                            handleJoinEvent(id);
                          }
                        }}
                        className={`w-full py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group/btn ${
                          joined
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/50'
                            : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:shadow-lg hover:shadow-cyan-500/50'
                        }`}
                      >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-20 transition-opacity" />
                        <div className="relative flex items-center justify-center gap-2">
                          {joined ? (
                            <>
                              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                              <span>Continue</span>
                            </>
                          ) : (
                            <>
                              <span>Join Event</span>
                              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </>
                          )}
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>

      {/* ===== JOIN SUCCESS MODAL ===== */}
      <AnimatePresence>
        {showJoinModal && selectedEvent && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative max-w-sm w-full"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl" />
              
              {/* Modal card */}
              <div className="relative rounded-2xl border border-cyan-400/50 p-6 sm:p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl shadow-2xl shadow-cyan-500/30">
                
                {/* Celebration animation */}
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                  className="text-6xl mb-6 text-center"
                >
                  🎉
                </motion.div>

                {/* Content */}
                <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-3 text-center">
                  You&apos;re In!
                </h2>

                <p className="text-gray-300 text-sm sm:text-base mb-8 text-center leading-relaxed">
                  You&apos;ve successfully joined this event. Start competing now and showcase your skills to the world!
                </p>

                {/* Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => startEvent(selectedEvent)}
                    className="group w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold text-sm sm:text-base hover:shadow-lg hover:shadow-cyan-500/60 transition-all flex items-center justify-center gap-2 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-20 transition-opacity" />
                    <span className="relative">🚀 Enter Event</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform relative" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowJoinModal(false)}
                    className="w-full py-3 rounded-xl bg-white/10 border border-white/20 text-gray-300 font-semibold text-sm sm:text-base hover:bg-white/15 transition-all duration-300"
                  >
                    Explore More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

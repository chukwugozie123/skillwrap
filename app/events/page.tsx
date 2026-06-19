"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import {
  CalendarDays,
  Users,
  Code2,
  Palette,
  Brain,
  Music,
  Briefcase,
  Dumbbell,
  Loader2,
  AlertTriangle,
  Sparkles,
  Zap,
  ArrowRight,
  Star,
  TrendingUp,
  Clock,
  Globe,
} from "lucide-react";

/* ================= API ================= */

const API_URL = "http://localhost:4000";

/* ================= TYPES ================= */

interface EventType {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
  start_time: string;
  end_time: string;
  attendees?: number;
  banner_url?: string;
  event_no?: number;
  attendees_count?: number;
}

/* ================= CATEGORIES ================= */

const categories = [
  {
    name: "Web Dev",
    icon: <Code2 size={22} />,
    glow: "from-cyan-500/30 to-blue-500/30",
    accent: "cyan",
    borderGlow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]",
  },
  {
    name: "Design",
    icon: <Palette size={22} />,
    glow: "from-pink-500/30 to-purple-500/30",
    accent: "pink",
    borderGlow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]",
  },
  {
    name: "AI",
    icon: <Brain size={22} />,
    glow: "from-violet-500/30 to-cyan-500/30",
    accent: "violet",
    borderGlow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
  },
  {
    name: "Music",
    icon: <Music size={22} />,
    glow: "from-fuchsia-500/30 to-pink-500/30",
    accent: "fuchsia",
    borderGlow: "group-hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]",
  },
  {
    name: "Business",
    icon: <Briefcase size={22} />,
    glow: "from-orange-500/30 to-amber-500/30",
    accent: "orange",
    borderGlow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]",
  },
  {
    name: "Fitness",
    icon: <Dumbbell size={22} />,
    glow: "from-emerald-500/30 to-teal-500/30",
    accent: "emerald",
    borderGlow: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.3)]",
  },
];

/* ================= ANIMATION VARIANTS ================= */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const floatAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

/* ================= MAGNETIC BUTTON ================= */

function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

/* ================= TILT CARD ================= */

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================= PAGE ================= */

export default function EventsPage() {
  const [joinedEvents,setJoinedEvents] = useState<number[]>([]);
  const [showJoinModal,setShowJoinModal] = useState(false);
  const [selectedEvent,setSelectedEvent] = useState<number | null>(null);
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });
        if (!res.ok) return router.push("/login");

        const data = await res.json();
        // setUser(data.user);
      } catch (err) {
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, [router]);

  /* ================= FETCH EVENTS ================= */

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/events`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();

        setEvents(data.result || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  /* ================= JOIN EVENT ================= */

async function handleJoinEvent(eventId:number){

try{

const res = await fetch(
`${API_URL}/join/event/${eventId}`,
{
method:"POST",
credentials:"include",
}
);


if(!res.ok){
throw new Error("Join failed");
}



console.log(
"✅ EVENT JOINED:",
eventId
);



setJoinedEvents(prev=>[
...prev,
eventId
]);


setSelectedEvent(eventId);

setShowJoinModal(true);



}catch(error){

console.error(
"JOIN EVENT ERROR:",
error
);

}
}

function startEvent(id:number){

router.push(
`/events1/${id}/ai`
);

}
  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">
      {/* ================= BACKGROUND ================= */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div
          animate={floatAnimation}
          className="absolute top-20 left-[15%] w-[600px] h-[600px] bg-cyan-500/8 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{
            ...floatAnimation,
            transition: { ...floatAnimation.transition, delay: 2 },
          }}
          className="absolute bottom-20 right-[10%] w-[700px] h-[700px] bg-purple-500/10 blur-[160px] rounded-full"
        />
        <motion.div
          animate={{
            ...floatAnimation,
            transition: { ...floatAnimation.transition, delay: 4 },
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500/8 blur-[130px] rounded-full"
        />
        <motion.div
          animate={{
            ...floatAnimation,
            transition: { ...floatAnimation.transition, delay: 1 },
          }}
          className="absolute top-[60%] left-[20%] w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full"
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050816_70%)]" />
      </div>

      {/* ================= HERO ================= */}

      <section className="relative px-6 pt-32 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-2xl mb-8 shadow-[0_0_30px_rgba(34,211,238,0.1)]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={16} className="text-cyan-400" />
            </motion.div>
            <span className="text-sm font-medium text-cyan-200 tracking-wide">
              Live SkillWrap Events
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] max-w-5xl mx-auto tracking-tight"
          >
            <span className="text-white/90">Discover</span>{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
                Amazing
              </span>
              <motion.span
                className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-500/20 blur-2xl -z-10"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
            <br />
            <span className="text-white/90">Skill Events</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mt-8 leading-relaxed font-light"
          >
            Join immersive workshops, coding challenges, AI hackathons and
            creator communities built for ambitious learners.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            <MagneticButton className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 font-semibold text-white shadow-[0_0_50px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] transition-all duration-500 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2.5">
                Explore Events
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </MagneticButton>

            <Link href="/host">
              <MagneticButton className="group px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                <span className="flex items-center gap-2.5 text-gray-200 group-hover:text-white transition-colors">
                  <Star size={18} />
                  Host Event
                </span>
              </MagneticButton>
            </Link>
          </motion.div>

          {/* Stats Widgets */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-16"
          >
            {[
              { label: "120+ Events", icon: <CalendarDays size={16} /> },
              { label: "10k+ Creators", icon: <Users size={16} /> },
              { label: "48hr Challenges", icon: <Clock size={16} /> },
              { label: "Live Weekly", icon: <Globe size={16} /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group px-6 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-2xl hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 cursor-default"
              >
                <span className="flex items-center gap-2.5 text-sm text-gray-300 group-hover:text-white transition-colors">
                  <span className="text-cyan-400">{item.icon}</span>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="relative px-6 max-w-7xl mx-auto mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <Zap className="text-cyan-400" size={20} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-7 flex flex-col items-center gap-5 cursor-pointer transition-all duration-500 ${cat.borderGlow}`}
            >
              {/* Glow background */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${cat.glow}`}
              />

              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, transparent 40%, rgba(34, 211, 238, 0.1) 50%, transparent 60%)`,
                  backgroundSize: "200% 200%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Icon */}
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-cyan-300 group-hover:bg-white/[0.08] group-hover:border-white/[0.12] transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]"
                >
                  {cat.icon}
                </motion.div>
              </div>

              {/* Name */}
              <span className="relative z-10 font-semibold text-sm text-gray-300 group-hover:text-white transition-colors">
                {cat.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= EVENTS ================= */}

      <section className="relative px-6 mt-28 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <TrendingUp className="text-purple-400" size={20} />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Events
            </h2>
          </div>
          <motion.div
            whileHover={{ x: 4 }}
            className="text-sm text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </motion.div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col justify-center items-center gap-4 py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="text-cyan-400" size={40} />
            </motion.div>
            <span className="text-gray-400 font-medium">Loading events...</span>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col justify-center items-center gap-4 py-20 px-6 rounded-3xl bg-red-500/5 border border-red-500/20"
          >
            <AlertTriangle className="text-red-400" size={40} />
            <span className="text-red-300 font-medium">{error}</span>
          </motion.div>
        )}

        {/* Event Cards */}
        {!loading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {events.map((event, i) => (
              <TiltCard key={event.id} className="h-full">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="group relative h-full overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#0a0a1a]/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500"
                >
                  {/* Banner */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={
                        event.banner_url ||
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
                      }
                      alt={event.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Category badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-5 left-5"
                    >
                      <span className="px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 text-xs font-medium backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                        {event.category}
                      </span>
                    </motion.div>

                    {/* Top glow line on hover */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-purple-400 uppercase tracking-widest font-semibold">
                        {event.type}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Globe size={12} />
                        Virtual
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-bold leading-tight text-white/95 group-hover:text-white transition-colors">
                      {event.title}
                    </h3>

                    <p className="mt-4 text-gray-400 line-clamp-3 leading-relaxed text-sm">
                      {event.description}
                    </p>

                    {/* Stats */}
                    <div className="mt-7 space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="p-2 rounded-lg bg-cyan-500/10">
                          <CalendarDays size={14} className="text-cyan-400" />
                        </div>
                        {new Date(event.start_time).toLocaleString()}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="p-2 rounded-lg bg-purple-500/10">
                          <Users size={14} className="text-purple-400" />
                        </div>
                        {event.attendees_count || 0} attending
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-8">
                      <MagneticButton
                       className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-300"

                        onClick={()=>{

                        if(joinedEvents.includes(event.event_no!)){

                        startEvent(event.event_no!);
                      
                        }else{
                        handleJoinEvent(event.event_no!);
                        }}}>
                        {
                        joinedEvents.includes(event.event_no!)
                        ?
                        "Continue Event"
                        :
                        "Join Event"
                        }
                    </MagneticButton>

                    {
showJoinModal && selectedEvent && (

<div
className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/70
backdrop-blur-md
"
>


<motion.div

initial={{
scale:0.8,
opacity:0
}}

animate={{
scale:1,
opacity:1
}}

className="
w-[90%]
max-w-md
rounded-3xl
bg-[#0b1020]
border
border-white/10
p-8
text-center
shadow-2xl
"

>


<div
className="
text-5xl
mb-4
"
>
🎉
</div>


<h2
className="
text-2xl
font-bold
"
>
Event Joined Successfully
</h2>


<p
className="
text-gray-400
mt-3
"
>
You are ready to begin your learning journey.
</p>



<div
className="
flex
gap-3
mt-8
"
>


<button

onClick={()=>startEvent(selectedEvent)}

className="
flex-1
py-3
rounded-xl
bg-gradient-to-r
from-cyan-500
to-purple-500
font-semibold
"

>

🚀 Start Event

</button>



<button

onClick={()=>setShowJoinModal(false)}

className="
flex-1
py-3
rounded-xl
bg-white/10
border
border-white/10
"

>

Go Back

</button>


</div>


</motion.div>


</div>

)
}
                      {/* <MagneticButton
                        onClick={() => handleJoinEvent(event.event_no!)}
                        className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-300"
                      >
                        Join Event
                      </MagneticButton> */}

                      <Link href={`/events2/${event.event_no}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
                        >
                          View
                        </motion.button>
                      </Link>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-cyan-500/[0.07] via-transparent to-purple-500/[0.07]" />
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        )}
      </section>

      {/* ================= TIMELINE ================= */}

      <section className="relative px-6 mt-32 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20">
            <Clock className="text-pink-400" size={20} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Upcoming Timeline
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line with animated glow */}
          <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-pink-500/50">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>

          <div className="space-y-8 pl-12">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[41px] top-6">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 shadow-[0_0_25px_rgba(34,211,238,0.6)] flex items-center justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 8, scale: 1.01 }}
                  className="rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl p-6 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300 group-hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-white/90 group-hover:text-white transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
                        <CalendarDays size={14} className="text-cyan-400" />
                        {new Date(event.start_time).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium"
                    >
                      {event.category}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-32" />
    </div>
  );
}

// broo i nee dur hlep in upgrading dis event page with 1. iff a user press join event show den a popup saying u have successfuuly joined dis event shit.. and an d den  a2 btn 1. btn = strt evnt 2= go back whne strt is press now go to di srotue:events1/:id/ai id of devent den after dat if d uers comeback to event page instead of seeing join evnt now see continue exvent.. the  clikc go t o d same orute
// is it clear..
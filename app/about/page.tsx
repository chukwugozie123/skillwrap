"use client"
import React, { useRef } from "react";
// import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import {
  Sparkles,
  Brain,
  Users,
  MessageCircle,
  Compass,
  ShieldCheck,
  Rocket,
  Zap,
  Globe,
  Trophy,
  Calendar,
  Target,
  Heart,
  ArrowRight,
  Play,
  Star,
  TrendingUp,
  Award,
  BookOpen,
  Lightbulb,
  Share2,
} from "lucide-react";


// ---------- Animation Variants ----------
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 90, damping: 16 },
  },
} as const;

const floatVariants = {
  animate: {
    y: [0, -25, 0],
    transition: { duration: 7, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.4, 0.75, 0.4],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
  },
};

// ---------- Mouse-reactive card ----------
function GlowCard({
  children,
  className = "",
  glow = "rgba(6,182,212,0.25)",
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, ${glow}, transparent 70%)`;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mouseX.set(-200);
        mouseY.set(-200);
      }}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div
        style={{ background }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ---------- Shimmer divider ----------
function ShimmerDivider({ color = "cyan" }: { color?: string }) {
  const colors: Record<string, string> = {
    cyan: "via-cyan-500/60",
    purple: "via-purple-500/60",
    blue: "via-blue-500/60",
    pink: "via-pink-500/60",
    green: "via-emerald-500/60",
  };
  return (
    <div className="max-w-4xl mx-auto mb-24 relative">
      <div className={`h-px bg-gradient-to-r from-transparent ${colors[color]} to-transparent`} />
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 h-px w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
      />
    </div>
  );
}

export default function SkillWarpAboutUs() {
// function SkillWarpAboutUs() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);

  // Parallax for hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);

  // Mouse parallax for hero orbs
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 20 });
  const smy = useSpring(my, { stiffness: 50, damping: 20 });
  const orb1X = useTransform(smx, [-1, 1], [-30, 30]);
  const orb1Y = useTransform(smy, [-1, 1], [-30, 30]);
  const orb2X = useTransform(smx, [-1, 1], [25, -25]);
  const orb2Y = useTransform(smy, [-1, 1], [25, -25]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    mx.set(x);
    my.set(y);
  };

  const teamMembers = [
    { name: "Jane Doe", role: "CEO & Founder", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "John Smith", role: "CTO", img: "https://randomuser.me/api/portraits/men/33.jpg" },
    { name: "Alice Johnson", role: "Community Manager", img: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "Michael Lee", role: "Lead Developer", img: "https://randomuser.me/api/portraits/men/66.jpg" },
  ];

  const stats = [
    { value: "50K+", label: "Active Learners", icon: Users },
    { value: "120+", label: "Live Events", icon: Calendar },
    { value: "10K+", label: "Skills Exchanged", icon: Share2 },
    { value: "98%", label: "Satisfaction", icon: Heart },
  ];

  const ecosystemFeatures = [
    { icon: BookOpen, title: "Learn Anything", desc: "From coding to cooking, music to marketing — access skills from real people who have mastered them.", gradient: "from-cyan-500 to-blue-500" },
    { icon: Lightbulb, title: "Teach Anything", desc: "Share your expertise with eager learners. Your knowledge becomes someone else's breakthrough.", gradient: "from-purple-500 to-pink-500" },
    { icon: Share2, title: "Exchange Skills", desc: "Trade what you know for what you want to learn. No money needed — just mutual growth.", gradient: "from-blue-500 to-purple-500" },
    { icon: Globe, title: "Global Ecosystem", desc: "Connect with learners and teachers worldwide. Break geographical barriers to knowledge.", gradient: "from-pink-500 to-orange-500" },
  ];

  const eventFeatures = [
    { icon: Trophy, title: "Hackathons & Challenges", desc: "Compete, collaborate, and showcase your skills in exciting community-driven competitions with real prizes and recognition." },
    { icon: Calendar, title: "Live Learning Sessions", desc: "Join real-time workshops, masterclasses, and skill-sharing sessions hosted by community experts and industry professionals." },
    { icon: Target, title: "Skill Sprints", desc: "Intensive short-term learning programs designed to help you master specific skills quickly with community support." },
  ];

  return (
    <main
      onMouseMove={handleMouseMove}
      className="min-h-screen w-full bg-[#030814] text-white overflow-x-hidden relative antialiased"
      style={{ fontFamily: "'Josefin Sans', system-ui, sans-serif" }}
    >
      {/* ===== GLOBAL BACKGROUND ===== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(30,64,175,0.25),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(124,58,237,0.18),_transparent_55%)]" />

        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          variants={floatVariants}
          animate="animate"
          className="absolute top-[8%] left-[5%] w-[640px] h-[640px] bg-blue-600/25 rounded-full blur-[160px]"
        />
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          variants={floatVariants}
          animate="animate"
          className="absolute top-[35%] right-[5%] w-[520px] h-[520px] bg-purple-600/25 rounded-full blur-[160px]"
        />
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="absolute bottom-[15%] left-[15%] w-[420px] h-[420px] bg-cyan-500/20 rounded-full blur-[130px]"
        />
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="absolute top-[60%] right-[28%] w-[320px] h-[320px] bg-pink-500/15 rounded-full blur-[110px]"
        />

        {/* Animated grid */}
        <motion.div
          animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(125,211,252,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
            initial={{
              x: `${(i * 53) % 100}%`,
              y: `${(i * 37) % 100}%`,
            }}
            animate={{
              y: ["0%", "-120%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + (i % 5),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear",
            }}
            style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%` }}
          />
        ))}

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(3,8,20,0.8)_100%)]" />
      </div>

      <div className="relative z-10 px-6 md:px-10 py-8">
        {/* ===== BACK BUTTON ===== */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex items-center mb-8"
        >
          <button
            onClick={() => router.back()}
            className="group relative px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]"
          >
            <span className="relative z-10 flex items-center gap-2 text-gray-300 group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>

        {/* ===== HERO ===== */}
        <motion.section
          ref={heroRef}
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative mb-32"
        >
          <div className="max-w-6xl mx-auto text-center space-y-8">
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-xl relative overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </motion.div>
                <span className="text-sm text-cyan-200 font-medium relative z-10">
                  The Future of Learning is Here
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
            >
              <span className="block bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                Welcome to
              </span>
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="block mt-2 bg-[linear-gradient(90deg,#22d3ee,#3b82f6,#a855f7,#22d3ee)] bg-[length:200%_auto] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(6,182,212,0.4)]"
              >
                SkillWarp
              </motion.span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300/90 max-w-4xl mx-auto leading-relaxed"
            >
              A <span className="text-cyan-400 font-semibold">community-powered global ecosystem</span> where
              people <span className="text-purple-400">learn anything</span>,{" "}
              <span className="text-blue-400">teach anything</span>, and{" "}
              <span className="text-pink-400">exchange skills</span> — all in one place.
              Join the movement reshaping how the world learns together.
            </motion.p>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 pt-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.07, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/25 to-blue-500/25">
                    <stat.icon className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Hero image */}
            <motion.div variants={itemVariants} className="relative pt-8">
              <div className="relative rounded-3xl overflow-hidden group max-w-4xl mx-auto">
                <motion.div
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-40"
                />
                <div className="relative rounded-3xl overflow-hidden border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030814] via-transparent to-transparent z-10" />
                  <motion.img
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.8 }}
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
                    alt="SkillWarp Community"
                    className="w-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 cursor-pointer shadow-[0_0_40px_rgba(6,182,212,0.4)]"
                    >
                      <Play className="w-8 h-8 text-white fill-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <ShimmerDivider color="cyan" />

        {/* ===== WHY SKILLWARP ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4 backdrop-blur-xl">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-4 tracking-tight">
              Why SkillWarp Exists
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The vision that drives everything we build
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlowCard
              glow="rgba(168,85,247,0.2)"
              className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-2xl"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  SkillWarp was born from a simple but powerful belief:{" "}
                  <span className="text-white font-semibold">everyone has something valuable to teach, and everyone has something they want to learn.</span>
                </p>
                <p>
                  Traditional education puts knowledge behind paywalls, certificates, and rigid structures. We saw a different way.
                  A teenager in Jakarta learning guitar from a musician in Nashville. A retiree in London teaching woodworking to a creator in Tokyo. Skills flowing freely across borders, cultures, and generations.
                </p>
                <p>
                  We are not just building a platform —{" "}
                  <span className="text-cyan-400 font-semibold">we are building a movement where human potential is unlocked through connection.</span>
                </p>
                <p>
                  This is SkillWarp. This is the future of learning.{" "}
                  <span className="text-purple-400 font-semibold">And you are part of it.</span>
                </p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl" />
            </GlowCard>
          </motion.div>
        </motion.section>

        <ShimmerDivider color="blue" />

        {/* ===== ECOSYSTEM ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-4 backdrop-blur-xl">
              The Platform
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent mb-4 tracking-tight">
              The SkillWarp Ecosystem
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              One unified platform for all your learning and teaching needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {ecosystemFeatures.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <GlowCard
                  glow="rgba(6,182,212,0.22)"
                  className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_25px_60px_-15px_rgba(6,182,212,0.25)] h-full"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg shadow-cyan-500/20`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <ShimmerDivider color="purple" />

        {/* ===== EVENTS ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-pink-500/10 text-pink-300 border border-pink-500/20 mb-4 backdrop-blur-xl">
              Community Events
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-300 via-orange-300 to-pink-300 bg-clip-text text-transparent mb-4 tracking-tight">
              Events, Challenges & Live Learning
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Our vibrant event ecosystem brings the community together for real-time learning, competitions, and collaborative growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {eventFeatures.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <GlowCard
                  glow="rgba(236,72,153,0.22)"
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-2xl transition-all duration-500 hover:border-pink-400/40 hover:shadow-[0_25px_60px_-15px_rgba(236,72,153,0.25)] h-full"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="p-3 rounded-xl bg-gradient-to-br from-pink-500/25 to-orange-500/25 inline-block mb-4"
                  >
                    <feature.icon className="w-6 h-6 text-pink-300" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-10">
            <motion.a
              href="/events"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500/20 to-orange-500/20 border border-pink-500/30 text-pink-200 font-medium backdrop-blur-xl hover:shadow-[0_0_40px_rgba(236,72,153,0.3)] transition-all"
            >
              <Calendar className="w-5 h-5" />
              Explore Upcoming Events
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.section>

        <ShimmerDivider color="green" />

        {/* ===== CORE FEATURES ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-4 backdrop-blur-xl">
              Platform Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent mb-4 tracking-tight">
              Core Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to learn, teach, and grow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: "Skill Exchange", desc: "Offer a skill you have mastered and request one you want to learn. No money — just pure value exchange between passionate people.", color: "blue" },
              { icon: MessageCircle, title: "Private Skill Chats", desc: "Learn in focused one-on-one or small group chat rooms. Share resources, get feedback, and collaborate in real-time.", color: "green" },
              { icon: Compass, title: "Skill Discovery", desc: "Explore thousands of skills shared by our global community. Smart matching aligns you with perfect learning partners.", color: "purple" },
            ].map((f, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -10 }}>
                <GlowCard
                  glow="rgba(16,185,129,0.22)"
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-2xl transition-all duration-500 hover:border-emerald-400/40 hover:shadow-[0_25px_60px_-15px_rgba(16,185,129,0.25)] h-full"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -10 }}
                    className={`p-3 rounded-xl inline-block mb-4 bg-gradient-to-br ${
                      f.color === "blue" ? "from-blue-500/25 to-cyan-500/25"
                      : f.color === "green" ? "from-emerald-500/25 to-teal-500/25"
                      : "from-purple-500/25 to-pink-500/25"
                    }`}
                  >
                    <f.icon className={`w-6 h-6 ${
                      f.color === "blue" ? "text-blue-300"
                      : f.color === "green" ? "text-emerald-300"
                      : "text-purple-300"
                    }`} />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-200 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <ShimmerDivider color="purple" />

        {/* ===== AI GUIDANCE ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4 backdrop-blur-xl">
              AI-Powered
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-4 flex items-center gap-3 tracking-tight">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <Brain className="w-10 h-10 text-purple-300" />
              </motion.div>
              AI Guidance
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
              SkillWarp uses AI as a <span className="text-purple-400 font-semibold">learning assistant</span>, not a replacement for human connection.
              Our AI helps you navigate your journey while keeping human-to-human exchange at the heart of everything.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: "Personalized Roadmaps", desc: "AI generates step-by-step learning paths tailored to your goals, experience, and available time.", color: "purple" },
              { icon: Rocket, title: "Smart Direction", desc: "Our AI analyzes your interests and goals to recommend the perfect next step in your growth journey.", color: "blue" },
              { icon: MessageCircle, title: "Communication Boost", desc: "AI-powered suggestions help improve clarity in your exchanges with real-time tips for better teaching.", color: "green" },
            ].map((f, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -10 }}>
                <GlowCard
                  glow="rgba(168,85,247,0.22)"
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-2xl transition-all duration-500 hover:border-purple-400/40 hover:shadow-[0_25px_60px_-15px_rgba(168,85,247,0.25)] h-full"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className={`p-3 rounded-xl inline-block mb-4 bg-gradient-to-br ${
                      f.color === "purple" ? "from-purple-500/25 to-pink-500/25"
                      : f.color === "blue" ? "from-blue-500/25 to-cyan-500/25"
                      : "from-emerald-500/25 to-teal-500/25"
                    }`}
                  >
                    <f.icon className={`w-6 h-6 ${
                      f.color === "purple" ? "text-purple-300"
                      : f.color === "blue" ? "text-blue-300"
                      : "text-emerald-300"
                    }`} />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <ShimmerDivider color="blue" />

        {/* ===== TEAM ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-4 backdrop-blur-xl">
              The Humans Behind SkillWarp
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent mb-4 tracking-tight">
              Meet Our Team
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Passionate builders dedicated to democratizing education worldwide
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -14, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <GlowCard
                  glow="rgba(59,130,246,0.25)"
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-2xl text-center transition-all duration-500 hover:border-blue-400/40 hover:shadow-[0_25px_60px_-15px_rgba(59,130,246,0.3)]"
                >
                  <div className="relative w-28 h-28 mx-auto mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-70 blur-md transition-opacity"
                    />
                    <img
                      src={member.img}
                      alt={member.name}
                      className="relative rounded-full w-28 h-28 object-cover border-2 border-white/20 group-hover:border-cyan-400/60 transition-all"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-200 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{member.role}</p>
                  <div className="flex justify-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {[Star, Award, TrendingUp].map((Icon, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -3, scale: 1.2 }}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <Icon className="w-4 h-4 text-gray-300" />
                      </motion.div>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <ShimmerDivider color="cyan" />

        {/* ===== TRUST ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <GlowCard
              glow="rgba(6,182,212,0.2)"
              className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-2xl"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
              <div className="flex items-start gap-6 flex-col md:flex-row">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/25 to-blue-500/25 flex-shrink-0"
                >
                  <ShieldCheck className="w-8 h-8 text-cyan-300" />
                </motion.div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-4 tracking-tight">
                    Trust & Community Standards
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    SkillWarp is built on a foundation of <span className="text-cyan-400 font-semibold">respect, honesty, and accountability</span>.
                    Every member of our community agrees to uphold these values.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Fake skills, spam, harassment, and abuse are not tolerated. Our moderation systems — both AI-powered and human —
                    work around the clock to protect genuine learners and teachers.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl" />
            </GlowCard>
          </motion.div>
        </motion.section>

        {/* ===== FINAL CTA ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-2xl overflow-hidden"
          >
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/25 rounded-full blur-[110px]"
            />
            <motion.div
              animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/25 rounded-full blur-[110px]"
            />
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
            />

            <div className="relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-6"
              >
                <Zap className="w-12 h-12 text-cyan-300 drop-shadow-[0_0_20px_rgba(6,182,212,0.7)]" />
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="bg-[linear-gradient(90deg,#22d3ee,#3b82f6,#a855f7,#22d3ee)] bg-[length:200%_auto] bg-clip-text text-transparent"
                >
                  Join the SkillWarp Movement
                </motion.span>
              </h2>

              <p className="text-gray-300 mb-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                SkillWarp is more than a platform — it is a <span className="text-cyan-400 font-semibold">global movement</span>.
                Your skills matter. Your knowledge can change someone&apos;s life.
                <span className="text-purple-400 font-semibold"> Be part of the future of learning.</span>
              </p>

              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(6,182,212,0.5)]"
              >
                <span className="relative z-10">Get Started Today</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </motion.a>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}

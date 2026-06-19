"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, Sparkles, ArrowRight, Play, Heart, Users, Globe, TrendingUp, Award, Zap, MessageCircle, Crown, CheckCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

/* ───────────────────────────────────────────────────────── */
/* DATA                                                      */
/* ───────────────────────────────────────────────────────── */
type Testimonial = {
  name: string;
  role: string;
  text: string;
  gradient: string;
  rating: number;
  tag: string;
  achievement?: string;
  avatar?: string;
};

const ALL: Testimonial[] = [
  {
    name: "Aria Chen",
    role: "Product Designer · Berlin",
    text: "SkillWrap completely changed how I learn. I traded UI mentoring for React lessons and shipped my first SaaS in 6 weeks. The community is incredibly supportive.",
    gradient: "from-cyan-400 to-blue-600",
    rating: 5,
    tag: "Design ↔ Code",
    achievement: "Launched SaaS",
  },
  {
    name: "Marcus Diallo",
    role: "Music Producer · Lagos",
    text: "The community feels alive. Every match is genuine, every exchange teaches me something new. It's pure magic. I've collaborated with producers from 12 countries.",
    gradient: "from-purple-500 to-pink-500",
    rating: 5,
    tag: "Music ↔ Branding",
    achievement: "12 country collabs",
  },
  {
    name: "Lina Park",
    role: "Founder · Seoul",
    text: "I learned business strategy from a real founder while teaching Korean. No money, just pure value. This platform helped me pivot my startup successfully.",
    gradient: "from-emerald-400 to-cyan-500",
    rating: 5,
    tag: "Languages ↔ Strategy",
    achievement: "Successful pivot",
  },
  {
    name: "Diego Romero",
    role: "Filmmaker · Mexico City",
    text: "I cracked motion design in two weeks by swapping color grading lessons. The cards, the matches — everything just flows. Now I run a creative studio.",
    gradient: "from-amber-400 to-rose-500",
    rating: 5,
    tag: "Editing ↔ Motion",
    achievement: "Started studio",
  },
  {
    name: "Yuki Tanaka",
    role: "Engineer · Tokyo",
    text: "Finally a place where curiosity is the currency. I teach Rust and learn watercolor. Best decision of my year. My side projects have never looked better.",
    gradient: "from-indigo-500 to-purple-500",
    rating: 5,
    tag: "Code ↔ Art",
    achievement: "Creative coder",
  },
  {
    name: "Naomi West",
    role: "Coach · London",
    text: "I built a side-business through skills I traded here. The quality of creators on SkillWrap is unmatched. Made £40k in my first year teaching online.",
    gradient: "from-pink-500 to-rose-500",
    rating: 5,
    tag: "Fitness ↔ Marketing",
    achievement: "£40k revenue",
  },
  {
    name: "Jonas Berg",
    role: "Indie hacker · Stockholm",
    text: "It feels like Discord, Linear and a community college had a beautiful baby. I'm obsessed. Shipped three products using skills I learned here.",
    gradient: "from-sky-400 to-indigo-500",
    rating: 5,
    tag: "Code ↔ Design",
    achievement: "3 products shipped",
  },
  {
    name: "Priya Mehta",
    role: "Illustrator · Mumbai",
    text: "I taught illustration, learned Webflow and built my portfolio site in a weekend. Insane ROI on time. Now I get clients from around the world.",
    gradient: "from-fuchsia-500 to-purple-500",
    rating: 5,
    tag: "Art ↔ Web",
    achievement: "Global clients",
  },
];

const successStats = [
  { label: "Skills Exchanged", value: "120,000+", icon: Zap },
  { label: "Active Creators", value: "48,000+", icon: Users },
  { label: "Countries", value: "92", icon: Globe },
  { label: "Avg. Rating", value: "4.9/5", icon: Star },
];

const successStories = [
  { title: "Jobs Landed", count: "2,840+", description: "Members hired through skill connections" },
  { title: "Startups Launched", count: "340+", description: "Founders who met co-founders here" },
  { title: "Friendships Built", count: "12,000+", description: "Meaningful connections made" },
  { title: "Revenue Generated", count: "$4.2M+", description: "By creators on the platform" },
];

/* ───────────────────────────────────────────────────────── */
/* COMPONENTS                                                */
/* ───────────────────────────────────────────────────────── */
function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-[360px] sm:w-[400px] shrink-0 bg-[#0b0e1a]/90 backdrop-blur-xl rounded-3xl p-6 mx-3 overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all duration-500 group"
    >
      {/* Top glow line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Background glow */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Quote icon */}
      <motion.div
        animate={{ rotate: isHovered ? 12 : 0 }}
        className="absolute top-5 right-5"
      >
        <Quote className="text-white/10 group-hover:text-cyan-300/20 transition-colors duration-300" size={48} />
      </motion.div>

      {/* Rating */}
      <div className="flex items-center gap-1.5 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <Star size={14} className="text-amber-400" fill="currentColor" />
          </motion.div>
        ))}
        <span className="ml-2 text-xs text-white/50">Verified</span>
      </div>

      {/* Quote text */}
      <p className="text-white/80 leading-relaxed text-[15px] relative z-10">
        &quot;{t.text}&quot;
      </p>

      {/* Achievement badge */}
      {t.achievement && (
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30">
          <Award size={12} className="text-emerald-400" />
          <span className="text-xs text-emerald-300 font-medium">{t.achievement}</span>
        </div>
      )}

      {/* Profile */}
      <div className="mt-6 flex items-center gap-4">
        <div className="relative">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.gradient} shadow-lg`} />
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#0b0e1a] grid place-items-center">
            <CheckCircle size={10} className="text-white" />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white">{t.name}</div>
          <div className="text-xs text-white/50 truncate">{t.role}</div>
        </div>
        <span className="text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-200 shrink-0">
          {t.tag}
        </span>
      </div>
    </motion.div>
  );
}

function MarqueeRow({ items, reverse = false, speed = 40 }: { items: Testimonial[]; reverse?: boolean; speed?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#05060f] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#05060f] to-transparent z-10" />
      <motion.div
        className="flex"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={i} t={t} index={i % items.length} />
        ))}
      </motion.div>
    </div>
  );
}

function LiveCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 2000;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.floor(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, inView]);

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
      {val.toLocaleString()}{suffix}
    </div>
  );
}

/* ───────────────────────────────────────────────────────── */
/* MAIN COMPONENT                                            */
/* ───────────────────────────────────────────────────────── */
export default function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative px-6 lg:px-20 py-32 border-t border-white/5 overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70rem] h-[70rem] rounded-full bg-purple-600/10 blur-[200px]" />
        <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-cyan-500/10 blur-[150px] animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-pink-500/10 blur-[150px] animate-pulse" style={{ animationDuration: "10s", animationDelay: "-4s" }} />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 text-xs uppercase tracking-[0.15em] text-pink-200 mb-6"
          >
            <Heart size={12} className="text-pink-400" fill="currentColor" />
            Loved by creators worldwide
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl lg:text-6xl font-black tracking-tight">
            Real people. <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Real exchanges.</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Real growth.</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-white/60 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            Thousands of creators are already swapping skills, building friendships and unlocking
            opportunities they never thought possible. Join the movement.
          </motion.p>

          {/* Rating badge */}
          <motion.div
            variants={itemVariants}
            className="mt-8 inline-flex items-center gap-6 bg-[#0b0e1a]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4"
          >
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="text-amber-400" fill="currentColor" />
              ))}
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-left">
              <span className="font-bold text-white text-lg">4.9/5</span>
              <span className="text-white/50 text-sm ml-2">from 12,400+ reviews</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonial rows */}
        <div className="space-y-4">
          <MarqueeRow items={ALL.slice(0, 4)} speed={50} />
          <MarqueeRow items={ALL.slice(4)} reverse speed={55} />
        </div>

        {/* Success Stories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 text-xs uppercase tracking-[0.15em] text-emerald-200 mb-4">
              <TrendingUp size={12} />
              Community wins
            </div>
            <h3 className="text-3xl lg:text-4xl font-black">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Success stories</span> that inspire
            </h3>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {successStories.map((story, i) => (
              <motion.div
                key={story.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative bg-[#0b0e1a]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {story.count}
                  </div>
                  <div className="text-white font-semibold mt-2">{story.title}</div>
                  <div className="text-xs text-white/50 mt-1">{story.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {successStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <stat.icon size={24} className="mx-auto text-cyan-400 mb-3" />
              <div className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs uppercase tracking-wider text-white/50 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Video testimonial placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20" />
          <div className="relative bg-[#0b0e1a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs text-white/70 mb-4">
                  <Play size={12} className="text-cyan-400" />
                  Video testimonial
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  Hear from our <span className="text-gradient-brand">top creators</span>
                </h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  Watch how Sarah went from zero design skills to landing a senior UX role at a top tech company — all through skill exchanges on SkillWrap.
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors text-sm font-medium"
                >
                  <Play size={16} className="text-cyan-400" />
                  Watch Sarah&apos;s story
                </motion.button>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10">
                <div className="absolute inset-0 grid place-items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 grid place-items-center cursor-pointer"
                  >
                    <Play size={28} className="text-white ml-1" fill="currentColor" />
                  </motion.div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600" />
                  <div>
                    <div className="text-sm font-semibold">Sarah Kim</div>
                    <div className="text-xs text-white/50">UX Designer · SF</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 relative"
        >
          {/* Glow backdrop */}
          <div className="absolute inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/30 via-blue-600/30 to-purple-600/30 blur-3xl" />

          <div className="relative bg-[#0b0e1a]/80 backdrop-blur-xl rounded-[2.5rem] p-10 lg:p-16 text-center overflow-hidden border border-white/10">
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-600/5 to-purple-600/5" />
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] rounded-full bg-cyan-500/15 blur-[180px]" />

            {/* Floating particles */}
            <div className="pointer-events-none absolute inset-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-cyan-400/60"
                  style={{ left: `${(i * 47 + 13) % 100}%`, top: `${(i * 73 + 7) % 100}%` }}
                  animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: (i % 5) * 0.5 }}
                />
              ))}
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-xs uppercase tracking-[0.15em] text-cyan-200 mb-6"
              >
                <Crown size={12} className="text-amber-400" />
                Join the movement
              </motion.div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Your next skill is <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">one swap away.</span>
              </h3>

              <p className="text-white/60 mt-6 max-w-xl mx-auto text-lg leading-relaxed">
                Join 48,000+ creators turning curiosity into momentum. It&apos;s free, it&apos;s friendly, it&apos;s the
                start of something big.
              </p>

              {/* Online users */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="flex -space-x-3">
                  {["from-cyan-400 to-blue-500", "from-purple-500 to-pink-500", "from-emerald-400 to-cyan-500", "from-amber-400 to-rose-500"].map((g, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full bg-gradient-to-br ${g} ring-2 ring-[#0b0e1a]`} />
                  ))}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-300 text-sm font-medium">2,847 online now</span>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(6, 182, 212, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold text-lg shadow-xl shadow-cyan-500/25"
                >
                  Join SkillWrap free
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-white font-medium"
                >
                  <MessageCircle size={18} />
                  Talk to community
                </motion.button>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
                <span className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400" />
                  Setup in 60 seconds
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400" />
                  Cancel anytime
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
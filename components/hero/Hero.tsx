// "use client"

// export default function Page() {
//   return (
//     <main className="flex min-h-screen items-center justify-center bg-black px-6 text-neutral-400">
//       <div className="flex w-full max-w-md flex-col items-start gap-8">
//         <svg
//           fill="currentColor"
//           viewBox="0 0 147 70"
//           xmlns="http://www.w3.org/2000/svg"
//           aria-hidden="true"
//           className="size-10 text-white"
//         >
//           <path d="M56 50.2031V14H70V60.1562C70 65.5928 65.5928 70 60.1562 70C57.5605 70 54.9982 68.9992 53.1562 67.1573L0 14H19.7969L56 50.2031Z" />
//           <path d="M147 56H133V23.9531L100.953 56H133V70H96.6875C85.8144 70 77 61.1856 77 50.3125V14H91V46.1562L123.156 14H91V0H127.312C138.186 0 147 8.81439 147 19.6875V56Z" />
//         </svg>

//         <div className="space-y-3">
//           <h1 className="text-balance text-2xl font-semibold tracking-tight text-white">
//             To get started, describe what you want to build.
//           </h1>
//           <p className="text-pretty text-sm leading-relaxed text-neutral-500">
//             This is the default page for a fresh v0 project. Open the prompt and
//             tell v0 what to create, or browse the{' '}
//             <a
//               href="https://v0.app/templates"
//               target="_blank"
//               rel="noreferrer"
//               className="text-neutral-300 underline underline-offset-4 hover:text-white"
//             >
//               Community
//             </a>{' '}
//             for inspiration.
//           </p>
//         </div>
//       </div>
//     </main>
//   )
// }
'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Star,
  Zap,
  Globe,
  Users,
  TrendingUp,
  Play,
  BookOpen,
  GraduationCap,
  Repeat,
  Heart,
  Calendar,
  MessageCircle,
  Award,
  Activity,
  Cpu,
  Crown,
  CheckCircle,
  ChevronRight,
  Quote,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ───────────────────────────────────────────────────────── */
/* DATA                                                      */
/* ───────────────────────────────────────────────────────── */
const stats = [
  { label: 'Active Creators', value: 48000, suffix: '+', icon: Users },
  { label: 'Skills Exchanged', value: 120000, suffix: '+', icon: Repeat },
  { label: 'Countries', value: 92, suffix: '', icon: Globe },
  { label: 'Avg. Rating', value: 4.9, suffix: '/5', decimals: 1, icon: Star },
];

const liveActivities = [
  { user: 'Aria', action: 'started learning', skill: 'React', time: '2m ago', gradient: 'from-cyan-400 to-blue-600' },
  { user: 'Marcus', action: 'is teaching', skill: 'Music Production', time: '5m ago', gradient: 'from-purple-500 to-pink-500' },
  { user: 'Lina', action: 'exchanged', skill: 'Korean ↔ Strategy', time: '8m ago', gradient: 'from-emerald-400 to-cyan-500' },
  { user: 'Diego', action: 'joined event', skill: 'Motion Design', time: '12m ago', gradient: 'from-amber-400 to-rose-500' },
];

const trendingSkills = [
  'AI/ML',
  'Figma',
  'React',
  'Motion Design',
  'No-Code',
  '3D Modeling',
  'Copywriting',
  'Data Science',
  'UI/UX',
  'Python',
  'Video Editing',
  'Photography',
  'Music',
  'Marketing',
  'Languages',
  'Web3',
];

const upcomingEvents = [
  { title: 'Design Systems Workshop', host: 'Sarah K.', attendees: 128, time: 'Today, 3PM' },
  { title: 'React Masterclass', host: 'Alex M.', attendees: 256, time: 'Tomorrow, 2PM' },
];

const testimonials = [
  {
    name: 'Aria Chen',
    role: 'Product Designer · Berlin',
    text: 'SkillWrap completely changed how I learn. I traded UI mentoring for React lessons and shipped my first SaaS in 6 weeks.',
    gradient: 'from-cyan-400 to-blue-600',
    rating: 5,
    tag: 'Design ↔ Code',
    achievement: 'Launched SaaS',
  },
  {
    name: 'Marcus Diallo',
    role: 'Music Producer · Lagos',
    text: 'The community feels alive. Every match is genuine, every exchange teaches me something new. Collaborated with producers from 12 countries.',
    gradient: 'from-purple-500 to-pink-500',
    rating: 5,
    tag: 'Music ↔ Branding',
    achievement: '12 country collabs',
  },
  {
    name: 'Lina Park',
    role: 'Founder · Seoul',
    text: 'I learned business strategy from a real founder while teaching Korean. This platform helped me pivot my startup successfully.',
    gradient: 'from-emerald-400 to-cyan-500',
    rating: 5,
    tag: 'Languages ↔ Strategy',
    achievement: 'Successful pivot',
  },
  {
    name: 'Diego Romero',
    role: 'Filmmaker · Mexico City',
    text: 'I cracked motion design in two weeks by swapping color grading lessons. Now I run a creative studio.',
    gradient: 'from-amber-400 to-rose-500',
    rating: 5,
    tag: 'Editing ↔ Motion',
    achievement: 'Started studio',
  },
];

const successStories = [
  { count: '120K+', title: 'Skills Exchanged', description: 'Real value swapped globally' },
  { count: '48K+', title: 'Active Creators', description: 'Growing every single day' },
  { count: '92', title: 'Countries', description: 'Building worldwide community' },
  { count: '4.9★', title: 'Avg Rating', description: 'Trusted & verified exchanges' },
];

const successStats = [
  { label: 'Exchanges Today', value: '342', icon: Repeat },
  { label: 'Active Learners', value: '12.8K', icon: Users },
  { label: 'Skills Available', value: '2.8K', icon: BookOpen },
  { label: 'Community Rating', value: '4.9/5', icon: Star },
];

/* ───────────────────────────────────────────────────────── */
/* COMPONENTS                                                */
/* ───────────────────────────────────────────────────────── */
function Counter({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 2200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return (
    <span>
      {val.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

function MagneticButton({
  children,
  variant = 'primary',
  className = '',
  size = 'default',
  href,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'secondary';
  className?: string;
  size?: 'default' | 'large';
  href?: string;
}) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const baseClasses = size === 'large' ? 'px-10 py-5 text-base' : 'px-7 py-3.5 text-sm';

  const variantClasses = {
    primary: 'text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40',
    secondary: 'text-white bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40',
    ghost: 'text-white/90 bg-white/5 border border-white/10 hover:border-cyan-300/40 hover:bg-white/10',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const r = (e.currentTarget as any).getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref as any}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove as any}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      href={href}
      className={`group relative inline-flex items-center gap-2 ${baseClasses} rounded-full font-semibold tracking-wide overflow-hidden transition-all duration-300 ${variantClasses[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <motion.span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </Component>
  );
}

function FloatingPanel({
  className,
  children,
  delay = 0,
  floatIntensity = 10,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  floatIntensity?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, -floatIntensity, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-2xl blur-xl -z-10" />
        <div className="bg-[#0d1021]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/50">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

function LiveActivityFeed() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % liveActivities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-12 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center gap-3"
        >
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${liveActivities[current].gradient}`} />
          <div className="text-sm">
            <span className="font-semibold text-white">{liveActivities[current].user}</span>
            <span className="text-white/60"> {liveActivities[current].action} </span>
            <span className="text-cyan-300">{liveActivities[current].skill}</span>
          </div>
          <span className="text-xs text-white/40">{liveActivities[current].time}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SkillMarquee() {
  const doubled = [...trendingSkills, ...trendingSkills];
  return (
    <div className="relative overflow-hidden py-4">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#05060f] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#05060f] to-transparent z-10" />
      <motion.div
        className="flex gap-3"
        animate={{ x: [0, -50 * trendingSkills.length] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="shrink-0 px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 text-white/70 hover:border-cyan-400/50 hover:text-cyan-300 transition-all cursor-pointer"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SpotlightEffect() {
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      spotlightX.set(e.clientX);
      spotlightY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [spotlightX, spotlightY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 opacity-50"
      style={{
        background: useTransform(
          [spotlightX, spotlightY],
          ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(6, 182, 212, 0.06), transparent 40%)`
        ),
      }}
    />
  );
}

function TestimonialCard({ t, index }: { t: (typeof testimonials)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#0b0e1a]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 flex-shrink-0 w-96"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

      <motion.div
        animate={{ rotate: isHovered ? 12 : 0 }}
        className="absolute top-5 right-5"
      >
        <Quote className="text-white/10 group-hover:text-cyan-300/20 transition-colors duration-300" size={48} />
      </motion.div>

      <div className="flex items-center gap-1.5 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={14} className="text-amber-400" fill="currentColor" />
        ))}
        <span className="ml-2 text-xs text-white/50">Verified</span>
      </div>

      <p className="text-white/80 leading-relaxed text-[15px] relative z-10">
        &quot;{t.text}&quot;
      </p>

      {t.achievement && (
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30">
          <Award size={12} className="text-emerald-400" />
          <span className="text-xs text-emerald-300 font-medium">{t.achievement}</span>
        </div>
      )}

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

/* ───────────────────────────────────────────────────────── */
/* MAIN PAGE                                                 */
/* ───────────────────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useTransform(my, [0, 1], [6, -6]);
  const ry = useTransform(mx, [0, 1], [-6, 6]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="min-h-screen bg-[#05060f] text-white overflow-hidden">
      {/* HERO SECTION */}
      <section
        ref={heroRef}
        onMouseMove={(e) => {
          const r = heroRef.current!.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        className="relative min-h-screen overflow-hidden pt-24 pb-20 px-6 lg:px-20"
      >
        <SpotlightEffect />

        {/* Animated background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-[-20%] left-[-15%] w-[50rem] h-[50rem] rounded-full bg-cyan-500/20 blur-[200px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-[10%] right-[-20%] w-[55rem] h-[55rem] rounded-full bg-purple-600/20 blur-[200px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '-3s' }} />
          <div className="absolute bottom-[-20%] left-[15%] w-[50rem] h-[50rem] rounded-full bg-blue-600/20 blur-[200px] animate-pulse" style={{ animationDuration: '9s', animationDelay: '-5s' }} />
          <div className="absolute bottom-[5%] right-[10%] w-[35rem] h-[35rem] rounded-full bg-pink-500/15 blur-[180px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '-2s' }} />
        </div>

        {/* Particles */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {Array.from({ length: 50 }).map((_, i) => {
            const left = (i * 47 + 13) % 100;
            const top = (i * 73 + 7) % 100;
            const dur = 5 + ((i * 7) % 6);
            const size = 1 + (i % 3);
            return (
              <motion.span
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: size,
                  height: size,
                  background: i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#a855f7' : '#3b82f6',
                }}
                animate={{ y: [0, -40, 0], opacity: [0.1, 0.8, 0.1] }}
                transition={{ duration: dur, repeat: Infinity, delay: (i % 8) * 0.5 }}
              />
            );
          })}
        </div>

        {/* Navigation */}
        <nav className="relative z-10 max-w-7xl mx-auto flex items-center justify-between mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 grid place-items-center shadow-lg shadow-cyan-500/30">
                <Sparkles size={20} className="text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#05060f] animate-pulse" />
            </div>
            <span className="text-2xl font-bold tracking-tight">SkillWrap</span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-10 text-sm text-white/70">
            {[
              { label: 'Learn', href: '/exchange-dashboard' },
              { label: 'Exchange', href: '/exchange-dashboard' },
              { label: 'Community', href: '/community' },
              { label: 'Dashboard', href: '/exchange-dashboard' },
            ].map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="relative hover:text-white transition group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              2,847 online now
            </motion.div>
            <MagneticButton variant="ghost" className="!px-5 !py-2.5" href="/settings">
              Sign in
            </MagneticButton>
          </div>
        </nav>

        {/* Main content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left column */}
          <div className="lg:col-span-7">
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-xs uppercase tracking-[0.15em] text-cyan-200">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Open Beta
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                <Crown size={12} className="text-amber-400" />
                48,000+ creators joined
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black leading-[0.92] tracking-tight">
              <span className="block">Learn. Teach.</span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Exchange. Grow.
              </span>
              <span className="block mt-2 text-white/90">Together.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-8 text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed"
            >
              SkillWrap is where <span className="text-cyan-300">creators</span>, <span className="text-blue-300">builders</span>, and <span className="text-purple-300">dreamers</span> connect to swap knowledge.
              From design and code to music and languages — turn what you know into opportunity.
              <span className="text-white font-medium"> The future of learning is human.</span>
            </motion.p>

            {/* Live activity */}
            <motion.div variants={itemVariants} className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
                <Activity size={12} className="text-emerald-400" />
                Live activity
              </div>
              <LiveActivityFeed />
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton size="large" href="/exchange-dashboard">
                <BookOpen size={18} />
                Start Learning Free
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton variant="secondary" size="large" href="/request-learning">
                <GraduationCap size={18} />
                Teach a Skill
              </MagneticButton>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-4 flex flex-wrap gap-3">
              <MagneticButton variant="ghost" href="/exchange-dashboard">
                <Repeat size={14} />
                Explore Exchanges
              </MagneticButton>
              <MagneticButton variant="ghost">
                <Play size={14} className="fill-white" />
                Watch Demo (60s)
              </MagneticButton>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center gap-6">
              <div className="flex -space-x-3">
                {['from-cyan-400 to-blue-500', 'from-purple-500 to-pink-500', 'from-emerald-400 to-cyan-500', 'from-amber-400 to-rose-500', 'from-indigo-500 to-purple-500'].map((g, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${g} ring-2 ring-[#05060f] shadow-lg`}
                  />
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 }}
                  className="w-10 h-10 rounded-full bg-white/10 ring-2 ring-[#05060f] grid place-items-center text-xs font-semibold"
                >
                  +48k
                </motion.div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  <span className="ml-2 text-white font-semibold">4.9</span>
                </div>
                <div className="text-sm text-white/60">Loved by 48,000+ makers worldwide</div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded-2xl p-4 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <Icon size={16} className="text-cyan-400 mb-2" />
                      <div className="text-2xl font-black">
                        <Counter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-white/50 mt-1">{s.label}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right visual */}
          <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }} className="lg:col-span-5 relative h-[600px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              {/* Glow backdrop */}
              <div className="absolute inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/30 via-blue-600/30 to-purple-600/30 blur-3xl" />

              {/* Main card */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-[#0b0e1a]/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-600/5" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                <div className="relative p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between text-xs mb-4">
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live Exchange
                    </span>
                    <span className="text-white/50">Today · 14:32</span>
                  </div>

                  {/* Profile */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/30" />
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#0b0e1a] grid place-items-center">
                        <CheckCircle size={10} className="text-white" />
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">Aria Chen</div>
                      <div className="text-sm text-white/60">Teaching UI Design</div>
                      <div className="text-xs text-cyan-300 mt-1">wants React lessons</div>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[
                      { icon: Zap, label: 'Figma Pro', value: 'Expert', color: 'from-cyan-400 to-blue-500' },
                      { icon: Globe, label: 'Speaks', value: '3 languages', color: 'from-purple-400 to-pink-500' },
                      { icon: Users, label: 'Exchanges', value: '240 total', color: 'from-emerald-400 to-cyan-500' },
                      { icon: Award, label: 'Rating', value: '4.9/5 stars', color: 'from-amber-400 to-rose-500' },
                    ].map(({ icon: Icon, label, value, color }) => (
                      <div key={label} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} grid place-items-center shadow-lg`}>
                            <Icon size={14} className="text-white" />
                          </span>
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-white/50">{label}</div>
                            <div className="text-sm font-medium">{value}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Match */}
                  <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                    <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
                      <Cpu size={12} className="text-cyan-400" />
                      AI Match Score
                    </div>
                    <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '94%' }}
                        transition={{ duration: 1.8, delay: 0.5, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                      </motion.div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">94%</span>
                      <span className="text-xs text-white/50">Perfect match for your goals</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-auto w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
                  >
                    Connect & Exchange
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Floating panels */}
              <FloatingPanel className="-left-8 top-16 w-56" delay={0.5}>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 grid place-items-center shadow-lg">
                    <MessageCircle size={16} className="text-white" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">+12 new matches</div>
                    <div className="text-xs text-white/60">in your area</div>
                  </div>
                </div>
              </FloatingPanel>

              <FloatingPanel className="-right-6 top-32 w-52" delay={0.8}>
                <div className="text-xs text-white/60 mb-2">Trending now</div>
                <div className="font-semibold">Motion Design</div>
                <div className="mt-2 flex items-center gap-2 text-emerald-300 text-xs">
                  <TrendingUp size={12} />
                  +84% this week
                </div>
              </FloatingPanel>

              <FloatingPanel className="-left-4 bottom-24 w-60" delay={1.1}>
                <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
                  <Calendar size={12} />
                  Upcoming event
                </div>
                <div className="font-semibold text-sm">{upcomingEvents[0].title}</div>
                <div className="mt-1 text-xs text-white/60">
                  by {upcomingEvents[0].host} · {upcomingEvents[0].attendees} attending
                </div>
              </FloatingPanel>

              <FloatingPanel className="-right-8 bottom-16 w-48" delay={1.4} floatIntensity={8}>
                <div className="flex items-center gap-2">
                  <Heart size={14} className="text-pink-400" />
                  <span className="text-sm font-medium">2,847 online</span>
                </div>
                <div className="text-xs text-white/60 mt-1">exchanging skills now</div>
              </FloatingPanel>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Skill marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative z-10 mt-16 max-w-7xl mx-auto"
        >
          <div className="text-center text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Popular skills being exchanged</div>
          <SkillMarquee />
        </motion.div>

        {/* Brand strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="relative z-10 mt-16 max-w-7xl mx-auto">
          <div className="text-center text-xs uppercase tracking-[0.3em] text-white/40 mb-6">Trusted by teams & creators from</div>
          <div className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#05060f] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#05060f] to-transparent z-10" />
            <motion.div
              className="flex gap-16 whitespace-nowrap text-2xl font-bold text-white/20"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {[...Array(2)].flatMap(() =>
                ['Framer', 'Linear', 'Vercel', 'Figma', 'Notion', 'Discord', 'Spotify', 'Stripe', 'GitHub', 'Loom'].map((b, i) => (
                  <span key={`${b}-${i}`} className="hover:text-white/40 transition">
                    {b}
                  </span>
                ))
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* CSS for shimmer */}
        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
        `}</style>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="relative px-6 lg:px-20 py-32 border-t border-white/5 overflow-hidden">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70rem] h-[70rem] rounded-full bg-purple-600/10 blur-[200px]" />
          <div className="absolute top-10 left-10 w-80 h-80 rounded-full bg-cyan-500/10 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-pink-500/10 blur-[150px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '-4s' }} />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 text-xs uppercase tracking-[0.15em] text-pink-200 mb-6"
            >
              <Heart size={12} className="text-pink-400" fill="currentColor" />
              Loved by creators worldwide
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-black tracking-tight"
            >
              Real people. <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Real exchanges.</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Real growth.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white/60 mt-6 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              Thousands of creators are already swapping skills, building friendships and unlocking opportunities they never thought possible. Join the movement.
            </motion.p>

            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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

          {/* Testimonials */}
          <div className="flex gap-4 mb-4 overflow-x-auto pb-4">
            {testimonials.slice(0, 2).map((t, i) => (
              <TestimonialCard key={i} t={t} index={i} />
            ))}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {testimonials.slice(2).map((t, i) => (
              <TestimonialCard key={i + 2} t={t} index={i + 2} />
            ))}
          </div>

          {/* Success Stories */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative bg-[#0b0e1a]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{story.count}</div>
                    <div className="text-white font-semibold mt-2">{story.title}</div>
                    <div className="text-xs text-white/50 mt-1">{story.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {successStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <stat.icon size={24} className="mx-auto text-cyan-400 mb-3" />
                <div className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs uppercase tracking-wider text-white/50 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative px-6 lg:px-20 py-24 border-t border-white/5 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70rem] h-[70rem] rounded-full bg-cyan-600/10 blur-[200px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative"
        >
          {/* Glow backdrop */}
          <div className="absolute inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/30 via-blue-600/30 to-purple-600/30 blur-3xl" />

          <div className="relative bg-[#0b0e1a]/80 backdrop-blur-xl rounded-[2.5rem] p-10 lg:p-16 text-center overflow-hidden border border-white/10">
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

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
                Join 48,000+ creators turning curiosity into momentum. It&apos;s free, it&apos;s friendly, it&apos;s the start of something big.
              </p>

              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="flex -space-x-3">
                  {['from-cyan-400 to-blue-500', 'from-purple-500 to-pink-500', 'from-emerald-400 to-cyan-500', 'from-amber-400 to-rose-500'].map((g, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full bg-gradient-to-br ${g} ring-2 ring-[#0b0e1a]`} />
                  ))}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-300 text-sm font-medium">2,847 online now</span>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <MagneticButton size="large" href="/exchange-dashboard">
                  Join SkillWrap free
                  <ArrowRight size={20} />
                </MagneticButton>
                <MagneticButton variant="ghost" href="/community">
                  <MessageCircle size={18} />
                  Talk to community
                </MagneticButton>
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
      </section>
    </div>
  );
}
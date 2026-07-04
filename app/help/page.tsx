"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ChevronDown,
  Sparkles,
  Play,
  Search,
  Send,
  MessageCircle,
  GraduationCap,
  Users,
  Shield,
  Target,
  Brain,
  Trophy,
  Zap,
  ArrowRight,
  Clock,
  CheckCircle,
  BookOpen,
  Lightbulb,
  Globe,
  Heart,
  AlertCircle,
  Video,
  HelpCircle,
  Rocket,
  Star,
  Award,
  TrendingUp,
  Lock,
  Eye,
  Flag,
  X,
  LucideIcon,
  Compass,
} from "lucide-react";
import { useState, useRef } from "react";

// ============ TYPES ============
interface FAQItem {
  q: string;
  a: React.ReactNode;
  icon?: LucideIcon;
}

interface FAQCategory {
  title: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  items: FAQItem[];
}

// ============ ANIMATION VARIANTS ============
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const floatVariants = {
  animate: {
    y: [0, -20, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

// ============ FLOATING ORB ============
function FloatingOrb({
  color,
  size,
  delay,
  duration,
  x,
  y,
}: {
  color: string;
  size: string;
  delay: number;
  duration: number;
  x: string;
  y: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-[100px] pointer-events-none"
      style={{
        background: color,
        width: size,
        height: size,
        left: x,
        top: y,
      }}
      animate={{
        y: [0, -40, 0],
        x: [0, 30, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// ============ FLOATING PARTICLE ============
function FloatingParticle({ delay, left }: { delay: number; left: string }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        left,
        background: "radial-gradient(circle, rgba(34,211,238,0.8), transparent)",
      }}
      animate={{
        y: ["0vh", "-120vh"],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 12 + delay * 2,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    />
  );
}

// ============ GLOW CARD ============
function GlowCard({
  children,
  className = "",
  glowColor = "rgba(34,211,238,0.2)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>
      {children}
    </motion.div>
  );
}

// ============ SHIMMER DIVIDER ============
function ShimmerDivider({ color = "cyan" }: { color?: string }) {
  const colors: Record<string, string> = {
    cyan: "via-cyan-500/40",
    purple: "via-purple-500/40",
    blue: "via-blue-500/40",
  };

  return (
    <div className="max-w-5xl mx-auto my-20 relative">
      <div className={`h-px bg-gradient-to-r from-transparent ${colors[color]} to-transparent`} />
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-white/70 to-transparent"
      />
    </div>
  );
}

// ============ FAQ ACCORDION ============
function FAQAccordion({
  faqs,
  categoryColor,
}: {
  faqs: FAQItem[];
  categoryColor: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="group"
        >
          <GlowCard glowColor={categoryColor} className="rounded-xl">
            <div className="relative bg-slate-900/60 border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/20">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  {faq.icon && (
                    <faq.icon className="w-5 h-5 text-slate-400" />
                  )}
                  <span className="font-semibold text-white">{faq.q}</span>
                </div>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-slate-300 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </GlowCard>
        </motion.div>
      ))}
    </div>
  );
}

// ============ CATEGORY CARD ============
function CategoryCard({
  category,
  isActive,
  onClick,
}: {
  category: FAQCategory;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full p-4 rounded-xl border backdrop-blur-xl transition-all duration-300 text-left ${
        isActive
          ? "bg-gradient-to-br " + category.gradient + " border-white/20"
          : "bg-slate-900/40 border-white/10 hover:border-white/20"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2.5 rounded-lg ${
            isActive ? "bg-white/20" : "bg-white/10"
          }`}
        >
          <category.icon className={`w-5 h-5 ${isActive ? "text-white" : category.color}`} />
        </div>
        <span
          className={`font-semibold text-sm ${
            isActive ? "text-white" : "text-slate-300"
          }`}
        >
          {category.title}
        </span>
      </div>
    </motion.button>
  );
}

// ============ STEP CARD ============
function StepCard({
  step,
  icon: Icon,
  title,
  description,
  gradient,
}: {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: step * 0.15 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative"
    >
      <GlowCard glowColor="rgba(34,211,238,0.15)" className="h-full rounded-2xl">
        <div className="relative h-full p-6 bg-slate-900/70 border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden group">
          {/* Step number */}
          <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center">
            <span className="text-lg font-bold text-cyan-400">{step}</span>
          </div>

          {/* Icon */}
          <div
            className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} mb-4 shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{description}</p>

          {/* Bottom glow */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </GlowCard>
    </motion.div>
  );
}

// ============ MAIN COMPONENT ============
export default function HelpCenterPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const categories: FAQCategory[] = [
    {
      title: "Getting Started",
      icon: Rocket,
      color: "text-cyan-400",
      gradient: "from-cyan-500/20 to-blue-500/20",
      items: [
        {
          q: "What is SkillWarp?",
          a: "SkillWarp is a community-powered global ecosystem where people learn anything, teach anything, and exchange skills — all in one place. Instead of paying for courses, you trade your knowledge with others who have the skills you want to learn.",
          icon: Sparkles,
        },
        {
          q: "What problem does SkillWarp solve?",
          a: (
            <div className="space-y-2">
              <p>Traditional education is expensive, rigid, and often inaccessible. SkillWarp solves this by:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Removing financial barriers to learning</li>
                <li>Connecting you directly with skilled mentors</li>
                <li>Creating a fair exchange system based on mutual value</li>
                <li>Making learning social and engaging</li>
              </ul>
            </div>
          ),
          icon: Target,
        },
        {
          q: "How do I create my skill profile?",
          a: (
            <div className="space-y-2">
              <p>Setting up your profile is easy:</p>
              <ol className="list-decimal list-inside space-y-1 text-slate-400">
                <li>Sign up for a free account</li>
                <li>Go to your Profile Settings</li>
                <li>Add skills you can teach (your expertise)</li>
                <li>Add skills you want to learn (your goals)</li>
                <li>Write a short bio about yourself</li>
                <li>Upload a profile picture</li>
              </ol>
            </div>
          ),
          icon: Users,
        },
        {
          q: "Can beginners use SkillWarp?",
          a: "Absolutely! SkillWarp is designed for everyone, from complete beginners to experts. The AI roadmap feature is especially helpful for beginners — it breaks down any skill into manageable steps. Plus, many users love teaching beginners because they bring fresh perspectives and enthusiasm.",
          icon: Lightbulb,
        },
        {
          q: "Is SkillWarp free?",
          a: "Yes! SkillWarp is completely free. We believe learning should never be locked behind money. The entire platform — skill discovery, matching, chatting, AI roadmaps — is available at no cost.",
          icon: Heart,
        },
      ],
    },
    {
      title: "Skill Exchange",
      icon: MessageCircle,
      color: "text-purple-400",
      gradient: "from-purple-500/20 to-pink-500/20",
      items: [
        {
          q: "How do skill exchanges work?",
          a: (
            <div className="space-y-2">
              <p>The exchange process is simple:</p>
              <ol className="list-decimal list-inside space-y-1 text-slate-400">
                <li>Browse skills shared by other users</li>
                <li>Select a skill you want to learn</li>
                <li>Click "Request Exchange"</li>
                <li>The other user reviews your request</li>
                <li>Once accepted, a private chat room opens</li>
                <li>Start learning together in real-time</li>
              </ol>
            </div>
          ),
          icon: Send,
        },
        {
          q: "How do I add skills I can teach?",
          a: (
            <div className="space-y-2">
              <p>Sharing your expertise:</p>
              <ol className="list-decimal list-inside space-y-1 text-slate-400">
                <li>Go to the Skills section in your dashboard</li>
                <li>Click "Add New Skill"</li>
                <li>Choose a category and enter the skill name</li>
                <li>Describe what you can teach and your experience level</li>
                <li>Set your availability for teaching sessions</li>
                <li>Publish to make it discoverable</li>
              </ol>
            </div>
          ),
          icon: BookOpen,
        },
        {
          q: "How do I find someone to learn from?",
          a: (
            <div className="space-y-2">
              <p>Discover your perfect mentor:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Use the Discover page to browse all available skills</li>
                <li>Filter by category, skill type, or availability</li>
                <li>Use the AI to get personalized recommendations</li>
                <li>Check user profiles and reviews before requesting</li>
              </ul>
            </div>
          ),
          icon: Search,
        },
        {
          q: "How does skill matching work?",
          a: "Our system analyzes your profile, skills you want to learn, and skills you can teach. It then suggests optimal matches — people who want to learn what you can teach AND can teach what you want to learn. This creates balanced, fair exchanges where both parties benefit equally.",
          icon: Target,
        },
        {
          q: "What happens after an exchange request is accepted?",
          a: (
            <div className="space-y-2">
              <p>Once accepted, several things happen:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>A private chat room is automatically created</li>
                <li>You receive a unique room code for access</li>
                <li>You can start messaging and sharing resources</li>
                <li>Schedule live sessions within the chat</li>
                <li>Track your learning progress together</li>
                <li>Earn XP and achievements as you learn</li>
              </ul>
            </div>
          ),
          icon: CheckCircle,
        },
        {
          q: "Can I have multiple exchanges at once?",
          a: "Each user has a limited number of active exchanges to keep the system fair and ensure quality learning experiences. Finish or cancel an exchange to unlock more slots. This prevents users from being overwhelmed and ensures everyone gets dedicated attention.",
          icon: Zap,
        },
        {
          q: "Can I cancel or decline an exchange?",
          a: "Yes. You can decline incoming requests if you're not available or the fit isn't right. You can also cancel sent requests before they're accepted. Once an exchange is active, you can end it early if needed, though we encourage completing what you start for the best experience.",
          icon: X,
        },
      ],
    },
    {
      title: "AI Features",
      icon: Brain,
      color: "text-blue-400",
      gradient: "from-blue-500/20 to-indigo-500/20",
      items: [
        {
          q: "How does the AI Roadmap feature work?",
          a: (
            <div className="space-y-2">
              <p>The AI roadmap creates personalized learning paths:</p>
              <ol className="list-decimal list-inside space-y-1 text-slate-400">
                <li>Enter any skill you want to learn</li>
                <li>AI analyzes the skill and breaks it into levels</li>
                <li>Generates beginner → intermediate → advanced steps</li>
                <li>Includes suggested resources and milestones</li>
                <li>Updates based on your progress</li>
                <li>Matches you with mentors for each stage</li>
              </ol>
            </div>
          ),
          icon: Lightbulb,
        },
        {
          q: "Does the AI replace real teachers?",
          a: "No. The AI is a guide, not a replacement. It helps structure your learning journey, suggests resources, and provides direction — but real skill exchange happens between humans. The AI enhances the experience; it doesn't replace the human connection that makes SkillWarp special.",
          icon: Heart,
        },
        {
          q: "How does AI help me find the right skills?",
          a: "Based on your interests, selected skills, and learning goals, the AI suggests relevant skills you might not have considered. It also helps identify prerequisites, related skills, and optimal learning sequences to maximize your growth.",
          icon: Target,
        },
        {
          q: "Is my data used to train the AI?",
          a: "Your private messages and personal data are never used to train our AI. The AI feature analyzes only your public profile, listed skills, and stated learning goals to provide personalized recommendations. Privacy is fundamental to SkillWarp.",
          icon: Lock,
        },
      ],
    },
    {
      title: "Account & Safety",
      icon: Shield,
      color: "text-emerald-400",
      gradient: "from-emerald-500/20 to-teal-500/20",
      items: [
        {
          q: "Is my data safe?",
          a: "Yes. Your personal data is encrypted and protected. We never sell your information to third parties. The AI features operate on public profile data only — your private messages remain private. We follow industry-standard security practices.",
          icon: Lock,
        },
        {
          q: "How does SkillWarp keep users safe?",
          a: (
            <div className="space-y-2">
              <p>We maintain safety through multiple layers:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Email verification for all accounts</li>
                <li>AI-powered moderation of public content</li>
                <li>Human moderation team reviewing reports</li>
                <li>Blocking and reporting features</li>
                <li>Private chat rooms with controlled access</li>
                <li>Clear community guidelines and consequences</li>
              </ul>
            </div>
          ),
          icon: Shield,
        },
        {
          q: "How do I report bad behaviour?",
          a: (
            <div className="space-y-2">
              <p>Report any issues immediately:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Click the flag/report button on any profile or message</li>
                <li>Provide details about the incident</li>
                <li>Our moderation team reviews within 24 hours</li>
                <li>Serious violations result in account suspension</li>
                <li>You can block users from contacting you</li>
              </ul>
            </div>
          ),
          icon: Flag,
        },
        {
          q: "Who can see my skills?",
          a: "All registered users can discover your skills through the Discover page and search. Your skills are public to enable matching. However, only users you accept for exchanges can message you directly. You have full control over who you connect with.",
          icon: Eye,
        },
      ],
    },
    {
      title: "Learning Progress",
      icon: TrendingUp,
      color: "text-amber-400",
      gradient: "from-amber-500/20 to-orange-500/20",
      items: [
        {
          q: "How do achievements and XP work?",
          a: (
            <div className="space-y-2">
              <p>Earn recognition for your learning journey:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Earn XP for every exchange you complete</li>
                <li>Get bonus XP for excellent reviews</li>
                <li>Unlock achievements for milestones</li>
                <li>Streak bonuses for consecutive learning days</li>
                <li>Level up your profile with accumulated XP</li>
                <li>Special badges for community contributions</li>
              </ul>
            </div>
          ),
          icon: Trophy,
        },
        {
          q: "How do I improve my profile visibility?",
          a: (
            <div className="space-y-2">
              <p>Get more exchange requests:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Complete your profile fully</li>
                <li>Add detailed skill descriptions</li>
                <li>Upload a professional profile picture</li>
                <li>Complete exchanges and earn positive reviews</li>
                <li>Maintain high response rates</li>
                <li>Earn achievements and display them proudly</li>
              </ul>
            </div>
          ),
          icon: Star,
        },
        {
          q: "Can I learn multiple skills?",
          a: "Absolutely! You can add as many skills to learn as you want. The AI helps you prioritize them into a learning path. You can have multiple active exchanges for different skills simultaneously (within your exchange limit). Many users learn complementary skills in parallel.",
          icon: BookOpen,
        },
        {
          q: "What if I'm not satisfied with a learning experience?",
          a: (
            <div className="space-y-2">
              <p>Your satisfaction matters:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Leave honest feedback after exchanges</li>
                <li>You can end exchanges early if needed</li>
                <li>Try another mentor for the same skill</li>
                <li>Report serious issues to moderation</li>
                <li>Read reviews before accepting requests</li>
              </ul>
            </div>
          ),
          icon: AlertCircle,
        },
      ],
    },
  ];

  const steps = [
    {
      icon: Search,
      title: "Discover",
      description: "Browse thousands of skills shared by our global community. Use AI to find your perfect learning match.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Send,
      title: "Request Exchange",
      description: "Send a request to teach or learn. Our smart matching ensures balanced, fair exchanges.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: MessageCircle,
      title: "Connect",
      description: "Once accepted, enter your private skill room. Share resources, chat in real-time, and build connections.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: GraduationCap,
      title: "Learn Together",
      description: "Teach and learn in focused sessions. Use AI roadmaps to guide your progress and track milestones.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Trophy,
      title: "Grow & Achieve",
      description: "Earn XP, unlock achievements, and watch your skills expand. Every exchange grows your portfolio.",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#030b1a] via-[#0a1628] to-[#030b1a] text-white overflow-x-hidden relative">
      {/* ============ ANIMATED BACKGROUND ============ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030b1a] via-[#0a1628] to-[#030b1a]" />

        {/* Radial gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(30,58,138,0.3),_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(88,28,135,0.2),_transparent_50%)]" />

        {/* Floating orbs */}
        <FloatingOrb
          color="rgba(34,211,238,0.15)"
          size="500px"
          delay={0}
          duration={15}
          x="5%"
          y="10%"
        />
        <FloatingOrb
          color="rgba(168,85,247,0.12)"
          size="400px"
          delay={2}
          duration={18}
          x="70%"
          y="40%"
        />
        <FloatingOrb
          color="rgba(16,185,129,0.1)"
          size="350px"
          delay={4}
          duration={20}
          x="20%"
          y="70%"
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.8} left={`${(i * 5) % 100}%`} />
        ))}

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147,197,253,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147,197,253,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(3,11,26,0.8)_100%)]" />
      </div>

      {/* ============ CONTENT ============ */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 py-6">
        {/* ===== NAVIGATION ===== */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-10"
        >
          <a
            href="/"
            className="group flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-xl hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4 rotate-180 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm text-white font-medium">Back to Home</span>
          </a>
        </motion.nav>

        {/* ===== HERO SECTION ===== */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative mb-20 text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-400/30 backdrop-blur-xl">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-200 font-medium">Help & Learning Center</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="block bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              How SkillWarp
            </span>
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="block mt-2 bg-[linear-gradient(90deg,#22d3ee,#3b82f6,#a855f7,#22d3ee)] bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              Works
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-300/90 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Everything you need to learn, teach, and grow with our community.
            From getting started to mastering the platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all"
            >
              <Rocket className="w-5 h-5" />
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#faq"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/15 text-slate-200 font-semibold backdrop-blur-xl hover:border-white/25 transition-all"
            >
              <HelpCircle className="w-5 h-5" />
              Browse FAQ
            </motion.a>
          </motion.div>
        </motion.section>

        {/* ===== VIDEO SECTION ===== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/15 text-purple-300 border border-purple-400/30 text-sm font-medium mb-4">
              <Video className="w-4 h-4" />
              Introduction Video
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              See SkillWarp in Action
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Watch how easy it is to discover skills, connect with mentors, and start your learning journey.
            </p>
          </div>

          <GlowCard glowColor="rgba(168,85,247,0.2)" className="rounded-3xl overflow-hidden">
            <div className="relative aspect-video bg-slate-900/80 border border-white/10 overflow-hidden group">
              {/* Thumbnail */}
              <img
                src="https://images.unsplash.com/photo-1531482615792-6b4f48e5de6d?auto=format&fit=crop&w=1200&q=80"
                alt="SkillWarp Introduction"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

              {/* Play button */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoPlaying(true)}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="p-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_50px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_70px_rgba(168,85,247,0.7)] transition-shadow">
                  <Play className="w-10 h-10 text-white fill-white ml-1" />
                </div>
              </motion.button>

              {/* Duration badge */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
                <span className="text-sm text-white font-medium">3:24</span>
              </div>

              {/* Animated border */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 border-2 border-purple-400/50 rounded-3xl pointer-events-none"
              />
            </div>
          </GlowCard>

          {/* Video features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { icon: Search, label: "Discover Skills" },
              { icon: MessageCircle, label: "Connect & Chat" },
              { icon: Brain, label: "AI Roadmaps" },
              { icon: Trophy, label: "Earn Achievements" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/40 border border-white/5 backdrop-blur-sm"
              >
                <item.icon className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-slate-300">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <ShimmerDivider color="cyan" />

        {/* ===== HOW IT WORKS ===== */}
        <motion.section
          id="how-it-works"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 max-w-6xl mx-auto"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={containerVariants.visible}
            className="text-center mb-14"
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 text-sm font-medium mb-5"
            >
              <Zap className="w-4 h-4" />
              Simple Process
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent mb-4"
            >
              How SkillWarp Works
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-lg max-w-2xl mx-auto"
            >
              Five simple steps to transform how you learn and share knowledge
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <StepCard key={i} step={i + 1} {...step} />
            ))}
          </div>
        </motion.section>

        <ShimmerDivider color="purple" />

        {/* ===== AI SECTION ===== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/30 text-sm font-medium">
                <Brain className="w-4 h-4" />
                AI-Powered Guidance
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Your AI Learning
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"> Assistant</span>
              </h2>

              <p className="text-slate-400 text-lg leading-relaxed">
                SkillWarp uses AI as a <span className="text-cyan-400 font-semibold">learning companion</span>, not a replacement for human connection. Our AI helps you navigate your journey while keeping human-to-human exchange at the heart of everything.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Target, title: "Personalized Roadmaps", desc: "AI generates step-by-step learning paths tailored to your goals" },
                  { icon: Compass, title: "Smart Matching", desc: "Find the perfect mentors based on your learning style and interests" },
                  { icon: BookOpen, title: "Resource Suggestions", desc: "Get curated resources and exercises for each skill level" },
                  { icon: Sparkles, title: "Progress Tracking", desc: "AI monitors your growth and adjusts recommendations" },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-white/5"
                  >
                    <div className="p-2.5 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                      <feature.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-sm text-slate-400">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <GlowCard glowColor="rgba(34,211,238,0.2)" className="rounded-3xl overflow-hidden">
                <div className="relative aspect-square bg-gradient-to-br from-slate-900/90 to-slate-800/50 border border-white/10 backdrop-blur-xl p-8 overflow-hidden">
                  {/* Animated background */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
                  />

                  {/* AI visualization */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="p-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 shadow-[0_0_60px_rgba(34,211,238,0.5)] mb-6"
                    >
                      <Brain className="w-16 h-16 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-2">AI Roadmap</h3>
                    <p className="text-slate-400">Your personalized learning path</p>

                    {/* Sample roadmap */}
                    <div className="mt-8 w-full max-w-xs space-y-3">
                      {["Beginner", "Intermediate", "Advanced"].map((level, i) => (
                        <motion.div
                          key={i}
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.3, duration: 0.8 }}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div className={`w-3 h-3 rounded-full ${
                            i === 0 ? "bg-green-400" : i === 1 ? "bg-yellow-400" : "bg-purple-400"
                          }`} />
                          <span className="text-sm text-slate-300">{level}</span>
                          <div className="flex-1 h-1 rounded-full bg-slate-700">
                            <div
                              className={`h-full rounded-full ${
                                i === 0 ? "bg-green-400 w-full" :
                                i === 1 ? "bg-yellow-400 w-2/3" : "bg-purple-400 w-1/3"
                              }`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </div>
        </motion.section>

        <ShimmerDivider color="blue" />

        {/* ===== COMMUNITY SECTION ===== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 text-sm font-medium mb-5">
              <Users className="w-4 h-4" />
              Global Community
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Learn Together, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Grow Together</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Join thousands of learners and teachers from around the world sharing knowledge freely.
            </p>
          </div>

          {/* Community gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: "https://images.unsplash.com/photo-1523240795612-9a054b8db290?auto=format&fit=crop&w=400&q=80", label: "Coding Workshops" },
              { img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80", label: "Language Exchange" },
              { img: "https://images.unsplash.com/photo-1517486808900-69765dce9417?auto=format&fit=crop&w=400&q=80", label: "Music Lessons" },
              { img: "https://images.unsplash.com/photo-1552664731-d2124257c22e?auto=format&fit=crop&w=400&q-80", label: "Design Sessions" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl overflow-hidden"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full aspect-[3/4] object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-sm text-white font-medium">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { value: "50K+", label: "Active Learners" },
              { value: "120+", label: "Countries" },
              { value: "10K+", label: "Skills Shared" },
              { value: "500K+", label: "Exchanges Completed" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-xl bg-slate-900/40 border border-white/5 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <ShimmerDivider color="purple" />

        {/* ===== FAQ SECTION ===== */}
        <motion.section
          id="faq"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/15 text-purple-300 border border-purple-400/30 text-sm font-medium mb-5">
              <HelpCircle className="w-4 h-4" />
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Got Questions? <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">We've Got Answers</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to know about using SkillWarp
            </p>
          </div>

          {/* Category tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {categories.map((category, i) => (
              <CategoryCard
                key={i}
                category={category}
                isActive={activeCategory === i}
                onClick={() => setActiveCategory(i)}
              />
            ))}
          </div>

          {/* FAQ items */}
          <FAQAccordion
            faqs={categories[activeCategory].items}
            categoryColor={categories[activeCategory].gradient.includes("cyan") ? "rgba(34,211,238,0.2)" : categories[activeCategory].gradient.includes("purple") ? "rgba(168,85,247,0.2)" : categories[activeCategory].gradient.includes("blue") ? "rgba(59,130,246,0.2)" : categories[activeCategory].gradient.includes("emerald") ? "rgba(16,185,129,0.2)" : "rgba(251,191,36,0.2)"}
          />
        </motion.section>

        <ShimmerDivider color="cyan" />

        {/* ===== CONTACT SUPPORT ===== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 max-w-4xl mx-auto"
        >
          <GlowCard glowColor="rgba(34,211,238,0.15)" className="rounded-3xl overflow-hidden">
            <div className="relative p-8 md:p-12 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 border border-white/10 backdrop-blur-xl text-center">
              {/* Background effects */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                className="absolute bottom-0 right-1/4 w-28 h-28 bg-purple-500/20 rounded-full blur-3xl"
              />

              <div className="relative z-10">
                <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 mb-6">
                  <MessageCircle className="w-10 h-10 text-cyan-400" />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Still Have Questions?
                </h2>
                <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                  Can't find what you're looking for? Our support team is here to help you succeed on your learning journey.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all"
                  >
                    <Send className="w-5 h-5" />
                    Contact Support
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                  <motion.a
                    href="/feedback"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/15 text-slate-200 font-semibold backdrop-blur-xl hover:border-white/25 transition-all"
                  >
                    <Heart className="w-5 h-5" />
                    Send Feedback
                  </motion.a>
                </div>
              </div>
            </div>
          </GlowCard>
        </motion.section>

        {/* ===== FOOTER ===== */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-8 border-t border-white/5"
        >
          <p className="text-slate-500 text-sm">
            &copy; 2025 SkillWarp. Made with{" "}
            <Heart className="w-3 h-3 inline text-pink-500" /> for the global learning community.
          </p>
        </motion.footer>
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-slate-900 rounded-2xl overflow-hidden"
            >
              {/* Placeholder for video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                  <p className="text-slate-400">Video player would go here</p>
                  <p className="text-slate-500 text-sm mt-2">Connect your video service to embed content</p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

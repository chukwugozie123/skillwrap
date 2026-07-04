"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Send,
  MessageSquare,
  User,
  AtSign,
  FileText,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Clock,
  Shield,
  Heart,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
  X,
  Loader2,
} from "lucide-react";

// ─── Animation Variants ──────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Aurora Blob Component ───────────────────────────────────────────────────
function AuroraBlob({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.2, 0.5, 0.3, 0.2],
        scale: [0.85, 1.15, 1, 0.85],
        x: [0, 30, -20, 0],
        y: [0, -20, 30, 0],
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    />
  );
}

// ─── Contact Card Component ─────────────────────────────────────────────────
interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
  gradient: string;
  iconBg: string;
  target?: string;
  delay?: number;
}

function ContactCard({ icon, title, value, href, gradient, iconBg, target, delay = 0 }: ContactCardProps) {
  return (
    <motion.a
      href={href}
      target={target}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative block"
    >
      <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500`} />

      <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] backdrop-blur-xl group-hover:border-white/[0.15] transition-all duration-500">
        <div className="flex items-start gap-4">
          <div className={`p-3.5 rounded-xl bg-gradient-to-br ${iconBg} shadow-lg`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-1">{title}</p>
            <p className="text-white font-medium truncate">{value}</p>
          </div>
          <ArrowRight size={18} className="text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </motion.a>
  );
}

// ─── Social Button Component ─────────────────────────────────────────────────
function SocialButton({ href, icon: Icon, label, gradient }: { href: string; icon: React.ElementType; label: string; gradient: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative"
      whileHover={{ scale: 1.15, y: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`absolute -inset-1 rounded-xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-60 blur-lg transition-all duration-500`} />
      <div className="relative w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/20 transition-all duration-300">
        <Icon size={20} />
      </div>
    </motion.a>
  );
}

// ─── FAQ Accordion Item ──────────────────────────────────────────────────────
function FAQItem({ question, answer, isOpen, onClick, index }: { question: string; answer: string; isOpen: boolean; onClick: () => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <button
          onClick={onClick}
          className="relative w-full text-left p-6 bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-white font-semibold">{question}</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <ChevronDown size={20} className="text-cyan-400" />
            </motion.div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="pt-4 text-sm text-white/60 leading-relaxed">{answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}

// ─── Confetti Particle ───────────────────────────────────────────────────────
function ConfettiParticle({ delay, color, x }: { delay: number; color: string; x: string }) {
  return (
    <motion.div
      className={`absolute w-3 h-3 rounded-full ${color}`}
      style={{ left: x }}
      initial={{ y: -100, opacity: 0, scale: 0 }}
      animate={{
        y: [0, 400],
        opacity: [1, 1, 0],
        scale: [0, 1, 0.5],
        rotate: [0, 360],
      }}
      transition={{
        duration: 2,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

// ─── Main Contact Page ───────────────────────────────────────────────────────
export default function ContactPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const [messageLength, setMessageLength] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const maxMessageLength = 500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  // Countdown timer
  useEffect(() => {
    if (submitted && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      router.push("/");
    }
  }, [submitted, countdown, router]);

  const faqItems = [
    {
      question: "How long does it take to receive a reply?",
      answer: "We typically respond within 24-48 hours during business days. For urgent matters, reach out via WhatsApp for faster assistance.",
    },
    {
      question: "Can I become a mentor on SkillWrap?",
      answer: "Absolutely! We're always looking for skilled mentors. Contact us with your area of expertise and experience, and we'll guide you through the onboarding process.",
    },
    {
      question: "How do I report a bug?",
      answer: "Send us a detailed description of the issue, including screenshots and steps to reproduce, via the contact form or email. Our team investigates all reports within 24 hours.",
    },
    {
      question: "How do I host an event on SkillWrap?",
      answer: "Event hosting is available for verified community members. Contact us with your event proposal, and our team will help you set it up and promote it to the community.",
    },
    {
      question: "Can I collaborate with SkillWrap?",
      answer: "We welcome partnerships with organizations, educational institutions, and content creators. Reach out with your collaboration proposal and we'll schedule a discussion.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050810]">
      {/* ── Animated Background ─────────────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050810] via-[#0a1020] to-[#050810]" />

        {/* Aurora blobs */}
        <AuroraBlob
          delay={0}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-600/20 via-cyan-500/15 to-transparent blur-[120px]"
        />
        <AuroraBlob
          delay={5}
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-600/15 via-pink-500/10 to-transparent blur-[100px]"
        />
        <AuroraBlob
          delay={10}
          className="absolute -bottom-40 left-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-teal-500/15 to-cyan-500/10 blur-[100px]"
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-400/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* ── Hero Section ─────────────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16 lg:mb-24"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-xl mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Clock size={14} className="text-cyan-400" />
              </motion.div>
              <span className="text-sm font-semibold text-cyan-300">We're here to help 24/7</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
              />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-6"
            >
              <span className="text-white">Contact{" "}</span>
              {/* <span className="relative inline-block"> */}
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300">
                  SkillWrap
                </span>
                <motion.span
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-4 bg-gradient-to-r from-cyan-500/40 to-emerald-500/40 blur-3xl -z-10"
                />
              </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Have questions, partnership ideas, or feedback? We'd love to hear from you. Our team is ready to help you succeed.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <Shield size={14} className="text-emerald-400" />
                <span className="text-sm text-white/60">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <Clock size={14} className="text-cyan-400" />
                <span className="text-sm text-white/60">Quick Response</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <Heart size={14} className="text-rose-400" />
                <span className="text-sm text-white/60">Passionate Support</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Main Grid ─────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mb-20">
            {/* ── Left Side - Contact Info ───────────────────────────────────── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <motion.div variants={itemVariants} className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-3">Get in Touch</h2>
                <p className="text-white/50 leading-relaxed">
                  Choose your preferred way to reach us. We're always happy to connect.
                </p>
              </motion.div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <ContactCard
                  icon={<Mail size={22} className="text-white" />}
                  title="Email"
                  value="umechefelix@gmail.com"
                  href="mailto:umechefelix@gmail.com"
                  gradient="from-cyan-500/30 to-blue-500/30"
                  iconBg="from-cyan-500 to-blue-600"
                  delay={0.1}
                />

                <ContactCard
                  icon={<MessageCircle size={22} className="text-white" />}
                  title="WhatsApp"
                  value="+234 803 572 8323"
                  href="https://wa.me/2348035728323"
                  gradient="from-emerald-500/30 to-green-500/30"
                  iconBg="from-emerald-500 to-green-600"
                  target="_blank"
                  delay={0.2}
                />

                <ContactCard
                  icon={<Globe size={22} className="text-white" />}
                  title="Website"
                  value="skillwrap2026.vercel.app"
                  href="https://skillwrap2026.vercel.app"
                  gradient="from-purple-500/30 to-pink-500/30"
                  iconBg="from-purple-500 to-pink-600"
                  target="_blank"
                  delay={0.3}
                />

                <ContactCard
                  icon={<MapPin size={22} className="text-white" />}
                  title="Location"
                  value="Nigeria"
                  href="#"
                  gradient="from-amber-500/30 to-orange-500/30"
                  iconBg="from-amber-500 to-orange-600"
                  delay={0.4}
                />
              </div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="pt-6">
                <p className="text-sm font-semibold text-white/50 mb-4">Follow Us</p>
                <div className="flex flex-wrap gap-3">
                  <SocialButton href="https://github.com" icon={Github} label="GitHub" gradient="from-slate-400/30 to-slate-500/30" />
                  <SocialButton href="https://linkedin.com" icon={Linkedin} label="LinkedIn" gradient="from-blue-500/30 to-blue-600/30" />
                  <SocialButton href="https://twitter.com" icon={Twitter} label="X (Twitter)" gradient="from-slate-300/30 to-slate-400/30" />
                  <SocialButton href="https://instagram.com" icon={Instagram} label="Instagram" gradient="from-pink-500/30 to-rose-500/30" />
                  <SocialButton href="https://youtube.com" icon={Youtube} label="YouTube" gradient="from-red-500/30 to-rose-500/30" />
                  <SocialButton href="https://discord.com" icon={MessageCircle} label="Discord" gradient="from-indigo-500/30 to-purple-500/30" />
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right Side - Form ─────────────────────────────────────────── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <motion.div
                variants={itemVariants}
                className="relative rounded-3xl overflow-hidden"
              >
                {/* Form background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-white/[0.01]" />
                <div className="absolute inset-0 border border-white/[0.06] rounded-3xl" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                <div className="relative p-6 sm:p-8 lg:p-10">
                  <motion.div variants={itemVariants} className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/30">
                        <MessageSquare size={20} className="text-cyan-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                    </div>
                    <p className="text-sm text-white/50">Fill out the form and we'll get back to you shortly.</p>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name Field */}
                      <motion.div variants={itemVariants} className="relative group">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                          type="text"
                          required
                          placeholder=" "
                          className="peer w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all duration-300"
                        />
                        <label className="absolute left-12 top-1/2 -translate-y-1/2 text-white/40 text-sm transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-xs">
                          Full Name
                        </label>
                      </motion.div>

                      {/* Email Field */}
                      <motion.div variants={itemVariants} className="relative group">
                        <AtSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                          type="email"
                          required
                          placeholder=" "
                          className="peer w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all duration-300"
                        />
                        <label className="absolute left-12 top-1/2 -translate-y-1/2 text-white/40 text-sm transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-xs">
                          Email Address
                        </label>
                      </motion.div>
                    </div>

                    {/* Subject Field */}
                    <motion.div variants={itemVariants} className="relative group">
                      <FileText size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-cyan-400 transition-colors" />
                      <input
                        type="text"
                        required
                        placeholder=" "
                        className="peer w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all duration-300"
                      />
                      <label className="absolute left-12 top-1/2 -translate-y-1/2 text-white/40 text-sm transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-xs">
                        Subject
                      </label>
                    </motion.div>

                    {/* Message Field */}
                    <motion.div variants={itemVariants} className="relative group">
                      <MessageSquare size={16} className="absolute left-4 top-5 text-white/40 group-focus-within:text-cyan-400 transition-colors" />
                      <textarea
                        required
                        placeholder=" "
                        rows={5}
                        maxLength={maxMessageLength}
                        onChange={(e) => setMessageLength(e.target.value.length)}
                        className="peer w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all duration-300 resize-none"
                      />
                      <label className="absolute left-12 top-5 text-white/40 text-sm transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:text-xs">
                        Your Message
                      </label>
                      <span className={`absolute bottom-3 right-4 text-xs ${messageLength > maxMessageLength * 0.9 ? 'text-amber-400' : 'text-white/30'}`}>
                        {messageLength}/{maxMessageLength}
                      </span>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      variants={itemVariants}
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-xl shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                    >
                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={isSubmitting ? {} : { x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
                      />

                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Loader2 size={20} />
                            </motion.div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={20} />
                            Send Message
                          </>
                        )}
                      </span>
                    </motion.button>
                  </form>

                  {/* Privacy Note */}
                  <motion.p variants={itemVariants} className="text-xs text-white/30 mt-4 text-center">
                    By sending a message, you agree to our Privacy Policy. We never share your data.
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ── FAQ Section ───────────────────────────────────────────────────── */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
                <Sparkles size={14} className="text-purple-400" />
                <span className="text-sm font-semibold text-purple-300">FAQ</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-white/50">Find quick answers to common questions</p>
            </motion.div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {/* ── Success Modal ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-lg"
            >
              {/* Confetti */}
              <div className="absolute inset-0 overflow-visible">
                {[...Array(30)].map((_, i) => (
                  <ConfettiParticle
                    key={i}
                    delay={i * 0.05}
                    color={[
                      "bg-cyan-400",
                      "bg-emerald-400",
                      "bg-purple-400",
                      "bg-pink-400",
                      "bg-blue-400",
                    ][i % 5]}
                    x={`${Math.random() * 100}%`}
                  />
                ))}
              </div>

              {/* Card */}
              <div className="relative rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c1424] to-[#0a0f1c]" />
                <div className="absolute inset-0 border border-white/[0.08] rounded-3xl" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

                <div className="relative p-8 sm:p-12 text-center">
                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                    className="mx-auto mb-6"
                  >
                    <div className="relative w-24 h-24 mx-auto">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/30 to-green-500/20 blur-xl" />
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                        >
                          <CheckCircle2 size={48} className="text-white" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Success Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-white/60 mb-6 max-w-sm mx-auto">
                      Thank you for contacting SkillWrap. Our team will review your message and respond within 24-48 hours.
                    </p>
                  </motion.div>

                  {/* Countdown Progress */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6"
                  >
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-sm text-white/40">Redirecting in</span>
                      <motion.span
                        key={countdown}
                        initial={{ scale: 1.5 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold text-cyan-400"
                      >
                        {countdown}
                      </motion.span>
                      <span className="text-sm text-white/40">seconds</span>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-2 rounded-full bg-white/10 overflow-hidden mx-auto max-w-xs">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 4, ease: "linear" }}
                      />
                    </div>
                  </motion.div>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3"
                  >
                    <motion.button
                      onClick={() => router.push("/")}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/25"
                    >
                      Go Home Now
                    </motion.button>
                    <motion.button
                      onClick={() => setSubmitted(false)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

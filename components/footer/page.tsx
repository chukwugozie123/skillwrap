"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { Hop as Home, Layers, Calendar, Trophy, Users, Briefcase, BookOpen, GraduationCap, Award, FileText, Map, FileQuestionMark as FileQuestion, Building2, Rss, BriefcaseBusiness, Mail, Handshake, Newspaper, Circle as HelpCircle, MessageCircleQuestionMark as MessageCircleQuestion, Shield, Signature as FileSignature, Cookie, Flag, LayoutDashboard, User, Bell, Bookmark, Settings, GitFork as Github, Link as Linkedin, Battery as Twitter, Route as Youtube, Drama as Instagram, Mail as MailIcon, ArrowUp, Heart, Globe, Phone, Clock, CircleCheck as CheckCircle2, Loader as Loader2, Sparkles, Zap, Lock, Globe as Globe2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FooterLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

// ─── Constants ───────────────────────────────────────────────────────────────
const footerSections: FooterSection[] = [
  {
    title: "Platform",
    links: [
      { href: "/", label: "Home", icon: <Home size={14} /> },
      { href: "/skills", label: "Skills", icon: <Layers size={14} /> },
      { href: "/events", label: "Events", icon: <Calendar size={14} /> },
      // { href: "/challenges", label: "Challenges", icon: <Trophy size={14} /> },
      { href: "/community", label: "Community", icon: <Users size={14} /> },
      // { href: "/marketplace", label: "Marketplace", icon: <Briefcase size={14} /> },
    ],
  },
  // {
  //   title: "Learn",
  //   links: [
  //     { href: "/learn", label: "Learn", icon: <BookOpen size={14} /> },
  //     { href: "/teach", label: "Teach", icon: <GraduationCap size={14} /> },
  //     { href: "/mentors", label: "Mentors", icon: <Award size={14} /> },
  //     { href: "/certifications", label: "Certifications", icon: <FileText size={14} /> },
  //     { href: "/roadmaps", label: "Roadmaps", icon: <Map size={14} /> },
  //     { href: "/resources", label: "Resources", icon: <FileQuestion size={14} /> },
  //   ],
  // },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About", icon: <Building2 size={14} /> },
      { href: "/blog", label: "Blog", icon: <Rss size={14} /> },
      { href: "/careers", label: "Careers", icon: <BriefcaseBusiness size={14} /> },
      { href: "/contact", label: "Contact", icon: <Mail size={14} /> },
      // { href: "/partners", label: "Partners", icon: <Handshake size={14} /> },
      // { href: "/press", label: "Press", icon: <Newspaper size={14} /> },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/help", label: "Help Center", icon: <HelpCircle size={14} /> },
      { href: "/contact", label: "Contact", icon: <MessageCircleQuestion size={14} /> },
      { href: "/privacy", label: "Privacy Policy", icon: <Shield size={14} /> },
      { href: "/terms", label: "Terms of Service", icon: <FileSignature size={14} /> },
      // { href: "/cookies", label: "Cookies", icon: <Cookie size={14} /> },
      { href: "/report", label: "Report a Problem", icon: <Flag size={14} /> },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={14} /> },
      { href: "/profile", label: "My Profile", icon: <User size={14} /> },
      { href: "/my-skill", label: "My Skills", icon: <Layers size={14} /> },
      { href: "/notifications-route", label: "Notifications", icon: <Bell size={14} /> },
      // { href: "/saved", label: "Saved Items", icon: <Bookmark size={14} /> },
      { href: "/settings", label: "Settings", icon: <Settings size={14} /> },
    ],
  },
];

const socialLinks = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: Twitter, label: "X (Twitter)" },
  { href: "https://discord.com", icon: MessageCircleQuestion, label: "Discord" },
  { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "mailto:hello@skillwrap.com", icon: MailIcon, label: "Email" },
];

const trustIndicators = [
  { icon: Lock, label: "Secure Platform" },
  { icon: Users, label: "Community Driven" },
  { icon: Globe2, label: "Learn Anywhere" },
];

// ─── Animation Variants ──────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Aurora Blob Component ───────────────────────────────────────────────────
function AuroraBlob({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.2, 0.5, 0.3, 0.2],
        scale: [0.85, 1.15, 1, 0.85],
        x: [0, 20, -15, 0],
        y: [0, -15, 20, 0],
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

// ─── Footer Link Component ───────────────────────────────────────────────────
function FooterLinkItem({ link, index }: { link: FooterLink; index: number }) {
  return (
    <motion.a
      href={link.href}
      className="group flex items-center gap-2.5 text-white/50 hover:text-white transition-colors duration-300"
      variants={itemVariants}
      custom={index}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {link.icon && (
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cyan-400">
          {link.icon}
        </span>
      )}
      <span className="text-sm">{link.label}</span>
    </motion.a>
  );
}

// ─── Social Button Component ─────────────────────────────────────────────────
function SocialButton({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
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
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
      <div className="relative w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-cyan-500/30 group-hover:bg-gradient-to-br group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300">
        <Icon size={18} />
      </div>
    </motion.a>
  );
}

// ─── Newsletter Component ────────────────────────────────────────────────────
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus("success");
    setEmail("");

    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <motion.div
      variants={itemVariants}
      className="relative"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-xl" />

      <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.06] backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-400/30">
            <Sparkles size={18} className="text-cyan-400" />
          </div>
          <div>
            <h4 className="text-white font-bold">Stay Updated</h4>
            <p className="text-xs text-white/40">Get the latest updates directly to your inbox</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <MailIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === "loading"}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all duration-300 text-sm"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "loading" || !email}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              {status === "loading" ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 size={18} />
                </motion.div>
              ) : status === "success" ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 size={18} />
                  <span>Done!</span>
                </motion.div>
              ) : (
                <span>Subscribe</span>
              )}

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "linear" }}
              />
            </motion.button>
          </div>

          <p className="mt-3 text-[11px] text-white/30 flex items-center gap-1.5">
            <Lock size={10} />
            We only send useful updates. No spam.
          </p>
        </form>
      </div>
    </motion.div>
  );
}

// ─── Back to Top Button ──────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#0a1020] to-[#0c1424] border border-white/[0.1] flex items-center justify-center shadow-xl shadow-black/30 group-hover:border-cyan-500/40 transition-colors duration-300">
            <ArrowUp size={20} className="text-white/70 group-hover:text-cyan-400 transition-colors" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Main Footer Component ───────────────────────────────────────────────────
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="relative mt-32 overflow-hidden">
        {/* ── Background Effects ─────────────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Main gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#0a1020] to-[#050810]" />

          {/* Aurora blobs */}
          <AuroraBlob
            delay={0}
            className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-transparent blur-[120px]"
          />
          <AuroraBlob
            delay={5}
            className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-600/12 via-cyan-500/8 to-transparent blur-[100px]"
          />
          <AuroraBlob
            delay={10}
            className="absolute top-20 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-teal-500/10 to-cyan-500/6 blur-[90px]"
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />

          {/* Top border glow */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        </div>

        {/* ── Main Footer Content ───────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8"
        >
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
            {/* Branding Column */}
            <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
              {/* Logo and Name */}
              <div className="space-y-6">
                <motion.a
                  href="/"
                  className="inline-flex items-center gap-4 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-xl shadow-cyan-500/25">
                      <Image
                        src="/favicon.png"
                        alt="SkillWrap"
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-lg object-contain"
                      />
                    </div>
                  </div>
                  <span className="text-2xl font-black bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent">
                    SkillWrap
                  </span>
                </motion.a>

                <p className="text-white/50 leading-relaxed max-w-sm">
                  The global skill exchange platform where learners teach, teachers learn, and everyone grows together.
                </p>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium">
                  <Sparkles size={12} />
                  Built for learners, mentors & creators
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-3">
                {trustIndicators.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                  >
                    <item.icon size={12} className="text-cyan-400" />
                    <span className="text-xs text-white/60">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-3 pt-4">
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">Contact</p>
                <div className="space-y-2">
                  <a href="mailto:hello@skillwrap.com" className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors group">
                    <Mail size={14} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span>hello@skillwrap.com</span>
                  </a>
                  <a href="tel:+1-234-567-8900" className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors group">
                    <Phone size={14} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                    <span>+1 (234) 567-8900</span>
                  </a>
                  <div className="flex items-center gap-3 text-sm text-white/50">
                    <Clock size={14} className="text-cyan-400" />
                    <span>Support: Mon-Fri, 9AM-6PM EST</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Columns - Desktop */}
            <motion.div
              variants={itemVariants}
              className="hidden lg:grid lg:col-span-8 grid-cols-5 gap-8"
            >
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.links.map((link, i) => (
                      <FooterLinkItem key={link.href + i} link={link} index={i} />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Navigation - Mobile/Tablet */}
            <motion.div
              variants={itemVariants}
              className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-8"
            >
              {footerSections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {section.title}
                  </h3>
                  <div className="space-y-2.5">
                    {section.links.map((link, i) => (
                      <FooterLinkItem key={link.href + i} link={link} index={i} />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <motion.div
            variants={containerVariants}
            className="mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <NewsletterSection />

              {/* Social Links */}
              <motion.div variants={itemVariants} className="space-y-4">
                <p className="text-sm font-bold text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Connect With Us
                </p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <SocialButton key={social.label} {...social} />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className="relative pt-8 border-t border-white/[0.06]"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left - Copyright */}
              <div className="flex items-center gap-2 text-sm text-white/40">
                <span>© {currentYear} SkillWrap</span>
                <span className="text-white/20">•</span>
                <span>All Rights Reserved</span>
              </div>

              {/* Center - Built with love */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-sm text-white/40"
              >
                <span>Built with</span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart size={14} className="text-rose-400 fill-rose-400" />
                </motion.span>
                <span>for learners and creators</span>
              </motion.div>

              {/* Right - Status & Version */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <span>v2.0.0</span>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
                  />
                  <span className="text-xs text-emerald-400 font-medium">All Systems Online</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
}






// "use client";

// import Link from "next/link";
// import {
//   Github,
//   Twitter,
//   Linkedin,
//   Globe,
//   Sparkles,
// } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="relative mt-24 border-t border-white/10 bg-slate-950 text-white overflow-hidden">
//       {/* Glow Effects */}
//       <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

//       <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

//       <div className="relative max-w-7xl mx-auto px-6 py-16">
//         {/* TOP */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
//           {/* BRAND */}
//           <div>
//             <Link
//               href="/"
//               className="flex items-center gap-3 w-fit group"
//             >
//               <div
//                 className="
//                   w-11 h-11 rounded-2xl
//                   flex items-center justify-center
//                   bg-gradient-to-br from-cyan-400 to-purple-500
//                   shadow-lg
//                   transition duration-300
//                   group-hover:scale-110
//                   group-hover:rotate-12
//                 "
//               >
//                 <Sparkles size={20} />
//               </div>

//               <h2
//                 className="
//                   text-3xl font-black
//                   bg-gradient-to-r
//                   from-cyan-300
//                   via-white
//                   to-purple-400
//                   bg-clip-text
//                   text-transparent
//                 "
//               >
//                 SkillWrap
//               </h2>
//             </Link>

//             <p className="mt-5 text-sm text-gray-400 leading-7">
//               Learn skills, connect with creators, join events,
//               and grow together in one futuristic platform.
//             </p>

//             {/* SOCIALS */}
//             <div className="flex gap-3 mt-6">
//               <SocialIcon
//                 href="https://github.com"
//                 icon={<Github size={18} />}
//               />

//               <SocialIcon
//                 href="https://twitter.com"
//                 icon={<Twitter size={18} />}
//               />

//               <SocialIcon
//                 href="https://linkedin.com"
//                 icon={<Linkedin size={18} />}
//               />

//               <SocialIcon
//                 href="https://google.com"
//                 icon={<Globe size={18} />}
//               />
//             </div>
//           </div>

//           {/* PLATFORM */}
//           <div>
//             <h3 className="text-cyan-300 font-semibold text-lg mb-5">
//               Platform
//             </h3>

//             <div className="flex flex-col gap-3 text-sm">
//               <FooterLink href="/" label="Home" />
//               <FooterLink href="/skills" label="Skills" />
//               <FooterLink href="/events" label="Events" />
//               <FooterLink href="/community" label="Community" />
//             </div>
//           </div>

//           {/* COMPANY */}
//           <div>
//             <h3 className="text-purple-300 font-semibold text-lg mb-5">
//               Company
//             </h3>

//             <div className="flex flex-col gap-3 text-sm">
//               <FooterLink href="/about" label="About" />
//               <FooterLink href="/contact" label="Contact" />
//               <FooterLink href="/privacy" label="Privacy" />
//               <FooterLink href="/terms" label="Terms" />
//             </div>
//           </div>

//           {/* NEWSLETTER */}
//           <div>
//             <h3 className="text-cyan-300 font-semibold text-lg mb-5">
//               Stay Updated
//             </h3>

//             <p className="text-sm text-gray-400 leading-7 mb-5">
//               Get updates about new skills, creators,
//               and upcoming events.
//             </p>

//             <form
//               onSubmit={(e) => e.preventDefault()}
//               className="
//                 flex items-center
//                 rounded-full
//                 overflow-hidden
//                 border border-white/10
//                 bg-white/5
//               "
//             >
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="
//                   flex-1 bg-transparent
//                   px-4 py-3
//                   text-sm outline-none
//                   placeholder:text-gray-500
//                 "
//               />

//               <button
//                 className="
//                   px-5 py-3 text-sm font-semibold
//                   bg-gradient-to-r
//                   from-cyan-500
//                   to-purple-500
//                   hover:opacity-90
//                   transition
//                 "
//               >
//                 Join
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* BOTTOM */}
//         <div
//           className="
//             mt-14 pt-6
//             border-t border-white/10
//             flex flex-col md:flex-row
//             items-center justify-between
//             gap-4
//           "
//         >
//           <p className="text-xs text-gray-500 text-center">
//             © {new Date().getFullYear()} SkillWrap.
//             All rights reserved.
//           </p>

//           <div className="flex items-center gap-2 text-xs text-gray-400">
//             <span>Built for creators</span>

//             <Sparkles size={12} className="text-cyan-300" />
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// /* FOOTER LINK */

// function FooterLink({
//   href,
//   label,
// }: {
//   href: string;
//   label: string;
// }) {
//   return (
//     <Link
//       href={href}
//       className="
//         text-gray-400
//         hover:text-white
//         transition duration-300
//       "
//     >
//       {label}
//     </Link>
//   );
// }

// /* SOCIAL ICON */

// function SocialIcon({
//   href,
//   icon,
// }: {
//   href: string;
// icon: React.ReactNode;
// }) {
//   return (
//     <a
//       href={href}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="
//         w-11 h-11
//         rounded-2xl
//         border border-white/10
//         bg-white/5
//         flex items-center justify-center
//         hover:bg-cyan-500/10
//         hover:border-cyan-400/40
//         hover:scale-110
//         transition duration-300
//       "
//     >
//       {icon}
//     </a>
//   );
// }


































"use client"

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Menu,
  X,
  UserCircle2,
  Sparkles,
  ChevronDown,
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  ArrowLeftRight,
  Calendar,
  Settings,
  Bell,
  LogOut,
  Layers,
  Users,
  Briefcase,
  PenTool,
  Globe,
  Home,
  Info,
  Search,
} from "lucide-react";

interface UserType {
  id: number;
  username: string;
  img_url?: string;
  email?: string;
}

interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

// const API_URL = "http://localhost:4000";
const API_URL = "https://skillwrap-backend.onrender.com";

const navLinks: NavLink[] = [
  { href: "/", label: "Home", icon: <Home size={16} /> },
  { href: "/skills", label: "Skills", icon: <Layers size={16} /> },
  // { href: "/exchange", label: "Exchange", icon: <ArrowLeftRight size={16} /> },
  { href: "/community", label: "Community", icon: <Users size={16} /> },
  { href: "/events", label: "Events", icon: <Calendar size={16} /> },
  { href: "/about", label: "About", icon: <Info size={16} /> },
];

const mobileNavLinks: NavLink[] = [
  { href: "/", label: "Home", icon: <Home size={18} /> },
  { href: "/skills", label: "Skills", icon: <Layers size={18} /> },
  // { href: "/exchange", label: "Exchange", icon: <ArrowLeftRight size={18} /> },
  { href: "/community", label: "Community", icon: <Users size={18} /> },
  { href: "/events", label: "Events", icon: <Calendar size={18} /> },
  // { href: "/skills", label: "Marketplace", icon: <Briefcase size={18} /> },
  { href: "/request-sent", label: "Request Sent", icon: <BookOpen size={18} /> },
  { href: "/request-recieved", label: "Recieved Request", icon: <PenTool size={18} /> },
  { href: "/about", label: "About", icon: <Info size={18} /> },
];


// Dropdown menu item
function DropdownItem({
  icon,
  label,
  href,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  onClick?: () => void;
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors duration-200"
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="p-2 rounded-lg bg-gradient-to-br from-slate-700/50 to-slate-800/50 text-slate-400 group-hover:text-cyan-400 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-200">
        {icon}
      </div>
      <span className="text-white/80 group-hover:text-white transition-colors duration-200">{label}</span>
    </motion.a>
  );
}

// Profile Dropdown
function ProfileDropdown({
  user,
  onClose,
  onNavigate,
}: {
  user: UserType;
  onClose: () => void;
  onNavigate?: (page: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute right-0 top-full mt-3 w-72 rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-2xl border border-white/[0.08] shadow-2xl shadow-black/40 overflow-hidden"
    >
      {/* Header */}
      <div className="relative p-5 border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/5" />
        <div className="relative flex items-center gap-4">
          <div className="relative">
            {user.img_url ? (
              <img
                src={user.img_url}
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/30"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                <UserCircle2 size={24} className="text-cyan-400" />
              </div>
            )}
            {/* Online indicator */}
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900">
              <div className="w-full h-full rounded-full bg-emerald-400 animate-ping opacity-60" />
            </div>
          </div>
          <div>
            <p className="font-semibold text-white">{user.username}</p>
            <p className="text-xs text-slate-400">{user.email || "Skill Exchanger"}</p>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="p-2">
        <div className="py-2">
          <p className="px-4 py-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Account</p>
          <DropdownItem icon={<LayoutDashboard size={16} />} label="Dashboard" href="/dashboard" onClick={() => { onNavigate?.("dashboard"); onClose(); }} />
          <DropdownItem icon={<Layers size={16} />} label="My Skills" href="/my-skill" onClick={onClose} />
          <DropdownItem icon={<GraduationCap size={16} />} label="Request Sent" href="/request-sent" onClick={() => { onNavigate?.("learning"); onClose(); }} />
          {/* <DropdownItem icon={<PenTool size={16} />} label="Teaching" href="/teaching" onClick={onClose} /> */}
          <DropdownItem icon={<ArrowLeftRight size={16} />} label="Request Recieved" href="/request-recieved" onClick={onClose} />
        </div>

        <div className="py-2 border-t border-white/[0.06]">
          <p className="px-4 py-1.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Quick Links</p>
          <DropdownItem icon={<Calendar size={16} />} label="Events" href="/events" onClick={onClose} />
          <DropdownItem icon={<Bell size={16} />} label="Notifications" href="/notifications-route" onClick={onClose} />
          <DropdownItem icon={<Settings size={16} />} label="Settings" href="/settings" onClick={() => { onNavigate?.("settings"); onClose(); }} />
        </div>
      </div>

      {/* Logout */}
      <div className="p-2 border-t border-white/[0.06]">
        <motion.button
          onClick={handleLogout}
          className="group w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-500/10 transition-colors duration-200"
          whileHover={{ x: 4 }}
        >
          <div className="p-2 rounded-lg bg-slate-700/50 text-slate-400 group-hover:bg-rose-500/20 group-hover:text-rose-400 transition-all duration-200">
            <LogOut size={16} />
          </div>
          <span className="text-white/80 group-hover:text-rose-400 transition-colors duration-200">Sign Out</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

// Main Navbar
export default function Navbar({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          setUser(null);
          return;
        }
        const data = await res.json();
        setUser(data.user ?? data);
      } catch (err) {
        console.log("Failed to fetch user:", err);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Close menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setShowDropdown(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 px-4 transition-all duration-300 ${
          scrolled ? "pt-3" : "pt-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`max-w-7xl mx-auto rounded-2xl border transition-all duration-300 ${
            scrolled
              ? "py-3 border-white/[0.08] bg-slate-900/80 backdrop-blur-2xl shadow-2xl shadow-black/20"
              : "py-4 border-white/[0.06] bg-slate-900/60 backdrop-blur-xl"
          }`}
        >
          <div className="flex items-center justify-between px-6">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Image
  src="/favicon.png"
  alt="SkillWrap"
  width={24}
  height={24}
  className="w-6 h-6 rounded-lg object-contain"
/>
                  {/* <img src="/favicon.png" alt="SkillWrap" className="w-6 h-6 rounded-lg object-contain" /> */}
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent">
                SkillWrap
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    activeLink === link.href
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {activeLink === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-xl bg-white/10 border border-white/[0.08]"
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.a>
              ))}
            </nav>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-3">
              {!user ? (
                <>
                  <motion.a
                    href="/login"
                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/5 transition-all duration-200"
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    Sign In
                  </motion.a>

                  <motion.a
                    href="/signup"
                    className="relative group px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden"
                    whileHover={{ y: -1, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">Sign Up</span>
                  </motion.a>
                </>
              ) : (
                <div className="relative">
                  <motion.button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    {user.img_url ? (
                      <img
                        src={user.img_url}
                        alt={user.username}
                        className="w-9 h-9 rounded-full object-cover border-2 border-cyan-500/30"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                        <UserCircle2 size={20} className="text-cyan-400" />
                      </div>
                    )}
                    <span className="text-white/90 font-medium text-sm">{user.username}</span>
                    <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`} />
                  </motion.button>

                  <AnimatePresence>
                    {showDropdown && (
                      <ProfileDropdown user={user} onClose={() => setShowDropdown(false)} onNavigate={onNavigate} />
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Mobile Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-12 h-12 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center"
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} className="text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} className="text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xl md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[380px] z-50 bg-gradient-to-br from-slate-900/98 to-slate-950/98 backdrop-blur-2xl border-l border-white/[0.08] overflow-y-auto md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <motion.a
                    href="/"
                    className="flex items-center gap-2.5"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="relative">
                      {/* <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 blur-lg opacity-50" /> */}
                      {/* <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center"> */}
                        <Image
                            src="/favicon.png"
                            alt="SkillWrap"
                            width={24}
                            height={24}
                            className="w-6 h-6 rounded-lg object-contain"
                          />
                                                  {/* <img src="/favicon.png" alt="SkillWrap" className="w-6 h-6 rounded-lg object-contain" /> */}
                      </div>
                    {/* </div> */}
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 via-white to-purple-400 bg-clip-text text-transparent">
                      SkillWrap
                    </span>
                  </motion.a>

                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} className="text-white" />
                  </motion.button>
                </div>

                {/* User Section */}
                {user && (
                  <motion.div
                    className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      {user.img_url ? (
                        <img src={user.img_url} alt={user.username} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                          <UserCircle2 size={24} className="text-cyan-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-white font-semibold">{user.username}</p>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs text-emerald-400 font-medium">Online</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Links */}
                <div className="mb-8">
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Navigation</p>
                  <div className="space-y-1">
                    {mobileNavLinks.map((link, i) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/5 transition-colors duration-200 group"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        <div className="p-2 rounded-lg bg-slate-700/50 text-slate-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all duration-200">
                          {link.icon}
                        </div>
                        <span className="text-white/80 group-hover:text-white transition-colors duration-200">{link.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Auth Buttons */}
                <div className="border-t border-white/[0.06] pt-6">
                  {!user ? (
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.a
                        href="/login"
                        className="block w-full text-center py-3.5 rounded-xl text-white font-medium border border-white/[0.08] hover:bg-white/5 transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                        whileTap={{ scale: 0.98 }}
                      >
                        Sign In
                      </motion.a>
                      <motion.a
                        href="/signup"
                        className="block w-full text-center py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                        whileTap={{ scale: 0.98 }}
                      >
                        Sign Up
                      </motion.a>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.a
                        href="/dashboard"
                        onClick={() => { setIsOpen(false); onNavigate?.("dashboard"); }}
                        className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/5 transition-colors duration-200 group"
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="p-2 rounded-lg bg-slate-700/50 text-slate-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all duration-200">
                          <LayoutDashboard size={18} />
                        </div>
                        <span className="text-white/80 group-hover:text-white">Dashboard</span>
                      </motion.a>
                      <motion.button
                        onClick={() => {
                          fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
                          window.location.reload();
                        }}
                        className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl hover:bg-rose-500/10 transition-colors duration-200 group"
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="p-2 rounded-lg bg-slate-700/50 text-slate-400 group-hover:bg-rose-500/20 group-hover:text-rose-400 transition-all duration-200">
                          <LogOut size={18} />
                        </div>
                        <span className="text-white/80 group-hover:text-rose-400">Sign Out</span>
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}







// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Menu, X, UserCircle2, Sparkles } from "lucide-react";

// interface UserType {
//   id: number;
//   username: string;
//   img_url?: string;
// }

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
//   { href: "/skills", label: "Skills" },
//   { href: "/events", label: "Events" },
// ];


// const API_URL = "https://skillwrap-backend.onrender.com";
//   // const API_URL = "http://localhost:4000";

  
// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [user, setUser] = useState<UserType | null>(null);

  
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//   const fetchUser = async () => {
//     try {

//       const res = await fetch(`${API_URL}/auth/profile`, {
//         method: "GET",
//         credentials: "include",
//       });

//       if (!res.ok) {
//         console.log("❌ User not authenticated");
//         setUser(null);
//         return;
//       }

//       const data = await res.json();

//       const finalUser = data.user ?? data;
      
//       setUser(finalUser);
//     } catch (err) {
//       console.log("❌ Failed to fetch user:", err);
//       setUser(null);
//     }
//   };

//   fetchUser();
// }, []);


//   return (
//     <>
//       <header className="fixed top-0 left-0 w-full z-50 px-4 pt-4">
//         <div
//           className={`max-w-7xl mx-auto rounded-2xl border border-white/10 backdrop-blur-xl bg-slate-900/70 transition-all duration-300 ${
//             scrolled ? "py-3" : "py-5"
//           }`}
//         >
//           <div className="flex items-center justify-between px-6">
//             {/* Logo */}
//             <Link
//               href="/"
//               className="flex items-center gap-2 text-2xl font-bold"
//             >
//               <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
//                 <Sparkles size={18} className="text-white" />
//               </div>

//               <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
//                 SkillWrap
//               </span>
//             </Link>

//             {/* Desktop Nav */}
//             <nav className="hidden md:flex items-center gap-6">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="text-white/70 hover:text-white transition"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </nav>

// {/* Right */}
// <div className="hidden md:flex items-center gap-3">
//   {!user ? (
//     <>
//       <Link
//         href="/login"
//         className="px-4 py-2 rounded-lg border border-white/10 text-white/80 hover:text-white hover:bg-white/5 transition"
//       >
//         Sign In
//       </Link>

//       <Link
//         href="/signup"
//         className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold"
//       >
//         Sign Up
//       </Link>
//     </>
//   ) : (
//     <Link
//       href="/profile"
//       className="flex items-center gap-2 text-white"
//     >
//       {user.img_url ? (
//         <img
//           src={user.img_url}
//           alt={user.username}
//           className="h-8 w-8 rounded-full object-cover"
//         />
//       ) : (
//         <UserCircle2 className="h-8 w-8 text-cyan-300" />
//       )}

//       <span className="text-white/90 font-medium">
//         {user.username}
//       </span>
//     </Link>
//   )}
// </div>

//             {/* Mobile Button */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="md:hidden text-white"
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {isOpen && (
//             <div className="md:hidden px-6 pb-5 pt-4 flex flex-col gap-3">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   onClick={() => setIsOpen(false)}
//                   className="text-white/80 hover:text-white"
//                 >
//                   {link.label}
//                 </Link>
//               ))}

//               <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
//                 <Link
//                   href="/login"
//                   className="w-full text-center py-2 rounded-lg border border-white/10 text-white"
//                 >
//                   Sign In
//                 </Link>

//                 <Link
//                   href="/signup"
//                   className="w-full text-center py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-white"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       <div className="h-28" />
//     </>
//   );
// }
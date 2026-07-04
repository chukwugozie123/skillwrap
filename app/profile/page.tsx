// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import Link from "next/link";

// import ProfileAvatarEditor from "@/components/profilePicture/page";


// // const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";

// interface User {
//   username: string;
//   email: string;
//   bio?: string;
//   img_url?: string;
//   mode?: string;
//   points?: string
// }

// export default function ProfilePage() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const res = await fetch(`${API_URL}/auth/profile`, {
//           credentials: "include",
//         });

//         if (!res.ok) return router.push("/login");

//         const data = await res.json();
//         setUser(data.user);
//       } catch {
//         router.push("/login");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProfile();
//   }, [router]);

//   async function handleLogout() {
//     await fetch(`${API_URL}/auth/logout`, {
//       method: "POST",
//       credentials: "include",
//     });
//     router.push("/login");
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-cyan-400 text-xl animate-pulse">
//         Loading profile...
//       </div>
//     );
//   }

//   if (!user) return null;

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-[#0c111a] via-[#101827] to-[#0c111a] text-white px-6 py-12">
//       {/* 🔙 Go Back */}
//       <div className="mb-8">
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 px-4 py-2 rounded-full
//           bg-white/10 border border-white/20 backdrop-blur-md
//           text-sm font-medium hover:bg-white/20 hover:scale-105 
//           transition-all duration-300"
//         >
//           ← Back
//         </button>
//       </div>

//       <div className="max-w-6xl mx-auto space-y-12">
//         {/* ================= PROFILE CARD ================= */}
//         <motion.section
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-8 flex flex-col sm:flex-row gap-8 items-center"
//         >
//           {/* Neon Glow */}
//           <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-600/20 blur-3xl -z-10" />

//           {/* Avatar */}
//           <div className="relative shrink-0">
//             <ProfileAvatarEditor
//               imageUrl={user.img_url}
//               username={user.username}
//               onUploadSuccess={(newUrl) =>
//                 setUser((prev) =>
//                   prev ? { ...prev, img_url: newUrl } : prev
//                 )
//               }
//             />
//             <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-[#101827]" />
//           </div>

//           {/* Info */}
// <div className="flex-1 text-center sm:text-left space-y-4">
//   <h1 className="text-4xl font-extrabold tracking-tight">{user.username}</h1>
//   <p className="text-cyan-400 font-medium">{user.email}</p>
//   <p className="text-gray-300 mt-2 max-w-xl mx-auto sm:mx-0">
//     {user.bio || "No bio yet. Add one from edit profile."}
//   </p>

//   <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
//     <Badge text="Member" color="bg-cyan-500/20" />
//     <Badge text="Verified" color="bg-purple-500/20" />
//   </div>

//   {/* Mode & Points Section */}
//   <div className="mt-4 flex flex-wrap gap-4 justify-center sm:justify-start items-center">
//     {/* Mode */}
//     <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-700/20 text-purple-300 font-semibold border border-white/10">
//       <span className="text-sm uppercase tracking-wider">Mode:</span>
//       <span className="text-white">{user.mode || "Default"}</span>
//     </div>

//     {/* Points */}
//     <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/20 text-yellow-400 font-bold border border-white/10">
//       <span>⭐</span>
//       <span className="text-lg">{user.points || 0}</span>
//     </div>
//   </div>
// </div>

//           {/* Edit Button */}
//           <Link href="/edit-profile">
//             <motion.button
//               whileHover={{ scale: 1.08 }}
//               className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 
//               border border-white/20 shadow-lg font-semibold whitespace-nowrap"
//             >
//               Edit Profile
//             </motion.button>
//           </Link>
//         </motion.section>

//         {/* ================= MAIN ACTIONS ================= */}
//         <section className="grid sm:grid-cols-2 gap-6">
//           <ProfileCard
//             href="/create-skill"
//             title="➕ Create Skill"
//             desc="Share your expertise with the community"
//             gradient="from-cyan-500 to-blue-600"
//           />
//           <ProfileCard
//             href="/my-skill"
//             title="📂 My Skills"
//             desc="Manage and update your skills"
//             gradient="from-indigo-500 to-purple-600"
//           />
//         </section>

//         {/* ================= SECONDARY ACTIONS ================= */}
//         <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//           <ActionButton label="📥 Requests" href="/request-sent" />
//           <ActionButton label="⚙️ Settings" href="/settings" />
//           <motion.button
//             onClick={handleLogout}
//             whileHover={{ scale: 1.05 }}
//             className="col-span-2 sm:col-span-1 py-3 rounded-xl 
//             bg-gradient-to-r from-red-600 to-pink-700 
//             border border-red-400/30 font-semibold shadow-lg"
//           >
//             🚪 Logout
//           </motion.button>
//         </section>
//       </div>
//     </main>
//   );
// }

// /* ================= COMPONENTS ================= */

// function Badge({ text, color }: { text: string; color: string }) {
//   return (
//     <span
//       className={`px-4 py-1 rounded-full ${color} border border-white/10 text-sm font-medium`}
//     >
//       {text}
//     </span>
//   );
// }

// function ProfileCard({
//   href,
//   title,
//   desc,
//   gradient,
// }: {
//   href: string;
//   title: string;
//   desc: string;
//   gradient: string;
// }) {
//   return (
//     <Link href={href}>
//       <motion.div
//         whileHover={{ scale: 1.05, y: -2 }}
//         className={`p-6 rounded-2xl bg-gradient-to-r ${gradient} border border-white/20 shadow-xl cursor-pointer transition-transform duration-300`}
//       >
//         <h3 className="text-xl font-semibold mb-2">{title}</h3>
//         <p className="text-white/80 text-sm">{desc}</p>
//       </motion.div>
//     </Link>
//   );
// }

// function ActionButton({ label, href }: { label: string; href: string }) {
//   return (
//     <Link href={href}>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         className="w-full py-3 rounded-xl bg-white/5 border border-white/20 shadow-lg font-semibold text-white transition-transform duration-300"
//       >
//         {label}
//       </motion.button>
//     </Link>
//   );
// }








"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Edit3,
  Plus,
  FolderOpen,
  Inbox,
  Settings,
  LogOut,
  Star,
  Crown,
  Shield,
  Sparkles,
  Zap,
  Mail,
  User,
  Globe,
  ChevronRight,
  TrendingUp,
  Award,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ProfileAvatarEditor from "@/components/profilePicture/page";


// const API_URL = "http://localhost:4000";
  const API_URL = "https://skillwrap-backend.onrender.com";

// ============ TYPES ============
interface User {
  username: string;
  email: string;
  bio?: string;
  img_url?: string;
  mode?: string;
  points?: string;
}

interface ProfilePageProps {
  onNavigate?: (page: string) => void;
}

// ============ AMBIENT PARTICLE ============
function AmbientParticle({ delay, left, size }: { delay: number; left: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)`,
      }}
      animate={{
        y: [0, -600, 0],
        opacity: [0, 0.5, 0],
        x: [0, Math.random() * 40 - 20, 0],
      }}
      transition={{
        duration: 20 + delay * 2,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    />
  );
}

// ============ FLOATING ORB ============
function FloatingOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

// ============ BADGE COMPONENT ============
function Badge({ text, color, icon }: { text: string; color: string; icon?: React.ReactNode }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, y: -2 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${color} border border-white/10 text-xs font-semibold backdrop-blur-sm shadow-lg`}
    >
      {icon}
      {text}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full"
      />
    </motion.span>
  );
}

// ============ STAT CARD ============
function StatCard({ label, value, icon, gradient, delay = 0 }: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`relative flex items-center gap-3 px-5 py-4 rounded-2xl bg-gradient-to-r ${gradient} border border-white/10 backdrop-blur-xl shadow-xl overflow-hidden group`}
    >
      {/* Glow effect */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: delay * 0.5 }}
        className={`absolute inset-0 bg-gradient-to-r ${gradient} blur-xl opacity-30`}
      />

      {/* Shimmer */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="relative z-10 p-2 rounded-xl bg-white/10 border border-white/10">
        {icon}
      </div>
      <div className="relative z-10">
        <p className="text-[10px] text-white/60 uppercase tracking-wider font-medium">{label}</p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          className="text-xl font-bold text-white"
        >
          {value}
        </motion.p>
      </div>
    </motion.div>
  );
}

// ============ ACTION CARD ============
function ActionCard({
  title,
  desc,
  icon,
  gradient,
  borderColor,
  delay = 0,
  onClick,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  delay?: number;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, y: -6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className="relative p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/[0.06] shadow-2xl cursor-pointer overflow-hidden group"
    >
      {/* Mouse glow */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
            width: 300,
            height: 300,
            background: `radial-gradient(circle, ${borderColor.includes("cyan") ? "rgba(34,211,238,0.15)" : "rgba(168,85,247,0.15)"} 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Gradient border */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        style={{
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? [0, -10, 10, 0] : 0 }}
          transition={{ duration: 0.3 }}
          className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} mb-4 shadow-lg`}
        >
          {icon}
        </motion.div>
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-slate-400">{desc}</p>

        {/* Arrow */}
        <motion.div
          animate={{ x: isHovered ? 4 : 0 }}
          className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-cyan-400 transition-colors"
        >
          <span>Get started</span>
          <ChevronRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============ ACTION BUTTON ============
function ActionButton({
  label,
  icon,
  onClick,
  variant = "default",
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "logout";
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative w-full py-3 px-4 rounded-xl backdrop-blur-xl border font-semibold text-sm flex items-center justify-center gap-2 overflow-hidden group ${
        variant === "logout"
          ? "bg-gradient-to-r from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-300 hover:border-rose-400/50"
          : "bg-slate-800/60 border-white/[0.06] text-white hover:border-cyan-500/30"
      }`}
    >
      {/* Shimmer */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <span className="relative z-10">{icon}</span>
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}

// ============ AVATAR EDITOR PLACEHOLDER ============
// function ProfileAvatarPlaceholder({ imageUrl, username }: { imageUrl?: string; username: string }) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       className="relative w-28 h-28 sm:w-32 sm:h-32"
//     >
//       {/* Rotating gradient border */}
//       <motion.div
//         animate={{ rotate: [0, 360] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//         className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"
//       />

//       {/* Inner container */}
//       <div className="absolute inset-0 rounded-full bg-slate-900 p-1">
//         {imageUrl ? (
//           <img
//             src={imageUrl}
//             alt={username}
//             className="w-full h-full rounded-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
//             <User className="w-12 h-12 text-cyan-400" />
//           </div>
//         )}
//       </div>

//       {/* Online indicator */}
//       <motion.div
//         animate={{ scale: [1, 1.2, 1] }}
//         transition={{ duration: 2, repeat: Infinity }}
//         className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-3 border-slate-900 shadow-lg shadow-emerald-500/50"
//       />

//       {/* Glow pulse */}
//       <motion.div
//         animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
//         transition={{ duration: 2, repeat: Infinity }}
//         className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-500/30 blur-lg"
//       />
//     </motion.div>
//   );
// }

// ============ MAIN COMPONENT ============
export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });

        if (!res.ok) {
          setLoading(false);
          router.push("/login");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  async function handleLogout() {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      router.push("/login");
    } catch {
      // 
      // Handle error silently
    }
  }

  // Particles config
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: i * 2,
    left: `${10 + i * 15}%`,
    size: 4 + Math.random() * 4,
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-pulse" />
          <span className="text-cyan-400 text-sm font-medium">Loading profile...</span>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* ============ PREMIUM BACKGROUND ============ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.08)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(168,85,247,0.06)_0%,_transparent_50%)]" />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating orbs */}
        <FloatingOrb
          className="w-[500px] h-[500px] -top-32 -left-32 bg-gradient-to-br from-cyan-500/15 to-transparent blur-3xl"
          delay={0}
        />
        <FloatingOrb
          className="w-[400px] h-[400px] top-1/2 -right-20 bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl"
          delay={5}
        />
        <FloatingOrb
          className="w-[300px] h-[300px] -bottom-20 left-1/3 bg-gradient-to-br from-blue-500/10 to-transparent blur-3xl"
          delay={10}
        />

        {/* Particles */}
        {particles.map((p) => (
          <AmbientParticle key={p.id} delay={p.delay} left={p.left} size={p.size} />
        ))}
      </div>

      {/* ============ CONTENT ============ */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="max-w-5xl mx-auto space-y-8 lg:space-y-12">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, x: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate?.("home")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 backdrop-blur-xl border border-white/[0.06] text-sm font-medium text-slate-300 hover:text-white hover:border-cyan-500/30 transition-all"
            >
              <ArrowLeft size={16} />
              Back
            </motion.button>
          </motion.div>

          {/* ============ PROFILE CARD ============ */}
          <motion.section
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Card glow */}
            <motion.div
              animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 blur-3xl"
            />

            <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-2xl border border-white/[0.06] shadow-2xl overflow-hidden">
              {/* Animated border */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-px rounded-3xl bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 opacity-50"
                style={{
                  padding: "1px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {/* Top shimmer */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
              />

              <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-6 lg:gap-10 items-center lg:items-start">
                {/* Avatar */}
                {/* <ProfileAvatarPlaceholder imageUrl={user.img_url} username={user.username} /> */}
                    <ProfileAvatarEditor
                      imageUrl={user.img_url}
                      username={user.username}
                      onUploadSuccess={(newUrl) =>
                        setUser((prev) =>
                          prev ? { ...prev, img_url: newUrl } : prev
                        )
                      }
                    />

                {/* Info */}
                <div className="flex-1 text-center lg:text-left space-y-4">
                  {/* Username */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                      <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        {user.username}
                      </span>
                    </h1>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center lg:justify-start gap-2"
                  >
                    <Mail size={14} className="text-cyan-400" />
                    <span className="text-sm text-cyan-400/80">{user.email}</span>
                  </motion.div>

                  {/* Bio */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-300 mx-auto lg:mx-0 max-w-md"
                  >
                    {user.bio || "No bio yet. Add one from edit profile."}
                  </motion.p>

                  {/* Badges */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-2 justify-center lg:justify-start"
                  >
                    <Badge text="Member" color="bg-cyan-500/20" icon={<Shield size={12} className="text-cyan-400" />} />
                    <Badge text="Verified" color="bg-purple-500/20" icon={<Sparkles size={12} className="text-purple-400" />} />
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2"
                  >
                    <StatCard
                      label="Mode"
                      value={user.mode || "Default"}
                      icon={<Crown size={16} className="text-purple-400" />}
                      gradient="from-purple-500/20 to-indigo-500/20"
                      delay={0.6}
                    />
                    <StatCard
                      label="Points"
                      value={user.points || 0}
                      icon={<Star size={16} className="text-amber-400" />}
                      gradient="from-amber-500/20 to-orange-500/20"
                      delay={0.7}
                    />
                  </motion.div>
                </div>

                {/* Edit Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34,211,238,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold overflow-hidden group"
                  >
                    {/* Shimmer */}
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      <Edit3 size={16} />
                      Edit Profile
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* ============ ACTION CARDS ============ */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-4 lg:gap-6"
          >
            <ActionCard
              title="Create Skill"
              desc="Share your expertise with the community"
              icon={<Plus size={20} className="text-white" />}
              gradient="from-cyan-500 to-blue-600"
              borderColor="cyan"
              delay={0.8}
            />
            <ActionCard
              title="My Skills"
              desc="Manage and update your skills"
              icon={<FolderOpen size={20} className="text-white" />}
              gradient="from-purple-500 to-indigo-600"
              borderColor="purple"
              delay={0.9}
            />
          </motion.section>

          {/* ============ QUICK STATS ============ */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              className="p-4 rounded-xl bg-slate-800/40 backdrop-blur-xl border border-white/[0.04]"
            >
              <TrendingUp size={18} className="text-emerald-400 mb-2" />
              <p className="text-lg font-bold text-white">+12</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">This Week</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              className="p-4 rounded-xl bg-slate-800/40 backdrop-blur-xl border border-white/[0.04]"
            >
              <Award size={18} className="text-amber-400 mb-2" />
              <p className="text-lg font-bold text-white">5</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Badges</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              className="p-4 rounded-xl bg-slate-800/40 backdrop-blur-xl border border-white/[0.04]"
            >
              <Target size={18} className="text-cyan-400 mb-2" />
              <p className="text-lg font-bold text-white">24</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Sessions</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              className="p-4 rounded-xl bg-slate-800/40 backdrop-blur-xl border border-white/[0.04]"
            >
              <Globe size={18} className="text-purple-400 mb-2" />
              <p className="text-lg font-bold text-white">12</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Connections</p>
            </motion.div>
          </motion.section>

          {/* ============ BOTTOM ACTIONS ============ */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4"
          >
            <ActionButton label="Requests" icon={<Inbox size={16} />} />
            <ActionButton label="Settings" icon={<Settings size={16} />} />
            <ActionButton label="Logout" icon={<LogOut size={16} />} variant="logout" onClick={handleLogout} />
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="p-3 rounded-xl bg-slate-800/40 backdrop-blur-xl border border-white/[0.04] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap size={16} className="text-amber-400" />
              <span className="text-sm font-medium text-white">Upgrade</span>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}

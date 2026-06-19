"use client"

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";


// const API_URL = "https://skillwrap-backend.onrender.com";
const API_URL = "http://localhost:4000";
interface User {
  username: string;
  email: string;
  bio?: string;
  img_url?: string;
  mode?: string;
  points?: string;
}
function ProfilePage() {
  // const navigate = useNavigate();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });
        if (!res.ok) return  router.push("/login");
        const data = await res.json();
        setUser(data.user);
      } catch {
         router.push("/login");
        // navigate({ to: "/login" as any });
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [router]);
  async function handleLogout() {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  }
  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#05070f] text-white flex items-center justify-center">
        <AmbientBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 flex flex-col items-center gap-5"
        >
          <div className="relative h-16 w-16">
            <span className="absolute inset-0 rounded-full border-2 border-cyan-400/30" />
            <span className="absolute inset-0 rounded-full border-t-2 border-cyan-300 animate-spin" />
            <span className="absolute inset-2 rounded-full bg-cyan-400/10 blur-xl" />
          </div>
          <p className="text-sm tracking-[0.3em] uppercase text-cyan-200/70">
            Loading profile…
          </p>
        </motion.div>
      </div>
    );
  }
  if (!user) return null;
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070f] text-white">
      <AmbientBackground />
      {/* 🔙 Go Back */}
      <div className="relative z-20 px-5 pt-6 sm:px-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => router.history.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-full
            bg-white/5 border border-white/10 backdrop-blur-xl
            text-sm font-medium text-cyan-100/90
            shadow-[0_0_30px_-10px_rgba(56,189,248,0.6)]
            hover:bg-white/10 hover:border-cyan-300/40
            transition-all duration-300"
        >
          <span className="text-cyan-300">←</span> Back
        </motion.button>
      </div>
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 pb-20 pt-10 sm:px-8">
        {/* ================= PROFILE CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full max-w-2xl"
        >
          {/* Neon Glow */}
          <RotatingGlowBorder />
          <TiltCard className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent p-8 backdrop-blur-2xl shadow-[0_30px_120px_-30px_rgba(56,189,248,0.35)] sm:p-10">
            {/* Floating glass reflection */}
            <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
            {/* Avatar */}
            <div className="relative mx-auto flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
              <motion.span
                aria-hidden
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 blur-2xl"
              />
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative h-full w-full rounded-full p-[2px] bg-gradient-to-tr from-cyan-300 via-indigo-400 to-purple-500"
              >
                <ProfileAvatarEditor
                  imgUrl={user.img_url}
                  username={user.username}
                  onUpdate={(newUrl) =>
                    setUser((prev) => (prev ? { ...prev, img_url: newUrl } : prev))
                  }
                />
                {/* live online pulse */}
                <span className="absolute bottom-2 right-2 flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-400 ring-2 ring-[#05070f]" />
                </span>
              </motion.div>
            </div>
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center"
            >
              <h1 className="bg-gradient-to-r from-white via-cyan-100 to-indigo-200 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                {user.username}
              </h1>
              <p className="mt-1 text-sm text-cyan-200/60">{user.email}</p>
              <p className="mx-auto mt-5 max-w-md rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/70 backdrop-blur-md">
                {user.bio || "No bio yet. Add one from edit profile."}
              </p>
              {/* Floating badges */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <Badge text="✦ Verified" color="from-cyan-400/20 to-cyan-400/5 text-cyan-200 border-cyan-300/30" />
                <Badge text="⚡ Pro" color="from-indigo-400/20 to-indigo-400/5 text-indigo-200 border-indigo-300/30" />
                <Badge text="◎ Online" color="from-emerald-400/20 to-emerald-400/5 text-emerald-200 border-emerald-300/30" />
              </div>
              {/* Mode & Points Section */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <StatCard label="Mode" value={user.mode || "Default"} accent="from-cyan-400/20 to-indigo-500/10" />
                <StatCard
                  label="Points"
                  value={<AnimatedCounter to={Number(user.points) || 0} />}
                  icon="⭐"
                  accent="from-purple-500/20 to-indigo-500/10"
                />
              </div>
            </motion.div>
            {/* Edit Button */}
            <div className="mt-7 flex justify-center">
              <MagneticLink to="/skill/1/edit-skill">
                <span className="relative z-10">Edit Profile</span>
                <span className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 opacity-90 blur-[2px] group-hover:opacity-100" />
                <span className="absolute -inset-1 -z-10 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 opacity-40 blur-xl group-hover:opacity-70 transition-opacity" />
              </MagneticLink>
            </div>
          </TiltCard>
        </motion.div>
        {/* ================= MAIN ACTIONS ================= */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
          }}
          className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2"
        >
          <ProfileCard
            href="/skills"
            title="My Skills"
            desc="Track your mastery, level up, and showcase progress."
            gradient="from-cyan-500/30 via-cyan-400/10 to-transparent"
          />
          <ProfileCard
            href="/wraps"
            title="My Wraps"
            desc="Curated bundles of your top moments and milestones."
            gradient="from-indigo-500/30 via-purple-500/10 to-transparent"
          />
        </motion.div>
        {/* ================= SECONDARY ACTIONS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <ActionButton label="⚙ Settings" href="/settings" />
          <ActionButton label="🛡 Privacy" href="/privacy" />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="group relative overflow-hidden rounded-2xl border border-rose-400/20 bg-gradient-to-br from-rose-500/10 to-rose-500/[0.02] px-5 py-3 text-sm font-medium text-rose-200 backdrop-blur-md transition-all hover:border-rose-300/40 hover:text-rose-100 hover:shadow-[0_0_40px_-10px_rgba(244,63,94,0.6)]"
          >
            <span className="relative z-10">🚪 Logout</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
/* ================= COMPONENTS ================= */
function AmbientBackground() {
  return (
    <>
      {/* Mesh gradient base */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.18),transparent_55%)]" />
      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-32 top-32 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl"
      />
      {/* Particles */}
      <Particles />
    </>
  );
}
function Particles() {
  const dots = Array.from({ length: 22 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 31) % 100;
        const dur = 6 + (i % 6);
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -40, 0] }}
            transition={{ duration: dur, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
            className="absolute h-1 w-1 rounded-full bg-cyan-200/70 shadow-[0_0_8px_2px_rgba(103,232,249,0.7)]"
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        );
      })}
    </div>
  );
}
function RotatingGlowBorder() {
  return (
    <motion.div
      aria-hidden
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="pointer-events-none absolute -inset-[2px] rounded-3xl bg-[conic-gradient(from_0deg,rgba(34,211,238,0.5),rgba(139,92,246,0.5),rgba(99,102,241,0.5),rgba(34,211,238,0.5))] opacity-60 blur-[6px]"
    />
  );
}
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 150, damping: 15 });
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
function ProfileAvatarEditor({
  imgUrl,
  username,
  onUpdate,
}: {
  imgUrl?: string;
  username: string;
  onUpdate: (url: string) => void;
}) {
  // Preserves the original onUpdate contract; visual-only wrapper.
  const initials = username?.slice(0, 2).toUpperCase() || "?";
  return (
    <div className="relative h-full w-full overflow-hidden rounded-full bg-[#05070f]">
      {imgUrl ? (
        <img src={imgUrl} alt={username} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-600/40 to-cyan-500/30 text-3xl font-bold text-white">
          {initials}
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          const url = window.prompt("New image URL", imgUrl || "");
          if (url) onUpdate(url);
        }}
        className="absolute inset-x-0 bottom-0 bg-black/60 py-1 text-[10px] uppercase tracking-widest text-cyan-200 opacity-0 backdrop-blur transition-opacity hover:opacity-100"
      >
        Change
      </button>
    </div>
  );
}
function AnimatedCounter({ to }: { to: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [to]);
  return <span>{val.toLocaleString()}</span>;
}
function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  icon?: string;
  accent: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${accent} p-4 backdrop-blur-xl`}
    >
      <span className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
      <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">{label}</p>
      <p className="mt-1 flex items-center justify-center gap-2 text-xl font-semibold text-white">
        {icon && <span>{icon}</span>}
        {value}
      </p>
    </motion.div>
  );
}
function Badge({ text, color }: { text: string; color: string }) {
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.05 }}
      className={`inline-flex items-center rounded-full border bg-gradient-to-br ${color} px-3 py-1 text-xs font-medium backdrop-blur-md`}
    >
      {text}
    </motion.span>
  );
}
function MagneticLink({ to, children }: { to: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.a
      ref={ref}
      href={to}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(99,102,241,0.7)]"
    >
      {children}
    </motion.a>
  );
}
function ProfileCard({
  href,
  title,
  desc,
  gradient,
}: {
  href: string;
  title: string;
  desc: string;
  gradient: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <a
        href={href}
        className="relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/30 hover:shadow-[0_20px_60px_-20px_rgba(56,189,248,0.5)]"
      >
        <span
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradient} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
        />
        <span className="pointer-events-none absolute -inset-x-10 -top-1 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
        <div className="relative">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-white/60">{desc}</p>
          <p className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.25em] text-cyan-200/80">
            Open <span className="transition-transform group-hover:translate-x-1">→</span>
          </p>
        </div>
      </a>
    </motion.div>
  );
}
function ActionButton({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-sm font-medium text-white/80 backdrop-blur-md transition-all hover:border-cyan-300/30 hover:text-white hover:shadow-[0_0_40px_-10px_rgba(56,189,248,0.6)]"
    >
      <span className="relative z-10">{label}</span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </motion.a>
  );
}


export default ProfilePage;
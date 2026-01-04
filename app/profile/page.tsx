"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const API_URL = "https://skillwrap-backend.onrender.com";

interface User {
  username: string;
  email: string;
  bio?: string;
  avatar?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });

        if (!res.ok) return router.push("/login");

        const data = await res.json();
        setUser(data.user);
      } catch {
        router.push("/login");
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

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cyan-300 text-xl animate-pulse">
        Loading profile...
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white px-4 sm:px-6 py-10">
            {/* 🔙 GO BACK BUTTON */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl 
          bg-white/10 border border-white/20 backdrop-blur-md
          text-sm font-medium hover:bg-white/20 hover:scale-105 
          transition-all duration-300"
        >
          ← Go Back
        </button>
      </div>
      <div className="max-w-5xl mx-auto space-y-12">

        {/* ================= PROFILE CARD ================= */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl p-6 sm:p-8"
        >
          {/* Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-3xl blur-2xl -z-10" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            {/* Avatar */}
            <div className="relative shrink-0">
              <Image
                src={user.avatar || "/avatar-placeholder.png"}
                alt="Profile"
                width={130}
                height={130}
                className="rounded-full border-4 border-cyan-400/40 shadow-xl"
              />
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0b1220]" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold">
                {user.username}
              </h1>
              <p className="text-cyan-300 mt-1">{user.email}</p>

              <p className="mt-4 text-gray-300 max-w-xl mx-auto sm:mx-0">
                {user.bio || "No bio yet. Add one from edit profile."}
              </p>

              {/* Badges */}
              <div className="mt-5 flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge text="Member" />
                <Badge text="Verified" />
              </div>
            </div>

            {/* Edit */}
            <Link href="/edit-profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 
                border border-white/20 shadow-lg font-semibold whitespace-nowrap"
              >
                Edit Profile
              </motion.button>
            </Link>
          </div>
        </motion.section>

        {/* ================= MAIN ACTIONS ================= */}
        <section className="grid sm:grid-cols-2 gap-6">
          <ProfileCard
            href="/create-skill"
            title="➕ Create Skill"
            desc="Share your expertise with the community"
            gradient="from-cyan-500 to-blue-600"
          />

          <ProfileCard
            href="/my-skill"
            title="📂 My Skills"
            desc="Manage and update your skills"
            gradient="from-indigo-500 to-purple-600"
          />
        </section>

        {/* ================= SECONDARY ACTIONS ================= */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ActionButton label="📥 Requests" href="/request-sent" />
          <ActionButton label="⚙️ Settings" href="/settings" />

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            className="col-span-2 sm:col-span-1 py-3 rounded-xl 
            bg-gradient-to-r from-red-600 to-pink-700 
            border border-red-400/30 font-semibold shadow-lg"
          >
            🚪 Logout
          </motion.button>
        </section>
      </div>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function Badge({ text }: { text: string }) {
  return (
    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm">
      {text}
    </span>
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
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.04 }}
        className={`p-6 rounded-2xl bg-gradient-to-r ${gradient}
        border border-white/20 shadow-xl cursor-pointer`}
      >
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-white/80 text-sm">{desc}</p>
      </motion.div>
    </Link>
  );
}

function ActionButton({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="w-full py-3 rounded-xl bg-white/10 
        border border-white/20 shadow-lg font-semibold"
      >
        {label}
      </motion.button>
    </Link>
  );
}

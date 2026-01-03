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

  /* ================= FETCH USER ================= */
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Profile fetch failed", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* ================= PROFILE CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl p-8"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">

            {/* Avatar */}
            <div className="relative">
              <Image
                src={user.avatar || "/avatar-placeholder.png"}
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full border-4 border-blue-500/40 shadow-lg"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0b1220]" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">{user.username}</h1>
              <p className="text-blue-300 mt-1">{user.email}</p>

              <p className="text-gray-300 mt-3 max-w-xl">
                {user.bio || "No bio yet. Add one from edit profile."}
              </p>

              {/* Badges */}
              <div className="mt-4 flex gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 rounded-full bg-blue-600/30 text-sm">
                  Member
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-600/30 text-sm">
                  Verified
                </span>
              </div>
            </div>

            {/* Edit */}
            <Link href="/edit-profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border border-white/20 shadow-lg font-semibold"
              >
                Edit Profile
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* ================= PRIMARY ACTIONS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <Link href="/create-skill">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 border border-blue-400/40 shadow-xl cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">➕ Create Skill</h3>
              <p className="text-white/80 text-sm">
                Share your expertise with the community
              </p>
            </motion.div>
          </Link>

          <Link href="/my-skill">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 border border-indigo-400/40 shadow-xl cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">📂 My Skills</h3>
              <p className="text-white/80 text-sm">
                View and manage your uploaded skills
              </p>
            </motion.div>
          </Link>
        </div>

        {/* ================= SECONDARY ACTIONS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <Link href="/chat">
            <ActionButton label="💬 Messages" />
          </Link>
          <Link href="/my-requests">
            <ActionButton label="📥 Requests" />
          </Link>
          <ActionButton label="⚙️ Settings" />
          <ActionButton label="🚪 Logout" danger />
        </div>

      </div>
    </div>
  );
}

/* ================= BUTTON ================= */

function ActionButton({
  label,
  danger,
}: {
  label: string;
  danger?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={`py-3 px-4 rounded-xl font-semibold shadow-lg transition
        ${
          danger
            ? "bg-gradient-to-r from-red-600 to-pink-700 border border-red-400/30"
            : "bg-white/10 hover:bg-white/20 border border-white/20"
        }`}
    >
      {label}
    </motion.button>
  );
}



"use client";

import { useEffect, useState } from "react";
import {
  Edit3,
  LogOut,
  User,
  ChevronRight,
  KeyRound,
  CheckCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UserType {
  id: number;
  username: string;
  fullname: string;
  email: string;
  avatar?: string;
  bio?: string;
  mode?: string;
  img_url?: string;
}

const MODES = ["learning", "teaching", "exchanging"];

export default function SettingsPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [openModePopup, setOpenModePopup] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  // const API_URL = "https://skillwrap-backend.onrender.com";
  const API_URL = "http://localhost:4000"; // Your backend URL

  useEffect(() => {
    async function load() {
      const res = await fetch(`${API_URL}/auth/profile`, {
        credentials: "include",
      });

        if (!res.ok) return router.push("/login");

      const data = await res.json();
      const u = data.req?.user || data.user;
      setUser(u);
      setSelectedMode(u?.mode || null);
    }
    load();
  }, []);

  async function handleChangeMode() {
    if (!selectedMode || selectedMode === user?.mode) return;

    try {
      setLoading(true);
      await fetch(`${API_URL}/user/set-mode`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: selectedMode }),
      });

      setUser((prev) => prev && { ...prev, mode: selectedMode });
      setOpenModePopup(false);
    } catch (err) {
      console.error("Mode update failed", err);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <p className="text-center text-gray-400 mt-20 animate-pulse">
        Loading settings...
      </p>
    );
  }

  return (
    <main className="min-h-screen px-6 py-12 bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white">
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

      <h1 className="text-3xl font-bold text-center mb-10">Settings ⚙️</h1>

      {/* PROFILE CARD */}
      <div className="max-w-xl mx-auto bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 flex gap-4 items-center shadow-xl">
        <Image
          src={user.img_url|| "/default-avatar.png"}
          alt="avatar"
          width={64}
          height={64}
          unoptimized
          className="rounded-full border border-blue-400/40"
        />

        <div>
          <h2 className="text-xl font-semibold">{user.fullname}</h2>
          <p className="text-blue-300">@{user.username}</p>
          <p className="text-gray-400 text-sm">{user.email}</p>
          <p className="text-gray-400 text-sm">
            Mode:{" "}
            <span className="text-blue-300 font-medium">
              {user.mode || "Not selected"}
            </span>
          </p>
        </div>
      </div>

      {/* SETTINGS */}
      <div className="max-w-xl mx-auto mt-8 space-y-4">

        {/* CHANGE MODE */}
        <button
          onClick={() => setOpenModePopup(true)}
          className="w-full flex justify-between items-center p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg hover:bg-white/15 transition"
        >
          <div className="flex items-center gap-3">
            <User className="text-blue-300" />
            <span>Change Mode</span>
          </div>
          <ChevronRight />
        </button>

        <Link
          href="/edit-profile"
          className="flex justify-between items-center p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-lg hover:bg-white/15 transition"
        >
          <div className="flex items-center gap-3">
            <Edit3 className="text-yellow-300" />
            <span>Edit Profile</span>
          </div>
          <ChevronRight />
        </Link>

        <button className="w-full flex justify-between items-center p-4 rounded-xl bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 transition">
          <div className="flex items-center gap-3">
            <LogOut />
            <span>Logout</span>
          </div>
          <ChevronRight />
        </button>
      </div>

      {/* CHANGE MODE POPUP */}
      {openModePopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 w-full max-w-sm relative">
            <button
              onClick={() => setOpenModePopup(false)}
              className="absolute top-4 right-4 text-gray-400"
            >
              <X />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              Select Your Mode
            </h2>

            <div className="space-y-3">
              {MODES.map((mode) => (
                <label
                  key={mode}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer ${
                    selectedMode === mode
                      ? "border-blue-400 bg-blue-500/20"
                      : "border-white/20"
                  }`}
                >
                  <span className="capitalize">{mode}</span>
                  <input
                    type="radio"
                    checked={selectedMode === mode}
                    onChange={() => setSelectedMode(mode)}
                  />
                </label>
              ))}
            </div>

            <button
              onClick={handleChangeMode}
              disabled={loading || selectedMode === user.mode}
              className="w-full mt-6 bg-blue-600/60 hover:bg-blue-600 rounded-xl py-3 font-semibold disabled:opacity-40"
            >
              {loading ? "Updating..." : "Change Mode"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}




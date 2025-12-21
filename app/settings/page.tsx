"use client";

import { useEffect, useState } from "react";
import { Edit3, LogOut, User, ChevronRight, KeyRound } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [openPopup, setOpenPopup] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Fetch user from backend
  useEffect(() => {
    async function load() {
      const res = await fetch("http://localhost:5000/auth/profile", {
        credentials: "include",
      });

      if (!res.ok) return;
      const data = await res.json();
      setUser(data.req?.user || data.user);
    }
    load();
  }, []);

  if (!user) {
    return (
      <p className="text-center text-red-500 mt-10 text-lg animate-pulse">
        Loading...
      </p>
    );
  }

  return (
    <div className="min-h-screen px-5 py-10 bg-gradient-to-br from-[#020617] via-[#0a1224] to-[#000000] relative overflow-hidden text-white">

      {/* BACKGROUND ANIMATED BLOBS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-300"></div>
      </div>

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-8 tracking-wide">
        Settings ⚙️
      </h1>

      {/* PROFILE CARD */}
      <div className="max-w-lg mx-auto bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-xl flex gap-4 items-center">
        <img
          src={user.avatar || "/default-avatar.png"}
          className="w-16 h-16 rounded-full border border-blue-500/40 shadow-lg"
        />

        <div>
          <h2 className="text-xl font-semibold">{user.fullname}</h2>
          <p className="text-blue-300">@{user.username}</p>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>
      </div>

      {/* SETTINGS GRID */}
      <div className="max-w-lg mx-auto mt-8 space-y-4">

        <Link
          href="/edit-bio"
          className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition shadow-lg"
        >
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-blue-300" />
            <span>Edit Bio</span>
          </div>
          <ChevronRight />
        </Link>

        <Link
          href="/edit-profile"
          className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition shadow-lg"
        >
          <div className="flex items-center gap-3">
            <Edit3 className="w-5 h-5 text-yellow-300" />
            <span>Edit Profile</span>
          </div>
          <ChevronRight />
        </Link>

        <button
          onClick={() => setOpenPopup(true)}
          className="w-full flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg hover:bg-white/10 transition shadow-lg"
        >
          <div className="flex items-center gap-3">
            <KeyRound className="w-5 h-5 text-purple-300" />
            <span>Change Password</span>
          </div>
          <ChevronRight />
        </button>

        <button className="w-full flex justify-between items-center p-4 rounded-xl bg-red-500/20 border border-red-500/40 backdrop-blur-lg shadow-lg text-red-300 hover:bg-red-500/30 transition">
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </div>
          <ChevronRight />
        </button>

      </div>

      {/* POPUP */}
      {openPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-2xl w-80 shadow-2xl text-white">

            <h2 className="font-semibold text-xl mb-4">Change Password</h2>

            <input
              placeholder="Old Password"
              type="password"
              className="bg-white/10 border border-white/20 backdrop-blur-md p-2 w-full rounded mb-3 text-white"
            />

            <input
              placeholder="New Password"
              type="password"
              className="bg-white/10 border border-white/20 backdrop-blur-md p-2 w-full rounded mb-4 text-white"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenPopup(false)}
                className="px-3 py-2 bg-gray-500/30 rounded-lg"
              >
                Cancel
              </button>

              <button className="px-3 py-2 bg-blue-600 rounded-lg">
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

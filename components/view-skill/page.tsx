"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2, Edit3 } from "lucide-react";

interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  img_url?: string | null;
  created_at: string;
}

interface ApiResponse {
  success: boolean;
  skills: Skill[];
  error?: string;
}

export default function ViewSkill() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const API_URL = "https://skillwrap-backend.onrender.com";

  // Fetch skills from backend
  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch(`${API_URL}/view-skill`, { credentials: "include" });
        const data: ApiResponse = await res.json();

        if (!data.success) {
          toast.error(data.error || "Failed to load skills", { position: "top-right" });
          return;
        }

        setSkills(data.skills);
      } catch (err) {
        toast.error("Network error — please try again", { position: "top-right" });
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, [API_URL]);

  // Delete skill with proper error handling
  async function handleDelete(skillId: string, title: string) {
    const confirmDelete = window.confirm(`Delete skill "${title}"?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/skill/${skillId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data: { success?: boolean; error?: string } = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.error || "❌ Failed to delete skill", { position: "top-right" });
        return;
      }

      setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
      toast.success(`✅ Deleted "${title}" successfully`, { position: "top-right" });
    } catch {
      toast.error("⚠️ Network error — please try again.", { position: "top-right" });
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-blue-300 text-lg font-josefin">
        Loading your skills...
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl font-semibold font-josefin">
        You haven’t added any skills yet 😔
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050617] via-[#0b1220] to-[#05070c] text-white px-6 py-14 relative overflow-hidden">
      <ToastContainer newestOnTop />

      {/* Background Glass Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-300"></div>
      </div>

      <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
        Your Skills Dashboard ⚡
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-6 shadow-xl hover:scale-[1.02] transition-all"
          >
            {skill.img_url && (
              <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
                <Image src={skill.img_url} alt={skill.title} fill className="object-cover" />
              </div>
            )}

            <h2 className="text-2xl font-semibold text-blue-300 mb-1">{skill.title}</h2>
            <p className="text-gray-300 text-sm mb-1">
              <span className="text-cyan-300 font-medium">Category:</span> {skill.category}
            </p>
            <p className="text-gray-400 mb-3 line-clamp-3">{skill.description}</p>

            <div className="flex justify-between text-sm text-gray-400 mb-4">
              <p>
                <span className="text-purple-400 font-medium">Level:</span> {skill.level}
              </p>
              <p>
                Added{" "}
                {new Date(skill.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="flex gap-3">
              <Link href={`/skill/${skill.id}/edit-skill`}>
                <button className="flex items-center gap-2 bg-blue-500/80 hover:bg-blue-400 px-4 py-2 rounded-xl font-semibold">
                  <Edit3 className="w-4 h-4" /> Edit
                </button>
              </Link>

              <button
                onClick={() => handleDelete(skill.id, skill.title)}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-500 px-4 py-2 rounded-xl font-semibold"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2, Edit3 } from "lucide-react";

/* ================= TYPES ================= */

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

/* ================= COMPONENT ================= */

export default function ViewSkill() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

  /* ================= FETCH SKILLS ================= */

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch(`${API_URL}/view-skill`, {
          credentials: "include",
        });

        const data: ApiResponse = await res.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to load skills");
        }

        setSkills(data.skills);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  /* ================= DELETE SKILL ================= */

  async function handleDelete(skillId: string, title: string) {
    const confirmDelete = window.confirm(`Delete skill "${title}"?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/skill/${skillId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data: { error?: string } = await res.json();

      if (!res.ok) {
        toast.error(data.error || "❌ Failed to delete skill");
        return;
      }

      setSkills((prev) => prev.filter((skill) => skill.id !== skillId));

      toast.success(`✅ Deleted "${title}" successfully`, {
        position: "top-right",
        autoClose: 2500,
        theme: "dark",
      });
    } catch {
      toast.error("⚠️ Network error — please try again.");
    }
  }

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-blue-300 text-lg font-josefin">
        Loading your skills...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-400 text-lg font-josefin">
        {error}
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

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1024] via-[#0f1a3a] to-[#010818] text-white px-6 py-16 font-['Josefin_Sans'] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,100,255,0.15),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(0,200,255,0.1),transparent_70%)] blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Your Skills Dashboard ⚡
        </motion.h1>

        <ToastContainer />

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-6 shadow-lg hover:scale-[1.02] transition-all"
            >
              {skill.img_url && (
                <div className="relative w-full h-40 mb-5">
                  <Image
                    src={skill.img_url}
                    alt={skill.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              )}

              <h2 className="text-2xl font-semibold text-blue-300 mb-1">
                {skill.title}
              </h2>

              <p className="text-gray-300 text-sm mb-3">
                <span className="text-cyan-300 font-medium">Category:</span>{" "}
                {skill.category}
              </p>

              <p className="text-gray-400 mb-4 line-clamp-3">
                {skill.description}
              </p>

              <div className="flex justify-between text-sm text-gray-400">
                <p>
                  <span className="text-purple-400 font-medium">Level:</span>{" "}
                  {skill.level}
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

              <div className="flex gap-3 mt-6">
                <Link href={`/skill/${skill.id}/edit-skill`}>
                  <button className="flex items-center gap-2 bg-blue-500/80 hover:bg-blue-400 px-4 py-2 rounded-lg font-semibold">
                    <Edit3 className="w-4 h-4" /> Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(skill.id, skill.title)}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-500 px-4 py-2 rounded-lg font-semibold"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

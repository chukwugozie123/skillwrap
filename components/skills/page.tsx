"use client";

import { useEffect, useRef, useState } from "react";
import UserPage from "@/components/user/page";

/* ================= TYPES ================= */

interface SkillType {
  id: number;
  title: string;
  category: string;
  description: string;
  level: string;
  user_id?: number;
}

/* ================= PAGE ================= */

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ useRef instead of state (fixes dependency warning)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* ================= FETCH ALL SKILLS ================= */

  useEffect(() => {
    async function fetchSkills() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/skills", {
          credentials: "include",
        });

        const data = await res.json();

        const skillsArray: SkillType[] = Array.isArray(data)
          ? data
          : Array.isArray(data.skills)
          ? data.skills
          : [];

        setSkills(skillsArray);
        sessionStorage.setItem("skillsData", JSON.stringify(skillsArray));
      } catch {
        setError("Failed to fetch skills");
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  /* ================= DEBOUNCED SEARCH ================= */

  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const endpoint = searchTerm.trim()
          ? `http://localhost:5000/search?title=${encodeURIComponent(searchTerm)}`
          : "http://localhost:5000/skills";

        const res = await fetch(endpoint, { credentials: "include" });
        const data = await res.json();

        const skillsArray: SkillType[] = Array.isArray(data)
          ? data
          : Array.isArray(data.skills)
          ? data.skills
          : [];

        setSkills(skillsArray);
        sessionStorage.setItem("skillsData", JSON.stringify(skillsArray));
      } catch {
        setError("Network error while searching");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* 🔍 Search Bar */}
      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg py-4 px-6 flex justify-center">
        <div className="w-full max-w-3xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills, categories or creators..."
            className="w-full px-5 py-3 text-lg text-white placeholder-gray-300 bg-white/10 
                       border border-white/20 rounded-2xl focus:outline-none 
                       focus:ring-4 focus:ring-cyan-500/40 backdrop-blur-xl transition-all"
          />
        </div>
      </div>

      {/* Content */}
      <div className="pt-28 px-6">
        <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          🚀 Discover Amazing Skills
        </h1>

        {error && (
          <p className="text-center text-red-400 mt-4 font-medium">{error}</p>
        )}

        <div className="mt-10 w-full max-w-6xl mx-auto">
          {loading ? (
            <p className="text-center text-cyan-300 text-xl">Loading...</p>
          ) : (
            <UserPage skills={skills} />
          )}
        </div>
      </div>
    </div>
  );
}

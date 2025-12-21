"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import UserPage from "@/components/user/page";

export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // ✅ Fetch all skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/skills", {
          credentials: "include",
        });
        const data = await res.json();

        const skillsArray = Array.isArray(data)
          ? data
          : Array.isArray(data.skills)
          ? data.skills
          : [];

        setSkills(skillsArray);

        // ✅ Save to sessionStorage for ExchangeSkill page
        sessionStorage.setItem("skillsData", JSON.stringify(skillsArray));
      } catch (err) {
        setError("Failed to fetch skills");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // ✅ Debounced search
  useEffect(() => {
    if (!searchTerm.trim()) {
      const fetchAll = async () => {
        const res = await fetch("http://localhost:5000/skills", {
          credentials: "include",
        });
        const data = await res.json();
        const skillsArray = Array.isArray(data)
          ? data
          : Array.isArray(data.skills)
          ? data.skills
          : [];
        setSkills(skillsArray);
        sessionStorage.setItem("skillsData", JSON.stringify(skillsArray));
      };
      fetchAll();
      return;
    }

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/search?title=${encodeURIComponent(searchTerm)}`,
          { credentials: "include" }
        );
        const data = await res.json();
        const skillsArray = Array.isArray(data)
          ? data
          : Array.isArray(data.skills)
          ? data.skills
          : [];
        setSkills(skillsArray);
        sessionStorage.setItem("skillsData", JSON.stringify(skillsArray));
      } catch (err) {
        setError("Network error while searching");
      } finally {
        setLoading(false);
      }
    }, 500);

    setTypingTimeout(timeout);
  }, [searchTerm]);

  const { pending } = useFormStatus();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* 🔍 Search Bar */}
      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg py-4 px-6 flex justify-center items-center">
        <div className="w-full max-w-3xl">
          <input
            type="text"
            name="skill"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills, categories or creators..."
            className="w-full px-5 py-3 text-lg text-white placeholder-gray-300 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-500/40 backdrop-blur-xl transition-all"
          />
        </div>
      </div>

      {/* Skills Section */}
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

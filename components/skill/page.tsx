"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Skills() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch("http://localhost:5000");
        if (!res.ok) throw new Error("Failed to fetch skills");
        const data = await res.json();
        setSkills(data.skill || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b] font-josefin text-white relative overflow-hidden">
      {/* Animated background glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[180px] rounded-full animate-pulse" />

      {/* Title */}
      <div className="text-center relative z-10 mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          🚀 Discover & Exchange Skills
        </h1>
        <p className="text-gray-400 mt-3 text-lg max-w-xl mx-auto">
          Explore top skills from talented creators and connect instantly to exchange knowledge.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-center text-red-400 mt-4 font-medium">{error}</p>
      )}

      {/* Skill Cards Section */}
      <div className="relative z-10 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-transparent">
        <div className="flex gap-8 justify-start px-4 pb-8 min-w-max">
          {loading ? (
            <p className="text-center text-cyan-300 text-xl w-full">
              Loading...
            </p>
          ) : skills.length > 0 ? (
            skills.map((skill, index) => (
              <div
                key={skill.id}
                className="relative group bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl shadow-xl overflow-hidden w-[300px] flex-shrink-0 
                hover:-translate-y-2 hover:shadow-cyan-500/30 transition-all duration-500 ease-out"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Skill Image */}
                <Link href={`/skills/${skill.id}`}>
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={`http://localhost:5000/uploads/${
                        skill.skill_img || "default.png"
                      }`}
                      alt={skill.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent opacity-90"></div>
                  </div>
                </Link>

                {/* Skill Info */}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-cyan-300 mb-1 truncate">
                    {skill.title}
                  </h2>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {skill.description}
                  </p>

                  <div className="flex justify-between mb-5">
                    <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                      {skill.category}
                    </span>
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                      {skill.level}
                    </span>
                  </div>

                  {/* Button */}
                  <Link href="/exchange_skill">
                    <button
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 font-semibold text-white 
                      shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-[1.03] 
                      active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      🤝 Exchange Skill <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 w-full">
              No skills found 😞
            </p>
          )}
        </div>
      </div>

      {/* Floating glow elements */}
      <div className="absolute top-20 right-10 w-28 h-28 bg-cyan-400/30 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />
    </div>
  );
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  userMode: "learning" | "exchanging" | "teaching" | null;
  onClose: () => void;
};

type AIMatch = {
  userId: number;
  fullname: string;
  username: string;
  profileImage?: string; // user profile image
  skillId: number;
  skillOffered: string;
  skill_img?: string; // skill image
  level?: string;
  category?: string;
  matchScore: number;
  reason: string;
};

export default function AISkillMatchModal({ userMode, onClose }: Props) {
  const [skillToLearn, setSkillToLearn] = useState("");
  const [skillToOffer, setSkillToOffer] = useState("");
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<AIMatch[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  // const API_URL = "http://localhost:4000";
    const API_URL = "https://skillwrap-backend.onrender.com";

  const handleSubmit = async () => {
    if (!skillToLearn) return alert("Please enter a skill you want to learn");

    setLoading(true);
    setError("");
    setMatches([]);

    try {
      const res = await fetch(`${API_URL}/match-skill`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skillToLearn,
          skillToOffer: userMode === "exchanging" ? skillToOffer : undefined,
        }),
      });

      const data = await res.json();
      if (!data.success) return setError(data.message || "Failed to find matches");

      setMatches(data.matches || []);
    } catch {
      setError("Failed to fetch AI matches");
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = (match: AIMatch) => {
    
    sessionStorage.setItem("selectedSkill", JSON.stringify(match));
    console.log(match)
    if (userMode === "learning") router.push("/request_learn");
    if (userMode === "exchanging") router.push("/exchange_skill");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-3xl bg-[#0f172a] border border-white/20 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          AI Skill Match
        </h2>

        {/* Inputs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            value={skillToLearn}
            onChange={(e) => setSkillToLearn(e.target.value)}
            placeholder="Skill you want to learn"
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/40"
          />
          {userMode === "exchanging" && (
            <input
              value={skillToOffer}
              onChange={(e) => setSkillToOffer(e.target.value)}
              placeholder="Skill you can offer"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-4 focus:ring-cyan-500/40"
            />
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 disabled:opacity-50 font-semibold"
          >
            {loading ? "Finding..." : "Find Matches"}
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-red-400 text-center mb-2">{error}</p>}

        {/* Matches List */}
        <div className="overflow-y-auto flex-1 space-y-4">
          {matches.length > 0 ? (
            matches.map((m) => (
              <div
                key={m.userId + "-" + m.skillId}
                className="bg-white/10 hover:bg-white/20 transition-all p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-md"
              >
                {/* User Profile */}
                <div
                  className="w-16 h-16 relative rounded-full overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/profiles/${m.userId}`)}
                >
                  <Image
                    src={m.profileImage || "/default-user.png"}
                    alt={m.username}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Skill Image */}
                {m.skill_img && (
                  <div
                    className="w-20 h-20 relative rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/skills/${m.skillId}`)}
                  >
                    <Image src={m.skill_img} alt={m.skillOffered} fill className="object-cover" unoptimized />
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 flex flex-col">
                  <p
                    className="font-semibold text-white cursor-pointer hover:underline"
                    onClick={() => router.push(`/profiles/${m.userId}`)}
                  >
                    {m.fullname} (@{m.username})
                  </p>
                  <p className="text-sm text-white/70 mt-1">
                    Skill: <span className="font-medium">{m.skillOffered}</span>
                    {m.level && ` | Level: ${m.level}`}
                    {m.category && ` | Category: ${m.category}`}
                  </p>
                  <p className="text-sm text-cyan-300 mt-1">{m.reason}</p>
                </div>

                {/* Score & Action */}
                <div className="flex flex-col items-end gap-2">
                  <p className="font-bold text-cyan-400 text-lg">{m.matchScore}</p>
                  {(userMode === "learning" || userMode === "exchanging") && (
                    <button
                      onClick={() => handleRequest(m)}
                      className="py-1 px-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm hover:scale-105 transition"
                    >
                      {userMode === "learning" ? "📘 Request to Learn" : "🤝 Request Exchange"}
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : !loading ? (
            <p className="text-center text-white/60 mt-2">No matches yet. Try searching!</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState, useMemo } from "react";
import UserPage from "@/components/user/page";
import AISkillMatchModal from "@/components/AIskillSMatchModel/page";

/* ================= TYPES ================= */
export type Skill = {
  skillId: number;
  title: string;
  description?: string;
  category?: string;
  level?: string;
  username?: string;
  skill_img?: string;
  image_url?: string;
  ownerId?: number;
};

type UserMode = "learning" | "teaching" | "exchanging" | null;

/* ================= PAGE ================= */
export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [userMode, setUserMode] = useState<UserMode>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAIModal, setShowAIModal] = useState(false);

  // 🔥 NEW FILTER STATES
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  // const API_URL = "http://localhost:4000";
  const API_URL = "https://skillwrap-backend.onrender.com";

  /* ================= FETCH USER MODE ================= */
  useEffect(() => {
    fetch(`${API_URL}/auth/profile`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUserMode(data.user?.mode ?? null))
      .catch(() => setUserMode(null));
  }, []);

  /* ================= FETCH SKILLS ================= */
  useEffect(() => {
    async function fetchSkills() {
      try {
        setLoading(true);
        const endpoint = searchTerm.trim()
          ? `${API_URL}/search?title=${encodeURIComponent(searchTerm)}`
          : `${API_URL}/skills`;
        const res = await fetch(endpoint, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch skills");
        const data = await res.json();
        const normalizedSkills: Skill[] = Array.isArray(data.skills)
          ? data.skills.map((s: any) => ({
              skillId: s.skillId ?? s.id,
              title: s.title,
              description: s.description,
              category: s.category,
              level: s.level,
              username: s.username,
              skill_img: s.skillImg,
              image_url: s.image_url,
              ownerId: s.ownerId,
              mode: s.mode,
            }))
          : [];
        setSkills(normalizedSkills);
      } catch (err) {
        setError("Unable to load skills");
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, [searchTerm]);

  /* ================= FILTER OPTIONS ================= */
  const categories = useMemo(() => {
    const unique = new Set(skills.map((s) => s.category).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [skills]);

  const levels = useMemo(() => {
    const unique = new Set(skills.map((s) => s.level).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [skills]);

  /* ================= FILTERED SKILLS ================= */
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" || skill.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "All" || skill.level === selectedLevel;
      const matchesSearch = skill.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [skills, selectedCategory, selectedLevel, searchTerm]);

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* SEARCH */}
      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 py-4 px-6 flex justify-center">
        <div className="w-full max-w-3xl flex gap-4">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills..."
            className="flex-1 px-5 py-3 text-lg bg-white/10 border border-white/20 rounded-2xl
              focus:outline-none focus:ring-4 focus:ring-cyan-500/40"
          />

          {/* AI Button */}
          <button
            onClick={() => setShowAIModal(true)}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-lg
              bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-transform shadow-lg"
          >
            🤖 Find Skill Partners
          </button>
        </div>
      </div>

      <div className="pt-28 px-6 max-w-6xl mx-auto flex gap-10">
        {/* ================= SIDEBAR FILTER ================= */}
        <div className="w-64 bg-white/5 p-6 rounded-2xl border border-white/10 h-fit flex-shrink-0">
          <h2 className="text-xl font-semibold mb-6 text-cyan-300">Filters</h2>

          <div className="mb-6">
            <label className="text-sm text-gray-400">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#0f172a]">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-400">Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl} className="bg-[#0f172a]">
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ================= SKILL CARDS ================= */}
        <div className="flex-1">
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          {loading ? (
            <p className="text-center text-cyan-300 text-xl animate-pulse">
              Loading...
            </p>
          ) : (
            <UserPage skills={filteredSkills} userMode={userMode} />
          )}
        </div>
      </div>

      {/* ================= AI MODAL ================= */}
      {showAIModal && userMode && (
        <AISkillMatchModal
          userMode={userMode}
          onClose={() => setShowAIModal(false)}
        />
      )}
    </div>
  );
}

// "use client";

// import { useEffect, useRef, useState } from "react";
// import UserPage from "@/components/user/page";
// import AISkillMatchModal from "@/components/AIskillSMatchModel/page";

// /* ================= TYPES ================= */
// export type Skill = {
//   skillId: number;
//   title: string;
//   description?: string;
//   category?: string;
//   level?: string;
//   username?: string;
//   skill_img?: string;
//   image_url?: string;
//   ownerId?: number;
// };

// type UserMode = "learning" | "teaching" | "exchanging" | null;

// /* ================= PAGE ================= */
// export default function SkillsPage() {
//   const [skills, setSkills] = useState<Skill[]>([]);
//   const [userMode, setUserMode] = useState<UserMode>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showAIModal, setShowAIModal] = useState(false);

//   const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // const API_URL = "http://localhost:4000"; // Your backend URL
//     const API_URL = "https://skillwrap-backend.onrender.com";

//   /* ================= FETCH USER MODE ================= */
//   useEffect(() => {
//     fetch(`${API_URL}/auth/profile`, { credentials: "include" })
//       .then((res) => res.json())
//       .then((data) => setUserMode(data.user?.mode ?? null))
//       .catch(() => setUserMode(null));
//   }, []);

//   /* ================= FETCH SKILLS (WITH DEBOUNCE) ================= */
//   useEffect(() => {
//     if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

//     typingTimeoutRef.current = setTimeout(async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const endpoint = searchTerm.trim()
//           ? `${API_URL}/search?title=${encodeURIComponent(searchTerm)}`
//           : `${API_URL}/skills`;

//         const res = await fetch(endpoint, { credentials: "include" });

//         if (!res.ok) throw new Error("Failed to fetch skills");

//         const data = await res.json();

//         const normalizedSkills: Skill[] = Array.isArray(data.skills)
//           ? data.skills.map((s: any) => ({
//               skillId: s.skillId ?? s.id,
//               title: s.title,
//               description: s.description,
//               category: s.category,
//               level: s.level,
//               username: s.username,
//               skill_img: s.skillImg,
//               image_url: s.image_url,
//               ownerId: s.ownerId,
//               mode: s.mode,
//             }))
//           : [];

//         setSkills(normalizedSkills);
//       } catch (err) {
//         setError("Unable to load skills");
//       } finally {
//         setLoading(false);
//       }
//     }, 400);

//     console.log(skills, "skillss")

//     return () => {
//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//     };
//   }, [searchTerm]);

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
//       {/* SEARCH */}
//       <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 py-4 px-6 flex justify-center">
//         <div className="w-full max-w-3xl">
//           <input
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search skills..."
//             className="w-full px-5 py-3 text-lg bg-white/10 border border-white/20 rounded-2xl
//               focus:outline-none focus:ring-4 focus:ring-cyan-500/40"
//           />
//         </div>
//       </div>

//       <div className="pt-28 px-6 max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-6 sm:mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//           Discover Skills
//         </h1>

//         {/* AI Button on the right */}
//         <div className="flex justify-end mb-8">
//           <button
//             onClick={() => setShowAIModal(true)}
//             className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-lg
//               bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-transform shadow-lg"
//           >
//             🤖 Find Skill Partners (AI)
//           </button>
//         </div>

//         {error && <p className="text-center text-red-400">{error}</p>}

//         {loading ? (
//           <p className="text-center text-cyan-300 text-xl animate-pulse">
//             Loading...
//           </p>
//         ) : (
//           <UserPage skills={skills} userMode={userMode} />
//         )}
//       </div>

//       {/* ================= AI MODAL ================= */}
//       {showAIModal && userMode && (
//         <AISkillMatchModal
//           userMode={userMode}
//           onClose={() => setShowAIModal(false)}
//         />
//       )}
//     </div>
//   );
// }

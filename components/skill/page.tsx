"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";

/* ================= TYPES ================= */
type Skill = {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  skill_img?: string | null;
};

/* ================= CONFIG ================= */
const API_URL = "https://skillwrap-backend.onrender.com";

/* ================= COMPONENT ================= */
export default function HomePage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔥 NEW FILTER STATES
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [search, setSearch] = useState("");

  /* ================= FETCH SKILLS ================= */
  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch(`${API_URL}/skills`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch skills");

        const data = await res.json();
        setSkills(Array.isArray(data.skills) ? data.skills : []);
      } catch (err) {
        setError("Unable to load skills");
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  /* ================= UNIQUE FILTER OPTIONS ================= */
  const categories = useMemo(() => {
    const unique = new Set(skills.map((s) => s.category));
    return ["All", ...Array.from(unique)];
  }, [skills]);

  const levels = useMemo(() => {
    const unique = new Set(skills.map((s) => s.level));
    return ["All", ...Array.from(unique)];
  }, [skills]);

  /* ================= FILTERED SKILLS ================= */
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" ||
        skill.category === selectedCategory;

      const matchesLevel =
        selectedLevel === "All" ||
        skill.level === selectedLevel;

      const matchesSearch =
        skill.title.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [skills, selectedCategory, selectedLevel, search]);

  /* ================= UI ================= */
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b] text-white">
      
      {/* TITLE */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
          🚀 Discover & Exchange Skills
        </h1>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Explore top skills from talented creators and connect instantly.
        </p>
      </div>

      <div className="flex gap-10">

        {/* ================= SIDEBAR ================= */}
        <div className="w-64 bg-white/5 p-6 rounded-2xl border border-white/10 h-fit">
          <h2 className="text-xl font-semibold mb-6 text-cyan-300">
            Filter Skills
          </h2>

          {/* SEARCH */}
          <div className="mb-6">
            <label className="text-sm text-gray-400">Search Title</label>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 focus:outline-none"
            />
          </div>

          {/* CATEGORY */}
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

          {/* LEVEL */}
          <div>
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

        {/* ================= SKILLS LIST ================= */}
        <div className="flex gap-8 overflow-x-auto pb-8 flex-1">
          {loading && (
            <p className="text-center text-cyan-300 text-xl">Loading...</p>
          )}

          {error && (
            <p className="text-center text-red-400">{error}</p>
          )}

          {!loading && filteredSkills.length === 0 && (
            <p className="text-gray-400">No skills match your filter 😞</p>
          )}

          {filteredSkills.map((skill) => {
            const imageSrc = skill.skill_img
              ? `${API_URL}/uploads/${skill.skill_img}`
              : "/default-skill.png";

            return (
              <div
                key={skill.id}
                className="w-[300px] flex-shrink-0 bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition"
              >
                <Link href={`/skills/${skill.id}`}>
                  <div className="relative h-48">
                    <Image
                      src={imageSrc}
                      alt={skill.title}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>
                </Link>

                <div className="p-5">
                  <h2 className="text-lg font-semibold text-cyan-300 truncate">
                    {skill.title}
                  </h2>

                  <p className="text-gray-300 text-sm line-clamp-3 mt-2">
                    {skill.description}
                  </p>

                  <div className="flex justify-between mt-4">
                    <span className="text-xs bg-cyan-500/20 px-3 py-1 rounded-full">
                      {skill.category}
                    </span>
                    <span className="text-xs bg-blue-500/20 px-3 py-1 rounded-full">
                      {skill.level}
                    </span>
                  </div>

                  <Link href="/exchange_skill">
                    <button className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold flex items-center justify-center gap-2">
                      Exchange Skill <ArrowRight size={16} />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}






// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { ArrowRight } from "lucide-react";

// /* ================= TYPES ================= */
// type Skill = {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   level: string;
//   skill_img?: string | null;
// };

// /* ================= CONFIG ================= */
// const API_URL = "https://skillwrap-backend.onrender.com";

// /* ================= COMPONENT ================= */
// export default function HomePage() {
//   const [skills, setSkills] = useState<Skill[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   /* ================= FETCH SKILLS ================= */
//   useEffect(() => {
//     async function fetchSkills() {
//       try {
//         const res = await fetch(`${API_URL}/skills`, {
//           cache: "no-store",
//         });

//         if (!res.ok) throw new Error("Failed to fetch skills");

//         const data = await res.json();
//         setSkills(Array.isArray(data.skills) ? data.skills : []);
//       } catch (err) {
//         setError("Unable to load skills");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchSkills();
//   }, []);

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen pt-24 pb-20 px-6 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b] text-white relative overflow-hidden">
//       {/* TITLE */}
//       <div className="text-center mb-16">
//         <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
//           🚀 Discover & Exchange Skills
//         </h1>
//         <p className="text-gray-400 mt-4 max-w-xl mx-auto">
//           Explore top skills from talented creators and connect instantly.
//         </p>
//       </div>

//       {/* ERROR */}
//       {error && <p className="text-center text-red-400">{error}</p>}

//       {/* LOADING */}
//       {loading && (
//         <p className="text-center text-cyan-300 text-xl">Loading...</p>
//       )}

//       {/* SKILLS */}
//       {!loading && skills.length === 0 && (
//         <p className="text-center text-gray-400">No skills found 😞</p>
//       )}

//       <div className="flex gap-8 overflow-x-auto pb-8">
//         {skills.map((skill) => {
//           const imageSrc = skill.skill_img
//             ? `${API_URL}/uploads/${skill.skill_img}`
//             : "/default-skill.png"; // local fallback

//           return (
//             <div
//               key={skill.id}
//               className="w-[300px] flex-shrink-0 bg-white/10 border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition"
//             >
//               <Link href={`/skills/${skill.id}`}>
//                 <div className="relative h-48">
//                   <Image
//                     src={imageSrc}
//                     alt={skill.title}
//                     fill
//                     sizes="300px"
//                     className="object-cover"
//                   />
//                 </div>
//               </Link>

//               <div className="p-5">
//                 <h2 className="text-lg font-semibold text-cyan-300 truncate">
//                   {skill.title}
//                 </h2>

//                 <p className="text-gray-300 text-sm line-clamp-3 mt-2">
//                   {skill.description}
//                 </p>

//                 <div className="flex justify-between mt-4">
//                   <span className="text-xs bg-cyan-500/20 px-3 py-1 rounded-full">
//                     {skill.category}
//                   </span>
//                   <span className="text-xs bg-blue-500/20 px-3 py-1 rounded-full">
//                     {skill.level}
//                   </span>
//                 </div>

//                 <Link href="/exchange_skill">
//                   <button className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold flex items-center justify-center gap-2">
//                     Exchange Skill <ArrowRight size={16} />
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

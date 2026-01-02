



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
//   skill_img?: string;
// };

// /* ================= CONFIG ================= */
// // const API_URL = process.env.NEXT_PUBLIC_API_URL;
//  const API_URL= 'https://skillwrap-backend.onrender.com'

// /* ================= COMPONENT ================= */
// export default function Skills() {
//   const [skills, setSkills] = useState<Skill[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   /* ================= FETCH SKILLS ================= */
//   useEffect(() => {
//     if (!API_URL) {
//       setError("API URL is not configured");
//       setLoading(false);
//       return;
//     }

//     const fetchSkills = async () => {
//       try {
//         const res = await fetch(`${API_URL}`);

//         if (!res.ok) {
//           throw new Error("Failed to fetch skills");
//         }

//         const data: { skill?: Skill[] } = await res.json();
//         setSkills(data.skill ?? []);
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "An unexpected error occurred"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSkills();
//   }, []);

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen pt-24 pb-20 px-6 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b] font-josefin text-white relative overflow-hidden">
//       {/* Background glows */}
//       <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full animate-pulse" />
//       <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[180px] rounded-full animate-pulse" />

//       {/* Title */}
//       <div className="text-center relative z-10 mb-16">
//         <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
//           🚀 Discover & Exchange Skills
//         </h1>
//         <p className="text-gray-400 mt-3 text-lg max-w-xl mx-auto">
//           Explore top skills from talented creators and connect instantly to exchange knowledge.
//         </p>
//       </div>

//       {/* Error */}
//       {error && (
//         <p className="text-center text-red-400 mt-4 font-medium">{error}</p>
//       )}

//       {/* Skill Cards */}
//       <div className="relative z-10 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-transparent">
//         <div className="flex gap-8 justify-start px-4 pb-8 min-w-max">
//           {loading ? (
//             <p className="text-center text-cyan-300 text-xl w-full">
//               Loading...
//             </p>
//           ) : skills.length > 0 ? (
//             skills.map((skill) => (
//               <div
//                 key={skill.id}
//                 className="relative group bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl shadow-xl overflow-hidden w-[300px] flex-shrink-0 
//                 hover:-translate-y-2 hover:shadow-cyan-500/30 transition-all duration-500"
//               >
//                 {/* Image */}
//                 <Link href={`/skills/${skill.id}`}>
//                   <div className="relative w-full h-48 overflow-hidden">
//                     <Image
//                       src={`${API_URL}/uploads/${skill.skill_img ?? "default.png"}`}
//                       alt={skill.title}
//                       fill
//                       sizes="300px"
//                       className="object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent" />
//                   </div>
//                 </Link>

//                 {/* Info */}
//                 <div className="p-5">
//                   <h2 className="text-lg font-semibold text-cyan-300 mb-1 truncate">
//                     {skill.title}
//                   </h2>

//                   <p className="text-gray-300 text-sm mb-4 line-clamp-3">
//                     {skill.description}
//                   </p>

//                   <div className="flex justify-between mb-5">
//                     <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs">
//                       {skill.category}
//                     </span>
//                     <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">
//                       {skill.level}
//                     </span>
//                   </div>

//                   <Link href="/exchange_skill">
//                     <button
//                       className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 font-semibold text-white 
//                       shadow-lg hover:scale-[1.03] active:scale-95 transition flex items-center justify-center gap-2"
//                     >
//                       🤝 Exchange Skill <ArrowRight size={16} />
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-400 w-full">
//               No skills found 😞
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }












"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
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

  /* ================= UI ================= */
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b] text-white relative overflow-hidden">
      {/* TITLE */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
          🚀 Discover & Exchange Skills
        </h1>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Explore top skills from talented creators and connect instantly.
        </p>
      </div>

      {/* ERROR */}
      {error && <p className="text-center text-red-400">{error}</p>}

      {/* LOADING */}
      {loading && (
        <p className="text-center text-cyan-300 text-xl">Loading...</p>
      )}

      {/* SKILLS */}
      {!loading && skills.length === 0 && (
        <p className="text-center text-gray-400">No skills found 😞</p>
      )}

      <div className="flex gap-8 overflow-x-auto pb-8">
        {skills.map((skill) => {
          const imageSrc = skill.skill_img
            ? `${API_URL}/uploads/${skill.skill_img}`
            : "/default-skill.png"; // local fallback

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
  );
}

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
  skill_img?: string;
};

/* ================= COMPONENT ================= */
export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
     const API_URL = process.env.NEXT_PUBLIC_API_URL;

  /* ================= FETCH SKILLS ================= */
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(`${API_URL}`);

        if (!res.ok) {
          throw new Error("Failed to fetch skills");
        }

        const data: { skill?: Skill[] } = await res.json();
        setSkills(data.skill ?? []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [API_URL]);

  /* ================= UI ================= */
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e293b] font-josefin text-white relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[180px] rounded-full animate-pulse" />

      {/* Title */}
      <div className="text-center relative z-10 mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
          🚀 Discover & Exchange Skills
        </h1>
        <p className="text-gray-400 mt-3 text-lg max-w-xl mx-auto">
          Explore top skills from talented creators and connect instantly to exchange knowledge.
        </p>
      </div>

      {/* Error */}
      {error && (
        <p className="text-center text-red-400 mt-4 font-medium">{error}</p>
      )}

      {/* Skill Cards */}
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
                hover:-translate-y-2 hover:shadow-cyan-500/30 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <Link href={`/skills/${skill.id}`}>
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={`http://localhost:5000/uploads/${skill.skill_img ?? "default.png"}`}
                      alt={skill.title}
                      fill
                      sizes="300px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent" />
                  </div>
                </Link>

                {/* Info */}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-cyan-300 mb-1 truncate">
                    {skill.title}
                  </h2>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {skill.description}
                  </p>

                  <div className="flex justify-between mb-5">
                    <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs">
                      {skill.category}
                    </span>
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs">
                      {skill.level}
                    </span>
                  </div>

                  <Link href="/exchange_skill">
                    <button
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 font-semibold text-white 
                      shadow-lg hover:scale-[1.03] active:scale-95 transition flex items-center justify-center gap-2"
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

      {/* Extra glows */}
      <div className="absolute top-20 right-10 w-28 h-28 bg-cyan-400/30 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />
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
//   skill_img?: string;
// };

// /* ================= COMPONENT ================= */
// export default function Skills() {
//   const [skills, setSkills] = useState<Skill[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//     const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   /* ================= FETCH SKILLS ================= */
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const res = await fetch(`${API_URL}`);

//         if (!res.ok) {
//           throw new Error("Failed to fetch skills");
//         }

//         const data: { skill?: Skill[] } = await res.json();
//         setSkills(data.skill ?? []);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("An unexpected error occurred");
//         }
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
//             skills.map((skill, index) => (
//               <div
//                 key={skill.id}
//                 className="relative group bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl shadow-xl overflow-hidden w-[300px] flex-shrink-0 
//                 hover:-translate-y-2 hover:shadow-cyan-500/30 transition-all duration-500"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 {/* Image */}
//                 <Link href={`/skills/${skill.id}`}>
//                   <div className="relative w-full h-48 overflow-hidden">
//                     <Image
//                       src={`http://localhost:5000/uploads/${skill.skill_img ?? "default.png"}`}
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

//       {/* Extra glows */}
//       <div className="absolute top-20 right-10 w-28 h-28 bg-cyan-400/30 blur-3xl rounded-full animate-pulse" />
//       <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-500/20 blur-2xl rounded-full animate-pulse" />
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Trash2, Edit3, ExternalLink, Youtube } from "lucide-react";
// import { useRouter } from "next/navigation";

// import SkillImageEditor from "@/components/skillPicture/page";

// interface Skill {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
//   level: string;
//   created_at: string;
//   skill_img: string;

//   // 🔥 upgraded fields
//   learningpoint?: string;
//   portfolio_link?: string | null;
//   youtubelink?: string | null;
//   user_id?: number;
//   skill_img_public_id?: string | null;
// }

// interface ApiResponse {
//   success: boolean;
//   skills: Skill[];
//   error?: string;
// }

// export default function ViewSkill() {
//   const [skills, setSkills] = useState<Skill[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const API_URL = "http://localhost:4000";
//   // const API_URL = "https://skillwrap-backend.onrender.com";

//   useEffect(() => {
//     async function fetchSkills() {
//       try {
//         const res = await fetch(`${API_URL}/view-skill`, {
//           credentials: "include",
//         });
//         const data: ApiResponse = await res.json();

//         if (!data.success) {
//           toast.error(data.error || "Failed to load skills");
//           return;
//         }

//         setSkills(data.skills);
//       } catch {
//         toast.error("Network error");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchSkills();
//   }, []);

//   async function handleDelete(skillId: string, title: string) {
//     if (!confirm(`Delete "${title}"?`)) return;

//     try {
//       const res = await fetch(`${API_URL}/skill/${skillId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (!data.success) {
//         toast.error(data.error || "Delete failed");
//         return;
//       }

//       setSkills((prev) => prev.filter((s) => s.id !== skillId));
//       toast.success("Skill deleted");
//     } catch {
//       toast.error("Network error");
//     }
//   }

//   console.log(skills)

//   if (loading) {
//     return (
//       <div className="h-screen grid place-items-center text-blue-300">
//         Loading skills...
//       </div>
//     );
//   }

//   if (skills.length === 0) {
//     return (
//       <div className="h-screen grid place-items-center text-gray-400">
//         No skills yet 😔
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-[#050617] via-[#0b1220] to-[#05070c] px-6 py-14">
//       <ToastContainer newestOnTop />

//       <button
//         onClick={() => router.back()}
//         className="mb-10 px-5 py-2 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
//       >
//         ← Go Back
//       </button>

//       <h1 className="text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
//         Your Skills Dashboard ⚡
//       </h1>

//       <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 max-w-7xl mx-auto">
//         {skills.map((skill, index) => {
//           let learningPoints: string[] = [];

//           try {
//             learningPoints = skill.learningpoint
//               ? JSON.parse(skill.learningpoint)
//               : [];
//           } catch {
//             learningPoints = [];
//           }

//           return (
//             <motion.div
//               key={skill.id}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.08 }}
//               className="bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-6 hover:scale-[1.02] transition"
//             >
//               {/* 🔥 IMAGE EDITOR */}
//               <SkillImageEditor
//                 imageUrl={skill.skill_img}
//                 skillId={skill.id}
//                 title={skill.title}
//                 onUploadSuccess={(newUrl) => {
//                   setSkills((prev) =>
//                     prev.map((s) =>
//                       s.id === skill.id ? { ...s, skill_img: newUrl } : s
//                     )
//                   );
//                 }}
//               />

//               <h2 className="text-2xl font-semibold text-cyan-300 mt-5 capitalize">
//                 {skill.title}
//               </h2>

//               <p className="text-gray-300 text-sm mt-2 leading-relaxed">
//                 {skill.description}
//               </p>

//               {/* 📌 Learning points */}
//               {learningPoints.length > 0 && (
//                 <ul className="mt-4 space-y-2 text-sm text-gray-300 list-disc list-inside">
//                   {learningPoints.map((point, i) => (
//                     <li key={i}>{point}</li>
//                   ))}
//                 </ul>
//               )}

//               {/* 🏷 Meta */}
//               <div className="flex justify-between items-center text-xs text-gray-400 mt-6">
//                 <span className="px-3 py-1 rounded-full bg-white/10">
//                   {skill.category}
//                 </span>
//                 <span className="px-3 py-1 rounded-full bg-white/10">
//                   {skill.level}
//                 </span>
//               </div>

//               {/* 🔗 Links */}
//               <div className="mt-5 flex flex-col gap-2">
//                 {skill.portfolio_link && (
//                   <a
//                     href={skill.portfolio_link}
//                     target="_blank"
//                     className="flex items-center gap-2 text-cyan-400 text-sm hover:underline"
//                   >
//                     <ExternalLink size={15} />
//                     View Portfolio
//                   </a>
//                 )}

//                 {skill.youtubelink && (
//                   <a
//                     href={skill.youtubelink}
//                     target="_blank"
//                     className="flex items-center gap-2 text-red-400 text-sm hover:underline"
//                   >
//                     <Youtube size={15} />
//                     Watch on YouTube
//                   </a>
//                 )}
//               </div>

//               {/* ⚙ Actions */}
//               <div className="flex gap-3 mt-7">
//                 <Link href={`/skill/${skill.id}/edit-skill`} className="flex-1">
//                   <button className="w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl transition">
//                     <Edit3 size={16} /> Edit
//                   </button>
//                 </Link>

//                 <button
//                   onClick={() => handleDelete(skill.id, skill.title)}
//                   className="flex-1 flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition"
//                 >
//                   <Trash2 size={16} /> Delete
//                 </button>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </main>
//   );
// }





















"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2, Edit3, ExternalLink, Youtube } from "lucide-react";
import { useRouter } from "next/navigation";

import SkillImageEditor from "@/components/skillPicture/page";

interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  created_at: string;
  skill_img: string;

  // upgraded fields
  learningpoint?: string;
  portfolio_link?: string | null;
  youtubelink?: string | null;
  user_id?: number;
  skill_img_public_id?: string | null;
}

interface ApiResponse {
  success: boolean;
  skills: Skill[];
  error?: string;
}

export default function ViewSkill() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

const API_URL = "https://skillwrap-backend.onrender.com";
  // const API_URL = "http://localhost:4000";

  // Fetch skills
  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch(`${API_URL}/view-skill`, {
          credentials: "include",
        });
        const data: ApiResponse = await res.json();

        if (!data.success) {
          toast.error(data.error || "Failed to load skills");
          return;
        }

        setSkills(data.skills);
      } catch {
        toast.error("Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  // Delete skill
  async function handleDelete(skillId: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;

    try {
      const res = await fetch(`${API_URL}/skill/${skillId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.error || "Delete failed");
        return;
      }

      setSkills((prev) => prev.filter((s) => s.id !== skillId));
      toast.success("Skill deleted");
    } catch {
      toast.error("Network error");
    }
  }

  if (loading) {
    return (
      <div className="h-screen grid place-items-center text-blue-300">
        Loading skills...
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="h-screen grid place-items-center text-gray-400">
        No skills yet 😔
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050617] via-[#0b1220] to-[#05070c] px-6 py-14">
      <ToastContainer newestOnTop />

      <button
        onClick={() => router.back()}
        className="mb-10 px-5 py-2 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
      >
        ← Go Back
      </button>

      <h1 className="text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Your Skills Dashboard ⚡
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {skills.map((skill, index) => {
          let learningPoints: string[] = [];

          if (skill.learningpoint) {
            try {
              // Handle over-escaped learningpoint JSON
              let temp = skill.learningpoint;
              while (typeof temp === "string") {
                temp = JSON.parse(temp);
              }
              learningPoints = Array.isArray(temp) ? temp : [];
            } catch {
              learningPoints = [];
            }
          }

          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-6 hover:scale-[1.02] transition"
            >
              {/* IMAGE EDITOR */}
              <SkillImageEditor
                imageUrl={skill.skill_img}
                skillId={skill.id}
                title={skill.title}
                onUploadSuccess={(newUrl) => {
                  setSkills((prev) =>
                    prev.map((s) =>
                      s.id === skill.id ? { ...s, skill_img: newUrl } : s
                    )
                  );
                }}
              />

              <h2 className="text-2xl font-semibold text-cyan-300 mt-5 capitalize">
                {skill.title}
              </h2>

              <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                {skill.description}
              </p>

              {/* Learning Points */}
              {learningPoints.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm text-gray-300 list-disc list-inside">
                  {learningPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}

              {/* Meta */}
              <div className="flex justify-between items-center text-xs text-gray-400 mt-6">
                <span className="px-3 py-1 rounded-full bg-white/10">
                  {skill.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10">
                  {skill.level}
                </span>
              </div>

              {/* Links */}
              <div className="mt-5 flex flex-col gap-2">
                {skill.portfolio_link && (
                  <a
                    href={skill.portfolio_link}
                    target="_blank"
                    className="flex items-center gap-2 text-cyan-400 text-sm hover:underline"
                  >
                    <ExternalLink size={15} />
                    View Portfolio
                  </a>
                )}

                {skill.youtubelink && (
                  <a
                    href={skill.youtubelink}
                    target="_blank"
                    className="flex items-center gap-2 text-red-400 text-sm hover:underline"
                  >
                    <Youtube size={15} />
                    Watch on YouTube
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-7">
                <Link href={`/skill/${skill.id}/edit-skill`} className="flex-1">
                  <button className="w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl transition">
                    <Edit3 size={16} /> Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(skill.id, skill.title)}
                  className="flex-1 flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}

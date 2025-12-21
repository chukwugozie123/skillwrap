// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function ViewSkill() {
//   const [skills, setSkills] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchSkills() {
//       try {
//         const res = await fetch("http://localhost:5000/view-skill", {
//           credentials: "include", // important for cookies/session auth
//         });
//         const data = await res.json();

//         if (!data.success) throw new Error(data.error);
//         setSkills(data.skills);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchSkills();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-400 text-lg">
//         Loading skills...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex justify-center items-center h-screen text-red-400 text-lg">
//         {error}
//       </div>
//     );

//   if (skills.length === 0)
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-500 text-xl font-semibold">
//         No skills found ❌
//       </div>
//     );


// async function handleDelete(skillId: string) {
//   const confirmDelete = confirm("Are you sure you want to delete this skill?");
//   if (!confirmDelete) return;

//   try {
//     const res = await fetch(`http://localhost:5000/skill/${skillId}`, {
//       method: "DELETE",
//       credentials: "include", // keep cookies/session
//     });

//     const data = await res.json();

//     if (res.ok) {
//       // Remove the deleted skill from the UI immediately
//       setSkills((prevSkills) => prevSkills.filter((s) => s.id !== skillId));
//       alert("✅ Skill deleted successfully!");
//     } else {
//       alert(data.error || "❌ Failed to delete skill");
//     }
//   } catch (err) {
//     console.error(err);
//     alert("Network error — please try again.");
//   }
// }


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-16 font-josefin">
//       <h1 className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-lg">
//         Your Skills
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//         {skills.map((skill) => (
//           <div
//             key={skill.id}
//             className="relative rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-[8px_8px_15px_rgba(0,0,0,0.3),_-8px_-8px_15px_rgba(255,255,255,0.1)] transition-transform hover:scale-[1.03] hover:shadow-[inset_8px_8px_15px_rgba(0,0,0,0.4),inset_-8px_-8px_15px_rgba(255,255,255,0.1)]"
//           >
//             {skill.img_url && (
//               <img
//                 src={skill.img_url}
//                 alt={skill.title}
//                 className="w-full h-40 object-cover rounded-xl mb-4 opacity-90 hover:opacity-100 transition-all"
//               />
//             )}
//             <h2 className="text-2xl font-semibold mb-2">{skill.title}</h2>
//             <p className="text-gray-300 text-sm mb-2">
//               <span className="font-medium text-cyan-300">Category:</span>{" "}
//               {skill.category}
//             </p>
//             <p className="text-gray-400 mb-3 line-clamp-3">{skill.description}</p>
//             <p className="text-sm text-gray-400 mb-2">
//               <span className="text-purple-400 font-medium">Level:</span>{" "}
//               {skill.level}
//             </p>
//             <p className="text-xs text-gray-500">
//               Added on:{" "}
//               {new Date(skill.created_at).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//               })}
//             </p>
//             <Link href={`skill/${skill.id}/edit-skill`}><button>edit</button></Link>
//             <button
//              className="mt-3 bg-gradient-to-r from-red-600 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 hover:scale-[1.03] transition-all shadow-md"
//             //  className="mb-5 text-blue-300 h-10 bg-black ml-10 border-2 border-r-2"
//             onClick={() => handleDelete(skill.id)}
//              >
//               delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
















"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2, Edit3 } from "lucide-react";

export default function ViewSkill() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🧩 Fetch skills on mount
  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch("http://localhost:5000/view-skill", {
          credentials: "include",
        });
        const data = await res.json();

        if (!data.success) throw new Error(data.error);
        setSkills(data.skills);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  // 🗑️ Handle Delete Skill
  async function handleDelete(skillId: string, title: string) {
    const confirmDelete = confirm(`Delete skill "${title}"?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/skill/${skillId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setSkills((prev) => prev.filter((s) => s.id !== skillId));
        toast.success(`✅ Deleted "${title}" successfully`, {
          position: "top-right",
          autoClose: 2500,
          theme: "dark",
        });
      } else {
        toast.error(data.error || "❌ Failed to delete skill");
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Network error — please try again.");
    }
  }

  // 🌀 Loading Screen
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-blue-300 text-lg font-josefin">
        Loading your skills...
      </div>
    );

  // 🚨 Error Screen
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-400 text-lg font-josefin">
        {error}
      </div>
    );

  // ❌ No Skills
  if (skills.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl font-semibold font-josefin">
        You haven’t added any skills yet 😔
      </div>
    );

  // 💎 Main Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1024] via-[#0f1a3a] to-[#010818] text-white px-6 py-16 font-['Josefin_Sans'] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,100,255,0.15),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(0,200,255,0.1),transparent_70%)] blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,200,255,0.4)]"
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
              className="relative bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(0,200,255,0.2)] hover:scale-[1.02] transition-all"
            >
              {skill.img_url && (
                <img
                  src={skill.img_url}
                  alt={skill.title}
                  className="w-full h-40 object-cover rounded-xl mb-5 opacity-90 hover:opacity-100 transition-all"
                />
              )}

              <h2 className="text-2xl font-semibold text-blue-300 mb-1">
                {skill.title}
              </h2>
              <p className="text-gray-300 text-sm mb-3">
                <span className="text-cyan-300 font-medium">Category:</span>{" "}
                {skill.category}
              </p>
              <p className="text-gray-400 mb-4 line-clamp-3">{skill.description}</p>

              <div className="flex justify-between text-sm text-gray-400">
                <p>
                  <span className="text-purple-400 font-medium">Level:</span>{" "}
                  {skill.level}
                </p>
                <p>
                  Added:{" "}
                  {new Date(skill.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <Link href={`skill/${skill.id}/edit-skill`}>
                  <button className="flex items-center gap-2 bg-blue-500/80 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-md">
                    <Edit3 className="w-4 h-4" /> Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(skill.id, skill.title)}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-500 hover:opacity-90 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-md"
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

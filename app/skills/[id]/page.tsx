"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";

type Skill = {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  skill_img: string;
  created_at: string;
  user_id: number;
  username: string;
  fullname: string;
};

export default function SkillDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

  useEffect(() => {
    async function fetchSkill() {
      try {
        const res = await fetch(`${API_URL}/skills/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch skill");
        const data = await res.json();
        setSkill(data.skill);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchSkill();
  }, [id, API_URL]); // ✅ added API_URL

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050b19] text-gray-400 animate-pulse">
        Loading skill details...
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050b19] text-red-400">
        ⚠️ Skill not found
      </div>
    );
  }

  const firstLetter = skill.username.charAt(0).toUpperCase();

  return (
    <div className="relative min-h-screen px-6 py-16 bg-gradient-to-br from-[#020617] via-[#071a36] to-[#020617] text-white overflow-hidden font-['Josefin_Sans']">
      {/* Glow Orbs */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-blue-700/30 blur-[160px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-700/20 blur-[160px]" />

      {/* Skill Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-5xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Image */}
        <div className="relative h-[380px] w-full">
          <Image
            src={`${API_URL}/uploads/${skill.skill_img}`}
            alt={skill.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent" />

          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/30 backdrop-blur-lg hover:scale-110 transition"
          >
            <Heart
              className={`w-6 h-6 ${liked ? "fill-pink-500 text-pink-500" : "text-white"}`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {skill.title}
          </h1>

          {/* Stars */}
          <div className="flex items-center gap-2 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-sm text-gray-400">(Top rated)</span>
          </div>

          <p className="mt-6 text-gray-300 leading-relaxed">{skill.description}</p>

          <div className="flex flex-wrap gap-6 mt-6 text-sm font-medium text-gray-300">
            <span>📂 {skill.category}</span>
            <span>🎯 {skill.level}</span>
            <span>📅 {new Date(skill.created_at).toDateString()}</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={() => {
                sessionStorage.setItem("selectedSkill", JSON.stringify(skill));
                router.push("/exchange_skill");
              }}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold shadow-lg hover:opacity-90 transition"
            >
              🤝 Request Exchange
            </button>

            <button
              onClick={() => router.back()}
              className="flex-1 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition"
            >
              ← Back
            </button>
          </div>
        </div>
      </motion.div>

      {/* Creator Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex items-center gap-6"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-3xl font-bold">
          {firstLetter}
        </div>

        <div>
          <h3 className="text-2xl font-bold">{skill.fullname}</h3>
          <p className="text-gray-300 mt-2">
            {skill.username} is passionate about teaching and exchanging knowledge in{" "}
            <span className="text-cyan-400">{skill.category}</span>.
          </p>

          <Link
            href={`/profiles/${skill.user_id}`}
            className="inline-block mt-3 text-cyan-400 hover:underline"
          >
            View Profile →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}






// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Star, Heart } from "lucide-react";

// type Skill = {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   level: string;
//   skill_img: string;
//   created_at: string;

//   user_id: number;
//   username: string;
//   fullname: string;
// };

// export default function SkillDetailsPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [skill, setSkill] = useState<Skill | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [liked, setLiked] = useState(false);

//   // const API_URL = "http://localhost:5000";
//     const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

//   useEffect(() => {
//     async function fetchSkill() {
//       try {
//         const res = await fetch(`${API_URL}/skills/${id}`, {
//           cache: "no-store",
//         });

//         if (!res.ok) throw new Error("Failed to fetch skill");

//         const data = await res.json();
//         setSkill(data.skill);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("Unknown error occurred");
//         }
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (id) fetchSkill();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#050b19] text-gray-400 animate-pulse">
//         Loading skill details...
//       </div>
//     );
//   }

//   if (error || !skill) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#050b19] text-red-400">
//         ⚠️ Skill not found
//       </div>
//     );
//   }

//   const firstLetter = skill.username.charAt(0).toUpperCase();

//   return (
//     <div className="relative min-h-screen px-6 py-16 bg-gradient-to-br from-[#020617] via-[#071a36] to-[#020617] text-white overflow-hidden font-['Josefin_Sans']">

//       {/* Glow Orbs */}
//       <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-blue-700/30 blur-[160px]" />
//       <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-700/20 blur-[160px]" />

//       {/* Skill Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 60 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative max-w-5xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-xl overflow-hidden"
//       >
//         {/* Image */}
//         <div className="relative h-[380px] w-full">
//           <Image
//             src={`${API_URL}/uploads/${skill.skill_img}`}
//             alt={skill.title}
//             fill
//             className="object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent" />

//           <button
//             onClick={() => setLiked(!liked)}
//             className="absolute top-6 right-6 p-3 rounded-full bg-white/10 border border-white/30 backdrop-blur-lg hover:scale-110 transition"
//           >
//             <Heart
//               className={`w-6 h-6 ${liked ? "fill-pink-500 text-pink-500" : "text-white"}`}
//             />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-10">
//           <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
//             {skill.title}
//           </h1>

//           {/* Stars */}
//           <div className="flex items-center gap-2 mt-3">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
//             ))}
//             <span className="text-sm text-gray-400">(Top rated)</span>
//           </div>

//           <p className="mt-6 text-gray-300 leading-relaxed">{skill.description}</p>

//           <div className="flex flex-wrap gap-6 mt-6 text-sm font-medium text-gray-300">
//             <span>📂 {skill.category}</span>
//             <span>🎯 {skill.level}</span>
//             <span>📅 {new Date(skill.created_at).toDateString()}</span>
//           </div>

//           {/* Actions */}
//           <div className="flex flex-col sm:flex-row gap-4 mt-10">
//                      <button
//                 onClick={() => {
//                   sessionStorage.setItem(
//                     "selectedSkill",
//                     JSON.stringify(skill)
//                   );
//                   router.push("/exchange_skill");
//                 }}
//                               className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold shadow-lg hover:opacity-90 transition"
//               >
//                 🤝 Request Exchange
//               </button>

//             <button
//               onClick={() => router.back()}
//               className="flex-1 py-3 rounded-xl border border-white/30 hover:bg-white/10 transition"
//             >
//               ← Back
//             </button>
//           </div>
//         </div>
//       </motion.div>

//       {/* Creator Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//         className="mt-12 max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex items-center gap-6"
//       >
//         <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-3xl font-bold">
//           {firstLetter}
//         </div>

//         <div>
//           <h3 className="text-2xl font-bold">{skill.fullname}</h3>
//           <p className="text-gray-300 mt-2">
//             {skill.username} is passionate about teaching and exchanging knowledge in{" "}
//             <span className="text-cyan-400">{skill.category}</span>.
//           </p>

//           <Link
//             href={`/profiles/${skill.user_id}`}
//             className="inline-block mt-3 text-cyan-400 hover:underline"
//           >
//             View Profile →
//           </Link>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

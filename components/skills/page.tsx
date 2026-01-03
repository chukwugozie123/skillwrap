// "use client";

// import { useEffect, useRef, useState } from "react";
// import UserPage from "@/components/user/page";

// /* ================= TYPES ================= */

// interface SkillType {
//   id: number;
//   title: string;
//   category: string;
//   description: string;
//   level: string;
//   user_id?: number;
// }

// /* ================= PAGE ================= */

// export default function SkillsPage() {
//   const [skills, setSkills] = useState<SkillType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   // ✅ stable ref for debounce
//   const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // ✅ env var (safe + explicit)
//   const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
//   console.log(API_URL, 'SS')

//   /* ================= FETCH ALL SKILLS ================= */

//   useEffect(() => {
//     if (!API_URL) return;

//     async function fetchSkills() {
//       try {
//         setLoading(true);
//         setError("");

//         const res = await fetch(`${API_URL}/skills`, {
//           credentials: "include",
//         });

//         if (!res.ok) throw new Error("Failed to fetch skills");

//         const data = await res.json();

//         const skillsArray: SkillType[] = Array.isArray(data)
//           ? data
//           : Array.isArray(data.skills)
//           ? data.skills
//           : [];

//         setSkills(skillsArray);
//         sessionStorage.setItem("skillsData", JSON.stringify(skillsArray));
//       } catch {
//         setError("Failed to fetch skills");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchSkills();
//   }, [API_URL]); // ✅ FIXED

//   /* ================= DEBOUNCED SEARCH ================= */

//   useEffect(() => {
//     if (!API_URL) return;

//     if (typingTimeoutRef.current) {
//       clearTimeout(typingTimeoutRef.current);
//     }

//     typingTimeoutRef.current = setTimeout(async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const endpoint = searchTerm.trim()
//           ? `${API_URL}/search?title=${encodeURIComponent(searchTerm)}`
//           : `${API_URL}/skills`;

//         const res = await fetch(endpoint, {
//           credentials: "include",
//         });

//         if (!res.ok) throw new Error("Search failed");

//         const data = await res.json();

//         const skillsArray: SkillType[] = Array.isArray(data)
//           ? data
//           : Array.isArray(data.skills)
//           ? data.skills
//           : [];

//         setSkills(skillsArray);
//         sessionStorage.setItem("skillsData", JSON.stringify(skillsArray));
//       } catch {
//         setError("Network error while searching");
//       } finally {
//         setLoading(false);
//       }
//     }, 500);

//     return () => {
//       if (typingTimeoutRef.current) {
//         clearTimeout(typingTimeoutRef.current);
//       }
//     };
//   }, [searchTerm, API_URL]); // ✅ FIXED (THIS WAS THE WARNING)

//   /* ================= UI ================= */

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
//       {/* 🔍 Search Bar */}
//       <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg py-4 px-6 flex justify-center">
//         <div className="w-full max-w-3xl">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search skills, categories or creators..."
//             className="w-full px-5 py-3 text-lg text-white placeholder-gray-300 bg-white/10 
//                        border border-white/20 rounded-2xl focus:outline-none 
//                        focus:ring-4 focus:ring-cyan-500/40 backdrop-blur-xl transition-all"
//           />
//         </div>
//       </div>

//       {/* Content */}
//       <div className="pt-28 px-6">
//         <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//           🚀 Discover Amazing Skills
//         </h1>

//         {error && (
//           <p className="text-center text-red-400 mt-4 font-medium">{error}</p>
//         )}

//         <div className="mt-10 w-full max-w-6xl mx-auto">
//           {loading ? (
//             <p className="text-center text-cyan-300 text-xl">Loading...</p>
//           ) : (
//             <UserPage skills={skills} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }













"use client";

import { useEffect, useRef, useState } from "react";
import UserPage from "@/components/user/page";

interface SkillType {
  id: number;
  title: string;
  category: string;
  description: string;
  level: string;
  username?: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
     console.log( 'ss', skills)

     console.log("API_URL:", API_URL);
// console.log("Endpoint:", endpoint);

useEffect(() => {

  if (typingTimeoutRef.current) {
    clearTimeout(typingTimeoutRef.current);
  }

  typingTimeoutRef.current = setTimeout(async () => {
    try {
      setLoading(true);
      setError("");

      const endpoint = searchTerm.trim()
        ? `https://skillwrap-backend.onrender.com/search?title=${encodeURIComponent(searchTerm)}`
        : `https://skillwrap-backend.onrender.com/skills`;

      // const res = await fetch(endpoint, {
      //   credentials: "include",
      // });

          const res = await fetch(endpoint, {
          credentials: "include",
        });

      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      const data = JSON.parse(text);

      console.log(data)
      
      setSkills(Array.isArray(data.skills) ? data.skills : []);
    } catch (err) {
      console.error(err);
      setError("Unable to load skills");
    } finally {
      setLoading(false);
    }
  }, 400);

  return () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };
}, [searchTerm]); // ✅ FIXED


  useEffect(() => {
  console.log("Updated skills:", skills);
}, [skills]);


  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 py-4 px-6 flex justify-center">
        <div className="w-full max-w-3xl">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills..."
            className="w-full px-5 py-3 text-lg bg-white/10 border border-white/20 rounded-2xl
              focus:outline-none focus:ring-4 focus:ring-cyan-500/40"
          />
        </div>
      </div>

      <div className="pt-28 px-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Discover Skills
        </h1>

        {error && <p className="text-center text-red-400">{error}</p>}

        {loading ? (
          <p className="text-center text-cyan-300 text-xl">Loading...</p>
        ) : (
          <UserPage skills={skills} />
        )}
      </div>
    </div>
  );
}

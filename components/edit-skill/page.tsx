// // import { useState } from "react";


// // export default async function edit_skill({ skill }) {
// //      const [title, setTitle] = useState(skill.title);
// //       const [category, setCategory] = useState(skill.category);
// //       const [description, setDesc] = useState(skill.description);
// //       const [level, setLevel] = useState(skill.level);
// //       const [message, setMessage] = useState("");
    
// //       async function handleSubmit(e) {
// //         e.preventDefault();
    
// //         try {
// //           const res = await fetch("http://localhost:5000/edit-skill", {
// //             method: "PATCH",
// //             headers: { "Content-Type": "application/json" },
// //             credentials: "include",
// //             body: JSON.stringify({ title, category, description, level }),
// //           });
    
// //           const data = await res.json();
    
// //           if (res.ok) {
// //             setMessage("✅ Profile updated!");
// //           } else {
// //             setMessage(data.error || "Failed to update profile");
// //           }
// //         } catch (err) {
// //           console.error(err);
// //           setMessage("Network error — please try again");
// //         }
// //       }

// //       return(
        
// //         <form
// //           onSubmit={handleSubmit}
// //           className="flex flex-col gap-5 relative z-10"
// //         >
// //           <input
// //             type="text"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             placeholder="Full Name"
// //             className="p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300/50 outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.02] transition-all duration-200"
// //           />
// //           <input
// //             type="text"
// //             value={category}
// //             onChange={(e) => setCategory(e.target.value)}
// //             placeholder="Username"
// //             className="p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300/50 outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.02] transition-all duration-200"
// //           />
// //           <input
// //             type="text"
// //             value={description}
// //             onChange={(e) => setDesc(e.target.value)}
// //             placeholder="describe your skill"
// //             className="p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300/50 outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.02] transition-all duration-200"
// //           />
// //               <input
// //             type="text"
// //             value={level}
// //             onChange={(e) => setLevel(e.target.value)}
// //             placeholder="level of skill"
// //             className="p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300/50 outline-none focus:ring-2 focus:ring-cyan-400 focus:scale-[1.02] transition-all duration-200"
// //           />

// //           <button
// //             type="submit"
// //             className="bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 hover:scale-[1.03] transition-all shadow-lg shadow-cyan-500/30"
// //           >
// //             Save Changes
// //           </button>
// //         </form>
// //       )
    
// // }


// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// // ================= TYPES =================
// interface SkillType {
//   id: number;
//   title: string;
//   category: string;
//   description: string;
//   level: string;
// }

// interface EditSkillProps {
//   skill: SkillType;
// }

// export default function EditSkill({ skill }: EditSkillProps) {
//   const [title, setTitle] = useState(skill.title);
//   const [category, setCategory] = useState(skill.category);
//   const [description, setDesc] = useState(skill.description);
//   const [level, setLevel] = useState(skill.level);
//   const [message, setMessage] = useState("");

//   // const API_URL = process.env.NEXT_PUBLIC_API_URL;
//    const API_URL= 'https://skillwrap-backend.onrender.com'

//   const router = useRouter();

//   useEffect(() => {
//     if (message === "✅ Skill updated successfully!") {
//       router.push("/skills");
//     }
//   }, [message, router]);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${API_URL}/skill/${skill.id}/edit-skill`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ title, category, description, level }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage("✅ Skill updated successfully!");
//       } else {
//         setMessage(data.error || "Failed to update skill");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Network error — please try again");
//     }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#0f1e3a] to-[#0a0f1c] text-white relative overflow-hidden">
//       <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-cyan-500/30 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-tr from-fuchsia-500/30 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-300" />

//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-5 relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-2xl bg-white/10 border border-white/10"
//       >
//         <h1 className="text-3xl font-semibold text-center text-cyan-100 mb-6 tracking-wide">
//           Edit Skill
//         </h1>

//         {message && (
//           <p
//             className={`text-center mb-4 font-medium transition-all ${
//               message.includes("✅") ? "text-green-400" : "text-red-400"
//             }`}
//           >
//             {message}
//           </p>
//         )}

//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Skill Title"
//           className="p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300/50 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
//         />
//         <input
//           type="text"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           placeholder="Skill Category"
//           className="p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300/50 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
//         />
//         <input
//           type="text"
//           value={description}
//           onChange={(e) => setDesc(e.target.value)}
//           placeholder="Description"
//           className="p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300/50 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
//         />
//         <input
//           type="text"
//           value={level}
//           onChange={(e) => setLevel(e.target.value)}
//           placeholder="Skill Level"
//           className="p-3 rounded-lg bg-white/10 text-cyan-100 placeholder-cyan-300/50 outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
//         />

//         <button
//           type="submit"
//           className="bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 hover:scale-[1.03] transition-all shadow-lg shadow-cyan-500/30"
//         >
//           Save Changes
//         </button>
//       </form>

//       <Link href="/">
//         <button className="absolute bottom-10 left-10 px-4 py-2 bg-blue-600 rounded-lg hover:opacity-90 transition">
//           Go back
//         </button>
//       </Link>
//     </div>
//   );
// }



















// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import Link from "next/link";

// interface SkillType {
//   id: number;
//   title: string;
//   category: string;
//   description: string;
//   level: string;
// }

// const API_URL = "https://skillwrap-backend.onrender.com";

// export default function EditSkill() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [skill, setSkill] = useState<SkillType | null>(null);
//   const [message, setMessage] = useState("");

//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDesc] = useState("");
//   const [level, setLevel] = useState("");

//   // 🔹 Fetch skill
//   useEffect(() => {
//     if (!id) return;

//     async function fetchSkill() {
//       try {
//         const res = await fetch(`${API_URL}/skill/${id}`, {
//           credentials: "include",
//         });

//         const data = await res.json();

//         if (!res.ok) throw new Error(data.error);

//         setSkill(data.skill);
//         setTitle(data.skill.title);
//         setCategory(data.skill.category);
//         setDesc(data.skill.description);
//         setLevel(data.skill.level);
//       } catch (err) {
//         console.error(err);
//         setMessage("Failed to load skill");
//       }
//     }

//     fetchSkill();
//   }, [id]);

//   // 🔹 Submit
//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${API_URL}/skill/${id}/edit-skill`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ title, category, description, level }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage("✅ Skill updated successfully!");
//         setTimeout(() => router.push("/skills"), 1000);
//       } else {
//         setMessage(data.error || "Failed to update skill");
//       }
//     } catch {
//       setMessage("Network error");
//     }
//   }

//   // 🔹 Loading state (IMPORTANT)
//   if (!skill) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-white">
//         Loading skill...
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#0f1e3a] to-[#0a0f1c] text-white">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10"
//       >
//         <h1 className="text-3xl font-semibold text-center mb-6">Edit Skill</h1>

//         {message && (
//           <p className="text-center mb-4 text-sm">{message}</p>
//         )}

//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-3 rounded-lg bg-white/10 mb-3"
//           placeholder="Title"
//         />

//         <input
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="w-full p-3 rounded-lg bg-white/10 mb-3"
//           placeholder="Category"
//         />

//         <input
//           value={description}
//           onChange={(e) => setDesc(e.target.value)}
//           className="w-full p-3 rounded-lg bg-white/10 mb-3"
//           placeholder="Description"
//         />

//         <input
//           value={level}
//           onChange={(e) => setLevel(e.target.value)}
//           className="w-full p-3 rounded-lg bg-white/10 mb-5"
//           placeholder="Level"
//         />

//         <button className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold">
//           Save Changes
//         </button>
//       </form>

//       <Link href="/skills" className="absolute bottom-10 left-10 text-blue-400">
//         ← Back
//       </Link>
//     </div>
//   );
// }








"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface SkillType {
  id: number;
  title: string;
  category: string;
  description: string;
  level: string;
}

const API_URL = "https://skillwrap-backend.onrender.com";

export default function EditSkill() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [skill, setSkill] = useState<SkillType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDesc] = useState("");
  const [level, setLevel] = useState("");

  // 🔹 Fetch skill
  useEffect(() => {
    if (!id) return;

    async function fetchSkill() {
      try {
        const res = await fetch(`${API_URL}/skill/${id}`, {
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setSkill(data.skill);
        setTitle(data.skill.title);
        setCategory(data.skill.category);
        setDesc(data.skill.description);
        setLevel(data.skill.level);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load skill");
      } finally {
        setLoading(false);
      }
    }

    fetchSkill();
  }, [id]);

  // 🔹 Submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/skill/${id}/edit-skill`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, category, description, level }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Skill updated successfully!");
        setTimeout(() => router.push("/skills"), 1200);
      } else {
        setMessage(data.error || "❌ Failed to update skill");
      }
    } catch {
      setMessage("❌ Network error");
    } finally {
      setSaving(false);
    }
  }

  // 🔹 LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0f1c] via-[#0f1e3a] to-[#0a0f1c] text-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-400 text-sm">Loading skill data...</p>
      </div>
    );
  }

  // 🔹 SAFETY
  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Skill not found
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#0f1e3a] to-[#0a0f1c] text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl"
      >
        <h1 className="text-3xl font-semibold text-center mb-6 text-blue-300">
          Edit Skill
        </h1>

        {message && (
          <p className="text-center mb-4 text-sm text-gray-300">
            {message}
          </p>
        )}

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={saving}
          className="w-full p-3 rounded-lg bg-white/10 mb-3 outline-none disabled:opacity-50"
          placeholder="Title"
          required
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={saving}
          className="w-full p-3 rounded-lg bg-white/10 mb-3 outline-none disabled:opacity-50"
          placeholder="Category"
          required
        />

        <input
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          disabled={saving}
          className="w-full p-3 rounded-lg bg-white/10 mb-3 outline-none disabled:opacity-50"
          placeholder="Description"
          required
        />

        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          disabled={saving}
          className="w-full p-3 rounded-lg bg-white/10 mb-5 outline-none disabled:opacity-50"
          placeholder="Level"
          required
        />

        <button
          disabled={saving}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <Link
        href="/skills"
        className="absolute bottom-10 left-10 text-blue-400 hover:underline"
      >
        ← Back
      </Link>
    </div>
  );
}

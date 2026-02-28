// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// /* ================= TYPES ================= */
// export type Skill = {
//   skillId: number;
//   title: string;
//   description?: string;
//   category?: string;
//   username?: string;
//   skill_img?: string;
//   image_url?: string;
// };

// type UserMode = "learning" | "teaching" | "exchanging" | null;

// /* ================= COMPONENT ================= */
// export default function UserPage({
//   skills,
//   userMode,
// }: {
//   skills: Skill[];
//   userMode: UserMode;
// }) {
//   const router = useRouter();

//   if (!skills.length) {
//     return (
//       <div className="flex items-center justify-center h-40">
//         <p className="text-gray-400 text-lg font-semibold">
//           No skills found ❌
//         </p>
//       </div>
//     );
//   }

//   const getImageSrc = (skill: Skill) =>
//     skill.skill_img || skill.image_url || "/default-skill.png";

//   const handleAction = (skill: Skill) => {
//     sessionStorage.setItem("selectedSkill", JSON.stringify(skill));

//     if (userMode === "learning") {
//       router.push("/request_learn");
//     }

//     if (userMode === "exchanging") {
//       router.push("/exchange_skill");
//     }

//     console.log(userMode, skill)
//   };

//   console.log(getImageSrc, 'ss')
//   return (
//     <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
//       {skills.map((skill) => (
//         <div
//           key={skill.skillId}
//           className="group bg-white/5 border border-white/10 rounded-2xl shadow-lg
//           hover:shadow-cyan-500/40 hover:-translate-y-2 transition-all duration-300"
//         >
//           {/* IMAGE */}
//           <div className="relative h-48 overflow-hidden rounded-t-2xl">
//             <Image
//               src={getImageSrc(skill)}
//               alt={skill.title}
//               fill
//               className="object-cover transition-transform duration-500 group-hover:scale-110"
//               unoptimized
//             />

//             {/* HOVER OVERLAY */}
//             <div
//               className="absolute inset-0 bg-black/60 opacity-0
//               group-hover:opacity-100 flex items-center justify-center transition"
//             >
//               <Link
//                 href={`/skills/${skill.skillId}`}
//                 className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600"
//               >
//                 View Details
//               </Link>
//             </div>
//           </div>

//           <div className="p-6">
//             <h2 className="text-xl font-bold">{skill.title}</h2>

//             {skill.description && (
//               <p className="text-gray-400 text-sm mt-2 line-clamp-3">
//                 {skill.description}
//               </p>
//             )}

//             {skill.category && (
//               <span
//                 className="inline-block mt-3 px-4 py-1 rounded-full
//                 bg-gradient-to-r from-cyan-500 to-blue-500 text-sm"
//               >
//                 {skill.category}
//               </span>
//             )}
//           </div>

//           {/* ACTION BUTTON */}
//           {userMode && userMode !== "teaching" && (
//             <div className="p-4 pt-0">
//               <button
//                 onClick={() => handleAction(skill)}
//                 className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500
//                 hover:scale-105 transition"
//               >
//                 {userMode === "learning" && "📘 Request to Learn"}
//                 {userMode === "exchanging" && "🤝 Request Exchange"}
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

/* ================= TYPES ================= */
export type Skill = {
  skillId: number;
  title: string;
  description?: string;
  category?: string;
  username?: string;
  skill_img?: string;
  image_url?: string;
};

type UserMode = "learning" | "teaching" | "exchanging" | null;

/* ================= COMPONENT ================= */
export default function UserPage({
  skills,
  userMode,
}: {
  skills: Skill[];
  userMode: UserMode;
}) {
  const router = useRouter();

  // Log all skills from backend to debug
  console.log("Received skills from backend:", skills);

  if (!skills.length) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-400 text-lg font-semibold">
          No skills found ❌
        </p>
      </div>
    );
  }

  const getImageSrc = (skill: Skill) => {
    // Log each skill image
        console.log(skill.skill_img)
    return skill.skill_img || "/default-skill.png";
  };

  const handleAction = (skill: Skill) => {
    sessionStorage.setItem("selectedSkill", JSON.stringify(skill));

    if (userMode === "learning") {
      router.push("/request_learn");
    }

    if (userMode === "exchanging") {
      router.push("/exchange_skill");
    }

console.log(userMode)
  };

  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
      {skills.map((skill) => (
        <div
          key={skill.skillId}
          className="group bg-white/5 border border-white/10 rounded-2xl shadow-lg
          hover:shadow-cyan-500/40 hover:-translate-y-2 transition-all duration-300"
        >
          {/* IMAGE */}
          <div className="relative h-48 overflow-hidden rounded-t-2xl">
            <Image
              src={getImageSrc(skill)}
              alt={skill.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
                loading="eager" 
            />

            {/* HOVER OVERLAY */}
            <div
              className="absolute inset-0 bg-black/60 opacity-0
              group-hover:opacity-100 flex items-center justify-center transition"
            >
              <Link
                href={`/skills/${skill.skillId}`}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600"
              >
                View Details
              </Link>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold">{skill.title}</h2>

            {skill.description && (
              <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                {skill.description}
              </p>
            )}

            {skill.category && (
              <span
                className="inline-block mt-3 px-4 py-1 rounded-full
                bg-gradient-to-r from-cyan-500 to-blue-500 text-sm"
              >
                {skill.category}
              </span>
            )}
          </div>

          {/* ACTION BUTTON */}
          {userMode && userMode !== "teaching" && (
            <div className="p-4 pt-0">
              <button
                onClick={() => handleAction(skill)}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500
                hover:scale-105 transition"
              >
                {userMode === "learning" && "📘 Request to Learn"}
                {userMode === "exchanging" && "🤝 Request Exchange"}
              </button>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

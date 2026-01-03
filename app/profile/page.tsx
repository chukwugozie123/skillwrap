


















// import ProfilePicture from "@/components/profilePicture/page";
// import Createskill from "@/components/profile/page";
// import Link from "next/link";
// import { cookies } from "next/headers";

// async function getData() {
//   const cookieStore = await cookies();
//   const cookieHeader = cookieStore
//     .getAll()
//     .map(({ name, value }) => `${name}=${value}`)
//     .join("; ");

//   const res = await fetch("http://localhost:5000/auth/profile", {
//     headers: { Cookie: cookieHeader },
//     cache: "no-store",
//     credentials: "include",
//   });

//   if (!res.ok) return null;
//   const data = await res.json();
//   return data.req?.user || data.user;
// }

// export default async function ProfilePage() {
//   const user = await getData();

//   if (!user) {
//     return (
//       <p className="text-center text-red-500 mt-10 text-lg">
//         No user found
//       </p>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#0f1e3a] to-[#0a0f1c] text-white">
//       <div className="relative w-full max-w-3xl p-10 rounded-3xl shadow-2xl backdrop-blur-2xl bg-white/5 border border-white/10">
//         <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-indigo-700/20 blur-3xl -z-10"></div>

//         <div className="flex flex-col items-center md:flex-row md:gap-8">
//           {/* Avatar Section */}
//           <ProfilePicture user={user} />

//           {/* Info Section */}
//           <div className="mt-4 text-center md:text-left">
//             <h1 className="text-3xl font-extrabold tracking-wide">
//               {user.fullname}
//             </h1>
//             <p className="text-blue-300">@{user.username}</p>
//             <p className="text-gray-300">{user.email}</p>
//           </div>
          
//         </div>

//         <Createskill />
//       </div>
//     </div>
//   );
// }



// // //profile/page
// // "use client"

// // import { motion } from "framer-motion";
// // import Link from "next/link";

// // export default function ProfilePage() {
// //     return(
// //         <>
        
// //             {/* Quick badges */}
// //             <div className="mt-3 flex gap-3 justify-center md:justify-start">
// //               <span className="px-3 py-1 rounded-full bg-blue-600/30 text-sm font-medium">
// //                 Member
// //               </span>
// //               <span className="px-3 py-1 rounded-full bg-indigo-600/30 text-sm font-medium">
// //                 Verified
// //               </span>
// //             </div>

// //         {/* Divider */}
// //         <div className="my-8 border-t border-white/10"></div>

// //         {/* Stats */}
// //         <div className="grid grid-cols-3 gap-4 text-center">
// //           <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-md">
// //             <h3 className="text-2xl font-bold text-blue-400">120</h3>
// //             <p className="text-gray-400 text-sm">Projects</p>
// //           </div>
// //           <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-md">
// //             <h3 className="text-2xl font-bold text-indigo-400">87</h3>
// //             <p className="text-gray-400 text-sm">Followers</p>
// //           </div>
// //           <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-md">
// //             <h3 className="text-2xl font-bold text-green-400">42</h3>
// //             <p className="text-gray-400 text-sm">Following</p>
// //           </div>
// //         </div>

// //     {/* Divider */}
// //         <div className="my-8 border-t border-white/10"></div>

        
// //         {/* Primary Actions (Skills) */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
// //           <motion.button
// //             whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(59,130,246,0.6)" }}
// //             className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 border border-blue-400/50 text-white font-semibold shadow-lg"
// //           >
// //             <Link href={"/create-skill"}>➕ Create Skill</Link>
// //           </motion.button>
// //           <motion.button
// //             whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(139,92,246,0.6)" }}
// //             className="py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 border border-indigo-400/50 text-white font-semibold shadow-lg"
// //           >
// //           <Link href={"my-skill"}>📂 View Skills</Link>
// //           </motion.button>
// //         </div>

// //         {/* Secondary Actions */}
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //           <Link href={"edit-profile"}>
// //           <motion.button
// //             whileHover={{ scale: 1.05 }}
// //             className="py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border border-blue-400/30 hover:shadow-blue-500/30 transition text-white font-semibold shadow-lg"
// //           >
// //           Edit Profile
// //           </motion.button>
// //           </Link>
// //           <motion.button
// //             whileHover={{ scale: 1.05 }}
// //             className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold shadow-lg"
// //           >
// //             Settings
// //           </motion.button>
// //           <motion.button
// //             whileHover={{ scale: 1.05 }}
// //             className="py-3 px-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 border border-green-400/30 hover:shadow-green-500/30 transition text-white font-semibold shadow-lg"
// //           >
// //             <Link href={"/chat"}>Messages</Link>
// //           </motion.button>
// //           <motion.button
// //             whileHover={{ scale: 1.05 }}
// //             className="py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-pink-700 border border-red-400/30 hover:shadow-red-500/30 transition text-white font-semibold shadow-lg"
// //           >
// //             Logout
// //           </motion.button>

// //           <button>
// //             <Link href={"/my-requests"}>requests</Link>
// //           </button>
// //         </div>
      
// //         </>
// //     )
// // }















// // // upgrade this thing significantly add a route to create or edit bio and imporve style dark blue glassmorphism and additional blue or oother colors improve style very very well






















"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const API_URL = "https://skillwrap-backend.onrender.com";

interface User {
  username: string;
  email: string;
  bio?: string;
  avatar?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH USER ================= */
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Profile fetch failed", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router]);

  
async function handleLogout() {
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include", // 🔴 REQUIRED
    });

    if (res.ok){
      window.location.href = "/login";
    } else {
      window.location.href = "/profile";
    }

  } catch (err) {
    console.error("Logout failed", err);
  }
}

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* ================= PROFILE CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl p-8"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">

            {/* Avatar */}
            <div className="relative">
              <Image
                src={user.avatar || "/avatar-placeholder.png"}
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full border-4 border-blue-500/40 shadow-lg"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0b1220]" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">{user.username}</h1>
              <p className="text-blue-300 mt-1">{user.email}</p>

              <p className="text-gray-300 mt-3 max-w-xl">
                {user.bio || "No bio yet. Add one from edit profile."}
              </p>

              {/* Badges */}
              <div className="mt-4 flex gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 rounded-full bg-blue-600/30 text-sm">
                  Member
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-600/30 text-sm">
                  Verified
                </span>
              </div>
            </div>

            {/* Edit */}
            <Link href="/edit-profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border border-white/20 shadow-lg font-semibold"
              >
                Edit Profile
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* ================= PRIMARY ACTIONS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <Link href="/create-skill">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 border border-blue-400/40 shadow-xl cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">➕ Create Skill</h3>
              <p className="text-white/80 text-sm">
                Share your expertise with the community
              </p>
            </motion.div>
          </Link>

          <Link href="/my-skill">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 border border-indigo-400/40 shadow-xl cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">📂 My Skills</h3>
              <p className="text-white/80 text-sm">
                View and manage your uploaded skills
              </p>
            </motion.div>
          </Link>
        </div>

        {/* ================= SECONDARY ACTIONS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {/* <Link href="/chat">
            <ActionButton label="💬 Messages" />
          </Link> */}
          <Link href="/request-sent">
            <ActionButton label="📥 Requests" />
          </Link>
          <Link href="/settings">
          <ActionButton label="⚙️ Settings" />
          </Link>
           {/* <Link href="/logout">
          <ActionButton label="🚪 Logout" danger />
          </Link> */}

          <motion.button
  onClick={handleLogout}
  whileHover={{ scale: 1.05 }}
  className="py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-pink-700
             border border-red-400/30 text-white font-semibold shadow-lg"
>
  Logout
</motion.button>
        </div>

      </div>
    </div>
  );
}

/* ================= BUTTON ================= */

function ActionButton({
  label,
  danger,
}: {
  label: string;
  danger?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={`py-3 px-4 rounded-xl font-semibold shadow-lg transition
        ${
          danger
            ? "bg-gradient-to-r from-red-600 to-pink-700 border border-red-400/30"
            : "bg-white/10 hover:bg-white/20 border border-white/20"
        }`}
    >
      {label}
    </motion.button>
  );
}













// "use client";

// import Link from "next/link";
// import ProfilePicture from "@/components/profilePicture/page";
// import { Pencil, UserPlus, MessageCircle } from "lucide-react";
// import { useEffect, useState } from "react";

// type User = {
//   id: number;
//   fullname: string;
//   username: string;
//   email: string;
//   bio?: string;
//   avatar?: string;
//   projects?: number;
//   followers?: number;
//   following?: number;
// };

// export default function ModernProfilePage() {
//   const [user, setUser] = useState<User | null>(null);

//   // const API_URL = process.env.NEXT_PUBLIC_API_URL;
//    const API_URL= 'https://skillwrap-backend.onrender.com'
//   // const API_URL = 'http://localhost:5000';

//   useEffect(() => {
//     const fetchUser = async () => {
//       const res = await fetch(`${API_URL}/auth/profile`, {
//         method: "GET",
//         credentials: "include",
//       });
//       if (!res.ok) return;
//       const data = await res.json();
//       setUser(data.req?.user || data.user);
//     };
//     fetchUser();
//   }, [API_URL]);

//   if (!user) {
//     return <p className="text-center text-red-500 mt-10">No user found</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0a1224] to-[#000000] text-white relative overflow-hidden">
//       {/* Background Glow */}
//       <div className="absolute inset-0 -z-10">
//         <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-300"></div>
//       </div>

//       <div className="max-w-5xl mx-auto px-6 py-12">
//         {/* Profile Card */}
//         <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
//           <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-indigo-700/20 to-purple-800/20 blur-3xl -z-10 opacity-70"></div>

//           {/* Top Section */}
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
//             <ProfilePicture />

//             <div className="text-center md:text-left space-y-2 flex-1">
//               <h1 className="text-4xl font-bold tracking-wide">{user.fullname}</h1>
//               <p className="text-blue-300 text-lg">@{user.username}</p>
//               <p className="text-gray-300">{user.email}</p>

//               {/* Bio + Edit */}
//               <div className="mt-3 flex items-center justify-center md:justify-start gap-2">
//                 <span className="text-gray-400">{user.bio ? user.bio : "No bio added."}</span>
//                 <Link
//                   href="/edit-profile"
//                   className="flex items-center justify-center p-2 rounded-full bg-blue-600 hover:bg-blue-500 transition"
//                 >
//                   <Pencil className="w-4 h-4" />
//                 </Link>
//               </div>

//               {/* Stats */}
//               <div className="mt-4 flex justify-center md:justify-start gap-6 text-gray-300">
//                 <div>
//                   <p className="font-semibold text-white">{user.projects ?? 0}</p>
//                   <p className="text-sm">Projects</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-white">{user.followers ?? 0}</p>
//                   <p className="text-sm">Followers</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold text-white">{user.following ?? 0}</p>
//                   <p className="text-sm">Following</p>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="mt-4 flex justify-center md:justify-start gap-4">
//                 <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition">
//                   <UserPlus className="w-5 h-5" />
//                   Follow
//                 </button>
//                 <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg shadow-md transition">
//                   <MessageCircle className="w-5 h-5" />
//                   Message
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Additional content could go here */}
//         </div>
//       </div>
//     </div>
//   );
// }

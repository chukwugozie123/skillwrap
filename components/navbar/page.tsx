"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, UserCircle2 } from "lucide-react";

// ================= TYPES =================
interface UserType {
  id: number;
  username: string;
  email?: string;
  img_url?: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
   const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // ✅ Fetch user data on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });
        if (!res.ok) return;

        const data = await res.json();
        setUser(data.req?.user || data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }
    fetchUser();
  }, [API_URL]);

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 font-poppins">
        <div
          className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4 
          bg-white/20 backdrop-blur-lg border-b border-white/30 text-white shadow-md"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300"
          >
            SkillWrap
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
            <Link href="/" className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link href="/doc" className="hover:text-blue-400 transition">
              Docs
            </Link>
            <Link href="/skills" className="hover:text-blue-400 transition">
              Skills
            </Link>

            {/* Auth / Profile */}
            <div className="flex gap-4 ml-6 items-center">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="px-5 py-2 rounded-lg font-semibold border border-white/30 text-white 
                    hover:bg-white/10 hover:scale-105 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 
                    hover:scale-105 hover:shadow-md transition"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
                >
                  {user.img_url ? (
                    <Image
                      src={user.img_url}
                      alt={`${user.username}'s profile picture`}
                      width={32}
                      height={32}
                      className="rounded-full border border-white/20"
                    />
                  ) : (
                    <UserCircle2 size={28} className="text-blue-300" />
                  )}
                  <span className="font-semibold">{user.username}</span>
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden flex flex-col items-center gap-6 py-6 text-lg 
          bg-white/20 backdrop-blur-lg border-t border-white/30 transition-all duration-300 
          ${isOpen ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 overflow-hidden"}`}
        >
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
            Home
          </Link>
          <Link href="/skills" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
            Skills
          </Link>
          <Link href="/doc" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
            Docs
          </Link>

          {/* Mobile Auth */}
          <div className="flex flex-col gap-3 w-full px-8">
            {!user ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-5 py-2 rounded-lg font-semibold border border-white/30 text-white 
                  hover:bg-white/10 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 
                  hover:scale-105 hover:shadow-md transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="w-full text-center px-5 py-2 rounded-lg font-semibold border border-white/30 
                flex items-center justify-center gap-2 hover:bg-white/10 transition"
              >
                {user.img_url ? (
                  <Image
                    src={user.img_url}
                    alt={`${user.username}'s profile picture`}
                    width={32}
                    height={32}
                    className="rounded-full border border-white/20"
                  />
                ) : (
                  <UserCircle2 size={24} />
                )}
                <span>{user.username}</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-24 md:h-28"></div>
    </>
  );
}









// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { Menu, X, UserCircle2 } from "lucide-react";

// // ================= TYPES =================
// interface UserType {
//   id: number;
//   username: string;
//   email?: string;
//   img_url?: string;
// }

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState<UserType | null>(null);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   // ✅ Fetch user data on mount
//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const res = await fetch(`${API_URL}/auth/profile`, {
//           credentials: "include",
//         });
//         if (!res.ok) return;

//         const data = await res.json();
//         setUser(data.req?.user || data.user);
//       } catch (err) {
//         console.error("Failed to fetch user:", err);
//       }
//     }
//     fetchUser();
//   }, []);

//   return (
//     <>
//       {/* Navbar */}
//       <header className="fixed top-0 left-0 w-full z-50 font-poppins">
//         <div
//           className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4 
//           bg-white/20 backdrop-blur-lg border-b border-white/30 text-white shadow-md"
//         >
//           {/* Logo */}
//           <Link
//             href="/"
//             className="text-2xl md:text-3xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300"
//           >
//             SkillWrap
//           </Link>

//           {/* Desktop Menu */}
//           <nav className="hidden md:flex items-center gap-8 text-lg font-medium">
//             <Link href="/" className="hover:text-blue-400 transition">
//               Home
//             </Link>
//             <Link href="/doc" className="hover:text-blue-400 transition">
//               Docs
//             </Link>
//             <Link href="/skills" className="hover:text-blue-400 transition">
//               Skills
//             </Link>

//             {/* Auth / Profile */}
//             <div className="flex gap-4 ml-6 items-center">
//               {!user ? (
//                 <>
//                   <Link
//                     href="/login"
//                     className="px-5 py-2 rounded-lg font-semibold border border-white/30 text-white 
//                     hover:bg-white/10 hover:scale-105 transition"
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     href="/signup"
//                     className="px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 
//                     hover:scale-105 hover:shadow-md transition"
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               ) : (
//                 <Link
//                   href="/profile"
//                   className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
//                 >
//                   {user.img_url ? (
//                     <Image
//                       src={user.img_url}
//                       alt={`${user.username}'s profile picture`}
//                       width={32}
//                       height={32}
//                       className="rounded-full border border-white/20"
//                     />
//                   ) : (
//                     <UserCircle2 size={28} className="text-blue-300" />
//                   )}
//                   <span className="font-semibold">{user.username}</span>
//                 </Link>
//               )}
//             </div>
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle menu"
//           >
//             {isOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//         {/* Mobile Dropdown */}
//         <div
//           className={`md:hidden flex flex-col items-center gap-6 py-6 text-lg 
//           bg-white/20 backdrop-blur-lg border-t border-white/30 transition-all duration-300 
//           ${isOpen ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 overflow-hidden"}`}
//         >
//           <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
//             Home
//           </Link>
//           <Link href="/skills" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
//             Skills
//           </Link>
//           <Link href="/doc" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
//             Docs
//           </Link>

//           {/* Mobile Auth */}
//           <div className="flex flex-col gap-3 w-full px-8">
//             {!user ? (
//               <>
//                 <Link
//                   href="/login"
//                   onClick={() => setIsOpen(false)}
//                   className="w-full text-center px-5 py-2 rounded-lg font-semibold border border-white/30 text-white 
//                   hover:bg-white/10 transition"
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   href="/signup"
//                   onClick={() => setIsOpen(false)}
//                   className="w-full text-center px-5 py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 
//                   hover:scale-105 hover:shadow-md transition"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             ) : (
//               <Link
//                 href="/profile"
//                 onClick={() => setIsOpen(false)}
//                 className="w-full text-center px-5 py-2 rounded-lg font-semibold border border-white/30 
//                 flex items-center justify-center gap-2 hover:bg-white/10 transition"
//               >
//                 {user.img_url ? (
//                   <Image
//                     src={user.img_url}
//                     alt={`${user.username}'s profile picture`}
//                     width={32}
//                     height={32}
//                     className="rounded-full border border-white/20"
//                   />
//                 ) : (
//                   <UserCircle2 size={24} />
//                 )}
//                 <span>{user.username}</span>
//               </Link>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Spacer */}
//       <div className="h-24 md:h-28"></div>
//     </>
//   );
// }

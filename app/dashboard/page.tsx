






// // "use client";
// // import { useEffect, useState } from "react";
// // import Link from "next/link";
// // import { motion } from "framer-motion";
// // import {
// //   Home, Layers, Inbox, CheckCircle, Activity, BarChart3, LogOut, Settings,
// //   Menu, X, Mail, Calendar, User, MessageCircle
// // } from "lucide-react";
// // import { initSocket, getSocket } from "@/lib/socketClient";

// // // ---------------- FETCH USER PROFILE ----------------
// // async function fetchUserProfile() {
// //   try {
// //     const res = await fetch("http://localhost:5000/auth/profile", {
// //       credentials: "include",
// //       cache: "no-store",
// //     });
// //     if (!res.ok) throw new Error("Failed to fetch profile");
// //     const data = await res.json();
// //     return data.req?.user || data.user;
// //   } catch (err) {
// //     console.error(err);
// //     return null;
// //   }
// // }

// // export default function DashboardPage() {
// //   const [user, setUser] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [stats, setStats] = useState({ createdSkills: 0, sendRequests: 0, receivedRequests: 0 });
// //   const [unread, setUnread] = useState(0);

// //   // ---------------- FETCH DATA ----------------
// //   useEffect(() => {
// //     fetchUserProfile().then((data) => { setUser(data); setLoading(false); });
// //   }, []);

// //   useEffect(() => {
// //     async function fetchStats() {
// //       try {
// //         const res = await fetch("http://localhost:5000/stats", { credentials: "include", cache: "no-store" });
// //         if (!res.ok) throw new Error("Failed to fetch stats");
// //         const data = await res.json();
// //         setStats({ createdSkills: data.createdSkill, sendRequests: data.sendRequests, receivedRequests: data.receivedRequests });
// //       } catch (err) { console.error(err); }
// //     }
// //     fetchStats();
// //   }, []);

// //   useEffect(() => {
// //     async function fetchUnread() {
// //       try {
// //         const res = await fetch("http://localhost:5000/notification/unread-count", { credentials: "include" });
// //         const data = await res.json();
// //         if (data.success) setUnread(data.count);
// //       } catch (err) { console.error(err); }
// //     }
// //     fetchUnread();
// //   }, []);

// //   // ---------------- SOCKET.IO ----------------
// //   useEffect(() => {
// //     if (!user?.id) return;
// //     initSocket();
// //     const socket = getSocket();
// //     socket.emit("register_user", user.id);
// //     socket.on("new_notification", () => setUnread(prev => prev + 1));
// //     return () => socket.off("new_notification");
// //   }, [user]);

// //   // ---------------- MARK ALL READ ----------------
// //   async function markNotificationsRead() {
// //     try {
// //       const res = await fetch("http://localhost:5000/notification/mark-all-read", {
// //         method: "PUT",
// //         credentials: "include",
// //       });
// //       const data = await res.json();
// //       if (data.success) setUnread(0);
// //     } catch (err) {
// //       console.error("Failed to mark notifications read", err);
// //     }
// //   }

// //   // ---------------- STAT CARDS ----------------
// //   const statCards = [
// //     { title: "Requests Received", value: stats.receivedRequests, icon: <Inbox />, color: "from-blue-500 to-purple-500" },
// //     { title: "Request Sent", value: stats.sendRequests, icon: <CheckCircle />, color: "from-green-500 to-teal-500" },
// //     { title: "Progress Tracked", value: "76%", icon: <Activity />, color: "from-yellow-500 to-orange-500" },
// //     { title: "Skills Created", value: stats.createdSkills, icon: <Layers />, color: "from-pink-500 to-red-500" },
// //   ];

// //   const features = [
// //     { title: "Track Your Progress", description: "Monitor your achievements, requests, and success rate.", icon: <BarChart3 />, color: "from-indigo-600 to-purple-600", href: "/progress" },
// //     { title: "View Request Sent", description: "Easily review the results and interactions you've shared.", icon: <CheckCircle />, color: "from-green-600 to-emerald-600", href: "/request-sent" },
// //     { title: "View Requests Received", description: "View, accept, or decline skill connection requests.", icon: <Inbox />, color: "from-blue-600 to-cyan-600", href: "/request-recieved" },
// //   ];

// //   return (
// //     <main className="h-screen flex bg-gradient-to-br from-[#030712] via-[#0b1220] to-[#1e1b4b] text-white overflow-hidden">
// //       {/* ---------------- SIDEBAR ---------------- */}
// //       <aside className={`fixed sm:static inset-y-0 left-0 z-40 bg-white/10 backdrop-blur-xl border-r border-white/10 shadow-2xl w-64 transform transition-transform duration-500 ease-in-out
// //         ${sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"} overflow-y-auto`}>
// //         <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
// //           <div className="flex items-center gap-3">
// //             {loading ? <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse" /> :
// //               <img src={user?.img_url || "/default-avatar.png"} alt="avatar" className="w-9 h-9 rounded-full border border-white/20" />}
// //             <span className="font-semibold text-lg truncate">{loading ? "Loading..." : user?.fullname || "Guest User"}</span>
// //           </div>
// //           <button className="sm:hidden text-gray-300" onClick={() => setSidebarOpen(false)}>
// //             <X className="w-5 h-5" />
// //           </button>
// //         </div>

// //         <nav className="flex flex-col p-4 space-y-2 text-sm font-medium">
// //           <SidebarLink href="/dashboard" icon={<Home />} label="Dashboard" />
// //           <SidebarLink href="/profile" icon={<User />} label="Profile" />
// //           <SidebarLink href="/chat" icon={<MessageCircle />} label="Chat" />
// //           <SidebarLink href="/my-skill" icon={<Layers />} label="My Skills" />
// //           <SidebarLink href="/request-recieved" icon={<Inbox />} label="Requests received" />
// //           <SidebarLink href="/result-sent" icon={<CheckCircle />} label="Results Sent" />
// //           <SidebarLink href="/progress" icon={<Activity />} label="Track Progress" />
// //           <SidebarLink
// //             href="/notifications-route"
// //             onClick={markNotificationsRead}
// //             icon={
// //               <div className="relative">
// //                 <Inbox className="w-5 h-5 text-blue-300" />
// //                 {unread > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold px-1.5 py-0.5 rounded-full">{unread}</span>}
// //               </div>
// //             }
// //             label="Notifications"
// //           />
// //           <SidebarLink href="/settings" icon={<Settings />} label="Settings" />
// //           <SidebarLink href="/logout" icon={<LogOut />} label="Logout" danger />
// //         </nav>
// //       </aside>

// //       {/* ---------------- MAIN CONTENT ---------------- */}
// //       <section className="flex-1 p-6 sm:p-10 overflow-y-auto sm:overflow-hidden relative">
// //         <button onClick={() => setSidebarOpen(true)} className="sm:hidden absolute top-6 left-6 bg-white/10 p-2 rounded-lg border border-white/10">
// //           <Menu className="w-5 h-5 text-blue-300" />
// //         </button>

// //         {loading ? <div className="flex items-center justify-center h-full text-gray-400">Loading your dashboard...</div> :
// //           <>
// //             <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
// //               <img src={user?.img_url || "/default-avatar.png"} alt="Profile" className="w-24 h-24 rounded-full border-2 border-blue-400 shadow-md" />
// //               <div className="flex-1">
// //                 <h1 className="text-2xl font-bold text-blue-300">{user?.fullname}</h1>
// //                 <p className="text-gray-400 text-sm">@{user?.username}</p>
// //                 <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-400">
// //                   <span className="flex items-center gap-1"><Mail className="w-4 h-4 text-blue-400" /> {user?.email}</span>
// //                   <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-blue-400" /> Joined: {new Date(user.created_at).toLocaleString()}</span>
// //                 </div>
// //               </div>
// //               <Link href="/create-skill" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-medium text-white shadow-md transition-all">+ Create Skill</Link>
// //             </motion.div>

// //             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //               {statCards.map((s, i) => <StatCard key={i} {...s} />)}
// //             </motion.div>

// //             <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //               {features.map((f, i) => <FeatureCard key={i} {...f} />)}
// //             </motion.div>
// //           </>
// //         }
// //       </section>
// //     </main>
// //   );
// // }

// // /* ---------- COMPONENTS ---------- */
// // function SidebarLink({ href, icon, label, danger, onClick }: { href: string; icon: React.ReactNode; label: string; danger?: boolean; onClick?: () => void }) {
// //   return (
// //     <Link
// //       href={href}
// //       onClick={onClick}
// //       className={`flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/10 transition-all ${danger ? "text-red-400 hover:bg-red-500/10" : "text-gray-300"}`}
// //     >
// //       <span className="text-blue-300">{icon}</span>
// //       {label}
// //     </Link>
// //   );
// // }

// // function StatCard({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) {
// //   return (
// //     <motion.div whileHover={{ scale: 1.05 }} className={`p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-lg flex items-center gap-4 cursor-pointer transition-all duration-300`}>
// //       <div className={`p-4 rounded-full bg-gradient-to-br ${color} text-white`}>{icon}</div>
// //       <div>
// //         <p className="text-sm text-gray-400">{title}</p>
// //         <h3 className="text-2xl font-semibold text-white">{value ?? 0}</h3>
// //       </div>
// //     </motion.div>
// //   );
// // }

// // function FeatureCard({ title, description, icon, color, href }: { title: string; description: string; icon: React.ReactNode; color: string; href: string }) {
// //   return (
// //     <Link href={href} className="group">
// //       <motion.div whileHover={{ scale: 1.03, y: -4 }} className={`p-8 rounded-3xl bg-gradient-to-br ${color} text-white shadow-xl transition-all duration-300`}>
// //         <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-white/20 rounded-full">{icon}</div><h3 className="text-xl font-bold">{title}</h3></div>
// //         <p className="text-sm text-white/80">{description}</p>
// //       </motion.div>
// //     </Link>
// //   );
// // }


// // // improve,ment 1. add btoon to thoes 3 features div like a vie buttton that would link to where ever they wanna go eg requesdt-recieved request-sent etc and also when on smaller devices lett the sidebar open use one react package to do that and remove all socket.io code and let the number of notifications show on the notifications button thaanks



















































// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   Home, Layers, Inbox, CheckCircle, Activity, BarChart3, LogOut, Settings,
//   Menu, X, Mail, Calendar, User, MessageCircle
// } from "lucide-react";

//  const API_URL = process.env.DB_API_URL;

//   console.log(API_URL)
// // chage all the localhost to API_URL U GET

// // ---------------- FETCH USER PROFILE ----------------
// async function fetchUserProfile() {
//   try {
//     const res = await fetch("http://localhost:5000/auth/profile", {
//       credentials: "include",
//       cache: "no-store",
//     });
//     if (!res.ok) throw new Error("Failed to fetch profile");
//     const data = await res.json();
//     return data.req?.user || data.user;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// }

// export default function DashboardPage() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [stats, setStats] = useState({ createdSkills: 0, sendRequests: 0, receivedRequests: 0 });
//   const [unread, setUnread] = useState(0);

//   // ---------------- FETCH DATA ----------------
//   useEffect(() => {
//     fetchUserProfile().then((data) => { setUser(data); setLoading(false); });
//   }, []);

//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         const res = await fetch("http://localhost:5000/stats", { credentials: "include", cache: "no-store" });
//         const data = await res.json();
//         setStats({
//           createdSkills: data.createdSkill,
//           sendRequests: data.sendRequests,
//           receivedRequests: data.receivedRequests
//         });
//       } catch (err) { console.error(err); }
//     }
//     fetchStats();
//   }, []);

//   useEffect(() => {
//     async function fetchUnread() {
//       try {
//         const res = await fetch("http://localhost:5000/notification/unread-count", { credentials: "include" });
//         const data = await res.json();
//         if (data.success) setUnread(data.count);
//       } catch (err) { console.error(err); }
//     }
//     fetchUnread();
//   }, []);

//   // ---------------- MARK ALL READ ----------------
//   async function markNotificationsRead() {
//     try {
//       const res = await fetch("http://localhost:5000/notification/mark-all-read", {
//         method: "PUT",
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (data.success) setUnread(0);
//     } catch (err) {
//       console.error("Failed to mark notifications read", err);
//     }
//   }

//   // ---------------- STAT CARDS ----------------
//   const statCards = [
//     { title: "Requests Received", value: stats.receivedRequests, icon: <Inbox />, color: "from-blue-500 to-purple-500" },
//     { title: "Request Sent", value: stats.sendRequests, icon: <CheckCircle />, color: "from-green-500 to-teal-500" },
//     // { title: "Progress Tracked", value: "76%", icon: <Activity />, color: "from-yellow-500 to-orange-500" },
//     { title: "Skills Created", value: stats.createdSkills, icon: <Layers />, color: "from-pink-500 to-red-500" },
//   ];

//   const features = [
//     // { title: "Track Your Progress", description: "Monitor your achievements, requests, and success rate.", icon: <BarChart3 />, color: "from-indigo-600 to-purple-600", href: "/progress" },
//     { title: "View Request Sent", description: "Easily review the results and interactions you've shared.", icon: <CheckCircle />, color: "from-green-600 to-emerald-600", href: "/request-sent" },
//     { title: "View Requests Received", description: "View, accept, or decline skill connection requests.", icon: <Inbox />, color: "from-blue-600 to-cyan-600", href: "/request-recieved" },
//   ];

//   console.log(user?.img_url)

//   return (
//     <main className="h-screen flex bg-gradient-to-br from-[#030712] via-[#0b1220] to-[#1e1b4b] text-white overflow-hidden">
      
//       {/* ---------------- SIDEBAR ---------------- */}
//       <aside className={`fixed sm:static inset-y-0 left-0 z-40 bg-white/10 backdrop-blur-xl border-r border-white/10 shadow-2xl w-64 transform transition-transform duration-500 ease-in-out
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"} overflow-y-auto`}>
//         <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
//           <div className="flex items-center gap-3">
//             {loading ? <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse" /> :
//               <img src={user?.img_url || "/default-avatar.png"} alt="avatar" className="w-9 h-9 rounded-full border border-white/20" />}
//             <span className="font-semibold text-lg truncate">{loading ? "Loading..." : user?.fullname || "Guest User"}</span>
//           </div>
//           <button className="sm:hidden text-gray-300" onClick={() => setSidebarOpen(false)}>
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <nav className="flex flex-col p-4 space-y-2 text-sm font-medium">
//           <SidebarLink href="/dashboard" icon={<Home />} label="Dashboard" />
//           <SidebarLink href="/profile" icon={<User />} label="Profile" />
//           <SidebarLink href="/chat" icon={<MessageCircle />} label="Chat" />
//           <SidebarLink href="/my-skill" icon={<Layers />} label="My Skills" />
//           <SidebarLink href="/request-recieved" icon={<Inbox />} label="Requests received" />
//           <SidebarLink href="/result-sent" icon={<CheckCircle />} label="Results Sent" />
//           <SidebarLink href="/progress" icon={<Activity />} label="Track Progress" />
//           <SidebarLink
//             href="/notifications-route"
//             onClick={markNotificationsRead}
//             icon={
//               <div className="relative">
//                 <Inbox className="w-5 h-5 text-blue-300" />
//                 {unread > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold px-1.5 py-0.5 rounded-full">{unread}</span>}
//               </div>
//             }
//             label="Notifications"
//           />
//           <SidebarLink href="/settings" icon={<Settings />} label="Settings" />
//           <SidebarLink href="/logout" icon={<LogOut />} label="Logout" danger />
//         </nav>
//       </aside>

//       {/* ---------------- MAIN CONTENT ---------------- */}
//       <section className="flex-1 p-6 sm:p-10 overflow-y-auto sm:overflow-hidden relative">
//         <button onClick={() => setSidebarOpen(true)} className="sm:hidden absolute top-6 left-6 bg-white/10 p-2 rounded-lg border border-white/10">
//           <Menu className="w-5 h-5 text-blue-300" />
//         </button>

//         {loading ? <div className="flex items-center justify-center h-full text-gray-400">Loading your dashboard...</div> :
//           <>
//             {/* PROFILE CARD */}
//             <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
//               <img src={user?.img_url || "/default-avatar.png"} alt="Profile" className="w-24 h-24 rounded-full border-2 border-blue-400 shadow-md" />
//               <div className="flex-1">
//                 <h1 className="text-2xl font-bold text-blue-300">{user?.fullname}</h1>
//                 <p className="text-gray-400 text-sm">@{user?.username}</p>
//                 <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-400">
//                   <span className="flex items-center gap-1"><Mail className="w-4 h-4 text-blue-400" /> {user?.email}</span>
//                   <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-blue-400" /> Joined: {new Date(user.created_at).toLocaleString()}</span>
//                 </div>
//               </div>
//               <Link href="/create-skill" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-medium text-white shadow-md transition-all">+ Create Skill</Link>
//             </motion.div>

//             {/* STAT CARDS */}
//             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {statCards.map((s, i) => <StatCard key={i} {...s} />)}
//             </motion.div>

//             {/* FEATURE CARDS */}
//             <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {features.map((f, i) => <FeatureCard key={i} {...f} />)}
//             </motion.div>
//           </>
//         }
//       </section>
//     </main>
//   );
// }

// /* ---------- COMPONENTS ---------- */
// function SidebarLink({ href, icon, label, danger, onClick }: { href: string; icon: React.ReactNode; label: string; danger?: boolean; onClick?: () => void }) {
//   return (
//     <Link
//       href={href}
//       onClick={onClick}
//       className={`flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/10 transition-all ${danger ? "text-red-400 hover:bg-red-500/10" : "text-gray-300"}`}
//     >
//       <span className="text-blue-300">{icon}</span>
//       {label}
//     </Link>
//   );
// }

// function StatCard({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) {
//   return (
//     <motion.div whileHover={{ scale: 1.05 }} className={`p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-lg flex items-center gap-4 cursor-pointer transition-all duration-300`}>
//       <div className={`p-4 rounded-full bg-gradient-to-br ${color} text-white`}>{icon}</div>
//       <div>
//         <p className="text-sm text-gray-400">{title}</p>
//         <h3 className="text-2xl font-semibold text-white">{value ?? 0}</h3>
//       </div>
//     </motion.div>
//   );
// }

// function FeatureCard({ title, description, icon, color, href }: { title: string; description: string; icon: React.ReactNode; color: string; href: string }) {
//   return (
//       <motion.div whileHover={{ scale: 1.03, y: -4 }} className={`p-8 rounded-3xl bg-gradient-to-br ${color} text-white shadow-xl transition-all duration-300`}>
//         <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-white/20 rounded-full">{icon}</div><h3 className="text-xl font-bold">{title}</h3></div>
//         <p className="text-sm text-white/80">{description}</p>
//          <Link href={href} className="self-start px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition">View</Link>
//       </motion.div>
//   );
// }


// // function FeatureCard({ title, description, icon, color, href }: { title: string; description: string; icon: React.ReactNode; color: string; href: string }) {
// //   return (
// //     <motion.div whileHover={{ scale: 1.03, y: -4 }} className={`p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg transition-all duration-300 flex flex-col justify-between`}>
// //       <div className="flex items-center gap-4 mb-4">
// //         <div className="p-3 bg-white/20 rounded-full">{icon}</div>
// //         <h3 className="text-xl font-bold">{title}</h3>
// //       </div>
// //       <p className="text-sm text-white/80 mb-4">{description}</p>
// //       <Link href={href} className="self-start px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition">View</Link>
// //     </motion.div>
// //   );
// // }




































"use client";


import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // use Next.js optimized Image
import { motion } from "framer-motion";
import {
  Home, Layers, Inbox, CheckCircle, Activity, LogOut, Settings,
  Menu, X, Mail, Calendar, User, MessageCircle
} from "lucide-react";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
 const API_URL= 'https://skillwrap-backend.onrender.com'
// const API_URL = 'http://localhost:5000'

interface User {
  username: string;
  fullname: string;
  email: string;
  img_url?: string;
  created_at: string;
}

interface Stats {
  createdSkills: number;
  sendRequests: number;
  receivedRequests: number;
}

// ---------------- FETCH USER PROFILE ----------------
async function fetchUserProfile(): Promise<User | null> {
  try {
    const res = await fetch(`http://localhost:5000/auth/profile`, {
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    const data = await res.json();
    return data.req?.user || data.user || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<Stats>({ createdSkills: 0, sendRequests: 0, receivedRequests: 0 });
  const [unread, setUnread] = useState(0);

  // ---------------- FETCH DATA ----------------
  useEffect(() => {
    fetchUserProfile().then((data) => { setUser(data); setLoading(false); });
  }, []);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${API_URL}/stats`, { credentials: "include", cache: "no-store" });
        const data = await res.json();
        setStats({
          createdSkills: data.createdSkill,
          sendRequests: data.sendRequests,
          receivedRequests: data.receivedRequests
        });
      } catch (err) { console.error(err); }
    }
    fetchStats();
  }, []);

  useEffect(() => {
    async function fetchUnread() {
      try {
        const res = await fetch(`${API_URL}/notification/unread-count`, { credentials: "include" });
        const data = await res.json();
        if (data.success) setUnread(data.count);
      } catch (err) { console.error(err); }
    }
    fetchUnread();
  }, []);

  // ---------------- MARK ALL READ ----------------
  async function markNotificationsRead() {
    try {
      const res = await fetch(`${API_URL}/notification/mark-all-read`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setUnread(0);
    } catch (err) {
      console.error("Failed to mark notifications read", err);
    }
  }

  const statCards = [
    { title: "Requests Received", value: stats.receivedRequests, icon: <Inbox />, color: "from-blue-500 to-purple-500" },
    { title: "Request Sent", value: stats.sendRequests, icon: <CheckCircle />, color: "from-green-500 to-teal-500" },
    { title: "Skills Created", value: stats.createdSkills, icon: <Layers />, color: "from-pink-500 to-red-500" },
  ];

  const features = [
    { title: "View Request Sent", description: "Easily review the results and interactions you've shared.", icon: <CheckCircle />, color: "from-green-600 to-emerald-600", href: "/request-sent" },
    { title: "View Requests Received", description: "View, accept, or decline skill connection requests.", icon: <Inbox />, color: "from-blue-600 to-cyan-600", href: "/request-recieved" },
  ];

  return (
    <main className="h-screen flex bg-gradient-to-br from-[#030712] via-[#0b1220] to-[#1e1b4b] text-white overflow-hidden">
      {/* SIDEBAR */}
      <aside className={`fixed sm:static inset-y-0 left-0 z-40 bg-white/10 backdrop-blur-xl border-r border-white/10 shadow-2xl w-64 transform transition-transform duration-500 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"} overflow-y-auto`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            {loading ? <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse" /> :
              <Image src={user?.img_url ? `${API_URL}/uploads/${user.img_url}` : "/default-avatar.png"} alt="avatar" width={36} height={36} className="rounded-full border border-white/20" />}
            <span className="font-semibold text-lg truncate">{loading ? "Loading..." : user?.fullname || "Guest User"}</span>
          </div>
          <button className="sm:hidden text-gray-300" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-2 text-sm font-medium">
          <SidebarLink href="/dashboard" icon={<Home />} label="Dashboard" />
          <SidebarLink href="/profile" icon={<User />} label="Profile" />
          <SidebarLink href="/chat" icon={<MessageCircle />} label="Chat" />
          <SidebarLink href="/my-skill" icon={<Layers />} label="My Skills" />
          <SidebarLink href="/request-recieved" icon={<Inbox />} label="Requests received" />
          <SidebarLink href="/result-sent" icon={<CheckCircle />} label="Results Sent" />
          <SidebarLink href="/progress" icon={<Activity />} label="Track Progress" />
          <SidebarLink
            href="/notifications-route"
            onClick={markNotificationsRead}
            icon={
              <div className="relative">
                <Inbox className="w-5 h-5 text-blue-300" />
                {unread > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold px-1.5 py-0.5 rounded-full">{unread}</span>}
              </div>
            }
            label="Notifications"
          />
          <SidebarLink href="/settings" icon={<Settings />} label="Settings" />
          <SidebarLink href="/logout" icon={<LogOut />} label="Logout" danger />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <section className="flex-1 p-6 sm:p-10 overflow-y-auto sm:overflow-hidden relative">
        <button onClick={() => setSidebarOpen(true)} className="sm:hidden absolute top-6 left-6 bg-white/10 p-2 rounded-lg border border-white/10">
          <Menu className="w-5 h-5 text-blue-300" />
        </button>

        {loading ? <div className="flex items-center justify-center h-full text-gray-400">Loading your dashboard...</div> :
          <>
            {/* PROFILE CARD */}
            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Image src={user?.img_url ? `${API_URL}/uploads/${user.img_url}` : "/default-avatar.png"} alt="Profile" width={96} height={96} className="rounded-full border-2 border-blue-400 shadow-md" />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-blue-300">{user?.fullname}</h1>
                <p className="text-gray-400 text-sm">@{user?.username}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-400">
                  <span className="flex items-center gap-1"><Mail className="w-4 h-4 text-blue-400" /> {user?.email}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-blue-400" /> Joined: {new Date(user!.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <Link href="/create-skill" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-medium text-white shadow-md transition-all">+ Create Skill</Link>
            </motion.div>

            {/* STAT CARDS */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((s, i) => <StatCard key={i} {...s} />)}
            </motion.div>

            {/* FEATURE CARDS */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f, i) => <FeatureCard key={i} {...f} />)}
            </motion.div>
          </>
        }
      </section>
    </main>
  );
}

/* ---------- COMPONENTS ---------- */
function SidebarLink({ href, icon, label, danger, onClick }: { href: string; icon: React.ReactNode; label: string; danger?: boolean; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/10 transition-all ${danger ? "text-red-400 hover:bg-red-500/10" : "text-gray-300"}`}
    >
      <span className="text-blue-300">{icon}</span>
      {label}
    </Link>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className={`p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl shadow-lg flex items-center gap-4 cursor-pointer transition-all duration-300`}>
      <div className={`p-4 rounded-full bg-gradient-to-br ${color} text-white`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h3 className="text-2xl font-semibold text-white">{value ?? 0}</h3>
      </div>
    </motion.div>
  );
}

function FeatureCard({ title, description, icon, color, href }: { title: string; description: string; icon: React.ReactNode; color: string; href: string }) {
  return (
      <motion.div whileHover={{ scale: 1.03, y: -4 }} className={`p-8 rounded-3xl bg-gradient-to-br ${color} text-white shadow-xl transition-all duration-300`}>
        <div className="flex items-center gap-4 mb-4"><div className="p-3 bg-white/20 rounded-full">{icon}</div><h3 className="text-xl font-bold">{title}</h3></div>
        <p className="text-sm text-white/80">{description}</p>
         <Link href={href} className="self-start px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition">View</Link>
      </motion.div>
  );
}

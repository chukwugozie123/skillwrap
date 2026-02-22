// // "use client";

// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";

// // import {
// //   Home,
// //   Layers,
// //   Inbox,
// //   CheckCircle,
// //   LogOut,
// //   Settings,
// //   User,
// //   MessageCircle,
// // } from "lucide-react";

// // import LearningDashboard from "./dashboards/LearningDashboard";
// // import TeachingDashboard from "./dashboards/TeachingDashboard";
// // import ExchangeDashboard from "./dashboards/ExchangeingDashboard";
// // import SidebarLink from "./components/SidebarLink";

// // const API_URL = "http://localhost:4000";

// // /* ================= TYPES ================= */
// // interface RoadmapStep {
// //   step: number;
// //   skill: string;
// //   description: string;
// // }

// // interface UserType {
// //   id: number;
// //   username: string;
// //   fullname: string;
// //   email: string;
// //   img_url?: string;
// //   created_at: string;
// //   mode: "learning" | "teaching" | "exchanging" | null;
// //   advice?: RoadmapStep[];
// // }

// // interface Stats {
// //   createdSkills: number;
// //   sendRequests: number;
// //   receivedRequests: number;
// //   succesfullExchnage: number;
// //   canclledExchnaged: number;
// // }

// // export default function DashboardPage() {
// //   const router = useRouter();

// //   const [user, setUser] = useState<UserType | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   const [stats, setStats] = useState<Stats>({
// //     createdSkills: 0,
// //     sendRequests: 0,
// //     receivedRequests: 0,
// //     succesfullExchnage: 0,
// //     canclledExchnaged: 0,
// //   });

// //   const [showRoadmapModal, setShowRoadmapModal] = useState(false);
// //   const [goalText, setGoalText] = useState("");
// //   const [savingRoadmap, setSavingRoadmap] = useState(false);
// //   const [aiMode, setAiMode] = useState<"ai" | "fallback" | null>(null);

// //   /* ================= LOAD USER ================= */
// //   useEffect(() => {
// //     async function loadUser() {
// //       try {
// //         const res = await fetch(`${API_URL}/auth/profile`, {
// //           credentials: "include",
// //           cache: "no-store",
// //         });

// //         if (!res.ok) {
// //           router.replace("/login");
// //           return;
// //         }

// //         const data = await res.json();

// //         // parse advice if stored as string
// //         let advice = data.user.advice;
// //         if (typeof advice === "string") {
// //           try {
// //             advice = JSON.parse(advice);
// //           } catch {
// //             advice = undefined;
// //           }
// //         }

// //         setUser({ ...data.user, advice });
// //       } catch {
// //         router.replace("/login");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     loadUser();
// //   }, [router]);

// //   /* ================= FETCH STATS ================= */
// //   useEffect(() => {
// //     if (!user) return;

// //     fetch(`${API_URL}/stats`, { credentials: "include" })
// //       .then((res) => res.json())
// //       .then((data) =>
// //         setStats({
// //           createdSkills: data.createdSkill ?? 0,
// //           sendRequests: data.sendRequests ?? 0,
// //           receivedRequests: data.receivedRequests ?? 0,
// //           succesfullExchnage: data.succesfullExchnage ?? 0,
// //           canclledExchnaged: data.canclledExchnaged ?? 0,
// //         })
// //       );
// //   }, [user]);

// //   /* ================= LOGOUT ================= */
// //   async function handleLogout() {
// //     await fetch(`${API_URL}/auth/logout`, {
// //       method: "POST",
// //       credentials: "include",
// //     });
// //     router.replace("/login");
// //   }

// //   /* ================= GENERATE ROADMAP ================= */
// //   async function generateRoadmap() {
// //     if (!goalText.trim()) return;

// //     setSavingRoadmap(true);

// //     try {
// //       const res = await fetch(`${API_URL}/generate-roadmap`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //         body: JSON.stringify({ goal: goalText }),
// //       });

// //       const data = await res.json();

// //       setUser((prev) =>
// //         prev ? { ...prev, advice: data.roadmap } : prev
// //       );

// //       setAiMode(data.ai_mode || "ai");
// //       setShowRoadmapModal(false);
// //     } catch {
// //       alert("Failed to generate roadmap");
// //     } finally {
// //       setSavingRoadmap(false);
// //     }
// //   }

// //   if (loading) {
// //     return (
// //       <div className="h-screen flex items-center justify-center text-gray-400">
// //         Loading dashboard...
// //       </div>
// //     );
// //   }

// //   if (!user) return null;

// //   return (
// //     <main className="min-h-screen flex bg-gradient-to-br from-[#030712] via-[#0b1220] to-[#1e1b4b] text-white">

// //       {/* ================= SIDEBAR ================= */}
// //       <aside className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 hidden sm:flex flex-col">
// //         <div className="flex items-center gap-3 px-6 py-4 border-b border-white/20">
// //           <Image
// //             src={user.img_url || "/default-avatar.png"}
// //             alt="avatar"
// //             width={36}
// //             height={36}
// //             className="rounded-full"
// //           />
// //           <div>
// //             <p className="font-semibold">{user.fullname}</p>
// //             {user.mode && (
// //               <span className="text-xs text-white/70">{user.mode}</span>
// //             )}
// //           </div>
// //         </div>

// //         <nav className="p-4 space-y-2 text-sm flex-1">
// //           <SidebarLink href="/dashboard" icon={<Home />} label="Dashboard" />
// //           <SidebarLink href="/profile" icon={<User />} label="Profile" />
// //           <SidebarLink href="/chat" icon={<MessageCircle />} label="Chat" />
// //           <SidebarLink href="/my-skill" icon={<Layers />} label="My Skills" />
// //           <SidebarLink href="/request-recieved" icon={<Inbox />} label="Requests Received" />
// //           <SidebarLink href="/request-sent" icon={<CheckCircle />} label="Requests Sent" />
// //           <SidebarLink href="/settings" icon={<Settings />} label="Settings" />

// //           <button
// //             onClick={handleLogout}
// //             className="flex items-center gap-3 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10"
// //           >
// //             <LogOut /> Logout
// //           </button>
// //         </nav>
// //       </aside>

// //       {/* ================= CONTENT ================= */}
// //       <section className="flex-1 p-8">
// //         <h1 className="text-3xl font-extrabold text-blue-300 mb-6">
// //           Welcome back, {user.fullname.split(" ")[0]} ✨
// //         </h1>

// //         <button
// //           onClick={() => setShowRoadmapModal(true)}
// //           className="mb-6 py-2 px-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 font-semibold"
// //         >
// //           🚀 Set / View Roadmap
// //         </button>

// //         {user.advice && (
// //           <div className="mb-8 bg-white/10 p-4 rounded-xl space-y-3">
// //             <div className="text-xs text-center">
// //               {aiMode === "fallback" ? (
// //                 <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
// //                   ⚡ Smart Offline Roadmap
// //                 </span>
// //               ) : (
// //                 <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400">
// //                   🤖 AI Generated Roadmap
// //                 </span>
// //               )}
// //             </div>

// //             {user.advice.map((step) => (
// //               <div
// //                 key={step.step}
// //                 className="p-3 rounded-xl bg-black/30 border border-white/10"
// //               >
// //                 <p className="font-semibold text-green-300">
// //                   Step {step.step}: {step.skill}
// //                 </p>
// //                 <p className="text-white/80 text-sm mt-1">
// //                   {step.description}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {user.mode === "learning" && <LearningDashboard stats={stats} user={user} />}
// //         {user.mode === "teaching" && <TeachingDashboard stats={stats} user={user} />}
// //         {user.mode === "exchanging" && <ExchangeDashboard stats={stats} user={user} />}
// //       </section>

// //       {/* ================= ROADMAP MODAL ================= */}
// //       {showRoadmapModal && (
// //         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70">
// //           <div className="w-full max-w-md p-6 rounded-3xl bg-[#020617] border border-green-500/30">
// //             <h2 className="text-2xl font-bold text-green-400 text-center mb-3">
// //               Your Learning Goal
// //             </h2>

// //             <textarea
// //               value={goalText}
// //               onChange={(e) => setGoalText(e.target.value)}
// //               rows={5}
// //               placeholder="I want to become a frontend developer..."
// //               className="w-full p-3 rounded-xl bg-white/10 border border-white/20 mb-4"
// //             />

// //             <button
// //               disabled={savingRoadmap}
// //               onClick={generateRoadmap}
// //               className="w-full py-2 rounded-xl bg-green-600 font-semibold"
// //             >
// //               {savingRoadmap ? "Generating..." : "Generate Roadmap"}
// //             </button>

// //             <button
// //               onClick={() => setShowRoadmapModal(false)}
// //               className="mt-4 w-full py-2 rounded-xl border border-white/20"
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </main>
// //   );
// // }











// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// import {
//   Home,
//   Layers,
//   Inbox,
//   CheckCircle,
//   LogOut,
//   Settings,
//   User,
//   MessageCircle,
//   Bell,
//   X,
// } from "lucide-react";

// import LearningDashboard from "./dashboards/LearningDashboard";
// import TeachingDashboard from "./dashboards/TeachingDashboard";
// import ExchangeDashboard from "./dashboards/ExchangeingDashboard";
// import SidebarLink from "./components/SidebarLink";

// // const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";

// /* ================= TYPES ================= */
// interface UserType {
//   id: number;
//   username: string;
//   fullname: string;
//   email: string;
//   img_url?: string;
//   created_at: string;
//   mode: "learning" | "teaching" | "exchanging" | null;
// }

// interface Stats {
//   createdSkills: number;
//   sendRequests: number;
//   receivedRequests: number;
//   succesfullExchnage: number;
//   canclledExchnaged: number;
// }

// export default function DashboardPage() {
//   const router = useRouter();

//   const [user, setUser] = useState<UserType | null>(null);
//   const [loading, setLoading] = useState(true);

//   const [stats, setStats] = useState<Stats>({
//     createdSkills: 0,
//     sendRequests: 0,
//     receivedRequests: 0,
//     succesfullExchnage: 0,
//     canclledExchnaged: 0,
//   });

//   const [unread, setUnread] = useState(0);

//   const [showModeModal, setShowModeModal] = useState(false);
//   const [selectedMode, setSelectedMode] = useState<UserType["mode"]>(null);
//   const [savingMode, setSavingMode] = useState(false);

//   const [showSidebar, setShowSidebar] = useState(false); // mobile sidebar toggle

//   // ========= Roadmap states =========
//   const [showRoadmapModal, setShowRoadmapModal] = useState(false);
//   const [roadmapText, setRoadmapText] = useState("");
//   const [savingRoadmap, setSavingRoadmap] = useState(false);
//   const [roadmapMessage, setRoadmapMessage] = useState("");

//   /* ================= FETCH USER ================= */
//   useEffect(() => {
//     async function loadUser() {
//       try {
//         const res = await fetch(`${API_URL}/auth/profile`, {
//           credentials: "include",
//           cache: "no-store",
//         });

//         if (!res.ok) {
//           router.replace("/login");
//           return;
//         }

//         const data = await res.json();
//         const fetchedUser = data.user as UserType;

//         setUser(fetchedUser);

//         if (!fetchedUser.mode) {
//           setShowModeModal(true);
//         }
//       } catch {
//         router.replace("/login");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadUser();
//   }, [router]);

//   /* ================= KEEP MODAL IN SYNC ================= */
//   useEffect(() => {
//     if (user?.mode) setShowModeModal(false);
//   }, [user]);

//   /* ================= FETCH STATS ================= */
//   useEffect(() => {
//     if (!user) return;

//     fetch(`${API_URL}/stats`, { credentials: "include" })
//       .then((res) => res.json())
//       .then((data) =>
//         setStats({
//           createdSkills: data.createdSkill ?? 0,
//           sendRequests: data.sendRequests ?? 0,
//           receivedRequests: data.receivedRequests ?? 0,
//           succesfullExchnage: data.succesfullExchnage ?? 0,
//           canclledExchnaged: data.canclledExchnaged ?? 0,
//         })
//       )
//       .catch(console.error);
//   }, [user]);

//   /* ================= NOTIFICATIONS ================= */
//   useEffect(() => {
//     fetch(`${API_URL}/notification/unread-count`, {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) setUnread(data.count);
//       });
//   }, []);

//   /* ================= SAVE MODE ================= */
//   async function handleSaveMode() {
//     if (!selectedMode) return;

//     setSavingMode(true);
//     try {
//       const res = await fetch(`${API_URL}/user/set-mode`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ mode: selectedMode }),
//       });

//       if (!res.ok) throw new Error();

//       const data = await res.json();

//       setUser((prev) => (prev ? { ...prev, mode: data.mode } : prev));
//       setShowModeModal(false);
//     } catch {
//       alert("Failed to save mode");
//     } finally {
//       setSavingMode(false);
//     }
//   }

//   /* ================= LOGOUT ================= */
//   async function handleLogout() {
//     await fetch(`${API_URL}/auth/logout`, {
//       method: "POST",
//       credentials: "include",
//     });
//     router.replace("/login");
//   }

//   /* ================= VIEW NOTIFICATIONS ================= */
//   async function handleViewNotifications() {
//     setUnread(0);
//     router.push("/notifications-route");
//   }

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center text-gray-400">
//         Loading dashboard...
//       </div>
//     );
//   }

//   if (!user) return null;

//   return (
//     <main className="min-h-screen flex bg-gradient-to-br from-[#030712] via-[#0b1220] to-[#1e1b4b] text-white">

//       {/* ================= MOBILE HAMBURGER ================= */}
//       <div className="sm:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={() => setShowSidebar(true)}
//           className="p-2 rounded-md bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition"
//         >
//           <span className="sr-only">Open sidebar</span>
//           <div className="space-y-1">
//             <span className="block w-6 h-0.5 bg-white rounded-full"></span>
//             <span className="block w-6 h-0.5 bg-white rounded-full"></span>
//             <span className="block w-6 h-0.5 bg-white rounded-full"></span>
//           </div>
//         </button>
//       </div>

//       {/* ================= SIDEBAR ================= */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/10 backdrop-blur-xl border-r border-white/20
//           transform transition-transform duration-300 ease-in-out
//           ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
//           sm:translate-x-0 sm:static sm:flex sm:flex-col`}
//       >
//         {/* Close button for mobile */}
//         <div className="sm:hidden flex justify-end p-4">
//           <button
//             onClick={() => setShowSidebar(false)}
//             className="p-2 rounded-md text-white bg-black/40 hover:bg-black/60 transition"
//           >
//             <X />
//           </button>
//         </div>

//         {/* User Info */}
//         <div className="flex items-center gap-3 px-6 py-4 border-b border-white/20">
//           <Image
//             src={user.img_url || "/default-avatar.png"}
//             alt="avatar"
//             width={36}
//             height={36}
//             className="rounded-full"
//           />
//           <div>
//             <p className="font-semibold">{user.fullname}</p>
//             {user.mode && <span className="text-xs text-white/70">{user.mode}</span>}
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <nav className="p-4 space-y-2 text-sm flex-1">
//           <SidebarLink href="/dashboard" icon={<Home />} label="Dashboard" />
//           <SidebarLink href="/profile" icon={<User />} label="Profile" />
//           <SidebarLink href="/chat" icon={<MessageCircle />} label="Chat" />
//           <SidebarLink href="/my-skill" icon={<Layers />} label="My Skills" />
//           <SidebarLink href="/request-recieved" icon={<Inbox />} label="Requests Received" />
//           <SidebarLink href="/request-sent" icon={<CheckCircle />} label="Requests Sent" />

//           <button
//             onClick={handleViewNotifications}
//             className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20 w-full transition"
//           >
//             <Bell />
//             Notifications
//             {unread > 0 && (
//               <span className="ml-auto bg-red-500 text-xs px-2 rounded-full">{unread}</span>
//             )}
//           </button>

//           <SidebarLink href="/settings" icon={<Settings />} label="Settings" />

//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition"
//           >
//             <LogOut />
//             Logout
//           </button>
//         </nav>
//       </aside>

//       {/* ================= MOBILE OVERLAY ================= */}
//       {showSidebar && (
//         <div
//           className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm sm:hidden transition"
//           onClick={() => setShowSidebar(false)}
//         ></div>
//       )}

//       {/* ================= CONTENT ================= */}
//       <section className="flex-1 p-8">
//         <h1 className="text-3xl font-extrabold text-blue-300 mb-6">
//           Welcome back, {user.fullname.split(" ")[0]} ✨
//         </h1>

//         {/* ===== Roadmap Button ===== */}
//         <div className="mb-6">
//           <button
//             onClick={() => setShowRoadmapModal(true)}
//             className="py-2 px-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 text-white font-semibold"
//           >
//             🚀 Set Your Roadmap
//           </button>
//         </div>

//         {user.mode === "learning" && <LearningDashboard stats={stats} user={user} />}
//         {user.mode === "teaching" && <TeachingDashboard stats={stats} user={user} />}
//         {user.mode === "exchanging" && <ExchangeDashboard stats={stats} user={user} />}
//       </section>

//       {/* ================= MODE MODAL ================= */}
//       {showModeModal && !user.mode && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
//           <div className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-[#020617] to-[#1e1b4b]
//             border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.45)]">

//             <h2 className="text-2xl font-bold text-blue-300 text-center mb-2">
//               Choose how you want to use Skillwrap
//             </h2>

//             <p className="text-center text-gray-400 text-sm mb-6">
//               This helps personalize your dashboard. You can change it later.
//             </p>

//             {["learning", "teaching", "exchanging"].map((mode) => (
//               <label
//                 key={mode}
//                 className={`block p-4 mb-3 rounded-xl cursor-pointer border
//                   ${selectedMode === mode
//                     ? "border-blue-400 bg-blue-500/20"
//                     : "border-white/10 bg-white/5"
//                   }`}
//               >
//                 <input
//                   type="radio"
//                   name="mode"
//                   className="mr-3"
//                   checked={selectedMode === mode}
//                   onChange={() => setSelectedMode(mode as UserType["mode"])}
//                 />
//                 {mode}
//               </label>
//             ))}

//             <button
//               onClick={handleSaveMode}
//               disabled={!selectedMode || savingMode}
//               className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600"
//             >
//               {savingMode ? "Saving..." : "Continue"}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ================= ROADMAP MODAL ================= */}
//       {showRoadmapModal && (
//         <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm">
//           <div className="w-full max-w-md p-6 rounded-3xl bg-gradient-to-br from-[#020617] to-[#1e1b4b] border border-green-500/30 shadow-lg">
            
//             <h2 className="text-2xl font-bold text-green-400 text-center mb-2">
//               Set Your Roadmap
//             </h2>

//             <p className="text-center text-gray-400 text-sm mb-4">
//               Describe your learning/exchange goals. This helps the AI suggest matches.
//             </p>

//             <textarea
//               value={roadmapText}
//               onChange={(e) => setRoadmapText(e.target.value)}
//               placeholder="I want to learn React, improve design skills, etc..."
//               className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-4 focus:ring-green-500/40 mb-4 resize-none"
//               rows={5}
//             />

//             {roadmapMessage && (
//               <p className="text-center text-green-300 mb-2">{roadmapMessage}</p>
//             )}

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowRoadmapModal(false)}
//                 className="flex-1 py-2 rounded-xl border border-white/20 hover:bg-white/10"
//               >
//                 Cancel
//               </button>

//               {/* if user.advice exist show it but if not show the button to ask for advice u get abi.. so when they add advice i store in my db.. */}

//               <button
//                 onClick={async () => {
//                   if (!roadmapText.trim()) return alert("Please enter your roadmap");

//                   setSavingRoadmap(true);
//                   setRoadmapMessage("");

//                   try {
//                     const res = await fetch(`${API_URL}/generate-roadmap`, {
//                       method: "POST",
//                       headers: { "Content-Type": "application/json" },
//                       credentials: "include",
//                       body: JSON.stringify({ goal: roadmapText }),
//                     });

//                     const data = await res.json();

//                     if (!data.success) throw new Error(data.message || "Failed");

//                     setRoadmapMessage("✅ Roadmap saved successfully!");
//                     setRoadmapText(""); // clear textarea
//                     setTimeout(() => setShowRoadmapModal(false), 1200);
//                   } catch (err) {
//                     console.error(err);
//                     setRoadmapMessage("❌ Failed to save roadmap. Try again.");
//                   } finally {
//                     setSavingRoadmap(false);
//                   }
//                 }}
//                 disabled={savingRoadmap}
//                 className="flex-1 py-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 text-white font-semibold disabled:opacity-50"
//               >
//                 {savingRoadmap ? "Saving..." : "Submit"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }





























"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  Home,
  Layers,
  Inbox,
  CheckCircle,
  LogOut,
  Settings,
  User,
  MessageCircle,
  Bell,
  X,
} from "lucide-react";

import LearningDashboard from "./dashboards/LearningDashboard";
import TeachingDashboard from "./dashboards/TeachingDashboard";
import ExchangeDashboard from "./dashboards/ExchangeingDashboard";
import SidebarLink from "./components/SidebarLink";

const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";

/* ================= TYPES ================= */
interface RoadmapStep {
  step: number;
  skill: string;
  description: string;
}

interface UserType {
  id: number;
  username: string;
  fullname: string;
  email: string;
  img_url?: string;
  created_at: string;
  mode: "learning" | "teaching" | "exchanging" | null;
  advice?: RoadmapStep[];
}

interface Stats {
  createdSkills: number;
  sendRequests: number;
  receivedRequests: number;
  succesfullExchnage: number;
  canclledExchnaged: number;
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<Stats>({
    createdSkills: 0,
    sendRequests: 0,
    receivedRequests: 0,
    succesfullExchnage: 0,
    canclledExchnaged: 0,
  });

  const [unread, setUnread] = useState(0);

  const [showModeModal, setShowModeModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState<UserType["mode"]>(null);
  const [savingMode, setSavingMode] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false); // mobile sidebar toggle

  // ========= Roadmap states =========
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [roadmapText, setRoadmapText] = useState("");
  const [savingRoadmap, setSavingRoadmap] = useState(false);
  const [roadmapMessage, setRoadmapMessage] = useState("");
  const [aiMode, setAiMode] = useState<"ai" | "fallback">("ai");

  /* ================= FETCH USER ================= */
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          router.replace("/login");
          return;
        }

        const data = await res.json();
        const fetchedUser = data.user as UserType;

        // parse advice if stored as string
        let advice = fetchedUser.advice;
        if (typeof advice === "string") {
          try {
            advice = JSON.parse(advice);
          } catch {
            advice = undefined;
          }
        }

        setUser({ ...fetchedUser, advice });

        if (!fetchedUser.mode) {
          setShowModeModal(true);
        }
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router]);

  /* ================= KEEP MODAL IN SYNC ================= */
  useEffect(() => {
    if (user?.mode) setShowModeModal(false);
  }, [user]);

  /* ================= FETCH STATS ================= */
  useEffect(() => {
    if (!user) return;

    fetch(`${API_URL}/stats`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) =>
        setStats({
          createdSkills: data.createdSkill ?? 0,
          sendRequests: data.sendRequests ?? 0,
          receivedRequests: data.receivedRequests ?? 0,
          succesfullExchnage: data.succesfullExchnage ?? 0,
          canclledExchnaged: data.canclledExchnaged ?? 0,
        })
      )
      .catch(console.error);
  }, [user]);

  /* ================= NOTIFICATIONS ================= */
  useEffect(() => {
    fetch(`${API_URL}/notification/unread-count`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUnread(data.count);
      });
  }, []);

  /* ================= SAVE MODE ================= */
  async function handleSaveMode() {
    if (!selectedMode) return;

    setSavingMode(true);
    try {
      const res = await fetch(`${API_URL}/user/set-mode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ mode: selectedMode }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      setUser((prev) => (prev ? { ...prev, mode: data.mode } : prev));
      setShowModeModal(false);
    } catch {
      alert("Failed to save mode");
    } finally {
      setSavingMode(false);
    }
  }

  /* ================= LOGOUT ================= */
  async function handleLogout() {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.replace("/login");
  }

  /* ================= VIEW NOTIFICATIONS ================= */
  async function handleViewNotifications() {
    setUnread(0);
    router.push("/notifications-route");
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  console.log(user, 's')

  if (!user) return null;

  return (
    <main className="min-h-screen flex bg-gradient-to-br from-[#030712] via-[#0b1220] to-[#1e1b4b] text-white">

      {/* ================= MOBILE HAMBURGER ================= */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setShowSidebar(true)}
          className="p-2 rounded-md bg-white/10 text-white backdrop-blur-md hover:bg-white/20 transition"
        >
          <span className="sr-only">Open sidebar</span>
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white rounded-full"></span>
            <span className="block w-6 h-0.5 bg-white rounded-full"></span>
            <span className="block w-6 h-0.5 bg-white rounded-full"></span>
          </div>
        </button>
      </div>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/10 backdrop-blur-xl border-r border-white/20
          transform transition-transform duration-300 ease-in-out
          ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0 sm:static sm:flex sm:flex-col`}
      >
        {/* Close button for mobile */}
        <div className="sm:hidden flex justify-end p-4">
          <button
            onClick={() => setShowSidebar(false)}
            className="p-2 rounded-md text-white bg-black/40 hover:bg-black/60 transition"
          >
            <X />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/20">
 <Image
  src={user.img_url || "/default-avatar.png"}
  alt="avatar"
  width={36}
  height={36}
  unoptimized
  className="rounded-full"
/>

          <div>
            <p className="font-semibold">{user.fullname}</p>
            {user.mode && <span className="text-xs text-white/70">{user.mode}</span>}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2 text-sm flex-1">
          <SidebarLink href="/dashboard" icon={<Home />} label="Dashboard" />
          <SidebarLink href="/profile" icon={<User />} label="Profile" />
          <SidebarLink href="/chats" icon={<MessageCircle />} label="Chat" />
          <SidebarLink href="/my-skill" icon={<Layers />} label="My Skills" />
          <SidebarLink href="/request-recieved" icon={<Inbox />} label="Requests Received" />
          <SidebarLink href="/request-sent" icon={<CheckCircle />} label="Requests Sent" />

          <button
            onClick={handleViewNotifications}
            className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/20 w-full transition"
          >
            <Bell />
            Notifications
            {unread > 0 && (
              <span className="ml-auto bg-red-500 text-xs px-2 rounded-full">{unread}</span>
            )}
          </button>

          <SidebarLink href="/settings" icon={<Settings />} label="Settings" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut />
            Logout
          </button>
        </nav>
      </aside>

      {/* ================= MOBILE OVERLAY ================= */}
      {showSidebar && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm sm:hidden transition"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* ================= CONTENT ================= */}
      <section className="flex-1 p-8">
        <h1 className="text-3xl font-extrabold text-blue-300 mb-6">
          Welcome back, {user.fullname.split(" ")[0]} ✨
        </h1>

        {/* ===== Roadmap Button ===== */}
        <div className="mb-6">
          <button
            onClick={() => setShowRoadmapModal(true)}
            className="py-2 px-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 text-white font-semibold"
          >
            🚀 Set Your Roadmap
          </button>
        </div>

        {/* ===== SHOW SAVED ROADMAP ===== */}
        {user.advice && user.advice.length > 0 && (
          <div className="mb-8 bg-white/10 backdrop-blur-xl p-4 rounded-xl space-y-3">
            <div className="text-center text-xs">
              {aiMode === "fallback" ? (
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                  ⚡ Smart Offline Roadmap
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400">
                  🤖 AI Generated Roadmap
                </span>
              )}
            </div>

            {user.advice.map((step) => (
              <div
                key={step.step}
                className="p-3 rounded-xl bg-black/30 border border-white/10"
              >
                <p className="font-semibold text-green-300">
                  Step {step.step}: {step.skill}
                </p>
                <p className="text-white/80 text-sm mt-1">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {user.mode === "learning" && <LearningDashboard stats={stats} user={user} />}
        {user.mode === "teaching" && <TeachingDashboard stats={stats} user={user} />}
        {user.mode === "exchanging" && <ExchangeDashboard stats={stats} user={user} />}
      </section>

      {/* ================= MODE MODAL ================= */}
      {showModeModal && !user.mode && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-[#020617] to-[#1e1b4b]
            border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.45)]">

            <h2 className="text-2xl font-bold text-blue-300 text-center mb-2">
              Choose how you want to use Skillwrap
            </h2>

            <p className="text-center text-gray-400 text-sm mb-6">
              This helps personalize your dashboard. You can change it later.
            </p>

            {["learning", "teaching", "exchanging"].map((mode) => (
              <label
                key={mode}
                className={`block p-4 mb-3 rounded-xl cursor-pointer border
                  ${selectedMode === mode
                    ? "border-blue-400 bg-blue-500/20"
                    : "border-white/10 bg-white/5"
                  }`}
              >
                <input
                  type="radio"
                  name="mode"
                  className="mr-3"
                  checked={selectedMode === mode}
                  onChange={() => setSelectedMode(mode as UserType["mode"])}
                />
                {mode}
              </label>
            ))}

            <button
              onClick={handleSaveMode}
              disabled={!selectedMode || savingMode}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              {savingMode ? "Saving..." : "Continue"}
            </button>
          </div>
        </div>
      )}

      {/* ================= ROADMAP MODAL ================= */}
      {showRoadmapModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-gradient-to-br from-[#020617] to-[#1e1b4b] border border-green-500/30 shadow-lg">
            
            <h2 className="text-2xl font-bold text-green-400 text-center mb-2">
              Set Your Roadmap
            </h2>

            <p className="text-center text-gray-400 text-sm mb-4">
              Describe your learning/exchange goals. This helps the AI suggest matches.
            </p>

            <textarea
              value={roadmapText}
              onChange={(e) => setRoadmapText(e.target.value)}
              placeholder="I want to learn React, improve design skills, etc..."
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-4 focus:ring-green-500/40 mb-4 resize-none"
              rows={5}
            />

            {roadmapMessage && (
              <p className="text-center text-green-300 mb-2">{roadmapMessage}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowRoadmapModal(false)}
                className="flex-1 py-2 rounded-xl border border-white/20 hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (!roadmapText.trim()) return alert("Please enter your roadmap");

                  setSavingRoadmap(true);
                  setRoadmapMessage("");

                  try {
                    const res = await fetch(`${API_URL}/generate-roadmap`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      credentials: "include",
                      body: JSON.stringify({ goal: roadmapText }),
                    });

                    const data = await res.json();

                    if (!data.success) throw new Error(data.message || "Failed");

                    // ✅ Save advice to state
                    setUser((prev) =>
                      prev ? { ...prev, advice: data.roadmap } : prev
                    );
                    setAiMode(data.ai_mode || "ai");

                    setRoadmapMessage("✅ Roadmap saved successfully!");
                    setRoadmapText("");
                    setTimeout(() => setShowRoadmapModal(false), 1200);
                  } catch (err) {
                    console.error(err);
                    setRoadmapMessage("❌ Failed to save roadmap. Try again.");
                  } finally {
                    setSavingRoadmap(false);
                  }
                }}
                disabled={savingRoadmap}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90 text-white font-semibold disabled:opacity-50"
              >
                {savingRoadmap ? "Saving..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

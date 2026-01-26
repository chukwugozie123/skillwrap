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
// //   Bell,
// // } from "lucide-react";

// // import LearningDashboard from "./dashboards/LearningDashboard";
// // import TeachingDashboard from "./dashboards/TeachingDashboard";
// // import ExchangeDashboard from "./dashboards/ExchangeingDashboard";
// // import SidebarLink from "./components/SidebarLink";

// // const API_URL = "https://skillwrap-backend.onrender.com";

// // /* ================= TYPES ================= */
// // interface UserType {
// //   id: number;
// //   username: string;
// //   fullname: string;
// //   email: string;
// //   img_url?: string;
// //   created_at: string;
// //   mode: "learning" | "teaching" | "exchanging" | null;
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

// //   const [unread, setUnread] = useState(0);

// //   const [showModeModal, setShowModeModal] = useState(false);
// //   const [selectedMode, setSelectedMode] =
// //     useState<UserType["mode"]>(null);
// //   const [savingMode, setSavingMode] = useState(false);

// //   /* ================= FETCH USER ================= */
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
// //         const fetchedUser = data.user as UserType;

// //         setUser(fetchedUser);

// //         // ✅ show modal ONLY if mode is null
// //         if (!fetchedUser.mode) {
// //           setShowModeModal(true);
// //         }
// //       } catch {
// //         router.replace("/login");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     loadUser();
// //   }, [router]);

// //   /* ================= KEEP MODAL IN SYNC WITH MODE ================= */
// //   useEffect(() => {
// //     if (user?.mode) {
// //       setShowModeModal(false);
// //     }
// //   }, [user]);

// //   /* ================= FETCH STATS ================= */
// //   useEffect(() => {
// //     if (!user) return;

// //     fetch(`${API_URL}/stats`, {
// //       credentials: "include",
// //     })
// //       .then((res) => res.json())
// //       .then((data) =>
// //         setStats({
// //           createdSkills: data.createdSkill ?? 0,
// //           sendRequests: data.sendRequests ?? 0,
// //           receivedRequests: data.receivedRequests ?? 0,
// //           succesfullExchnage: data.succesfullExchnage ?? 0,
// //           canclledExchnaged: data.canclledExchnaged ?? 0,
// //         })
// //       )
// //       .catch(console.error);
// //   }, [user]);

// //   /* ================= NOTIFICATIONS ================= */
// //   useEffect(() => {
// //     fetch(`${API_URL}/notification/unread-count`, {
// //       credentials: "include",
// //     })
// //       .then((res) => res.json())
// //       .then((data) => {
// //         if (data.success) setUnread(data.count);
// //       });
// //   }, []);

// //   /* ================= SAVE MODE ================= */
// //   async function handleSaveMode() {
// //     if (!selectedMode) return;

// //     setSavingMode(true);
// //     try {
// //       const res = await fetch(`${API_URL}/user/set-mode`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //         body: JSON.stringify({ mode: selectedMode }),
// //       });

// //       if (!res.ok) throw new Error();

// //       const data = await res.json();

// //       // ✅ update only mode, keep user object intact
// //       setUser((prev) =>
// //         prev ? { ...prev, mode: data.mode } : prev
// //       );

// //       setShowModeModal(false);
// //     } catch {
// //       alert("Failed to save mode");
// //     } finally {
// //       setSavingMode(false);
// //     }
// //   }

// //   /* ================= LOGOUT ================= */
// //   async function handleLogout() {
// //     await fetch(`${API_URL}/auth/logout`, {
// //       method: "POST",
// //       credentials: "include",
// //     });
// //     router.replace("/login");
// //   }

// //   console.log(user, 'scheckinf user')

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
// //       <aside className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/10">
// //         <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
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
// //               <span className="text-xs text-blue-300">
// //                 {user.mode}
// //               </span>
// //             )}
// //           </div>
// //         </div>

// //         <nav className="p-4 space-y-2 text-sm">
// //           <SidebarLink href="/dashboard" icon={<Home />} label="Dashboard" />
// //           <SidebarLink href="/profile" icon={<User />} label="Profile" />
// //           <SidebarLink href="/chat" icon={<MessageCircle />} label="Chat" />
// //           <SidebarLink href="/my-skill" icon={<Layers />} label="My Skills" />
// //           <SidebarLink href="/request-recieved" icon={<Inbox />} label="Requests Received" />
// //           <SidebarLink href="/request-sent" icon={<CheckCircle />} label="Requests Sent" />
// // <SidebarLink href="/notification-route" icon={<Bell />} label="notification">
// //   {unread > 0 ? (
// //     <span className="ml-auto bg-red-500 text-xs px-2 rounded-full">
// //       {unread}
// //     </span>
// //   ) : null}
// // </SidebarLink>


// //           {/* <button className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/10">
// //             <Bell />
// //             Notifications
// //             {unread > 0 && (
// //               <span className="ml-auto bg-red-500 text-xs px-2 rounded-full">
// //                 {unread}
// //               </span>
// //             )}
// //           </button> */}

// //           <SidebarLink href="/settings" icon={<Settings />} label="Settings" />

// //           <button
// //             onClick={handleLogout}
// //             className="flex items-center gap-3 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10"
// //           >
// //             <LogOut />
// //             Logout
// //           </button>
// //         </nav>
// //       </aside>

      

// //       {/* ================= CONTENT ================= */}
// //       <section className="flex-1 p-8">
// //         <h1 className="text-3xl font-extrabold text-blue-300 mb-6">
// //           Welcome back, {user.fullname.split(" ")[0]} ✨
// //         </h1>

// //         {user.mode === "learning" && <LearningDashboard stats={stats} user={user} />}
// //         {user.mode === "teaching" && <TeachingDashboard stats={stats}  user={user} />}
// //         {user.mode === "exchanging" && <ExchangeDashboard stats={stats}  user={user}/>}
// //       </section>

// //       {/* ================= MODE MODAL ================= */}
// //       {showModeModal && !user.mode && (
// //         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
// //           <div className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-[#020617] to-[#1e1b4b]
// //             border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.45)]">

// //             <h2 className="text-2xl font-bold text-blue-300 text-center mb-2">
// //               Choose how you want to use Skillwrap
// //             </h2>

// //             <p className="text-center text-gray-400 text-sm mb-6">
// //               This helps personalize your dashboard. You can change it later.
// //             </p>

// // ()
// //             {["learning", "teaching", "exchanging"].map((mode) => (
// //               <label
// //                 key={mode}
// //                 className={`block p-4 mb-3 rounded-xl cursor-pointer border
// //                 ${selectedMode === mode
// //                   ? "border-blue-400 bg-blue-500/20"
// //                   : "border-white/10 bg-white/5"
// //                 }`}
// //               >
// //                 <input
// //                   type="radio"
// //                   name="mode"
// //                   className="mr-3"
// //                   checked={selectedMode === mode}
// //                   onChange={() =>
// //                     setSelectedMode(mode as UserType["mode"])
// //                   }
// //                 />
// //                 {mode}
// //               </label>
// //             ))}

// //             <button
// //               onClick={handleSaveMode}
// //               disabled={!selectedMode || savingMode}
// //               className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600"
// //             >
// //               {savingMode ? "Saving..." : "Continue"}
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </main>
// //   );
// // }








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
// //   Bell,
// // } from "lucide-react";

// // import LearningDashboard from "./dashboards/LearningDashboard";
// // import TeachingDashboard from "./dashboards/TeachingDashboard";
// // import ExchangeDashboard from "./dashboards/ExchangeingDashboard";
// // import SidebarLink from "./components/SidebarLink";

// // const API_URL = "https://skillwrap-backend.onrender.com";

// // /* ================= TYPES ================= */
// // interface UserType {
// //   id: number;
// //   username: string;
// //   fullname: string;
// //   email: string;
// //   img_url?: string;
// //   created_at: string;
// //   mode: "learning" | "teaching" | "exchanging" | null;
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

// //   const [unread, setUnread] = useState(0);

// //   const [showModeModal, setShowModeModal] = useState(false);
// //   const [selectedMode, setSelectedMode] =
// //     useState<UserType["mode"]>(null);
// //   const [savingMode, setSavingMode] = useState(false);

// //   /* ================= FETCH USER ================= */
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
// //         const fetchedUser = data.user as UserType;

// //         setUser(fetchedUser);

// //         if (!fetchedUser.mode) {
// //           setShowModeModal(true);
// //         }
// //       } catch {
// //         router.replace("/login");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     loadUser();
// //   }, [router]);

// //   /* ================= KEEP MODAL IN SYNC ================= */
// //   useEffect(() => {
// //     if (user?.mode) setShowModeModal(false);
// //   }, [user]);

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
// //       )
// //       .catch(console.error);
// //   }, [user]);

// //   /* ================= NOTIFICATIONS ================= */
// //   useEffect(() => {
// //     fetch(`${API_URL}/notification/unread-count`, {
// //       credentials: "include",
// //     })
// //       .then((res) => res.json())
// //       .then((data) => {
// //         if (data.success) setUnread(data.count);
// //       });
// //   }, []);

// //   /* ================= SAVE MODE ================= */
// //   async function handleSaveMode() {
// //     if (!selectedMode) return;

// //     setSavingMode(true);
// //     try {
// //       const res = await fetch(`${API_URL}/user/set-mode`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //         body: JSON.stringify({ mode: selectedMode }),
// //       });

// //       if (!res.ok) throw new Error();

// //       const data = await res.json();

// //       setUser((prev) =>
// //         prev ? { ...prev, mode: data.mode } : prev
// //       );

// //       setShowModeModal(false);
// //     } catch {
// //       alert("Failed to save mode");
// //     } finally {
// //       setSavingMode(false);
// //     }
// //   }

// //   /* ================= LOGOUT ================= */
// //   async function handleLogout() {
// //     await fetch(`${API_URL}/auth/logout`, {
// //       method: "POST",
// //       credentials: "include",
// //     });
// //     router.replace("/login");
// //   }

// //   if (loading) {
// //     return (
// //       <div className="h-screen flex items-center justify-center text-gray-400">
// //         Loading dashboard...
// //       </div>
// //     );
// //   }

// // console.log(user, 'checking user')

// //   if (!user) return null;

// //   return (
// //     <main className="min-h-screen flex bg-gradient-to-br from-[#030712] via-[#0b1220] to-[#1e1b4b] text-white">
// //       {/* ================= SIDEBAR ================= */}
// //       <aside className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/10">
// //         <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
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
// //               <span className="text-xs text-blue-300">{user.mode}</span>
// //             )}
// //           </div>
// //         </div>

// //         <nav className="p-4 space-y-2 text-sm">
// //           <SidebarLink href="/dashboard" icon={<Home />} label="Dashboard" />
// //           <SidebarLink href="/profile" icon={<User />} label="Profile" />
// //           <SidebarLink href="/chat" icon={<MessageCircle />} label="Chat" />
// //           <SidebarLink href="/my-skill" icon={<Layers />} label="My Skills" />
// //           <SidebarLink href="/request-recieved" icon={<Inbox />} label="Requests Received" />
// //           <SidebarLink href="/request-sent" icon={<CheckCircle />} label="Requests Sent" />

// //           <SidebarLink href="/notifications-route" icon={<Bell />} label="Notifications">
// //             {unread > 0 && (
// //               <span className="ml-auto bg-red-500 text-xs px-2 rounded-full">
// //                 {unread}
// //               </span>
// //             )}
// //           </SidebarLink>

// //           <SidebarLink href="/settings" icon={<Settings />} label="Settings" />

// //           <button
// //             onClick={handleLogout}
// //             className="flex items-center gap-3 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10"
// //           >
// //             <LogOut />
// //             Logout
// //           </button>
// //         </nav>
// //       </aside>

// //       {/* ================= CONTENT ================= */}
// //       <section className="flex-1 p-8">
// //         <h1 className="text-3xl font-extrabold text-blue-300 mb-6">
// //           Welcome back, {user.fullname.split(" ")[0]} ✨
// //         </h1>

// //         {user.mode === "learning" && <LearningDashboard stats={stats} user={user} />}
// //         {user.mode === "teaching" && <TeachingDashboard stats={stats} user={user} />}
// //         {user.mode === "exchanging" && <ExchangeDashboard stats={stats} user={user} />}
// //       </section>

// //       {/* ================= MODE MODAL ================= */}
// //       {showModeModal && !user.mode && (
// //         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
// //           <div className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-[#020617] to-[#1e1b4b]
// //             border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.45)]">

// //             <h2 className="text-2xl font-bold text-blue-300 text-center mb-2">
// //               Choose how you want to use Skillwrap
// //             </h2>

// //             <p className="text-center text-gray-400 text-sm mb-6">
// //               This helps personalize your dashboard. You can change it later.
// //             </p>

// //             {["learning", "teaching", "exchanging"].map((mode) => (
// //               <label
// //                 key={mode}
// //                 className={`block p-4 mb-3 rounded-xl cursor-pointer border
// //                   ${selectedMode === mode
// //                     ? "border-blue-400 bg-blue-500/20"
// //                     : "border-white/10 bg-white/5"
// //                   }`}
// //               >
// //                 <input
// //                   type="radio"
// //                   name="mode"
// //                   className="mr-3"
// //                   checked={selectedMode === mode}
// //                   onChange={() => setSelectedMode(mode as UserType["mode"])}
// //                 />
// //                 {mode}
// //               </label>
// //             ))}

// //             <button
// //               onClick={handleSaveMode}
// //               disabled={!selectedMode || savingMode}
// //               className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600"
// //             >
// //               {savingMode ? "Saving..." : "Continue"}
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </main>
// //   );
// // }











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
// //   Bell,
// //   X,
// // } from "lucide-react";

// // import LearningDashboard from "./dashboards/LearningDashboard";
// // import TeachingDashboard from "./dashboards/TeachingDashboard";
// // import ExchangeDashboard from "./dashboards/ExchangeingDashboard";
// // import SidebarLink from "./components/SidebarLink";

// // const API_URL = "https://skillwrap-backend.onrender.com";

// // /* ================= TYPES ================= */
// // interface UserType {
// //   id: number;
// //   username: string;
// //   fullname: string;
// //   email: string;
// //   img_url?: string;
// //   created_at: string;
// //   mode: "learning" | "teaching" | "exchanging" | null;
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

// //   const [unread, setUnread] = useState(0);

// //   const [showModeModal, setShowModeModal] = useState(false);
// //   const [selectedMode, setSelectedMode] = useState<UserType["mode"]>(null);
// //   const [savingMode, setSavingMode] = useState(false);

// //   const [showSidebar, setShowSidebar] = useState(false); // mobile sidebar toggle

// //   /* ================= FETCH USER ================= */
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
// //         const fetchedUser = data.user as UserType;

// //         setUser(fetchedUser);

// //         if (!fetchedUser.mode) {
// //           setShowModeModal(true);
// //         }
// //       } catch {
// //         router.replace("/login");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     loadUser();
// //   }, [router]);

// //   /* ================= KEEP MODAL IN SYNC ================= */
// //   useEffect(() => {
// //     if (user?.mode) setShowModeModal(false);
// //   }, [user]);

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
// //       )
// //       .catch(console.error);
// //   }, [user]);

// //   /* ================= NOTIFICATIONS ================= */
// //   useEffect(() => {
// //     fetch(`${API_URL}/notification/unread-count`, {
// //       credentials: "include",
// //     })
// //       .then((res) => res.json())
// //       .then((data) => {
// //         if (data.success) setUnread(data.count);
// //       });
// //   }, []);

// //   /* ================= SAVE MODE ================= */
// //   async function handleSaveMode() {
// //     if (!selectedMode) return;

// //     setSavingMode(true);
// //     try {
// //       const res = await fetch(`${API_URL}/user/set-mode`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //         body: JSON.stringify({ mode: selectedMode }),
// //       });

// //       if (!res.ok) throw new Error();

// //       const data = await res.json();

// //       setUser((prev) => (prev ? { ...prev, mode: data.mode } : prev));
// //       setShowModeModal(false);
// //     } catch {
// //       alert("Failed to save mode");
// //     } finally {
// //       setSavingMode(false);
// //     }
// //   }

// //   /* ================= LOGOUT ================= */
// //   async function handleLogout() {
// //     await fetch(`${API_URL}/auth/logout`, {
// //       method: "POST",
// //       credentials: "include",
// //     });
// //     router.replace("/login");
// //   }

// //   /* ================= VIEW NOTIFICATIONS ================= */
// //   async function handleViewNotifications() {
// //     // Optionally call backend to mark notifications as read
// //     setUnread(0);
// //     router.push("/notifications-route");
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
// //       {/* ================= MOBILE HAMBURGER ================= */}
// //       <div className="sm:hidden fixed top-4 left-4 z-50">
// //         <button
// //           onClick={() => setShowSidebar(true)}
// //           className="p-2 rounded-md bg-blue-600 text-white"
// //         >
// //           <span className="sr-only">Open sidebar</span>
// //           <div className="space-y-1">
// //             <span className="block w-6 h-0.5 bg-white"></span>
// //             <span className="block w-6 h-0.5 bg-white"></span>
// //             <span className="block w-6 h-0.5 bg-white"></span>
// //           </div>
// //         </button>
// //       </div>

// //       {/* ================= SIDEBAR ================= */}
// //       <aside
// //         className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/10 backdrop-blur-xl border-r border-white/10 transform
// //         transition-transform duration-300 ease-in-out
// //         ${showSidebar ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:static sm:flex`}
// //       >
// //         {/* Close button for mobile */}
// //         <div className="sm:hidden flex justify-end p-4">
// //           <button
// //             onClick={() => setShowSidebar(false)}
// //             className="p-2 rounded-md text-white bg-gray-800/50"
// //           >
// //             <X />
// //           </button>
// //         </div>

// //         <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
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
// //               <span className="text-xs text-blue-300">{user.mode}</span>
// //             )}
// //           </div>
// //         </div>

// //         <nav className="p-4 space-y-2 text-sm">
// //           <SidebarLink href="/dashboard" icon={<Home />} label="Dashboard" />
// //           <SidebarLink href="/profile" icon={<User />} label="Profile" />
// //           <SidebarLink href="/chat" icon={<MessageCircle />} label="Chat" />
// //           <SidebarLink href="/my-skill" icon={<Layers />} label="My Skills" />
// //           <SidebarLink href="/request-recieved" icon={<Inbox />} label="Requests Received" />
// //           <SidebarLink href="/request-sent" icon={<CheckCircle />} label="Requests Sent" />

// //           <button
// //             onClick={handleViewNotifications}
// //             className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/10 w-full"
// //           >
// //             <Bell />
// //             Notifications
// //             {unread > 0 && (
// //               <span className="ml-auto bg-red-500 text-xs px-2 rounded-full">
// //                 {unread}
// //               </span>
// //             )}
// //           </button>

// //           <SidebarLink href="/settings" icon={<Settings />} label="Settings" />

// //           <button
// //             onClick={handleLogout}
// //             className="flex items-center gap-3 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10"
// //           >
// //             <LogOut />
// //             Logout
// //           </button>
// //         </nav>
// //       </aside>

// //       {/* ================= MOBILE OVERLAY ================= */}
// //       {showSidebar && (
// //         <div
// //           className="fixed inset-0 z-30 bg-black/50 sm:hidden"
// //           onClick={() => setShowSidebar(false)}
// //         ></div>
// //       )}

// //       {/* ================= CONTENT ================= */}
// //       <section className="flex-1 p-8">
// //         <h1 className="text-3xl font-extrabold text-blue-300 mb-6">
// //           Welcome back, {user.fullname.split(" ")[0]} ✨
// //         </h1>

// //         {user.mode === "learning" && <LearningDashboard stats={stats} user={user} />}
// //         {user.mode === "teaching" && <TeachingDashboard stats={stats} user={user} />}
// //         {user.mode === "exchanging" && <ExchangeDashboard stats={stats} user={user} />}
// //       </section>

// //       {/* ================= MODE MODAL ================= */}
// //       {showModeModal && !user.mode && (
// //         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
// //           <div className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-[#020617] to-[#1e1b4b]
// //             border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.45)]">

// //             <h2 className="text-2xl font-bold text-blue-300 text-center mb-2">
// //               Choose how you want to use Skillwrap
// //             </h2>

// //             <p className="text-center text-gray-400 text-sm mb-6">
// //               This helps personalize your dashboard. You can change it later.
// //             </p>

// //             {["learning", "teaching", "exchanging"].map((mode) => (
// //               <label
// //                 key={mode}
// //                 className={`block p-4 mb-3 rounded-xl cursor-pointer border
// //                   ${selectedMode === mode
// //                     ? "border-blue-400 bg-blue-500/20"
// //                     : "border-white/10 bg-white/5"
// //                   }`}
// //               >
// //                 <input
// //                   type="radio"
// //                   name="mode"
// //                   className="mr-3"
// //                   checked={selectedMode === mode}
// //                   onChange={() => setSelectedMode(mode as UserType["mode"])}
// //                 />
// //                 {mode}
// //               </label>
// //             ))}

// //             <button
// //               onClick={handleSaveMode}
// //               disabled={!selectedMode || savingMode}
// //               className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600"
// //             >
// //               {savingMode ? "Saving..." : "Continue"}
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </main>
// //   );
// // }
























// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { toast, ToastContainer, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { CheckCircle, XCircle, Eye, X, Sparkles, Clock } from "lucide-react";

// type ExchangeRequest = {
//   exchange_id: string;
//   from_user_id: number;
//   from_username: string;
//   from_fullname: string;
//   skill_offered_title?: string;
//   requested_skill_title: string;
//   note?: string;
//   status: "pending" | "accepted" | "declined" | "completed" | "cancelled";
//   mode: "learning" | "teaching" | "exchanging";
//   created_at: string;
//   roomCode?: string;
// };

// const API_URL = "https://skillwrap-backend.onrender.com";

// interface Props {
//   userMode: "learning" | "teaching" | "exchanging";
// }

// export default function ReceivedRequestsPage({ userMode }: Props) {
//   const [requests, setRequests] = useState<ExchangeRequest[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [detailsPopup, setDetailsPopup] = useState(false);
//   const [selectedExchange, setSelectedExchange] = useState<ExchangeRequest | null>(null);

//   useEffect(() => {
//     const loadRequests = async () => {
//       try {
//         const res = await fetch(`${API_URL}/exchange/recieved`, {
//           method: "POST",
//           credentials: "include",
//         });
//         const data = await res.json();
//         setRequests(data.requests || []);
//       } catch {
//         toast.error("Failed to load requests");
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadRequests();
//   }, []);

//   const statusBadge = (status: string) => {
//     const map: Record<string, string> = {
//       pending: "bg-amber-500/15 text-amber-300",
//       accepted: "bg-emerald-500/15 text-emerald-300",
//       declined: "bg-red-500/15 text-red-300",
//       completed: "bg-cyan-500/15 text-cyan-300",
//       cancelled: "bg-gray-500/15 text-gray-300",
//     };
//     return map[status] || "";
//   };

//   const handleAccept = async (req: ExchangeRequest) => {
//     const newRoom = Math.floor(100000 + Math.random() * 900000).toString();
//     try {
//       await fetch(`${API_URL}/update-exchange-status`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           exchange_id: req.exchange_id,
//           status: "accepted",
//           roomCode: newRoom,
//         }),
//       });

//       await fetch(`${API_URL}/send-notification`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           exchange_id: req.exchange_id,
//           receiverId: req.from_user_id,
//           message: "Your skill exchange request was accepted 🎉",
//           metadata: req.exchange_id,
//           roomCode: newRoom,
//         }),
//       });

//       setRequests((prev) =>
//         prev.map((r) =>
//           r.exchange_id === req.exchange_id
//             ? { ...r, status: "accepted", roomCode: newRoom }
//             : r
//         )
//       );

//       toast.success("Request accepted successfully", { theme: "dark", transition: Slide });
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error");
//     }
//   };

//   const handleDecline = async (req: ExchangeRequest) => {
//     try {
//       await fetch(`${API_URL}/update-exchange-status`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           exchange_id: req.exchange_id,
//           status: "declined",
//         }),
//       });

//       await fetch(`${API_URL}/send-notification`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           exchange_id: req.exchange_id,
//           receiverId: req.from_user_id,
//           message: "Your skill exchange request was declined 🎉",
//           metadata: req.exchange_id,
//         }),
//       });

//       setRequests((prev) =>
//         prev.map((r) =>
//           r.exchange_id === req.exchange_id ? { ...r, status: "declined" } : r
//         )
//       );

//       toast.error("Request declined", { theme: "dark", transition: Slide });
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error");
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1228] to-[#1e1b4b] px-6 py-14 text-white">
//       <ToastContainer newestOnTop />
//       <h1 className="text-center text-4xl font-extrabold mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
//         Received Requests 💌
//       </h1>

//       {loading ? (
//         <p className="text-center text-gray-400">Loading…</p>
//       ) : requests.length === 0 ? (
//         <p className="text-center text-gray-400">No requests yet</p>
//       ) : (
//         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
//           {requests.map((req) => (
//             <div
//               key={req.exchange_id}
//               className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-xl hover:scale-[1.015] transition-all"
//             >
//               <div className="absolute top-4 right-4">
//                 <span className={`px-3 py-1 text-xs rounded-full ${statusBadge(req.status)}`}>
//                   {req.status}
//                 </span>
//               </div>

//               <h2 className="text-xl font-semibold text-blue-300">{req.from_fullname}</h2>

//               <div className="mt-4 space-y-1 text-sm text-gray-200">
//                 {userMode !== "learning" && req.skill_offered_title && (
//                   <p>
//                     <span className="text-gray-400">Offers:</span> {req.skill_offered_title}
//                   </p>
//                 )}
//                 <p>
//                   <span className="text-gray-400">Wants:</span> {req.requested_skill_title}
//                 </p>
//                 <p className="flex items-center gap-1 text-gray-400">
//                   <Clock size={14} />
//                   {new Date(req.created_at).toLocaleDateString()}
//                 </p>
//               </div>

//               <div className="mt-6 flex justify-between">
//                 {req.status === "pending" ? (
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => handleAccept(req)}
//                       className="px-4 py-2 bg-emerald-600 rounded-xl flex gap-2 items-center hover:bg-emerald-500 transition"
//                     >
//                       <CheckCircle size={16} />
//                       Accept
//                     </button>
//                     <button
//                       onClick={() => handleDecline(req)}
//                       className="px-4 py-2 bg-red-600 rounded-xl flex gap-2 items-center hover:bg-red-500 transition"
//                     >
//                       <XCircle size={16} />
//                       Decline
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => {
//                       setSelectedExchange(req);
//                       setDetailsPopup(true);
//                     }}
//                     className="px-4 py-2 bg-blue-600/30 rounded-xl flex gap-2 items-center hover:bg-blue-600/40 transition"
//                   >
//                     <Eye size={16} />
//                     View Details
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* DETAILS MODAL */}
//       {detailsPopup && selectedExchange && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="relative bg-gradient-to-br from-[#0b1228] to-[#020617] border border-white/20 rounded-3xl p-8 w-full max-w-lg shadow-2xl">
//             <button
//               onClick={() => setDetailsPopup(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-white"
//             >
//               <X />
//             </button>

//             <h2 className="text-2xl font-bold text-blue-300 flex items-center gap-2">
//               <Sparkles size={20} />
//               Exchange Details
//             </h2>

//             <div className="mt-6 space-y-3 text-gray-200">
//               <p>
//                 <span className="text-gray-400">From:</span> {selectedExchange.from_fullname}
//               </p>
//               {userMode !== "learning" && selectedExchange.skill_offered_title && (
//                 <p>
//                   <span className="text-gray-400">Offered:</span> {selectedExchange.skill_offered_title}
//                 </p>
//               )}
//               <p>
//                 <span className="text-gray-400">Requested:</span> {selectedExchange.requested_skill_title}
//               </p>
//               {selectedExchange.note && (
//                 <p className="bg-white/5 p-3 rounded-xl border border-white/10">{selectedExchange.note}</p>
//               )}
//               <p>
//                 <span className="text-gray-400">Mode:</span> {selectedExchange.mode}
//               </p>
//               <p>
//                 <span className="text-gray-400">Requested At:</span>{" "}
//                 {new Date(selectedExchange.created_at).toLocaleString()}
//               </p>
//             </div>

//             {selectedExchange.status === "accepted" && selectedExchange.roomCode && (
//               <Link
//                 href={`/chat/${selectedExchange.exchange_id}`}
//                 className="block mt-8 text-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
//               >
//                 Enter Chat 💬
//               </Link>
//             )}
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

/* ================= TYPES ================= */
interface UserType {
  id: number;
  username: string;
  fullname: string;
  email: string;
  img_url?: string;
  created_at: string;
  mode: "learning" | "teaching" | "exchanging" | null;
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

        setUser(fetchedUser);

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
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 transform
          transition-transform duration-300 ease-in-out
          ${showSidebar ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:static sm:flex`}
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
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">{user.fullname}</p>
            {user.mode && <span className="text-xs text-white/70">{user.mode}</span>}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2 text-sm">
          <SidebarLink href="/dashboard" icon={<Home />} label="Dashboard" />
          <SidebarLink href="/profile" icon={<User />} label="Profile" />
          <SidebarLink href="/chat" icon={<MessageCircle />} label="Chat" />
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
              <span className="ml-auto bg-red-500 text-xs px-2 rounded-full">
                {unread}
              </span>
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
    </main>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";

// import {
//   Home,
//   Layers,
//   Inbox,
//   CheckCircle,
//   LogOut,
//   Settings,
//   X,
//   User,
//   MessageCircle,
//   Bell,
// } from "lucide-react";

// import LearningDashboard from "./dashboards/LearningDashboard";
// import TeachingDashboard from "./dashboards/TeachingDashboard";
// import ExchangeDashboard from "./dashboards/ExchangeingDashboard";
// import SidebarLink from "./components/SidebarLink";

// const API_URL = "https://skillwrap-backend.onrender.com";

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
//   const [selectedMode, setSelectedMode] =
//     useState<UserType["mode"]>(null);
//   const [savingMode, setSavingMode] = useState(false);

//   /* ================= FETCH USER (FIXES undefined ISSUE) ================= */
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

//   /* ================= FETCH STATS ================= */
//   useEffect(() => {
//     if (!user) return;

//     fetch(`${API_URL}/stats`, {
//       credentials: "include",
//     })
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

//       setUser((prev) =>
//         prev ? { ...prev, mode: selectedMode } : prev
//       );
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
//       {/* ================= SIDEBAR ================= */}
//       <aside className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/10">
//         <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
//           <Image
//             src={user.img_url || "/default-avatar.png"}
//             alt="avatar"
//             width={36}
//             height={36}
//             className="rounded-full"
//           />
//           <div>
//             <p className="font-semibold">{user.fullname}</p>
//             {user.mode && (
//               <span className="text-xs text-blue-300">{user.mode}</span>
//             )}
//           </div>
//         </div>

//         <nav className="p-4 space-y-2 text-sm">
//           <SidebarLink href="/dashboard" icon={<Home />} label="Dashboard" />
//           <SidebarLink href="/profile" icon={<User />} label="Profile" />
//           <SidebarLink href="/chat" icon={<MessageCircle />} label="Chat" />
//           <SidebarLink href="/my-skill" icon={<Layers />} label="My Skills" />
//           <SidebarLink href="/request-recieved" icon={<Inbox />} label="Requests Received" />
//           <SidebarLink href="/request-sent" icon={<CheckCircle />} label="Requests Sent" />

//           <button className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/10">
//             <Bell />
//             Notifications
//             {unread > 0 && (
//               <span className="ml-auto bg-red-500 text-xs px-2 rounded-full">
//                 {unread}
//               </span>
//             )}
//           </button>

//           <SidebarLink href="/settings" icon={<Settings />} label="Settings" />

//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10"
//           >
//             <LogOut />
//             Logout
//           </button>
//         </nav>
//       </aside>

//       {/* ================= CONTENT ================= */}
//       <section className="flex-1 p-8">
//         <h1 className="text-3xl font-extrabold text-blue-300 mb-6">
//           Welcome back, {user.fullname.split(" ")[0]} ✨
//         </h1>

//         {/* ================= MODE DASHBOARD ================= */}
//         {user.mode === "learning" && (
//           <LearningDashboard stats={stats} />
//         )}

//         {user.mode === "teaching" && (
//           <TeachingDashboard stats={stats} />
//         )}

//         {user.mode === "exchanging" && (
//           <ExchangeDashboard stats={stats} />
//         )}
//       </section>

//       {/* ================= MODE MODAL ================= */}
//       {showModeModal && (
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
//                 ${selectedMode === mode
//                     ? "border-blue-400 bg-blue-500/20"
//                     : "border-white/10 bg-white/5"
//                   }`}
//               >
//                 <input
//                   type="radio"
//                   name="mode"
//                   className="mr-3"
//                   checked={selectedMode === mode}
//                   onChange={() => setSelectedMode(mode as any)}
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
  const [selectedMode, setSelectedMode] =
    useState<UserType["mode"]>(null);
  const [savingMode, setSavingMode] = useState(false);

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

        // ✅ modal ONLY depends on backend value
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

  /* ================= FETCH STATS ================= */
  useEffect(() => {
    if (!user) return;

    fetch(`${API_URL}/stats`, {
      credentials: "include",
    })
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

      // ✅ trust backend response
      setUser((prev) =>
        prev ? { ...prev, mode: data.mode } : prev
      );

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
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/10">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
          <Image
            src={user.img_url || "/default-avatar.png"}
            alt="avatar"
            width={36}
            height={36}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">{user.fullname}</p>
            {user.mode && (
              <span className="text-xs text-blue-300">
                {user.mode}
              </span>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-2 text-sm">
          <SidebarLink href="/dashboard" icon={<Home />} label="Dashboard" />
          <SidebarLink href="/profile" icon={<User />} label="Profile" />
          <SidebarLink href="/chat" icon={<MessageCircle />} label="Chat" />
          <SidebarLink href="/my-skill" icon={<Layers />} label="My Skills" />
          <SidebarLink href="/request-recieved" icon={<Inbox />} label="Requests Received" />
          <SidebarLink href="/request-sent" icon={<CheckCircle />} label="Requests Sent" />

          <button className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/10">
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
            className="flex items-center gap-3 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10"
          >
            <LogOut />
            Logout
          </button>
        </nav>
      </aside>

      {/* ================= CONTENT ================= */}
      <section className="flex-1 p-8">
        <h1 className="text-3xl font-extrabold text-blue-300 mb-6">
          Welcome back, {user.fullname.split(" ")[0]} ✨
        </h1>

        {user.mode === "learning" && <LearningDashboard stats={stats} />}
        {user.mode === "teaching" && <TeachingDashboard stats={stats} />}
        {user.mode === "exchanging" && <ExchangeDashboard stats={stats} />}
      </section>

      {/* ================= MODE MODAL ================= */}
      {showModeModal && (
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
                  onChange={() =>
                    setSelectedMode(mode as UserType["mode"])
                  }
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

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Home,
  Layers,
  Inbox,
  CheckCircle,
  LogOut,
  Settings,
  Menu,
  X,
  Mail,
  Calendar,
  User,
  MessageCircle,
  Bell,
  Sparkles,
  Send,
  Trophy,
  XCircle,
} from "lucide-react";

const API_URL = "https://skillwrap-backend.onrender.com";

/* ================= TYPES ================= */
interface User {
  id: number;
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
  succesfullExchnage: number;
  canclledExchnaged: number;
}

/* ================= FETCH PROFILE ================= */
async function fetchUserProfile(): Promise<User | null> {
  try {
    const res = await fetch(`${API_URL}/auth/profile`, {
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user ?? null;
  } catch {
    return null;
  }
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  const [stats, setStats] = useState<Stats>({
    createdSkills: 0,
    sendRequests: 0,
    receivedRequests: 0,
    succesfullExchnage: 0,
    canclledExchnaged: 0,
  });

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    fetchUserProfile().then((data) => {
      if (!data) {
        router.replace("/login");
        return;
      }
      setUser(data);
      setLoading(false);
    });
  }, [router]);

  /* ================= FETCH STATS ================= */
  useEffect(() => {
    if (!user) return;

    fetch(`${API_URL}/stats`, {
      credentials: "include",
      cache: "no-store",
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

  /* ================= FETCH UNREAD NOTIFICATIONS ================= */
  useEffect(() => {
    fetch(`${API_URL}/notification/unread-count`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUnread(data.count);
      })
      .catch(console.error);
  }, []);

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

  return (
    <main className="min-h-screen flex bg-gradient-to-br from-[#030712] via-[#0b1220] to-[#1e1b4b] text-white">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/10 backdrop-blur-xl border-r border-white/10
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image
              src={user?.img_url || "/default-avatar.png"}
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="font-semibold truncate">{user?.fullname}</span>
          </div>
          <button className="sm:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-2 text-sm">
          <SidebarLink icon={<Home />} label="Dashboard" href="/dashboard" />
          <SidebarLink icon={<User />} label="Profile" href="/profile" />
          <SidebarLink icon={<MessageCircle />} label="Chat" href="/chat" />
          <SidebarLink icon={<Layers />} label="My Skills" href="/my-skill" />
          <SidebarLink icon={<Inbox />} label="Requests Received" href="/request-recieved" />
          <SidebarLink icon={<CheckCircle />} label="Requests Sent" href="/request-sent" />

          <button className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/10">
            <div className="relative">
              <Bell />
              {unread > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1.5 py-0.5 rounded-full">
                  {unread}
                </span>
              )}
            </div>
            Notifications
          </button>

          <SidebarLink icon={<Settings />} label="Settings" href="/settings" />

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
      <section className="flex-1 sm:ml-64 p-6 md:p-10">
        <button
          onClick={() => setSidebarOpen(true)}
          className="sm:hidden mb-4 p-2 rounded-lg bg-white/10"
        >
          <Menu />
        </button>

        {/* Welcome */}
        <h1 className="text-3xl font-extrabold text-blue-300 mb-2">
          Welcome back, {user?.fullname.split(" ")[0]} ✨
        </h1>
        <p className="text-gray-400 mb-8">
          Manage your skills, requests and collaborations.
        </p>

        {/* Profile Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-10 backdrop-blur-xl flex flex-col md:flex-row gap-6 items-center">
          <Image
            src={user?.img_url || "/default-avatar.png"}
            alt="profile"
            width={96}
            height={96}
            className="rounded-full border-2 border-blue-400"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-blue-300">{user?.fullname}</h2>
            <p className="text-gray-400">@{user?.username}</p>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Mail size={14} /> {user?.email}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} /> Joined{" "}
                {new Date(user!.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <Link
            href="/create-skill"
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition shadow-lg"
          >
            + Create Skill
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatCard title="Requests Received" value={stats.receivedRequests} icon={<Inbox />} />
          <StatCard title="Requests Sent" value={stats.sendRequests} icon={<Send />} />
          <StatCard title="Skills Created" value={stats.createdSkills} icon={<Layers />} />
          <StatCard title="Successful Exchanges" value={stats.succesfullExchnage} icon={<Trophy />} />
          <StatCard title="Cancelled Exchanges" value={stats.canclledExchnaged} icon={<XCircle />} />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard icon={<Sparkles />} title="Showcase Skills" desc="Create and manage your skills." href="/my-skill" />
          <FeatureCard icon={<Inbox />} title="Manage Requests" desc="Accept or decline requests." href="/request-recieved" />
          <FeatureCard icon={<CheckCircle />} title="Track Sent Requests" desc="Follow up your sent requests." href="/request-sent" />
        </div>
      </section>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function SidebarLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/10">
      <span className="text-blue-300">{icon}</span>
      {label}
    </Link>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="p-6 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
    </motion.div>
  );
}

function FeatureCard({
  title,
  desc,
  icon,
  href,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl">
      <div className="p-3 bg-white/20 rounded-full w-fit mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/80 text-sm mb-6">{desc}</p>
      <Link href={href} className="px-4 py-2 bg-black/30 rounded-lg">
        Explore →
      </Link>
    </motion.div>
  );
}






// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import {
//   Home,
//   Layers,
//   Inbox,
//   CheckCircle,
//   LogOut,
//   Settings,
//   Menu,
//   X,
//   Mail,
//   Calendar,
//   User,
//   MessageCircle,
//   Bell,
//   Sparkles,
// } from "lucide-react";

// const API_URL = "https://skillwrap-backend.onrender.com";

// /* ================= TYPES ================= */
// interface User {
//   username: string;
//   fullname: string;
//   email: string;
//   img_url?: string;
//   created_at: string;
// }

// interface Stats {
//   createdSkills: number;
//   sendRequests: number;
//   receivedRequests: number;
//   succesfullExchnage: number;
//    canclledExchnaged: number;
// }

// /* ================= FETCH PROFILE ================= */
// async function fetchUserProfile(): Promise<User | null> {
//   try {
//     const res = await fetch(`${API_URL}/auth/profile`, {
//       credentials: "include",
//       cache: "no-store",
//     });
//     if (!res.ok) return null;
//     const data = await res.json();
//     return data.user ?? null;
//   } catch {
//     return null;
//   }
// }

// export default function DashboardPage() {
//   const router = useRouter();

//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [stats, setStats] = useState<Stats>({
//     createdSkills: 0,
//     sendRequests: 0,
//     receivedRequests: 0,
//     succesfullExchnage: 0,
//      canclledExchnaged: 0,
//   });
//   const [unread, setUnread] = useState(0);

//   /* ================= AUTH GUARD ================= */
//   useEffect(() => {
//     fetchUserProfile().then((data) => {
//       if (!data) {
//         router.replace("/login");
//         return;
//       }
//       setUser(data);
//       setLoading(false);
//     });
//   }, [router]);

//   /* ================= FETCH STATS ================= */
//   useEffect(() => {
//     if (!user) return;

//     fetch(`${API_URL}/stats`, {
//       credentials: "include",
//       cache: "no-store",
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

//   /* ================= FETCH UNREAD NOTIFICATIONS ================= */
//   useEffect(() => {
//     fetch(`${API_URL}/notification/unread-count`, {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) setUnread(data.count);
//       })
//       .catch(console.error);
//   }, []);

//   console.log(stats)

//   /* ================= MARK NOTIFICATIONS READ ================= */
//   async function markNotificationsRead() {
//     try {
//       await fetch(`${API_URL}/notification/mark-all-read`, {
//         method: "PUT",
//         credentials: "include",
//       });
//       setUnread(0);
//       router.push("/notifications-route");
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   /* ================= LOGOUT ================= */
//   async function handleLogout() {
//     try {
//       const res = await fetch(`${API_URL}/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//       });

//       if (res.ok) {
//         router.replace("/login");
//       }
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   }

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center text-gray-400">
//         Loading dashboard...
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen flex bg-gradient-to-br from-[#030712] via-[#0b1220] to-[#1e1b4b] text-white overflow-hidden">
//       {/* ================= SIDEBAR ================= */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/10 backdrop-blur-xl border-r border-white/10
//         transform transition-transform duration-300
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
//           <div className="flex items-center gap-3">
//             <Image
//               src={
//                 user?.img_url
//                   ? `${user.img_url}`
//                   : "/default-avatar.png"
//               }
//               alt="avatar"
//               width={36}
//               height={36}
//               className="rounded-full border border-white/20"
//             />
//             <span className="font-semibold truncate">{user?.fullname}</span>
//           </div>
//           <button className="sm:hidden" onClick={() => setSidebarOpen(false)}>
//             <X />
//           </button>
//         </div>

//         {/* Nav */}
//         <nav className="p-4 space-y-2 text-sm">
//           <SidebarLink icon={<Home />} label="Dashboard" href="/dashboard" />
//           <SidebarLink icon={<User />} label="Profile" href="/profile" />
//           <SidebarLink icon={<MessageCircle />} label="Chat" href="/chat" />
//           <SidebarLink icon={<Layers />} label="My Skills" href="/my-skill" />
//           <SidebarLink
//             icon={<Inbox />}
//             label="Requests Received"
//             href="/request-recieved"
//           />
//           <SidebarLink
//             icon={<CheckCircle />}
//             label="Requests Sent"
//             href="/request-sent"
//           />

//           <button
//             onClick={markNotificationsRead}
//             className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/10 transition w-full text-left"
//           >
//             <div className="relative">
//               <Bell className="text-blue-300" />
//               {unread > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-1.5 py-0.5 rounded-full">
//                   {unread}
//                 </span>
//               )}
//             </div>
//             <span>Notifications</span>
//           </button>

//           <SidebarLink icon={<Settings />} label="Settings" href="/settings" />

//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition"
//           >
//             <LogOut />
//             Logout
//           </button>
//         </nav>
//       </aside>

//       {/* ================= CONTENT ================= */}
//       <section className="flex-1 sm:ml-64 p-6 md:p-10 overflow-y-auto relative">
//         {/* 🔙 GO BACK BUTTON (FIXED & STICKY) */}
//         {/* <div className="sticky top-4 z-40 mb-6">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 px-4 py-2 rounded-xl 
//             bg-white/10 border border-white/20 backdrop-blur-md
//             text-sm font-medium hover:bg-white/20 hover:scale-105 
//             transition-all duration-300"
//           >
//             ← Go Back
//           </button>
//         </div> */}

//         {/* Mobile menu */}
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="sm:hidden mb-4 p-2 rounded-lg bg-white/10 border border-white/10"
//         >
//           <Menu />
//         </button>

//         {/* Welcome */}
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-3xl font-extrabold text-blue-300 mb-2"
//         >
//           Welcome back, {user?.fullname.split(" ")[0]} ✨
//         </motion.h1>

//         <p className="text-gray-400 mb-8">
//           Manage your skills, requests, and collaborations in one place.
//         </p>

//         {/* Profile Card */}
//         <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-10 backdrop-blur-xl flex flex-col md:flex-row gap-6 items-center">
//           <Image
//             src={
//               user?.img_url
//                 ? `${API_URL}/uploads/${user.img_url}`
//                 : "/default-avatar.png"
//             }
//             alt="profile"
//             width={96}
//             height={96}
//             className="rounded-full border-2 border-blue-400"
//           />
//           <div className="flex-1 text-center md:text-left">
//             <h2 className="text-2xl font-bold text-blue-300">
//               {user?.fullname}
//             </h2>
//             <p className="text-gray-400">@{user?.username}</p>
//             <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
//               <span className="flex items-center gap-1">
//                 <Mail size={14} /> {user?.email}
//               </span>
//               <span className="flex items-center gap-1">
//                 <Calendar size={14} /> Joined{" "}
//                 {new Date(user!.created_at).toLocaleDateString()}
//               </span>
//             </div>
//           </div>
//           <Link
//             href="/create-skill"
//             className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition shadow-lg"
//           >
//             + Create Skill
//           </Link>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
//           <StatCard
//             title="Requests Received"
//             value={stats.receivedRequests}
//             color="from-blue-500 to-cyan-500"
//           />
//           <StatCard
//             title="Requests Sent"
//             value={stats.sendRequests}
//             color="from-green-500 to-emerald-500"
//           />
//           <StatCard
//             title="Skills Created"
//             value={stats.createdSkills}
//             color="from-purple-500 to-pink-500"
//           />
//           <StatCard
//             title="Sucessfull exchange"
//             value={stats.succesfullExchnage}
//             color="from-blue-500 to-pink-100"
//           />
//           <StatCard
//             title="canclled exchange"
//             value={stats.canclledExchnaged}
//             color="from-blue-500 to-pink-500"
//           />
     
//         </div>

//         {/* Features */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <FeatureCard
//             icon={<Sparkles />}
//             title="Showcase Skills"
//             desc="Create skills and get discovered."
//             href="/my-skill"
//             color="from-blue-600 to-indigo-600"
//           />
//           <FeatureCard
//             icon={<Inbox />}
//             title="Manage Requests Recieved"
//             desc="Accept or decline collaborations."
//             href="/request-recieved"
//             color="from-cyan-600 to-teal-600"
//           />
//           <FeatureCard
//             icon={<CheckCircle />}
//             title="Request Sent"
//             desc="Check request that you have sent."
//             href="/request-sent"
//             color="from-purple-600 to-pink-600"
//           />
//         </div>
//       </section>
//     </main>
//   );
// }

// /* ================= COMPONENTS ================= */

// function SidebarLink({
//   href,
//   icon,
//   label,
// }: {
//   href: string;
//   icon: React.ReactNode;
//   label: string;
// }) {
//   return (
//     <Link
//       href={href}
//       className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/10 transition"
//     >
//       <span className="text-blue-300">{icon}</span>
//       {label}
//     </Link>
//   );
// }

// function StatCard({
//   title,
//   value,
//   color,
// }: {
//   title: string;
//   value: number;
//   color: string;
// }) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       className="p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl flex gap-4"
//     >
//       <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color}`} />
//       <div>
//         <p className="text-sm text-gray-400">{title}</p>
//         <h3 className="text-2xl font-bold">{value}</h3>
//       </div>
//     </motion.div>
//   );
// }

// function FeatureCard({
//   title,
//   desc,
//   icon,
//   color,
//   href,
// }: {
//   title: string;
//   desc: string;
//   icon: React.ReactNode;
//   color: string;
//   href: string;
// }) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.05, y: -5 }}
//       className={`p-8 rounded-3xl bg-gradient-to-br ${color} shadow-xl`}
//     >
//       <div className="p-3 bg-white/20 rounded-full w-fit mb-4">
//         {icon}
//       </div>
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <p className="text-white/80 text-sm mb-6">{desc}</p>
//       <Link href={href} className="px-4 py-2 bg-black/30 rounded-lg">
//         Explore →
//       </Link>
//     </motion.div>
//   );
// }

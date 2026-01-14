// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import {
//   Home,
//   User,
//   Layers,
//   Inbox,
//   CheckCircle,
//   MessageCircle,
//   Bell,
//   Settings,
//   LogOut,
// } from "lucide-react";

// import SidebarLink from "./SidebarLink";

// interface SidebarProps {
//   user: {
//     fullname: string;
//     img_url?: string;
//     mode?: string | null;
//   };
//   unreadCount?: number;
// }

// export default function Sidebar({ user, unreadCount = 0 }: SidebarProps) {
//   const router = useRouter();

//   async function handleLogout() {
//     await fetch("https://skillwrap-backend.onrender.com/auth/logout", {
//       method: "POST",
//       credentials: "include",
//     });
//     router.replace("/login");
//   }

//   return (
//     <aside className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/10 flex flex-col">
//       {/* ================= USER INFO ================= */}
//       <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
//         <Image
//           src={user.img_url || "/default-avatar.png"}
//           alt="Avatar"
//           width={38}
//           height={38}
//           className="rounded-full"
//         />
//         <div>
//           <p className="font-semibold leading-tight">{user.fullname}</p>
//           {user.mode && (
//             <span className="text-xs text-blue-300 capitalize">
//               {user.mode} mode
//             </span>
//           )}
//         </div>
//       </div>

//       {/* ================= NAV ================= */}
//       <nav className="flex-1 p-4 space-y-2 text-sm">
//         <SidebarLink href="/dashboard" icon={<Home size={18} />} label="Dashboard" />
//         <SidebarLink href="/profile" icon={<User size={18} />} label="Profile" />
//         <SidebarLink href="/chat" icon={<MessageCircle size={18} />} label="Chat" />
//         <SidebarLink href="/my-skill" icon={<Layers size={18} />} label="My Skills" />
//         <SidebarLink
//           href="/request-recieved"
//           icon={<Inbox size={18} />}
//           label="Requests Received"
//         />
//         <SidebarLink
//           href="/request-sent"
//           icon={<CheckCircle size={18} />}
//           label="Requests Sent"
//         />

//         {/* Notifications */}
//         <SidebarLink
//           href="/notifications"
//           icon={<Bell size={18} />}
//           label="Notifications"
//           badge={unreadCount}
//         />

//         <SidebarLink href="/settings" icon={<Settings size={18} />} label="Settings" />

//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition"
//         >
//           <LogOut size={18} />
//           Logout
//         </button>
//       </nav>
//     </aside>
//   );
// }







"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Home,
  User,
  Layers,
  Inbox,
  CheckCircle,
  MessageCircle,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import SidebarLink from "./SidebarLink";

interface SidebarProps {
  user: {
    fullname: string;
    img_url?: string;
    mode?: string | null;
  };
  unreadCount?: number;
}

export default function Sidebar({ user, unreadCount = 0 }: SidebarProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("https://skillwrap-backend.onrender.com/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.replace("/login");
  }

  return (
    <>
      {/* ================= MOBILE TOGGLE ================= */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white"
      >
        <Menu size={22} />
      </button>

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed lg:static z-40 top-0 left-0 h-full
          w-72 bg-[#020617]/80 backdrop-blur-2xl
          border-r border-white/10
          flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image
              src={user.img_url || "/default-avatar.png"}
              alt="Avatar"
              width={42}
              height={42}
              className="rounded-full border border-white/20"
            />
            <div>
              <p className="font-semibold leading-tight text-white">
                {user.fullname}
              </p>
              {user.mode && (
                <span className="text-xs text-cyan-400 capitalize">
                  {user.mode} mode
                </span>
              )}
            </div>
          </div>

          {/* Close button (mobile) */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= NAV ================= */}
        <nav className="flex-1 px-4 py-6 space-y-1 text-sm">
          <SidebarLink href="/dashboard" icon={<Home size={18} />} label="Dashboard" />
          <SidebarLink href="/profile" icon={<User size={18} />} label="Profile" />
          <SidebarLink href="/chat" icon={<MessageCircle size={18} />} label="Chat" />
          <SidebarLink href="/my-skill" icon={<Layers size={18} />} label="My Skills" />

          <div className="pt-4 mt-4 border-t border-white/10">
            <SidebarLink
              href="/request-recieved"
              icon={<Inbox size={18} />}
              label="Requests Received"
            />
            <SidebarLink
              href="/request-sent"
              icon={<CheckCircle size={18} />}
              label="Requests Sent"
            />
            <SidebarLink
              href="/notifications-route"
              icon={<Bell size={18} />}
              label="Notifications"
              badge={unreadCount}
            />
          </div>

          <div className="pt-4 mt-4 border-t border-white/10">
            <SidebarLink
              href="/settings"
              icon={<Settings size={18} />}
              label="Settings"
            />

            <button
              onClick={handleLogout}
              className="
                w-full mt-2 flex items-center gap-3 px-4 py-2
                rounded-xl text-red-400
                hover:bg-red-500/10 transition
              "
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}

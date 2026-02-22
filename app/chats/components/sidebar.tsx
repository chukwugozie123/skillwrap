"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";

const dummyUsers = [
  {
    id: 1,
    name: "David Tech",
    last: "Let's start tomorrow",
    online: true,
    img_url: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Ada Design",
    last: "Sent you the file",
    online: false,
    img_url: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Mike Code",
    last: "Cool 🔥",
    online: true,
    img_url: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

export default function Sidebar({ selectedUser, setSelectedUser }) {
  return (
    <div className="h-full flex flex-col p-5 bg-white/5 backdrop-blur-xl">
      
      {/* Header */}
      <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
        SkillWrap Chat
      </h2>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-3 text-gray-400" />
        <input
          placeholder="Search chats..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:border-cyan-400 transition"
        />
      </div>

      {/* Chat List */}
      <div className="space-y-3 overflow-y-auto">
        {dummyUsers.map((user) => (
          <motion.div
            key={user.id}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer 
            transition border
            ${
              selectedUser?.id === user.id
                ? "bg-cyan-500/20 border-cyan-400"
                : "bg-white/5 hover:bg-white/10 border-transparent hover:border-cyan-400/40"
            }`}
          >
            {/* Avatar */}
            <div className="relative w-10 h-10">
              <Image
                src={user.img_url}
                alt={user.name}
                fill
                className="rounded-full object-cover"
                unoptimized
              />
              {user.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0f172a]" />
              )}
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {user.last}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

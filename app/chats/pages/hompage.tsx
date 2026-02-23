"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MessageCircle } from "lucide-react";

type Room = {
  id: number;
  exchange_id: string;
  user_id: number;
  name: string;
  created_at: string;
};

// const API_URL = "http://localhost:4000";
// 
const API_URL = "https://skillwrap-backend.onrender.com";

export default function MyRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${API_URL}/user/my-room`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok || !data.succes) {
          throw new Error(data.message || "Failed to fetch rooms");
        }

        setRooms(data.room || []);
      } catch (err: any) {
        toast.error(err.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1228] to-[#1e1b4b] px-6 py-14 text-white">
      <ToastContainer newestOnTop />
      <h1 className="text-center text-4xl font-extrabold mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
        My Chat Rooms 💬
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading…</p>
      ) : rooms.length === 0 ? (
        <p className="text-center text-gray-400">You have no chat rooms yet</p>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-xl hover:scale-[1.015] transition-all cursor-pointer"
              onClick={() => router.push(`/chat/${room.exchange_id}`)}
            >
              <div className="flex items-center gap-3">
                <MessageCircle size={24} className="text-cyan-400" />
                <h2 className="text-xl font-semibold text-blue-300">{room.name}</h2>
              </div>
              <p className="text-gray-300 mt-3 text-sm">
                Exchange ID: {room.exchange_id}
              </p>
              <p className="text-gray-400 mt-1 text-xs">
                Created on: {new Date(room.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}












































// "use client"

// import EmojiPicker from "emoji-picker-react"
// import { Phone, Video, Smile } from "lucide-react"
// import { useEffect, useRef, useState } from "react"
// import { socket } from "@/lib/socketClient"

// interface Message {
//   id?: number
//   username: string
//   text: string
//   created_at?: string
// }

// export default function ChatPage() {
//   const [connected, setConnected] = useState(false)
//   const [userId, setUserId] = useState<number | null>(null)
//   const [username, setUsername] = useState("")
//   const [room, setRoom] = useState("")
//   const [joined, setJoined] = useState(false)
//   const [message, setMessage] = useState("")
//   const [messages, setMessages] = useState<Message[]>([])
//   const [typingUser, setTypingUser] = useState("")
//   const [roomUsers, setRoomUsers] = useState<string[]>([])
//   const [userCount, setUserCount] = useState(0)
//   const [showEmoji, setShowEmoji] = useState(false)

//   const chatContainerRef = useRef<HTMLDivElement>(null)
//   const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

//   const API_URL = "https://skillwrap-backend.onrender.com"

//   /* ================= LOAD USER ================= */
//   useEffect(() => {
//     async function fetchUser() {
//       const res = await fetch(`${API_URL}/auth/profile`, {
//         credentials: "include",
//       })
//       if (!res.ok) return
//       const data = await res.json()
//       setUserId(data.user.id)
//       setUsername(data.user.username)
//     }
//     fetchUser()
//   }, [])

//   /* ================= SOCKET CONNECTION ================= */
//   useEffect(() => {
//     socket.connect()

//     socket.on("connect", () => setConnected(true))
//     socket.on("disconnect", () => setConnected(false))

//     socket.on("previousMessages", (msgs: Message[]) => {
//       setMessages(msgs)
//     })

//     socket.on("message", (msg: Message) => {
//       setMessages(prev => [...prev, msg])
//     })

//     socket.on("typing", ({ name }) => {
//       if (name === username) return
//       setTypingUser(name)

//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
//       typingTimeoutRef.current = setTimeout(() => {
//         setTypingUser("")
//       }, 2000)
//     })

//     socket.on("roomUsers", ({ users, count }) => {
//       setRoomUsers(users)
//       setUserCount(count)
//     })

//     return () => {
//       socket.disconnect()
//     }
//   }, [username])

//   /* ================= SMART SCROLL ================= */
//   useEffect(() => {
//     const container = chatContainerRef.current
//     if (!container) return
//     const isNearBottom =
//       container.scrollHeight - container.scrollTop - container.clientHeight < 120
//     if (isNearBottom) container.scrollTop = container.scrollHeight
//   }, [messages])

//   /* ================= EVENT HANDLERS ================= */
//   function handleJoin(e: React.FormEvent) {
//     e.preventDefault()
//     if (!room || !userId) return
//     socket.emit("enterRoom", { roomName: room, userId })
//     setJoined(true)
//   }

//   function handleSend(e: React.FormEvent) {
//     e.preventDefault()
//     if (!message.trim()) return
//     socket.emit("message", { text: message })
//     setMessage("")
//   }

//   function handleTyping(value: string) {
//     setMessage(value)
//     socket.emit("typing", { name: username })
//   }

//   function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0]
//     if (!file) return

//     const reader = new FileReader()
//     reader.onloadend = () => {
//       socket.emit("message", { text: reader.result })
//     }
//     reader.readAsDataURL(file)
//   }

//   function onEmojiClick(emojiData: any) {
//     setMessage(prev => prev + emojiData.emoji)
//   }

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] via-[#0f1b4d] to-[#050816] text-white flex items-center justify-center p-4 md:p-8 transition-all duration-500">
//       <div className="w-full max-w-7xl h-[92vh] rounded-3xl backdrop-blur-xl bg-white/5 border border-blue-900/40 shadow-[0_0_60px_rgba(0,0,255,0.15)] flex overflow-hidden transition-all duration-500">

//         {!joined ? (
//           <div className="flex-1 flex items-center justify-center px-6">
//             <form
//               onSubmit={handleJoin}
//               className="space-y-6 w-full max-w-md bg-blue-950/40 p-10 rounded-3xl shadow-xl border border-blue-800/30 animate-fadeIn"
//             >
//               <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
//                 SkillWrap Chat
//               </h1>

//               <p className="text-center text-sm tracking-wide">
//                 {connected ? (
//                   <span className="text-green-400 animate-pulse">🟢 Connected</span>
//                 ) : (
//                   <span className="text-red-400 animate-pulse">🔴 Connecting...</span>
//                 )}
//               </p>

//               <input
//                 value={username}
//                 disabled
//                 className="w-full p-3 rounded-xl bg-blue-900/40 border border-blue-800 focus:outline-none"
//               />

//               <input
//                 placeholder="Enter Room Name"
//                 value={room}
//                 onChange={e => setRoom(e.target.value)}
//                 className="w-full p-3 rounded-xl bg-blue-900/40 border border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               />

//               <button className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-all duration-300 font-semibold shadow-lg">
//                 Join Room
//               </button>
//             </form>
//           </div>
//         ) : (
//           <>
//             {/* SIDEBAR */}
//             <div className="hidden md:flex w-72 bg-blue-950/50 border-r border-blue-900/40 p-6 flex-col">
//               <h2 className="font-semibold text-lg mb-1">Room Members</h2>
//               <p className="text-sm text-blue-300 mb-6">{userCount} Members</p>
//               <div className="space-y-3 overflow-y-auto">
//                 {roomUsers.map((u, i) => (
//                   <div key={i} className="px-4 py-2 rounded-xl bg-blue-900/40 hover:bg-blue-800/60 transition-all text-sm">
//                     {u}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* CHAT AREA */}
//             <div className="flex-1 flex flex-col relative">

//               {/* HEADER */}
//               <div className="flex items-center justify-between px-6 py-4 border-b border-blue-900/40 bg-blue-950/60 backdrop-blur-xl">
//                 <div>
//                   <h2 className="text-lg font-semibold tracking-wide">{room || "Exchange Room"}</h2>
//                   <p className="text-xs text-blue-300">{userCount} Members • Skill Exchange Active</p>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <button className="p-2 rounded-full bg-blue-900/40 hover:bg-blue-800 transition-all">
//                     <Phone size={18} />
//                   </button>
//                   <button className="p-2 rounded-full bg-blue-900/40 hover:bg-blue-800 transition-all">
//                     <Video size={18} />
//                   </button>
//                 </div>
//               </div>

//               {/* MESSAGES */}
//               <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-5 scroll-smooth">
//                 {messages.map((msg, i) => {
//                   const isMe = msg.username === username
//                   const isImage = msg.text.startsWith("data:image")
//                   const isSystem = msg.username === "System"

//                   return (
//                     <div key={i} className={`flex ${isSystem ? "justify-center" : isMe ? "justify-end" : "justify-start"}`}>
//                       <div className={`max-w-[75%] p-4 rounded-2xl shadow-lg transition-all duration-300 ${
//                         isSystem
//                           ? "bg-gray-700 text-yellow-300 italic"
//                           : isMe
//                             ? "bg-gradient-to-r from-blue-600 to-cyan-500"
//                             : "bg-blue-900/40 backdrop-blur-md border border-blue-800/40"
//                       }`}>
//                         {!isMe && !isSystem && (
//                           <p className="text-xs opacity-60 mb-1">{msg.username}</p>
//                         )}

//                         {isImage ? (
//                           <img src={msg.text} className="rounded-xl max-h-60 shadow-md" />
//                         ) : (
//                           <p className={`${isSystem ? "text-center" : ""} leading-relaxed`}>{msg.text}</p>
//                         )}

//                         {msg.created_at && (
//                           <p className="text-[10px] opacity-40 mt-2 text-right">{new Date(msg.created_at).toLocaleTimeString()}</p>
//                         )}
//                       </div>
//                     </div>
//                   )
//                 })}
//               </div>

//               {typingUser && (
//                 <div className="px-6 text-xs text-cyan-300 animate-pulse">{typingUser} is typing...</div>
//               )}

//               {/* INPUT BAR */}
//               <form onSubmit={handleSend} className="relative p-4 bg-blue-950/60 backdrop-blur-xl border-t border-blue-900/40 flex gap-3 items-center">
//                 {/* Emoji Picker */}
//                 <div className="relative">
//                   <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-3 rounded-full bg-blue-900/40 hover:bg-blue-800 transition-all">
//                     <Smile size={18} />
//                   </button>
//                   {showEmoji && <div className="absolute bottom-16 left-0 z-50"><EmojiPicker onEmojiClick={onEmojiClick} /></div>}
//                 </div>

//                 <input value={message} onChange={e => handleTyping(e.target.value)} className="flex-1 p-3 rounded-full bg-blue-900/40 border border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Type a message..." />

//                 <label className="cursor-pointer bg-blue-800 hover:bg-blue-700 transition-all px-4 py-3 rounded-full">
//                   📷
//                   <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
//                 </label>

//                 <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-all px-6 py-3 rounded-full font-semibold shadow-md">Send</button>
//               </form>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }
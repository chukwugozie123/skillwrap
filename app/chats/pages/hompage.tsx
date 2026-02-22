// // "use client";

// // import { useState } from "react"

// // import { useState } from "react";
// // import { motion } from "framer-motion";
// // import Image from "next/image";
// // import ChatContainer from "../components/chatContainer";
// // import RightSiderbar from "../components/rightSidebar";
// // import Sidebar from "../components/sidebar";

// // export default function Homepage() {
// //   const [selectedUser, setSelectedUser] = useState(null);

// //   return (
// //     <div className="min-h-screen w-full bg-[#0b1120] relative overflow-hidden">

// //       {/* Background Accent */}
// //       <div
// //         className="absolute inset-0 
// //         bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.08),transparent_40%),radial-gradient(circle_at_85%_70%,rgba(139,92,246,0.06),transparent_40%)]"
// //       />

// //       <motion.div
// //         initial={{ opacity: 0, y: 15 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //         className="relative z-10 h-screen px-6 lg:px-16 py-10"
// //       >
// //         <div
// //           className={`h-full grid rounded-2xl overflow-hidden 
// //           border border-white/10 
// //           bg-[#0f172a]/70 backdrop-blur-xl
// //           shadow-[0_0_40px_rgba(0,0,0,0.4)]
// //           transition-all duration-500

// //           ${
// //             selectedUser
// //               ? "grid-cols-1 md:grid-cols-[280px_1fr_320px]"
// //               : "grid-cols-1 md:grid-cols-[280px_1fr]"
// //           }`}
// //         >
// //           {/* LEFT SIDEBAR */}
// //           <div className="border-r border-white/10 bg-[#0f172a]/60">
// //             <Sidebar
// //               selectedUser={selectedUser}
// //               setSelectedUser={setSelectedUser}
// //             />
// //           </div>

// //           {/* CENTER AREA */}
// //           <div className="relative bg-[#0b1220]/80 flex items-center justify-center">

// //             {!selectedUser ? (
// //               /* 🔥 EMPTY STATE DESIGN */
// //               <motion.div
// //                 initial={{ opacity: 0, scale: 0.95 }}
// //                 animate={{ opacity: 1, scale: 1 }}
// //                 transition={{ duration: 0.4 }}
// //                 className="text-center px-6"
// //               >
// //                 <div className="relative w-48 h-48 mx-auto mb-8">
// //                   <Image
// //                     src="https://illustrations.popsy.co/gray/chat.svg"
// //                     alt="Start chatting"
// //                     fill
// //                     className="object-contain opacity-90"
// //                     unoptimized
// //                   />
// //                 </div>

// //                 <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
// //                   Start Chatting
// //                 </h2>

// //                 <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
// //                   Select a conversation from the sidebar and start building
// //                   skills, sharing ideas, and collaborating in real-time.
// //                 </p>

// //                 <div className="mt-8">
// //                   <button
// //                     className="px-6 py-2 rounded-xl 
// //                     bg-gradient-to-r from-cyan-500 to-blue-600
// //                     hover:scale-105 transition
// //                     text-white font-medium shadow-lg"
// //                   >
// //                     Choose a Chat
// //                   </button>
// //                 </div>
// //               </motion.div>
// //             ) : (
// //               <>
// //                 <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
// //                 <ChatContainer
// //                   selectedUser={selectedUser}
// //                   setSelectedUser={setSelectedUser}
// //                 />
// //               </>
// //             )}
// //           </div>

// //           {/* RIGHT SIDEBAR */}
// //           {selectedUser && (
// //             <div className="hidden md:block border-l border-white/10 bg-[#0f172a]/60">
// //               <RightSiderbar
// //                 selectedUser={selectedUser}
// //                 setSelectedUser={setSelectedUser}
// //               />
// //             </div>
// //           )}
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // }






























// // "use client"

// // import { useEffect, useRef, useState } from "react"
// // import { io, Socket } from "socket.io-client"

// // interface Message {
// //   name: string
// //   text: string
// //   time: string
// // }

// // export default function HomePage() {
// //   const socketRef = useRef<Socket | null>(null)

// //   const [name, setName] = useState("")
// //   const [room, setRoom] = useState("")
// //   const [message, setMessage] = useState("")
// //   const [messages, setMessages] = useState<Message[]>([])
// //   const [activity, setActivity] = useState("")
// //   const [users, setUsers] = useState<string[]>([])
// //   const [rooms, setRooms] = useState<string[]>([])

// //   /* ========================
// //      CONNECT SOCKET ONCE
// //   ======================== */
// //   useEffect(() => {
// //     const socket = io("http://localhost:3000")
// //     socketRef.current = socket

// //     socket.on("message", (data: Message) => {
// //       setActivity("")
// //       setMessages(prev => [...prev, data])
// //     })

// //     socket.on("userList", ({ users }) => {
// //       setUsers(users.map((u: any) => u.name))
// //     })

// //     socket.on("roomsList", ({ rooms }) => {
// //       setRooms(rooms)
// //     })

// //     socket.on("activity", (name: string) => {
// //       setActivity(`${name} is typing...`)
// //     })

// //     return () => {
// //       socket.disconnect()
// //     }
// //   }, [])

// //   /* ========================
// //      ENTER ROOM
// //   ======================== */
// //   function handleEnterRoom(e: React.FormEvent) {
// //     e.preventDefault()

// //     if (!socketRef.current) return

// //     if (name && room) {
// //       socketRef.current.emit("enterRoom", { name, room })
// //     }
// //   }

// //   /* ========================
// //      SEND MESSAGE
// //   ======================== */
// //   function sendMessage(e: React.FormEvent) {
// //     e.preventDefault()

// //     if (!socketRef.current) return

// //     if (message && name && room) {
// //       socketRef.current.emit("message", {
// //         name,
// //         text: message
// //       })

// //       setMessage("")
// //     }
// //   }

// //   /* ========================
// //      TYPING ACTIVITY
// //   ======================== */
// //   function handleTyping() {
// //     if (!socketRef.current) return
// //     socketRef.current.emit("activity", name)
// //   }

// //   return (
// //     <div style={{ padding: 20, fontFamily: "sans-serif" }}>
// //       <h2>SkillWrap Chat</h2>

// //       {/* JOIN ROOM */}
// //       <form onSubmit={handleEnterRoom} style={{ marginBottom: 20 }}>
// //         <input
// //           value={name}
// //           onChange={e => setName(e.target.value)}
// //           placeholder="Your name"
// //           style={{ marginRight: 10 }}
// //         />
// //         <input
// //           value={room}
// //           onChange={e => setRoom(e.target.value)}
// //           placeholder="Room"
// //           style={{ marginRight: 10 }}
// //         />
// //         <button>Join</button>
// //       </form>

// //       {/* CHAT DISPLAY */}
// //       <div
// //         style={{
// //           border: "1px solid #ccc",
// //           height: 300,
// //           overflowY: "auto",
// //           padding: 10,
// //           marginBottom: 10
// //         }}
// //       >
// //         {messages.map((msg, i) => (
// //           <p key={i}>
// //             <strong>{msg.name}</strong> ({msg.time}): {msg.text}
// //           </p>
// //         ))}
// //         <p style={{ fontStyle: "italic", color: "gray" }}>{activity}</p>
// //       </div>

// //       {/* USER LIST */}
// //       <div style={{ marginBottom: 10 }}>
// //         <strong>Users:</strong>
// //         <ul>
// //           {users.map((u, i) => (
// //             <li key={i}>{u}</li>
// //           ))}
// //         </ul>
// //       </div>

// //       {/* ROOM LIST */}
// //       <div style={{ marginBottom: 10 }}>
// //         <strong>Rooms:</strong>
// //         <ul>
// //           {rooms.map((r, i) => (
// //             <li key={i}>{r}</li>
// //           ))}
// //         </ul>
// //       </div>

// //       {/* SEND MESSAGE */}
// //       <form onSubmit={sendMessage}>
// //         <input
// //           value={message}
// //           onChange={e => {
// //             setMessage(e.target.value)
// //             handleTyping()
// //           }}
// //           placeholder="Your message"
// //           style={{ marginRight: 10 }}
// //         />
// //         <button>Send</button>
// //       </form>
// //     </div>
// //   )
// // }











































// // "use client"

// // import { useEffect, useRef, useState } from "react"
// // import { socket } from "@/lib/socketClient"

// // interface Message {
// //   name: string
// //   text: string
// //   time?: string
// // }

// // export default function ChatPage() {
// //   const [connected, setConnected] = useState(false)
// //   const [name, setName] = useState("")
// //   const [room, setRoom] = useState("")
// //   const [joined, setJoined] = useState(false)
// //   const [message, setMessage] = useState("")
// //   const [messages, setMessages] = useState<Message[]>([])
// //   const [users, setUsers] = useState<string[]>(([]))
// //   const messagesEndRef = useRef<HTMLDivElement>(null)

// //   /* ========================
// //      CONNECT SOCKET
// //   ======================== */
// //   useEffect(() => {
// //     socket.connect()

// //     socket.on("connect", () => {
// //       setConnected(true)
// //     })

// //     socket.on("disconnect", () => {
// //       setConnected(false)
// //     })

// //     socket.on("message", (data: Message) => {
// //       setMessages(prev => [...prev, data])
// //     })

// //     socket.on("userList", ({ users }) => {
// //       setUsers(users.map((u: any) => u.name))
// //     })

// //     return () => {
// //       socket.off("connect")
// //       socket.off("disconnect")
// //       socket.off("message")
// //       socket.off("userList")
// //       socket.disconnect()
// //     }
// //   }, [])

// //   /* Auto scroll */
// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
// //   }, [messages])

// //   /* ========================
// //      JOIN ROOM
// //   ======================== */
// //   function handleJoin(e: React.FormEvent) {
// //     e.preventDefault()
// //     if (name && room) {
// //       socket.emit("enterRoom", { room })
// //       setJoined(true)
// //     }
// //   }

// //   /* ========================
// //      LEAVE ROOM
// //   ======================== */
// //   function handleLeave() {
// //     socket.emit("leaveRoom")
// //     setJoined(false)
// //     setMessages([])
// //     setUsers([])
// //   }

// //   /* ========================
// //      SEND MESSAGE
// //   ======================== */
// //   function handleSend(e: React.FormEvent) {
// //     e.preventDefault()
// //     if (!message.trim()) return

// //     socket.emit("message", {
// //       name,
// //       text: message
// //     })

// //     setMessage("")
// //   }
// // return (
// //   <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black flex items-center justify-center p-6">

// //     <div className="w-full max-w-6xl h-[90vh] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] rounded-3xl flex overflow-hidden">

// //       {!joined ? (
// //         /* ===========================
// //            🔥 MODERN JOIN SCREEN
// //         =========================== */
// //         <div className="w-full flex items-center justify-center relative">

// //           <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 blur-3xl opacity-40" />

// //           <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl w-full max-w-md text-white">

// //             <h2 className="text-4xl font-bold text-center mb-2">
// //               🚀 SkillWrap Chat
// //             </h2>

// //             <p className="text-center text-sm text-gray-300 mb-6">
// //               {connected ? "🟢 Connected" : "🔴 Connecting..."}
// //             </p>

// //             <form onSubmit={handleJoin} className="space-y-5">

// //               <input
// //                 className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 outline-none transition"
// //                 placeholder="Enter your name"
// //                 value={name}
// //                 onChange={e => setName(e.target.value)}
// //               />

// //               <input
// //                 className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 outline-none transition"
// //                 placeholder="Enter room name"
// //                 value={room}
// //                 onChange={e => setRoom(e.target.value)}
// //               />

// //               <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.03] transition transform py-3 rounded-xl font-semibold shadow-lg">
// //                 Join Room
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       ) : (
// //         <>
// //           {/* ===========================
// //              👥 MODERN USER SIDEBAR
// //           =========================== */}
// //           <div className="w-1/4 bg-white/5 border-r border-white/10 p-5 text-white hidden md:flex flex-col">

// //             <div className="mb-6">
// //               <h3 className="text-lg font-semibold">#{room}</h3>
// //               <button
// //                 onClick={handleLeave}
// //                 className="text-red-400 text-xs hover:text-red-300 mt-1"
// //               >
// //                 Leave Room
// //               </button>
// //             </div>

// //             <div className="flex-1 overflow-y-auto space-y-3">
// //               {users.map((u, i) => (
// //                 <div
// //                   key={i}
// //                   className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition"
// //                 >
// //                   <div className="relative">
// //                     <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center font-bold">
// //                       {u.charAt(0).toUpperCase()}
// //                     </div>
// //                     <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-black rounded-full" />
// //                   </div>

// //                   <p className="text-sm font-medium">{u}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* ===========================
// //              💬 CHAT SECTION
// //           =========================== */}
// //           <div className="flex-1 flex flex-col text-white">

// //             {/* Chat Header */}
// //             <div className="p-5 border-b border-white/10 bg-white/5 backdrop-blur-lg flex justify-between items-center">
// //               <h2 className="font-semibold text-lg">Room: {room}</h2>
// //               <span className="text-sm text-gray-400">
// //                 {users.length} members
// //               </span>
// //             </div>

// //             {/* Messages */}
// //             <div className="flex-1 overflow-y-auto p-6 space-y-6">
// //               {messages.map((msg, i) => (
// //                 <div
// //                   key={i}
// //                   className={`flex ${
// //                     msg.name === name ? "justify-end" : "justify-start"
// //                   }`}
// //                 >
// //                   <div
// //                     className={`max-w-sm px-5 py-3 rounded-2xl shadow-lg ${
// //                       msg.name === name
// //                         ? "bg-gradient-to-r from-indigo-600 to-purple-600"
// //                         : "bg-white/10 backdrop-blur-md border border-white/10"
// //                     }`}
// //                   >
// //                     <p className="text-xs opacity-70 mb-1">{msg.name}</p>
// //                     <p className="text-sm">{msg.text}</p>
// //                   </div>
// //                 </div>
// //               ))}
// //               <div ref={messagesEndRef} />
// //             </div>

// //             {/* Message Input */}
// //             <form
// //               onSubmit={handleSend}
// //               className="p-4 border-t border-white/10 bg-white/5 flex gap-3"
// //             >
// //               <input
// //                 className="flex-1 px-5 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
// //                 placeholder="Type a message..."
// //                 value={message}
// //                 onChange={e => setMessage(e.target.value)}
// //               />

// //               <button className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 rounded-xl font-semibold hover:scale-105 transition transform">
// //                 Send
// //               </button>
// //             </form>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   </div>
// // )
// // }









































// "use client"

// import { useEffect, useRef, useState } from "react"
// import { socket } from "@/lib/socketClient"

// interface Message {
//   name: string
//   text: string
// }

// export default function ChatPage() {
//   const [connected, setConnected] = useState(false)
//   const [username, setUsername] = useState<string | null>(null)
//   const [manualName, setManualName] = useState("")
//   const [room, setRoom] = useState("")
//   const [joined, setJoined] = useState(false)
//   const [message, setMessage] = useState("")
//   const [messages, setMessages] = useState<Message[]>([])
//   const [users, setUsers] = useState<string[]>([])
//   const [error, setError] = useState("")
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const API_URL = "https://skillwrap-backend.onrender.com"

//   /* SOCKET */
//   useEffect(() => {
//     socket.connect()

//     socket.on("connect", () => setConnected(true))
//     socket.on("disconnect", () => setConnected(false))

//     socket.on("message", (data: Message) => {
//       setMessages(prev => [...prev, data])
//     })

//     socket.on("userList", ({ users }) => {
//       const safeUsers = users.map(
//         (u: any) => u?.username || u?.name 
//       )
//       setUsers(safeUsers)
//     })

//     return () => {
//       socket.off("connect")
//       socket.off("disconnect")
//       socket.off("message")
//       socket.off("userList")
//       socket.disconnect()
//     }
//   }, [])

//   /* FETCH AUTH USER */
//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const res = await fetch(`${API_URL}/auth/profile`, {
//           credentials: "include",
//         })
//         if (!res.ok) return
//         const data = await res.json()
//         setUsername(data.user.username)
//         console.log(data.user.username, 'checking username')
//       } catch {}
//     }

//     fetchUser()
//   }, [])

//   console.log(username, 'sdad')

//   /* AUTO SCROLL */
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   /* VALIDATE USER BEFORE JOIN */
//   async function validateUser(name: string) {
//     try {
//       const res = await fetch(
//         `${API_URL}/auth/check-user?username=${name}`
//       )
//       if (!res.ok) return false
//       const data = await res.json()
//       return data.exists
//     } catch {
//       return false
//     }
//   }

//   /* JOIN ROOM */
//   async function handleJoin(e: React.FormEvent) {
//     e.preventDefault()

//     const finalName = username || manualName

//     if (!finalName || !room) {
//       setError("Name and Room required")
//       return
//     }

//     // if not logged in → validate manually
//     if (!username) {
//       const exists = await validateUser(finalName)

//       if (!exists) {
//         setError("User does not exist ❌")
//         return
//       }
//     }

//     socket.emit("enterRoom", {
//       name: finalName,
//       room,
//     })

//     setError("")
//     setJoined(true)
//   }

//   function handleLeave() {
//     socket.emit("leaveRoom")
//     setJoined(false)
//     setMessages([])
//     setUsers([])
//   }

//   function handleSend(e: React.FormEvent) {
//     e.preventDefault()
//     if (!message.trim()) return

//     socket.emit("message", {
//       name: username || manualName,
//       text: message,
//     })

//     setMessage("")
//   }

//   const displayName = username || manualName

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white p-6">

//       <div className="w-full max-w-6xl h-[85vh] rounded-3xl border border-white/10 backdrop-blur-2xl bg-white/5 shadow-[0_0_80px_rgba(0,0,0,0.7)] overflow-hidden flex">

//         {!joined ? (
//           <div className="w-full flex items-center justify-center relative">

//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-cyan-500/20 blur-3xl opacity-40" />

//             <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl w-full max-w-md space-y-6">

//               <h2 className="text-3xl font-bold text-center">
//                 💬 SkillWrap Chat
//               </h2>

//               <p className="text-center text-sm">
//                 {connected ? "🟢 Connected" : "🔴 Connecting..."}
//               </p>

//               {error && (
//                 <p className="text-red-400 text-center text-sm">
//                   {error}
//                 </p>
//               )}

//               {!username && (
//                 <input
//                   placeholder="Enter your username"
//                   value={manualName}
//                   onChange={e => setManualName(e.target.value)}
//                   className="w-full px-4 py-3 rounded-xl bg-white/20 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
//                 />
//               )}

//               {username && (
//                 <p className="text-center text-cyan-400">
//                   Logged in as {username}
//                 </p>
//               )}

//               <input
//                 placeholder="Enter room name"
//                 value={room}
//                 onChange={e => setRoom(e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl bg-white/20 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
//               />

//               <button
//                 onClick={handleJoin}
//                 className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:scale-105 transition transform"
//               >
//                 Join Room
//               </button>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* Sidebar */}
//             <div className="w-1/4 bg-white/5 border-r border-white/10 p-5 hidden md:flex flex-col">
//               <h3 className="font-semibold mb-4">#{room}</h3>

//               <div className="flex-1 space-y-3 overflow-y-auto">
//                 {users.map((u, i) => (
//                   <div key={i} className="p-2 rounded-lg hover:bg-white/10">
//                     {u}
//                   </div>
//                 ))}
//               </div>

//               <button
//                 onClick={handleLeave}
//                 className="mt-4 text-red-400 text-sm"
//               >
//                 Leave Room
//               </button>
//             </div>

//             {/* Chat Area */}
//             <div className="flex-1 flex flex-col p-6">

//               <div className="flex-1 overflow-y-auto space-y-4">
//                 {messages.map((msg, i) => (
//                   <div
//                     key={i}
//                     className={`flex ${
//                       msg.name === displayName
//                         ? "justify-end"
//                         : "justify-start"
//                     }`}
//                   >
//                     <div className={`px-5 py-3 rounded-2xl backdrop-blur-md shadow-lg ${
//                       msg.name === displayName
//                         ? "bg-gradient-to-r from-indigo-600 to-cyan-600"
//                         : "bg-white/10 border border-white/10"
//                     }`}>
//                       <p className="text-xs opacity-70">{msg.name}</p>
//                       <p>{msg.text}</p>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>

//               <form onSubmit={handleSend} className="flex gap-3 mt-4">
//                 <input
//                   value={message}
//                   onChange={e => setMessage(e.target.value)}
//                   className="flex-1 px-4 py-3 rounded-xl bg-white/20 focus:ring-2 focus:ring-cyan-400 outline-none"
//                   placeholder="Type a message..."
//                 />
//                 <button className="px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600">
//                   Send
//                 </button>
//               </form>

//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }



































































"use client"

import { useEffect, useRef, useState } from "react"
import { socket } from "@/lib/socketClient"

interface Message {
  name: string
  text: string
}

export default function ChatPage() {
  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [manualName, setManualName] = useState("")
  const [room, setRoom] = useState("")
  const [joined, setJoined] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<string[]>([])
  const [typingUser, setTypingUser] = useState("")
  const [error, setError] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const API_URL = "https://skillwrap-backend.onrender.com"

  /* ================= SOCKET ================= */
  useEffect(() => {
    socket.connect()

    socket.on("connect", () => setConnected(true))
    socket.on("disconnect", () => setConnected(false))

    socket.on("message", (data: Message) => {
      setMessages(prev => [...prev, data])
    })

    socket.on("userList", ({ users }) => {
      const safeUsers = users.map(
        (u: any) => u?.username || u?.name
      )
      setUsers(safeUsers)
    })

    socket.on("typing", ({ name }) => {
      if (name !== displayName) {
        setTypingUser(name)
        setTimeout(() => setTypingUser(""), 2000)
      }
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("message")
      socket.off("userList")
      socket.off("typing")
      socket.disconnect()
    }
  }, [])

  /* ================= AUTH ================= */
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        })
        if (!res.ok) return
        const data = await res.json()
        setUsername(data.user.username)
      } catch {}
    }
    fetchUser()
  }, [])

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const displayName = username || manualName

  /* ================= VALIDATE ================= */
  async function validateUser(name: string) {
    try {
      const res = await fetch(
        `${API_URL}/auth/check-user?username=${name}`
      )
      if (!res.ok) return false
      const data = await res.json()
      return data.exists
    } catch {
      return false
    }
  }

  /* ================= JOIN ================= */
  async function handleJoin(e: React.FormEvent) {
    e.preventDefault()

    if (!displayName || !room) {
      setError("Name and Room required")
      return
    }

    if (!username) {
      const exists = await validateUser(displayName)
      if (!exists) {
        setError("User does not exist ❌")
        return
      }
    }

    socket.emit("enterRoom", {
      name: displayName,
      room,
    })

    setError("")
    setJoined(true)
  }

  function handleLeave() {
    socket.emit("leaveRoom")
    setJoined(false)
    setMessages([])
    setUsers([])
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return

    socket.emit("message", {
      name: displayName,
      text: message,
    })

    setMessage("")
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white p-4">

      <div className="w-full max-w-6xl h-[95vh] md:h-[85vh] 
      rounded-2xl md:rounded-3xl 
      border border-white/10 
      backdrop-blur-2xl 
      bg-white/5 
      shadow-[0_0_80px_rgba(0,0,0,0.7)] 
      overflow-hidden 
      flex flex-col md:flex-row relative">

        {!joined ? (
          /* ================= JOIN SCREEN ================= */
          <div className="w-full flex items-center justify-center relative p-6">

            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-cyan-500/20 blur-3xl opacity-40" />

            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl w-full max-w-md space-y-6">

              <h2 className="text-2xl md:text-3xl font-bold text-center">
                💬 SkillWrap Chat
              </h2>

              <p className="text-center text-sm">
                {connected ? "🟢 Connected" : "🔴 Connecting..."}
              </p>

              {error && (
                <p className="text-red-400 text-center text-sm">
                  {error}
                </p>
              )}

              {!username && (
                <input
                  placeholder="Enter your username"
                  value={manualName}
                  onChange={e => setManualName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 focus:ring-2 focus:ring-cyan-400 outline-none"
                />
              )}

              {username && (
                <p className="text-center text-cyan-400">
                  Logged in as {username}
                </p>
              )}

              <input
                placeholder="Enter room name"
                value={room}
                onChange={e => setRoom(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/20 focus:ring-2 focus:ring-cyan-400 outline-none"
              />

              <button
                onClick={handleJoin}
                className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:scale-105 transition"
              >
                Join Room
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ================= SIDEBAR ================= */}
            <div className="w-full md:w-1/4 bg-white/5 border-b md:border-b-0 md:border-r border-white/10 p-4 flex flex-col">

              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">#{room}</h3>
                <button
                  onClick={handleLeave}
                  className="text-red-400 text-xs hover:text-red-300"
                >
                  Leave
                </button>
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto mt-4">
                {users.map((u, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                  >
                    🟢 {u}
                  </div>
                ))}
              </div>
            </div>

            {/* ================= CHAT AREA ================= */}
            <div className="flex-1 flex flex-col p-4 md:p-6">

              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex animate-fadeIn ${
                      msg.name === displayName
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] md:max-w-[60%]
                      px-4 py-3 
                      rounded-2xl 
                      backdrop-blur-md 
                      shadow-xl 
                      ${
                        msg.name === displayName
                          ? "bg-gradient-to-r from-indigo-600 to-cyan-600"
                          : "bg-white/10 border border-white/10"
                      }`}
                    >
                      <p className="text-[10px] md:text-xs opacity-70 mb-1">
                        {msg.name}
                      </p>
                      <p className="text-sm md:text-base break-words">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {typingUser && (
                <div className="text-xs text-cyan-400 mt-2 animate-pulse">
                  {typingUser} is typing...
                </div>
              )}

              <form
                onSubmit={handleSend}
                className="flex gap-2 md:gap-3 mt-3 sticky bottom-0 pt-3"
              >
                <input
                  value={message}
                  onChange={e => {
                    setMessage(e.target.value)
                    socket.emit("typing", { name: displayName })
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/20 focus:ring-2 focus:ring-cyan-400 outline-none"
                  placeholder="Type a message..."
                />
                <button
                  className="px-4 md:px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:scale-105 transition"
                >
                  Send
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
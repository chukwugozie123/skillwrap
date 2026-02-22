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
//   const [typingUser, setTypingUser] = useState("")
//   const [error, setError] = useState("")
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const API_URL = "https://skillwrap-backend.onrender.com"
// //  const API_URL =  "http://localhost:4000"

//   /* ================= SOCKET ================= */
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

//     socket.on("typing", ({ name }) => {
//       if (name !== displayName) {
//         setTypingUser(name)
//         setTimeout(() => setTypingUser(""), 2000)
//       }
//     })

//     return () => {
//       socket.off("connect")
//       socket.off("disconnect")
//       socket.off("message")
//       socket.off("userList")
//       socket.off("typing")
//       socket.disconnect()
//     }
//   }, [])

//   /* ================= AUTH ================= */
//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const res = await fetch(`${API_URL}/auth/profile`, {
//           credentials: "include",
//         })
//         if (!res.ok) return
//         const data = await res.json()
//         setUsername(data.user.username)
//       } catch {}
//     }
//     fetchUser()
//   }, [])

//   console.log(username)

//   /* ================= AUTO SCROLL ================= */
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   const displayName = username || manualName

//   /* ================= VALIDATE ================= */
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

//   /* ================= JOIN ================= */
//   async function handleJoin(e: React.FormEvent) {
//     e.preventDefault()

//     if (!displayName || !room) {
//       setError("Name and Room required")
//       return
//     }

//     if (!username) {
//       const exists = await validateUser(displayName)
//       if (!exists) {
//         setError("User does not exist ❌")
//         return
//       }
//     }

//     socket.emit("enterRoom", {
//       name: displayName,
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
//       name: displayName,
//       text: message,
//     })

//     setMessage("")
//   }

//   /* ================= UI ================= */

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white p-4">

//       <div className="w-full max-w-6xl h-[95vh] md:h-[85vh] 
//       rounded-2xl md:rounded-3xl 
//       border border-white/10 
//       backdrop-blur-2xl 
//       bg-white/5 
//       shadow-[0_0_80px_rgba(0,0,0,0.7)] 
//       overflow-hidden 
//       flex flex-col md:flex-row relative">

//         {!joined ? (
//           /* ================= JOIN SCREEN ================= */
//           <div className="w-full flex items-center justify-center relative p-6">

//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-cyan-500/20 blur-3xl opacity-40" />

//             <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl w-full max-w-md space-y-6">

//               <h2 className="text-2xl md:text-3xl font-bold text-center">
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
//                   className="w-full px-4 py-3 rounded-xl bg-white/20 focus:ring-2 focus:ring-cyan-400 outline-none"
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
//                 className="w-full px-4 py-3 rounded-xl bg-white/20 focus:ring-2 focus:ring-cyan-400 outline-none"
//               />

//               <button
//                 onClick={handleJoin}
//                 className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-cyan-600 hover:scale-105 transition"
//               >
//                 Join Room
//               </button>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* ================= SIDEBAR ================= */}
//             <div className="w-full md:w-1/4 bg-white/5 border-b md:border-b-0 md:border-r border-white/10 p-4 flex flex-col">

//               <div className="flex items-center justify-between">
//                 <h3 className="font-semibold text-lg">#{room}</h3>
//                 <button
//                   onClick={handleLeave}
//                   className="text-red-400 text-xs hover:text-red-300"
//                 >
//                   Leave
//                 </button>
//               </div>

//               <div className="flex-1 space-y-2 overflow-y-auto mt-4">
//                 {users.map((u, i) => (
//                   <div
//                     key={i}
//                     className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
//                   >
//                     🟢 {u}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ================= CHAT AREA ================= */}
//             <div className="flex-1 flex flex-col p-4 md:p-6">

//               <div className="flex-1 overflow-y-auto space-y-4 pr-1">
//                 {messages.map((msg, i) => (
//                   <div
//                     key={i}
//                     className={`flex animate-fadeIn ${
//                       msg.name === displayName
//                         ? "justify-end"
//                         : "justify-start"
//                     }`}
//                   >
//                     <div
//                       className={`max-w-[75%] md:max-w-[60%]
//                       px-4 py-3 
//                       rounded-2xl 
//                       backdrop-blur-md 
//                       shadow-xl 
//                       ${
//                         msg.name === displayName
//                           ? "bg-gradient-to-r from-indigo-600 to-cyan-600"
//                           : "bg-white/10 border border-white/10"
//                       }`}
//                     >
//                       <p className="text-[10px] md:text-xs opacity-70 mb-1">
//                         {msg.name}
//                       </p>
//                       <p className="text-sm md:text-base break-words">
//                         {msg.text}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>

//               {typingUser && (
//                 <div className="text-xs text-cyan-400 mt-2 animate-pulse">
//                   {typingUser} is typing...
//                 </div>
//               )}

//               <form
//                 onSubmit={handleSend}
//                 className="flex gap-2 md:gap-3 mt-3 sticky bottom-0 pt-3"
//               >
//                 <input
//                   value={message}
//                   onChange={e => {
//                     setMessage(e.target.value)
//                     socket.emit("typing", { name: displayName })
//                   }}
//                   className="flex-1 px-4 py-3 rounded-xl bg-white/20 focus:ring-2 focus:ring-cyan-400 outline-none"
//                   placeholder="Type a message..."
//                 />
//                 <button
//                   className="px-4 md:px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:scale-105 transition"
//                 >
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

//   /* LOAD USER */
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

//   /* SOCKET */
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

//   /* SMART SCROLL */
//   useEffect(() => {
//     const container = chatContainerRef.current
//     if (!container) return
//     const isNearBottom =
//       container.scrollHeight - container.scrollTop - container.clientHeight < 120

//     if (isNearBottom) container.scrollTop = container.scrollHeight
//   }, [messages])

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
//   setMessage(prev => prev + emojiData.emoji)
// }


// return (
//   <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] via-[#0f1b4d] to-[#050816] text-white flex items-center justify-center p-4 md:p-8 transition-all duration-500">

//     <div className="w-full max-w-7xl h-[92vh] rounded-3xl backdrop-blur-xl bg-white/5 border border-blue-900/40 shadow-[0_0_60px_rgba(0,0,255,0.15)] flex overflow-hidden transition-all duration-500">

//       {!joined ? (
//         <div className="flex-1 flex items-center justify-center px-6">
//           <form
//             onSubmit={handleJoin}
//             className="space-y-6 w-full max-w-md bg-blue-950/40 p-10 rounded-3xl shadow-xl border border-blue-800/30 animate-fadeIn"
//           >
//             <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
//               SkillWrap Chat
//             </h1>

//             <p className="text-center text-sm tracking-wide">
//               {connected ? (
//                 <span className="text-green-400 animate-pulse">🟢 Connected</span>
//               ) : (
//                 <span className="text-red-400 animate-pulse">🔴 Connecting...</span>
//               )}
//             </p>

//             <input
//               value={username}
//               disabled
//               className="w-full p-3 rounded-xl bg-blue-900/40 border border-blue-800 focus:outline-none"
//             />

//             <input
//               placeholder="Enter Room Name"
//               value={room}
//               onChange={e => setRoom(e.target.value)}
//               className="w-full p-3 rounded-xl bg-blue-900/40 border border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//             />

//             <button className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-all duration-300 font-semibold shadow-lg">
//               Join Room
//             </button>
//           </form>
//         </div>
//       ) : (
//         <>
//           {/* SIDEBAR */}
//           <div className="hidden md:flex w-72 bg-blue-950/50 border-r border-blue-900/40 p-6 flex-col">

//             <h2 className="font-semibold text-lg mb-1">Room Members</h2>
//             <p className="text-sm text-blue-300 mb-6">
//               {userCount} Members
//             </p>

//             <div className="space-y-3 overflow-y-auto">
//               {roomUsers.map((u, i) => (
//                 <div
//                   key={i}
//                   className="px-4 py-2 rounded-xl bg-blue-900/40 hover:bg-blue-800/60 transition-all text-sm"
//                 >
//                   {u}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* CHAT AREA */}
//           <div className="flex-1 flex flex-col relative">

//             {/* HEADER */}
//             <div className="flex items-center justify-between px-6 py-4 border-b border-blue-900/40 bg-blue-950/60 backdrop-blur-xl">

//               <div>
//                 <h2 className="text-lg font-semibold tracking-wide">
//                   {room || "Exchange Room"}
//                 </h2>
//                 <p className="text-xs text-blue-300">
//                   {userCount} Members • Skill Exchange Active
//                 </p>
//               </div>

//               <div className="flex items-center gap-4">
//                 <button className="p-2 rounded-full bg-blue-900/40 hover:bg-blue-800 transition-all">
//                   <Phone size={18} />
//                 </button>
//                 <button className="p-2 rounded-full bg-blue-900/40 hover:bg-blue-800 transition-all">
//                   <Video size={18} />
//                 </button>
//               </div>
//             </div>

//             {/* MESSAGES */}
//             <div
//               ref={chatContainerRef}
//               className="flex-1 overflow-y-auto p-6 space-y-5 scroll-smooth"
//             >
//               {messages.map((msg, i) => {
//                 const isMe = msg.username === username
//                 const isImage = msg.text.startsWith("data:image")

//                 return (
//                   <div
//                     key={i}
//                     className={`flex animate-slideUp ${
//                       isMe ? "justify-end" : "justify-start"
//                     }`}
//                   >
//                     <div
//                       className={`max-w-[75%] p-4 rounded-2xl shadow-lg transition-all duration-300 ${
//                         isMe
//                           ? "bg-gradient-to-r from-blue-600 to-cyan-500"
//                           : "bg-blue-900/40 backdrop-blur-md border border-blue-800/40"
//                       }`}
//                     >
//                       {!isMe && (
//                         <p className="text-xs opacity-60 mb-1">
//                           {msg.username}
//                         </p>
//                       )}

//                       {isImage ? (
//                         <img
//                           src={msg.text}
//                           className="rounded-xl max-h-60 shadow-md"
//                         />
//                       ) : (
//                         <p className="leading-relaxed">{msg.text}</p>
//                       )}

//                       {msg.created_at && (
//                         <p className="text-[10px] opacity-40 mt-2 text-right">
//                           {new Date(msg.created_at).toLocaleTimeString()}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>

//             {typingUser && (
//               <div className="px-6 text-xs text-cyan-300 animate-pulse">
//                 {typingUser} is typing...
//               </div>
//             )}

//             {/* INPUT BAR */}
//             <form
//               onSubmit={handleSend}
//               className="relative p-4 bg-blue-950/60 backdrop-blur-xl border-t border-blue-900/40 flex gap-3 items-center"
//             >

//               {/* Emoji Picker */}
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setShowEmoji(!showEmoji)}
//                   className="p-3 rounded-full bg-blue-900/40 hover:bg-blue-800 transition-all"
//                 >
//                   <Smile size={18} />
//                 </button>

//                 {showEmoji && (
//                   <div className="absolute bottom-16 left-0 z-50">
//                     <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
//                   </div>
//                 )}
//               </div>

//               <input
//                 value={message}
//                 onChange={e => handleTyping(e.target.value)}
//                 className="flex-1 p-3 rounded-full bg-blue-900/40 border border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                 placeholder="Type a message..."
//               />

//               <label className="cursor-pointer bg-blue-800 hover:bg-blue-700 transition-all px-4 py-3 rounded-full">
//                 📷
//                 <input
//                   type="file"
//                   accept="image/*"
//                   hidden
//                   onChange={handleImageUpload}
//                 />
//               </label>

//               <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-all px-6 py-3 rounded-full font-semibold shadow-md">
//                 Send
//               </button>
//             </form>
//           </div>
//         </>
//       )}
//     </div>
//   </div>
// )


// }

























































"use client"

import EmojiPicker from "emoji-picker-react"
import { Phone, Video, Smile } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { socket } from "@/lib/socketClient"

interface Message {
  id?: number
  username: string
  text: string
  created_at?: string
}

export default function ChatPage() {
  const [connected, setConnected] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [joined, setJoined] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [typingUser, setTypingUser] = useState("")
  const [roomUsers, setRoomUsers] = useState<string[]>([])
  const [userCount, setUserCount] = useState(0)
  const [showEmoji, setShowEmoji] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const API_URL = "https://skillwrap-backend.onrender.com"

  /* ================= LOAD USER ================= */
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`${API_URL}/auth/profile`, {
        credentials: "include",
      })
      if (!res.ok) return
      const data = await res.json()
      setUserId(data.user.id)
      setUsername(data.user.username)
    }
    fetchUser()
  }, [])

  /* ================= SOCKET CONNECTION ================= */
  useEffect(() => {
    socket.connect()

    socket.on("connect", () => setConnected(true))
    socket.on("disconnect", () => setConnected(false))

    socket.on("previousMessages", (msgs: Message[]) => {
      setMessages(msgs)
    })

    socket.on("message", (msg: Message) => {
      setMessages(prev => [...prev, msg])
    })

    socket.on("typing", ({ name }) => {
      if (name === username) return
      setTypingUser(name)

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => {
        setTypingUser("")
      }, 2000)
    })

    socket.on("roomUsers", ({ users, count }) => {
      setRoomUsers(users)
      setUserCount(count)
    })

    return () => {
      socket.disconnect()
    }
  }, [username])

  /* ================= SMART SCROLL ================= */
  useEffect(() => {
    const container = chatContainerRef.current
    if (!container) return
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 120
    if (isNearBottom) container.scrollTop = container.scrollHeight
  }, [messages])

  /* ================= EVENT HANDLERS ================= */
  function handleJoin(e: React.FormEvent) {
    e.preventDefault()
    if (!room || !userId) return
    socket.emit("enterRoom", { roomName: room, userId })
    setJoined(true)
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    socket.emit("message", { text: message })
    setMessage("")
  }

  function handleTyping(value: string) {
    setMessage(value)
    socket.emit("typing", { name: username })
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      socket.emit("message", { text: reader.result })
    }
    reader.readAsDataURL(file)
  }

  function onEmojiClick(emojiData: any) {
    setMessage(prev => prev + emojiData.emoji)
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] via-[#0f1b4d] to-[#050816] text-white flex items-center justify-center p-4 md:p-8 transition-all duration-500">
      <div className="w-full max-w-7xl h-[92vh] rounded-3xl backdrop-blur-xl bg-white/5 border border-blue-900/40 shadow-[0_0_60px_rgba(0,0,255,0.15)] flex overflow-hidden transition-all duration-500">

        {!joined ? (
          <div className="flex-1 flex items-center justify-center px-6">
            <form
              onSubmit={handleJoin}
              className="space-y-6 w-full max-w-md bg-blue-950/40 p-10 rounded-3xl shadow-xl border border-blue-800/30 animate-fadeIn"
            >
              <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                SkillWrap Chat
              </h1>

              <p className="text-center text-sm tracking-wide">
                {connected ? (
                  <span className="text-green-400 animate-pulse">🟢 Connected</span>
                ) : (
                  <span className="text-red-400 animate-pulse">🔴 Connecting...</span>
                )}
              </p>

              <input
                value={username}
                disabled
                className="w-full p-3 rounded-xl bg-blue-900/40 border border-blue-800 focus:outline-none"
              />

              <input
                placeholder="Enter Room Name"
                value={room}
                onChange={e => setRoom(e.target.value)}
                className="w-full p-3 rounded-xl bg-blue-900/40 border border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />

              <button className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-all duration-300 font-semibold shadow-lg">
                Join Room
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* SIDEBAR */}
            <div className="hidden md:flex w-72 bg-blue-950/50 border-r border-blue-900/40 p-6 flex-col">
              <h2 className="font-semibold text-lg mb-1">Room Members</h2>
              <p className="text-sm text-blue-300 mb-6">{userCount} Members</p>
              <div className="space-y-3 overflow-y-auto">
                {roomUsers.map((u, i) => (
                  <div key={i} className="px-4 py-2 rounded-xl bg-blue-900/40 hover:bg-blue-800/60 transition-all text-sm">
                    {u}
                  </div>
                ))}
              </div>
            </div>

            {/* CHAT AREA */}
            <div className="flex-1 flex flex-col relative">

              {/* HEADER */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-blue-900/40 bg-blue-950/60 backdrop-blur-xl">
                <div>
                  <h2 className="text-lg font-semibold tracking-wide">{room || "Exchange Room"}</h2>
                  <p className="text-xs text-blue-300">{userCount} Members • Skill Exchange Active</p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="p-2 rounded-full bg-blue-900/40 hover:bg-blue-800 transition-all">
                    <Phone size={18} />
                  </button>
                  <button className="p-2 rounded-full bg-blue-900/40 hover:bg-blue-800 transition-all">
                    <Video size={18} />
                  </button>
                </div>
              </div>

              {/* MESSAGES */}
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-5 scroll-smooth">
                {messages.map((msg, i) => {
                  const isMe = msg.username === username
                  const isImage = msg.text.startsWith("data:image")
                  const isSystem = msg.username === "System"

                  return (
                    <div key={i} className={`flex ${isSystem ? "justify-center" : isMe ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] p-4 rounded-2xl shadow-lg transition-all duration-300 ${
                        isSystem
                          ? "bg-gray-700 text-yellow-300 italic"
                          : isMe
                            ? "bg-gradient-to-r from-blue-600 to-cyan-500"
                            : "bg-blue-900/40 backdrop-blur-md border border-blue-800/40"
                      }`}>
                        {!isMe && !isSystem && (
                          <p className="text-xs opacity-60 mb-1">{msg.username}</p>
                        )}

                        {isImage ? (
                          <img src={msg.text} className="rounded-xl max-h-60 shadow-md" />
                        ) : (
                          <p className={`${isSystem ? "text-center" : ""} leading-relaxed`}>{msg.text}</p>
                        )}

                        {msg.created_at && (
                          <p className="text-[10px] opacity-40 mt-2 text-right">{new Date(msg.created_at).toLocaleTimeString()}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {typingUser && (
                <div className="px-6 text-xs text-cyan-300 animate-pulse">{typingUser} is typing...</div>
              )}

              {/* INPUT BAR */}
              <form onSubmit={handleSend} className="relative p-4 bg-blue-950/60 backdrop-blur-xl border-t border-blue-900/40 flex gap-3 items-center">
                {/* Emoji Picker */}
                <div className="relative">
                  <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-3 rounded-full bg-blue-900/40 hover:bg-blue-800 transition-all">
                    <Smile size={18} />
                  </button>
                  {showEmoji && <div className="absolute bottom-16 left-0 z-50"><EmojiPicker onEmojiClick={onEmojiClick} /></div>}
                </div>

                <input value={message} onChange={e => handleTyping(e.target.value)} className="flex-1 p-3 rounded-full bg-blue-900/40 border border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Type a message..." />

                <label className="cursor-pointer bg-blue-800 hover:bg-blue-700 transition-all px-4 py-3 rounded-full">
                  📷
                  <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                </label>

                <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-all px-6 py-3 rounded-full font-semibold shadow-md">Send</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
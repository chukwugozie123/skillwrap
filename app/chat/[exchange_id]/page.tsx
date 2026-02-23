// // "use client";

// // import { useEffect, useState, useRef, useCallback } from "react";
// // import { useRouter, useParams } from "next/navigation";
// // import { socket } from "@/lib/socketClient";
// // import ChatForm from "@/components/chatComponent1/page";
// // import ChatMessage from "@/components/chatComponent2/page";

// // interface Message {
// //   sender: string;
// //   message: string;
// //   timestamp: string;
// //   system?: boolean;
// //   imageUrl?: string;
// // }

// // interface ExchangeDetails {
// //   exchange_id: number;
// //   from_user_id: number;
// //   from_username: string;
// //   to_user_id: number;
// //   to_username: string;
// //   skill_offered_title: string;
// //   skill_requested_title: string;
// //   exchange_status: string;
// //   status: string;
// //   created_at: string;
// // }

// // const API_URL = "https://skillwrap-backend.onrender.com";

// // export default function ChatPage() {
// //   const [room, setRoom] = useState("");
// //   const [joined, setJoined] = useState(false);
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [username, setUsername] = useState("");
// //   const [countdown, setCountdown] = useState("");
// //   const [quitPopup, setQuitPopup] = useState(false);
// //   const [exchange, setExchange] = useState<ExchangeDetails | null>(null);
// //   const [showDurationBtn, setShowDurationBtn] = useState(false);

// //   const [exchangeBlocked, setExchangeBlocked] = useState<{
// //     title: string;
// //     message: string;
// //   } | null>(null);

// //   const bottomRef = useRef<HTMLDivElement>(null);
// //   const countdownTimer = useRef<ReturnType<typeof setInterval> | null>(null);

// //   const router = useRouter();
// //   const params = useParams();
// //   const { exchange_id } = params as { exchange_id: string };

// //   const EXCHANGE_TIMER_KEY = `exchange_timer_${exchange_id}`;

// //   // ---------- Fetch exchange ----------
// //   useEffect(() => {
// //     const fetchExchange = async () => {
// //       try {
// //         const res = await fetch(`${API_URL}/exchange/${exchange_id}`, {
// //           credentials: "include",
// //         });
// //         if (!res.ok) throw new Error("Failed to fetch exchange");
// //         const data = await res.json();
// //         setExchange(data.exchange);
// //       } catch (err) {
// //         console.error(err);
// //         router.push("/dashboard");
// //       }
// //     };

// //     fetchExchange();
// //   }, [exchange_id, router]);

// //   // ---------- Load messages ----------
// //   useEffect(() => {
// //     if (!room) return;
// //     const stored = localStorage.getItem(`chatMessages_${room}`);
// //     if (stored) setMessages(JSON.parse(stored));
// //   }, [room]);

// //   const scrollToBottom = useCallback(() => {
// //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, []);

// //   const handleIncomingMessage = useCallback(
// //     (msg: Message) => {
// //       setMessages((prev) => {
// //         const updated = [...prev, msg];
// //         localStorage.setItem(`chatMessages_${room}`, JSON.stringify(updated));
// //         scrollToBottom();
// //         return updated;
// //       });
// //     },
// //     [room, scrollToBottom]
// //   );

// //   const handleUserJoined = useCallback(
// //     (data: { message: string; timestamp: string }) => {
// //       handleIncomingMessage({ ...data, sender: "system", system: true });
// //     },
// //     [handleIncomingMessage]
// //   );

// //   const handleUserLeft = useCallback(
// //     (data: { message: string; timestamp: string }) => {
// //       handleIncomingMessage({ ...data, sender: "system", system: true });
// //     },
// //     [handleIncomingMessage]
// //   );

// //   // ---------- Countdown ----------
// //   const startCountdown = useCallback(
// //     (startTimeISO: string, mins: number) => {
// //       const endTime = new Date(startTimeISO).getTime() + mins * 60000;

// //       if (countdownTimer.current) clearInterval(countdownTimer.current);

// //       countdownTimer.current = setInterval(async () => {
// //         const now = Date.now();
// //         const distance = endTime - now;

// //         if (distance <= 0) {
// //           clearInterval(countdownTimer.current!);
// //           setCountdown("00:00:00");

// //           await fetch(`${API_URL}/exchange/update-status`, {
// //             method: "PATCH",
// //             credentials: "include",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify({
// //               exchange_id,
// //               exchange_status: "completed",
// //             }),
// //           });

// //           localStorage.removeItem(EXCHANGE_TIMER_KEY);
// //           router.push(`/review/${exchange_id}`);
// //           return;
// //         }

// //         const h = Math.floor(distance / 3600000);
// //         const m = Math.floor((distance % 3600000) / 60000);
// //         const s = Math.floor((distance % 60000) / 1000);

// //         setCountdown(
// //           `${String(h).padStart(2, "0")}:${String(m).padStart(
// //             2,
// //             "0"
// //           )}:${String(s).padStart(2, "0")}`
// //         );
// //       }, 1000);
// //     },
// //     [exchange_id, router, EXCHANGE_TIMER_KEY]
// //   );

// //   const handleStartExchange = useCallback(
// //     (data: { startTime: string; duration: number }) => {
// //       localStorage.setItem(EXCHANGE_TIMER_KEY, JSON.stringify(data));
// //       startCountdown(data.startTime, data.duration);
// //       setShowDurationBtn(false);
// //     },
// //     [startCountdown, EXCHANGE_TIMER_KEY]
// //   );

// //   // ✅✅✅ ADDED FUNCTION (ONLY FIX)
// //   const handleSetDuration = () => {
// //     const input = prompt("Enter exchange duration (in minutes):");
// //     if (!input) return;

// //     const duration = Number(input);
// //     if (isNaN(duration) || duration <= 0) {
// //       alert("Please enter a valid number of minutes");
// //       return;
// //     }

// //     const startTime = new Date().toISOString();
// //     const payload = { startTime, duration };

// //     socket.emit("start_exchange", payload);
// //     localStorage.setItem(EXCHANGE_TIMER_KEY, JSON.stringify(payload));
// //     startCountdown(startTime, duration);
// //     setShowDurationBtn(false);
// //   };
// //   // ✅ END FIX

// //   useEffect(() => {
// //     if (!room) return;

// //     socket.on("message", handleIncomingMessage);
// //     socket.on("user_joined", handleUserJoined);
// //     socket.on("user_left", handleUserLeft);
// //     socket.on("start_exchange", handleStartExchange);

// //     const saved = localStorage.getItem(EXCHANGE_TIMER_KEY);
// //     if (saved) {
// //       const { startTime, duration } = JSON.parse(saved);
// //       startCountdown(startTime, duration);
// //       setShowDurationBtn(false);
// //     } else {
// //       setShowDurationBtn(true);
// //     }

// //     return () => {
// //       socket.off("message", handleIncomingMessage);
// //       socket.off("user_joined", handleUserJoined);
// //       socket.off("user_left", handleUserLeft);
// //       socket.off("start_exchange", handleStartExchange);
// //       if (countdownTimer.current) clearInterval(countdownTimer.current);
// //     };
// //   }, [
// //     room,
// //     handleIncomingMessage,
// //     handleUserJoined,
// //     handleUserLeft,
// //     handleStartExchange,
// //     startCountdown,
// //     EXCHANGE_TIMER_KEY,
// //   ]);

// //   // ---------- Join ----------
// //   const handleJoin = () => {
// //     if (!username || !room || !exchange) return;

// //     if (
// //       exchange.exchange_status === "completed" ||
// //       exchange.exchange_status === "cancelled"
// //     ) {
// //       setExchangeBlocked({
// //         title:
// //           exchange.exchange_status === "completed"
// //             ? "Exchange Completed"
// //             : "Exchange Cancelled",
// //         message:
// //           exchange.exchange_status === "completed"
// //             ? "This skill exchange has already been completed."
// //             : "This skill exchange was cancelled earlier.",
// //       });
// //       return;
// //     }

// //     if (
// //       username !== exchange.from_username &&
// //       username !== exchange.to_username
// //     ) {
// //       alert("You’re not eligible to join this exchange.");
// //       return;
// //     }

// //     socket.emit("join-room", { username, room });
// //     setJoined(true);
// //   };

// //   const handleMessage = (msg: string, imageUrl?: string) => {
// //     if (!msg.trim() && !imageUrl) return;

// //     const data: Message = {
// //       sender: username,
// //       message: msg,
// //       timestamp: new Date().toISOString(),
// //       imageUrl,
// //     };

// //     handleIncomingMessage(data);
// //     socket.emit("message", { ...data, room });
// //   };

// //   const confirmQuit = async () => {
// //     await fetch(`${API_URL}/exchange/update-status`, {
// //       method: "PATCH",
// //       credentials: "include",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         exchange_id,
// //         exchange_status: "cancelled",
// //       }),
// //     });

// //     localStorage.removeItem(EXCHANGE_TIMER_KEY);
// //     localStorage.removeItem(`chatMessages_${room}`);
// //     socket.emit("leave-room", room);
// //     router.push(`/review/${exchange_id}`);
// //   };

// //   return (
// //     <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#0c0e1a] via-[#1a1f38] to-[#2e2b5c] text-white pt-20 px-2 sm:px-4">
// //             {/* 🔙 GO BACK BUTTON */}
// //       <div className="flex items-center mb-6">
// //         <button
// //           onClick={() => router.back()}
// //           className="flex items-center gap-2 px-4 py-2 rounded-xl 
// //           bg-white/10 border border-white/20 backdrop-blur-md
// //           text-sm font-medium hover:bg-white/20 hover:scale-105 
// //           transition-all duration-300"
// //         >
// //           ← Go Back
// //         </button>
// //       </div>
// //       {!joined ? (
// //         <div className="w-full max-w-md bg-white/5 p-8 rounded-3xl">
// //           <input
// //             value={username}
// //             onChange={(e) => setUsername(e.target.value)}
// //             placeholder="Username"
// //             className="w-full mb-4 p-3 rounded-xl bg-white/10"
// //           />
// //           <input
// //             value={room}
// //             onChange={(e) => setRoom(e.target.value)}
// //             placeholder="Room"
// //             className="w-full mb-6 p-3 rounded-xl bg-white/10"
// //           />
// //           <button
// //             onClick={handleJoin}
// //             className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
// //           >
// //             Enter Chat
// //           </button>
// //         </div>
// //       ) : (
// //         <div className="w-full max-w-3xl h-[85vh] flex flex-col bg-white/10 rounded-3xl">
// //           <div className="p-4 border-b border-white/20 space-y-2">
// //             <p className="text-lg font-bold">Room: {room}</p>

// //             {countdown && exchange && (
// //               <div className="flex flex-wrap gap-2">
// //                 <span className="px-3 py-1 bg-green-500/30 rounded-full text-sm">
// //                   Offering: {exchange.skill_offered_title}
// //                 </span>
// //                 <span className="px-3 py-1 bg-pink-500/30 rounded-full text-sm">
// //                   Requesting: {exchange.skill_requested_title}
// //                 </span>
// //               </div>
// //             )}

// //             {countdown && (
// //               <p className="text-yellow-400 font-bold">{countdown}</p>
// //             )}

// //             {showDurationBtn && !countdown && (
// //               <button
// //                 onClick={handleSetDuration}
// //                 className="px-4 py-2 bg-green-600 rounded-xl"
// //               >
// //                 Set Duration
// //               </button>
// //             )}

// //             {countdown && (
// //               <button
// //                 onClick={() => setQuitPopup(true)}
// //                 className="px-4 py-2 bg-red-600 rounded-xl"
// //               >
// //                 Quit Exchange
// //               </button>
// //             )}
// //           </div>

// //           <div className="flex-1 overflow-y-auto p-4">
// //             {messages.map((m, i) => (
// //               <ChatMessage
// //                 key={i}
// //                 sender={m.sender}
// //                 message={m.message}
// //                 timestamp={m.timestamp}
// //                 isOwnMessage={m.sender === username}
// //                 imageUrl={m.imageUrl}
// //               />
// //             ))}
// //             <div ref={bottomRef} />
// //           </div>

// //           <div className="p-4 border-t border-white/20">
// //             <ChatForm onSendMessage={handleMessage} />
// //           </div>
// //         </div>
// //       )}

// //       {/* 🚫 EXCHANGE BLOCKED POPUP */}
// //       {exchangeBlocked && (
// //         <div className="fixed inset-0 bg-black/80 flex items-center justify-center px-4">
// //           <div className="max-w-md w-full bg-[#0f172a] rounded-2xl p-6 text-center border border-yellow-500/30 shadow-xl">
// //             <h2 className="text-xl font-bold text-yellow-400 mb-3">
// //               {exchangeBlocked.title}
// //             </h2>
// //             <p className="text-gray-300 text-sm leading-relaxed mb-6">
// //               {exchangeBlocked.message}
// //             </p>
// //             <button
// //               onClick={() => router.push("/dashboard")}
// //               className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
// //             >
// //               Go to Dashboard
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* ❗ QUIT POPUP */}
// //       {quitPopup && (
// //         <div className="fixed inset-0 bg-black/80 flex items-center justify-center px-4">
// //           <div className="max-w-md w-full bg-[#111827] border border-red-500/30 rounded-2xl p-6 text-center shadow-xl">
// //             <h2 className="text-xl font-bold text-red-400 mb-3">
// //               Quit Skill Exchange?
// //             </h2>
// //             <p className="text-gray-300 mb-5 text-sm leading-relaxed">
// //               Leaving now will cancel this exchange and may affect your rating.
// //             </p>
// //             <div className="flex gap-3 justify-center">
// //               <button
// //                 onClick={() => setQuitPopup(false)}
// //                 className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-700"
// //               >
// //                 Stay
// //               </button>
// //               <button
// //                 onClick={confirmQuit}
// //                 className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700"
// //               >
// //                 Quit & Review
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );

// // }







































// "use client"

// import EmojiPicker from "emoji-picker-react"
// import { Phone, Video, Smile } from "lucide-react"
// import { useEffect, useRef, useState } from "react"
// import { useParams } from "next/navigation"
// import { socket } from "@/lib/socketClient"

// interface Message {
//   id?: number
//   username: string
//   text: string
//   created_at?: string
// }

// interface Exchange {
//   exchange_id: number
//   from_user_id: number
//   to_user_id: number
//   from_username: string
//   to_username: string
//   skill_offered_title: string
//   skill_requested_title: string
//   exchange_status: string
//   status: string
//   created_at: string
//   mode?: string
//   note?: string
// }

// export default function ChatPage() {
//   const params = useParams()
//   const { exchange_id } = params as { exchange_id: string }

//   const API_URL = "https://skillwrap-backend.onrender.com"

//   const [connected, setConnected] = useState(false)
//   const [userId, setUserId] = useState<number | null>(null)
//   const [username, setUsername] = useState("")
//   const [message, setMessage] = useState("")
//   const [messages, setMessages] = useState<Message[]>([])
//   const [typingUser, setTypingUser] = useState("")
//   const [roomUsers, setRoomUsers] = useState<string[]>([])
//   const [userCount, setUserCount] = useState(0)
//   const [showEmoji, setShowEmoji] = useState(false)
//   const [exchange, setExchange] = useState<Exchange | null>(null)

//   const chatContainerRef = useRef<HTMLDivElement>(null)
//   const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

//   const room = exchange_id

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

//   /* ================= LOAD EXCHANGE ================= */
//   useEffect(() => {
//     async function fetchExchange() {
//       if (!exchange_id) return

//       const res = await fetch(`https://skillwrap-backend.onrender.com/exchange/${exchange_id}`, {
//   credentials: "include",
// })

      
//       if (!res.ok) return
//       const data = await res.json()
//       setExchange(data.exchange)
//     }

//     fetchExchange()
//   }, [exchange_id])

// /* ================= SOCKET ================= */
// useEffect(() => {
//   if (!userId || !room) return

//   socket.connect()

//   socket.on("connect", () => {
//     setConnected(true)

//     // 🔥 FIX: use roomId not roomName
//     socket.emit("enterRoom", {
//       roomId: room,   // 👈 FIXED
//       userId,
//     })
//   })

//   socket.on("disconnect", () => setConnected(false))

//   socket.on("previousMessages", (msgs: Message[]) => {
//     setMessages(msgs)
//   })

//   socket.on("message", (msg: Message) => {
//     setMessages(prev => [...prev, msg])
//   })

//   socket.on("typing", ({ name }) => {
//     if (name === username) return
//     setTypingUser(name)

//     if (typingTimeoutRef.current)
//       clearTimeout(typingTimeoutRef.current)

//     typingTimeoutRef.current = setTimeout(() => {
//       setTypingUser("")
//     }, 2000)
//   })

//   socket.on("roomUsers", ({ users, count }) => {
//     setRoomUsers(users)
//     setUserCount(count)
//   })

//   return () => {
//     socket.disconnect()
//   }
// }, [userId, room, username])

//   /* ================= AUTO SCROLL ================= */
//   useEffect(() => {
//     const container = chatContainerRef.current
//     if (!container) return
//     container.scrollTop = container.scrollHeight
//   }, [messages])

//   /* ================= SEND MESSAGE ================= */
//   function handleSend(e: React.FormEvent) {
//     e.preventDefault()
//     if (!message.trim()) return


// socket.emit("message", {
//   text: message,
// })

//     setMessage("")
//   }

//   function handleTyping(value: string) {
//     setMessage(value)
//     socket.emit("typing", {
//       name: username,
//     })
//   }

//   function handleImageUpload(
//     e: React.ChangeEvent<HTMLInputElement>
//   ) {
//     const file = e.target.files?.[0]
//     if (!file) return

//     const reader = new FileReader()
//     reader.onloadend = () => {
//       socket.emit("message", {
//         text: reader.result,
//       })
//     }
//     reader.readAsDataURL(file)
//   }

//   function onEmojiClick(emojiData: any) {
//     setMessage(prev => prev + emojiData.emoji)
//   }

//   const isActive = exchange?.exchange_status === "in progress"

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] via-[#0f1b4d] to-[#050816] text-white flex items-center justify-center p-4">
//       <div className="w-full max-w-7xl h-[92vh] rounded-3xl bg-white/5 border border-blue-900/40 flex overflow-hidden">

//         {/* SIDEBAR */}
//         <div className="hidden md:flex w-72 bg-blue-950/50 border-r border-blue-900/40 p-6 flex-col">
//           <h2 className="font-semibold text-lg mb-1">
//             Participants
//           </h2>
//           <p className="text-sm text-blue-300 mb-6">
//             {userCount} Online
//           </p>

//           {roomUsers.map((u, i) => (
//             <div
//               key={i}
//               className="px-4 py-2 rounded-xl bg-blue-900/40 text-sm"
//             >
//               {u}
//             </div>
//           ))}
//         </div>

//         {/* CHAT AREA */}
//         <div className="flex-1 flex flex-col">

//           {/* HEADER */}
//           <div className="px-6 py-5 border-b border-blue-900/40 bg-blue-950/60 space-y-4">

//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-xl font-bold">
//                   Skill Exchange #{exchange?.exchange_id}
//                 </h2>

//                 {exchange && (
//                   <p className="text-sm text-blue-300">
//                     {exchange.from_username} ↔{" "}
//                     {exchange.to_username}
//                   </p>
//                 )}

//                 <p className="text-xs text-gray-400">
//                   You are: {username}
//                 </p>
//               </div>

//               {exchange && (
//                 <span
//                   className={`px-4 py-1 text-xs rounded-full font-semibold ${
//                     exchange.exchange_status ===
//                     "in progress"
//                       ? "bg-green-500/20 text-green-400 border border-green-500/40"
//                       : exchange.exchange_status ===
//                         "completed"
//                       ? "bg-purple-500/20 text-purple-400 border border-purple-500/40"
//                       : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
//                   }`}
//                 >
//                   {exchange.exchange_status}
//                 </span>
//               )}
//             </div>

//             {exchange && (
//               <div className="bg-blue-900/40 border border-blue-800/40 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

//                 <div>
//                   <p className="text-xs text-blue-300">
//                     Skill Offered
//                   </p>
//                   <p className="font-semibold text-lg">
//                     {exchange.skill_offered_title}
//                   </p>
//                 </div>

//                 <div className="text-2xl text-cyan-400 font-bold">
//                   ⇄
//                 </div>

//                 <div>
//                   <p className="text-xs text-blue-300">
//                     Skill Requested
//                   </p>
//                   <p className="font-semibold text-lg">
//                     {exchange.skill_requested_title}
//                   </p>
//                 </div>

//                 {exchange.note && (
//                   <div className="text-xs text-gray-300">
//                     Note: {exchange.note}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* MESSAGES */}
//           <div
//             ref={chatContainerRef}
//             className="flex-1 overflow-y-auto p-6 space-y-4"
//           >
//             {messages.map((msg, i) => {
//               const isMe = msg.username === username
//               const isImage =
//                 typeof msg.text === "string" &&
//                 msg.text.startsWith("data:image")

//               return (
//                 <div
//                   key={i}
//                   className={`flex ${
//                     isMe
//                       ? "justify-end"
//                       : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-[70%] p-4 rounded-2xl ${
//                       isMe
//                         ? "bg-gradient-to-r from-blue-600 to-cyan-500"
//                         : "bg-blue-900/40 border border-blue-800/40"
//                     }`}
//                   >
//                     {!isMe && (
//                       <p className="text-xs opacity-60 mb-1">
//                         {msg.username}
//                       </p>
//                     )}

//                     {isImage ? (
//                       <img
//                         src={msg.text}
//                         className="rounded-xl max-h-60"
//                       />
//                     ) : (
//                       <p>{msg.text}</p>
//                     )}

//                     {msg.created_at && (
//                       <p className="text-[10px] opacity-40 mt-2 text-right">
//                         {new Date(
//                           msg.created_at
//                         ).toLocaleTimeString()}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               )
//             })}
//           </div>

//           {typingUser && (
//             <div className="px-6 text-xs text-cyan-300">
//               {typingUser} is typing...
//             </div>
//           )}

//           {/* INPUT */}
//           <form
//             onSubmit={handleSend}
//             className="p-4 bg-blue-950/60 border-t border-blue-900/40 flex gap-3 items-center"
//           >
//             <button
//               type="button"
//               onClick={() =>
//                 setShowEmoji(!showEmoji)
//               }
//               className="p-3 rounded-full bg-blue-900/40"
//               disabled={!isActive}
//             >
//               <Smile size={18} />
//             </button>

//             {showEmoji && isActive && (
//               <div className="absolute bottom-24 left-6 z-50">
//                 <EmojiPicker
//                   onEmojiClick={onEmojiClick}
//                 />
//               </div>
//             )}

//             <input
//               value={message}
//               disabled={!isActive}
//               onChange={e =>
//                 handleTyping(e.target.value)
//               }
//               className="flex-1 p-3 rounded-full bg-blue-900/40 border border-blue-800 focus:outline-none disabled:opacity-40"
//               placeholder={
//                 isActive
//                   ? "Type a message..."
//                   : "Exchange is not active"
//               }
//             />

//             <label
//               className="cursor-pointer bg-blue-800 px-4 py-3 rounded-full disabled:opacity-40"
//             >
//               📷
//               <input
//                 type="file"
//                 hidden
//                 onChange={handleImageUpload}
//                 disabled={!isActive}
//               />
//             </label>

//             <button
//               disabled={!isActive}
//               className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 rounded-full disabled:opacity-40"
//             >
//               Send
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }


























































"use client";

import EmojiPicker from "emoji-picker-react";
import { Phone, Video, Smile, Menu, X, Paperclip } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { socket } from "@/lib/socketClient";
import AttachmentPopup from "./AttachmentPopup";

interface Message {
  id?: number;
  username: string;
  text: string;
  created_at?: string;
}

interface Exchange {
  exchange_id: number;
  from_user_id: number;
  to_user_id: number;
  from_username: string;
  to_username: string;
  skill_offered_title: string;
  skill_requested_title: string;
  exchange_status: string;
  status: string;
  created_at: string;
  note?: string;
}

export default function ChatPage() {
  const params = useParams();
  const { exchange_id } = params as { exchange_id: string };
  const API_URL = "https://skillwrap-backend.onrender.com";

  const [connected, setConnected] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUser, setTypingUser] = useState("");
  const [roomUsers, setRoomUsers] = useState<string[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);
  const [exchange, setExchange] = useState<Exchange | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAttachmentPopup, setShowAttachmentPopup] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const room = exchange_id;
  const isActive = exchange?.exchange_status === "in progress";

  // USER LOAD
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`${API_URL}/auth/profile`, { credentials: "include" });
      if (!res.ok) return;
      const data = await res.json();
      setUserId(data.user.id);
      setUsername(data.user.username);
    }
    fetchUser();
  }, []);

  // EXCHANGE LOAD
  useEffect(() => {
    if (!exchange_id) return;
    async function fetchExchange() {
      const res = await fetch(`${API_URL}/exchange/${exchange_id}`, { credentials: "include" });
      if (!res.ok) return;
      const data = await res.json();
      setExchange(data.exchange);
    }
    fetchExchange();
  }, [exchange_id]);

  // SOCKET
  useEffect(() => {
    if (!userId || !room) return;
    socket.connect();
    socket.on("connect", () => {
      setConnected(true);
      socket.emit("enterRoom", { roomId: room, userId });
    });
    socket.on("disconnect", () => setConnected(false));
    socket.on("previousMessages", (msgs: Message[]) => setMessages(msgs));
    socket.on("message", (msg: Message) => setMessages(prev => [...prev, msg]));
    socket.on("typing", ({ name }) => {
      if (name === username) return;
      setTypingUser(name);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => setTypingUser(""), 2000);
    });
    socket.on("roomUsers", ({ users, count }) => {
      setRoomUsers(users);
      setUserCount(count);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("previousMessages");
      socket.off("message");
      socket.off("typing");
      socket.off("roomUsers");
      socket.disconnect();
    };
  }, [userId, room, username]);

  // AUTO SCROLL
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages]);

  // SEND MESSAGE
  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit("message", { text: message });
    setMessage("");
  }

  function handleTyping(value: string) {
    setMessage(value);
    socket.emit("typing", { name: username });
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => socket.emit("message", { text: reader.result });
    reader.readAsDataURL(file);
  }

  function onEmojiClick(emojiData: any) {
    setMessage(prev => prev + emojiData.emoji);
  }

  const handleAttachmentSubmit = (data: any) => {
    socket.emit("message", { text: `Attachment: ${JSON.stringify(data)}` });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1b3d] via-[#142f5e] to-[#050816] text-white flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <div
        className={`fixed md:relative z-50 top-0 left-0 h-full w-72 bg-blue-950/60 border-r border-blue-900/50 p-6 flex flex-col transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300`}
      >
        <div className="flex justify-between md:hidden mb-4">
          <h2 className="text-lg font-bold">Participants</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <h2 className="font-semibold text-lg mb-1">Participants</h2>
        <p className="text-sm text-cyan-400 mb-4">{userCount} Online</p>
        {roomUsers.map((u, i) => (
          <div key={i} className="px-4 py-2 rounded-xl bg-blue-900/40 text-sm mb-1 truncate">{u}</div>
        ))}

        {exchange && (
          <div className="mt-6 border-t border-blue-800/40 pt-4 space-y-2 text-gray-300 text-sm">
            <p>Exchange ID: {exchange.exchange_id}</p>
            <p>Status: {exchange.exchange_status}</p>
            <p>Skill Offered: {exchange.skill_offered_title}</p>
            <p>Skill Requested: {exchange.skill_requested_title}</p>
            {exchange.note && <p>Note: {exchange.note}</p>}
          </div>
        )}
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col md:ml-72">
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-blue-900/40 bg-blue-950/60 flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
          <div className="overflow-hidden">
            <h2 className="text-xl font-bold truncate">Skill Exchange #{exchange?.exchange_id}</h2>
            {exchange && (
              <p className="text-sm text-cyan-300 truncate">{exchange.from_username} ↔ {exchange.to_username}</p>
            )}
            <p className="text-xs text-gray-400 truncate">You are: {username}</p>
          </div>

          {exchange && (
            <span className={`px-4 py-1 text-xs rounded-full font-semibold ${exchange.exchange_status === "in progress" ? "bg-green-500/20 text-green-400 border border-green-500/40" : exchange.exchange_status === "completed" ? "bg-purple-500/20 text-purple-400 border border-purple-500/40" : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"}`}>
              {exchange.exchange_status}
            </span>
          )}
        </div>

        {/* MESSAGES */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((msg, i) => {
            const isMe = msg.username === username;
            const isImage = typeof msg.text === "string" && msg.text.startsWith("data:image");

            return (
              <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] p-4 rounded-2xl break-words ${isMe ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-black shadow-lg" : "bg-blue-900/40 border border-blue-800/40 text-white"}`}>
                  {!isMe && <p className="text-xs opacity-60 mb-1 truncate">{msg.username}</p>}
                  {isImage ? <img src={msg.text} className="rounded-xl max-h-60" /> : <p className="break-words">{msg.text}</p>}
                  {msg.created_at && <p className="text-[10px] opacity-40 mt-2 text-right">{new Date(msg.created_at).toLocaleTimeString()}</p>}
                </div>
              </div>
            );
          })}
        </div>

        {typingUser && <div className="px-6 text-xs text-cyan-300">{typingUser} is typing...</div>}

        {/* INPUT & ATTACHMENT */}
        <div className="p-4 bg-blue-950/60 border-t border-blue-900/40 flex flex-col md:flex-row gap-3 relative">
          <button
            type="button"
            onClick={() => setShowAttachmentPopup(true)}
            className="flex items-center gap-2 bg-cyan-600/20 hover:bg-cyan-500/30 px-4 py-2 rounded-2xl transition text-sm font-semibold"
            disabled={!isActive}
          >
            <Paperclip size={16} /> Set Attachment
          </button>

          <form onSubmit={handleSend} className="flex-1 flex gap-3 items-center">
            <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-3 rounded-full bg-blue-900/40" disabled={!isActive}>
              <Smile size={18} />
            </button>
            {showEmoji && isActive && <div className="absolute bottom-24 left-4 z-50"><EmojiPicker onEmojiClick={onEmojiClick} /></div>}

            <input
              value={message}
              disabled={!isActive}
              onChange={e => handleTyping(e.target.value)}
              className="flex-1 p-3 rounded-full bg-blue-900/40 border border-blue-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition placeholder-gray-400 min-w-0"
              placeholder={isActive ? "Type a message..." : "Exchange is not active"}
            />

            <label className="cursor-pointer bg-blue-800/40 px-4 py-3 rounded-full hover:bg-blue-800/60 transition disabled:opacity-40">
              📷
              <input type="file" hidden onChange={handleImageUpload} disabled={!isActive} />
            </label>

            <button type="submit" disabled={!isActive} className="bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 rounded-full hover:opacity-90 transition disabled:opacity-50">
              Send
            </button>
          </form>
        </div>
      </div>

      {/* POPUP */}
      {showAttachmentPopup && <AttachmentPopup onClose={() => setShowAttachmentPopup(false)} onSubmit={handleAttachmentSubmit} />}
    </div>
  );
}
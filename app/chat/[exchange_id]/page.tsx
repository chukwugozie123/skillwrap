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





































// "use client";

// import EmojiPicker from "emoji-picker-react";
// import { Smile, X, Paperclip } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { useParams } from "next/navigation";
// import { socket } from "@/lib/socketClient";
// import AttachmentPopup from "./AttachmentPopup";

// interface Message {
//   id?: number;
//   username: string;
//   text: string;
//   created_at?: string;
// }

// interface Exchange {
//   exchange_id: number;
//   from_username: string;
//   to_username: string;
//   skill_offered_title: string;
//   skill_requested_title: string;
//   exchange_status: string;
//   note?: string;
// }

// interface Attachment {
//   duration: number;
//   intensity: string;
//   steps: number;
//   goal: string;
//   rules: string;
// }

// export default function ChatPage() {
//   const params = useParams();
//   const { exchange_id } = params as { exchange_id: string };

//   // const API_URL = "https://skillwrap-backend.onrender.com";
//     const API_URL = "http://localhost:4000";

//   const [userId, setUserId] = useState<number | null>(null);
//   const [username, setUsername] = useState("");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [exchange, setExchange] = useState<Exchange | null>(null);
//   const [attachment, setAttachment] = useState<Attachment | null>(null);
//   const [showAttachmentPopup, setShowAttachmentPopup] = useState(false);
//   const [showEmoji, setShowEmoji] = useState(false);

//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   const room = exchange_id;
//   const isActive = exchange?.exchange_status === "in progress";

//   /* ================= LOAD USER ================= */
//   useEffect(() => {
//     async function fetchUser() {
//       const res = await fetch(`${API_URL}/auth/profile`, {
//         credentials: "include",
//       });
//       if (!res.ok) return;
//       const data = await res.json();
//       setUserId(data.user.id);
//       setUsername(data.user.username);
//     }
//     fetchUser();
//   }, []);

//   /* ================= LOAD EXCHANGE ================= */
//   useEffect(() => {
//     if (!exchange_id) return;

//     async function fetchExchange() {
//       const res = await fetch(`${API_URL}/exchange/${exchange_id}`, {
//         credentials: "include",
//       });
//       if (!res.ok) return;
//       const data = await res.json();
//       console.log(data.exchange)
//       setExchange(data.exchange);
//     }
//     fetchExchange();
//   }, [exchange_id]);

//   /* ================= LOAD ATTACHMENT ================= */
//   useEffect(() => {
//     if (!exchange_id) return;

//     async function fetchAttachment() {
//       const res = await fetch(
//         `${API_URL}/user/attachment/${exchange_id}`,
//         {
//           credentials: "include",
//         }
//       );

//       if (!res.ok) return;

//       const data = await res.json();

//       if (data.success && data.attachment) {
//         console.log("Attachment loaded:", data.attachment);
//         setAttachment(data.attachment);
//       }
//     }

//     fetchAttachment();
//   }, [exchange_id]);

//   /* ================= SOCKET ================= */
//   useEffect(() => {
//     if (!userId || !room) return;

//     socket.connect();

//     socket.on("connect", () => {
//       socket.emit("enterRoom", { roomId: room, userId });
//     });

//     socket.on("previousMessages", (msgs: Message[]) => {
//       setMessages(msgs);
//     });

//     socket.on("message", (msg: Message) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, room]);

//   /* ================= AUTO SCROLL ================= */
//   useEffect(() => {
//     const container = chatContainerRef.current;
//     if (!container) return;
//     container.scrollTop = container.scrollHeight;
//   }, [messages]);

//   /* ================= SEND MESSAGE ================= */
//   function handleSend(e: React.FormEvent) {
//     e.preventDefault();
//     if (!message.trim()) return;

//     socket.emit("message", { text: message });
//     setMessage("");
//   }

//   /* ================= HANDLE ATTACHMENT SUBMIT ================= */
//   const handleAttachmentSubmit = async (data: any) => {
//     console.log("Submitting attachment:", data);

//     try {
//       const res = await fetch(`${API_URL}/user/set/attachment`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           ...data,
//           exchange_id,
//         }),
//       });

//       const response = await res.json();

//       console.log(exchange_id, 'checking id')
//       console.log("Backend response:", response);

//       if (!response.success) {
//         alert("Failed to set attachment");
//         return;
//       }

//       setAttachment(data);
//       setShowAttachmentPopup(false);
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f1b3d] via-[#142f5e] to-[#050816] text-white flex">

//       {/* SIDEBAR */}
//       <div className="w-80 hidden md:flex flex-col bg-blue-950/60 border-r border-blue-900/50 p-6 space-y-6">

//         <h2 className="text-xl font-bold">Exchange Info</h2>

//         {exchange && (
//           <div className="space-y-2 text-sm text-gray-300">
//             <p><strong>ID:</strong> {exchange.exchange_id}</p>
//             <p><strong>Status:</strong> {exchange.exchange_status}</p>
//             <p><strong>Offered:</strong> {exchange.skill_offered_title}</p>
//             <p><strong>Requested:</strong> {exchange.skill_requested_title}</p>
//           </div>
//         )}

//         {/* ATTACHMENT DISPLAY */}
//         {attachment ? (
//           <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-5 rounded-2xl border border-cyan-500/40 space-y-3 shadow-lg">
//             <h3 className="text-lg font-semibold text-cyan-300">
//               Session Plan
//             </h3>
//             <p><strong>Duration:</strong> {attachment.duration} mins</p>
//             <p><strong>Intensity:</strong> {attachment.intensity}</p>
//             <p><strong>Steps:</strong> {attachment.steps}</p>
//             <p><strong>Goal:</strong> {attachment.goal}</p>
//             {attachment.rules && (
//               <p><strong>Rules:</strong> {attachment.rules}</p>
//             )}
//           </div>
//         ) : (
//           isActive && (
//             <button
//               onClick={() => setShowAttachmentPopup(true)}
//               className="flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 transition px-4 py-3 rounded-xl font-semibold"
//             >
//               <Paperclip size={16} /> Set Session Plan
//             </button>
//           )
//         )}
//       </div>

//       {/* CHAT AREA */}
//       <div className="flex-1 flex flex-col">

//         {/* MESSAGES */}
//         <div
//           ref={chatContainerRef}
//           className="flex-1 overflow-y-auto p-6 space-y-4"
//         >
//           {messages.map((msg, i) => {
//             const isMe = msg.username === username;
//             return (
//               <div
//                 key={i}
//                 className={`flex ${
//                   isMe ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`max-w-[70%] p-4 rounded-2xl ${
//                     isMe
//                       ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-black"
//                       : "bg-blue-900/40 border border-blue-800/40"
//                   }`}
//                 >
//                   <p>{msg.text}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* INPUT */}
//         <form
//           onSubmit={handleSend}
//           className="p-4 border-t border-blue-900/40 flex gap-3"
//         >
//           <button
//             type="button"
//             onClick={() => setShowEmoji(!showEmoji)}
//             className="p-3 rounded-full bg-blue-900/40"
//           >
//             <Smile size={18} />
//           </button>

//           {showEmoji && (
//             <div className="absolute bottom-24 left-6">
//               <EmojiPicker
//                 onEmojiClick={(e) =>
//                   setMessage((prev) => prev + e.emoji)
//                 }
//               />
//             </div>
//           )}

//           <input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="flex-1 p-3 rounded-full bg-blue-900/40 border border-blue-800 focus:outline-none"
//             placeholder="Type a message..."
//           />

//           <button className="bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 rounded-full">
//             Send
//           </button>
//         </form>
//       </div>

//       {showAttachmentPopup && (
//         <AttachmentPopup
//           onClose={() => setShowAttachmentPopup(false)}
//           onSubmit={handleAttachmentSubmit}
//         />
//       )}
//     </div>
//   );
// }



























































// "use client";

// import EmojiPicker from "emoji-picker-react";
// import { Smile, Paperclip } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { socket } from "@/lib/socketClient";
// import AttachmentPopup from "./AttachmentPopup";

// interface Message {
//   id?: number;
//   username: string;
//   text: string;
//   created_at?: string;
// }

// interface Exchange {
//   exchange_id: number;
//   from_username: string;
//   to_username: string;
//   skill_offered_title: string;
//   skill_requested_title: string;
//   exchange_status: string;
//   created_at?: string;
// }

// interface Attachment {
//   duration: number;
//   intensity: string;
//   steps: number;
//   goal: string;
//   rules: string;
// }

// export default function ChatPage() {
//   const params = useParams();
//   const router = useRouter();
//   const { exchange_id } = params as { exchange_id: string };

//   const API_URL = "http://localhost:4000";

//   const [userId, setUserId] = useState<number | null>(null);
//   const [username, setUsername] = useState("");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [exchange, setExchange] = useState<Exchange | null>(null);
//   const [attachment, setAttachment] = useState<Attachment | null>(null);
//   const [showAttachmentPopup, setShowAttachmentPopup] = useState(false);
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [countdown, setCountdown] = useState("");
//   const [showExchangePopup, setShowExchangePopup] = useState(false);
//   const [showtyping, setShowTyping] = useState(false)
//   const [quitPopup, setQuitPopup] = useState(false);

//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   const room = exchange_id;
//   const isActive = exchange?.exchange_status === "in progress";

//   // ✅ ADDED LOCK CHECK
//   const isLocked =
//     exchange?.exchange_status === "cancelled" ||
//     exchange?.exchange_status === "completed";

//   /* ================= LOAD USER ================= */
//   useEffect(() => {
//     async function fetchUser() {
//       const res = await fetch(`${API_URL}/auth/profile`, { credentials: "include" });
//       if (!res.ok) return;
//       const data = await res.json();
//       setUserId(data.user.id);
//       setUsername(data.user.username);
//     }
//     fetchUser();
//   }, []);

//   /* ================= LOAD EXCHANGE ================= */
//   useEffect(() => {
//     if (!exchange_id) return;
//     async function fetchExchange() {
//       const res = await fetch(`${API_URL}/exchange/${exchange_id}`, { credentials: "include" });
//       if (!res.ok) return;
//       const data = await res.json();
//       setExchange(data.exchange);
//     }
//     fetchExchange();
//   }, [exchange_id]);

//   /* ================= LOAD ATTACHMENT ================= */
//   useEffect(() => {
//     if (!exchange_id) return;
//     async function fetchAttachment() {
//       const res = await fetch(`${API_URL}/user/attachment/${exchange_id}`, { credentials: "include" });
//       if (!res.ok) return;
//       const data = await res.json();
//       if (data.success && data.attachment) setAttachment(data.attachment);
//     }
//     fetchAttachment();
//   }, [exchange_id]);

//   /* ================= SOCKET ================= */
//   useEffect(() => {
//     if (!userId || !room) return;

//     if (!socket.connected) socket.connect();

//     const onConnect = () => {
//       socket.emit("enterRoom", { roomId: parseInt(room), userId });
//     };

//     socket.on("connect", onConnect);

//     socket.on("previousMessages", (msgs: Message[]) => {
//       setMessages(msgs);
//     });

//     socket.on("message", (msg: Message) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     socket.on("countdown", (time: string) => {
//       setCountdown(time);
//     });

//     socket.on("countdownEnded", async () => {
//       await fetch(`${API_URL}/exchange/update-status`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ exchange_id, exchange_status: "completed" }),
//       });
//       setShowExchangePopup(true);
//     });

//     socket.on("exchangeQuit", async () => {
//       alert("Exchange was quit by a participant.");
//       await fetch(`${API_URL}/exchange/update-status`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ exchange_id, exchange_status: "cancelled" }),
//       });
//       router.push(`/review/${exchange_id}`);
//     });

//     socket.on("typing", async() => {
//       setShowTyping(true)
//     })

//     return () => {
//       socket.off("connect", onConnect);
//       socket.off("previousMessages");
//       socket.off("message");
//       socket.off("countdown");
//       socket.off("countdownEnded");
//       socket.off("exchangeQuit");
//     };
//   }, [userId, room]);

//   /* ================= AUTO SCROLL ================= */
//   useEffect(() => {
//     const container = chatContainerRef.current;
//     if (!container) return;
//     container.scrollTop = container.scrollHeight;
//   }, [messages]);

//   /* ================= SEND ================= */
//   function handleSend(e: React.FormEvent) {
//     e.preventDefault();
//     if (isLocked) return; // ✅ BLOCK SEND
//     if (!message.trim()) return;
//     socket.emit("message", { text: message });
//     console.log('emmites message', message)
//     setMessage("");
//   }

//   /* ================= ATTACHMENT ================= */
//   const handleAttachmentSubmit = async (data: any) => {
//     const res = await fetch(`${API_URL}/user/set/attachment`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ ...data, exchange_id }),
//     });
//     const response = await res.json();
//     if (!response.success) return alert("Attachment failed");
//     setAttachment(data);
//     setShowAttachmentPopup(false);
//   };

//   /* ================= START ================= */
//   const startCountdown = () => {
//     if (isLocked) return; // ✅ BLOCK START
//     if (attachment && room && exchange) {
//       socket.emit("startCountdown", {
//         roomId: parseInt(room),
//         exchangeId: exchange.exchange_id,
//         duration: attachment.duration,
//       });
//     }
//   };

//   /* ================= QUIT ================= */
//   const handleQuitExchange = () => {
//     if (isLocked) return; // ✅ BLOCK QUIT
//     setQuitPopup(true)
//     if (confirm("Are you sure you want to quit this exchange?")) {
//       socket.emit("quitExchange", {
//         roomId: parseInt(room),
//         exchangeId: exchange?.exchange_id,
//       });
//     }
//   };

  

//   return (
//     <div className="min-h-screen bg-[#0b1120] text-white flex flex-col">

//       {/* HEADER */}
//       <div className="w-full bg-[#111827] border-b border-gray-800 px-6 py-6 space-y-4">
//         {exchange && (
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h2 className="text-2xl font-bold">
//                 {exchange.from_username} ↔ {exchange.to_username}
//               </h2>
//               <p className="text-sm text-gray-400 mt-1">
//                 {exchange.skill_offered_title} ⇄ {exchange.skill_requested_title}
//               </p>
//               <span className="inline-block mt-2 text-xs px-3 py-1 bg-green-600 rounded-full">
//                 {exchange.exchange_status}
//               </span>
//             </div>

//             {attachment ? (
//               <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/40 p-5 rounded-2xl w-full md:w-[400px] space-y-2">
//                 <h3 className="text-cyan-300 font-semibold text-lg">Session Plan</h3>
//                 <p><strong>Duration:</strong> {attachment.duration} mins</p>
//                 <p><strong>Intensity:</strong> {attachment.intensity}</p>
//                 <p><strong>Steps:</strong> {attachment.steps}</p>
//                 <p><strong>Goal:</strong> {attachment.goal}</p>
//                 {attachment.rules && <p><strong>Rules:</strong> {attachment.rules}</p>}
//                 <div className="mt-3 text-center text-sm font-semibold text-yellow-400">
//                   ⏳ {countdown}
//                 </div>

//                 <div className="flex gap-2 mt-2">
//                   <button disabled={isLocked} onClick={startCountdown} className="bg-green-600 px-4 py-2 rounded-md">
//                     Start Session
//                   </button>
//                   <button disabled={isLocked} onClick={handleQuitExchange} className="bg-red-600 px-4 py-2 rounded-md">
//                     Quit Exchange
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               isActive && !isLocked && (
//                 <button
//                   onClick={() => setShowAttachmentPopup(true)}
//                   className="bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-xl font-semibold"
//                 >
//                   <Paperclip size={16} className="inline mr-2" />
//                   Set Session Plan
//                 </button>
//               )
//             )}
//           </div>
//         )}
//       </div>

//       {/* CHAT */}
//       <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
//         {messages.map((msg, i) => {
//           const isMe = msg.username === username;
//           return (
//             <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
//               <div className={`max-w-[70%] p-4 rounded-2xl ${isMe ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-black" : "bg-[#1f2937]"}`}>
//                 <p>{msg.text}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* INPUT */}
//       {isLocked ? (
//         <div className="p-4 border-t border-gray-800 bg-[#111827] text-center text-red-400 font-semibold">
//           This exchange has been {exchange?.exchange_status}. Chat is locked.
//         </div>
//       ) : (
//         <form onSubmit={handleSend} className="p-4 border-t border-gray-800 flex gap-3 bg-[#111827]">
//           <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-3 rounded-full bg-[#1f2937]">
//             <Smile size={18} />
//           </button>

//           {showEmoji && (
//             <div className="absolute bottom-24 left-6 z-50">
//               <EmojiPicker onEmojiClick={(e) => setMessage(prev => prev + e.emoji)} />
//             </div>
//           )}

//           <input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="flex-1 p-3 rounded-full bg-[#1f2937] border border-gray-700 focus:outline-none"
//             placeholder="Type a message..."
//           />

//           <button className="bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 rounded-full">
//             Send
//           </button>
//         </form>
//       )}


//        {showExchangePopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
//           <div className="bg-[#111827] p-6 rounded-xl space-y-4 w-[90%] max-w-md">
//             <h2 className="text-xl font-bold">Exchange Completed</h2>
//             <p>Would you like to leave a review or continue this exchange?</p>
//             <div className="flex gap-3 justify-end mt-4">
//               <button onClick={() => router.push(`/review/${exchange_id}`)} className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md">Leave Review</button>
//               <button onClick={() => { setShowExchangePopup(false); setAttachment(null); }} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md">Continue Exchange</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ❗ QUIT POPUP */}
//       {quitPopup && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center px-4">
//           <div className="max-w-md w-full bg-[#111827] border border-red-500/30 rounded-2xl p-6 text-center shadow-xl">
//             <h2 className="text-xl font-bold text-red-400 mb-3">
//               Quit Skill Exchange?
//             </h2>
//             <p className="text-gray-300 mb-5 text-sm leading-relaxed">
//               Leaving now will cancel this exchange and may affect your rating.
//             </p>
//             <div className="flex gap-3 justify-center">
//               <button
//                 onClick={() => setQuitPopup(false)}
//                 className="px-4 py-2 rounded-xl bg-gray-600 hover:bg-gray-700"
//               >
//                 Stay
//               </button>
//               <button
//                 onClick={handleQuitExchange}
//                 className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700"
//               >
//                 Quit & Review
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

    
//       {showAttachmentPopup && (
//         <AttachmentPopup
//           onClose={() => setShowAttachmentPopup(false)}
//           onSubmit={handleAttachmentSubmit}
//         />
//       )}

//     </div>
//   );
// }


// // see upgrade this part of the app.
// // 1. when they press quit exchange show a popup for confirmation not alert in the popup ask if they want to end the exchnage and also tell them they would leave a review add 2 btn contine or remove/x icon add more text oo still do the noraml logic oo redirect toreview/exchange_id
// // 2.  fix the typing indicatior . i think that all.. if any other thing tell me
// // use this backend socket to do the typing and remneber dont touch my logic 
//   /* ================= TYPING ================= */
//   // socket.on("typing", ({ name }) => {
//   //   const user = activeUsers.find(u => u.socketId === socket.id);
//   //   if (!user) return;
//   //   socket.to(user.socketRoom).emit("typing", { name });
//   // });



















"use client";

import EmojiPicker from "emoji-picker-react";
import { Smile, Paperclip, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  from_username: string;
  to_username: string;
  skill_offered_title: string;
  skill_requested_title: string;
  exchange_status: string;
  created_at?: string;
}

interface Attachment {
  duration: number;
  intensity: string;
  steps: number;
  goal: string;
  rules: string;
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const { exchange_id } = params as { exchange_id: string };

  // const API_URL = "http://localhost:4000";
   const API_URL = "https://skillwrap-backend.onrender.com"

  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [exchange, setExchange] = useState<Exchange | null>(null);
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [showAttachmentPopup, setShowAttachmentPopup] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [showExchangePopup, setShowExchangePopup] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [quitPopup, setQuitPopup] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const room = exchange_id;
  const isActive = exchange?.exchange_status === "in progress";
  const isLocked =
    exchange?.exchange_status === "cancelled" ||
    exchange?.exchange_status === "completed";

  /* ================= LOAD USER ================= */
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`${API_URL}/auth/profile`, { credentials: "include" });
      // if (!res.ok) return;
        if (!res.ok) return router.push("/login");
      const data = await res.json();
      setUserId(data.user.id);
      setUsername(data.user.username);
    }
    fetchUser();
  }, []);

  /* ================= LOAD EXCHANGE ================= */
  useEffect(() => {
    if (!exchange_id) return;
    async function fetchExchange() {
      const res = await fetch(`${API_URL}/exchange/${exchange_id}`, { credentials: "include" });
      // if (!res.ok) return;
        if (!res.ok) return router.push("/dashboard");
      const data = await res.json();
      setExchange(data.exchange);
    }
    fetchExchange();
  }, [exchange_id]);

  /* ================= LOAD ATTACHMENT ================= */
  useEffect(() => {
    if (!exchange_id) return;
    async function fetchAttachment() {
      const res = await fetch(`${API_URL}/user/attachment/${exchange_id}`, { credentials: "include" });
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && data.attachment) setAttachment(data.attachment);
    }
    fetchAttachment();
  }, [exchange_id]);

  /* ================= SOCKET ================= */
  useEffect(() => {
    if (!userId || !room) return;

    if (!socket.connected) socket.connect();

    const onConnect = () => {
      socket.emit("enterRoom", { roomId: parseInt(room), userId });
    };

    socket.on("connect", onConnect);

    socket.on("previousMessages", (msgs: Message[]) => setMessages(msgs));
    socket.on("message", (msg: Message) => setMessages(prev => [...prev, msg]));
    socket.on("countdown", (time: string) => setCountdown(time));

    socket.on("countdownEnded", async () => {
      await fetch(`${API_URL}/exchange/update-status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exchange_id, exchange_status: "completed" }),
      });
      setShowExchangePopup(true);
    });

    socket.on("exchangeQuit", async () => {
      router.push(`/review/${exchange_id}`);
    });

    // ================= TYPING =================
    socket.on("typing", ({ name }: { name: string }) => {
      if (name !== username) {
        setShowTyping(true);
        setTimeout(() => setShowTyping(false), 2000); // hide after 2s
      }
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("previousMessages");
      socket.off("message");
      socket.off("countdown");
      socket.off("countdownEnded");
      socket.off("exchangeQuit");
      socket.off("typing");
    };
  }, [userId, room, username]);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages]);

  /* ================= SEND ================= */
  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (isLocked || !message.trim()) return;
    socket.emit("message", { text: message });
    setMessage("");
    socket.emit("typing", { name: username });
  }

  /* ================= ATTACHMENT ================= */
  const handleAttachmentSubmit = async (data: any) => {
    const res = await fetch(`${API_URL}/user/set/attachment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...data, exchange_id }),
    });
    const response = await res.json();
    if (!response.success) return alert("Attachment failed");
    setAttachment(data);
    setShowAttachmentPopup(false);
  };

  /* ================= START ================= */
  const startCountdown = () => {
    if (isLocked) return;
    if (attachment && room && exchange) {
      socket.emit("startCountdown", {
        roomId: parseInt(room),
        exchangeId: exchange.exchange_id,
        duration: attachment.duration,
      });
    }
  };

  /* ================= QUIT ================= */
  const handleQuitExchange = () => {
    if (isLocked) return;
    setQuitPopup(true);
  };

  /* ================= CONFIRM QUIT ================= */
  const confirmQuit = () => {
    socket.emit("quitExchange", {
      roomId: parseInt(room),
      exchangeId: exchange?.exchange_id,
    });
    router.push(`/review/${exchange_id}`);
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white flex flex-col">

      {/* HEADER */}
      <div className="w-full bg-[#111827] border-b border-gray-800 px-6 py-6 space-y-4">
        {exchange && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">
                {exchange.from_username} ↔ {exchange.to_username}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {exchange.skill_offered_title} ⇄ {exchange.skill_requested_title}
              </p>
              <span className="inline-block mt-2 text-xs px-3 py-1 bg-green-600 rounded-full">
                {exchange.exchange_status}
              </span>
            </div>

            {attachment ? (
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/40 p-5 rounded-2xl w-full md:w-[400px] space-y-2">
                <h3 className="text-cyan-300 font-semibold text-lg">Session Plan</h3>
                <p><strong>Duration:</strong> {attachment.duration} mins</p>
                <p><strong>Intensity:</strong> {attachment.intensity}</p>
                <p><strong>Steps:</strong> {attachment.steps}</p>
                <p><strong>Goal:</strong> {attachment.goal}</p>
                {attachment.rules && <p><strong>Rules:</strong> {attachment.rules}</p>}
                <div className="mt-3 text-center text-sm font-semibold text-yellow-400">
                  ⏳ {countdown}
                </div>
                <div className="flex gap-2 mt-2">
                  <button disabled={isLocked} onClick={startCountdown} className="bg-green-600 px-4 py-2 rounded-md">
                    Start Session
                  </button>
                  <button disabled={isLocked} onClick={handleQuitExchange} className="bg-red-600 px-4 py-2 rounded-md">
                    Quit Exchange
                  </button>
                </div>
              </div>
            ) : (
              isActive && !isLocked && (
                <button
                  onClick={() => setShowAttachmentPopup(true)}
                  className="bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-xl font-semibold"
                >
                  <Paperclip size={16} className="inline mr-2" />
                  Set Session Plan
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* CHAT */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => {
          const isMe = msg.username === username;
          return (
            <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] p-4 rounded-2xl ${isMe ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-black" : "bg-[#1f2937]"}`}>
                <p>{msg.text}</p>
              </div>
            </div>
          );
        })}
        {showTyping && <p className="text-gray-400 text-sm">Typing...</p>}
      </div>

      {/* INPUT */}
      {isLocked ? (
        <div className="p-4 border-t border-gray-800 bg-[#111827] text-center text-red-400 font-semibold">
          This exchange has been {exchange?.exchange_status}. Chat is locked.
        </div>
      ) : (
        <form onSubmit={handleSend} className="p-4 border-t border-gray-800 flex gap-3 bg-[#111827]">
          <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="p-3 rounded-full bg-[#1f2937]">
            <Smile size={18} />
          </button>
          {showEmoji && (
            <div className="absolute bottom-24 left-6 z-50">
              <EmojiPicker onEmojiClick={(e) => setMessage(prev => prev + e.emoji)} />
            </div>
          )}
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-3 rounded-full bg-[#1f2937] border border-gray-700 focus:outline-none"
            placeholder="Type a message..."
          />
          <button className="bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 rounded-full">
            Send
          </button>
        </form>
      )}

     
     {/* QUIT POPUP */}
{quitPopup && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50">
    <div className="max-w-md w-full bg-[#111827] rounded-3xl p-6 space-y-4 shadow-xl relative border border-gray-700">
      <button
        onClick={() => setQuitPopup(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <X size={22} />
      </button>

      <h2 className="text-2xl font-bold text-red-400 text-center">Quit Skill Exchange?</h2>
      <p className="text-gray-300 text-sm text-center leading-relaxed">
        Leaving now will cancel this exchange. You will be redirected to leave a review.
        Make sure you really want to quit before confirming.
      </p>

      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={() => setQuitPopup(false)}
          className="flex-1 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold shadow-md transition"
        >
          Continue Exchange
        </button>
        <button
          onClick={confirmQuit}
          className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold shadow-md transition"
        >
          Quit & Review
        </button>
      </div>
    </div>
  </div>
)}

{/* ATTACHMENT POPUP */}
{showAttachmentPopup && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50">
    <AttachmentPopup
      onClose={() => setShowAttachmentPopup(false)}
      onSubmit={handleAttachmentSubmit}
    />
  </div>
)}

{/* EXCHANGE COMPLETION POPUP */}
{showExchangePopup && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50">
    <div className="bg-[#111827] p-6 rounded-3xl space-y-4 w-[90%] max-w-md shadow-xl border border-gray-700">
      <h2 className="text-2xl font-bold text-green-400 text-center">Exchange Completed</h2>
      <p className="text-gray-300 text-sm text-center leading-relaxed">
        Would you like to leave a review or continue this exchange? Your feedback helps improve the platform.
      </p>
      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={() => router.push(`/review/${exchange_id}`)}
          className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold shadow-md transition"
        >
          Leave Review
        </button>
        <button
          onClick={() => { setShowExchangePopup(false); setAttachment(null); }}
          className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md transition"
        >
          Continue Exchange
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
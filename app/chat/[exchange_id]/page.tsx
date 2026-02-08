// "use client";

// import { useEffect, useState, useRef, useCallback } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { socket } from "@/lib/socketClient";
// import ChatForm from "@/components/chatComponent1/page";
// import ChatMessage from "@/components/chatComponent2/page";

// interface Message {
//   sender: string;
//   message: string;
//   timestamp: string;
//   system?: boolean;
//   imageUrl?: string;
// }

// interface ExchangeDetails {
//   exchange_id: number;
//   from_user_id: number;
//   from_username: string;
//   to_user_id: number;
//   to_username: string;
//   skill_offered_title: string;
//   skill_requested_title: string;
//   exchange_status: string;
//   status: string;
//   created_at: string;
// }

// const API_URL = "https://skillwrap-backend.onrender.com";

// export default function ChatPage() {
//   const [room, setRoom] = useState("");
//   const [joined, setJoined] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [username, setUsername] = useState("");
//   const [countdown, setCountdown] = useState("");
//   const [quitPopup, setQuitPopup] = useState(false);
//   const [exchange, setExchange] = useState<ExchangeDetails | null>(null);
//   const [showDurationBtn, setShowDurationBtn] = useState(false);

//   const [exchangeBlocked, setExchangeBlocked] = useState<{
//     title: string;
//     message: string;
//   } | null>(null);

//   const bottomRef = useRef<HTMLDivElement>(null);
//   const countdownTimer = useRef<ReturnType<typeof setInterval> | null>(null);

//   const router = useRouter();
//   const params = useParams();
//   const { exchange_id } = params as { exchange_id: string };

//   const EXCHANGE_TIMER_KEY = `exchange_timer_${exchange_id}`;

//   // ---------- Fetch exchange ----------
//   useEffect(() => {
//     const fetchExchange = async () => {
//       try {
//         const res = await fetch(`${API_URL}/exchange/${exchange_id}`, {
//           credentials: "include",
//         });
//         if (!res.ok) throw new Error("Failed to fetch exchange");
//         const data = await res.json();
//         setExchange(data.exchange);
//       } catch (err) {
//         console.error(err);
//         router.push("/dashboard");
//       }
//     };

//     fetchExchange();
//   }, [exchange_id, router]);

//   // ---------- Load messages ----------
//   useEffect(() => {
//     if (!room) return;
//     const stored = localStorage.getItem(`chatMessages_${room}`);
//     if (stored) setMessages(JSON.parse(stored));
//   }, [room]);

//   const scrollToBottom = useCallback(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   const handleIncomingMessage = useCallback(
//     (msg: Message) => {
//       setMessages((prev) => {
//         const updated = [...prev, msg];
//         localStorage.setItem(`chatMessages_${room}`, JSON.stringify(updated));
//         scrollToBottom();
//         return updated;
//       });
//     },
//     [room, scrollToBottom]
//   );

//   const handleUserJoined = useCallback(
//     (data: { message: string; timestamp: string }) => {
//       handleIncomingMessage({ ...data, sender: "system", system: true });
//     },
//     [handleIncomingMessage]
//   );

//   const handleUserLeft = useCallback(
//     (data: { message: string; timestamp: string }) => {
//       handleIncomingMessage({ ...data, sender: "system", system: true });
//     },
//     [handleIncomingMessage]
//   );

//   // ---------- Countdown ----------
//   const startCountdown = useCallback(
//     (startTimeISO: string, mins: number) => {
//       const endTime = new Date(startTimeISO).getTime() + mins * 60000;

//       if (countdownTimer.current) clearInterval(countdownTimer.current);

//       countdownTimer.current = setInterval(async () => {
//         const now = Date.now();
//         const distance = endTime - now;

//         if (distance <= 0) {
//           clearInterval(countdownTimer.current!);
//           setCountdown("00:00:00");

//           await fetch(`${API_URL}/exchange/update-status`, {
//             method: "PATCH",
//             credentials: "include",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               exchange_id,
//               exchange_status: "completed",
//             }),
//           });

//           localStorage.removeItem(EXCHANGE_TIMER_KEY);
//           router.push(`/review/${exchange_id}`);
//           return;
//         }

//         const h = Math.floor(distance / 3600000);
//         const m = Math.floor((distance % 3600000) / 60000);
//         const s = Math.floor((distance % 60000) / 1000);

//         setCountdown(
//           `${String(h).padStart(2, "0")}:${String(m).padStart(
//             2,
//             "0"
//           )}:${String(s).padStart(2, "0")}`
//         );
//       }, 1000);
//     },
//     [exchange_id, router, EXCHANGE_TIMER_KEY]
//   );

//   const handleStartExchange = useCallback(
//     (data: { startTime: string; duration: number }) => {
//       localStorage.setItem(EXCHANGE_TIMER_KEY, JSON.stringify(data));
//       startCountdown(data.startTime, data.duration);
//       setShowDurationBtn(false);
//     },
//     [startCountdown, EXCHANGE_TIMER_KEY]
//   );

//   // ✅✅✅ ADDED FUNCTION (ONLY FIX)
//   const handleSetDuration = () => {
//     const input = prompt("Enter exchange duration (in minutes):");
//     if (!input) return;

//     const duration = Number(input);
//     if (isNaN(duration) || duration <= 0) {
//       alert("Please enter a valid number of minutes");
//       return;
//     }

//     const startTime = new Date().toISOString();
//     const payload = { startTime, duration };

//     socket.emit("start_exchange", payload);
//     localStorage.setItem(EXCHANGE_TIMER_KEY, JSON.stringify(payload));
//     startCountdown(startTime, duration);
//     setShowDurationBtn(false);
//   };
//   // ✅ END FIX

//   useEffect(() => {
//     if (!room) return;

//     socket.on("message", handleIncomingMessage);
//     socket.on("user_joined", handleUserJoined);
//     socket.on("user_left", handleUserLeft);
//     socket.on("start_exchange", handleStartExchange);

//     const saved = localStorage.getItem(EXCHANGE_TIMER_KEY);
//     if (saved) {
//       const { startTime, duration } = JSON.parse(saved);
//       startCountdown(startTime, duration);
//       setShowDurationBtn(false);
//     } else {
//       setShowDurationBtn(true);
//     }

//     return () => {
//       socket.off("message", handleIncomingMessage);
//       socket.off("user_joined", handleUserJoined);
//       socket.off("user_left", handleUserLeft);
//       socket.off("start_exchange", handleStartExchange);
//       if (countdownTimer.current) clearInterval(countdownTimer.current);
//     };
//   }, [
//     room,
//     handleIncomingMessage,
//     handleUserJoined,
//     handleUserLeft,
//     handleStartExchange,
//     startCountdown,
//     EXCHANGE_TIMER_KEY,
//   ]);

//   // ---------- Join ----------
//   const handleJoin = () => {
//     if (!username || !room || !exchange) return;

//     if (
//       exchange.exchange_status === "completed" ||
//       exchange.exchange_status === "cancelled"
//     ) {
//       setExchangeBlocked({
//         title:
//           exchange.exchange_status === "completed"
//             ? "Exchange Completed"
//             : "Exchange Cancelled",
//         message:
//           exchange.exchange_status === "completed"
//             ? "This skill exchange has already been completed."
//             : "This skill exchange was cancelled earlier.",
//       });
//       return;
//     }

//     if (
//       username !== exchange.from_username &&
//       username !== exchange.to_username
//     ) {
//       alert("You’re not eligible to join this exchange.");
//       return;
//     }

//     socket.emit("join-room", { username, room });
//     setJoined(true);
//   };

//   const handleMessage = (msg: string, imageUrl?: string) => {
//     if (!msg.trim() && !imageUrl) return;

//     const data: Message = {
//       sender: username,
//       message: msg,
//       timestamp: new Date().toISOString(),
//       imageUrl,
//     };

//     handleIncomingMessage(data);
//     socket.emit("message", { ...data, room });
//   };

//   const confirmQuit = async () => {
//     await fetch(`${API_URL}/exchange/update-status`, {
//       method: "PATCH",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         exchange_id,
//         exchange_status: "cancelled",
//       }),
//     });

//     localStorage.removeItem(EXCHANGE_TIMER_KEY);
//     localStorage.removeItem(`chatMessages_${room}`);
//     socket.emit("leave-room", room);
//     router.push(`/review/${exchange_id}`);
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#0c0e1a] via-[#1a1f38] to-[#2e2b5c] text-white pt-20 px-2 sm:px-4">
//             {/* 🔙 GO BACK BUTTON */}
//       <div className="flex items-center mb-6">
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 px-4 py-2 rounded-xl 
//           bg-white/10 border border-white/20 backdrop-blur-md
//           text-sm font-medium hover:bg-white/20 hover:scale-105 
//           transition-all duration-300"
//         >
//           ← Go Back
//         </button>
//       </div>
//       {!joined ? (
//         <div className="w-full max-w-md bg-white/5 p-8 rounded-3xl">
//           <input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//             className="w-full mb-4 p-3 rounded-xl bg-white/10"
//           />
//           <input
//             value={room}
//             onChange={(e) => setRoom(e.target.value)}
//             placeholder="Room"
//             className="w-full mb-6 p-3 rounded-xl bg-white/10"
//           />
//           <button
//             onClick={handleJoin}
//             className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
//           >
//             Enter Chat
//           </button>
//         </div>
//       ) : (
//         <div className="w-full max-w-3xl h-[85vh] flex flex-col bg-white/10 rounded-3xl">
//           <div className="p-4 border-b border-white/20 space-y-2">
//             <p className="text-lg font-bold">Room: {room}</p>

//             {countdown && exchange && (
//               <div className="flex flex-wrap gap-2">
//                 <span className="px-3 py-1 bg-green-500/30 rounded-full text-sm">
//                   Offering: {exchange.skill_offered_title}
//                 </span>
//                 <span className="px-3 py-1 bg-pink-500/30 rounded-full text-sm">
//                   Requesting: {exchange.skill_requested_title}
//                 </span>
//               </div>
//             )}

//             {countdown && (
//               <p className="text-yellow-400 font-bold">{countdown}</p>
//             )}

//             {showDurationBtn && !countdown && (
//               <button
//                 onClick={handleSetDuration}
//                 className="px-4 py-2 bg-green-600 rounded-xl"
//               >
//                 Set Duration
//               </button>
//             )}

//             {countdown && (
//               <button
//                 onClick={() => setQuitPopup(true)}
//                 className="px-4 py-2 bg-red-600 rounded-xl"
//               >
//                 Quit Exchange
//               </button>
//             )}
//           </div>

//           <div className="flex-1 overflow-y-auto p-4">
//             {messages.map((m, i) => (
//               <ChatMessage
//                 key={i}
//                 sender={m.sender}
//                 message={m.message}
//                 timestamp={m.timestamp}
//                 isOwnMessage={m.sender === username}
//                 imageUrl={m.imageUrl}
//               />
//             ))}
//             <div ref={bottomRef} />
//           </div>

//           <div className="p-4 border-t border-white/20">
//             <ChatForm onSendMessage={handleMessage} />
//           </div>
//         </div>
//       )}

//       {/* 🚫 EXCHANGE BLOCKED POPUP */}
//       {exchangeBlocked && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center px-4">
//           <div className="max-w-md w-full bg-[#0f172a] rounded-2xl p-6 text-center border border-yellow-500/30 shadow-xl">
//             <h2 className="text-xl font-bold text-yellow-400 mb-3">
//               {exchangeBlocked.title}
//             </h2>
//             <p className="text-gray-300 text-sm leading-relaxed mb-6">
//               {exchangeBlocked.message}
//             </p>
//             <button
//               onClick={() => router.push("/dashboard")}
//               className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
//             >
//               Go to Dashboard
//             </button>
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
//                 onClick={confirmQuit}
//                 className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700"
//               >
//                 Quit & Review
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

// }






















"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { socket } from "@/lib/socketClient";
import ChatForm from "@/components/chatComponent1/page";
import ChatMessage from "@/components/chatComponent2/page";

interface Message {
  sender: string;
  message: string;
  timestamp: string;
  system?: boolean;
  imageUrl?: string;
}

interface ExchangeDetails {
  exchange_id: number;
  from_username: string;
  to_username: string;
  exchange_status: string;
  created_at: string;
}

const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";

export default function ChatPage() {
  const router = useRouter();
  const { exchange_id } = useParams() as { exchange_id: string };

  const room = `exchange_${exchange_id}`;

  const bottomRef = useRef<HTMLDivElement>(null);

  const [username, setUsername] = useState<string | null>(null);
  const [exchange, setExchange] = useState<ExchangeDetails | null>(null);
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  /* ---------------- FETCH USER ---------------- */
  useEffect(() => {
    fetch(`${API_URL}/auth/profile`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (!data?.user?.username) throw new Error();
        setUsername(data.user.username);
      })
      .catch(() => router.push("/login"));
  }, [router]);

  /* ---------------- FETCH EXCHANGE ---------------- */
  useEffect(() => {
    fetch(`${API_URL}/exchange/${exchange_id}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setExchange(data.exchange))
      .catch(() => router.push("/dashboard"));
  }, [exchange_id, router]);

  /* ---------------- SOCKET MESSAGE HANDLER ---------------- */
  const handleIncomingMessage = useCallback((msg: Message) => {
    setMessages(prev => [...prev, msg]);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* ---------------- SOCKET EVENTS ---------------- */
  useEffect(() => {
    socket.on("message", handleIncomingMessage);

    socket.on("user_joined", data => {
      handleIncomingMessage({
        sender: "system",
        message: `${data.username} joined the chat`,
        timestamp: new Date().toISOString(),
        system: true,
      });
    });

    return () => {
      socket.off("message", handleIncomingMessage);
      socket.off("user_joined");
    };
  }, [handleIncomingMessage]);

  /* ---------------- JOIN CHAT ---------------- */
  const joinChat = () => {
    if (!username || !exchange) return;

    if (
      username !== exchange.from_username &&
      username !== exchange.to_username
    ) {
      alert("You are not part of this exchange.");
      return;
    }

    socket.emit("join-room", { room, username });
    setJoined(true);
  };

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = (msg: string, imageUrl?: string) => {
    if (!msg.trim() && !imageUrl) return;

    socket.emit("message", {
      room,
      sender: username,
      message: msg,
      imageUrl,
      timestamp: new Date().toISOString(),
    });
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="flex flex-col h-screen bg-[#0c0e1a] text-white">
                  {/* 🔙 GO BACK BUTTON */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl 
          bg-white/10 border border-white/20 backdrop-blur-md
          text-sm font-medium hover:bg-white/20 hover:scale-105 
          transition-all duration-300"
        >
          ← Go Back
        </button>
      </div>
      {!joined ? (
        <div className="flex items-center justify-center h-full">
          <button
            onClick={joinChat}
            className="px-6 py-3 rounded-xl bg-blue-600"
          >
            Enter Chat
          </button>
        </div>
      ) : (
        <>
          <div className="p-4 border-b border-white/20">
            <p className="font-bold">Room: {room}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <ChatMessage
                key={i}
                sender={m.sender}
                message={m.message}
                timestamp={m.timestamp}
                isOwnMessage={m.sender === username}
                imageUrl={m.imageUrl}
              />
            ))}
            <div ref={bottomRef} />
          </div>

          <ChatForm onSendMessage={sendMessage} />
        </>
      )}
    </div>
  );
}












// "use client";

// import { useEffect, useState, useRef, useCallback } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { socket } from "@/lib/socketClient";
// import ChatForm from "@/components/chatComponent1/page";
// import ChatMessage from "@/components/chatComponent2/page";

// interface Message {
//   sender: string;
//   message: string;
//   timestamp: string;
//   system?: boolean;
//   imageUrl?: string;
// }

// interface ExchangeDetails {
//   exchange_id: number;
//   from_username: string;
//   to_username: string;
//   skill_offered_title: string;
//   skill_requested_title: string;
//   exchange_status: string;
//   created_at: string;
// }

// const API_URL = "https://skillwrap-backend.onrender.com";

// export default function ChatPage() {
//   const router = useRouter();
//   const { exchange_id } = useParams() as { exchange_id: string };

//   const room = `exchange_${exchange_id}`;
//   const EXCHANGE_TIMER_KEY = `exchange_timer_${exchange_id}`;

//   const bottomRef = useRef<HTMLDivElement>(null);
//   const countdownRef = useRef<NodeJS.Timeout | null>(null);

//   const [username, setUsername] = useState<string | null>(null);
//   const [exchange, setExchange] = useState<ExchangeDetails | null>(null);
//   const [joined, setJoined] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [countdown, setCountdown] = useState("");
//   const [showDurationBtn, setShowDurationBtn] = useState(false);
//   const [quitPopup, setQuitPopup] = useState(false);

//   /* ---------------- FETCH USER ---------------- */
// useEffect(() => {
//   fetch(`${API_URL}/auth/profile`, { credentials: "include" })
//     .then(res => res.json())
//     .then(data => {
//       if (!data?.user?.username) {
//         throw new Error("Username missing");
//       }

//       setUsername(data.user.username);
//     })
//     .catch(() => router.push("/login"));
// }, [router]);
//   /* ---------------- FETCH EXCHANGE ---------------- */
//   useEffect(() => {
//     fetch(`${API_URL}/exchange/${exchange_id}`, {
//       credentials: "include",
//     })
//       .then(res => res.json())
//       .then(data => setExchange(data.exchange))
//       .catch(() => router.push("/dashboard"));
//   }, [exchange_id, router]);
  
//   useEffect(() => {
//   console.log("username:", username);
//   console.log("exchange:", exchange);
// }, [username, exchange]);


//   /* ---------------- LOAD STORED MESSAGES ---------------- */
//   useEffect(() => {
//     const saved = localStorage.getItem(`chat_${room}`);
//     if (saved) setMessages(JSON.parse(saved));
//   }, [room]);

//   const scrollToBottom = () =>
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });

//   const addMessage = useCallback(
//     (msg: Message) => {
//       setMessages(prev => {
//         const updated = [...prev, msg];
//         localStorage.setItem(`chat_${room}`, JSON.stringify(updated));
//         return updated;
//       });
//       scrollToBottom();
//     },
//     [room]
//   );

//   /* ---------------- COUNTDOWN ---------------- */
//  const startCountdown  = (startTime: string, mins: number) => {
//     const end = new Date(startTime).getTime() + mins * 60000;

//     if (countdownRef.current) clearInterval(countdownRef.current);

//     countdownRef.current =  setInterval (async () => {
//       const diff = end - Date.now();
//       if (diff <= 0) {
//         clearInterval(countdownRef.current!);
//         localStorage.removeItem(EXCHANGE_TIMER_KEY);
//           await fetch(`${API_URL}/exchange/update-status`, {
//             method: "PATCH",
//             credentials: "include",
//             headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                   exchange_id,
//                   exchange_status: "completed",
//                 }),
//             })
//         router.push(`/review/${exchange_id}`);
//         return;
//       }

//       const h = Math.floor(diff / 3600000);
//       const m = Math.floor((diff % 3600000) / 60000);
//       const s = Math.floor((diff % 60000) / 1000);

//       setCountdown(
//         `${String(h).padStart(2, "0")}:${String(m).padStart(
//           2,
//           "0"
//         )}:${String(s).padStart(2, "0")}`
//       );
//     }, 1000);
//   };

//   /* ---------------- SOCKET EVENTS ---------------- */
//   useEffect(() => {
//     socket.on("message", addMessage);

//     socket.on("user_joined", data =>
//       addMessage({ ...data, sender: "system", system: true })
//     );

//     socket.on("start_exchange", ({ startTime, duration }) => {
//       startCountdown(startTime, duration);
//       setShowDurationBtn(false);
//     });

//     const saved = localStorage.getItem(EXCHANGE_TIMER_KEY);
//     if (saved) {
//       const { startTime, duration } = JSON.parse(saved);
//       startCountdown(startTime, duration);
//     } else {
//       setShowDurationBtn(true);
//     }

//     return () => {
//       socket.off();
//       if (countdownRef.current) clearInterval(countdownRef.current);
//     };
//   }, [addMessage]);

//   /* ---------------- JOIN CHAT (FIXED) ---------------- */
//   const joinChat = () => {
//     if (!username || !exchange) {
//       alert("Loading your profile, please wait...");
//       return;
//     }

//     if (
//       username !== exchange.from_username &&
//       username !== exchange.to_username
//     ) {
//       alert("You are not part of this exchange.");
//       return;
//     }

//     socket.emit("join-room", { room, username });
//     setJoined(true);
//   };

//   /* ---------------- SEND MESSAGE ---------------- */
//   const sendMessage = (msg: string, imageUrl?: string) => {
//     if (!msg.trim() && !imageUrl) return;

//     const data: Message = {
//       sender: username!,
//       message: msg,
//       imageUrl,
//       timestamp: new Date().toISOString(),
//     };

//     addMessage(data);
//     socket.emit("message", { ...data, room });
//   };

//   /* ---------------- SET DURATION ---------------- */
//   const handleSetDuration = () => {
//     const input = prompt("Enter duration (minutes)");
//     const duration = Number(input);
//     if (!duration || duration <= 0) return;

//     const payload = {
//       room,
//       startTime: new Date().toISOString(),
//       duration,
//     };

//     socket.emit("start_exchange", payload);
//     localStorage.setItem(EXCHANGE_TIMER_KEY, JSON.stringify(payload));
//     startCountdown(payload.startTime, duration);
//     setShowDurationBtn(false);
//   };

//   /* ---------------- QUIT ---------------- */
//   const confirmQuit = async () => {
//     await fetch(`${API_URL}/exchange/update-status`, {
//       method: "PATCH",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         exchange_id,
//         exchange_status: "cancelled",
//       }),
//     });

//     socket.emit("leave-room", { room, username });
//     localStorage.clear();
//     router.push(`/review/${exchange_id}`);
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="flex flex-col h-screen bg-[#0c0e1a] text-white">
//       {!joined ? (
//         <div className="flex items-center justify-center h-full">
// <button
//   onClick={joinChat}
//   // disabled={!username || !exchange}
//   className={`px-6 py-3 rounded-xl ${
//     !username || !exchange
//       ? "bg-gray-600 cursor-not-allowed"
//       : "bg-blue-600"
//   }`}
// >
//   Enter Chat
// </button>

//         </div>
//       ) : (
//         <>
//           <div className="p-4 border-b border-white/20">
//             <p className="font-bold">Room: {room}</p>
//             {countdown && <p className="text-yellow-400">{countdown}</p>}

//             {showDurationBtn && (
//               <button
//                 onClick={handleSetDuration}
//                 className="mt-2 px-4 py-2 bg-green-600 rounded-xl"
//               >
//                 Set Duration
//               </button>
//             )}

//             {countdown && (
//               <button
//                 onClick={() => setQuitPopup(true)}
//                 className="ml-2 px-4 py-2 bg-red-600 rounded-xl"
//               >
//                 Quit
//               </button>
//             )}
//           </div>

//           <div className="flex-1 overflow-y-auto p-4">
//             {messages.map((m, i) => (
//               <ChatMessage
//                 key={i}
//                 sender={m.sender}
//                 message={m.message}
//                 timestamp={m.timestamp}
//                 isOwnMessage={m.sender === username}
//                 imageUrl={m.imageUrl}
//               />
//             ))}
//             <div ref={bottomRef} />
//           </div>

//           <ChatForm onSendMessage={sendMessage} />
//         </>
//       )}

//       {quitPopup && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
//           <div className="bg-[#111827] p-6 rounded-xl text-center">
//             <p className="mb-4">Quit this exchange?</p>
//             <button
//               onClick={confirmQuit}
//               className="px-4 py-2 bg-red-600 rounded-xl"
//             >
//               Quit & Review
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }













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

// // export default function ChatPage() {
// //   const [room, setRoom] = useState("");
// //   const [joined, setJoined] = useState(false);
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [username, setUsername] = useState("");
// //   const [countdown, setCountdown] = useState("");
// //   const [quitPopup, setQuitPopup] = useState(false);
// //   const [exchange, setExchange] = useState<ExchangeDetails | null>(null);

// //   const bottomRef = useRef<HTMLDivElement>(null);
// //   const countdownTimer = useRef<NodeJS.Timeout | null>(null);
// //   const router = useRouter();
// //   const params = useParams();
// //   const { exchange_id } = params as { exchange_id: string };


// //   // const API_URL = process.env.NEXT_PUBLIC_API_URL;
// //   const API_URL = 'http://localhost:5000';

// //   // ---------- Fetch exchange details ----------
// //   useEffect(() => {
// //     if (!exchange_id) return;

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
// //   }, [exchange_id, API_URL, router]);

// //   // ---------- Load messages from localStorage ----------
// //   useEffect(() => {
// //     if (!room) return;
// //     const stored = localStorage.getItem(`chatMessages_${room}`);
// //     if (stored) setMessages(JSON.parse(stored));
// //   }, [room]);

// //   // ---------- Scroll to bottom ----------
// //   const scrollToBottom = useCallback(() => {
// //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, []);

// //   // ---------- Handle incoming messages ----------
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
// //       const endTime = new Date(new Date(startTimeISO).getTime() + mins * 60000).getTime();

// //       countdownTimer.current = setInterval(async () => {
// //         const now = new Date().getTime();
// //         const distance = endTime - now;

// //         if (distance <= 0) {
// //           clearInterval(countdownTimer.current!);
// //           setCountdown("00:00:00");

// //           if (exchange_id) {
// //             await fetch(`${API_URL}/exchange/update-status`, {
// //               method: "POST",
// //               credentials: "include",
// //               headers: { "Content-Type": "application/json" },
// //               body: JSON.stringify({ exchange_id, exchange_status: "completed" }),
// //             });
// //           }

// //           router.push(`/review/${exchange_id}`);
// //           return;
// //         }

// //         const hours = Math.floor(distance / (1000 * 60 * 60));
// //         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
// //         const seconds = Math.floor((distance % (1000 * 60)) / 1000);

// //         setCountdown(
// //           `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
// //             seconds
// //           ).padStart(2, "0")}`
// //         );
// //       }, 1000);
// //     },
// //     [API_URL, exchange_id, router]
// //   );

// //   const handleStartExchange = useCallback(
// //     (data: { startTime: string; duration: number }) => {
// //       startCountdown(data.startTime, data.duration);
// //     },
// //     [startCountdown]
// //   );

// //   // ---------- Socket listeners ----------
// //   useEffect(() => {
// //     if (!room) return;

// //     socket.on("message", handleIncomingMessage);
// //     socket.on("user_joined", handleUserJoined);
// //     socket.on("user_left", handleUserLeft);
// //     socket.on("start_exchange", handleStartExchange);

// //     return () => {
// //       socket.off("message", handleIncomingMessage);
// //       socket.off("user_joined", handleUserJoined);
// //       socket.off("user_left", handleUserLeft);
// //       socket.off("start_exchange", handleStartExchange);
// //       countdownTimer.current && clearInterval(countdownTimer.current);
// //     };
// //   }, [room, handleIncomingMessage, handleUserJoined, handleUserLeft, handleStartExchange]);

// //   // ---------- Join room ----------
// //   const joinRoom = (user: string, roomName: string) => {
// //     socket.emit("join-room", { username: user, room: roomName });
// //   };

// //   const handleJoin = () => {
// //     if (!username || !room || !exchange) return;
// //     if (username !== exchange.from_username && username !== exchange.to_username) {
// //       alert("You are not allowed to join this chat.");
// //       return;
// //     }
// //     setJoined(true);
// //     joinRoom(username, room);
// //   };

// //   // ---------- Send message ----------
// //   const handleMessage = (msg: string, imageUrl?: string) => {
// //     if (!msg.trim() && !imageUrl) return;
// //     const data: Message = { sender: username, message: msg, timestamp: new Date().toISOString(), imageUrl };
// //     handleIncomingMessage(data);
// //     socket.emit("message", { ...data, room });
// //   };

// //   // ---------- Quit exchange ----------
// //   const confirmQuit = async () => {
// //     if (!exchange_id) return;

// //     await fetch(`${API_URL}/exchange/update-status`, {
// //       method: "POST",
// //       credentials: "include",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ exchange_id, exchange_status: "cancelled" }),
// //     });

// //     localStorage.removeItem(`chatSession_${room}`);
// //     localStorage.removeItem(`chatOtherSession_${room}`);
// //     localStorage.removeItem(`chatMessages_${room}`);

// //     socket.emit("leave-room", room);
// //     router.push(`/review/${exchange_id}`);
// //   };

// //   return (
// //     <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#0c0e1a] via-[#1a1f38] to-[#2e2b5c] text-white pt-24 px-4">
// //       {!joined ? (
// //         <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl w-full max-w-md p-10 text-center shadow-lg shadow-purple-900/40">
// //           <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
// //             Join the Chat
// //           </h1>
// //           <input
// //             type="text"
// //             value={username}
// //             onChange={(e) => setUsername(e.target.value)}
// //             placeholder="Username"
// //             className="w-full px-4 py-3 mb-4 rounded-2xl bg-white/10 border border-white/20 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
// //           />
// //           <input
// //             type="text"
// //             value={room}
// //             onChange={(e) => setRoom(e.target.value)}
// //             placeholder="Room name"
// //             className="w-full px-4 py-3 mb-6 rounded-2xl bg-white/10 border border-white/20 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
// //           />
// //           <button
// //             onClick={handleJoin}
// //             className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg hover:from-blue-500 hover:to-pink-500 transition"
// //           >
// //             Enter Chat 🚀
// //           </button>
// //         </div>
// //       ) : (
// //         <div className="w-full max-w-3xl flex flex-col bg-white/10 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-xl shadow-purple-900/50">
// //           <div className="flex justify-between items-center p-4 border-b border-white/20 bg-white/5 rounded-t-3xl backdrop-blur-xl">
// //             <div className="flex flex-col gap-2">
// //               <h2 className="text-xl font-bold text-blue-300">Room: {room}</h2>
// //               {exchange && (
// //                 <div className="flex flex-wrap gap-3 mt-1">
// //                   <span className="px-3 py-1 rounded-full bg-green-500/30 text-green-200 font-semibold">
// //                     Offering: {exchange.skill_offered_title}
// //                   </span>
// //                   <span className="px-3 py-1 rounded-full bg-pink-500/30 text-pink-200 font-semibold">
// //                     Requesting: {exchange.skill_requested_title}
// //                   </span>
// //                 </div>
// //               )}
// //               {countdown && (
// //                 <p className="mt-2 text-yellow-400 font-bold text-lg drop-shadow-lg">{countdown}</p>
// //               )}
// //             </div>
// //             {countdown && (
// //               <button
// //                 onClick={() => setQuitPopup(true)}
// //                 className="px-4 py-2 bg-red-600 rounded-xl hover:bg-red-700 transition"
// //               >
// //                 Quit Exchange
// //               </button>
// //             )}
// //           </div>

// //           <div className="flex-1 overflow-y-auto max-h-[450px] p-5 space-y-3 scrollbar-thin scrollbar-thumb-blue-600/40 scrollbar-track-transparent">
// //             {messages.map((msg, i) => (
// //               <ChatMessage
// //                 key={i}
// //                 sender={msg.sender}
// //                 message={msg.message}
// //                 timestamp={msg.timestamp}
// //                 isOwnMessage={msg.sender === username}
// //                 imageUrl={msg.imageUrl}
// //               />
// //             ))}
// //             <div ref={bottomRef} />
// //           </div>

// //           <div className="p-4 border-t border-white/20 bg-white/5 backdrop-blur-xl rounded-b-3xl">
// //             <ChatForm onSendMessage={handleMessage} />
// //           </div>
// //         </div>
// //       )}

// //       {quitPopup && (
// //         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
// //           <div className="bg-white/5 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 max-w-md w-full text-center">
// //             <h2 className="text-xl font-bold text-yellow-400 mb-3">Exchange Ended</h2>
// //             <p className="text-gray-300 mb-5">You have successfully quit the exchange.</p>
// //             <button
// //               onClick={confirmQuit}
// //               className="px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition"
// //             >
// //               Leave a Review
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

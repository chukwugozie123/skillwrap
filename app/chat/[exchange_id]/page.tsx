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
  from_user_id: number;
  from_username: string;
  to_user_id: number;
  to_username: string;
  skill_offered_title: string;
  skill_requested_title: string;
  exchange_status: string;
  created_at: string;
  exchange_start_time?: string;
  exchange_duration?: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ChatPage() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [countdown, setCountdown] = useState("");
  const [exchange, setExchange] = useState<ExchangeDetails | null>(null);
  const [showDurationBtn, setShowDurationBtn] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const countdownTimer = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();
  const params = useParams();
  const { exchange_id } = params as { exchange_id: string };

  /* ================= AUTO ROOM ================= */
  useEffect(() => {
    if (exchange_id) {
      setRoom(`exchange-${exchange_id}`);
    }
  }, [exchange_id]);

  /* ================= FETCH EXCHANGE ================= */
  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const res = await fetch(`${API_URL}/exchange/${exchange_id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setExchange(data.exchange);
      } catch {
        router.push("/dashboard");
      }
    };

    fetchExchange();
  }, [exchange_id, router]);

  /* ================= SCROLL ================= */
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* ================= MESSAGE HANDLER ================= */
  const handleIncomingMessage = useCallback(
    (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
      scrollToBottom();
    },
    []
  );

  /* ================= COUNTDOWN ================= */
  const startCountdown = useCallback(
    (startTimeISO: string, mins: number) => {
      const endTime =
        new Date(startTimeISO).getTime() + mins * 60 * 1000;

      if (countdownTimer.current) {
        clearInterval(countdownTimer.current);
      }

      countdownTimer.current = setInterval(() => {
        const diff = endTime - Date.now();

        if (diff <= 0) {
          clearInterval(countdownTimer.current!);
          setCountdown("00:00:00");
          router.push(`/review/${exchange_id}`);
          return;
        }

        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        setCountdown(
          `${String(h).padStart(2, "0")}:${String(m).padStart(
            2,
            "0"
          )}:${String(s).padStart(2, "0")}`
        );
      }, 1000);
    },
    [exchange_id, router]
  );

  /* ================= AUTO START COUNTDOWN ================= */
  useEffect(() => {
    if (
      exchange?.exchange_start_time &&
      exchange?.exchange_duration
    ) {
      startCountdown(
        exchange.exchange_start_time,
        exchange.exchange_duration
      );
      setShowDurationBtn(false);
    } else {
      setShowDurationBtn(true);
    }
  }, [exchange, startCountdown]);

  /* ================= SOCKET ================= */
  useEffect(() => {
    socket.on("message", handleIncomingMessage);

    socket.on("start_exchange", (data) => {
      startCountdown(data.startTime, data.duration);
      setShowDurationBtn(false);
    });

    return () => {
      socket.off("message", handleIncomingMessage);
      socket.off("start_exchange");
      if (countdownTimer.current) {
        clearInterval(countdownTimer.current);
        countdownTimer.current = null;
      }
    };
  }, [handleIncomingMessage, startCountdown]);

  /* ================= JOIN ROOM ================= */
  const handleJoin = () => {
    if (!username || !room || !exchange) return;

    if (
      username !== exchange.from_username &&
      username !== exchange.to_username
    ) {
      alert("You are not allowed in this chat");
      return;
    }

    socket.emit("join-room", { room, username });
    setJoined(true);
  };

  /* ================= SET DURATION ================= */
  const handleSetDuration = async () => {
    const minsStr = prompt("Enter duration in minutes:");
    if (!minsStr) return;

    const mins = parseInt(minsStr);
    if (isNaN(mins) || mins <= 0) return alert("Invalid duration");

    const startTime = new Date().toISOString();

    await fetch(`${API_URL}/exchange/set-duration`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exchange_id,
        start_time: startTime,
        duration: mins,
      }),
    });

    socket.emit("start_exchange", {
      room,
      startTime,
      duration: mins,
    });

    startCountdown(startTime, mins);
    setShowDurationBtn(false);
  };

  /* ================= SEND MESSAGE ================= */
  const handleMessage = (msg: string, imageUrl?: string) => {
    if (!msg.trim() && !imageUrl) return;

    const data: Message = {
      sender: username,
      message: msg,
      timestamp: new Date().toISOString(),
      imageUrl,
    };

    handleIncomingMessage(data);
    socket.emit("message", { ...data, room });
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0e1a] via-[#1a1f38] to-[#2e2b5c] px-2 flex items-center justify-center">
      {!joined ? (
        <div className="w-full max-w-md bg-white/10 p-6 rounded-2xl">
          <h1 className="text-2xl text-center font-bold mb-6">
            Join Chat
          </h1>

          <input
            className="w-full p-3 mb-3 rounded-xl bg-white/10"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button
            onClick={handleJoin}
            className="w-full py-3 bg-blue-600 rounded-xl"
          >
            Enter Chat
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl h-[100dvh] sm:h-[90vh] flex flex-col bg-white/10 rounded-2xl">
          {/* HEADER */}
          <div className="p-3 border-b sticky top-0 bg-[#0c0e1a]/80 backdrop-blur z-10">
            <p className="text-blue-300 text-sm">
              Room: {room}
            </p>

            {countdown && (
              <p className="text-yellow-400 font-bold text-lg text-center">
                ⏳ {countdown}
              </p>
            )}

            {!countdown && showDurationBtn && (
              <button
                onClick={handleSetDuration}
                className="bg-green-600 px-4 py-2 rounded-xl w-full mt-2"
              >
                Set Duration
              </button>
            )}
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m) => (
              <ChatMessage
                key={`${m.sender}-${m.timestamp}`}
                sender={m.sender}
                message={m.message}
                timestamp={m.timestamp}
                isOwnMessage={m.sender === username}
                imageUrl={m.imageUrl}
              />
            ))}
            <div ref={bottomRef} />
          </div>

          {/* INPUT */}
          <div className="p-3 border-t">
            <ChatForm onSendMessage={handleMessage} />
          </div>
        </div>
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
//   from_user_id: number;
//   from_username: string;
//   to_user_id: number;
//   to_username: string;
//   skill_offered_title: string;
//   skill_requested_title: string;
//   exchange_status: string;
//   created_at: string;
//   exchange_start_time?: string;
//   exchange_duration?: number;
// }

// // const API_URL = "http://localhost:5000";
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export default function ChatPage() {
//   const [room, setRoom] = useState("");
//   const [joined, setJoined] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [username, setUsername] = useState("");
//   const [countdown, setCountdown] = useState("");
//   const [exchange, setExchange] = useState<ExchangeDetails | null>(null);
//   const [showDurationBtn, setShowDurationBtn] = useState(false);
//   const [quitPopup, setQuitPopup] = useState(false);

//   const bottomRef = useRef<HTMLDivElement>(null);
//   const countdownTimer = useRef<NodeJS.Timeout | null>(null);

//   const router = useRouter();
//   const params = useParams();
//   const { exchange_id } = params as { exchange_id: string };

//   /* ================= FETCH EXCHANGE ================= */
//   useEffect(() => {
//     const fetchExchange = async () => {
//       try {
//         const res = await fetch(`${API_URL}/exchange/${exchange_id}`, {
//           credentials: "include",
//         });
//         if (!res.ok) throw new Error();
//         const data = await res.json();
//         setExchange(data.exchange);
//       } catch {
//         router.push("/dashboard");
//       }
//     };

//     fetchExchange();
//   }, [exchange_id, router]);

//   /* ================= SCROLL ================= */
//   const scrollToBottom = () => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   /* ================= MESSAGE HANDLER ================= */
//   const handleIncomingMessage = useCallback(
//     (msg: Message) => {
//       setMessages((prev) => {
//         const updated = [...prev, msg];
//         localStorage.setItem(`chatMessages_${room}`, JSON.stringify(updated));
//         return updated;
//       });
//       scrollToBottom();
//     },
//     [room]
//   );

//   /* ================= COUNTDOWN ================= */
//   const startCountdown = useCallback(
//     (startTimeISO: string, mins: number) => {
//       const endTime =
//         new Date(startTimeISO).getTime() + mins * 60 * 1000;

//       if (countdownTimer.current) clearInterval(countdownTimer.current);

//       countdownTimer.current = setInterval(() => {
//         const now = Date.now();
//         const diff = endTime - now;

//         if (diff <= 0) {
//           clearInterval(countdownTimer.current!);
//           setCountdown("00:00:00");
//           router.push(`/review/${exchange_id}`);
//           return;
//         }

//         const h = Math.floor(diff / 3600000);
//         const m = Math.floor((diff % 3600000) / 60000);
//         const s = Math.floor((diff % 60000) / 1000);

//         setCountdown(
//           `${String(h).padStart(2, "0")}:${String(m).padStart(
//             2,
//             "0"
//           )}:${String(s).padStart(2, "0")}`
//         );
//       }, 1000);
//     },
//     [exchange_id, router]
//   );

//   /* ================= AUTO START IF EXISTS ================= */
//   useEffect(() => {
//     if (
//       exchange?.exchange_start_time &&
//       exchange?.exchange_duration
//     ) {
//       startCountdown(
//         exchange.exchange_start_time,
//         exchange.exchange_duration
//       );
//       setShowDurationBtn(false);
//     } else {
//       setShowDurationBtn(true);
//     }
//   }, [exchange, startCountdown]);

//   /* ================= SOCKET LISTENERS ================= */
//   useEffect(() => {
//     socket.on("message", handleIncomingMessage);

//     socket.on("start_exchange", (data) => {
//       startCountdown(data.startTime, data.duration);
//       setShowDurationBtn(false);
//     });

//     return () => {
//       socket.off("message", handleIncomingMessage);
//       socket.off("start_exchange");
//       if (countdownTimer.current) clearInterval(countdownTimer.current);
//     };
//   }, [handleIncomingMessage, startCountdown]);

//   /* ================= JOIN ROOM ================= */
//   const handleJoin = () => {
//     if (!username || !room || !exchange) return;

//     if (
//       username !== exchange.from_username &&
//       username !== exchange.to_username
//     ) {
//       alert("You are not allowed in this chat");
//       return;
//     }

//     socket.emit("join-room", { room, username });
//     setJoined(true);
//   };

//   /* ================= SET DURATION ================= */
//   const handleSetDuration = async () => {
//     const minsStr = prompt("Enter duration in minutes:");
//     if (!minsStr) return;

//     const mins = parseInt(minsStr);
//     if (isNaN(mins) || mins <= 0) return alert("Invalid duration");

//     const startTime = new Date().toISOString();

//     await fetch(`${API_URL}/exchange/set-duration`, {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         exchange_id,
//         start_time: startTime,
//         duration: mins,
//       }),
//     });

//     socket.emit("start_exchange", {
//       room,
//       startTime,
//       duration: mins,
//     });

//     startCountdown(startTime, mins);
//     setShowDurationBtn(false);
//   };

//   /* ================= SEND MESSAGE ================= */
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

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c0e1a] via-[#1a1f38] to-[#2e2b5c] px-3">
//       {!joined ? (
//         <div className="w-full max-w-md bg-white/10 p-6 sm:p-10 rounded-3xl">
//           <h1 className="text-3xl text-center font-bold mb-6">Join Chat</h1>

//           <input
//             className="w-full p-3 mb-3 rounded-xl bg-white/10"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <input
//             className="w-full p-3 mb-5 rounded-xl bg-white/10"
//             placeholder="Room"
//             value={room}
//             onChange={(e) => setRoom(e.target.value)}
//           />

//           <button
//             onClick={handleJoin}
//             className="w-full py-3 bg-blue-600 rounded-xl"
//           >
//             Enter Chat
//           </button>
//         </div>
//       ) : (
//         <div className="w-full max-w-3xl h-[90vh] flex flex-col bg-white/10 rounded-3xl">
//           <div className="p-4 border-b flex flex-col gap-2">
//             <h2 className="font-bold text-blue-300">Room: {room}</h2>

//             {countdown && (
//               <p className="text-yellow-400 font-bold">{countdown}</p>
//             )}

//             {!countdown && showDurationBtn && (
//               <button
//                 onClick={handleSetDuration}
//                 className="bg-green-600 px-4 py-2 rounded-xl w-full sm:w-fit"
//               >
//                 Set Duration
//               </button>
//             )}
//           </div>

//           <div className="flex-1 overflow-y-auto p-3 space-y-2">
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

//           <div className="p-3 border-t">
//             <ChatForm onSendMessage={handleMessage} />
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

// // // const API_URL = process.env.NEXT_PUBLIC_API_URL;
// //  const API_URL = 'http://localhost:5000'

// // export default function ChatPage() {
// //   const [room, setRoom] = useState("");
// //   const [joined, setJoined] = useState(false);
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [username, setUsername] = useState("");
// //   const [countdown, setCountdown] = useState("");
// //   const [quitPopup, setQuitPopup] = useState(false);
// //   const [exchange, setExchange] = useState<ExchangeDetails | null>(null);
// //   const [showDurationBtn, setShowDurationBtn] = useState(false);

// //   const bottomRef = useRef<HTMLDivElement>(null);
// //   const countdownTimer = useRef<NodeJS.Timeout | null>(null);
// //   const router = useRouter();
// //   const params = useParams();
// //   const { exchange_id } = params as { exchange_id: string };

// //   // ---------- Fetch exchange details ----------
// //   useEffect(() => {
// //     // if (!exchange_id) return;

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

// //   // ---------- Scroll ----------
// //   const scrollToBottom = useCallback(() => {
// //     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, []);

// //   // ---------- Handle messages ----------
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

// //       if (countdownTimer.current) clearInterval(countdownTimer.current);

// //       countdownTimer.current = setInterval(async () => {
// //         const now = new Date().getTime();
// //         const distance = endTime - now;

// //         if (distance <= 0) {
// //           if (countdownTimer.current) clearInterval(countdownTimer.current);
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
// //     [exchange_id, router]
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
// //       if (countdownTimer.current) clearInterval(countdownTimer.current);
// //     };
// //   }, [room, handleIncomingMessage, handleUserJoined, handleUserLeft, handleStartExchange]);

// //   // ---------- Join room ----------
// //   const joinRoom = (user: string, roomName: string) => {
// //     socket.emit("join-room", { username: user, room: roomName });
// //     setShowDurationBtn(true); // Show duration button after joining
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

// //   // ---------- Set Duration ----------
// //   const handleSetDuration = () => {
// //     const minsStr = prompt("Enter duration in minutes:");
// //     if (!minsStr) return;
// //     const mins = parseInt(minsStr);
// //     if (isNaN(mins) || mins <= 0) {
// //       alert("Please enter a valid number of minutes.");
// //       return;
// //     }

// //     const startTime = new Date().toISOString();

// //     // Emit to all users
// //     socket.emit("start_exchange", { startTime, duration: mins });

// //     // Start locally as well
// //     startCountdown(startTime, mins);
// //     setShowDurationBtn(false);
// //   };

// //   // ---------- Send message ----------
// //   const handleMessage = (msg: string, imageUrl?: string) => {
// //     if (!msg.trim() && !imageUrl) return;
// //     const data: Message = { sender: username, message: msg, timestamp: new Date().toISOString(), imageUrl };
// //     handleIncomingMessage(data);
// //     socket.emit("message", { ...data, room });
// //   };

// //   // ---------- Quit ----------
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
// //               {showDurationBtn && !countdown && (
// //                 <button
// //                   onClick={handleSetDuration}
// //                   className="px-4 py-2 bg-green-600 rounded-xl hover:bg-green-700 mt-2"
// //                 >
// //                   Set Duration
// //                 </button>
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


// // // see upgrade this code in theses aspct
// // // .1 make it responsive on smaller devices
// // // 2. when a user enters a room show a button set duration both if duration has aready been set show the countdown and when they set duration start the countdown for both users yo get the logic right




















// // "use client";

// // import { useEffect, useState, useRef } from "react";
// // import { socket } from "@/lib/socketClient";
// // import { useRouter } from "next/navigation";
// // import ChatForm from "@/components/chatComponent1/page";
// // import ChatMessage from "@/components/chatComponent2/page";

// // interface Message {
// //   sender: string;
// //   message: string;
// //   timestamp: string;
// //   system?: boolean;
// //   imageUrl?: string;
// // }

// // interface ChatSession {
// //   username: string;
// //   room: string;
// //   duration?: number;
// //   startTime?: string;
// // }

// // export default function HomePage() {
// //   const [room, setRoom] = useState<string>("");
// //   const [joined, setJoined] = useState(false);
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [username, setUsername] = useState<string>("");
// //   const [countdown, setCountdown] = useState<string>("");
// //   const [durationPopup, setDurationPopup] = useState(false);
// //   const [duration, setDuration] = useState<number>(5);
// //   const [quitPopup, setQuitPopup] = useState(false);

// //   const bottomRef = useRef<HTMLDivElement>(null);
// //   const router = useRouter();

// //   const storageSessionKey = `chatSession_${room}`;
// //   const storageOtherSessionKey = `chatOtherSession_${room}`;
// //   const storageMessagesKey = `chatMessages_${room}`;

// //   let countdownTimer: NodeJS.Timeout;

// //   // ---------------- Load session ----------------
// //   useEffect(() => {
// //     if (typeof window === "undefined") return;

// //     const sessionData = localStorage.getItem(storageSessionKey);
// //     const otherData = localStorage.getItem(storageOtherSessionKey);

// //     if (sessionData) {
// //       const session: ChatSession = JSON.parse(sessionData);
// //       setUsername(session.username);
// //       setRoom(session.room);
// //       setDuration(session.duration || 5);
// //       setJoined(true);

// //       joinRoom(session.username, session.room);

// //       if (session.startTime) {
// //         startCountdown(session.startTime, session.duration || 5);
// //       }
// //     } else if (otherData) {
// //       const other: ChatSession = JSON.parse(otherData);
// //       setUsername(other.username);
// //       setRoom(other.room);
// //       setJoined(true);

// //       joinRoom(other.username, other.room);

// //       const firstSession = localStorage.getItem(`chatSession_${other.room}`);
// //       if (firstSession) {
// //         const fs: ChatSession = JSON.parse(firstSession);
// //         if (fs.startTime) startCountdown(fs.startTime, fs.duration || 5);
// //       }
// //     }
// //   }, []);

// //   // ---------------- Load messages ----------------
// //   useEffect(() => {
// //     if (!room) return;
// //     const stored = localStorage.getItem(storageMessagesKey);
// //     if (stored) {
// //       try {
// //         const parsed = JSON.parse(stored);
// //         if (Array.isArray(parsed)) setMessages(parsed);
// //         else localStorage.removeItem(storageMessagesKey);
// //       } catch {
// //         localStorage.removeItem(storageMessagesKey);
// //       }
// //     }
// //   }, [room]);

// //   // ---------------- Socket listeners ----------------
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
// //       clearInterval(countdownTimer);
// //     };
// //   }, [room]);

// //   function handleIncomingMessage(data: Message) {
// //     setMessages((prev) => {
// //       const updated = [...prev, data];
// //       localStorage.setItem(storageMessagesKey, JSON.stringify(updated));
// //       scrollToBottom();
// //       return updated;
// //     });
// //   }

// //   function handleUserJoined(data: { message: string; timestamp: string }) {
// //     const msg: Message = { ...data, sender: "system", system: true };
// //     setMessages((prev) => [...prev, msg]);
// //   }

// //   function handleUserLeft(data: { message: string; timestamp: string }) {
// //     const msg: Message = { ...data, sender: "system", system: true };
// //     setMessages((prev) => [...prev, msg]);
// //   }

// //   function handleStartExchange(data: { startTime: string; duration: number }) {
// //     startCountdown(data.startTime, data.duration);
// //   }

// //   function joinRoom(user: string, roomName: string) {
// //     socket.emit("join-room", { username: user, room: roomName });
// //   }

// //   function handleJoin() {
// //     if (!username || !room) return;

// //     const firstUser = !localStorage.getItem(storageSessionKey);
// //     if (!firstUser) {
// //       localStorage.setItem(storageOtherSessionKey, JSON.stringify({ username, room }));
// //     }

// //     setJoined(true);
// //     joinRoom(username, room);
// //   }

// //   // ---------------- Duration popup ----------------
// //   function startExchangeWithDuration() {
// //     const startTime = new Date().toISOString();
// //     const session: ChatSession = { username, room, duration, startTime };
// //     localStorage.setItem(storageSessionKey, JSON.stringify(session));
// //     setDurationPopup(false);

// //     socket.emit("start_exchange", { room, duration, startTime });
// //     startCountdown(startTime, duration);
// //   }

// //   // ---------------- Countdown ----------------
// //   function startCountdown(startTimeISO: string, mins: number) {
// //     const endTime = new Date(new Date(startTimeISO).getTime() + mins * 60000).getTime();

// //     countdownTimer = setInterval(() => {
// //       const now = new Date().getTime();
// //       const distance = endTime - now;

// //       if (distance <= 0) {
// //         setCountdown("00:00:00");
// //         clearInterval(countdownTimer);
// //         setQuitPopup(true);
// //         return;
// //       }

// //       const hours = Math.floor(distance / (1000 * 60 * 60));
// //       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
// //       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

// //       setCountdown(
// //         `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
// //       );
// //     }, 1000);
// //   }

// //   function handleMessage(msg: string, imageUrl?: string) {
// //     if (!msg.trim() && !imageUrl) return;
// //     const timestamp = new Date().toISOString();
// //     const data: Message = { sender: username, message: msg, timestamp, imageUrl };
// //     handleIncomingMessage(data);
// //     socket.emit("message", { ...data, room });
// //   }

// //   const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: "smooth" });

// //   function quitExchange() {
// //     setQuitPopup(true);
// //   }

// //   function confirmQuit() {
// //     localStorage.removeItem(storageSessionKey);
// //     localStorage.removeItem(storageOtherSessionKey);
// //     localStorage.removeItem(storageMessagesKey);
// //     socket.emit("leave-room", room);
// //     router.push("/review");
// //   }

// //   return (
// //     <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#1e1b4b] text-white pt-24">
// //       {!joined ? (
// //         <div className="bg-white/10 p-10 rounded-3xl border border-white/10 w-full max-w-md text-center backdrop-blur-md shadow-xl shadow-purple-900/40">
// //           <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
// //             Join a Chat Room
// //           </h1>
// //           <input
// //             type="text"
// //             value={username}
// //             onChange={(e) => setUsername(e.target.value)}
// //             placeholder="Enter your username..."
// //             className="w-full px-4 py-3 mt-5 rounded-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
// //           />
// //           <input
// //             type="text"
// //             value={room}
// //             onChange={(e) => setRoom(e.target.value)}
// //             placeholder="Enter room name..."
// //             className="w-full px-4 py-3 mt-3 rounded-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //           <button
// //             onClick={handleJoin}
// //             className="w-full py-3 mt-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-pink-500 text-white font-semibold rounded-full shadow-lg shadow-purple-500/30 transition-all duration-300"
// //           >
// //             Enter Chat 🚀
// //           </button>
// //         </div>
// //       ) : (
// //         <div className="w-full max-w-3xl mx-auto flex flex-col bg-white/10 border border-white/10 rounded-3xl backdrop-blur-md shadow-lg shadow-purple-900/40">
// //           <div className="flex justify-between items-center p-4 border-b border-white/20 bg-white/10 backdrop-blur-xl rounded-t-3xl">
// //             <div>
// //               <h2 className="text-xl font-semibold text-blue-300">Room: {room}</h2>
// //               {countdown ? (
// //                 <p className="text-yellow-400 text-lg font-bold mt-1 drop-shadow-lg">{countdown}</p>
// //               ) : (
// //                 <button
// //                   onClick={() => setDurationPopup(true)}
// //                   className="px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition"
// //                 >
// //                   Set Duration
// //                 </button>
// //               )}
// //             </div>
// //             {countdown && (
// //               <button
// //                 onClick={quitExchange}
// //                 className="px-4 py-2 bg-red-600 rounded-xl hover:bg-red-700 transition"
// //               >
// //                 Quit Exchange
// //               </button>
// //             )}
// //           </div>

// //           <div className="flex-1 overflow-y-auto max-h-[400px] p-5 space-y-3 scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-transparent">
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

// //           <div className="p-4 border-t border-white/10">
// //             <ChatForm onSendMessage={handleMessage} />
// //           </div>
// //         </div>
// //       )}

// //       {/* Duration Popup */}
// //       {durationPopup && (
// //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
// //           <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 max-w-sm w-full text-center">
// //             <h2 className="text-xl font-semibold text-white mb-4">Set Duration (minutes)</h2>
// //             <input
// //               type="number"
// //               min={1}
// //               value={duration}
// //               onChange={(e) => setDuration(Number(e.target.value))}
// //               className="w-full mb-5 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
// //             />
// //             <button
// //               onClick={startExchangeWithDuration}
// //               className="px-6 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition"
// //             >
// //               Start Countdown
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Quit Popup */}
// //       {quitPopup && (
// //         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
// //           <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 max-w-md w-full text-center">
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


// // // see this idea 
// // //1. use this api to fetch details about a particular skill and then show the 2topic of the skill in both the user chta page u get  and when the user enters their username comfirm it with the api so onl users that are in exchnage can chat u get me.. now do it
// // // see the api use params router.get("/exchange/:exchange_id",
// // //  now th the bakcend 
// // exports.getExchangeDetails = async (req, res) => {
// //   try {
// //     const { exchange_id } = req.params;
// //     const userId = req.user?.id;

// //     const query = `
// //       SELECT
// //         es.id AS exchange_id,
// //         es.exchange_status,
// //         es.status,
// //         es.created_at,

// //         -- Users
// //         u1.id AS from_user_id,
// //         u1.username AS from_username,
// //         u2.id AS to_user_id,
// //         u2.username AS to_username,

// //         -- Skills
// //         s_offer.id AS skill_offered_id,
// //         s_offer.title AS skill_offered_title,

// //         s_req.id AS skill_requested_id,
// //         s_req.title AS skill_requested_title

// //       FROM exchange_skills es
// //       JOIN users u1 ON es.from_user_id = u1.id
// //       JOIN users u2 ON es.to_user_id = u2.id
// //       JOIN skills s_offer ON es.skill_offered_id = s_offer.id
// //       JOIN skills s_req ON es.skill_requested_id = s_req.id
// //       WHERE es.id = $1
// //         AND (es.from_user_id = $2 OR es.to_user_id = $2)
// //     `;

// //     const result = await db.query(query, [exchange_id, userId]);

// //     if (result.rows.length === 0) {
// //       return res.status(404).json({ message: "Exchange not found" });
// //     }

// //     res.json({
// //       success: true,
// //       exchange: result.rows[0],
// //     });
// //   } catch (err) {
// //     console.error("❌ Fetch exchange error:", err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };


















































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

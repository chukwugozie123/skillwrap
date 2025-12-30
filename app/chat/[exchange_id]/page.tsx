// "use client";

// import { useEffect, useState, useRef } from "react";
// import { socket } from "@/lib/socketClient";
// import Link from "next/link";
// import ChatForm from "@/components/chatComponent1/page";
// import ChatMessage from "@/components/chatComponent2/page";

// // Countdown timer component
// function Countdown({ endTime }: { endTime: number }) {
//   const [timeLeft, setTimeLeft] = useState(endTime - Date.now());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft(endTime - Date.now());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [endTime]);

//   if (timeLeft <= 0) return <span className="text-red-400 font-semibold">Time's up!</span>;

//   const minutes = Math.floor(timeLeft / 1000 / 60);
//   const seconds = Math.floor((timeLeft / 1000) % 60);

//   return (
//     <span className="text-cyan-300 font-semibold">{minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}</span>
//   );
// }

// export default function HomePage() {
//   const [room, setRoom] = useState("");
//   const [joined, setJoined] = useState(false);
//   const [username, setUsername] = useState("");
//   const [messages, setMessages] = useState<any[]>([]);
//   const [popup, setPopup] = useState(false);
//   const [exchangeInfo, setExchangeInfo] = useState<{topic: string, duration: number, users: number} | null>(null);
//   const [timerEnd, setTimerEnd] = useState<number | null>(null);

//   const storageKey = room ? `chat_${room}` : "";

// useEffect(() => {
//   if (!room || typeof window === "undefined") return;

//   const stored = localStorage.getItem(storageKey);
//   if (stored) {
//     try {
//       const parsed = JSON.parse(stored);
//       if (Array.isArray(parsed)) {
//         setMessages(parsed);
//       } else {
//         console.warn("Stored chat is not an array. Resetting...");
//         setMessages([]);
//         localStorage.removeItem(storageKey);
//       }
//     } catch (err) {
//       console.error("Failed to parse stored chat history", err);
//       setMessages([]);
//       localStorage.removeItem(storageKey);
//     }
//   }
// }, [room]);


//   // Load chat session if any
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const sessionKeys = Object.keys(localStorage).filter(k => k.startsWith("chat_"));
//     if (sessionKeys.length > 0) {
//       const lastChat = localStorage.getItem(sessionKeys[0]);
//       if (lastChat) {
//         try {
//           const { username, room, exchangeInfo, timerEnd } = JSON.parse(lastChat);
//           if (username && room) {
//             setUsername(username);
//             setRoom(room);
//             setJoined(true);
//             setExchangeInfo(exchangeInfo);
//             setTimerEnd(timerEnd);
//             socket.emit("join-room", { room, username });
//           }
//         } catch (err) {
//           console.error("Invalid chat session data", err);
//         }
//       }
//     }
//   }, []);

//   // Load messages from localStorage
//   useEffect(() => {
//     if (!room) return;
//     const stored = localStorage.getItem(storageKey);
//     if (stored) {
//       try {
//         setMessages(JSON.parse(stored));
//       } catch {
//         localStorage.removeItem(storageKey);
//       }
//     }
//   }, [room]);

//   // Socket listeners
//   useEffect(() => {
//     if (!room) return;

//     const handleMessage = (data: any) => {
//       setMessages(prev => {
//         const updated = [...prev, data];
//         localStorage.setItem(storageKey, JSON.stringify(updated));
//         return updated;
//       });
//     };

//     const handleUserJoined = (data: { message: string; timestamp: string }) => {
//       setMessages(prev => [...prev, { sender: "system", message: data.message, timestamp: data.timestamp }]);
//     };

//     const handleUserLeft = (data: { message: string; timestamp: string }) => {
//       setMessages(prev => [...prev, { sender: "system", message: data.message, timestamp: data.timestamp }]);
//     };

//     socket.on("message", handleMessage);
//     socket.on("user_joined", handleUserJoined);
//     socket.on("user_left", handleUserLeft);

//     return () => {
//       socket.off("message", handleMessage);
//       socket.off("user_joined", handleUserJoined);
//       socket.off("user_left", handleUserLeft);
//     };
//   }, [room]);

//   // Save popup info to localStorage
//   const saveInfo = (topic: string, duration: number, users: number) => {
//     const endTime = Date.now() + duration * 60 * 1000; // duration in minutes
//     const info = { topic, duration, users };
//     setExchangeInfo(info);
//     setTimerEnd(endTime);
//     setPopup(false);

//     localStorage.setItem(
//       `chat_${room}`,
//       JSON.stringify({ username, room, exchangeInfo: info, timerEnd: endTime })
//     );
//   };

//   // Join room
//   const handleJoin = () => {
//     if (!room || !username) return;

//     // Check if first user
//     const firstUser = !localStorage.getItem(`popup_${room}`);
//     if (firstUser) {
//       setPopup(true);
//       localStorage.setItem(`popup_${room}`, "shown");
//     }

//     setJoined(true);
//     socket.emit("join-room", { room, username });

//     // Save session
//     localStorage.setItem(`chat_${room}`, JSON.stringify({ username, room, exchangeInfo, timerEnd }));
//   };

//   // Send message
//   const handleMessage = (message: string) => {
//     if (!message.trim()) return;
//     const timestamp = new Date().toISOString();
//     const data = { sender: username, message, timestamp };
//     setMessages(prev => {
//       const updated = [...prev, data];
//       localStorage.setItem(storageKey, JSON.stringify(updated));
//       return updated;
//     });
//     socket.emit("message", { room, ...data });
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#1e1b4b] text-white">
//       {!joined ? (
//         <div className="mt-20 p-10 bg-white/10 rounded-3xl backdrop-blur-md w-full max-w-md text-center border border-white/10 shadow-lg shadow-purple-900/40">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Join Chat Room</h1>
//           <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full mt-5 px-4 py-3 rounded-full bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
//           <input value={room} onChange={e => setRoom(e.target.value)} placeholder="Room code" className="w-full mt-3 px-4 py-3 rounded-full bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
//           <button onClick={handleJoin} className="w-full mt-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-pink-500 rounded-full shadow-lg font-semibold">Enter Chat 🚀</button>
//           <Link href="/dashboard"><button className="mt-3 text-sm underline">Go back</button></Link>
//         </div>
//       ) : (
//         <div className="w-full max-w-3xl mt-10 flex flex-col bg-white/10 rounded-3xl border border-white/10 p-6 backdrop-blur-xl shadow-lg shadow-purple-900/40">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-blue-400">Room: {room}</h2>
//             {exchangeInfo && timerEnd && <Countdown endTime={timerEnd} />}
//           </div>

//           {exchangeInfo && <p className="text-cyan-300 mb-2 font-medium">Topic: {exchangeInfo.topic}</p>}

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto max-h-[400px] space-y-3 mb-4 scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-transparent">
//             {messages.map((msg, i) => (
//               <ChatMessage key={i} sender={msg.sender} message={msg.message} timestamp={msg.timestamp} isOwnMessage={msg.sender === username} />
//             ))}
//           </div>

//           <ChatForm onSendMessage={handleMessage} />
//         </div>
//       )}

//       {/* Popup for first user */}
//       {popup && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-gradient-to-b from-blue-900/60 to-blue-950/40 border border-blue-400/30 backdrop-blur-2xl p-8 rounded-3xl shadow-[0_0_40px_rgba(0,150,255,0.3)] w-[90%] max-w-sm text-center relative">
//             <button onClick={() => setPopup(false)} className="absolute top-3 right-3 text-white/70 hover:text-white text-xl">✕</button>
//             <h2 className="text-2xl font-bold mb-4 text-cyan-300">Start Your Skill Exchange</h2>
//             <input id="topic" type="text" placeholder="Topic of Exchange" className="w-full mb-3 px-4 py-2 rounded-xl bg-white/10 text-white placeholder:text-gray-400 focus:outline-none"/>
//             <input id="duration" type="number" placeholder="Duration in minutes" className="w-full mb-3 px-4 py-2 rounded-xl bg-white/10 text-white placeholder:text-gray-400 focus:outline-none"/>
//             <input id="users" type="number" placeholder="Number of people" className="w-full mb-4 px-4 py-2 rounded-xl bg-white/10 text-white placeholder:text-gray-400 focus:outline-none"/>
//             <button className="w-full py-2 bg-blue-600 rounded-xl font-semibold hover:opacity-90" onClick={() => saveInfo(
//               (document.getElementById("topic") as HTMLInputElement).value,
//               Number((document.getElementById("duration") as HTMLInputElement).value),
//               Number((document.getElementById("users") as HTMLInputElement).value)
//             )}>Start Exchange</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }













































// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import Link from "next/link";
// // // import { socket } from "@/lib/socketClient";
// // // import { useRouter } from "next/navigation";

// // // interface RoomItem {
// // //   roomId: string;
// // //   lastMessage: string;
// // //   lastTimestamp: string;
// // //   unread: number;
// // // }

// // // export default function ChatHistoryPage() {
// // //   const [rooms, setRooms] = useState<RoomItem[]>([]);
// // //   const [roomCode, setRoomCode] = useState("");
// // //   const router = useRouter();

// // //   useEffect(() => {
// // //     socket.emit("get_user_rooms");

// // //     socket.on("user_rooms", (data) => {
// // //       setRooms(data);
// // //     });

// // //     return () => {
// // //       socket.off("user_rooms");
// // //     };
// // //   }, []);

// // //   const joinByCode = () => {
// // //     if (!roomCode.trim()) return;

// // //     router.push(`/chats/${roomCode}`);
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-[#0f1629] text-white p-6">
// // //       <h1 className="text-3xl font-bold mb-6">Chat History</h1>

// // //       {/* 🔥 NO CHAT HISTORY — ASK USER TO ENTER A ROOM CODE */}
// // //       {rooms.length === 0 ? (
// // //         <div className="bg-white/5 p-6 rounded-xl border border-white/10">
// // //           <p className="text-gray-300 mb-4">
// // //             You have no chats yet. Enter a room code to start chatting.
// // //           </p>

// // //           <input
// // //             value={roomCode}
// // //             onChange={(e) => setRoomCode(e.target.value)}
// // //             placeholder="Enter Room Code"
// // //             className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 mb-3"
// // //           />

// // //           <button
// // //             onClick={joinByCode}
// // //             className="w-full py-2 bg-blue-600 rounded-lg">
// // //             Join Room
// // //           </button>
// // //         </div>
// // //       ) : (
// // //         <div className="space-y-4">
// // //           {rooms.map((room) => (
// // //             <Link key={room.roomId} href={`/chat/${room.roomId}`}>
// // //               <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer flex items-center justify-between">
// // //                 <div>
// // //                   <h2 className="text-lg font-semibold">{room.roomId}</h2>
// // //                   <p className="text-gray-400 text-sm">{room.lastMessage}</p>
// // //                 </div>

// // //                 <div className="text-right">
// // //                   <p className="text-xs text-gray-400">{room.lastTimestamp}</p>
// // //                   {room.unread > 0 && (
// // //                     <span className="mt-1 inline-block bg-blue-500 px-2 py-1 rounded-full text-xs">
// // //                       {room.unread}
// // //                     </span>
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             </Link>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }









// // // firstly upgrade style of the popup and make it look attractive relative to dark blue galssmorphism and when th user fills in thoes input store them in local storage and when the both user eneters a room show the countdown of the minutes the putt like do countdown from that time to 00:00:00 seconds 
// // // do u understand and also put the tittle or topic of the excange in the chat room so they can see it and also upgrade style of all the whole chat componenet when a user enter a roo let the other user see that a user has enter thta room 
// // // and tell me what u did and what u added to thee code

// // // do u understand and can you do it???????????
// // // if yes do iy aand i will sennd all the chat componene so u can upgrade it very very well









































// "use client";

// import { useEffect, useState, useRef } from "react";
// import { socket } from "@/lib/socketClient";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import ChatForm from "@/components/chatComponent1/page";
// import ChatMessage from "@/components/chatComponent2/page";

// interface Message {
//   sender: string;
//   message: string;
//   timestamp: string;
//   system?: boolean;
//   imageUrl?: string;
// }

// interface ChatSession {
//   username: string;
//   room: string;
//   topic?: string;
//   duration?: number;
//   people?: number;
//   startTime?: string;
// }

// export default function HomePage() {
//   const [room, setRoom] = useState<string>("");
//   const [joined, setJoined] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [username, setUsername] = useState<string>("");
//   const [topic, setTopic] = useState("");
//   const [duration, setDuration] = useState(10); // minutes
//   const [people, setPeople] = useState(2);
//   const [countdown, setCountdown] = useState<string>("");

//   const router = useRouter()

//   const bottomRef = useRef<HTMLDivElement>(null);

//   const storageSessionKey = `chatSession_${room}`; // first user
//   const storageOtherSessionKey = `chatOtherSession_${room}`; // other users
//   const storageMessagesKey = `chatMessages_${room}`;

//   // ---------------- Load session from localStorage ----------------
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     // Load first user or other user's session
//     const sessionData =
//       localStorage.getItem(storageSessionKey) ||
//       localStorage.getItem(storageOtherSessionKey);

//     if (sessionData) {
//       try {
//         const session: ChatSession = JSON.parse(sessionData);
//         setUsername(session.username);
//         setRoom(session.room);
//         setTopic(session.topic || "");
//         setDuration(session.duration || 10);
//         setPeople(session.people || 2);
//         setJoined(true);

//         joinRoom(session.username, session.room);

//         // If exchange already started, start countdown
//         if (session.startTime) {
//           startCountdown(session.startTime, session.duration || 10);
//         }
//       } catch {
//         console.error("Invalid chat session data");
//       }
//     }
//   }, []);

//   // ---------------- Load messages ----------------
//   useEffect(() => {
//     if (!room) return;

//     const stored = localStorage.getItem(storageMessagesKey);
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         if (Array.isArray(parsed)) setMessages(parsed);
//         else localStorage.removeItem(storageMessagesKey);
//       } catch {
//         localStorage.removeItem(storageMessagesKey);
//       }
//     }
//   }, [room]);

//   // ---------------- Socket listeners ----------------
//   useEffect(() => {
//     if (!room) return;

//     socket.on("message", handleIncomingMessage);
//     socket.on("user_joined", handleUserJoined);
//     socket.on("user_left", handleUserLeft);
//     socket.on("start_exchange", handleStartExchange);

//     return () => {
//       socket.off("message", handleIncomingMessage);
//       socket.off("user_joined", handleUserJoined);
//       socket.off("user_left", handleUserLeft);
//       socket.off("start_exchange", handleStartExchange);
//     };
//   }, [room]);

//   // ---------------- Socket handlers ----------------
//   function handleIncomingMessage(data: Message) {
//     setMessages((prev) => {
//       const updated = [...prev, data];
//       localStorage.setItem(storageMessagesKey, JSON.stringify(updated));
//       scrollToBottom();
//       return updated;
//     });
//   }

//   function handleUserJoined(data: { message: string; timestamp: string }) {
//     const msg: Message = { ...data, sender: "system", system: true };
//     setMessages((prev) => [...prev, msg]);
//   }

//   function handleUserLeft(data: { message: string; timestamp: string }) {
//     const msg: Message = { ...data, sender: "system", system: true };
//     setMessages((prev) => [...prev, msg]);
//   }

//   function handleStartExchange(data: { startTime: string; duration: number; topic: string }) {
//     setTopic(data.topic);
//     startCountdown(data.startTime, data.duration);
//   }

//   // ---------------- Join room ----------------
//   function joinRoom(user: string, roomName: string) {
//     socket.emit("join-room", { username: user, room: roomName });
//   }

//   function handleJoin() {
//     if (!username || !room) return;

//     const firstUser = !localStorage.getItem(storageSessionKey);

//     if (firstUser) setPopupOpen(true);
//     else {
//       // Second user stores separately
//       localStorage.setItem(storageOtherSessionKey, JSON.stringify({ username, room }));
//     }

//     joinRoom(username, room);
//     setJoined(true);
//   }

//   // ---------------- Save popup info ----------------
//   function savePopupInfo() {
//     const startTime = new Date().toISOString();
//     const session: ChatSession = { username, room, topic, duration, people, startTime };
//     localStorage.setItem(storageSessionKey, JSON.stringify(session));
//     setPopupOpen(false);

//     // Notify server so other users can receive countdown info
//     socket.emit("start_exchange", { room, topic, duration, startTime });
//     startCountdown(startTime, duration);
//   }

//   // ---------------- Countdown ----------------
//   function startCountdown(startTimeISO: string, mins: number) {
//     const endTime = new Date(new Date(startTimeISO).getTime() + mins * 60000).getTime();

//     const timer = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = endTime - now;

//       if (distance <= 0) {
//         setCountdown("00:00:00");
//         clearInterval(timer);
//         return;
//       }

//       const hours = Math.floor(distance / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       setCountdown(
//         `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
//       );
//     }, 1000);
//   }

//   // ---------------- Send message ----------------
//   function handleMessage(msg: string, imageUrl?: string) {
//     if (!msg.trim() && !imageUrl) return;
//     const timestamp = new Date().toISOString();
//     const data: Message = { sender: username, message: msg, timestamp, imageUrl };
//     handleIncomingMessage(data);
//     socket.emit("message", { ...data, room });
//   }

//   const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: "smooth" });

//   function quitExchange() {
//     localStorage.removeItem(storageSessionKey);
//     localStorage.removeItem(storageOtherSessionKey);
//     localStorage.removeItem(storageMessagesKey);
//     socket.emit("leave-room", room);
//     setJoined(false);
//     setRoom("");
//     setMessages([]);

//     useEffect(() => {
//       router.push('/review')
//     }, [])
//   }

//   // ---------------- UI ----------------
//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#1e1b4b] text-white pt-24">
//       {!joined ? (
//         <div className="bg-white/10 p-10 rounded-3xl border border-white/10 w-full max-w-md text-center backdrop-blur-md shadow-xl shadow-purple-900/40">
//           <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//             Join a Chat Room
//           </h1>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter your username..."
//             className="w-full px-4 py-3 mt-5 rounded-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//           <input
//             type="text"
//             value={room}
//             onChange={(e) => setRoom(e.target.value)}
//             placeholder="Enter room name..."
//             className="w-full px-4 py-3 mt-3 rounded-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleJoin}
//             className="w-full py-3 mt-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-pink-500 text-white font-semibold rounded-full shadow-lg shadow-purple-500/30 transition-all duration-300"
//           >
//             Enter Chat 🚀
//           </button>
//         </div>
//       ) : (
//         <div className="w-full max-w-3xl mx-auto flex flex-col bg-white/10 border border-white/10 rounded-3xl backdrop-blur-md shadow-lg shadow-purple-900/40">
//           {/* Top Bar */}
//           <div className="flex justify-between items-center p-4 border-b border-white/20">
//             <div>
//               <h2 className="text-xl font-semibold text-blue-400">Room: {room}</h2>
//         <p className="text-gray-300 text-sm">Topic: {topic}</p>
//               {countdown && <p className="text-gray-400 text-sm mt-1">Time left: {countdown}</p>}
//             </div>
//             <button
//               onClick={quitExchange}
//               className="px-4 py-2 bg-red-600 rounded-xl hover:bg-red-700 transition"
//             >
//               Quit Exchange
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto max-h-[400px] p-5 space-y-3 scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-transparent">
//             {Array.isArray(messages) &&
//               messages.map((msg, i) => (
//                 <ChatMessage
//                   key={i}
//                   sender={msg.sender}
//                   message={msg.message}
//                   timestamp={msg.timestamp}
//                   isOwnMessage={msg.sender === username}
//                   imageUrl={msg.imageUrl}
//                 />
//               ))}
//             <div ref={bottomRef} />
//           </div>

//           {/* Input */}
//           <div className="p-4 border-t border-white/10">
//             <ChatForm onSendMessage={handleMessage} />
//           </div>
//         </div>
//       )}

//       {/* Popup for first user */}
//       {popupOpen && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-gradient-to-b from-blue-900/60 to-blue-950/40 border border-blue-400/30 backdrop-blur-2xl p-8 rounded-3xl shadow-[0_0_40px_rgba(0,150,255,0.3)] w-[90%] max-w-sm text-center">
//             <h2 className="text-xl font-semibold text-white mb-4">Start Exchange</h2>
//             <input
//               type="text"
//               placeholder="Topic of exchange"
//               value={topic}
//               onChange={(e) => setTopic(e.target.value)}
//               className="w-full mb-3 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <input
//               type="number"
//               placeholder="Duration (minutes)"
//               value={duration}
//               onChange={(e) => setDuration(Number(e.target.value))}
//               className="w-full mb-3 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <input
//               type="number"
//               placeholder="Number of people"
//               value={people}
//               onChange={(e) => setPeople(Number(e.target.value))}
//               className="w-full mb-5 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={savePopupInfo}
//               className="px-6 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
//             >
//               Start
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // the second user doesnt still get the countdown why ur not doing things right ooo let me paste what localstorages says and i have another task for you 
// // first task1: when the count down reach 00:00:00 redirect to /reviews and when the press quit exchange show a popup telling them the skill hass succesfully been quit and put a p tag and a ,link saying leave a review 

// //  see what i copied from localstorage

// // but first let me say this 
// // i enter two differnt user u can see it there please check for th mistake and fix it....  if you can??


// //also when i refresh the page  and put in those detalis in the input which are the username and room name i dont even see the countdown again or the topic soo u can see where the error is ur not renere the data rom the localstorage ur rendering it based on what they put ehrn they fill the input use getItem to get info from localstorage and after it all tell me what u did 
// //chatsession_room1
// // {username: "UserA", room: "room1", topic: "graphic design ", duration: 5, people: 2,…}
// // duration: 5
// // people: 2
// // room: "room1"
// // startTime: "2025-12-12T11:40:07.142Z"
// // topic: "graphic design "
// // username: "UserA"

// // chatOthersession_room1
// // {username: "userB", room: "room1"}
// // room: "room1"
// // username: "userB"

// //chatmessgaes_room1
// // [{sender: "UserA", message: "hiiiiiiiiii", timestamp: "2025-12-12T11:40:23.861Z"},…]
// // 0:  {sender: "UserA", message: "hiiiiiiiiii", timestamp: "2025-12-12T11:40:23.861Z"}
// // 1: {0: "u", 1: "s", 2: "e", 3: "r", 4: "B", 5: " ", 6: "j", 7: "o", 8: "i", 9: "n", 10: "e", 11: "d",…}
// // 2:  {sender: "userB", message: "h"}



// // i copied and pasted everthing so u can find where the error is and upgrade style espeacially the timmer and topic that section restyke verything modern releative to dark blue glassmorphism





































































// "use client";

// type ExchangeRequest = {
//   exchange_id: string;
//   from_user_id: number;
//   from_username: string;
//   from_fullname: string;
//   to_user_id: string;
//   to_user_username: string;
//   skill_offered_title: string;
//   requested_skill_title: string;
//   status: string;
//   created_at: string;
// };


// import { useEffect, useState, useRef } from "react";
// import { socket } from "@/lib/socketClient";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import ChatForm from "@/components/chatComponent1/page";
// import ChatMessage from "@/components/chatComponent2/page";

// interface Message {
//   sender: string;
//   message: string;
//   timestamp: string;
//   system?: boolean;
//   imageUrl?: string;
// }

// interface ChatSession {
//   username: string;
//   room: string;
//   topic?: string;
//   duration?: number;
//   people?: number;
//   startTime?: string;
// }

// export default function HomePage({ currentUserId }: { currentUserId: number }) {
//   const [room, setRoom] = useState<string>("");
//   const [joined, setJoined] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [quitPopup, setQuitPopup] = useState(false);

//   const [username, setUsername] = useState<string>("");
//   const [topic, setTopic] = useState("");
//   const [duration, setDuration] = useState(10); // minutes
//   const [people, setPeople] = useState(2);
//   const [countdown, setCountdown] = useState<string>("");

//   const router = useRouter();
//   const bottomRef = useRef<HTMLDivElement>(null);

//   const [requests, setRequests] = useState<ExchangeRequest[]>([]);

//   const API_URL = 'http://localhost:5000'

//   const storageSessionKey = `chatSession_${room}`;
//   const storageOtherSessionKey = `chatOtherSession_${room}`;
//   const storageMessagesKey = `chatMessages_${room}`;

  
//   // Load received requests
//   useEffect(() => {
//     async function loadRequests() {
//       try {
//         const res = await fetch(`${API_URL}/exchange/recieved`, {
//           method: "POST",
//           credentials: "include",
//         });
//         const data = await res.json();
//         setRequests(data.requests || []);

//         console.log(data.requests)
//       } catch (err) {
//         console.error("Failed loading requests:", err);
//       } finally {
//         // setLoading(false)
//       }
//     }

//     loadRequests();
//   }, [currentUserId]);



//       // ============================================
//     // 1️⃣ PROTECT ROUTE — IF NOT LOGGED IN → REDIRECT TO LOGIN
//     // ============================================
//     useEffect(() => {
//       async function checkAuth() {
//         const res = await fetch(`${API_URL}/auth/profile`, { credentials: "include" });
  
//         if (!res.ok) {
//           router.replace("/login");
//         }
//       }
  
//       checkAuth();
//     }, []);

//   // ---------------- Load session from localStorage ----------------
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const firstUserSessionData = localStorage.getItem(storageSessionKey);
//     const otherUserSessionData = localStorage.getItem(storageOtherSessionKey);

//     let session: ChatSession | null = null;

//     if (firstUserSessionData) {
//       try {
//         session = JSON.parse(firstUserSessionData);
//       } catch {
//         console.error("Invalid first user session data");
//       }
//     } else if (otherUserSessionData) {
//       try {
//         const other = JSON.parse(otherUserSessionData);
//         session = { username: other.username, room: other.room };
//       } catch {
//         console.error("Invalid other user session data");
//       }
//     }

//     if (session) {
//       setUsername(session.username);
//       setRoom(session.room);
//       setTopic(session.topic || "");
//       setDuration(session.duration || 10);
//       setPeople(session.people || 2);
//       setJoined(true);

//       joinRoom(session.username, session.room);

//       // Start countdown if first user session exists
//       if (firstUserSessionData) {
//         const firstSession: ChatSession = JSON.parse(firstUserSessionData);
//         if (firstSession.startTime) {
//           startCountdown(firstSession.startTime, firstSession.duration || 10);
//           setTopic(firstSession.topic || "");
//         }
//       }
//     }
//   }, []);

//   // ---------------- Load messages ----------------
//   useEffect(() => {
//     if (!room) return;

//     const stored = localStorage.getItem(storageMessagesKey);
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         if (Array.isArray(parsed)) setMessages(parsed);
//         else localStorage.removeItem(storageMessagesKey);
//       } catch {
//         localStorage.removeItem(storageMessagesKey);
//       }
//     }
//   }, [room]);

//   // ---------------- Socket listeners ----------------
//   useEffect(() => {
//     if (!room) return;

//     socket.on("message", handleIncomingMessage);
//     socket.on("user_joined", handleUserJoined);
//     socket.on("user_left", handleUserLeft);
//     socket.on("start_exchange", handleStartExchange);

//     return () => {
//       socket.off("message", handleIncomingMessage);
//       socket.off("user_joined", handleUserJoined);
//       socket.off("user_left", handleUserLeft);
//       socket.off("start_exchange", handleStartExchange);
//     };
//   }, [room]);

//   // ---------------- Socket handlers ----------------
//   function handleIncomingMessage(data: Message) {
//     setMessages((prev) => {
//       const updated = [...prev, data];
//       localStorage.setItem(storageMessagesKey, JSON.stringify(updated));
//       scrollToBottom();
//       return updated;
//     });
//   }

//   function handleUserJoined(data: { message: string; timestamp: string }) {
//     const msg: Message = { ...data, sender: "system", system: true };
//     setMessages((prev) => [...prev, msg]);
//   }

//   function handleUserLeft(data: { message: string; timestamp: string }) {
//     const msg: Message = { ...data, sender: "system", system: true };
//     setMessages((prev) => [...prev, msg]);
//   }

//   function handleStartExchange(data: { startTime: string; duration: number; topic: string }) {
//     setTopic(data.topic);
//     startCountdown(data.startTime, data.duration);
//   }

//   // ---------------- Join room ----------------
//   function joinRoom(user: string, roomName: string) {
//     socket.emit("join-room", { username: user, room: roomName });
//   }

//   function handleJoin() {
//     if (!username || !room) return;

//     const firstUser = !localStorage.getItem(storageSessionKey);

//     if (firstUser) setPopupOpen(true);
//     else {
//       // Second user stores separately
//       localStorage.setItem(storageOtherSessionKey, JSON.stringify({ username, room }));
//     }

//     joinRoom(username, room);
//     setJoined(true);
//   }

//   // ---------------- Save popup info ----------------
//   function savePopupInfo() {
//     const startTime = new Date().toISOString();
//     const session: ChatSession = { username, room, topic, duration, people, startTime };
//     localStorage.setItem(storageSessionKey, JSON.stringify(session));
//     setPopupOpen(false);

//     socket.emit("start_exchange", { room, topic, duration, startTime });
//     startCountdown(startTime, duration);
//   }

//   // ---------------- Countdown ----------------
//   async function startCountdown(startTimeISO: string, mins: number, req: ExchangeRequest) {
//     const endTime = new Date(new Date(startTimeISO).getTime() + mins * 60000).getTime();

//     const timer = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = endTime - now;

//       if (distance <= 0) {

//       const res = await fetch(`${API_URL}/update-exchnage`, {
//           method: "PATCH",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             exchange_id: req.exchange_id,
//             status: "completed",
//           }),
//       })

//         setCountdown("00:00:00");
//         clearInterval(timer);
//         router.push("/review");
//         return;
//       }

//       const hours = Math.floor(distance / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       setCountdown(
//         `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
//       );
//     }, 1000);
//   }

//   // ---------------- Send message ----------------
//   function handleMessage(msg: string, imageUrl?: string) {
//     if (!msg.trim() && !imageUrl) return;
//     const timestamp = new Date().toISOString();
//     const data: Message = { sender: username, message: msg, timestamp, imageUrl };
//     handleIncomingMessage(data);
//     socket.emit("message", { ...data, room });
//   }

//   const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: "smooth" });

//   // ---------------- Quit exchange ----------------
//   function quitExchange() {
//     setQuitPopup(true);
//   }

//    async function confirmQuitExchange(req: ExchangeRequest) {
//     localStorage.removeItem(storageSessionKey);
//     localStorage.removeItem(storageOtherSessionKey);
//     localStorage.removeItem(storageMessagesKey);
//     socket.emit("leave-room", room);
//     setJoined(false);
//     setRoom("");
//     setMessages([]);
//     setQuitPopup(false);

//       const res = await fetch(`${API_URL}/update-exchnage-status`, {
//           method: "PATCH",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             exchange_id: req.exchange_id,
//             status: "canclled",
//           }),
//         })
//   }

//   // ---------------- UI ----------------
//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#1e1b4b] text-white pt-24">
//       {!joined ? (
//         <div className="bg-white/10 p-10 rounded-3xl border border-white/10 w-full max-w-md text-center backdrop-blur-md shadow-xl shadow-purple-900/40">
//           <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//             Join a Chat Room
//           </h1>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter your username..."
//             className="w-full px-4 py-3 mt-5 rounded-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//           <input
//             type="text"
//             value={room}
//             onChange={(e) => setRoom(e.target.value)}
//             placeholder="Enter room name..."
//             className="w-full px-4 py-3 mt-3 rounded-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleJoin}
//             className="w-full py-3 mt-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-pink-500 text-white font-semibold rounded-full shadow-lg shadow-purple-500/30 transition-all duration-300"
//           >
//             Enter Chat 🚀
//           </button>
//         </div>
//       ) : (
//         <div className="w-full max-w-3xl mx-auto flex flex-col bg-white/10 border border-white/10 rounded-3xl backdrop-blur-md shadow-lg shadow-purple-900/40">
//           {/* Top Bar */}
//           <div className="flex justify-between items-center p-4 border-b border-white/20">
//             <div>
//               <h2 className="text-xl font-semibold text-blue-400">Room: {room}</h2>
//               {topic && <p className="text-gray-300 text-sm">Topic: {topic}</p>}
//               {countdown && <p className="text-gray-400 text-sm mt-1">Time left: {countdown}</p>}
//             </div>
//             <button
//               onClick={quitExchange}
//               className="px-4 py-2 bg-red-600 rounded-xl hover:bg-red-700 transition"
//             >
//               Quit Exchange
//             </button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto max-h-[400px] p-5 space-y-3 scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-transparent">
//             {Array.isArray(messages) &&
//               messages.map((msg, i) => (
//                 <ChatMessage
//                   key={i}
//                   sender={msg.sender}
//                   message={msg.message}
//                   timestamp={msg.timestamp}
//                   isOwnMessage={msg.sender === username}
//                   imageUrl={msg.imageUrl}
//                 />
//               ))}
//             <div ref={bottomRef} />
//           </div>

//           {/* Input */}
//           <div className="p-4 border-t border-white/10">
//             <ChatForm onSendMessage={handleMessage} />
//           </div>
//         </div>
//       )}

//       {/* Popup for first user */}
//       {popupOpen && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-gradient-to-br from-blue-900/80 to-blue-950/50 border border-blue-400/30 backdrop-blur-3xl p-8 rounded-3xl w-[90%] max-w-sm text-center">
//             <h2 className="text-xl font-semibold text-white mb-4">Start Exchange</h2>
//             <input
//               type="text"
//               placeholder="Topic of exchange"
//               value={topic}
//               onChange={(e) => setTopic(e.target.value)}
//               className="w-full mb-3 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <input
//               type="number"
//               placeholder="Duration (minutes)"
//               value={duration}
//               onChange={(e) => setDuration(Number(e.target.value))}
//               className="w-full mb-3 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <input
//               type="number"
//               placeholder="Number of people"
//               value={people}
//               onChange={(e) => setPeople(Number(e.target.value))}
//               className="w-full mb-5 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={savePopupInfo}
//               className="px-6 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
//             >
//               Start
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Quit popup */}
//       {quitPopup && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-gradient-to-br from-blue-900/80 to-blue-950/50 backdrop-blur-3xl p-8 rounded-3xl w-[90%] max-w-sm text-center">
//             <p className="text-white text-lg mb-4">Skill has been successfully cancelled!</p>
//             <Link href="/review" className="text-blue-400 underline mb-4 block">
//               Leave a review
//             </Link>
//             <button
//               onClick={confirmQuitExchange}
//               className="px-6 py-2 bg-red-600 rounded-xl hover:bg-red-700 transition"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// // 1.check for any error
// // leave the code as it is just upgrade  this few section and give me back the full updated code u get me abi
// //  use params to fetch the information and skill details u get.. and still ask the user to fill in their username and room code so the socket continue working as normal and see when the suer put in their username check it with the two username the backen dis giving us back and check if they macth before proceeding to the next step... and show the popup for only the duration of the skill let he popup sho for only the durstion like the time and show the countodown of the skill show the both users the usenrame fecth form the db show hthe both user the skill fetch form the db and when the countdoen end s update the backen d to completed and when they press quit updated backend to cancleed u get all this important upgrade please upgerade them well ooooooo

































// "use client";

// import { useEffect, useState, useRef } from "react";
// import { socket } from "@/lib/socketClient";
// import { useRouter } from "next/navigation";
// import ChatForm from "@/components/chatComponent1/page";
// import ChatMessage from "@/components/chatComponent2/page";

// interface Message {
//   sender: string;
//   message: string;
//   timestamp: string;
//   system?: boolean;
//   imageUrl?: string;
// }

// interface ChatSession {
//   username: string;
//   room: string;
//   duration?: number;
//   startTime?: string;
// }

// export default function HomePage() {
//   const [room, setRoom] = useState<string>("");
//   const [joined, setJoined] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [username, setUsername] = useState<string>("");
//   const [countdown, setCountdown] = useState<string>("");
//   const [durationPopup, setDurationPopup] = useState(false);
//   const [duration, setDuration] = useState<number>(5);
//   const [quitPopup, setQuitPopup] = useState(false);

//   const bottomRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   const storageSessionKey = `chatSession_${room}`;
//   const storageOtherSessionKey = `chatOtherSession_${room}`;
//   const storageMessagesKey = `chatMessages_${room}`;

//   let countdownTimer: NodeJS.Timeout;

//   // ---------------- Load session ----------------
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const sessionData = localStorage.getItem(storageSessionKey);
//     const otherData = localStorage.getItem(storageOtherSessionKey);

//     if (sessionData) {
//       const session: ChatSession = JSON.parse(sessionData);
//       setUsername(session.username);
//       setRoom(session.room);
//       setDuration(session.duration || 5);
//       setJoined(true);

//       joinRoom(session.username, session.room);

//       if (session.startTime) {
//         startCountdown(session.startTime, session.duration || 5);
//       }
//     } else if (otherData) {
//       const other: ChatSession = JSON.parse(otherData);
//       setUsername(other.username);
//       setRoom(other.room);
//       setJoined(true);

//       joinRoom(other.username, other.room);

//       const firstSession = localStorage.getItem(`chatSession_${other.room}`);
//       if (firstSession) {
//         const fs: ChatSession = JSON.parse(firstSession);
//         if (fs.startTime) startCountdown(fs.startTime, fs.duration || 5);
//       }
//     }
//   }, []);

//   // ---------------- Load messages ----------------
//   useEffect(() => {
//     if (!room) return;
//     const stored = localStorage.getItem(storageMessagesKey);
//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         if (Array.isArray(parsed)) setMessages(parsed);
//         else localStorage.removeItem(storageMessagesKey);
//       } catch {
//         localStorage.removeItem(storageMessagesKey);
//       }
//     }
//   }, [room]);

//   // ---------------- Socket listeners ----------------
//   useEffect(() => {
//     if (!room) return;

//     socket.on("message", handleIncomingMessage);
//     socket.on("user_joined", handleUserJoined);
//     socket.on("user_left", handleUserLeft);
//     socket.on("start_exchange", handleStartExchange);

//     return () => {
//       socket.off("message", handleIncomingMessage);
//       socket.off("user_joined", handleUserJoined);
//       socket.off("user_left", handleUserLeft);
//       socket.off("start_exchange", handleStartExchange);
//       clearInterval(countdownTimer);
//     };
//   }, [room]);

//   function handleIncomingMessage(data: Message) {
//     setMessages((prev) => {
//       const updated = [...prev, data];
//       localStorage.setItem(storageMessagesKey, JSON.stringify(updated));
//       scrollToBottom();
//       return updated;
//     });
//   }

//   function handleUserJoined(data: { message: string; timestamp: string }) {
//     const msg: Message = { ...data, sender: "system", system: true };
//     setMessages((prev) => [...prev, msg]);
//   }

//   function handleUserLeft(data: { message: string; timestamp: string }) {
//     const msg: Message = { ...data, sender: "system", system: true };
//     setMessages((prev) => [...prev, msg]);
//   }

//   function handleStartExchange(data: { startTime: string; duration: number }) {
//     startCountdown(data.startTime, data.duration);
//   }

//   function joinRoom(user: string, roomName: string) {
//     socket.emit("join-room", { username: user, room: roomName });
//   }

//   function handleJoin() {
//     if (!username || !room) return;

//     const firstUser = !localStorage.getItem(storageSessionKey);
//     if (!firstUser) {
//       localStorage.setItem(storageOtherSessionKey, JSON.stringify({ username, room }));
//     }

//     setJoined(true);
//     joinRoom(username, room);
//   }

//   // ---------------- Duration popup ----------------
//   function startExchangeWithDuration() {
//     const startTime = new Date().toISOString();
//     const session: ChatSession = { username, room, duration, startTime };
//     localStorage.setItem(storageSessionKey, JSON.stringify(session));
//     setDurationPopup(false);

//     socket.emit("start_exchange", { room, duration, startTime });
//     startCountdown(startTime, duration);
//   }

//   // ---------------- Countdown ----------------
//   function startCountdown(startTimeISO: string, mins: number) {
//     const endTime = new Date(new Date(startTimeISO).getTime() + mins * 60000).getTime();

//     countdownTimer = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = endTime - now;

//       if (distance <= 0) {
//         setCountdown("00:00:00");
//         clearInterval(countdownTimer);
//         setQuitPopup(true);
//         return;
//       }

//       const hours = Math.floor(distance / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       setCountdown(
//         `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
//       );
//     }, 1000);
//   }

//   function handleMessage(msg: string, imageUrl?: string) {
//     if (!msg.trim() && !imageUrl) return;
//     const timestamp = new Date().toISOString();
//     const data: Message = { sender: username, message: msg, timestamp, imageUrl };
//     handleIncomingMessage(data);
//     socket.emit("message", { ...data, room });
//   }

//   const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: "smooth" });

//   function quitExchange() {
//     setQuitPopup(true);
//   }

//   function confirmQuit() {
//     localStorage.removeItem(storageSessionKey);
//     localStorage.removeItem(storageOtherSessionKey);
//     localStorage.removeItem(storageMessagesKey);
//     socket.emit("leave-room", room);
//     router.push("/review");
//   }

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#1e1b4b] text-white pt-24">
//       {!joined ? (
//         <div className="bg-white/10 p-10 rounded-3xl border border-white/10 w-full max-w-md text-center backdrop-blur-md shadow-xl shadow-purple-900/40">
//           <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//             Join a Chat Room
//           </h1>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter your username..."
//             className="w-full px-4 py-3 mt-5 rounded-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//           <input
//             type="text"
//             value={room}
//             onChange={(e) => setRoom(e.target.value)}
//             placeholder="Enter room name..."
//             className="w-full px-4 py-3 mt-3 rounded-full bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleJoin}
//             className="w-full py-3 mt-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-pink-500 text-white font-semibold rounded-full shadow-lg shadow-purple-500/30 transition-all duration-300"
//           >
//             Enter Chat 🚀
//           </button>
//         </div>
//       ) : (
//         <div className="w-full max-w-3xl mx-auto flex flex-col bg-white/10 border border-white/10 rounded-3xl backdrop-blur-md shadow-lg shadow-purple-900/40">
//           <div className="flex justify-between items-center p-4 border-b border-white/20 bg-white/10 backdrop-blur-xl rounded-t-3xl">
//             <div>
//               <h2 className="text-xl font-semibold text-blue-300">Room: {room}</h2>
//               {countdown ? (
//                 <p className="text-yellow-400 text-lg font-bold mt-1 drop-shadow-lg">{countdown}</p>
//               ) : (
//                 <button
//                   onClick={() => setDurationPopup(true)}
//                   className="px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition"
//                 >
//                   Set Duration
//                 </button>
//               )}
//             </div>
//             {countdown && (
//               <button
//                 onClick={quitExchange}
//                 className="px-4 py-2 bg-red-600 rounded-xl hover:bg-red-700 transition"
//               >
//                 Quit Exchange
//               </button>
//             )}
//           </div>

//           <div className="flex-1 overflow-y-auto max-h-[400px] p-5 space-y-3 scrollbar-thin scrollbar-thumb-blue-600/30 scrollbar-track-transparent">
//             {messages.map((msg, i) => (
//               <ChatMessage
//                 key={i}
//                 sender={msg.sender}
//                 message={msg.message}
//                 timestamp={msg.timestamp}
//                 isOwnMessage={msg.sender === username}
//                 imageUrl={msg.imageUrl}
//               />
//             ))}
//             <div ref={bottomRef} />
//           </div>

//           <div className="p-4 border-t border-white/10">
//             <ChatForm onSendMessage={handleMessage} />
//           </div>
//         </div>
//       )}

//       {/* Duration Popup */}
//       {durationPopup && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
//           <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 max-w-sm w-full text-center">
//             <h2 className="text-xl font-semibold text-white mb-4">Set Duration (minutes)</h2>
//             <input
//               type="number"
//               min={1}
//               value={duration}
//               onChange={(e) => setDuration(Number(e.target.value))}
//               className="w-full mb-5 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               onClick={startExchangeWithDuration}
//               className="px-6 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition"
//             >
//               Start Countdown
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Quit Popup */}
//       {quitPopup && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
//           <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 max-w-md w-full text-center">
//             <h2 className="text-xl font-bold text-yellow-400 mb-3">Exchange Ended</h2>
//             <p className="text-gray-300 mb-5">You have successfully quit the exchange.</p>
//             <button
//               onClick={confirmQuit}
//               className="px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition"
//             >
//               Leave a Review
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// // see this idea 
// //1. use this api to fetch details about a particular skill and then show the 2topic of the skill in both the user chta page u get  and when the user enters their username comfirm it with the api so onl users that are in exchnage can chat u get me.. now do it
// // see the api use params router.get("/exchange/:exchange_id",
// //  now th the bakcend 
// exports.getExchangeDetails = async (req, res) => {
//   try {
//     const { exchange_id } = req.params;
//     const userId = req.user?.id;

//     const query = `
//       SELECT
//         es.id AS exchange_id,
//         es.exchange_status,
//         es.status,
//         es.created_at,

//         -- Users
//         u1.id AS from_user_id,
//         u1.username AS from_username,
//         u2.id AS to_user_id,
//         u2.username AS to_username,

//         -- Skills
//         s_offer.id AS skill_offered_id,
//         s_offer.title AS skill_offered_title,

//         s_req.id AS skill_requested_id,
//         s_req.title AS skill_requested_title

//       FROM exchange_skills es
//       JOIN users u1 ON es.from_user_id = u1.id
//       JOIN users u2 ON es.to_user_id = u2.id
//       JOIN skills s_offer ON es.skill_offered_id = s_offer.id
//       JOIN skills s_req ON es.skill_requested_id = s_req.id
//       WHERE es.id = $1
//         AND (es.from_user_id = $2 OR es.to_user_id = $2)
//     `;

//     const result = await db.query(query, [exchange_id, userId]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "Exchange not found" });
//     }

//     res.json({
//       success: true,
//       exchange: result.rows[0],
//     });
//   } catch (err) {
//     console.error("❌ Fetch exchange error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


















































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

// export default function ChatPage() {
//   const [room, setRoom] = useState("");
//   const [joined, setJoined] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [username, setUsername] = useState("");
//   const [countdown, setCountdown] = useState("");
//   const [quitPopup, setQuitPopup] = useState(false);
//   const [exchange, setExchange] = useState<ExchangeDetails | null>(null);

//   const bottomRef = useRef<HTMLDivElement>(null);
//   const countdownTimer = useRef<NodeJS.Timeout | null>(null);
//   const router = useRouter();
//   const params = useParams();
//   const { exchange_id } = params as { exchange_id: string };


//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   // const API_URL = 'http://localhost:5000';

//   // ---------- Fetch exchange details ----------
//   useEffect(() => {
//     if (!exchange_id) return;

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
//   }, [exchange_id, API_URL, router]);

//   // ---------- Load messages from localStorage ----------
//   useEffect(() => {
//     if (!room) return;
//     const stored = localStorage.getItem(`chatMessages_${room}`);
//     if (stored) setMessages(JSON.parse(stored));
//   }, [room]);

//   // ---------- Scroll to bottom ----------
//   const scrollToBottom = useCallback(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   // ---------- Handle incoming messages ----------
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
//       const endTime = new Date(new Date(startTimeISO).getTime() + mins * 60000).getTime();

//       countdownTimer.current = setInterval(async () => {
//         const now = new Date().getTime();
//         const distance = endTime - now;

//         if (distance <= 0) {
//           clearInterval(countdownTimer.current!);
//           setCountdown("00:00:00");

//           if (exchange_id) {
//             await fetch(`${API_URL}/exchange/update-status`, {
//               method: "POST",
//               credentials: "include",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ exchange_id, exchange_status: "completed" }),
//             });
//           }

//           router.push(`/review/${exchange_id}`);
//           return;
//         }

//         const hours = Math.floor(distance / (1000 * 60 * 60));
//         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//         setCountdown(
//           `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
//             seconds
//           ).padStart(2, "0")}`
//         );
//       }, 1000);
//     },
//     [API_URL, exchange_id, router]
//   );

//   const handleStartExchange = useCallback(
//     (data: { startTime: string; duration: number }) => {
//       startCountdown(data.startTime, data.duration);
//     },
//     [startCountdown]
//   );

//   // ---------- Socket listeners ----------
//   useEffect(() => {
//     if (!room) return;

//     socket.on("message", handleIncomingMessage);
//     socket.on("user_joined", handleUserJoined);
//     socket.on("user_left", handleUserLeft);
//     socket.on("start_exchange", handleStartExchange);

//     return () => {
//       socket.off("message", handleIncomingMessage);
//       socket.off("user_joined", handleUserJoined);
//       socket.off("user_left", handleUserLeft);
//       socket.off("start_exchange", handleStartExchange);
//       countdownTimer.current && clearInterval(countdownTimer.current);
//     };
//   }, [room, handleIncomingMessage, handleUserJoined, handleUserLeft, handleStartExchange]);

//   // ---------- Join room ----------
//   const joinRoom = (user: string, roomName: string) => {
//     socket.emit("join-room", { username: user, room: roomName });
//   };

//   const handleJoin = () => {
//     if (!username || !room || !exchange) return;
//     if (username !== exchange.from_username && username !== exchange.to_username) {
//       alert("You are not allowed to join this chat.");
//       return;
//     }
//     setJoined(true);
//     joinRoom(username, room);
//   };

//   // ---------- Send message ----------
//   const handleMessage = (msg: string, imageUrl?: string) => {
//     if (!msg.trim() && !imageUrl) return;
//     const data: Message = { sender: username, message: msg, timestamp: new Date().toISOString(), imageUrl };
//     handleIncomingMessage(data);
//     socket.emit("message", { ...data, room });
//   };

//   // ---------- Quit exchange ----------
//   const confirmQuit = async () => {
//     if (!exchange_id) return;

//     await fetch(`${API_URL}/exchange/update-status`, {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ exchange_id, exchange_status: "cancelled" }),
//     });

//     localStorage.removeItem(`chatSession_${room}`);
//     localStorage.removeItem(`chatOtherSession_${room}`);
//     localStorage.removeItem(`chatMessages_${room}`);

//     socket.emit("leave-room", room);
//     router.push(`/review/${exchange_id}`);
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#0c0e1a] via-[#1a1f38] to-[#2e2b5c] text-white pt-24 px-4">
//       {!joined ? (
//         <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl w-full max-w-md p-10 text-center shadow-lg shadow-purple-900/40">
//           <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
//             Join the Chat
//           </h1>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//             className="w-full px-4 py-3 mb-4 rounded-2xl bg-white/10 border border-white/20 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
//           />
//           <input
//             type="text"
//             value={room}
//             onChange={(e) => setRoom(e.target.value)}
//             placeholder="Room name"
//             className="w-full px-4 py-3 mb-6 rounded-2xl bg-white/10 border border-white/20 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={handleJoin}
//             className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg hover:from-blue-500 hover:to-pink-500 transition"
//           >
//             Enter Chat 🚀
//           </button>
//         </div>
//       ) : (
//         <div className="w-full max-w-3xl flex flex-col bg-white/10 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-xl shadow-purple-900/50">
//           <div className="flex justify-between items-center p-4 border-b border-white/20 bg-white/5 rounded-t-3xl backdrop-blur-xl">
//             <div className="flex flex-col gap-2">
//               <h2 className="text-xl font-bold text-blue-300">Room: {room}</h2>
//               {exchange && (
//                 <div className="flex flex-wrap gap-3 mt-1">
//                   <span className="px-3 py-1 rounded-full bg-green-500/30 text-green-200 font-semibold">
//                     Offering: {exchange.skill_offered_title}
//                   </span>
//                   <span className="px-3 py-1 rounded-full bg-pink-500/30 text-pink-200 font-semibold">
//                     Requesting: {exchange.skill_requested_title}
//                   </span>
//                 </div>
//               )}
//               {countdown && (
//                 <p className="mt-2 text-yellow-400 font-bold text-lg drop-shadow-lg">{countdown}</p>
//               )}
//             </div>
//             {countdown && (
//               <button
//                 onClick={() => setQuitPopup(true)}
//                 className="px-4 py-2 bg-red-600 rounded-xl hover:bg-red-700 transition"
//               >
//                 Quit Exchange
//               </button>
//             )}
//           </div>

//           <div className="flex-1 overflow-y-auto max-h-[450px] p-5 space-y-3 scrollbar-thin scrollbar-thumb-blue-600/40 scrollbar-track-transparent">
//             {messages.map((msg, i) => (
//               <ChatMessage
//                 key={i}
//                 sender={msg.sender}
//                 message={msg.message}
//                 timestamp={msg.timestamp}
//                 isOwnMessage={msg.sender === username}
//                 imageUrl={msg.imageUrl}
//               />
//             ))}
//             <div ref={bottomRef} />
//           </div>

//           <div className="p-4 border-t border-white/20 bg-white/5 backdrop-blur-xl rounded-b-3xl">
//             <ChatForm onSendMessage={handleMessage} />
//           </div>
//         </div>
//       )}

//       {quitPopup && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
//           <div className="bg-white/5 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 max-w-md w-full text-center">
//             <h2 className="text-xl font-bold text-yellow-400 mb-3">Exchange Ended</h2>
//             <p className="text-gray-300 mb-5">You have successfully quit the exchange.</p>
//             <button
//               onClick={confirmQuit}
//               className="px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition"
//             >
//               Leave a Review
//             </button>
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
  from_user_id: number;
  from_username: string;
  to_user_id: number;
  to_username: string;
  skill_offered_title: string;
  skill_requested_title: string;
  exchange_status: string;
  status: string;
  created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ChatPage() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [countdown, setCountdown] = useState("");
  const [quitPopup, setQuitPopup] = useState(false);
  const [exchange, setExchange] = useState<ExchangeDetails | null>(null);
  const [showDurationBtn, setShowDurationBtn] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const countdownTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const params = useParams();
  const { exchange_id } = params as { exchange_id: string };

  // ---------- Fetch exchange details ----------
  useEffect(() => {
    if (!exchange_id) return;

    const fetchExchange = async () => {
      try {
        const res = await fetch(`${API_URL}/exchange/${exchange_id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch exchange");
        const data = await res.json();
        setExchange(data.exchange);
      } catch (err) {
        console.error(err);
        router.push("/dashboard");
      }
    };

    fetchExchange();
  }, [exchange_id, router]);

  // ---------- Load messages ----------
  useEffect(() => {
    if (!room) return;
    const stored = localStorage.getItem(`chatMessages_${room}`);
    if (stored) setMessages(JSON.parse(stored));
  }, [room]);

  // ---------- Scroll ----------
  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // ---------- Handle messages ----------
  const handleIncomingMessage = useCallback(
    (msg: Message) => {
      setMessages((prev) => {
        const updated = [...prev, msg];
        localStorage.setItem(`chatMessages_${room}`, JSON.stringify(updated));
        scrollToBottom();
        return updated;
      });
    },
    [room, scrollToBottom]
  );

  const handleUserJoined = useCallback(
    (data: { message: string; timestamp: string }) => {
      handleIncomingMessage({ ...data, sender: "system", system: true });
    },
    [handleIncomingMessage]
  );

  const handleUserLeft = useCallback(
    (data: { message: string; timestamp: string }) => {
      handleIncomingMessage({ ...data, sender: "system", system: true });
    },
    [handleIncomingMessage]
  );

  // ---------- Countdown ----------
  const startCountdown = useCallback(
    (startTimeISO: string, mins: number) => {
      const endTime = new Date(new Date(startTimeISO).getTime() + mins * 60000).getTime();

      if (countdownTimer.current) clearInterval(countdownTimer.current);

      countdownTimer.current = setInterval(async () => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance <= 0) {
          if (countdownTimer.current) clearInterval(countdownTimer.current);
          setCountdown("00:00:00");

          if (exchange_id) {
            await fetch(`${API_URL}/exchange/update-status`, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ exchange_id, exchange_status: "completed" }),
            });
          }

          router.push(`/review/${exchange_id}`);
          return;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown(
          `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
            seconds
          ).padStart(2, "0")}`
        );
      }, 1000);
    },
    [exchange_id, router]
  );

  const handleStartExchange = useCallback(
    (data: { startTime: string; duration: number }) => {
      startCountdown(data.startTime, data.duration);
    },
    [startCountdown]
  );

  // ---------- Socket listeners ----------
  useEffect(() => {
    if (!room) return;

    socket.on("message", handleIncomingMessage);
    socket.on("user_joined", handleUserJoined);
    socket.on("user_left", handleUserLeft);
    socket.on("start_exchange", handleStartExchange);

    return () => {
      socket.off("message", handleIncomingMessage);
      socket.off("user_joined", handleUserJoined);
      socket.off("user_left", handleUserLeft);
      socket.off("start_exchange", handleStartExchange);
      if (countdownTimer.current) clearInterval(countdownTimer.current);
    };
  }, [room, handleIncomingMessage, handleUserJoined, handleUserLeft, handleStartExchange]);

  // ---------- Join room ----------
  const joinRoom = (user: string, roomName: string) => {
    socket.emit("join-room", { username: user, room: roomName });
    setShowDurationBtn(true); // Show duration button after joining
  };

  const handleJoin = () => {
    if (!username || !room || !exchange) return;
    if (username !== exchange.from_username && username !== exchange.to_username) {
      alert("You are not allowed to join this chat.");
      return;
    }
    setJoined(true);
    joinRoom(username, room);
  };

  // ---------- Set Duration ----------
  const handleSetDuration = () => {
    const minsStr = prompt("Enter duration in minutes:");
    if (!minsStr) return;
    const mins = parseInt(minsStr);
    if (isNaN(mins) || mins <= 0) {
      alert("Please enter a valid number of minutes.");
      return;
    }

    const startTime = new Date().toISOString();

    // Emit to all users
    socket.emit("start_exchange", { startTime, duration: mins });

    // Start locally as well
    startCountdown(startTime, mins);
    setShowDurationBtn(false);
  };

  // ---------- Send message ----------
  const handleMessage = (msg: string, imageUrl?: string) => {
    if (!msg.trim() && !imageUrl) return;
    const data: Message = { sender: username, message: msg, timestamp: new Date().toISOString(), imageUrl };
    handleIncomingMessage(data);
    socket.emit("message", { ...data, room });
  };

  // ---------- Quit ----------
  const confirmQuit = async () => {
    if (!exchange_id) return;

    await fetch(`${API_URL}/exchange/update-status`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exchange_id, exchange_status: "cancelled" }),
    });

    localStorage.removeItem(`chatSession_${room}`);
    localStorage.removeItem(`chatOtherSession_${room}`);
    localStorage.removeItem(`chatMessages_${room}`);

    socket.emit("leave-room", room);
    router.push(`/review/${exchange_id}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#0c0e1a] via-[#1a1f38] to-[#2e2b5c] text-white pt-24 px-4">
      {!joined ? (
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl w-full max-w-md p-10 text-center shadow-lg shadow-purple-900/40">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
            Join the Chat
          </h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-3 mb-4 rounded-2xl bg-white/10 border border-white/20 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Room name"
            className="w-full px-4 py-3 mb-6 rounded-2xl bg-white/10 border border-white/20 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleJoin}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg hover:from-blue-500 hover:to-pink-500 transition"
          >
            Enter Chat 🚀
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl flex flex-col bg-white/10 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-xl shadow-purple-900/50">
          <div className="flex justify-between items-center p-4 border-b border-white/20 bg-white/5 rounded-t-3xl backdrop-blur-xl">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-blue-300">Room: {room}</h2>
              {exchange && (
                <div className="flex flex-wrap gap-3 mt-1">
                  <span className="px-3 py-1 rounded-full bg-green-500/30 text-green-200 font-semibold">
                    Offering: {exchange.skill_offered_title}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-pink-500/30 text-pink-200 font-semibold">
                    Requesting: {exchange.skill_requested_title}
                  </span>
                </div>
              )}
              {countdown && (
                <p className="mt-2 text-yellow-400 font-bold text-lg drop-shadow-lg">{countdown}</p>
              )}
              {showDurationBtn && !countdown && (
                <button
                  onClick={handleSetDuration}
                  className="px-4 py-2 bg-green-600 rounded-xl hover:bg-green-700 mt-2"
                >
                  Set Duration
                </button>
              )}
            </div>
            {countdown && (
              <button
                onClick={() => setQuitPopup(true)}
                className="px-4 py-2 bg-red-600 rounded-xl hover:bg-red-700 transition"
              >
                Quit Exchange
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto max-h-[450px] p-5 space-y-3 scrollbar-thin scrollbar-thumb-blue-600/40 scrollbar-track-transparent">
            {messages.map((msg, i) => (
              <ChatMessage
                key={i}
                sender={msg.sender}
                message={msg.message}
                timestamp={msg.timestamp}
                isOwnMessage={msg.sender === username}
                imageUrl={msg.imageUrl}
              />
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="p-4 border-t border-white/20 bg-white/5 backdrop-blur-xl rounded-b-3xl">
            <ChatForm onSendMessage={handleMessage} />
          </div>
        </div>
      )}

      {quitPopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/20 rounded-3xl p-8 max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-yellow-400 mb-3">Exchange Ended</h2>
            <p className="text-gray-300 mb-5">You have successfully quit the exchange.</p>
            <button
              onClick={confirmQuit}
              className="px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition"
            >
              Leave a Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { io } from "socket.io-client";

// If running both frontend + backend on same process (port 3000)
export const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

// // // lib/socketClient.ts
// "use client";

// import { io, Socket } from "socket.io-client";

// let socket: Socket | null = null;

// export function initSocket() {
//   if (!socket) {
//     socket = io("http://localhost:5000", {
//       transports: ["websocket"],
//       withCredentials: true,
//     });
//   }
//   return socket;
// }

// export function getSocket() {
//   if (!socket) initSocket();
//   return socket!;
// }


// If your socket server runs separately (e.g., port 3001), then use:
// export const socket = io("http://localhost:3001", { transports: ["websocket"] });

// "use client";
// import { io } from "socket.io-client";

// // If running both frontend + backend on same process (port 3000)
// export const socket = io("http://localhost:3000", {
//   transports: ["websocket"],
// });


// // lib/socketClient.ts
"use client";
import { io } from "socket.io-client";

export const socket = io(
  "https://skillwrap-backend.onrender.com",
  {
    transports: ["websocket"],
    withCredentials: true,
    autoConnect: false,
  }
);

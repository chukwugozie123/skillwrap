// import { createServer } from "http";
// import next from "next";
// import { Server } from "socket.io";

// const dev = process.env.NODE_ENV !== "production";
// const hostname = "localhost";
// const port = parseInt(process.env.PORT || "3000", 10);

// const app = next({ dev, hostname, port });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const httpServer = createServer((req, res) => handle(req, res));

//   const io = new Server(httpServer, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log(`✅ User connected: ${socket.id}`);

//     socket.on("join-room", ({ room, username }) => {
//       if (!room || !username) return;
//       socket.join(room);
//       console.log(`👤 ${username} joined room: ${room}`);
//       socket.to(room).emit("user_joined", `${username} joined the room`);
//     });


//     socket.on("message", ({ room, message, sender, imageUrl }) => {
//   if (!room || (!message && !imageUrl)) return;
//   console.log(`💬 ${sender}: sent message in room: ${room}`);
//   socket.to(room).emit("message", { sender, message, imageUrl });
// });


//     socket.on("disconnect", () => {
//       console.log(`🔴 User disconnected: ${socket.id}`);
//     });
//   });

//   httpServer.listen(port, () =>
//     console.log(`🚀 Server running on http://${hostname}:${port}`)
//   );
// });
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://skillwrap2026.vercel.app"
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ Connected:", socket.id);

  socket.on("join-room", ({ room, username }) => {
    socket.join(room);
    socket.to(room).emit("user_joined", {
      message: `${username} joined`,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on("message", (data) => {
    socket.to(data.room).emit("message", data);
  });

  socket.on("start_exchange", (data) => {
    socket.to(data.room).emit("start_exchange", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Disconnected:", socket.id);
  });
});

httpServer.listen(4000, () =>
  console.log("🚀 Socket server running on port 4000")
);



// // see my socket.io code is not working when i deployed it online why.. is it because its stil calling locahost instead of the onlie url which is :skillwrap2026.vercel.app






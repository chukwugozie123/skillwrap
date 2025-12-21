















// import { createServer } from "node:http";
// import next from "next";
// import { Server, Socket } from "socket.io"; // ✅ correct import

// const dev = process.env.NODE_ENV !== "production";
// const hostname = process.env.HOSTNAME || "localhost";
// const port = parseInt(process.env.PORT || "3000", 10);

// const app = next({ dev, hostname, port });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const httpServer = createServer((req, res) => {
//     handle(req, res);
//   });

//   const io = new Server(httpServer, {
//     cors: {
//       origin: "*", // ✅ for dev — change this later for security
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on("connection", (socket: Socket) => {
//     console.log(`🟢 User connected: ${socket.id}`);

//     socket.on("join-room", ({ room, username }: { room: string; username: string }) => {
//       socket.join(room);
//       console.log(`👤 ${username} joined room ${room}`);
//       socket.to(room).emit("user_joined", `${username} joined the room`);
//     });

//     socket.on("message", ({room, message, sender }) => {
//       console.log(`message from ${sender}in room ${message}`)
//       socket.join(room).emit("message", {sender, message})
//     })

//     socket.on("disconnect", () => {
//       console.log(`🔴 User disconnected: ${socket.id}`);
//     });
//   });

//   httpServer.listen(port, () => {
//     console.log(`✅ Server running on http://${hostname}:${port}`);
//   });
// });



















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
//    const io = new Server(httpServer);

//   io.on("connection", (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     socket.on("join-room", ({ room, username }) => {
//       socket.join(room);
//       console.log(`user joined ${username} in this room: ${room}`)
//       socket.to(room).emit("user_joined", `${username} joined the room`);
//     });

//     socket.on("message", ({ room, message, sender }) => {
//       console.log(`message from ${sender} in ${room} from ${sender}`)
//       socket.to(room).emit("message", { sender, message });
//     });

//      socket.on("disconnect", () => {
//       console.log(`🔴 User disconnected: ${socket.id}`);
//     });
//   });

//   httpServer.listen(port, () => {
//     console.log(`Server running on http://${hostname}:${port}`);
//   });
// });


























import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => handle(req, res));

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    socket.on("join-room", ({ room, username }) => {
      if (!room || !username) return;
      socket.join(room);
      console.log(`👤 ${username} joined room: ${room}`);
      socket.to(room).emit("user_joined", `${username} joined the room`);
    });


    socket.on("message", ({ room, message, sender, imageUrl }) => {
  if (!room || (!message && !imageUrl)) return;
  console.log(`💬 ${sender}: sent message in room: ${room}`);
  socket.to(room).emit("message", { sender, message, imageUrl });
});


    socket.on("disconnect", () => {
      console.log(`🔴 User disconnected: ${socket.id}`);
    });
  });

  httpServer.listen(port, () =>
    console.log(`🚀 Server running on http://${hostname}:${port}`)
  );
});

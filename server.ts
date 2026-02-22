import { createServer } from "http"
import next from "next"
import { Server, Socket } from "socket.io"

const dev = process.env.NODE_ENV !== "production"
const hostname = "localhost"
const port = parseInt(process.env.PORT || "3000")

const ADMIN = "Admin"

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

/* ===========================
   TYPES
=========================== */

interface ActiveUser {
  id: string
  name: string
  room: string
}

interface Message {
  name: string
  text: string
  time: string
}

/* ===========================
   USER STATE
=========================== */

const usersState: {
  users: ActiveUser[]
  setUsers: (users: ActiveUser[]) => void
} = {
  users: [],
  setUsers(newUsersArray: ActiveUser[]) {
    this.users = newUsersArray
  }
}

/* ===========================
   HELPERS
=========================== */

function buildMsg(name: string, text: string): Message {
  return {
    name,
    text,
    time: new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    }).format(new Date())
  }
}

function activateUser(id: string, name: string, room: string): ActiveUser {
  const user: ActiveUser = { id, name, room }

  usersState.setUsers([
    ...usersState.users.filter(user => user.id !== id),
    user
  ])

  return user
}

function userLeavesApp(id: string): void {
  usersState.setUsers(
    usersState.users.filter(user => user.id !== id)
  )
}

function getUser(id: string): ActiveUser | undefined {
  return usersState.users.find(user => user.id === id)
}

function getUsersInRoom(room: string): ActiveUser[] {
  return usersState.users.filter(user => user.room === room)
}

function getAllActiveRooms(): string[] {
  return Array.from(
    new Set(usersState.users.map(user => user.room))
  )
}

/* ===========================
   SERVER
=========================== */

app.prepare().then(() => {
  const httpServer = createServer((req, res) => handle(req, res))

  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"]
    }
  })

  io.on("connection", (socket: Socket) => {
    console.log(`✅ User connected: ${socket.id}`)

    socket.emit("message", buildMsg(ADMIN, "Welcome to Chat App"))

    socket.on("enterRoom", ({ name, room }: { name: string; room: string }) => {
      const prevRoom = getUser(socket.id)?.room

      /* Leave previous room */
      if (prevRoom) {
        socket.leave(prevRoom)

        io.to(prevRoom).emit(
          "message",
          buildMsg(ADMIN, `${name} has left the room`)
        )

        io.to(prevRoom).emit("userList", {
          users: getUsersInRoom(prevRoom)
        })
      }

      /* Activate user */
      const user = activateUser(socket.id, name, room)

      /* Join new room */
      socket.join(user.room)

      /* Message to self */
      socket.emit(
        "message",
        buildMsg(ADMIN, `You have joined the ${user.room} chat room`)
      )

      /* Message to others */
      socket.broadcast
        .to(user.room)
        .emit("message", buildMsg(ADMIN, `${user.name} has joined the room`))

      /* Update user list */
      io.to(user.room).emit("userList", {
        users: getUsersInRoom(user.room)
      })

      /* Update rooms list */
      io.emit("roomsList", {
        rooms: getAllActiveRooms()
      })
    })

    socket.on("message", ({ name, text }: { name: string; text: string }) => {
      const room = getUser(socket.id)?.room

      if (room) {
        io.to(room).emit("message", buildMsg(name, text))
      }
    })

    socket.on("activity", (name: string) => {
      const room = getUser(socket.id)?.room

      if (room) {
        socket.broadcast.to(room).emit("activity", name)
      }
    })

    socket.on("disconnect", () => {
      const user = getUser(socket.id)

      if (user) {
        io.to(user.room).emit(
          "message",
          buildMsg(ADMIN, `${user.name} has left the room`)
        )

        userLeavesApp(socket.id)

        io.to(user.room).emit("userList", {
          users: getUsersInRoom(user.room)
        })

        io.emit("roomsList", {
          rooms: getAllActiveRooms()
        })
      }

      console.log(`🔴 User disconnected: ${socket.id}`)
    })
  })

  httpServer.listen(port, () =>
    console.log(`🚀 Server running on http://${hostname}:${port}`)
  )
})






    // socket.on("join-room", ({ room, username }) => {
    //   if (!room || !username) return;
    //   socket.join(room);
    //   console.log(`👤 ${username} joined room: ${room}`);
    //   socket.to(room).emit("user_joined", `${username} joined the room`);
    // });


//   socket.on("message", ({ room, message, sender, imageUrl }) => {
//   if (!room || (!message && !imageUrl)) return;
//   console.log(`💬 ${sender}: sent message in room: ${room}`);
//   socket.to(room).emit("message", { sender, message, imageUrl });
// });


// import { createServer } from "http";
// import { Server } from "socket.io";

// const httpServer = createServer();

// const io = new Server(httpServer, {
//   cors: {
//     origin: [
//       "http://localhost:3000",
//       "https://skillwrap2026.vercel.app"
//     ],
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("✅ Connected:", socket.id);

//   socket.on("join-room", ({ room, username }) => {
//     socket.join(room);
//     socket.to(room).emit("user_joined", {
//       message: `${username} joined`,
//       timestamp: new Date().toISOString(),
//     });
//   });

//   socket.on("message", (data) => {
//     socket.to(data.room).emit("message", data);
//   });

//   socket.on("start_exchange", (data) => {
//     socket.to(data.room).emit("start_exchange", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔴 Disconnected:", socket.id);
//   });
// });

// httpServer.listen(4000, () =>
//   console.log("🚀 Socket server running on port 4000")
// );



// // // see my socket.io code is not working when i deployed it online why.. is it because its stil calling locahost instead of the onlie url which is :skillwrap2026.vercel.app





//     // "dev": "node --loader ts-node/esm server.ts",
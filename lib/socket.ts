import { io, Socket } from "socket.io-client";

export const socket: Socket = io(
  "http://localhost:4000",
  {
    autoConnect:false,
    reconnection:true,
    reconnectionDelay:1000,
    reconnectionDelayMax:5000,
    reconnectionAttempts:5,
  }
);


socket.on("connect",()=>{
 console.log("Socket connected:",socket.id);
});


socket.on("disconnect",()=>{
 console.log("Socket disconnected");
});


export type Message = {
  id:string;
  sender:{
    id:string;
    name:string;
    avatar:string;
  };
  content:string;
  timestamp:number;
};
// import { io, Socket } from 'socket.io-client'

// let socket: Socket | null = null

// export const initSocket = () => {
//   if (socket) return socket

//   socket = io('http://localhost:4000', {
//     reconnection: true,
//     reconnectionDelay: 1000,
//     reconnectionDelayMax: 5000,
//     reconnectionAttempts: 5,
//   })

//   socket.on('connect', () => {
//     console.log('[v0] Socket connected:', socket?.id)
//   })

//   socket.on('disconnect', () => {
//     console.log('[v0] Socket disconnected')
//   })

//   socket.on('connect_error', (error) => {
//     console.log('[v0] Socket connection error:', error)
//   })

//   return socket
// }

// export const getSocket = (): Socket | null => socket

// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect()
//     socket = null
//   }
// }

// export type Message = {
//   id: string
//   sender: {
//     id: string
//     name: string
//     avatar: string
//   }
//   content: string
//   timestamp: number
//   attachments?: Array<{
//     type: 'image' | 'file' | 'link'
//     url: string
//     name?: string
//   }>
// }

// export type AIMessage = {
//   id: string
//   content: string
//   timestamp: number
//   isLoading?: boolean
// }

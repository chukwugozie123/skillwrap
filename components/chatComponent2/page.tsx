// "use client";

// interface ChatMessageProps {
//   sender: string;
//   message: string;
//   isOwnMessage: boolean;
//   imageUrl?: string;
//   timestamp?: string;
// }

// export default function ChatMessage({
//   sender,
//   message,
//   isOwnMessage,
//   imageUrl,
//   timestamp,
// }: ChatMessageProps) {
//   const isSystemMessage = sender === "system";

//   // Convert timestamp to readable local time
//   const formattedTime = timestamp
//     ? new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//     : "";

//   return (
//     <div
//       className={`flex ${
//         isSystemMessage
//           ? "justify-center"
//           : isOwnMessage
//           ? "justify-end"
//           : "justify-start"
//       } mb-3`}
//     >
//       <div
//         className={`max-w-[75%] px-4 py-2 rounded-lg ${
//           isSystemMessage
//             ? "bg-gray-700 text-gray-300 text-sm italic text-center"
//             : isOwnMessage
//             ? "bg-blue-600 text-white"
//             : "bg-gray-200 text-gray-900"
//         }`}
//       >
//         {!isSystemMessage && (
//           <div className="flex justify-between items-center mb-1">
//             <p className="text-xs font-semibold opacity-75">{sender}</p>
//             <p className="text-[10px] opacity-60">{formattedTime}</p>
//           </div>
//         )}

//         {imageUrl && (
//           <img
//             src={imageUrl}
//             alt="sent"
//             className="rounded-lg mb-2 max-h-60 object-cover"
//           />
//         )}

//         <p className={`${isSystemMessage ? "text-gray-300 italic" : "text-sm break-words"}`}>
//           {message}
//         </p>

//         {isSystemMessage && (
//           <p className="text-[10px] opacity-60 mt-1">{formattedTime}</p>
//         )}
//       </div>
//     </div>
//   );
// }





















// "use client";

// interface ChatMessageProps {
//   sender: string;
//   message: string;
//   isOwnMessage: boolean;
//   imageUrl?: string;
//   timestamp?: string;
// }

// export default function ChatMessage({
//   sender,
//   message,
//   isOwnMessage,
//   imageUrl,
//   timestamp,
// }: ChatMessageProps) {
//   const isSystemMessage = sender === "system";

//   const formattedTime = timestamp
//     ? new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//     : "";

//   return (
//     <div className={`flex ${isSystemMessage ? "justify-center" : isOwnMessage ? "justify-end" : "justify-start"} mb-3`}>
//       <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${
//         isSystemMessage
//           ? "bg-gray-700 text-gray-300 text-sm italic text-center"
//           : isOwnMessage
//           ? "bg-blue-600 text-white shadow-md shadow-blue-500/50"
//           : "bg-white/10 text-white border border-white/20 backdrop-blur-md"
//       }`}>
//         {/* Sender info */}
//         {!isSystemMessage && (
//           <div className="flex justify-between items-center mb-1">
//             <p className="text-xs font-semibold opacity-75">{sender}</p>
//             <p className="text-[10px] opacity-60">{formattedTime}</p>
//           </div>
//         )}

//         {/* Image message */}
//         {imageUrl && (
//           <img
//             src={imageUrl}
//             alt="sent"
//             className="rounded-lg mb-2 max-h-60 object-cover shadow-lg"
//           />
//         )}

//         {/* Text message */}
//         <p className={`${isSystemMessage ? "text-gray-300 italic" : "text-sm break-words"}`}>
//           {message}
//         </p>

//         {/* System timestamp */}
//         {isSystemMessage && (
//           <p className="text-[10px] opacity-60 mt-1">{formattedTime}</p>
//         )}
//       </div>
//     </div>
//   );
// }











































"use client";

interface ChatMessageProps {
  sender: string;
  message: string;
  isOwnMessage: boolean;
  imageUrl?: string;
  timestamp?: string;
  system?: boolean;
}

export default function ChatMessage({ sender, message, isOwnMessage, imageUrl, timestamp, system }: ChatMessageProps) {
  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div className={`flex ${system ? "justify-center" : isOwnMessage ? "justify-end" : "justify-start"} mb-3`}>
      <div className={`max-w-[75%] px-4 py-2 rounded-xl ${system ? "bg-yellow-500 text-black text-center italic" : isOwnMessage ? "bg-blue-600 text-white" : "bg-white/10 text-white"}`}>
        {!system && (
          <div className="flex justify-between items-center mb-1 text-xs opacity-75">
            <span>{sender}</span>
            <span className="text-[10px] opacity-60">{formattedTime}</span>
          </div>
        )}
        {imageUrl && <img src={imageUrl} className="rounded-lg mb-2 max-h-60 object-cover" />}
        <p className={`${system ? "italic" : "break-words text-sm"}`}>{message}</p>
      </div>
    </div>
  );
}

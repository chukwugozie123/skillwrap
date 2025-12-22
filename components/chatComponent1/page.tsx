"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface ChatFormProps {
  onSendMessage: (message: string, imageUrl?: string) => void;
}

export default function ChatForm({ onSendMessage }: ChatFormProps) {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() && !imageUrl) return;

    onSendMessage(message, imageUrl || undefined);
    setMessage("");
    setImageUrl(null);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => setImageUrl(event.target?.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 relative">
      {imageUrl && (
        <div className="relative w-24 h-24">
          <Image
            src={imageUrl}
            alt="Uploaded preview"
            fill
            className="object-cover rounded-lg border border-blue-400"
          />
          <button
            type="button"
            className="absolute -top-2 -right-2 bg-red-600 rounded-full px-2 text-xs"
            onClick={() => setImageUrl(null)}
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex gap-2 items-center">
        <button
          type="button"
          className="text-2xl text-yellow-400"
          onClick={() => setShowEmoji(!showEmoji)}
        >
          😀
        </button>

        {showEmoji && (
          <div className="absolute bottom-16 left-10 z-50">
            <EmojiPicker
              onEmojiClick={(emojiData) =>
                setMessage((prev) => prev + emojiData.emoji)
              }
            />
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="cursor-pointer text-xl text-blue-400">
          📎
        </label>

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium"
        >
          Send
        </button>
      </div>
    </form>
  );
}



















// "use client";

// import { useState } from "react";
// import dynamic from "next/dynamic";

// // Load emoji picker dynamically to avoid SSR issues
// const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

// interface ChatFormProps {
//   onSendMessage: (message: string, imageUrl?: string) => void;
// }

// export default function ChatForm({ onSendMessage }: ChatFormProps) {
//   const [message, setMessage] = useState("");
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!message.trim() && !imageUrl) return;

//     onSendMessage(message, imageUrl || undefined);
//     setMessage("");
//     setImageUrl(null);
//   }

//   function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (event) => setImageUrl(event.target?.result as string);
//     reader.readAsDataURL(file);
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4 relative">
//       {/* Image preview */}
//       {imageUrl && (
//         <div className="relative w-32 h-32">
//           <img
//             src={imageUrl}
//             alt="preview"
//             className="w-full h-full object-cover rounded-xl border border-blue-400"
//           />
//           <button
//             type="button"
//             onClick={() => setImageUrl(null)}
//             className="absolute -top-2 -right-2 bg-red-600 rounded-full px-2 text-xs hover:bg-red-700"
//           >
//             ✕
//           </button>
//         </div>
//       )}

//       <div className="flex items-center gap-2 relative">
//         {/* Emoji Picker toggle */}
//         <button
//           type="button"
//           onClick={() => setShowEmoji(prev => !prev)}
//           className="text-2xl text-yellow-400"
//         >
//           😀
//         </button>

//         {showEmoji && (
//           <div className="absolute bottom-16 left-0 z-50">
//             <EmojiPicker
//               onEmojiClick={(emojiData) => setMessage(prev => prev + emojiData.emoji)}
//             />
//           </div>
//         )}

//         {/* File upload */}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="hidden"
//           id="fileInput"
//         />
//         <label htmlFor="fileInput" className="cursor-pointer text-xl text-blue-400">📎</label>

//         {/* Message input */}
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-1 px-4 py-2 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         {/* Send button */}
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white font-medium"
//         >
//           Send
//         </button>
//       </div>
//     </form>
//   );
// }















// // "use client";

// // import { useState } from "react";
// // import dynamic from "next/dynamic";

// // // Load emoji picker dynamically to avoid SSR issue
// // const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

// // interface ChatFormProps {
// //   onSendMessage: (message: string, imageUrl?: string) => void;
// // }

// // export default function ChatForm({ onSendMessage }: ChatFormProps) {
// //   const [message, setMessage] = useState("");
// //   const [showEmoji, setShowEmoji] = useState(false);
// //   const [imageUrl, setImageUrl] = useState<string | null>(null);

// //   function handleSubmit(e: React.FormEvent) {
// //     e.preventDefault();
// //     if (!message.trim() && !imageUrl) return;

// //     onSendMessage(message, imageUrl || undefined);
// //     setMessage("");
// //     setImageUrl(null);
// //   }

// //   function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     const reader = new FileReader();
// //     reader.onload = (event) => setImageUrl(event.target?.result as string);
// //     reader.readAsDataURL(file);
// //   }

// //   return (
// //     <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
// //       {imageUrl && (
// //         <div className="relative">
// //           <img
// //             src={imageUrl}
// //             alt="preview"
// //             className="w-24 h-24 object-cover rounded-lg border border-blue-400"
// //           />
// //           <button
// //             type="button"
// //             className="absolute -top-2 -right-2 bg-red-600 rounded-full px-2 text-xs"
// //             onClick={() => setImageUrl(null)}
// //           >
// //             ✕
// //           </button>
// //         </div>
// //       )}

// //       <div className="flex gap-2 items-center">
// //         <button
// //           type="button"
// //           onClick={() => setShowEmoji((prev) => !prev)}
// //           className="text-2xl text-yellow-400"
// //         >
// //           😀
// //         </button>
// //         {showEmoji && (
// //           <div className="absolute bottom-16 left-10 z-50">
// //             <EmojiPicker
// //               onEmojiClick={(emojiData) =>
// //                 setMessage((prev) => prev + emojiData.emoji)
// //               }
// //             />
// //           </div>
// //         )}

// //         <input
// //           type="file"
// //           accept="image/*"
// //           onChange={handleImageUpload}
// //           className="hidden"
// //           id="fileInput"
// //         />
// //         <label
// //           htmlFor="fileInput"
// //           className="cursor-pointer text-xl text-blue-400"
// //         >
// //           📎
// //         </label>

// //         <input
// //           type="text"
// //           placeholder="Type a message..."
// //           value={message}
// //           onChange={(e) => setMessage(e.target.value)}
// //           className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         />
// //         <button
// //           type="submit"
// //           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium"
// //         >
// //           Send
// //         </button>
// //       </div>
// //     </form>
// //   );
// // }








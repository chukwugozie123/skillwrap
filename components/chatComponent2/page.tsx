"use client";

import Image from "next/image";

interface ChatMessageProps {
  sender: string;
  message: string;
  isOwnMessage: boolean;
  imageUrl?: string;
  timestamp?: string;
  system?: boolean;
}

export default function ChatMessage({
  sender,
  message,
  isOwnMessage,
  imageUrl,
  timestamp,
  system,
}: ChatMessageProps) {
  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div
      className={`flex ${
        system ? "justify-center" : isOwnMessage ? "justify-end" : "justify-start"
      } mb-3`}
    >
      <div
        className={`max-w-[75%] px-4 py-2 rounded-xl ${
          system
            ? "bg-yellow-500 text-black text-center italic"
            : isOwnMessage
            ? "bg-blue-600 text-white"
            : "bg-white/10 text-white"
        }`}
      >
        {!system && (
          <div className="flex justify-between items-center mb-1 text-xs opacity-75">
            <span>{sender}</span>
            <span className="text-[10px] opacity-60">{formattedTime}</span>
          </div>
        )}

        {imageUrl && (
          <div className="relative w-full h-60 mb-2 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={`Image from ${sender}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <p className={`${system ? "italic" : "break-words text-sm"}`}>{message}</p>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ChatContainer() {
  const scrollEnd = useRef()

  useEffect(() => {
    if(scrollEnd.current){
      scrollEnd.current.scrollIntoView(behaviour  smooth)
    }
  })

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey 👋 Ready to start?", mine: false,},
    { id: 2, text: "Yes! Let’s begin 🔥", mine: true, },
    { id: 4, text: "no wahala ,,.. what of seyi vibez s songs e.g saro", mine: true, image: "https://randomuser.me/api/portraits/men/32.jpg", },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: Date.now(), text: message, mine: true, image:'da' }]);
    setMessage("");
  };

  return (
    <div className="h-full flex flex-col justify-between p-6">

      {/* Chat Header */}
      <div className="pb-4 border-b border-white/10">
        <h3 className="font-semibold text-lg text-cyan-300">
          Ada Design
        </h3>
        <p className="text-xs text-green-400">Online</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 py-6">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}
          >
            {msg.image ? (
              <Image src={msg.image} alt="" className="max-w-[230px] border boder-gray-700 rounded-lg overflow-hidden mb-8"  width={50} height={50}/>
            ) : (
              <p>{msg.text}</p>
            )}
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow-lg
              ${
                msg.mine
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                  : "bg-white/10 text-gray-200 border border-white/10"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      <div ref={scrollEnd}></div>

      {/* Input */}
      <div className="flex items-center gap-3 border-t border-white/10 pt-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:border-cyan-400 transition"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={sendMessage}
          className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500"
        >
          <Send size={18} />
        </motion.button>
      </div>
    </div>
  );
}

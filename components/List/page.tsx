import { Search } from "lucide-react";

export default function List() {
  const chats = [
    { id: 1, name: "Felix", lastMessage: "Yo! What's up?", time: "12:45 PM" },
    { id: 2, name: "Ada", lastMessage: "See you soon 👋", time: "Yesterday" },
    { id: 3, name: "Tobi", lastMessage: "Project updates?", time: "Mon" },
        { id: 1, name: "Felix", lastMessage: "Yo! What's up?", time: "12:45 PM" },
    { id: 2, name: "Ada", lastMessage: "See you soon 👋", time: "Yesterday" },
    { id: 3, name: "Tobi", lastMessage: "Project updates?", time: "Mon" },
        { id: 1, name: "Felix", lastMessage: "Yo! What's up?", time: "12:45 PM" },
    { id: 2, name: "Ada", lastMessage: "See you soon 👋", time: "Yesterday" },
    { id: 3, name: "Tobi", lastMessage: "Project updates?", time: "Mon" },
  ];

  return (
    <div className="p-4 flex flex-col h-full bg-white/5 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Chats</h1>
        <button className="p-2 rounded-full hover:bg-white/20 transition">＋</button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-gray-300 w-4 h-4" />
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full bg-white/10 rounded-full py-2 pl-9 pr-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto space-y-2 flex-1 scroll-smooth">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/20 cursor-pointer transition"
          >
            <div>
              <p className="font-semibold">{chat.name}</p>
              <p className="text-sm text-gray-300 truncate w-40">{chat.lastMessage}</p>
            </div>
            <span className="text-xs text-gray-400">{chat.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

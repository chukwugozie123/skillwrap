"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Loader2, Trash2, Clipboard, ClipboardCheck } from "lucide-react";

interface Notification {
  id: number;
  message: string;
  read: boolean;
  created_at: string;
  roomid?: string;
  exchange_id?: number;
}

export default function NotificationList() {
  const [notif, setNotif] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const unreadCount = notif.filter((n) => !n.read).length;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // const API_URL = 'http://localhost:5000'

  // ================= LOAD NOTIFICATIONS =================
  const loadNotifs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/notification`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.notifications, notif, 'sdasdsa')
      if (data.success) setNotif(data.notifications);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // ================= DELETE ALL =================
  const deleteNotification = async () => {
    try {
      setDeleting(true);
      const res = await fetch(`${API_URL}/delete/notification`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Notifications cleared!");
        await loadNotifs();
      } else {
        toast.error("Failed to delete notifications");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting notifications");
    } finally {
      setDeleting(false);
    }
  };

  // ================= COPY ROOM ID =================
  const copyRoomId = (roomId: string, notifId: number) => {
    navigator.clipboard.writeText(roomId);
    setCopiedId(notifId);
    toast.success("Room ID copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ================= EFFECT =================
  useEffect(() => {
    loadNotifs();
  }, [loadNotifs]); // ✅ include loadNotifs as dependency

  return (
    <div className="p-6 bg-[#020417]/50 rounded-3xl border border-white/10 backdrop-blur-3xl shadow-2xl max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white drop-shadow-md">Notifications</h2>
          {unreadCount > 0 && (
            <span className="px-3 py-1 bg-blue-600/70 text-white text-sm rounded-full shadow-lg">
              {unreadCount}
            </span>
          )}
        </div>

        {notif.length > 0 && (
          <button
            onClick={deleteNotification}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition"
            disabled={deleting}
          >
            {deleting ? <Loader2 className="animate-spin w-5 h-5" /> : <Trash2 className="w-5 h-5" />}
            <span className="text-sm">Clear All</span>
          </button>
        )}
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="text-center py-6 text-gray-300">Loading...</div>
      ) : notif.length === 0 ? (
        <p className="text-gray-400 text-center py-4">No notifications yet</p>
      ) : (
        <ul className="space-y-5">
          {notif.map((n) => {
            const isAccepted = n.message.toLowerCase().includes("accepted");

            return (
              <li
                key={n.id}
                className={`p-5 rounded-2xl border backdrop-blur-xl shadow-lg transition-all 
                  ${n.read ? "bg-white/5 border-white/10" : "bg-blue-700/10 border-blue-500/30 shadow-blue-900/50"}`}
              >
                <p className="text-white font-semibold text-lg leading-tight">{n.message}</p>
                <p className="text-gray-400 text-sm mt-2">{new Date(n.created_at).toLocaleString()}</p>

                {/* ROOM ID (only accepted exchanges) */}
                {isAccepted && n.roomid && (
                  <div className="mt-4 flex items-center justify-between bg-[#0b1a33]/60 border border-white/10 p-3 rounded-lg">
                    <p className="text-blue-300 font-medium select-all">Room ID: {n.roomid}</p>
                    <button
                      onClick={() => copyRoomId(n.roomid!, n.id)}
                      className="text-blue-400 hover:text-blue-300 transition"
                    >
                      {copiedId === n.id ? <ClipboardCheck className="w-5 h-5 text-green-400" /> : <Clipboard className="w-5 h-5" />}
                    </button>
                  </div>
                )}

                            <Link href={`chat/${n.exchange_id}`}>
                    <button className="mt-4 w-full px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-500 transition-all shadow-md font-semibold">
                      Start Chatting
                    </button>
                  </Link>

                {/* CHAT BUTTON */}
                {isAccepted && n.exchange_id && (
                  <Link href={`chat/${n.exchange_id}`}>
                    <button className="mt-4 w-full px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-500 transition-all shadow-md font-semibold">
                      Start Chatting
                    </button>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

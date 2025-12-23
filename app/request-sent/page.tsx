"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

type Notification = {
  id: number;
  roomid: string | number;
  created_at: string;
  message: string;
  metadata: number | string; // links to exchange_id
};

type RequestItem = {
  exchange_id: number;
  to_fullname: string;
  to_username: string;
  requested_skill_title: string;
  skill_offered: string;
  created_at: string;
  status: string;
};

export default function RequestPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [selectedNotif, setSelectedNotif] = useState<Notification | null>(null);
  const [popup, setPopup] = useState(false);
  const [loadingNotif, setLoadingNotif] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // const API_URL = "http://localhost:5000";

  // ✅ Load Requests
  useEffect(() => {
    async function loadRequests() {
      try {
        const res = await fetch(`${API_URL}/exchange/sent`, {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();
        setRequests(data.requests || []);
      } catch (err) {
        console.error("Failed loading requests:", err);
      }
    }

    loadRequests();
  }, []);

  // ✅ Open popup + load notification for a specific exchange
  async function handleDetails(req: RequestItem) {
    setPopup(true);
    setLoadingNotif(true);

    try {
      const res = await fetch(`${API_URL}/notification`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      // Find notification where metadata matches exchange_id
      const notif: Notification | undefined = data.notifications?.find(
        (n: Notification) => Number(n.metadata) === Number(req.exchange_id)
      );

      setSelectedNotif(notif || null);
    } catch (err) {
      console.error("Error fetching notification:", err);
      setSelectedNotif(null);
    } finally {
      setLoadingNotif(false);
    }
  }

  // Copy room code to clipboard
  const copyCodeToClipboard = () => {
    if (selectedNotif?.roomid) {
      navigator.clipboard.writeText(String(selectedNotif.roomid));
      alert("Room ID copied!"); // simple feedback
    }
  };

  return (
    <main className="min-h-screen px-6 py-12 bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-300"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
          Sent Skill Exchange Requests
        </h1>
        <p className="text-gray-400 text-sm max-w-md mx-auto">
          Track your pending and completed skill exchanges.
        </p>
      </div>

      {/* ─────────────── POPUP ─────────────── */}
      {popup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex justify-center items-center z-50 px-4">
          <div className="w-full max-w-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setPopup(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
            >
              <X size={22} />
            </button>

            {loadingNotif ? (
              <p className="text-center text-gray-300">Loading details...</p>
            ) : selectedNotif ? (
              <>
                <h2 className="text-2xl font-semibold text-blue-300 mb-4 text-center">
                  📩 Exchange Details
                </h2>

                <p>
                  <span className="text-gray-400">Room ID:</span>{" "}
                  {selectedNotif.roomid ? (
                    <span
                      className="font-bold text-blue-300 cursor-pointer"
                      onClick={copyCodeToClipboard}
                    >
                      {selectedNotif.roomid} (click to copy)
                    </span>
                  ) : (
                    <span className="text-red-400">Not Available</span>
                  )}
                </p>

                <p>
                  <span className="text-gray-400">Created At:</span>{" "}
                  <span className="font-medium">
                    {selectedNotif.created_at
                      ? new Date(selectedNotif.created_at).toLocaleString()
                      : "N/A"}
                  </span>
                </p>

                {/* Go to chat */}
                {selectedNotif.roomid && (
                  <Link
                    href="/chat"
                    className="block text-center mt-6 bg-blue-600/40 backdrop-blur-xl px-4 py-3 rounded-xl text-white font-semibold hover:bg-blue-600/60 transition"
                  >
                    🚀 Start Chat
                  </Link>
                )}

                <p className="text-center text-gray-400 mt-4 text-sm">
                  Share this room code with the other user to begin chatting.
                </p>
              </>
            ) : (
              <p className="text-center text-gray-300">No details found.</p>
            )}
          </div>
        </div>
      )}

      {/* ─────────────── REQUEST LIST ─────────────── */}
      <section className="relative z-10 max-w-4xl mx-auto space-y-6">
        {requests.length === 0 ? (
          <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl shadow-xl p-8 text-center text-gray-400">
            No requests found.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {requests.map((req) => (
              <div
                key={req.exchange_id}
                className="group bg-white/10 border border-white/20 hover:border-blue-400/40 backdrop-blur-2xl rounded-2xl p-6 shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-blue-400">
                    {req.to_fullname || req.to_username}
                  </h3>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      req.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : req.status === "accepted"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-1">
                  <span className="text-gray-400">Requested:</span>{" "}
                  {req.requested_skill_title}
                </p>

                <p className="text-gray-300 text-sm mb-4">
                  <span className="text-gray-400">Offered:</span>{" "}
                  {req.skill_offered}
                </p>

                <div className="flex justify-between items-center text-gray-400 text-sm">
                  <p>📅 {new Date(req.created_at).toLocaleString()}</p>
                  <button
                    onClick={() => handleDetails(req)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

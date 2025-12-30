"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

type ExchangeRequest = {
  exchange_id: string;
  from_user_id: number;
  from_username: string;
  from_fullname: string;
  to_user_id: string;
  to_user_username: string;
  skill_offered_title: string;
  requested_skill_title: string;
  status: string;
  created_at: string;
};

// Move API_URL outside the component to avoid dependency warnings
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ReceivedRequests({ currentUserId }: { currentUserId: number }) {
  const [requests, setRequests] = useState<ExchangeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [popup, showPopup] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [acceptedReqId, setAcceptedReqId] = useState<string | null>(null);

  const router = useRouter();

  // Generate frontend room code
  const generateRoomCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  // Load received requests
  useEffect(() => {
    async function loadRequests() {
      try {
        const res = await fetch(`${API_URL}/exchange/recieved`, {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();
        setRequests(data.requests || []);
      } catch (err) {
        console.error("Failed loading requests:", err);
      } finally {
        setLoading(false);
      }
    }

    loadRequests();
  }, [currentUserId]);

  // Accept request
  const handleAccept = async (req: ExchangeRequest) => {
    const newRoom = generateRoomCode();
    setRoomCode(newRoom);
    setAcceptedReqId(req.exchange_id);

    toast.success(`You accepted ${req.from_fullname}'s request`, {
      position: "bottom-right",
      autoClose: 1500,
      transition: Slide,
      theme: "dark",
      onClose: () => router.push(`/chat/${req.exchange_id}`),
    });

    try {
      const res = await fetch(`${API_URL}/update-exchange-status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchange_id: req.exchange_id,
          status: "accepted",
          roomCode: newRoom,
        }),
      });

      const data = await res.json();

      if (data.success) {
        await fetch(`${API_URL}/send-notification`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            exchange_id: req.exchange_id,
            receiverId: req.from_user_id,
            message: `Your skill exchange request for "${req.requested_skill_title}" was ACCEPTED. A private chat room is now available.`,
            metadata: req.exchange_id,
            roomCode: newRoom,
          }),
        });

        showPopup(true);

        setRequests((old) =>
          old.map((r) =>
            r.exchange_id === req.exchange_id ? { ...r, status: "accepted" } : r
          )
        );
      } else {
        toast.error("Failed to update request");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  // Decline request
  const handleDecline = async (req: ExchangeRequest) => {
    toast.error(`You declined ${req.from_fullname}'s request`, {
      position: "bottom-right",
      autoClose: 2000,
      transition: Slide,
      theme: "dark",
    });

    try {
      const res = await fetch(`${API_URL}/update-exchange-status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchange_id: req.exchange_id,
          status: "declined",
        }),
      });

      const data = await res.json();

      if (data.success) {
        await fetch(`${API_URL}/send-notification`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            exchange_id: req.exchange_id,
            receiverId: req.from_user_id,
            message: `Your skill exchange request for "${req.requested_skill_title}" was DECLINED.`,
            metadata: req.exchange_id,
          }),
        });

        setRequests((old) =>
          old.map((r) =>
            r.exchange_id === req.exchange_id ? { ...r, status: "declined" } : r
          )
        );
      } else {
        toast.error("Failed to update request");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#060b1a] via-[#0b1228] to-[#050912] text-white font-['Josefin_Sans']">

      {/* Background Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-blue-700/40 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-purple-700/30 rounded-full blur-[180px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-2 drop-shadow-xl">
          Received Requests 💌
        </h1>
        <p className="text-center text-gray-400 mb-10">
          Review and manage all requests sent to you.
        </p>

        <ToastContainer position="bottom-right" newestOnTop />

        {/* Popup */}
        {popup && acceptedReqId && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-b from-blue-900/60 to-blue-950/40 border border-blue-400/30 backdrop-blur-2xl p-8 rounded-3xl shadow-[0_0_40px_rgba(0,150,255,0.3)] text-center w-[90%] max-w-sm relative">

              <button
                onClick={() => showPopup(false)}
                className="absolute top-3 right-3 text-white/70 hover:text-white text-xl"
              >
                ✕
              </button>

              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-500/20 border border-green-400/40 shadow-lg">
                  <span className="text-green-400 text-8xl">✔</span>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
                Request Accepted!
              </h2>

              <p className="text-gray-300 mb-4 text-sm">
                Your private skill-exchange room is now active.
              </p>

              <div className="bg-black/40 rounded-xl py-3 px-4 border border-white/20 mb-4">
                <p className="text-gray-300 text-sm">Room Code</p>
                <p className="text-green-300 text-xl font-bold tracking-wider">{roomCode}</p>
              </div>

              <Link href={`/chat/${acceptedReqId}`}>
                <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold tracking-wide transition shadow-md hover:shadow-blue-400/50">
                  Enter Room
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Requests */}
        {loading ? (
          <div className="text-center text-gray-400 animate-pulse">Loading requests...</div>
        ) : requests.length === 0 ? (
          <div className="text-center bg-white/10 border border-white/20 p-10 rounded-2xl shadow-lg backdrop-blur-xl">
            <p className="text-gray-400 text-lg">No received requests yet 😔</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {requests.map((req) => (
              <div
                key={req.exchange_id}
                className="bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl backdrop-blur-2xl hover:shadow-blue-500/30 hover:border-blue-400/30 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-blue-300">{req.from_fullname}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
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

                <div className="space-y-2 text-gray-300">
                  <p>
                    <span className="text-gray-400">Offered Skill:</span>{" "}
                    <span className="font-medium text-white">{req.skill_offered_title}</span>
                  </p>
                  <p>
                    <span className="text-gray-400">Requested Skill:</span>{" "}
                    <span className="font-medium text-white">{req.requested_skill_title}</span>
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <p className="text-sm text-gray-400">
                    📅 {new Date(req.created_at).toLocaleString()}
                  </p>

                  {req.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(req)}
                        className="px-4 py-2 rounded-lg bg-green-500/80 hover:bg-green-400 font-medium text-white transition shadow-md hover:shadow-green-300/50"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDecline(req)}
                        className="px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-400 font-medium text-white transition shadow-md hover:shadow-red-300/50"
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      {req.status === "accepted" ? "Accepted ✔" : "Declined ✖"}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

// ================= TYPES =================
type ExchangeRequest = {
  exchange_id: string;
  from_user_id: number;
  from_username: string;
  from_fullname: string;
  to_user_id: string;
  to_user_username: string;
  skill_offered_title: string;
  requested_skill_title: string;
  status: "pending" | "accepted" | "declined";
  created_at: string;
};

// ================= CONFIG =================
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ================= PAGE =================
export default function ReceivedRequestsPage() {
  const [requests, setRequests] = useState<ExchangeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [acceptedReqId, setAcceptedReqId] = useState<string | null>(null);

  const router = useRouter();

  // Generate room code
  const generateRoomCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  // ================= LOAD REQUESTS =================
  useEffect(() => {
    if (!API_URL) return;

    const loadRequests = async () => {
      try {
        const res = await fetch(`${API_URL}/exchange/recieved`, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setRequests(data.requests || []);
      } catch (err) {
        console.error("Failed loading requests:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  // ================= ACCEPT =================
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

      if (!data.success) throw new Error("Update failed");

      await fetch(`${API_URL}/send-notification`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchange_id: req.exchange_id,
          receiverId: req.from_user_id,
          message: `Your skill exchange request for "${req.requested_skill_title}" was ACCEPTED.`,
          metadata: req.exchange_id,
          roomCode: newRoom,
        }),
      });

      setPopup(true);

      setRequests((prev) =>
        prev.map((r) =>
          r.exchange_id === req.exchange_id
            ? { ...r, status: "accepted" }
            : r
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  // ================= DECLINE =================
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
      if (!data.success) throw new Error("Decline failed");

      setRequests((prev) =>
        prev.map((r) =>
          r.exchange_id === req.exchange_id
            ? { ...r, status: "declined" }
            : r
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  // ================= UI =================
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#060b1a] via-[#0b1228] to-[#050912] text-white px-6 py-12">
      <ToastContainer position="bottom-right" newestOnTop />

      <h1 className="text-4xl font-bold text-center mb-10">
        Received Requests 💌
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-400">
          No received requests yet 😔
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {requests.map((req) => (
            <div
              key={req.exchange_id}
              className="bg-white/10 border border-white/20 rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold text-blue-300">
                {req.from_fullname}
              </h2>

              <p className="text-sm mt-2">
                <span className="text-gray-400">Offered:</span>{" "}
                {req.skill_offered_title}
              </p>

              <p className="text-sm">
                <span className="text-gray-400">Requested:</span>{" "}
                {req.requested_skill_title}
              </p>

              <div className="mt-4 flex justify-between items-center">
                {req.status === "pending" ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(req)}
                      className="px-4 py-2 bg-green-500 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDecline(req)}
                      className="px-4 py-2 bg-red-500 rounded"
                    >
                      Decline
                    </button>
                  </div>
                ) : (
                  <span className="italic text-gray-400">{req.status}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ACCEPT POPUP */}
      {popup && acceptedReqId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#0b1228] p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Request Accepted ✔</h2>
            <p className="mb-2">Room Code</p>
            <p className="text-xl font-bold text-green-400 mb-4">
              {roomCode}
            </p>
            <Link
              href={`/chat/${acceptedReqId}`}
              className="inline-block px-6 py-3 bg-blue-600 rounded"
            >
              Enter Chat
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}

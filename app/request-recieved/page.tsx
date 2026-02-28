"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CheckCircle,
  XCircle,
  Eye,
  X,
  Sparkles,
  Clock,
  MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

type ExchangeRequest = {
  exchange_id: string;
  from_user_id: number;
  from_username: string;
  from_fullname: string;
  skill_offered_title: string;
  requested_skill_title: string;
  note?: string;
  status: "pending" | "accepted" | "declined" | "completed" | "cancelled";
  mode: string;
  created_at: string;
};

// const API_URL = "http://localhost:4000";
const API_URL = "https://skillwrap-backend.onrender.com";

export default function ReceivedRequestsPage() {
  const [requests, setRequests] = useState<ExchangeRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [detailsPopup, setDetailsPopup] = useState(false);
  const [selectedExchange, setSelectedExchange] =
    useState<ExchangeRequest | null>(null);

  const [successPopup, setSuccessPopup] = useState(false);
  const [acceptedExchangeId, setAcceptedExchangeId] =
    useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });
     if (!res.ok) return router.push("/login");

        const data = await res.json();
        // setUser(data.user);
      } catch (err) {
        // setErr("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const res = await fetch(`${API_URL}/exchange/recieved`, {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();
        setRequests(data.requests || []);
      } catch {
        toast.error("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, []);

  const statusBadge = (status: string) => {
    const map: any = {
      pending: "bg-amber-500/15 text-amber-300",
      accepted: "bg-emerald-500/15 text-emerald-300",
      declined: "bg-red-500/15 text-red-300",
      completed: "bg-cyan-500/15 text-cyan-300",
      cancelled: "bg-gray-500/15 text-gray-300",
    };
    return map[status];
  };

  // ===== ACCEPT =====
  const handleAccept = async (req: ExchangeRequest) => {
    try {
      const statusRes = await fetch(`${API_URL}/update-exchange-status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchange_id: req.exchange_id,
          status: "accepted",
        }),
      });

      const statusData = await statusRes.json();

      if (!statusRes.ok || !statusData.success) {
        throw new Error(statusData.error || "Failed to update exchange");
      }

      await fetch(`${API_URL}/send-notification`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchange_id: req.exchange_id,
          receiverId: req.from_user_id,
          message: "Your skill exchange request was accepted 🎉",
          metadata: req.exchange_id,
        }),
      });

      setRequests((prev) =>
        prev.map((r) =>
          r.exchange_id === req.exchange_id
            ? { ...r, status: "accepted" }
            : r
        )
      );

      setAcceptedExchangeId(req.exchange_id);
      setSuccessPopup(true);
    } catch (err: any) {
      toast.error(err.message || "Server error");
    }
  };

  // ===== DECLINE =====
  const handleDecline = async (req: ExchangeRequest) => {
    try {
      await fetch(`${API_URL}/update-exchange-status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchange_id: req.exchange_id,
          status: "declined",
        }),
      });

      await fetch(`${API_URL}/send-notification`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchange_id: req.exchange_id,
          receiverId: req.from_user_id,
          message: "Your skill exchange request was declined ❌",
          metadata: req.exchange_id,
        }),
      });

      setRequests((prev) =>
        prev.map((r) =>
          r.exchange_id === req.exchange_id
            ? { ...r, status: "declined" }
            : r
        )
      );

      toast.error("Request declined", { theme: "dark", transition: Slide });
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1228] to-[#1e1b4b] px-6 py-14 text-white">
      <ToastContainer newestOnTop />

      <h1 className="text-center text-4xl font-extrabold mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
        Received Requests 💌
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading…</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-400">No requests yet</p>
        
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {requests.map((req) => (
            <div
              key={req.exchange_id}
              className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-xl hover:scale-[1.015] transition-all"
            >
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 text-xs rounded-full ${statusBadge(
                    req.status
                  )}`}
                >
                  {req.status}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-blue-300">
                {req.from_fullname}
              </h2>

                    {/* Hide offered skill if mode is learning */}
              {req.mode !== "learning" && (
                <p>
                  <span className="text-gray-400">Offers:</span> {req.skill_offered_title}
                </p>
              )}

              <p>
                <span className="text-gray-400">Wants:</span> {req.requested_skill_title}
              </p>
              <p className="flex items-center gap-1 text-gray-400">
                <Clock size={14} />
              {new Date(req.created_at).toLocaleDateString()}
              </p>

              <div className="mt-6 flex gap-3">
                {req.status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleAccept(req)}
                      className="px-4 py-2 bg-emerald-600 rounded-xl flex gap-2 items-center hover:bg-emerald-500 transition"
                    >
                      <CheckCircle size={16} />
                      Accept
                    </button>

                    <button
                      onClick={() => handleDecline(req)}
                      className="px-4 py-2 bg-red-600 rounded-xl flex gap-2 items-center hover:bg-red-500 transition"
                    >
                      <XCircle size={16} />
                      Decline
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedExchange(req);
                      setDetailsPopup(true);
                    }}
                    className="px-4 py-2 bg-blue-600/30 rounded-xl flex gap-2 items-center hover:bg-blue-600/40 transition"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAILS POPUP */}
      {detailsPopup && selectedExchange && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-gradient-to-br from-[#0b1228] to-[#020617] border border-white/20 rounded-3xl p-8 w-full max-w-lg shadow-2xl">
            <button
              onClick={() => setDetailsPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold text-blue-300 flex items-center gap-2">
              <Sparkles size={20} />
              Exchange Details
            </h2>

            <div className="mt-6 space-y-3 text-gray-200">
              <p>
                <span className="text-gray-400">From:</span>{" "}
                {selectedExchange.from_fullname}
              </p>

              {selectedExchange.mode !== "learning" && (
                <p>
                  <span className="text-gray-400">Offered:</span>{" "}
                  {selectedExchange.skill_offered_title}
                </p>
              )}

              <p>
                <span className="text-gray-400">Requested:</span>{" "}
                {selectedExchange.requested_skill_title}
              </p>

              {selectedExchange.note && (
                <p className="bg-white/5 p-3 rounded-xl border border-white/10">
                  {selectedExchange.note}
                </p>
              )}

              <p>
                <span className="text-gray-400">Mode:</span>{" "}
                {selectedExchange.mode}
              </p>

              <p>
                <span className="text-gray-400">Requested At:</span>{" "}
                {new Date(selectedExchange.created_at).toLocaleString()}
              </p>
            </div>

            {selectedExchange.status === "accepted" && (
              <Link
                href={`/chat/${selectedExchange.exchange_id}`}
                className="block mt-8 text-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
              >
                Enter Chat 💬
              </Link>
            )}
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {successPopup && acceptedExchangeId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/20 rounded-3xl p-10 w-full max-w-md text-center shadow-2xl">
            <CheckCircle size={50} className="text-emerald-400 mx-auto mb-6" />

            <h2 className="text-2xl font-bold text-emerald-400 mb-3">
              Request Accepted 🎉
            </h2>

            <p className="text-gray-300 mb-8">
              Your skill exchange has been successfully accepted.
              You can now start chatting and collaborating.
            </p>

            <button
              onClick={() => router.push(`/chat/${acceptedExchangeId}`)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-90 transition font-semibold"
            >
              Go to Chat Room 💬
            </button>

            <button
              onClick={() => setSuccessPopup(false)}
              className="mt-4 text-sm text-gray-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}






















// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { toast, ToastContainer, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { CheckCircle, XCircle, Eye, X, Sparkles, Clock } from "lucide-react";
// import { useRouter } from "next/navigation";

// type ExchangeRequest = {
//   exchange_id: string;
//   from_user_id: number;
//   from_username: string;
//   from_fullname: string;
//   skill_offered_title: string;
//   requested_skill_title: string;
//   note?: string;
//   status: "pending" | "accepted" | "declined" | "completed" | "cancelled";
//   mode: string;
//   created_at: string;
//   roomCode?: string;
// };

// // const API_URL = "https://skillwrap-backend.onrender.com";
//  const API_URL = "http://localhost:4000"

// export default function ReceivedRequestsPage() {
//   const [requests, setRequests] = useState<ExchangeRequest[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [detailsPopup, setDetailsPopup] = useState(false);
//   const [selectedExchange, setSelectedExchange] = useState<ExchangeRequest | null>(null);
//   const router = useRouter()

//   useEffect(() => {
//     const loadRequests = async () => {
//       try {
//         const res = await fetch(`${API_URL}/exchange/recieved`, {
//           method: "POST",
//           credentials: "include",
//         });
//         const data = await res.json();
//         setRequests(data.requests || []);
//       } catch {
//         toast.error("Failed to load requests");
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadRequests();
//   }, []);

//   const statusBadge = (status: string) => {
//     const map: any = {
//       pending: "bg-amber-500/15 text-amber-300",
//       accepted: "bg-emerald-500/15 text-emerald-300",
//       declined: "bg-red-500/15 text-red-300",
//       completed: "bg-cyan-500/15 text-cyan-300",
//       cancelled: "bg-gray-500/15 text-gray-300",
//     };
//     return map[status];
//   };

//   // // ====== ACCEPT REQUEST ======
//   // const handleAccept = async (req: ExchangeRequest) => {
//   //   const newRoom = Math.floor(100000 + Math.random() * 900000).toString();
//   //   try {
//   //     // Update exchange status
//   //     await fetch(`${API_URL}/update-exchange-status`, {
//   //       method: "PATCH",
//   //       credentials: "include",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({
//   //         exchange_id: req.exchange_id,
//   //         status: "accepted",
//   //         roomCode: newRoom,
//   //       }),
//   //     });

//   //     // Send notification to sender
//   //     await fetch(`${API_URL}/send-notification`, {
//   //       method: "POST",
//   //       credentials: "include",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({
//   //         exchange_id: req.exchange_id,
//   //         receiverId: req.from_user_id,
//   //         message: "Your skill exchange request was accepted 🎉",
//   //         metadata: req.exchange_id,
//   //         roomCode: newRoom,
//   //       }),
//   //     });

//   //     // Update UI
//   //     setRequests((prev) =>
//   //       prev.map((r) =>
//   //         r.exchange_id === req.exchange_id
//   //           ? { ...r, status: "accepted", roomCode: newRoom }
//   //           : r
//   //       )
//   //     );

//   //     toast.success("Request accepted successfully", { theme: "dark", transition: Slide });
//   //   } catch (err) {
//   //     console.error(err);
//   //     toast.error("Server error");
//   //   }
//   // };


// // ====== ACCEPT REQUEST ======
// const handleAccept = async (req: ExchangeRequest) => {
//   const newRoom = Math.floor(100000 + Math.random() * 900000).toString();

//   try {
//     // 1️⃣ Update exchange status
//     const statusRes = await fetch(`${API_URL}/update-exchange-status`, {
//       method: "PATCH",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         exchange_id: req.exchange_id,
//         status: "accepted",
//       }),
//     });

//     const statusData = await statusRes.json();

//     if (!statusRes.ok || !statusData.success) {
//       throw new Error(statusData.error || "Failed to update exchange");
//     }

//     // 2️⃣ Send notification ONLY if status update worked
//     const notifRes = await fetch(`${API_URL}/send-notification`, {
//       method: "POST",
//       credentials: "include",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         exchange_id: req.exchange_id,
//         receiverId: req.from_user_id,
//         message: "Your skill exchange request was accepted 🎉",
//         metadata: req.exchange_id,
//       }),
//     });

//     const notifData = await notifRes.json();

//     if (!notifRes.ok || !notifData.success) {
//       throw new Error(notifData.error || "Failed to send notification");
//     }

//     // 3️⃣ Update UI only after both succeed
//     setRequests((prev) =>
//       prev.map((r) =>
//         r.exchange_id === req.exchange_id
//           ? { ...r, status: "accepted" }
//           : r
//       )
//     );

//     toast.success("Request accepted successfully", {
//       theme: "dark",
//       transition: Slide,
//     });

//   } catch (err: any) {
//     console.error("ACCEPT ERROR:", err);
//     toast.error(err.message || "Server error");
//   }
// };



//   // ====== DECLINE REQUEST ======
//   const handleDecline = async (req: ExchangeRequest) => {
//     try {
//       await fetch(`${API_URL}/update-exchange-status`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           exchange_id: req.exchange_id,
//           status: "declined",
//         }),
//       });


//             // Send notification to sender
//       await fetch(`${API_URL}/send-notification`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           exchange_id: req.exchange_id,
//           receiverId: req.from_user_id,
//           message: "Your skill exchange request was declined 🎉",
//           metadata: req.exchange_id,
//         }),
//       });

//       setRequests((prev) =>
//         prev.map((r) =>
//           r.exchange_id === req.exchange_id ? { ...r, status: "declined" } : r
//         )
//       );

//       toast.error("Request declined", { theme: "dark", transition: Slide });
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error");
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1228] to-[#1e1b4b] px-6 py-14 text-white">
//       <ToastContainer newestOnTop />

//                   {/* 🔙 GO BACK BUTTON */}
//       <div className="flex items-center mb-6">
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 px-4 py-2 rounded-xl 
//           bg-white/10 border border-white/20 backdrop-blur-md
//           text-sm font-medium hover:bg-white/20 hover:scale-105 
//           transition-all duration-300"
//         >
//           ← Go Back
//         </button>
//       </div>

//       <h1 className="text-center text-4xl font-extrabold mb-12 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
//         Received Requests 💌
//       </h1>

//       {loading ? (
//         <p className="text-center text-gray-400">Loading…</p>
//       ) : requests.length === 0 ? (
//         <p className="text-center text-gray-400">No requests yet</p>
//       ) : (
//         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
//          {/* ================= REQUEST CARD ================= */}
// {requests.map((req) => (
//   <div
//     key={req.exchange_id}
//     className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-xl hover:scale-[1.015] transition-all"
//   >
//     <div className="absolute top-4 right-4">
//       <span className={`px-3 py-1 text-xs rounded-full ${statusBadge(req.status)}`}>
//         {req.status}
//       </span>
//     </div>

//     <h2 className="text-xl font-semibold text-blue-300">
//       {req.from_fullname}
//     </h2>

//     <div className="mt-4 space-y-1 text-sm text-gray-200">
//       {/* Hide offered skill if mode is learning */}
//       {req.mode !== "learning" && (
//         <p>
//           <span className="text-gray-400">Offers:</span> {req.skill_offered_title}
//         </p>
//       )}
//       <p>
//         <span className="text-gray-400">Wants:</span> {req.requested_skill_title}
//       </p>
//       <p className="flex items-center gap-1 text-gray-400">
//         <Clock size={14} />
//         {new Date(req.created_at).toLocaleDateString()}
//       </p>
//     </div>

//     <div className="mt-6 flex justify-between">
//       {req.status === "pending" ? (
//         <div className="flex gap-3">
//           <button
//             onClick={() => handleAccept(req)}
//             className="px-4 py-2 bg-emerald-600 rounded-xl flex gap-2 items-center hover:bg-emerald-500 transition"
//           >
//             <CheckCircle size={16} />
//             Accept
//           </button>
//           <button
//             onClick={() => handleDecline(req)}
//             className="px-4 py-2 bg-red-600 rounded-xl flex gap-2 items-center hover:bg-red-500 transition"
//           >
//             <XCircle size={16} />
//             Decline
//           </button>
//         </div>
//       ) : (
//         <button
//           onClick={() => {
//             setSelectedExchange(req);
//             setDetailsPopup(true);
//           }}
//           className="px-4 py-2 bg-blue-600/30 rounded-xl flex gap-2 items-center hover:bg-blue-600/40 transition"
//         >
//           <Eye size={16} />
//           View Details
//         </button>
//       )}
//     </div>
//   </div>
// ))}

// {/* ================= DETAILS MODAL ================= */}
// {detailsPopup && selectedExchange && (
//   <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
//     <div className="relative bg-gradient-to-br from-[#0b1228] to-[#020617] border border-white/20 rounded-3xl p-8 w-full max-w-lg shadow-2xl">
//       <button
//         onClick={() => setDetailsPopup(false)}
//         className="absolute top-4 right-4 text-gray-400 hover:text-white"
//       >
//         <X />
//       </button>

//       <h2 className="text-2xl font-bold text-blue-300 flex items-center gap-2">
//         <Sparkles size={20} />
//         Exchange Details
//       </h2>

//       <div className="mt-6 space-y-3 text-gray-200">
//         <p>
//           <span className="text-gray-400">From:</span> {selectedExchange.from_fullname}
//         </p>

//         {/* Hide offered skill if mode is learning */}
//         {selectedExchange.mode !== "learning" && (
//           <p>
//             <span className="text-gray-400">Offered:</span> {selectedExchange.skill_offered_title}
//           </p>
//         )}

//         <p>
//           <span className="text-gray-400">Requested:</span> {selectedExchange.requested_skill_title}
//         </p>

//         {selectedExchange.note && (
//           <p className="bg-white/5 p-3 rounded-xl border border-white/10">
//             {selectedExchange.note}
//           </p>
//         )}

//         <p>
//           <span className="text-gray-400">Mode:</span> {selectedExchange.mode}
//         </p>
//         <p>
//           <span className="text-gray-400">Requested At:</span>{" "}
//           {new Date(selectedExchange.created_at).toLocaleString()}
//         </p>
//       </div>

//       {selectedExchange.status === "accepted" && selectedExchange.roomCode && (
//         <Link
//           href={`/chat/${selectedExchange.exchange_id}`}
//           className="block mt-8 text-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
//         >
//           Enter Chat 💬
//         </Link>
//       )}
//     </div>
//   </div>
// )}

//         </div>
//       )}
//     </main>
//   );
// }

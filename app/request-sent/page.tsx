// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { X, Trash2 } from "lucide-react";

// type Notification = {
//   id: number;
//   roomid: string | number | null;
//   created_at: string;
//   message: string
//   metadata: number | string; // exchange_id stored here
// };

// type RequestItem = {
//   exchange_id: number;
//   to_fullname: string;
//   to_username: string;
//   requested_skill_title: string;
//   skill_offered: string;
//   created_at: string;
//   status: string;
// };

// export default function RequestPage() {
//   const [requests, setRequests] = useState<RequestItem[]>([]);
//   const [selectedNotif, setSelectedNotif] = useState<Notification | null>(null);
//   const [popup, setPopup] = useState(false);
//   const [loadingNotif, setLoadingNotif] = useState(false);

//   // ✅ SINGLE SOURCE OF TRUTH FOR ROUTING
//   const [activeExchangeId, setActiveExchangeId] = useState<number | null>(null);

//   const API_URL = "https://skillwrap-backend.onrender.com";

//   /* ───────────────── LOAD REQUESTS ───────────────── */
//   useEffect(() => {
//     async function loadRequests() {
//       try {
//         const res = await fetch(`${API_URL}/exchange/sent`, {
//           method: "POST",
//           credentials: "include",
//         });

//         const data = await res.json();
//         setRequests(data.requests || []);
//       } catch (err) {
//         console.error("Failed loading requests:", err);
//       }
//     }

//     loadRequests();
//   }, []);

//   /* ───────────── OPEN DETAILS + FETCH NOTIFICATION ───────────── */
//   async function handleDetails(req: RequestItem) {
//     setPopup(true);
//     setLoadingNotif(true);
//     setActiveExchangeId(req.exchange_id);

//     try {
//       const res = await fetch(`${API_URL}/notification`, {
//         method: "GET",
//         credentials: "include",
//       });

//       const data = await res.json();

//       const notif =
//         data.notifications?.find(
//           (n: Notification) =>
//             Number(n.metadata) === Number(req.exchange_id)
//         ) || null;

//       setSelectedNotif(notif);
//     } catch (err) {
//       console.error("Notification error:", err);
//       setSelectedNotif(null);
//     } finally {
//       setLoadingNotif(false);
//     }
//   }

//   /* ───────────── DELETE REQUEST (FIXED) ───────────── */
//   async function handleDelete(req: RequestItem) {
//     const confirmDelete = window.confirm(
//       `Delete exchange for "${req.skill_offered}"?`
//     );
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`${API_URL}/delete/exchange/request`, {
//         method: "DELETE",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           exchange_id: req.exchange_id,
//         }),
//       });

//       if (!res.ok) {
//         console.error("Failed to delete exchange");
//         return;
//       }

//       // ✅ REMOVE FROM UI
//       setRequests((prev) =>
//         prev.filter((r) => r.exchange_id !== req.exchange_id)
//       );
//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   }

//   return (
//     <main className="min-h-screen px-6 py-12 bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white relative overflow-hidden">

//       {/* ───────────── POPUP ───────────── */}
//       {popup && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex justify-center items-center z-50 px-4">
//           <div className="w-full max-w-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl relative">

//             <button
//               onClick={() => setPopup(false)}
//               className="absolute top-4 right-4 text-gray-300 hover:text-white"
//             >
//               <X size={22} />
//             </button>

//             {loadingNotif ? (
//               <p className="text-center text-gray-300">Loading details...</p>
//             ) : selectedNotif ? (
//               <>
//                 <h2 className="text-2xl font-semibold text-blue-300 mb-4 text-center">
//                   📩 Exchange Details
//                 </h2>

//                 <p>
//                   <span className="text-gray-400">Created At:</span>{" "}
//                   {new Date(selectedNotif.created_at).toLocaleString()}
//                 </p>

//                 {/* ✅ CORRECT & SAFE CHAT REDIRECT */}
//                 {activeExchangeId && (
//                   <Link
//                     href={`/chat/${activeExchangeId}`}
//                     className="block text-center mt-6 bg-blue-600/40 px-4 py-3 rounded-xl text-white font-semibold hover:bg-blue-600/60 transition"
//                   >
//                     🚀 Continue Chating
//                   </Link>
//                 )}

//                 <p className="text-center text-gray-400 mt-4 text-sm">
//                   Share this room code with the other user to begin chatting.
//                 </p>
//               </>
//             ) : (
//               <p className="text-center text-gray-300">
//                 No details found for this request yet
//               </p>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ───────────── REQUEST LIST ───────────── */}
//       <section className="relative z-10 max-w-4xl mx-auto space-y-6">
//         {requests.length === 0 ? (
//           <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl shadow-xl p-8 text-center text-gray-400">
//             No requests found.
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-6">
//             {requests.map((req) => (
//               <div
//                 key={req.exchange_id}
//                 className="group bg-white/10 border border-white/20 hover:border-blue-400/40 backdrop-blur-2xl rounded-2xl p-6 shadow-lg transition-all hover:scale-[1.02]"
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="font-semibold text-lg text-blue-400">
//                     {req.to_fullname || req.to_username}
//                   </h3>

//                   <button
//                     onClick={() => handleDelete(req)}
//                     className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm"
//                   >
//                     <Trash2 size={14} />
//                     Delete
//                   </button>
//                 </div>

//                 <p className="text-gray-300 text-sm mb-1">
//                   <span className="text-gray-400">Requested:</span>{" "}
//                   {req.requested_skill_title}
//                 </p>

//                 <p className="text-gray-300 text-sm mb-4">
//                   <span className="text-gray-400">Offered:</span>{" "}
//                   {req.skill_offered}
//                 </p>

//                 <div className="flex justify-between items-center text-gray-400 text-sm">
//                   <p>📅 {new Date(req.created_at).toLocaleString()}</p>

//                   <button
//                     onClick={() => handleDetails(req)}
//                     className="text-blue-400 hover:text-blue-300"
//                   >
//                     View Details →
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }










"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Trash2, Sparkles, Clock } from "lucide-react";

type Notification = {
  id: number;
  roomid: string | number | null;
  created_at: string;
  message: string;
  metadata: number | string;
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
  const [activeExchangeId, setActiveExchangeId] = useState<number | null>(null);

  const API_URL = "https://skillwrap-backend.onrender.com";

  /* ───────────── LOAD REQUESTS ───────────── */
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

  /* ───────────── DETAILS ───────────── */
  async function handleDetails(req: RequestItem) {
    setPopup(true);
    setLoadingNotif(true);
    setActiveExchangeId(req.exchange_id);

    try {
      const res = await fetch(`${API_URL}/notification`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      const notif =
        data.notifications?.find(
          (n: Notification) =>
            Number(n.metadata) === Number(req.exchange_id)
        ) || null;

      setSelectedNotif(notif);
    } catch {
      setSelectedNotif(null);
    } finally {
      setLoadingNotif(false);
    }
  }

  /* ───────────── DELETE ───────────── */
  async function handleDelete(req: RequestItem) {
    const confirmDelete = window.confirm(
      `Delete exchange for "${req.skill_offered}"?`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/delete/exchange/request`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exchange_id: req.exchange_id }),
      });

      if (!res.ok) return;

      setRequests((prev) =>
        prev.filter((r) => r.exchange_id !== req.exchange_id)
      );
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  return (
    <main className="min-h-screen px-6 py-14 bg-gradient-to-br from-[#020617] via-[#0b1228] to-[#1e1b4b] text-white overflow-hidden">

      {/* HEADER */}
      <h1 className="text-center text-4xl font-extrabold mb-14 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Sent Requests 🚀
      </h1>

      {/* REQUESTS */}
      <section className="max-w-6xl mx-auto">
        {requests.length === 0 ? (
          <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-10 text-center text-gray-400 shadow-xl">
            You haven’t sent any requests yet
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {requests.map((req) => (
              <div
                key={req.exchange_id}
                className="relative bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-6 shadow-xl hover:scale-[1.02] hover:border-blue-400/40 transition-all"
              >
                {/* DELETE */}
                <button
                  onClick={() => handleDelete(req)}
                  className="absolute top-4 right-4 flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
                >
                  <Trash2 size={14} />
                  Delete
                </button>

                <h3 className="text-xl font-semibold text-blue-300 mb-2">
                  {req.to_fullname || req.to_username}
                </h3>

                <div className="space-y-1 text-sm text-gray-300">
                  <p>
                    <span className="text-gray-400">Requested:</span>{" "}
                    {req.requested_skill_title}
                  </p>
                  <p>
                    <span className="text-gray-400">Offered:</span>{" "}
                    {req.skill_offered}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {new Date(req.created_at).toLocaleDateString()}
                  </span>

                  <button
                    onClick={() => handleDetails(req)}
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* DETAILS MODAL */}
      {popup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="relative w-full max-w-md bg-gradient-to-br from-[#0b1228] to-[#020617] border border-white/20 rounded-3xl p-8 shadow-2xl">
            <button
              onClick={() => setPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            {loadingNotif ? (
              <p className="text-center text-gray-300">Loading details…</p>
            ) : selectedNotif ? (
              <>
                <h2 className="text-2xl font-bold text-blue-300 flex items-center gap-2 mb-6">
                  <Sparkles size={18} />
                  Exchange Details
                </h2>

                <p className="text-gray-300 mb-2">
                  <span className="text-gray-400">Created:</span>{" "}
                  {new Date(selectedNotif.created_at).toLocaleString()}
                </p>

                {activeExchangeId && (
                  <Link
                    href={`/chat/${activeExchangeId}`}
                    className="block mt-8 text-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition font-semibold"
                  >
                    Continue Chat 💬
                  </Link>
                )}

                <p className="text-center text-gray-400 mt-4 text-sm">
                  You’ll resume the conversation in the same exchange room
                </p>
              </>
            ) : (
              <p className="text-center text-gray-400">
                No details available yet
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

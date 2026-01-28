








// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { toast, ToastContainer, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Copy, CheckCircle, XCircle, Eye, X } from "lucide-react";

// // ================= TYPES =================
// type ExchangeRequest = {
//   exchange_id: string;
//   from_user_id: number;
//   from_username: string;
//   from_fullname: string;
//   to_user_id: string;
//   to_user_username: string;
//   skill_offered_title: string;
//   requested_skill_title: string;
//   status: "pending" | "accepted" | "declined";
//   created_at: string;
//   mode: string;
// };

// type Notification = {
//   id: number;
//   roomId?: string | number | null;
//   roomid?: string | number | null;
//   created_at: string;
//   metadata: string | number;
// };

// // ================= CONFIG =================
// const API_URL = "https://skillwrap-backend.onrender.com";

// // ================= PAGE =================
// export default function ReceivedRequestsPage() {
//   const [requests, setRequests] = useState<ExchangeRequest[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [popup, setPopup] = useState(false);
//   const [roomCode, setRoomCode] = useState("");
//   const [acceptedReqId, setAcceptedReqId] = useState<string | null>(null);

//   const [detailsPopup, setDetailsPopup] = useState(false);
//   const [loadingDetails, setLoadingDetails] = useState(false);
//   const [selectedNotif, setSelectedNotif] = useState<Notification | null>(null);
//   const [activeExchangeId, setActiveExchangeId] = useState<string | null>(null);

//   const generateRoomCode = () =>
//     Math.floor(100000 + Math.random() * 900000).toString();

//   // ================= LOAD REQUESTS =================
//   useEffect(() => {
//     const loadRequests = async () => {
//       try {
//         const res = await fetch(`${API_URL}/exchange/recieved`, {
//           method: "POST",
//           credentials: "include",
//         });

//         if (!res.ok) throw new Error("Failed to fetch");

//         const data = await res.json();
//         setRequests(data.requests || []);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load requests");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadRequests();
//   }, []);

//   console.log(requests, 'requests')

//   // ================= ACCEPT =================
//   const handleAccept = async (req: ExchangeRequest) => {
//     const newRoom = generateRoomCode();
//     setRoomCode(newRoom);
//     setAcceptedReqId(req.exchange_id);

//     try {
//       await fetch(`${API_URL}/update-exchange-status`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           exchange_id: req.exchange_id,
//           status: "accepted",
//           
//         }),
//       });

//       await fetch(`${API_URL}/send-notification`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           exchange_id: req.exchange_id,
//           receiverId: req.from_user_id,
//           message: "Your skill exchange request was accepted 🎉",
//           metadata: req.exchange_id,
//           roomCode: newRoom,
//         }),
//       });

//       setPopup(true);

//       setRequests((prev) =>
//         prev.map((r) =>
//           r.exchange_id === req.exchange_id
//             ? { ...r, status: "accepted" }
//             : r
//         )
//       );

//       toast.success("Request accepted successfully", {
//         theme: "dark",
//         transition: Slide,
//       });
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error");
//     }
//   };

//   // ================= DECLINE =================
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

//       setRequests((prev) =>
//         prev.map((r) =>
//           r.exchange_id === req.exchange_id
//             ? { ...r, status: "declined" }
//             : r
//         )
//       );

//       toast.error("Request declined", {
//         theme: "dark",
//         transition: Slide,
//       });
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error");
//     }
//   };

//   // ================= VIEW DETAILS =================
//   const handleViewDetails = async (req: ExchangeRequest) => {
//     setDetailsPopup(true);
//     setLoadingDetails(true);
//     setActiveExchangeId(req.exchange_id);

//     try {
//       const res = await fetch(`${API_URL}/notification`, {
//         method: "GET",
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Failed to fetch notifications");

//       const data = await res.json();
//       console.log(data.notifications)

// const notif = data.notifications
//   // data.notifications?.find(
//   //   (n: Notification) =>
//   //     n.metadata != null &&
//   //     Number(n.metadata) === Number(req.exchange_id) &&
//   //     n.roomid != null
//   // ) || null;


//         console.log(notif)

//       setSelectedNotif(notif);
//     } catch (err) {
//       console.error(err);
//       setSelectedNotif(null);
//     } finally {
//       setLoadingDetails(false);
//     }
//   };

//   // ================= COPY =================
//   const copyRoomCode = async () => {
//     await navigator.clipboard.writeText(roomCode);
//     toast.success("Room code copied!", { theme: "dark", autoClose: 1200 });
//   };

//   // ================= UI =================
//   return (
//     <main className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1228] to-[#1e1b4b] text-white px-6 py-14">
//       <ToastContainer newestOnTop />

//       <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//         Received Requests 💌
//       </h1>

//       {loading ? (
//         <p className="text-center text-gray-400">Loading...</p>
//       ) : requests.length === 0 ? (
//         <p className="text-center text-gray-400">No requests yet 😔</p>
//       ) : (
//         <div className="grid sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
//           {requests.map((req) => (
//             <div
//               key={req.exchange_id}
//               className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl"
//             >
//               <h2 className="text-xl font-semibold text-blue-300">
//                 {req.from_fullname}
//               </h2>

//               <p className="text-sm mt-3">
//                 <span className="text-gray-400">Offered:</span>{" "}
//                 {req.skill_offered_title}
//               </p>

//               <p className="text-sm">
//                 <span className="text-gray-400">Requested:</span>{" "}
//                 {req.requested_skill_title}
//               </p>

//               <p>mode: {req.mode}</p>

//               <div className="mt-6 flex justify-between">
//                 {req.status === "pending" ? (
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => handleAccept(req)}
//                       className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg"
//                     >
//                       <CheckCircle size={18} /> Accept
//                     </button>
//                     <button
//                       onClick={() => handleDecline(req)}
//                       className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg"
//                     >
//                       <XCircle size={18} /> Decline
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => handleViewDetails(req)}
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600/40 rounded-lg"
//                   >
//                     <Eye size={18} /> View Details
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* DETAILS POPUP */}
//       {detailsPopup && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-[#0b1228] p-8 rounded-2xl w-[90%] max-w-md relative">
//             <button
//               onClick={() => setDetailsPopup(false)}
//               className="absolute top-4 right-4"
//             >
//               <X />
//             </button>


//             {loadingDetails ? (
//               <p className="text-center">Loading...</p>
//             ) : selectedNotif ? (
//               <>

//                 {activeExchangeId && (
//                   <Link
//                     href={`/chat/${activeExchangeId}`}
//                     className="block text-center py-3 bg-blue-600 rounded-xl"
//                   >
//                     Continue Chating 🚀
//                   </Link>
//                 )}
//               </>
//             ) : (
//               <p>No details found.</p>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ACCEPT POPUP */}
//       {popup && acceptedReqId && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-[#0b1228] p-8 rounded-2xl w-[90%] max-w-md text-center">
//             <h2 className="text-green-400 text-xl mb-4">Accepted ✔</h2>

//             {/* <div className="flex justify-center gap-3 mb-6">
//               <span className="text-2xl">{roomCode}</span>
//               <button onClick={copyRoomCode}>
//                 <Copy />
//               </button>
//             </div> */}

//             <Link
//               href={`/chat/${acceptedReqId}`}
//               className="block py-3 bg-blue-600 rounded-xl"
//             >
//               Enter Chat 💬
//             </Link>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }











"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, XCircle, Eye, X, Sparkles, Clock } from "lucide-react";

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
  roomCode?: string;
};

const API_URL = "https://skillwrap-backend.onrender.com";

export default function ReceivedRequestsPage() {
  const [requests, setRequests] = useState<ExchangeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailsPopup, setDetailsPopup] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState<ExchangeRequest | null>(null);

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

  // ====== ACCEPT REQUEST ======
  const handleAccept = async (req: ExchangeRequest) => {
    const newRoom = Math.floor(100000 + Math.random() * 900000).toString();
    try {
      // Update exchange status
      await fetch(`${API_URL}/update-exchange-status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchange_id: req.exchange_id,
          status: "accepted",
          roomCode: newRoom,
        }),
      });

      // Send notification to sender
      await fetch(`${API_URL}/send-notification`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchange_id: req.exchange_id,
          receiverId: req.from_user_id,
          message: "Your skill exchange request was accepted 🎉",
          metadata: req.exchange_id,
          roomCode: newRoom,
        }),
      });

      // Update UI
      setRequests((prev) =>
        prev.map((r) =>
          r.exchange_id === req.exchange_id
            ? { ...r, status: "accepted", roomCode: newRoom }
            : r
        )
      );

      toast.success("Request accepted successfully", { theme: "dark", transition: Slide });
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  // ====== DECLINE REQUEST ======
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


            // Send notification to sender
      await fetch(`${API_URL}/send-notification`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchange_id: req.exchange_id,
          receiverId: req.from_user_id,
          message: "Your skill exchange request was declined 🎉",
          metadata: req.exchange_id,
        }),
      });

      setRequests((prev) =>
        prev.map((r) =>
          r.exchange_id === req.exchange_id ? { ...r, status: "declined" } : r
        )
      );

      toast.error("Request declined", { theme: "dark", transition: Slide });
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  console.log(requests)

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
         {/* ================= REQUEST CARD ================= */}
{requests.map((req) => (
  <div
    key={req.exchange_id}
    className="relative rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-xl hover:scale-[1.015] transition-all"
  >
    <div className="absolute top-4 right-4">
      <span className={`px-3 py-1 text-xs rounded-full ${statusBadge(req.status)}`}>
        {req.status}
      </span>
    </div>

    <h2 className="text-xl font-semibold text-blue-300">
      {req.from_fullname}
    </h2>

    <div className="mt-4 space-y-1 text-sm text-gray-200">
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
    </div>

    <div className="mt-6 flex justify-between">
      {req.status === "pending" ? (
        <div className="flex gap-3">
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
        </div>
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

{/* ================= DETAILS MODAL ================= */}
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
          <span className="text-gray-400">From:</span> {selectedExchange.from_fullname}
        </p>

        {/* Hide offered skill if mode is learning */}
        {selectedExchange.mode !== "learning" && (
          <p>
            <span className="text-gray-400">Offered:</span> {selectedExchange.skill_offered_title}
          </p>
        )}

        <p>
          <span className="text-gray-400">Requested:</span> {selectedExchange.requested_skill_title}
        </p>

        {selectedExchange.note && (
          <p className="bg-white/5 p-3 rounded-xl border border-white/10">
            {selectedExchange.note}
          </p>
        )}

        <p>
          <span className="text-gray-400">Mode:</span> {selectedExchange.mode}
        </p>
        <p>
          <span className="text-gray-400">Requested At:</span>{" "}
          {new Date(selectedExchange.created_at).toLocaleString()}
        </p>
      </div>

      {selectedExchange.status === "accepted" && selectedExchange.roomCode && (
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

        </div>
      )}
    </main>
  );
}











/// see dont show that offerd skill p tag when mode = learning u get bucause it nulll an dalso in view deatils
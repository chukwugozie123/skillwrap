

// import { cookies } from "next/headers";



// export default async function RequestPage() {


//     const cookieStore = await cookies();
//   const cookieHeader = cookieStore
//     .getAll()
//     .map(({ name, value }) => `${name}=${value}`)
//     .join("; ");

//   // 🧠 Server-side fetch — runs on the Next.js server
//   const res = await fetch("http://localhost:5000/exchange/sent", {
//      headers: { Cookie: cookieHeader },
//     method: "post",
//     credentials: "include", // ✅ Keep passport session cookie
//     cache: "no-store",      // ✅ Always fetch fresh data
//   });

//   // Handle errors or unauthenticated users
//   if (!res.ok) {
//     const errorData = await res.json().catch(() => ({}));
//     return (
//       <div className="p-6 text-red-600">
//         {res.status === 401
//           ? "You are not logged in ❌"
//           : errorData.error || "Failed to load requests"}
//       </div>
//     );
//   }

//   // Parse JSON data
//   const data = await res.json();
//   const requests = data.requests;

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-2xl font-bold text-gray-800">
//         Skill Exchange Requests
//       </h1>

//       {requests.length === 0 ? (
//         <p className="text-gray-500">No pending requests 😔</p>
//       ) : (
//         requests.map((req: any) => (
//           <div
//             key={req.exchange_id}
//             className="bg-white shadow-md rounded-xl p-4 border border-gray-100"
//           >
//             <p className="font-semibold text-blue-600">
//               From: {req.from_fullname || req.from_username}
//             </p>
//             <p>
//               Offered Skill:{" "}
//               <span className="font-medium text-gray-800">
//                 {req.skill_offered_title}
//               </span>
//             </p>
//             <p>
//               Requested Skill:{" "}
//               <span className="font-medium text-gray-800">
//                 {req.skill_requested_title}
//               </span>
//             </p>
//             <p className="text-gray-400 text-sm">
//               Status: {req.status} •{" "}
//               {new Date(req.created_at).toLocaleString()}
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }



















// 'use client'

// import { useState, useEffect } from "react"; 
// import Link from "next/link";
// // import { cookies } from "next/headers";

// type Notification =  {
//   Created_at: string,
//   roomId: string,
// }

// export default function RequestPage() {
//   // ✅ Get cookies from Next.js server context
//   // const cookieStore = await cookies();
//   // const cookieHeader = cookieStore
//   //   .getAll()
//   //   .map(({ name, value }) => `${name}=${value}`)
//   //   .join("; ");

//     const [requests, setRequests] = useState<Notification[]>([])
//     const [notif, setnotif] = useState("")
//     const [popup, setpopup] = useState(false);

//     const API_URL = 'http://localhost:5000';

//       // Load received requests
//       useEffect(() => {
//         async function loadRequests() {
//           try {
//             const res = await fetch(`${API_URL}/exchange/sent`, {
//               method: "POST",
//               credentials: "include",
//             });
//             const data = await res.json();
//             setRequests(data.requests || []);
//           } catch (err) {
//             console.error("Failed loading requests:", err);
//           } finally {
//             // setLoading(false);
//           }
//         }
    
//         loadRequests();
//       }, []);

//   // ✅ Fetch exchange requests securely from backend
//   // const res = await fetch("http://localhost:5000/exchange/sent", {
//   //   method: "POST", // Should be GET now (see previous backend fix)
//   //   credentials: "include",
//   //    headers: { "Content-Type": "application/json" },
//   //   cache: "no-store",
//   // });

//  async  function handleDetails(req: Notification) {

//       // ✅ Fetch exchange requests securely from backend
//   const res = await fetch(`${API_URL}/notifications`, {
//     method: "GET", 
//     credentials: "include",
//     //  headers: { "Content-Type": "application/json" },
//     cache: "no-store",
//   });

//   const data = await res.json()
//   const notif = data.notfication 
//   setnotif(notif)
//     setpopup(true)
//   }


//   // ✅ Parse JSON response
//   // const data = await res.json();
//   // const requests = data.requests;

//   return (
//     <main className="min-h-screen px-6 py-12 bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white relative overflow-hidden">
//       {/* 🌌 Background Glow Effects */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-300"></div>
//       </div>

//       {/* 🧭 Page Header */}
//       <div className="relative z-10 text-center mb-10">
//         <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg mb-2">
//           Sent Skill Exchange Requests
//         </h1>
//         <p className="text-gray-400 text-sm max-w-md mx-auto">
//           View all your pending and completed skill exchanges at a glance.
//         </p>
//       </div>

//       {popup=== true ? (
//         <div>
//           {requests.map((req: any) => (
//               <div
//                 key={req.exchange_id}
//                 className="group bg-white/10 border border-white/20 hover:border-blue-400/40 backdrop-blur-2xl rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/30"
//               >

//             <h3 className="font-semibold text-lg text-blue-400">
//                     {req.to_fullname || req.to_username}
//                   </h3>
//                        <p>
//                     <span className="text-gray-400">Requested Skill:</span>{" "}
//                     <span className="font-medium text-white">
//                       {req.requested_skill_title || "—"}
//                     </span>
//                   </p>
                
                
//                     <span className="text-gray-400">Offered Skill:</span>{" "}
//                     <span className="font-medium text-white">
//                       {req.skill_offered || "—"}
//                     </span>
//                 {req.status === 'pending' ? (
//                   <p className="font-semibold text-lg text-blue-400">your request is still in progress</p>
//                 ): (
//                  <p className="font-semibold text-lg text-blue-400">your request has been  {req.status}</p>
//                 )}

//                 {req.roomId === '' ? (
//                   <p className="font-semibold text-lg text-blue-400">fuck u all </p>
//                 ):(
//                   <p className="font-semibold text-lg text-blue-400">your ID is {notif.map((req2: any) => (
//                       <div
//                         key={req2.id}
//                       >your rommCode is: {req2.roomId}
//                       <p>time: {req2.created_at}</p>
//                       </div>

//                   ))}</p>
//                 )}

// <Link href={"/chat"}><button>start chat</button></Link>
//               </div>
//             ))}
//         </div>
//       ): (
//         <p></p>
//       )}


//       {/* 🗂️ Request List Section */}
//       <section className="relative z-10 max-w-4xl mx-auto space-y-6">
//         {requests.length === 0 ? (
//           <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl shadow-xl p-8 text-center text-gray-400">
//             <p className="text-lg">No pending requests 😔</p>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-6">
//             {requests.map((req: any) => (
//               <div
//                 key={req.exchange_id}
//                 className="group bg-white/10 border border-white/20 hover:border-blue-400/40 backdrop-blur-2xl rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/30"
//               >
//                 {/* Card Header */}
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="font-semibold text-lg text-blue-400">
//                     {req.to_fullname || req.to_username}
//                   </h3>
//                   <span
//                     className={`text-xs px-3 py-1 rounded-full font-medium ${
//                       req.status === "pending"
//                         ? "bg-yellow-500/20 text-yellow-300"
//                         : req.status === "accepted"
//                         ? "bg-green-500/20 text-green-300"
//                         : "bg-red-500/20 text-red-300"
//                     }`}
//                   >
//                     {req.status}
//                   </span>
//                 </div>

//                 {/* Skill Info */}
//                 <div className="space-y-2 text-gray-200">
//                   <p>
//                     <span className="text-gray-400">Requested Skill:</span>{" "}
//                     <span className="font-medium text-white">
//                       {req.requested_skill_title || "—"}
//                     </span>
//                   </p>
//                   <p>
//                     <span className="text-gray-400">Offered Skill:</span>{" "}
//                     <span className="font-medium text-white">
//                       {req.skill_offered || "—"}
//                     </span>
//                   </p>
//                 </div>

//                 {/* Footer */}
//                 <div className="mt-4 text-sm text-gray-400 flex justify-between">
//                   <p>📅 {new Date(req.created_at).toLocaleString()}</p>
//                   <button className="text-blue-400 hover:text-blue-300 transition" onClick={() => handleDetails(req)}>
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


// // first 1. when thry press view details let only one popup come out not all of them 
// // 2. design the popup glassmorphism dark blue cool slick elegnart addd some more awesome text and adttractive text 
// // 3. when u fecth data from the notifications, that is where the roomid and other stuff is so you would render it from there and the created+_at and other stuff
// // 4. not it is only users that have accept that should see room id and created_at:" time skill was accepted or declined " and upgrade style oo put a copy icon so when they press the icon it opies the code ot their clipboard  adn write some text telling then that a chat has ope n that they should copy this code and and paste it wehn the [press ]

// // and how can you do it that immedaitly the other user accpet or declines a skill you show the popup how would u do that one but first do this one 


















































































































































































"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clipboard, X } from "lucide-react";

type Notification = {
  id: number;
  roomid: string;
  created_at: string;
  exchange_id: number;
  message: string;
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
  const [copied, setCopied] = useState(false);

  const API_URL = "http://localhost:5000";

  


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

  console.log(selectedNotif, 'sksadsas')

  // ✅ Open popup + load notif for a specific exchange
async function handleDetails(req: RequestItem) {
  setPopup(true);
  setLoadingNotif(true);

  try {
    const res = await fetch(`${API_URL}/notification`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    console.log("RAW DATA:", data);

    // notifications is an ARRAY — pick the matching one
    const notif = data.notifications?.find(
      (n: any) => n.metadata === req.exchange_id
    );

    console.log("FOUND NOTIFICATION:", notif);

    setSelectedNotif(notif || null);
  } catch (err) {
    console.error("Error fetching notification:", err);
  }

  setLoadingNotif(false);
}



  // Copy room code
  const copyCode = () => {
    if (selectedNotif?.roomid) {
      navigator.clipboard.writeText(selectedNotif.roomid);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  console.log(selectedNotif, 'ddd')

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

      {/* ─────────────── POPUP (Glassmorphism) ─────────────── */}
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
  {selectedNotif?.roomid ? (
    <span className="font-bold text-blue-300">{selectedNotif.roomid}</span>
  ) : (
    <span className="text-red-400">Not Available</span>
  )}
</p>

<p>
  <span className="text-gray-400">Created At:</span>{" "}
  <span className="font-medium">
    {selectedNotif?.created_at
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
            ))
            
            }
          </div>
        )}
      </section>
    </main>
  );
}



// the popup  is showing thsi two thing
// room ID : NOT avaliable
// created_at: N/A
// please fix the error  and what is causin the err

// there nothing like exchnage_id it is id comaing when i console.log(selectedNotif, 'sksadsas)
// // see what it shows
// (3) [{…}, {…}, {…}]
// 0
// : 
// {id: 4, sender_id: 11, receiver_id: 2, message: 'Your skill exchange request for "hacking with kali…s ACCEPTED. A private chat room is now available.', is_read: true, …}
// 1
// : 
// created_at
// : 
// "2025-12-09T18:23:28.253Z"
// id
// : 
// 3
// is_read
// : 
// true
// message
// : 
// "Your skill exchange request for \"five\" was ACCEPTED. A private chat room is now available."
// metadata
// : 
// 34
// receiver_id
// : 
// 2
// roomid
// : 
// 387857

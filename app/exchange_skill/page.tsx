"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ExchangePage() {
  const router = useRouter();

  const [requestedSkill, setRequestedSkill] = useState<any>(null);
  const [mySkills, setMySkills] = useState<any[]>([]);
  const [selectedMySkillId, setSelectedMySkillId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000";

  // ================= AUTH CHECK =================
  useEffect(() => {
    async function checkAuth() {
      const res = await fetch(`${API_URL}/auth/profile`, {
        credentials: "include",
      });
      if (!res.ok) router.replace("/login");
    }
    checkAuth();
  }, [router]);

  // ================= GET REQUESTED SKILL =================
  useEffect(() => {
    const data = sessionStorage.getItem("selectedSkill");
    if (!data) {
      router.push("/skills");
      return;
    }
    setRequestedSkill(JSON.parse(data));
    setLoading(false);
  }, [router]);

  // ================= FETCH MY SKILLS =================
  useEffect(() => {
    async function fetchMySkills() {
      try {
        const res = await fetch(`${API_URL}/view-skill`, {
          credentials: "include",
        });
        const data = await res.json();
        setMySkills(data.skills || []);
      } catch {
        setMySkills([]);
      }
    }
    fetchMySkills();
  }, []);

  // ================= SEND EXCHANGE REQUEST =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!requestedSkill || !selectedMySkillId) {
      setMessage("⚠️ Please select a skill to offer.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/exchange-skill`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toUserId: requestedSkill.user_id,
          skillRequestedId: requestedSkill.id,
          offeredSkillId: selectedMySkillId, // ✅ FIXED
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("🎉 Exchange request sent successfully!");
        setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        setMessage(`❌ ${data.message || "Exchange failed"}`);
      }
    } catch {
      setMessage("❌ Network error");
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#050b19] via-[#0a1328] to-[#0f1b3d] text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
        Skill Exchange Request
      </h1>

      <div className="w-full max-w-lg bg-white/10 backdrop-blur-2xl p-8 rounded-2xl border border-white/20 shadow-[0_0_40px_rgba(0,160,255,0.3)]">
        {loading ? (
          <p className="text-center text-cyan-300 animate-pulse">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Requested Skill */}
            <div>
              <label className="block text-sm mb-2 text-cyan-300">Skill You Want</label>
              <input
                type="text"
                value={requestedSkill?.title || ""}
                readOnly
                className="w-full bg-white/10 border border-cyan-400/30 px-4 py-3 rounded-xl text-white shadow-inner"
              />
            </div>

            {/* OFFER SKILL DROPDOWN */}
            <div>
              <label className="block text-sm mb-2 text-cyan-300">
                Offer One of Your Skills
              </label>
              <select
                value={selectedMySkillId ?? ""}
                onChange={(e) => setSelectedMySkillId(Number(e.target.value))}
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-gradient-to-br from-[#081833]/80 to-[#0b1f44]/80
                  backdrop-blur-xl
                  border border-cyan-400/30
                  text-white
                  shadow-inner
                  focus:outline-none focus:ring-2 focus:ring-cyan-400
                  transition-all
                "
              >
                <option value="" disabled className="bg-[#081833] text-gray-400">
                  -- Select Your Skill --
                </option>

                {mySkills.map((skill) => (
                  <option
                    key={skill.id}
                    value={skill.id}
                    className="bg-[#081833] text-white"
                  >
                    {skill.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold
                bg-gradient-to-r from-cyan-400 to-blue-500
                hover:opacity-90 transition
                shadow-lg shadow-blue-700/40"
            >
              Send Exchange Request
            </button>

            {message && (
              <p className="text-center text-sm font-medium text-cyan-300">
                {message}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}














































// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function ExchangePage() {
//   const router = useRouter();
//   const [requestedSkill, setRequestedSkill] = useState<any>(null);
//   const [mySkills, setMySkills] = useState<any[]>([]);
//   const [selectedMySkill, setSelectedMySkill] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   const API_URL = 'http://localhost:5000'

//   // ✅ Load selected skill from SkillsPage
//   useEffect(() => {
//     const data = sessionStorage.getItem("selectedSkill");
//     if (data) setRequestedSkill(JSON.parse(data));
//     else router.push("/skills"); // If nothing, redirect back

//     setLoading(false);
//   }, [router]);

//   // ✅ Fetch my skills
//   useEffect(() => {
//     async function fetchMySkills() {
//       const res = await fetch("http://localhost:5000/view-skill", {
//         credentials: "include",
//       });

//       const data = await res.json();
//       console.log(data.skills, 'hdausodhas')
//       const info = data.skills
//       setMySkills(info)
//       // setMySkills(Array.isArray(data.skills) ? data.skills : []);
//       console.log(mySkills, 'asdsdas')
//     }

//     fetchMySkills();
//   }, []);

//   // ✅ Handle Submit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log(requestedSkill, 'testing', selectedMySkill)

//     if (!requestedSkill || !selectedMySkill) {
//       setMessage("⚠️ Please select your skill to offer.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/exchange-skill", {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           toUserId: requestedSkill.user_id,
//           skillRequestedId: requestedSkill.id,
//           offeredSkill: selectedMySkill,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//             await fetch(`${API_URL}/send-notification`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           receiverId: requestedSkill.user_id,
//           message: `🔥 Someone wants to exchange skills with you!...They requested: ${requestedSkill.title}and They offered: ${selectedMySkill}.Visit your skill requests page to respond.`,
//           metadata: '1',
//         }),
//       });


//           await fetch(`${API_URL}/send-notification`, {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             // receiverId: mySkills.user_id,
//             message: `You have successfully sent a request...  `,
//             metadata: '1',
//             // roomCode: newRoom,
//           }),
//         });


//         setMessage("✅ Exchange request sent!");
//         setTimeout(() => router.push("/dashboard"), 1200);
//       } else {
//         setMessage(`❌ ${data.message || "Exchange failed"}`);
//       }
//     } catch (err) {
//       setMessage("❌ Network error");
//     }
//   };

//   return (
//     <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#0a0f24] via-[#0f172a] to-[#14213d] text-white flex flex-col items-center">
//       <h1 className="text-3xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//         Exchange Skill
//       </h1>

//       {/* Glass Container */}
//       <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-2xl">
//         {loading ? (
//           <p className="text-center text-cyan-300">Loading...</p>
//         ) : (
//           <form onSubmit={handleSubmit}>
//             {/* Requested Skill */}
//             <label className="block text-sm mb-2 text-cyan-300">
//               Skill You Want
//             </label>
//             <input
//               type="text"
//               value={requestedSkill?.title || ""}
//               readOnly
//               className="w-full mb-6 bg-white/10 border border-white/20 px-4 py-3 rounded-xl text-white"
//             />

//             {/* Dropdown of my skills */}
//             <label className="block text-sm mb-2 text-cyan-300">
//               Offer One of Your Skills
//             </label>
//             <select
//               value={selectedMySkill}
//               onChange={(e) => setSelectedMySkill(e.target.value)}
//               className="w-full mb-6 bg-white/10 border border-white/20 px-4 py-3 rounded-xl text-white"
//             >
//               <option value="">-- Select Your Skill --</option>
//               {mySkills.map((skill) => (
//                 <option key={skill.id} value={skill.title}>
//                   {skill.title}
//                 </option>
//               ))}
//             </select>

//             <button
//               type="submit"
//               className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 transition"
//             >
//               Send Exchange Request
//             </button>

//             {message && (
//               <p className="mt-4 text-center text-sm font-medium">{message}</p>
//             )}
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// /// now after i successful exchnage request sent send it to the notifications using this api.....  and send the notification to both user like the user sending the request an the user recieveing the request and rewrite the text in the message make it better and more inutautive and attractive and understandable
// // 2. upgrade style significantly dark blue glassmorphism and add other color and slick mdoern design an dalso tell me how this ocde works explain it to me i dont really understand
// //  protect this route user that anre not logged in should be rediirected to /login when the reach this place
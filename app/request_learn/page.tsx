// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// interface Skill {
//   skill_id?: number;
//   id?: number;
//   skillId?: number;
//   title: string;
//   user_id?: number;
//   ownerId?: number;
// }

// export default function RequestLearning() {
//   const [requestedSkill, setRequestedSkill] = useState<Skill | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   const router = useRouter();
//   const API_URL = "https://skillwrap-backend.onrender.com";

//   // ================= AUTH CHECK =================
//   useEffect(() => {
//     async function checkAuth() {
//       try {
//         const res = await fetch(`${API_URL}/auth/profile`, {
//           credentials: "include",
//         });
//         if (!res.ok) router.replace("/login");
//       } catch {
//         router.replace("/login");
//       }
//     }
//     checkAuth();
//   }, [router]);

//   // ================= LOAD SKILL =================
//   useEffect(() => {
//     const data = sessionStorage.getItem("selectedSkill");
//     if (!data) {
//       router.push("/skills");
//       return;
//     }

//     setRequestedSkill(JSON.parse(data));
//     setLoading(false);
//   }, [router]);

//   // ================= SEND LEARNING REQUEST =================
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!requestedSkill) {
//       setMessage("⚠️ No skill selected.");
//       return;
//     }

//     const toUserId =
//       requestedSkill.user_id ?? requestedSkill.ownerId;

//     const skillRequestedId =
//       requestedSkill.skillId ??
//       requestedSkill.id ??
//       requestedSkill.skill_id;

//     if (!toUserId || !skillRequestedId) {
//       setMessage("❌ Invalid skill data.");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_URL}/learn-skill`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           toUserId,
//           skillRequestedId,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         await fetch(`${API_URL}/send-notification`, {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             receiverId: toUserId,
//             message: "Someone sent you a learning request.",
//           }),
//         });

//         setMessage("🎉 Learning request sent successfully!");
//         setTimeout(() => router.push("/dashboard"), 1200);
//       } else {
//         setMessage(`❌ ${data.message || "Request failed"}`);
//       }
//     } catch {
//       setMessage("❌ Network error");
//     }
//   };

//   if (loading) {
//     return <p className="text-center text-cyan-300">Loading...</p>;
//   }

//   if (!requestedSkill) return null;

//   return (
//     <div className="max-w-xl mx-auto text-white">
//       {/* 🔙 GO BACK */}
//       <div className="flex items-center mb-6">
//         <button
//           onClick={() => router.back()}
//           className="px-4 py-2 rounded-xl bg-white/10 border border-white/20
//           hover:bg-white/20 transition"
//         >
//           ← Go Back
//         </button>
//       </div>

//       <h2 className="text-xl mb-4">
//         Are you sure you want to learn this skill?
//       </h2>

//       <div className="mb-6">
//         <label className="block text-sm mb-2 text-cyan-300">
//           Skill You Want
//         </label>
//         <input
//           type="text"
//           value={requestedSkill.title}
//           readOnly
//           className="w-full bg-white/10 border border-cyan-400/30 px-4 py-3 rounded-xl"
//         />
//       </div>

//       {message && (
//         <p className="mb-4 text-sm text-center">{message}</p>
//       )}

//       <button
//         onClick={handleSubmit}
//         className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500
//         hover:scale-105 transition"
//       >
//         Proceed
//       </button>
//     </div>
//   );
// }










"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* ================= TYPES ================= */
interface Skill {
  skillId?: number;
  skill_id?: number;
  id?: number;
  title: string;
  user_id?: number;
  ownerId?: number;
    mode?: "learning" | "teaching" | "exchange" | "exchanging";
     user_mode?: "learning" | "teaching" | "exchanging"; 
  user?: {
    id: number;
    mode: "learning" | "teaching" | "exchange" | "exchanging";
  };
}

/* ================= PAGE ================= */
export default function RequestLearning() {
    const [myMode, setMyMode] = useState<
    "learning" | "teaching" | "exchanging" | null
  >(null);
  const [requestedSkill, setRequestedSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const API_URL = "https://skillwrap-backend.onrender.com";
    // const API_URL = "http://localhost:4000";

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });
        if (!res.ok) router.replace("/login");

        
        const data = await res.json();
        setMyMode(data.user.mode);
        console.log(data.user.mode ,' ss')
      } catch {
        router.replace("/login");
      }
    }
    checkAuth();
  }, [router]);

  /* ================= LOAD SKILL ================= */
  useEffect(() => {
    const data = sessionStorage.getItem("selectedSkill");
    if (!data) {
      router.push("/skills");
      return;
    }

    setRequestedSkill(JSON.parse(data));
    setLoading(false);
  }, [router]);


  // ================= VALIDATION =================
  function isValidExchange() {
    if (!myMode || !requestedSkill) return false;

    // extract receiver mode safely
    const receiverRawMode =
      requestedSkill.user?.mode || requestedSkill.mode || requestedSkill.user_mode;

      console.log(receiverRawMode, 'reciever')

    const receiverMode = (receiverRawMode);
    console.log(receiverMode, 'reciever')

    if (!receiverMode) return false;

    // Exchange ↔ Exchange
    if (myMode === "exchanging" && receiverMode === "exchanging") return true;

    // Learning → Teaching
    if (myMode === "learning" && receiverMode === "teaching") return true;

    return false;
  }

  console.log(myMode, requestedSkill)

  /* ================= SEND LEARNING REQUEST ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!requestedSkill || !myMode ) {
      setMessage("⚠️ Missing infomations");
      return;
    }

    if (!isValidExchange()) {
      setMessage("❌ Mode mismatch. Exchange not allowed.");
      return;
    }

    if (!note.trim()) {
      setMessage("⚠️ Please tell the teacher what you want to gain.");
      return;
    }
    console.log(requestedSkill, 'lll')

    const toUserId =
      requestedSkill.user?.id ??
      requestedSkill.user_id ??
      requestedSkill.ownerId;

    const skillRequestedId =
      requestedSkill.skillId ??
      requestedSkill.id ??
      requestedSkill.skill_id;


console.log(skillRequestedId, toUserId)

    if (!toUserId || !skillRequestedId) {
      setMessage("❌ Invalid skill data.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/learn-skill`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toUserId,
          skillRequestedId,
          note, // ✅ THIS IS THE IMPORTANT ADDITION
        }),
      });

      console.log(note)
      const data = await res.json();

      if (res.ok) {
        await fetch(`${API_URL}/send-notification`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            receiverId: toUserId,
            message: "Someone sent you a learning request.",
          }),
        });

        setMessage("🎉 Learning request sent successfully!");
        setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        setMessage(`❌ ${data.message || "Request failed"}`);
      }
    } catch {
      setMessage("❌ Network error");
    }
  };

    console.log(myMode, requestedSkill, 'neote')


  if (loading) {
    return <p className="text-center text-cyan-300">Loading...</p>;
  }

  if (!requestedSkill) return null;

  return (
    <div className="max-w-xl mx-auto text-white">
      {/* 🔙 GO BACK */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20
          hover:bg-white/20 transition"
        >
          ← Go Back
        </button>
      </div>

      <h2 className="text-xl mb-6">
        Request to learn this skill
      </h2>

      {/* SKILL */}
      <div className="mb-6">
        <label className="block text-sm mb-2 text-cyan-300">
          Skill You Want
        </label>
        <input
          type="text"
          value={requestedSkill.title}
          readOnly
          className="w-full bg-white/10 border border-cyan-400/30 px-4 py-3 rounded-xl"
        />
      </div>

      {/* NOTE / EXPECTATION */}
      <div className="mb-6">
        <label className="block text-sm mb-2 text-cyan-300">
          What do you want to gain by learning this skill?
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          placeholder="Example: I want to build real projects and understand the basics..."
          className="w-full bg-white/10 border border-cyan-400/30 px-4 py-3 rounded-xl resize-none"
        />
      </div>

      {message && (
        <p className="mb-4 text-sm text-center">{message}</p>
      )}

      <button
        onClick={handleSubmit}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500
        hover:scale-105 transition"
      >
        Send Request
      </button>
    </div>
  );
}




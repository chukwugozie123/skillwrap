// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { json } from "stream/consumers";

// interface Skill {
//   id?: number;
//   skill_id?: number;
//   skillId?: number;
//   title: string;
//   user_id?: number;
//   ownerId?: number;
// }


// interface User {
//   id?: number;
//   skill_id?: number;
//   skillId?: number;
//   title: string;
//   user_id?: number;
//   mode?: number;
// }

// export default function ExchangePage() {
//   const router = useRouter();
//   const API_URL = "https://skillwrap-backend.onrender.com";
//   // const API_URL = "http://localhost:4000"; // Your backend URL

//   const [requestedSkill, setRequestedSkill] = useState<Skill | null>(null);
//     const [requestedUser, setRequestedUser] = useState<User | null>(null);
//   const [mySkills, setMySkills] = useState<Skill[]>([]);
//   const [selectedMySkillId, setSelectedMySkillId] = useState<number | null>(null);
//   const [note, setNote] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   // ================= AUTH =================
//   useEffect(() => {
//     fetch(`${API_URL}/auth/profile`, { credentials: "include" })
//       .then((res) => {
//         if (!res.ok) router.replace("/login");
//       })
//       .catch(() => router.replace("/login"));
//   }, [router]);

//   // ================= REQUESTED SKILL =================
//   useEffect(() => {
//     const data = sessionStorage.getItem("selectedSkill");
//     const data2 = sessionStorage.getItem("selectedUser");

//     if (!data || !data2) {
//       router.push("/skills");
//       return;
//     }

//     setRequestedUser(JSON.parse(data2));
//     setRequestedSkill(JSON.parse(data));
//     setLoading(false);
//   }, [router]);

//   console.log(requestedUser, "checking user")
//   // ================= MY SKILLS =================
//   useEffect(() => {
//     async function fetchSkills() {
//       const res = await fetch(`${API_URL}/view-skill`, {
//         credentials: "include",
//       });
//       const data = await res.json();
//       setMySkills(data.skills || []);
//     }
//     fetchSkills();
//   }, []);

//   // ================= SUBMIT =================
//   const handleSubmit = async () => {
//     if (!requestedSkill || !selectedMySkillId) {
//       setMessage("⚠️ Select a skill to offer");
//       return;
//     }

//     console.log(requestedSkill, 'l')

//     const toUserId =
//       requestedSkill.user_id ?? requestedSkill.ownerId ;

//     const skillRequestedId =
//       requestedSkill.skillId ??
//       requestedSkill.id ??
//       requestedSkill.skill_id;

//       console.log(skillRequestedId, toUserId)

//     try {
//       const res = await fetch(`${API_URL}/exchange-skill`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           toUserId,
//           skillRequestedId,
//           offeredSkillId: selectedMySkillId,
//           note,
//         }),
//       });

//       if (res.ok) {
//         await fetch(`${API_URL}/send-notification`, {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             receiverId: toUserId,
//             message: `Exchange request for "${requestedSkill.title}". 
// They said: "${note}"`,
//           }),
//         });

//         setMessage("🎉 Exchange request sent!");
//         setTimeout(() => router.push("/dashboard"), 1200);
//       } else {
//         setMessage("❌ Exchange failed");
//       }
//     } catch {
//       setMessage("❌ Network error");
//     }
//   };

//   if (loading) return <p className="text-center">Loading...</p>;

//   return (
//     <div className="max-w-xl mx-auto text-white">
//       <button
//         onClick={() => router.back()}
//         className="mb-6 px-4 py-2 rounded-xl bg-white/10"
//       >
//         ← Go Back
//       </button>

//       <h2 className="text-xl mb-4">
//         Exchange for: <b>{requestedSkill?.title}</b>
//       </h2>

//       <select
//         value={selectedMySkillId ?? ""}
//         onChange={(e) => setSelectedMySkillId(Number(e.target.value))}
//         className="w-full mb-4 px-4 py-3 rounded-xl bg-white/10"
//       >
//         <option value="" disabled>
//           -- Select a skill you offer --
//         </option>
//         {mySkills.map((skill) => (
//           <option key={skill.id} value={skill.id}>
//             {skill.title}
//           </option>
//         ))}
//       </select>

//       <textarea
//         value={note}
//         onChange={(e) => setNote(e.target.value)}
//         placeholder="What will you gain from exchanging this skill?"
//         className="w-full min-h-[140px] bg-white/10 border border-cyan-400/30 px-4 py-3 rounded-xl"
//       />

//       {message && (
//         <p className="mt-4 text-center text-sm">{message}</p>
//       )}

//       <button
//         onClick={handleSubmit}
//         className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500"
//       >
//         Send Exchange Request
//       </button>
//     </div>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FirstAchievementPopup from "@/components/FirstAchievementPopup/page";


interface Skill {
  id?: number;
  skill_id?: number;
  skillId?: number;
  title: string;
  user_id?: number;
  ownerId?: number;
  mode?: "learning" | "teaching" | "exchanging";
  user_mode?: "learning" | "teaching" | "exchanging"; 
  user?: {
    id: number;
    mode: "learning" | "teaching" | "exchanging";
  };
}

export default function ExchangePage() {
  const router = useRouter();

      const API_URL = "https://skillwrap-backend.onrender.com";
  // const API_URL = "http://localhost:4000";

  const [requestedSkill, setRequestedSkill] = useState<Skill | null>(null);
  const [myMode, setMyMode] = useState<
    "learning" | "teaching" | "exchanging" | null
  >(null);

  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [selectedMySkillId, setSelectedMySkillId] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFirstSkillPopup, setShowFirstSkillPopup] = useState(false);
  const [Point, setPoints] = useState("")
    const [AchievementMessage, setAchievementMessage] = useState("")



  // ================= GET MY PROFILE =================
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });

        if (!res.ok) {
          router.replace("/login");
          return;
        }

        const data = await res.json();
        setMyMode(data.user.mode); // backend already sends "exchanging"
      } catch {
        router.replace("/login");
      }
    }

    loadProfile();
  }, [router]);

  // ================= GET SELECTED SKILL =================
  useEffect(() => {
    const skillData = sessionStorage.getItem("selectedSkill");

    if (!skillData) {
      router.push("/skills");
      return;
    }

    setRequestedSkill(JSON.parse(skillData));
    setLoading(false);
  }, [router]);

  // ================= GET MY SKILLS =================
  useEffect(() => {
    async function fetchSkills() {
      const res = await fetch(`${API_URL}/view-skill`, {
        credentials: "include",
      });

      const data = await res.json();
      setMySkills(data.skills || []);
    }

    fetchSkills();
  }, []);

  // ================= VALIDATION =================
  function isValidExchange() {
    if (!myMode || !requestedSkill) return false;

    const receiverMode =
      requestedSkill.user?.mode || requestedSkill.mode || requestedSkill.user_mode;

    console.log("My mode:", myMode);
    console.log("Receiver mode:", receiverMode);

    if (!receiverMode) return false;

    // Exchange ↔ Exchange
    if (myMode === "exchanging" && receiverMode === "exchanging")
      return true;

    // Learning → Teaching
    if (myMode === "learning" && receiverMode === "teaching")
      return true;

    return false;
  }

  // ================= SUBMIT =================
  const handleSubmit = async () => {


    if (!requestedSkill || !myMode) {
      setMessage("⚠️ Missing data");
      return;
    }

    if (!isValidExchange()) {
      setMessage("❌ Mode mismatch. Exchange not allowed.");
      return;
    }

    if (myMode === "exchanging" && !selectedMySkillId) {
      setMessage("⚠️ Select a skill to offer.");
      return;
    }

    const toUserId =
      requestedSkill.user?.id ??
      requestedSkill.user_id ??
      requestedSkill.ownerId;

    const skillRequestedId =
      requestedSkill.skillId ??
      requestedSkill.id ??
      requestedSkill.skill_id;

      console.log(requestedSkill,selectedMySkillId,myMode, toUserId, 'sdsada')

    try {
      const res = await fetch(`${API_URL}/exchange-skill`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toUserId,
          skillRequestedId,
          offeredSkillId:
            myMode === "exchanging" ? selectedMySkillId : null,
          note,
        }),
      });

  
      if (!res.ok) {
        setMessage("❌ Exchange failed");
        return;
      }

          await fetch(`${API_URL}/send-notification`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            receiverId: toUserId,
            message: "Someone sent you an exchange request.  Check your request",
          }),
        });


const res2 = await fetch(`${API_URL}/achievements/check`, {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    action: "request_sent"
  })
});

const response = await res2.json();

console.log(response, response.points, 'results in acttion')

if (response.success) {
  setPoints(response.points);
  setAchievementMessage(response.achievement);
  setShowFirstSkillPopup(true);
} else {
  setMessage("🎉 Request sent!");
  setTimeout(() => router.push("/dashboard"), 1200);
}
    
    } catch {
      setMessage("❌ Network error");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto text-white">
      <button
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 rounded-xl bg-white/10"
      >
        ← Go Back
      </button>

      <h2 className="text-xl mb-4">
        Exchange for: <b>{requestedSkill?.title}</b>
      </h2>

      {myMode === "exchanging" && (
        <select
          value={selectedMySkillId ?? ""}
          onChange={(e) => setSelectedMySkillId(Number(e.target.value))}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/10"
        >
          <option value="" disabled>
            -- Select a skill you offer --
          </option>
          {mySkills.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.title}
            </option>
          ))}
        </select>
      )}

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="What will you gain from this?"
        className="w-full min-h-[140px] bg-white/10 border border-cyan-400/30 px-4 py-3 rounded-xl"
      />

      {message && (
        <p className="mt-4 text-center text-sm">{message}</p>
      )}

      <button
        onClick={handleSubmit}
        className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500"
      >
        Send Request
      </button>

      <FirstAchievementPopup
  trigger={showFirstSkillPopup}
  points={Point}
  message={AchievementMessage}
  onClose={() => setShowFirstSkillPopup(false)}
/>

    </div>
  );
}

"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface Skill {
  skill_id: number;
  id: number;
  title: string;
  user_id: number;
}

export default function ExchangePage() {
  const router = useRouter()

  const [requestedSkill, setRequestedSkill] = useState<Skill | null>(null);
  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [selectedMySkillId, setSelectedMySkillId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchingSkills, setFetchingSkills] = useState(true);

  // const API_URL = useMemo(() => process.env.NEXT_PUBLIC_API_URL, []);
   const API_URL= 'https://skillwrap-backend.onrender.com'
  // const API_URL = "http://localhost:5000"


  
  console.log(mySkills, '123check')
  // ================= AUTH CHECK =================
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });
        if (!res.ok) router.replace("/login");
      } catch {
        router.replace("/login");
      }
    }
    checkAuth();
  }, [router, API_URL]);

  // ================= GET REQUESTED SKILL =================
  useEffect(() => {
    const data = sessionStorage.getItem("selectedSkill");
    if (!data) {
      router.push("/skills");
      return;
    }
    setRequestedSkill(JSON.parse(data) as Skill);
    setLoading(false);
  }, [router]);

  // ================= FETCH MY SKILLS =================
  useEffect(() => {
    async function fetchMySkills() {
      setFetchingSkills(true);
      try {
        const res = await fetch(`${API_URL}/view-skill`, {
          credentials: "include",
        });
        const data = await res.json();
        setMySkills(data.skills || []);
      } catch {
        setMySkills([]);
      } finally {
        setFetchingSkills(false);
      }
    }
    fetchMySkills();
  }, [API_URL]);

  // ================= SEND EXCHANGE REQUEST =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!requestedSkill || !selectedMySkillId) {
      setMessage("⚠️ Please select a skill to offer.");
      return;
    }

    console.log(requestedSkill)
    try {
      const res = await fetch(`${API_URL}/exchange-skill`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toUserId: requestedSkill.user_id,
          skillRequestedId: requestedSkill.skill_id || requestedSkill.id,
          offeredSkillId: selectedMySkillId,
        }),
      });

      const data = await res.json();

      if (res.ok) {

        await fetch(`${API_URL}/send-notification`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // exchange_id: req.exchange_id,
            receiverId: requestedSkill.user_id,
            message: `someone sent you a exchnage request.. chekc your requests`,
            // metadata: req.exchange_id,
          }),
        });

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
        {(loading || fetchingSkills) ? (
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

            {/* Offer Skill Dropdown */}
            <div>
              <label className="block text-sm mb-2 text-cyan-300">Offer One of Your Skills</label>
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
                  <option key={skill.id} value={skill.id} className="bg-[#081833] text-white">
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
              <p className="text-center text-sm font-medium text-cyan-300">{message}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

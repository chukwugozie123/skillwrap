// // app/skill/[skillId]/edit-skill/page.tsx

// import Edit_skill from "@/components/edit-skill/page";

// // const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
//  const API_URL= 'https://skillwrap-backend.onrender.com'

// export default async function EditSkillPage({
//   params,
// }: {
//   params: Promise<{ skillId: string }>;
// }) {
//   // ✅ MUST await params in new Next versions
//   const { skillId } = await params;

//   const res = await fetch(`${API_URL}/skills/${skillId}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch skill");
//   }

//   const data = await res.json();
//   const skill = data.skills;

//   return <Edit_skill skill={skill} />;
// }




"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface SkillType {
  id: number;
  title: string;
  category: string;
  description: string;
  level: string;
  youtubelink?: string;
  portfolio_link?: string;
  learningpoint?: string;
}

const API_URL = "https://skillwrap-backend.onrender.com";
// const API_URL = "http://localhost:4000";

export default function EditSkill() {
  // const params = useParams(); // ✅ correct usage
  // const id = params?.id as string; // ✅ safely extract id

const params = useParams();
const id = params.skillId as string;


  const router = useRouter();

  const [skill, setSkill] = useState<SkillType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDesc] = useState("");
  const [level, setLevel] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [learningpoint, setLearningpoint] = useState("");
console.log(id)
  // 🔹 Fetch skill
  useEffect(() => {
    if (!id) return;

    async function fetchSkill() {
      try {
        const res = await fetch(`${API_URL}/skills/${id}`, {
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setSkill(data.skill);

        setTitle(data.skill.title);
        setCategory(data.skill.category);
        setDesc(data.skill.description);
        setLevel(data.skill.level);
        setYoutubeLink(data.skill.youtube_link || "");
        setPortfolioLink(data.skill.portfolio_link || "");
        setLearningpoint(data.skill.learningPoints || "");
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load skill");
      } finally {
        setLoading(false);
      }
    }

    fetchSkill();
  }, [id]);
console.log(skill)
  // 🔹 Submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/skill/${id}/edit-skill`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          category,
          description,
          level,
          youtubeLink,
          portfolioLink,
          learningpoint,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Skill updated successfully!");
        setTimeout(() => router.push("/my-skill"), 1200);
      } else {
        setMessage(data.error || "❌ Failed to update skill");
      }
    } catch {
      setMessage("❌ Network error");
    } finally {
      setSaving(false);
    }
  }

  // 🔹 LOADING UI
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0f1c] via-[#0f1e3a] to-[#0a0f1c] text-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-400 text-sm">Loading skill data...</p>
      </div>
    );
  }

  // 🔹 SAFETY
  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Skill not found
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#0f1e3a] to-[#0a0f1c] text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl"
      >
        <h1 className="text-3xl font-semibold text-center mb-6 text-blue-300">
          Edit Skill
        </h1>

        {message && (
          <p className="text-center mb-4 text-sm text-gray-300">
            {message}
          </p>
        )}

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={saving}
          className="w-full p-3 rounded-lg bg-white/10 mb-3 outline-none"
          placeholder="Title"
          required
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={saving}
          className="w-full p-3 rounded-lg bg-white/10 mb-3 outline-none"
          placeholder="Category"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          disabled={saving}
          className="w-full p-3 rounded-lg bg-white/10 mb-3 outline-none resize-none"
          placeholder="Description"
          rows={3}
          required
        />

        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          disabled={saving}
          className="w-full p-3 rounded-lg bg-white/10 mb-3 outline-none"
          placeholder="Level"
          required
        />

        <input
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          disabled={saving}
          className="w-full p-3 rounded-lg bg-white/10 mb-3 outline-none"
          placeholder="YouTube link"
        />

        <input
          value={portfolioLink}
          onChange={(e) => setPortfolioLink(e.target.value)}
          disabled={saving}
          className="w-full p-3 rounded-lg bg-white/10 mb-3 outline-none"
          placeholder="Portfolio link"
        />

        <textarea
          value={learningpoint}
          onChange={(e) => setLearningpoint(e.target.value)}
          disabled={saving}
          className="w-full p-3 rounded-lg bg-white/10 mb-5 outline-none resize-none"
          placeholder='Learning points (JSON array)'
          rows={3}
        />

        <button
          disabled={saving}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold hover:opacity-90 transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <Link
        href="/my-skill"
        className="absolute bottom-8 left-8 text-blue-400 hover:underline"
      >
        ← Back
      </Link>
    </div>
  );
}



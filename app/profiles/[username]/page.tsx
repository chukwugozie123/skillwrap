

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  Trophy,
  XCircle,
  MessageSquare,
  Calendar,
  Eye,
} from "lucide-react";

/* ================= TYPES ================= */

type Review = {
  id: number;
  rating: number | string;
  review_text: string;
  reviewer_username: string;
  reviewer_avatar: string | null;
};

type Skill = {
  skill_id: number;
  skill_img: string | null;
  title: string;
  description: string;
  level: string;
  category: string;
  avg_rating: number | string | null;
  review_count: number;
  user_mode?: "learning" | "teaching" | "exchanging";
  user_bio?: string | null;
  reviews: Review[];
};

type ProfileResponse = {
  profile: {
    fullname: string;
    username: string;
    img_url: string | null;
    created_at: string;
  };
  stats: {
    successful_exchanges: number;
    overall_rating: number | string | null;
    total_reviews: number;
    canclledExchnaged: number;
  };
  skills: Skill[];
};

export default function ProfilePage() {
  const { username } = useParams();
  const router = useRouter();

  // const API_URL = "http://localhost:4000";
  const API_URL = "https://skillwrap-backend.onrender.com";

  const [data, setData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [myMode, setMymode] = useState("")

  useEffect(() => {
    if (!username) return;

    fetch(`${API_URL}/profile/${username}`, { credentials: "include" })
      .then((res) => res.json())
      .then(setData)
      .catch(() => router.push("/404"))
      .finally(() => setLoading(false));
  }, [username, router]);

    useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, {
          credentials: "include",
        });
        if (!res.ok) router.replace("/login");

        
        const data = await res.json();
        setMymode(data.user.mode);
      } catch {
        router.replace("/login");
      }
    }
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-gray-400">
        Loading profile…
      </div>
    );
  }

  if (!data) return null;

  const { profile, stats, skills } = data;
  console.log(skills, myMode, 's')

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#050b2e] to-[#020617] text-white px-6 py-12">
      <button
        onClick={() => router.back()}
        className="mb-8 px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
      >
        ← Go Back
      </button>

      <div className="max-w-7xl mx-auto space-y-20">

        {/* ================= PROFILE HEADER ================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-2xl"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-indigo-500/20 blur-3xl" />

          <div className="relative z-10 p-10 flex flex-col md:flex-row gap-10 items-center">
            
            {/* AVATAR */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl" />
              <Image
                src={profile.img_url || "/avatar.png"}
                alt="avatar"
                width={150}
                height={150}
                unoptimized
                className="relative rounded-full border-4 border-cyan-400 object-cover shadow-2xl"
              />
            </div>

            {/* INFO */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {profile.fullname}
                </h1>

                {/* MODE BADGES */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {skills.map(
                    (skill) =>
                      skill.user_mode && (
                        <span
                          key={skill.skill_id}
                          className={`px-4 py-1 rounded-full text-xs font-semibold tracking-wide
                            ${
                              skill.user_mode === "teaching"
                                ? "bg-green-500/20 text-green-400"
                                : skill.user_mode === "learning"
                                ? "bg-cyan-500/20 text-cyan-400"
                                : "bg-purple-500/20 text-purple-400"
                            }`}
                        >
                          {skill.user_mode.toUpperCase()}
                        </span>
                      )
                  )}
                </div>
              </div>

              <p className="text-blue-400">@{profile.username}</p>

              {/* BIO */}
              {skills.map(
                (skill) =>
                  skill.user_bio && (
                    <div
                      key={`bio-${skill.skill_id}`}
                      className="max-w-2xl mx-auto md:mx-0 rounded-2xl bg-black/30 border border-white/10 p-4 text-gray-300 text-sm leading-relaxed"
                    >
                      {skill.user_bio}
                    </div>
                  )
              )}

              <div className="flex items-center gap-2 text-sm text-gray-400 justify-center md:justify-start">
                <Calendar size={14} />
                Joined {new Date(profile.created_at).toDateString()}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ================= STATS ================= */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard icon={<Trophy />} label="Successful Exchanges" value={stats.successful_exchanges} color="from-yellow-400 to-orange-500" />
          <StatCard icon={<XCircle />} label="Cancelled" value={stats.canclledExchnaged} color="from-red-500 to-rose-500" />
          <StatCard icon={<Star />} label="Rating" value={`${Number(stats.overall_rating || 0).toFixed(1)}`} color="from-cyan-400 to-blue-500" />
          <StatCard icon={<MessageSquare />} label="Reviews" value={stats.total_reviews} color="from-purple-400 to-pink-500" />
        </section>

      {/* ================= SKILLS ================= */}
<section>
  <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
    Skills & Reviews
  </h2>

  {skills.length === 0 ? (
    <p className="text-gray-400">No skills added yet.</p>
  ) : (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
      {skills.map((skill) => {
        // ================= DETERMINE BUTTON TYPE =================
        let actionBtn = null;

        // normalize user_mode to lowercase
        const skillMode = skill.user_mode?.toLowerCase();

        // Check mode rules
        if (myMode === "learning" && skillMode === "teaching") {
          actionBtn = {
            text: "Request to Learn",
            style: "bg-cyan-500 hover:bg-cyan-600",
            onClick: () => {
              sessionStorage.setItem("selectedSkill", JSON.stringify(skill));
              router.push("/request_learn");
            },
          };
        } else if (myMode === "exchanging" && skillMode === "exchanging") {
          actionBtn = {
            text: "Request to Exchange",
            style: "bg-purple-500 hover:bg-purple-600",
            onClick: () => {
              sessionStorage.setItem("selectedSkill", JSON.stringify(skill));
              router.push("/exchange_skill");
            },
          };
        }

        return (
          <motion.div
            key={skill.skill_id}
            whileHover={{ y: -8 }}
            className="group rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden flex flex-col"
          >
            <Link
              href={`/skills/${skill.skill_id}`}
              className="relative block"
            >
              <Image
                src={skill.skill_img || "/skill-placeholder.jpg"}
                alt={skill.title}
                width={500}
                height={260}
                className="w-full h-52 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl backdrop-blur-md">
                  <Eye size={16} /> View Skill
                </span>
              </div>
            </Link>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold text-cyan-300">{skill.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-3">{skill.description}</p>
              </div>

              {/* Action Button */}
              {actionBtn && (
                <button
                  onClick={actionBtn.onClick}
                  className={`w-full py-3 rounded-xl text-white font-semibold ${actionBtn.style} transition transform hover:scale-105`}
                >
                  {actionBtn.text}
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  )}
</section>

      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden"
    >
      <div className={`absolute inset-0 opacity-20 blur-2xl bg-gradient-to-br ${color}`} />
      <div className="relative z-10 space-y-2">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
          {icon}
        </div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
}

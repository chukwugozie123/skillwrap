"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

/* ================= TYPES ================= */

type Review = {
  id: number;
  rating: number | string;
  review_text: string;
  reviewer_username: string;
  reviewer_avatar: string | null;
  created_at: string;
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
  };
  skills: Skill[];
};

/* ================= PAGE ================= */

export default function ProfilePage() {
  const { username } = useParams();
  const router = useRouter();

  // const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_URL = 'http://localhost:5000'

  const [data, setData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!username) return;

    fetch(`${API_URL}/profile/${username}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setData)
      .catch(() => router.push("/404"))
      .finally(() => setLoading(false));
  }, [username, API_URL, router]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading profile...
      </div>
    );

  if (!data) return null;

  const { profile, stats, skills } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#1e1b4b] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* ================= PROFILE HEADER ================= */}
        <section className="flex flex-col md:flex-row gap-6 items-center bg-white/10 backdrop-blur-2xl p-8 rounded-3xl border border-white/20">
          <Image
            src={profile.img_url ? `${API_URL}/uploads/${profile.img_url}` : "/avatar.png"}
            alt={`${profile.fullname} avatar`}
            width={112}
            height={112}
            className="rounded-full object-cover border border-white/30"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{profile.fullname}</h1>
            <p className="text-blue-400">@{profile.username}</p>
            <p className="text-sm text-gray-400 mt-1">
              Joined {new Date(profile.created_at).toDateString()}
            </p>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Successful Exchanges" value={stats.successful_exchanges} />
          <StatCard title="Overall Rating" value={`${Number(stats.overall_rating || 0).toFixed(1)} ⭐`} />
          <StatCard title="Total Reviews" value={stats.total_reviews} />
        </section>

        {/* ================= SKILLS ================= */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Skills & Reviews</h2>
          {skills.length === 0 ? (
            <p className="text-gray-400">No skills added yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill) => {
                const filteredReviews = skill.reviews.filter(
                  (r) => r.reviewer_username !== profile.username
                );

                return (
                  <div
                    key={skill.skill_id}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden"
                  >
                    {skill.skill_img && (
                      <Image
                        src={`${API_URL}/uploads/${skill.skill_img}`}
                        alt={skill.title}
                        width={400}
                        height={176}
                        className="w-full h-44 object-cover"
                      />
                    )}

                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-blue-300">{skill.title}</h3>
                        <span className="text-yellow-400 font-semibold">
                          {Number(skill.avg_rating || 0).toFixed(1)} ⭐
                        </span>
                      </div>

                      <p className="text-gray-300 text-sm">{skill.description}</p>

                      <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                        <span className="px-3 py-1 bg-blue-500/10 rounded-full">{skill.level}</span>
                        <span className="px-3 py-1 bg-purple-500/10 rounded-full">{skill.category}</span>
                        <span>{skill.review_count} reviews</span>
                      </div>

                                    <button
                onClick={() => {
                  sessionStorage.setItem(
                    "selectedSkill",
                    JSON.stringify(skill)
                  );
                  router.push("/exchange_skill");
                }}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 
                font-semibold text-white shadow-lg hover:shadow-cyan-400/50 
                hover:scale-[1.03] active:scale-95 transition-all duration-200"
              >
                🤝 Request Exchange
              </button>
{/* 
                             <button
              onClick={() => router.push(`/exchange?skill=${skill.skill_id}`)}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold shadow-lg hover:opacity-90 transition"
            >
              🤝 Request Skill Exchange
            </button> */}

                      {/* ================= REVIEWS ================= */}
                      {filteredReviews.length > 0 ? (
                        <div className="space-y-3 border-t border-white/10 pt-4">
                          <p className="text-sm text-gray-400">What others say</p>

                          {filteredReviews.slice(0, 3).map((r) => (
                            <div
                              key={r.id}
                              className="bg-black/30 rounded-xl p-3 hover:bg-black/40 transition"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Image
                                    src={r.reviewer_avatar ? `${API_URL}/uploads/${r.reviewer_avatar}` : "/avatar.png"}
                                    alt={`${r.reviewer_username} avatar`}
                                    width={28}
                                    height={28}
                                    className="rounded-full"
                                  />
                                  <span className="text-sm font-medium text-blue-300">
                                    @{r.reviewer_username}
                                  </span>
                                </div>
                                <span className="text-yellow-400 text-sm">
                                  {Number(r.rating).toFixed(1)} ⭐
                                </span>
                              </div>
                              <p className="text-sm text-gray-300 mt-2">{r.review_text}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 border-t border-white/10 pt-4">
                          No reviews yet
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center">
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-2xl font-bold text-blue-400">{value}</p>
    </div>
  );
}

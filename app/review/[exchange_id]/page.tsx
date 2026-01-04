"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

/* ================= TYPES ================= */

type Exchange = {
  exchange_id: number;
  from_user_id: number;
  to_user_id: number;
  from_fullname: string;
  to_fullname: string;
  from_username: string;
  to_username: string;
  skill_offered_id: number;
  skill_requested_id: number;
  skill_offered_title: string;
  skill_requested_title: string;
};

type User = {
  user_id: number;
  fullname: string;
  username: string;
};

/* ================= PAGE ================= */

export default function ReviewPage() {
  const { exchange_id } = useParams();
  const router = useRouter();


  // const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
   const API_URL= 'https://skillwrap-backend.onrender.com'
    // const API_URL = "http://localhost:5000";

  const [user, setUser] = useState<User | null>(null);
  const [exchange, setExchange] = useState<Exchange | null>(null);
  const [loading, setLoading] = useState(true);

  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/profile`, { credentials: "include" });
        const data = await res.json();
        if (!data?.user) throw new Error("Invalid user data");
        setUser(data.user);
      } catch {
        router.replace("/login");
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  /* ================= LOAD EXCHANGE ================= */
  useEffect(() => {
    if (!exchange_id) return;

    const fetchExchange = async () => {
      try {
        const res = await fetch(`${API_URL}/exchange/${exchange_id}`, { credentials: "include" });
        const data = await res.json();
        if (!data?.exchange) {
          router.replace("/dashboard");
          return;
        }
        setExchange(data.exchange);
      } catch {
        router.replace("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchExchange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchange_id, router]);

  if (loading || !user || !exchange) return null;

  /* ================= REVIEW LOGIC ================= */
  const isFromUser = user.user_id === exchange.from_user_id;
  const receiverName = isFromUser ? exchange.to_fullname : exchange.from_fullname;
  const receiverUsername = isFromUser ? exchange.to_username : exchange.from_username;
  const skillReviewedTitle = isFromUser ? exchange.skill_requested_title : exchange.skill_offered_title;
  const skillReviewedId = isFromUser ? exchange.skill_requested_id : exchange.skill_offered_id;
  const to_user_id = isFromUser ? exchange.to_user_id : exchange.from_user_id;

  /* ================= SUBMIT REVIEW ================= */
  const submitReview = async () => {
    if (!rating || !review.trim()) {
      setError("Rating and review are required");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchange_id: exchange.exchange_id,
          from_user_id: user.user_id,
          to_user_id,
          skill_id: skillReviewedId,
          rating,
          review_text: review,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "You already reviewed this exchange");
        setSubmitting(false);
        return;
      }

      await fetch(`${API_URL}/send-notification`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exchange_id: exchange.exchange_id,
          receiverId: to_user_id,
          message: `${user.fullname} (@${user.username}) has left a ${rating}-star review on your skill "${skillReviewedTitle}".`,
          metadata: exchange.exchange_id,
        }),
      });

      setSuccess("🎉 Review submitted successfully");

      setTimeout(() => router.replace("/dashboard"), 1200);
    } catch (err) {
      console.error(err);
      setError("Server error while submitting review");
      setSubmitting(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#1e1b4b] text-white flex justify-center items-center px-4">
            {/* 🔙 GO BACK BUTTON */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl 
          bg-white/10 border border-white/20 backdrop-blur-md
          text-sm font-medium hover:bg-white/20 hover:scale-105 
          transition-all duration-300"
        >
          ← Go Back
        </button>
      </div>
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-green-400 mb-2">
          🎉 Exchange Completed
        </h1>
        <p className="text-gray-300 mb-6">
          You successfully received <span className="text-blue-400">{skillReviewedTitle}</span>
        </p>
        <p className="text-sm text-gray-400 mb-4">
          Reviewing as <span className="text-blue-300 font-medium">@{user.username}</span>
        </p>
        <button
          onClick={() => setShowReview(true)}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold"
        >
          Write a Review
        </button>
      </div>

      {/* ================= REVIEW MODAL ================= */}
      {showReview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 max-w-lg w-full relative">
            <button
              onClick={() => setShowReview(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-blue-400 mb-2">
              Review {receiverName} (@{receiverUsername})
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              Skill reviewed: {skillReviewedTitle}
            </p>

            {/* Stars */}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  onClick={() => setRating(i)}
                  className={`text-4xl transition ${i <= rating ? "text-yellow-400" : "text-gray-600"}`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={5}
              className="w-full bg-black/30 border border-white/20 rounded-xl p-3 mb-4 text-white"
              placeholder="Share your experience..."
            />

            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            {success && <p className="text-green-400 text-sm mb-3">{success}</p>}

            <button
              onClick={submitReview}
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

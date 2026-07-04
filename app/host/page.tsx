"use client";

import { useState } from "react";

const API_URL = "http://localhost:4000";

export default function HostEventPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    banner_url: "",
    description: "",
    deadline: "",
    participants: "",
    difficulty: "Easy",
    requirements: "",
    technologies: "",
    rewards: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        participants: Number(form.participants),
        requirements: form.requirements.split(",").map((r) => r.trim()),
        technologies: form.technologies.split(",").map((t) => t.trim()),
        rewards: form.rewards.split(",").map((r) => r.trim()),
      };

      const res = await fetch(`${API_URL}/events/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create event");
        return;
      }

      alert("Event created successfully 🚀");

      setForm({
        title: "",
        banner_url: "",
        description: "",
        deadline: "",
        participants: "",
        difficulty: "Easy",
        requirements: "",
        technologies: "",
        rewards: "",
      });
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-4 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl"
      >
        <h1 className="text-2xl font-bold mb-2">Host an Event 🚀</h1>

        {/* Title */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none"
          required
        />

        {/* Banner */}
        <input
          name="banner_url"
          value={form.banner_url}
          onChange={handleChange}
          placeholder="Banner Image URL"
          className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none"
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none h-28"
        />

        {/* Deadline + Participants */}
        <div className="grid grid-cols-2 gap-3">
          <input
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            placeholder="Deadline (e.g. 7 days)"
            className="p-3 rounded-xl bg-black/30 border border-white/10 outline-none"
          />

          <input
            name="participants"
            value={form.participants}
            onChange={handleChange}
            placeholder="Max Participants"
            type="number"
            className="p-3 rounded-xl bg-black/30 border border-white/10 outline-none"
          />
        </div>

        {/* Difficulty */}
        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        {/* Requirements */}
        <input
          name="requirements"
          value={form.requirements}
          onChange={handleChange}
          placeholder="Requirements (comma separated)"
          className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none"
        />

        {/* Technologies */}
        <input
          name="technologies"
          value={form.technologies}
          onChange={handleChange}
          placeholder="Technologies (React, Node, etc)"
          className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none"
        />

        {/* Rewards */}
        <input
          name="rewards"
          value={form.rewards}
          onChange={handleChange}
          placeholder="Rewards (comma separated)"
          className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold hover:scale-[1.02] transition-all"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";

export default function HelpCenterPage() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is SkillWrap?",
      a: "SkillWrapp is a skill-exchange platform where users trade knowledge instead of money. You offer what you know and learn what you need from others."
    },
    {
      q: "How do skill exchanges work?",
      a: (
        <ol className="list-decimal list-inside space-y-2">
          <li>Browse skills shared by other users.</li>
          <li>Select a skill you want to learn.</li>
          <li>Click <b>Request Exchange</b>.</li>
          <li>The other user reviews your request.</li>
          <li>Once accepted, a room code is generated.</li>
          <li>Copy the room code and start chatting.</li>
        </ol>
      )
    },
    {
      q: "How does the AI Roadmap feature work?",
      a: (
        <div className="space-y-2">
          <p>
            SkillWrapp uses AI to generate personalized learning roadmaps based on
            the skill you want to learn.
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter a skill you want to learn (e.g. UI/UX, Web Dev, Data Analysis)</li>
            <li>The AI breaks it into beginner → intermediate → advanced steps</li>
            <li>You can follow the roadmap or use it to find matching mentors</li>
          </ul>
        </div>
      )
    },
    {
      q: "Does the AI replace real teachers?",
      a: "No. The AI is a guide, not a replacement. It helps structure your learning, but real skill exchange happens between users."
    },
    {
      q: "How does AI help me find the right skills or people?",
      a: "Based on your interests and selected skills, the AI suggests relevant learning paths and helps you understand what skills to look for when requesting exchanges."
    },
    {
      q: "How many exchanges can I make?",
      a: "Each user has a limited number of active exchanges to keep things fair. Finish or cancel an exchange to unlock more."
    },
    {
      q: "Where do I chat after an exchange is accepted?",
      a: "Once accepted, you’ll be redirected to a private chat room. You can always return to it from the Requests Sent page."
    },
    {
      q: "I forgot my room code. What should I do?",
      a: "Go to Requests Sent, open the exchange details, and your room code will be visible there."
    },
    {
      q: "Can I cancel or decline an exchange?",
      a: "Yes. You can decline incoming requests or cancel sent ones before acceptance."
    },
    {
      q: "Who can see my skills?",
      a: "All registered users can discover your skills unless you edit or delete them."
    },
    {
      q: "Is SkillWrap free?",
      a: "Yes. SkillWrapp is completely free. Learning should never be locked behind money."
    },
    {
      q: "Is my data safe?",
      a: "Yes. Your personal data is protected and never sold. AI features do not expose your private messages."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
            Help Center
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Learn how to use SkillWrapp, exchange skills, and grow with AI guidance.
          </p>
        </motion.div>

        {/* QUICK START */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl"
        >
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
            🚀 Quick Start Guide
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>🔍 Browse skills from the Discover page.</li>
            <li>🤝 Request an exchange.</li>
            <li>✅ Get accepted.</li>
            <li>🔑 Copy your room code.</li>
            <li>💬 Start learning together.</li>
          </ul>
        </motion.div>

        {/* AI GUIDE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 p-8 rounded-3xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/20 backdrop-blur-xl"
        >
          <h2 className="text-2xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <Sparkles size={20} /> Using SkillWrap AI
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>🧠 Enter a skill you want to learn.</li>
            <li>📚 AI generates a structured roadmap.</li>
            <li>🎯 Follow the roadmap or match with real users.</li>
            <li>⚠️ AI gives guidance, not guarantees.</li>
          </ul>
        </motion.div>

        {/* FAQ */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl bg-white/10 border border-white/20 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="font-semibold">{faq.q}</span>
                <ChevronDown
                  className={`transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === i && (
                <div className="px-6 pb-5 text-sm text-gray-300">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 text-center text-gray-400 text-sm"
        >
          Still stuck? Visit the Contact page and we’ll help you out.
        </motion.div>

      </div>
    </div>
  );
}

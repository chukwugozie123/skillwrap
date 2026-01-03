"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function HelpCenterPage() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is SkillWrapp?",
      a: "SkillWrapp is a skill-exchange platform where users trade knowledge instead of money. You can offer what you’re good at and learn from others in return."
    },
    {
      q: "How do skill exchanges work?",
      a: (
        <>
          <ol className="list-decimal list-inside space-y-2">
            <li>Browse skills shared by other users.</li>
            <li>Select a skill you want to learn.</li>
            <li>Click <b>Request Exchange</b>.</li>
            <li>The other user reviews your request.</li>
            <li>Once accepted, a room code is generated.</li>
            <li>Copy the room code and start chatting.</li>
          </ol>
        </>
      )
    },
    {
      q: "How many exchanges can I make?",
      a: "To keep SkillWrapp fair and meaningful, each user has a limited number of active exchanges at a time. Complete or cancel an exchange to unlock more."
    },
    {
      q: "Where do I chat after an exchange is accepted?",
      a: "Once your request is accepted, you’ll be redirected to a private chat room. You can also access it later from the Requests Sent page."
    },
    {
      q: "I forgot my room code. What should I do?",
      a: "No worries! Go to Requests Sent, open the exchange details, and you’ll find your room code there."
    },
    {
      q: "Can I decline or cancel an exchange?",
      a: "Yes. You can decline incoming requests or cancel sent requests before they’re accepted."
    },
    {
      q: "Who can see my skills?",
      a: "All registered users can discover your skills unless you delete or edit them."
    },
    {
      q: "Is SkillWrapp free to use?",
      a: "Yes! SkillWrapp is completely free. We believe learning should be accessible to everyone."
    },
    {
      q: "How do I edit my profile?",
      a: "Go to Profile → Edit Profile. You can update your bio, profile picture, and personal information."
    },
    {
      q: "Is my data safe?",
      a: "Yes. We take privacy seriously. Your data is protected and never shared without your consent."
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
            Everything you need to know about using SkillWrapp effectively.
          </p>
        </motion.div>

        {/* QUICK GUIDE */}
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
            <li>🤝 Request an exchange with one click.</li>
            <li>✅ Wait for the other user to accept.</li>
            <li>🔑 Copy your room code.</li>
            <li>💬 Start chatting and exchanging knowledge.</li>
          </ul>
        </motion.div>

        {/* FAQ SECTION */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-white/10 border border-white/20 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="font-semibold text-white">{faq.q}</span>
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

        {/* FOOTER NOTE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 text-center text-gray-400 text-sm"
        >
          Still need help? Visit our Contact Us page and we’ll be happy to assist you.
        </motion.div>

      </div>
    </div>
  );
}

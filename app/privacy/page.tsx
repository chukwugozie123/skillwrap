"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent"
        >
          Privacy Policy
        </motion.h1>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 space-y-6">
          <Section title="Information We Collect">
            We collect information such as your name, email, skills, messages,
            and profile details to provide our services.
          </Section>

          <Section title="How We Use Your Data">
            Your data is used to enable skill exchanges, communication, and to
            improve platform performance.
          </Section>

          <Section title="Cookies">
            Skillwrapp uses cookies to maintain sessions and enhance user
            experience.
          </Section>

          <Section title="Data Protection">
            We apply industry-standard security practices to protect your data.
          </Section>

          <Section title="Third Parties">
            We do not sell your personal data. Limited data may be shared with
            trusted services strictly for platform functionality.
          </Section>

          <Section title="Your Rights">
            You may request access, correction, or deletion of your personal
            data at any time.
          </Section>

          <p className="text-sm text-gray-400 text-center pt-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-indigo-300 mb-2">{title}</h2>
      <p className="text-gray-300 leading-relaxed">{children}</p>
    </div>
  );
}

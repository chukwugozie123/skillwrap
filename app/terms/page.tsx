"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

export default function TermsPage() {
  const router = useRouter()
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10">

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

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          Terms of Service
        </motion.h1>

        <p className="text-gray-300 mb-8 text-center">
          Welcome to <span className="text-white font-semibold">Skillwrap</span>.
          By accessing or using our platform, you agree to these Terms of Service.
        </p>

        <section className="space-y-8 text-gray-300">
          <Block title="1. About Skillwrap">
            Skillwrap is a platform that enables users to learn, teach, and
            exchange skills. It also provides AI-powered roadmaps, skill
            recommendations, and communication tools to enhance collaboration.
          </Block>

          <Block title="2. Eligibility">
            You must be at least 13 years old to use Skillwrap. By using the
            platform, you confirm that the information you provide is accurate
            and truthful.
          </Block>

          <Block title="3. User Accounts">
            You are responsible for maintaining the confidentiality of your
            account credentials. Any activity performed under your account is
            your responsibility.
          </Block>

          <Block title="4. Skill Exchange & Learning">
            Skillwrap does not guarantee the quality, accuracy, or outcomes of
            skills exchanged between users. All learning, teaching, and
            collaboration occur at your own discretion.
          </Block>

          <Block title="5. AI Features Disclaimer">
            AI-generated roadmaps, recommendations, and suggestions are provided
            for guidance only. They do not replace professional, educational, or
            career advice.
          </Block>

          <Block title="6. User Conduct">
            You agree not to:
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Harass, abuse, or harm other users</li>
              <li>Upload false, misleading, or offensive content</li>
              <li>Use Skillwrap for illegal activities</li>
              <li>Attempt to exploit or disrupt the platform</li>
            </ul>
          </Block>

          <Block title="7. Messages & Communication">
            Messages exchanged on Skillwrap should remain respectful and lawful.
            We reserve the right to take action against misuse or abuse of the
            messaging system.
          </Block>

          <Block title="8. Content Ownership">
            You retain ownership of the content you upload. By using Skillwrap,
            you grant us permission to display your content solely for platform
            functionality.
          </Block>

          <Block title="9. Account Suspension & Termination">
            We reserve the right to suspend or terminate accounts that violate
            these terms, without prior notice if necessary.
          </Block>

          <Block title="10. Limitation of Liability">
            Skillwrap is provided “as is.” We are not liable for losses,
            disputes, or damages arising from skill exchanges or AI-generated
            suggestions.
          </Block>

          <Block title="11. Changes to These Terms">
            We may update these Terms of Service at any time. Continued use of
            Skillwrap after updates constitutes acceptance of the revised terms.
          </Block>

          <Block title="12. Contact">
            If you have questions about these terms, please contact us through
            the Skillwrap platform.
          </Block>
        </section>

        <p className="text-sm text-gray-400 text-center pt-10">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </main>
  );
}

/* ================= BLOCK COMPONENT ================= */
function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-cyan-300 mb-2">
        {title}
      </h2>
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

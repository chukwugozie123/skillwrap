"use client";

import { motion } from "framer-motion";
import React from "react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent"
        >
          Privacy Policy
        </motion.h1>

        <p className="text-center text-gray-400 mb-10">
          Your privacy matters to us. This policy explains how Skillwrap
          collects, uses, and protects your data.
        </p>

        {/* CARD */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 space-y-8">
          <Section title="Information We Collect">
            We collect information you provide when using Skillwrap, including
            your full name, username, email address, profile image, skills,
            learning goals, messages, and interaction data.
          </Section>

          <Section title="AI & Smart Features">
            Skillwrap uses AI to generate personalized learning roadmaps,
            recommend skill matches, and improve user experience. AI-generated
            results are advisory and should not be considered professional or
            certified guidance.
          </Section>

          <Section title="How We Use Your Data">
            Your data is used to:
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
              <li>Create and manage your account</li>
              <li>Enable skill learning, teaching, and exchange</li>
              <li>Generate AI-powered roadmaps and suggestions</li>
              <li>Facilitate chats, notifications, and requests</li>
              <li>Improve platform security and performance</li>
            </ul>
          </Section>

          <Section title="Messages & Communication">
            Messages exchanged on Skillwrap are stored securely to support
            communication between users. We do not read or sell your messages.
          </Section>

          <Section title="Cookies & Sessions">
            Skillwrap uses cookies and session storage to maintain authentication,
            remember preferences, and enhance platform usability. Disabling
            cookies may affect functionality.
          </Section>

          <Section title="Data Storage & Security">
            We apply industry-standard security measures to protect your data,
            including encryption, access controls, and secure servers. However,
            no system is 100% secure.
          </Section>

          <Section title="Third-Party Services">
            We may use trusted third-party services for hosting, analytics, and
            AI functionality. These services only access data necessary to
            perform their roles and comply with data protection standards.
          </Section>

          <Section title="Your Rights">
            You have the right to:
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
              <li>Access your personal data</li>
              <li>Update or correct your information</li>
              <li>Request deletion of your account and data</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </Section>

          <Section title="Data Retention">
            We retain your data only for as long as necessary to provide
            Skillwrap services or as required by law. Deleted accounts have
            their data permanently removed after a short retention period.
          </Section>

          <Section title="Changes to This Policy">
            Skillwrap may update this Privacy Policy from time to time. Any
            changes will be reflected on this page with an updated date.
          </Section>

          <p className="text-sm text-gray-400 text-center pt-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= SECTION COMPONENT ================= */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-indigo-300 mb-2">
        {title}
      </h2>
      <div className="text-gray-300 leading-relaxed">{children}</div>
    </div>
  );
}

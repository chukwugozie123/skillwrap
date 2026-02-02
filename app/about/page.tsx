
// "use client"

// import React from "react";
// import { useRouter } from "next/navigation";

// export default function SkillWarpAboutUs() {
//   const router = useRouter();

//   return (
//     <main className="min-h-screen w-full bg-gradient-to-b from-[#030b18] via-[#06152d] to-[#02060f] text-white font-['Josefin_Sans'] p-6 md:p-10 overflow-y-auto relative">
//       {/* 🔙 GO BACK BUTTON */}
//       <div className="flex items-center mb-6">
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 px-4 py-2 rounded-xl 
//           bg-white/10 border border-white/20 backdrop-blur-md
//           text-sm font-medium hover:bg-white/20 hover:scale-105 
//           transition-all duration-300"
//         >
//           ← Go Back
//         </button>
//       </div>

//       {/* Glow Backgrounds */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] rounded-full bg-blue-800/30 blur-[180px]"></div>
//         <div className="absolute bottom-[-250px] right-[-200px] w-[600px] h-[600px] rounded-full bg-purple-800/25 blur-[220px]"></div>
//       </div>

//       {/* Main Card */}
//       <div className="relative z-10 max-w-4xl mx-auto backdrop-blur-2xl bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.45)]">
        
//         {/* Header */}
//         <h1 className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-xl mb-6">
//           About SkillWarp
//         </h1>

//         <p className="text-center text-gray-300 text-lg md:text-xl leading-relaxed mb-12">
//           SkillWarp is a <strong>community-powered skill exchange platform</strong> built to break learning barriers
//           and unlock human potential through collaboration.
//           <span className="text-blue-300 block mt-3">
//             Learn together. Teach freely. Grow endlessly.
//           </span>
//         </p>

//         {/* Who We Are */}
//         <section className="mb-14">
//           <h2 className="text-3xl font-semibold text-blue-300 mb-4">Who We Are</h2>
//           <p className="text-gray-300 leading-relaxed">
//             SkillWarp was created with one clear belief: <strong>everyone has something valuable to teach</strong>.
//             We are building a digital space where knowledge is not locked behind paywalls or certificates,
//             but shared through real human interaction.
//           </p>
//           <p className="text-gray-300 leading-relaxed mt-4">
//             Whether you are a student, creator, professional, or hobbyist, SkillWarp gives you the tools
//             to connect with people who complement your goals. No classrooms. No pressure. Just skills in motion.
//           </p>
//         </section>

//         {/* Our Mission */}
//         <section className="mb-14">
//           <h2 className="text-3xl font-semibold text-purple-300 mb-4">Our Mission</h2>
//           <p className="text-gray-300 leading-relaxed">
//             Our mission is to make learning <strong>accessible, social, and practical</strong>.
//             We aim to empower individuals by turning everyday knowledge into meaningful exchanges that
//             build confidence, careers, and communities.
//           </p>

//           <div className="grid md:grid-cols-3 gap-4 mt-6">
//             <div className="bg-white/10 p-5 border border-white/10 rounded-xl">
//               <h3 className="text-xl text-blue-300 font-semibold mb-2">Empower</h3>
//               <p className="text-gray-300 text-sm">Help people realize the value of what they already know.</p>
//             </div>
//             <div className="bg-white/10 p-5 border border-white/10 rounded-xl">
//               <h3 className="text-xl text-purple-300 font-semibold mb-2">Connect</h3>
//               <p className="text-gray-300 text-sm">Bridge gaps between learners and teachers worldwide.</p>
//             </div>
//             <div className="bg-white/10 p-5 border border-white/10 rounded-xl">
//               <h3 className="text-xl text-green-300 font-semibold mb-2">Grow</h3>
//               <p className="text-gray-300 text-sm">Encourage continuous learning through collaboration.</p>
//             </div>
//           </div>
//         </section>

//         {/* How SkillWarp Works */}
//         <section className="mb-14">
//           <h2 className="text-3xl font-semibold text-blue-300 mb-4">How SkillWarp Works</h2>
//           <p className="text-gray-300 leading-relaxed mb-4">
//             SkillWarp runs on mutual value. You offer a skill, request another, and connect through a secure
//             and focused chat environment designed for learning.
//           </p>

//           <ol className="list-decimal list-inside space-y-4 text-gray-300">
//             <li><strong>Create your profile:</strong> Tell the community who you are and what you can offer.</li>
//             <li><strong>Showcase your skills:</strong> Add skills you are confident teaching or guiding.</li>
//             <li><strong>Request an exchange:</strong> Reach out to others whose skills you want to learn.</li>
//             <li><strong>Connect in real-time:</strong> Chat, collaborate, and share knowledge directly.</li>
//             <li><strong>Grow together:</strong> Learn by teaching, and teach by learning.</li>
//           </ol>
//         </section>

//         {/* Community Values */}
//         <section className="mb-14">
//           <h2 className="text-3xl font-semibold text-green-300 mb-4">Our Community Values</h2>
//           <ul className="space-y-4 text-gray-300">
//             <li className="bg-white/10 p-4 rounded-xl border border-white/10">Respect — Every skill and learner matters.</li>
//             <li className="bg-white/10 p-4 rounded-xl border border-white/10">Honesty — Be clear about what you can offer.</li>
//             <li className="bg-white/10 p-4 rounded-xl border border-white/10">Collaboration — Growth happens together.</li>
//             <li className="bg-white/10 p-4 rounded-xl border border-white/10">Consistency — Show up and add value.</li>
//           </ul>
//         </section>

//         {/* What to Avoid */}
//         <section className="mb-14">
//           <h2 className="text-3xl font-semibold text-red-400 mb-4">What We Stand Against</h2>
//           <ul className="space-y-4 text-gray-300">
//             <li className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">Fake skills or misleading profiles.</li>
//             <li className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">Spam requests or abusive behavior.</li>
//             <li className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">Sharing private or sensitive information.</li>
//           </ul>
//         </section>

//         {/* Final CTA */}
//         <section className="text-center">
//           <h2 className="text-4xl font-bold text-blue-400 mb-3">Be Part of the SkillWarp Movement</h2>
//           <p className="text-gray-300 text-lg mb-6">
//             SkillWarp is more than a platform — it&apos;s a growing ecosystem of learners, teachers, and creators.
//             Your skills matter. Your growth matters.
//           </p>
//           <a
//             href="/signup"
//             className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold shadow-lg"
//           >
//             Join SkillWarp Today
//           </a>
//         </section>
//       </div>
//     </main>
//   );
// }
















"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Brain,
  Users,
  MessageCircle,
  Compass,
  ShieldCheck,
  Rocket,
} from "lucide-react";

export default function SkillWarpAboutUs() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#030b18] via-[#06152d] to-[#02060f] text-white font-['Josefin_Sans'] p-6 md:p-10 overflow-y-auto relative">

      {/* GO BACK */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 
          hover:bg-white/20 hover:scale-105 transition"
        >
          ← Go Back
        </button>
      </div>

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-blue-800/30 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-250px] right-[-200px] w-[600px] h-[600px] bg-purple-800/25 rounded-full blur-[220px]" />
      </div>

      {/* Card */}
      <div className="relative z-10 max-w-5xl mx-auto backdrop-blur-2xl bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">

        {/* HEADER */}
        <h1 className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
          About SkillWarp
        </h1>

        <p className="text-center text-gray-300 text-lg md:text-xl mb-14">
          SkillWarp is a <strong>community-powered skill exchange platform</strong> designed
          to make learning practical, social, and accessible.
          <span className="block text-blue-300 mt-2">
            Learn together. Teach freely. Grow endlessly.
          </span>
        </p>

        {/* VIDEO */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-purple-300 mb-4 text-center">
            🎥 See SkillWarp in Action
          </h2>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-xl">
            <iframe
              src="https://www.youtube.com/embed/SBkUxjMEsp0"
              title="SkillWarp Overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <p className="text-gray-400 text-center mt-4 text-sm">
            A walkthrough of how SkillWarp combines community learning with smart guidance.
          </p>
        </section>

        {/* WHO WE ARE */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">
            Who We Are
          </h2>

          <p className="text-gray-300 leading-relaxed">
            SkillWarp was built on a simple belief:
            <strong> everyone has something valuable to teach</strong>.
            Learning should not be locked behind money, certificates, or rigid classrooms.
          </p>

          <p className="text-gray-300 mt-4 leading-relaxed">
            We are creating a digital space where people exchange skills directly —
            powered by trust, guided by smart systems, and strengthened by community.
          </p>
        </section>

        {/* CORE FEATURES */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-green-300 mb-6">
            Core Features
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white/10 p-6 rounded-xl border border-white/10">
              <Users className="text-blue-400 mb-2" />
              <h3 className="font-semibold text-lg mb-2">Skill Exchange</h3>
              <p className="text-gray-300 text-sm">
                Offer a skill you know and request one you want.
                No money — just mutual value.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-xl border border-white/10">
              <MessageCircle className="text-green-400 mb-2" />
              <h3 className="font-semibold text-lg mb-2">Private Skill Chats</h3>
              <p className="text-gray-300 text-sm">
                Learn in focused one-on-one or small group chat rooms
                built specifically for collaboration.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-xl border border-white/10">
              <Compass className="text-purple-400 mb-2" />
              <h3 className="font-semibold text-lg mb-2">Skill Discovery</h3>
              <p className="text-gray-300 text-sm">
                Explore skills shared by the community and find
                people aligned with your learning goals.
              </p>
            </div>
          </div>
        </section>

        {/* AI SECTION */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
            <Brain /> AI Guidance (Supportive, Not Replacing Humans)
          </h2>

          <p className="text-gray-300 leading-relaxed mb-4">
            SkillWarp uses AI as a <strong>learning assistant</strong>.
            It does not replace teachers or mentors — instead,
            it helps users make better decisions and learn with clarity.
          </p>

          <p className="text-gray-300 leading-relaxed mb-6">
            The AI helps break complex skills into clear roadmaps,
            suggests starting levels, and reduces confusion for beginners.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 p-5 rounded-xl border border-white/10">
              <Sparkles className="text-purple-400 mb-2" />
              <h3 className="font-semibold text-lg">Skill Roadmaps</h3>
              <p className="text-gray-300 text-sm">
                Step-by-step guidance from beginner to advanced levels.
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-xl border border-white/10">
              <Rocket className="text-blue-400 mb-2" />
              <h3 className="font-semibold text-lg">Learning Direction</h3>
              <p className="text-gray-300 text-sm">
                Helps users decide what to learn next based on goals.
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-xl border border-white/10">
              <MessageCircle className="text-green-400 mb-2" />
              <h3 className="font-semibold text-lg">Future AI Chat Assist</h3>
              <p className="text-gray-300 text-sm">
                Smart suggestions to improve communication and clarity.
              </p>
            </div>
          </div>
        </section>

        {/* TRUST & SAFETY */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
            <ShieldCheck /> Trust & Community Standards
          </h2>

          <p className="text-gray-300 leading-relaxed">
            SkillWarp is built around respect, honesty, and accountability.
            Fake skills, spam, and abuse are actively discouraged to protect
            genuine learners.
          </p>
        </section>

        {/* WHO IT IS FOR */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-purple-300 mb-6">
            Who SkillWarp Is For
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-gray-300">
            <div className="bg-white/10 p-5 rounded-xl">🎓 Students & beginners</div>
            <div className="bg-white/10 p-5 rounded-xl">💻 Developers & creators</div>
            <div className="bg-white/10 p-5 rounded-xl">🧑‍🏫 Professionals & mentors</div>
            <div className="bg-white/10 p-5 rounded-xl">🚀 Lifelong learners</div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-4xl font-bold text-blue-400 mb-3">
            Join the SkillWarp Movement
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            SkillWarp is more than a platform — it’s a growing ecosystem
            where people learn faster by learning together.
          </p>
          <a
            href="/signup"
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-semibold shadow-xl"
          >
            Get Started
          </a>
        </section>

      </div>
    </main>
  );
}

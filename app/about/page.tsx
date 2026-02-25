"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Brain, Users, MessageCircle, Compass, ShieldCheck, Rocket } from "lucide-react";

export default function SkillWarpAboutUs() {
  const router = useRouter();

  const teamMembers = [
    {
      name: "Jane Doe",
      role: "CEO & Founder",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "John Smith",
      role: "CTO",
      img: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    {
      name: "Alice Johnson",
      role: "Community Manager",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Michael Lee",
      role: "Lead Developer",
      img: "https://randomuser.me/api/portraits/men/66.jpg",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#030b18] via-[#06152d] to-[#02060f] text-white font-['Josefin_Sans'] p-6 md:p-10 overflow-x-hidden relative">
      
      {/* BACK BUTTON */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:scale-105 transition-transform"
        >
          ← Go Back
        </button>
      </div>

      {/* HERO IMAGE */}
      <section className="relative mb-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-blue-800/30 rounded-full blur-[180px]" />
          <div className="absolute bottom-[-250px] right-[-200px] w-[600px] h-[600px] bg-purple-800/25 rounded-full blur-[220px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About SkillWarp
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl">
            A <strong>community-powered skill exchange platform</strong> where people learn together, teach freely, and grow endlessly.
          </p>
          <img
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=1200&q=80"
            alt="SkillWarp Community"
            className="rounded-3xl shadow-2xl mx-auto mt-6 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="mb-20 max-w-5xl mx-auto space-y-6">
        <h2 className="text-4xl font-bold text-purple-300 mb-4">Who We Are</h2>
        <p className="text-gray-300 leading-relaxed">
          SkillWarp is built on a simple belief: <strong>everyone has something valuable to teach</strong>. Learning should not be locked behind money, certificates, or rigid classrooms.
        </p>
        <p className="text-gray-300 leading-relaxed">
          We create a digital space where people exchange skills directly — powered by trust, guided by smart systems, and strengthened by community.
        </p>
      </section>

      {/* CORE FEATURES */}
      <section className="mb-20 max-w-6xl mx-auto space-y-8">
        <h2 className="text-4xl font-bold text-green-300 mb-6">Core Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Users className="text-blue-400 mb-2" />, title: "Skill Exchange", desc: "Offer a skill you know and request one you want. No money — just mutual value." },
            { icon: <MessageCircle className="text-green-400 mb-2" />, title: "Private Skill Chats", desc: "Learn in focused one-on-one or small group chat rooms built for collaboration." },
            { icon: <Compass className="text-purple-400 mb-2" />, title: "Skill Discovery", desc: "Explore skills shared by the community and find people aligned with your learning goals." },
          ].map((f, i) => (
            <div key={i} className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition-transform">
              {f.icon}
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-300 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI GUIDANCE */}
      <section className="mb-20 max-w-6xl mx-auto space-y-8">
        <h2 className="text-4xl font-bold text-purple-300 mb-6 flex items-center gap-3">
          <Brain /> AI Guidance (Supportive, Not Replacing Humans)
        </h2>
        <p className="text-gray-300 leading-relaxed">SkillWarp uses AI as a <strong>learning assistant</strong>. It guides users without replacing teachers, helping learners make better decisions.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Sparkles className="text-purple-400 mb-2" />, title: "Skill Roadmaps", desc: "Step-by-step guidance from beginner to advanced levels." },
            { icon: <Rocket className="text-blue-400 mb-2" />, title: "Learning Direction", desc: "Helps users decide what to learn next based on goals." },
            { icon: <MessageCircle className="text-green-400 mb-2" />, title: "Future AI Chat Assist", desc: "Smart suggestions to improve communication and clarity." },
          ].map((f, i) => (
            <div key={i} className="bg-white/10 p-5 rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition-transform">
              {f.icon}
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-gray-300 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="mb-20 max-w-6xl mx-auto space-y-12">
        <h2 className="text-4xl font-bold text-blue-300 mb-8 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white/5 p-4 rounded-2xl text-center hover:scale-105 transition-transform shadow-xl">
              <img src={member.img} alt={member.name} className="rounded-full w-32 h-32 mx-auto mb-4 object-cover border-2 border-white/20" />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST & SAFETY */}
      <section className="mb-20 max-w-5xl mx-auto space-y-4">
        <h2 className="text-4xl font-bold text-blue-300 mb-4 flex items-center gap-2"><ShieldCheck /> Trust & Community Standards</h2>
        <p className="text-gray-300 leading-relaxed">
          SkillWarp is built around respect, honesty, and accountability. Fake skills, spam, and abuse are actively discouraged to protect genuine learners.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center mb-20">
        <h2 className="text-5xl font-bold text-blue-400 mb-6">Join the SkillWarp Movement</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-lg">
          SkillWarp is more than a platform — it’s a growing ecosystem where people learn faster by learning together.
        </p>
        <a
          href="/signup"
          className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold shadow-xl hover:scale-105"
        >
          Get Started
        </a>
      </section>

    </main>
  );
}













// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import {
//   Sparkles,
//   Brain,
//   Users,
//   MessageCircle,
//   Compass,
//   ShieldCheck,
//   Rocket,
// } from "lucide-react";

// export default function SkillWarpAboutUs() {
//   const router = useRouter();

//   return (
//     <main className="min-h-screen w-full bg-gradient-to-b from-[#030b18] via-[#06152d] to-[#02060f] text-white font-['Josefin_Sans'] p-6 md:p-10 overflow-y-auto relative">

//       {/* GO BACK */}
//       <div className="flex items-center mb-6">
//         <button
//           onClick={() => router.back()}
//           className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 
//           hover:bg-white/20 hover:scale-105 transition"
//         >
//           ← Go Back
//         </button>
//       </div>

//       {/* Glow */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-blue-800/30 rounded-full blur-[180px]" />
//         <div className="absolute bottom-[-250px] right-[-200px] w-[600px] h-[600px] bg-purple-800/25 rounded-full blur-[220px]" />
//       </div>

//       {/* Card */}
//       <div className="relative z-10 max-w-5xl mx-auto backdrop-blur-2xl bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">

//         {/* HEADER */}
//         <h1 className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
//           About SkillWarp
//         </h1>

//         <p className="text-center text-gray-300 text-lg md:text-xl mb-14">
//           SkillWarp is a <strong>community-powered skill exchange platform</strong> designed
//           to make learning practical, social, and accessible.
//           <span className="block text-blue-300 mt-2">
//             Learn together. Teach freely. Grow endlessly.
//           </span>
//         </p>

//         {/* VIDEO */}
//         <section className="mb-20">
//           <h2 className="text-3xl font-semibold text-purple-300 mb-4 text-center">
//             🎥 See SkillWarp in Action
//           </h2>

//           <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-xl">
//             <iframe
//               src="https://www.youtube.com/embed/SBkUxjMEsp0"
//               title="SkillWarp Overview"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               className="absolute inset-0 w-full h-full"
//             />
//           </div>

//           <p className="text-gray-400 text-center mt-4 text-sm">
//             A walkthrough of how SkillWarp combines community learning with smart guidance.
//           </p>
//         </section>

//         {/* WHO WE ARE */}
//         <section className="mb-20">
//           <h2 className="text-3xl font-semibold text-blue-300 mb-4">
//             Who We Are
//           </h2>

//           <p className="text-gray-300 leading-relaxed">
//             SkillWarp was built on a simple belief:
//             <strong> everyone has something valuable to teach</strong>.
//             Learning should not be locked behind money, certificates, or rigid classrooms.
//           </p>

//           <p className="text-gray-300 mt-4 leading-relaxed">
//             We are creating a digital space where people exchange skills directly —
//             powered by trust, guided by smart systems, and strengthened by community.
//           </p>
//         </section>

//         {/* CORE FEATURES */}
//         <section className="mb-20">
//           <h2 className="text-3xl font-semibold text-green-300 mb-6">
//             Core Features
//           </h2>

//           <div className="grid md:grid-cols-3 gap-5">
//             <div className="bg-white/10 p-6 rounded-xl border border-white/10">
//               <Users className="text-blue-400 mb-2" />
//               <h3 className="font-semibold text-lg mb-2">Skill Exchange</h3>
//               <p className="text-gray-300 text-sm">
//                 Offer a skill you know and request one you want.
//                 No money — just mutual value.
//               </p>
//             </div>

//             <div className="bg-white/10 p-6 rounded-xl border border-white/10">
//               <MessageCircle className="text-green-400 mb-2" />
//               <h3 className="font-semibold text-lg mb-2">Private Skill Chats</h3>
//               <p className="text-gray-300 text-sm">
//                 Learn in focused one-on-one or small group chat rooms
//                 built specifically for collaboration.
//               </p>
//             </div>

//             <div className="bg-white/10 p-6 rounded-xl border border-white/10">
//               <Compass className="text-purple-400 mb-2" />
//               <h3 className="font-semibold text-lg mb-2">Skill Discovery</h3>
//               <p className="text-gray-300 text-sm">
//                 Explore skills shared by the community and find
//                 people aligned with your learning goals.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* AI SECTION */}
//         <section className="mb-20">
//           <h2 className="text-3xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
//             <Brain /> AI Guidance (Supportive, Not Replacing Humans)
//           </h2>

//           <p className="text-gray-300 leading-relaxed mb-4">
//             SkillWarp uses AI as a <strong>learning assistant</strong>.
//             It does not replace teachers or mentors — instead,
//             it helps users make better decisions and learn with clarity.
//           </p>

//           <p className="text-gray-300 leading-relaxed mb-6">
//             The AI helps break complex skills into clear roadmaps,
//             suggests starting levels, and reduces confusion for beginners.
//           </p>

//           <div className="grid md:grid-cols-3 gap-4">
//             <div className="bg-white/10 p-5 rounded-xl border border-white/10">
//               <Sparkles className="text-purple-400 mb-2" />
//               <h3 className="font-semibold text-lg">Skill Roadmaps</h3>
//               <p className="text-gray-300 text-sm">
//                 Step-by-step guidance from beginner to advanced levels.
//               </p>
//             </div>

//             <div className="bg-white/10 p-5 rounded-xl border border-white/10">
//               <Rocket className="text-blue-400 mb-2" />
//               <h3 className="font-semibold text-lg">Learning Direction</h3>
//               <p className="text-gray-300 text-sm">
//                 Helps users decide what to learn next based on goals.
//               </p>
//             </div>

//             <div className="bg-white/10 p-5 rounded-xl border border-white/10">
//               <MessageCircle className="text-green-400 mb-2" />
//               <h3 className="font-semibold text-lg">Future AI Chat Assist</h3>
//               <p className="text-gray-300 text-sm">
//                 Smart suggestions to improve communication and clarity.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* TRUST & SAFETY */}
//         <section className="mb-20">
//           <h2 className="text-3xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
//             <ShieldCheck /> Trust & Community Standards
//           </h2>

//           <p className="text-gray-300 leading-relaxed">
//             SkillWarp is built around respect, honesty, and accountability.
//             Fake skills, spam, and abuse are actively discouraged to protect
//             genuine learners.
//           </p>
//         </section>

//         {/* WHO IT IS FOR */}
//         <section className="mb-20">
//           <h2 className="text-3xl font-semibold text-purple-300 mb-6">
//             Who SkillWarp Is For
//           </h2>

//           <div className="grid md:grid-cols-2 gap-4 text-gray-300">
//             <div className="bg-white/10 p-5 rounded-xl">🎓 Students & beginners</div>
//             <div className="bg-white/10 p-5 rounded-xl">💻 Developers & creators</div>
//             <div className="bg-white/10 p-5 rounded-xl">🧑‍🏫 Professionals & mentors</div>
//             <div className="bg-white/10 p-5 rounded-xl">🚀 Lifelong learners</div>
//           </div>
//         </section>

//         {/* CTA */}
//         <section className="text-center">
//           <h2 className="text-4xl font-bold text-blue-400 mb-3">
//             Join the SkillWarp Movement
//           </h2>
//           <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
//             SkillWarp is more than a platform — it’s a growing ecosystem
//             where people learn faster by learning together.
//           </p>
//           <a
//             href="/signup"
//             className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-semibold shadow-xl"
//           >
//             Get Started
//           </a>
//         </section>

//       </div>
//     </main>
//   );
// }

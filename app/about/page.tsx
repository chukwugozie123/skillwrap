// "use client"

// import React from "react";
// import { useRouter } from "next/navigation";

// export default function SkillWarpDocs() {
//   const router = useRouter()
//   return (
//     <main className="min-h-screen w-full bg-gradient-to-b from-[#030b18] via-[#06152d] to-[#02060f] text-white font-['Josefin_Sans'] p-6 md:p-10 overflow-y-auto relative">
//             {/* 🔙 GO BACK BUTTON */}
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
//           SkillWarp Documentation
//         </h1>

//         <p className="text-center text-gray-300 text-lg md:text-xl leading-relaxed mb-12">
//           SkillWarp is the <strong>next-generation skill exchange platform</strong> — where learning, teaching, and connecting
//           feel effortless, fast, and exciting.  
//           <span className="text-blue-300 block mt-2">
//             One place. Infinite skills. Zero barriers.
//           </span>
//         </p>

//         {/* What is SkillWarp */}
//         <section className="mb-14">
//           <h2 className="text-3xl font-semibold text-blue-300 mb-4">
//             What is SkillWarp?
//           </h2>
//           <p className="text-gray-300 leading-relaxed">
//             SkillWarp is a social learning platform where users can <strong>offer their skills</strong>, 
//             <strong>request skills</strong>, and <strong>connect instantly</strong> with others who can help them grow.
//             Whether it&apos;s coding, cooking, writing, editing, fitness training, design, or 
//             anything unique — SkillWarp lets you turn your knowledge into value.
//           </p>

//           <div className="grid md:grid-cols-3 gap-4 mt-6">
//             <div className="bg-white/10 p-5 border border-white/10 rounded-xl">
//               <h3 className="text-xl text-blue-300 font-semibold mb-2">Teach</h3>
//               <p className="text-gray-300 text-sm">Share what you know and help others level up.</p>
//             </div>
//             <div className="bg-white/10 p-5 border border-white/10 rounded-xl">
//               <h3 className="text-xl text-purple-300 font-semibold mb-2">Learn</h3>
//               <p className="text-gray-300 text-sm">Discover new skills from real people, instantly.</p>
//             </div>
//             <div className="bg-white/10 p-5 border border-white/10 rounded-xl">
//               <h3 className="text-xl text-green-300 font-semibold mb-2">Connect</h3>
//               <p className="text-gray-300 text-sm">Chat, collaborate, and grow with the SkillWarp community.</p>
//             </div>
//           </div>
//         </section>

//         {/* Getting Started */}
//         <section className="mb-14">
//           <h2 className="text-3xl font-semibold text-blue-300 mb-4">Getting Started</h2>
//           <ul className="space-y-5 text-gray-300">
//             <li className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-all">
//               <span className="font-semibold text-white">1. Create an Account:</span>{" "}
//               Sign up or log in to unlock all features.
//             </li>
//             <li className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-all">
//               <span className="font-semibold text-white">2. Set Up Your Profile:</span>{" "}
//               Add your image, username, bio, and skills you offer.
//             </li>
//             <li className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-all">
//               <span className="font-semibold text-white">3. Create Your Skills:</span>{" "}
//               Add any skill you want to teach or showcase.
//             </li>
//             <li className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-all">
//               <span className="font-semibold text-white">4. Explore & Request:</span>{" "}
//               Browse other skills and request an exchange with confidence.
//             </li>
//           </ul>
//         </section>

//         {/* Skill Exchange Step-by-Step */}
//         <section className="mb-14">
//           <h2 className="text-3xl font-semibold text-blue-300 mb-4">How to Exchange Skills Step-by-Step</h2>
//           <p className="text-gray-300 leading-relaxed mb-4">
//             Skill exchanges are simple and seamless. Follow these steps for a smooth experience:
//           </p>

//           <ol className="list-decimal list-inside space-y-4 text-gray-300">
//             <li>
//               <strong>Request an Exchange:</strong> 
//               Browse skills you want to learn and click <em>&quot;Exchange&quot;</em> to send a request.  
//               The other user receives a notification instantly.
//             </li>
//             <li>
//               <strong>Get Accepted & Copy Room Code:</strong> 
//               Once the other user accepts your request, you&apos;ll get a unique room code.  
//               Copy this code to enter the chat room.
//             </li>
//             <li>
//               <strong>Enter the Chat Room:</strong> 
//               Paste the room code in the chat entry box and join your private exchange space.  
//               Here, you can start interacting safely and effectively.
//             </li>
//             <li>
//               <strong>Set Time or Duration:</strong> 
//               Coordinate with the other user on how long the exchange session will last.  
//               You can use built-in timers or agree on milestones.
//             </li>
//             <li>
//               <strong>Exchange Skills:</strong> 
//               Teach, learn, share tips, ask questions, and make the session as productive as possible.  
//               Remember, collaboration is key.
//             </li>
//             <li>
//               <strong>Leave a Review:</strong> 
//               After a successful exchange, leave feedback.  
//               Reviews help the community grow and maintain trust.  
//               Be honest, polite, and constructive.
//             </li>
//           </ol>

//           <p className="text-gray-400 mt-4">
//             💡 <strong>Pro Tip:</strong> Keep your profile up-to-date and respond to requests promptly for a better exchange experience.
//           </p>
//         </section>

//         {/* Where to go */}
//         <section className="mb-14">
//           <h2 className="text-3xl font-semibold text-blue-300 mb-4">Where to Go</h2>
//           <ul className="space-y-4 text-gray-300">
//             <li className="bg-white/10 p-4 rounded-xl border border-white/10">Dashboard — See your activities & updates.</li>
//             <li className="bg-white/10 p-4 rounded-xl border border-white/10">Create Skill — Showcase what you offer.</li>
//             <li className="bg-white/10 p-4 rounded-xl border border-white/10">Browse Skills — Discover what others can teach.</li>
//             <li className="bg-white/10 p-4 rounded-xl border border-white/10">Requests — Accept or decline exchanges.</li>
//             <li className="bg-white/10 p-4 rounded-xl border border-white/10">Chat — Communicate with your matches.</li>
//           </ul>
//         </section>

//         {/* What not to do */}
//         <section className="mb-14">
//           <h2 className="text-3xl font-semibold text-red-400 mb-4">Where NOT to Go</h2>
//           <ul className="space-y-4 text-gray-300">
//             <li className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">Don&apos;t share sensitive private information.</li>
//             <li className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">Don&apos;t create fake or joke skills.</li>
//             <li className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">Don&apos;t send repeated spam requests.</li>
//             <li className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">Some backend routes are protected — frontend handles everything.</li>
//           </ul>
//         </section>

//         {/* Final CTA */}
//         <section className="text-center">
//           <h2 className="text-4xl font-bold text-blue-400 mb-3">
//             Ready to Unlock New Skills?
//           </h2>
//           <p className="text-gray-300 text-lg mb-6">
//             Join thousands of learners and creators on SkillWarp today.
//           </p>
//           <a
//             href="/signup"
//             className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold shadow-lg"
//           >
//             Get Started Now
//           </a>
//         </section>

//       </div>
//     </main>
//   );
// }

"use client"

import React from "react";
import { useRouter } from "next/navigation";

export default function SkillWarpAboutUs() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#030b18] via-[#06152d] to-[#02060f] text-white font-['Josefin_Sans'] p-6 md:p-10 overflow-y-auto relative">
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

      {/* Glow Backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] rounded-full bg-blue-800/30 blur-[180px]"></div>
        <div className="absolute bottom-[-250px] right-[-200px] w-[600px] h-[600px] rounded-full bg-purple-800/25 blur-[220px]"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 max-w-4xl mx-auto backdrop-blur-2xl bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.45)]">
        
        {/* Header */}
        <h1 className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-xl mb-6">
          About SkillWarp
        </h1>

        <p className="text-center text-gray-300 text-lg md:text-xl leading-relaxed mb-12">
          SkillWarp is a <strong>community-powered skill exchange platform</strong> built to break learning barriers
          and unlock human potential through collaboration.
          <span className="text-blue-300 block mt-3">
            Learn together. Teach freely. Grow endlessly.
          </span>
        </p>

        {/* Who We Are */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Who We Are</h2>
          <p className="text-gray-300 leading-relaxed">
            SkillWarp was created with one clear belief: <strong>everyone has something valuable to teach</strong>.
            We are building a digital space where knowledge is not locked behind paywalls or certificates,
            but shared through real human interaction.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            Whether you are a student, creator, professional, or hobbyist, SkillWarp gives you the tools
            to connect with people who complement your goals. No classrooms. No pressure. Just skills in motion.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-purple-300 mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            Our mission is to make learning <strong>accessible, social, and practical</strong>.
            We aim to empower individuals by turning everyday knowledge into meaningful exchanges that
            build confidence, careers, and communities.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 p-5 border border-white/10 rounded-xl">
              <h3 className="text-xl text-blue-300 font-semibold mb-2">Empower</h3>
              <p className="text-gray-300 text-sm">Help people realize the value of what they already know.</p>
            </div>
            <div className="bg-white/10 p-5 border border-white/10 rounded-xl">
              <h3 className="text-xl text-purple-300 font-semibold mb-2">Connect</h3>
              <p className="text-gray-300 text-sm">Bridge gaps between learners and teachers worldwide.</p>
            </div>
            <div className="bg-white/10 p-5 border border-white/10 rounded-xl">
              <h3 className="text-xl text-green-300 font-semibold mb-2">Grow</h3>
              <p className="text-gray-300 text-sm">Encourage continuous learning through collaboration.</p>
            </div>
          </div>
        </section>

        {/* How SkillWarp Works */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">How SkillWarp Works</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            SkillWarp runs on mutual value. You offer a skill, request another, and connect through a secure
            and focused chat environment designed for learning.
          </p>

          <ol className="list-decimal list-inside space-y-4 text-gray-300">
            <li><strong>Create your profile:</strong> Tell the community who you are and what you can offer.</li>
            <li><strong>Showcase your skills:</strong> Add skills you are confident teaching or guiding.</li>
            <li><strong>Request an exchange:</strong> Reach out to others whose skills you want to learn.</li>
            <li><strong>Connect in real-time:</strong> Chat, collaborate, and share knowledge directly.</li>
            <li><strong>Grow together:</strong> Learn by teaching, and teach by learning.</li>
          </ol>
        </section>

        {/* Community Values */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-green-300 mb-4">Our Community Values</h2>
          <ul className="space-y-4 text-gray-300">
            <li className="bg-white/10 p-4 rounded-xl border border-white/10">Respect — Every skill and learner matters.</li>
            <li className="bg-white/10 p-4 rounded-xl border border-white/10">Honesty — Be clear about what you can offer.</li>
            <li className="bg-white/10 p-4 rounded-xl border border-white/10">Collaboration — Growth happens together.</li>
            <li className="bg-white/10 p-4 rounded-xl border border-white/10">Consistency — Show up and add value.</li>
          </ul>
        </section>

        {/* What to Avoid */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-red-400 mb-4">What We Stand Against</h2>
          <ul className="space-y-4 text-gray-300">
            <li className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">Fake skills or misleading profiles.</li>
            <li className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">Spam requests or abusive behavior.</li>
            <li className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">Sharing private or sensitive information.</li>
          </ul>
        </section>

        {/* Final CTA */}
        <section className="text-center">
          <h2 className="text-4xl font-bold text-blue-400 mb-3">Be Part of the SkillWarp Movement</h2>
          <p className="text-gray-300 text-lg mb-6">
            SkillWarp is more than a platform — it&apos;s a growing ecosystem of learners, teachers, and creators.
            Your skills matter. Your growth matters.
          </p>
          <a
            href="/signup"
            className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold shadow-lg"
          >
            Join SkillWarp Today
          </a>
        </section>
      </div>
    </main>
  );
}

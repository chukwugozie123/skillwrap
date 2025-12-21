import React from "react";

export default function SkillWarpDocs() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#030b18] via-[#06152d] to-[#02060f] text-white font-['Josefin_Sans'] p-6 md:p-10 overflow-y-auto relative">
      {/* Glow Backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] rounded-full bg-blue-800/30 blur-[180px]"></div>
        <div className="absolute bottom-[-250px] right-[-200px] w-[600px] h-[600px] rounded-full bg-purple-800/25 blur-[220px]"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 max-w-4xl mx-auto backdrop-blur-2xl bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.45)]">
        
        {/* Header */}
        <h1 className="text-5xl md:text-6xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-xl mb-6">
          SkillWarp Documentation
        </h1>

        <p className="text-center text-gray-300 text-lg md:text-xl leading-relaxed mb-12">
          SkillWarp is the **next-generation skill exchange platform** — where learning, teaching, and connecting
          feel effortless, fast, and exciting.  
          <span className="text-blue-300 block mt-2">
            One place. Infinite skills. Zero barriers.
          </span>
        </p>

        {/* What is SkillWarp */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">
            What is SkillWarp?
          </h2>
          <p className="text-gray-300 leading-relaxed">
            SkillWarp is a social learning platform where users can **offer their skills**, 
            **request skills**, and **connect instantly** with others who can help them grow.
            Whether it’s coding, cooking, writing, editing, fitness training, design, or 
            anything unique — SkillWarp lets you turn your knowledge into value.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 p-5 border border-white/10 rounded-xl">
              <h3 className="text-xl text-blue-300 font-semibold mb-2">Teach</h3>
              <p className="text-gray-300 text-sm">Share what you know and help others level up.</p>
            </div>
            <div className="bg-white/10 p-5 border border-white/10 rounded-xl">
              <h3 className="text-xl text-purple-300 font-semibold mb-2">Learn</h3>
              <p className="text-gray-300 text-sm">Discover new skills from real people, instantly.</p>
            </div>
            <div className="bg-white/10 p-5 border border-white/10 rounded-xl">
              <h3 className="text-xl text-green-300 font-semibold mb-2">Connect</h3>
              <p className="text-gray-300 text-sm">Chat, collaborate, and grow with the SkillWarp community.</p>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Getting Started</h2>
          <ul className="space-y-5 text-gray-300">
            <li className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-all">
              <span className="font-semibold text-white">1. Create an Account:</span>{" "}
              Sign up or log in to unlock all features.
            </li>
            <li className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-all">
              <span className="font-semibold text-white">2. Set Up Your Profile:</span>{" "}
              Add your image, username, bio, and skills you offer.
            </li>
            <li className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-all">
              <span className="font-semibold text-white">3. Create Your Skills:</span>{" "}
              Add any skill you want to teach or showcase.
            </li>
            <li className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-all">
              <span className="font-semibold text-white">4. Explore & Request:</span>{" "}
              Browse other skills and request an exchange.
            </li>
            <li className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-all">
              <span className="font-semibold text-white">5. Chat & Exchange:</span>{" "}
              Once accepted, a private chat opens automatically.
            </li>
          </ul>
        </section>

        {/* Where to go */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">Where to Go</h2>
          <ul className="space-y-4 text-gray-300">
            <li className="bg-white/10 p-4 rounded-xl border border-white/10">Dashboard — See your activities & updates.</li>
            <li className="bg-white/10 p-4 rounded-xl border border-white/10">Create Skill — Showcase what you offer.</li>
            <li className="bg-white/10 p-4 rounded-xl border border-white/10">Browse Skills — Discover what others can teach.</li>
            <li className="bg-white/10 p-4 rounded-xl border border-white/10">Requests — Accept or decline exchanges.</li>
            <li className="bg-white/10 p-4 rounded-xl border border-white/10">Chat — Communicate with your matches.</li>
          </ul>
        </section>

        {/* What not to do */}
        <section className="mb-14">
          <h2 className="text-3xl font-semibold text-red-400 mb-4">Where NOT to Go</h2>
          <ul className="space-y-4 text-gray-300">
            <li className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">Don't share sensitive private information.</li>
            <li className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">Don't create fake or joke skills.</li>
            <li className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">Don't send repeated spam requests.</li>
            <li className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">Some backend routes are protected — frontend handles everything.</li>
          </ul>
        </section>

        {/* Exchanges */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-blue-300 mb-4">How Exchanges Work</h2>
          <p className="text-gray-300 leading-relaxed">
            When you find a skill you want, click <strong>Exchange</strong>.  
            The user receives your request instantly.  
            If accepted:
          </p>

          <ul className="space-y-3 mt-4 text-gray-300">
            <li>✔ A private chat opens</li>
            <li>✔ You can begin teaching or learning immediately</li>
            <li>✔ Your dashboard updates in real-time</li>
            <li>✔ You can exchange multiple skills at once</li>
          </ul>
        </section>

        {/* Final CTA */}
        <section className="text-center">
          <h2 className="text-4xl font-bold text-blue-400 mb-3">
            Ready to Unlock New Skills?
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            Join thousands of learners and creators on SkillWarp.
          </p>
          <a
            href="/signup"
            className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold shadow-lg"
          >
            Get Started Now
          </a>
        </section>

      </div>
    </main>
  );
}

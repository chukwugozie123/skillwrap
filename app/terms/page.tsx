export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#05070c] via-[#0b1220] to-[#05070c] text-white px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10">
        <h1 className="text-4xl font-bold mb-6 text-cyan-400">
          Terms of Service
        </h1>

        <p className="text-gray-300 mb-6">
          Welcome to <span className="text-white font-semibold">Skillwrapp</span>.
          By accessing or using our platform, you agree to comply with the terms below.
        </p>

        <section className="space-y-6 text-gray-300">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              1. Use of Platform
            </h2>
            <p>
              Skillwrapp allows users to exchange skills and knowledge. You agree
              to use the platform respectfully and legally.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              2. User Responsibilities
            </h2>
            <p>
              You are responsible for the accuracy of information you provide
              and for maintaining the confidentiality of your account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              3. Prohibited Activities
            </h2>
            <p>
              Misuse, spam, harassment, or illegal activities are strictly
              prohibited and may result in account termination.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              4. Changes to Terms
            </h2>
            <p>
              We may update these terms at any time. Continued use of Skillwrapp
              means you accept the updated terms.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

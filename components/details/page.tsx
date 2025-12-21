import { Phone, Video } from "lucide-react";

export default function Detail() {
  return (
    <div className="p-6 flex flex-col items-center text-center h-full bg-white/5 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl">
      <div className="relative">
        <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 text-black flex items-center justify-center text-4xl font-bold">
          A
        </div>
        <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-green-400 border-2 border-[#203a43]" />
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Ada Lovelace</h2>
        <p className="text-gray-300 text-sm">Frontend Engineer</p>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition">
          <Phone className="w-5 h-5" />
        </button>
        <button className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition">
          <Video className="w-5 h-5" />
        </button>
      </div>

      <div className="w-full text-left mt-6 space-y-6">
        <div>
          <h3 className="font-semibold text-gray-200 mb-2">About</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Enthusiastic developer passionate about UI design, collaboration, and innovation 🌱
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-200 mb-2">Shared Skills</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>💻 React & Next.js</li>
            <li>🎨 Tailwind UI</li>
            <li>📱 Responsive Design</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

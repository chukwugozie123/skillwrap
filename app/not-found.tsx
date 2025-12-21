"use client";

import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen px-6 flex flex-col items-center justify-center text-white bg-gradient-to-br from-[#020617] via-[#0a1224] to-black relative">

      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <h1 className="text-8xl font-bold mb-4">404</h1>
      <p className="text-gray-300 text-lg mb-6">This page does not exist.</p>

      <div className="flex items-center gap-2 text-blue-300">
        <Loader className="animate-spin w-6 h-6" />
        <span>Redirecting to home in 3 seconds…</span>
      </div>
    </div>
  );
}

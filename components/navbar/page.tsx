"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, UserCircle2, Sparkles } from "lucide-react";

interface UserType {
  id: number;
  username: string;
  img_url?: string;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/events", label: "Events" },
];


// const API_URL = "https://skillwrap-backend.onrender.com";
  const API_URL = "http://localhost:4000";

  
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
  const fetchUser = async () => {
    try {

      const res = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.log("❌ User not authenticated");
        setUser(null);
        return;
      }

      const data = await res.json();

      const finalUser = data.user ?? data;
      
      setUser(finalUser);
    } catch (err) {
      console.log("❌ Failed to fetch user:", err);
      setUser(null);
    }
  };

  fetchUser();
}, []);


  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 pt-4">
        <div
          className={`max-w-7xl mx-auto rounded-2xl border border-white/10 backdrop-blur-xl bg-slate-900/70 transition-all duration-300 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <div className="flex items-center justify-between px-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>

              <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                SkillWrap
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

{/* Right */}
<div className="hidden md:flex items-center gap-3">
  {!user ? (
    <>
      <Link
        href="/login"
        className="px-4 py-2 rounded-lg border border-white/10 text-white/80 hover:text-white hover:bg-white/5 transition"
      >
        Sign In
      </Link>

      <Link
        href="/signup"
        className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold"
      >
        Sign Up
      </Link>
    </>
  ) : (
    <Link
      href="/profile"
      className="flex items-center gap-2 text-white"
    >
      {user.img_url ? (
        <img
          src={user.img_url}
          alt={user.username}
          className="h-8 w-8 rounded-full object-cover"
        />
      ) : (
        <UserCircle2 className="h-8 w-8 text-cyan-300" />
      )}

      <span className="text-white/90 font-medium">
        {user.username}
      </span>
    </Link>
  )}
</div>

            {/* Mobile Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden px-6 pb-5 pt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="w-full text-center py-2 rounded-lg border border-white/10 text-white"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="w-full text-center py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-white"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="h-28" />
    </>
  );
}
"use client";

import Link from "next/link";
import {
  Github,
  Twitter,
  Linkedin,
  Globe,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-slate-950 text-white overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* BRAND */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-3 w-fit group"
            >
              <div
                className="
                  w-11 h-11 rounded-2xl
                  flex items-center justify-center
                  bg-gradient-to-br from-cyan-400 to-purple-500
                  shadow-lg
                  transition duration-300
                  group-hover:scale-110
                  group-hover:rotate-12
                "
              >
                <Sparkles size={20} />
              </div>

              <h2
                className="
                  text-3xl font-black
                  bg-gradient-to-r
                  from-cyan-300
                  via-white
                  to-purple-400
                  bg-clip-text
                  text-transparent
                "
              >
                SkillWrap
              </h2>
            </Link>

            <p className="mt-5 text-sm text-gray-400 leading-7">
              Learn skills, connect with creators, join events,
              and grow together in one futuristic platform.
            </p>

            {/* SOCIALS */}
            <div className="flex gap-3 mt-6">
              <SocialIcon
                href="https://github.com"
                icon={<Github size={18} />}
              />

              <SocialIcon
                href="https://twitter.com"
                icon={<Twitter size={18} />}
              />

              <SocialIcon
                href="https://linkedin.com"
                icon={<Linkedin size={18} />}
              />

              <SocialIcon
                href="https://google.com"
                icon={<Globe size={18} />}
              />
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="text-cyan-300 font-semibold text-lg mb-5">
              Platform
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/skills" label="Skills" />
              <FooterLink href="/events" label="Events" />
              <FooterLink href="/community" label="Community" />
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-purple-300 font-semibold text-lg mb-5">
              Company
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <FooterLink href="/about" label="About" />
              <FooterLink href="/contact" label="Contact" />
              <FooterLink href="/privacy" label="Privacy" />
              <FooterLink href="/terms" label="Terms" />
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-cyan-300 font-semibold text-lg mb-5">
              Stay Updated
            </h3>

            <p className="text-sm text-gray-400 leading-7 mb-5">
              Get updates about new skills, creators,
              and upcoming events.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="
                flex items-center
                rounded-full
                overflow-hidden
                border border-white/10
                bg-white/5
              "
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  flex-1 bg-transparent
                  px-4 py-3
                  text-sm outline-none
                  placeholder:text-gray-500
                "
              />

              <button
                className="
                  px-5 py-3 text-sm font-semibold
                  bg-gradient-to-r
                  from-cyan-500
                  to-purple-500
                  hover:opacity-90
                  transition
                "
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="
            mt-14 pt-6
            border-t border-white/10
            flex flex-col md:flex-row
            items-center justify-between
            gap-4
          "
        >
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} SkillWrap.
            All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Built for creators</span>

            <Sparkles size={12} className="text-cyan-300" />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* FOOTER LINK */

function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="
        text-gray-400
        hover:text-white
        transition duration-300
      "
    >
      {label}
    </Link>
  );
}

/* SOCIAL ICON */

function SocialIcon({
  href,
  icon,
}: {
  href: string;
  icon: JSX.Element;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        w-11 h-11
        rounded-2xl
        border border-white/10
        bg-white/5
        flex items-center justify-center
        hover:bg-cyan-500/10
        hover:border-cyan-400/40
        hover:scale-110
        transition duration-300
      "
    >
      {icon}
    </a>
  );
}
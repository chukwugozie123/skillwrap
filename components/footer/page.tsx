"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Globe } from "lucide-react";

interface User {
  fullname: string;
  email: string;
  img_url?: string;
}

export default function Footer({ user }: { user?: User }) {
  return (
    <footer className="w-full bg-white/5 border-t border-white/10 backdrop-blur-xl text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            SkillWrap
          </h2>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            Empowering you to create, share, and grow your skills seamlessly.
            Track your progress, collaborate, and connect — all in one place.
          </p>

          <div className="flex gap-3 mt-4">
            <a
              href="https://github.com"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://skillwrap.com"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
          <h3 className="text-lg font-semibold text-blue-300 mb-3">
            Quick Links
          </h3>
          <div className="flex flex-col gap-2 text-gray-400 text-sm">
            <FooterLink href="/dashboard" label="Dashboard" />
            <FooterLink href="/profile" label="Profile" />
            <FooterLink href="/my-skill" label="My Skills" />
            <FooterLink href="/progress" label="Track Progress" />
            <FooterLink href="/settings" label="Settings" />
          </div>
        </motion.div>

        {/* Support Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col"
        >
          <h3 className="text-lg font-semibold text-blue-300 mb-3">
            Support
          </h3>
          <div className="flex flex-col gap-2 text-gray-400 text-sm">
            <FooterLink href="/help" label="Help Center" />
            <FooterLink href="/privacy" label="Privacy Policy" />
            <FooterLink href="/terms" label="Terms of Service" />
            <FooterLink href="/contact" label="Contact Us" />
          </div>
        </motion.div>

        {/* User Info or Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col"
        >
          {user ? (
            <>
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Logged in as
              </h3>
              <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-2xl p-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
                  <Image
                    src={user.img_url || "/default-avatar.png"}
                    alt={`${user.fullname} avatar`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{user.fullname}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Stay Updated
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Join our newsletter to get new updates and announcements.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center bg-white/10 rounded-full border border-white/10 overflow-hidden"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent px-3 py-2 text-sm outline-none text-white placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-80 transition text-sm font-medium">
                  Subscribe
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400 bg-white/5">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-blue-400 font-medium">SkillWrap</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* Reusable Footer Link */
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="hover:text-blue-400 transition-colors duration-200"
    >
      {label}
    </Link>
  );
}

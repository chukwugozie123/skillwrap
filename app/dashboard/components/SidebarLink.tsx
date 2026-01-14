"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export default function SidebarLink({
  href,
  label,
  icon,
  badge,
}: SidebarLinkProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 rounded-xl transition
        ${
          active
            ? "bg-blue-600/20 text-blue-300"
            : "text-gray-300 hover:bg-white/10"
        }`}
    >
      {icon}
      <span>{label}</span>

      {badge && badge > 0 && (
        <span className="ml-auto bg-red-500 text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </Link>
  );
}

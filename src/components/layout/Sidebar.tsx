"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavItem from "@/components/ui/NavItem";

const sidebarNavItems = [
  { label: "Dashboard", icon: "/icons/dash-home-icon.svg", href: "/" },
  { label: "Coolers", icon: "/icons/cooler-icon.svg", href: "/coolers" },
  { label: "Faculty", icon: "/icons/faculty-icon.svg", href: "/faculty" },
  { label: "Auditoriums", icon: "/icons/audi-icon.svg", href: "/auditoriums" },
  { label: "HealthRoom", icon: "/icons/health-room-icon.svg", href: "/health" },
  { label: "Library", icon: "/icons/library-icon.svg", href: "/library" },
  { label: "Play Grounds", icon: "/icons/playground-icon.svg", href: "/playgrounds" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[250px] min-h-screen bg-bg-white border-r border-divider flex flex-col shrink-0">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 px-8 py-6">
        <Image
          src="/icons/uni-sync-icon.svg"
          alt="UniSync"
          width={34}
          height={33}
        />
        <span className="text-[25px] font-bold text-brand-gradient">
          UniSync
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-[38px] px-8 pt-6">
        {sidebarNavItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
          />
        ))}
      </nav>
    </aside>
  );
}

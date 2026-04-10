"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavItem from "@/components/ui/NavItem";
import { mainNavItems, toolNavItems } from "@/lib/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[250px] min-h-screen bg-bg-white border-r border-divider hidden lg:flex flex-col shrink-0">
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

      {/* Main Navigation */}
      <nav className="flex flex-col gap-[38px] px-8 pt-6">
        {mainNavItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
          />
        ))}
      </nav>

      {/* Separator */}
      <div className="mx-8 my-6 h-px bg-divider" />

      {/* Tools / Panels */}
      <nav className="flex flex-col gap-[38px] px-8">
        {toolNavItems.map((item) => (
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

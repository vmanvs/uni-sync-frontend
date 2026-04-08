"use client";

import Link from "next/link";
import Image from "next/image";

interface NavItemProps {
  icon: string;
  label: string;
  href: string;
  isActive: boolean;
}

export default function NavItem({ icon, label, href, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-6 transition-colors duration-200 hover:text-accent-blue group`}
    >
      <Image
        src={icon}
        alt={label}
        width={22}
        height={22}
        className={`transition-all duration-200 ${
          isActive
            ? "brightness-0 saturate-100 invert-37 sepia-86 saturate-4968 hue-rotate-215 brightness-101 contrast-104"
            : ""
        }`}
        style={
          isActive
            ? {
                filter:
                  "brightness(0) saturate(100%) invert(27%) sepia(96%) saturate(4968%) hue-rotate(223deg) brightness(101%) contrast(104%)",
              }
            : {}
        }
      />
      <span
        className={`text-lg font-medium ${
          isActive ? "text-accent-blue" : "text-text-muted"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

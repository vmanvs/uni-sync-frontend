export interface NavItemType {
  label: string;
  icon: string;
  href: string;
}

export const mainNavItems: NavItemType[] = [
  { label: "Dashboard", icon: "/icons/dash-home-icon.svg", href: "/" },
  { label: "Coolers", icon: "/icons/cooler-icon.svg", href: "/coolers" },
  { label: "Faculty", icon: "/icons/faculty-icon.svg", href: "/faculty" },
  { label: "HealthRoom", icon: "/icons/health-room-icon.svg", href: "/health" },
  { label: "Library", icon: "/icons/library-icon.svg", href: "/library" },
  { label: "Play Grounds", icon: "/icons/playground-icon.svg", href: "/playgrounds" },
];

export const toolNavItems: NavItemType[] = [
  { label: "Teachers Panel", icon: "/icons/teachers-icon.svg", href: "/teachers" },
  { label: "Admin Panel", icon: "/icons/admin-icon.svg", href: "/admin" },
  { label: "Report Issue", icon: "/icons/report-icon.svg", href: "/report" },
];

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavItem from "@/components/ui/NavItem";
import { mainNavItems, toolNavItems } from "@/lib/navigation";

/* ─── User-specific notifications (bell modal) ─── */
interface UserNotification {
  id: string;
  type: "warning" | "info" | "success" | "alert";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const userNotifications: UserNotification[] = [
  {
    id: "n1",
    type: "warning",
    title: "Water Cooler Alert",
    message:
      "Cooler at AB-121 (Ground Floor) has been reported by 5+ students for bad water taste. Avoid drinking from it until maintenance clears it.",
    time: "10 mins ago",
    read: false,
  },
  {
    id: "n2",
    type: "success",
    title: "Basketball Court B is Free",
    message:
      "The basketball court you bookmarked is now available. Book it before someone else does!",
    time: "25 mins ago",
    read: false,
  },
  {
    id: "n3",
    type: "info",
    title: "Library Seat Reserved",
    message:
      "Your seat at AB-1, Row 3, Seat 4 is confirmed for today 2 PM – 6 PM.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "n4",
    type: "alert",
    title: "Health Room BH-3 Closed",
    message:
      "Dr. Priya Iyer's clinic (BH-3) is closed today. Visit GH-1 or GH-2 for general consultation.",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "n5",
    type: "success",
    title: "Dr. Patel is Available",
    message:
      "Dr. Patel (Faculty) now has open slots: C31 + C32 + C33. Duration: 1h.",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "n6",
    type: "warning",
    title: "Cooler Maintenance Scheduled",
    message:
      "Water cooler near AB-104 stairs will be under maintenance tomorrow 9 AM – 12 PM.",
    time: "5 hours ago",
    read: true,
  },
];

const typeConfig = {
  warning: { color: "#F57F17", bg: "#FFF8E1", icon: "⚠️" },
  info: { color: "#1976D2", bg: "#E3F2FD", icon: "ℹ️" },
  success: { color: "#2E7D32", bg: "#E8F5E9", icon: "✅" },
  alert: { color: "#C62828", bg: "#FFEBEE", icon: "🔴" },
};

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Overview" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [notifications, setNotifications] = useState(userNotifications);
  const modalRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <header className="h-[80px] lg:h-[100px] bg-bg-white border-b border-divider flex items-center justify-between px-4 lg:px-10 relative">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Hamburger Menu (Mobile Only) */}
        <button 
          className="lg:hidden p-2 -ml-2 text-text-heading rounded-md hover:bg-bg-page transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open Mobile Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Page Title */}
        <h1 className="text-[20px] sm:text-[22px] lg:text-[28px] font-semibold text-text-heading truncate max-w-[150px] sm:max-w-none">{title}</h1>
      </div>

      {/* Right side: Bell + Avatar */}
      <div className="flex items-center gap-3 lg:gap-6">
        {/* Notification Bell */}
        <div className="relative" ref={modalRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-105"
            style={{
              backgroundColor: "var(--notification-bg)",
              boxShadow: "4px 4px 18px -2px rgba(231,228,232,0.8)",
            }}
            aria-label="Notifications"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                stroke="#E74C3C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.73 21a2 2 0 0 1-3.46 0"
                stroke="#E74C3C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Modal */}
          {isOpen && (
            <div
              className="absolute right-0 top-[60px] w-[400px] bg-white rounded-[20px] overflow-hidden z-50"
              style={{
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                animation: "notifSlideIn 0.25s ease-out",
              }}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-divider">
                <div>
                  <h3 className="text-base font-semibold text-text-heading">
                    Notifications
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    {unreadCount} unread
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-accent-blue font-medium hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notification list */}
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.map((notif) => {
                  const cfg = typeConfig[notif.type];
                  return (
                    <button
                      key={notif.id}
                      onClick={() => markRead(notif.id)}
                      className={`w-full text-left px-6 py-4 flex gap-3 transition-colors duration-150 cursor-pointer border-b border-divider-light last:border-0 ${
                        notif.read
                          ? "bg-white hover:bg-bg-page/50"
                          : "bg-blue-50/40 hover:bg-blue-50/70"
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0 text-sm mt-0.5"
                        style={{ background: cfg.bg }}
                      >
                        {cfg.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`text-sm leading-tight ${
                              notif.read
                                ? "font-medium text-text-body"
                                : "font-semibold text-text-heading"
                            }`}
                          >
                            {notif.title}
                          </p>
                          {!notif.read && (
                            <span className="w-2 h-2 rounded-full bg-accent-blue shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed line-clamp-2">
                          {notif.message}
                        </p>
                        <p className="text-[10px] text-text-muted mt-1.5">
                          {notif.time}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full bg-gray-400 overflow-hidden shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500" />
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="relative w-[280px] max-w-[80%] h-full bg-bg-white flex flex-col overflow-y-auto transform transition-transform duration-300 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-6 border-b border-divider">
              <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src="/icons/uni-sync-icon.svg" alt="UniSync" width={28} height={28} />
                <span className="text-[20px] font-bold text-brand-gradient">UniSync</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-text-muted p-2 hover:bg-bg-page rounded-full transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 px-6 pt-6">
              {mainNavItems.map((item) => (
                <div key={item.label} onClick={() => setIsMobileMenuOpen(false)}>
                  <NavItem icon={item.icon} label={item.label} href={item.href} isActive={pathname === item.href} />
                </div>
              ))}
            </nav>
            <div className="mx-6 my-6 h-px bg-divider" />
            <nav className="flex flex-col gap-6 px-6 pb-6">
              {toolNavItems.map((item) => (
                <div key={item.label} onClick={() => setIsMobileMenuOpen(false)}>
                  <NavItem icon={item.icon} label={item.label} href={item.href} isActive={pathname === item.href} />
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes notifSlideIn {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </header>
  );
}

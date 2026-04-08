"use client";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SectionLabel from "@/components/ui/SectionLabel";
import CardCarousel from "@/components/dashboard/CardCarousel";
import { frequentlyViewedCards } from "@/lib/mockData";

interface ActivityItem {
  id: string;
  icon: string;
  category: "faculty" | "playground" | "cooler" | "library" | "health";
  message: string;
  detail: string;
  time: string;
}

const recentActivity: ActivityItem[] = [
  {
    id: "a1",
    icon: "👨‍🏫",
    category: "faculty",
    message: "Dr. Patel is now free for meetings",
    detail: "Available slots: C31 + C32 + C33 · Duration: 1h",
    time: "2 mins ago",
  },
  {
    id: "a2",
    icon: "🏀",
    category: "playground",
    message: "Basketball Court A is now occupied",
    detail: "Inter-dept Tournament · CSE Dept · 2 PM – 5 PM",
    time: "15 mins ago",
  },
  {
    id: "a3",
    icon: "🚰",
    category: "cooler",
    message: "Water cooler near AB-121 reported for bad taste",
    detail: "5+ students reported · Maintenance notified",
    time: "30 mins ago",
  },
  {
    id: "a4",
    icon: "📚",
    category: "library",
    message: "AB-1 Library has 12 new seats available",
    detail: "Row 5–7 freed up · 138 / 150 total seats available",
    time: "45 mins ago",
  },
  {
    id: "a5",
    icon: "⚽",
    category: "playground",
    message: "Football Field just became free",
    detail: "Friendly Match ended early · Available for booking",
    time: "1 hour ago",
  },
  {
    id: "a6",
    icon: "🏥",
    category: "health",
    message: "Dr. Meera Kapoor started her sitting at GH-1",
    detail: "General Physician · Available 9 AM – 12 PM",
    time: "1.5 hours ago",
  },
  {
    id: "a7",
    icon: "🏸",
    category: "playground",
    message: "Badminton Court 3 under maintenance",
    detail: "Expected back online tomorrow morning",
    time: "2 hours ago",
  },
  {
    id: "a8",
    icon: "👩‍🏫",
    category: "faculty",
    message: "Ms. Reddy's slot B23 + B24 is now open",
    detail: "Duration: 1h 15 mins · Walk-in available",
    time: "3 hours ago",
  },
];

const categoryColors: Record<string, { bg: string; border: string }> = {
  faculty: { bg: "#EDE7F6", border: "#B39DDB" },
  playground: { bg: "#E8F5E9", border: "#A5D6A7" },
  cooler: { bg: "#E3F2FD", border: "#90CAF9" },
  library: { bg: "#FFF3E0", border: "#FFCC80" },
  health: { bg: "#FCE4EC", border: "#F48FB1" },
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 bg-bg-page px-10 py-8 overflow-y-auto">
          {/* Frequently Viewed Section */}
          <SectionLabel>Frequently Viewed</SectionLabel>

          <div className="mt-6 mb-4">
            <CardCarousel cards={frequentlyViewedCards} />
          </div>

          {/* Tagline */}
          <p
            className="text-center text-[22px] font-bold mt-12 mb-8"
            style={{ fontFamily: "var(--font-mukta-malar), sans-serif" }}
          >
            <span className="text-text-heading">Built for </span>
            <span className="text-tag-management">Management</span>
            <span className="text-text-heading">. Designed for </span>
            <span className="text-tag-students">Students.</span>
          </p>

          {/* Recent Activity Section */}
          <SectionLabel>Recent Activity</SectionLabel>

          <div className="bg-bg-white rounded-[25px] px-[30px] pt-4 pb-2 mt-6">
            {recentActivity.map((item, index) => {
              const colors = categoryColors[item.category];
              return (
                <div key={item.id}>
                  <div className="flex items-start gap-4 py-4 group hover:bg-bg-page/40 -mx-[30px] px-[30px] transition-colors duration-150 cursor-default">
                    {/* Icon circle */}
                    <div
                      className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-lg shrink-0 mt-0.5"
                      style={{
                        background: colors.bg,
                        border: `1.5px solid ${colors.border}`,
                      }}
                    >
                      {item.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-medium text-text-heading leading-snug">
                        {item.message}
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        {item.detail}
                      </p>
                    </div>

                    {/* Time */}
                    <span className="text-xs text-text-muted shrink-0 mt-1">
                      {item.time}
                    </span>
                  </div>
                  {index < recentActivity.length - 1 && (
                    <div
                      className="h-px -mx-[30px] mx-0"
                      style={{ backgroundColor: "#F2F4F7" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

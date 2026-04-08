"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SectionLabel from "@/components/ui/SectionLabel";

interface Ground {
  id: string;
  name: string;
  type: string;
  status: "free" | "occupied" | "maintenance";
  currentEvent?: string;
  capacity: number;
  bookedBy?: string;
  timeSlot?: string;
}

const groundsData: Ground[] = [
  {
    id: "bball-1",
    name: "Basketball Court A",
    type: "Basketball",
    status: "occupied",
    currentEvent: "Inter-dept Tournament",
    capacity: 30,
    bookedBy: "CSE Dept",
    timeSlot: "2 PM - 5 PM",
  },
  {
    id: "bball-2",
    name: "Basketball Court B",
    type: "Basketball",
    status: "free",
    capacity: 30,
  },
  {
    id: "badminton-1",
    name: "Badminton Court 1",
    type: "Badminton",
    status: "occupied",
    currentEvent: "Practice Session",
    capacity: 4,
    bookedBy: "Sports Club",
    timeSlot: "3 PM - 4 PM",
  },
  {
    id: "badminton-2",
    name: "Badminton Court 2",
    type: "Badminton",
    status: "free",
    capacity: 4,
  },
  {
    id: "badminton-3",
    name: "Badminton Court 3",
    type: "Badminton",
    status: "maintenance",
    capacity: 4,
  },
  {
    id: "cricket",
    name: "Cricket Ground",
    type: "Cricket",
    status: "free",
    capacity: 50,
  },
  {
    id: "football",
    name: "Football Field",
    type: "Football",
    status: "occupied",
    currentEvent: "Friendly Match",
    capacity: 40,
    bookedBy: "Football Team",
    timeSlot: "4 PM - 6 PM",
  },
  {
    id: "tennis-1",
    name: "Tennis Court",
    type: "Tennis",
    status: "free",
    capacity: 4,
  },
  {
    id: "volleyball",
    name: "Volleyball Court",
    type: "Volleyball",
    status: "occupied",
    currentEvent: "Open Play",
    capacity: 16,
    bookedBy: "Open",
    timeSlot: "3 PM - 5 PM",
  },
  {
    id: "track",
    name: "Running Track",
    type: "Athletics",
    status: "free",
    capacity: 100,
  },
];

const sportIcons: Record<string, React.ReactNode> = {
  Basketball: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Badminton: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3" />
      <path d="M12 8v8" />
      <path d="M8 21l4-5 4 5" />
    </svg>
  ),
  Cricket: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12a4 4 0 0 1 8 0" />
      <line x1="12" y1="8" x2="12" y2="16" />
    </svg>
  ),
  Football: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
    </svg>
  ),
  Tennis: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M18.09 6.41A9.97 9.97 0 0 0 6.41 18.09" />
      <path d="M5.91 17.59A9.97 9.97 0 0 0 17.59 5.91" />
    </svg>
  ),
  Volleyball: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20" />
      <path d="M2 12h20" />
    </svg>
  ),
  Athletics: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3" />
      <path d="M6.5 21l3.5-7 2 2.5L15 11" />
      <path d="M15 11l3 10" />
      <path d="M9 14l-3 7" />
    </svg>
  ),
};

function StatusPill({ status }: { status: Ground["status"] }) {
  const config = {
    free: { bg: "#E8F5E9", text: "#2E7D32", label: "Free", dot: "#4CAF50" },
    occupied: { bg: "#FFF3E0", text: "#E65100", label: "Occupied", dot: "#FF9800" },
    maintenance: { bg: "#F3E5F5", text: "#7B1FA2", label: "Maintenance", dot: "#9C27B0" },
  }[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: config.bg, color: config.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ background: config.dot }}
      />
      {config.label}
    </span>
  );
}

export default function PlaygroundsPage() {
  const [filter, setFilter] = useState<"all" | "free" | "occupied" | "maintenance">("all");
  const [selectedGround, setSelectedGround] = useState<string | null>(null);

  const filteredGrounds =
    filter === "all"
      ? groundsData
      : groundsData.filter((g) => g.status === filter);

  const freeCount = groundsData.filter((g) => g.status === "free").length;
  const occupiedCount = groundsData.filter((g) => g.status === "occupied").length;
  const maintenanceCount = groundsData.filter((g) => g.status === "maintenance").length;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header title="Overview" />

        <main className="flex-1 bg-bg-page px-10 py-8 overflow-y-auto">
          <SectionLabel>Play Grounds</SectionLabel>

          {/* Summary bar */}
          <div className="flex gap-4 mt-6 mb-8">
            {[
              { key: "all" as const, label: "All Grounds", count: groundsData.length, color: "#2D60FF" },
              { key: "free" as const, label: "Free", count: freeCount, color: "#4CAF50" },
              { key: "occupied" as const, label: "Occupied", count: occupiedCount, color: "#FF9800" },
              { key: "maintenance" as const, label: "Maintenance", count: maintenanceCount, color: "#9C27B0" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                className={`px-5 py-3 rounded-[16px] text-sm font-medium transition-all duration-200 cursor-pointer ${
                  filter === item.key
                    ? "text-white shadow-lg scale-[1.02]"
                    : "bg-bg-white text-text-body hover:shadow-md"
                }`}
                style={{
                  background: filter === item.key ? item.color : undefined,
                  boxShadow:
                    filter !== item.key
                      ? "4px 4px 18px -5px rgba(218,221,232,0.8)"
                      : undefined,
                }}
              >
                {item.label}{" "}
                <span
                  className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                    filter === item.key
                      ? "bg-white/20"
                      : "bg-bg-page"
                  }`}
                >
                  {item.count}
                </span>
              </button>
            ))}
          </div>

          {/* Grounds grid */}
          <div className="grid grid-cols-2 gap-6">
            {filteredGrounds.map((ground) => {
              const isExpanded = selectedGround === ground.id;
              return (
                <button
                  key={ground.id}
                  onClick={() =>
                    setSelectedGround(isExpanded ? null : ground.id)
                  }
                  className={`bg-bg-white rounded-[20px] p-6 text-left transition-all duration-300 cursor-pointer ${
                    isExpanded
                      ? "ring-2 ring-accent-blue/30 shadow-lg"
                      : "hover:shadow-md"
                  }`}
                  style={{
                    boxShadow: !isExpanded
                      ? "4px 4px 18px -5px rgba(218,221,232,0.8)"
                      : undefined,
                  }}
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center"
                        style={{
                          background:
                            ground.status === "free"
                              ? "#E8F5E9"
                              : ground.status === "occupied"
                              ? "#FFF3E0"
                              : "#F3E5F5",
                          color:
                            ground.status === "free"
                              ? "#2E7D32"
                              : ground.status === "occupied"
                              ? "#E65100"
                              : "#7B1FA2",
                        }}
                      >
                        {sportIcons[ground.type] || sportIcons.Athletics}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-text-heading">
                          {ground.name}
                        </p>
                        <p className="text-xs text-text-muted mt-0.5">
                          {ground.type} · Capacity: {ground.capacity}
                        </p>
                      </div>
                    </div>
                    <StatusPill status={ground.status} />
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div
                      className="border-t border-divider-light pt-4 mt-2 space-y-2"
                      style={{
                        animation: "fadeSlideIn 0.25s ease-out",
                      }}
                    >
                      {ground.status === "occupied" && (
                        <>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-text-muted w-24">Event:</span>
                            <span className="text-text-body font-medium">
                              {ground.currentEvent}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-text-muted w-24">
                              Booked by:
                            </span>
                            <span className="text-text-body">
                              {ground.bookedBy}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-text-muted w-24">Time:</span>
                            <span className="text-text-body">
                              {ground.timeSlot}
                            </span>
                          </div>
                        </>
                      )}
                      {ground.status === "free" && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-emerald-600 font-medium">
                            ✓ Available for booking
                          </span>
                          <span className="px-4 py-1.5 rounded-full bg-accent-blue text-white text-xs font-medium">
                            Book Now
                          </span>
                        </div>
                      )}
                      {ground.status === "maintenance" && (
                        <p className="text-sm text-purple-600">
                          🔧 Under maintenance. Expected to be available
                          tomorrow.
                        </p>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {filteredGrounds.length === 0 && (
            <div className="text-center py-16 text-text-muted text-base">
              No grounds match the selected filter.
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

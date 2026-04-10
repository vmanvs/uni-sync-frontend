"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SectionLabel from "@/components/ui/SectionLabel";
import { healthRoomData, HealthRoomRow } from "@/lib/mockData";

function StatusBadge({ status }: { status: HealthRoomRow["status"] }) {
  const config = {
    available: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      dot: "bg-emerald-500",
      label: "Available",
    },
    busy: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      dot: "bg-amber-500",
      label: "Busy",
    },
    closed: {
      bg: "bg-red-50",
      text: "text-red-500",
      dot: "bg-red-500",
      label: "Closed",
    },
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${config.dot} animate-pulse`}
      />
      {config.label}
    </span>
  );
}

function StatCard({
  count,
  label,
  color,
  icon,
}: {
  count: number;
  label: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center gap-4 px-6 py-4 rounded-[20px] min-w-[200px]"
      style={{
        background: color,
        boxShadow: "4px 4px 18px -5px rgba(218, 221, 232, 0.8)",
      }}
    >
      <div className="w-[50px] h-[50px] rounded-full bg-white/50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-text-body">{count}</p>
        <p className="text-sm text-text-muted">{label}</p>
      </div>
    </div>
  );
}

export default function HealthPage() {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const availableCount = healthRoomData.filter(
    (r) => r.status === "available"
  ).length;
  const busyCount = healthRoomData.filter((r) => r.status === "busy").length;
  const closedCount = healthRoomData.filter(
    (r) => r.status === "closed"
  ).length;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Header title="Overview" />

        <main className="flex-1 bg-bg-page px-4 pt-6 pb-8 lg:px-10 lg:py-8 overflow-y-auto w-full max-w-full">
          {/* Health Room heading */}
          <SectionLabel>Health Room</SectionLabel>

          {/* Summary stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 mb-10">
            <StatCard
              count={availableCount}
              label="Available Now"
              color="#E8F5E9"
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              }
            />
            <StatCard
              count={busyCount}
              label="Currently Busy"
              color="#FFF8E1"
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F57F17"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
            />
            <StatCard
              count={closedCount}
              label="Closed Today"
              color="#FFEBEE"
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C62828"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              }
            />
          </div>

          {/* Doctor Availability Table */}
          <SectionLabel>Doctor Availability</SectionLabel>

          <div className="bg-bg-white rounded-[25px] px-[30px] pt-3 pb-6 mt-6">
            {/* Header row */}
            <div className="hidden md:grid grid-cols-5 gap-4 py-3 text-text-table-header text-base font-medium">
              <span>Location</span>
              <span>Doctor Name</span>
              <span>Specialization</span>
              <span>Sitting Time</span>
              <span>Status</span>
            </div>

            {/* Top divider */}
            <div className="h-px" style={{ backgroundColor: "#E6EFF5" }} />

            {/* Data rows */}
            {healthRoomData.map((row, index) => (
              <div key={row.location}>
                <div
                  onClick={() =>
                    setSelectedRow(
                      selectedRow === row.location ? null : row.location
                    )
                  }
                  className={`flex flex-col gap-2 py-4 md:grid md:grid-cols-5 md:gap-4 md:py-4 text-text-body text-base -mx-4 px-4 lg:-mx-[30px] lg:px-[30px] transition-all duration-200 cursor-pointer ${
                    selectedRow === row.location
                      ? "bg-accent-blue/5"
                      : "hover:bg-bg-page/50"
                  }`}
                >
                  <div className="flex justify-between md:contents"><span className="md:hidden text-sm font-medium text-text-muted">Location</span><span className="font-medium text-right md:text-left">{row.location}</span></div>
                  <div className="flex justify-between md:contents"><span className="md:hidden text-sm font-medium text-text-muted">Doctor Name</span><span className="text-right md:text-left">{row.doctorName}</span></div>
                  <div className="flex justify-between md:contents">
                    <span className="md:hidden text-sm font-medium text-text-muted">Specialization</span>
                    <span className="text-text-muted text-sm text-right md:text-left">
                      {row.specialization}
                    </span>
                  </div>
                  <div className="flex justify-between md:contents"><span className="md:hidden text-sm font-medium text-text-muted">Sitting Time</span><span className="text-right md:text-left">{row.sittingTime}</span></div>
                  <div className="flex justify-between md:contents items-center">
                    <span className="md:hidden text-sm font-medium text-text-muted">Status</span>
                    <span>
                      <StatusBadge status={row.status} />
                    </span>
                  </div>
                </div>

                {/* Expanded detail panel */}
                {selectedRow === row.location && (
                  <div
                    className="bg-accent-blue/5 -mx-[30px] px-[30px] pb-4 pt-1"
                    style={{
                      animation: "fadeIn 0.2s ease-out",
                    }}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-sm">
                      <div className="flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#718EBF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="text-text-muted">
                          Room{" "}
                          {row.location.startsWith("GH")
                            ? "Girls Hostel"
                            : "Boys Hostel"}{" "}
                          - Block {row.location.split("-")[1]}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#718EBF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
                        </svg>
                        <span className="text-text-muted">
                          Ext. {1200 + index}
                        </span>
                      </div>
                      {row.status === "available" && (
                        <button className="sm:ml-auto px-4 py-1.5 rounded-full bg-accent-blue text-white text-xs font-medium hover:bg-accent-blue/90 transition-colors w-full sm:w-auto">
                          Book Appointment
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {index < healthRoomData.length - 1 && (
                  <div
                    className="h-px"
                    style={{ backgroundColor: "#F2F4F7" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Emergency notice */}
          <div
            className="mt-8 rounded-[20px] px-8 py-5 flex items-center gap-4"
            style={{
              background:
                "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)",
              boxShadow: "4px 4px 18px -5px rgba(218, 221, 232, 0.8)",
            }}
          >
            <div className="w-[44px] h-[44px] rounded-full bg-white/60 flex items-center justify-center shrink-0">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E65100"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-text-body">
                Emergency Contact
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                For emergencies outside sitting hours, call campus security at{" "}
                <span className="font-semibold text-text-body">
                  +91 98765 43210
                </span>{" "}
                or visit the main gate health desk.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Inline keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
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

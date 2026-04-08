"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SectionLabel from "@/components/ui/SectionLabel";
import { facultyData, FacultyRow } from "@/lib/mockData";

export default function FacultyPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData: FacultyRow[] = facultyData.filter(
    (row) =>
      row.facultyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.availableSlots.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header title="Overview" />

        <main className="flex-1 bg-bg-page px-10 py-8 overflow-y-auto">
          {/* Faculty Details heading */}
          <SectionLabel>Faculty Details</SectionLabel>

          {/* Search bar */}
          <div className="mt-6 mb-8">
            <div
              className="w-[280px] h-[38px] rounded-[25px] flex items-center gap-2.5 px-3"
              style={{ backgroundColor: "#D9D9D9" }}
            >
              {/* Search icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <circle
                  cx="8.5"
                  cy="8.5"
                  r="7"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 14L18.5 18.5"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search faculty..."
                className="flex-1 h-[28px] rounded-[25px] bg-white px-3 text-sm text-text-body outline-none placeholder:text-text-muted"
              />
            </div>
          </div>

          {/* Faculty Table */}
          <div className="bg-bg-white rounded-[25px] px-[30px] pt-3 pb-6">
            {/* Header row */}
            <div className="grid grid-cols-4 gap-4 py-3 text-text-table-header text-base font-medium">
              <span>SL No</span>
              <span>Faculty Name</span>
              <span>Available Slots</span>
              <span>Duration</span>
            </div>

            {/* Top divider */}
            <div className="h-px" style={{ backgroundColor: "#E6EFF5" }} />

            {/* Data rows */}
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <div key={index}>
                  <div className="grid grid-cols-4 gap-4 py-4 text-text-body text-base group hover:bg-bg-page/50 -mx-[30px] px-[30px] transition-colors duration-150 cursor-default">
                    <span>{row.slNo}</span>
                    <span>{row.facultyName}</span>
                    <span>{row.availableSlots}</span>
                    <span>{row.duration}</span>
                  </div>
                  {index < filteredData.length - 1 && (
                    <div
                      className="h-px"
                      style={{ backgroundColor: "#F2F4F7" }}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-text-muted text-base">
                No faculty found matching &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

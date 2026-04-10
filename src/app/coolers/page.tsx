"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SectionLabel from "@/components/ui/SectionLabel";
import BuildingCard from "@/components/ui/BuildingCard";
import {
  coolerBuildings,
  coolerFloors,
  coolerInfoData,
} from "@/lib/mockData";

export default function CoolersPage() {
  const [selectedBuilding, setSelectedBuilding] = useState("ab1");
  const [selectedFloor, setSelectedFloor] = useState("ground");

  const currentData =
    coolerInfoData[selectedBuilding]?.[selectedFloor] || [];

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Header title="Overview" />

        <main className="flex-1 bg-bg-page px-4 pt-6 pb-8 lg:px-10 lg:py-8 overflow-y-auto w-full max-w-full">
          {/* Water Coolers heading */}
          <SectionLabel>Water Coolers</SectionLabel>

          {/* Building selector cards */}
          <div className="flex gap-4 lg:gap-[200px] flex-wrap justify-between lg:justify-start mt-6 mb-10">
            {coolerBuildings.map((building) => (
              <BuildingCard
                key={building.id}
                name={building.name}
                isSelected={selectedBuilding === building.id}
                onClick={() => setSelectedBuilding(building.id)}
              />
            ))}
          </div>

          {/* Floor heading */}
          <SectionLabel>Floor</SectionLabel>

          {/* Floor selector cards */}
          <div className="flex gap-4 lg:gap-[56px] flex-wrap mt-6 mb-10">
            {coolerFloors.map((floor) => (
              <BuildingCard
                key={floor.id}
                name={floor.name}
                isSelected={selectedFloor === floor.id}
                onClick={() => setSelectedFloor(floor.id)}
              />
            ))}
          </div>

          {/* Cooler Information heading */}
          <SectionLabel>Cooler Information</SectionLabel>

          {/* Cooler info table */}
          <div className="bg-bg-white rounded-[25px] px-4 lg:px-[30px] pt-3 pb-6 mt-6">
            {/* Header row */}
            <div className="hidden md:grid grid-cols-4 gap-4 py-3 text-text-table-header text-base font-medium">
              <span>SL No</span>
              <span>Landmark</span>
              <span>Functional</span>
              <span>Last Cleaned</span>
            </div>

            {/* Top divider */}
            <div className="h-px" style={{ backgroundColor: "#E6EFF5" }} />

            {/* Data rows */}
            {currentData.length > 0 ? (
              currentData.map((row, index) => (
                <div key={index}>
                  <div className="flex flex-col gap-2 py-4 md:grid md:grid-cols-4 md:gap-4 md:py-4 text-text-body text-base group hover:bg-bg-page/50 -mx-4 px-4 lg:-mx-[30px] lg:px-[30px] transition-colors duration-150 cursor-default border-b border-divider md:border-b-0 last:border-0">
                    <div className="flex justify-between md:contents"><span className="md:hidden text-sm font-medium text-text-muted">SL No</span><span>{row.slNo}</span></div>
                    <div className="flex justify-between md:contents"><span className="md:hidden text-sm font-medium text-text-muted">Landmark</span><span className="text-right md:text-left">{row.landmark}</span></div>
                    <div className="flex justify-between md:contents">
                      <span className="md:hidden text-sm font-medium text-text-muted">Functional</span>
                      <span
                        className={`font-medium ${
                          row.functional === "Working"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {row.functional}
                      </span>
                    </div>
                    <div className="flex justify-between md:contents"><span className="md:hidden text-sm font-medium text-text-muted">Last Cleaned</span><span>{row.lastCleaned}</span></div>
                  </div>
                  {index < currentData.length - 1 && (
                    <div
                      className="h-px"
                      style={{ backgroundColor: "#F2F4F7" }}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-text-muted text-base">
                No cooler data available for this selection.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

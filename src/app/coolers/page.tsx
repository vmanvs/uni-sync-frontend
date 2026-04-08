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

      <div className="flex flex-col flex-1">
        <Header title="Overview" />

        <main className="flex-1 bg-bg-page px-10 py-8 overflow-y-auto">
          {/* Water Coolers heading */}
          <SectionLabel>Water Coolers</SectionLabel>

          {/* Building selector cards */}
          <div className="flex gap-[200px] mt-6 mb-10">
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
          <div className="flex gap-[56px] mt-6 mb-10">
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
          <div className="bg-bg-white rounded-[25px] px-[30px] pt-3 pb-6 mt-6">
            {/* Header row */}
            <div className="grid grid-cols-4 gap-4 py-3 text-text-table-header text-base font-medium">
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
                  <div className="grid grid-cols-4 gap-4 py-4 text-text-body text-base group hover:bg-bg-page/50 -mx-[30px] px-[30px] transition-colors duration-150 cursor-default">
                    <span>{row.slNo}</span>
                    <span>{row.landmark}</span>
                    <span
                      className={`font-medium ${
                        row.functional === "Working"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {row.functional}
                    </span>
                    <span>{row.lastCleaned}</span>
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

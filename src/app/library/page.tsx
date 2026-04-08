"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SectionLabel from "@/components/ui/SectionLabel";
import BuildingCard from "@/components/ui/BuildingCard";
import { libraryBuildings, sittingChartData } from "@/lib/mockData";

function ChairIcon({ occupied }: { occupied: boolean }) {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-200"
    >
      <path
        d="M4 8H16"
        stroke={occupied ? "#FF0000" : "#000000"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 8C2 6 3 4 5 3H15C17 4 18 6 18 8"
        stroke={occupied ? "#FF0000" : "#000000"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 8V14"
        stroke={occupied ? "#FF0000" : "#000000"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 8V14"
        stroke={occupied ? "#FF0000" : "#000000"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 14H18"
        stroke={occupied ? "#FF0000" : "#000000"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 14V17"
        stroke={occupied ? "#FF0000" : "#000000"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 14V17"
        stroke={occupied ? "#FF0000" : "#000000"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LibraryPage() {
  const [selectedBuilding, setSelectedBuilding] = useState("ab1");
  // Create separate seating data for each building
  const [seatData, setSeatData] = useState<Record<string, boolean[][]>>({
    ab1: sittingChartData.map((row) => [...row]),
    ab2: [
      [true, true, false, true, true, true, true, true],
      [true, true, true, true, false, true, true, true],
      [true, true, true, true, true, true, false, true],
      [true, false, true, true, true, true, true, true],
      [true, true, true, false, true, true, true, true],
      [true, true, true, true, true, false, true, true],
      [true, true, true, true, true, true, true, false],
    ],
  });

  const currentSeats = seatData[selectedBuilding] || sittingChartData;
  const currentBuilding = libraryBuildings.find(
    (b) => b.id === selectedBuilding
  );
  const totalSeats = currentBuilding?.totalSeats || 0;
  const occupiedCount = currentSeats.flat().filter((s) => !s).length;
  const availableCount = totalSeats - occupiedCount;

  const toggleSeat = (rowIdx: number, colIdx: number) => {
    setSeatData((prev) => {
      const newData = { ...prev };
      newData[selectedBuilding] = newData[selectedBuilding].map((row, ri) =>
        ri === rowIdx ? row.map((seat, ci) => (ci === colIdx ? !seat : seat)) : [...row]
      );
      return newData;
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header title="Overview" />

        <main className="flex-1 bg-bg-page px-10 py-8 overflow-y-auto">
          {/* Libraries heading */}
          <SectionLabel>Libraries</SectionLabel>

          {/* Building cards */}
          <div className="flex gap-[200px] mt-6 mb-10">
            {libraryBuildings.map((building) => (
              <BuildingCard
                key={building.id}
                name={building.name}
                subtitle={`${building.totalSeats} Total`}
                isSelected={selectedBuilding === building.id}
                onClick={() => setSelectedBuilding(building.id)}
              />
            ))}
          </div>

          {/* Sitting Chart heading */}
          <SectionLabel>Sitting Chart</SectionLabel>

          {/* Stats bar */}
          <div className="flex items-center gap-6 mt-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-black" />
              <span className="text-sm text-text-body">
                Available ({availableCount})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-text-body">
                Occupied ({occupiedCount})
              </span>
            </div>
          </div>

          {/* Chair grid */}
          <div className="inline-flex flex-col gap-4">
            {currentSeats.map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-[55px]">
                {row.map((isAvailable, colIdx) => (
                  <button
                    key={colIdx}
                    onClick={() => toggleSeat(rowIdx, colIdx)}
                    className="hover:scale-110 transition-transform duration-150 cursor-pointer"
                    title={
                      isAvailable
                        ? `Seat ${rowIdx + 1}-${colIdx + 1}: Available`
                        : `Seat ${rowIdx + 1}-${colIdx + 1}: Occupied`
                    }
                  >
                    <ChairIcon occupied={!isAvailable} />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

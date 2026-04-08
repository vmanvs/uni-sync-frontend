"use client";

interface BuildingCardProps {
  name: string;
  subtitle?: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function BuildingCard({
  name,
  subtitle,
  isSelected,
  onClick,
}: BuildingCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-[255px] h-[120px] rounded-[25px] flex items-center gap-6 px-8 transition-all duration-300 cursor-pointer group"
      style={{
        background: isSelected ? "#ACD5FF" : "#FBFBFB",
        boxShadow: "4px 4px 18px -5px rgba(218, 221, 232, 0.8)",
      }}
    >
      {/* Circular icon */}
      <div
        className="w-[70px] h-[70px] rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
        style={{
          background: isSelected
            ? "rgba(255,255,255,0.5)"
            : "rgba(172,213,255,0.2)",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4"
            y="6"
            width="20"
            height="16"
            rx="2"
            stroke={isSelected ? "#2D60FF" : "#718EBF"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 6V4"
            stroke={isSelected ? "#2D60FF" : "#718EBF"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 6V4"
            stroke={isSelected ? "#2D60FF" : "#718EBF"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 12H19"
            stroke={isSelected ? "#2D60FF" : "#718EBF"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 16H15"
            stroke={isSelected ? "#2D60FF" : "#718EBF"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="text-left">
        <p className="text-base text-text-body font-medium">{name}</p>
        {subtitle && (
          <p className="text-sm text-text-body font-bold mt-0.5">{subtitle}</p>
        )}
      </div>
    </button>
  );
}

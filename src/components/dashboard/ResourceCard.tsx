import Image from "next/image";
import Link from "next/link";

interface ResourceCardProps {
  resourceName: string;
  icon: string;
  statusLabel: string;
  statusCount: number;
  totalCount: number;
  href: string;
  variant?: "default" | "featured";
}

export default function ResourceCard({
  resourceName,
  icon,
  statusLabel,
  statusCount,
  totalCount,
  href,
  variant = "default",
}: ResourceCardProps) {
  const isFeatured = variant === "featured";

  return (
    <div
      className="w-[350px] min-w-[350px] h-[235px] rounded-[25px] flex flex-col justify-between overflow-hidden"
      style={{
        background: isFeatured
          ? "linear-gradient(135deg, #4C49ED 0%, #0A06F4 100%)"
          : "#FFFFFF",
        boxShadow: "0.28px 0.56px 0.56px rgba(0,0,0,0.25)",
      }}
    >
      {/* Top content */}
      <div className="px-7 pt-6 flex-1">
        {/* Header: icon + name */}
        <div className="flex items-center gap-2.5 mb-6">
          <Image
            src={icon}
            alt={resourceName}
            width={20}
            height={20}
            style={
              isFeatured
                ? {
                    filter:
                      "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                  }
                : {}
            }
          />
          <span
            className={`text-xl font-[var(--font-lato)] ${
              isFeatured ? "text-white" : "text-text-body"
            }`}
            style={{ fontFamily: "var(--font-lato), Lato, sans-serif" }}
          >
            {resourceName}
          </span>
        </div>

        {/* Status text + count */}
        <div>
          <p
            className={`text-[28px] font-bold leading-tight ${
              isFeatured ? "text-white" : "text-text-body"
            }`}
          >
            {statusLabel}
          </p>
          <p
            className={`text-sm mt-0.5 ${
              isFeatured ? "text-white/70" : "text-text-muted"
            }`}
          >
            {statusCount} / {totalCount}
          </p>
        </div>
      </div>

      {/* Bottom section with gradient overlay */}
      <div
        className="h-[70px] rounded-b-[25px] flex items-center px-7"
        style={{
          background: isFeatured
            ? "linear-gradient(to top, rgba(255,255,255,0.15), rgba(255,255,255,0))"
            : "linear-gradient(to top, rgba(255,255,255,0.15), rgba(255,255,255,0))",
        }}
      >
        <Link
          href={href}
          className={`flex items-center gap-6 text-base font-medium transition-opacity hover:opacity-80 ${
            isFeatured ? "text-white" : "text-text-body"
          }`}
        >
          Open Details
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

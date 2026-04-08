interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Overview" }: HeaderProps) {
  return (
    <header className="h-[100px] bg-bg-white border-b border-divider flex items-center justify-between px-10">
      {/* Page Title */}
      <h1 className="text-[28px] font-semibold text-text-heading">{title}</h1>

      {/* Right side: Bell + Avatar */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button
          className="relative w-[50px] h-[50px] rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "var(--notification-bg)",
            boxShadow: "4px 4px 18px -2px rgba(231,228,232,0.8)",
          }}
          aria-label="Notifications"
        >
          {/* Bell icon */}
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
          {/* Red notification dot */}
          <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile Avatar */}
        <div className="w-[50px] h-[50px] rounded-full bg-gray-400 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500" />
        </div>
      </div>
    </header>
  );
}

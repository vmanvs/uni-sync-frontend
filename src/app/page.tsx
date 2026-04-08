import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SectionLabel from "@/components/ui/SectionLabel";
import CardCarousel from "@/components/dashboard/CardCarousel";
import ReservationsTable from "@/components/dashboard/ReservationsTable";
import { frequentlyViewedCards, upcomingReservations } from "@/lib/mockData";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Right column */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Main content */}
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

          {/* Upcoming Reservations Section */}
          <SectionLabel>Upcoming Reservations</SectionLabel>

          <div className="mt-6">
            <ReservationsTable reservations={upcomingReservations} />
          </div>
        </main>
      </div>
    </div>
  );
}

import { ReservationRow } from "@/lib/mockData";

interface ReservationsTableProps {
  reservations: ReservationRow[];
}

export default function ReservationsTable({
  reservations,
}: ReservationsTableProps) {
  return (
    <div className="bg-bg-white rounded-[25px] px-[30px] pt-3 pb-6">
      {/* Header row */}
      <div className="grid grid-cols-5 gap-4 py-3 text-text-table-header text-base font-medium">
        <span>SL No</span>
        <span>Premises</span>
        <span>Location</span>
        <span>Duration</span>
        <span>Event Info</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-divider" />

      {/* Data rows */}
      {reservations.map((row, index) => (
        <div key={index}>
          <div className="grid grid-cols-5 gap-4 py-4 text-text-body text-base">
            <span>{row.slNo}</span>
            <span>{row.premises}</span>
            <span>{row.location}</span>
            <span>{row.duration}</span>
            <span>{row.eventInfo}</span>
          </div>
          {index < reservations.length - 1 && (
            <div className="h-px bg-divider-light" />
          )}
        </div>
      ))}
    </div>
  );
}

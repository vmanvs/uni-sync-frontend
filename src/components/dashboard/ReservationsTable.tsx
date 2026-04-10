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
      <div className="hidden md:grid grid-cols-5 gap-4 py-3 text-text-table-header text-base font-medium">
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
          <div className="flex flex-col gap-2 py-4 md:grid md:grid-cols-5 md:gap-4 md:py-4 text-text-body text-base border-b border-divider md:border-b-0 last:border-0 last:pb-0">
            <div className="flex justify-between md:contents"><span className="md:hidden text-text-muted">SL No</span><span>{row.slNo}</span></div>
            <div className="flex justify-between md:contents"><span className="md:hidden text-text-muted">Premises</span><span className="text-right md:text-left">{row.premises}</span></div>
            <div className="flex justify-between md:contents"><span className="md:hidden text-text-muted">Location</span><span className="text-right md:text-left">{row.location}</span></div>
            <div className="flex justify-between md:contents"><span className="md:hidden text-text-muted">Duration</span><span className="text-right md:text-left">{row.duration}</span></div>
            <div className="flex justify-between md:contents"><span className="md:hidden text-text-muted">Event Info</span><span className="text-right md:text-left">{row.eventInfo}</span></div>
          </div>
          {index < reservations.length - 1 && (
            <div className="h-px bg-divider-light" />
          )}
        </div>
      ))}
    </div>
  );
}

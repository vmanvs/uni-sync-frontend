/* ─── Dashboard ─── */

export interface ResourceCardData {
  id: string;
  resourceName: string;
  icon: string;
  statusLabel: string;
  statusCount: number;
  totalCount: number;
  href: string;
  variant: "default" | "featured";
}

export interface ReservationRow {
  slNo: string;
  premises: string;
  location: string;
  duration: string;
  eventInfo: string;
}

export const frequentlyViewedCards: ResourceCardData[] = [
  {
    id: "water-coolers",
    resourceName: "Water Coolers",
    icon: "/icons/cooler-icon.svg",
    statusLabel: "OPERATIONAL",
    statusCount: 25,
    totalCount: 32,
    href: "/coolers",
    variant: "featured",
  },
  {
    id: "library",
    resourceName: "Library",
    icon: "/icons/library-icon.svg",
    statusLabel: "SEATS FREE",
    statusCount: 236,
    totalCount: 250,
    href: "/library",
    variant: "default",
  },
  {
    id: "health-rooms",
    resourceName: "Health Rooms",
    icon: "/icons/health-room-icon.svg",
    statusLabel: "OPEN",
    statusCount: 2,
    totalCount: 3,
    href: "/health",
    variant: "default",
  },
];

export const upcomingReservations: ReservationRow[] = [
  {
    slNo: "01.",
    premises: "Auditorim - 1",
    location: "AB - 1",
    duration: "1 PM to 5 PM",
    eventInfo: "Vibhack",
  },
  {
    slNo: "02.",
    premises: "Auditorim - 1",
    location: "AB - 1",
    duration: "1 PM to 5 PM",
    eventInfo: "Vibhack",
  },
  {
    slNo: "03.",
    premises: "Auditorim - 1",
    location: "AB - 1",
    duration: "1 PM to 5 PM",
    eventInfo: "Vibhack",
  },
];

/* ─── Faculty ─── */

export interface FacultyRow {
  slNo: string;
  facultyName: string;
  availableSlots: string;
  duration: string;
}

export const facultyData: FacultyRow[] = [
  { slNo: "01.", facultyName: "John Doe", availableSlots: "A11 + A12 + A13", duration: "1h 30 mins" },
  { slNo: "02.", facultyName: "Jane Smith", availableSlots: "B21 + B22", duration: "2h 00 mins" },
  { slNo: "03.", facultyName: "Dr. Patel", availableSlots: "C31 + C32 + C33", duration: "1h 00 mins" },
  { slNo: "04.", facultyName: "Prof. Kumar", availableSlots: "A14 + A15", duration: "45 mins" },
  { slNo: "05.", facultyName: "Dr. Sharma", availableSlots: "D41 + D42 + D43", duration: "2h 30 mins" },
  { slNo: "06.", facultyName: "Ms. Reddy", availableSlots: "B23 + B24", duration: "1h 15 mins" },
  { slNo: "07.", facultyName: "Mr. Singh", availableSlots: "A16", duration: "30 mins" },
];

/* ─── Library ─── */

export interface LibraryBuilding {
  id: string;
  name: string;
  totalSeats: number;
}

export const libraryBuildings: LibraryBuilding[] = [
  { id: "ab1", name: "AB -  1", totalSeats: 150 },
  { id: "ab2", name: "AB -  2", totalSeats: 100 },
];

// Sitting chart: 7 rows x 8 columns. true = available (black), false = occupied (red)
export const sittingChartData: boolean[][] = [
  [true, false, true, true, true, true, false, true],
  [true, true, true, false, true, true, true, true],
  [false, true, true, true, true, true, true, false],
  [true, true, false, true, true, false, true, true],
  [true, true, true, true, false, true, true, true],
  [true, false, true, true, true, true, true, false],
  [true, true, true, false, true, true, false, true],
];

/* ─── Water Coolers ─── */

export interface CoolerBuilding {
  id: string;
  name: string;
}

export const coolerBuildings: CoolerBuilding[] = [
  { id: "ab1", name: "AB -  1" },
  { id: "ab2", name: "AB -  2" },
];

export interface CoolerFloor {
  id: string;
  name: string;
}

export const coolerFloors: CoolerFloor[] = [
  { id: "ground", name: "Ground" },
  { id: "first", name: "First" },
  { id: "second", name: "Second" },
  { id: "third", name: "Third" },
];

export interface CoolerInfoRow {
  slNo: string;
  landmark: string;
  functional: string;
  lastCleaned: string;
}

export const coolerInfoData: Record<string, Record<string, CoolerInfoRow[]>> = {
  ab1: {
    ground: [
      { slNo: "01.", landmark: "Infront of AB-121", functional: "Working", lastCleaned: "23-4-26" },
      { slNo: "02.", landmark: "Near AB-104 stairs", functional: "Working", lastCleaned: "22-4-26" },
      { slNo: "03.", landmark: "Canteen entrance", functional: "Not Working", lastCleaned: "20-4-26" },
    ],
    first: [
      { slNo: "01.", landmark: "Near AB-111", functional: "Working", lastCleaned: "23-4-26" },
      { slNo: "02.", landmark: "Opposite AB-115", functional: "Working", lastCleaned: "21-4-26" },
    ],
    second: [
      { slNo: "01.", landmark: "Near AB-221", functional: "Working", lastCleaned: "23-4-26" },
      { slNo: "02.", landmark: "Lab corridor", functional: "Not Working", lastCleaned: "19-4-26" },
      { slNo: "03.", landmark: "Near washroom", functional: "Working", lastCleaned: "22-4-26" },
    ],
    third: [
      { slNo: "01.", landmark: "Near AB-321", functional: "Working", lastCleaned: "23-4-26" },
    ],
  },
  ab2: {
    ground: [
      { slNo: "01.", landmark: "Main entrance", functional: "Working", lastCleaned: "23-4-26" },
      { slNo: "02.", landmark: "Near parking", functional: "Working", lastCleaned: "22-4-26" },
    ],
    first: [
      { slNo: "01.", landmark: "Near seminar hall", functional: "Working", lastCleaned: "23-4-26" },
      { slNo: "02.", landmark: "Faculty wing", functional: "Not Working", lastCleaned: "18-4-26" },
      { slNo: "03.", landmark: "Near lift", functional: "Working", lastCleaned: "21-4-26" },
    ],
    second: [
      { slNo: "01.", landmark: "Computer lab area", functional: "Working", lastCleaned: "23-4-26" },
    ],
    third: [
      { slNo: "01.", landmark: "Library wing", functional: "Working", lastCleaned: "23-4-26" },
      { slNo: "02.", landmark: "Near terrace", functional: "Working", lastCleaned: "22-4-26" },
    ],
  },
};

/* ─── Health Room ─── */

export interface HealthRoomRow {
  location: string;
  doctorName: string;
  sittingTime: string;
  status: "available" | "busy" | "closed";
  specialization: string;
}

export const healthRoomData: HealthRoomRow[] = [
  { location: "GH-1", doctorName: "Dr. Meera Kapoor", sittingTime: "9 AM to 12 PM", status: "available", specialization: "General Physician" },
  { location: "GH-2", doctorName: "Dr. Rajesh Nair", sittingTime: "3 PM to 6 PM", status: "available", specialization: "General Physician" },
  { location: "BH-1", doctorName: "Dr. Anita Sharma", sittingTime: "10 AM to 1 PM", status: "busy", specialization: "Orthopedic" },
  { location: "BH-2", doctorName: "Dr. Vikram Sinha", sittingTime: "2 PM to 5 PM", status: "available", specialization: "Dermatologist" },
  { location: "BH-3", doctorName: "Dr. Priya Iyer", sittingTime: "3 PM to 6 PM", status: "closed", specialization: "ENT Specialist" },
];

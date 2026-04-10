"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SectionLabel from "@/components/ui/SectionLabel";

interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
  bookedBy?: string;
}

interface TeacherProfile {
  name: string;
  department: string;
  room: string;
  slots: TimeSlot[];
}

const teacherProfile: TeacherProfile = {
  name: "Dr. Rajesh Patel",
  department: "Computer Science",
  room: "C-31, AB-1",
  slots: [
    { id: "s1", time: "9:00 AM – 10:00 AM", isAvailable: false, bookedBy: "Aman Gupta (CSE-3A)" },
    { id: "s2", time: "10:00 AM – 11:00 AM", isAvailable: true },
    { id: "s3", time: "11:00 AM – 12:00 PM", isAvailable: true },
    { id: "s4", time: "12:00 PM – 1:00 PM", isAvailable: false, bookedBy: "Lunch Break" },
    { id: "s5", time: "2:00 PM – 3:00 PM", isAvailable: true },
    { id: "s6", time: "3:00 PM – 4:00 PM", isAvailable: false, bookedBy: "Priya Sharma (CSE-2B)" },
    { id: "s7", time: "4:00 PM – 5:00 PM", isAvailable: true },
  ],
};

interface StudentRequest {
  id: string;
  studentName: string;
  rollNo: string;
  purpose: string;
  requestedSlot: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

const studentRequests: StudentRequest[] = [
  { id: "r1", studentName: "Vikram Singh", rollNo: "21CSE045", purpose: "Project guidance", requestedSlot: "10:00 AM – 11:00 AM", status: "pending", date: "Today" },
  { id: "r2", studentName: "Neha Kapoor", rollNo: "21CSE012", purpose: "Assignment doubt", requestedSlot: "2:00 PM – 3:00 PM", status: "pending", date: "Today" },
  { id: "r3", studentName: "Aman Gupta", rollNo: "20CSE033", purpose: "Research discussion", requestedSlot: "9:00 AM – 10:00 AM", status: "approved", date: "Today" },
  { id: "r4", studentName: "Riya Das", rollNo: "22CSE008", purpose: "Internship recommendation", requestedSlot: "11:00 AM – 12:00 PM", status: "rejected", date: "Yesterday" },
];

interface Announcement {
  id: string;
  title: string;
  date: string;
  audience: string;
}

const announcements: Announcement[] = [
  { id: "ann1", title: "Mid-semester marks uploaded for CSE-3A", date: "Today", audience: "CSE-3A" },
  { id: "ann2", title: "Lab session rescheduled to Thursday", date: "Yesterday", audience: "CSE-2B" },
  { id: "ann3", title: "Project submission deadline extended", date: "2 days ago", audience: "All CSE" },
];

export default function TeachersPage() {
  const [slots, setSlots] = useState(teacherProfile.slots);
  const [requests, setRequests] = useState(studentRequests);
  const [newAnnouncement, setNewAnnouncement] = useState("");

  const toggleSlot = (id: string) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === id && !s.bookedBy ? { ...s, isAvailable: !s.isAvailable } : s
      )
    );
  };

  const handleRequest = (id: string, action: "approved" | "rejected") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header title="Teachers Panel" />
        <main className="flex-1 bg-bg-page px-4 pt-6 pb-8 lg:px-10 lg:py-8 overflow-y-auto w-full max-w-full">
          {/* Profile card */}
          <div
            className="rounded-[25px] px-8 py-6 flex items-center gap-6 mb-10"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 8px 30px rgba(102,126,234,0.3)",
            }}
          >
            <div className="w-[70px] h-[70px] rounded-full bg-white/20 flex items-center justify-center text-3xl">
              👨‍🏫
            </div>
            <div className="text-white">
              <h2 className="text-xl font-bold">{teacherProfile.name}</h2>
              <p className="text-white/70 text-sm mt-0.5">{teacherProfile.department} · Room {teacherProfile.room}</p>
              <p className="text-white/50 text-xs mt-1">
                {slots.filter((s) => s.isAvailable).length} slots available today
              </p>
            </div>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Slot Management */}
            <div>
              <SectionLabel>Today&apos;s Slots</SectionLabel>
              <div className="bg-bg-white rounded-[25px] p-6 mt-4 space-y-3">
                {slots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => toggleSlot(slot.id)}
                    disabled={!!slot.bookedBy}
                    className={`w-full flex items-center justify-between px-5 py-3.5 rounded-[14px] transition-all duration-200 text-left ${
                      slot.bookedBy
                        ? "bg-gray-50 cursor-not-allowed"
                        : slot.isAvailable
                        ? "bg-emerald-50 hover:bg-emerald-100 cursor-pointer"
                        : "bg-red-50 hover:bg-red-100 cursor-pointer"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-text-body">{slot.time}</p>
                      {slot.bookedBy && (
                        <p className="text-xs text-text-muted mt-0.5">Booked: {slot.bookedBy}</p>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                        slot.bookedBy
                          ? "bg-gray-200 text-gray-500"
                          : slot.isAvailable
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {slot.bookedBy ? "Booked" : slot.isAvailable ? "Open" : "Blocked"}
                    </span>
                  </button>
                ))}
                <p className="text-[10px] text-text-muted text-center pt-2">
                  Click an open/blocked slot to toggle availability
                </p>
              </div>
            </div>

            {/* Right: Student Requests */}
            <div>
              <SectionLabel>Student Requests</SectionLabel>
              <div className="bg-bg-white rounded-[25px] p-6 mt-4 space-y-3">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="px-5 py-4 rounded-[14px] bg-bg-page/50"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-text-heading">
                          {req.studentName}{" "}
                          <span className="text-text-muted font-normal text-xs">
                            ({req.rollNo})
                          </span>
                        </p>
                        <p className="text-xs text-text-muted mt-0.5">
                          {req.purpose} · {req.requestedSlot}
                        </p>
                      </div>
                      <span className="text-[10px] text-text-muted">{req.date}</span>
                    </div>

                    {req.status === "pending" ? (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleRequest(req.id, "approved")}
                          className="flex-1 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600 transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRequest(req.id, "rejected")}
                          className="flex-1 py-1.5 rounded-full bg-red-100 text-red-600 text-xs font-medium hover:bg-red-200 transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            req.status === "approved"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="mt-10">
            <SectionLabel>Post Announcement</SectionLabel>
            <div className="bg-bg-white rounded-[25px] p-6 mt-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newAnnouncement}
                  onChange={(e) => setNewAnnouncement(e.target.value)}
                  placeholder="Type your announcement..."
                  className="flex-1 px-5 py-3 rounded-[14px] bg-bg-page text-sm text-text-body outline-none focus:ring-2 focus:ring-accent-blue/30 placeholder:text-text-muted"
                />
                <button
                  onClick={() => {
                    if (newAnnouncement.trim()) {
                      setNewAnnouncement("");
                      alert("Announcement posted: " + newAnnouncement);
                    }
                  }}
                  className="px-6 py-3 rounded-[14px] bg-accent-blue text-white text-sm font-medium hover:bg-accent-blue/90 transition-colors cursor-pointer"
                >
                  Post
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {announcements.map((ann) => (
                  <div key={ann.id} className="flex items-center justify-between px-4 py-3 rounded-[10px] bg-bg-page/50">
                    <div>
                      <p className="text-sm text-text-body">{ann.title}</p>
                      <p className="text-[10px] text-text-muted mt-0.5">To: {ann.audience}</p>
                    </div>
                    <span className="text-[10px] text-text-muted">{ann.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

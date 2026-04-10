"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SectionLabel from "@/components/ui/SectionLabel";

interface SubmittedIssue {
  id: string;
  category: string;
  location: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "submitted" | "under-review" | "resolved";
  date: string;
}

const myIssues: SubmittedIssue[] = [
  {
    id: "MY-003",
    category: "Water Cooler",
    location: "AB-1, Ground Floor, near AB-121",
    description: "Water has a bad metallic taste. Multiple students are affected.",
    priority: "high",
    status: "under-review",
    date: "Today, 2:30 PM",
  },
  {
    id: "MY-002",
    category: "Library",
    location: "AB-2, Seat Row 3",
    description: "Chair is broken, wobbles and unsafe to sit on.",
    priority: "medium",
    status: "resolved",
    date: "Yesterday, 11:00 AM",
  },
  {
    id: "MY-001",
    category: "Playground",
    location: "Basketball Court A",
    description: "Court lights are not working for evening games.",
    priority: "low",
    status: "resolved",
    date: "3 days ago",
  },
];

const categories = [
  { value: "cooler", label: "Water Cooler", icon: "🚰" },
  { value: "library", label: "Library", icon: "📚" },
  { value: "playground", label: "Playground", icon: "🏀" },
  { value: "health", label: "Health Room", icon: "🏥" },
  { value: "faculty", label: "Faculty Room", icon: "👨‍🏫" },
  { value: "other", label: "Other", icon: "📋" },
];

const priorityOptions = [
  { value: "low", label: "Low", color: "#66BB6A" },
  { value: "medium", label: "Medium", color: "#FFA726" },
  { value: "high", label: "High", color: "#EF5350" },
];

const statusConfig = {
  submitted: { bg: "#E3F2FD", text: "#1976D2", label: "Submitted" },
  "under-review": { bg: "#FFF8E1", text: "#F57F17", label: "Under Review" },
  resolved: { bg: "#E8F5E9", text: "#2E7D32", label: "Resolved" },
};

export default function ReportPage() {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [issues, setIssues] = useState(myIssues);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!category || !location || !description) return;

    const newIssue: SubmittedIssue = {
      id: `MY-${String(issues.length + 1).padStart(3, "0")}`,
      category: categories.find((c) => c.value === category)?.label || category,
      location,
      description,
      priority: priority as "high" | "medium" | "low",
      status: "submitted",
      date: "Just now",
    };

    setIssues([newIssue, ...issues]);
    setCategory("");
    setLocation("");
    setDescription("");
    setPriority("medium");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header title="Report an Issue" />
        <main className="flex-1 bg-bg-page px-4 pt-6 pb-8 lg:px-10 lg:py-8 overflow-y-auto w-full max-w-full">
          {/* Success toast */}
          {submitted && (
            <div
              className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-6 py-3 rounded-[14px] text-sm font-medium shadow-lg"
              style={{ animation: "slideInRight 0.3s ease-out" }}
            >
              ✅ Issue submitted successfully!
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left: Report Form (3 cols) */}
            <div className="lg:col-span-3">
              <SectionLabel>Submit New Issue</SectionLabel>
              <div className="bg-bg-white rounded-[25px] p-8 mt-4">
                {/* Category select */}
                <label className="block text-sm font-medium text-text-heading mb-2">
                  Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-[12px] text-sm text-left transition-all cursor-pointer ${
                        category === cat.value
                          ? "bg-accent-blue/10 ring-2 ring-accent-blue/40 text-accent-blue font-medium"
                          : "bg-bg-page text-text-body hover:bg-bg-page/80"
                      }`}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Location */}
                <label className="block text-sm font-medium text-text-heading mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. AB-1, Ground Floor, near room 121"
                  className="w-full px-4 py-3 rounded-[12px] bg-bg-page text-sm text-text-body outline-none focus:ring-2 focus:ring-accent-blue/30 mb-6 placeholder:text-text-muted"
                />

                {/* Description */}
                <label className="block text-sm font-medium text-text-heading mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue in detail..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-[12px] bg-bg-page text-sm text-text-body outline-none focus:ring-2 focus:ring-accent-blue/30 mb-6 placeholder:text-text-muted resize-none"
                />

                {/* Priority */}
                <label className="block text-sm font-medium text-text-heading mb-2">
                  Priority
                </label>
                <div className="flex flex-wrap gap-3 mb-8">
                  {priorityOptions.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setPriority(p.value)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-sm transition-all cursor-pointer ${
                        priority === p.value
                          ? "ring-2 font-medium"
                          : "bg-bg-page text-text-body hover:bg-bg-page/80"
                      }`}
                      style={
                        priority === p.value
                          ? {
                              background: p.color + "18",
                              color: p.color,
                              boxShadow: `0 0 0 2px ${p.color}40`,
                            }
                          : {}
                      }
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: p.color }}
                      />
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={!category || !location || !description}
                  className={`w-full py-3.5 rounded-[14px] text-white text-sm font-semibold transition-all cursor-pointer ${
                    !category || !location || !description
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-accent-blue hover:bg-accent-blue/90 shadow-lg hover:shadow-xl"
                  }`}
                >
                  Submit Report
                </button>
              </div>
            </div>

            {/* Right: My Issues (2 cols) */}
            <div className="lg:col-span-2">
              <SectionLabel>My Reports</SectionLabel>
              <div className="space-y-4 mt-4">
                {issues.map((issue) => {
                  const sc = statusConfig[issue.status];
                  return (
                    <div
                      key={issue.id}
                      className="bg-bg-white rounded-[20px] p-5"
                      style={{
                        boxShadow: "4px 4px 18px -5px rgba(218,221,232,0.8)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-text-muted">
                            {issue.id}
                          </span>
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{
                              background:
                                priorityOptions.find(
                                  (p) => p.value === issue.priority
                                )?.color || "#999",
                            }}
                          />
                        </div>
                        <span
                          className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
                          style={{ background: sc.bg, color: sc.text }}
                        >
                          {sc.label}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-text-heading">
                        {issue.category}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        📍 {issue.location}
                      </p>
                      <p className="text-xs text-text-body mt-2 leading-relaxed">
                        {issue.description}
                      </p>
                      <p className="text-[10px] text-text-muted mt-2">
                        {issue.date}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

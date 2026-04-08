"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import SectionLabel from "@/components/ui/SectionLabel";

/* ─── Mock Admin Data ─── */

interface AdminStat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  color: string;
  icon: string;
}

const stats: AdminStat[] = [
  { label: "Total Students", value: "3,240", change: "+12 this week", trend: "up", color: "#E3F2FD", icon: "🎓" },
  { label: "Active Faculty", value: "156", change: "3 on leave", trend: "neutral", color: "#E8F5E9", icon: "👨‍🏫" },
  { label: "Open Issues", value: "24", change: "-5 from yesterday", trend: "down", color: "#FFF3E0", icon: "⚠️" },
  { label: "Resources Online", value: "89%", change: "+2% this week", trend: "up", color: "#F3E5F5", icon: "✅" },
];

interface RecentIssue {
  id: string;
  title: string;
  category: string;
  status: "open" | "in-progress" | "resolved";
  reporter: string;
  date: string;
  priority: "high" | "medium" | "low";
}

const recentIssues: RecentIssue[] = [
  { id: "ISS-042", title: "Water cooler AB-121 bad taste", category: "Cooler", status: "in-progress", reporter: "Multiple (5+)", date: "Today", priority: "high" },
  { id: "ISS-041", title: "Badminton Court 3 net broken", category: "Playground", status: "open", reporter: "Sports Club", date: "Today", priority: "medium" },
  { id: "ISS-040", title: "Library AB-2 AC not working", category: "Library", status: "in-progress", reporter: "Librarian", date: "Yesterday", priority: "high" },
  { id: "ISS-039", title: "Health Room BH-3 supply shortage", category: "Health", status: "resolved", reporter: "Dr. Priya Iyer", date: "Yesterday", priority: "medium" },
  { id: "ISS-038", title: "Faculty room A14 projector malfunction", category: "Faculty", status: "resolved", reporter: "Prof. Kumar", date: "2 days ago", priority: "low" },
  { id: "ISS-037", title: "Parking area cooler leaking", category: "Cooler", status: "open", reporter: "Security", date: "2 days ago", priority: "medium" },
];

interface ResourceOverview {
  name: string;
  total: number;
  active: number;
  issues: number;
}

const resources: ResourceOverview[] = [
  { name: "Water Coolers", total: 32, active: 25, issues: 3 },
  { name: "Library Seats", total: 250, active: 236, issues: 1 },
  { name: "Health Rooms", total: 5, active: 3, issues: 1 },
  { name: "Playgrounds", total: 10, active: 7, issues: 2 },
  { name: "Faculty Rooms", total: 45, active: 42, issues: 1 },
];

const statusColors = {
  open: { bg: "#FFEBEE", text: "#C62828" },
  "in-progress": { bg: "#FFF8E1", text: "#F57F17" },
  resolved: { bg: "#E8F5E9", text: "#2E7D32" },
};

const priorityColors = {
  high: "#EF5350",
  medium: "#FFA726",
  low: "#66BB6A",
};

export default function AdminPage() {
  const [issueFilter, setIssueFilter] = useState<"all" | "open" | "in-progress" | "resolved">("all");

  const filteredIssues =
    issueFilter === "all"
      ? recentIssues
      : recentIssues.filter((i) => i.status === issueFilter);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header title="Admin Panel" />
        <main className="flex-1 bg-bg-page px-10 py-8 overflow-y-auto">
          {/* Stats row */}
          <SectionLabel>Campus Overview</SectionLabel>
          <div className="grid grid-cols-4 gap-5 mt-6 mb-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[20px] px-6 py-5 flex items-center gap-4"
                style={{
                  background: stat.color,
                  boxShadow: "4px 4px 18px -5px rgba(218,221,232,0.8)",
                }}
              >
                <div className="w-[50px] h-[50px] rounded-full bg-white/60 flex items-center justify-center text-xl shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-text-body">{stat.value}</p>
                  <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
                  <p className={`text-[10px] mt-1 font-medium ${stat.trend === "up" ? "text-emerald-600" : stat.trend === "down" ? "text-red-500" : "text-text-muted"}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Resource Health */}
          <SectionLabel>Resource Health</SectionLabel>
          <div className="bg-bg-white rounded-[25px] px-[30px] pt-3 pb-4 mt-6 mb-10">
            <div className="grid grid-cols-5 gap-4 py-3 text-text-table-header text-sm font-medium">
              <span>Resource</span>
              <span>Total</span>
              <span>Active</span>
              <span>Issues</span>
              <span>Health</span>
            </div>
            <div className="h-px" style={{ backgroundColor: "#E6EFF5" }} />
            {resources.map((r, idx) => {
              const health = Math.round((r.active / r.total) * 100);
              return (
                <div key={r.name}>
                  <div className="grid grid-cols-5 gap-4 py-3 text-text-body text-sm items-center">
                    <span className="font-medium">{r.name}</span>
                    <span>{r.total}</span>
                    <span className="text-emerald-600 font-medium">{r.active}</span>
                    <span className={r.issues > 0 ? "text-red-500 font-medium" : ""}>{r.issues}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${health}%`,
                            background: health > 80 ? "#4CAF50" : health > 50 ? "#FFA726" : "#EF5350",
                          }}
                        />
                      </div>
                      <span className="text-xs text-text-muted w-8">{health}%</span>
                    </div>
                  </div>
                  {idx < resources.length - 1 && <div className="h-px" style={{ backgroundColor: "#F2F4F7" }} />}
                </div>
              );
            })}
          </div>

          {/* Issues Management */}
          <div className="flex items-center justify-between mb-4">
            <SectionLabel>Issue Tracker</SectionLabel>
            <div className="flex gap-2">
              {(["all", "open", "in-progress", "resolved"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setIssueFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    issueFilter === f
                      ? "bg-accent-blue text-white"
                      : "bg-bg-page text-text-muted hover:bg-divider"
                  }`}
                >
                  {f === "all" ? "All" : f === "in-progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-bg-white rounded-[25px] px-[30px] pt-3 pb-4">
            <div className="grid grid-cols-7 gap-3 py-3 text-text-table-header text-sm font-medium">
              <span>ID</span>
              <span className="col-span-2">Issue</span>
              <span>Category</span>
              <span>Reporter</span>
              <span>Date</span>
              <span>Status</span>
            </div>
            <div className="h-px" style={{ backgroundColor: "#E6EFF5" }} />
            {filteredIssues.map((issue, idx) => {
              const sc = statusColors[issue.status];
              return (
                <div key={issue.id}>
                  <div className="grid grid-cols-7 gap-3 py-3 text-text-body text-sm items-center hover:bg-bg-page/40 -mx-[30px] px-[30px] transition-colors cursor-default">
                    <span className="text-text-muted font-mono text-xs">{issue.id}</span>
                    <span className="col-span-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: priorityColors[issue.priority] }} />
                      {issue.title}
                    </span>
                    <span className="text-text-muted">{issue.category}</span>
                    <span className="text-text-muted">{issue.reporter}</span>
                    <span className="text-text-muted">{issue.date}</span>
                    <span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: sc.bg, color: sc.text }}>
                        {issue.status === "in-progress" ? "In Progress" : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                      </span>
                    </span>
                  </div>
                  {idx < filteredIssues.length - 1 && <div className="h-px" style={{ backgroundColor: "#F2F4F7" }} />}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

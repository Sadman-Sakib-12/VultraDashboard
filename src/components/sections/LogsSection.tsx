"use client";

import { useState } from "react";
import { activityLogs } from "@/lib/data";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  ShieldAlert,
  Lock,
  Search as SearchIcon,
  User,
  CheckCircle,
  Zap,
  LogIn,
  Activity,
  Award,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "shield-alert": <ShieldAlert size={14} />,
  lock: <Lock size={14} />,
  search: <SearchIcon size={14} />,
  user: <User size={14} />,
  "check-circle": <CheckCircle size={14} />,
  zap: <Zap size={14} />,
  "log-in": <LogIn size={14} />,
  radar: <Activity size={14} />,
  award: <Award size={14} />,
  activity: <Activity size={14} />,
};

const severityConfig: Record<string, { bg: string; color: string; label: string }> = {
  critical: { bg: "var(--layer-red)", color: "var(--accent-red)", label: "Critical" },
  high: { bg: "rgba(249,115,22,0.12)", color: "#f97316", label: "High" },
  warning: { bg: "var(--layer-orange)", color: "var(--accent-orange)", label: "Warning" },
  medium: { bg: "var(--layer-purple)", color: "var(--accent-purple)", label: "Medium" },
  info: { bg: "var(--layer-blue)", color: "var(--accent-blue)", label: "Info" },
  success: { bg: "var(--layer-green)", color: "var(--accent-green)", label: "Success" },
};

const typeConfig: Record<string, { bg: string; color: string }> = {
  threat: { bg: "var(--layer-red)", color: "var(--accent-red)" },
  auth: { bg: "var(--layer-orange)", color: "var(--accent-orange)" },
  scan: { bg: "var(--layer-blue)", color: "var(--accent-blue)" },
  user: { bg: "var(--layer-purple)", color: "var(--accent-purple)" },
  patch: { bg: "var(--layer-green)", color: "var(--accent-green)" },
};

// Extend logs for demo
const allLogs = [
  ...activityLogs,
  ...activityLogs.map((l) => ({ ...l, id: l.id + 100, time: `${l.id + 8} hr ago` })),
  ...activityLogs.map((l) => ({ ...l, id: l.id + 200, time: `${l.id + 16} hr ago` })),
];

export default function LogsSection() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterSeverity, setFilterSeverity] = useState("All");

  const types = ["All", "threat", "auth", "scan", "user", "patch"];
  const severities = ["All", "critical", "high", "warning", "medium", "info", "success"];

  const filtered = allLogs.filter((log) => {
    const matchSearch = log.message.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.ip.includes(search);
    const matchType = filterType === "All" || log.type === filterType;
    const matchSev = filterSeverity === "All" || log.severity === filterSeverity;
    return matchSearch && matchType && matchSev;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary */}
      <div className="grid grid-cols-3 xl:grid-cols-6 gap-3">
        {Object.entries(severityConfig).map(([key, val]) => {
          const count = allLogs.filter((l) => l.severity === key).length;
          return (
            <div
              key={key}
              className="rounded-xl p-3 cursor-pointer card-hover"
              style={{
                background: filterSeverity === key ? val.bg : "var(--bg-card)",
                border: `1px solid ${filterSeverity === key ? val.color + "40" : "var(--border)"}`,
              }}
              onClick={() => setFilterSeverity(filterSeverity === key ? "All" : key)}
            >
              <div className="text-xl font-bold" style={{ color: val.color }}>
                {count}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                {val.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Log Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        {/* Toolbar */}
        <div
          className="flex flex-wrap items-center gap-3 p-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 flex-1 min-w-[200px]"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            <Search size={14} style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search logs, IPs, users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1"
              style={{ color: "var(--text-primary)" }}
            />
          </div>

          <div className="flex gap-1 flex-wrap">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className="text-xs px-2.5 py-1 rounded-lg transition-colors capitalize"
                style={{
                  background: filterType === t ? "var(--layer-blue)" : "var(--bg-secondary)",
                  color: filterType === t ? "var(--accent-blue)" : "var(--text-secondary)",
                  border: `1px solid ${filterType === t ? "rgba(79,142,247,0.3)" : "var(--border)"}`,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="ml-auto flex gap-2">
            <button
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <RefreshCw size={12} /> Refresh
            </button>
            <button
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <Download size={12} /> Export
            </button>
          </div>
        </div>

        {/* Logs */}
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {filtered.map((log) => {
            const sev = severityConfig[log.severity];
            const typ = typeConfig[log.type];
            return (
              <div
                key={log.id}
                className="flex items-start gap-4 px-4 py-3 transition-colors"
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "transparent")
                }
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center rounded-lg shrink-0 mt-0.5"
                  style={{
                    width: 32,
                    height: 32,
                    background: sev?.bg,
                    color: sev?.color,
                  }}
                >
                  {iconMap[log.icon] || <Activity size={14} />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: "var(--text-primary)" }}>
                    {log.message}
                  </p>
                  <div className="flex items-center gap-4 mt-1 flex-wrap">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      👤 {log.user}
                    </span>
                    <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                      🌐 {log.ip}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      🕐 {log.time}
                    </span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="badge capitalize"
                    style={{ background: typ?.bg, color: typ?.color }}
                  >
                    {log.type}
                  </span>
                  <span
                    className="badge capitalize"
                    style={{ background: sev?.bg, color: sev?.color }}
                  >
                    {log.severity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Showing {filtered.length} of {allLogs.length} events
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, "..."].map((p, i) => (
              <button
                key={i}
                className="w-7 h-7 rounded-lg text-xs font-medium"
                style={{
                  background: p === 1 ? "var(--layer-blue)" : "var(--bg-secondary)",
                  color: p === 1 ? "var(--accent-blue)" : "var(--text-secondary)",
                  border: `1px solid ${p === 1 ? "rgba(79,142,247,0.3)" : "var(--border)"}`,
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}





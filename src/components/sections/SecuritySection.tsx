"use client";

import { useState } from "react";
import { securityInsights, systemHealth } from "@/lib/data";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Filter,
  TrendingUp,
  Lock,
  Unlock,
  Eye,
} from "lucide-react";

const severityConfig: Record<string, { bg: string; color: string; border: string }> = {
  Critical: { bg: "var(--layer-red)", color: "var(--accent-red)", border: "rgba(239,68,68,0.3)" },
  High: { bg: "rgba(249,115,22,0.1)", color: "#f97316", border: "rgba(249,115,22,0.3)" },
  Medium: { bg: "var(--layer-orange)", color: "var(--accent-orange)", border: "rgba(245,158,11,0.3)" },
  Low: { bg: "var(--layer-green)", color: "var(--accent-green)", border: "rgba(16,185,129,0.3)" },
};

const statusConfig: Record<string, { bg: string; color: string }> = {
  Patched: { bg: "var(--layer-green)", color: "var(--accent-green)" },
  Monitoring: { bg: "var(--layer-orange)", color: "var(--accent-orange)" },
  "In Progress": { bg: "var(--layer-blue)", color: "var(--accent-blue)" },
  Open: { bg: "var(--layer-red)", color: "var(--accent-red)" },
};

const threatFeed = [
  { id: 1, type: "APT Group", name: "Lazarus Group", activity: "Active", target: "Financial Sector", confidence: 92 },
  { id: 2, type: "Ransomware", name: "LockBit 3.0", activity: "High", target: "Healthcare", confidence: 87 },
  { id: 3, type: "Botnet", name: "Mirai Variant", activity: "Medium", target: "IoT Devices", confidence: 74 },
  { id: 4, type: "Phishing Kit", name: "EvilProxy", activity: "Active", target: "MFA Bypass", confidence: 95 },
  { id: 5, type: "Exploit Kit", name: "RIG EK", activity: "Low", target: "Browser Vulns", confidence: 61 },
];

export default function SecuritySection() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Critical", "High", "Medium", "Low"];

  const filtered =
    filter === "All"
      ? securityInsights
      : securityInsights.filter((s) => s.severity === filter);

  const counts = {
    Critical: securityInsights.filter((s) => s.severity === "Critical").length,
    High: securityInsights.filter((s) => s.severity === "High").length,
    Medium: securityInsights.filter((s) => s.severity === "Medium").length,
    Patched: securityInsights.filter((s) => s.status === "Patched").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Critical CVEs", value: counts.Critical, icon: <ShieldAlert size={20} />, color: "var(--accent-red)", bg: "var(--layer-red)" },
          { label: "High Severity", value: counts.High, icon: <AlertTriangle size={20} />, color: "#f97316", bg: "rgba(249,115,22,0.1)" },
          { label: "Medium Risk", value: counts.Medium, icon: <TrendingUp size={20} />, color: "var(--accent-orange)", bg: "var(--layer-orange)" },
          { label: "Patched", value: counts.Patched, icon: <ShieldCheck size={20} />, color: "var(--accent-green)", bg: "var(--layer-green)" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl p-5 card-hover"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div
              className="flex items-center justify-center rounded-xl mb-3"
              style={{ width: 44, height: 44, background: card.bg, color: card.color }}
            >
              {card.icon}
            </div>
            <div className="text-2xl font-bold" style={{ color: card.color }}>
              {card.value}
            </div>
            <div className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* CVE Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <div
          className="flex items-center justify-between p-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div>
            <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
              CVE Vulnerability Tracker
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
              Active vulnerabilities affecting your environment
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="text-xs px-2.5 py-1 rounded-lg transition-colors"
                  style={{
                    background: filter === f ? "var(--layer-blue)" : "var(--bg-secondary)",
                    color: filter === f ? "var(--accent-blue)" : "var(--text-secondary)",
                    border: `1px solid ${filter === f ? "rgba(79,142,247,0.3)" : "var(--border)"}`,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <button
              className="flex items-center justify-center rounded-xl"
              style={{
                width: 32,
                height: 32,
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              <RefreshCw size={13} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th className="text-left">CVE ID</th>
                <th className="text-left">Severity</th>
                <th className="text-left">CVSS</th>
                <th className="text-left">Affected System</th>
                <th className="text-left">Description</th>
                <th className="text-left">Status</th>
                <th className="text-left">Discovered</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cve) => (
                <tr key={cve.id} style={{ color: "var(--text-primary)" }}>
                  <td>
                    <span className="font-mono text-xs font-semibold" style={{ color: "var(--accent-blue)" }}>
                      {cve.title}
                    </span>
                  </td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        background: severityConfig[cve.severity]?.bg,
                        color: severityConfig[cve.severity]?.color,
                        border: `1px solid ${severityConfig[cve.severity]?.border}`,
                      }}
                    >
                      {cve.severity}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-bold"
                        style={{
                          color:
                            cve.cvss >= 9
                              ? "var(--accent-red)"
                              : cve.cvss >= 7
                              ? "#f97316"
                              : "var(--accent-orange)",
                        }}
                      >
                        {cve.cvss}
                      </span>
                      <div className="progress-bar w-16">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${(cve.cvss / 10) * 100}%`,
                            background:
                              cve.cvss >= 9
                                ? "var(--accent-red)"
                                : cve.cvss >= 7
                                ? "#f97316"
                                : "var(--accent-orange)",
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {cve.affected}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs" style={{ color: "var(--text-secondary)", maxWidth: 200, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {cve.description}
                    </span>
                  </td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        background: statusConfig[cve.status]?.bg,
                        color: statusConfig[cve.status]?.color,
                      }}
                    >
                      {cve.status}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {cve.discovered}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button
                        className="p-1.5 rounded-lg"
                        style={{ color: "var(--text-muted)" }}
                        title="View details"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg"
                        style={{ color: "var(--text-muted)" }}
                        title="Open NVD"
                      >
                        <ExternalLink size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Threat Intelligence Feed */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                Live Threat Intelligence
              </h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                Active threat actors & campaigns
              </p>
            </div>
            <span
              className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg"
              style={{ background: "var(--layer-green)", color: "var(--accent-green)" }}
            >
              <span className="status-dot status-online" style={{ width: 6, height: 6 }} />
              Live
            </span>
          </div>
          <div className="space-y-3">
            {threatFeed.map((threat) => (
              <div
                key={threat.id}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "var(--bg-secondary)" }}
              >
                <div
                  className="flex items-center justify-center rounded-lg shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background:
                      threat.activity === "Active" || threat.activity === "High"
                        ? "var(--layer-red)"
                        : "var(--layer-orange)",
                    color:
                      threat.activity === "Active" || threat.activity === "High"
                        ? "var(--accent-red)"
                        : "var(--accent-orange)",
                  }}
                >
                  <ShieldAlert size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      {threat.name}
                    </span>
                    <span
                      className="badge"
                      style={{
                        background:
                          threat.activity === "Active" || threat.activity === "High"
                            ? "var(--layer-red)"
                            : "var(--layer-orange)",
                        color:
                          threat.activity === "Active" || threat.activity === "High"
                            ? "var(--accent-red)"
                            : "var(--accent-orange)",
                      }}
                    >
                      {threat.activity}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {threat.type}
                    </span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      Target: {threat.target}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold" style={{ color: "var(--accent-blue)" }}>
                    {threat.confidence}%
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    confidence
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Security Status */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="mb-4">
            <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
              Security Controls Status
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
              Real-time security service health
            </p>
          </div>
          <div className="space-y-3">
            {systemHealth.map((sys) => (
              <div
                key={sys.name}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "var(--bg-secondary)" }}
              >
                <div
                  className="flex items-center justify-center rounded-lg shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background:
                      sys.status === "Operational"
                        ? "var(--layer-green)"
                        : "var(--layer-orange)",
                    color:
                      sys.status === "Operational" ? "var(--accent-green)" : "var(--accent-orange)",
                  }}
                >
                  {sys.status === "Operational" ? <Lock size={16} /> : <Unlock size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {sys.name}
                    </span>
                    <span
                      className="badge"
                      style={{
                        background:
                          sys.status === "Operational"
                            ? "var(--layer-green)"
                            : "var(--layer-orange)",
                        color: sys.status === "Operational" ? "var(--accent-green)" : "var(--accent-orange)",
                      }}
                    >
                      {sys.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="progress-bar flex-1 mr-3">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${sys.load}%`,
                          background:
                            sys.load > 70
                              ? "linear-gradient(90deg, #f59e0b, #ef4444)"
                              : "linear-gradient(90deg, #4f8ef7, #8b5cf6)",
                        }}
                      />
                    </div>
                    <span className="text-xs shrink-0" style={{ color: "var(--text-muted)" }}>
                      {sys.uptime} uptime
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}





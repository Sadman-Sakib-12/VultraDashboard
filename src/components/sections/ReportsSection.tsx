"use client";

import { recentReports } from "@/lib/data";
import {
  FileText,
  Download,
  Eye,
  Plus,
  Clock,
  CheckCircle,
  Loader,
  BarChart3,
  Shield,
  AlertTriangle,
  FileSearch,
} from "lucide-react";

const typeConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  Assessment: { icon: <Shield size={16} />, color: "var(--accent-blue)", bg: "var(--layer-blue)" },
  Pentest: { icon: <AlertTriangle size={16} />, color: "var(--accent-red)", bg: "var(--layer-red)" },
  Scan: { icon: <FileSearch size={16} />, color: "var(--accent-purple)", bg: "var(--layer-purple)" },
  Incident: { icon: <AlertTriangle size={16} />, color: "var(--accent-orange)", bg: "var(--layer-orange)" },
  Compliance: { icon: <CheckCircle size={16} />, color: "var(--accent-green)", bg: "var(--layer-green)" },
};

const reportTemplates = [
  { name: "Security Assessment", desc: "Full security posture evaluation", icon: <Shield size={20} />, color: "var(--accent-blue)" },
  { name: "Penetration Test", desc: "Offensive security test report", icon: <AlertTriangle size={20} />, color: "var(--accent-red)" },
  { name: "Vulnerability Scan", desc: "Automated CVE scan results", icon: <FileSearch size={20} />, color: "var(--accent-purple)" },
  { name: "Compliance Report", desc: "ISO 27001 / SOC2 / GDPR audit", icon: <CheckCircle size={20} />, color: "var(--accent-green)" },
  { name: "Incident Report", desc: "Security incident documentation", icon: <FileText size={20} />, color: "var(--accent-orange)" },
  { name: "Executive Summary", desc: "High-level security overview", icon: <BarChart3 size={20} />, color: "var(--accent-cyan)" },
];

export default function ReportsSection() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Reports", value: "142", color: "var(--accent-blue)", icon: <FileText size={20} /> },
          { label: "Generated This Month", value: "18", color: "var(--accent-green)", icon: <CheckCircle size={20} /> },
          { label: "Pending Generation", value: "3", color: "var(--accent-orange)", icon: <Clock size={20} /> },
          { label: "Scheduled", value: "7", color: "var(--accent-purple)", icon: <BarChart3 size={20} /> },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl p-5 card-hover"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div
              className="flex items-center justify-center rounded-xl mb-3"
              style={{ width: 44, height: 44, background: `${s.color}18`, color: s.color }}
            >
              {s.icon}
            </div>
            <div className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Generate New Report */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
              Generate New Report
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
              Choose a template to get started
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
          {reportTemplates.map((tpl) => (
            <button
              key={tpl.name}
              className="flex items-center gap-3 p-4 rounded-xl text-left transition-all card-hover"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="flex items-center justify-center rounded-xl shrink-0"
                style={{ width: 40, height: 40, background: `${tpl.color}18`, color: tpl.color }}
              >
                {tpl.icon}
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {tpl.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {tpl.desc}
                </div>
              </div>
              <Plus size={14} className="ml-auto shrink-0" style={{ color: "var(--text-muted)" }} />
            </button>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
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
              Recent Reports
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
              Latest generated security reports
            </p>
          </div>
          <button
            className="text-xs px-3 py-1.5 rounded-lg"
            style={{
              background: "var(--layer-blue)",
              color: "var(--accent-blue)",
              border: "1px solid rgba(79,142,247,0.2)",
            }}
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th className="text-left">Report</th>
                <th className="text-left">Type</th>
                <th className="text-left">Generated</th>
                <th className="text-left">Size</th>
                <th className="text-left">Status</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((report) => {
                const tc = typeConfig[report.type];
                return (
                  <tr key={report.id} style={{ color: "var(--text-primary)" }}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div
                          className="flex items-center justify-center rounded-lg shrink-0"
                          style={{ width: 34, height: 34, background: tc?.bg, color: tc?.color }}
                        >
                          {tc?.icon}
                        </div>
                        <span className="text-sm font-medium">{report.title}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{ background: tc?.bg, color: tc?.color }}
                      >
                        {report.type}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                        {report.generated}
                      </span>
                    </td>
                    <td>
                      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                        {report.size}
                      </span>
                    </td>
                    <td>
                      <span
                        className="flex items-center gap-1.5 badge w-fit"
                        style={{
                          background:
                            report.status === "Ready"
                              ? "var(--layer-green)"
                              : "var(--layer-orange)",
                          color: report.status === "Ready" ? "var(--accent-green)" : "var(--accent-orange)",
                        }}
                      >
                        {report.status === "Processing" ? (
                          <Loader size={10} className="animate-spin" />
                        ) : (
                          <CheckCircle size={10} />
                        )}
                        {report.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          className="p-1.5 rounded-lg"
                          style={{ color: "var(--text-muted)" }}
                          title="Preview"
                          disabled={report.status === "Processing"}
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg"
                          style={{ color: "var(--text-muted)" }}
                          title="Download"
                          disabled={report.status === "Processing"}
                        >
                          <Download size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}





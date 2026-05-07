"use client";

import { useEffect, useRef } from "react";
import { X, ShieldAlert, User, CheckCircle, AlertTriangle, Info, Bell } from "lucide-react";
import type { Notification } from "@/lib/types";

// ─── Static data ─────────────────────────────────────────────
const NOTIFICATIONS: Notification[] = [
  {
    id: 1, type: "critical", read: false, time: "2 min ago",
    title:   "Critical Threat Detected",
    message: "Malware found on endpoint EP-0042. Immediate action required.",
  },
  {
    id: 2, type: "warning", read: false, time: "8 min ago",
    title:   "Failed Login Attempts",
    message: "5 failed login attempts from IP 203.0.113.45",
  },
  {
    id: 3, type: "success", read: false, time: "1 hr ago",
    title:   "Patch Applied Successfully",
    message: "CVE-2024-1234 has been patched on all endpoints.",
  },
  {
    id: 4, type: "info", read: true, time: "2 hr ago",
    title:   "New User Registered",
    message: "Yuki Tanaka joined as Security Analyst.",
  },
  {
    id: 5, type: "info", read: true, time: "3 hr ago",
    title:   "Scheduled Scan Complete",
    message: "Weekly vulnerability scan finished. 3 new CVEs found.",
  },
  {
    id: 6, type: "warning", read: true, time: "5 hr ago",
    title:   "SSL Certificate Expiring",
    message: "Certificate for api.vulota.io expires in 7 days.",
  },
];

const TYPE_ICON: Record<Notification["type"], React.ReactNode> = {
  critical: <ShieldAlert size={15} />,
  warning:  <AlertTriangle size={15} />,
  success:  <CheckCircle size={15} />,
  info:     <Info size={15} />,
};

const TYPE_COLOR: Record<Notification["type"], { color: string; bg: string }> = {
  critical: { color: "var(--accent-red)", bg: "var(--layer-red)"   },
  warning:  { color: "var(--accent-orange)", bg: "var(--layer-orange)"  },
  success:  { color: "var(--accent-green)", bg: "var(--layer-green)"  },
  info:     { color: "var(--accent-blue)", bg: "var(--layer-blue)"  },
};

// ─── Props ───────────────────────────────────────────────────
interface NotificationsPanelProps {
  onClose: () => void;
}

// ─── Component ───────────────────────────────────────────────
export default function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const ref   = useRef<HTMLDivElement>(null);
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-12 z-50 w-80 rounded-2xl overflow-hidden animate-slide-down"
      style={{
        background: "var(--bg-card)",
        border:     "1px solid var(--border)",
        boxShadow:  "0 20px 60px rgba(0,0,0,0.4)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <Bell size={15} style={{ color: "var(--accent-blue)" }} />
          <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
            Notifications
          </span>
          {unread > 0 && (
            <span
              className="text-xs font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: "rgba(239,68,68,0.15)", color: "var(--accent-red)" }}
            >
              {unread}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button className="text-xs" style={{ color: "var(--accent-blue)" }}>
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-lg"
            style={{ color: "var(--text-muted)" }}
            aria-label="Close notifications"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="overflow-y-auto" style={{ maxHeight: 380 }}>
        {NOTIFICATIONS.map((n) => {
          const tc = TYPE_COLOR[n.type];
          return (
            <div
              key={n.id}
              className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors"
              style={{
                background:   n.read ? "transparent" : "rgba(79,142,247,0.04)",
                borderBottom: "1px solid var(--border)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  n.read ? "transparent" : "rgba(79,142,247,0.04)")
              }
            >
              <div
                className="flex items-center justify-center rounded-lg shrink-0 mt-0.5"
                style={{ width: 30, height: 30, background: tc.bg, color: tc.color }}
              >
                {TYPE_ICON[n.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                    {n.title}
                  </span>
                  {!n.read && (
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: "var(--accent-blue)" }}
                    />
                  )}
                </div>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {n.message}
                </p>
                <span className="text-xs mt-1 block" style={{ color: "var(--text-muted)" }}>
                  {n.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
        <button
          className="w-full text-xs font-medium py-2 rounded-xl transition-colors"
          style={{
            background: "var(--layer-blue)",
            color:      "var(--accent-blue)",
            border:     "1px solid rgba(79,142,247,0.2)",
          }}
        >
          View All Notifications
        </button>
      </div>
    </div>
  );
}





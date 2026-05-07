// ================================================================
// VULOTA DASHBOARD — UI Constants & Config Maps
// All color values use CSS variables so dark/light theme works.
// ================================================================

export const SEVERITY_CONFIG = {
  critical: { bg: "var(--layer-red)",    color: "var(--accent-red)",    label: "Critical" },
  high:     { bg: "rgba(249,115,22,0.1)",color: "#f97316",              label: "High"     },
  warning:  { bg: "var(--layer-orange)", color: "var(--accent-orange)", label: "Warning"  },
  medium:   { bg: "var(--layer-purple)", color: "var(--accent-purple)", label: "Medium"   },
  info:     { bg: "var(--layer-blue)",   color: "var(--accent-blue)",   label: "Info"     },
  success:  { bg: "var(--layer-green)",  color: "var(--accent-green)",  label: "Success"  },
} as const;

export const CVE_SEVERITY_CONFIG = {
  Critical: { bg: "var(--layer-red)",    color: "var(--accent-red)",    border: "rgba(239,68,68,0.3)"   },
  High:     { bg: "rgba(249,115,22,0.1)",color: "#f97316",              border: "rgba(249,115,22,0.3)"  },
  Medium:   { bg: "var(--layer-orange)", color: "var(--accent-orange)", border: "rgba(245,158,11,0.3)"  },
  Low:      { bg: "var(--layer-green)",  color: "var(--accent-green)",  border: "rgba(16,185,129,0.3)"  },
} as const;

export const CVE_STATUS_CONFIG = {
  Patched:      { bg: "var(--layer-green)",  color: "var(--accent-green)"  },
  Monitoring:   { bg: "var(--layer-orange)", color: "var(--accent-orange)" },
  "In Progress":{ bg: "var(--layer-blue)",   color: "var(--accent-blue)"   },
  Open:         { bg: "var(--layer-red)",    color: "var(--accent-red)"    },
} as const;

export const ROLE_CONFIG = {
  Admin:              { bg: "var(--layer-red)",    color: "var(--accent-red)"    },
  Analyst:            { bg: "var(--layer-blue)",   color: "var(--accent-blue)"   },
  "Security Engineer":{ bg: "var(--layer-purple)", color: "var(--accent-purple)" },
  Viewer:             { bg: "rgba(107,114,128,0.1)",color: "#9ca3af"             },
} as const;

export const USER_STATUS_CONFIG = {
  Active:    { color: "var(--accent-green)", glow: "0 0 6px var(--accent-green)" },
  Inactive:  { color: "#6b7280",             glow: "none"                        },
  Suspended: { color: "var(--accent-red)",   glow: "0 0 6px var(--accent-red)"   },
} as const;

export const LOG_TYPE_CONFIG = {
  threat: { bg: "var(--layer-red)",    color: "var(--accent-red)"    },
  auth:   { bg: "var(--layer-orange)", color: "var(--accent-orange)" },
  scan:   { bg: "var(--layer-blue)",   color: "var(--accent-blue)"   },
  user:   { bg: "var(--layer-purple)", color: "var(--accent-purple)" },
  patch:  { bg: "var(--layer-green)",  color: "var(--accent-green)"  },
} as const;

export const REPORT_TYPE_CONFIG = {
  Assessment: { color: "var(--accent-blue)",   bg: "var(--layer-blue)"   },
  Pentest:    { color: "var(--accent-red)",    bg: "var(--layer-red)"    },
  Scan:       { color: "var(--accent-purple)", bg: "var(--layer-purple)" },
  Incident:   { color: "var(--accent-orange)", bg: "var(--layer-orange)" },
  Compliance: { color: "var(--accent-green)",  bg: "var(--layer-green)"  },
} as const;

export const SECTION_META: Record<string, { title: string; subtitle: string }> = {
  dashboard:     { title: "Dashboard Overview",    subtitle: "Welcome back, Alex 👋"                 },
  analytics:     { title: "Analytics",             subtitle: "Traffic & activity insights"           },
  users:         { title: "User Management",       subtitle: "Manage team members & permissions"     },
  reports:       { title: "Reports",               subtitle: "Security reports & exports"            },
  security:      { title: "Security Insights",     subtitle: "Vulnerabilities & threat intelligence" },
  logs:          { title: "Activity Logs",         subtitle: "Real-time system events"               },
  threats:       { title: "Threat Intelligence",   subtitle: "Live threat feed"                      },
  notifications: { title: "Notifications",         subtitle: "Alerts & updates"                      },
  settings:      { title: "Settings",              subtitle: "Platform configuration"                },
  help:          { title: "Help & Support",        subtitle: "Documentation & support"               },
};

export const ACCENT_COLORS = [
  { name: "Blue",   value: "#4f8ef7" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Green",  value: "#10b981" },
  { name: "Red",    value: "#ef4444" },
  { name: "Orange", value: "#f59e0b" },
  { name: "Cyan",   value: "#06b6d4" },
] as const;

// Chart colors — same in both themes (accent colors don't change)
export const CHART_COLORS = {
  traffic: "#4f8ef7",
  attacks: "#ef4444",
  blocked: "#10b981",
  purple:  "#8b5cf6",
  cyan:    "#06b6d4",
  orange:  "#f59e0b",
} as const;

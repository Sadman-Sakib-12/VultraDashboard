// ============================================================
// VULOTA DASHBOARD — Shared TypeScript Types
// ============================================================

export interface StatCard {
  id: number;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
  color: "red" | "blue" | "green" | "orange";
  description: string;
}

export interface TrafficDataPoint {
  name: string;
  traffic: number;
  attacks: number;
  blocked: number;
}

export interface ThreatDistributionItem {
  name: string;
  value: number;
  color: string;
}

export interface WeeklyActivityPoint {
  day: string;
  scans: number;
  incidents: number;
  resolved: number;
}

export interface SystemHealthItem {
  name: string;
  status: "Operational" | "Degraded" | "Down";
  uptime: string;
  load: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Analyst" | "Security Engineer" | "Viewer";
  status: "Active" | "Inactive" | "Suspended";
  lastLogin: string;
  threats: number;
  avatar: string;
  avatarColor: string;
  location: string;
  joined: string;
}

export interface ActivityLog {
  id: number;
  type: "threat" | "auth" | "scan" | "user" | "patch";
  severity: "critical" | "high" | "warning" | "medium" | "info" | "success";
  message: string;
  user: string;
  time: string;
  ip: string;
  icon: string;
}

export interface SecurityInsight {
  id: number;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  cvss: number;
  affected: string;
  status: "Patched" | "Monitoring" | "In Progress" | "Open";
  discovered: string;
  description: string;
}

export interface Report {
  id: number;
  title: string;
  type: "Assessment" | "Pentest" | "Scan" | "Incident" | "Compliance";
  generated: string;
  size: string;
  status: "Ready" | "Processing";
}

export interface Notification {
  id: number;
  type: "critical" | "warning" | "success" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export type SectionId =
  | "dashboard"
  | "analytics"
  | "users"
  | "reports"
  | "security"
  | "logs"
  | "threats"
  | "notifications"
  | "settings"
  | "help";

export interface NavItem {
  label: string;
  section: SectionId;
  badge?: number;
}

export interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

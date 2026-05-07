"use client";

import { useState } from "react";
import {
  LayoutDashboard, BarChart3, Users, FileText, ShieldAlert,
  Settings, Bell, ChevronLeft, ChevronRight, Shield, LogOut,
  HelpCircle, Activity, Zap, X,
} from "lucide-react";
import type { NavItem, SectionId } from "@/lib/types";

// ─── Nav config ──────────────────────────────────────────────
const PRIMARY_NAV: NavItem[] = [
  { label: "Dashboard",         section: "dashboard"  },
  { label: "Analytics",         section: "analytics"  },
  { label: "User Management",   section: "users"      },
  { label: "Reports",           section: "reports"    },
  { label: "Security Insights", section: "security",  badge: 3  },
  { label: "Activity Logs",     section: "logs"       },
  { label: "Threat Intel",      section: "threats",   badge: 12 },
];

const BOTTOM_NAV: NavItem[] = [
  { label: "Notifications", section: "notifications", badge: 5 },
  { label: "Settings",      section: "settings"                },
  { label: "Help & Support",section: "help"                    },
];

const NAV_ICONS: Record<SectionId, React.ReactNode> = {
  dashboard:     <LayoutDashboard size={18} />,
  analytics:     <BarChart3 size={18} />,
  users:         <Users size={18} />,
  reports:       <FileText size={18} />,
  security:      <ShieldAlert size={18} />,
  logs:          <Activity size={18} />,
  threats:       <Zap size={18} />,
  notifications: <Bell size={18} />,
  settings:      <Settings size={18} />,
  help:          <HelpCircle size={18} />,
};

// ─── Props ───────────────────────────────────────────────────
interface SidebarProps {
  activeSection: SectionId;
  onNavigate:    (section: SectionId) => void;
  mobileOpen:    boolean;
  onMobileClose: () => void;
}

// ─── NavButton ───────────────────────────────────────────────
function NavButton({
  item, isActive, collapsed, badgeVariant, onClick,
}: {
  item:         NavItem;
  isActive:     boolean;
  collapsed:    boolean;
  badgeVariant: "blue" | "red";
  onClick:      () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={`w-full flex items-center gap-3 rounded-xl transition-all duration-200 text-left ${isActive ? "nav-active" : ""}`}
      style={{
        padding:        collapsed ? "10px 0" : "10px 12px",
        justifyContent: collapsed ? "center" : "flex-start",
        color:          isActive ? "var(--accent-blue)" : "var(--text-secondary)",
        background:     isActive ? "rgba(79,142,247,0.08)" : "transparent",
      }}
    >
      <span className="shrink-0">{NAV_ICONS[item.section]}</span>

      {!collapsed && (
        <>
          <span className="text-sm font-medium flex-1">{item.label}</span>
          {item.badge && (
            <span
              className="text-xs font-bold rounded-full px-2 py-0.5"
              style={{
                background: badgeVariant === "blue"
                  ? "var(--layer-blue)"
                  : "rgba(239,68,68,0.15)",
                color: badgeVariant === "blue"
                  ? "var(--accent-blue)"
                  : "var(--accent-red)",
              }}
            >
              {item.badge}
            </span>
          )}
        </>
      )}
    </button>
  );
}

// ─── Sidebar inner content ───────────────────────────────────
function SidebarContent({
  activeSection, onNavigate, collapsed, setCollapsed, onMobileClose,
}: {
  activeSection: SectionId;
  onNavigate:    (s: SectionId) => void;
  collapsed:     boolean;
  setCollapsed:  (v: boolean) => void;
  onMobileClose: () => void;
}) {
  const handleNav = (section: SectionId) => {
    onNavigate(section);
    onMobileClose();
  };

  return (
    <aside
      className="flex flex-col h-full transition-all duration-300"
      style={{
        width:       collapsed ? 72 : 260,
        background:  "var(--bg-secondary)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* ── Logo ── */}
      <div
        className="flex items-center gap-3 px-4 py-5 shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="flex items-center justify-center rounded-xl shrink-0"
          style={{
            width:     40,
            height:    40,
            background:"linear-gradient(135deg, #4f8ef7, #8b5cf6)",
            boxShadow: "0 4px 15px rgba(79,142,247,0.4)",
          }}
        >
          <Shield size={20} color="white" />
        </div>

        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="font-bold text-base tracking-wide" style={{ color: "var(--text-primary)" }}>
              VULOTA
            </p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Security Platform
            </p>
          </div>
        )}

        {/* Desktop collapse */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center rounded-lg shrink-0 transition-colors"
          style={{
            width:      28,
            height:     28,
            background: "var(--bg-card)",
            color:      "var(--text-secondary)",
            border:     "1px solid var(--border)",
          }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Mobile close */}
        <button
          onClick={onMobileClose}
          className="flex md:hidden items-center justify-center rounded-lg shrink-0"
          style={{
            width:      28,
            height:     28,
            background: "var(--bg-card)",
            color:      "var(--text-secondary)",
            border:     "1px solid var(--border)",
          }}
        >
          <X size={14} />
        </button>
      </div>

      {/* ── Section label ── */}
      {!collapsed && (
        <div className="px-4 pt-5 pb-2 shrink-0">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            Main Menu
          </span>
        </div>
      )}

      {/* ── Primary nav ── */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {PRIMARY_NAV.map((item) => (
          <NavButton
            key={item.section}
            item={item}
            isActive={activeSection === item.section}
            collapsed={collapsed}
            badgeVariant="blue"
            onClick={() => handleNav(item.section)}
          />
        ))}
      </nav>

      <div style={{ borderTop: "1px solid var(--border)", margin: "0 12px" }} />

      {/* ── Bottom nav ── */}
      <div className="px-2 py-3 space-y-1 shrink-0">
        {BOTTOM_NAV.map((item) => (
          <NavButton
            key={item.section}
            item={item}
            isActive={activeSection === item.section}
            collapsed={collapsed}
            badgeVariant="red"
            onClick={() => handleNav(item.section)}
          />
        ))}
      </div>

      {/* ── User profile ── */}
      <div className="p-3 shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
        <div
          className="flex items-center gap-3 rounded-xl p-2 cursor-pointer"
          style={{ background: "var(--bg-card)" }}
        >
          <div
            className="flex items-center justify-center rounded-full shrink-0 text-xs font-bold text-white"
            style={{
              width:      34,
              height:     34,
              background: "linear-gradient(135deg, #4f8ef7, #8b5cf6)",
            }}
          >
            AJ
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                  Alex Johnson
                </p>
                <p className="text-xs truncate" style={{ color: "var(--text-secondary)" }}>
                  Administrator
                </p>
              </div>
              <LogOut size={15} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

// ─── Main export ─────────────────────────────────────────────
export default function Sidebar({ activeSection, onNavigate, mobileOpen, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex h-screen sticky top-0">
        <SidebarContent
          activeSection={activeSection}
          onNavigate={onNavigate}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onMobileClose={onMobileClose}
        />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="mobile-overlay md:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 left-0 h-full z-40 md:hidden transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: 260 }}
      >
        <SidebarContent
          activeSection={activeSection}
          onNavigate={onNavigate}
          collapsed={false}
          setCollapsed={() => {}}
          onMobileClose={onMobileClose}
        />
      </div>
    </>
  );
}





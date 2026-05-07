"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar  from "@/components/layout/Topbar";
import { useTheme } from "@/hooks/useTheme";
import { DashboardSkeleton } from "@/components/ui/SkeletonLoader";

import DashboardSection from "@/components/sections/DashboardSection";
import AnalyticsSection from "@/components/sections/AnalyticsSection";
import UsersSection     from "@/components/sections/UsersSection";
import ReportsSection   from "@/components/sections/ReportsSection";
import SecuritySection  from "@/components/sections/SecuritySection";
import LogsSection      from "@/components/sections/LogsSection";
import SettingsSection  from "@/components/sections/SettingsSection";

import type { SectionId } from "@/lib/types";

// ─── Coming Soon placeholder ─────────────────────────────────
function ComingSoon({ section }: { section: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center h-64 rounded-2xl animate-fade-in"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
    >
      <div className="text-5xl mb-4">🚧</div>
      <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
        Coming Soon
      </h3>
      <p className="text-sm mt-1 capitalize" style={{ color: "var(--text-secondary)" }}>
        {section} section is under development
      </p>
    </div>
  );
}

// ─── Section router ──────────────────────────────────────────
function SectionContent({ section }: { section: SectionId }) {
  switch (section) {
    case "dashboard":     return <DashboardSection />;
    case "analytics":     return <AnalyticsSection />;
    case "users":         return <UsersSection />;
    case "reports":       return <ReportsSection />;
    case "security":      return <SecuritySection />;
    case "logs":          return <LogsSection />;
    case "settings":      return <SettingsSection />;
    default:              return <ComingSoon section={section} />;
  }
}

// ─── Root page ───────────────────────────────────────────────
export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleNavigate = (section: SectionId) => {
    if (section === activeSection) return;
    setLoading(true);
    setActiveSection(section);
    // Brief skeleton flash for perceived performance
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg-primary)" }}>

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Topbar
          activeSection={activeSection}
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
          isDark={isDark}
          onThemeToggle={toggleTheme}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {loading
            ? <DashboardSkeleton />
            : <SectionContent section={activeSection} />
          }
        </main>
      </div>

    </div>
  );
}




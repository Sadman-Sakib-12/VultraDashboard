"use client";

import { useState, useCallback } from "react";
import { Bell, Search, RefreshCw, Moon, Sun, ChevronDown, Menu } from "lucide-react";
import NotificationsPanel from "@/components/panels/NotificationsPanel";
import { SECTION_META } from "@/lib/constants";
import type { SectionId } from "@/lib/types";

interface TopbarProps {
  activeSection:       SectionId;
  onMobileMenuToggle:  () => void;
  isDark:              boolean;
  onThemeToggle:       () => void;
}

export default function Topbar({ activeSection, onMobileMenuToggle, isDark, onThemeToggle }: TopbarProps) {
  const [searchFocused,      setSearchFocused]      = useState(false);
  const [showNotifications,  setShowNotifications]  = useState(false);
  const [isRefreshing,       setIsRefreshing]       = useState(false);

  const meta = SECTION_META[activeSection] ?? SECTION_META.dashboard;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 900);
  };

  const closeNotifications = useCallback(() => setShowNotifications(false), []);

  return (
    <header
      className="flex items-center gap-3 px-4 md:px-6 py-4 sticky top-0 z-30"
      style={{
        background:    isDark ? "rgba(15,17,23,0.88)" : "rgba(240,242,245,0.92)",
        backdropFilter:"blur(14px)",
        borderBottom:  "1px solid var(--border)",
      }}
    >
      {/* Mobile hamburger */}
      <button
        onClick={onMobileMenuToggle}
        aria-label="Open menu"
        className="flex items-center justify-center rounded-xl md:hidden shrink-0"
        style={{
          width:      38,
          height:     38,
          background: "var(--bg-card)",
          border:     "1px solid var(--border)",
          color:      "var(--text-secondary)",
        }}
      >
        <Menu size={16} />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-base md:text-lg font-bold truncate" style={{ color: "var(--text-primary)" }}>
          {meta.title}
        </h1>
        <p className="text-xs hidden sm:block" style={{ color: "var(--text-secondary)" }}>
          {meta.subtitle}
        </p>
      </div>

      {/* Search */}
      <div
        className="hidden md:flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-200"
        style={{
          background: "var(--bg-card)",
          border:     `1px solid ${searchFocused ? "var(--accent-blue)" : "var(--border)"}`,
          width:      searchFocused ? 260 : 200,
        }}
      >
        <Search size={14} style={{ color: "var(--text-muted)" }} />
        <input
          type="text"
          placeholder="Search threats, users..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="bg-transparent outline-none text-sm flex-1"
          style={{ color: "var(--text-primary)" }}
        />
        <kbd
          className="text-xs px-1.5 py-0.5 rounded hidden lg:block"
          style={{ background: "var(--bg-hover)", color: "var(--text-muted)", fontSize: 10 }}
        >
          ⌘K
        </kbd>
      </div>

      {/* Refresh */}
      <button
        onClick={handleRefresh}
        aria-label="Refresh data"
        className="flex items-center justify-center rounded-xl transition-colors shrink-0"
        style={{
          width:      38,
          height:     38,
          background: "var(--bg-card)",
          border:     "1px solid var(--border)",
          color:      "var(--text-secondary)",
        }}
      >
        <RefreshCw size={15} className={isRefreshing ? "animate-spin" : ""} />
      </button>

      {/* Theme toggle */}
      <button
        onClick={onThemeToggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="flex items-center justify-center rounded-xl transition-all shrink-0"
        style={{
          width:      38,
          height:     38,
          background: isDark ? "var(--layer-orange)" : "var(--layer-blue)",
          border:     `1px solid ${isDark ? "rgba(245,158,11,0.2)" : "rgba(79,142,247,0.2)"}`,
          color:      isDark ? "var(--accent-orange)" : "var(--accent-blue)",
        }}
      >
        {isDark ? <Sun size={15} /> : <Moon size={15} />}
      </button>

      {/* Notifications */}
      <div className="relative shrink-0">
        <button
          onClick={() => setShowNotifications((v) => !v)}
          aria-label="Notifications"
          className="relative flex items-center justify-center rounded-xl transition-colors"
          style={{
            width:      38,
            height:     38,
            background: showNotifications ? "var(--layer-blue)" : "var(--bg-card)",
            border:     `1px solid ${showNotifications ? "rgba(79,142,247,0.3)" : "var(--border)"}`,
            color:      showNotifications ? "var(--accent-blue)" : "var(--text-secondary)",
          }}
        >
          <Bell size={15} />
          <span
            className="absolute top-1.5 right-1.5 rounded-full"
            style={{
              width:      8,
              height:     8,
              background: "var(--accent-red)",
              border:     "2px solid var(--bg-primary)",
            }}
          />
        </button>

        {showNotifications && (
          <NotificationsPanel onClose={closeNotifications} />
        )}
      </div>

      {/* Profile */}
      <button
        className="flex items-center gap-2 rounded-xl px-2 md:px-3 py-2 transition-colors shrink-0"
        style={{
          background: "var(--bg-card)",
          border:     "1px solid var(--border)",
        }}
      >
        <div
          className="flex items-center justify-center rounded-full text-xs font-bold text-white"
          style={{
            width:      26,
            height:     26,
            background: "linear-gradient(135deg, #4f8ef7, #8b5cf6)",
          }}
        >
          AJ
        </div>
        <span className="text-sm font-medium hidden lg:block" style={{ color: "var(--text-primary)" }}>
          Alex J.
        </span>
        <ChevronDown size={13} className="hidden lg:block" style={{ color: "var(--text-muted)" }} />
      </button>
    </header>
  );
}





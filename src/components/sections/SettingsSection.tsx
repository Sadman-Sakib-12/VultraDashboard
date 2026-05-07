"use client";

import { useState } from "react";
import {
  User, Bell, Shield, Palette, Globe,
  Key, Mail, Smartphone, Monitor,
  Moon, Sun, Check, ChevronRight,
  Eye, EyeOff,
} from "lucide-react";
import Toggle from "@/components/ui/Toggle";

const settingsTabs = [
  { id: "profile", label: "Profile", icon: <User size={15} /> },
  { id: "security", label: "Security", icon: <Shield size={15} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={15} /> },
  { id: "appearance", label: "Appearance", icon: <Palette size={15} /> },
  { id: "integrations", label: "Integrations", icon: <Globe size={15} /> },
];

export default function SettingsSection() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [notifSettings, setNotifSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    criticalThreats: true,
    weeklyReport: true,
    loginAlerts: true,
    patchUpdates: false,
    systemHealth: true,
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "dark",
    compactMode: false,
    animations: true,
    sidebarCollapsed: false,
  });

  const toggleNotif = (key: keyof typeof notifSettings) => {
    setNotifSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const accentColors = [
    { name: "Blue", value: "var(--accent-blue)" },
    { name: "Purple", value: "var(--accent-purple)" },
    { name: "Green", value: "var(--accent-green)" },
    { name: "Red", value: "var(--accent-red)" },
    { name: "Orange", value: "var(--accent-orange)" },
    { name: "Cyan", value: "var(--accent-cyan)" },
  ];
  const [selectedAccent, setSelectedAccent] = useState("var(--accent-blue)");

  return (
    <div className="animate-fade-in">
      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div
          className="rounded-2xl p-2 shrink-0"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            width: 200,
            alignSelf: "flex-start",
          }}
        >
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all mb-1"
              style={{
                background:
                  activeTab === tab.id ? "var(--layer-blue)" : "transparent",
                color:
                  activeTab === tab.id
                    ? "var(--accent-blue)"
                    : "var(--text-secondary)",
                borderLeft: activeTab === tab.id
                  ? "2px solid var(--accent-blue)"
                  : "2px solid transparent",
              }}
            >
              {tab.icon}
              <span className="text-sm font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <ChevronRight size={13} className="ml-auto" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <>
              <div
                className="rounded-2xl p-5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>
                  Profile Information
                </h3>
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="flex items-center justify-center rounded-2xl text-xl font-bold text-white"
                    style={{
                      width: 72,
                      height: 72,
                      background: "linear-gradient(135deg, #4f8ef7, #8b5cf6)",
                      boxShadow: "0 4px 20px rgba(79,142,247,0.4)",
                    }}
                  >
                    AJ
                  </div>
                  <div>
                    <button
                      className="text-xs px-3 py-1.5 rounded-lg font-medium"
                      style={{
                        background: "var(--layer-blue)",
                        color: "var(--accent-blue)",
                        border: "1px solid rgba(79,142,247,0.2)",
                      }}
                    >
                      Change Avatar
                    </button>
                    <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "First Name", value: "Alex", type: "text" },
                    { label: "Last Name", value: "Johnson", type: "text" },
                    { label: "Email Address", value: "alex.johnson@vulota.io", type: "email" },
                    { label: "Phone Number", value: "+1 (555) 000-0000", type: "tel" },
                    { label: "Job Title", value: "Security Administrator", type: "text" },
                    { label: "Department", value: "Cybersecurity", type: "text" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label
                        className="block text-xs font-medium mb-1.5"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        defaultValue={field.value}
                        className="w-full px-3 py-2 rounded-xl text-sm outline-none transition-all"
                        style={{
                          background: "var(--bg-secondary)",
                          border: "1px solid var(--border)",
                          color: "var(--text-primary)",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "var(--accent-blue)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "var(--border)")
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl p-5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>
                  Change Password
                </h3>
                <div className="space-y-3 max-w-md">
                  {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                    <div key={label}>
                      <label
                        className="block text-xs font-medium mb-1.5"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {label}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full px-3 py-2 pr-10 rounded-xl text-sm outline-none"
                          style={{
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--border)",
                            color: "var(--text-primary)",
                          }}
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div
              className="rounded-2xl p-5 space-y-5"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                Security Settings
              </h3>

              {/* 2FA */}
              <div
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-xl"
                    style={{ width: 40, height: 40, background: "var(--layer-green)", color: "var(--accent-green)" }}
                  >
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      Two-Factor Authentication
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      Add an extra layer of security to your account
                    </div>
                  </div>
                </div>
                <span
                  className="badge"
                  style={{ background: "var(--layer-green)", color: "var(--accent-green)" }}
                >
                  Enabled
                </span>
              </div>

              {/* Active Sessions */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                  Active Sessions
                </h4>
                {[
                  { device: "Chrome on Windows", location: "New York, US", current: true, time: "Now" },
                  { device: "Safari on iPhone", location: "New York, US", current: false, time: "2 hr ago" },
                  { device: "Firefox on macOS", location: "London, UK", current: false, time: "1 day ago" },
                ].map((session, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl mb-2"
                    style={{ background: "var(--bg-secondary)" }}
                  >
                    <div className="flex items-center gap-3">
                      <Monitor size={16} style={{ color: "var(--text-secondary)" }} />
                      <div>
                        <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          {session.device}
                          {session.current && (
                            <span
                              className="ml-2 badge"
                              style={{ background: "var(--layer-green)", color: "var(--accent-green)" }}
                            >
                              Current
                            </span>
                          )}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {session.location} · {session.time}
                        </div>
                      </div>
                    </div>
                    {!session.current && (
                      <button
                        className="text-xs px-2 py-1 rounded-lg"
                        style={{ background: "var(--layer-red)", color: "var(--accent-red)" }}
                      >
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* API Keys */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                  API Keys
                </h4>
                <div
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  <div className="flex items-center gap-3">
                    <Key size={15} style={{ color: "var(--accent-blue)" }} />
                    <div>
                      <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        Production API Key
                      </div>
                      <div className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                        vlt_••••••••••••••••4f2a
                      </div>
                    </div>
                  </div>
                  <button
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{
                      background: "var(--layer-blue)",
                      color: "var(--accent-blue)",
                    }}
                  >
                    Regenerate
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div
              className="rounded-2xl p-5"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <h3 className="font-semibold text-sm mb-5" style={{ color: "var(--text-primary)" }}>
                Notification Preferences
              </h3>

              <div className="space-y-1">
                {/* Channels */}
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                  Channels
                </h4>
                {[
                  { key: "emailAlerts", label: "Email Alerts", desc: "Receive alerts via email", icon: <Mail size={15} /> },
                  { key: "smsAlerts", label: "SMS Alerts", desc: "Receive alerts via SMS", icon: <Smartphone size={15} /> },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-3 rounded-xl mb-2"
                    style={{ background: "var(--bg-secondary)" }}
                  >
                    <div className="flex items-center gap-3">
                      <span style={{ color: "var(--text-secondary)" }}>{item.icon}</span>
                      <div>
                        <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          {item.label}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <Toggle
                      enabled={notifSettings[item.key as keyof typeof notifSettings]}
                      onChange={() => toggleNotif(item.key as keyof typeof notifSettings)}
                    />
                  </div>
                ))}

                {/* Alert Types */}
                <h4 className="text-xs font-semibold uppercase tracking-wider mt-5 mb-3" style={{ color: "var(--text-muted)" }}>
                  Alert Types
                </h4>
                {[
                  { key: "criticalThreats", label: "Critical Threats", desc: "Immediate threat notifications" },
                  { key: "weeklyReport", label: "Weekly Reports", desc: "Summary every Monday morning" },
                  { key: "loginAlerts", label: "Login Alerts", desc: "New device or location logins" },
                  { key: "patchUpdates", label: "Patch Updates", desc: "Security patch notifications" },
                  { key: "systemHealth", label: "System Health", desc: "Service degradation alerts" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-3 rounded-xl mb-2"
                    style={{ background: "var(--bg-secondary)" }}
                  >
                    <div>
                      <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {item.label}
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {item.desc}
                      </div>
                    </div>
                    <Toggle
                      enabled={notifSettings[item.key as keyof typeof notifSettings]}
                      onChange={() => toggleNotif(item.key as keyof typeof notifSettings)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <div className="space-y-4">
              <div
                className="rounded-2xl p-5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>
                  Theme
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "dark", label: "Dark", icon: <Moon size={18} />, preview: "#0f1117" },
                    { id: "light", label: "Light", icon: <Sun size={18} />, preview: "#f8fafc" },
                    { id: "system", label: "System", icon: <Monitor size={18} />, preview: "#1e2130" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() =>
                        setAppearanceSettings((p) => ({ ...p, theme: t.id }))
                      }
                      className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all"
                      style={{
                        background:
                          appearanceSettings.theme === t.id
                            ? "var(--layer-blue)"
                            : "var(--bg-secondary)",
                        border: `1px solid ${
                          appearanceSettings.theme === t.id
                            ? "rgba(79,142,247,0.4)"
                            : "var(--border)"
                        }`,
                      }}
                    >
                      <div
                        className="flex items-center justify-center rounded-xl"
                        style={{
                          width: 44,
                          height: 44,
                          background: t.preview,
                          border: "1px solid var(--border)",
                          color:
                            appearanceSettings.theme === t.id
                              ? "var(--accent-blue)"
                              : "var(--text-secondary)",
                        }}
                      >
                        {t.icon}
                      </div>
                      <span
                        className="text-xs font-medium"
                        style={{
                          color:
                            appearanceSettings.theme === t.id
                              ? "var(--accent-blue)"
                              : "var(--text-secondary)",
                        }}
                      >
                        {t.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color */}
              <div
                className="rounded-2xl p-5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>
                  Accent Color
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {accentColors.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setSelectedAccent(c.value)}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <div
                        className="rounded-full flex items-center justify-center transition-all"
                        style={{
                          width: 36,
                          height: 36,
                          background: c.value,
                          boxShadow:
                            selectedAccent === c.value
                              ? `0 0 0 3px var(--bg-card), 0 0 0 5px ${c.value}`
                              : "none",
                        }}
                      >
                        {selectedAccent === c.value && (
                          <Check size={14} color="white" />
                        )}
                      </div>
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Options */}
              <div
                className="rounded-2xl p-5"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
              >
                <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>
                  Display Options
                </h3>
                <div className="space-y-3">
                  {[
                    { key: "compactMode", label: "Compact Mode", desc: "Reduce spacing for more content" },
                    { key: "animations", label: "Animations", desc: "Enable UI transition animations" },
                    { key: "sidebarCollapsed", label: "Collapsed Sidebar", desc: "Start with sidebar collapsed" },
                  ].map((opt) => (
                    <div
                      key={opt.key}
                      className="flex items-center justify-between p-3 rounded-xl"
                      style={{ background: "var(--bg-secondary)" }}
                    >
                      <div>
                        <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          {opt.label}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {opt.desc}
                        </div>
                      </div>
                      <Toggle
                        enabled={appearanceSettings[opt.key as keyof typeof appearanceSettings] as boolean}
                        onChange={() =>
                          setAppearanceSettings((p) => ({
                            ...p,
                            [opt.key]: !p[opt.key as keyof typeof appearanceSettings],
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === "integrations" && (
            <div
              className="rounded-2xl p-5"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <h3 className="font-semibold text-sm mb-5" style={{ color: "var(--text-primary)" }}>
                Integrations
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Slack", desc: "Send alerts to Slack channels", connected: true, color: "#4a154b" },
                  { name: "PagerDuty", desc: "Incident management & on-call", connected: true, color: "#06ac38" },
                  { name: "Jira", desc: "Create tickets from incidents", connected: false, color: "#0052cc" },
                  { name: "Splunk", desc: "Forward logs to Splunk SIEM", connected: false, color: "var(--accent-red)" },
                  { name: "Microsoft Teams", desc: "Send notifications to Teams", connected: false, color: "#6264a7" },
                  { name: "AWS Security Hub", desc: "Sync findings with AWS", connected: true, color: "var(--accent-orange)" },
                ].map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center rounded-xl text-white text-xs font-bold"
                        style={{
                          width: 38,
                          height: 38,
                          background: integration.color,
                        }}
                      >
                        {integration.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                          {integration.name}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {integration.desc}
                        </div>
                      </div>
                    </div>
                    <button
                      className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
                      style={{
                        background: integration.connected
                          ? "var(--layer-green)"
                          : "var(--layer-blue)",
                        color: integration.connected ? "var(--accent-green)" : "var(--accent-blue)",
                        border: `1px solid ${
                          integration.connected
                            ? "rgba(16,185,129,0.2)"
                            : "rgba(79,142,247,0.2)"
                        }`,
                      }}
                    >
                      {integration.connected ? "Connected" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: saved
                  ? "rgba(16,185,129,0.15)"
                  : "linear-gradient(135deg, #4f8ef7, #8b5cf6)",
                color: saved ? "var(--accent-green)" : "white",
                boxShadow: saved ? "none" : "0 4px 15px rgba(79,142,247,0.3)",
              }}
            >
              {saved ? (
                <>
                  <Check size={15} /> Saved!
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}





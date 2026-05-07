"use client";

import {
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar,
} from "recharts";
import {
  ShieldAlert, Users, CheckCircle, AlertTriangle,
  TrendingUp, TrendingDown, Activity,
} from "lucide-react";
import { statsCards, trafficData, threatDistribution, weeklyActivity, systemHealth, activityLogs } from "@/lib/data";
import ChartTooltip from "@/components/ui/ChartTooltip";
import { SEVERITY_CONFIG } from "@/lib/constants";

// ─── Static maps ─────────────────────────────────────────────
const ICON_MAP: Record<string, React.ReactNode> = {
  "shield-alert":   <ShieldAlert size={22} />,
  users:            <Users size={22} />,
  "check-shield":   <CheckCircle size={22} />,
  "alert-triangle": <AlertTriangle size={22} />,
};

// Uses CSS variables so both themes work
const COLOR_MAP: Record<string, string> = {
  red:    "var(--accent-red)",
  blue:   "var(--accent-blue)",
  green:  "var(--accent-green)",
  orange: "var(--accent-orange)",
};
const BG_MAP: Record<string, string> = {
  red:    "var(--layer-red)",
  blue:   "var(--layer-blue)",
  green:  "var(--layer-green)",
  orange: "var(--layer-orange)",
};

// Chart tick/grid — read from CSS var at runtime via inline style trick

// ─── Component ───────────────────────────────────────────────
export default function DashboardSection() {
  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsCards.map((card, i) => (
          <div
            key={card.id}
            className="rounded-2xl p-5 card-hover"
            style={{
              background:    "var(--bg-card)",
              border:        "1px solid var(--border)",
              animationDelay:`${i * 0.08}s`,
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{ width: 46, height: 46, background: BG_MAP[card.color], color: COLOR_MAP[card.color] }}
              >
                {ICON_MAP[card.icon]}
              </div>
              <span
                className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg"
                style={{
                  background: card.color === "orange" ? "var(--layer-orange)" : "var(--layer-green)",
                  color:      card.color === "orange" ? "var(--accent-orange)" : "var(--accent-green)",
                }}
              >
                {card.trend === "up" ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {card.change}
              </span>
            </div>
            <p className="text-2xl font-bold mb-1 animate-count-up" style={{ color: "var(--text-primary)" }}>
              {card.value}
            </p>
            <p className="text-sm"  style={{ color: "var(--text-secondary)" }}>{card.title}</p>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{card.description}</p>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Traffic Chart */}
        <div
          className="xl:col-span-2 rounded-2xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                Traffic & Attack Overview
              </h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                Monthly traffic vs detected attacks
              </p>
            </div>
            <div className="flex gap-1.5">
              {["1M", "3M", "6M", "1Y"].map((t) => (
                <button
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-lg"
                  style={{
                    background: t === "1Y" ? "var(--layer-blue)" : "var(--bg-hover)",
                    color:      t === "1Y" ? "var(--accent-blue)" : "var(--text-secondary)",
                    border:     `1px solid ${t === "1Y" ? "rgba(79,142,247,0.3)" : "transparent"}`,
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={trafficData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                {[
                  { id: "trafficGrad", color: "var(--accent-blue)" },
                  { id: "attackGrad",  color: "var(--accent-red)" },
                  { id: "blockedGrad", color: "var(--accent-green)" },
                ].map(({ id, color }) => (
                  <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0}   />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="name" tick={{ fill: "var(--chart-tick)", fontSize: 11 } as object} axisLine={false} tickLine={false} />
              <YAxis                tick={{ fill: "var(--chart-tick)", fontSize: 11 } as object} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="traffic" name="Traffic" stroke="#4f8ef7" strokeWidth={2} fill="url(#trafficGrad)" />
              <Area type="monotone" dataKey="attacks" name="Attacks" stroke="#ef4444" strokeWidth={2} fill="url(#attackGrad)"  />
              <Area type="monotone" dataKey="blocked" name="Blocked" stroke="#10b981" strokeWidth={2} fill="url(#blockedGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Threat Distribution */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
            Threat Distribution
          </h3>
          <p className="text-xs mb-4" style={{ color: "var(--text-secondary)" }}>By attack type</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={threatDistribution}
                cx="50%" cy="50%"
                innerRadius={50} outerRadius={80}
                paddingAngle={3} dataKey="value"
              >
                {threatDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background:   "var(--bg-card)",
                  border:       "1px solid var(--border)",
                  borderRadius: 12,
                  fontSize:     12,
                  color:        "var(--text-primary)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {threatDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{item.name}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Weekly Activity */}
        <div
          className="xl:col-span-2 rounded-2xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
            Weekly Activity
          </h3>
          <p className="text-xs mb-5" style={{ color: "var(--text-secondary)" }}>
            Scans, incidents & resolutions
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyActivity} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="day" tick={{ fill: "var(--chart-tick)", fontSize: 11 } as object} axisLine={false} tickLine={false} />
              <YAxis                tick={{ fill: "var(--chart-tick)", fontSize: 11 } as object} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="scans"     name="Scans"     fill="#4f8ef7" radius={[4,4,0,0]} />
              <Bar dataKey="incidents" name="Incidents" fill="#ef4444" radius={[4,4,0,0]} />
              <Bar dataKey="resolved"  name="Resolved"  fill="#10b981" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* System Health */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
            System Health
          </h3>
          <p className="text-xs mb-4" style={{ color: "var(--text-secondary)" }}>Live service status</p>
          <div className="space-y-3">
            {systemHealth.map((sys) => {
              const dotColor =
                sys.status === "Operational" ? "var(--accent-green)"  :
                sys.status === "Degraded"    ? "var(--accent-orange)" : "var(--accent-red)";
              return (
                <div key={sys.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="status-dot"
                        style={{ background: dotColor, boxShadow: `0 0 6px ${dotColor}` }}
                      />
                      <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                        {sys.name}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{sys.load}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width:      `${sys.load}%`,
                        background: sys.load > 70
                          ? "linear-gradient(90deg, var(--accent-orange), var(--accent-red))"
                          : "linear-gradient(90deg, var(--accent-blue), var(--accent-purple))",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Recent Activity ── */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
              Recent Activity
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
              Latest security events
            </p>
          </div>
          <button
            className="text-xs font-medium px-3 py-1.5 rounded-lg"
            style={{
              background: "var(--layer-blue)",
              color:      "var(--accent-blue)",
              border:     "1px solid rgba(79,142,247,0.2)",
            }}
          >
            View All
          </button>
        </div>
        <div className="space-y-2">
          {activityLogs.slice(0, 5).map((log) => {
            const cfg = SEVERITY_CONFIG[log.severity as keyof typeof SEVERITY_CONFIG];
            return (
              <div
                key={log.id}
                className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: "var(--bg-secondary)" }}
              >
                <div
                  className="flex items-center justify-center rounded-lg shrink-0 mt-0.5"
                  style={{ width: 32, height: 32, background: cfg.bg, color: cfg.color }}
                >
                  <Activity size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: "var(--text-primary)" }}>{log.message}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{log.time}</span>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>IP: {log.ip}</span>
                  </div>
                </div>
                <span className="badge shrink-0" style={{ background: cfg.bg, color: cfg.color }}>
                  {log.severity}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}




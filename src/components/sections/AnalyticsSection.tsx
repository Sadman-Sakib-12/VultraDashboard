"use client";

import { useState } from "react";
import {
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from "recharts";
import { TrendingUp, TrendingDown, Eye, Zap, Shield, Clock } from "lucide-react";
import { trafficData } from "@/lib/data";
import ChartTooltip from "@/components/ui/ChartTooltip";


// ─── Static data ─────────────────────────────────────────────
const GEO_DATA = [
  { country: "United States", attacks: 1240, blocked: 1180, flag: "🇺🇸" },
  { country: "China",         attacks: 890,  blocked: 850,  flag: "🇨🇳" },
  { country: "Russia",        attacks: 720,  blocked: 700,  flag: "🇷🇺" },
  { country: "Germany",       attacks: 340,  blocked: 320,  flag: "🇩🇪" },
  { country: "Brazil",        attacks: 280,  blocked: 265,  flag: "🇧🇷" },
  { country: "India",         attacks: 210,  blocked: 200,  flag: "🇮🇳" },
];

const RADAR_DATA = [
  { subject: "Malware",  A: 85 },
  { subject: "Phishing", A: 72 },
  { subject: "DDoS",     A: 60 },
  { subject: "SQLi",     A: 45 },
  { subject: "XSS",      A: 38 },
  { subject: "CSRF",     A: 25 },
];

const RESPONSE_TIME_DATA = [
  { time: "00:00", avg: 120 },
  { time: "04:00", avg: 95  },
  { time: "08:00", avg: 180 },
  { time: "12:00", avg: 240 },
  { time: "16:00", avg: 210 },
  { time: "20:00", avg: 160 },
  { time: "23:59", avg: 130 },
];

const KPI_CARDS = [
  { label: "Total Scans",       value: "48,291", change: "+18%", up: true,  icon: <Eye size={18} />,    color: "var(--accent-blue)" },
  { label: "Threats Blocked",   value: "3,847",  change: "+12%", up: true,  icon: <Shield size={18} />, color: "var(--accent-green)" },
  { label: "Avg Response Time", value: "142ms",  change: "-8%",  up: false, icon: <Clock size={18} />,  color: "var(--accent-purple)" },
  { label: "Attack Attempts",   value: "12,540", change: "+5%",  up: true,  icon: <Zap size={18} />,    color: "var(--accent-red)" },
];

const PERIODS = ["1W", "1M", "3M", "6M", "1Y"] as const;
type Period = typeof PERIODS[number];

// ─── Component ───────────────────────────────────────────────
export default function AnalyticsSection() {
  const [period, setPeriod] = useState<Period>("1Y");

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {KPI_CARDS.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-2xl p-4 card-hover"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{ width: 40, height: 40, background: `${kpi.color}18`, color: kpi.color }}
              >
                {kpi.icon}
              </div>
              <span
                className="flex items-center gap-1 text-xs font-semibold"
                style={{ color: kpi.up ? "var(--accent-green)" : "var(--accent-red)" }}
              >
                {kpi.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {kpi.change}
              </span>
            </div>
            <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
              {kpi.value}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
              {kpi.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Main Traffic Chart ── */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
              Traffic Analysis
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
              Detailed traffic, attack & block trends
            </p>
          </div>
          <div className="flex gap-1.5">
            {PERIODS.map((t) => (
              <button
                key={t}
                onClick={() => setPeriod(t)}
                className="text-xs px-2.5 py-1 rounded-lg transition-colors"
                style={{
                  background: period === t ? "var(--layer-blue)" : "var(--bg-hover)",
                  color:      period === t ? "var(--accent-blue)"    : "var(--text-secondary)",
                  border:     `1px solid ${period === t ? "rgba(79,142,247,0.3)" : "transparent"}`,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={trafficData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              {[
                { id: "tGrad", color: "var(--accent-blue)" },
                { id: "aGrad", color: "var(--accent-red)" },
                { id: "bGrad", color: "var(--accent-green)" },
              ].map(({ id, color }) => (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0}   />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="name" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis                tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="traffic" name="Traffic" stroke="#4f8ef7" strokeWidth={2.5} fill="url(#tGrad)" />
            <Area type="monotone" dataKey="attacks" name="Attacks" stroke="#ef4444" strokeWidth={2.5} fill="url(#aGrad)" />
            <Area type="monotone" dataKey="blocked" name="Blocked" stroke="#10b981" strokeWidth={2.5} fill="url(#bGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Radar */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
            Attack Vector Analysis
          </h3>
          <p className="text-xs mb-4" style={{ color: "var(--text-secondary)" }}>
            Threat exposure by category
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="rgba(42,45,62,0.8)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} />
              <Radar name="Exposure" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Response Time */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
            Response Time (Today)
          </h3>
          <p className="text-xs mb-4" style={{ color: "var(--text-secondary)" }}>
            Average incident response time (ms)
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={RESPONSE_TIME_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="time" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis                tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="avg" name="Avg (ms)" stroke="#06b6d4" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Geo Attacks */}
        <div
          className="rounded-2xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
            Attack Origins
          </h3>
          <p className="text-xs mb-4" style={{ color: "var(--text-secondary)" }}>
            Top source countries
          </p>
          <div className="space-y-3">
            {GEO_DATA.map((geo) => {
              const pct = Math.round((geo.blocked / geo.attacks) * 100);
              return (
                <div key={geo.country}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{geo.flag}</span>
                      <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                        {geo.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {geo.attacks.toLocaleString()}
                      </span>
                      <span
                        className="text-xs font-semibold px-1.5 py-0.5 rounded"
                        style={{ background: "var(--layer-green)", color: "var(--accent-green)" }}
                      >
                        {pct}%
                      </span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width:      `${(geo.attacks / 1240) * 100}%`,
                        background: "linear-gradient(90deg, #4f8ef7, #8b5cf6)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}





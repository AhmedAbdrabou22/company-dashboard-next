"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
} from "recharts";

// ─── Types ───────────────────────────────────────────────────────────────────

type Period = "Last Month" | "Last Week" | "Last Year";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const activityData = [
  { month: "JAN", v1: 120, v2: 80 },
  { month: "FEB", v1: 180, v2: 100 },
  { month: "MAR", v1: 150, v2: 90 },
  { month: "APR", v1: 200, v2: 120 },
  { month: "MAY", v1: 170, v2: 110 },
  { month: "JUN", v1: 220, v2: 140 },
  { month: "JUL", v1: 190, v2: 130 },
  { month: "AUG", v1: 160, v2: 100 },
  { month: "SEP", v1: 280, v2: 200 },
  { month: "OCT", v1: 310, v2: 220 },
  { month: "NOV", v1: 350, v2: 260 },
  { month: "DEC", v1: 390, v2: 300 },
];

const trendUp = [
  { v: 20 }, { v: 28 }, { v: 22 }, { v: 35 },
  { v: 30 }, { v: 42 }, { v: 38 }, { v: 50 }, { v: 55 },
];
const trendDown = [
  { v: 55 }, { v: 50 }, { v: 48 }, { v: 42 },
  { v: 45 }, { v: 38 }, { v: 35 }, { v: 30 }, { v: 28 },
];

const miniWave = [
  { v: 30 }, { v: 20 }, { v: 35 }, { v: 25 },
  { v: 40 }, { v: 30 }, { v: 45 },
];

const topServices = [
  { name: "Cleaning", pct: 30 },
  { name: "Security", pct: 22 },
  { name: "Childcare", pct: 18 },
];

// ─── Sparkline ────────────────────────────────────────────────────────────────

const Sparkline = ({ data, color }: { data: { v: number }[]; color: string }) => (
  <div style={{ width: 110, height: 52, flexShrink: 0 }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2}
          dot={false}
          fill={`url(#grad-${color})`}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// ─── Mini Wave (for bottom stats) ─────────────────────────────────────────────

const MiniWave = () => (
  <div style={{ width: 70, height: 32, flexShrink: 0 }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={miniWave} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
        <Line
          type="monotone"
          dataKey="v"
          stroke="#e28576"
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// ─── Stat Card (Top) ──────────────────────────────────────────────────────────

interface StatCardProps {
  title: string;
  value: string;
  percent: string;
  isUp: boolean;
  data: { v: number }[];
  color: string;
}

const StatCard = ({ title, value, percent, isUp, data, color }: StatCardProps) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 16,
      padding: "20px 24px",
      flex: 1,
      border: "1px solid #E5E7EB",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      minWidth: 0,
    }}
  >
    {/* Header */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#6B7280" }}>{title}</span>
      <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
        </svg>
      </button>
    </div>

    {/* Value + Sparkline */}
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
      <span style={{ fontSize: 32, fontWeight: 800, color: "#111827", letterSpacing: "-1px" }}>
        {value}
      </span>
      <Sparkline data={data} color={color} />
    </div>

    {/* Percent badge */}
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          color: isUp ? "#16A34A" : "#DC2626",
          fontWeight: 700,
          fontSize: 13,
        }}
      >
        {isUp ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M7 7l10 10M17 17H7M17 17V7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {percent}
      </span>
      <span style={{ fontSize: 13, color: "#9CA3AF" }}>vs last month</span>
    </div>
  </div>
);

// ─── Activity Chart ───────────────────────────────────────────────────────────

type ActivityPeriod = "Month" | "Week" | "Year";

const ActivityChart = () => {
  const [period, setPeriod] = useState<ActivityPeriod>("Month");

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "20px 24px",
        border: "1px solid #E5E7EB",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Activity</span>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            color: "#374151",
          }}
        >
          {period}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={activityData} barGap={4} barCategoryGap="30%">
          <CartesianGrid vertical={false} stroke="#F3F4F6" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: "#9CA3AF", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 400]}
            ticks={[0, 100, 200, 300, 400]}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 10,
              border: "none",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              fontSize: 12,
            }}
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
          />
          <Bar dataKey="v2" fill="#D1D5DB" radius={[4, 4, 0, 0]} />
          <Bar dataKey="v1" fill="#e28576" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// ─── Top Services ─────────────────────────────────────────────────────────────

const TopServicesCard = () => (
  <div
    style={{
      background: "#fff",
      borderRadius: 16,
      padding: "20px 24px",
      border: "1px solid #E5E7EB",
      flex: 1,
      minWidth: 260,
      display: "flex",
      flexDirection: "column",
      gap: 20,
    }}
  >
    <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Top Services</span>

    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {topServices.map((s) => (
        <div key={s.name} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{s.name}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{s.pct}%</span>
          </div>
          {/* Progress bar */}
          <div
            style={{
              height: 8,
              borderRadius: 999,
              background: "#E5E7EB",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${s.pct * 3}%`, // scale to fit visual width
                height: "100%",
                borderRadius: 999,
                background: "#e28576",
                transition: "width 0.6s ease",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Bottom Stat Card ─────────────────────────────────────────────────────────

interface BottomStatProps {
  label: string;
  value: string;
  sub?: string;
  showWave?: boolean;
}

const BottomStat = ({ label, value, sub, showWave = false }: BottomStatProps) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 100 }}>
    <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>
      {value}
      {sub && <span style={{ fontSize: 14, fontWeight: 500, color: "#9CA3AF" }}>{sub}</span>}
    </span>
    {showWave && <MiniWave />}
  </div>
);

// ─── Filter Chip ──────────────────────────────────────────────────────────────

const FilterChip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 14px",
      borderRadius: 999,
      background: "#fff",
      border: "1.5px solid #E5E7EB",
      fontSize: 13,
      fontWeight: 600,
      color: "#111827",
    }}
  >
    {label}
    <button
      onClick={onRemove}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        color: "#6B7280",
        lineHeight: 1,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
      </svg>
    </button>
  </span>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BoReporting() {
  const [period, setPeriod] = useState<Period>("Last Month");
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Period | null>("Last Month");

  const periods: Period[] = ["Last Month", "Last Week", "Last Year"];

  const removeFilter = () => setActiveFilter(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>

      {/* ── Header ── */}
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", margin: 0 }}>Reporting</h1>
        <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4, marginBottom: 0 }}>
          Your account reports and statistics
        </p>
      </div>

      {/* ── Filter Bar ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {activeFilter && (
            <FilterChip label={activeFilter} onRemove={removeFilter} />
          )}
        </div>

        {/* Period button */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowPeriodDropdown((p) => !p)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderRadius: 10,
              border: "1.5px solid #E5E7EB",
              background: "#fff",
              fontSize: 13,
              fontWeight: 600,
              color: "#374151",
              cursor: "pointer",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 6h16M4 12h8M4 18h4" strokeLinecap="round" />
            </svg>
            Period
          </button>

          {showPeriodDropdown && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                right: 0,
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                zIndex: 50,
                minWidth: 150,
                overflow: "hidden",
              }}
            >
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPeriod(p);
                    setActiveFilter(p);
                    setShowPeriodDropdown(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px 16px",
                    textAlign: "left",
                    border: "none",
                    background: period === p ? "#F1F5F9" : "transparent",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: period === p ? 700 : 500,
                    color: "#374151",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Row 1: Stat Cards ── */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <StatCard
          title="Total Requests"
          value="2,420"
          percent="40%"
          isUp={true}
          data={trendUp}
          color="#16A34A"
        />
        <StatCard
          title="Total Spend"
          value="1,210 $"
          percent="10%"
          isUp={false}
          data={trendDown}
          color="#DC2626"
        />
      </div>

      {/* ── Row 2: Activity + Top Services ── */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "stretch" }}>
        <ActivityChart />
        <TopServicesCard />
      </div>

      {/* ── Row 3: Bottom Stats ── */}
      <div
        style={{
          display: "flex",
          background: "#fff",
          border: "1px solid #E5E7EB",
          borderRadius: 16,
          overflow: "hidden",
          flexWrap: "wrap",
        }}
      >
        {/* Left group */}
        <div
          style={{
            display: "flex",
            flex: 1,
            padding: "20px 24px",
            gap: 0,
            borderRight: "1px solid #E5E7EB",
          }}
        >
          <div style={{ flex: 1, borderRight: "1px solid #E5E7EB", paddingRight: 20 }}>
            <BottomStat label="Active Users" value="27" sub="/80" />
          </div>
          <div style={{ flex: 1, borderRight: "1px solid #E5E7EB", padding: "0 20px" }}>
            <BottomStat label="Response" value="2m 34s" />
          </div>
          <div style={{ flex: 1, paddingLeft: 20 }}>
            <BottomStat label="Service Time" value="30m 25s" />
          </div>
        </div>

        {/* Right group */}
        <div
          style={{
            display: "flex",
            flex: 1,
            padding: "20px 24px",
            gap: 0,
          }}
        >
          <div style={{ flex: 1, borderRight: "1px solid #E5E7EB", paddingRight: 20 }}>
            <BottomStat label="Users" value="64%" showWave />
          </div>
          <div style={{ flex: 1, borderRight: "1px solid #E5E7EB", padding: "0 20px" }}>
            <BottomStat label="Response" value="86%" showWave />
          </div>
          <div style={{ flex: 1, paddingLeft: 20 }}>
            <BottomStat label="Service Time" value="+34%" showWave />
          </div>
        </div>
      </div>

    </div>
  );
}
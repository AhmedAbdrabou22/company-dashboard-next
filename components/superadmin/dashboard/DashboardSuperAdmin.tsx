"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import OverviewCard from "@/components/superadmin/dashboard/components/Overview";

const areaData = [
    { month: "Jan", profit: 25, tickets: 30 },
    { month: "Feb", profit: 28, tickets: 35 },
    { month: "Mar", profit: 40, tickets: 45 },
    { month: "Apr", profit: 55, tickets: 60 },
    { month: "May", profit: 70, tickets: 75 },
    { month: "Jun", profit: 75, tickets: 80 },
    { month: "Jul", profit: 80, tickets: 90 },
    { month: "Aug", profit: 90, tickets: 92 },
    { month: "Sep", profit: 65, tickets: 70 },
];

const miniProfitData = [
    { v: 30 }, { v: 35 }, { v: 28 }, { v: 40 }, { v: 38 }, { v: 50 },
];
const miniTicketsData = [
    { v: 40 }, { v: 55 }, { v: 48 }, { v: 60 }, { v: 58 }, { v: 65 },
];
const miniExpensesData = [
    { v: 45 }, { v: 50 }, { v: 42 }, { v: 55 }, { v: 52 }, { v: 60 },
];


const DonutChart = () => {
    const cx = 110, cy = 110, strokeW = 18;

    const rings = [
        { r: 88, color: "# 1A2A4B", dash: 75, offset: 0 },
        { r: 66, color: "#6B7A99", dash: 60, offset: 15 },
        { r: 44, color: "#B0B8CC", dash: 45, offset: 30 },
        { r: 88, color: "#E53935", dash: 30, offset: -10 },
    ];

    return (
        <svg width="220" height="220" viewBox="0 0 220 220">
            {rings.map((ring, i) => {
                const circumference = 2 * Math.PI * ring.r;
                const dashLen = (ring.dash / 100) * circumference;
                const gapLen = circumference - dashLen;
                const rotation = -90 + (ring.offset / 100) * 360;
                return (
                    <g key={i}>
                        {/* Track */}
                        <circle
                            cx={cx} cy={cy} r={ring.r}
                            fill="none"
                            stroke="#f1f4f7"
                            strokeWidth={strokeW}
                        />
                        {/* Arc */}
                        <circle
                            cx={cx} cy={cy} r={ring.r}
                            fill="none"
                            stroke={ring.color}
                            strokeWidth={strokeW}
                            strokeDasharray={`${dashLen} ${gapLen}`}
                            strokeLinecap="round"
                            transform={`rotate(${rotation} ${cx} ${cy})`}
                        />
                    </g>
                );
            })}
            {/* Center label */}
            <text x={cx} y={cy - 10} textAnchor="middle" fill="#94a3b8" fontSize="13" fontFamily="inherit">
                Total
            </text>
            <text x={cx} y={cy + 16} textAnchor="middle" fill="# 1A2A4B" fontSize="26" fontWeight="700" fontFamily="inherit">
                9,990
            </text>
        </svg>
    );
};

// ── Mini Sparkline ────────────────────────────────────────────────────────────

const Sparkline = ({ data, color }: { data: { v: number }[]; color: string }) => (
    <ResponsiveContainer width={120} height={50}>
        <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id={`spark-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.18} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
            </defs>
            <Area
                type="monotone"
                dataKey="v"
                stroke={color}
                strokeWidth={2}
                fill={`url(#spark-${color.replace("#", "")})`}
                dot={false}
            />
        </AreaChart>
    </ResponsiveContainer>
);

// ── Stat Card ─────────────────────────────────────────────────────────────────

const StatCard = ({
    title,
    value,
    percent,
    data,
    color,
}: {
    title: string;
    value: string;
    percent: string;
    data: { v: number }[];
    color: string;
}) => (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 w-full sm:w-[48%] lg:flex-1 shadow-lg">
        <p className="text-sm text-[#94a3b8] font-medium">{title}</p>
        <div className="flex items-end justify-between gap-3">
            <span className="text-3xl font-bold text-[# 1A2A4B] tracking-tight">{value}</span>
            <Sparkline data={data} color={color} />
        </div>
        <div className="flex items-center gap-1.5">
            <span
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}18` }}
            >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 7 L5 3 L8 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
            <span className="text-sm font-semibold" style={{ color }}>{percent}</span>
            <span className="text-sm text-[#94a3b8]">last week</span>
        </div>
    </div>
);

// ── Main Dashboard ────────────────────────────────────────────────────────────

const DashboardSuperAdmin = () => {
    return (
        <div className="min-h-full flex flex-col gap-5 mt-5">

            {/* ── Top bar: filter chip + period button ── */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-white border border-[#e2e8f0] rounded-xl px-3.5 py-2 text-sm font-medium text-[# 1A2A4B]">
                    Last Month
                    <button className="ml-1 text-[#94a3b8] hover:text-[# 1A2A4B] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </button>
                </div>

                <button className="flex items-center gap-2 bg-white border border-[#e2e8f0] rounded-xl px-4 py-2 text-sm font-semibold text-[# 1A2A4B] hover:bg-[#f8fafc] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 18h6v-2H3v2zm0-5h12v-2H3v2zm0-7v2h18V6H3z" />
                    </svg>
                    Period
                </button>
            </div>

            {/* ── Stat Cards ── */}
            <div className="flex gap-4 flex-wrap">
                <StatCard title="Profit" value="9,990" percent="8.2%" data={miniProfitData} color="#2DD4A7" />
                <StatCard title="Tickets" value="10,989" percent="86.6%" data={miniTicketsData} color="#F59E0B" />
                <StatCard title="Expenses" value="11,988" percent="73.9%" data={miniExpensesData} color="#F97066" />
            </div>

            {/* ── Bottom row: Donut + Area chart ── */}
            <div className="flex gap-4 flex-wrap lg:flex-nowrap flex-1">

                {/* Users donut */}
                <div className="dashboard-card p-5 flex flex-col gap-4 w-full lg:w-[300px] flex-shrink-0 shadow-lg">
                    <p className="text-lg font-bold text-[# 1A2A4B]">Users</p>
                    <div className="flex justify-center">
                        <DonutChart />
                    </div>
                    <div className="flex items-center justify-center gap-6 pt-1">
                        <div className="flex items-center gap-2 text-sm text-[# 1A2A4B] font-medium">
                            <span className="w-2.5 h-2.5 rounded-full bg-[# 1A2A4B]" />
                            Done
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[# 1A2A4B] font-medium">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#E53935]" />
                            Cancelled
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[# 1A2A4B] font-medium">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#E53935]" />
                            In Process
                        </div>
                    </div>
                </div>

                {/* Yearly sales area chart */}
                <div className="bg-white rounded-2xl p-5 flex flex-col gap-4 flex-1 min-w-0 shadow-lg">
                    <div className="flex flex-col gap-0.5">
                        <p className="text-lg font-bold text-[# 1A2A4B]">Yearly sales</p>
                        <p className="text-sm text-[#94a3b8]">(+43%) than last year</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2 text-sm text-[#64748b]">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#2DD4A7]" /> Profit
                            </div>
                            <span className="text-base font-bold text-[# 1A2A4B]">$16.19k</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-2 text-sm text-[#64748b]">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#E53935]" /> Tickets
                            </div>
                            <span className="text-base font-bold text-[# 1A2A4B]">$35.71k</span>
                        </div>
                    </div>

                    <div className="flex-1 min-h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={areaData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2DD4A7" stopOpacity={0.22} />
                                        <stop offset="95%" stopColor="#2DD4A7" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="gradTickets" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#E53935" stopOpacity={0.12} />
                                        <stop offset="95%" stopColor="#E53935" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f4f7" vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                                    domain={[0, 100]}
                                    ticks={[0, 20, 40, 60, 80, 100]}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: "# 1A2A4B",
                                        border: "none",
                                        borderRadius: "10px",
                                        color: "#fff",
                                        fontSize: "12px",
                                        padding: "8px 12px",
                                    }}
                                    itemStyle={{ color: "#fff" }}
                                    cursor={{ stroke: "#6366f1", strokeWidth: 1, strokeDasharray: "4 4" }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="profit"
                                    stroke="#2DD4A7"
                                    strokeWidth={2.5}
                                    fill="url(#gradProfit)"
                                    dot={false}
                                    activeDot={{ r: 5, fill: "#2DD4A7", stroke: "#fff", strokeWidth: 2 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="tickets"
                                    stroke="#E53935"
                                    strokeWidth={2.5}
                                    fill="url(#gradTickets)"
                                    dot={false}
                                    activeDot={{ r: 5, fill: "#E53935", stroke: "#fff", strokeWidth: 2 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>


            <OverviewCard />
        </div>
    );
};

export default DashboardSuperAdmin;


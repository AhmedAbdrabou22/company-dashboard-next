// "use client";

// import { useState } from "react";
// import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
// import { DataTable, type Column } from "@/components/shared/Table/DataTable";
// import { AddButton } from "@/components/shared/AddButton";
// import { HiOutlineBell, HiOutlineSearch, HiOutlineX, HiOutlineAdjustments } from "react-icons/hi";
// import Link from "next/link";

// /* ── Mock data ─────────────────────────────────────────────── */
// const trendUp = [
//     { v: 20 }, { v: 28 }, { v: 22 }, { v: 35 }, { v: 30 }, { v: 42 }, { v: 38 }, { v: 50 }, { v: 55 },
// ];
// const trendDown = [
//     { v: 55 }, { v: 50 }, { v: 48 }, { v: 42 }, { v: 45 }, { v: 38 }, { v: 35 }, { v: 30 }, { v: 28 },
// ];

// interface Request {
//     id: string;
//     service: string;
//     building: string;
//     orderId: string;
//     orderingDate: string;
//     status: "In progress" | "Completed" | "Pending";
//     requiredDate: string;
//     companyName: string;
// }

// const mockRequests: Request[] = [
//     { id: "1", service: "Cleaning", building: "Building Name", orderId: "SERF0032", orderingDate: "16/01/2025", status: "In progress", requiredDate: "20/01/2025", companyName: "Company A" },
//     { id: "2", service: "Cleaning", building: "Building Name", orderId: "SERF0032", orderingDate: "24/01/2025", status: "In progress", requiredDate: "06/02/2025", companyName: "Company B" },
//     { id: "3", service: "Maintenance", building: "Tower 5", orderId: "SERF0041", orderingDate: "02/02/2025", status: "Pending", requiredDate: "10/02/2025", companyName: "Company C" },
//     { id: "4", service: "Security", building: "Mall Annex", orderId: "SERF0055", orderingDate: "10/02/2025", status: "Completed", requiredDate: "15/02/2025", companyName: "Company D" },
// ];

// /* ── Status badge ───────────────────────────────────────────── */
// const statusColors: Record<Request["status"], { bg: string; dot: string; text: string }> = {
//     "In progress": { bg: "#FFF7ED", dot: "#F97316", text: "#C2410C" },
//     Completed: { bg: "#F0FDF4", dot: "#22C55E", text: "#15803D" },
//     Pending: { bg: "#F8FAFC", dot: "#94A3B8", text: "#475569" },
// };

// const StatusBadge = ({ status }: { status: Request["status"] }) => {
//     const s = statusColors[status];
//     return (
//         <span style={{
//             display: "inline-flex", alignItems: "center", gap: 6,
//             padding: "4px 12px", borderRadius: 999,
//             background: s.bg, fontSize: 13, fontWeight: 500, color: s.text,
//         }}>
//             <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
//             {status}
//         </span>
//     );
// };

// /* ── Sparkline ──────────────────────────────────────────────── */
// const Sparkline = ({ data, color }: { data: { v: number }[]; color: string }) => (
//     <div style={{ width: 110, height: 52, flexShrink: 0 }}>
//         <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
//                 <Tooltip
//                     contentStyle={{ fontSize: 11, borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: "4px 8px" }}
//                     formatter={(v) => [v, ""]}
//                     labelFormatter={() => ""}
//                 />
//                 <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
//             </LineChart>
//         </ResponsiveContainer>
//     </div>
// );

// /* ── Stat card ──────────────────────────────────────────────── */
// const StatCard = ({
//     title, value, percent, data, color,
// }: { title: string; value: string; percent: string; data: { v: number }[]; color: string }) => (
//     <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 flex-1 shadow-lg">
//         <p className="text-sm text-[#94a3b8] font-medium">{title}</p>
//         <div className="flex items-end justify-between gap-3">
//             <span className="text-3xl font-bold text-[#e28576] tracking-tight">{value}</span>
//             <Sparkline data={data} color={color} />
//         </div>
//         <div className="flex items-center gap-1.5">
//             <span
//                 className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
//                 style={{ background: `${color}18` }}
//             >
//                 <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//                     <path d="M2 7 L5 3 L8 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//             </span>
//             <span className="text-sm font-semibold" style={{ color }}>{percent}</span>
//             <span className="text-sm text-[#94a3b8]">last week</span>
//         </div>
//     </div>
// );

// /* ── Filter chip ────────────────────────────────────────────── */
// const Chip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
//     <span style={{
//         display: "inline-flex", alignItems: "center", gap: 6,
//         padding: "6px 14px", borderRadius: 999,
//         background: "#fff", border: "1.5px solid #E5E7EB",
//         fontSize: 13, fontWeight: 600, color: "#111827", cursor: "default",
//     }}>
//         {label}
//         <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "#6B7280" }}>
//             <HiOutlineX size={14} />
//         </button>
//     </span>
// );



// /* ── Columns ────────────────────────────────────────────────── */
// const columns: Column<Request>[] = [
//     {
//         key: "service",
//         header: "Service",
//         render: (row) => (
//             <div>
//                 <p style={{ fontWeight: 600, color: "#111827", fontSize: 13 }}>{row.service}</p>
//                 <p style={{ fontSize: 12, color: "#2563EB", marginTop: 2 }}>{row.building}</p>
//             </div>
//         ),
//     },
//     { key: "orderId", header: "Order ID" },
//     { key: "orderingDate", header: "Ordering Date" },
//     {
//         key: "status",
//         header: "Status",
//         render: (row) => <StatusBadge status={row.status} />,
//     },
//     { key: "requiredDate", header: "Required Date" },
//     { key: "companyName", header: "Company Name" },
// ];

// /* ── Page ───────────────────────────────────────────────────── */
// export default function SpDashboardPage() {
//     const [filters, setFilters] = useState(["Pending", "Recent"]);
//     const [search, setSearch] = useState("");

//     const removeFilter = (f: string) => setFilters((prev) => prev.filter((x) => x !== f));

//     const filtered = mockRequests.filter((r) =>
//         r.service.toLowerCase().includes(search.toLowerCase()) ||
//         r.companyName.toLowerCase().includes(search.toLowerCase()) ||
//         r.orderId.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

//             {/* ── Header ── */}
//             <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
//                 <div>
//                     <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", margin: 0 }}>
//                         Welcome back, Ahmed
//                     </h1>
//                     <p style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>
//                         Track, manage and forecast your customers and orders.
//                     </p>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                     {/* <AddButton addLabel="+ New Request" action={() => console.log("New Request")} /> */}
//                     {/* Bell */}
//                     <div style={{ position: "relative" }}>
//                         <Link href="/bo/notifications">
//                             <button style={{
//                                 width: 40, height: 40, borderRadius: "50%",
//                                 background: "#fff", border: "1px solid #E5E7EB",
//                                 display: "flex", alignItems: "center", justifyContent: "center",
//                                 cursor: "pointer", color: "#374151",
//                             }}>
//                                 <HiOutlineBell size={20} />
//                             </button>
//                         </Link>
//                         <span style={{
//                             position: "absolute", top: 6, right: 6,
//                             width: 8, height: 8, borderRadius: "50%",
//                             background: "#EF4444", border: "1.5px solid #fff",
//                         }} />
//                     </div>
//                 </div>
//             </div>



//             {/* ── Stat cards ── */}
//             <div style={{ display: "flex", gap: 20 }}>
//                 <StatCard title="Total Requests" value="2,420" percent="40%" data={trendUp} color="#16A34A" />
//                 <StatCard title="Total Spend" value="1,210 $" percent="10%" data={trendDown} color="#DC2626" />
//             </div>

//             {/* ── Requests table ── */}
//             <div>
//                 <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 16 }}>
//                     Requests
//                 </h2>

//                 {/* Filters row */}
//                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
//                         {filters.map((f) => (
//                             <Chip key={f} label={f} onRemove={() => removeFilter(f)} />
//                         ))}
//                         <button style={{
//                             display: "inline-flex", alignItems: "center", gap: 6,
//                             padding: "6px 14px", borderRadius: 999,
//                             background: "#fff", border: "1.5px solid #E5E7EB",
//                             fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer",
//                         }}>
//                             <HiOutlineAdjustments size={15} />
//                             More filters
//                         </button>
//                     </div>

//                     {/* Search */}
//                     <div style={{
//                         display: "flex", alignItems: "center", gap: 8,
//                         padding: "8px 14px", borderRadius: 10,
//                         border: "1.5px solid #E5E7EB", background: "#fff",
//                         minWidth: 220,
//                     }}>
//                         <HiOutlineSearch size={16} style={{ color: "#9CA3AF", flexShrink: 0 }} />
//                         <input
//                             type="text"
//                             placeholder="Search"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             style={{
//                                 border: "none", outline: "none", fontSize: 14,
//                                 color: "#374151", background: "transparent", width: "100%",
//                             }}
//                         />
//                     </div>
//                 </div>

//                 {/* Table */}
//                 <div style={{ border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden" }}>
//                     <DataTable columns={columns} data={filtered} theadBackgroundColor="white" />
//                 </div>
//             </div>
//         </div>
//     );
// }



"use client";

import { useState } from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { DataTable, type Column } from "@/components/shared/Table/DataTable";
import { AddButton } from "@/components/shared/AddButton";
import { HiOutlineBell, HiOutlineSearch, HiOutlineX, HiOutlineAdjustments } from "react-icons/hi";
import Link from "next/link";

/* ── Mock data ─────────────────────────────────────────────── */
const trendUp = [
    { v: 20 }, { v: 28 }, { v: 22 }, { v: 35 }, { v: 30 }, { v: 42 }, { v: 38 }, { v: 50 }, { v: 55 },
];
const trendDown = [
    { v: 55 }, { v: 50 }, { v: 48 }, { v: 42 }, { v: 45 }, { v: 38 }, { v: 35 }, { v: 30 }, { v: 28 },
];

interface Request {
    id: string;
    service: string;
    building: string;
    orderId: string;
    orderingDate: string;
    status: "In progress" | "Completed" | "Pending";
    requiredDate: string;
    companyName: string;
}

const mockRequests: Request[] = [
    { id: "1", service: "Cleaning", building: "Building Name", orderId: "SERF0032", orderingDate: "16/01/2025", status: "In progress", requiredDate: "20/01/2025", companyName: "Company A" },
    { id: "2", service: "Cleaning", building: "Building Name", orderId: "SERF0032", orderingDate: "24/01/2025", status: "In progress", requiredDate: "06/02/2025", companyName: "Company B" },
    { id: "3", service: "Maintenance", building: "Tower 5", orderId: "SERF0041", orderingDate: "02/02/2025", status: "Pending", requiredDate: "10/02/2025", companyName: "Company C" },
    { id: "4", service: "Security", building: "Mall Annex", orderId: "SERF0055", orderingDate: "10/02/2025", status: "Completed", requiredDate: "15/02/2025", companyName: "Company D" },
];

/* ── Status badge ───────────────────────────────────────────── */
const statusColors: Record<Request["status"], { bg: string; dot: string; text: string }> = {
    "In progress": { bg: "#FFF7ED", dot: "#F97316", text: "#C2410C" },
    Completed: { bg: "#F0FDF4", dot: "#22C55E", text: "#15803D" },
    Pending: { bg: "#F8FAFC", dot: "#94A3B8", text: "#475569" },
};

const StatusBadge = ({ status }: { status: Request["status"] }) => {
    const s = statusColors[status];
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 12px", borderRadius: 999,
            background: s.bg, fontSize: 13, fontWeight: 500, color: s.text,
        }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
            {status}
        </span>
    );
};

/* ── Sparkline ──────────────────────────────────────────────── */
const Sparkline = ({ data, color }: { data: { v: number }[]; color: string }) => (
    <div style={{ width: 110, height: 52, flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: "4px 8px" }}
                    formatter={(v) => [v, ""]}
                    labelFormatter={() => ""}
                />
                <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

/* ── Stat card ──────────────────────────────────────────────── */
const StatCard = ({
    title, value, percent, data, color,
}: { title: string; value: string; percent: string; data: { v: number }[]; color: string }) => (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 flex-1 shadow-lg">
        <p className="text-sm text-[#94a3b8] font-medium">{title}</p>
        <div className="flex items-end justify-between gap-3">
            <span className="text-3xl font-bold text-[#000] tracking-tight">{value}</span>
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

/* ── Filter chip ────────────────────────────────────────────── */
const Chip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
    <span style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "6px 14px", borderRadius: 999,
        background: "#fff", border: "1.5px solid #E5E7EB",
        fontSize: 13, fontWeight: 600, color: "#111827", cursor: "default",
    }}>
        {label}
        <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: "#6B7280" }}>
            <HiOutlineX size={14} />
        </button>
    </span>
);


/* ── Columns ────────────────────────────────────────────────── */
const columns: Column<Request>[] = [
    {
        key: "service",
        header: "Service",
        render: (row) => (
            <div>
                <p style={{ fontWeight: 600, color: "#111827", fontSize: 13 }}>{row.service}</p>
                <p style={{ fontSize: 12, color: "#2563EB", marginTop: 2 }}>{row.building}</p>
            </div>
        ),
    },
    { key: "orderId", header: "Order ID" },
    { key: "orderingDate", header: "Ordering Date" },
    {
        key: "status",
        header: "Status",
        render: (row) => <StatusBadge status={row.status} />,
    },
    { key: "requiredDate", header: "Required Date" },
    { key: "companyName", header: "Company Name" },
];

/* ── Page ───────────────────────────────────────────────────── */
export default function SpDashboardPage() {
    const [filters, setFilters] = useState(["Pending", "Recent"]);
    const [search, setSearch] = useState("");

    const removeFilter = (f: string) => setFilters((prev) => prev.filter((x) => x !== f));

    const filtered = mockRequests.filter((r) =>
        r.service.toLowerCase().includes(search.toLowerCase()) ||
        r.companyName.toLowerCase().includes(search.toLowerCase()) ||
        r.orderId.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-6 w-full">

            {/* ── Row 1: Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-[#111827] m-0">
                        Welcome back, Ahmed
                    </h1>
                    <p className="text-sm text-[#6B7280] mt-1">
                        Track, manage and forecast your customers and orders.
                    </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                    {/* <AddButton addLabel="+ New Request" action={() => console.log("New Request")} /> */}
                    <div style={{ position: "relative" }}>
                        <Link href="/bo/notifications">
                            <button style={{
                                width: 40, height: 40, borderRadius: "50%",
                                background: "#fff", border: "1px solid #E5E7EB",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                cursor: "pointer", color: "#374151",
                            }}>
                                <HiOutlineBell size={20} />
                            </button>
                        </Link>
                        <span style={{
                            position: "absolute", top: 6, right: 6,
                            width: 8, height: 8, borderRadius: "50%",
                            background: "#EF4444", border: "1.5px solid #fff",
                        }} />
                    </div>
                </div>
            </div>

            {/* ── Row 3: Stat cards ── */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <StatCard title="Total Requests" value="2,420" percent="40%" data={trendUp} color="#16A34A" />
                <StatCard title="Total Spend" value="1,210 $" percent="10%" data={trendDown} color="#DC2626" />
            </div>

            {/* ── Row 4: Requests table ── */}
            <div className="flex flex-col gap-4 w-full">
                <h2 className="text-lg font-bold text-[#111827] m-0">Requests</h2>

                {/* Row 4a: Filters */}
                <div className="flex flex-wrap items-center gap-2">
                    {filters.map((f) => (
                        <Chip key={f} label={f} onRemove={() => removeFilter(f)} />
                    ))}
                    <button style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "6px 14px", borderRadius: 999,
                        background: "#fff", border: "1.5px solid #E5E7EB",
                        fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer",
                    }}>
                        <HiOutlineAdjustments size={15} />
                        More filters
                    </button>
                </div>

                {/* Row 4b: Search */}
                <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "8px 14px", borderRadius: 10,
                    border: "1.5px solid #E5E7EB", background: "#fff",
                    width: "100%", boxSizing: "border-box",
                }}>
                    <HiOutlineSearch size={16} style={{ color: "#9CA3AF", flexShrink: 0 }} />
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            border: "none", outline: "none", fontSize: 14,
                            color: "#374151", background: "transparent", width: "100%",
                        }}
                    />
                </div>

                {/* Row 4c: Table */}
                <div style={{ border: "1px solid #E5E7EB", borderRadius: 14, overflow: "auto", width: "100%" }}>
                    <DataTable columns={columns} data={filtered} theadBackgroundColor="white" />
                </div>
            </div>

        </div>
    );
}
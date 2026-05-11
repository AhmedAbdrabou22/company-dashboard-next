// "use client";
// import { useState } from "react"

// export type TicketStatus = "New" | "In progress" | "Done"

// export interface Ticket {
//     id: string
//     buildingOwner: {
//         name: string
//         email: string
//     }
//     orderId: string
//     receivingDate: string
//     status: TicketStatus
//     service: string
//     requiredDate: string
//     [key: string]: unknown
// }

// export interface TicketFilter {
//     label: string
//     value: string
// }

// export interface TicketColumn<T = Ticket> {
//     header: string
//     key?: keyof T
//     render?: (row: T) => React.ReactNode
//     align?: "left" | "right"
// }

// interface TicketsTableProps<T extends { id: string }> {
//     title: string
//     tickets: T[]
//     columns: TicketColumn<T>[]
//     searchKeys?: (keyof T)[]
//     filters?: TicketFilter[]
//     onRemoveFilter?: (value: string) => void
//     onMoreFilters?: () => void
//     onSearch?: (query: string) => void
//     pageSize?: number
//     emptyMessage?: string
// }

// const statusConfig: Record<TicketStatus, { dot: string; bg: string; text: string; border: string }> = {
//     New: { dot: "bg-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
//     "In progress": { dot: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
//     Done: { dot: "bg-slate-500", bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" },
// }

// export const StatusBadge = ({ status }: { status: TicketStatus }) => {
//     const cfg = statusConfig[status]
//     return (
//         <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
//             <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
//             {status}
//         </span>
//     )
// }

// const FilterChip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
//     <button onClick={onRemove} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#e28576] text-white hover:bg-[#e28576] transition-colors">
//         {label}
//         <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//             <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//         </svg>
//     </button>
// )

// export function TicketsTable<T extends { id: string }>({
//     title, tickets, columns, searchKeys = [], filters,
//     onRemoveFilter, onMoreFilters, onSearch, pageSize = 5, emptyMessage = "No records found.",
// }: TicketsTableProps<T>) {
//     const [currentPage, setCurrentPage] = useState(1)
//     const [searchQuery, setSearchQuery] = useState("")

//     const filtered = searchQuery
//         ? tickets.filter((row) =>
//             searchKeys.some((key) =>
//                 String(row[key] ?? "").toLowerCase().includes(searchQuery.toLowerCase())
//             )
//         )
//         : tickets

//     const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
//     const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

//     const handleSearch = (q: string) => {
//         setSearchQuery(q)
//         setCurrentPage(1)
//         onSearch?.(q)
//     }

//     return (
//         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
//             <div className="px-5 pt-5 pb-4">
//                 <h2 className="text-base font-semibold text-[#e28576] mb-4">{title}</h2>

//                 {filters && (
//                     <div className="flex flex-wrap items-center justify-between gap-3">
//                         <div className="flex flex-wrap items-center gap-2">
//                             {filters.map((f) => (
//                                 <FilterChip key={f.value} label={f.label} onRemove={() => onRemoveFilter?.(f.value)} />
//                             ))}
//                             <button onClick={onMoreFilters} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors">
//                                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//                                     <path d="M1.75 4h10.5M3.5 7h7M5.25 10h3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
//                                 </svg>
//                                 More filters
//                             </button>
//                         </div>
//                         <div className="relative">
//                             <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" viewBox="0 0 15 15" fill="none">
//                                 <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3" />
//                                 <path d="M10.5 10.5l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//                             </svg>
//                             <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => handleSearch(e.target.value)}
//                                 className="pl-9 pr-4 py-1.5 text-sm rounded-lg border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#e28576]/20 focus:border-[#e28576] transition-all w-52"
//                             />
//                         </div>
//                     </div>
//                 )}
//             </div>

//             <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                     <thead>
//                         <tr className="border-t border-b border-slate-100 bg-slate-50/60">
//                             {columns.map((col, i) => (
//                                 <th key={i} className={`px-5 py-3 text-xs font-medium text-slate-500 whitespace-nowrap ${col.align === "right" ? "text-right" : "text-left"}`}>
//                                     {col.header}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-100">
//                         {paginated.length === 0 ? (
//                             <tr>
//                                 <td colSpan={columns.length} className="px-5 py-10 text-center text-slate-400 text-sm">{emptyMessage}</td>
//                             </tr>
//                         ) : (
//                             paginated.map((row) => (
//                                 <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
//                                     {columns.map((col, i) => (
//                                         <td key={i} className={`px-5 py-4 text-slate-600 ${col.align === "right" ? "text-right" : ""}`}>
//                                             {col.render ? col.render(row) : col.key ? String(row[col.key] ?? "") : null}
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100">
//                 <div className="flex items-center gap-2">
//                     <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
//                         className="px-4 py-1.5 text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
//                         Previous
//                     </button>
//                     <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
//                         className="px-4 py-1.5 text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
//                         Next
//                     </button>
//                 </div>
//                 <span className="text-sm text-slate-500">Page {currentPage} of {totalPages}</span>
//             </div>
//         </div>
//     )
// }
"use client";

import { useState } from "react";

export type TicketStatus = "New" | "In progress" | "Done";

export interface Ticket {
    id: string;

    buildingOwner: {
        name: string;
        email: string;
    };

    orderId: string;

    receivingDate: string;

    status: TicketStatus;

    service: string;

    requiredDate: string;

    [key: string]: unknown;
}

export interface TicketFilter {
    label: string;
    value: string;
}

export interface TicketColumn<T = Ticket> {
    header: string;

    key?: keyof T;

    render?: (row: T) => React.ReactNode;

    align?: "left" | "right";
}

interface TicketsTableProps<T extends { id: string }> {
    title?: string;

    tickets: T[];

    columns: TicketColumn<T>[];

    searchKeys?: (keyof T)[];

    filters?: TicketFilter[];

    onRemoveFilter?: (value: string) => void;

    onMoreFilters?: () => void;

    onSearch?: (query: string) => void;

    pageSize?: number;

    emptyMessage?: string;

    showFilters?: boolean;
}

const statusConfig: Record<
    TicketStatus,
    {
        dot: string;
        bg: string;
        text: string;
        border: string;
    }
> = {
    New: {
        dot: "bg-emerald-500",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
    },

    "In progress": {
        dot: "bg-amber-500",
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
    },

    Done: {
        dot: "bg-slate-500",
        bg: "bg-slate-50",
        text: "text-slate-600",
        border: "border-slate-200",
    },
};

export const StatusBadge = ({
    status,
}: {
    status: TicketStatus;
}) => {
    const cfg = statusConfig[status];

    return (
        <span
            className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1 rounded-md text-xs font-medium border
        ${cfg.bg}
        ${cfg.text}
        ${cfg.border}
      `}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}
            />

            {status}
        </span>
    );
};

const FilterChip = ({
    label,
    onRemove,
}: {
    label: string;
    onRemove: () => void;
}) => (
    <button
        onClick={onRemove}
        className="
      inline-flex items-center gap-1.5
      px-3 py-1.5 rounded-lg text-sm font-medium
      bg-[#e28576] text-white
      hover:bg-[#e28576]
      transition-colors
    "
    >
        {label}

        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
        >
            <path
                d="M9 3L3 9M3 3l6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    </button>
);

export function TicketsTable<T extends { id: string }>({
    title,

    tickets,

    columns,

    searchKeys = [],

    filters,

    onRemoveFilter,

    onMoreFilters,

    onSearch,

    pageSize = 5,

    emptyMessage = "No records found.",

    showFilters = true,
}: TicketsTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");

    const filtered = searchQuery
        ? tickets.filter((row) =>
            searchKeys.some((key) =>
                String(row[key] ?? "")
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
        )
        : tickets;

    const totalPages = Math.max(
        1,
        Math.ceil(filtered.length / pageSize)
    );

    const paginated = filtered.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleSearch = (q: string) => {
        setSearchQuery(q);

        setCurrentPage(1);

        onSearch?.(q);
    };

    return (
        <div
            className="
        bg-white rounded-2xl
        border border-slate-100
        shadow-sm overflow-hidden
      "
        >

            {/* Header */}
            {(title || showFilters) && (
                <div className="px-5 pt-5 pb-4">

                    {/* Title */}
                    {title && (
                        <h2
                            className="
                text-base font-semibold
                text-[#e28576]
                mb-4
              "
                        >
                            {title}
                        </h2>
                    )}

                    {/* Filters */}
                    {showFilters && (
                        <div
                            className="
                flex flex-wrap items-center
                justify-between gap-3
              "
                        >

                            {/* Left */}
                            <div
                                className="
                  flex flex-wrap items-center gap-2
                "
                            >

                                {filters?.map((f) => (
                                    <FilterChip
                                        key={f.value}
                                        label={f.label}
                                        onRemove={() =>
                                            onRemoveFilter?.(f.value)
                                        }
                                    />
                                ))}

                                <button
                                    onClick={onMoreFilters}
                                    className="
                    inline-flex items-center gap-1.5
                    px-3 py-1.5 rounded-lg
                    text-sm font-medium
                    text-slate-600
                    border border-slate-200
                    hover:bg-slate-50
                    transition-colors
                  "
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M1.75 4h10.5M3.5 7h7M5.25 10h3.5"
                                            stroke="currentColor"
                                            strokeWidth="1.25"
                                            strokeLinecap="round"
                                        />
                                    </svg>

                                    More filters
                                </button>
                            </div>

                            {/* Search */}
                            <div className="relative">

                                <svg
                                    className="
                    absolute left-3 top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                >
                                    <circle
                                        cx="6.5"
                                        cy="6.5"
                                        r="4.5"
                                        stroke="currentColor"
                                        strokeWidth="1.3"
                                    />

                                    <path
                                        d="M10.5 10.5l2.5 2.5"
                                        stroke="currentColor"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    className="
                    pl-9 pr-4 py-1.5
                    text-sm rounded-lg
                    border border-slate-200
                    text-slate-700
                    placeholder:text-slate-400
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#e28576]/20
                    focus:border-[#e28576]
                    transition-all
                    w-52
                  "
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">

                    <thead>
                        <tr
                            className="
                border-t border-b border-slate-100
                bg-white
              "
                        >
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    className={`
                    px-5 py-3
                    text-xs font-medium
                    text-slate-500 whitespace-nowrap
                    ${col.align === "right"
                                            ? "text-right"
                                            : "text-left"
                                        }
                  `}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">

                        {paginated.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="
                    px-5 py-10
                    text-center text-slate-400 text-sm
                  "
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            paginated.map((row) => (
                                <tr
                                    key={row.id}
                                    className="
                    hover:bg-slate-50/70
                    transition-colors
                  "
                                >
                                    {columns.map((col, i) => (
                                        <td
                                            key={i}
                                            className={`
                        px-5 py-4 text-slate-600
                        ${col.align === "right"
                                                    ? "text-right"
                                                    : ""
                                                }
                      `}
                                        >
                                            {col.render
                                                ? col.render(row)
                                                : col.key
                                                    ? String(row[col.key] ?? "")
                                                    : null}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}

                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div
                className="
          flex items-center justify-between
          px-5 py-3
          border-t border-slate-100
        "
            >

                <div className="flex items-center gap-2">

                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                        className="
              px-4 py-1.5
              text-sm rounded-lg
              border border-slate-200
              text-slate-600
              hover:bg-slate-50
              disabled:opacity-40
              disabled:cursor-not-allowed
              transition-colors
            "
                    >
                        Previous
                    </button>

                    <button
                        onClick={() =>
                            setCurrentPage((p) =>
                                Math.min(totalPages, p + 1)
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="
              px-4 py-1.5
              text-sm rounded-lg
              border border-slate-200
              text-slate-600
              hover:bg-slate-50
              disabled:opacity-40
              disabled:cursor-not-allowed
              transition-colors
            "
                    >
                        Next
                    </button>
                </div>

                <span className="text-sm text-slate-500">
                    Page {currentPage} of {totalPages}
                </span>

            </div>
        </div>
    );
}
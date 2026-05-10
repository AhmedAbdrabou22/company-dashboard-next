"use client";
import { useState } from "react"
import { PageHeader } from "@/components/shared/headers/PageHeader"
import { TicketsTable, StatusBadge, type Ticket, type TicketColumn, type TicketFilter } from "@/components/superadmin/tickets/Ticketstable"

const IN_PROGRESS_TICKETS: Ticket[] = [
    { id: "ip-1", buildingOwner: { name: "Ahmed Mohamed", email: "name@company.sa" }, orderId: "SERF0032", receivingDate: "16/01/2025", status: "In progress", service: "Cleaning", requiredDate: "20/01/2025" },
    { id: "ip-2", buildingOwner: { name: "Ahmed Mohamed", email: "name@company.sa" }, orderId: "SERF0033", receivingDate: "24/01/2025", status: "In progress", service: "Plumbing", requiredDate: "06/02/2025" },
    { id: "ip-3", buildingOwner: { name: "Ahmed Mohamed", email: "name@company.sa" }, orderId: "SERF0034", receivingDate: "30/01/2025", status: "Done", service: "Security", requiredDate: "20/02/2025" },
]

const REQUESTS_COLUMNS: TicketColumn<Ticket>[] = [
    { header: "Building Owner", render: (row) => <span className="font-mono text-xs text-slate-600">{row.orderId}</span> },
    { header: "Order ID", render: (row) => <span className="font-mono text-xs text-slate-600">{row.orderId}</span> },
    { header: "Ordering Date", render: (row) => <span className="font-mono text-xs text-slate-600">{row.orderId}</span> },
    { header: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { header: "Service", key: "service" },
    { header: "Required Date", key: "requiredDate" },
    { header: "Price", key: "requiredDate" },
]

const MainRequests = () => {
    const [activeFilters, setActiveFilters] = useState<TicketFilter[]>([
        { label: "Pending", value: "pending" },
        { label: "Recent", value: "recent" },
    ])

    return (
        <div className="p-6 space-y-6 bg-white" style={{ borderRadius: 25, border: "1px solid #E5E7EB" }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4">
                <PageHeader breadcrumb="Requests assigned to your company" title="Requests" order="title-first" />
            </div>

            <TicketsTable
                title="Requests"
                tickets={IN_PROGRESS_TICKETS}
                columns={REQUESTS_COLUMNS}
                searchKeys={["orderId", "service"]}
                filters={activeFilters}
                onRemoveFilter={(val) => setActiveFilters((prev) => prev.filter((f) => f.value !== val))}
                onMoreFilters={() => console.log("More filters")}
                pageSize={5}
            />
        </div>
    )
}

export default MainRequests
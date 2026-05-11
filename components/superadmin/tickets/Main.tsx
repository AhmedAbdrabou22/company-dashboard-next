"use client";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/shared/headers/PageHeader"
import { TicketsTable, StatusBadge, type Ticket, type TicketColumn, type TicketFilter } from "./Ticketstable"

const NEW_TICKETS: Ticket[] = [
    { id: "nt-1", buildingOwner: { name: "Ahmed Mohamed", email: "name@company.sa" }, orderId: "SERF0032", receivingDate: "16/01/2025", status: "New", service: "Cleaning", requiredDate: "20/01/2025" },
    { id: "nt-2", buildingOwner: { name: "Ahmed Mohamed", email: "name@company.sa" }, orderId: "SERF0033", receivingDate: "24/01/2025", status: "New", service: "Maintenance", requiredDate: "06/02/2025" },
    { id: "nt-3", buildingOwner: { name: "Ahmed Mohamed", email: "name@company.sa" }, orderId: "SERF0034", receivingDate: "30/01/2025", status: "New", service: "Security", requiredDate: "20/02/2025" },
]

const IN_PROGRESS_TICKETS: Ticket[] = [
    { id: "ip-1", buildingOwner: { name: "Ahmed Mohamed", email: "name@company.sa" }, orderId: "SERF0032", receivingDate: "16/01/2025", status: "In progress", service: "Cleaning", requiredDate: "20/01/2025" },
    { id: "ip-2", buildingOwner: { name: "Ahmed Mohamed", email: "name@company.sa" }, orderId: "SERF0033", receivingDate: "24/01/2025", status: "In progress", service: "Plumbing", requiredDate: "06/02/2025" },
    { id: "ip-3", buildingOwner: { name: "Ahmed Mohamed", email: "name@company.sa" }, orderId: "SERF0034", receivingDate: "30/01/2025", status: "Done", service: "Security", requiredDate: "20/02/2025" },
]

const useTicketColumns = (): TicketColumn<Ticket>[] => {
    const router = useRouter()
    return [
        {
            header: "Building Owner",
            render: (row) => (
                <div>
                    <p className="font-medium text-slate-800 leading-tight">{row.buildingOwner.name}</p>
                    <p className="text-xs text-[#e28576] mt-0.5">{row.buildingOwner.email}</p>
                </div>
            ),
        },
        { header: "Order ID", render: (row) => <span className="font-mono text-xs text-slate-600">{row.orderId}</span> },
        { header: "Receiving Date", key: "receivingDate" },
        { header: "Status", render: (row) => <StatusBadge status={row.status} /> },
        { header: "Service", key: "service" },
        { header: "Required Date", key: "requiredDate" },
        {
            header: "View Details",
            align: "right",
            render: (row) => (
                <button onClick={() => router.push(`/admin/tickets/${row.id}`)} className="text-[#0086C9] text-sm font-medium hover:underline">
                    View
                </button>
            ),
        },
    ]
}

const MainTickets = () => {
    const columns = useTicketColumns()
    const [activeFilters, setActiveFilters] = useState<TicketFilter[]>([
        { label: "Pending", value: "pending" },
        { label: "Recent", value: "recent" },
    ])

    return (
        <div className="p-2 md:p-6 space-y-2 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4">
                <PageHeader breadcrumb="Dashboard / Tickets" title="Tickets" />
            </div>

            <TicketsTable
                title="New Tickets"
                tickets={NEW_TICKETS}
                columns={columns}
                searchKeys={["orderId", "service"]}
                pageSize={5}
            />

            <TicketsTable
                title="Tickets In Progress"
                tickets={IN_PROGRESS_TICKETS}
                columns={columns}
                searchKeys={["orderId", "service"]}
                filters={activeFilters}
                onRemoveFilter={(val) => setActiveFilters((prev) => prev.filter((f) => f.value !== val))}
                onMoreFilters={() => console.log("More filters")}
                onSearch={(q) => console.log("Search:", q)}
                pageSize={5}
            />
        </div>
    )
}

export default MainTickets
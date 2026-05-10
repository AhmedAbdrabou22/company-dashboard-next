
"use client";
import { PageHeader } from "@/components/shared/headers/PageHeader";
import { Ticket, TicketsTable } from "../tickets/Ticketstable";
import Link from "next/link";
const NEW_TICKETS: Ticket[] = [
    { id: "nt-1", buildingOwner: { name: "Ahmed Mohamed", email: "name@company.sa" }, orderId: "SERF0032", receivingDate: "16/01/2025", status: "New", service: "Cleaning", requiredDate: "20/01/2025" },
    { id: "nt-2", buildingOwner: { name: "Ahmed Mohamed", email: "name@company.sa" }, orderId: "SERF0033", receivingDate: "24/01/2025", status: "New", service: "Maintenance", requiredDate: "06/02/2025" },
    { id: "nt-3", buildingOwner: { name: "Ahmed Mohamed", email: "name@company.sa" }, orderId: "SERF0034", receivingDate: "30/01/2025", status: "New", service: "Security", requiredDate: "20/02/2025" },
]


const columns = [
    {
        key: "buildingOwner",
        header: "Building Owner",
        render: (row: Ticket) => (
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#111827]">
                    {row.buildingOwner.name}
                </span>

                <span className="text-xs text-[#6B7280]">
                    {row.buildingOwner.email}
                </span>
            </div>
        ),
    },

    {
        key: "orderId",
        header: "Order ID",
    },

    {
        key: "receivingDate",
        header: "Receiving Date",
    },

    {
        key: "status",
        header: "Status",
        render: (row: Ticket) => (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEFDF3] text-[#16A34A] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                {row.status}
            </div>
        ),
    },

    {
        key: "service",
        header: "Service",
    },

    {
        key: "requiredDate",
        header: "Required Date",
    },
    {
        key: "view",
        header: "View",
        render: (row: Ticket) => (
            <Link
                href={`/admin/disputes/${row.id}`}
                className="
        
        
        text-[#0086C9] text-sm font-medium
    
      "
            >
                View
            </Link>
        ),
    },
];

function MainDisputes() {

    return (
        <>
            {/* Header */}
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4">
                <PageHeader
                    breadcrumb="ongoing disputes between users and building owners"
                    title="Disputes"
                    order="title-first"
                />

            </div>

            <TicketsTable
                // title="New Tickets"
                showFilters={false}
                tickets={NEW_TICKETS}
                columns={columns}
                searchKeys={["orderId", "service"]}
                pageSize={5}
            />







        </>
    );
}

export default MainDisputes;
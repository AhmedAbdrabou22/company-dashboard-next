"use client";
import { useState, useMemo } from "react";
import { ModalTemplate } from "@/components/shared/ModalTemplate";
import { AddButton } from "@/components/shared/AddButton";
import { DataTable, type Column } from "@/components/shared/Table/DataTable";
import { TableFilters } from "@/components/shared/Table/TableFilters";
import { TableFooter } from "@/components/shared/Table/TableFooter";
import { AddUserForm } from "./AddUserForm";
import { PageHeader } from "@/components/shared/headers/PageHeader";


type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    country: string;
    status: "Active" | "In Active";
};

const MOCK_USERS: User[] = [
    { id: 1, name: "Ahmed Mohamed", email: "info@company.sa", phone: "xxxxxxxxxxx", role: "Super Admin", country: "KSA", status: "Active" },
    { id: 2, name: "Ahmed Mohamed", email: "info@company.sa", phone: "xxxxxxxxxxx", role: "Operations Manager", country: "KSA", status: "Active" },
    { id: 3, name: "Ahmed Mohamed", email: "info@company.sa", phone: "xxxxxxxxxxx", role: "Service Coordinator", country: "KSA", status: "Active" },
    { id: 4, name: "Ahmed Mohamed", email: "info@company.sa", phone: "xxxxxxxxxxx", role: "Customer Support", country: "KSA", status: "In Active" },
    { id: 5, name: "Ahmed Mohamed", email: "info@company.sa", phone: "xxxxxxxxxxx", role: "Finance Manager", country: "KSA", status: "In Active" },
    { id: 6, name: "Sara Ali", email: "sara@company.sa", phone: "xxxxxxxxxxx", role: "HR Manager", country: "KSA", status: "Active" },
    { id: 7, name: "Omar Hassan", email: "omar@company.sa", phone: "xxxxxxxxxxx", role: "Super Admin", country: "UAE", status: "Active" },
];

const SORT_OPTIONS = [
    { label: "Name A–Z", value: "name_asc" },
    { label: "Name Z–A", value: "name_desc" },
    { label: "Role", value: "role" },
    { label: "Status", value: "status" },
];

const COLUMNS: Column<User>[] = [
    {
        key: "name",
        header: "Name",
        render: (row) => (
            <div className="flex items-center gap-3">
                <div>
                    <p className="font-medium text-gray-800 text-sm">{row.name}</p>
                    <p className="text-xs text-gray-400">{row.email}</p>
                </div>
            </div>
        ),
    },
    { key: "phone", header: "Phone number" },
    { key: "role", header: "Role" },
    { key: "country", header: "Country" },
    {
        key: "status",
        header: "Status",
        render: (row) => (
            <span className={`font-medium text-sm ${row.status === "Active" ? "text-emerald-500" : "text-orange-500"}`}>
                {row.status}
            </span>
        ),
    },
];

function MainOwners() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dense, setDense] = useState(false);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

    console.log(selectedIds)
    const showCheckboxes = true;

    const filteredData = useMemo(() => {
        let result = [...MOCK_USERS];

        // Search
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (u) =>
                    u.name.toLowerCase().includes(q) ||
                    u.email.toLowerCase().includes(q) ||
                    u.role.toLowerCase().includes(q)
            );
        }

        // Sort
        if (sortValue === "name_asc") result.sort((a, b) => a.name.localeCompare(b.name));
        if (sortValue === "name_desc") result.sort((a, b) => b.name.localeCompare(a.name));
        if (sortValue === "role") result.sort((a, b) => a.role.localeCompare(b.role));
        if (sortValue === "status") result.sort((a, b) => a.status.localeCompare(b.status));

        return result;
    }, [searchQuery, sortValue]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, page, rowsPerPage]);

    const handleRowsPerPageChange = (val: number) => {
        setRowsPerPage(val);
        setPage(1);
    };

    return (
        <>
            {/* Header */}
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4">
                <PageHeader
                    breadcrumb="Dashboard / Users / Building Owners"
                    title="Building Owners"
                />
                <AddButton
                    action={() => setIsModalOpen(true)}
                    addLabel="Add New Building Owner"
                    className="w-full sm:w-auto"
                />
            </div>

            {/* Filters */}
            <TableFilters
                className="mb-4"
                sortOptions={SORT_OPTIONS}
                onSearchChange={(val) => { setSearchQuery(val); setPage(1); }}
                onSortChange={setSortValue}
            />

            {/* Table */}
            <DataTable
                columns={COLUMNS}
                data={paginatedData}
                showCheckboxes={showCheckboxes}
                onSelectionChange={setSelectedIds}
            />


            <TableFooter
                dense={dense}
                onDenseToggle={setDense}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                totalRows={filteredData.length}
                currentPage={page}
                onPageChange={setPage}
            />

            
            <ModalTemplate
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New User"
                subtitle="Add employee and give him/her permissions"
            >
                <AddUserForm
                    onClose={() => setIsModalOpen(false)}
                />
            </ModalTemplate>
        </>
    );
}

export default MainOwners;
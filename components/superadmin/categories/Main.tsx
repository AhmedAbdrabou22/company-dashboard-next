"use client";
import { TableFilters } from "@/components/shared/Table/TableFilters";
import { PageHeader } from "@/components/shared/headers/PageHeader";
import ServicesGrid from "./MainData";





const SORT_OPTIONS = [
    { label: "Name A–Z", value: "name_asc" },
    { label: "Name Z–A", value: "name_desc" },
    { label: "Role", value: "role" },
    { label: "Status", value: "status" },
];



function MainCategories() {

    return (
        <>
          
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4">
                <PageHeader
                    breadcrumb="Dashboard / Categories"
                    title="Categories"
                />
                {/* <AddButton
                    action={() => setIsModalOpen(true)}
                    addLabel="Add New Building Owner"
                    className="w-full sm:w-auto"
                /> */}
            </div>

            {/* Filters */}
            <TableFilters
                className="mb-4"
                sortOptions={SORT_OPTIONS}
                // onSearchChange={(val) => { setSearchQuery(val); setPage(1); }}
                // onSortChange={setSortValue}
            />

            <ServicesGrid/>



            
            
        </>
    );
}

export default MainCategories;
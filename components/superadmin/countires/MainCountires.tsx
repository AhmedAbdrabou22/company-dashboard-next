"use client";

import { useState } from "react";
import { ModalTemplate } from "@/components/shared/ModalTemplate";
import { AddButton } from "@/components/shared/AddButton";
import { PageHeader } from "@/components/shared/headers/PageHeader";
import { AddUserCountryForm } from "./AddCountry";
import { Country } from "./add-country";
import { CountryCard } from "./Countrycard";



const MOCK_COUNTRIES: Country[] = [
    { id: 1, name: "Saudi Arabia", code: "KSA", currency: "RSA", status: "Active" },
    { id: 2, name: "Egypt", code: "EG", currency: "EGP", status: "Inactive" },
    { id: 3, name: "Emirates", code: "UAE", currency: "DAE", status: "Inactive" },
    { id: 4, name: "Oman", code: "OM", currency: "OAE", status: "Inactive" },
];


function MainCountries() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [countryData, setCountryData] = useState<Partial<Country>>({}); 

    const refetch = () => {
        console.log("refetch"); 
    };

    return (
        <>
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4">
                <PageHeader
                    breadcrumb="Add or remove cities, areas and zones to the system"
                    title="Cities And Areas"
                    order="title-first"
                />
            </div>

            {/* Countries Header + Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4">
                <PageHeader title="Countries" order="title-first" />
                <AddButton
                    action={() => {
                        setCountryData({});   // نفس: setCountryData({}) في مثالك
                        setIsModalOpen(true);
                    }}
                    addLabel="Add"
                    className="w-full sm:w-auto"
                />
            </div>

            {/* ── CardGrid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {MOCK_COUNTRIES.map((country) => (
                    <CountryCard
                        key={country.id}
                        country={country}
                        setIsModalOpen={setIsModalOpen}   // نفس: setModel
                        setCountryData={setCountryData}   // نفس: setData
                        refetch={refetch}
                    />
                ))}
            </div>

            {/* Single Modal — Add & Edit (نفس pattern المثال بالظبط) */}
            <ModalTemplate
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={Object.keys(countryData).length ? `Edit — ${countryData.name}` : "Add New Country"}
                subtitle=""
                width="sm:max-w-2xl"
            >
                <AddUserCountryForm
                    onClose={() => setIsModalOpen(false)}
                    update={countryData}
                    refetch={refetch}
                />
            </ModalTemplate>
        </>
    );
}

export default MainCountries;
"use client";
import { Button } from "@/components/shared/buttons/RejectButton";


import { Dispatch, SetStateAction } from "react";

export type Country = {
    id: number | string;
    name: string;
    code: string;
    currency: string;
    status: "Active" | "Inactive";
};

type CountryCardProps = {
    country: Country;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setCountryData: Dispatch<SetStateAction<Partial<Country>>>;
    refetch: () => void;
};

export const CountryCard = ({
    country,
    setIsModalOpen,
    setCountryData,
    refetch,
}: CountryCardProps) => {

    const handleEdit = () => {
        setCountryData(country);  // نفس: setData(info?.row?.original)
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        console.log("Delete:", country.id);
        // TODO: confirm → mutate → refetch()
    };

    return (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Header */}
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-[#111827] font-bold text-lg leading-tight">
                    {country.name}
                </h3>
                <span className={`text-sm font-medium ${country.status === "Active" ? "text-[#16A34A]" : "text-[#6B7280]"}`}>
                    {country.status}
                </span>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1 text-sm text-[#374151]">
                <p><span className="font-medium">Code:</span>{country.code}</p>
                <p><span className="font-medium">Currency:</span>{country.currency}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
                <Button variant="primary" onClick={handleEdit} className="flex-1">
                    Edit
                </Button>
                <Button variant="danger" onClick={handleDelete} className="flex-1">
                    Delete
                </Button>
            </div>
        </div>
    );
};
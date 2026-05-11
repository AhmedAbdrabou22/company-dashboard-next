"use client";
import { useState } from "react";

type SortOption = {
    label: string;
    value: string;
};

type TableFilters_TP = {
    searchPlaceholder?: string;
    onSearchChange?: (value: string) => void;
    sortOptions?: SortOption[];
    onSortChange?: (value: string) => void;
    className?: string;
};

export const TableFilters = ({
    searchPlaceholder = "Search For Something",
    onSearchChange,
    sortOptions = [],
    onSortChange,
    className = "",
}: TableFilters_TP) => {
    const [search, setSearch] = useState("");
    const [sortOpen, setSortOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState<SortOption | null>(null);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        onSearchChange?.(e.target.value);
    };

    const handleSort = (option: SortOption) => {
        setSelectedSort(option);
        onSortChange?.(option.value);
        setSortOpen(false);
    };

    return (
        <div
            className={`flex flex-col sm:flex-row sm:items-center gap-3 px-3 py-3 rounded-xl ${className}`}
            style={{
                background: "#FFFFFF",

            }}
        >
            {/* SEARCH BOX */}
            <div
                className="flex items-center flex-1 gap-2 px-3 py-2 rounded-lg"
                style={{
                    border: "0.93px solid #F3F0F7",
                    background: "#fff",
                }}
            >
                <svg
                    className="w-4 h-4 shrink-0 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>

                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder={searchPlaceholder}
                    className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
                />
            </div>

            {/* SORT BOX */}
            <div
                className="relative w-full sm:w-auto px-3 py-2 rounded-lg"
                style={{
                    border: "0.93px solid #F3F0F7",
                    background: "#fff",
                }}
            >
                <button
                    onClick={() => setSortOpen((prev) => !prev)}
                    className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <span>{selectedSort ? selectedSort.label : "Sort By"}</span>

                    <svg
                        className={`w-4 h-4 transition-transform duration-200 ${sortOpen ? "rotate-180" : ""
                            }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </button>

                {sortOpen && sortOptions.length > 0 && (
                    <div
                        className="absolute right-0 top-full mt-2 min-w-[160px] w-full sm:w-auto rounded-xl shadow-lg z-50 overflow-hidden"
                        style={{
                            background: "#FFFFFF",
                            border: "0.93px solid #F3F0F7",
                        }}
                    >
                        {sortOptions.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => handleSort(opt)}
                                className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${selectedSort?.value === opt.value
                                    ? "text-[#e28576] font-medium"
                                    : "text-gray-600"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
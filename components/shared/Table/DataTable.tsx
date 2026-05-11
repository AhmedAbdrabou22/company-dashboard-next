"use client";
// components/shared/DataTable.tsx

import { useState } from "react";

export type Column<T> = {
    key: keyof T | string;
    header: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
};

type DataTable_TP<T extends { id: string | number }> = {
    columns: Column<T>[];
    data: T[];
    showCheckboxes?: boolean;
    onSelectionChange?: (selectedIds: (string | number)[]) => void;
    className?: string;
    theadBackgroundColor?: string; // إضافة الخاصية الجديدة
};

export function DataTable<T extends { id: string | number }>({
    columns,
    data,
    showCheckboxes = false,
    onSelectionChange,
    className = "",
    theadBackgroundColor = "#F9FAFB", // القيمة الافتراضية
}: DataTable_TP<T>) {
    const [selected, setSelected] = useState<Set<string | number>>(new Set());

    const toggleAll = () => {
        const newSet =
            selected.size === data.length
                ? new Set<string | number>()
                : new Set(data.map((r) => r.id));
        setSelected(newSet);
        onSelectionChange?.([...newSet]);
    };

    const toggleRow = (id: string | number) => {
        const newSet = new Set(selected);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelected(newSet);
        onSelectionChange?.([...newSet]);
    };

    const allChecked = data.length > 0 && selected.size === data.length;
    const indeterminate = selected.size > 0 && selected.size < data.length;

    return (
        <div
            className={`overflow-x-auto rounded-xl ${className}`}
            style={{
                background: "#FFFFFF",
                border: "1px solid #E4E7EC",
            }}
        >
            <table className="w-full border-collapse">
                <thead>
                    <tr style={{ background: theadBackgroundColor }}>
                        {showCheckboxes && (
                            <th className="w-10 px-4 py-4 text-left">
                                <Checkbox
                                    checked={allChecked}
                                    indeterminate={indeterminate}
                                    onChange={toggleAll}
                                />
                            </th>
                        )}
                        {columns.map((col) => (
                            <th
                                key={String(col.key)}
                                className={`px-4 py-4 text-left text-xs font-semibold tracking-wide text-gray-500 uppercase ${col.className ?? ""}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, idx) => {
                        const isSelected = selected.has(row.id);
                        return (
                            <tr
                                key={row.id}
                                className={`transition-colors duration-150 ${isSelected ? "bg-blue-50/60" : "hover:bg-gray-50/70"
                                    } ${idx !== data.length - 1 ? "border-b border-[#E4E7EC]" : ""}`}
                            >
                                {showCheckboxes && (
                                    <td className="w-10 px-4 py-5">
                                        <Checkbox
                                            checked={isSelected}
                                            onChange={() => toggleRow(row.id)}
                                        />
                                    </td>
                                )}
                                {columns.map((col) => (
                                    <td
                                        key={String(col.key)}
                                        className={`px-4 py-5 text-sm text-gray-700 ${col.className ?? ""}`}
                                    >
                                        {col.render
                                            ? col.render(row)
                                            : String((row as Record<string, unknown>)[String(col.key)] ?? "")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

/* ── Internal Checkbox ── */
type Checkbox_TP = {
    checked: boolean;
    indeterminate?: boolean;
    onChange: () => void;
};

const Checkbox = ({ checked, indeterminate = false, onChange }: Checkbox_TP) => (
    <button
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : checked}
        onClick={onChange}
        className={`w-[18px] h-[18px] rounded flex items-center justify-center border transition-all duration-150 ${checked || indeterminate
            ? "bg-[#e28576] border-[#e28576]"
            : "bg-white border-gray-300 hover:border-[#e28576]"
            }`}
    >
        {indeterminate && !checked && (
            <span className="block w-2 h-0.5 bg-white rounded-full" />
        )}
        {checked && (
            <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        )}
    </button>
);
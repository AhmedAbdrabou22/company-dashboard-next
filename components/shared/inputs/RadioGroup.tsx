"use client";

import { useField } from "formik";
import { Tooltip } from "./Tooltip";

export type RadioOption = { label: string; value: string };

type RadioGroup_TP = {
    label: string;
    name: string;
    options: RadioOption[];
    required?: boolean;
    tooltip?: string;
    className?: string;
};

export const RadioGroup = ({
    label,
    name,
    options,
    required = false,
    tooltip,
    className = "",
}: RadioGroup_TP) => {
    const [field, , helpers] = useField(name);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                {label}
                {required && <span className="text-red-500">*</span>}
                {tooltip && <Tooltip text={tooltip} />}
            </label>
            <div className="flex items-center gap-3 flex-wrap">
                {options.map((opt) => {
                    const isSelected = field.value === opt.value;
                    return (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => helpers.setValue(opt.value)}
                            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150 flex-1 min-w-[160px]
                ${isSelected
                                    ? "border-[# 1A2A4B] bg-white text-[# 1A2A4B] ring-2 ring-[# 1A2A4B]/10"
                                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                }`}
                        >
                            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                ${isSelected ? "border-[# 1A2A4B]" : "border-gray-300"}`}
                            >
                                {isSelected && <span className="w-2 h-2 rounded-full bg-[# 1A2A4B]" />}
                            </span>
                            {opt.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
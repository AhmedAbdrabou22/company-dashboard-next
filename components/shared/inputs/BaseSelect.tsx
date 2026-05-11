"use client";


import { useField } from "formik";

type SelectOption = { label: string; value: string };

type BaseSelect_TP = {
    label: string;
    name: string;
    options: SelectOption[];
    required?: boolean;
    placeholder?: string;
    className?: string;
};

export const BaseSelect = ({
    label,
    name,
    options,
    required = false,
    placeholder = "Select...",
    className = "",
}: BaseSelect_TP) => {
    const [field, meta] = useField(name);
    const hasError = meta.touched && meta.error;

    return (
        <div className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 ${className}`}>
            <label className="text-sm font-medium text-gray-700 sm:w-36 sm:shrink-0 sm:pt-2.5">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <div className="flex-1 flex flex-col gap-1">
                <div className="relative">
                    <select
                        {...field}
                        className={`w-full px-4 py-2.5 text-sm bg-white rounded-lg border outline-none appearance-none transition-all duration-150 cursor-pointer
                            focus:ring-2 focus:ring-[#e28576]/20 focus:border-[#e28576]
                            ${field.value ? "text-gray-800" : "text-gray-400"}
                            ${hasError
                                ? "border-red-400 focus:ring-red-100 focus:border-red-400"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                    >
                        <option value="" disabled hidden>{placeholder}</option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                {hasError && <p className="text-xs text-red-500">{meta.error}</p>}
            </div>
        </div>
    );
};
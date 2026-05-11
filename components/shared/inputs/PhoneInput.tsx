"use client";

import { useField } from "formik";

type PhoneInput_TP = {
    name: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    className?: string;
};

export const PhoneInput = ({
    name,
    label,
    required = false,
    placeholder = "138478385",
    className = "",
}: PhoneInput_TP) => {
    const [field, meta] = useField(name);
    const hasError = meta.touched && Boolean(meta.error);

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>

            <div
                className={`flex items-center w-full bg-white rounded-lg border transition-all duration-150
                    ${hasError
                        ? "border-red-400 ring-2 ring-red-100"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
            >
                {/* Country code */}
                <span className="px-4 py-2.5 text-sm text-gray-800 border-r border-gray-200 shrink-0">
                    +966
                </span>

                {/* Divider is the border-r above — no extra element needed */}

                <input
                    id={name}
                    {...field}
                    type="tel"
                    placeholder={placeholder}
                    className="flex-1 px-4 py-2.5 text-sm text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
                    onFocus={(e) => {
                        if (!hasError) {
                            const wrapper = e.target.closest("div")!;
                            wrapper.classList.add("ring-2", "ring-[#e28576]/20", "!border-[#e28576]");
                        }
                    }}
                    onBlur={(e) => {
                        field.onBlur(e);
                        const wrapper = e.target.closest("div")!;
                        wrapper.classList.remove("ring-2", "ring-[#e28576]/20", "!border-[#e28576]");
                    }}
                />
            </div>

            {hasError && (
                <p className="text-xs text-red-500">{meta.error}</p>
            )}
        </div>
    );
};
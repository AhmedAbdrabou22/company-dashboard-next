"use client";

import { useState } from "react";
import { useField } from "formik";
import { Tooltip } from "./Tooltip";

export type SelectOption = { label: string; value: string };

type BaseSelect_TP = {
  label: string;
  name: string;
  options: SelectOption[];
  required?: boolean;
  placeholder?: string;
  className?: string;
  tooltip?: string;
};

export const BaseSelectAdv = ({
  label,
  name,
  options,
  required = false,
  placeholder = "Selected Option",
  className = "",
  tooltip,
}: BaseSelect_TP) => {
  const [field, meta, helpers] = useField(name);
  const [open, setOpen] = useState(false);
  const hasError = meta.touched && Boolean(meta.error);
  const selected = options.find((o) => o.value === field.value);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          onBlur={() => {
            helpers.setTouched(true);
            setTimeout(() => setOpen(false), 150);
          }}
          className={`w-full px-4 py-2.5 text-sm bg-white rounded-lg border outline-none text-left flex items-center justify-between transition-all duration-150
            focus:ring-2 focus:ring-[# 1A2A4B]/20 focus:border-[# 1A2A4B]
            ${hasError ? "border-red-400" : "border-gray-200 hover:border-gray-300"}
            ${selected ? "text-gray-800" : "text-gray-400"}`}
        >
          {selected ? selected.label : placeholder}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div className="absolute z-40 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  helpers.setValue(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors
                  hover:bg-gray-50
                  ${field.value === opt.value ? "text-[# 1A2A4B] font-semibold bg-blue-50/50" : "text-gray-700"}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {hasError && <p className="text-xs text-red-500">{meta.error}</p>}
    </div>
  );
};
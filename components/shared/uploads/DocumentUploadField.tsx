"use client";
// shared/inputs/DocumentUploadField.tsx
import { useField } from "formik";

type DocumentUploadField_TP = {
    label: string;
    fileName?: string;
    fileSizeLabel?: string;
    uploadName: string;   // اسم الـ field للـ file
    expiryName: string;   // اسم الـ field للـ expiry date
    required?: boolean;
    className?: string;
};

export const DocumentUploadField = ({
    label,
    fileName,
    fileSizeLabel = "200 KB",
    // uploadName,
    expiryName,
    required = false,
    className = "",
}: DocumentUploadField_TP) => {
    const [, expiryMeta, expiryHelpers] = useField(expiryName);
    const hasError = expiryMeta.touched && expiryMeta.error;

    return (
        <div className={`flex items-start gap-4 ${className}`}>
            {/* Label */}
            <label className="text-sm font-medium text-gray-700 w-36 shrink-0 pt-2.5">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>

            {/* File + Expiry */}
            <div className="flex-1 flex flex-col sm:flex-row gap-3">
                {/* File display */}
                <div className="flex items-center gap-3 flex-1 px-3 py-2.5 rounded-lg border border-gray-200 bg-white">
                    {/* PDF icon */}
                    <div className="w-9 h-9 rounded-md bg-red-50 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 2v6h6M9 13h6M9 17h4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate">{fileName ?? label}</p>
                        <p className="text-xs text-gray-400">{fileSizeLabel}</p>
                    </div>
                    {/* Radio placeholder */}
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
                </div>

                {/* Expiry Date */}
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-xs text-gray-500">Expiry Date</label>
                    <input
                        type="date"
                        onChange={(e) => expiryHelpers.setValue(e.target.value)}
                        className={`w-full px-4 py-2.5 text-sm text-gray-800 bg-white rounded-lg border outline-none transition-all duration-150
                            focus:ring-2 focus:ring-[# 1A2A4B]/20 focus:border-[# 1A2A4B]
                            ${hasError
                                ? "border-red-400"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                    />
                    {hasError && <p className="text-xs text-red-500">{expiryMeta.error}</p>}
                </div>
            </div>
        </div>
    );
};
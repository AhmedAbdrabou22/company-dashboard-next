"use client";
// // BaseInput.tsx
// import { useField } from "formik";

// type BaseInput_TP = {
//     label: string;
//     name: string;
//     required?: boolean;
//     placeholder?: string;
//     type?: string;
//     className?: string;
// };

// export const BaseInput = ({
//     label,
//     name,
//     required = false,
//     placeholder = "",
//     type = "text",
//     className = "",
// }: BaseInput_TP) => {
//     const [field, meta] = useField(name);
//     const hasError = meta.touched && meta.error;

//     return (
//         <div className={`flex items-center gap-4 ${className}`}>
//             {/* Label */}
//             <label className="text-sm font-medium text-gray-700 w-24 shrink-0">
//                 {label}
//                 {required && <span className="text-red-500 ml-0.5">*</span>}
//             </label>

//             {/* Input + Error */}
//             <div className="flex-1 flex flex-col gap-1">
//                 <input
//                     {...field}
//                     type={type}
//                     placeholder={placeholder}
//                     className={`w-full px-4 py-2.5 text-sm text-gray-800 bg-white rounded-lg border outline-none transition-all duration-150
//                         placeholder:text-gray-400
//                         focus:ring-2 focus:ring-[#e28576]/20 focus:border-[#e28576]
//                         ${hasError
//                             ? "border-red-400 focus:ring-red-100 focus:border-red-400"
//                             : "border-gray-200 hover:border-gray-300"
//                         }`}
//                 />
//                 {hasError && (
//                     <p className="text-xs text-red-500">{meta.error}</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// BaseInput.tsx


import { useField } from "formik";

type BaseInput_TP = {
    label: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    type?: string;
    className?: string;
};

export const BaseInput = ({
    label,
    name,
    required = false,
    placeholder = "",
    type = "text",
    className = "",
}: BaseInput_TP) => {
    const [field, meta] = useField(name);
    const hasError = meta.touched && meta.error;

    return (
        <div className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 ${className}`}>
            <label className="text-sm font-medium text-gray-700 sm:w-36 sm:shrink-0 sm:pt-2.5">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <div className="flex-1 flex flex-col gap-1">
                <input
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    className={`w-full px-4 py-2.5 text-sm text-gray-800 bg-white rounded-lg border outline-none transition-all duration-150
                        placeholder:text-gray-400
                        focus:ring-2 focus:ring-[#e28576]/20 focus:border-[#e28576]
                        ${hasError
                            ? "border-red-400 focus:ring-red-100 focus:border-red-400"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                />
                {hasError && <p className="text-xs text-red-500">{meta.error}</p>}
            </div>
        </div>
    );
};
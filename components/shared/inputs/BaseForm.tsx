// "use client";

// import { useField } from "formik";

// type BaseInput_TP = {
//     label: string;
//     name: string;
//     required?: boolean;
//     placeholder?: string;
//     type?: string;
//     className?: string;
// };

// export const BaseForm = ({
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
//         <div className={`flex flex-col gap-1.5 ${className}`}>
//             <label className="text-sm font-medium text-gray-700">
//                 {label}
//                 {required && <span className="text-red-500 ml-0.5">*</span>}
//             </label>
//             <div className="flex flex-col gap-1">
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
//                 {hasError && <p className="text-xs text-red-500">{meta.error}</p>}
//             </div>
//         </div>
//     );
// };
"use client";

import { useField } from "formik";
import { Tooltip } from "./Tooltip";

type BaseForm_TP = {
    label: string;
    name: string;
    required?: boolean;
    placeholder?: string;
    type?: string;
    className?: string;
    tooltip?: string;
};

export const BaseForm = ({
    label,
    name,
    required = false,
    placeholder = "",
    type = "text",
    className = "",
    tooltip,
}: BaseForm_TP) => {
    const [field, meta] = useField(name);
    const hasError = meta.touched && meta.error;

    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                {label}
                {required && <span className="text-red-500">*</span>}
                {tooltip && <Tooltip text={tooltip} />}
            </label>
            <div className="flex flex-col gap-1">
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
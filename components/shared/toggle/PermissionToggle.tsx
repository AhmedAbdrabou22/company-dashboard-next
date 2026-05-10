"use client";
// components/shared/PermissionToggle.tsx

type PermissionToggle_TP = {
    label: string;
    description?: string;
    value: boolean;
    onChange: (val: boolean) => void;
};

export const PermissionToggle = ({
    label,
    description,
    value,
    onChange,
}: PermissionToggle_TP) => (
    <div className="flex items-start gap-3">
        <button
            type="button"
            role="switch"
            aria-checked={value}
            onClick={() => onChange(!value)}
            className={`relative mt-0.5 w-10 h-[22px] rounded-full shrink-0 transition-colors duration-200 ${value ? "bg-[#70423f]" : "bg-gray-300"
                }`}
        >
            <span
                className={`absolute top-[3px] left-[3px] w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${value ? "translate-x-[18px]" : "translate-x-0"
                    }`}
            />
        </button>
        <div>
            <p className="text-sm font-semibold text-gray-800">{label}</p>
            {description && (
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{description}</p>
            )}
        </div>
    </div>
);
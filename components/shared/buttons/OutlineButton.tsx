"use client";
// components/shared/OutlineButton.tsx

import { FaSpinner } from "react-icons/fa";

type OutlineButton_TP = {
    text: string;
    onClick?: () => void;
    isLoading?: boolean;
    loadingText?: string;
    type?: "button" | "submit" | "reset";
    className?: string;
    disabled?: boolean;
};

export const OutlineButton = ({
    text,
    onClick,
    isLoading = false,
    loadingText = "Loading...",
    type = "button",
    className = "",
    disabled = false,
}: OutlineButton_TP) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading || disabled}
            className={`
                flex items-center justify-center gap-2
                px-5 py-2.5 w-full
                text-sm font-medium text-gray-700
                bg-white border border-gray-300
                rounded-lg
                hover:bg-gray-50 hover:border-gray-400
                active:scale-[0.98]
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
        >
            {isLoading ? (
                <>
                    <FaSpinner className="animate-spin" size={15} />
                    {loadingText}
                </>
            ) : (
                text
            )}
        </button>
    );
};
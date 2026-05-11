"use client";
import { FaSpinner } from "react-icons/fa";

type PrimaryButton_TP = {
    text: string;
    onClick?: () => void;
    isLoading?: boolean;
    loadingText?: string;
    type?: "button" | "submit" | "reset";
    className?: string;
    disabled?: boolean;
};

export const PrimaryButton = ({
    text,
    onClick,
    isLoading = false,
    loadingText = "Loading...",
    type = "submit",
    className = "",
    disabled = false,
}: PrimaryButton_TP) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isLoading || disabled}
            className={`
                flex items-center justify-center gap-2
                px-4 py-2
                text-sm font-medium text-white
                bg-[#e28576]
                rounded-lg
                hover:bg-[#e28576]
                active:bg-[#5a3532]
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
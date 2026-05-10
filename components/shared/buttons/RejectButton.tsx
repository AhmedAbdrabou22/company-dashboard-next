import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
    variant?: "primary" | "danger" | "secondary";
}

export const Button = ({
    children,
    onClick,
    type = "button",
    disabled = false,
    className = "",
    variant = "primary",
}: ButtonProps) => {
    const variants = {
        primary: "bg-[#70423f] text-white hover:opacity-90",
        danger: "bg-[#FF0000] text-white hover:bg-red-700",
        secondary:
            "bg-white border border-[#E5E7EB] text-[#111827] hover:bg-gray-50",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        px-8 py-2.5 rounded-md text-sm font-medium
        transition-all duration-200
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
        >
            {children}
        </button>
    );
};
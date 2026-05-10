"use client";
import { FaSpinner } from "react-icons/fa";

type Props = {
    text: string;
    loadingText?: string;
    isLoading?: boolean;
    className?: string;
};

const Button = ({
    text,
    loadingText = "Loading...",
    isLoading = false,
    className = "",
}: Props) => {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className={`primary-btn ${className}`}
        >
            {isLoading ? (
                <>
                    <FaSpinner className="spinner" size={18} />
                    {loadingText}
                </>
            ) : (
                text
            )}
        </button>
    );
};

export default Button;
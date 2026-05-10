"use client";

import { useState } from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

export const Tooltip = ({ text }: { text: string }) => {
    const [show, setShow] = useState(false);

    return (
        <span className="relative inline-flex items-center">
            <button
                type="button"
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                onFocus={() => setShow(true)}
                onBlur={() => setShow(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="More info"
            >
                <HiOutlineQuestionMarkCircle size={16} />
            </button>
            {show && (
                <span className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-48 px-3 py-2 text-xs text-white bg-gray-800 rounded-lg shadow-lg pointer-events-none">
                    {text}
                    <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800" />
                </span>
            )}
        </span>
    );
};
"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";

type ModalTemplateProps_TP = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    children: ReactNode;
    Icon?: IconType;

    // NEW
    width?: string;
};

export const ModalTemplate = ({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    Icon,
    width = "sm:max-w-xl", // default width
}: ModalTemplateProps_TP) => {

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEsc);

        return () =>
            document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center"
            style={{ fontFamily: "Inter, sans-serif" }}
        >

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/30 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={`
          relative w-full ${width} sm:mx-4
          bg-white
          rounded-t-2xl sm:rounded-2xl
          shadow-xl
          flex flex-col
          max-h-[92dvh] sm:max-h-[90vh]
          transition-all duration-300
        `}
            >
                {(title || subtitle) && (
                    <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-100 shrink-0">

                        <div className="flex items-center gap-3">

                            {Icon && (
                                <div className="w-10 h-10 rounded-xl bg-white shadow flex items-center justify-center shrink-0">
                                    <Icon size={20} color="# 1A2A4B" />
                                </div>
                            )}

                            <div>
                                {title && (
                                    <h3 className="text-base font-semibold text-gray-900">
                                        {title}
                                    </h3>
                                )}

                                {subtitle && (
                                    <p className="text-sm text-gray-400 mt-0.5">
                                        {subtitle}
                                    </p>
                                )}
                            </div>

                        </div>

                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1 transition-all duration-150 shrink-0"
                        >
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        </button>

                    </div>
                )}

                {/* Content */}
                <div className="overflow-y-auto px-6 py-5 flex-1">
                    {children}
                </div>

            </div>
        </div>
    );
};
"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/shared/buttons/PrimaryBtn";

interface RequestSuccessProps {
    requestId?: string;
}

export default function RequestSuccess({
    requestId = "REQ-2024-001234",
}: RequestSuccessProps) {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            {/* Double-check animated icon */}
            <div className="mb-8">
                <svg
                    width="120"
                    height="100"
                    viewBox="0 0 120 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 55 L30 78 L65 30"
                        stroke="#e28576"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="120"
                        style={{ animation: "drawCheck 0.6s ease-out forwards" }}
                    />
                    <path
                        d="M38 55 L58 78 L93 30"
                        stroke="#e28576"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="120"
                        style={{
                            animation: "drawCheck 0.6s ease-out 0.25s forwards",
                            opacity: 0,
                        }}
                    />
                </svg>
            </div>

            <p className="text-base text-gray-500 mb-1">
                Your Request has been successfully Submitted
            </p>
            <p className="text-2xl font-bold text-[#e28576] mb-8">
                Request ID: {requestId}
            </p>

            <PrimaryButton
                text="Track Your Request"
                type="button"
                onClick={() => router.push(`/bo/requests/${requestId}`)}
                className="px-10 py-3 text-base rounded-xl"
            />

            <style>{`
                @keyframes drawCheck {
                    from { stroke-dashoffset: 120; opacity: 0; }
                    to   { stroke-dashoffset: 0;   opacity: 1; }
                }
            `}</style>
        </div>
    );
}
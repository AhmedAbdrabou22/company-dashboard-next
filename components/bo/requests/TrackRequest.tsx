"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/shared/buttons/PrimaryBtn";
import { ModalTemplate } from "@/components/shared/ModalTemplate";
import { HiOutlineExclamationCircle } from "react-icons/hi2";


type RequestStatus = "submitted" | "in_progress" | "completed";

interface TrackRequestProps {
    requestId?: string;
    orderDate?: string;
    status?: RequestStatus;
    details?: {
        fullName: string;
        buildingAddress: string;
        unitNumber: string;
        floorNumber: string;
        apartmentNumber: string;
        contactNumber: string;
        contactEmail: string;
        serviceType: string;
        description: string;
        urgencyLevel: string;
        contactMethod: string;
        mediaCount?: number;
    };
    onAccept?: () => void;
    onReject?: (reason: string) => void;
}


const steps: { key: RequestStatus; label: string; date: string }[] = [
    { key: "submitted", label: "Submitted", date: "01 November, 2021" },
    { key: "in_progress", label: "In progress", date: "01 November, 2021" },
    { key: "completed", label: "Completed", date: "02 November, 2021" },
];

const statusOrder: RequestStatus[] = ["submitted", "in_progress", "completed"];

function StepIndicator({ status }: { status: RequestStatus }) {
    const currentIndex = statusOrder.indexOf(status);

    return (
        <div className="flex flex-col gap-0 py-2">
            {steps.map((step, i) => {
                const isDone = i <= currentIndex;
                const isActive = i === currentIndex;
                const isLast = i === steps.length - 1;

                return (
                    <div key={step.key} className="flex flex-col">
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isDone ? "bg-[#e28576]" : "bg-white border-2 border-[#D0D5DD]"
                                        }`}
                                >
                                    {isDone && (
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path
                                                d="M2.5 7L5.5 10L11.5 4"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    )}
                                </div>
                                {!isLast && (
                                    <div
                                        className={`w-0.5 h-10 mt-1 transition-all duration-300 ${i < currentIndex ? "bg-[#e28576]" : "bg-[#D0D5DD]"
                                            }`}
                                    />
                                )}
                            </div>

                            <div className="pt-0.5">
                                <p
                                    className={`font-semibold text-base leading-tight ${isActive || isDone ? "text-[#e28576]" : "text-[#98A2B3]"
                                        }`}
                                >
                                    {step.label}
                                </p>
                                <p className={`text-sm mt-0.5 ${isDone ? "text-[#667085]" : "text-[#C0C9D8]"}`}>
                                    {step.date}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ── Detail Field ───────────────────────────────────────────────────────────────

function DetailField({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-0.5">
            <p className="text-xs text-[#98A2B3] font-medium">{label}</p>
            <p className="text-sm font-semibold text-[#000]">{value}</p>
        </div>
    );
}

// ── Media Placeholder ──────────────────────────────────────────────────────────

function MediaPlaceholder() {
    return (
        <div className="w-[72px] h-[72px] rounded-xl border border-[#E4E7EC] bg-[#F9FAFB] flex items-center justify-center flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="#D0D5DD" strokeWidth="1.5" />
                <path d="M3 16l4-4 3 3 4-5 7 6" stroke="#D0D5DD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="8" r="1.5" fill="#D0D5DD" />
            </svg>
        </div>
    );
}


function RejectModalContent({
    onSubmit,
    onClose,
}: {
    onSubmit: (reason: string) => void;
    onClose: () => void;
}) {
    const [reason, setReason] = useState("");

    return (
        <div className="flex flex-col gap-4">
            <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Type your reason here"
                className="w-full px-4 py-3 rounded-xl border border-[#E4E7EC] text-sm text-[#e28576] placeholder:text-[#C0C9D8] outline-none focus:border-[#e28576] focus:ring-2 focus:ring-[#e28576]/10 transition-all duration-200"
            />
            <PrimaryButton
                text="Submit"
                type="button"
                disabled={!reason.trim()}
                onClick={() => {
                    if (reason.trim()) {
                        onSubmit(reason.trim());
                        onClose();
                    }
                }}
                className="w-full py-3 rounded-xl text-sm"
            />
        </div>
    );
}


export default function TrackRequest({
    requestId = "REQ-2024-001234",
    orderDate = "Feb 16, 2026",
    status = "submitted",
    details = {
        fullName: "Mohamed Ahmed Soliman",
        buildingAddress: "33115, Riyadh, Saudi Arabia",
        unitNumber: "21",
        floorNumber: "3rd Floor",
        apartmentNumber: "143",
        contactNumber: "+966 012345678",
        contactEmail: "info@companya.sa",
        serviceType: "Cleaning",
        description:
            'This Site may contain links to other independent third-party Web sites ("Linked Sites"). These Linked Sites are provided solely as a convenience to our visitors.',
        urgencyLevel: "Standard (3-5 days)",
        contactMethod: "Call",
        mediaCount: 5,
    },
    onAccept,
    onReject,
}: TrackRequestProps) {
    const [rejectModalOpen, setRejectModalOpen] = useState(false);

    return (
        <>
            <div className="bg-white rounded-2xl border border-[#E4E7EC] overflow-hidden">
                {/* ── Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-[#E4E7EC]">
                    <div>
                        <h2 className="text-xl font-bold text-[#e28576]">Order ID: {requestId}</h2>
                        <p className="text-sm text-[#98A2B3] mt-0.5">Order date: {orderDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <PrimaryButton
                            text="Accept"
                            type="button"
                            onClick={onAccept}
                            className="px-8 py-2.5 rounded-xl text-sm"
                        />
                        <button
                            onClick={() => setRejectModalOpen(true)}
                            className="px-8 py-2.5 rounded-xl text-sm font-medium text-white bg-[#E85E4F]  active:scale-[0.98] transition-all duration-200"
                        >
                            Reject
                        </button>
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-[260px] flex-shrink-0 px-6 py-6 border-b lg:border-b-0 lg:border-r border-[#E4E7EC]">
                        <StepIndicator status={status} />
                    </div>

                    <div className="flex-1 px-6 py-6">
                        <h3 className="text-xl font-bold text-[#000] mb-6">Request Details</h3>

                        <div className="flex flex-col gap-5">
                            <DetailField label="Full Name" value={details.fullName} />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <DetailField label="Building Adress" value={details.buildingAddress} />
                                <DetailField label="Unit Number" value={details.unitNumber} />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <DetailField label="Floor Number" value={details.floorNumber} />
                                <DetailField label="Apartment Number" value={details.apartmentNumber} />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <DetailField label="Contact Number" value={details.contactNumber} />
                                <DetailField label="Contact Email" value={details.contactEmail} />
                            </div>

                            <DetailField label="Service Type" value={details.serviceType} />

                            <div className="flex flex-col gap-0.5">
                                <p className="text-xs text-[#98A2B3] font-medium">Description of issue/need</p>
                                <p className="text-sm text-[#344054] leading-relaxed">{details.description}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <DetailField label="Urgency level" value={details.urgencyLevel} />
                                <DetailField label="Preferred Contact Method" value={details.contactMethod} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="text-xs text-[#98A2B3] font-medium">Media Uploaded</p>
                                <div className="flex items-center gap-3 flex-wrap">
                                    {Array.from({ length: details.mediaCount ?? 5 }).map((_, i) => (
                                        <MediaPlaceholder key={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Reject Modal ── */}
            <ModalTemplate
                isOpen={rejectModalOpen}
                onClose={() => setRejectModalOpen(false)}
                title="Rejection Reason"
                subtitle="Please specify the reason for rejection"
                Icon={HiOutlineExclamationCircle}
            >
                <RejectModalContent
                    onSubmit={(reason) => onReject?.(reason)}
                    onClose={() => setRejectModalOpen(false)}
                />
            </ModalTemplate>
        </>
    );
}
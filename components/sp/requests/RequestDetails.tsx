"use client";
import { ModalTemplate } from "@/components/shared/ModalTemplate";
import React, { useState } from "react";
import RejectModalContent from "./Reject";
import { HiOutlineExclamationCircle } from "react-icons/hi";

// ─── Types ───────────────────────────────────────────────────────────────────

type MediaItem = {
    id: string | number;
    url?: string;
    label?: string;
};

type TicketDetailsProps = {
    title: string;
    orderId?: string;
    orderDate?: string;
    fullName?: string;
    buildingAddress?: string;
    buildingNumber?: string | number;
    floorNumber?: string;
    apartmentNumber?: string | number;
    contactNumber?: string;
    contactEmail?: string;
    serviceType?: string;
    description?: string;
    urgencyLevel?: string;
    preferredContactMethod?: string;
    mediaUploaded?: MediaItem[];
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const FieldLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span
        style={{
            display: "block",
            fontSize: "11px",
            fontWeight: 400,
            color: "#667085",
            marginBottom: "2px",
            lineHeight: "16px",
        }}
    >
        {children}
    </span>
);

const FieldValue: React.FC<{
    children: React.ReactNode;
    isLink?: boolean;
}> = ({ children, isLink }) => (
    <span
        style={{
            display: "block",
            fontSize: "13px",
            fontWeight: 500,
            color: isLink ? "#1570EF" : "#101828",
            lineHeight: "20px",
            cursor: isLink ? "pointer" : "default",
            textDecoration: isLink ? "underline" : "none",
        }}
    >
        {children}
    </span>
);

const Field: React.FC<{
    label: string;
    value?: React.ReactNode;
    isLink?: boolean;
}> = ({ label, value = "—", isLink }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <FieldLabel>{label}</FieldLabel>
        <FieldValue isLink={isLink}>{value}</FieldValue>
    </div>
);

const MediaCard: React.FC<{ item: MediaItem }> = ({ item }) => (
    <div
        style={{
            width: "72px",
            height: "72px",
            border: "1.3px solid #E4E7EC",
            borderRadius: "8px",
            background: "#F2F4F7",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            cursor: "pointer",
            flexShrink: 0,
        }}
    >
        {item.url ? (
            <img
                src={item.url}
                alt={item.label ?? "media"}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                }}
            />
        ) : (
            <>
                {/* Upload icon */}
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                        stroke="#98A2B3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <polyline
                        points="17 8 12 3 7 8"
                        stroke="#98A2B3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <line
                        x1="12"
                        y1="3"
                        x2="12"
                        y2="15"
                        stroke="#98A2B3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                {item.label && (
                    <span
                        style={{
                            fontSize: "9px",
                            color: "#98A2B3",
                            textAlign: "center",
                            padding: "0 4px",
                            lineHeight: "12px",
                        }}
                    >
                        {item.label}
                    </span>
                )}
            </>
        )}
    </div>
);


const Divider = () => (
    <hr
        style={{
            border: "none",
            borderTop: "1px solid #E4E7EC",
            margin: "0",
        }}
    />
);


const defaultMedia: MediaItem[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
];

const RequestDetails: React.FC<TicketDetailsProps> = ({
    title,
    orderId = "REQ-2024-001234",
    orderDate = "Feb 16, 2026",
    fullName = "Mohamed Ahmed Soliman",
    buildingAddress = "33115, Riyadh, Saudi Arabia",
    buildingNumber = "21",
    floorNumber = "3rd Floor",
    apartmentNumber = "140",
    contactNumber = "+966 012345678",
    contactEmail = "info@companya.sa",
    serviceType = "Cleaning",
    description = "This Site may contain links to other independent third-party Web sites ('Linked Sites'). These Linked Sites are provided solely as a convenience to our visitors. Such Linked Sites are not under our control, and we are not responsible for and does not endorse the content of such Linked Sites, including any information or materials contained on such Linked Sites.",
    urgencyLevel = "Standard (3-5 days)",
    preferredContactMethod = "Call",
    mediaUploaded = defaultMedia,
}) => {
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    return (
        <div
            style={{
                fontFamily:
                    "Inter, sans-serif",
                width: "100%",
                background: "#FFFFFF",
                borderWidth: "1.3px 0px 0px 1.3px",
                borderStyle: "solid",
                borderColor: "#E4E7EC",
                borderRadius: "20px",
                overflow: "hidden",
            }}
            className="shadow-sm"
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                <div

                    style={{
                        padding: "20px 24px 16px",
                        borderBottom: "1.3px solid #E4E7EC",
                    }}
                >
                    <h2
                        style={{
                            margin: "0 0 2px",
                            fontSize: "16px",
                            fontWeight: 700,
                            color: "#101828",
                            lineHeight: "24px",
                        }}
                    >
                        Order ID: {orderId}
                    </h2>
                    <p
                        style={{
                            margin: 0,
                            fontSize: "11px",
                            color: "#667085",
                            fontWeight: 400,
                        }}
                    >
                        Order date: {orderDate}
                    </p>
                </div>
                <div className="p-2">
                    <button
                        onClick={() => setRejectModalOpen(true)}
                        className="px-8 py-2.5 rounded-md text-sm font-medium text-white bg-[#FF0000]  active:scale-[0.98] transition-all duration-200"
                    >
                        Reject Request
                    </button>
                </div>
            </div>

            <div style={{ padding: "20px 24px 0" }}>
                <h3
                    style={{
                        margin: "0 0 16px",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#101828",
                        lineHeight: "20px",
                    }}
                >
                    {title}
                </h3>
            </div>

            <div
                style={{
                    padding: "0 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0",
                }}
            >
                {/* Row 1: Full Name (full width) */}
                <div style={{ paddingBottom: "14px" }}>
                    <Field label="Full Name" value={fullName} />
                </div>

                <Divider />

                {/* Row 2: Building Address + Building Number */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px 24px",
                        padding: "14px 0",
                    }}
                    className="ticket-grid"
                >
                    <Field
                        label="Building Address"
                        value={buildingAddress}
                        isLink={true}
                    />
                    <Field label="Building Number" value={String(buildingNumber)} />
                </div>

                <Divider />

                {/* Row 3: Floor Number + Apartment Number */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px 24px",
                        padding: "14px 0",
                    }}
                    className="ticket-grid"
                >
                    <Field label="Floor Number" value={floorNumber} />
                    <Field label="Apartment Number" value={String(apartmentNumber)} />
                </div>

                <Divider />

                {/* Row 4: Contact Number + Contact Email */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px 24px",
                        padding: "14px 0",
                    }}
                    className="ticket-grid"
                >
                    <Field label="Contact Number" value={contactNumber} />
                    <Field label="Contact Email" value={contactEmail} />
                </div>

                <Divider />

                {/* Row 5: Service Type (full width) */}
                <div style={{ padding: "14px 0" }}>
                    <Field label="Service Type" value={serviceType} />
                </div>

                <Divider />

                {/* Row 6: Description (full width) */}
                <div style={{ padding: "14px 0" }}>
                    <FieldLabel>Description of issue/need</FieldLabel>
                    <p
                        style={{
                            margin: "4px 0 0",
                            fontSize: "12px",
                            color: "#344054",
                            lineHeight: "18px",
                            fontWeight: 400,
                        }}
                    >
                        {description}
                    </p>
                </div>

                <Divider />

                {/* Row 7: Urgency Level + Preferred Contact Method */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "12px 24px",
                        padding: "14px 0",
                    }}
                    className="ticket-grid"
                >
                    <Field label="Urgency level" value={urgencyLevel} />
                    <Field
                        label="Preferred Contact Method"
                        value={preferredContactMethod}
                    />
                </div>

                <Divider />

                {/* Row 8: Media Uploaded */}
                <div style={{ padding: "14px 0 20px" }}>
                    <FieldLabel>Media Uploaded</FieldLabel>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            marginTop: "10px",
                        }}
                    >
                        {mediaUploaded.map((item) => (
                            <MediaCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>


            <ModalTemplate
                isOpen={rejectModalOpen}
                onClose={() => setRejectModalOpen(false)}
                title="Rejection Reason"
                subtitle="Please specify the reason for rejection"
                Icon={HiOutlineExclamationCircle}
            >
                <RejectModalContent
                    onSubmit={(reason) => (reason)}
                    onClose={() => setRejectModalOpen(false)}
                />
            </ModalTemplate>

            {/* ── Responsive styles injected via <style> ─────────────────── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

        @media (max-width: 480px) {
          .ticket-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
};

export default RequestDetails;
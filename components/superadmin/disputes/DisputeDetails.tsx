"use client";
import { PrimaryButton } from "@/components/shared/buttons/PrimaryBtn";
import { PageHeader } from "@/components/shared/headers/PageHeader";
import React from "react";

type MediaItem = {
    id: string | number;
    url?: string;
    label?: string;
};

type TicketDetailsProps = {
    title?: string;
    orderId?: string;
    orderDate?: string;
    // Problem Details
    problemDetails?: string;
    // Dispute parties
    buildingOwner?: string;
    againist?: string;
    // Address
    buildingAddress?: string;
    unitNumber?: string | number;
    floorNumber?: string;
    apartmentNumber?: string | number;
    // Contact
    contactNumber?: string;
    contactEmail?: string;
    // Service
    serviceType?: string;
    price?: string;
    // More details
    description?: string;
    urgencyLevel?: string;
    preferredContactMethod?: string;
    mediaUploaded?: MediaItem[];
    // Actions
    onCancel?: () => void;
    onSolved?: () => void;
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
            width: "96px",
            height: "96px",
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
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="3"
                        stroke="#98A2B3"
                        strokeWidth="1.5"
                    />
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="#98A2B3" strokeWidth="1.3" />
                    <path
                        d="M3 15l5-4 4 3.5 3-2.5 6 5"
                        stroke="#98A2B3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M14 10l2-2 2 2"
                        stroke="#98A2B3"
                        strokeWidth="1.3"
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

// ─── Defaults ─────────────────────────────────────────────────────────────────

const defaultMedia: MediaItem[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
];

// ─── Main Component ───────────────────────────────────────────────────────────

const DisputeDetails: React.FC<TicketDetailsProps> = ({
    orderId = "REQ-2024-001234",
    orderDate = "Feb 16, 2026",
    problemDetails = "This Site may contain links to other independent third-party Web sites ('Linked Sites'). These Linked Sites are provided solely as a convenience to our visitors. Such Linked Sites are not under our control, and we are not responsible for and does not endorse the content of such Linked Sites, including any information or materials contained on such Linked Sites. You will need to make your own independent judgment regarding your interaction with these Linked Sites. This Site may contain links to other independent third-party Web sites. These Linked Sites are provided solely as a convenience to our visitors. we are not responsible for and does not endorse the content of such Linked Sites, including any information or materials contained on such Linked Sites. You will need to make your own independent judgment regarding your interaction with the Linked Sites.",
    buildingOwner = "Ahmed Mohamed",
    againist = "Company A",
    buildingAddress = "33115, Riyadh, Saudi Arabia",
    unitNumber = "21",
    floorNumber = "3rd Floor",
    apartmentNumber = "143",
    contactNumber = "+966 012345678",
    contactEmail = "info@companya.sa",
    serviceType = "Cleaning",
    price = "500$",
    description = "This Site may contain links to other independent third-party Web sites ('Linked Sites'). These Linked Sites are provided solely as a convenience to our visitors. Such Linked Sites are not under our control, and we are not responsible for and does not endorse the content of such Linked Sites, including any information or materials contained on such Linked Sites. You will need to make your own independent judgment regarding your interaction with these Linked Sites. This Site may contain links to other independent third-party Web sites. These Linked Sites are provided solely as a convenience to our visitors. we are not responsible for and does not endorse the content of such Linked Sites, including any information or materials contained on such Linked Sites. You will need to make your own independent judgment regarding your interaction with the Linked Sites.",
    urgencyLevel = "Standard (3-5 days)",
    preferredContactMethod = "Call",
    mediaUploaded = defaultMedia,
    onCancel,
    onSolved,
}) => {
    return (
        <div
            style={{
                fontFamily: "Inter, sans-serif",
                width: "100%",
                background: "#FFFFFF",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            {/* ── Header ─────────────────────────────────────────────────── */}
            <div
                style={{
                    padding: "20px 24px 16px",
                    borderBottom: "1.3px solid #E4E7EC",
                }}
            >
                <PageHeader
                    breadcrumb="ongoing disputes between users and building owners"
                    title="Disputes"
                    order="title-first"
                />

                <div style={{ marginTop: "20px", marginBottom: "4px" }} />

                <h2
                    style={{
                        margin: "0 0 2px",
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#101828",
                        lineHeight: "28px",
                    }}
                >
                    Order ID: {orderId}
                </h2>
            </div>

            {/* ── Scrollable content ─────────────────────────────────────── */}
            <div style={{ flex: 1, overflowY: "auto" }}>

                {/* ── Problem Details ────────────────────────────────────── */}
                <div style={{ padding: "16px 24px 0" }}>
                    <FieldLabel>Problem Details</FieldLabel>
                    <p
                        style={{
                            margin: "4px 0 0",
                            fontSize: "12px",
                            color: "#344054",
                            lineHeight: "18px",
                            fontWeight: 400,
                        }}
                    >
                        {problemDetails}
                    </p>
                </div>

                {/* ── Fields Grid ────────────────────────────────────────── */}
                <div
                    style={{
                        padding: "0 24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0",
                        marginTop: "16px",
                    }}
                >
                    {/* <Divider /> */}

                    {/* Row 1: Building Owner + Againist */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "12px 24px",
                            padding: "14px 0",
                        }}
                        className="ticket-grid"
                    >
                        <Field label="Building Owner" value={buildingOwner} />
                        <Field label="Againist" value={againist} />
                    </div>

                    {/* <Divider /> */}

                    {/* Row 2: Building Address + Unit Number */}
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
                            label="Building Adress"
                            value={buildingAddress}
                            isLink={true}
                        />
                        <Field label="Unit Number" value={String(unitNumber)} />
                    </div>

                    {/* <Divider /> */}

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
                        <Field label="Apartment number" value={String(apartmentNumber)} />
                    </div>

                    {/* <Divider /> */}

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

                    {/* <Divider /> */}

                    {/* Row 5: Service Type + Price */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "12px 24px",
                            padding: "14px 0",
                        }}
                        className="ticket-grid"
                    >
                        <Field label="Service Type" value={serviceType} />
                        <Field label="Price" value={price} />
                    </div>

                    {/* <Divider /> */}

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

                    {/* <Divider /> */}

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

                    {/* <Divider /> */}

                    {/* Row 8: Media Uploaded */}
                    <div style={{ padding: "14px 0 24px" }}>
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
            </div>

            {/* ── Footer Actions ─────────────────────────────────────────── */}
            <div
                style={{
                    borderTop: "1px solid #E4E7EC",
                    padding: "12px 24px",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                    background: "#FFFFFF",
                }}
            >
                <button
                    onClick={onCancel}
                    style={{
                        padding: "8px 20px",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#344054",
                        background: "#FFFFFF",
                        border: "1px solid #D0D5DD",
                        borderRadius: "8px",
                        cursor: "pointer",
                        lineHeight: "20px",
                        outline: "none",
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#F9FAFB")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#FFFFFF")
                    }
                >
                    Cancel
                </button>
                <PrimaryButton
                    onClick={onSolved}

                    text="Solved"
                />
                

            </div>

            {/* ── Responsive styles ──────────────────────────────────────── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

        @media (max-width: 480px) {
          .ticket-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    );
};

export default DisputeDetails;
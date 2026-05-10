"use client";
import React, { useState } from "react";
import { PageHeader } from "@/components/shared/headers/PageHeader";
import { PermissionToggle } from "@/components/shared/toggle/PermissionToggle";
import { PrimaryButton } from "@/components/shared/buttons/PrimaryBtn";


// ─── Types ────────────────────────────────────────────────────────────────────

type Permission = {
    id: string;
    label: string;
    description: string;
    enabled: boolean;
};

type RoleGroup = {
    id: string;
    title: string;
    subtitle: string;
    permissions: Permission[];
};

// ─── Default Data ─────────────────────────────────────────────────────────────

const defaultRoles: RoleGroup[] = [
    {
        id: "management",
        title: "Management",
        subtitle: "This Role allow user to do.....",
        permissions: [
            {
                id: "approve_requests",
                label: "Approve Requests",
                description: "Grants the authority to approve services requests from residents.",
                enabled: true,
            },
            {
                id: "view_reports",
                label: "View Reports",
                description:
                    "Access to reports on procurement activities, spending, and supplier performance.",
                enabled: true,
            },
            {
                id: "track_requests",
                label: "Track Requests",
                description: "Allows real-time tracking of Requests from users.",
                enabled: false,
            },
        ],
    },
    {
        id: "building_owners",
        title: "Building Owners",
        subtitle: "This Role allow user to do.....",
        permissions: [
            {
                id: "submit_requests",
                label: "Submit Requests",
                description: "Grants the authority to submit services requests from residents.",
                enabled: true,
            },
            {
                id: "view_reports",
                label: "View Reports",
                description:
                    "Access to reports on procurement activities, spending, and supplier performance.",
                enabled: true,
            },
            {
                id: "track_requests",
                label: "Track Requests",
                description: "Allows real-time tracking of Requests from users.",
                enabled: false,
            },
        ],
    },
    {
        id: "service_providers",
        title: "Service Providers",
        subtitle: "This Role allow user to do.....",
        permissions: [
            {
                id: "approve_requests",
                label: "Approve Requests",
                description: "Grants the authority to approve services requests from residents.",
                enabled: true,
            },
            {
                id: "view_reports",
                label: "View Reports",
                description:
                    "Access to reports on procurement activities, spending, and supplier performance.",
                enabled: true,
            },
            {
                id: "track_requests",
                label: "Track Requests",
                description: "Allows real-time tracking of Requests from users.",
                enabled: false,
            },
        ],
    },
];

// ─── Cancel Button ────────────────────────────────────────────────────────────

const CancelButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className="
            px-4 py-2
            text-sm font-medium text-gray-700
            bg-white
            border border-gray-300
            rounded-lg
            hover:bg-gray-50
            active:bg-gray-100
            active:scale-[0.98]
            transition-all duration-200
        "
    >
        Cancel
    </button>
);

// ─── Divider ──────────────────────────────────────────────────────────────────

const Divider = () => (
    <hr className="border-none border-t border-gray-200" style={{ borderTopWidth: "1px", borderColor: "#E4E7EC" }} />
);

// ─── Main Component ───────────────────────────────────────────────────────────

const SettingsPage: React.FC = () => {
    const [roles, setRoles] = useState<RoleGroup[]>(defaultRoles);
    const [isSaving, setIsSaving] = useState(false);

    const handleToggle = (roleId: string, permId: string, val: boolean) => {
        setRoles((prev) =>
            prev.map((role) =>
                role.id === roleId
                    ? {
                        ...role,
                        permissions: role.permissions.map((p) =>
                            p.id === permId ? { ...p, enabled: val } : p
                        ),
                    }
                    : role
            )
        );
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((r) => setTimeout(r, 1500));
        setIsSaving(false);
    };

    const handleCancel = () => {
        setRoles(defaultRoles);
    };

    return (
        <div
            className="flex flex-col min-h-screen bg-white"
            style={{ fontFamily: "Inter, sans-serif" }}
        >
            {/* ── Header ──────────────────────────────────────────────── */}
            <div className="px-6 pt-5 pb-4" style={{ borderBottom: "1px solid #E4E7EC" }}>
                <PageHeader
                    title="Settings"
                    breadcrumb="Customise system settings"
                    order="title-first"
                />
            </div>

            {/* ── Roles List ──────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto">
                {roles.map((role, idx) => (
                    <React.Fragment key={role.id}>
                        <div
                            className="flex flex-row gap-6 px-6 py-6 settings-row"
                            style={{ alignItems: "flex-start" }}
                        >
                            {/* Left: Role info */}
                            <div
                                className="settings-role-label"
                                style={{ width: "220px", flexShrink: 0 }}
                            >
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        color: "#101828",
                                        lineHeight: "20px",
                                    }}
                                >
                                    {role.title}
                                </p>
                                <p
                                    style={{
                                        margin: "2px 0 0",
                                        fontSize: "12px",
                                        color: "#667085",
                                        lineHeight: "18px",
                                        fontWeight: 400,
                                    }}
                                >
                                    {role.subtitle}
                                </p>
                            </div>

                            {/* Right: Permissions */}
                            <div
                                className="flex flex-col"
                                style={{ gap: "20px", flex: 1 }}
                            >
                                {role.permissions.map((perm) => (
                                    <PermissionToggle
                                        key={perm.id}
                                        label={perm.label}
                                        description={perm.description}
                                        value={perm.enabled}
                                        onChange={(val) =>
                                            handleToggle(role.id, perm.id, val)
                                        }
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Divider between roles */}
                        {idx < roles.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </div>

            {/* ── Footer Actions ──────────────────────────────────────── */}
            <div
                style={{ borderTop: "1px solid #E4E7EC" }}
                className="px-6 py-3 flex justify-end items-center gap-3 bg-white"
            >
                <CancelButton onClick={handleCancel} />
                <PrimaryButton
                    text="Save Changes"
                    onClick={handleSave}
                    isLoading={isSaving}
                    loadingText="Saving..."
                    type="button"
                />
            </div>

            {/* ── Responsive ─────────────────────────────────────────── */}
            <style>{`
                @media (max-width: 600px) {
                    .settings-row {
                        flex-direction: column !important;
                    }
                    .settings-role-label {
                        width: 100% !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default SettingsPage;
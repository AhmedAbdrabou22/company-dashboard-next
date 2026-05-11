"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HiOutlineOfficeBuilding, HiOutlineBriefcase } from "react-icons/hi";
import Button from "@/components/shared/buttons/Button";

type Role = "buildingOwner" | "serviceProvider";

const roles = [
    {
        id: "buildingOwner" as Role,
        title: "Building Owner",
        description: "Individual building owner or company that own buildings",
        icon: <HiOutlineOfficeBuilding size={22} />,
        href: "/bo/login",
    },
    {
        id: "serviceProvider" as Role,
        title: "Service Provider",
        description: "A company that provide services for building owners",
        icon: <HiOutlineBriefcase size={22} />,
        href: "/sp/login",
    },
];

export default function RoleSelectionPage() {
    const router = useRouter();
    const [selected, setSelected] = useState<Role>("buildingOwner");

    const handleContinue = () => {
        const chosen = roles.find((r) => r.id === selected);
        if (chosen) router.push(chosen.href);
    };

    return (
        <div className="flex flex-col gap-0">
            {/* Logo */}
            <div className="mb-8">
                <Image
                    src="/assets/logo.png"
                    alt="Company Logo"
                    width={120}
                    height={48}
                    priority
                />
            </div>

            {/* Heading */}
            <h1 className="page-title" style={{ fontSize: 32, lineHeight: "1.2", marginBottom: 8 }}>
                Let's get to know your business
            </h1>
            <p className="auth-description" style={{ marginBottom: 28 }}>
                Choose what kind of your business is ..
            </p>

            {/* Role cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {roles.map((role) => {
                    const isSelected = selected === role.id;
                    return (
                        <button
                            key={role.id}
                            type="button"
                            onClick={() => setSelected(role.id)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 14,
                                padding: "16px 18px",
                                borderRadius: 12,
                                border: isSelected ? "2px solid #e28576" : "1.5px solid #E5E7EB",
                                background: "#fff",
                                cursor: "pointer",
                                textAlign: "left",
                                transition: "border-color 0.15s, box-shadow 0.15s",
                                boxShadow: isSelected ? "0 0 0 3px rgba(26,42,75,0.08)" : "none",
                                width: "100%",
                            }}
                        >
                            {/* Icon box */}
                            <span
                                style={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: 8,
                                    background: "#F3F4F6",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#e28576",
                                    flexShrink: 0,
                                }}
                            >
                                {role.icon}
                            </span>

                            {/* Text */}
                            <span style={{ flex: 1 }}>
                                <span
                                    style={{
                                        display: "block",
                                        fontWeight: 700,
                                        fontSize: 15,
                                        color: "#111827",
                                        marginBottom: 3,
                                    }}
                                >
                                    {role.title}
                                </span>
                                <span style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.4 }}>
                                    {role.description}
                                </span>
                            </span>

                            {/* Radio indicator */}
                            <span
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: "50%",
                                    border: isSelected ? "6px solid #e28576" : "1.5px solid #D1D5DB",
                                    background: "#fff",
                                    flexShrink: 0,
                                    transition: "border 0.15s",
                                }}
                            />
                        </button>
                    );
                })}
            </div>

            {/* Continue button */}
            <div style={{ marginTop: 28 }}>
                <button
                    type="button"
                    onClick={handleContinue}
                    className="primary-btn"
                >
                    Continue
                </button>
            </div>

            {/* Login link */}
            <p
                style={{
                    marginTop: 22,
                    textAlign: "center",
                    fontSize: 14,
                    color: "#6B7280",
                }}
            >
                Already have an account?{" "}
                <a
                    href="/admin/login"
                    style={{ color: "#e28576", fontWeight: 700, textDecoration: "none" }}
                >
                    Login
                </a>
            </p>
        </div>
    );
}
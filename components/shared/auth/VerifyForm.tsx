"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@/components/shared/buttons/Button";

const initialValues = { otp: ["", "", "", ""] };

const validationSchema = Yup.object({
    otp: Yup.array()
        .of(Yup.string().matches(/^\d$/, "Must be a digit").required())
        .length(4),
});

const otpBoxStyle: React.CSSProperties = {
    width: 64,
    height: 64,
    textAlign: "center",
    fontSize: 28,
    fontWeight: 700,
    color: "#111827",
    border: "1.5px solid #D1D5DB",
    borderRadius: 12,
    outline: "none",
    background: "#fff",
    transition: "border-color 0.2s, box-shadow 0.2s",
};

interface VerifyFormProps {
    /** The role prefix used for navigation, e.g. "bo" or "sp" */
    role: "bo" | "sp";
}

export default function VerifyForm({ role }: VerifyFormProps) {
    const router = useRouter();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleSubmit = async (values: { otp: string[] }) => {
        const code = values.otp.join("");
        console.log("OTP:", code);
        await new Promise((r) => setTimeout(r, 800));
        router.push(`/${role}`);
    };

    return (
        <div className="w-full">
            {/* Logo */}
            <div className="mb-8">
                <Image src="/assets/logo.png" alt="Company Logo" width={120} height={48} priority />
            </div>

            <h1 className="page-title" style={{ fontSize: 36 }}>Verify your email</h1>
            <p className="auth-description">
                Enter the 4-digit code we sent to your email address
            </p>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting, errors, touched }) => {
                    const hasError =
                        touched.otp &&
                        Array.isArray(errors.otp) &&
                        errors.otp.some(Boolean);

                    return (
                        <Form noValidate>
                            {/* OTP boxes */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: 20,
                                    justifyContent: "center",
                                    marginBottom: 12,
                                }}
                            >
                                {values.otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={(el) => { inputRefs.current[i] = el; }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        placeholder="0"
                                        style={{
                                            ...otpBoxStyle,
                                            borderColor: hasError
                                                ? "#EF4444"
                                                : digit
                                                    ? "#e28576"
                                                    : "#D1D5DB",
                                            boxShadow: digit
                                                ? "0 0 0 3px rgba(26,42,75,0.08)"
                                                : "none",
                                        }}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (!/^\d*$/.test(val)) return;
                                            const newOtp = [...values.otp];
                                            newOtp[i] = val.slice(-1);
                                            setFieldValue("otp", newOtp);
                                            if (val && i < 3) inputRefs.current[i + 1]?.focus();
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Backspace" && !values.otp[i] && i > 0) {
                                                inputRefs.current[i - 1]?.focus();
                                            }
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = "#e28576";
                                            e.target.style.boxShadow = "0 0 0 3px rgba(26,42,75,0.08)";
                                        }}
                                        onBlur={(e) => {
                                            if (!digit) {
                                                e.target.style.borderColor = "#D1D5DB";
                                                e.target.style.boxShadow = "none";
                                            }
                                        }}
                                    />
                                ))}
                            </div>

                            {hasError && (
                                <p
                                    style={{
                                        textAlign: "center",
                                        fontSize: 13,
                                        color: "#EF4444",
                                        marginBottom: 16,
                                    }}
                                >
                                    Please enter the complete 4-digit code
                                </p>
                            )}

                            {/* Resend */}
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: 14,
                                    color: "#6B7280",
                                    marginBottom: 28,
                                    marginTop: 4,
                                }}
                            >
                                Didn't receive the code?{" "}
                                <button
                                    type="button"
                                    onClick={() => console.log("Resend OTP")}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        color: "#e28576",
                                        fontWeight: 700,
                                        fontSize: 14,
                                        padding: 0,
                                    }}
                                >
                                    Resend
                                </button>
                            </p>

                            <Button text="Verify" loadingText="Verifying..." isLoading={isSubmitting} />
                        </Form>
                    );
                }}
            </Formik>

            <p style={{ marginTop: 22, textAlign: "center", fontSize: 14, color: "#6B7280" }}>
                Already have an account?{" "}
                <Link
                    href={`/${role}/login`}
                    style={{ color: "#e28576", fontWeight: 700, textDecoration: "none" }}
                >
                    Login
                </Link>
            </p>
        </div>
    );
}

"use client";
import { useField } from "formik";
import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    placeholder: string;
    type?: "text" | "email" | "password" | "number" | "tel";
    required?: boolean;
}


const montserrat: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
};

const inputBase: React.CSSProperties = {
    ...montserrat,
    fontSize: "16px",
    color: "#111827",
    border: "1.5px solid #D1D5DB",
    borderRadius: "12px",
    padding: "18px 20px",
    width: "100%",
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
};


const FormInput = ({
    name,
    label,
    placeholder,
    type = "text",
    required = false,
    ...rest
}: FormInputProps) => {
    const [field, meta] = useField(name);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    const hasError = meta.touched && Boolean(meta.error);
    // const isFocused = false;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

            {/* ── Label ── */}
            {label && (
                <label
                    htmlFor={name}
                    style={{
                        ...montserrat,
                        fontWeight: 700,
                        fontSize: "18px",
                        color: "#111827",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                    }}
                >
                    {label}

                    {required && (
                        <span
                            style={{
                                color: "#EF4444",
                                fontSize: "16px",
                                lineHeight: 1,
                            }}
                        >
                            *
                        </span>
                    )}
                </label>
            )}

            {/* ── Input Wrapper ── */}
            <div style={{ position: "relative" }}>
                <input
                    id={name}
                    {...field}
                    {...rest}
                    type={inputType}
                    placeholder={placeholder}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${name}-error` : undefined}
                    style={{
                        ...inputBase,
                        paddingRight: isPassword ? "52px" : "20px",
                        borderColor: hasError ? "#EF4444" : "#D1D5DB",
                        boxShadow: hasError
                            ? "0 0 0 3px rgba(239,68,68,0.08)"
                            : "none",
                    }}
                    onFocus={(e) => {
                        if (!hasError) {
                            e.target.style.borderColor = "#e28576";
                            e.target.style.boxShadow = "0 0 0 3px rgba(26,42,75,0.08)";
                        }
                    }}
                    onBlur={(e) => {
                        field.onBlur(e); // triggers Formik touched
                        if (!hasError) {
                            e.target.style.borderColor = "#D1D5DB";
                            e.target.style.boxShadow = "none";
                        }
                    }}
                />

                {/* ── Eye Toggle (password only) ── */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        style={{
                            position: "absolute",
                            right: "18px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                            color: "#9CA3AF",
                            display: "flex",
                            alignItems: "center",
                            lineHeight: 1,
                        }}
                    >
                        {showPassword ? (
                            <AiOutlineEyeInvisible size={22} />
                        ) : (
                            <AiOutlineEye size={22} />
                        )}
                    </button>
                )}
            </div>

            {hasError && (
                <p
                    id={`${name}-error`}
                    role="alert"
                    style={{
                        ...montserrat,
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#EF4444",
                        margin: 0,
                    }}
                >
                    {meta.error}
                </p>
            )}
        </div>
    );
};

export default FormInput;
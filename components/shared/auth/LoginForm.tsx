"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@/components/shared/buttons/Button";
import { BaseForm } from "@/components/shared/inputs/BaseForm";

interface LoginValues {
    email: string;
    password: string;
}

const initialValues: LoginValues = { email: "", password: "" };

const loginSchema = Yup.object<LoginValues>({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "At least 8 characters").required("Password is required"),
});

interface LoginFormProps {
    /** The role prefix used for navigation, e.g. "bo" or "sp" */
    role: "bo" | "sp";
}

export default function LoginForm({ role }: LoginFormProps) {
    const router = useRouter();

    const handleSubmit = async (values: LoginValues) => {
        console.log(`${role.toUpperCase()} Login:`, values);
        await new Promise((r) => setTimeout(r, 800));
        router.push(`/${role}`);
    };

    return (
        <div className="w-full">
            {/* Logo */}
            <div className="mb-8">
                <Image src="/assets/logo.png" alt="Company Logo" width={120} height={48} priority />
            </div>

            <h1 className="page-title" style={{ fontSize: 36 }}>Login</h1>
            <p className="auth-description">Welcome back! Login to access your gate..</p>

            <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form noValidate style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        <BaseForm
                            name="email"
                            label="Official Email"
                            placeholder="official email"
                            type="email"
                            required
                        />
                        <div>
                            <BaseForm
                                name="password"
                                label="Password"
                                placeholder="••••••••"
                                type="password"
                                required
                            />
                            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                                <Link href={`/${role}/forgot-password`} className="forgot-link">
                                    Forgot Password
                                </Link>
                            </div>
                        </div>

                        <Button text="Login" loadingText="Logging in..." isLoading={isSubmitting} />
                    </Form>
                )}
            </Formik>

            <p style={{ marginTop: 22, textAlign: "center", fontSize: 14, color: "#6B7280" }}>
                You don't have an account{" "}
                <Link
                    href={`/${role}/signup`}
                    style={{ color: "#e28576", fontWeight: 700, textDecoration: "none" }}
                >
                    create account
                </Link>
            </p>
        </div>
    );
}

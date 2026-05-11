"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "@/components/shared/buttons/Button";
import { BaseForm } from "@/components/shared/inputs/BaseForm";
import { PhoneInput } from "@/components/shared/inputs/PhoneInput";

interface SignupValues {
    orgName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

const signupSchema = Yup.object<SignupValues>({
    orgName: Yup.string().min(2, "Too short").required("Organization name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
        .matches(/^\d{7,12}$/, "Enter a valid phone number")
        .required("Phone number is required"),
    password: Yup.string()
        .min(8, "At least 8 characters")
        .matches(/[A-Z]/, "Must contain an uppercase letter")
        .matches(/[0-9]/, "Must contain a number")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords don't match")
        .required("Please confirm your password"),
});

const initialValues: SignupValues = {
    orgName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
};

interface SignupFormProps {
    /** The role prefix used for navigation, e.g. "bo" or "sp" */
    role: "bo" | "sp";
}

export default function SignupForm({ role }: SignupFormProps) {
    const router = useRouter();

    const handleSubmit = async (values: SignupValues) => {
        console.log(`${role.toUpperCase()} Signup:`, values);
        await new Promise((r) => setTimeout(r, 900));
        router.push(`/${role}/verify`);
    };

    return (
        <div className="w-full">
            {/* Logo */}
            <div className="mb-8">
                <Image src="/assets/logo.png" alt="Company Logo" width={120} height={48} priority />
            </div>

            <h1 className="page-title" style={{ fontSize: 36 }}>Sign up</h1>
            <p className="auth-description">Welcome back! Login to access your gate..</p>

            <Formik initialValues={initialValues} validationSchema={signupSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form noValidate style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        <BaseForm
                            name="orgName"
                            label="Organization Name"
                            placeholder="Company Name"
                            type="text"
                            required
                        />
                        <BaseForm
                            name="email"
                            label="Official Organization Email"
                            placeholder="Official Name"
                            type="email"
                            required
                        />
                        <PhoneInput name="phone" label="Phone Number" />
                        <BaseForm
                            name="password"
                            label="Password"
                            placeholder="••••••••"
                            type="password"
                            required
                        />
                        <BaseForm
                            name="confirmPassword"
                            label="Confirm Password"
                            placeholder="••••••••"
                            type="password"
                            required
                        />

                        <Button text="Register" loadingText="Registering..." isLoading={isSubmitting} />
                    </Form>
                )}
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

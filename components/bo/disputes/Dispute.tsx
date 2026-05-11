"use client";

import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { BaseInput } from "@/components/shared/inputs/BaseInput";
import { PrimaryButton } from "@/components/shared/buttons/PrimaryBtn";
import { OutlineButton } from "@/components/shared/buttons/OutlineButton";
import { useRouter } from "next/navigation";
import { BaseForm } from "@/components/shared/inputs/BaseForm";
import { TextAreaField } from "@/components/shared/inputs/TextAreaField";

// ── Textarea Field (same style as BaseInput) ───────────────────────────────────

function BaseTextarea({
    label,
    name,
    placeholder,
    required,
}: {
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
}) {
    const [field, meta] = useField(name);
    const hasError = meta.touched && meta.error;

    return (
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
            <label className="text-sm font-medium text-gray-700 sm:w-36 sm:shrink-0 sm:pt-2.5">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <div className="flex-1 flex flex-col gap-1">
                <textarea
                    {...field}
                    placeholder={placeholder}
                    rows={3}
                    className={`w-full px-4 py-2.5 text-sm text-gray-800 bg-white rounded-lg border outline-none transition-all duration-150 resize-none
                        placeholder:text-gray-400
                        focus:ring-2 focus:ring-[#e28576]/20 focus:border-[#e28576]
                        ${hasError
                            ? "border-red-400 focus:ring-red-100 focus:border-red-400"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                />
                {hasError && <p className="text-xs text-red-500">{meta.error}</p>}
            </div>
        </div>
    );
}

// ── Section Label for grouped fields ──────────────────────────────────────────

function SectionLabel({ label, required }: { label: string; required?: boolean }) {
    return (
        <span className="text-sm font-medium text-gray-700 sm:w-36 sm:shrink-0 sm:pt-2.5">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
        </span>
    );
}

// ── Validation ─────────────────────────────────────────────────────────────────

const schema = Yup.object({
    requestNumber: Yup.string().required("Request number is required"),
    issuedService: Yup.string().required("Issued service is required"),
    address: Yup.string().required("Address is required"),
    unitNumber: Yup.string().required("Unit number is required"),
    floorNumber: Yup.string().required("Floor number is required"),
    apartmentNumber: Yup.string().required("Apartment number is required"),
    issue: Yup.string().required("Please describe your issue"),
});

const initialValues = {
    requestNumber: "",
    issuedService: "",
    address: "",
    unitNumber: "",
    floorNumber: "",
    apartmentNumber: "",
    issue: "",
};

// ── Page ───────────────────────────────────────────────────────────────────────

export default function IssueWithRequestPage() {
    const router = useRouter();

    const handleSubmit = (values: typeof initialValues) => {
        console.log("Issue submitted:", values);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form noValidate>
                        {/* ── Header ── */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Do you have an issue with request
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Please enter the details about the request and the issue facing you
                            </p>
                        </div>

                        {/* ── Divider ── */}
                        <div className="border-t border-gray-100 mb-2" />

                        {/* ── Fields ── */}
                        <div className="flex flex-col gap-6">
                            {/* Request Number */}
                            <BaseInput
                                name="requestNumber"
                                label="Request Number"
                                placeholder="REQ-2025-12355"
                                required
                            />

                            <div className="border-t border-gray-100" />

                            {/* Issued Service */}
                            <BaseInput
                                name="issuedService"
                                label="Issued Service"
                                placeholder="Cleaning"
                                required
                            />

                            <div className="border-t border-gray-100" />

                            {/* Building Details — grouped */}
                            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                                <SectionLabel label="Building Details" required />

                                <div className="flex-1 flex flex-col gap-4">
                                    {/* Address + Unit Number */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <BaseForm
                                                name="address"
                                                label="Address"
                                                placeholder="1234 Street, Riyadh, Saudi Arabia"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <BaseForm
                                                name="unitNumber"
                                                label="Unit Number"
                                                placeholder="140"
                                            />
                                        </div>
                                    </div>

                                    {/* Floor Number + Apartment Number */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <BaseForm
                                                name="floorNumber"
                                                label="Floor Number"
                                                placeholder="3rd Floor"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <BaseForm
                                                name="apartmentNumber"
                                                label="Apartment Number"
                                                placeholder="143"
                                            />
                                        </div>
                                    </div>

                                    {/* Issue textarea */}
                                    <div className="flex flex-col gap-1">
                                        <TextAreaField
                                            name="Issue"
                                            label="Issue"
                                            placeholder="Issue"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Divider ── */}
                        <div className="border-t border-gray-100 mt-2 mb-2 flex-1" />

                        {/* ── Actions ── */}
                        <div className="flex items-center justify-end gap-3">
                            <OutlineButton
                                text="Cancel"
                                type="button"
                                onClick={() => router.back()}
                                className="!w-auto px-8"
                            />
                            <PrimaryButton
                                text="Submit"
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Submitting..."
                                className="px-8 py-2.5 rounded-lg"
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
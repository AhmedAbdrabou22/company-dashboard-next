"use client";
// AddServiceProviderForm.tsx
import { Formik, Form } from "formik";
import { BaseInput } from "@/components/shared/inputs/BaseInput";
import { BaseSelect } from "@/components/shared/inputs/BaseSelect";
import { OutlineButton } from "@/components/shared/buttons/OutlineButton";
import { PrimaryButton } from "@/components/shared/buttons/PrimaryBtn";
import { addServiceProviderInitialValues, addServiceProviderValidationSchema, type AddServiceProviderFormValues } from "./profileValidation";
import { BaseDateInput } from "@/components/shared/inputs/BaseDateInput";

const CR_TYPE_OPTIONS = [
    { label: "Type A", value: "type_a" },
    { label: "Type B", value: "type_b" },
    { label: "Type C", value: "type_c" },
];

type PdfFileRow_TP = {
    fileName: string;
    fileSize?: string;
};

const PdfFileRow = ({ fileName, fileSize = "200 KB" }: PdfFileRow_TP) => (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-200 bg-white">
        <div className="w-9 h-9 rounded-md bg-red-50 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6M9 13h6M9 17h4" />
            </svg>
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">{fileName}</p>
            <p className="text-xs text-gray-400">{fileSize}</p>
        </div>
        <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
    </div>
);

const SectionLabel = ({ label, required }: { label: string; required?: boolean }) => (
    <p className="text-sm font-medium text-gray-700 w-36 shrink-0 pt-2.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
    </p>
);

export const Divider = () => <div className="h-px bg-gray-100" />;

export const ProfileForm = () => {
    const handleSubmit = async (values: AddServiceProviderFormValues) => {
        try {
            console.log("Submitting:", values);
            // await api.post("/service-providers", values);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Welcome Company A</h1>
                <p className="text-sm text-gray-400 mt-1">
                    Please fill all the required data with the suitable information
                </p>
            </div>

            <Formik
                initialValues={addServiceProviderInitialValues}
                validationSchema={addServiceProviderValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-5">


                        <div className="max-w-3xl mb-8">
                            <div className="mb-5">
                                <BaseInput label="Company Name" name="companyName" required placeholder="Company A" />
                            </div>

                            <div className="mb-5">
                                <BaseInput label="Phone Number" name="phoneNumber" required placeholder="+966 | 138478385" />
                            </div>
                            <div className="mb-5">
                                <Divider />
                            </div>
                            <div className="mb-5">
                                <BaseInput label="Profile Name" name="profileName" placeholder="Mohammed Amr" />
                            </div>
                            <div className="mb-1">
                                <BaseInput label="Official Email" name="officialEmail" type="email" placeholder="official Name" />
                            </div>
                        </div>

                        <div className="mt-2 mb-2">
                            <Divider />
                        </div>


                        <div className="w-full">
                            <div className="flex items-start gap-4">
                                <SectionLabel label="CR" required />
                                <div className="flex-1 flex flex-col gap-3">
                                    {/* Issue Date + Expiry Date */}
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex-1 flex flex-col gap-1">

                                            <BaseDateInput name="cr.issueDate" label="Issue Date" />

                                        </div>
                                        <div className="flex-1 flex flex-col gap-1">
                                            <BaseDateInput name="cr.expiryDate" label="Expiry Date" />

                                        </div>
                                    </div>

                                    {/* Type + CR File */}
                                    <div className="flex flex-col sm:flex-row gap-3 items-end">
                                        <div className="flex-1 flex flex-col gap-1">
                                            <label className="text-sm text-gray-500">Type</label>
                                            <BaseSelect label="" name="cr.type" required options={CR_TYPE_OPTIONS} placeholder="Type" className="[&>label]:hidden" />
                                        </div>
                                        <div className="flex-1">
                                            <PdfFileRow fileName="CR No." />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 mb-5">
                                <Divider />
                            </div>

                            {/* ── Building Details ── */}
                            <div className="flex items-start gap-4">
                                <SectionLabel label="Building Details" required />
                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex-1 flex flex-col gap-1">
                                            <label className="text-sm text-gray-500">Address</label>
                                            <BaseInput label="" name="buildingDetails.address" required placeholder="1234 Street, Riyadh, Saudi Arabia" className="[&>label]:hidden" />
                                        </div>
                                        <div className="flex-1 flex flex-col gap-1">
                                            <label className="text-sm text-gray-500">Post Code</label>
                                            <BaseInput label="" name="buildingDetails.postCode" required placeholder="234445" className="[&>label]:hidden" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex-1 flex flex-col gap-1">
                                            <label className="text-sm text-gray-500">Office Telephone</label>
                                            <BaseInput label="" name="buildingDetails.officeTelephone" required placeholder="+966 2456 7890" className="[&>label]:hidden" />
                                        </div>
                                        <div className="flex-1 flex flex-col gap-1">
                                            <label className="text-sm text-gray-500">Office Fax</label>
                                            <BaseInput label="" name="buildingDetails.officeFax" placeholder="+966 2456 7891" className="[&>label]:hidden" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm text-gray-500">Email</label>
                                        <BaseInput label="" name="buildingDetails.email" type="email" placeholder="info@companya.com" className="[&>label]:hidden" />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-5 mt-5">
                                <Divider />
                            </div>

                            {/* ── Tax Certificate ── */}
                            <div className="flex items-start gap-4">
                                <SectionLabel label="Tax Certificate" required />
                                <div className="flex-1 flex flex-col sm:flex-row gap-3 items-end">
                                    <div className="flex-1">
                                        <PdfFileRow fileName="Tax" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">

                                        <BaseDateInput name="taxCertificate.expiryDate" label="Expiry Date" />

                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 mb-5">
                                <Divider />
                            </div>

                            {/* ── VAT Certificate ── */}
                            <div className="flex items-start gap-4">
                                <SectionLabel label="V.A.T Certificate" required />
                                <div className="flex-1 flex flex-col sm:flex-row gap-3 items-end">
                                    <div className="flex-1">
                                        <PdfFileRow fileName="V.A.T" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">
                                        <BaseDateInput name="vatCertificate.expiryDate" label="Expiry Date" />

                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 mb-5">
                                <Divider />
                            </div>

                            {/* ── Contract ── */}
                            <div className="flex items-start gap-4">
                                <SectionLabel label="Contract" required />
                                <div className="flex-1 flex flex-col sm:flex-row gap-3 items-end">
                                    <div className="flex-1">
                                        <PdfFileRow fileName="Contract.pdf" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">

                                        <BaseDateInput name="contract.expiryDate" label="Expiry Date" />

                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 mb-5">
                                <Divider />
                            </div>

                            {/* ── Actions ── */}
                            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-5">
                                <OutlineButton text="Cancel" type="button" className="sm:w-28" />
                                <PrimaryButton
                                    text="Save Changes"
                                    isLoading={isSubmitting}
                                    loadingText="Saving..."
                                    type="submit"
                                    className="sm:w-36"
                                />
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    );
};
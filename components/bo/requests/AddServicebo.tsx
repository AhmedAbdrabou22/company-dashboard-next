"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AddButton } from "@/components/shared/AddButton";
import { BaseSelectAdv, SelectOption } from "@/components/shared/inputs/BaseSelectAdv";
import { RadioGroup, RadioOption } from "@/components/shared/inputs/RadioGroup";
import { BaseForm } from "@/components/shared/inputs/BaseForm";
import { TextAreaField } from "@/components/shared/inputs/TextAreaField";
import { ImageUpload } from "@/components/shared/inputs/ImageUpload";
import RequestSuccess from "./Requestsuccess";

const schema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    buildingAddr: Yup.string().required("Building address is required"),
    unitNumber: Yup.string().required("Unit number is required"),
    contactNumber: Yup.string().required("Contact number is required"),
    contactEmail: Yup.string().email("Invalid email").required("Email is required"),
    serviceType: Yup.string().required("Please select a service type"),
    description: Yup.string().required("Description is required"),
    urgencyLevel: Yup.string().required("Select urgency level"),
    contactMethod: Yup.string().required("Select contact method"),
});

const initialValues = {
    fullName: "",
    buildingAddr: "",
    unitNumber: "",
    contactNumber: "",
    contactEmail: "",
    serviceType: "",
    description: "",
    urgencyLevel: "routine",
    contactMethod: "call",
};

const serviceOptions: SelectOption[] = [
    { label: "Cleaning", value: "cleaning" },
    { label: "Security", value: "security" },
    { label: "Landscape", value: "landscape" },
    { label: "Other", value: "other" },
];

const urgencyOptions: RadioOption[] = [
    { label: "Routine (24hrs / comp. 3 days)", value: "routine" },
    { label: "Urgent (1hr . comp. 3 to 4 hrs)", value: "urgent" },
    { label: "Emergency (15 mins. / com. 1hr approx)", value: "emergency" },
];

const contactOptions: RadioOption[] = [
    { label: "Call", value: "call" },
    { label: "Text", value: "text" },
    { label: "Email", value: "email" },
];

export default function NewServiceRequestPage() {
    const [submittedId, setSubmittedId] = useState<string | null>(null);

    const handleSubmit = (values: typeof initialValues) => {
        console.log("Service Request:", values);
        // Replace with your actual API call; use the returned ID from the response
        setSubmittedId("REQ-2024-001234");
    };

    if (submittedId) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <RequestSuccess
                    requestId={submittedId}
                    // onTrack={() => {
                    //     setSubmittedId(null);
                    // }}
                />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form noValidate>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">New Service Request</h1>
                                <p className="text-sm text-gray-500 mt-1">Let us help you by filling all service request details</p>
                            </div>
                            <AddButton
                                addLabel="Submit Request"
                                action={() => document.querySelector("form")?.requestSubmit()}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <BaseForm
                                    name="fullName"
                                    label="Full Name"
                                    placeholder="Ahmed Mohamed Soliman"
                                    required
                                    tooltip="Enter your full legal name"
                                />
                                <BaseForm
                                    name="buildingAddr"
                                    label="Building Address"
                                    placeholder="33155, Street 33557, Riyadh"
                                    required
                                    tooltip="The full address of the building"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <BaseForm
                                    name="unitNumber"
                                    label="Unit/Apartment Number"
                                    placeholder="21"
                                    required
                                    tooltip="Your apartment or unit number in the building"
                                />
                                <BaseForm
                                    name="contactNumber"
                                    label="Contact Number"
                                    placeholder="+966 XXXXXXX"
                                    type="tel"
                                    required
                                    tooltip="A number we can reach you on"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <BaseForm
                                    name="contactEmail"
                                    label="Contact Email"
                                    placeholder="info@company.sa"
                                    type="email"
                                    required
                                    tooltip="We'll send updates to this email"
                                />
                                <BaseSelectAdv
                                    name="serviceType"
                                    label="Service Type"
                                    options={serviceOptions}
                                    placeholder="Select a service"
                                    required
                                    tooltip="Choose the type of service you need"
                                />
                            </div>

                            <TextAreaField
                                name="description"
                                label="Description of issue/need"
                                placeholder="Description"
                                required
                                tooltip="Describe the issue or service you need in detail"
                            />

                            <ImageUpload tooltip="Upload up to 5 photos or videos of the issue" />

                            <RadioGroup
                                name="urgencyLevel"
                                label="Urgency level"
                                options={urgencyOptions}
                                required
                                tooltip="How quickly do you need this resolved?"
                            />

                            <RadioGroup
                                name="contactMethod"
                                label="Preferred contact method"
                                options={contactOptions}
                                required
                                tooltip="How would you like us to contact you?"
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
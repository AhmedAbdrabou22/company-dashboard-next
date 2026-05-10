"use client";
import { Formik, Form } from "formik";
import { addUserInitialValues, addUserValidationSchema, type AddUserFormValues } from "./addUserValidation";
import { BaseInput } from "@/components/shared/inputs/BaseInput";
import { BaseSelect } from "@/components/shared/inputs/BaseSelect";
import { PermissionToggle } from "@/components/shared/toggle/PermissionToggle";
import { OutlineButton } from "@/components/shared/buttons/OutlineButton";
import { PrimaryButton } from "@/components/shared/buttons/PrimaryBtn";

const ROLE_OPTIONS = [
    { label: "Super Admin", value: "super_admin" },
    { label: "Operations Manager", value: "operations_manager" },
    { label: "Service Coordinator", value: "service_coordinator" },
    { label: "Customer Support", value: "customer_support" },
    { label: "Finance Manager", value: "finance_manager" },
    { label: "HR Manager", value: "hr_manager" },
];

const PERMISSIONS = [
    {
        key: "approveOrder" as const,
        label: "Approve Order",
        description: "Grants the authority to approve procurement requests and supplier orders.",
    },
    {
        key: "viewReports" as const,
        label: "View Reports",
        description: "Access to reports on procurement activities, spending, and supplier performance.",
    },
    {
        key: "exportData" as const,
        label: "Export Data",
        description: "Allows to export sheets and data of orders, building owners and service providers.",
    },
];

type AddUserForm_TP = {
    onClose: () => void;
};

export const AddUserForm = ({ onClose }: AddUserForm_TP) => {
    const handleSubmit = async (values: AddUserFormValues) => {
        try {
            console.log("Submitting:", values);
            onClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Formik
            initialValues={addUserInitialValues}
            validationSchema={addUserValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue, isSubmitting }) => (
                <Form className="flex flex-col gap-4">

                    {/* Fields */}
                    <BaseInput label="Name" name="name" required placeholder="Ahmed Mohamed" />
                    <BaseInput label="Email" name="email" required type="email" placeholder="ahmed@example.com" />
                    <BaseSelect label="Role" name="role" required options={ROLE_OPTIONS} placeholder="Super Admin" />

                    <div className="h-px bg-gray-100" />

                    {/* Permissions */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <p className="text-sm font-medium text-gray-700 sm:w-24 sm:shrink-0 sm:pt-1">
                            Permissions
                        </p>
                        <div className="flex-1 flex flex-col gap-4">
                            {PERMISSIONS.map((perm) => (
                                <PermissionToggle
                                    key={perm.key}
                                    label={perm.label}
                                    description={perm.description}
                                    value={values.permissions[perm.key]}
                                    onChange={(val) =>
                                        setFieldValue(`permissions.${perm.key}`, val)
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row gap-3">
                        <OutlineButton text="Cancel" onClick={onClose} className="flex-1" />
                        <PrimaryButton
                            text="Add User"
                            isLoading={isSubmitting}
                            loadingText="Adding..."
                            className="flex-1"
                            type="submit"
                        />
                    </div>

                </Form>
            )}
        </Formik>
    );
};
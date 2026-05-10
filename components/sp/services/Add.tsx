"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { BaseInput } from "@/components/shared/inputs/BaseInput";
import { PrimaryButton } from "@/components/shared/buttons/PrimaryBtn";
import { Divider } from "@/components/superadmin/serviceprovider/AddUserForm";
const addServiceProviderInitialValues = {
    service_name: "",
};

const addServiceProviderValidationSchema = Yup.object({
    service_name: Yup.string()
        .required("Service name is required")
        .min(3, "Service name must be at least 3 characters"),
});



export const AddServiceForm = () => {
    const handleSubmit = async (values: { service_name: string }) => {
        try {
            console.log("Submitting:", values);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="">
            <Formik
                initialValues={addServiceProviderInitialValues}
                validationSchema={addServiceProviderValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-5">

                        <div className="max-w-3xl mb-1">
                            <div className="mb-5">
                                <BaseInput
                                    label="Service Name"
                                    name="service_name"
                                    required
                                    placeholder="Cleaning*"
                                />
                            </div>

                            <div className="">
                                <Divider/>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <PrimaryButton
                                text="Add Service"
                                isLoading={isSubmitting}
                                loadingText="Saving..."
                                type="submit"
                                className="sm:w-36"
                            />
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    );
};
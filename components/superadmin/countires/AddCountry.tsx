"use client";

import { Formik, Form } from "formik";
import { PrimaryButton } from "@/components/shared/buttons/PrimaryBtn";
import { addCountrySchema } from "./add-country.schema";
import FormInput from "@/components/shared/inputs/FormInput";
import { Country } from "./add-country";


type AddCountryForm_TP = {
    onClose: () => void;
    update: Partial<Country>; 
    refetch: () => void;
};

export const AddUserCountryForm = ({ onClose, update, refetch }: AddCountryForm_TP) => {

    // نفس منطق initialValues في مثالك
    const initialValues = {
        country_name: update?.name     || "",
        country_code: update?.code     || "",
        currency:     update?.currency || "",
        status:       update?.status   || "",
    };

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            if (Object.keys(update).length) {
                // Edit mode — PUT
                console.log("PUT update:", update.id, values);
            } else {
                // Add mode — POST
                console.log("POST add:", values);
            }
            refetch();
            onClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const isEditMode = !!Object.keys(update).length;

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={addCountrySchema}
            onSubmit={handleSubmit}
            enableReinitialize // مهم — لما update تتغير يعيد التهيئة
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput name="country_name" placeholder="Country Name" required label="" />
                        <FormInput name="country_code" placeholder="Country Code" required label="" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput name="currency" placeholder="Currency" required label="" />
                        <FormInput name="status"   placeholder="Active"   required label="" />
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                        <PrimaryButton
                            text={isEditMode ? "Save Changes" : "Add Country"}
                            isLoading={isSubmitting}
                            loadingText={isEditMode ? "Saving..." : "Adding..."}
                            className="flex-1"
                            type="submit"
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
};
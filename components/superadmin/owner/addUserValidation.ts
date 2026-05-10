// validations/addUserValidation.ts

import * as Yup from "yup";

export const addUserValidationSchema = Yup.object({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),

    email: Yup.string()
        .email("Enter a valid email address")
        .required("Email is required"),

    role: Yup.string()
        .required("Role is required"),
});

export type AddUserFormValues = {
    name: string;
    email: string;
    role: string;
    permissions: {
        approveOrder: boolean;
        viewReports: boolean;
        exportData: boolean;
    };
};

export const addUserInitialValues: AddUserFormValues = {
    name: "",
    email: "",
    role: "",
    permissions: {
        approveOrder: true,
        viewReports: true,
        exportData: true,
    },
};
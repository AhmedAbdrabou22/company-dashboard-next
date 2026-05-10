import * as Yup from "yup";

export interface AdminLoginValues {
  username: string;
  password: string;
}

export interface AdminForgotValues {
  email: string;
}

export interface AdminNewPasswordValues {
  password: string;
  confirmPassword: string;
}

export const adminLoginSchema = Yup.object<AdminLoginValues>({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const adminForgotSchema = Yup.object<AdminForgotValues>({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export const adminNewPasswordSchema = Yup.object<AdminNewPasswordValues>({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Must contain at least one special character")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords don't match")
    .required("Please confirm your password"),
});

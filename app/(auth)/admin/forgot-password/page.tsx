"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "@/components/shared/inputs/FormInput";
import PageTitle from "@/components/shared/headers/PageTitle";
import Button from "@/components/shared/buttons/Button";
import PageDesc from "@/components/shared/headers/PageDesc";

const initialValues = { email: "" };
const validationSchema = Yup.object({ email: Yup.string().email("Invalid email").required("Email is required") });

export default function AdminForgotPage() {
  const handleSubmit = async (values: { email: string }) => {
    console.log("Forgot password email:", values.email);
  };

  return (
    <div className="montserrat auth-container flex items-center justify-center">
      <div className="w-full">
        <PageTitle title="Forgot Password" />
        <PageDesc title="Write down your Email Address and we will send you OTP" />
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form noValidate style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <FormInput name="email" label="Email" placeholder="info@company.com" type="email" required />
              <Button text="Send OTP" loadingText="Sending..." isLoading={isSubmitting} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

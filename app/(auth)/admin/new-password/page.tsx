"use client";

import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import FormInput from "@/components/shared/inputs/FormInput";
import PageTitle from "@/components/shared/headers/PageTitle";
import Button from "@/components/shared/buttons/Button";
import PageDesc from "@/components/shared/headers/PageDesc";
import { adminNewPasswordSchema } from "@/validations/adminValidations";

const initialValues = { password: "", confirmPassword: "" };

export default function AdminNewPasswordPage() {
  const router = useRouter();

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("New password:", values);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/admin/login");
  };

  return (
    <div className="montserrat auth-container flex items-center justify-center">
      <div className="w-full">
        <PageTitle title="Enter New Password" />
        <PageDesc title="Please add the new password and confirm the new password" />
        <Formik initialValues={initialValues} validationSchema={adminNewPasswordSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form noValidate style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <FormInput name="password" label="New Password" placeholder="••••••••••••••••" type="password" required />
              <FormInput name="confirmPassword" label="Confirm New Password" placeholder="••••••••••••••••" type="password" required />
              <Button text="Submit" loadingText="Saving..." isLoading={isSubmitting} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

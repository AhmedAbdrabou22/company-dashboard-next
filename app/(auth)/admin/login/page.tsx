"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form } from "formik";
import { adminLoginSchema, type AdminLoginValues } from "@/validations/adminValidations";
import FormInput from "@/components/shared/inputs/FormInput";
import PageTitle from "@/components/shared/headers/PageTitle";
import Button from "@/components/shared/buttons/Button";
import PageDesc from "@/components/shared/headers/PageDesc";

const initialValues: AdminLoginValues = { username: "", password: "" };

export default function AdminLoginPage() {
  const router = useRouter();

  const handleSubmit = async (values: AdminLoginValues) => {
    console.log("Login values:", values);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/admin");
  };

  return (
    <div className="montserrat auth-container flex items-center justify-center">
      <div className="w-full">
        <PageTitle title="Log in to your Account" />
        <PageDesc title="Write down the required data to log in to your admin account" />

        <Formik initialValues={initialValues} validationSchema={adminLoginSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form noValidate style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <FormInput name="username" label="Username" placeholder="info@company.com" type="text" required />
              <div>
                <FormInput name="password" label="Password" placeholder="••••••••••••••••" type="password" required />
                <div className="flex justify-end mt-[10px]">
                  <Link href="/admin/forgot-password" className="forgot-link">Forgot Password</Link>
                </div>
              </div>
              <Button text="Log In" loadingText="Signing in..." isLoading={isSubmitting} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

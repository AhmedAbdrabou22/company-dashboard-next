"use client";

import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PageTitle from "@/components/shared/headers/PageTitle";
import Button from "@/components/shared/buttons/Button";

const initialValues = { otp: ["", "", "", ""] };
const validationSchema = Yup.object({
  otp: Yup.array().of(Yup.string().required()).length(4, "OTP must be 4 digits"),
});

export default function AdminVerifyOtpPage() {
  const router = useRouter();

  const handleVerify = async (values: { otp: string[] }) => {
    const code = values.otp.join("");
    console.log("OTP:", code);
    router.push("/admin/new-password");
  };

  return (
    <div className="montserrat auth-container flex items-center justify-center">
      <div className="w-full max-w-md">
        <PageTitle title="Verify Your Email" />
        <p className="auth-description">Enter the 4 digits code we sent to your email</p>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleVerify}>
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <div className="otp-container">
                {values.otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    placeholder="0"
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!/^\d*$/.test(val)) return;
                      const newOtp = [...values.otp];
                      newOtp[index] = val.slice(-1);
                      setFieldValue("otp", newOtp);
                      if (val && index < 3) {
                        document.getElementById(`otp-${index + 1}`)?.focus();
                      }
                    }}
                    className="otp-input"
                  />
                ))}
              </div>
              <div className="otp-buttons">
                <Button text="Verify" loadingText="Verifying..." isLoading={isSubmitting} />
                <Button text="Resend Code" loadingText="Sending..." isLoading={false} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

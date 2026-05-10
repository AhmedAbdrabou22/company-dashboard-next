import * as Yup from "yup";

export const addCountrySchema = Yup.object({
  country_name: Yup.string().required("Country name is required"),

  country_code: Yup.string().required("Country code is required"),

  currency: Yup.string().required("Currency is required"),
});

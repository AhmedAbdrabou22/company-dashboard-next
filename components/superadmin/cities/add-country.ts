export interface AddCountryFormValues {
  country_name: string;
  country_code: string;
  currency: string;
}


export type Country = {
  id: number | string;
  name: string;
  code: string;
  currency: string;
  status: "Active" | "Inactive";
};
 
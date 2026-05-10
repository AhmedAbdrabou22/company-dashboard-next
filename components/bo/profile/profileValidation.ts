import * as Yup from "yup";

export type CRValues = {
  issueDate: string;
  expiryDate: string;
  type: string;
  crFile: File | null;
};

export type BuildingDetailsValues = {
  address: string;
  postCode: string;
  officeTelephone: string;
  officeFax: string;
  email: string;
};

export type DocumentField = {
  file: File | null;
  expiryDate: string;
};

export type AddServiceProviderFormValues = {
  companyName: string;
  phoneNumber: string;
  profileName: string;
  officialEmail: string;
  cr: CRValues;
  buildingDetails: BuildingDetailsValues;
  taxCertificate: DocumentField;
  vatCertificate: DocumentField;
  contract: DocumentField;
};

export const addServiceProviderInitialValues: AddServiceProviderFormValues = {
  companyName: "",
  phoneNumber: "",
  profileName: "",
  officialEmail: "",
  cr: {
    issueDate: "",
    expiryDate: "",
    type: "",
    crFile: null,
  },
  buildingDetails: {
    address: "",
    postCode: "",
    officeTelephone: "",
    officeFax: "",
    email: "",
  },
  taxCertificate: { file: null, expiryDate: "" },
  vatCertificate: { file: null, expiryDate: "" },
  contract: { file: null, expiryDate: "" },
};

export const addServiceProviderValidationSchema = Yup.object({
  companyName: Yup.string().required("Company name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  profileName: Yup.string(),
  officialEmail: Yup.string().email("Invalid email"),

  cr: Yup.object({
    issueDate: Yup.string().required("Issue date is required"),
    expiryDate: Yup.string().required("Expiry date is required"),
    type: Yup.string().required("Type is required"),
    crFile: Yup.mixed().nullable(),
  }),

  buildingDetails: Yup.object({
    address: Yup.string().required("Address is required"),
    postCode: Yup.string().required("Post code is required"),
    officeTelephone: Yup.string().required("Office telephone is required"),
    officeFax: Yup.string(),
    email: Yup.string().email("Invalid email"),
  }),

  taxCertificate: Yup.object({
    file: Yup.mixed().nullable(),
    expiryDate: Yup.string().required("Expiry date is required"),
  }),

  vatCertificate: Yup.object({
    file: Yup.mixed().nullable(),
    expiryDate: Yup.string().required("Expiry date is required"),
  }),

  contract: Yup.object({
    file: Yup.mixed().nullable(),
    expiryDate: Yup.string(),
  }),
});

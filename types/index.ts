export type Role = "superAdmin" | "serviceProvider" | "buildingOwner";

export type User = {
  name: string;
  email: string;
  role: Role;
  avatar?: string;
};
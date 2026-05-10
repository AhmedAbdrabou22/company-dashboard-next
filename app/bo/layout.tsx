import DashboardLayout from "@/components/DashboardLayout";
export default function BoLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="buildingOwner">{children}</DashboardLayout>;
}

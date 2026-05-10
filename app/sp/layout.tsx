import DashboardLayout from "@/components/DashboardLayout";
export default function SpLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="serviceProvider">{children}</DashboardLayout>;
}

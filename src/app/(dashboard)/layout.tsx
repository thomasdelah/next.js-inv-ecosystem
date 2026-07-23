import { SidebarProvider } from "@/lib/components/ui/sidebar";
import SiteSidebar from "@/lib/navigation/ui/Sidebar/SiteSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SiteSidebar />
      {children}
    </SidebarProvider>
  )
}

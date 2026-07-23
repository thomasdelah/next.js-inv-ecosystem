'use client'

import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader } from "@/lib/components/ui/sidebar"
import SiteSidebarFooter from "./SiteSidebarFooter"

export default function SiteSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
      </SidebarContent>
      <SiteSidebarFooter />
    </Sidebar>
  )
}

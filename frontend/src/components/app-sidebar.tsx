import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"
import Logo from '@/../public/logo.png'
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

interface AppSidebarProps {
  onSelect: (component: string) => void;
  componentsMap: { [key: string]: React.ComponentType };
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ onSelect, componentsMap, ...props }) => {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
              <Image src={Logo} alt=""  width={70} height={75} />
                <div className="-ml-1 flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">ReadVault</span>
                  <span className="">Your Library Hub</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2 ml-4">
            {Object.keys(componentsMap).map((componentKey) => (
              <SidebarMenuItem key={componentKey}>
                <SidebarMenuButton asChild>
                  <a href="#" className="font-medium" onClick={() => onSelect(componentKey)}>
                    {componentKey}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
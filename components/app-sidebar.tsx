import {
  Calendar,
  LayoutGrid,
  Search,
  Settings,
  FolderCheck
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import Image from "next/image";

const items = [
  {
    title: "Home",
    url: "/",
    icon: LayoutGrid
  },
  {
    title: "Bookings",
    url: "/bookings",
    icon: FolderCheck
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar
  },
  {
    title: "Search",
    url: "/search",
    icon: Search
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings
  }
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="pl-4 pt-12 mb-10 text-xs text-muted-foreground">
            <div className="flex flex-col items-center">
              <Image
                src="/images/spotter.png"
                alt="Spotter Labs Logo"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="mt-2 text-indigo-600 font-semibold">
                Spotter Labs Workstation
              </span>
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild>
                    <a href={url} className="flex items-center gap-2 p-2 pl-4">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}

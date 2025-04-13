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
    SidebarHeader,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroupContent
  } from "@/components/ui/sidebar";
  
  const items = [
    {
      title: "Home",
      url: "/",
      icon: LayoutGrid,
    },
    {
      title: "Bookings",
      url: "/bookings",
      icon: FolderCheck,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "/search",
      icon: Search,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];
  
  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader />
  
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Spotter Labs Workstation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map(({ title, url, icon: Icon }) => (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton asChild>
                      <a href={url} className="flex items-center gap-2">
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
  
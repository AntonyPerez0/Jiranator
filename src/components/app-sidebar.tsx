import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items with routes
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Jira Tickets",
    url: "/jira-tickets",
    icon: Inbox,
  },
  {
    title: "Agile Board",
    url: "/agile-board",
    icon: Calendar,
  },
  {
    title: "Query",
    url: "/query",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <div style={{ padding: "10px", marginBottom: "10px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <ModeToggle />
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      location.pathname === item.url ||
                      (item.url !== "/" &&
                        location.pathname.startsWith(item.url))
                    }
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

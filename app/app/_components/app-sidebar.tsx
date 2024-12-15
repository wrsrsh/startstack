"use client";

import * as React from "react";
import {
  Home,
  LogOut,
  Palette,
  Code,
  Coffee,
  Settings,
  Loader2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "./user-btn";
import Link from "next/link";

// Simplified data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/app/home",
      icon: Home,
    },
  ],
  projects: [
    {
      name: "Design System",
      url: "",
      icon: Palette,
    },
    {
      name: "Developer Tools",
      url: "",
      icon: Code,
    },
    {
      name: "Coffee Shop App",
      url: "",
      icon: Coffee,
    },
  ],
};

export function AppSidebar() {
  const pathName = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.url === pathName}>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

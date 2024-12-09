"use client";

import * as React from "react";
import { CreditCard, Home, Settings, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { icon: User, label: "Account", href: "/app/settings/account" },
  { icon: Home, label: "Workspace", href: "/app/settings/workspace" },
  { icon: Settings, label: "Appearance", href: "/app/settings/appearance" },
  { icon: CreditCard, label: "Billing", href: "/app/settings/billing" },
];

export function SettingsSidebar() {
  const pathName = usePathname();
  return (
    <Sidebar
      collapsible="none"
      className="border border-sidebar bg-transparent"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="py-10">
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.label}
                  isActive={item.href === pathName}
                >
                  <a href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

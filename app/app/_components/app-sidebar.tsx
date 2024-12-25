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
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "./user-btn";
import Link from "next/link";
import Image from "next/image";

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
    {
      title: "Settings",
      url: "/app/settings",
      icon: Settings,
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
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="group flex flex-row items-center border-b px-4 py-3 font-mono text-sm font-semibold">
        {open ? (
          <Image src="/logo.png" alt="Logo" width={15} height={15} />
        ) : (
          <span className="-m-1 p-2 h-6 w-6 border rounded-full flex items-center px-1.5">S</span>
        )}

        {open && (
          <>
            Starstack by
            <Link
              className="underline-offset-4 group-hover:underline"
              href={"https://github.com/asendlabs"}
            >
              Asend Labs
            </Link>
          </>
        )}
      </SidebarHeader>
      <SidebarContent className="pt-1">
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

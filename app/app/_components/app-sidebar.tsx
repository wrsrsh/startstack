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

const navigation = [
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
];

export function AppSidebar() {
  const pathName = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center border-b px-4 py-3 font-mono text-sm font-semibold">
        {open ? (
          <Image src="/logo.png" alt="Logo" width={15} height={15} />
        ) : (
          <span className="-m-1 flex h-6 w-6 items-center rounded-full border p-2 px-1.5">
            S
          </span>
        )}

        {open && (
          <>
            Starstack by
            <Link
              className="underline-offset-4 hover:underline"
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
            {navigation.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.url === pathName}>
                  <Link href={item.url} prefetch={true}>
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

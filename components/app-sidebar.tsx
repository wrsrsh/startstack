"use client";

import * as React from "react";
import {
  Home, LogOut,
  Palette,
  Code,
  Coffee, Settings,
  Loader2
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup, SidebarHeader,
  SidebarMenu, SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { signOut } from "@/lib/auth/client";
import { toast } from "sonner";
import { Organization } from "@/types/auth";

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
      isActive: true,
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
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);

  const router = useRouter();
  const [loggingOut, setLoggingOut] = React.useState(false);
  const pathName = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <WorkspaceSwitcher teams={data.teams as Partial<Organization>[]} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={item.url === pathName}>
                  <a href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={"/app/settings" === pathName}>
              <a href={"/app/settings"}>
                <Settings />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="cursor-pointer"
              onClick={async () => {
                setLoggingOut(true);
                try {
                  const { error } = await signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/login"); // redirect to login page
                      },
                    },
                  });
                  if (error) {
                    toast.error(error.message);
                    return;
                  }
                  toast.success("You have been logged out successfully.");
                } catch (error) {
                  toast.info("Something went wrong. Please try again.");
                } finally {
                  setLoggingOut(false);
                }
              }}
            >
              {loggingOut ? (
                <div>
                  <Loader2 className="animate-spin" />
                  <span>Log Out</span>
                </div>
              ) : (
                <div>
                  <LogOut />
                  Log Out
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

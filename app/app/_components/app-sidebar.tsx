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
  Loader,
  LucideIcon,
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
import { usePathname } from "next/navigation";
import { useRouter } from "@/hooks/use-router";
import { UserButton } from "./user-btn";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const navigation: {
  title: string;
  url: string;
  icon: LucideIcon;
}[] = [
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
  const pathname = usePathname();
  const router = useRouter();
  const { open, toggleSidebar } = useSidebar();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [loadedPathnames, setLoadedPathnames] = React.useState<string[]>([]);
  const [loadingPathname, setLoadingPathname] = React.useState<string>("");

  // Create a ref to track if the component is mounted
  const isMounted = React.useRef(false);

  // Collect all routes that need to be prefetched
  const allRoutes = React.useMemo(() => {
    const routes: string[] = [];
    navigation.forEach((item) => {
      routes.push(item.url);
    });
    return routes;
  }, []);

  const prefetchAllRoutes = () => {
    // Small delay to ensure we don't interfere with initial page load
    setTimeout(() => {
      allRoutes.forEach((route) => {
        if (route !== pathname) {
          router.prefetch(route);
        }
      });
      setLoading(false);
      if (loadedPathnames.length === 0) {
        setLoadedPathnames([pathname]);
      }
    }, 200);
  };

  // Handle initial route prefetching
  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;

      // Wait for the page to be fully loaded
      if (typeof window !== "undefined") {
        if (document.readyState === "complete") {
          prefetchAllRoutes();
        } else {
          window.addEventListener("load", prefetchAllRoutes);
          return () => window.removeEventListener("load", prefetchAllRoutes);
        }
      }
    }
  }, [prefetchAllRoutes]);

  const handleNavigation = (url: string) => () => {
    router.replace(url);
  };

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader
        className={cn(
          "flex flex-row items-center py-3 text-sm font-semibold",
          open ? "px-4" : "justify-center",
        )}
      >
        <Logo className="m-0 size-5 p-1" />
        {open && <>Starstack by Asend Labs</>}
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.title}>
                <div
                  onClick={handleNavigation(item.url)}
                  onDoubleClick={() => {
                    handleNavigation(item.url)();
                    toggleSidebar();
                  }}
                >
                  <SidebarMenuButton isActive={item.url === pathname}>
                    <div className="flex items-center gap-2">
                      {loading && loadingPathname === item.url ? (
                        <Loader className="size-4 animate-spin" />
                      ) : (
                        <item.icon className="size-4" />
                      )}
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </div>
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

export default AppSidebar;

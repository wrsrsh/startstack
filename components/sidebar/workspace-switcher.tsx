import * as React from "react";
import { ChevronsUpDown, Plus, Loader2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ActiveOrganization, Organization } from "@/types/auth";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function WorkspaceSwitcher({
  activeOrganization,
}: {
  activeOrganization: ActiveOrganization;
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { data: organizations } = authClient.useListOrganizations();

  const [optimisticOrganization, setOptimisticOrganization] =
    React.useState(activeOrganization);

  const router = useRouter();

  const setActiveOrganization = async (organizationId: string) => {
    try {
      setIsLoading(true);
      await authClient.organization.setActive({
        organizationId: organizationId,
      });
    } catch (error) {
      console.error("Failed to set active organization:", error);
    } finally {
      setIsLoading(false);
      router.refresh()
    }
  };

  // If no active organization is set and we have organizations, set the first one as active
  React.useEffect(() => {
    if (
      !activeOrganization &&
      organizations?.length &&
      organizations?.length > 0
    ) {
      setActiveOrganization(organizations[0].id);
    }
  }, [activeOrganization, organizations]);

  if (!activeOrganization || !organizations) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="animate-pulse">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted">
              <Loader2 className="size-4 animate-spin" />
            </div>
            <div className="grid flex-1 gap-1">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-3 w-16 rounded bg-muted" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="!border-none data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              disabled={isLoading}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg border bg-background">
                {optimisticOrganization?.logo ? (
                  <Image
                    src={optimisticOrganization.logo}
                    alt={optimisticOrganization.name}
                    className="size-4 object-contain"
                  />
                ) : (
                  optimisticOrganization.name?.slice(0, 2).toUpperCase()
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {optimisticOrganization.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {isLoading ? (
                    <Loader2 className="size-3 animate-spin" />
                  ) : (
                    "Basic"
                  )}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            {organizations.map((org) => (
              <DropdownMenuItem
                key={org.id}
                className="gap-2 p-2"
                onSelect={() => setActiveOrganization(org.id)}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  {org.logo ? (
                    <Image
                      src={org.logo}
                      alt={org.name}
                      className="size-4 object-contain"
                    />
                  ) : (
                    org.name?.slice(0, 2).toUpperCase()
                  )}
                </div>
                <div className="font-medium">{org.name}</div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => {
                router.push("/signup/create-workspace");
              }}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

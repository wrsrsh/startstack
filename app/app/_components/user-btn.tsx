import {
  BadgeCheck,
  Bell,
  Building2,
  ChevronsUpDown,
  CreditCard,
  Loader2,
  LogOut,
  Palette,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export function UserButton() {
  const { isMobile } = useSidebar();
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  if (isPending) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-2 p-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="mb-1 h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
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
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={session?.user?.image ?? ""}
                  alt={session?.user?.name}
                />
                <AvatarFallback className="rounded-lg">
                  {session?.user?.name?.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session?.user?.name}
                </span>
                <span className="truncate text-xs">{session?.user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={session?.user?.image ?? ""}
                    alt={session?.user?.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {session?.user?.name?.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session?.user?.name}
                  </span>
                  <span className="truncate text-xs">
                    {session?.user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/app/settings?page=account">
                <DropdownMenuItem className="cursor-pointer">
                  <BadgeCheck className="size-4" />
                  Account
                </DropdownMenuItem>
              </Link>
              <Link href="/app/settings?page=workspace">
                <DropdownMenuItem className="cursor-pointer">
                  <Building2 className="size-4" />
                  Workspace
                </DropdownMenuItem>
              </Link>
              <Link href="/app/settings?page=billing">
                <DropdownMenuItem className="cursor-pointer">
                  <CreditCard className="size-4" />
                  Billing
                </DropdownMenuItem>
              </Link>
              <Link href="/app/settings?page=notifications">
                <DropdownMenuItem className="cursor-pointer">
                  <Bell className="size-4" />
                  Notifications
                </DropdownMenuItem>
              </Link>
              <Link href="/app/settings?page=notifications">
                <DropdownMenuItem className="cursor-pointer">
                  <Palette className="size-4" />
                  Appearance
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                setLoggingOut(true);
                try {
                  const { error } = await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/login");
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
                <div className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                  <span>Log Out</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogOut className="size-4" />
                  Log Out
                </div>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

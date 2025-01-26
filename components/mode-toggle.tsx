"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function ModeToggle({
  className,
  caller,
}: {
  className?: string;
  caller: "layout" | "page";
}) {
  const { setTheme } = useTheme();
  const isMobile = useIsMobile();
  const pathName = usePathname();
  const disabledPathnamesStart: string[] = ["/app/settings"];

  if (
    disabledPathnamesStart.some((pathnameStart) =>
      pathName.startsWith(pathnameStart),
    )
  ) {
    return null;
  } else if (caller !== "page" && pathName === "/") {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button variant="outline" size={isMobile ? "default" : "icon"}>
          <Sun className="h-[1.2rem] w-[1.2rem] visible dark:hidden" />
          <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:block text-white" />
          <span className={cn(
            !isMobile && "sr-only",
          )}>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader, Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NavigationButtonProps extends ButtonProps {
  href: string;
}

export function NavigationButton({
  href,
  disabled,
  className,
  variant,
  children,
}: NavigationButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        setLoading(true);
        router.push(href);
      }}

      variant={variant}
      className={cn("flex gap-1 items-center w-30 py-5", className)}
      disabled={loading || disabled}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {children}
        </>
      )}
    </Button>
  );
}

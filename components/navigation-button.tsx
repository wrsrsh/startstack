"use client";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
        try {
          router.push(href);
        } catch (error) {
          toast.error((error as string) ?? "Something went wrong");
        } finally {
          setLoading(false);
        }
      }}
      variant={variant}
      className={cn("flex gap-1 items-center w-30 py-5", className)}
      disabled={loading || disabled}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{children}</>}
    </Button>
  );
}

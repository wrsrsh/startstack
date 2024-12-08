"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  return (
    <Button
      onClick={async () => {
        setLoading(true);
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
          setLoading(false);
        }
      }}
      disabled={loading}
      className="w-full"
    >
      {loading ? <Loader2 className="animate-spin size-4" /> : "Logout"}
    </Button>
  );
}

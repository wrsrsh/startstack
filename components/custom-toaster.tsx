"use client";

import { useTheme } from "next-themes";
// import { usePathname } from "next/navigation";
import { Toaster, ToasterProps } from "sonner";

type Theme = "light" | "dark" | "system";

export function CustomToaster(props: ToasterProps) {
  const { theme } = useTheme();
  // const pathname = usePathname();
  return (
    <Toaster
      {...props}
      theme={theme as Theme}
      position={"bottom-right"}
      richColors
      visibleToasts={2}
      toastOptions={{
        className: "!rounded-full py-3",
      }}
    />
  );
}

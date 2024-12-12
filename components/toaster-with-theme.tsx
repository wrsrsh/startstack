"use client";

import { useTheme } from "next-themes";
import { Toaster, ToasterProps } from "sonner";

type Theme = "light" | "dark" | "system";

export function CustomToaster(props: ToasterProps) {
  const { theme } = useTheme();
  return (
    <Toaster
      {...props}
      theme={theme as Theme}
      position="bottom-right"
      richColors
      visibleToasts={2}
      toastOptions={{
        className: "!rounded-full py-3",
      }}
    />
  );
}

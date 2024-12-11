"use client";

import { useTheme } from "next-themes";
import { Toaster, ToasterProps } from "sonner";

type Theme = "light" | "dark" | "system";

export function CustomToaster(props: ToasterProps) {
  return (
    <Toaster
      {...props}
      theme={"system"}
      position="bottom-right"
      richColors
      visibleToasts={2}
      toastOptions={{
        className: "!rounded-full py-3",
      }}
    />
  );
}

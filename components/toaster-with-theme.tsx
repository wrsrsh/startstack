"use client";

import { useTheme } from "next-themes";
import { Toaster, ToasterProps } from "sonner";

type Theme = "light" | "dark" | "system";

export function ToasterWithTheme(props: ToasterProps) {
  return <Toaster {...props} theme={"system"} />;
}

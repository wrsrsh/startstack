import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "sonner";
import { ModeToggle } from "@/components/mode-toggle";
import { ToasterWithTheme } from "@/components/toaster-with-theme";
import { createMetadata } from "@/lib/metadata";
import { APP_NAME } from "@/constants";

export const metadata = createMetadata({
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: "The easiest way to get started with your next project",
});
  
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        {/* <AppPostHogProvider> */}
        <body className="h-screen bg-orange-50/50 dark:bg-gray-900/10">
          <NuqsAdapter>
            <ThemeProvider
              attribute={"class"}
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <ModeToggle className="absolute right-4 top-4" />
            </ThemeProvider>
          </NuqsAdapter>
          <ToasterWithTheme position="bottom-right"/>
        </body>
        {/* </AppPostHogProvider> */}
      </html>
    </ViewTransitions>
  );
}

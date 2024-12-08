import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "sonner";
import { ModeToggle } from "@/components/mode-toggle";

export const metadata: Metadata = {
  title: {
    default: "Startstack",
    template: "%s | Startstack",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        {/* <AppPostHogProvider> */}
        <body >
          <NuqsAdapter>
            <ThemeProvider
              attribute={"class"}
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main className="h-screen bg-orange-50/50 dark:bg-orange-900/5">
                {children}
              </main>
              <ModeToggle className="absolute top-4 right-4" />
            </ThemeProvider>
          </NuqsAdapter>
          <Toaster position="bottom-right" richColors />
        </body>
        {/* </AppPostHogProvider> */}
      </html>
    </ViewTransitions>
  );
}

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Startstack",
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
        <body className={GeistSans.className + ""}>
          <NuqsAdapter>
            <ThemeProvider
              attribute={"class"}
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main className="h-screen">{children}</main>
            </ThemeProvider>
          </NuqsAdapter>
          <Toaster position="bottom-right" richColors />
        </body>
        {/* </AppPostHogProvider> */}
      </html>
    </ViewTransitions>
  );
}

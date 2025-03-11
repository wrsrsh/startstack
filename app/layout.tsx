import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "sonner";
import { ModeToggle } from "@/components/mode-toggle";
import { CustomToaster } from "@/components/custom-toaster";
import { createMetadata } from "@/lib/metadata";
import { APP_NAME } from "@/constants";
import { PostHogProvider } from "@/providers/posthog-provider";
import NextTopLoader from "nextjs-toploader";
import { CookieConsent } from "@/components/cookie-consent";

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
        <PostHogProvider>
          <body>
            <NuqsAdapter>
              <ThemeProvider
                attribute={"class"}
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <NextTopLoader
                  color="hsl(var(--primary))"
                  showSpinner={false}
                />
                {children}
                {/* <ModeToggle
                  className="absolute right-4 top-4"
                  caller="layout"
                /> */}
                <CustomToaster />
                <CookieConsent />
              </ThemeProvider>
            </NuqsAdapter>
          </body>
        </PostHogProvider>
      </html>
    </ViewTransitions>
  );
}
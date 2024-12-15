import { AppSidebar } from "./_components/app-sidebar";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MOBILE,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { authValidator } from "@/lib/auth/validate";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await authValidator();
  return (
    <SidebarProvider>
      <AppSidebar />
      <Suspense fallback={<Loading />}>
        <SidebarInset>{children}</SidebarInset>
      </Suspense>
    </SidebarProvider>
  );
}

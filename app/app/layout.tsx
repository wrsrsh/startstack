import { AppSidebar } from "./_components/app-sidebar";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Suspense fallback={<Loading />}>{children} </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}

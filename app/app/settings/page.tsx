import React, { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PageTitle } from "@/components/page-title";
import Loading from "@/app/loading";
import { SettingsSidebar } from "./_components/settings-sidebar";
import { AccountPage } from "./_components/account-page";
import { WorkspacePage } from "./_components/workspace-page";
import { AppearancePage } from "./_components/appearance-page";
import { NotificationPage } from "./_components/notifications-page";
// import { BillingPage } from "./_components/billing-page";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Since searchParams is now a Promise in Next.js 15, we need to await it
  const resolvedSearchParams = await searchParams;
  const tab = resolvedSearchParams.tab ?? "account";

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const activeSessions = await auth.api.listSessions({
    headers: await headers(),
  });
  const activeOrganization = await auth.api.getFullOrganization({
    headers: await headers(),
  });

  return (
    <section className="px-4 py-2">
      <PageTitle selfLabel="Settings" />
      <div className="flex gap-8">
        <SettingsSidebar activeTab={tab as string} />
        <main className="flex-1">
          <Suspense fallback={<Loading />}>
            {tab === "account" && (
              <AccountPage activeSessions={activeSessions} session={session} />
            )}
            {tab === "workspace" && (
              <WorkspacePage
                activeOrganization={activeOrganization}
                session={session}
              />
            )}
            {/* {tab === "billing" && <BillingPage />} */}
            {tab === "notifications" && <NotificationPage />}
            {tab === "appearance" && <AppearancePage />}
          </Suspense>
        </main>
      </div>
    </section>
  );
}

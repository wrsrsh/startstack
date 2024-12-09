import React, { Suspense } from "react";
import { AccountPage } from "./_components/account-page";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PageTitle } from "@/components/page-title";
import { WorkspacePage } from "./_components/workspace-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "@/app/loading";
import { AppearancePage } from "./_components/appearance-page";

export default async function SettingsPage() {
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
    <main className="flex flex-col px-4">
      <PageTitle selfLabel="Settings" />
      <Tabs defaultValue="account" className="grid w-full gap-2">
        <TabsList className="grid grid-flow-col grid-cols-5">
          <TabsTrigger value="account">Account & Security</TabsTrigger>
          <TabsTrigger value="workspace">Workspace Preferences</TabsTrigger>
          <TabsTrigger value="billing">Billing & Plans</TabsTrigger>
          <TabsTrigger value="integrations">Emails & Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Suspense fallback={<Loading />}>
            <AccountPage activeSessions={activeSessions} session={session} />
          </Suspense>
        </TabsContent>
        <TabsContent value="workspace">
          <Suspense fallback={<Loading />}>
            <WorkspacePage
              activeOrganization={activeOrganization}
              session={session}
            />
          </Suspense>
        </TabsContent>
        <TabsContent value="appearance">
          <Suspense fallback={<Loading />}>
            <AppearancePage />
          </Suspense>
        </TabsContent>
      </Tabs>
      <section className="flex flex-col gap-4"></section>
    </main>
  );
}

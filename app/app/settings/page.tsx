import React, { Suspense } from "react";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { PageTitle } from "@/components/page-title";
import { Settings } from "./_components/settings";
import Loading from "@/app/loading";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const activeSessions = await auth.api.listSessions({
    headers: await headers(),
  });

  return (
    <section className="px-4 py-2">
      <PageTitle selfLabel="Settings" />
      <Suspense fallback={<Loading />}>
        <Settings session={session} activeSessions={activeSessions} />
      </Suspense>
    </section>
  );
}

import React, { Suspense } from "react";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { PageTitle } from "@/components/page-title";
import { Settings } from "./_components/settings";

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
      <Settings
        session={session}
        activeSessions={activeSessions}
      />
    </section>
  );
}

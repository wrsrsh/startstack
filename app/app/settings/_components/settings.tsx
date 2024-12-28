"use client";
import React, { Suspense, useEffect } from "react";
import { AccountPage } from "./account-page";
import Loading from "@/app/loading";
import { AppearancePage } from "./appearance-page";
import { NotificationPage } from "./notifications-page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { Bell, Building2, CreditCard, Palette, UserCircle } from "lucide-react";
import { Session } from "@/types/auth";

const settingsTabs = [
  { name: "Account & Security", value: "account", icon: UserCircle },
  { name: "Billing & Plans", value: "billing", icon: CreditCard },
  { name: "Emails & Notifications", value: "notifications", icon: Bell },
  { name: "Appearance", value: "appearance", icon: Palette },
];

export function Settings({
  activeSessions,
  session,
}: {
  session: Session | null;
  activeSessions: Session["session"][];
}) {
  const [tab, setTab] = useQueryState("page", {});
  useEffect(() => {
    if (!tab) setTab("account");
  }, [tab, setTab]);
  return (
    <section className="grid grid-rows-[_1fr] gap-8 sm:grid-cols-[250px_1fr]">
      <nav className="space-y-1.5">
        {settingsTabs.map((mappedTab) => (
          <Button
            variant="ghost"
            key={mappedTab.value}
            className={cn(
              "w-full justify-start rounded-full",
              tab === mappedTab.value
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
            )}
            onClick={() => {
              setTab(mappedTab.value);
            }}
          >
            <mappedTab.icon className="mr-1 h-4 w-4" />
            {mappedTab.name}
          </Button>
        ))}
      </nav>
      <main className="flex-1">
        {tab === "account" && (
          <AccountPage activeSessions={activeSessions} session={session} />
        )}
        {/* {tab === "billing" && <BillingPage />} */}
        {tab === "notifications" && <NotificationPage />}
        {tab === "appearance" && <AppearancePage />}
      </main>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { AccountPage } from "./account-page";
import Loading from "@/app/loading";
import { AppearancePage } from "./appearance-page";
import { NotificationPage } from "./notifications-page";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { Bell, Building2, CreditCard, Palette, UserCircle } from "lucide-react";
import { Session } from "@/types/auth";

// Define a type or interface for the subscription data
interface SubscriptionData {
  created_at: string;
  currency: string;
  customer: any; // Replace 'any' with a more specific type if you have one...if u need :(
  discount_id: string | null;
  metadata: any; // Replace 'any' with a more specific type if you have one...can't do it now
  next_billing_date: string;
  payment_frequency_count: number;
  payment_frequency_interval: string;
  product_id: string;
  quantity: number;
  recurring_pre_tax_amount: number;
  status: string;
  subscription_id: string;
  subscription_period_count: number;
  subscription_period_interval: string;
  tax_inclusive: boolean;
  trial_period_days: number;
}

// Function to fetch subscription status
async function getSubscriptionStatus(email: string): Promise<SubscriptionData | null> {
  try {
    const response = await fetch(`/api/get-subscription?email=${email}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch subscription status');
    }
    return data.subscription as SubscriptionData;
  } catch (error: any) {
    console.error('Error fetching subscription status:', error);
    return null;
  }
}

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
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tab) setTab("account");
  }, [tab, setTab]);

  useEffect(() => {
    const fetchSubscription = async () => {
      setLoading(true);
      if (session?.user?.email) {
        const subscriptionData = await getSubscriptionStatus(session.user.email);
        setSubscription(subscriptionData);
      }
      setLoading(false);
    };

    fetchSubscription();
  }, [session]);

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
        {tab === "billing" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Billing & Plans</h2>
            {loading ? (
              <Loading />
            ) : subscription ? (
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-md font-semibold">Subscription Details</h3>
                <p>Status: {subscription.status}</p>
                <p>Product ID: {subscription.product_id}</p>
                  {/* Display additional subscription details */}
                  <p>Created At: {subscription.created_at}</p>
                  <p>Next Billing Date: {subscription.next_billing_date}</p>
                  <p>Amount: {subscription.recurring_pre_tax_amount} {subscription.currency}</p>
                {/* Display other relevant subscription details */}
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-4">
                <p>No active subscription found.</p>
              </div>
            )}
          </div>
        )}
        {tab === "notifications" && <NotificationPage />}
        {tab === "appearance" && <AppearancePage />}
      </main>
    </section>
  );
}

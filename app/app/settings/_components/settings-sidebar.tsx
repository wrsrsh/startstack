import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserCircle, Building2, CreditCard, Bell, Palette } from "lucide-react";

const settingsTabs = [
  { name: "Account & Security", value: "account", icon: UserCircle },
  { name: "Workspace Preferences", value: "workspace", icon: Building2 },
  { name: "Billing & Plans", value: "billing", icon: CreditCard },
  { name: "Emails & Notifications", value: "notifications", icon: Bell },
  { name: "Appearance", value: "appearance", icon: Palette },
];

export function SettingsSidebar({ activeTab }: { activeTab: string }) {
  return (
    <nav className="space-y-1.5">
      {settingsTabs.map((tab) => (
        <Link
          key={tab.value}
          href={`/app/settings?tab=${tab.value}`}
          className="block"
        >
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start rounded-full",
              activeTab === tab.value
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
            )}
          >
            <tab.icon className="mr-1 h-4 w-4" />
            {tab.name}
          </Button>
        </Link>
      ))}
    </nav>
  );
}

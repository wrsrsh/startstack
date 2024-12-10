"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeCard = ({
  title,
  icon: Icon,
  isSelected,
}: {
  title: string;
  icon: LucideIcon;
  isSelected: boolean;
}) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <div
        className={`relative w-full rounded-lg border border-input p-4 ${
          isSelected ? "border-2 border-blue-700" : ""
        } ${title === "Dark" ? "bg-gray-900" : "bg-white"}`}
      >
        <div
          className={`flex items-center gap-2 ${
            title === "Dark" ? "text-white" : "text-gray-900"
          }`}
        >
          <Icon size={18} />
        </div>
        <div className="mt-3 space-y-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded ${
                title === "Dark" ? "bg-gray-700" : "bg-gray-200"
              } ${i === 0 ? "w-3/4" : i === 1 ? "w-1/2" : "w-1/3"}`}
            />
          ))}
        </div>
      </div>
      <span className="text-sm font-medium px-1">{title}</span>
    </div>
  );
};

export function AppearancePage() {
  const { setTheme, theme } = useTheme();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <p className="text-sm text-gray-500">Customize your UI theme</p>
      </CardHeader>
      <CardContent>
        <div className="flex w-1/2 flex-col gap-4 sm:flex-row">
          <div
            className="w-full cursor-pointer"
            onClick={() => setTheme("light")}
          >
            <ThemeCard
              title="Light"
              icon={Sun}
              isSelected={theme === "light"}
            />
          </div>
          <div
            className="w-full cursor-pointer"
            onClick={() => setTheme("dark")}
          >
            <ThemeCard title="Dark" icon={Moon} isSelected={theme === "dark"} />
          </div>
          <div
            className="w-full cursor-pointer"
            onClick={() => setTheme("system")}
          >
            <ThemeCard
              title="System"
              icon={Monitor}
              isSelected={theme === "system"}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

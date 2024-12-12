"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RainbowButton } from "@/components/ui/rainbow-button";

interface HeaderButtonProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export function HeaderButton({ href, label, icon }: HeaderButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="m-0 flex h-9 items-center gap-2 !py-0 px-3"
      onClick={() => router.push(href)}
    >
      {icon}
      {label}
    </Button>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React from "react";

export function RandomToast() {
  return <Button onClick={() => toast.success("Hello")} variant={"outline"}>Show Hello World Toast</Button>;
}

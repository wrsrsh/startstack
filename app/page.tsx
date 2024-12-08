import React from "react";
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/app/home");
}

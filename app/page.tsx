import React from "react";
import { redirect } from "next/navigation";

export default function RootPage() {
  return redirect("home");
}

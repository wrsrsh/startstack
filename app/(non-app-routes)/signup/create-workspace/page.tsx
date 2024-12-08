import Loading from "@/app/loading";
import { CreateWorkspaceForm } from "@/components/forms/create-workspace-form";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Workspace | Sign Up",
  description: "Create an account",
};

export default function OnboardingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Suspense fallback={<Loading />}>
        {" "}
        <CreateWorkspaceForm />
      </Suspense>
    </main>
  );
}

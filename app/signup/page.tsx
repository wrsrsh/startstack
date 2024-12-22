import React, { Suspense } from "react";
import { SignupForm } from "@/components/forms/signup-form";
import { Metadata } from "next";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account",
};

export default async function SignUpPage() {
  // const res = await auth.api.getSession({
  //   headers: await headers(),
  // });
  // if (res?.session) return redirect("/app/home");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Suspense fallback={<Loading />}>
        <SignupForm />
      </Suspense>
    </main>
  );
}

import { Suspense } from "react";
import { SignupForm } from "@/components/forms/signup-form";
import { Metadata } from "next";
import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account",
};

export default async function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Suspense fallback={<Loading />}>
        <SignupForm />
      </Suspense>
    </main>
  );
}

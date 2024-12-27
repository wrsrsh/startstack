import { Suspense } from "react";
import { LoginForm } from "@/components/forms/login-form";
import { Metadata } from "next";
import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: "Login",
  description: "Create an account",
};

export default async function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Suspense fallback={<Loading />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}

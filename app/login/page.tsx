import { LoginForm } from "@/components/forms/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Create an account",
};

export default async function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <LoginForm />
    </main>
  );
}

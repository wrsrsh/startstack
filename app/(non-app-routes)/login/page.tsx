import React from "react";
import { LoginForm } from "./_components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Create an account",
};

export default function SignUpPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-orange-50/40">
      <LoginForm />
    </main>
  );
}

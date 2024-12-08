import React from "react";
import { SignupForm } from "./_components/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account",
}

export default function SignUpPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-orange-50/40">
      <SignupForm />
    </main>
  );
}

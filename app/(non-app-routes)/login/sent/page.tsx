import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Login Link Sent",
};

export default function MagicLinkSent() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-orange-50/40">
      <Card className="min-w-md max-w-md">
        <div className="px-4">
          <CardHeader className="flex flex-col items-center space-y-2">
            <CheckCircle className="w-12 h-12 text-green-500" />
            <CardTitle className="text-2xl font-bold text-center">
              Login Link Sent!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground text-sm w-96">
              We've sent a magic link to your email address, click the continue
              button in the email to login. If you don't see the email in your
              inbox, check your spam folder.
            </p>
            <p className="text-muted-foreground text-sm">
              Still didn't receive the email?{" "}
              <Link
                href="/login"
                className="font-medium hover:underline cursor-pointer underline-offset-4"
              >
                Try Again
              </Link>
            </p>
          </CardContent>
        </div>
      </Card>
    </main>
  );
}

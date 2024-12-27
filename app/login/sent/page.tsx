import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login Link Sent",
};

export default async function MagicLinkSent() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="min-w-md max-w-md">
        <div className="px-4">
          <CardHeader className="flex flex-col items-center space-y-2">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <CardTitle className="text-center text-2xl font-bold">
              Login Link Sent!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="w-96 text-sm text-muted-foreground">
              We've sent a magic link to your email address, click the continue
              button in the email to login. If you don't see the email in your
              inbox, check your spam folder.
            </p>
            <p className="text-sm text-muted-foreground">
              Still didn't receive the email?{" "}
              <Link
                href="/login"
                className="cursor-pointer font-medium underline-offset-4 hover:underline"
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

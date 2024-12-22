import { auth } from "@/lib/auth/server";
import { dodo } from "@/lib/billing/dodo";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Validate user session
    const res = await auth.api.getSession({
      headers: await headers(),
    });

    if (!res?.session || !res.user) {
      return NextResponse.json(
        {
          error: "You are not authorized to access this resource",
        },
        { status: 401 },
      );
    }

    const { subscriptionId } = res.user;

    if (!subscriptionId) {
      return NextResponse.json(
        {
          error: "Subscription ID is missing",
        },
        { status: 400 },
      );
    }

    // Retrieve subscription status
    const subscription = await dodo.subscriptions.retrieve(subscriptionId);

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("An error occurred while retrieving subscription:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}

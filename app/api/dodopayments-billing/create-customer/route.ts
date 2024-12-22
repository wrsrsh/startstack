import { auth } from "@/lib/auth/server";
import { protectedApi } from "@/lib/auth/validate";
import { dodo } from "@/lib/billing/dodo";
import DodoPayments from "dodopayments";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  try {
    const res = await auth.api.getSession({
      headers: await headers(),
    });

    if (!res?.user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const response: DodoPayments.Customer = await dodo.customers.create({
      email: res.user.email,
      name: res.user.name,
    });

    if (!response) {
      return NextResponse.json(
        { error: "An error occurred when creating customer" },
        { status: 500 },
      );
    }

    return NextResponse.json({ customer: response });
  } catch (error) {
    console.error("An error occurred while creating customer:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}

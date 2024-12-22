import { auth } from "@/lib/auth/server";
import { dodo } from "@/lib/billing/dodo";
import DodoPayments from "dodopayments";
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

    // Extract productId from query parameters
    const url = new URL(request.url);
    const productId = url.searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        {
          error: "Product ID is required as a query parameter",
        },
        { status: 400 },
      );
    }

    // Retrieve subscription status using the provided product ID
    const product: DodoPayments.Product = await dodo.products.retrieve(productId);

    return NextResponse.json(product);
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

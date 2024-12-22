import { auth } from "@/lib/auth/server";
import { dodo } from "@/lib/billing/dodo";
import { CountryCode } from "dodopayments/resources/misc/supported-countries.mjs";
import { headers } from "next/headers";
import { NextResponse } from "next/server"

export async function POST(request: Request) {
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

    const PRODUCT_ID = "your-product-id";

    const {
      customerId,
      subscriptionId,
      name,
      id,
      email,
      street,
      city,
      state,
      country,
      zipcode,
    } = res.user;

    if (
      !customerId ||
      !subscriptionId ||
      !name ||
      !id ||
      !email ||
      !street ||
      !city ||
      !state ||
      !country ||
      !zipcode
    ) {
      return NextResponse.json(
        {
          error: "User details are incomplete for creating a subscription",
        },
        { status: 400 },
      );
    }

    const countryCode = country as CountryCode;

    // Create subscription using user details and predefined product ID
    const response = await dodo.subscriptions.create({
      customer: {
        customer_id: customerId,
        email,
        name,
      },
      payment_link: true,
      quantity: 1, // Default quantity
      return_url: process.env.NEXT_PUBLIC_APP_URL,
      product_id: PRODUCT_ID,
      billing: {
        city,
        country: countryCode,
        state,
        street,
        zipcode,
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("An error occurred while creating subscription:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}

// Example usage of the API:
/*
POST /api/subscription
{}
*/

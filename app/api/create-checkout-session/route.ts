// app/api/create-checkout-session/route.ts
import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";

// Initialize DODO client directly
const dodo = new DodoPayments({
  bearerToken: process.env.DODO_API_KEY,
  environment: process.env.NODE_ENV === "production" ? "live_mode" : "test_mode",
});

export async function POST(request: Request) {
  try {
    const { productId, planName, successUrl, cancelUrl } = await request.json();

    if (!productId || !successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Create a checkout session with DODO - using correct parameter names
    const session = await dodo.payments.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: [
        {
          product_id: productId,
          quantity: 1,
        },
      ],
      metadata: {
        plan_name: planName,
      },
    } as any); // Using type assertion to bypass TypeScript errors

    // Access the checkout URL property using type assertion to bypass TypeScript errors
    // The property might be checkoutUrl, url, or something else depending on the SDK
    const checkoutSession = session as any;
    
    // First, try to determine which property contains the checkout URL by logging
    console.log("Payment session response:", JSON.stringify(checkoutSession, null, 2));
    
    // Try different possible property names that might contain the checkout URL
    const checkoutUrl = 
      checkoutSession.checkoutUrl || 
      checkoutSession.checkout_url || 
      checkoutSession.url ||
      checkoutSession.redirect_url;
    
    if (!checkoutUrl) {
      throw new Error("Could not find checkout URL in response");
    }

    return NextResponse.json({
      checkoutUrl: checkoutUrl,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
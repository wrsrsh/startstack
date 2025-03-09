// app/api/webhooks/dodo/route.ts
import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";
import crypto from "crypto";

// Define the types for webhook payloads
type Payment = {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  customer_id?: string;
  product_id: string;
  metadata?: Record<string, any>;
  payment_method?: {
    type: string;
    last4?: string;
    exp_month?: number;
    exp_year?: number;
  };
  payload_type: string;
};

type Subscription = {
  id: string;
  customer_id: string;
  status: string;
  product_id: string;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  canceled_at?: string;
  metadata?: Record<string, any>;
  payload_type: string;
};

type WebhookPayload = {
  type: string;
  data: Payment | Subscription;
};

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("dodo-signature") || "";

  try {
    // Get webhook secret directly from environment variable
    const webhookSecret = process.env.DODO_WEBHOOK_SECRET || "";
    
    // Verify the webhook signature
    const isValid = verifySignature(body, signature, webhookSecret);
    
    if (!isValid && webhookSecret) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const payload = JSON.parse(body) as WebhookPayload;

    // Handle different event types
    switch (payload.type) {
      case "payment.succeeded":
        await handlePaymentSucceeded(payload.data as Payment);
        break;
      
      case "payment.failed":
        await handlePaymentFailed(payload.data as Payment);
        break;
      
      case "subscription.created":
        await handleSubscriptionCreated(payload.data as Subscription);
        break;
      
      case "subscription.updated":
        await handleSubscriptionUpdated(payload.data as Subscription);
        break;
      
      case "subscription.cancelled":
      case "subscription.canceled": // Handle possible spelling variations
        await handleSubscriptionCancelled(payload.data as Subscription);
        break;
      
      default:
        console.log("Unhandled webhook event:", payload.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Webhook event handlers
async function handlePaymentSucceeded(payment: Payment) {
  console.log("Payment succeeded:", payment.id);
  // Implement your business logic here
  // For example:
  // 1. Update payment status in your database
  // 2. Grant access to purchased products/features
  // 3. Send email confirmation to customer
  // 4. Update user subscription status
}

async function handlePaymentFailed(payment: Payment) {
  console.log("Payment failed:", payment.id);
  // Implement your business logic here
  // For example:
  // 1. Update payment status in your database
  // 2. Notify customer of failed payment
  // 3. Retry payment or suggest alternative payment method
}

async function handleSubscriptionCreated(subscription: Subscription) {
  console.log("Subscription created:", subscription.id);
  // Implement your business logic here
  // For example:
  // 1. Save subscription details in your database
  // 2. Update user's subscription status
  // 3. Grant access to subscription features
  // 4. Send welcome email
}

async function handleSubscriptionUpdated(subscription: Subscription) {
  console.log("Subscription updated:", subscription.id);
  // Implement your business logic here
  // For example:
  // 1. Update subscription details in your database
  // 2. Handle changes in subscription plan/features
}

async function handleSubscriptionCancelled(subscription: Subscription) {
  console.log("Subscription cancelled:", subscription.id);
  // Implement your business logic here
  // For example:
  // 1. Update subscription status in your database
  // 2. Set access expiration date
  // 3. Send cancellation confirmation
  // 4. Offer win-back options
}

// Signature verification function
// This is a placeholder - you'll need to implement according to DODO's documentation
function verifySignature(payload: string, signature: string, secret: string): boolean {
  if (!secret || !signature) {
    // If no secret is provided, skip verification (not recommended for production)
    console.warn("Webhook signature verification skipped - no secret provided");
    return true;
  }

  try {
    // This is a generic HMAC-based verification example
    // Replace with the actual verification method specified by DODO
    const hmac = crypto.createHmac('sha256', secret);
    const expectedSignature = hmac.update(payload).digest('hex');
    
    // Use crypto.timingSafeEqual to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(signature), 
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error("Signature verification error:", error);
    return false;
  }
}
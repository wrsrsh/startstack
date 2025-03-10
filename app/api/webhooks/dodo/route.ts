// app/api/webhooks/dodo/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";

// Define the WebhookPayload interface
interface WebhookPayload {
  event: string;
  data: {
    subscription_id?: string;
    payment_id?: string;
    status?: string;
    customer_id?: string;
    next_billing_date?: string;
    amount?: number;
    error?: string;
    // other fields depending on the event type
  };
}

// Placeholder function for updating the subscription status in your database
async function updateSubscriptionStatus(customerId: string, subscriptionId: string, status: string) {
  // **Replace this with your actual database update logic**
  console.log(`Updating subscription status for customer ${customerId}, subscription ${subscriptionId} to ${status}`);
  // Example using a hypothetical database client:
  // await db.updateSubscription(customerId, subscriptionId, status);
}

export async function POST(request: NextRequest) {
  const headersList = await headers();
  const webhookSecret = process.env.DODO_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Missing webhook secret");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
    const rawBody = await request.text();

    const webhookHeaders = {
      "webhook-id": headersList.get("webhook-id") || "",
      "webhook-signature": headersList.get("webhook-signature") || "",
      "webhook-timestamp": headersList.get("webhook-timestamp") || "",
    };

    // Initialize the webhook with your secret
    const webhook = new Webhook(webhookSecret);

    // Verify the webhook signature
    await webhook.verify(rawBody, webhookHeaders);

    // Parse the payload
    const payload = JSON.parse(rawBody) as WebhookPayload;
    const { event, data } = payload;

    // Handle different subscription events
    switch (event) {
      case 'subscription.active':
        if (data.customer_id && data.subscription_id && data.status) {
          await updateSubscriptionStatus(data.customer_id, data.subscription_id, data.status);
          console.log('Subscription activated:', data.subscription_id);
        }
        break;
      case 'subscription.on_hold':
        if (data.customer_id && data.subscription_id && data.status) {
          await updateSubscriptionStatus(data.customer_id, data.subscription_id, data.status);
          console.log('Subscription on hold:', data.subscription_id);
        }
        break;
      case 'subscription.failed':
        if (data.customer_id && data.subscription_id && data.status) {
          await updateSubscriptionStatus(data.customer_id, data.subscription_id, data.status);
          console.log('Subscription failed:', data.subscription_id);
        }
        break;
      case 'subscription.renewed':
        if (data.customer_id && data.subscription_id && data.status) {
          await updateSubscriptionStatus(data.customer_id, data.subscription_id, data.status);
          console.log('Subscription renewed:', data.subscription_id);
        }
        break;
      case 'payment.succeeded':
        // Payment succeeded, you might want to update some payment-related info
        console.log('Payment succeeded:', data.payment_id);
        break;
      case 'payment.failed':
        // Payment failed, handle accordingly
        console.log('Payment failed:', data.payment_id);
        break;
      default:
        console.log(`Unhandled event type: ${event}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}

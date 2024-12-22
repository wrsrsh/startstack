import { Webhook } from "standardwebhooks";
import { headers } from "next/headers";
import { WebhookPayload } from "@/lib/billing/dodo";
import env from "@/env";

const webhook = new Webhook(env.DODO_API_KEY);

export async function POST(request: Request) {
  const headersList = await headers();

  try {
    const rawBody = await request.text();
    console.log("Received webhook request", { rawBody });

    const webhookHeaders = {
      "webhook-id": headersList.get("webhook-id") || "",
      "webhook-signature": headersList.get("webhook-signature") || "",
      "webhook-timestamp": headersList.get("webhook-timestamp") || "",
    };

    await webhook.verify(rawBody, webhookHeaders);
    console.log("Webhook verified successfully");

    const payload = JSON.parse(rawBody) as WebhookPayload;

    if (!payload.data?.customer?.email) {
      throw new Error("Missing customer email in payload");
    }

    const email = payload.data.customer.email;

    if (payload.data.payload_type === "Subscription") {
      switch (payload.data.status) {
        case "active":
          // TODO: Handle active subscription
          // 1. Update user's subscription status in database to active
          // 2. Update subscription_id and customer_id in user record
          // 3. Send welcome email to customer
          break;

        case "pending":
          // No action needed for pending status
          break;

        default:
          // TODO: Update subscription status in database
          // 1. Find user by email
          // 2. Update subscription status to match webhook status
          // 3. If cancelled/expired, remove subscription_id
          break;
      }
    }

    return Response.json(
      { message: "Webhook processed successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Webhook processing failed", error);
    return Response.json(
      {
        error: "Webhook processing failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}

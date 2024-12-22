import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import env from "@/env";

export async function POST(request: Request) {
  const headersList = await headers();
  const rawBody = await request.text();

  try {
    // Extract headers and body
    const webhookSignature = headersList.get("webhook-signature") || "";
    const webhookTimestamp = headersList.get("webhook-timestamp") || "";
    const webhookId = headersList.get("webhook-id") || "";

    // Ensure we have all necessary headers
    if (!webhookSignature || !webhookTimestamp || !webhookId) {
      throw new Error("Missing required webhook headers");
    }

    // Verify the signature using HMAC
    const expectedSignature = generateSignature(rawBody, webhookTimestamp);

    if (webhookSignature !== expectedSignature) {
      throw new Error("Invalid signature");
    }

    console.log("Webhook verified successfully");

    // Parse the payload
    const payload = JSON.parse(rawBody);

    if (!payload?.data?.customer?.email) {
      throw new Error("Missing customer email in payload");
    }

    const email = payload.data.customer.email;

    if (payload.data.payload_type === "Subscription") {
      switch (payload.data.status) {
        case "active":
          console.log(`Subscription for ${email} is active`);
          break;
        case "pending":
          console.log(`Subscription for ${email} is pending`);
          break;
        default:
          console.log(
            `Subscription for ${email} is in status: ${payload.data.status}`,
          );
          break;
      }
    }

    return NextResponse.json(
      { message: "Webhook processed successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Webhook processing failed", error);
    return NextResponse.json(
      {
        error: "Webhook processing failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    );
  }
}

// Function to generate signature for HMAC validation
function generateSignature(body: string, timestamp: string): string {
  const secret = env.DODO_API_KEY; // Replace with your actual secret key
  const message = `${timestamp}.${body}`;
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

// app/api/get-subscription/route.ts
import { NextResponse, NextRequest } from 'next/server';
import DodoPayments from 'dodopayments'; // Import the Dodo Payments SDK

// Initialize the Dodo Payments client
const client = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY, //  your Dodo Payments API key
});

// Replace with your actual database/data fetching logic
async function getSubscriptionDataFromDatabaseByEmail(email: string) {
  try {
    // **Replace this with your actual database query to get the subscription ID associated with the email**
    const subscriptionId = await getSubscriptionIdFromDatabaseByEmail(email);

    if (!subscriptionId) {
      console.log("Subscription id does not exists for the current email");
      return null; // Subscription not found in your database
    }

    // Use the Dodo Payments API to retrieve the subscription by subscription ID
    const subscription = await client.subscriptions.retrieve(subscriptionId);

    if (subscription) {
      // Adapt the Dodo Payments API response to your desired format
      const subscriptionData = {
        created_at: subscription.created_at,
        currency: subscription.currency,
        customer: subscription.customer,
        // discount_id: subscription.discount_id,
        metadata: subscription.metadata,
        next_billing_date: subscription.next_billing_date,
        payment_frequency_count: subscription.payment_frequency_count,
        payment_frequency_interval: subscription.payment_frequency_interval,
        product_id: subscription.product_id,
        quantity: subscription.quantity,
        recurring_pre_tax_amount: subscription.recurring_pre_tax_amount,
        status: subscription.status,
        subscription_id: subscription.subscription_id,
        subscription_period_count: subscription.subscription_period_count,
        subscription_period_interval: subscription.subscription_period_interval,
        // tax_inclusive: subscription.tax_inclusive,
        trial_period_days: subscription.trial_period_days
      };

      return subscriptionData;
    } else {
      console.log("Subscription not found in Dodo Payments");
      return null; // Subscription not found in Dodo Payments
    }
  } catch (error: any) {
    console.error('Error fetching subscription from Dodo Payments:', error);
    return null; // Handle errors gracefully
  }
}

async function getSubscriptionIdFromDatabaseByEmail(email: string): Promise<string | null> {
  // TODO: Implement your actual database query to fetch the subscription ID based on the email.
  // This is a placeholder - replace with your actual database logic.
  console.log("Calling database to get subscription id information for email", email);
  return "subscription_id"
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Missing email parameter' }, { status: 400 });
    }

    const subscription = await getSubscriptionDataFromDatabaseByEmail(email);

    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    return NextResponse.json({ subscription });
  } catch (error: any) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 });
  }
}

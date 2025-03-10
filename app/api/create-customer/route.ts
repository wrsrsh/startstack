// app/api/create-customer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';

export async function POST(req: NextRequest) {
  try {
    // Check for API key
    if (!process.env.DODO_API_KEY) {
      console.error('DODO_API_KEY is missing');
      return NextResponse.json({ success: false, error: 'API key missing' }, { status: 500 });
    }

    // Initialize Dodo Payments client
    const client = new DodoPayments({
      bearerToken: process.env.DODO_API_KEY,
      environment: process.env.DODO_ENVIRONMENT as 'live_mode' | 'test_mode' | undefined,
    });

    // Extract customer data from the request
    const { customerId, email, firstName, lastName, phone } = await req.json();

    // Validate required fields
    if (!customerId || !email) {
      return NextResponse.json({ success: false, error: 'Missing customerId or email' }, { status: 400 });
    }

    // Create the customer
    const customer = await client.customers.create({
      email: email,
      customer_id: customerId,
      firstName: firstName,
      lastName: lastName,
      phone: phone
    } as any);

    // Return success response
    return NextResponse.json({ success: true, customerId: customer.customer_id });

  } catch (error: any) {
    console.error('Customer creation error:', error);

    // Handle different error types
    let statusCode = 500;
    let errorMessage = 'Failed to create customer';

    if (error instanceof Error) {
      errorMessage = error.message;

      if (errorMessage.includes('409')) { // Conflict (customer ID already exists)
        statusCode = 409;
        errorMessage = 'Customer ID already exists';
      }
    }

    return NextResponse.json({ success: false, error: errorMessage }, { status: statusCode });
  }
}

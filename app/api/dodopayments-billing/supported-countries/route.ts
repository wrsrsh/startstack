import { dodo } from "@/lib/billing/dodo";
import DodoPayments from "dodopayments";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response: DodoPayments.Misc.SupportedCountryListResponse =
      await dodo.misc.supportedCountries.list();

    return NextResponse.json({ countries: response });
  } catch (error) {
    console.error("An error occurred while fetching countries:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}

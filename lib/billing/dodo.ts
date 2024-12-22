import env from "@/env";
import DodoPayments from "dodopayments";
import { Payment as BasePayment } from "dodopayments/resources/payments.mjs";
import { Subscription as BaseSubscription } from "dodopayments/resources/subscriptions.mjs";

export const dodo = new DodoPayments({
  bearerToken: env.DODO_API_KEY, // This is the default and can be omitted
  environment: "test_mode", // defaults to 'live_mode'
});

export type Payment = BasePayment & { payload_type: string };
export type Subscription = BaseSubscription & { payload_type: string };

export type OneTimeProduct = {
  product_id: string;
  quantity: number;
};

export type SubscriptionDetails = {
  activated_at: string;
  subscription_id: string;
  payment_frequency_interval: "Day" | "Week" | "Month" | "Year";
  product_id: string;
};

export type WebhookPayload = {
  type: string;
  data: Payment | Subscription;
};

export interface UpdateSubscriptionResult {
  success: boolean;
  error?: {
    message: string;
    status: number;
  };
}

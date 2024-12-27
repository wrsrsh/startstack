type PaymentProvider = "stripe" | "dodopayments" | "paddle";

export const APP_NAME =
  process.env.NODE_ENV === "development" ? "DEV - Startstack" : "Startstack";
export const PAYMENT_PROVIDER: PaymentProvider | "dodopayments" | "paddle" =
  "dodopayments";

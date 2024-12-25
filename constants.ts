type PaymentProvider = "stripe" | "dodopayments" | "paddle";

export const UNAUTHENTICATED_URL = "/login";
export const AUTHENTICATED_URL = "/app/home";
export const APP_NAME =
  process.env.NODE_ENV === "development" ? "DEV - Startstack" : "Startstack";
export const PAYMENT_PROVIDER: PaymentProvider | "dodopayments" | "paddle" =
  "dodopayments";

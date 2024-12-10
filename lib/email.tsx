import { Resend } from "resend";

import env from "@/env";
import { ReactNode } from "react";
import { APP_NAME } from "@/constants";
const resend = new Resend(env.RESEND_API_KEY);

const DEFAULT_SENDER_NAME = APP_NAME;

// Replace with your email and sender name
const DEFAULT_EMAIL = "noreply@ascendifyr.in";

export async function sendEmail(
  email: string,
  subject: string,
  body: ReactNode,
) {
  const { error } = await resend.emails.send({
    from: `${DEFAULT_SENDER_NAME} <${DEFAULT_EMAIL}>`,
    to: email,
    subject,
    react: <>{body}</>,
  });

  if (error) {
    throw error;
  }
}

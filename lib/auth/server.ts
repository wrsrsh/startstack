import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as tables from "@/database/tables";
import env from "env";
import { db } from "@/database";
import { sendMagicLink } from "@/emails/magic-link";
import { APP_NAME } from "@/constants";

export const auth = betterAuth({
  appName: APP_NAME,
  baseURL: env.NEXT_PUBLIC_APP_URL,
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [env.NEXT_PUBLIC_APP_URL],
  logger: {
    disabled: process.env.NODE_ENV === "production",
    level: "debug",
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  user: {
    additionalFields: {
      customerId: {
        type: "string",
        unique: true,
        required: false,
        fieldName: "customerId",
      },
      subscriptionId: {
        type: "string",
        unique: true,
        required: false,
        fieldName: "subscriptionId",
      },
      street: {
        type: "string",
        required: false,
        fieldName: "street",
      },
      city: {
        type: "string",
        required: false,
        fieldName: "city",
      },
      state: {
        type: "string",
        required: false,
        fieldName: "state",
      },
      country: {
        type: "string",
        required: false,
        fieldName: "country",
      },
      zipcode: {
        type: "number",
        required: false,
        fieldName: "zipcode",
      },
      name: {
        type: "string",
        required: false,
        fieldName: "name",
      },
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID as string,
      clientSecret: env.GITHUB_CLIENT_SECRET as string,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...tables,
      // ...relations,
    },
    usePlural: true,
  }),
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }, request) => {
        if (process.env.NODE_ENV === "development") {
          console.log("✨ Magic link: " + url);
        }
        await sendMagicLink(email, url);
      },
    }),
  ],
});

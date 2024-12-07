import { betterAuth } from "better-auth";
import {
  magicLink,
  organization,
} from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as tables from "@/database/tables";
// import * as relations from "@/database/relations";
import env from "env";
import { db } from "@/database";

export const auth = betterAuth({
  appName: env.NEXT_PUBLIC_APP_NAME,
  baseURL: env.NEXT_PUBLIC_APP_URL,
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
  plugins: [
    organization({
      sendInvitationEmail: async (
        { email, id, inviter, organization, role },
        request
      ) => {
        console.log(email, id, inviter, organization, role);
      },
    }),
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        console.log(email, token, url);
      },
    }),
  ],
});

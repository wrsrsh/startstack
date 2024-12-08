import { defineConfig } from "drizzle-kit";
import env from "@/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./database/schema/*",
  out: "./database/migrations/production",
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL_PRODUCTION,
  },
});

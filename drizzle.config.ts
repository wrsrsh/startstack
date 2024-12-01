import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

export default defineConfig({
  dialect: "postgresql",
  schema: "./database/schema/*",
  out: "./drizzle",
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
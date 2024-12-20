import * as tables from "./tables";
import { drizzle as drizzleDevelopment } from "drizzle-orm/postgres-js";
import { drizzle as drizzleProduction } from "drizzle-orm/neon-http";
import postgres from "postgres";
import { neon } from "@neondatabase/serverless";
import env from "@/env";

// Determine the database URL based on the environment
const databaseUrl =
  env.NODE_ENV === "development"
    ? env.DATABASE_URL_DEVELOPMENT
    : env.DATABASE_URL_PRODUCTION;

// Set up the SQL client depending on the environment
const sql =
  env.NODE_ENV === "development" ? postgres(databaseUrl) : neon(databaseUrl);

// Initialize the database with the appropriate drizzle function and schema
export const db =
  env.NODE_ENV === "development"
    ? drizzleDevelopment(sql as any, { schema: { ...tables } })
    : drizzleProduction({
        client: sql as any,
        schema: { ...tables },
      });

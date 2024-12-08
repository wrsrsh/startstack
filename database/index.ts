import env from "@/env";
import { drizzle } from "drizzle-orm/postgres-js";
import * as tables from "./tables";
// import * as relations from "./relations";
import postgres from "postgres";

const sql = postgres(
  process.env.NODE_ENV === "development"
    ? env.DATABASE_URL_DEVELOPMENT
    : env.DATABASE_URL_PRODUCTION
);

export const db = drizzle(sql, {
  schema: {
    ...tables,
    // ...relations,
  },
});
